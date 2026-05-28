import { describe, it, expect, beforeEach, vi } from "vitest";
import type { Session } from "next-auth";

const { mockAuth, mockPrisma } = vi.hoisted(() => {
  const mockPrisma = {
    company: {
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
  };
  return { mockAuth: vi.fn(), mockPrisma };
});

vi.mock("@/lib/auth", () => ({ auth: mockAuth }));
vi.mock("@/lib/prisma", () => ({ prisma: mockPrisma }));

import { createCompany, updateCompany, deleteCompany } from "@/actions/companies";

const adminSession: Session = {
  user: { id: "admin-1", email: "admin@test.com", role: "ADMIN", permissions: null } as any,
  expires: "2099-01-01",
};

function makeFormData(data: Record<string, string>): FormData {
  const fd = new FormData();
  for (const [k, v] of Object.entries(data)) fd.append(k, v);
  return fd;
}

describe("createCompany", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockPrisma.company.create.mockResolvedValue({ id: "c-1" });
  });

  it("fails when not authenticated", async () => {
    mockAuth.mockResolvedValue(null);
    const result = await createCompany({}, makeFormData({ name: "Empresa Teste" }));
    expect(result.success).toBe(false);
  });

  it("fails without COMPANIES permission", async () => {
    mockAuth.mockResolvedValue({
      user: { id: "u1", role: "ADMIN", permissions: ["MANAGED"] },
      expires: "2099-01-01",
    } as Session);
    const result = await createCompany({}, makeFormData({ name: "Empresa Teste" }));
    expect(result.success).toBe(false);
  });

  it("fails with name too short", async () => {
    mockAuth.mockResolvedValue(adminSession);
    const result = await createCompany({}, makeFormData({ name: "A" }));
    expect(result.success).toBe(false);
  });

  it("fails with invalid email", async () => {
    mockAuth.mockResolvedValue(adminSession);
    const result = await createCompany(
      {},
      makeFormData({ name: "Empresa OK", email: "not-valid" })
    );
    expect(result.success).toBe(false);
  });

  it("creates company and returns success", async () => {
    mockAuth.mockResolvedValue(adminSession);
    const result = await createCompany(
      {},
      makeFormData({ name: "Empresa Válida", email: "contato@empresa.com" })
    );
    expect(result.success).toBe(true);
    expect(mockPrisma.company.create).toHaveBeenCalledOnce();
  });

  it("accepts empty email", async () => {
    mockAuth.mockResolvedValue(adminSession);
    const result = await createCompany({}, makeFormData({ name: "Empresa Válida", email: "" }));
    expect(result.success).toBe(true);
  });
});

describe("updateCompany", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockPrisma.company.update.mockResolvedValue({});
  });

  it("fails when not authenticated", async () => {
    mockAuth.mockResolvedValue(null);
    const result = await updateCompany("c-1", { name: "Nova Empresa" });
    expect(result.success).toBe(false);
  });

  it("updates company and returns success", async () => {
    mockAuth.mockResolvedValue(adminSession);
    const result = await updateCompany("c-1", { name: "Nova Empresa" });
    expect(result.success).toBe(true);
    expect(mockPrisma.company.update).toHaveBeenCalledWith(
      expect.objectContaining({ where: { id: "c-1" } })
    );
  });
});

describe("deleteCompany", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockPrisma.company.delete.mockResolvedValue({});
  });

  it("fails when not authenticated", async () => {
    mockAuth.mockResolvedValue(null);
    const result = await deleteCompany("c-1");
    expect(result.success).toBe(false);
  });

  it("deletes company and returns success", async () => {
    mockAuth.mockResolvedValue(adminSession);
    const result = await deleteCompany("c-1");
    expect(result.success).toBe(true);
    expect(mockPrisma.company.delete).toHaveBeenCalledWith({ where: { id: "c-1" } });
  });
});
