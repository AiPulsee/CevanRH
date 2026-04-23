"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { 
  UserCheck, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Users2, 
  TrendingUp, 
  Timer,
  Building2,
  ArrowRight,
  Info,
  DollarSign,
  CalendarDays,
  Search,
  Filter,
  Ban
} from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";

export default function AdminPlacementsPage() {
  // Mock data — será substituído por dados reais do getPlacements()
  const stats = [
    { name: "Em Trial", value: "12", icon: Clock, change: "3 vencem esta semana", color: "amber" },
    { name: "Efetivados", value: "34", icon: CheckCircle2, change: "+5 este mês", color: "emerald" },
    { name: "Taxa de Conversão", value: "73.9%", icon: TrendingUp, change: "+2.1%", color: "blue" },
    { name: "Receita Potencial", value: "R$ 18.4k", icon: DollarSign, change: "Em trials ativos", color: "indigo" },
  ];

  const placements = [
    {
      id: "1",
      candidate: { name: "Alexandre Silva", email: "alex@email.com" },
      company: { name: "Apple Inc.", slug: "apple" },
      job: { title: "Senior Frontend Engineer" },
      status: "TRIAL" as const,
      monthlySalary: 800000, // R$ 8.000,00
      startDate: "2026-03-15",
      trialEndDate: "2026-06-13",
      daysRemaining: 52,
      commission: null,
    },
    {
      id: "2",
      candidate: { name: "Beatriz Oliveira", email: "bia@email.com" },
      company: { name: "Nubank", slug: "nubank" },
      job: { title: "Product Designer" },
      status: "TRIAL" as const,
      monthlySalary: 650000,
      startDate: "2026-04-01",
      trialEndDate: "2026-06-30",
      daysRemaining: 69,
      commission: null,
    },
    {
      id: "3",
      candidate: { name: "Carlos Mendes", email: "carlos@email.com" },
      company: { name: "Tesla", slug: "tesla" },
      job: { title: "Backend Developer (Node.js)" },
      status: "TRIAL" as const,
      monthlySalary: 1200000,
      startDate: "2026-04-10",
      trialEndDate: "2026-07-09",
      daysRemaining: 5,
      commission: null,
    },
    {
      id: "4",
      candidate: { name: "Daniela Costa", email: "dani@email.com" },
      company: { name: "SpaceX", slug: "spacex" },
      job: { title: "Aerospace Engineer" },
      status: "EFFECTIVE" as const,
      monthlySalary: 1500000,
      startDate: "2026-01-10",
      trialEndDate: "2026-04-10",
      daysRemaining: 0,
      commission: { amount: 750000, status: "PENDING" },
    },
    {
      id: "5",
      candidate: { name: "Eduardo Ramos", email: "edu@email.com" },
      company: { name: "Microsoft", slug: "microsoft" },
      job: { title: "Cloud Solutions Architect" },
      status: "EFFECTIVE" as const,
      monthlySalary: 2000000,
      startDate: "2025-12-01",
      trialEndDate: "2026-03-01",
      daysRemaining: 0,
      commission: { amount: 1000000, status: "PAID" },
    },
    {
      id: "6",
      candidate: { name: "Fernanda Lima", email: "fer@email.com" },
      company: { name: "Vercel", slug: "vercel" },
      job: { title: "Developer Relations" },
      status: "TERMINATED" as const,
      monthlySalary: 700000,
      startDate: "2026-02-15",
      trialEndDate: "2026-05-16",
      daysRemaining: 0,
      commission: null,
    },
  ];

  const formatCurrency = (cents: number) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(cents / 100);
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "TRIAL":
        return { label: "Em Trial", color: "bg-amber-50 text-amber-700 border-amber-200", icon: Clock, dotColor: "bg-amber-500" };
      case "EFFECTIVE":
        return { label: "Efetivado", color: "bg-emerald-50 text-emerald-700 border-emerald-200", icon: CheckCircle2, dotColor: "bg-emerald-500" };
      case "TERMINATED":
        return { label: "Encerrado", color: "bg-rose-50 text-rose-700 border-rose-200", icon: XCircle, dotColor: "bg-rose-500" };
      case "CANCELLED":
        return { label: "Cancelado", color: "bg-slate-100 text-slate-500 border-slate-200", icon: Ban, dotColor: "bg-slate-400" };
      default:
        return { label: status, color: "bg-slate-100 text-slate-600", icon: Clock, dotColor: "bg-slate-400" };
    }
  };

  const getTrialProgress = (daysRemaining: number) => {
    const progress = Math.max(0, Math.min(100, ((90 - daysRemaining) / 90) * 100));
    return progress;
  };

  const getTrialUrgency = (daysRemaining: number) => {
    if (daysRemaining <= 7) return "text-rose-600 bg-rose-50";
    if (daysRemaining <= 15) return "text-amber-600 bg-amber-50";
    return "text-slate-600 bg-slate-50";
  };

  return (
    <TooltipProvider>
      <div className="space-y-6 animate-in fade-in duration-500">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-blue-600 mb-1">
              <UserCheck className="h-4 w-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">Módulo de Recrutamento</span>
            </div>
            <h1 className="text-2xl font-black text-slate-900">Alocações</h1>
            <p className="text-sm text-slate-500 font-medium">Gerencie candidatos alocados em empresas e acompanhe o período de experiência.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="h-10 rounded-xl border-slate-200 font-bold text-xs text-slate-600 gap-2">
              <Filter className="h-3.5 w-3.5" />
              Filtrar
            </Button>
            <Button className="h-10 rounded-xl bg-slate-900 text-white font-bold text-xs gap-2">
              <UserCheck className="h-3.5 w-3.5" />
              Nova Alocação
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              key={i}
            >
              <Card className="p-5 border-slate-200 bg-white rounded-2xl shadow-sm relative overflow-hidden">
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-10 w-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                      <stat.icon className="h-5 w-5 text-slate-600" />
                    </div>
                    <Badge className="bg-slate-100 text-slate-600 border-none font-bold text-[10px]">
                      {stat.change}
                    </Badge>
                  </div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.name}</p>
                  <h3 className="text-2xl font-black text-slate-900">{stat.value}</h3>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Alertas de Vencimento */}
        {placements.filter(p => p.status === "TRIAL" && p.daysRemaining <= 7).length > 0 && (
          <Card className="p-4 border-amber-200 bg-amber-50 rounded-2xl shadow-sm">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-amber-900">Atenção: Alocações prestes a vencer</h4>
                <p className="text-xs text-amber-700 font-medium">
                  {placements.filter(p => p.status === "TRIAL" && p.daysRemaining <= 7).length} alocação(ões) com menos de 7 dias para o fim do trial. Contate as empresas para confirmar efetivação.
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Tabela de Alocações */}
        <Card className="border-slate-200 bg-white rounded-2xl shadow-sm overflow-hidden">
          {/* Search & Filter Bar */}
          <div className="p-4 border-b border-slate-100 flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input 
                placeholder="Buscar por candidato ou empresa..." 
                className="pl-10 h-9 border-slate-200 rounded-xl text-xs font-medium"
              />
            </div>
            <div className="flex gap-1.5">
              {["Todos", "Em Trial", "Efetivados", "Encerrados"].map((filter) => (
                <button
                  key={filter}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${
                    filter === "Todos"
                      ? "bg-slate-900 text-white"
                      : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Candidato</th>
                  <th className="text-left p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Empresa / Vaga</th>
                  <th className="text-left p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Salário</th>
                  <th className="text-left p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="text-left p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Trial</th>
                  <th className="text-left p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Comissão</th>
                  <th className="text-right p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Ações</th>
                </tr>
              </thead>
              <tbody>
                {placements.map((placement, i) => {
                  const statusConfig = getStatusConfig(placement.status);
                  const progress = getTrialProgress(placement.daysRemaining);
                  
                  return (
                    <motion.tr
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.03 }}
                      key={placement.id}
                      className="border-b border-slate-50 hover:bg-slate-50/50 transition-all group"
                    >
                      {/* Candidato */}
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center font-black text-xs">
                            {placement.candidate.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-xs text-slate-900">{placement.candidate.name}</p>
                            <p className="text-[10px] text-slate-400 font-medium">{placement.candidate.email}</p>
                          </div>
                        </div>
                      </td>

                      {/* Empresa / Vaga */}
                      <td className="p-4">
                        <div>
                          <p className="font-bold text-xs text-slate-900">{placement.company.name}</p>
                          <p className="text-[10px] text-slate-400 font-medium">{placement.job.title}</p>
                        </div>
                      </td>

                      {/* Salário */}
                      <td className="p-4">
                        <p className="font-black text-xs text-slate-900">{formatCurrency(placement.monthlySalary)}</p>
                        <p className="text-[9px] text-slate-400 font-bold uppercase">mensal</p>
                      </td>

                      {/* Status */}
                      <td className="p-4">
                        <Badge className={`${statusConfig.color} border font-bold text-[9px] uppercase tracking-wider rounded-lg px-2 py-0.5`}>
                          <statusConfig.icon className="h-3 w-3 mr-1" />
                          {statusConfig.label}
                        </Badge>
                      </td>

                      {/* Trial Progress */}
                      <td className="p-4">
                        {placement.status === "TRIAL" ? (
                          <div className="space-y-1.5 min-w-[120px]">
                            <div className="flex items-center justify-between">
                              <span className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded ${getTrialUrgency(placement.daysRemaining)}`}>
                                {placement.daysRemaining}d restantes
                              </span>
                              <span className="text-[9px] font-bold text-slate-400">{Math.round(progress)}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 1, delay: i * 0.1 }}
                                className={`h-full rounded-full ${
                                  placement.daysRemaining <= 7 ? "bg-rose-500" : 
                                  placement.daysRemaining <= 15 ? "bg-amber-500" : 
                                  "bg-blue-500"
                                }`}
                              />
                            </div>
                          </div>
                        ) : placement.status === "EFFECTIVE" ? (
                          <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-1">
                            <CheckCircle2 className="h-3.5 w-3.5" /> Concluído
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-slate-400">—</span>
                        )}
                      </td>

                      {/* Comissão */}
                      <td className="p-4">
                        {placement.commission ? (
                          <div>
                            <p className="font-black text-xs text-slate-900">{formatCurrency(placement.commission.amount)}</p>
                            <p className={`text-[8px] font-black uppercase tracking-widest mt-0.5 ${
                              placement.commission.status === "PAID" ? "text-emerald-500" :
                              placement.commission.status === "PENDING" ? "text-amber-500" :
                              "text-slate-400"
                            }`}>
                              {placement.commission.status === "PAID" ? "Pago" :
                               placement.commission.status === "PENDING" ? "Pendente" :
                               placement.commission.status}
                            </p>
                          </div>
                        ) : placement.status === "TRIAL" ? (
                          <div>
                            <p className="font-bold text-[10px] text-slate-400">{formatCurrency(placement.monthlySalary * 0.5)}</p>
                            <p className="text-[8px] font-bold text-slate-300 uppercase">Potencial</p>
                          </div>
                        ) : (
                          <span className="text-[10px] font-bold text-slate-300">—</span>
                        )}
                      </td>

                      {/* Ações */}
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-all">
                          {placement.status === "TRIAL" && (
                            <>
                              <Tooltip>
                                <TooltipTrigger>
                                  <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg hover:bg-emerald-50 hover:text-emerald-600">
                                    <CheckCircle2 className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>Confirmar Efetivação</TooltipContent>
                              </Tooltip>
                              <Tooltip>
                                <TooltipTrigger>
                                  <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg hover:bg-rose-50 hover:text-rose-600">
                                    <XCircle className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>Encerrar Trial</TooltipContent>
                              </Tooltip>
                            </>
                          )}
                          {placement.commission?.status === "PENDING" && (
                            <Tooltip>
                              <TooltipTrigger>
                                <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg hover:bg-blue-50 hover:text-blue-600">
                                  <DollarSign className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Gerenciar Comissão</TooltipContent>
                            </Tooltip>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Cards de Timeline/Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Próximos Vencimentos */}
          <Card className="p-6 border-slate-200 bg-white rounded-2xl shadow-sm">
            <div className="flex items-center gap-2 mb-5">
              <CalendarDays className="h-4 w-4 text-amber-500" />
              <h3 className="text-sm font-bold text-slate-900">Próximos Vencimentos</h3>
            </div>
            <div className="space-y-3">
              {placements
                .filter(p => p.status === "TRIAL")
                .sort((a, b) => a.daysRemaining - b.daysRemaining)
                .map((p) => (
                  <div key={p.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <div className={`h-2 w-2 rounded-full ${
                        p.daysRemaining <= 7 ? "bg-rose-500 animate-pulse" :
                        p.daysRemaining <= 15 ? "bg-amber-500" : "bg-blue-500"
                      }`} />
                      <div>
                        <p className="text-[11px] font-bold text-slate-900">{p.candidate.name}</p>
                        <p className="text-[9px] text-slate-400 font-medium">{p.company.name}</p>
                      </div>
                    </div>
                    <span className={`text-[10px] font-black px-2 py-1 rounded-lg ${getTrialUrgency(p.daysRemaining)}`}>
                      {p.daysRemaining}d
                    </span>
                  </div>
                ))}
            </div>
          </Card>

          {/* Performance de Conversão */}
          <Card className="p-6 border-slate-200 bg-white rounded-2xl shadow-sm">
            <div className="flex items-center gap-2 mb-5">
              <TrendingUp className="h-4 w-4 text-emerald-500" />
              <h3 className="text-sm font-bold text-slate-900">Performance</h3>
            </div>
            <div className="space-y-5">
              {[
                { label: "Taxa de Efetivação", value: "73.9%", bar: 73.9, color: "bg-emerald-500" },
                { label: "Tempo Médio de Trial", value: "78 dias", bar: 86.7, color: "bg-blue-500" },
                { label: "Satisfação da Empresa", value: "92%", bar: 92, color: "bg-indigo-500" },
              ].map((metric) => (
                <div key={metric.label} className="space-y-1.5">
                  <div className="flex justify-between text-[10px] font-bold">
                    <span className="text-slate-500">{metric.label}</span>
                    <span className="text-slate-900">{metric.value}</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${metric.bar}%` }}
                      transition={{ duration: 1 }}
                      className={`h-full ${metric.color} rounded-full`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Receita de Curadoria */}
          <Card className="p-6 border-none bg-blue-600 text-white rounded-2xl shadow-sm">
            <h3 className="text-sm font-bold mb-4">Receita de Curadoria</h3>
            <div className="space-y-4">
              <div>
                <p className="text-[9px] font-bold uppercase text-blue-200">Recebido (Mês)</p>
                <p className="text-2xl font-black">R$ 10.000</p>
                <div className="h-1 w-full bg-white/20 rounded-full mt-1.5">
                  <div className="h-full bg-white rounded-full w-[65%]" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 rounded-lg bg-white/10">
                  <p className="text-[8px] font-bold uppercase text-blue-100">Pendente</p>
                  <p className="text-sm font-black">R$ 7.500</p>
                </div>
                <div className="p-3 rounded-lg bg-white/10">
                  <p className="text-[8px] font-bold uppercase text-blue-100">Potencial</p>
                  <p className="text-sm font-black">R$ 18.4k</p>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                <p className="text-[9px] text-blue-200 font-medium leading-relaxed">
                  Com 12 candidatos em trial, a receita potencial de comissões é de <span className="font-black text-white">R$ 18.400</span> nos próximos 90 dias.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </TooltipProvider>
  );
}
