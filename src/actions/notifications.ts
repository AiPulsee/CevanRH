"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function getNotifications() {
  const session = await auth();
  if (!session) return [];

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
