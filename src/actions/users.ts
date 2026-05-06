"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

import { logAction } from "@/lib/audit";

export async function getUsers() {
  const session = await auth();
  const userRole = session?.user ? (session.user as { role: string }).role : null;
  if (!session || userRole !== "ADMIN") return [];

  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      company: { select: { name: true } },
    },
    orderBy: { createdAt: "asc" },
  });
}

export async function deleteUser(userId: string) {
  const session = await auth();
  const userRole = session?.user ? (session.user as { role: string }).role : null;
  if (!session || userRole !== "ADMIN") {
    return { error: "Não autorizado." };
  }

  if (session.user?.id === userId) {
    return { error: "Não é possível excluir sua própria conta." };
  }

  try {
    const user = await prisma.user.findUnique({ where: { id: userId }, select: { name: true, email: true } });
    await prisma.user.delete({ where: { id: userId } });
    
    await logAction("DELETE_USER", `Excluiu o usuário ${user?.name || user?.email} (${userId})`);
    
    revalidatePath("/admin/users");
    return { success: true };
  } catch {
    return { error: "Erro ao excluir usuário." };
  }
}
