"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PlacementStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { requireAdminPermission, ok, fail } from "@/lib/permissions";
import { logAction } from "@/lib/audit";

async function resolveFeeAndTrial(job: {
  feeType?: string | null;
  feePercentage?: number | null;
  feeFixed?: number | null;
  trialDays?: number | null;
} | null, monthlySalary: number) {
  const trialDays = job?.trialDays ?? 90;

  if (job?.feeType) {
    const isFixed = job.feeType === "fixed";
    const feePercentage = isFixed ? 0 : (job.feePercentage ?? 50);
    const commissionAmount = isFixed
      ? (job.feeFixed ?? 0)
      : Math.round((monthlySalary * feePercentage) / 100);
    return { trialDays, feePercentage, commissionAmount };
  }

  // Fallbacks Se a vaga não tiver nada configurado
  const isFixed = false;
  const feePercentage = 50;
  const commissionAmount = Math.round((monthlySalary * feePercentage) / 100);

  return { trialDays, feePercentage, commissionAmount };
}

export async function createPlacement(data: {
  applicationId: string;
  monthlySalary: number;
  startDate: string;
}) {
  const session = await auth();
  const permError = requireAdminPermission(session, "PLACEMENTS");
  if (permError) return permError;

  try {
    const application = await prisma.application.findUnique({
      where: { id: data.applicationId },
      include: { job: true, placement: true },
    });

    if (!application) return fail("Candidatura não encontrada.");
    if (application.status !== "HIRED") return fail("Candidato precisa ter status HIRED.");
    if (application.placement) return fail("Esta candidatura já possui uma alocação.");

    const { feePercentage, commissionAmount, trialDays } = await resolveFeeAndTrial(
      application.job as any,
      data.monthlySalary
    );
    const start = new Date(data.startDate);
    const trialEnd = new Date(start);
    trialEnd.setDate(trialEnd.getDate() + trialDays);

    await prisma.$transaction(async (tx) => {
      const placement = await tx.placement.create({
        data: {
          applicationId: data.applicationId,
          monthlySalary: data.monthlySalary,
          startDate: start,
          trialEndDate: trialEnd,
          status: PlacementStatus.TRIAL,
        },
      });

      if (application.job?.companyId) {
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 30);
        await tx.commission.create({
          data: {
            placementId: placement.id,
            baseSalary: data.monthlySalary,
            percentage: feePercentage,
            amount: commissionAmount,
            status: "PENDING",
            dueDate,
            companyId: application.job.companyId,
          },
        });
      }
    });

    await logAction("CREATE_PLACEMENT", `Criou alocação para candidatura ${data.applicationId}`, {
      after: { applicationId: data.applicationId, monthlySalary: data.monthlySalary, startDate: start, trialEndDate: trialEnd, feePercentage, commissionAmount },
    }, session?.user?.id);
    revalidatePath("/admin/placements");
    revalidatePath("/admin/finance");
    revalidatePath("/admin");
    revalidatePath("/dashboard/placements");

    return ok();
  } catch (err) {
    console.error(err);
    return fail("Erro interno ao criar alocação.");
  }
}

export async function confirmEffective(placementId: string) {
  const session = await auth();
  if (!session) return fail("Não autorizado.");

  const user = session.user as { role: string; companyId?: string };
  const role = user.role;

  if (role !== "ADMIN" && role !== "EMPLOYER") {
    return fail("Não autorizado.");
  }

  if (role === "ADMIN") {
    const permError = requireAdminPermission(session, "PLACEMENTS");
    if (permError) return permError;
  }

  try {
    const placement = await prisma.placement.findUnique({
      where: { id: placementId },
      include: { application: { include: { job: { select: { id: true, companyId: true, openings: true } } } } },
    });

    if (!placement) return fail("Alocação não encontrada.");
    if (placement.status !== PlacementStatus.TRIAL) {
      return fail("Alocação não está em período de experiência.");
    }

    if (role === "EMPLOYER") {
      const companyId = (session.user as any).companyId;
      if (placement.application.job?.companyId !== companyId) {
        return fail("Não autorizado.");
      }
    }

    const now = new Date();
    const jobId = placement.application.job?.id ?? null;
    const jobOpenings = (placement.application.job as any)?.openings ?? 1;

    await prisma.$transaction(async (tx) => {
      await tx.placement.update({
        where: { id: placementId },
        data: { status: PlacementStatus.EFFECTIVE, effectiveDate: now },
      });

      // Reopen job if there are still unfilled openings
      if (jobId) {
        const effectiveCount = await tx.placement.count({
          where: { status: PlacementStatus.EFFECTIVE, application: { jobId } },
        });
        if (effectiveCount < jobOpenings) {
          await tx.job.update({ where: { id: jobId }, data: { status: "ACTIVE" } });
        }
      }
    });

    await logAction("CONFIRM_EFFECTIVE", `Confirmou efetivação da alocação ${placementId}`, {
      before: { placementId, status: "TRIAL" },
      after: { placementId, status: "EFFECTIVE", effectiveDate: now },
    }, session?.user?.id);
    revalidatePath("/admin/placements");
    revalidatePath("/admin/managed");
    revalidatePath("/admin/finance");
    revalidatePath("/admin");
    revalidatePath("/dashboard/placements");

    return ok();
  } catch (err) {
    console.error(err);
    return fail("Erro interno ao confirmar efetivação.");
  }
}

export async function terminatePlacement(placementId: string, reason?: string) {
  const session = await auth();
  if (!session) return fail("Não autorizado.");

  const user = session.user as { role: string; companyId?: string };
  const role = user.role;

  if (role !== "ADMIN" && role !== "EMPLOYER") {
    return fail("Não autorizado.");
  }

  if (role === "ADMIN") {
    const permError = requireAdminPermission(session, "PLACEMENTS");
    if (permError) return permError;
  }

  try {
    const placement = await prisma.placement.findUnique({
      where: { id: placementId },
      include: { application: { include: { job: true } } },
    });

    if (!placement) return fail("Alocação não encontrada.");
    if (placement.status !== PlacementStatus.TRIAL) {
      return fail("Somente alocações em período de experiência podem ser encerradas.");
    }

    if (role === "EMPLOYER") {
      const companyId = (session.user as any).companyId;
      if (placement.application.job?.companyId !== companyId) {
        return fail("Não autorizado.");
      }
    }

    const entryFeeStatus = (placement.application.job as any)?.entryFeeStatus ?? "AWAITING";

    const jobId = placement.application.job?.id;
    const jobOpenings = placement.application.job?.openings ?? 1;

    await prisma.$transaction(async (tx) => {
      await tx.placement.update({
        where: { id: placementId },
        data: {
          status: PlacementStatus.TERMINATED,
          terminationDate: new Date(),
          terminationReason: reason || "Não efetivado pela empresa.",
        },
      });

      if (entryFeeStatus === "PAID") {
        // Empresa já pagou adiantado: PENDING e INVOICED viram PAID (recebido)
        await tx.commission.updateMany({
          where: { placementId, status: { in: ["PENDING", "INVOICED"] } },
          data: { status: "PAID", paidAt: new Date() },
        });
      } else {
        // Experiência falhou sem pagamento: dispensa PENDING e INVOICED
        await tx.commission.updateMany({
          where: { placementId, status: { in: ["PENDING", "INVOICED"] } },
          data: { status: "WAIVED" },
        });
      }

      if (jobId) {
        // Só reabre a vaga se ainda há openings não preenchidos
        const effectiveCount = await tx.placement.count({
          where: { status: PlacementStatus.EFFECTIVE, application: { jobId } },
        });
        if (effectiveCount < jobOpenings) {
          await tx.job.update({ where: { id: jobId }, data: { status: "ACTIVE" } });
        }
      }
    });

    await logAction("TERMINATE_PLACEMENT", `Encerrou alocação ${placementId}`, {
      before: { placementId, status: "TRIAL" },
      after: { placementId, status: "TERMINATED", terminationReason: reason || "Não efetivado pela empresa." },
    }, session?.user?.id);
    revalidatePath("/admin/placements");
    revalidatePath("/admin/managed");
    revalidatePath("/admin");
    revalidatePath("/dashboard/placements");

    return ok();
  } catch (err) {
    console.error(err);
    return fail("Erro interno ao encerrar alocação.");
  }
}

export async function hireAndPlace(data: {
  applicationId: string;
  monthlySalary: number;
  startDate: string;
}) {
  const session = await auth();
  const permError = requireAdminPermission(session, "PLACEMENTS");
  if (permError) return permError;

  try {
    const jobForFee = await prisma.application.findUnique({
      where: { id: data.applicationId },
      select: { job: { select: { feeType: true, feePercentage: true, feeFixed: true, trialDays: true } as any } },
    });
    const { feePercentage, commissionAmount, trialDays } = await resolveFeeAndTrial(
      (jobForFee?.job as any) ?? null,
      data.monthlySalary
    );

    const start = new Date(data.startDate);
    const trialEnd = new Date(start);
    trialEnd.setDate(trialEnd.getDate() + trialDays);

    await prisma.$transaction(async (tx) => {
      // Get application to resolve jobId and companyId
      const application = await tx.application.findUnique({
        where: { id: data.applicationId },
        select: { jobId: true, job: { select: { companyId: true, entryFeeStatus: true } } },
      });
      if (!application) throw new Error("Candidatura não encontrada.");

      const existingPlacement = await tx.placement.findUnique({
        where: { applicationId: data.applicationId },
      });
      if (existingPlacement) throw new Error("Alocação já existe para esta candidatura.");

      await tx.application.update({
        where: { id: data.applicationId },
        data: { status: "HIRED" },
      });

      if (application.jobId) {
        await tx.job.update({
          where: { id: application.jobId },
          data: { status: "CLOSED" },
        });
      }

      // Block allocation if entry fee not settled
      const entryFeeStatusCheck = (application.job as any)?.entryFeeStatus ?? "AWAITING";
      if (entryFeeStatusCheck === "AWAITING") {
        throw new Error("Taxa de entrada ainda não registrada. Confirme o recebimento ou dispense a taxa antes de enviar o candidato.");
      }

      // Determine which round this placement is for the job
      const priorRounds = application.jobId
        ? await tx.placement.count({
            where: { application: { jobId: application.jobId } },
          })
        : 0;

      const placement = await tx.placement.create({
        data: {
          applicationId: data.applicationId,
          monthlySalary: data.monthlySalary,
          startDate: start,
          trialEndDate: trialEnd,
          status: PlacementStatus.TRIAL,
          round: priorRounds + 1,
        } as any,
      });

      // If entry fee already paid and this is a replacement, skip new commission
      const entryFeeStatus = (application.job as any)?.entryFeeStatus ?? "AWAITING";
      const hasPaidEntry = entryFeeStatus === "PAID";

      const existingCommission = application.jobId
        ? await tx.commission.findFirst({
            where: {
              placement: { application: { jobId: application.jobId } },
              status: { notIn: ["WAIVED"] },
            },
          })
        : null;

      if (existingCommission && existingCommission.status !== "PAID") {
        await tx.commission.update({
          where: { id: existingCommission.id },
          data: { placementId: placement.id },
        });
      } else if (!existingCommission) {
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 30);

        await tx.commission.create({
          data: {
            placementId: placement.id,
            baseSalary: data.monthlySalary,
            percentage: feePercentage,
            amount: commissionAmount,
            status: hasPaidEntry ? "PAID" : "PENDING",
            paidAt: hasPaidEntry ? new Date() : null,
            dueDate,
            companyId: application.job?.companyId ?? "",
          },
        });
      }
      // If existingCommission.status === "PAID" (already paid entry fee), no new commission needed
    });

    await logAction("HIRE_AND_PLACE", `Contratou e alocou candidatura ${data.applicationId}`, {
      after: { applicationId: data.applicationId, monthlySalary: data.monthlySalary, startDate: start, trialEndDate: trialEnd, feePercentage, commissionAmount },
    }, session?.user?.id);
    revalidatePath("/admin/placements");
    revalidatePath("/admin/managed");
    revalidatePath("/admin/finance");
    revalidatePath("/admin");
    return ok();
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.error(err);
    return fail(errorMessage || "Erro ao contratar candidato.");
  }
}

export async function adminAllocateCandidate(data: {
  candidateId: string;
  jobId: string;
  monthlySalary: number;
  startDate: string;
}) {
  const session = await auth();
  const permError = requireAdminPermission(session, "PLACEMENTS");
  if (permError) return permError;

  try {
    const jobForFee = await prisma.job.findFirst({
      where: { id: data.jobId },
      select: { feeType: true, feePercentage: true, feeFixed: true, trialDays: true } as any,
    });
    const { feePercentage, commissionAmount, trialDays } = await resolveFeeAndTrial(
      (jobForFee as any) ?? null,
      data.monthlySalary
    );

    const start = new Date(data.startDate);
    const trialEnd = new Date(start);
    trialEnd.setDate(trialEnd.getDate() + trialDays);

    await prisma.$transaction(async (tx) => {
      const job = await tx.job.findFirst({
        where: { id: data.jobId, deletedAt: null },
        select: { id: true, type: true, companyId: true },
      });
      if (!job || job.type !== "MANAGED") throw new Error("Vaga inválida.");

      const candidate = await tx.user.findFirst({
        where: { id: data.candidateId, deletedAt: null },
        select: {
          id: true,
          applications: {
            select: { resumeUrl: true },
            orderBy: { createdAt: "desc" },
            take: 1,
          },
        },
      });
      if (!candidate) throw new Error("Candidato não encontrado.");
      const resumeUrl = candidate.applications[0]?.resumeUrl ?? "";
      if (!resumeUrl) throw new Error("Candidato não possui currículo cadastrado.");

      // Check if already linked to this job
      let application = await tx.application.findUnique({
        where: { jobId_candidateId: { jobId: data.jobId, candidateId: data.candidateId } },
      });

      if (application) {
        const existingPlacement = await tx.placement.findUnique({
          where: { applicationId: application.id },
        });
        if (existingPlacement) throw new Error("Candidato já foi alocado para esta vaga.");
        await tx.application.update({
          where: { id: application.id },
          data: { status: "HIRED" },
        });
      } else {
        // Reuse manual application (jobId = null) if exists, avoiding duplicate records
        const manualApp = await tx.application.findFirst({
          where: { candidateId: data.candidateId, jobId: null },
          orderBy: { createdAt: "desc" },
        });

        if (manualApp) {
          application = await tx.application.update({
            where: { id: manualApp.id },
            data: { jobId: data.jobId, status: "HIRED" },
          });
        } else {
          application = await tx.application.create({
            data: {
              jobId: data.jobId,
              candidateId: data.candidateId,
              resumeUrl,
              status: "HIRED",
            },
          });
        }
      }

      await tx.job.update({
        where: { id: data.jobId },
        data: { status: "CLOSED" },
      });

      const priorRounds = await tx.placement.count({
        where: { application: { jobId: data.jobId } },
      });

      const jobFull = await tx.job.findUnique({
        where: { id: data.jobId },
        select: { entryFeeStatus: true } as any,
      });
      const entryFeeStatus = (jobFull as any)?.entryFeeStatus ?? "AWAITING";

      // Block allocation if entry fee not settled
      if (entryFeeStatus === "AWAITING") {
        throw new Error("Taxa de entrada ainda não registrada. Confirme o recebimento ou dispense a taxa antes de enviar o candidato.");
      }

      const hasPaidEntry = entryFeeStatus === "PAID";

      const placement = await tx.placement.create({
        data: {
          applicationId: application.id,
          monthlySalary: data.monthlySalary,
          startDate: start,
          trialEndDate: trialEnd,
          status: PlacementStatus.TRIAL,
          round: priorRounds + 1,
        } as any,
      });

      const existingCommission = await tx.commission.findFirst({
        where: {
          placement: { application: { jobId: data.jobId } },
          status: { notIn: ["WAIVED"] },
        },
      });

      if (existingCommission && existingCommission.status !== "PAID") {
        await tx.commission.update({
          where: { id: existingCommission.id },
          data: { placementId: placement.id },
        });
      } else if (!existingCommission) {
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 30);
        await tx.commission.create({
          data: {
            placementId: placement.id,
            baseSalary: data.monthlySalary,
            percentage: feePercentage,
            amount: commissionAmount,
            status: hasPaidEntry ? "PAID" : "PENDING",
            paidAt: hasPaidEntry ? new Date() : null,
            dueDate,
            companyId: job.companyId,
          },
        });
      }
    });

    await logAction("ADMIN_ALLOCATE", `Admin alocou candidato ${data.candidateId} para vaga ${data.jobId}`, {
      after: { candidateId: data.candidateId, jobId: data.jobId, monthlySalary: data.monthlySalary, feePercentage, commissionAmount },
    }, session?.user?.id);
    revalidatePath("/admin/placements");
    revalidatePath("/admin/managed");
    revalidatePath("/admin/resumes");
    revalidatePath("/admin/finance");
    revalidatePath("/admin");
    return ok();
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.error(err);
    return fail(errorMessage || "Erro ao alocar candidato.");
  }
}

export async function getPlacements(filters?: { status?: PlacementStatus }) {
  const session = await auth();
  if (!session) return [];

  const user = session.user as { role: string; companyId?: string };
  const role = user.role;
  const companyId = user.companyId;

  if (role === "ADMIN") {
    const permError = requireAdminPermission(session, "PLACEMENTS");
    if (permError) return [];
  } else if (role !== "EMPLOYER") {
    return [];
  }

  try {
    const where: { status?: PlacementStatus; application?: { job: { companyId: string } } } = {};

    if (filters?.status) {
      where.status = filters.status;
    }

    if (role === "EMPLOYER" && companyId) {
      where.application = { job: { companyId } };
    }

    const placements = await prisma.placement.findMany({
      where,
      include: {
        application: {
          include: {
            candidate: { select: { id: true, name: true, email: true, image: true } },
            job: {
              include: {
                company: { select: { id: true, name: true, slug: true, logoUrl: true } },
              },
            },
          },
        },
        commission: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return placements;
  } catch (err) {
    console.error(err);
    return [];
  }
}
