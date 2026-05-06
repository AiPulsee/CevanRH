"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { logAction } from "@/lib/audit";
import bcrypt from "bcryptjs";
import { z } from "zod";

const createUserSchema = z.object({
  name: z.string().min(2, "Nome muito curto"),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Senha mínima de 6 caracteres"),
  role: z.enum(["ADMIN", "EMPLOYER", "CANDIDATE"]),
  companyId: z.string().optional(),
});

export async function createUser(data: {
  name: string;
  email: string;
  password: string;
  role: string;
  companyId?: string;
}) {
  const session = await auth();
  const userRole = session?.user ? (session.user as { role: string }).role : null;
  if (!session || userRole !== "ADMIN") return { error: "Não autorizado." };

  const validated = createUserSchema.safeParse(data);
  if (!validated.success) return { error: validated.error.issues[0].message };

  const { name, email, password, role, companyId } = validated.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return { error: "Já existe um usuário com este e-mail." };

  try {
    const passwordHash = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        name,
        email,
        password: passwordHash,
        role: role as "ADMIN" | "EMPLOYER" | "CANDIDATE",
        companyId: role === "EMPLOYER" && companyId ? companyId : null,
      },
    });

    await logAction("CREATE_USER", `Criou o usuário ${name} (${email}) com perfil ${role}`);
    revalidatePath("/admin/users");
    return { success: true };
  } catch {
    return { error: "Erro interno ao criar usuário." };
  }
}

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
