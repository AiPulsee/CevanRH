import { prisma } from "@/lib/prisma";
import { JobType } from "@prisma/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Users2, SlidersHorizontal } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Link from "next/link";
import { ResumesExportButton } from "@/components/admin/resumes-export-button";
import { PaginationBar } from "@/components/ui/pagination-bar";
import { ResumeCardWithModal } from "@/components/admin/resume-card-with-modal";
import { CompanyFilterSelect } from "@/components/admin/company-filter-select";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 15;

const STATUS_OPTIONS = [
  { value: "", label: "Todos" },
  { value: "APPLIED", label: "Inscrito" },
  { value: "SHORTLISTED", label: "Indicado" },
  { value: "HIRED", label: "Contratado" },
  { value: "REJECTED", label: "Reprovado" },
];

const TYPE_OPTIONS = [
  { value: "", label: "Todos" },
  { value: "MANAGED", label: "Curadoria" },
  { value: "SELF_SERVICE", label: "Público" },
];

const SORT_OPTIONS = [
  { value: "desc", label: "Mais recente" },
  { value: "asc", label: "Mais antigo" },
];

export default async function ResumesPage({
  searchParams,
}: {
  searchParams: Promise<{
    type?: string;
    q?: string;
    status?: string;
    sort?: string;
    company?: string;
    page?: string;
  }>;
}) {
  const {
    type: typeFilter,
    q: query,
    status: statusFilter,
    sort = "desc",
    company: companyFilter,
    page: pageParam,
  } = await searchParams;

  const page = Math.max(1, parseInt(pageParam ?? "1"));

  const where: Record<string, unknown> = {
    ...(typeFilter && { job: { type: typeFilter as JobType } }),
    ...(statusFilter && { status: statusFilter }),
    ...(companyFilter && { job: { company: { id: companyFilter } } }),
    ...(query && {
      OR: [
        { candidate: { name: { contains: query, mode: "insensitive" } } },
        { candidate: { email: { contains: query, mode: "insensitive" } } },
        { job: { title: { contains: query, mode: "insensitive" } } },
        { job: { company: { name: { contains: query, mode: "insensitive" } } } },
      ],
    }),
  };

  // When filtering by company, also need type filter on job if typeFilter set
  const whereResolved =
    typeFilter && companyFilter
      ? { ...where, job: { type: typeFilter as JobType, company: { id: companyFilter } } }
      : where;

  const [applications, totalApps, statusCounts, companies, activeJobs] = await Promise.all([
    prisma.application.findMany({
      where: whereResolved,
      include: {
        candidate: true,
        job: { include: { company: { select: { name: true } } } },
      },
      orderBy: { createdAt: sort === "asc" ? "asc" : "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.application.count({ where: whereResolved }),
    prisma.application.groupBy({
      by: ["status"],
      _count: { id: true },
    }),
    prisma.company.findMany({
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    }),
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
  const byStatus = Object.fromEntries(
    statusCounts.map((s) => [s.status, s._count.id])
  );
  const totalAll = Object.values(byStatus).reduce((a, b) => a + b, 0);

  const stats = [
    { label: "Total", value: totalAll, color: "text-slate-900", border: "border-l-slate-400" },
    { label: "Inscritos", value: byStatus["APPLIED"] ?? 0, color: "text-blue-600", border: "border-l-blue-500" },
    { label: "Indicados", value: byStatus["SHORTLISTED"] ?? 0, color: "text-emerald-600", border: "border-l-emerald-500" },
    { label: "Contratados", value: byStatus["HIRED"] ?? 0, color: "text-violet-600", border: "border-l-violet-500" },
    { label: "Reprovados", value: byStatus["REJECTED"] ?? 0, color: "text-rose-500", border: "border-l-rose-400" },
  ];

  function buildHref(overrides: Record<string, string | undefined>) {
    const params = new URLSearchParams();
    const current = { q: query, type: typeFilter, status: statusFilter, sort, company: companyFilter };
    const merged = { ...current, ...overrides, page: "1" };
    Object.entries(merged).forEach(([k, v]) => { if (v) params.set(k, v); });
    const str = params.toString();
    return `/admin/resumes${str ? `?${str}` : ""}`;
  }

  const selectCls =
    "h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-blue-500/20 outline-none appearance-none w-full";

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Banco de Currículos</h1>
          <p className="text-sm text-slate-500 font-medium">
            Gestão centralizada de todos os talentos recebidos pelo sistema.
          </p>
        </div>
        <ResumesExportButton
          searchParams={new URLSearchParams({
            ...(query && { q: query }),
            ...(typeFilter && { type: typeFilter }),
            ...(statusFilter && { status: statusFilter }),
            ...(sort !== "desc" && { sort }),
            ...(companyFilter && { company: companyFilter }),
          }).toString()}
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {stats.map((s) => (
          <Card key={s.label} className={`p-4 border-slate-200 bg-white rounded-2xl shadow-sm border-l-4 ${s.border}`}>
            <Tooltip>
              <TooltipTrigger render={
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 cursor-default w-fit">
                  {s.label}
                </p>
              } />
              <TooltipContent>Candidatos com status {s.label}</TooltipContent>
            </Tooltip>
            <h3 className={`text-2xl font-black mt-1 ${s.color}`}>{s.value}</h3>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="p-4 sm:p-5 border-slate-200 bg-white rounded-2xl shadow-sm space-y-4">
        {/* Row 1: Search + Sort */}
        <div className="flex flex-col sm:flex-row gap-3">
          <form action="/admin/resumes" method="get" className="relative flex-1">
            {typeFilter && <input type="hidden" name="type" value={typeFilter} />}
            {statusFilter && <input type="hidden" name="status" value={statusFilter} />}
            {companyFilter && <input type="hidden" name="company" value={companyFilter} />}
            {sort !== "desc" && <input type="hidden" name="sort" value={sort} />}
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              name="q"
              defaultValue={query}
              placeholder="Buscar por nome, email, vaga ou empresa..."
              className="h-11 pl-11 bg-slate-50 border-slate-200 rounded-xl text-sm font-medium w-full"
            />
          </form>

          <div className="flex items-center gap-2 shrink-0">
            <SlidersHorizontal className="h-4 w-4 text-slate-400 shrink-0" />
            {SORT_OPTIONS.map((o) => (
              <Button
                key={o.value}
                nativeButton={false}
                render={<Link href={buildHref({ sort: o.value })} />}
                variant={sort === o.value || (!sort && o.value === "desc") ? "secondary" : "ghost"}
                className="rounded-xl font-bold text-xs h-11 px-4"
              >
                {o.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Row 2: Type + Status + Company */}
        <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
          {/* Type */}
          <div className="flex items-center gap-1 bg-slate-100 rounded-xl p-1 shrink-0">
            {TYPE_OPTIONS.map((o) => (
              <Button
                key={o.value}
                nativeButton={false}
                render={<Link href={buildHref({ type: o.value || undefined })} />}
                variant="ghost"
                className={cn(
                  "rounded-lg font-bold text-xs h-9 px-3 transition-all",
                  (typeFilter ?? "") === o.value
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                )}
              >
                {o.label}
              </Button>
            ))}
          </div>

          {/* Status */}
          <div className="flex items-center gap-1 bg-slate-100 rounded-xl p-1 flex-wrap shrink-0">
            {STATUS_OPTIONS.map((o) => (
              <Button
                key={o.value}
                nativeButton={false}
                render={<Link href={buildHref({ status: o.value || undefined })} />}
                variant="ghost"
                className={cn(
                  "rounded-lg font-bold text-xs h-9 px-3 transition-all",
                  (statusFilter ?? "") === o.value
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                )}
              >
                {o.label}
                {o.value && byStatus[o.value] ? (
                  <span className="ml-1.5 text-[9px] font-black text-slate-400">
                    {byStatus[o.value]}
                  </span>
                ) : null}
              </Button>
            ))}
          </div>

          {/* Company */}
          <div className="flex-1 min-w-[180px]">
            <CompanyFilterSelect
              companies={companies}
              value={companyFilter ?? ""}
              baseUrl={buildHref({ company: undefined })}
              className={selectCls}
            />
          </div>
        </div>

        {/* Active filters summary + clear */}
        {(query || typeFilter || statusFilter || companyFilter || sort === "asc") && (
          <div className="flex items-center gap-2 pt-1 border-t border-slate-100">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Filtros ativos:</span>
            <div className="flex flex-wrap gap-1.5">
              {query && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-700 rounded-lg text-[10px] font-black">
                  Busca: &ldquo;{query}&rdquo;
                </span>
              )}
              {typeFilter && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-700 rounded-lg text-[10px] font-black">
                  {typeFilter === "MANAGED" ? "Curadoria" : "Público"}
                </span>
              )}
              {statusFilter && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-700 rounded-lg text-[10px] font-black">
                  {STATUS_OPTIONS.find((s) => s.value === statusFilter)?.label}
                </span>
              )}
              {companyFilter && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-700 rounded-lg text-[10px] font-black">
                  {companies.find((c) => c.id === companyFilter)?.name}
                </span>
              )}
              {sort === "asc" && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-700 rounded-lg text-[10px] font-black">
                  Mais antigo
                </span>
              )}
            </div>
            <Button
              nativeButton={false}
              render={<Link href="/admin/resumes" />}
              variant="ghost"
              className="h-7 px-3 rounded-lg text-[10px] font-black text-slate-400 hover:text-rose-600 ml-auto"
            >
              Limpar tudo
            </Button>
          </div>
        )}
      </Card>

      {/* Results count */}
      <p className="text-xs font-bold text-slate-400 -mt-2">
        {totalApps} resultado{totalApps !== 1 ? "s" : ""}
        {query && <> para &ldquo;{query}&rdquo;</>}
      </p>

      {/* List */}
      <div className="space-y-3 -mt-2">
        {applications.length === 0 ? (
          <Card className="p-12 text-center border-slate-200 bg-white rounded-2xl">
            <Users2 className="h-12 w-12 text-slate-200 mx-auto mb-4" />
            <p className="text-slate-400 font-bold">Nenhum currículo encontrado com estes filtros.</p>
            <Button
              nativeButton={false}
              render={<Link href="/admin/resumes" />}
              variant="ghost"
              className="mt-4 rounded-xl font-bold text-xs h-10 px-6 text-slate-400"
            >
              Limpar filtros
            </Button>
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
            ...(statusFilter && { status: statusFilter }),
            ...(sort !== "desc" && { sort }),
            ...(companyFilter && { company: companyFilter }),
          }}
        />
      )}
    </div>
  );
}
