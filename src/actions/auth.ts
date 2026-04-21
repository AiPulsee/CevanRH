"use server";

import { signIn, signOut } from "@/lib/auth";
import { AuthError } from "next-auth";
import { prisma } from "@/lib/prisma";

export async function loginWithCredentials(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // 1. Buscar o usuário primeiro para saber o redirecionamento
  const user = await prisma.user.findUnique({
    where: { email },
    select: { role: true }
  });

  let redirectTo = "/dashboard";
  if (user?.role === "ADMIN") redirectTo = "/admin";
  if (user?.role === "CANDIDATE") redirectTo = "/me";

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Credenciais inválidas." };
    }
    throw error;
  }
}

export async function logout() {
  await signOut({ redirectTo: "/login" });
}
