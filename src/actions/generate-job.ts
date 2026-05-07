"use server";

import { auth } from "@/lib/auth";
import Groq from "groq-sdk";

export type GeneratedJob = {
  description: string;
  requirements: string;
  responsibilities: string;
  benefits: string;
  tips: string;
  skills: string[];
};

export async function generateJobContent(
  title: string,
  level: string,
  contractType: string
): Promise<{ success: true; data: GeneratedJob } | { success: false; error: string }> {
  const session = await auth();
  if (!session || (session.user as any)?.role !== "ADMIN") {
    return { success: false, error: "Não autorizado." };
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return { success: false, error: "GROQ_API_KEY não configurada." };
  }

  const prompt = `Você é um especialista em RH criando uma descrição de vaga profissional em português brasileiro.

Vaga: ${title}
Nível: ${level}
Contrato: ${contractType}

Gere o conteúdo completo para essa vaga. Responda SOMENTE com JSON válido neste formato exato:
{
  "description": "<2-3 frases descrevendo a oportunidade de forma atraente>",
  "requirements": "<lista de requisitos, cada item em uma linha começando com '• '>",
  "responsibilities": "<lista de responsabilidades, cada item em uma linha começando com '• '>",
  "benefits": "<lista de benefícios típicos do mercado brasileiro, cada item em uma linha começando com '• '>",
  "tips": "<2-3 dicas da empresa de recrutamento para o candidato se destacar nessa vaga, cada item começando com '• '>",
  "skills": [<array de 5-8 strings com as principais habilidades técnicas exigidas>]
}`;

  try {
    const groq = new Groq({ apiKey });
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
      temperature: 0.5,
    });

    const text = completion.choices[0]?.message?.content ?? "";
    const parsed = JSON.parse(text) as GeneratedJob;
    return { success: true, data: parsed };
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("[Generate Job Error]", msg);
    if (msg.includes("429") || msg.includes("rate_limit") || msg.includes("quota")) {
      return { success: false, error: "Limite da IA atingido. Aguarde e tente novamente." };
    }
    return { success: false, error: "Não foi possível gerar o conteúdo com IA." };
  }
}
