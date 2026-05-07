export const dynamic = "force-dynamic";
import type { Metadata } from "next";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string; location?: string; type?: string }>;
}): Promise<Metadata> {
  const { page, q, location, type } = await searchParams;
  const pageNum = parseInt(page ?? "1");

  const parts: string[] = [];
  if (q) parts.push(`"${q}"`);
  if (location) parts.push(`em ${location}`);
  if (type === "MANAGED") parts.push("Curadoria");
  else if (type === "SELF_SERVICE") parts.push("Self-Service");

  const title = parts.length > 0
    ? `Vagas ${parts.join(" ")}${pageNum > 1 ? ` — Página ${pageNum}` : ""}`
    : pageNum > 1
    ? `Vagas de Emprego — Página ${pageNum}`
    : "Vagas de Emprego no Maranhão e Brasil";

  const description = parts.length > 0
    ? `Encontre vagas de ${parts.join(", ")} com curadoria especializada da Cevan Serviços Empresariais.`
    : "Explore vagas de emprego no Maranhão e em todo o Brasil com curadoria da Cevan Serviços Empresariais. Processo seletivo personalizado e suporte completo ao candidato.";

  return {
    title,
    description,
    alternates: { canonical: "/jobs" },
    openGraph: { title, description, url: "/jobs", type: "website" },
    robots: pageNum > 1 ? { index: false, follow: true } : { index: true, follow: true },
  };
}

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Filter,
  Clock,
  Bookmark,
  Building2,
  Zap,
  ChevronRight,
  MapPin,
  Search,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { PaginationBar } from "@/components/ui/pagination-bar";
import { JobFilters } from "@/components/public/job-filters";

const PAGE_SIZE = 12;

export default async function JobsPublicPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string; location?: string; remote?: string; type?: string }>;
}) {
  const { page: pageParam, q, location, remote, type } = await searchParams;
  const page = Math.max(1, parseInt(pageParam ?? "1"));

  const where = {
    status: "ACTIVE" as const,
    ...(q && {
      OR: [
        { title: { contains: q, mode: "insensitive" as const } },
        { description: { contains: q, mode: "insensitive" as const } },
      ],
    }),
    ...(location && { location: { contains: location, mode: "insensitive" as const } }),
    ...(remote !== undefined && remote !== "" && { isRemote: remote === "true" }),
    ...(type && { type: type as "MANAGED" | "SELF_SERVICE" }),
  };

  const [jobs, totalJobs] = await Promise.all([
    prisma.job.findMany({
      where,
      include: { company: true },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.job.count({ where }),
  ]);

  const totalPages = Math.ceil(totalJobs / PAGE_SIZE);
  const from = totalJobs === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const to = Math.min(page * PAGE_SIZE, totalJobs);

  const paginationParams: Record<string, string> = {};
  if (q) paginationParams.q = q;
  if (location) paginationParams.location = location;
  if (remote) paginationParams.remote = remote;
  if (type) paginationParams.type = type;

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFBFC] font-sans selection:bg-blue-100 selection:text-blue-900 mt-24">

      {/* Hero / Search Banner */}
      <div className="bg-[#f8faff] py-16 lg:py-28 border-b border-blue-100/60 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <Badge className="bg-blue-600/10 text-blue-600 border-none rounded-full px-4 py-1.5 font-black mb-6 uppercase tracking-[0.2em] text-[9px] sm:text-[10px]">
            Oportunidades Ativas
          </Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-6 sm:mb-8 tracking-tighter leading-tight">
            O Próximo Passo da <br />
            <span className="text-blue-600">Sua Carreira</span>
          </h1>
          <p className="text-slate-500 font-medium mb-10 sm:mb-12 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
            Navegue pelas vagas mais cobiçadas do mercado e alcance seu potencial máximo com a curadoria especializada da Cevan.
          </p>

          <JobFilters only="search" q={q} location={location} remote={remote} type={type} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 w-full grid grid-cols-1 lg:grid-cols-4 gap-10">

        {/* Sidebar Filters */}
        <aside className="hidden lg:flex flex-col gap-8 bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_2px_15px_rgb(0,0,0,0.02)] h-fit sticky top-28">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
            <Filter className="h-5 w-5 text-[#1967D2]" />
            <h3 className="font-bold text-slate-900 text-[16px]">Filtros</h3>
          </div>
          <JobFilters only="sidebar" q={q} location={location} remote={remote} type={type} />
        </aside>

        {/* Jobs List Section */}
        <div className="lg:col-span-3 space-y-6">

          {/* Control Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6">
            <div className="text-slate-500 text-sm sm:text-[15px] font-medium text-center sm:text-left">
              {totalJobs === 0 ? (
                <span>Nenhuma vaga encontrada</span>
              ) : (
                <>Mostrando <span className="font-bold text-slate-900">{from}–{to}</span> de <span className="font-bold text-slate-900">{totalJobs}</span> vagas</>
              )}
            </div>
            <div className="flex items-center justify-end gap-2 sm:gap-3 lg:hidden">
              <JobFilters only="sidebar" q={q} location={location} remote={remote} type={type} />
            </div>
          </div>

          {/* Job Cards */}
          {jobs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
              <Search className="h-12 w-12 text-slate-200" />
              <p className="text-slate-400 font-bold text-lg">Nenhuma vaga encontrada</p>
              <p className="text-slate-400 text-sm">Tente ajustar seus filtros ou busca.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.map((job) => (
                <Card key={job.id} className="p-4 sm:p-6 border border-slate-100 bg-white hover:border-[#1967D2]/40 hover:shadow-[0_12px_40px_rgb(25,103,210,0.06)] hover:-translate-y-1 transition-all duration-300 rounded-[1.2rem] sm:rounded-[1.5rem] relative group cursor-pointer">

                  <Link href={`/jobs/${job.slug}`} className="absolute inset-0 z-[1] rounded-[1.2rem] sm:rounded-[1.5rem]" aria-label={`Ver vaga: ${job.title}`} />

                  <button className="absolute top-4 right-4 sm:top-6 sm:right-6 text-slate-300 hover:text-[#1967D2] bg-slate-50 hover:bg-blue-50 transition-colors h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center rounded-full z-[2]">
                    <Bookmark className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </button>

                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
                    <div className="flex items-start sm:items-center gap-4 sm:gap-5 flex-1">
                      <div className={`h-12 w-12 sm:h-14 sm:w-14 rounded-xl flex-shrink-0 flex items-center justify-center font-bold text-white text-base sm:text-xl shadow-sm ${job.type === 'MANAGED' ? 'bg-blue-600' : 'bg-slate-600'}`}>
                        {job.company.logoUrl ? (
                          <img src={job.company.logoUrl} alt={job.company.name} className="h-full w-full object-cover rounded-xl" />
                        ) : (
                          job.company.name.charAt(0)
                        )}
                      </div>
                      <div className="pr-8 sm:pr-12 md:pr-0">
                        <h4 className="font-bold text-base sm:text-[18px] text-slate-900 group-hover:text-[#1967D2] transition-colors leading-tight mb-1.5 sm:mb-2 line-clamp-1">{job.title}</h4>
                        <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-1.5 text-[11px] sm:text-[13px] text-slate-500 font-medium">
                          <span className="flex items-center gap-1.5"><Building2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#1967D2]" /> {job.company.name}</span>
                          <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-slate-400" /> {job.location}</span>
                          <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-slate-400" /> {formatDistanceToNow(new Date(job.createdAt), { addSuffix: true, locale: ptBR })}</span>
                          <span className="flex items-center gap-1.5 font-black text-green-600 text-xs sm:text-sm">{job.salaryRange || "A combinar"}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row md:flex-col items-start sm:items-center md:items-end gap-3 w-full md:w-auto mt-2 md:mt-0 pt-4 md:pt-0 border-t border-slate-50 md:border-none relative z-[2]">
                      <div className="flex flex-wrap gap-2">
                        <Badge className="bg-blue-50/80 hover:bg-blue-100 text-[#1967D2] border-none rounded-full px-3 py-1 text-[10px] sm:text-[11px] font-bold transition-colors">{job.isRemote ? "Remoto" : "Presencial"}</Badge>
                        {job.type === 'MANAGED' && (
                          <Badge className="bg-orange-50/80 hover:bg-orange-100 text-orange-600 border-none rounded-full px-3 py-1 text-[10px] sm:text-[11px] font-bold transition-colors flex items-center gap-1">
                            <Zap className="h-3 w-3 fill-current" /> Patrocinada
                          </Badge>
                        )}
                      </div>
                      <div className="hidden md:block">
                        <Link href={`/jobs/${job.slug}`} className="relative z-[2]">
                          <Button className="rounded-lg h-9 w-9 p-0 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm border border-slate-200 bg-white text-slate-400">
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="pt-10 pb-8">
              <PaginationBar
                page={page}
                totalPages={totalPages}
                baseHref="/jobs"
                params={paginationParams}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
