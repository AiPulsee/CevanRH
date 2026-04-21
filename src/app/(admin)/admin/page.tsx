import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  Users2, 
  Zap, 
  TrendingUp, 
  ArrowRight,
  AlertCircle
} from "lucide-react";

export default function AdminPage() {
  const stats = [
    { name: "Empresas Totais", value: "142", icon: Building2, change: "+5 este mês" },
    { name: "Vagas p/ Curadoria", value: "18", icon: Zap, change: "4 pendentes" },
    { name: "Candidatos p/ Triar", value: "342", icon: Users2, change: "+54 hoje" },
    { name: "Receita Mensal", value: "R$ 42.8k", icon: TrendingUp, change: "+15%" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-slate-900">Visão Geral do Sistema</h1>
        <p className="text-slate-500 mt-1">Bem-vindo ao centro de comando da CevanRH.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="p-6 border-slate-200 bg-white rounded-3xl shadow-sm">
            <div className="flex items-start justify-between">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <stat.icon className="h-5 w-5 text-blue-500" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm font-bold text-slate-400">{stat.name}</p>
              <h3 className="text-3xl font-black mt-1 text-slate-900">{stat.value}</h3>
              <p className="text-[10px] font-bold text-blue-500 mt-2 uppercase tracking-widest">{stat.change}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Urgent Triagem */}
        <Card className="lg:col-span-2 p-8 border-slate-200 bg-white rounded-[2rem] shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-orange-500" />
              Triagem Urgente (Vagas p/ Curadoria)
            </h3>
            <Button variant="ghost" size="sm" className="font-bold text-blue-600">Ver Todas</Button>
          </div>

          <div className="space-y-4">
            {[
              { company: "Apple Inc.", role: "Lead Product Designer", pending: 12, deadline: "Hoje" },
              { company: "SpaceX", role: "Aerospace Engineer", pending: 8, deadline: "Amanhã" },
              { company: "Nubank", role: "Senior Backend (Clojure)", pending: 45, deadline: "2 dias" },
              { company: "Vercel", role: "Developer Relations", pending: 5, deadline: "3 dias" },
            ].map((vaga, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-all cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center font-bold text-slate-400">
                    {vaga.company.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-slate-900">{vaga.role}</p>
                    <p className="text-xs text-slate-500">{vaga.company}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-xs font-bold text-blue-600">{vaga.pending} pendentes</p>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest">Prazo: {vaga.deadline}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-blue-500 transform group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* System Activity */}
        <Card className="p-8 border-slate-200 bg-slate-900 text-white rounded-[2rem] shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-6">Atividade do Sistema</h3>
            <div className="space-y-6">
              {[
                { event: "Nova Empresa", desc: "OpenAI cadastrou-se", time: "10m atrás" },
                { event: "Pagamento", desc: "Stripe: R$ 899,00", time: "1h atrás" },
                { event: "Vaga Postada", desc: "Tesla: 5 novas vagas", time: "3h atrás" },
                { event: "Shortlist", desc: "Enviada para Microsoft", time: "5h atrás" },
              ].map((log, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-1 bg-blue-500 rounded-full" />
                  <div>
                    <p className="text-xs font-bold text-blue-400 uppercase tracking-widest">{log.event}</p>
                    <p className="text-sm font-medium text-slate-200">{log.desc}</p>
                    <p className="text-[10px] text-slate-500 mt-1">{log.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 rounded-xl">
              Ver Logs Completos
            </Button>
          </div>
          <div className="absolute -bottom-20 -right-20 h-64 w-64 bg-blue-500/10 rounded-full blur-[100px]" />
        </Card>
      </div>
    </div>
  );
}
