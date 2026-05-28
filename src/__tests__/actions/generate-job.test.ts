import { describe, it, expect, beforeEach, vi } from "vitest";
import type { Session } from "next-auth";

const { mockAuth, mockGroqCreate } = vi.hoisted(() => {
  const mockGroqCreate = vi.fn();
  return { mockAuth: vi.fn(), mockGroqCreate };
});

vi.mock("@/lib/auth", () => ({ auth: mockAuth }));
vi.mock("groq-sdk", () => ({
  default: vi.fn(() => ({ chat: { completions: { create: mockGroqCreate } } })),
}));

import { generateJobContent } from "@/actions/generate-job";

const adminSession: Session = {
  user: { id: "admin-1", email: "admin@test.com", role: "ADMIN", permissions: null } as any,
  expires: "2099-01-01",
};

const mockGeneratedJob = {
  description: "Excelente oportunidade para analista de TI.",
  requirements: "• Java\n• SQL\n• Git",
  responsibilities: "• Desenvolver sistemas\n• Dar suporte",
  benefits: "• VR\n• Plano de saúde",
  tips: "• Demonstre proatividade\n• Mostre projetos pessoais",
  skills: ["Java", "SQL", "Git", "Spring Boot"],
};

const mockGroqResponse = {
  choices: [{ message: { content: JSON.stringify(mockGeneratedJob) } }],
};

beforeEach(() => {
  vi.clearAllMocks();
  process.env.GROQ_API_KEY = "gsk_test_key";
});

describe("generateJobContent", () => {
  it("fails when not authenticated", async () => {
    mockAuth.mockResolvedValue(null);
    const result = await generateJobContent("Analista de TI", "Pleno", "CLT");
    expect(result.success).toBe(false);
  });

  it("fails without MANAGED permission", async () => {
    mockAuth.mockResolvedValue({
      user: { id: "u1", role: "ADMIN", permissions: ["RESUMES"] },
      expires: "2099-01-01",
    } as Session);
    const result = await generateJobContent("Analista de TI", "Pleno", "CLT");
    expect(result.success).toBe(false);
  });

  it("fails when GROQ_API_KEY is missing", async () => {
    mockAuth.mockResolvedValue(adminSession);
    delete process.env.GROQ_API_KEY;
    const result = await generateJobContent("Analista de TI", "Pleno", "CLT");
    expect(result.success).toBe(false);
    expect((result as any).error).toMatch(/GROQ_API_KEY/);
  });

  it("generates job content and returns structured data", async () => {
    mockAuth.mockResolvedValue(adminSession);
    mockGroqCreate.mockResolvedValue(mockGroqResponse);

    const result = await generateJobContent("Analista de TI Sênior", "Sênior", "CLT");
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.description).toBe(mockGeneratedJob.description);
      expect(result.data.skills).toEqual(mockGeneratedJob.skills);
      expect(result.data.requirements).toContain("Java");
    }
  });

  it("calls Groq with the provided title, level and contractType", async () => {
    mockAuth.mockResolvedValue(adminSession);
    mockGroqCreate.mockResolvedValue(mockGroqResponse);

    await generateJobContent("Desenvolvedor Backend", "Júnior", "PJ");
    const prompt = mockGroqCreate.mock.calls[0][0].messages[0].content;
    expect(prompt).toContain("Desenvolvedor Backend");
    expect(prompt).toContain("Júnior");
    expect(prompt).toContain("PJ");
  });

  it("returns rate-limit message on Groq 429", async () => {
    mockAuth.mockResolvedValue(adminSession);
    mockGroqCreate.mockRejectedValue(new Error("429 rate_limit"));

    const result = await generateJobContent("Dev", "Pleno", "CLT");
    expect(result.success).toBe(false);
    expect((result as any).error).toMatch(/limite/i);
  });

  it("retries once on ECONNRESET and succeeds", async () => {
    mockAuth.mockResolvedValue(adminSession);
    mockGroqCreate
      .mockRejectedValueOnce(new Error("fetch failed: ECONNRESET"))
      .mockResolvedValueOnce(mockGroqResponse);

    const result = await generateJobContent("Analista", "Pleno", "CLT");
    expect(result.success).toBe(true);
    expect(mockGroqCreate).toHaveBeenCalledTimes(2);
  });

  it("fails after two transient errors", async () => {
    mockAuth.mockResolvedValue(adminSession);
    mockGroqCreate.mockRejectedValue(new Error("socket hang up"));

    const result = await generateJobContent("Analista", "Pleno", "CLT");
    expect(result.success).toBe(false);
    expect(mockGroqCreate).toHaveBeenCalledTimes(2);
  });
});
