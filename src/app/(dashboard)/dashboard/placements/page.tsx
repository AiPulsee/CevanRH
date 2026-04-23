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
  CheckCircle2, 
  XCircle, 
  Timer,
  DollarSign,
  CalendarDays,
  Info,
  ArrowUpRight,
  AlertTriangle,
  TrendingUp,
  Ban,
  Users
} from "lucide-react";
import { motion } from "framer-motion";

export default function DashboardPlacementsPage() {
  // Mock data — será substituído por dados reais do getPlacements()
  const placements = [
    {
      id: "1",
      candidate: { name: "Alexandre Silva", email: "alex@email.com", image: null },
      job: { title: "Senior Frontend Engineer" },
      status: "TRIAL" as const,
      monthlySalary: 800000,
      startDate: "2026-03-15",
      trialEndDate: "2026-06-13",
      daysRemaining: 52,
      daysElapsed: 38,
      commission: null,
    },
    {
      id: "2",
      candidate: { name: "Beatriz Oliveira", email: "bia@email.com", image: null },
      job: { title: "Product Designer" },
      status: "TRIAL" as const,
      monthlySalary: 650000,
      startDate: "2026-04-01",
      trialEndDate: "2026-06-30",
      daysRemaining: 69,
      daysElapsed: 21,
      commission: null,
    },
    {
      id: "3",
      candidate: { name: "Carlos Mendes", email: "carlos@email.com", image: null },
      job: { title: "Backend Developer (Node.js)" },
      status: "TRIAL" as const,
      monthlySalary: 1200000,
      startDate: "2026-04-10",
      trialEndDate: "2026-07-09",
      daysRemaining: 5,
      daysElapsed: 85,
      commission: null,
    },
    {
      id: "4",
      candidate: { name: "Daniela Costa", email: "dani@email.com", image: null },
      job: { title: "Aerospace Engineer" },
      status: "EFFECTIVE" as const,
      monthlySalary: 1500000,
      startDate: "2026-01-10",
      trialEndDate: "2026-04-10",
      daysRemaining: 0,
      daysElapsed: 90,
      commission: { amount: 750000, status: "PENDING" },
    },
    {
      id: "5",
      candidate: { name: "Eduardo Ramos", email: "edu@email.com", image: null },
      job: { title: "Cloud Solutions Architect" },
      status: "EFFECTIVE" as const,
      monthlySalary: 2000000,
      startDate: "2025-12-01",
      trialEndDate: "2026-03-01",
      daysRemaining: 0,
      daysElapsed: 90,
      commission: { amount: 1000000, status: "PAID" },
    },
  ];

  const formatCurrency = (cents: number) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(cents / 100);
  };

  const trialPlacements = placements.filter(p => p.status === "TRIAL");
  const effectivePlacements = placements.filter(p => p.status === "EFFECTIVE");
  const urgentPlacements = trialPlacements.filter(p => p.daysRemaining <= 15);

  return (
    <TooltipProvider>
      <div className="space-y-6 animate-in fade-in duration-500">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-blue-600 mb-1">
              <UserCheck className="h-4 w-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">Recrutamento Cevan</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900">Funcionários Alocados</h2>
            <p className="text-sm text-slate-500 font-medium">Candidatos selecionados pela Cevan em período de experiência na sua empresa.</p>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { name: "Em Experiência", value: trialPlacements.length.toString(), icon: Clock, desc: "Candidatos em período de trial ativo na sua empresa." },
            { name: "Efetivados", value: effectivePlacements.length.toString(), icon: CheckCircle2, desc: "Candidatos que foram efetivados após o período de trial." },
            { name: "Vencem em Breve", value: urgentPlacements.length.toString(), icon: AlertTriangle, desc: "Trials que vencem nos próximos 15 dias — requer sua decisão." },
            { name: "Comissões Devidas", value: formatCurrency(effectivePlacements.reduce((sum, p) => sum + (p.commission?.amount || 0), 0)), icon: DollarSign, desc: "Valor total das comissões geradas por efetivações." },
          ].map((stat, i) => (
            <Card key={i} className="p-5 bg-white border-slate-200 rounded-2xl shadow-sm group">
              <div className="flex items-start justify-between">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 group-hover:bg-blue-50 group-hover:border-blue-100 transition-all">
                  <stat.icon className="h-4 w-4 text-slate-600 group-hover:text-blue-600" />
                </div>
                <Tooltip>
                  <TooltipTrigger className="cursor-help">
                    <Info className="h-3 w-3 text-slate-300 hover:text-blue-500 transition-colors" />
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-[200px] text-center">{stat.desc}</TooltipContent>
                </Tooltip>
              </div>
              <div className="mt-4">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.name}</p>
                <h3 className="text-xl font-black mt-0.5 text-slate-900">{stat.value}</h3>
              </div>
            </Card>
          ))}
        </div>

        {/* Urgência - Alerta */}
        {urgentPlacements.length > 0 && (
          <Card className="p-4 border-amber-200 bg-amber-50 rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-amber-900">Decisão necessária</h4>
                <p className="text-xs text-amber-700 font-medium">
                  {urgentPlacements.length} colaborador(es) com período de experiência prestes a encerrar. Confirme a efetivação ou informe o encerramento.
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Em Período de Experiência */}
        {trialPlacements.length > 0 && (
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Timer className="h-5 w-5 text-amber-500" />
              Em Período de Experiência
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {trialPlacements.map((placement, i) => {
                const progress = ((90 - placement.daysRemaining) / 90) * 100;
                const isUrgent = placement.daysRemaining <= 7;
                const isWarning = placement.daysRemaining <= 15;

                return (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    key={placement.id}
                  >
                    <Card className={`p-5 bg-white rounded-2xl shadow-sm transition-all hover:shadow-md ${
                      isUrgent ? "border-rose-200" : isWarning ? "border-amber-200" : "border-slate-200"
                    }`}>
                      {/* Candidato */}
                      <div className="flex items-center gap-3 mb-5">
                        <div className={`h-11 w-11 rounded-xl flex items-center justify-center font-black text-sm ${
                          isUrgent ? "bg-rose-50 text-rose-600 border border-rose-200" :
                          isWarning ? "bg-amber-50 text-amber-600 border border-amber-200" :
                          "bg-blue-50 text-blue-600 border border-blue-100"
                        }`}>
                          {placement.candidate.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-sm text-slate-900 truncate">{placement.candidate.name}</p>
                          <p className="text-[11px] text-slate-400 font-medium truncate">{placement.job.title}</p>
                        </div>
                        {isUrgent && (
                          <span className="animate-pulse h-2.5 w-2.5 bg-rose-500 rounded-full flex-shrink-0" />
                        )}
                      </div>

                      {/* Countdown */}
                      <div className={`p-4 rounded-xl mb-4 ${
                        isUrgent ? "bg-rose-50 border border-rose-100" :
                        isWarning ? "bg-amber-50 border border-amber-100" :
                        "bg-slate-50 border border-slate-100"
                      }`}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-bold text-slate-500 uppercase">Período Restante</span>
                          <span className={`text-lg font-black ${
                            isUrgent ? "text-rose-600" : isWarning ? "text-amber-600" : "text-blue-600"
                          }`}>
                            {placement.daysRemaining}
                            <span className="text-[10px] font-bold text-slate-400 ml-1">dias</span>
                          </span>
                        </div>
                        <div className="h-2 w-full bg-white rounded-full overflow-hidden shadow-inner">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 1.2, delay: i * 0.1 }}
                            className={`h-full rounded-full ${
                              isUrgent ? "bg-rose-500" : isWarning ? "bg-amber-500" : "bg-blue-500"
                            }`}
                          />
                        </div>
                        <div className="flex justify-between mt-1.5 text-[9px] font-bold text-slate-400">
                          <span>{new Date(placement.startDate).toLocaleDateString("pt-BR")}</span>
                          <span>{new Date(placement.trialEndDate).toLocaleDateString("pt-BR")}</span>
                        </div>
                      </div>

                      {/* Info */}
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                          <p className="text-[8px] font-bold text-slate-400 uppercase">Salário</p>
                          <p className="text-xs font-black text-slate-900">{formatCurrency(placement.monthlySalary)}</p>
                        </div>
                        <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                          <p className="text-[8px] font-bold text-slate-400 uppercase">Comissão (50%)</p>
                          <p className="text-xs font-black text-slate-900">{formatCurrency(placement.monthlySalary * 0.5)}</p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button className="flex-1 h-9 rounded-xl bg-emerald-600 text-white font-bold text-[10px] uppercase tracking-wider hover:bg-emerald-700 gap-1.5">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Efetivar
                        </Button>
                        <Button variant="outline" className="flex-1 h-9 rounded-xl border-slate-200 text-slate-600 font-bold text-[10px] uppercase tracking-wider hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 gap-1.5">
                          <XCircle className="h-3.5 w-3.5" />
                          Não Efetivar
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* Histórico de Efetivados */}
        {effectivePlacements.length > 0 && (
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              Efetivados
            </h3>
            <Card className="border-slate-200 bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="divide-y divide-slate-50">
                {effectivePlacements.map((placement, i) => (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    key={placement.id}
                    className="flex items-center justify-between p-4 hover:bg-slate-50/50 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center font-black text-xs">
                        {placement.candidate.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-xs text-slate-900">{placement.candidate.name}</p>
                        <p className="text-[10px] text-slate-400 font-medium">{placement.job.title}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-[9px] font-bold text-slate-400 uppercase">Salário</p>
                        <p className="text-xs font-bold text-slate-900">{formatCurrency(placement.monthlySalary)}</p>
                      </div>

                      {placement.commission && (
                        <div className="text-right">
                          <p className="text-[9px] font-bold text-slate-400 uppercase">Comissão</p>
                          <p className="text-xs font-black text-slate-900">{formatCurrency(placement.commission.amount)}</p>
                          <p className={`text-[8px] font-black uppercase tracking-widest ${
                            placement.commission.status === "PAID" ? "text-emerald-500" :
                            placement.commission.status === "PENDING" ? "text-amber-500" :
                            "text-slate-400"
                          }`}>
                            {placement.commission.status === "PAID" ? "Pago" : "Pendente"}
                          </p>
                        </div>
                      )}

                      <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 border font-bold text-[9px] uppercase tracking-wider rounded-lg px-2 py-0.5">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Efetivado
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}
