import { describe, it, expect, beforeEach, vi } from "vitest";
import type { Session } from "next-auth";

const { mockAuth, mockPrisma, mockS3Send, mockGetDocumentProxy, mockExtractText, mockGroqCreate } =
  vi.hoisted(() => {
    const mockGroqCreate = vi.fn();
    return {
      mockAuth: vi.fn(),
      mockPrisma: {
        application: { findUnique: vi.fn() },
      },
      mockS3Send: vi.fn(),
      mockGetDocumentProxy: vi.fn(),
      mockExtractText: vi.fn(),
      mockGroqCreate,
    };
  });

vi.mock("@/lib/auth", () => ({ auth: mockAuth }));
vi.mock("@/lib/prisma", () => ({ prisma: mockPrisma }));
vi.mock("@/lib/s3", () => ({ s3Client: { send: mockS3Send } }));
vi.mock("@aws-sdk/client-s3", () => ({ GetObjectCommand: vi.fn() }));
vi.mock("unpdf", () => ({
  getDocumentProxy: mockGetDocumentProxy,
  extractText: mockExtractText,
}));
vi.mock("groq-sdk", () => ({
  default: vi.fn(() => ({ chat: { completions: { create: mockGroqCreate } } })),
}));

import { analyzeCandidate } from "@/actions/ai-analysis";

const adminSession: Session = {
  user: { id: "admin-1", email: "admin@test.com", role: "ADMIN", permissions: null } as any,
  expires: "2099-01-01",
};

const mockApplication = {
  id: "app-1",
  resumeUrl: "https://pub-test.r2.dev/resumes/cv.pdf",
  coverLetter: null,
  candidate: { name: "Carlos Santos" },
  job: {
    title: "Analista de Sistemas",
    description: "Desenvolver e manter sistemas.",
    requirements: "Java, SQL",
    responsibilities: "Codificar soluções",
  },
};

const mockGroqResponse = {
  choices: [{
    message: {
      content: JSON.stringify({
        score: 78,
        recommendation: "APPROVE",
        strengths: ["Experiência sólida em Java", "Conhecimento de SQL"],
        concerns: ["Sem experiência em cloud"],
        summary: "Candidato qualificado com boa aderência à vaga.",
      }),
    },
  }],
};

function createMockS3Body(content = "PDF content bytes") {
  const buffer = Buffer.from(content);
  return {
    [Symbol.asyncIterator]: async function* () {
      yield new Uint8Array(buffer);
    },
  };
}

beforeEach(() => {
  vi.clearAllMocks();
  process.env.GROQ_API_KEY = "gsk_test_key";
  process.env.R2_PUBLIC_DOMAIN = "https://pub-test.r2.dev";
});

describe("analyzeCandidate", () => {
  it("fails when not authenticated", async () => {
    mockAuth.mockResolvedValue(null);
    const result = await analyzeCandidate("app-1");
    expect(result.success).toBe(false);
    expect((result as any).error).toMatch(/autorizado/i);
  });

  it("fails for non-ADMIN role", async () => {
    mockAuth.mockResolvedValue({
      user: { id: "u1", role: "CANDIDATE" },
      expires: "2099-01-01",
    } as Session);
    const result = await analyzeCandidate("app-1");
    expect(result.success).toBe(false);
  });

  it("fails when GROQ_API_KEY is missing", async () => {
    mockAuth.mockResolvedValue(adminSession);
    delete process.env.GROQ_API_KEY;
    const result = await analyzeCandidate("app-1");
    expect(result.success).toBe(false);
    expect((result as any).error).toMatch(/GROQ_API_KEY/);
  });

  it("fails when application is not found", async () => {
    mockAuth.mockResolvedValue(adminSession);
    mockPrisma.application.findUnique.mockResolvedValue(null);
    const result = await analyzeCandidate("app-1");
    expect(result.success).toBe(false);
    expect((result as any).error).toMatch(/candidatura/i);
  });

  it("fails when PDF has no extractable text and no cover letter", async () => {
    mockAuth.mockResolvedValue(adminSession);
    mockPrisma.application.findUnique.mockResolvedValue({ ...mockApplication, coverLetter: null });
    mockS3Send.mockResolvedValue({ Body: createMockS3Body() });
    mockGetDocumentProxy.mockResolvedValue({});
    mockExtractText.mockResolvedValue({ text: "   " }); // blank text
    const result = await analyzeCandidate("app-1");
    expect(result.success).toBe(false);
    expect((result as any).error).toMatch(/analisar/i);
  });

  it("analyzes successfully with PDF", async () => {
    mockAuth.mockResolvedValue(adminSession);
    mockPrisma.application.findUnique.mockResolvedValue(mockApplication);
    mockS3Send.mockResolvedValue({ Body: createMockS3Body() });
    mockGetDocumentProxy.mockResolvedValue({});
    mockExtractText.mockResolvedValue({ text: "Experiência em Java e SQL. Formado em Ciência da Computação." });
    mockGroqCreate.mockResolvedValue(mockGroqResponse);

    const result = await analyzeCandidate("app-1");
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.score).toBe(78);
      expect(result.data.recommendation).toBe("APPROVE");
      expect(result.data.source).toBe("pdf");
      expect(result.data.strengths).toHaveLength(2);
    }
  });

  it("uses cover letter when resume is not a PDF", async () => {
    mockAuth.mockResolvedValue(adminSession);
    mockPrisma.application.findUnique.mockResolvedValue({
      ...mockApplication,
      resumeUrl: "https://pub-test.r2.dev/resumes/cv.docx", // not .pdf
      coverLetter: "Tenho 5 anos de experiência em Java e sou formado em Sistemas.",
    });
    mockGroqCreate.mockResolvedValue(mockGroqResponse);

    const result = await analyzeCandidate("app-1");
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.source).toBe("cover_letter");
    }
  });

  it("uses both sources when PDF and cover letter are present", async () => {
    mockAuth.mockResolvedValue(adminSession);
    mockPrisma.application.findUnique.mockResolvedValue({
      ...mockApplication,
      coverLetter: "Tenho interesse genuíno nesta oportunidade.",
    });
    mockS3Send.mockResolvedValue({ Body: createMockS3Body() });
    mockGetDocumentProxy.mockResolvedValue({});
    mockExtractText.mockResolvedValue({ text: "Experiência em Java e SQL de 5 anos de experiência." });
    mockGroqCreate.mockResolvedValue(mockGroqResponse);

    const result = await analyzeCandidate("app-1");
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.source).toBe("both");
  });

  it("returns rate-limit message on Groq 429 error", async () => {
    mockAuth.mockResolvedValue(adminSession);
    mockPrisma.application.findUnique.mockResolvedValue(mockApplication);
    mockS3Send.mockResolvedValue({ Body: createMockS3Body() });
    mockGetDocumentProxy.mockResolvedValue({});
    mockExtractText.mockResolvedValue({ text: "Experiência em Java há 5 anos e SQL." });
    mockGroqCreate.mockRejectedValue(new Error("Error 429: rate_limit exceeded"));

    const result = await analyzeCandidate("app-1");
    expect(result.success).toBe(false);
    expect((result as any).error).toMatch(/limite/i);
  });

  it("returns auth error on Groq 401", async () => {
    mockAuth.mockResolvedValue(adminSession);
    mockPrisma.application.findUnique.mockResolvedValue(mockApplication);
    mockS3Send.mockResolvedValue({ Body: createMockS3Body() });
    mockGetDocumentProxy.mockResolvedValue({});
    mockExtractText.mockResolvedValue({ text: "Experiência em Java há 5 anos e SQL." });
    mockGroqCreate.mockRejectedValue(new Error("401 Unauthorized - API key invalid"));

    const result = await analyzeCandidate("app-1");
    expect(result.success).toBe(false);
    expect((result as any).error).toMatch(/configuração/i);
  });

  it("retries once on transient network error and succeeds", async () => {
    mockAuth.mockResolvedValue(adminSession);
    mockPrisma.application.findUnique.mockResolvedValue(mockApplication);
    mockS3Send.mockResolvedValue({ Body: createMockS3Body() });
    mockGetDocumentProxy.mockResolvedValue({});
    mockExtractText.mockResolvedValue({ text: "Experiência em Java há 5 anos e SQL." });
    mockGroqCreate
      .mockRejectedValueOnce(new Error("fetch failed: ECONNRESET"))
      .mockResolvedValueOnce(mockGroqResponse);

    const result = await analyzeCandidate("app-1");
    expect(result.success).toBe(true);
    expect(mockGroqCreate).toHaveBeenCalledTimes(2);
  });

  it("fails after two consecutive transient errors", async () => {
    mockAuth.mockResolvedValue(adminSession);
    mockPrisma.application.findUnique.mockResolvedValue(mockApplication);
    mockS3Send.mockResolvedValue({ Body: createMockS3Body() });
    mockGetDocumentProxy.mockResolvedValue({});
    mockExtractText.mockResolvedValue({ text: "Experiência em Java há 5 anos e SQL." });
    mockGroqCreate.mockRejectedValue(new Error("fetch failed: ECONNRESET"));

    const result = await analyzeCandidate("app-1");
    expect(result.success).toBe(false);
    expect(mockGroqCreate).toHaveBeenCalledTimes(2);
  });

  it("returns S3 NoSuchKey error with user-friendly message", async () => {
    mockAuth.mockResolvedValue(adminSession);
    mockPrisma.application.findUnique.mockResolvedValue({
      ...mockApplication,
      coverLetter: null,
    });
    mockS3Send.mockRejectedValue(new Error("NoSuchKey: The specified key does not exist"));

    const result = await analyzeCandidate("app-1");
    expect(result.success).toBe(false);
    expect((result as any).error).toMatch(/reenviar/i);
  });
});
