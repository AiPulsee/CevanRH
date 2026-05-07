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
  contractType: z.string().optional(),
  experienceLevel: z.string().optional(),
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
    contractType: formData.get("contractType"),
    experienceLevel: formData.get("experienceLevel"),
  });

  if (!validatedFields.success) {
    return { error: "Dados inválidos. Verifique os campos." };
  }

  const { title, description, location, isRemote, salaryRange, type, requirements, responsibilities, benefits, tips, contractType, experienceLevel } = validatedFields.data;

  const targetCompanyId = session.user.role === "ADMIN" 
    ? (formData.get("companyId") as string || session.user.companyId)
    : session.user.companyId;

  if (!targetCompanyId) {
    return { error: "ID da empresa não fornecido ou não autorizado." };
  }

  const companyExists = await prisma.company.findUnique({ where: { id: targetCompanyId }, select: { id: true } });
  if (!companyExists) {
    return { error: "Empresa não encontrada." };
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
        contractType,
        experienceLevel,
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

export async function updateJob(
  jobId: string,
  data: {
    title: string;
    description: string;
    location: string;
    isRemote: boolean;
    salaryRange?: string;
    requirements?: string;
    responsibilities?: string;
    benefits?: string;
    tips?: string;
    status: JobStatus;
  }
) {
  const session = await auth();
  const userRole = session?.user ? (session.user as { role: string }).role : null;
  if (!session || userRole !== "ADMIN") return { error: "Não autorizado." };

  try {
    await prisma.job.update({ where: { id: jobId }, data });
    revalidatePath("/admin/managed");
    revalidatePath("/admin");
    return { success: true };
  } catch (err) {
    console.error(err);
    return { error: "Erro interno ao atualizar vaga." };
  }
}

export async function deleteJob(jobId: string) {
  const session = await auth();
  const userRole = session?.user ? (session.user as { role: string }).role : null;
  if (!session || userRole !== "ADMIN") return { error: "Não autorizado." };

  try {
    await prisma.job.delete({ where: { id: jobId } });
    revalidatePath("/admin/managed");
    revalidatePath("/admin");
    return { success: true };
  } catch (err) {
    console.error(err);
    return { error: "Erro interno ao excluir vaga." };
  }
}
