"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  Users2, 
  Zap, 
  TrendingUp, 
  ArrowRight,
  AlertCircle,
  ShieldAlert,
  MessageSquare,
  Hammer,
  CheckCircle2,
  Activity,
  Target
} from "lucide-react";
import { motion } from "framer-motion";

export default function AdminPage() {
  const stats = [
    { name: "Empresas Totais", value: "142", icon: Building2, change: "+5 este mês", color: "blue" },
    { name: "Vagas p/ Curadoria", value: "18", icon: Zap, change: "4 pendentes", color: "orange" },
    { name: "Candidatos p/ Triar", value: "342", icon: Users2, change: "+54 hoje", color: "indigo" },
    { name: "Receita Mensal", value: "R$ 42.8k", icon: TrendingUp, change: "+15%", color: "emerald" },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Cabeçalho mais compacto */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Visão Geral</h1>
          <p className="text-sm text-slate-500 font-medium">Controle operacional e financeiro da Cevan.</p>
        </div>
        
        <div className="flex items-center gap-2">
           <Button variant="outline" className="rounded-xl h-10 px-4 border-slate-200 font-bold text-xs text-slate-600 gap-2">
             <MessageSquare className="h-3.5 w-3.5" />
             Comunicado Global
           </Button>
           <Button className="rounded-xl h-10 px-4 bg-slate-900 text-white font-bold text-xs gap-2">
             <Hammer className="h-3.5 w-3.5" />
             Modo Manutenção
           </Button>
        </div>
      </div>

      {/* Grid de Estatísticas reduzido */}
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
                  <div className={`h-10 w-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center`}>
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

      {/* Gráficos e Divisão */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Evolução de Receita */}
        <Card className="lg:col-span-2 p-6 border-slate-200 bg-white rounded-2xl shadow-sm">
           <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Evolução de Receita</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Semestre Atual</p>
              </div>
              <div className="px-2 py-1 rounded-lg bg-emerald-50 text-emerald-600 text-[10px] font-bold">
                 +15.4% de crescimento
              </div>
           </div>

           <div className="h-[200px] w-full flex items-end gap-3 px-2">
              {[35, 45, 30, 65, 85, 100].map((height, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-3 group">
                  <div className="w-full relative">
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ delay: 0.2 + (i * 0.05), duration: 0.8 }}
                      className={`w-full rounded-lg ${i === 5 ? 'bg-blue-600' : 'bg-slate-100'} group-hover:bg-blue-400 transition-colors cursor-pointer`}
                    />
                  </div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase">{['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'][i]}</span>
                </div>
              ))}
           </div>
        </Card>

        {/* Divisão de Planos */}
        <Card className="p-6 border-slate-200 bg-white rounded-2xl shadow-sm">
           <h3 className="text-lg font-bold text-slate-900 mb-6">Divisão de Clientes</h3>
           
           <div className="space-y-5">
              {[
                { name: "Empresas (Enterprise)", val: 12, color: "bg-blue-600" },
                { name: "Profissional (Pro)", val: 58, color: "bg-emerald-500" },
                { name: "Gratuito (Free)", val: 30, color: "bg-slate-300" },
              ].map((plano) => (
                <div key={plano.name} className="space-y-1.5">
                  <div className="flex justify-between text-[10px] font-bold uppercase">
                    <span className="text-slate-500">{plano.name}</span>
                    <span className="text-slate-900">{plano.val}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${plano.val}%` }}
                      transition={{ duration: 1 }}
                      className={`h-full ${plano.color} rounded-full`}
                    />
                  </div>
                </div>
              ))}
           </div>

           <div className="mt-8 p-4 rounded-xl bg-slate-50 border border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Destaque do Mês</p>
              <p className="text-xs font-medium text-slate-600">O plano <span className="text-emerald-600 font-bold">Pro</span> cresceu 8%.</p>
           </div>
        </Card>
      </div>

      {/* Operação e Infra */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Saúde da IA */}
        <Card className="p-6 border-slate-200 bg-white rounded-2xl shadow-sm">
           <div className="flex items-center gap-2 mb-4">
              <Target className="h-4 w-4 text-indigo-600" />
              <h3 className="text-sm font-bold text-slate-900">Motor de IA</h3>
           </div>
           
           <div className="text-center py-2">
              <h4 className="text-3xl font-black text-indigo-600">94.2%</h4>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Assertividade</p>
           </div>

           <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="text-center p-2 rounded-lg bg-slate-50 border border-slate-100">
                <p className="text-[9px] font-bold text-slate-400 uppercase">Processados</p>
                <p className="text-xs font-black text-slate-900">12.4k</p>
              </div>
              <div className="text-center p-2 rounded-lg bg-slate-50 border border-slate-100">
                <p className="text-[9px] font-bold text-slate-400 uppercase">Ajustes</p>
                <p className="text-xs font-black text-rose-500">2.1%</p>
              </div>
           </div>
        </Card>

        {/* Monitor de Vendas */}
        <Card className="lg:col-span-2 p-6 border-slate-200 bg-white rounded-2xl shadow-sm overflow-hidden">
           <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Activity className="h-4 w-4 text-emerald-500" />
                Monitor de Vendas
              </h3>
              <Badge className="bg-emerald-50 text-emerald-600 border-none font-bold text-[9px] uppercase">Ao Vivo</Badge>
           </div>

           <div className="space-y-2">
              {[
                { msg: "Assinatura Pro: Microsoft Corp", time: "2m", status: "emerald" },
                { msg: "Falha de pagamento: Acme Inc", time: "15m", status: "rose" },
                { msg: "Novo registro: SpaceX", time: "1h", status: "blue" },
              ].map((log, i) => (
                <div key={i} className="flex items-center justify-between p-2.5 rounded-xl border border-slate-50 bg-slate-50/50">
                  <div className="flex items-center gap-2">
                    <div className={`h-1.5 w-1.5 rounded-full ${log.status === 'emerald' ? 'bg-emerald-500' : log.status === 'rose' ? 'bg-rose-500' : 'bg-blue-500'}`} />
                    <p className="text-[11px] font-medium text-slate-700">{log.msg}</p>
                  </div>
                  <span className="text-[9px] font-bold text-slate-400">{log.time}</span>
                </div>
              ))}
           </div>
        </Card>

        {/* Eficiência */}
        <Card className="p-6 border-none bg-blue-600 text-white rounded-2xl shadow-sm">
           <h3 className="text-sm font-bold mb-4">Eficiência</h3>
           <div className="space-y-4">
              <div>
                <p className="text-[9px] font-bold uppercase text-blue-200">Tempo de Fechamento</p>
                <p className="text-xl font-black">12.4 dias</p>
                <div className="h-1 w-full bg-white/20 rounded-full mt-1.5">
                  <div className="h-full bg-white rounded-full w-[85%]" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 rounded-lg bg-white/10">
                   <p className="text-[8px] font-bold uppercase text-blue-100">Entrevistas</p>
                   <p className="text-sm font-black">1.2k</p>
                </div>
                <div className="p-2 rounded-lg bg-white/10">
                   <p className="text-[8px] font-bold uppercase text-blue-100">Contratações</p>
                   <p className="text-sm font-black">422</p>
                </div>
              </div>
           </div>
        </Card>

      </div>

      {/* Prioridades */}
      <Card className="p-6 border-slate-200 bg-white rounded-2xl shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-rose-500" />
            Prioridades de Curadoria
          </h3>
          <Button variant="ghost" className="font-bold text-blue-600 text-[10px] uppercase tracking-widest gap-1">
            Ver Tudo
            <ArrowRight className="h-3 w-3" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { company: "Apple Inc.", role: "Lead Product Designer", pending: 12, deadline: "Hoje", status: "Crítico" },
            { company: "SpaceX", role: "Aerospace Engineer", pending: 8, deadline: "Amanhã", status: "Alerta" },
            { company: "Nubank", role: "Senior Backend (Clojure)", pending: 45, deadline: "2 dias", status: "Ativo" },
            { company: "Vercel", role: "Developer Relations", pending: 5, deadline: "3 dias", status: "Ativo" },
          ].map((vaga, i) => (
            <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-all cursor-pointer group text-left">
               <div className="flex justify-between items-start mb-3">
                  <div className="h-9 w-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center font-black text-slate-400 text-xs">
                    {vaga.company.charAt(0)}
                  </div>
                  <Badge className={`border-none rounded-md font-bold text-[8px] uppercase ${
                    vaga.status === 'Crítico' ? 'bg-rose-500 text-white' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {vaga.status}
                  </Badge>
               </div>
               <h4 className="font-bold text-slate-900 text-xs leading-tight">{vaga.role}</h4>
               <p className="text-[10px] font-bold text-slate-400 mt-1">{vaga.company}</p>
               
               <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-3">
                  <div>
                    <p className="text-[8px] font-bold text-slate-400 uppercase">Pendentes</p>
                    <p className="text-xs font-black text-blue-600">{vaga.pending}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[8px] font-bold text-slate-400 uppercase">Prazo</p>
                    <p className="text-xs font-black text-slate-900">{vaga.deadline}</p>
                  </div>
               </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

