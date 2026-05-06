import { prisma } from "./prisma";
import { auth } from "./auth";

export async function logAction(action: string, details?: string) {
  try {
    const session = await auth();
    await prisma.auditLog.create({
      data: {
        action,
        details,
        userId: session?.user?.id,
      },
    });
  } catch (error) {
    console.error("Failed to log action:", error);
  }
}
