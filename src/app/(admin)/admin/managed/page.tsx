export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/card";
import { Zap } from "lucide-react";
import { ManagedJobsList } from "@/components/admin/managed-jobs-list";
import { CreateJobModal } from "@/components/dashboard/create-job-modal";
import { PaginationBar } from "@/components/ui/pagination-bar";

const PAGE_SIZE = 8;

export default async function AdminManagedJobs({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, parseInt(pageParam ?? "1"));

  const [managedJobs, totalManagedJobs, totalActive, totalShortlisted, companies] = await Promise.all([
    prisma.job.findMany({
      where: { type: "MANAGED" },
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
        location: true,
        isRemote: true,
        salaryRange: true,
        requirements: true,
        responsibilities: true,
        benefits: true,
        tips: true,
        company: { select: { name: true, logoUrl: true } },
        _count: { select: { applications: true } },
        applications: {
          select: {
            id: true,
            status: true,
            resumeUrl: true,
            coverLetter: true,
            candidate: { select: { name: true, email: true } },
          },
          orderBy: { createdAt: "desc" },
        },
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.job.count({ where: { type: "MANAGED" } }),
    prisma.job.count({ where: { type: "MANAGED", status: "ACTIVE" } }),
    prisma.application.count({
      where: { status: "SHORTLISTED", job: { type: "MANAGED" } },
    }),
    prisma.company.findMany({
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    }),
  ]);

  const totalPages = Math.ceil(totalManagedJobs / PAGE_SIZE);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-blue-500 font-bold text-[10px] uppercase tracking-widest mb-1.5">
            <Zap className="h-3.5 w-3.5 fill-blue-500" /> Curadoria Especializada
          </div>
          <h1 className="text-2xl font-black text-slate-900">Curadoria Ativa</h1>
          <p className="text-sm text-slate-500 font-medium">
            Gestão de triagem e seleção para clientes estratégicos.
          </p>
        </div>
        <CreateJobModal companies={companies} />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="p-4 sm:p-5 border-slate-200 bg-white rounded-2xl shadow-sm border-l-4 border-l-blue-500">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            Total sob Gestão
          </p>
          <h3 className="text-xl sm:text-2xl font-black mt-1 text-slate-900">{totalManagedJobs}</h3>
        </Card>
        <Card className="p-4 sm:p-5 border-slate-200 bg-white rounded-2xl shadow-sm border-l-4 border-l-orange-500">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            Em Triagem Ativa
          </p>
          <h3 className="text-xl sm:text-2xl font-black mt-1 text-slate-900">{totalActive}</h3>
        </Card>
        <Card className="p-4 sm:p-5 border-slate-200 bg-white rounded-2xl shadow-sm border-l-4 border-l-green-500 sm:col-span-2 lg:col-span-1">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            Selecionados
          </p>
          <h3 className="text-xl sm:text-2xl font-black mt-1 text-slate-900">{totalShortlisted}</h3>
        </Card>
      </div>

      <ManagedJobsList jobs={managedJobs} />

      {totalPages > 1 && (
        <PaginationBar
          page={page}
          totalPages={totalPages}
          baseHref="/admin/managed"
        />
      )}
    </div>
  );
}
