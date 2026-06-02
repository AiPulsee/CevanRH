"use server";

import { auth } from "@/lib/auth";
import Groq from "groq-sdk";
import { prisma } from "@/lib/prisma";
import { s3Client } from "@/lib/s3";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getDocumentProxy, extractText } from "unpdf";

export type AIAnalysisResult = {
  score: number;
  recommendation: "APPROVE" | "MAYBE" | "REJECT";
  strengths: string[];
  concerns: string[];
  summary: string;
  source: "pdf" | "cover_letter" | "both";
};

function extractKeyFromUrl(url: string): string | null {
  try {
    const publicDomain = process.env.R2_PUBLIC_DOMAIN?.replace(/\/$/, "");
    if (publicDomain && url.startsWith(publicDomain)) {
      return url.slice(publicDomain.length + 1);
    }
    // fallback: extract path after the bucket/domain (last resort)
    const parsed = new URL(url);
    return parsed.pathname.replace(/^\//, "");
  } catch {
    return null;
  }
}

async function extractPdfText(resumeUrl: string): Promise<{ text: string; error?: string }> {
  const key = extractKeyFromUrl(resumeUrl);
  if (!key) return { text: "", error: "URL do currículo inválida." };

  try {
    const command = new GetObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: key,
    });

    const response = await s3Client.send(command);
    if (!response.Body) return { text: "", error: "Arquivo vazio no servidor." };

    const chunks: Uint8Array[] = [];
    for await (const chunk of response.Body as AsyncIterable<Uint8Array>) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);

    try {
      const pdf = await getDocumentProxy(new Uint8Array(buffer));
      const { text } = await extractText(pdf, { mergePages: true });
      const trimmed = (text as string).trim();
      if (trimmed.length > 20) return { text: trimmed.slice(0, 12000) };
      return { text: "", error: "O currículo é uma imagem escaneada e não possui texto selecionável. A IA não consegue ler imagens." };
    } catch (parseErr: unknown) {
      const msg = parseErr instanceof Error ? parseErr.message : String(parseErr);
      console.error("[extractPdfText] parse failed:", msg);
      return { text: "", error: "PDF corrompido ou com proteção de cópia. Peça ao candidato reenviar em outro formato." };
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    if (msg.includes("NoSuchKey") || msg.includes("The specified key does not exist")) {
      return { text: "", error: "Arquivo não encontrado no servidor. O candidato precisa reenviar o currículo." };
    }
    console.error("[extractPdfText] S3 error:", msg);
    return { text: "", error: "Erro ao buscar o arquivo no servidor." };
  }
}

export async function analyzeCandidate(
  applicationId: string
): Promise<{ success: true; data: AIAnalysisResult } | { success: false; error: string }> {
  const session = await auth();
  if (!session || (session.user as any)?.role !== "ADMIN") {
    return { success: false, error: "Não autorizado." };
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return { success: false, error: "GROQ_API_KEY não configurada no servidor." };
  }

  const application = await prisma.application.findUnique({
    where: { id: applicationId },
    include: {
      candidate: { select: { name: true } },
      job: {
        select: {
          title: true,
          description: true,
          requirements: true,
          responsibilities: true,
        },
      },
    },
  });

  if (!application) {
    return { success: false, error: "Candidatura não encontrada." };
  }

  let resumeText = "";
  let resumeError: string | undefined;

  if (application.resumeUrl?.toLowerCase().includes(".pdf")) {
    const result = await extractPdfText(application.resumeUrl);
    resumeText = result.text;
    resumeError = result.error;
  }

  const hasCoverLetter = !!application.coverLetter?.trim();

  if (!resumeText && !hasCoverLetter) {
    const reason = resumeError ?? "Formato Word ou PDF protegido.";
    return {
      success: false,
      error: `Não foi possível analisar o currículo: ${reason}`,
    };
  }

  const jobContext = application.job
    ? [
        `Vaga: ${application.job.title}`,
        application.job.description ? `Descrição: ${application.job.description}` : "",
        application.job.requirements ? `Requisitos: ${application.job.requirements}` : "",
        application.job.responsibilities
          ? `Responsabilidades: ${application.job.responsibilities}`
          : "",
      ]
        .filter(Boolean)
        .join("\n\n")
    : "Análise geral de perfil (candidato sem vaga específica — avalie pontos fortes e experiências relevantes).";

  const candidateContext = [
    `Candidato: ${application.candidate.name ?? "Sem nome"}`,
    resumeText ? `Currículo (texto extraído do PDF):\n${resumeText}` : "",
    hasCoverLetter ? `Carta de apresentação:\n${application.coverLetter}` : "",
  ]
    .filter(Boolean)
    .join("\n\n");

  const sourceKey: AIAnalysisResult["source"] = resumeText
    ? hasCoverLetter
      ? "both"
      : "pdf"
    : "cover_letter";

  const dataSource = resumeText
    ? hasCoverLetter
      ? "currículo completo + carta de apresentação"
      : "currículo completo (sem carta de apresentação)"
    : "carta de apresentação apenas (currículo em formato não legível)";

  const prompt = `Você é um especialista sênior em recrutamento e seleção da Cevan RH.

Analise a compatibilidade entre o candidato e a vaga com base em: ${dataSource}.

CRITÉRIOS DE PONTUAÇÃO (score de 0 a 100):
- 85-100: Candidato tem experiência direta e específica com os requisitos principais
- 70-84: Boa aderência, com a maioria dos requisitos evidenciados
- 50-69: Experiência relevante mas com lacunas em alguns requisitos
- 30-49: Experiência parcial, fit incerto — requer entrevista para confirmar
- 0-29: Candidato claramente inadequado para a vaga

${jobContext}

---

${candidateContext}

Responda SOMENTE com JSON válido, sem markdown. Formato obrigatório:
{
  "score": <inteiro de 0 a 100>,
  "recommendation": <"APPROVE" | "MAYBE" | "REJECT">,
  "strengths": [<2-3 pontos positivos concretos baseados no conteúdo do currículo/carta>],
  "concerns": [<1-2 pontos de atenção reais identificados no perfil>],
  "summary": <uma frase direta resumindo o parecer do recrutador>
}`;

  const groq = new Groq({ apiKey });
  let lastError: unknown;

  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const completion = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" },
        temperature: 0.3,
      });

      const text = completion.choices[0]?.message?.content ?? "";
      const parsed = JSON.parse(text) as Omit<AIAnalysisResult, "source">;
      return { success: true, data: { ...parsed, source: sourceKey } };
    } catch (error: unknown) {
      lastError = error;
      const msg = error instanceof Error ? error.message : String(error);

      if (msg.includes("429") || msg.includes("rate_limit") || msg.includes("quota")) {
        return { success: false, error: "Limite de uso da IA atingido. Aguarde alguns segundos e tente novamente." };
      }
      if (msg.includes("401") || msg.includes("API key") || msg.includes("403")) {
        return { success: false, error: "Configuração da IA inválida. Contate o administrador." };
      }

      const isTransient = msg.includes("ECONNRESET") || msg.includes("ETIMEDOUT") || msg.includes("fetch failed") || msg.includes("socket");
      if (!isTransient || attempt === 2) break;

      await new Promise((r) => setTimeout(r, 1000));
    }
  }

  console.error("[AI Analysis Error]", lastError instanceof Error ? lastError.message : lastError);
  return { success: false, error: "Erro ao processar análise. Tente novamente." };
}
