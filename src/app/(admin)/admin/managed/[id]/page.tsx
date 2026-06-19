export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { JobDetailClient } from "@/components/admin/job-detail-client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const job = await prisma.job.findUnique({
    where: { id, deletedAt: null },
    include: {
      company: { select: { name: true, logoUrl: true } },
      applications: {
        include: {
          candidate: { select: { name: true, email: true } },
          placement: {
            include: {
              commission: {
                select: {
                  id: true,
                  amount: true,
                  status: true,
                  invoiceNumber: true,
                  invoiceUrl: true,
                },
              },
            },
          },
        },
        orderBy: { createdAt: "asc" },
      },
    },
  });

  if (!job) notFound();

  const totalApplicants = job.applications.length;
  const shortlistedCount = job.applications.filter(
    (a) => a.status === "SHORTLISTED"
  ).length;

  const placements = job.applications
    .filter((a) => a.placement)
    .sort(
      (a, b) =>
        ((a.placement as any)?.round ?? 1) - ((b.placement as any)?.round ?? 1)
    )
    .map((a) => ({
      id: a.placement!.id,
      round: (a.placement as any).round ?? 1,
      status: a.placement!.status as
        | "TRIAL"
        | "EFFECTIVE"
        | "TERMINATED"
        | "CANCELLED",
      monthlySalary: a.placement!.monthlySalary,
      startDate: a.placement!.startDate,
      trialEndDate: a.placement!.trialEndDate,
      effectiveDate: a.placement!.effectiveDate,
      terminationDate: a.placement!.terminationDate,
      terminationReason: a.placement!.terminationReason,
      candidate: {
        name: a.candidate.name ?? "Sem Nome",
        email: a.candidate.email ?? "",
      },
      commission: a.placement!.commission
        ? {
            id: a.placement!.commission.id,
            amount: a.placement!.commission.amount,
            status: a.placement!.commission.status as
              | "PENDING"
              | "INVOICED"
              | "PAID"
              | "WAIVED",
            invoiceNumber: a.placement!.commission.invoiceNumber,
            invoiceUrl: a.placement!.commission.invoiceUrl,
          }
        : null,
    }));

  return (
    <div className="space-y-5 animate-in fade-in duration-500">
      <Link
        href="/admin/managed"
        className="inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-400 hover:text-slate-700 uppercase tracking-widest transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Curadoria
      </Link>

      <JobDetailClient
        job={{
          id: job.id,
          title: job.title,
          status: job.status,
          location: job.location,
          isRemote: job.isRemote,
          salaryRange: job.salaryRange,
          requirements: job.requirements,
          openings: job.openings,
          feeType: (job as any).feeType ?? null,
          feeFixed: (job as any).feeFixed ?? null,
          feePercentage: (job as any).feePercentage ?? null,
          trialDays: (job as any).trialDays ?? null,
          entryFeeStatus:
            ((job as any).entryFeeStatus as "AWAITING" | "PAID" | "WAIVED") ??
            "AWAITING",
          entryFeeAmount: (job as any).entryFeeAmount ?? null,
          company: job.company,
          totalApplicants,
          shortlistedCount,
          placements,
        }}
      />
    </div>
  );
}
