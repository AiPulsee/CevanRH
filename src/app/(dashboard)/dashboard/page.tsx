"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Briefcase, 
  Eye, 
  TrendingUp, 
  ArrowUpRight,
  Clock,
  Zap,
  LayoutDashboard,
  FileText
} from "lucide-react";
import { CreateJobModal } from "@/components/dashboard/create-job-modal";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

export default function DashboardPage() {
  const stats = [
    { 
      name: "Candidatos Totais", 
      value: "1,284", 
      icon: Users, 
      change: "+12%", 
      trend: "up",
      description: "Volume total de currículos recebidos em todas as suas vagas desde o início."
    },
    { 
      name: "Vagas Ativas", 
      value: "24", 
      icon: Briefcase, 
      change: "+2", 
      trend: "up",
      description: "Quantidade de oportunidades publicadas e abertas para candidatura no momento."
    },
    { 
      name: "Visualizações", 
      value: "48.2k", 
      icon: Eye, 
      change: "+18%", 
      trend: "up",
      description: "Total de vezes que suas páginas de vagas foram visitadas por potenciais talentos."
    },
    { 
      name: "Taxa de Conversão", 
      value: "14.2%", 
      icon: TrendingUp, 
      change: "+2.4%", 
      trend: "up",
      description: "Percentual de visitantes que visualizaram a vaga e completaram a inscrição."
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-blue-600 mb-1">
            <LayoutDashboard className="h-4 w-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">Resumo Operacional</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900">Olá, Danilo</h2>
          <p className="text-sm text-slate-500 font-medium">Aqui está o desempenho das suas vagas e candidatos hoje.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="h-10 rounded-lg border-slate-200 bg-white font-bold text-xs text-slate-600 px-6">
            <FileText className="h-3.5 w-3.5 mr-2" /> Exportar
          </Button>
          <CreateJobModal />
        </div>
      </div>

      {/* Stats Grid */}
      <TooltipProvider>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <Card key={i} className="p-5 bg-white border-slate-200 rounded-2xl shadow-sm group">
              <div className="flex items-start justify-between">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 group-hover:bg-blue-50 group-hover:border-blue-100 transition-all">
                  <stat.icon className="h-4 w-4 text-slate-600 group-hover:text-blue-600" />
                </div>
                <Badge variant="secondary" className="bg-emerald-50 text-emerald-600 border-emerald-100 rounded-md text-[9px] font-bold px-1.5 py-0">
                  {stat.change}
                </Badge>
              </div>
              <div className="mt-4">
                <div className="flex items-center gap-1.5">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.name}</p>
                  <Tooltip>
                    <TooltipTrigger className="cursor-help">
                      <Info className="h-3 w-3 text-slate-300 hover:text-blue-500 transition-colors" />
                    </TooltipTrigger>
                    <TooltipContent side="top" className="max-w-[200px] text-center">
                      {stat.description}
                    </TooltipContent>
                  </Tooltip>
                </div>
                <h3 className="text-xl font-black mt-0.5 text-slate-900">{stat.value}</h3>
              </div>
            </Card>
          ))}
        </div>
      </TooltipProvider>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Candidatos Recentes */}
        <Card className="lg:col-span-2 p-6 bg-white border-slate-200 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-bold text-slate-900">Candidatos Recentes</h3>
            <Button variant="ghost" size="sm" className="text-blue-600 font-black text-[10px] uppercase">Ver Todos</Button>
          </div>
          
          <div className="space-y-1">
            {[
              { name: "Alexandre Silva", role: "Senior Frontend Engineer", status: "Em Revisão", time: "2h atrás" },
              { name: "Beatriz Oliveira", role: "Product Designer", status: "Entrevista", time: "5h atrás" },
              { name: "Carlos Mendes", role: "Backend Developer (Node.js)", status: "Novo", time: "1d atrás" },
              { name: "Daniela Costa", role: "QA Engineer", status: "Recusado", time: "2d atrás" },
            ].map((applicant, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-all group cursor-pointer border border-transparent">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center font-black text-xs">
                    {applicant.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-xs text-slate-900">{applicant.name}</p>
                    <p className="text-[10px] text-slate-400 font-medium">{applicant.role}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className="text-[9px] font-bold rounded-md px-1.5 py-0 border-slate-200 text-slate-600">{applicant.status}</Badge>
                  <p className="text-[9px] text-slate-400 font-bold uppercase mt-1 flex items-center justify-end">
                    <Clock className="h-2.5 w-2.5 mr-1" /> {applicant.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Curadoria Assistida */}
        <Card className="p-6 bg-slate-900 border-none rounded-2xl relative overflow-hidden shadow-xl text-white">
          <div className="relative z-10">
            <div className="flex items-center gap-1.5 text-blue-400 font-black text-[10px] uppercase tracking-widest mb-4">
              <Zap className="h-3.5 w-3.5 fill-blue-400" />
              Curadoria Ativa
            </div>
            <h3 className="text-lg font-black mb-2 leading-tight">Suas vagas sob nossa curadoria</h3>
            <p className="text-xs text-slate-400 mb-6 font-medium leading-relaxed">Nosso time já triou 45 candidatos para sua vaga de CTO. 3 estão prontos para revisão.</p>
            
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-bold text-white uppercase tracking-widest">Status: CTO</span>
                  <span className="text-[10px] text-blue-400 font-black">80%</span>
                </div>
                <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full w-[80%] bg-blue-500 rounded-full" />
                </div>
              </div>
              <Button className="w-full h-10 rounded-lg font-black text-[10px] uppercase tracking-widest bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-900/20">
                Acessar Shortlist
                <ArrowUpRight className="ml-2 h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

