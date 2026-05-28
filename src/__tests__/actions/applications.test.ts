import { describe, it, expect, beforeEach, vi } from "vitest";
import type { Session } from "next-auth";

const { mockAuth, mockPrisma, mockCreateNotification } = vi.hoisted(() => {
  const mockPrisma = {
    job: { findUnique: vi.fn() },
    user: { findUnique: vi.fn(), create: vi.fn() },
    application: { create: vi.fn(), update: vi.fn() },
  };
  return {
    mockAuth: vi.fn(),
    mockPrisma,
    mockCreateNotification: vi.fn().mockResolvedValue(undefined),
  };
});

vi.mock("@/lib/auth", () => ({ auth: mockAuth }));
vi.mock("@/lib/prisma", () => ({ prisma: mockPrisma }));
vi.mock("@/actions/notifications", () => ({ createNotification: mockCreateNotification }));

import { applyToJob, rejectApplication, shortlistApplication } from "@/actions/applications";

const adminSession: Session = {
  user: { id: "admin-1", email: "admin@test.com", role: "ADMIN", permissions: null } as any,
  expires: "2099-01-01",
};

const R2_DOMAIN = "https://pub-test.r2.dev";

beforeEach(() => {
  process.env.R2_PUBLIC_DOMAIN = R2_DOMAIN;
  vi.clearAllMocks();
});

describe("applyToJob", () => {
  const validPayload = {
    jobId: "job-1",
    name: "Maria Silva",
    email: "maria@email.com",
    resumeUrl: `${R2_DOMAIN}/resumes/cv.pdf`,
  };

  beforeEach(() => {
    mockPrisma.job.findUnique.mockResolvedValue({ id: "job-1", status: "ACTIVE", title: "Dev" });
    mockPrisma.user.findUnique.mockResolvedValue(null);
    mockPrisma.user.create.mockResolvedValue({ id: "user-1" });
    mockPrisma.application.create.mockResolvedValue({
      id: "app-1",
      job: { title: "Dev" },
    });
  });

  it("fails with invalid email", async () => {
    const result = await applyToJob({ ...validPayload, email: "not-an-email" });
    expect(result.success).toBe(false);
  });

  it("fails with name too short", async () => {
    const result = await applyToJob({ ...validPayload, name: "M" });
    expect(result.success).toBe(false);
  });

  it("fails when resume URL is not from R2 domain", async () => {
    const result = await applyToJob({ ...validPayload, resumeUrl: "https://evil.com/cv.pdf" });
    expect(result.success).toBe(false);
    expect((result as any).error).toMatch(/url/i);
  });

  it("fails when job does not exist", async () => {
    mockPrisma.job.findUnique.mockResolvedValue(null);
    const result = await applyToJob(validPayload);
    expect(result.success).toBe(false);
    expect((result as any).error).toMatch(/vaga/i);
  });

  it("fails when job is not active", async () => {
    mockPrisma.job.findUnique.mockResolvedValue({ id: "job-1", status: "CLOSED", title: "Dev" });
    const result = await applyToJob(validPayload);
    expect(result.success).toBe(false);
    expect((result as any).error).toMatch(/vagas/i);
  });

  it("creates a new user when candidate does not exist yet", async () => {
    const result = await applyToJob(validPayload);
    expect(result.success).toBe(true);
    expect(mockPrisma.user.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ email: "maria@email.com", role: "CANDIDATE" }),
      })
    );
  });

  it("reuses existing user when candidate already exists", async () => {
    mockPrisma.user.findUnique.mockResolvedValue({ id: "existing-user" });
    const result = await applyToJob(validPayload);
    expect(result.success).toBe(true);
    expect(mockPrisma.user.create).not.toHaveBeenCalled();
  });

  it("returns applicationId on success", async () => {
    const result = await applyToJob(validPayload);
    expect(result.success).toBe(true);
    if (result.success) expect(result.applicationId).toBe("app-1");
  });

  it("sends notification on success", async () => {
    await applyToJob(validPayload);
    expect(mockCreateNotification).toHaveBeenCalledOnce();
  });

  it("returns duplicate error on P2002", async () => {
    const dupError = Object.assign(new Error("Duplicate"), { code: "P2002" });
    mockPrisma.application.create.mockRejectedValue(dupError);
    const result = await applyToJob(validPayload);
    expect(result.success).toBe(false);
    expect((result as any).error).toMatch(/candidatou/i);
  });
});

describe("rejectApplication", () => {
  beforeEach(() => {
    mockPrisma.application.update.mockResolvedValue({});
  });

  it("fails without MANAGED permission", async () => {
    mockAuth.mockResolvedValue({
      user: { id: "u1", role: "ADMIN", permissions: ["RESUMES"] },
      expires: "2099-01-01",
    } as Session);
    const result = await rejectApplication("app-1");
    expect(result.success).toBe(false);
  });

  it("rejects application and returns success", async () => {
    mockAuth.mockResolvedValue(adminSession);
    const result = await rejectApplication("app-1");
    expect(result.success).toBe(true);
    expect(mockPrisma.application.update).toHaveBeenCalledWith({
      where: { id: "app-1" },
      data: { status: "REJECTED" },
    });
  });
});

describe("shortlistApplication", () => {
  beforeEach(() => {
    mockPrisma.application.update.mockResolvedValue({});
  });

  it("fails when not authenticated", async () => {
    mockAuth.mockResolvedValue(null);
    const result = await shortlistApplication("app-1");
    expect(result.success).toBe(false);
  });

  it("shortlists application with feedback", async () => {
    mockAuth.mockResolvedValue(adminSession);
    const result = await shortlistApplication("app-1", "Perfil excelente");
    expect(result.success).toBe(true);
    expect(mockPrisma.application.update).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: "app-1" },
        data: expect.objectContaining({ status: "SHORTLISTED" }),
      })
    );
  });

  it("shortlists application without feedback", async () => {
    mockAuth.mockResolvedValue(adminSession);
    const result = await shortlistApplication("app-1");
    expect(result.success).toBe(true);
  });
});
