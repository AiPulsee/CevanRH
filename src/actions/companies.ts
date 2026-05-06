"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const createCompanySchema = z.object({
  name: z.string().min(2, "Nome muito curto"),
  email: z.string().email("E-mail inválido").optional().or(z.literal("")),
  description: z.string().optional(),
  industry: z.string().optional(),
  location: z.string().optional(),
});

export async function createCompany(prevState: unknown, formData: FormData) {
  const session = await auth();
  const userRole = session?.user ? (session.user as { role: string }).role : null;

  if (!session || userRole !== "ADMIN") {
    return { error: "Não autorizado." };
  }

  const validatedFields = createCompanySchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    description: formData.get("description"),
    industry: formData.get("industry"),
    location: formData.get("location"),
  });

  if (!validatedFields.success) {
    return { error: "Dados inválidos." };
  }

  const { name, email, description, industry, location } = validatedFields.data;
  const slug = name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "") + "-" + Math.random().toString(36).substring(2, 7);

  try {
    await prisma.company.create({
      data: {
        name,
        slug,
        email: email || null,
        description,
        industry,
        location,
      },
    });

    revalidatePath("/admin/companies");
    return { success: true };
  } catch (err) {
    console.error(err);
    return { error: "Erro interno ao criar empresa." };
  }
}

export async function updateCompany(
  companyId: string,
  data: { name: string; email?: string | null; description?: string; industry?: string; location?: string }
) {
  const session = await auth();
  const userRole = session?.user ? (session.user as { role: string }).role : null;
  if (!session || userRole !== "ADMIN") return { error: "Não autorizado." };

  try {
    await prisma.company.update({ where: { id: companyId }, data });
    revalidatePath("/admin/companies");
    return { success: true };
  } catch (err) {
    console.error(err);
    return { error: "Erro interno ao atualizar empresa." };
  }
}

export async function deleteCompany(companyId: string) {
  const session = await auth();
  const userRole = session?.user ? (session.user as { role: string }).role : null;
  if (!session || userRole !== "ADMIN") return { error: "Não autorizado." };

  try {
    await prisma.company.delete({ where: { id: companyId } });
    revalidatePath("/admin/companies");
    return { success: true };
  } catch (err) {
    console.error(err);
    return { error: "Erro interno ao excluir empresa." };
  }
}
