"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { prisma } from "@/lib/prisma";

export type AIAnalysisResult = {
  score: number;
  recommendation: "APPROVE" | "MAYBE" | "REJECT";
  strengths: string[];
  concerns: string[];
  summary: string;
};

export async function analyzeCandidate(
  applicationId: string
): Promise<{ success: true; data: AIAnalysisResult } | { success: false; error: string }> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return { success: false, error: "GEMINI_API_KEY não configurada no servidor." };
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
    application.coverLetter
      ? `Carta de apresentação:\n${application.coverLetter}`
      : "Sem carta de apresentação.",
  ].join("\n\n");

  const prompt = `Você é um especialista em recrutamento e seleção trabalhando para a Cevan RH.
Analise a compatibilidade entre a vaga e o candidato abaixo.
Responda SOMENTE com um JSON válido, sem markdown, sem código, sem texto adicional.

${jobContext}

---

${candidateContext}

Formato obrigatório da resposta:
{
  "score": <número inteiro de 0 a 100 indicando fit com a vaga>,
  "recommendation": <"APPROVE" | "MAYBE" | "REJECT">,
  "strengths": [<até 3 strings curtas com pontos positivos>],
  "concerns": [<até 2 strings curtas com pontos de atenção>],
  "summary": <uma frase resumindo o parecer>
}`;

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    generationConfig: { responseMimeType: "application/json" },
  });

  // Build parts — attach PDF inline if accessible
  type Part = { text: string } | { inlineData: { mimeType: string; data: string } };
  const parts: Part[] = [{ text: prompt }];

  if (
    application.resumeUrl &&
    application.resumeUrl.startsWith("http") &&
    application.resumeUrl.toLowerCase().includes(".pdf")
  ) {
    try {
      const response = await fetch(application.resumeUrl);
      if (response.ok) {
        const buffer = await response.arrayBuffer();
        const base64 = Buffer.from(buffer).toString("base64");
        parts.unshift({ inlineData: { mimeType: "application/pdf", data: base64 } });
      }
    } catch {
      // Continue without PDF if fetch fails
    }
  }

  try {
    const result = await model.generateContent(parts);
    const text = result.response.text();
    const parsed = JSON.parse(text) as AIAnalysisResult;
    return { success: true, data: parsed };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("AI Analysis Error:", errorMessage);
    
    if (errorMessage?.includes("429") || errorMessage?.includes("quota")) {
      return { 
        success: false, 
        error: "Limite de uso da IA atingido para este minuto. Por favor, aguarde alguns segundos e tente novamente." 
      };
    }
    
    return { success: false, error: "Ocorreu um erro ao processar a análise com IA." };
  }
}
