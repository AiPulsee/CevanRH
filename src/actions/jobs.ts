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
  type: z.nativeEnum(JobType).default(JobType.MANAGED),
  requirements: z.string().optional(),
  responsibilities: z.string().optional(),
  benefits: z.string().optional(),
  tips: z.string().optional(),
});

export type CreateJobState = {
  success?: boolean;
  error?: string;
};

export async function createJob(prevState: unknown, formData: FormData): Promise<CreateJobState> {
  const session = await auth();
  const user = session?.user as { role: string; companyId?: string } | null | undefined;

  if (!session || !user || (user.role !== "ADMIN" && user.role !== "EMPLOYER")) {
    return { error: "Não autorizado." };
  }

  if (user.role === "EMPLOYER" && !user.companyId) {
    return { error: "Sua conta não está vinculada a nenhuma empresa." };
  }

  const validatedFields = createJobSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    location: formData.get("location"),
    isRemote: formData.get("isRemote") === "true",
    salaryRange: formData.get("salaryRange"),
    type: formData.get("type") || JobType.MANAGED,
    requirements: formData.get("requirements"),
    responsibilities: formData.get("responsibilities"),
    benefits: formData.get("benefits"),
    tips: formData.get("tips"),
  });

  if (!validatedFields.success) {
    return { error: "Dados inválidos. Verifique os campos." };
  }

  const { title, description, location, isRemote, salaryRange, type, requirements, responsibilities, benefits, tips } = validatedFields.data;

  const targetCompanyId = session.user.role === "ADMIN" 
    ? (formData.get("companyId") as string || session.user.companyId)
    : session.user.companyId;

  if (!targetCompanyId) {
    return { error: "ID da empresa não fornecido ou não autorizado." };
  }

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
        requirements,
        responsibilities,
        benefits,
        tips,
        status: JobStatus.ACTIVE,
        companyId: targetCompanyId, 
      },
    });

    revalidatePath("/jobs");
    revalidatePath("/admin");
    revalidatePath("/admin/managed");
    revalidatePath("/dashboard/jobs");

    return { success: true };
  } catch (err) {
    console.error(err);
    return { error: "Erro interno ao criar vaga." };
  }
}
