import { describe, it, expect, beforeEach, vi } from "vitest";
import type { Session } from "next-auth";

// --- hoisted mocks ---
const { mockAuth, mockPrisma } = vi.hoisted(() => {
  const mockPrisma = {
    job: {
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
    company: {
      findUnique: vi.fn(),
    },
  };
  return { mockAuth: vi.fn(), mockPrisma };
});

vi.mock("@/lib/auth", () => ({ auth: mockAuth }));
vi.mock("@/lib/prisma", () => ({ prisma: mockPrisma }));
vi.mock("uuid", () => ({ v4: vi.fn(() => "00000000-0000-0000-0000-000000000000") }));

import { createJob, updateJob, deleteJob } from "@/actions/jobs";

const adminSession: Session = {
  user: { id: "admin-1", email: "admin@test.com", role: "ADMIN", permissions: null } as any,
  expires: "2099-01-01",
};

function makeFormData(data: Record<string, string | boolean | number>): FormData {
  const fd = new FormData();
  for (const [k, v] of Object.entries(data)) {
    fd.append(k, String(v));
  }
  return fd;
}

const validJobData = {
  title: "Analista Sênior de TI",
  description: "Vaga para analista com experiência em sistemas.",
  location: "São Paulo",
  isRemote: "false",
  type: "MANAGED",
  openings: "1",
  companyId: "company-1",
};

describe("createJob", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockPrisma.company.findUnique.mockResolvedValue({ id: "company-1" });
    mockPrisma.job.create.mockResolvedValue({ id: "job-1" });
  });

  it("fails when not authenticated", async () => {
    mockAuth.mockResolvedValue(null);
    const result = await createJob({}, makeFormData(validJobData));
    expect(result.success).toBe(false);
  });

  it("fails for CANDIDATE role", async () => {
    mockAuth.mockResolvedValue({
      user: { id: "u1", role: "CANDIDATE", permissions: null },
      expires: "2099-01-01",
    } as Session);
    const result = await createJob({}, makeFormData(validJobData));
    expect(result.success).toBe(false);
  });

  it("fails when title is too short", async () => {
    mockAuth.mockResolvedValue(adminSession);
    const result = await createJob({}, makeFormData({ ...validJobData, title: "Dev" }));
    expect(result.success).toBe(false);
  });

  it("fails when description is too short", async () => {
    mockAuth.mockResolvedValue(adminSession);
    const result = await createJob({}, makeFormData({ ...validJobData, description: "Curta" }));
    expect(result.success).toBe(false);
  });

  it("fails when company is not found", async () => {
    mockAuth.mockResolvedValue(adminSession);
    mockPrisma.company.findUnique.mockResolvedValue(null);
    const result = await createJob({}, makeFormData(validJobData));
    expect(result.success).toBe(false);
    expect((result as any).error).toMatch(/empresa/i);
  });

  it("creates job and returns success", async () => {
    mockAuth.mockResolvedValue(adminSession);
    const result = await createJob({}, makeFormData(validJobData));
    expect(result.success).toBe(true);
    expect(mockPrisma.job.create).toHaveBeenCalledOnce();
  });

  it("generates slug with unicode normalization (removes accents)", async () => {
    mockAuth.mockResolvedValue(adminSession);
    await createJob({}, makeFormData(validJobData));
    const createCall = mockPrisma.job.create.mock.calls[0][0];
    // "Analista Sênior de TI" → "analista-senior-de-ti-00000000"
    expect(createCall.data.slug).toBe("analista-senior-de-ti-00000000");
  });

  it("generates slug for title with ç and ã", async () => {
    mockAuth.mockResolvedValue(adminSession);
    await createJob({}, makeFormData({ ...validJobData, title: "Técnico em Ação Operacional" }));
    const createCall = mockPrisma.job.create.mock.calls[0][0];
    expect(createCall.data.slug).toBe("tecnico-em-acao-operacional-00000000");
  });

  it("sets job type to MANAGED by default", async () => {
    mockAuth.mockResolvedValue(adminSession);
    const fd = makeFormData({ ...validJobData });
    fd.delete("type");
    await createJob({}, fd);
    const createCall = mockPrisma.job.create.mock.calls[0][0];
    expect(createCall.data.type).toBe("MANAGED");
  });
});

describe("updateJob", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockPrisma.job.update.mockResolvedValue({});
  });

  it("fails when not authenticated", async () => {
    mockAuth.mockResolvedValue(null);
    const result = await updateJob("job-1", {
      title: "Nova Vaga de TI Analista",
      description: "Descrição detalhada da vaga de trabalho",
      location: "SP",
      isRemote: false,
      status: "ACTIVE" as any,
    });
    expect(result.success).toBe(false);
  });

  it("fails without MANAGED permission", async () => {
    mockAuth.mockResolvedValue({
      user: { id: "u1", role: "ADMIN", permissions: ["RESUMES"] },
      expires: "2099-01-01",
    } as Session);
    const result = await updateJob("job-1", {
      title: "Nova Vaga de TI Analista",
      description: "Descrição detalhada da vaga de trabalho",
      location: "SP",
      isRemote: false,
      status: "ACTIVE" as any,
    });
    expect(result.success).toBe(false);
  });

  it("updates job and returns success", async () => {
    mockAuth.mockResolvedValue(adminSession);
    const result = await updateJob("job-1", {
      title: "Nova Vaga de TI Analista",
      description: "Descrição detalhada da vaga de trabalho",
      location: "SP",
      isRemote: false,
      status: "ACTIVE" as any,
    });
    expect(result.success).toBe(true);
    expect(mockPrisma.job.update).toHaveBeenCalledWith(
      expect.objectContaining({ where: { id: "job-1" } })
    );
  });
});

describe("deleteJob", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockPrisma.job.delete.mockResolvedValue({});
  });

  it("fails when not authenticated", async () => {
    mockAuth.mockResolvedValue(null);
    const result = await deleteJob("job-1");
    expect(result.success).toBe(false);
  });

  it("deletes job and returns success", async () => {
    mockAuth.mockResolvedValue(adminSession);
    const result = await deleteJob("job-1");
    expect(result.success).toBe(true);
    expect(mockPrisma.job.delete).toHaveBeenCalledWith({ where: { id: "job-1" } });
  });
});
