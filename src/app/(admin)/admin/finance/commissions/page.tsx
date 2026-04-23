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
  DollarSign,
  Receipt,
  CheckCircle2,
  Clock,
  AlertCircle,
  Download,
  Filter,
  Search,
  ArrowUpRight,
  FileText,
  Ban,
  Info,
  Building2,
  TrendingUp,
  Wallet,
  CreditCard
} from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";

export default function AdminCommissionsPage() {
  // Mock data
  const stats = [
    { name: "Pendentes", value: "R$ 15.0k", count: "6", icon: Clock, color: "amber" },
    { name: "Faturadas", value: "R$ 4.5k", count: "2", icon: Receipt, color: "blue" },
    { name: "Recebidas (Mês)", value: "R$ 10.0k", count: "4", icon: CheckCircle2, color: "emerald" },
    { name: "Total Acumulado", value: "R$ 87.5k", count: "34", icon: TrendingUp, color: "indigo" },
  ];

  const commissions = [
    {
      id: "c1",
      candidate: "Eduardo Ramos",
      company: "Microsoft",
      job: "Cloud Solutions Architect",
      baseSalary: 2000000,
      percentage: 50,
      amount: 1000000,
      status: "PAID" as const,
      invoiceNumber: "NF-2026-0042",
      dueDate: "2026-04-01",
      paidAt: "2026-03-28",
    },
    {
      id: "c2",
      candidate: "Daniela Costa",
      company: "SpaceX",
      job: "Aerospace Engineer",
      baseSalary: 1500000,
      percentage: 50,
      amount: 750000,
      status: "PENDING" as const,
      invoiceNumber: null,
      dueDate: "2026-05-10",
      paidAt: null,
    },
    {
      id: "c3",
      candidate: "Gabriel Santos",
      company: "Apple Inc.",
      job: "iOS Developer",
      baseSalary: 1200000,
      percentage: 50,
      amount: 600000,
      status: "INVOICED" as const,
      invoiceNumber: "NF-2026-0055",
      dueDate: "2026-05-15",
      paidAt: null,
    },
    {
      id: "c4",
      candidate: "Helena Martins",
      company: "Nubank",
      job: "Data Scientist",
      baseSalary: 900000,
      percentage: 50,
      amount: 450000,
      status: "PENDING" as const,
      invoiceNumber: null,
      dueDate: "2026-05-20",
      paidAt: null,
    },
    {
      id: "c5",
      candidate: "Igor Pereira",
      company: "Tesla",
      job: "Firmware Engineer",
      baseSalary: 1800000,
      percentage: 50,
      amount: 900000,
      status: "PAID" as const,
      invoiceNumber: "NF-2026-0038",
      dueDate: "2026-03-15",
      paidAt: "2026-03-12",
    },
    {
      id: "c6",
      candidate: "Julia Almeida",
      company: "Vercel",
      job: "Frontend Engineer",
      baseSalary: 800000,
      percentage: 50,
      amount: 400000,
      status: "WAIVED" as const,
      invoiceNumber: null,
      dueDate: null,
      paidAt: null,
    },
  ];

  const formatCurrency = (cents: number) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(cents / 100);
  };

  const getCommissionStatusConfig = (status: string) => {
    switch (status) {
      case "PENDING":
        return { label: "Pendente", color: "bg-amber-50 text-amber-700 border-amber-200", icon: Clock };
      case "INVOICED":
        return { label: "Faturada", color: "bg-blue-50 text-blue-700 border-blue-200", icon: Receipt };
      case "PAID":
        return { label: "Pago", color: "bg-emerald-50 text-emerald-700 border-emerald-200", icon: CheckCircle2 };
      case "WAIVED":
        return { label: "Dispensada", color: "bg-slate-100 text-slate-500 border-slate-200", icon: Ban };
      default:
        return { label: status, color: "bg-slate-100 text-slate-600", icon: Clock };
    }
  };

  return (
    <TooltipProvider>
      <div className="space-y-6 animate-in fade-in duration-500">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-emerald-600 mb-1">
              <DollarSign className="h-4 w-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">Gestão Financeira</span>
            </div>
            <h1 className="text-2xl font-black text-slate-900">Comissões de Curadoria</h1>
            <p className="text-sm text-slate-500 font-medium">Controle de comissões (50% do salário) por efetivação de candidatos.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="h-10 rounded-xl border-slate-200 font-bold text-xs text-slate-600 gap-2">
              <Download className="h-3.5 w-3.5" />
              Exportar CSV
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
                      {stat.count} registros
                    </Badge>
                  </div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.name}</p>
                  <h3 className="text-2xl font-black text-slate-900">{stat.value}</h3>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Gráfico de evolução + Tabela */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Tabela de Comissões */}
          <Card className="lg:col-span-2 border-slate-200 bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input 
                  placeholder="Buscar por empresa ou candidato..." 
                  className="pl-10 h-9 border-slate-200 rounded-xl text-xs font-medium"
                />
              </div>
              <div className="flex gap-1.5">
                {["Todas", "Pendentes", "Pagas"].map((filter) => (
                  <button
                    key={filter}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${
                      filter === "Todas"
                        ? "bg-slate-900 text-white"
                        : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            <div className="divide-y divide-slate-50">
              {commissions.map((comm, i) => {
                const statusConfig = getCommissionStatusConfig(comm.status);
                return (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    key={comm.id}
                    className="flex items-center justify-between p-4 hover:bg-slate-50/50 transition-all group"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="h-10 w-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0">
                        <Building2 className="h-4 w-4 text-slate-400" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-xs text-slate-900 truncate">{comm.company}</p>
                        <p className="text-[10px] text-slate-400 font-medium truncate">{comm.candidate} • {comm.job}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 flex-shrink-0">
                      <div className="text-right hidden md:block">
                        <p className="text-[9px] font-bold text-slate-400 uppercase">Base</p>
                        <p className="text-[11px] font-bold text-slate-600">{formatCurrency(comm.baseSalary)}</p>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-[9px] font-bold text-slate-400 uppercase">Comissão (50%)</p>
                        <p className="text-sm font-black text-slate-900">{formatCurrency(comm.amount)}</p>
                      </div>

                      <Badge className={`${statusConfig.color} border font-bold text-[9px] uppercase tracking-wider rounded-lg px-2 py-0.5 min-w-[80px] justify-center`}>
                        <statusConfig.icon className="h-3 w-3 mr-1" />
                        {statusConfig.label}
                      </Badge>

                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                        {comm.status === "PENDING" && (
                          <Tooltip>
                            <TooltipTrigger>
                              <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg hover:bg-blue-50 hover:text-blue-600">
                                <Receipt className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Gerar Fatura</TooltipContent>
                          </Tooltip>
                        )}
                        {(comm.status === "PENDING" || comm.status === "INVOICED") && (
                          <Tooltip>
                            <TooltipTrigger>
                              <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg hover:bg-emerald-50 hover:text-emerald-600">
                                <CheckCircle2 className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Confirmar Pagamento</TooltipContent>
                          </Tooltip>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </Card>

          {/* Sidebar de Insights */}
          <div className="space-y-6">
            {/* Resumo Financeiro */}
            <Card className="p-6 border-none bg-slate-900 text-white rounded-2xl shadow-xl">
              <div className="flex items-center gap-2 mb-5">
                <Wallet className="h-4 w-4 text-emerald-400" />
                <h3 className="text-sm font-bold">Resumo do Mês</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-[9px] font-bold uppercase text-slate-400">Total Recebido</p>
                  <p className="text-2xl font-black text-emerald-400">R$ 10.000</p>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                    <p className="text-[8px] font-bold uppercase text-slate-400">A Receber</p>
                    <p className="text-sm font-black text-amber-400">R$ 15.0k</p>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                    <p className="text-[8px] font-bold uppercase text-slate-400">Dispensadas</p>
                    <p className="text-sm font-black text-slate-400">R$ 400</p>
                  </div>
                </div>

                <div className="h-px bg-white/10" />

                <div>
                  <p className="text-[9px] font-bold uppercase text-slate-400 mb-2">Performance Anual</p>
                  <div className="flex items-end gap-1 h-16">
                    {[30, 45, 55, 40, 70, 60, 85, 90, 75, 100, 95, 80].map((h, i) => (
                      <div 
                        key={i}
                        className={`flex-1 rounded-sm ${i === 9 ? 'bg-emerald-400' : 'bg-white/10'} hover:bg-emerald-400/60 transition-colors cursor-pointer`}
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between mt-1.5 text-[7px] font-bold text-slate-500 uppercase">
                    <span>Jan</span><span>Jun</span><span>Dez</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Próximos Vencimentos */}
            <Card className="p-6 border-slate-200 bg-white rounded-2xl shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="h-4 w-4 text-amber-500" />
                <h3 className="text-sm font-bold text-slate-900">Próximos Vencimentos</h3>
              </div>
              <div className="space-y-2">
                {commissions
                  .filter(c => c.status === "PENDING" || c.status === "INVOICED")
                  .sort((a, b) => (a.dueDate || "").localeCompare(b.dueDate || ""))
                  .map((c) => (
                    <div key={c.id} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                      <div>
                        <p className="text-[11px] font-bold text-slate-900">{c.company}</p>
                        <p className="text-[9px] text-slate-400 font-medium">{c.dueDate}</p>
                      </div>
                      <span className="text-xs font-black text-slate-900">{formatCurrency(c.amount)}</span>
                    </div>
                  ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
