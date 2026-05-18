"use server";

import { signIn, signOut } from "@/lib/auth";
import { AuthError } from "next-auth";
import { headers } from "next/headers";
import { checkRateLimit } from "@/lib/rate-limit";

export async function loginWithCredentials(formData: FormData) {
  const headersList = await headers();
  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0].trim() ??
    headersList.get("x-real-ip") ??
    "unknown";

  // 10 tentativas por IP a cada 15 minutos
  if (!checkRateLimit(`login:${ip}`, 10, 15 * 60 * 1000)) {
    return { error: "Muitas tentativas de login. Aguarde 15 minutos." };
  }

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/admin",
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
