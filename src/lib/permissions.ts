import type { Session } from "next-auth";

const ALL_PERMISSION_KEYS = [
  "MANAGED",
  "RESUMES",
  "COMPANIES",
  "PLACEMENTS",
  "ANALYTICS",
  "FINANCE",
  "USERS",
  "SETTINGS",
] as const;

export type AdminPermission = (typeof ALL_PERMISSION_KEYS)[number];

function isMaster(permissions: string[] | null | undefined): boolean {
  return (
    permissions === null ||
    permissions === undefined ||
    ALL_PERMISSION_KEYS.every((k) => permissions.includes(k))
  );
}

export type ActionSuccess = { success: true };
export type ActionError = { success: false; error: string };
export type ActionResult = ActionSuccess | ActionError;

export const ok = (): ActionSuccess => ({ success: true });
export const fail = (error: string): ActionError => ({ success: false, error });

export function requireAdminPermission(
  session: Session | null,
  permission: AdminPermission
): ActionError | null {
  if (!session?.user) return fail("Não autorizado.");
  const user = session.user as { role?: string; permissions?: string[] | null };
  if (user.role !== "ADMIN") return fail("Não autorizado.");
  if (isMaster(user.permissions)) return null;
  if (Array.isArray(user.permissions) && user.permissions.includes(permission)) return null;
  return fail("Sem permissão para esta operação.");
}
