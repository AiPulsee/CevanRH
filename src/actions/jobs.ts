"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { JobType, JobStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const createJobSchema = z.object({
  title: z.string().min(5, "Título muito curto"),
  description: z.string().min(20, "Descrição precisa ser mais detalhada"),
  location: z.string().min(2, "Localização obrigatória"),
  isRemote: z.boolean().default(false),
  salaryRange: z.string().optional(),
  type: z.nativeEnum(JobType),
});

export type CreateJobState = {
  success?: boolean;
  error?: string;
};

export async function createJob(prevState: any, formData: FormData): Promise<CreateJobState> {
  const session = await auth();

  if (!session || (session.user.role !== "ADMIN" && session.user.role !== "EMPLOYER")) {
    return { error: "Não autorizado." };
  }

  if (session.user.role === "EMPLOYER" && !session.user.companyId) {
    return { error: "Sua conta não está vinculada a nenhuma empresa." };
  }

  const validatedFields = createJobSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    location: formData.get("location"),
    isRemote: formData.get("isRemote") === "true",
    salaryRange: formData.get("salaryRange"),
    type: formData.get("type"),
  });

  if (!validatedFields.success) {
    return { error: "Dados inválidos. Verifique os campos." };
  }

  const { title, description, location, isRemote, salaryRange, type } = validatedFields.data;

  try {
    const slug = `${title.toLowerCase().replace(/ /g, "-")}-${Math.random().toString(36).substring(2, 7)}`;

    await prisma.job.create({
      data: {
        title,
        slug,
        description,
        location,
        isRemote,
        salaryRange,
        type,
        status: JobStatus.ACTIVE,
        companyId: session.user.companyId!, 
      },
    });

    revalidatePath("/jobs");
    revalidatePath("/dashboard/jobs");

    return { success: true };
  } catch (err) {
    console.error(err);
    return { error: "Erro interno ao criar vaga." };
  }
}
