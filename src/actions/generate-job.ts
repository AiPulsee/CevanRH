"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

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
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return { success: false, error: "GEMINI_API_KEY não configurada." };
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    generationConfig: { responseMimeType: "application/json" },
  });

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

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  try {
    const parsed = JSON.parse(text) as GeneratedJob;
    return { success: true, data: parsed };
  } catch {
    return { success: false, error: "Não foi possível interpretar a resposta da IA." };
  }
}
