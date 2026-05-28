import { describe, it, expect } from "vitest";
import { requireAdminPermission, ok, fail } from "@/lib/permissions";
import type { Session } from "next-auth";

function makeSession(role: string, permissions?: string[] | null): Session {
  return {
    user: { id: "u1", email: "a@b.com", role, permissions } as any,
    expires: "2099-01-01",
  };
}

describe("ok / fail helpers", () => {
  it("ok returns success:true", () => {
    expect(ok()).toEqual({ success: true });
  });

  it("fail returns success:false with the message", () => {
    expect(fail("ops")).toEqual({ success: false, error: "ops" });
  });
});

describe("requireAdminPermission", () => {
  it("returns error when session is null", () => {
    const result = requireAdminPermission(null, "MANAGED");
    expect(result).not.toBeNull();
    expect(result?.success).toBe(false);
  });

  it("returns error for non-ADMIN role", () => {
    const result = requireAdminPermission(makeSession("CANDIDATE"), "MANAGED");
    expect(result).not.toBeNull();
  });

  it("returns null (allowed) for ADMIN with null permissions (master)", () => {
    const result = requireAdminPermission(makeSession("ADMIN", null), "MANAGED");
    expect(result).toBeNull();
  });

  it("returns null (allowed) for ADMIN with undefined permissions (master)", () => {
    const result = requireAdminPermission(makeSession("ADMIN", undefined), "MANAGED");
    expect(result).toBeNull();
  });

  it("returns null when ADMIN has all 8 permissions (also master)", () => {
    const all = ["MANAGED","RESUMES","COMPANIES","PLACEMENTS","ANALYTICS","FINANCE","USERS","SETTINGS"];
    const result = requireAdminPermission(makeSession("ADMIN", all), "MANAGED");
    expect(result).toBeNull();
  });

  it("returns null when ADMIN has the specific permission", () => {
    const result = requireAdminPermission(makeSession("ADMIN", ["MANAGED", "RESUMES"]), "MANAGED");
    expect(result).toBeNull();
  });

  it("returns error when ADMIN lacks the specific permission", () => {
    const result = requireAdminPermission(makeSession("ADMIN", ["RESUMES"]), "MANAGED");
    expect(result).not.toBeNull();
    expect(result?.success).toBe(false);
    expect(result?.error).toMatch(/permissão/i);
  });

  it("returns error when ADMIN has empty permissions array", () => {
    const result = requireAdminPermission(makeSession("ADMIN", []), "FINANCE");
    expect(result).not.toBeNull();
    expect(result?.success).toBe(false);
  });

  it("checks each permission key independently", () => {
    const session = makeSession("ADMIN", ["FINANCE"]);
    expect(requireAdminPermission(session, "FINANCE")).toBeNull();
    expect(requireAdminPermission(session, "PLACEMENTS")).not.toBeNull();
    expect(requireAdminPermission(session, "USERS")).not.toBeNull();
  });
});
