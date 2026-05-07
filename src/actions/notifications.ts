"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function getNotifications() {
  const session = await auth();
  if (!session) return [];

  // Trigger check in background (not awaiting to avoid blocking)
  if ((session.user as any).role === "ADMIN") {
    checkTrialExpirations();
  }

  return prisma.notification.findMany({
    where: {
      OR: [
        { userId: session.user.id },
        { userId: null } // Notificações globais para admins
      ]
    },
    orderBy: { createdAt: "desc" },
    take: 10
  });
}

export async function markAsRead(id: string) {
  const session = await auth();
  if (!session) return;

  await prisma.notification.update({
    where: { id },
    data: { isRead: true }
  });
  revalidatePath("/admin");
}

export async function createNotification(data: {
  title: string;
  message: string;
  type?: string;
  userId?: string;
}) {
  await prisma.notification.create({
    data: {
      title: data.title,
      message: data.message,
      type: data.type || "INFO",
      userId: data.userId
    }
  });
  revalidatePath("/admin");
}

export async function checkTrialExpirations() {
  const session = await auth();
  if (!session || (session.user as any).role !== "ADMIN") return;

  const sevenDaysFromNow = new Date();
  sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);

  const expiringTrials = await prisma.placement.findMany({
    where: {
      status: "TRIAL",
      trialEndDate: {
        lte: sevenDaysFromNow,
        gt: new Date() // Ainda não venceu
      }
    },
    include: {
      application: {
        include: {
          candidate: { select: { name: true } },
          job: { select: { company: { select: { name: true } } } }
        }
      }
    }
  });

  for (const trial of expiringTrials) {
    const title = "Andamento Vencendo";
    const message = `O período de andamento de ${trial.application.candidate.name} na ${trial.application.job.company.name} vence em ${trial.trialEndDate.toLocaleDateString()}.`;

    // Evitar spam: checar se já notificamos sobre este trial nas últimas 48h
    const recent = await prisma.notification.findFirst({
      where: {
        title,
        message,
        createdAt: { gte: new Date(Date.now() - 48 * 60 * 60 * 1000) }
      }
    });

    if (!recent) {
      await createNotification({
        title,
        message,
        type: "WARNING"
      });
    }
  }
}
