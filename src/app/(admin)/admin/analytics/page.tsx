import { Card } from "@/components/ui/card";
import { TrendingUp, Users, Building2, Target, ArrowUpRight } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { prisma } from "@/lib/prisma";
import { format, startOfMonth, subMonths } from "date-fns";
import { ptBR } from "date-fns/locale";

export default async function AdminAnalyticsPage() {
  const now = new Date();

  const [
    totalCompanies,
    totalApplications,
    totalJobs,
    totalPlacements,
    applicationsByStatus,
    jobsByType,
  ] = await Promise.all([
    prisma.company.count(),
    prisma.application.count(),
    prisma.job.count(),
    prisma.placement.count(),
    prisma.application.groupBy({ by: ["status"], _count: { id: true } }),
    prisma.job.groupBy({ by: ["type"], _count: { id: true } }),
  ]);

  // Applications per month — last 6 months
  const months = Array.from({ length: 6 }, (_, i) => {
    const d = subMonths(now, 5 - i);
    return { start: startOfMonth(d), label: format(d, "MMM", { locale: ptBR }) };
  });
  const appsByMonth = await Promise.all(
    months.map(async (m) => {
      const end = new Date(m.start);
      end.setMonth(end.getMonth() + 1);
      const count = await prisma.application.count({
        where: { createdAt: { gte: m.start, lt: end } },
      });
      return { label: m.label, count };
    })
  );
  const maxApps = Math.max(...appsByMonth.map((m) => m.count), 1);

  // New companies per month — last 6 months
  const companiesByMonth = await Promise.all(
    months.map(async (m) => {
      const end = new Date(m.start);
      end.setMonth(end.getMonth() + 1);
      const count = await prisma.company.count({
        where: { createdAt: { gte: m.start, lt: end } },
      });
      return { label: m.label, count };
    })
  );
  const maxCompanies = Math.max(...companiesByMonth.map((m) => m.count), 1);

  // Funnel
  const statusMap = Object.fromEntries(
    applicationsByStatus.map((s) => [s.status, s._count.id])
  );
  const funnel = [
    { label: "Candidaturas", count: totalApplications, color: "bg-blue-500" },
    {
      label: "Em Revisão",
      count: statusMap["REVIEWING"] ?? 0,
      color: "bg-indigo-500",
    },
    {
      label: "Selecionados",
      count: statusMap["SHORTLISTED"] ?? 0,
      color: "bg-violet-500",
    },
    { label: "Contratados", count: statusMap["HIRED"] ?? 0, color: "bg-emerald-500" },
    { label: "Efetivados", count: totalPlacements, color: "bg-teal-500" },
  ];
  const maxFunnel = Math.max(...funnel.map((f) => f.count), 1);

  // Job type distribution
  const typeMap = Object.fromEntries(jobsByType.map((t) => [t.type, t._count.id]));
  const managed = typeMap["MANAGED"] ?? 0;
  const selfService = typeMap["SELF_SERVICE"] ?? 0;
  const totalForPct = managed + selfService || 1;

  const stats = [
    {
      name: "Empresas Cadastradas",
      value: totalCompanies,
      icon: Building2,
      color: "text-blue-600",
      bg: "bg-blue-50",
      tooltip: "Total de empresas clientes cadastradas na plataforma desde o início",
    },
    {
      name: "Total de Candidaturas",
      value: totalApplications,
      icon: Users,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      tooltip: "Número acumulado de candidaturas recebidas em todas as vagas, de todos os períodos",
    },
    {
      name: "Vagas Publicadas",
      value: totalJobs,
      icon: Target,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      tooltip: "Total de vagas criadas na plataforma — inclui Curadoria e Self-Service de todos os status",
    },
    {
      name: "Alocações Totais",
      value: totalPlacements,
      icon: TrendingUp,
      color: "text-amber-600",
      bg: "bg-amber-50",
      tooltip: "Total histórico de candidatos alocados (em andamento + efetivados + encerrados)",
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Relatórios Gerais</h1>
        <p className="text-sm text-slate-500 font-medium">
          Análise de performance e crescimento da plataforma.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.name} className="p-4 sm:p-5 border-slate-200 bg-white rounded-2xl shadow-sm">
            <Tooltip>
              <TooltipTrigger render={
                <div className={`h-10 w-10 rounded-xl ${stat.bg} flex items-center justify-center mb-4 cursor-default`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              } />
              <TooltipContent>{stat.tooltip}</TooltipContent>
            </Tooltip>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              {stat.name}
            </p>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">{stat.value}</h3>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Applications per month */}
        <Card className="p-4 sm:p-6 border-slate-200 bg-white rounded-2xl shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-base font-bold text-slate-900">Volume de Candidaturas</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">
                Últimos 6 Meses
              </p>
            </div>
            <div className="flex items-center gap-1 text-emerald-600 text-xs font-bold">
              <ArrowUpRight className="h-3.5 w-3.5" />
              {appsByMonth[5]?.count ?? 0} este mês
            </div>
          </div>
          <div className="h-[180px] w-full flex items-end gap-1.5 sm:gap-3 px-1 sm:px-2">
            {appsByMonth.map((bar, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                <span className="text-[9px] font-black text-slate-400">
                  {bar.count > 0 ? bar.count : ""}
                </span>
                <div className="w-full flex flex-col justify-end" style={{ height: "140px" }}>
                  <div
                    className={`w-full rounded-lg transition-all duration-500 ${
                      i === 5 ? "bg-blue-600" : "bg-slate-100"
                    } group-hover:bg-blue-400`}
                    style={{ height: `${Math.max((bar.count / maxApps) * 100, 4)}%` }}
                  />
                </div>
                <span className="text-[9px] font-bold text-slate-400 uppercase">
                  {bar.label}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* New companies per month */}
        <Card className="p-4 sm:p-6 border-slate-200 bg-white rounded-2xl shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-base font-bold text-slate-900">Novas Empresas</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">
                Últimos 6 Meses
              </p>
            </div>
            <div className="flex items-center gap-1 text-blue-600 text-xs font-bold">
              <ArrowUpRight className="h-3.5 w-3.5" />
              {companiesByMonth[5]?.count ?? 0} este mês
            </div>
          </div>
          <div className="h-[180px] w-full flex items-end gap-1.5 sm:gap-3 px-1 sm:px-2">
            {companiesByMonth.map((bar, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                <span className="text-[9px] font-black text-slate-400">
                  {bar.count > 0 ? bar.count : ""}
                </span>
                <div className="w-full flex flex-col justify-end" style={{ height: "140px" }}>
                  <div
                    className={`w-full rounded-lg transition-all duration-500 ${
                      i === 5 ? "bg-indigo-600" : "bg-slate-100"
                    } group-hover:bg-indigo-400`}
                    style={{ height: `${Math.max((bar.count / maxCompanies) * 100, 4)}%` }}
                  />
                </div>
                <span className="text-[9px] font-bold text-slate-400 uppercase">
                  {bar.label}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Conversion funnel */}
        <Card className="p-6 border-slate-200 bg-white rounded-2xl shadow-sm">
          <h3 className="text-base font-bold text-slate-900 mb-6">Funil de Conversão</h3>
          <div className="space-y-3">
            {funnel.map((step) => (
              <div key={step.label} className="space-y-1">
                <div className="flex justify-between text-[11px] font-bold">
                  <span className="text-slate-600">{step.label}</span>
                  <span className="text-slate-900">{step.count}</span>
                </div>
                <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${step.color} rounded-full transition-all duration-700`}
                    style={{ width: `${Math.max((step.count / maxFunnel) * 100, 2)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          {totalApplications > 0 && (
            <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">
                Taxa de Efetivação
              </p>
              <p className="text-sm font-black text-slate-900">
                {((totalPlacements / totalApplications) * 100).toFixed(1)}% das candidaturas
                resultam em efetivação
              </p>
            </div>
          )}
        </Card>

        {/* Job type distribution */}
        <Card className="p-6 border-slate-200 bg-white rounded-2xl shadow-sm">
          <h3 className="text-base font-bold text-slate-900 mb-6">Distribuição de Vagas</h3>
          <div className="space-y-5">
            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px] font-bold">
                <span className="text-slate-600">Curadoria (Managed)</span>
                <span className="text-slate-900">
                  {managed} ({Math.round((managed / totalForPct) * 100)}%)
                </span>
              </div>
              <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full transition-all duration-700"
                  style={{ width: `${(managed / totalForPct) * 100}%` }}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px] font-bold">
                <span className="text-slate-600">Self-Service</span>
                <span className="text-slate-900">
                  {selfService} ({Math.round((selfService / totalForPct) * 100)}%)
                </span>
              </div>
              <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-slate-400 rounded-full transition-all duration-700"
                  style={{ width: `${(selfService / totalForPct) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3">
            <Tooltip>
              <TooltipTrigger render={
                <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 cursor-default">
                  <p className="text-[9px] font-black uppercase text-blue-400 mb-1">
                    Tx. Candidatura / Vaga
                  </p>
                  <p className="text-xl font-black text-blue-700">
                    {totalJobs > 0 ? (totalApplications / totalJobs).toFixed(1) : "0"}x
                  </p>
                </div>
              } />
              <TooltipContent>Média de candidaturas recebidas por cada vaga publicada — indica o nível de interesse nas oportunidades</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger render={
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 cursor-default">
                  <p className="text-[9px] font-black uppercase text-emerald-400 mb-1">
                    Vagas por Empresa
                  </p>
                  <p className="text-xl font-black text-emerald-700">
                    {totalCompanies > 0 ? (totalJobs / totalCompanies).toFixed(1) : "0"}x
                  </p>
                </div>
              } />
              <TooltipContent>Média de vagas publicadas por empresa cadastrada — reflete o engajamento das empresas clientes</TooltipContent>
            </Tooltip>
          </div>
        </Card>
      </div>
    </div>
  );
}
