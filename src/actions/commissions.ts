"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { CommissionStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { requireAdminPermission, ok, fail } from "@/lib/permissions";
import { logAction } from "@/lib/audit";

export async function markCommissionAsInvoiced(
  commissionId: string,
  invoiceNumber: string,
  invoiceUrl?: string
) {
  const session = await auth();
  const permError = requireAdminPermission(session, "FINANCE");
  if (permError) return permError;

  try {
    const result = await prisma.commission.updateMany({
      where: { id: commissionId, status: CommissionStatus.PENDING },
      data: {
        status: CommissionStatus.INVOICED,
        invoiceNumber,
        ...(invoiceUrl ? { invoiceUrl } : {}),
      },
    });

    if (result.count === 0) return fail("Comissão só pode ser faturada quando estiver pendente.");

    await logAction("COMMISSION_INVOICED", `Faturou comissão ${commissionId} (NF: ${invoiceNumber})`, {
      before: { commissionId, status: "PENDING" },
      after: { commissionId, status: "INVOICED", invoiceNumber, invoiceUrl },
    }, session?.user?.id);
    revalidatePath("/admin/placements");
    revalidatePath("/admin/finance");
    revalidatePath("/admin");
    return ok();
  } catch (err) {
    console.error(err);
    return fail("Erro ao atualizar comissão.");
  }
}

export async function markCommissionAsPaid(commissionId: string) {
  const session = await auth();
  const permError = requireAdminPermission(session, "FINANCE");
  if (permError) return permError;

  try {
    const result = await prisma.commission.updateMany({
      where: {
        id: commissionId,
        status: { in: [CommissionStatus.PENDING, CommissionStatus.INVOICED] },
      },
      data: { status: CommissionStatus.PAID, paidAt: new Date() },
    });

    if (result.count === 0) return fail("Comissão só pode ser paga quando estiver pendente ou faturada.");

    await logAction("COMMISSION_PAID", `Registrou pagamento da comissão ${commissionId}`, {
      after: { commissionId, status: "PAID", paidAt: new Date() },
    }, session?.user?.id);
    revalidatePath("/admin/placements");
    revalidatePath("/admin/finance");
    revalidatePath("/admin");
    return ok();
  } catch (err) {
    console.error(err);
    return fail("Erro ao registrar pagamento.");
  }
}

export async function waiveCommission(commissionId: string) {
  const session = await auth();
  const permError = requireAdminPermission(session, "FINANCE");
  if (permError) return permError;

  try {
    const result = await prisma.commission.updateMany({
      where: {
        id: commissionId,
        status: { in: [CommissionStatus.PENDING, CommissionStatus.INVOICED] },
      },
      data: { status: CommissionStatus.WAIVED },
    });

    if (result.count === 0) return fail("Comissão já foi paga e não pode ser dispensada.");

    await logAction("COMMISSION_WAIVED", `Dispensou comissão ${commissionId}`, {
      after: { commissionId, status: "WAIVED" },
    }, session?.user?.id);
    revalidatePath("/admin/placements");
    revalidatePath("/admin/finance");
    revalidatePath("/admin");
    return ok();
  } catch (err) {
    console.error(err);
    return fail("Erro ao dispensar comissão.");
  }
}

export async function getCommissions(filters?: { status?: CommissionStatus; companyId?: string }) {
  const session = await auth();
  if (!session) return [];

  const user = session.user as { role: string; companyId?: string };
  const role = user.role;
  const userCompanyId = user.companyId;

  if (role === "ADMIN") {
    const permError = requireAdminPermission(session, "FINANCE");
    if (permError) return [];
  } else if (role !== "EMPLOYER") {
    return [];
  }

  try {
    const where: { status?: CommissionStatus; companyId?: string } = {};

    if (filters?.status) where.status = filters.status;

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

export async function getCommissionSummary() {
  const session = await auth();
  const permError = requireAdminPermission(session, "FINANCE");
  if (permError) return null;

  try {
    const [pending, invoiced, paid, waived, totalPending, totalPaid] = await Promise.all([
      prisma.commission.count({ where: { status: "PENDING" } }),
      prisma.commission.count({ where: { status: "INVOICED" } }),
      prisma.commission.count({ where: { status: "PAID" } }),
      prisma.commission.count({ where: { status: "WAIVED" } }),
      prisma.commission.aggregate({
        where: { status: { in: ["PENDING", "INVOICED"] } },
        _sum: { amount: true },
      }),
      prisma.commission.aggregate({
        where: { status: "PAID" },
        _sum: { amount: true },
      }),
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
