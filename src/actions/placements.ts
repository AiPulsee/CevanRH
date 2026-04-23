"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PlacementStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

// --- Criar Placement (somente ADMIN) ---
export async function createPlacement(data: {
  applicationId: string;
  monthlySalary: number; // em centavos
  startDate: string;     // ISO string
}) {
  const session = await auth();
  if (!session || (session.user as any).role !== "ADMIN") {
    return { error: "Não autorizado." };
  }

  try {
    const application = await prisma.application.findUnique({
      where: { id: data.applicationId },
      include: { job: true, placement: true },
    });

    if (!application) return { error: "Candidatura não encontrada." };
    if (application.status !== "HIRED") return { error: "Candidato precisa ter status HIRED." };
    if (application.placement) return { error: "Esta candidatura já possui uma alocação." };

    const start = new Date(data.startDate);
    const trialEnd = new Date(start);
    trialEnd.setDate(trialEnd.getDate() + 90);

    await prisma.placement.create({
      data: {
        applicationId: data.applicationId,
        monthlySalary: data.monthlySalary,
        startDate: start,
        trialEndDate: trialEnd,
        status: PlacementStatus.TRIAL,
      },
    });

    revalidatePath("/admin/placements");
    revalidatePath("/dashboard/placements");

    return { success: true };
  } catch (err) {
    console.error(err);
    return { error: "Erro interno ao criar alocação." };
  }
}

// --- Confirmar Efetivação (EMPLOYER solicita, ou ADMIN confirma direto) ---
export async function confirmEffective(placementId: string) {
  const session = await auth();
  if (!session) return { error: "Não autorizado." };

  const role = (session.user as any).role;
  if (role !== "ADMIN" && role !== "EMPLOYER") {
    return { error: "Não autorizado." };
  }

  try {
    const placement = await prisma.placement.findUnique({
      where: { id: placementId },
      include: { 
        application: { 
          include: { job: true } 
        } 
      },
    });

    if (!placement) return { error: "Alocação não encontrada." };
    if (placement.status !== PlacementStatus.TRIAL) {
      return { error: "Alocação não está em período de experiência." };
    }

    // Se EMPLOYER, verificar se é da mesma empresa
    if (role === "EMPLOYER") {
      const companyId = (session.user as any).companyId;
      if (placement.application.job.companyId !== companyId) {
        return { error: "Não autorizado." };
      }
    }

    const now = new Date();

    // Atualizar placement para EFFECTIVE
    await prisma.placement.update({
      where: { id: placementId },
      data: {
        status: PlacementStatus.EFFECTIVE,
        effectiveDate: now,
      },
    });

    // Gerar comissão automaticamente (50% fixo)
    const commissionAmount = Math.round(placement.monthlySalary * 50 / 100);
    const dueDate = new Date(now);
    dueDate.setDate(dueDate.getDate() + 30); // Vencimento em 30 dias

    await prisma.commission.create({
      data: {
        placementId: placementId,
        baseSalary: placement.monthlySalary,
        percentage: 50,
        amount: commissionAmount,
        status: "PENDING",
        dueDate: dueDate,
        companyId: placement.application.job.companyId,
      },
    });

    revalidatePath("/admin/placements");
    revalidatePath("/admin/finance");
    revalidatePath("/dashboard/placements");

    return { success: true };
  } catch (err) {
    console.error(err);
    return { error: "Erro interno ao confirmar efetivação." };
  }
}

// --- Encerrar / Não efetivar (EMPLOYER ou ADMIN) ---
export async function terminatePlacement(placementId: string, reason?: string) {
  const session = await auth();
  if (!session) return { error: "Não autorizado." };

  const role = (session.user as any).role;
  if (role !== "ADMIN" && role !== "EMPLOYER") {
    return { error: "Não autorizado." };
  }

  try {
    const placement = await prisma.placement.findUnique({
      where: { id: placementId },
      include: { application: { include: { job: true } } },
    });

    if (!placement) return { error: "Alocação não encontrada." };
    if (placement.status !== PlacementStatus.TRIAL) {
      return { error: "Somente alocações em período de experiência podem ser encerradas." };
    }

    // Se EMPLOYER, verificar se é da mesma empresa
    if (role === "EMPLOYER") {
      const companyId = (session.user as any).companyId;
      if (placement.application.job.companyId !== companyId) {
        return { error: "Não autorizado." };
      }
    }

    await prisma.placement.update({
      where: { id: placementId },
      data: {
        status: PlacementStatus.TERMINATED,
        terminationDate: new Date(),
        terminationReason: reason || "Não efetivado pela empresa.",
      },
    });

    revalidatePath("/admin/placements");
    revalidatePath("/dashboard/placements");

    return { success: true };
  } catch (err) {
    console.error(err);
    return { error: "Erro interno ao encerrar alocação." };
  }
}

// --- Buscar alocações (Admin: todas | Employer: só da empresa) ---
export async function getPlacements(filters?: { status?: PlacementStatus }) {
  const session = await auth();
  if (!session) return [];

  const role = (session.user as any).role;
  const companyId = (session.user as any).companyId;

  try {
    const where: any = {};
    
    if (filters?.status) {
      where.status = filters.status;
    }

    // Se EMPLOYER, filtrar apenas os placements da empresa
    if (role === "EMPLOYER" && companyId) {
      where.application = {
        job: { companyId: companyId },
      };
    }

    const placements = await prisma.placement.findMany({
      where,
      include: {
        application: {
          include: {
            candidate: { select: { id: true, name: true, email: true, image: true } },
            job: { 
              include: { 
                company: { select: { id: true, name: true, slug: true, logoUrl: true } } 
              } 
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
