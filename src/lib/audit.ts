import { prisma } from "./prisma";
import { auth } from "./auth";

export async function logAction(
  action: string,
  details?: string,
  context?: { before?: unknown; after?: unknown }
) {
  try {
    const session = await auth();
    await prisma.auditLog.create({
      data: {
        action,
        details,
        userId: session?.user?.id,
        ...(context?.before !== undefined && { before: context.before as any }),
        ...(context?.after !== undefined && { after: context.after as any }),
      },
    });
  } catch (error) {
    console.error("Failed to log action:", error);
  }
}
