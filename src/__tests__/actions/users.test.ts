import { describe, it, expect, beforeEach, vi } from "vitest";
import type { Session } from "next-auth";

const { mockAuth, mockPrisma, mockBcrypt } = vi.hoisted(() => {
  const mockPrisma = {
    user: {
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
      findMany: vi.fn(),
    },
  };
  return { mockAuth: vi.fn(), mockPrisma, mockBcrypt: { hash: vi.fn().mockResolvedValue("hashed-password") } };
});

vi.mock("@/lib/auth", () => ({ auth: mockAuth }));
vi.mock("@/lib/prisma", () => ({ prisma: mockPrisma }));
vi.mock("bcryptjs", () => ({ default: mockBcrypt, hash: mockBcrypt.hash }));

import { createUser, updateUser, deleteUser, getUsers } from "@/actions/users";

const adminSession: Session = {
  user: { id: "admin-1", email: "admin@test.com", role: "ADMIN", permissions: null } as any,
  expires: "2099-01-01",
};

const noUsersSession: Session = {
  user: { id: "admin-2", email: "a@b.com", role: "ADMIN", permissions: ["MANAGED"] } as any,
  expires: "2099-01-01",
};

describe("createUser", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockPrisma.user.findUnique.mockResolvedValue(null);
    mockPrisma.user.create.mockResolvedValue({ id: "new-user" });
  });

  it("fails when not authenticated", async () => {
    mockAuth.mockResolvedValue(null);
    const result = await createUser({ name: "João", email: "joao@test.com", password: "secret123", permissions: [] });
    expect(result.success).toBe(false);
  });

  it("fails without USERS permission", async () => {
    mockAuth.mockResolvedValue(noUsersSession);
    const result = await createUser({ name: "João", email: "joao@test.com", password: "secret123", permissions: [] });
    expect(result.success).toBe(false);
  });

  it("fails with invalid email", async () => {
    mockAuth.mockResolvedValue(adminSession);
    const result = await createUser({ name: "João", email: "not-email", password: "secret123", permissions: [] });
    expect(result.success).toBe(false);
  });

  it("fails with password shorter than 8 characters", async () => {
    mockAuth.mockResolvedValue(adminSession);
    const result = await createUser({ name: "João", email: "joao@test.com", password: "123", permissions: [] });
    expect(result.success).toBe(false);
  });

  it("fails with name too short", async () => {
    mockAuth.mockResolvedValue(adminSession);
    const result = await createUser({ name: "J", email: "joao@test.com", password: "secret123", permissions: [] });
    expect(result.success).toBe(false);
  });

  it("fails when email already exists", async () => {
    mockAuth.mockResolvedValue(adminSession);
    mockPrisma.user.findUnique.mockResolvedValue({ id: "existing" });
    const result = await createUser({ name: "João", email: "joao@test.com", password: "secret123", permissions: [] });
    expect(result.success).toBe(false);
    expect((result as any).error).toMatch(/e-mail/i);
  });

  it("creates user and hashes the password", async () => {
    mockAuth.mockResolvedValue(adminSession);
    const result = await createUser({
      name: "Ana Lima",
      email: "ana@test.com",
      password: "segura1234",
      permissions: ["MANAGED", "RESUMES"],
    });
    expect(result.success).toBe(true);
    expect(mockBcrypt.hash).toHaveBeenCalledWith("segura1234", 10);
    expect(mockPrisma.user.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          email: "ana@test.com",
          role: "ADMIN",
          password: "hashed-password",
          permissions: ["MANAGED", "RESUMES"],
        }),
      })
    );
  });
});

describe("updateUser", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockPrisma.user.update.mockResolvedValue({});
  });

  it("fails when not authenticated", async () => {
    mockAuth.mockResolvedValue(null);
    const result = await updateUser("user-1", { name: "Novo Nome" });
    expect(result.success).toBe(false);
  });

  it("hashes new password when provided", async () => {
    mockAuth.mockResolvedValue(adminSession);
    await updateUser("user-1", { password: "novaSenha123" });
    expect(mockBcrypt.hash).toHaveBeenCalledWith("novaSenha123", 10);
    const updateArgs = mockPrisma.user.update.mock.calls[0][0];
    expect(updateArgs.data.password).toBe("hashed-password");
  });

  it("updates permissions without touching password", async () => {
    mockAuth.mockResolvedValue(adminSession);
    await updateUser("user-1", { permissions: ["FINANCE"] });
    const updateArgs = mockPrisma.user.update.mock.calls[0][0];
    expect(updateArgs.data.password).toBeUndefined();
    expect(updateArgs.data.permissions).toEqual(["FINANCE"]);
  });

  it("returns success", async () => {
    mockAuth.mockResolvedValue(adminSession);
    const result = await updateUser("user-1", { name: "Nome Atualizado" });
    expect(result.success).toBe(true);
  });
});

describe("deleteUser", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockPrisma.user.findUnique.mockResolvedValue({ name: "Outro", email: "outro@test.com" });
    mockPrisma.user.delete.mockResolvedValue({});
  });

  it("fails when not authenticated", async () => {
    mockAuth.mockResolvedValue(null);
    const result = await deleteUser("user-2");
    expect(result.success).toBe(false);
  });

  it("prevents deleting own account", async () => {
    mockAuth.mockResolvedValue(adminSession);
    const result = await deleteUser("admin-1"); // same as session user id
    expect(result.success).toBe(false);
    expect((result as any).error).toMatch(/própria conta/i);
  });

  it("deletes another user and returns success", async () => {
    mockAuth.mockResolvedValue(adminSession);
    const result = await deleteUser("other-user-99");
    expect(result.success).toBe(true);
    expect(mockPrisma.user.delete).toHaveBeenCalledWith({ where: { id: "other-user-99" } });
  });
});

describe("getUsers", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockPrisma.user.findMany.mockResolvedValue([]);
  });

  it("returns empty array without USERS permission", async () => {
    mockAuth.mockResolvedValue(noUsersSession);
    const result = await getUsers();
    expect(result).toEqual([]);
  });

  it("returns users for admin with permission", async () => {
    mockAuth.mockResolvedValue(adminSession);
    mockPrisma.user.findMany.mockResolvedValue([{ id: "u1" }, { id: "u2" }]);
    const result = await getUsers();
    expect(result).toHaveLength(2);
  });
});
