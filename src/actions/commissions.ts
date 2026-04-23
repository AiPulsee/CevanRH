"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { CommissionStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

// --- Marcar comissão como faturada ---
export async function markCommissionAsInvoiced(commissionId: string, invoiceNumber: string) {
  const session = await auth();
  if (!session || (session.user as any).role !== "ADMIN") {
    return { error: "Não autorizado." };
  }

  try {
    await prisma.commission.update({
      where: { id: commissionId },
      data: {
        status: CommissionStatus.INVOICED,
        invoiceNumber,
      },
    });

    revalidatePath("/admin/finance");
    return { success: true };
  } catch (err) {
    console.error(err);
    return { error: "Erro ao atualizar comissão." };
  }
}

// --- Registrar pagamento ---
export async function markCommissionAsPaid(commissionId: string) {
  const session = await auth();
  if (!session || (session.user as any).role !== "ADMIN") {
    return { error: "Não autorizado." };
  }

  try {
    await prisma.commission.update({
      where: { id: commissionId },
      data: {
        status: CommissionStatus.PAID,
        paidAt: new Date(),
      },
    });

    revalidatePath("/admin/finance");
    return { success: true };
  } catch (err) {
    console.error(err);
    return { error: "Erro ao registrar pagamento." };
  }
}

// --- Dispensar comissão ---
export async function waiveCommission(commissionId: string) {
  const session = await auth();
  if (!session || (session.user as any).role !== "ADMIN") {
    return { error: "Não autorizado." };
  }

  try {
    await prisma.commission.update({
      where: { id: commissionId },
      data: {
        status: CommissionStatus.WAIVED,
      },
    });

    revalidatePath("/admin/finance");
    return { success: true };
  } catch (err) {
    console.error(err);
    return { error: "Erro ao dispensar comissão." };
  }
}

// --- Buscar comissões ---
export async function getCommissions(filters?: { status?: CommissionStatus; companyId?: string }) {
  const session = await auth();
  if (!session) return [];

  const role = (session.user as any).role;
  const userCompanyId = (session.user as any).companyId;

  try {
    const where: any = {};

    if (filters?.status) where.status = filters.status;

    // Se EMPLOYER, mostrar apenas as comissões da empresa
    if (role === "EMPLOYER" && userCompanyId) {
      where.companyId = userCompanyId;
    } else if (filters?.companyId) {
      where.companyId = filters.companyId;
    }

    const commissions = await prisma.commission.findMany({
      where,
      include: {
        placement: {
          include: {
            application: {
              include: {
                candidate: { select: { id: true, name: true, email: true } },
                job: {
                  include: {
                    company: { select: { id: true, name: true, slug: true } },
                  },
                },
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return commissions;
  } catch (err) {
    console.error(err);
    return [];
  }
}

// --- Resumo financeiro de comissões (Admin) ---
export async function getCommissionSummary() {
  const session = await auth();
  if (!session || (session.user as any).role !== "ADMIN") {
    return null;
  }

  try {
    const [pending, invoiced, paid, waived, totalPending, totalPaid] = await Promise.all([
      prisma.commission.count({ where: { status: "PENDING" } }),
      prisma.commission.count({ where: { status: "INVOICED" } }),
      prisma.commission.count({ where: { status: "PAID" } }),
      prisma.commission.count({ where: { status: "WAIVED" } }),
      prisma.commission.aggregate({ where: { status: { in: ["PENDING", "INVOICED"] } }, _sum: { amount: true } }),
      prisma.commission.aggregate({ where: { status: "PAID" }, _sum: { amount: true } }),
    ]);

    return {
      counts: { pending, invoiced, paid, waived },
      totals: {
        pending: totalPending._sum.amount || 0,
        paid: totalPaid._sum.amount || 0,
      },
    };
  } catch (err) {
    console.error(err);
    return null;
  }
}
