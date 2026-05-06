export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  Building2, Users2, Zap, TrendingUp, ArrowRight,
  ShieldAlert, Activity, Target,
  CheckCircle2,
} from "lucide-react";
import { format, startOfMonth, subMonths } from "date-fns";
import { ptBR } from "date-fns/locale";

export default async function AdminPage() {
  const now = new Date();
  const monthStart = startOfMonth(now);

  const [
    companiesCount,
    managedActiveCount,
    applicantsToScreen,
    monthlyRevenue,
    curationJobs,
    recentApplications,
    planDistribution,
    trialCount,
    effectiveCount,
  ] = await Promise.all([
    prisma.company.count(),
    prisma.job.count({ where: { type: "MANAGED", status: "ACTIVE" } }),
    prisma.application.count({ where: { status: "APPLIED" } }),
    prisma.commission.aggregate({
      where: { status: "PAID", paidAt: { gte: monthStart } },
      _sum: { amount: true },
    }),
    prisma.job.findMany({
      where: { type: "MANAGED", status: "ACTIVE" },
      include: { company: true, _count: { select: { applications: true } } },
      take: 4,
      orderBy: { createdAt: "desc" },
    }),
    prisma.application.findMany({
      take: 3,
      orderBy: { createdAt: "desc" },
      include: {
        job: { include: { company: { select: { name: true } } } },
        candidate: { select: { name: true } },
      },
    }),
    prisma.company.groupBy({ by: ["plan"], _count: { plan: true } }),
    prisma.placement.count({ where: { status: "TRIAL" } }),
    prisma.placement.count({ where: { status: "EFFECTIVE" } }),
  ]);

  // Revenue evolution — last 6 months
  const months = Array.from({ length: 6 }, (_, i) => {
    const d = subMonths(now, 5 - i);
    return { start: startOfMonth(d), label: format(d, "MMM", { locale: ptBR }) };
  });
  const revenueByMonth = await Promise.all(
    months.map(async (m) => {
      const end = new Date(m.start);
      end.setMonth(end.getMonth() + 1);
      const r = await prisma.commission.aggregate({
        where: { status: "PAID", paidAt: { gte: m.start, lt: end } },
        _sum: { amount: true },
      });
      return { label: m.label, amount: r._sum.amount || 0 };
    })
  );
  const maxRevenue = Math.max(...revenueByMonth.map((m) => m.amount), 1);
  const revenueChartBars = revenueByMonth.map((m) => ({
    ...m,
    pct: Math.round((m.amount / maxRevenue) * 100),
  }));

  // Plan distribution percentages
  const totalCompanies = companiesCount || 1;
  const planMap: Record<string, number> = {};
  planDistribution.forEach((p) => { planMap[p.plan] = p._count.plan; });
  const planBars = [
    { name: "Enterprise", val: Math.round(((planMap["ENTERPRISE"] || 0) / totalCompanies) * 100), color: "bg-blue-600" },
    { name: "Pro", val: Math.round(((planMap["PRO"] || 0) / totalCompanies) * 100), color: "bg-emerald-500" },
    { name: "Free", val: Math.round(((planMap["FREE"] || totalCompanies) / totalCompanies) * 100), color: "bg-slate-300" },
  ];

  const revenueFormatted = new Intl.NumberFormat("pt-BR", { notation: "compact", maximumFractionDigits: 1 }).format(
    (monthlyRevenue._sum.amount || 0) / 100
  );

  const stats = [
    { name: "Empresas Cadastradas", value: companiesCount.toString(), icon: Building2, change: "Total na plataforma" },
    { name: "Vagas em Curadoria", value: managedActiveCount.toString(), icon: Zap, change: "Ativas agora" },
    { name: "Candidatos p/ Triar", value: applicantsToScreen.toString(), icon: Users2, change: "Aguardando revisão" },
    { name: "Receita do Mês", value: `R$ ${revenueFormatted}`, icon: TrendingUp, change: "Comissões pagas" },
  ];

  const conversionRate = (trialCount + effectiveCount) > 0
    ? Math.round((effectiveCount / (trialCount + effectiveCount)) * 100)
    : 0;

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-slate-900">Visão Geral</h1>
          <p className="text-xs md:text-sm text-slate-500 font-medium">Controle operacional e financeiro da Cevan.</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.name} className="p-5 border-slate-200 bg-white rounded-2xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="h-10 w-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                <stat.icon className="h-5 w-5 text-slate-600" />
              </div>
              <Badge className="bg-slate-100 text-slate-600 border-none font-bold text-[10px]">{stat.change}</Badge>
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.name}</p>
            <h3 className="text-2xl font-black text-slate-900">{stat.value}</h3>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue chart */}
        <Card className="lg:col-span-2 p-6 border-slate-200 bg-white rounded-2xl shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Evolução de Receita</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Últimos 6 Meses (Comissões Pagas)</p>
            </div>
          </div>
          <div className="h-[200px] w-full flex items-end gap-3 px-2">
            {revenueChartBars.map((bar, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-3 group">
                <div className="w-full flex flex-col justify-end" style={{ height: "100%" }}>
                  <div
                    className={`w-full rounded-lg transition-all duration-500 ${i === 5 ? "bg-blue-600" : "bg-slate-100"} group-hover:bg-blue-400`}
                    style={{ height: `${Math.max(bar.pct, 4)}%` }}
                  />
                </div>
                <span className="text-[9px] font-bold text-slate-400 uppercase">{bar.label}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Plan distribution */}
        <Card className="p-6 border-slate-200 bg-white rounded-2xl shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Divisão de Clientes</h3>
          <div className="space-y-5">
            {planBars.map((p) => (
              <div key={p.name} className="space-y-1.5">
                <div className="flex justify-between text-[10px] font-bold uppercase">
                  <span className="text-slate-500">{p.name}</span>
                  <span className="text-slate-900">{p.val}%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full ${p.color} rounded-full transition-all duration-700`} style={{ width: `${p.val}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 p-4 rounded-xl bg-slate-50 border border-slate-100">
            <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Total de Empresas</p>
            <p className="text-xs font-bold text-slate-700">{companiesCount} empresas cadastradas na plataforma.</p>
          </div>
        </Card>
      </div>

      {/* Operations row */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* ATS metrics */}
        <Card className="p-6 border-slate-200 bg-white rounded-2xl shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Target className="h-4 w-4 text-indigo-600" />
            <h3 className="text-sm font-bold text-slate-900">ATS Métricas</h3>
          </div>
          <div className="text-center py-2">
            <h4 className="text-3xl font-black text-indigo-600">{conversionRate}%</h4>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Taxa de Efetivação</p>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="text-center p-2 rounded-lg bg-slate-50 border border-slate-100">
              <p className="text-[9px] font-bold text-slate-400 uppercase">Em Trial</p>
              <p className="text-xs font-black text-slate-900">{trialCount}</p>
            </div>
            <div className="text-center p-2 rounded-lg bg-slate-50 border border-slate-100">
              <p className="text-[9px] font-bold text-slate-400 uppercase">Efetivados</p>
              <p className="text-xs font-black text-emerald-600">{effectiveCount}</p>
            </div>
          </div>
        </Card>

        {/* Recent activity */}
        <Card className="lg:col-span-2 p-6 border-slate-200 bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Activity className="h-4 w-4 text-emerald-500" /> Atividade Recente
            </h3>
            <Badge className="bg-emerald-50 text-emerald-600 border-none font-bold text-[9px] uppercase">Ao Vivo</Badge>
          </div>
          <div className="space-y-2">
            {recentApplications.length > 0 ? recentApplications.map((app, i) => (
              <div key={i} className="flex items-center justify-between p-2.5 rounded-xl border border-slate-50 bg-slate-50/50">
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                  <p className="text-[11px] font-medium text-slate-700 truncate max-w-[200px]">
                    {app.candidate.name} → {app.job.title}
                  </p>
                </div>
                <span className="text-[9px] font-bold text-slate-400 shrink-0">
                  {format(new Date(app.createdAt), "dd/MM", { locale: ptBR })}
                </span>
              </div>
            )) : (
              <p className="text-xs text-slate-400 font-medium py-4 text-center">Nenhuma atividade recente.</p>
            )}
          </div>
        </Card>

        {/* Efficiency card */}
        <Card className="p-6 border-none bg-blue-600 text-white rounded-2xl shadow-sm">
          <h3 className="text-sm font-bold mb-4">Plataforma</h3>
          <div className="space-y-4">
            <div>
              <p className="text-[9px] font-bold uppercase text-blue-200">Candidaturas Totais</p>
              <p className="text-xl font-black">{applicantsToScreen}</p>
              <div className="h-1 w-full bg-white/20 rounded-full mt-1.5">
                <div className="h-full bg-white rounded-full w-full" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2 rounded-lg bg-white/10">
                <p className="text-[8px] font-bold uppercase text-blue-100">Vagas</p>
                <p className="text-sm font-black">{managedActiveCount}</p>
              </div>
              <div className="p-2 rounded-lg bg-white/10">
                <p className="text-[8px] font-bold uppercase text-blue-100">Empresas</p>
                <p className="text-sm font-black">{companiesCount}</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Curation priorities */}
      <Card className="p-6 border-slate-200 bg-white rounded-2xl shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-rose-500" /> Prioridades de Curadoria
          </h3>
          <Link href="/admin/managed" className="flex items-center gap-1 font-bold text-blue-600 text-[10px] uppercase tracking-widest px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors">
            Ver Tudo <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        {curationJobs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {curationJobs.map((job) => (
              <div key={job.id} className="p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-all cursor-pointer group">
                <div className="flex justify-between items-start mb-3">
                  <div className="h-9 w-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center font-black text-slate-400 text-xs">
                    {job.company.name.charAt(0)}
                  </div>
                  <Badge className="bg-blue-50 text-blue-600 border-none rounded-md font-bold text-[8px] uppercase">Ativo</Badge>
                </div>
                <h4 className="font-bold text-slate-900 text-xs leading-tight line-clamp-2">{job.title}</h4>
                <p className="text-[10px] font-bold text-slate-400 mt-1">{job.company.name}</p>
                <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-3">
                  <div>
                    <p className="text-[8px] font-bold text-slate-400 uppercase">Candidatos</p>
                    <p className="text-xs font-black text-blue-600">{job._count.applications}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[8px] font-bold text-slate-400 uppercase">Tipo</p>
                    <p className="text-xs font-black text-slate-900">Curadoria</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-10 text-center text-slate-400">
            <CheckCircle2 className="h-8 w-8 mx-auto mb-2 opacity-30" />
            <p className="text-sm font-medium">Nenhuma vaga de curadoria ativa no momento.</p>
          </div>
        )}
      </Card>
    </div>
  );
}
