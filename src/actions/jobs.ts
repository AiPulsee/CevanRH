"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { JobType, JobStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireAdminPermission, ok, fail } from "@/lib/permissions";
import { logAction } from "@/lib/audit";
import { v4 as uuidv4 } from "uuid";

function toSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Mn}/gu, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 60);
}

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
  openings: z.coerce.number().int().min(1).default(1),
  feeType: z.enum(["percentage", "fixed"]).optional(),
  feePercentage: z.coerce.number().min(0).max(100).optional(),
  feeFixed: z.coerce.number().min(0).optional(),
  trialDays: z.coerce.number().int().min(1).max(365).optional(),
});

const updateJobSchema = z.object({
  title: z.string().min(5, "Título muito curto"),
  description: z.string().min(20, "Descrição precisa ser mais detalhada"),
  location: z.string().min(2, "Localização obrigatória"),
  isRemote: z.boolean(),
  salaryRange: z.string().nullish(),
  requirements: z.string().nullish(),
  responsibilities: z.string().nullish(),
  benefits: z.string().nullish(),
  tips: z.string().nullish(),
  contractType: z.string().nullish(),
  experienceLevel: z.string().nullish(),
  status: z.nativeEnum(JobStatus),
  openings: z.number().int().min(1).optional(),
  feeType: z.enum(["percentage", "fixed"]).nullish(),
  feePercentage: z.number().min(0).max(100).nullish(),
  feeFixed: z.number().min(0).nullish(),
  trialDays: z.number().int().min(1).max(365).nullish(),
});

export type CreateJobState = {
  success?: boolean;
  error?: string;
};

export async function createJob(prevState: unknown, formData: FormData): Promise<CreateJobState> {
  const session = await auth();
  const user = session?.user as { role: string; companyId?: string } | null | undefined;

  if (!session || !user || (user.role !== "ADMIN" && user.role !== "EMPLOYER")) {
    return fail("Não autorizado.");
  }

  if (user.role === "ADMIN") {
    const permError = requireAdminPermission(session, "MANAGED");
    if (permError) return permError;
  }

  if (user.role === "EMPLOYER" && !user.companyId) {
    return fail("Sua conta não está vinculada a nenhuma empresa.");
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
    openings: formData.get("openings") || 1,
    feeType: formData.get("feeType") || undefined,
    feePercentage: formData.get("feePercentage") || undefined,
    feeFixed: formData.get("feeFixed") || undefined,
    trialDays: formData.get("trialDays") || undefined,
  });

  if (!validatedFields.success) {
    return fail("Dados inválidos. Verifique os campos.");
  }

  const {
    title, description, location, isRemote, salaryRange, type,
    requirements, responsibilities, benefits, tips, contractType, experienceLevel, openings,
    feeType, feePercentage, feeFixed, trialDays,
  } = validatedFields.data;

  const targetCompanyId =
    user.role === "ADMIN"
      ? (formData.get("companyId") as string || user.companyId)
      : user.companyId;

  if (!targetCompanyId) {
    return fail("ID da empresa não fornecido ou não autorizado.");
  }

  const companyExists = await prisma.company.findFirst({
    where: { id: targetCompanyId },
    select: { id: true },
  });
  if (!companyExists) {
    return fail("Empresa não encontrada.");
  }

  try {
    const slug = `${toSlug(title)}-${uuidv4().slice(0, 8)}`;

    await prisma.job.create({
      data: {
        title, slug, description, location, isRemote, salaryRange, type,
        requirements, responsibilities, benefits, tips, contractType, experienceLevel,
        openings,
        feeType: feeType ?? null,
        feePercentage: feeType === "percentage" ? (feePercentage ?? null) : null,
        feeFixed: feeType === "fixed" ? (feeFixed ? Math.round(feeFixed * 100) : null) : null,
        trialDays: trialDays ?? null,
        status: JobStatus.ACTIVE,
        companyId: targetCompanyId,
      } as any,
    });

    revalidatePath("/jobs");
    revalidatePath("/admin");
    revalidatePath("/admin/managed");
    revalidatePath("/dashboard/jobs");

    return ok();
  } catch (err) {
    console.error(err);
    return fail("Erro interno ao criar vaga.");
  }
}

export async function updateJob(jobId: string, data: unknown) {
  const session = await auth();
  const permError = requireAdminPermission(session, "MANAGED");
  if (permError) return permError;

  const validated = updateJobSchema.safeParse(data);
  if (!validated.success) {
    return fail("Dados inválidos. Verifique os campos.");
  }

  try {
    await prisma.job.update({ where: { id: jobId }, data: validated.data });
    revalidatePath("/admin/managed");
    revalidatePath("/admin");
    return ok();
  } catch (err) {
    console.error(err);
    return fail("Erro interno ao atualizar vaga.");
  }
}

export async function markEntryFeePaid(jobId: string, amount?: number) {
  const session = await auth();
  const permError = requireAdminPermission(session, "FINANCE");
  if (permError) return permError;

  try {
    await prisma.$transaction(async (tx) => {
      await tx.job.update({
        where: { id: jobId },
        data: {
          entryFeeStatus: "PAID",
          entryFeePaidAt: new Date(),
          ...(amount != null ? { entryFeeAmount: amount } : {}),
        } as any,
      });

      // Se já existe comissão PENDING para esta vaga, marca como PAID imediatamente
      const pendingCommission = await tx.commission.findFirst({
        where: {
          status: "PENDING",
          placement: { application: { jobId } },
        },
      });
      if (pendingCommission) {
        await tx.commission.update({
          where: { id: pendingCommission.id },
          data: { status: "PAID", paidAt: new Date() },
        });
      }
    });

    await logAction("ENTRY_FEE_PAID", `Pagamento de entrada recebido para vaga ${jobId}`, {
      after: { jobId, entryFeeStatus: "PAID", amount },
    }, session?.user?.id);
    revalidatePath("/admin/managed");
    revalidatePath("/admin/finance");
    revalidatePath("/admin");
    return ok();
  } catch (err) {
    console.error(err);
    return fail("Erro ao registrar pagamento de entrada.");
  }
}

export async function waiveEntryFee(jobId: string) {
  const session = await auth();
  const permError = requireAdminPermission(session, "FINANCE");
  if (permError) return permError;

  try {
    await prisma.job.update({
      where: { id: jobId },
      data: { entryFeeStatus: "WAIVED" } as any,
    });

    await logAction("ENTRY_FEE_WAIVED", `Taxa de entrada dispensada para vaga ${jobId}`, {
      after: { jobId, entryFeeStatus: "WAIVED" },
    }, session?.user?.id);
    revalidatePath("/admin/managed");
    revalidatePath("/admin");
    return ok();
  } catch (err) {
    console.error(err);
    return fail("Erro ao dispensar taxa de entrada.");
  }
}

export async function deleteJob(jobId: string) {
  const session = await auth();
  const permError = requireAdminPermission(session, "MANAGED");
  if (permError) return permError;

  try {
    const now = new Date();
    await prisma.job.update({
      where: { id: jobId },
      data: { deletedAt: now },
    });

    await logAction("DELETE_JOB", `Excluiu vaga ${jobId}`, {
      after: { jobId, deletedAt: now },
    }, session?.user?.id);

    revalidatePath("/admin/managed");
    revalidatePath("/admin");
    revalidatePath("/jobs");
    return ok();
  } catch (err) {
    console.error(err);
    return fail("Erro interno ao excluir vaga.");
  }
}
