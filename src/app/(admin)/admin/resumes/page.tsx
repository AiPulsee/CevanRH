import { prisma } from "@/lib/prisma";
import { JobType } from "@prisma/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Users2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import Link from "next/link";
import { ResumesExportButton } from "@/components/admin/resumes-export-button";
import { PaginationBar } from "@/components/ui/pagination-bar";
import { ResumeCardWithModal } from "@/components/admin/resume-card-with-modal";

const PAGE_SIZE = 15;

export default async function ResumesPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; q?: string; page?: string }>;
}) {
  const { type: typeFilter, q: query, page: pageParam } = await searchParams;
  const page = Math.max(1, parseInt(pageParam ?? "1"));

  const where = {
    ...(typeFilter && { job: { type: typeFilter as JobType } }),
    ...(query && {
      OR: [
        { candidate: { name: { contains: query, mode: "insensitive" as const } } },
        { candidate: { email: { contains: query, mode: "insensitive" as const } } },
        { job: { title: { contains: query, mode: "insensitive" as const } } },
      ],
    }),
  };

  const [applications, totalApps, managedCount, selfServiceCount, activeJobs] = await Promise.all([
    prisma.application.findMany({
      where,
      include: {
        candidate: true,
        job: { include: { company: { select: { name: true } } } },
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.application.count({ where }),
    prisma.application.count({ where: { job: { type: "MANAGED" } } }),
    prisma.application.count({ where: { job: { type: "SELF_SERVICE" } } }),
    prisma.job.findMany({
      where: { type: "MANAGED", status: "ACTIVE" },
      select: {
        id: true,
        title: true,
        openings: true,
        company: { select: { name: true, logoUrl: true } },
      },
      orderBy: { title: "asc" },
    }),
  ]);

  const totalPages = Math.ceil(totalApps / PAGE_SIZE);



  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Banco de Currículos</h1>
          <p className="text-sm text-slate-500 font-medium">Gestão centralizada de todos os talentos recebidos pelo sistema.</p>
        </div>
        <ResumesExportButton data={applications.map((app) => ({
          name: app.candidate.name ?? "",
          email: app.candidate.email ?? "",
          jobTitle: app.job.title,
          company: app.job.company.name,
          type: app.job.type,
          status: app.status,
          date: format(new Date(app.createdAt), "dd/MM/yyyy", { locale: ptBR }),
          resumeUrl: app.resumeUrl,
        }))} />
      </div>

      {/* Stats Quick View */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-5 border-slate-200 bg-white rounded-2xl shadow-sm">
          <Tooltip>
            <TooltipTrigger render={
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 cursor-default w-fit">Total de Currículos</p>
            } />
            <TooltipContent>Total de candidaturas recebidas na plataforma — cada candidatura inclui um currículo anexado</TooltipContent>
          </Tooltip>
          <h3 className="text-2xl font-black mt-1 text-slate-900">{managedCount + selfServiceCount}</h3>
        </Card>
        <Card className="p-5 border-slate-200 bg-white rounded-2xl shadow-sm">
          <Tooltip>
            <TooltipTrigger render={
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 cursor-default w-fit">Triados (Managed)</p>
            } />
            <TooltipContent>Currículos de vagas Curadoria — candidatos que passaram pela triagem especializada da equipe Cevan</TooltipContent>
          </Tooltip>
          <h3 className="text-2xl font-black mt-1 text-blue-600">
            {managedCount}
          </h3>
        </Card>
        <Card className="p-5 border-slate-200 bg-white rounded-2xl shadow-sm">
          <Tooltip>
            <TooltipTrigger render={
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 cursor-default w-fit">Públicos (Self-Service)</p>
            } />
            <TooltipContent>Currículos de vagas Self-Service — candidatos que se candidataram diretamente a vagas publicadas pelas empresas parceiras</TooltipContent>
          </Tooltip>
          <h3 className="text-2xl font-black mt-1 text-emerald-600">
            {selfServiceCount}
          </h3>
        </Card>
      </div>

      {/* Filters & Search */}
      <Card className="p-4 border-slate-200 bg-white rounded-2xl shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <form action="/admin/resumes" method="get" className="w-full">
            {typeFilter && <input type="hidden" name="type" value={typeFilter} />}
            <Input
              name="q"
              defaultValue={query}
              placeholder="Buscar por nome, email ou vaga..."
              className="h-11 pl-11 bg-slate-50 border-none rounded-xl text-sm font-medium focus-visible:ring-2 focus-visible:ring-blue-500/10 w-full"
            />
          </form>
        </div>
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <Button nativeButton={false} render={<Link href="/admin/resumes">Todos</Link>} variant={!typeFilter ? "secondary" : "ghost"} className="flex-1 sm:flex-none rounded-xl font-bold text-xs h-11 px-4 sm:px-6" />
          <Button nativeButton={false} render={<Link href="/admin/resumes?type=MANAGED">Curadoria</Link>} variant={typeFilter === "MANAGED" ? "secondary" : "ghost"} className="flex-1 sm:flex-none rounded-xl font-bold text-xs h-11 px-4 sm:px-6" />
          <Button nativeButton={false} render={<Link href="/admin/resumes?type=SELF_SERVICE">Públicos</Link>} variant={typeFilter === "SELF_SERVICE" ? "secondary" : "ghost"} className="flex-1 sm:flex-none rounded-xl font-bold text-xs h-11 px-4 sm:px-6" />
        </div>
      </Card>

      {/* Table / Grid */}
      <div className="space-y-3">
        {applications.length === 0 ? (
          <Card className="p-12 text-center border-slate-200 bg-white rounded-2xl">
            <Users2 className="h-12 w-12 text-slate-200 mx-auto mb-4" />
            <p className="text-slate-400 font-bold">Nenhum currículo encontrado com estes filtros.</p>
          </Card>
        ) : (
          applications.map((app) => (
            <ResumeCardWithModal
              key={app.id}
              app={app}
              formattedDate={format(new Date(app.createdAt), "dd/MM/yyyy", { locale: ptBR })}
              activeJobs={activeJobs}
            />
          ))
        )}
      </div>

      {totalPages > 1 && (
        <PaginationBar 
          page={page} 
          totalPages={totalPages} 
          baseHref="/admin/resumes" 
          params={{
            ...(query && { q: query }),
            ...(typeFilter && { type: typeFilter }),
          }}
        />
      )}
    </div>
  );
}
