"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function getNotifications() {
  const session = await auth();
  if (!session) return [];

  return prisma.notification.findMany({
    where: {
      OR: [{ userId: session.user.id }, { userId: null }],
    },
    orderBy: { createdAt: "desc" },
    take: 10,
  });
}

export async function getAllNotifications(page = 1, pageSize = 20) {
  const session = await auth();
  if (!session) return { items: [], total: 0 };

  const where = {
    OR: [{ userId: session.user.id }, { userId: null }],
  };

  const [items, total] = await Promise.all([
    prisma.notification.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.notification.count({ where }),
  ]);

  return { items, total };
}

export async function markAllAsRead() {
  const session = await auth();
  if (!session) return;

  await prisma.notification.updateMany({
    where: {
      isRead: false,
      OR: [{ userId: session.user.id }, { userId: null }],
    },
    data: { isRead: true },
  });
  revalidatePath("/admin/notifications");
  revalidatePath("/admin");
}

export async function markAsRead(id: string) {
  const session = await auth();
  if (!session) return;

  // Garante que o usuário só pode marcar notificações próprias ou globais como lidas
  await prisma.notification.updateMany({
    where: {
      id,
      OR: [{ userId: session.user?.id }, { userId: null }],
    },
    data: { isRead: true },
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
  const cutoff48h = new Date(Date.now() - 48 * 60 * 60 * 1000);

  // Fetch expiring trials and recent notifications in parallel
  const [expiringTrials, recentNotifications] = await Promise.all([
    prisma.placement.findMany({
      where: { status: "TRIAL", trialEndDate: { lte: sevenDaysFromNow, gt: new Date() } },
      select: {
        trialEndDate: true,
        application: {
          select: {
            candidate: { select: { name: true } },
            job: { select: { company: { select: { name: true } } } },
          },
        },
      },
    }),
    // One query to get all recent trial notifications — replaces N findFirst queries
    prisma.notification.findMany({
      where: { title: "Andamento Vencendo", createdAt: { gte: cutoff48h } },
      select: { message: true },
    }),
  ]);

  const recentMessages = new Set(recentNotifications.map((n) => n.message));

  for (const trial of expiringTrials) {
    const message = `O período de andamento de ${trial.application.candidate.name} na ${trial.application.job?.company.name ?? "empresa"} vence em ${trial.trialEndDate.toLocaleDateString()}.`;
    if (!recentMessages.has(message)) {
      await createNotification({ title: "Andamento Vencendo", message, type: "WARNING" });
      recentMessages.add(message);
    }
  }
}
