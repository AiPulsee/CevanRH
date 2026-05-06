"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PlanType } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const createCompanySchema = z.object({
  name: z.string().min(2, "Nome muito curto"),
  email: z.string().email("E-mail inválido").optional().or(z.literal("")),
  plan: z.nativeEnum(PlanType),
  description: z.string().optional(),
  industry: z.string().optional(),
  location: z.string().optional(),
});

export async function createCompany(prevState: any, formData: FormData) {
  const session = await auth();

  if (!session || session.user.role !== "ADMIN") {
    return { error: "Não autorizado." };
  }

  const validatedFields = createCompanySchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    plan: formData.get("plan"),
    description: formData.get("description"),
    industry: formData.get("industry"),
    location: formData.get("location"),
  });

  if (!validatedFields.success) {
    return { error: "Dados inválidos." };
  }

  const { name, email, plan, description, industry, location } = validatedFields.data;
  const slug = name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "") + "-" + Math.random().toString(36).substring(2, 7);

  try {
    await prisma.company.create({
      data: {
        name,
        slug,
        email: email || null,
        plan,
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
