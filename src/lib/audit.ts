import { prisma } from "./prisma";

export async function logAction(
  action: string,
  details?: string,
  context?: { before?: unknown; after?: unknown },
  userId?: string
) {
  try {
    await prisma.auditLog.create({
      data: {
        action,
        details,
        userId: userId ?? null,
        ...(context?.before !== undefined && { before: context.before as any }),
        ...(context?.after !== undefined && { after: context.after as any }),
      },
    });
  } catch (error) {
    console.error("Failed to log action:", error);
  }
}
