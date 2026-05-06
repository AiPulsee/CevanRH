import { prisma } from "@/lib/prisma";
import { JobType } from "@prisma/client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Download,
  ExternalLink,
  Users2,
  Building2,
  Calendar,
  Briefcase
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import Link from "next/link";
import { ResumesExportButton } from "@/components/admin/resumes-export-button";
import { PaginationBar } from "@/components/ui/pagination-bar";

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

  const [applications, totalApps, allForStats] = await Promise.all([
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
    prisma.application.findMany({
      select: { job: { select: { type: true } } },
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
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total de Currículos</p>
          <h3 className="text-2xl font-black mt-1 text-slate-900">{allForStats.length}</h3>
        </Card>
        <Card className="p-5 border-slate-200 bg-white rounded-2xl shadow-sm">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Triados (Managed)</p>
          <h3 className="text-2xl font-black mt-1 text-blue-600">
            {allForStats.filter(a => a.job.type === "MANAGED").length}
          </h3>
        </Card>
        <Card className="p-5 border-slate-200 bg-white rounded-2xl shadow-sm">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Públicos (Self-Service)</p>
          <h3 className="text-2xl font-black mt-1 text-emerald-600">
            {allForStats.filter(a => a.job.type === "SELF_SERVICE").length}
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
          <Button nativeButton={false} render={<Link href="/admin/resumes?type=MANAGED">Managed</Link>} variant={typeFilter === "MANAGED" ? "secondary" : "ghost"} className="flex-1 sm:flex-none rounded-xl font-bold text-xs h-11 px-4 sm:px-6" />
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

            <Card key={app.id} className="p-5 border-slate-200 bg-white rounded-2xl shadow-sm hover:border-blue-200 transition-all group">
              <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                {/* Candidate Info */}
                <div className="flex items-center gap-4 flex-1">
                  <div className="h-12 w-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center font-black text-blue-600 text-lg uppercase">
                    {app.candidate.name?.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors">{app.candidate.name}</h4>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-tighter">{app.candidate.email}</p>
                  </div>
                </div>

                {/* Job Info */}
                <div className="flex-[1.5] grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Vaga Original</p>
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-3.5 w-3.5 text-slate-400" />
                      <span className="text-sm font-bold text-slate-700">{app.job.title}</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Empresa / Tipo</p>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
                        <Building2 className="h-3.5 w-3.5" /> {app.job.company.name}
                      </span>
                      <Badge className={cn(
                        "rounded-md px-1.5 py-0 text-[8px] font-black uppercase border-none",
                        app.job.type === "MANAGED" ? "bg-blue-50 text-blue-600" : "bg-emerald-50 text-emerald-600"
                      )}>
                        {app.job.type === "MANAGED" ? "MANAGED" : "SELF-SERVICE"}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Date & Actions */}
                <div className="flex flex-row sm:flex-row items-center justify-between lg:justify-end gap-4 sm:gap-6 border-t lg:border-none pt-4 lg:pt-0">
                  <div className="text-left lg:text-right">
                    <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Recebido em</p>
                    <div className="flex items-center gap-1.5 justify-start lg:justify-end mt-1">
                      <Calendar className="h-3.5 w-3.5 text-slate-400" />
                      <span className="text-xs font-bold text-slate-700">
                        {format(new Date(app.createdAt), "dd/MM/yyyy", { locale: ptBR })}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button nativeButton={false} render={<a href={app.resumeUrl} target="_blank" rel="noopener noreferrer" />} size="icon" variant="outline" className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl border-slate-200 bg-white">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="secondary" className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
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
