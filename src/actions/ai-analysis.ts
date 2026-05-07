"use server";

import { auth } from "@/lib/auth";
import Groq from "groq-sdk";
import { prisma } from "@/lib/prisma";
import * as pdfParseModule from "pdf-parse";
const pdfParse = (pdfParseModule as any).default ?? pdfParseModule;

export type AIAnalysisResult = {
  score: number;
  recommendation: "APPROVE" | "MAYBE" | "REJECT";
  strengths: string[];
  concerns: string[];
  summary: string;
};

async function extractPdfText(url: string): Promise<string> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) return "";
    const buffer = await response.arrayBuffer();
    const data = await pdfParse(Buffer.from(buffer));
    return data.text.trim().slice(0, 6000);
  } catch {
    return "";
  } finally {
    clearTimeout(timeout);
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

  // Extrair texto do PDF se disponível
  let resumeText = "";
  if (application.resumeUrl?.toLowerCase().includes(".pdf")) {
    resumeText = await extractPdfText(application.resumeUrl);
  }

  const hasCoverLetter = !!application.coverLetter?.trim();

  // Sem currículo legível e sem carta — não há dados para analisar
  if (!resumeText && !hasCoverLetter) {
    return {
      success: false,
      error: "Sem dados suficientes para análise. O candidato não enviou carta de apresentação e o currículo não pôde ser lido (formato Word ou PDF protegido).",
    };
  }

  const jobContext = [
    `Vaga: ${application.job.title}`,
    application.job.description ? `Descrição: ${application.job.description}` : "",
    application.job.requirements ? `Requisitos: ${application.job.requirements}` : "",
    application.job.responsibilities ? `Responsabilidades: ${application.job.responsibilities}` : "",
  ]
    .filter(Boolean)
    .join("\n\n");

  const candidateContext = [
    `Candidato: ${application.candidate.name ?? "Sem nome"}`,
    resumeText
      ? `Currículo (texto extraído do PDF):\n${resumeText}`
      : "",
    hasCoverLetter
      ? `Carta de apresentação:\n${application.coverLetter}`
      : "",
  ]
    .filter(Boolean)
    .join("\n\n");

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

  try {
    const groq = new Groq({ apiKey });
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
      temperature: 0.3,
    });

    const text = completion.choices[0]?.message?.content ?? "";
    const parsed = JSON.parse(text) as AIAnalysisResult;
    return { success: true, data: parsed };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("[AI Analysis Error]", errorMessage);

    if (errorMessage.includes("429") || errorMessage.includes("rate_limit") || errorMessage.includes("quota")) {
      return { success: false, error: "Limite de uso da IA atingido. Aguarde alguns segundos e tente novamente." };
    }
    if (errorMessage.includes("401") || errorMessage.includes("API key") || errorMessage.includes("403")) {
      return { success: false, error: "Chave da API Groq inválida. Verifique o GROQ_API_KEY no servidor." };
    }
    return { success: false, error: `Erro da IA: ${errorMessage.slice(0, 120)}` };
  }
}
