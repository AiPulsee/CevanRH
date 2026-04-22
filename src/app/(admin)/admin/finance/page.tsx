"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { 
  LineChart, 
  ArrowUpRight, 
  ArrowDownRight,
  DollarSign,
  CreditCard,
  Wallet,
  Activity,
  Download,
  Users,
  Target,
  BarChart3,
  AlertCircle,
  Info
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function AdminFinance() {
  const metrics = [
    { 
      title: "Recorrente (MRR)", 
      value: "R$ 42.850", 
      change: "+15.2%", 
      trend: "up", 
      icon: DollarSign,
      desc: "Monthly Recurring Revenue - Receita que se repete mensalmente de assinaturas ativas."
    },
    { 
      title: "Anual (ARR)", 
      value: "R$ 514.200", 
      change: "+12.4%", 
      trend: "up", 
      icon: LineChart,
      desc: "Annual Recurring Revenue - Projeção do faturamento anual com base no MRR atual."
    },
    { 
      title: "LTV Médio", 
      value: "R$ 3.200", 
      change: "+5.1%", 
      trend: "up", 
      icon: Target,
      desc: "Lifetime Value - Valor total que um cliente gera para a empresa durante todo o contrato."
    },
    { 
      title: "CAC Médio", 
      value: "R$ 450", 
      change: "-2.4%", 
      trend: "down", 
      icon: Users,
      desc: "Customer Acquisition Cost - Custo médio para adquirir um novo cliente pago."
    },
  ];

  const secondaryMetrics = [
    { 
      title: "ARPU", 
      value: "R$ 185,00", 
      icon: BarChart3,
      desc: "Average Revenue Per User - Receita média gerada por cada cliente ativo."
    },
    { 
      title: "Churn Rate", 
      value: "1.2%", 
      icon: Activity,
      desc: "Taxa de cancelamento - Percentual de clientes que deixaram a base no período."
    },
    { 
      title: "Inadimplência", 
      value: "2.4%", 
      icon: AlertCircle,
      desc: "Porcentagem de pagamentos não realizados ou atrasados."
    },
    { 
      title: "Créditos Avulsos", 
      value: "R$ 8.450", 
      icon: CreditCard,
      desc: "Receita gerada por compras pontuais de créditos fora da assinatura."
    },
  ];

  return (
    <TooltipProvider>
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900">Financeiro</h1>
            <p className="text-sm text-slate-500 font-medium">Análise avançada de métricas SaaS, faturamento e saúde do negócio.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="h-9 rounded-lg border-slate-200 font-bold text-xs text-slate-600 bg-white">
              <Download className="h-4 w-4 mr-2" /> Exportar Relatório
            </Button>
          </div>
        </div>

        {/* Métricas Principais (SaaS North Star) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric, i) => (
            <Card key={i} className="p-5 border-slate-200 bg-white rounded-2xl shadow-sm relative overflow-hidden">
              <div className="flex items-start justify-between mb-4">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <metric.icon className="h-4 w-4 text-slate-600" />
                </div>
                <div className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md ${
                  metric.trend === 'up' && metric.title !== "CAC Médio" ? 'text-emerald-700 bg-emerald-50' : 
                  metric.trend === 'down' && metric.title === "CAC Médio" ? 'text-emerald-700 bg-emerald-50' : 
                  'text-rose-700 bg-rose-50'
                }`}>
                  {metric.trend === 'up' ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {metric.change}
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{metric.title}</p>
                <Tooltip>
                  <TooltipTrigger className="cursor-help">
                    <Info className="h-3 w-3 text-slate-300 hover:text-blue-500 transition-colors" />
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-[200px] text-center">
                    {metric.desc}
                  </TooltipContent>
                </Tooltip>
              </div>
              <h3 className="text-xl font-black mt-1 text-slate-900">{metric.value}</h3>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Gráfico de Evolução e Mix de Planos */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6 border-slate-200 bg-white rounded-2xl shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Crescimento de Receita</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Faturamento Mensal (MRR)</p>
                </div>
                <select className="h-8 px-3 rounded-lg border border-slate-200 bg-slate-50 text-[10px] font-bold text-slate-700 outline-none">
                  <option>Últimos 6 meses</option>
                  <option>Este Ano</option>
                </select>
              </div>
              
              <div className="h-56 flex items-end justify-between gap-2 pb-2 border-b border-slate-100 px-2">
                {[40, 55, 45, 70, 65, 85, 80, 95, 90, 110, 105, 120].map((height, i) => (
                  <div key={i} className="w-full flex flex-col justify-end gap-0.5 group relative">
                    <div className="w-full bg-blue-600 rounded-sm group-hover:bg-blue-700 transition-colors cursor-pointer" 
                         style={{ height: `${height}%` }} />
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2">
                <span>Jan</span><span>Fev</span><span>Mar</span><span>Abr</span><span>Mai</span><span>Jun</span>
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 border-slate-200 bg-white rounded-2xl shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 mb-4">Distribuição de Planos</h3>
                <div className="space-y-4">
                  {[
                    { name: "Corporativo", color: "bg-blue-600", percent: 45, value: "R$ 19.2k" },
                    { name: "Profissional", color: "bg-indigo-500", percent: 35, value: "R$ 15.0k" },
                    { name: "Start", color: "bg-slate-300", percent: 20, value: "R$ 8.6k" },
                  ].map((item) => (
                    <div key={item.name} className="space-y-1.5">
                      <div className="flex justify-between text-[11px] font-bold">
                        <span className="text-slate-600">{item.name}</span>
                        <span className="text-slate-900">{item.value}</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full ${item.color}`} style={{ width: `${item.percent}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <div className="grid grid-cols-2 gap-4">
                {secondaryMetrics.map((item) => (
                  <Card key={item.title} className="p-4 border-slate-200 bg-white rounded-2xl shadow-sm flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <item.icon className="h-4 w-4 text-slate-400 mb-2" />
                      <Tooltip>
                        <TooltipTrigger className="cursor-help">
                          <Info className="h-3 w-3 text-slate-200 hover:text-blue-500" />
                        </TooltipTrigger>
                        <TooltipContent side="top" className="max-w-[150px] text-[10px] text-center">
                          {item.desc}
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{item.title}</p>
                      <h4 className="text-base font-black text-slate-900">{item.value}</h4>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>

        {/* Transações e Alertas */}
        <div className="space-y-6">
          <Card className="p-6 border-slate-200 bg-white rounded-2xl shadow-sm h-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-base font-bold text-slate-900">Transações</h3>
              <Button variant="ghost" size="sm" className="font-bold text-blue-600 text-[10px] uppercase">Ver todas</Button>
            </div>
            
            <div className="space-y-4">
              {[
                { company: "Apple Inc.", type: "Pro", amount: "R$ 499,00", date: "Hoje", status: "Pago" },
                { company: "Tesla", type: "Créditos", amount: "R$ 890,00", date: "Hoje", status: "Pago" },
                { company: "SpaceX", type: "Corp", amount: "R$ 1.2k", date: "Ontem", status: "Pendente" },
                { company: "Nubank", type: "Pro", amount: "R$ 499,00", date: "Ontem", status: "Pago" },
                { company: "Amazon", type: "Corp", amount: "R$ 1.2k", date: "22 Abr", status: "Falhou" },
              ].map((tx, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-all border border-transparent">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100">
                      <Wallet className="h-3.5 w-3.5 text-slate-400" />
                    </div>
                    <div>
                      <p className="font-bold text-xs text-slate-900 leading-none">{tx.company}</p>
                      <p className="text-[9px] text-slate-400 font-bold uppercase mt-1">{tx.type} • {tx.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-xs text-slate-900">{tx.amount}</p>
                    <p className={`text-[8px] font-black uppercase tracking-widest mt-0.5 ${
                      tx.status === 'Pago' ? 'text-emerald-500' : 
                      tx.status === 'Pendente' ? 'text-amber-500' : 
                      'text-rose-500'
                    }`}>
                      {tx.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 rounded-xl bg-slate-900 text-white space-y-3">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-blue-400" />
                <p className="text-[11px] font-bold">Insight Financeiro</p>
              </div>
              <p className="text-[10px] text-slate-300 leading-relaxed">
                Sua taxa de churn reduziu **0.5%** este mês. Focar no plano **Corporativo** pode aumentar o LTV em até **12%**.
              </p>
            </div>
          </Card>
        </div>
      </div>
      </div>
    </TooltipProvider>
  );
}


