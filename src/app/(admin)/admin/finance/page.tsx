import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  LineChart, 
  ArrowUpRight, 
  ArrowDownRight,
  DollarSign,
  CreditCard,
  Wallet,
  Activity,
  Download
} from "lucide-react";

export default function AdminFinance() {
  const metrics = [
    { title: "Receita Recorrente (MRR)", value: "R$ 42.850", change: "+15.2%", trend: "up", icon: DollarSign },
    { title: "Receita Anual (ARR)", value: "R$ 514.200", change: "+12.4%", trend: "up", icon: LineChart },
    { title: "Vendas de Créditos (Avulso)", value: "R$ 8.450", change: "+32.1%", trend: "up", icon: CreditCard },
    { title: "Taxa de Cancelamento (Churn)", value: "1.2%", change: "-0.5%", trend: "down", icon: Activity },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">Métricas SaaS & Financeiro</h1>
          <p className="text-slate-500 mt-1">Acompanhe a saúde financeira, faturamento e churn da plataforma.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="h-12 rounded-xl border-slate-200 font-bold text-slate-600 bg-white">
            <Download className="h-4 w-4 mr-2" /> Exportar Relatório
          </Button>
        </div>
      </div>

      {/* Top Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, i) => (
          <Card key={i} className="p-6 border-slate-200 bg-white rounded-[2rem] shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-2xl bg-blue-50">
                <metric.icon className="h-5 w-5 text-blue-600" />
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${metric.trend === 'up' && metric.title !== "Taxa de Cancelamento (Churn)" ? 'text-emerald-700 bg-emerald-50' : metric.trend === 'down' && metric.title === "Taxa de Cancelamento (Churn)" ? 'text-emerald-700 bg-emerald-50' : 'text-rose-700 bg-rose-50'}`}>
                {metric.trend === 'up' ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {metric.change}
              </div>
            </div>
            <p className="text-sm font-bold text-slate-500">{metric.title}</p>
            <h3 className="text-2xl font-black mt-1 text-slate-900">{metric.value}</h3>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart Mock */}
        <Card className="lg:col-span-2 p-8 border-slate-200 bg-white rounded-[2rem] shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Crescimento de Receita</h3>
              <p className="text-sm text-slate-500 font-medium">MRR vs Créditos Avulsos nos últimos 6 meses</p>
            </div>
            <select className="h-10 px-4 rounded-xl border border-slate-200 bg-slate-50 text-sm font-bold text-slate-700 outline-none">
              <option>Últimos 6 meses</option>
              <option>Este Ano</option>
              <option>Ano Anterior</option>
            </select>
          </div>
          
          {/* Fake Chart Visualization */}
          <div className="h-64 flex items-end justify-between gap-2 pb-4 border-b border-slate-100">
            {[40, 55, 45, 70, 65, 85, 80, 95, 90, 110, 105, 120].map((height, i) => (
              <div key={i} className="w-full flex flex-col justify-end gap-1 group relative">
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  R$ {height}k
                </div>
                {/* Créditos */}
                <div 
                  className="w-full bg-indigo-200 rounded-t-sm hover:bg-indigo-300 transition-colors" 
                  style={{ height: `${height * 0.2}%` }}
                />
                {/* MRR */}
                <div 
                  className="w-full bg-blue-500 rounded-b-sm hover:bg-blue-600 transition-colors" 
                  style={{ height: `${height * 0.8}%` }}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-xs font-bold text-slate-400">
            <span>Jan</span>
            <span>Fev</span>
            <span>Mar</span>
            <span>Abr</span>
            <span>Mai</span>
            <span>Jun</span>
          </div>
        </Card>

        {/* Recent Transactions */}
        <Card className="p-8 border-slate-200 bg-white rounded-[2rem] shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-slate-900">Transações Recentes</h3>
            <Button variant="ghost" size="sm" className="font-bold text-blue-600">Ver todas</Button>
          </div>
          
          <div className="space-y-6">
            {[
              { company: "Apple Inc.", type: "Assinatura PRO", amount: "R$ 499,00", date: "Hoje, 14:32", status: "Pago" },
              { company: "Tesla", type: "Pacote 10 Créditos", amount: "R$ 890,00", date: "Hoje, 11:15", status: "Pago" },
              { company: "SpaceX", type: "Assinatura Enterprise", amount: "R$ 1.299,00", date: "Ontem, 16:40", status: "Pendente" },
              { company: "Nubank", type: "Assinatura PRO", amount: "R$ 499,00", date: "Ontem, 09:20", status: "Pago" },
            ].map((tx, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center">
                    <Wallet className="h-4 w-4 text-slate-400" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-slate-900">{tx.company}</p>
                    <p className="text-[10px] text-slate-500 font-medium">{tx.type} • {tx.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm text-slate-900">{tx.amount}</p>
                  <p className={`text-[10px] font-bold uppercase tracking-widest ${tx.status === 'Pago' ? 'text-emerald-500' : 'text-amber-500'}`}>
                    {tx.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
