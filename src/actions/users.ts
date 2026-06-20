"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { logAction } from "@/lib/audit";
import { requireAdminPermission, ok, fail } from "@/lib/permissions";
import bcrypt from "bcryptjs";
import { z } from "zod";

const createUserSchema = z.object({
  name: z.string().min(2, "Nome muito curto"),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(8, "Senha mínima de 8 caracteres"),
  permissions: z.array(z.string()).default([]),
});

const updateUserSchema = z.object({
  name: z.string().min(2, "Nome muito curto").optional(),
  email: z.string().email("E-mail inválido").optional(),
  password: z.string().min(8, "Senha mínima de 8 caracteres").optional(),
  permissions: z.array(z.string()).optional(),
});

export async function createUser(data: z.infer<typeof createUserSchema>) {
  const session = await auth();
  const permError = requireAdminPermission(session, "USERS");
  if (permError) return permError;

  const validated = createUserSchema.safeParse(data);
  if (!validated.success) return fail(validated.error.issues[0].message);

  const { name, email, password, permissions } = validated.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return fail("Já existe um usuário com este e-mail.");

  try {
    const passwordHash = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        name,
        email,
        password: passwordHash,
        role: "ADMIN",
        permissions,
      },
    });

    await logAction(
      "CREATE_USER",
      `Criou administrador ${name} (${email}) — permissões: ${permissions.join(", ")}`,
      undefined,
      session?.user?.id
    );
    revalidatePath("/admin/users");
    return ok();
  } catch {
    return fail("Erro interno ao criar usuário.");
  }
}

export async function updateUser(id: string, data: z.infer<typeof updateUserSchema>) {
  const session = await auth();
  const permError = requireAdminPermission(session, "USERS");
  if (permError) return permError;

  const validated = updateUserSchema.safeParse(data);
  if (!validated.success) return fail(validated.error.issues[0].message);

  const { name, email, password, permissions } = validated.data;

  try {
    const updateData: any = {
      ...(name && { name }),
      ...(email && { email }),
      ...(permissions && { permissions }),
    };

    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    await prisma.user.update({ where: { id }, data: updateData });

    await logAction("UPDATE_USER", `Atualizou o usuário ${name || id}`, undefined, session?.user?.id);
    revalidatePath("/admin/users");
    return ok();
  } catch {
    return fail("Erro ao atualizar usuário.");
  }
}

export async function getUsers() {
  const session = await auth();
  const permError = requireAdminPermission(session, "USERS");
  if (permError) return [];

  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      permissions: true,
      createdAt: true,
      company: { select: { name: true } },
    },
    orderBy: { createdAt: "asc" },
  });
}

export async function deleteUser(userId: string) {
  const session = await auth();
  const permError = requireAdminPermission(session, "USERS");
  if (permError) return permError;

  if (session!.user?.id === userId) {
    return fail("Não é possível excluir sua própria conta.");
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { name: true, email: true },
    });
    await prisma.user.update({
      where: { id: userId },
      data: { deletedAt: new Date() },
    });

    await logAction("DELETE_USER", `Excluiu o usuário ${user?.name || user?.email} (${userId})`, {
      before: { userId, name: user?.name, email: user?.email },
      after: { deletedAt: new Date() },
    }, session?.user?.id);
    revalidatePath("/admin/users");
    return ok();
  } catch {
    return fail("Erro ao excluir usuário.");
  }
}
