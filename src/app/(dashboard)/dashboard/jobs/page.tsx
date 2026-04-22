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
import { Info, Briefcase, Users, Clock, ChevronRight, Zap, Search, Filter, Settings, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { CreateJobModal } from "@/components/dashboard/create-job-modal";
import Link from "next/link";

export default function JobsPage() {
  const jobs = [
    { title: "Senior Frontend Engineer", status: "Ativa", candidates: 42, type: "Full-time", managed: true },
    { title: "Product Designer", status: "Em Triagem", candidates: 18, type: "Híbrido", managed: true },
    { title: "Node.js Backend Developer", status: "Pausada", candidates: 0, type: "PJ / Remoto", managed: false },
  ];

  const getStatusTooltip = (status: string) => {
    switch (status) {
      case "Ativa": return "A vaga está aberta e recebendo novas candidaturas publicamente.";
      case "Em Triagem": return "Estamos analisando os currículos recebidos para gerar a shortlist final.";
      case "Pausada": return "Novas candidaturas estão suspensas temporariamente.";
      default: return "";
    }
  };

  return (
    <TooltipProvider>
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-blue-600 mb-1">
              <Briefcase className="h-4 w-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">Gestão de Oportunidades</span>
            </div>
            <h1 className="text-2xl font-black text-slate-900">Minhas Vagas</h1>
            <p className="text-sm text-slate-500 font-medium">Acompanhe o fluxo de candidatos e status das suas vagas.</p>
          </div>
          <CreateJobModal />
        </div>

        <div className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-slate-200 shadow-sm">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input placeholder="Buscar por cargo..." className="pl-10 h-10 border-none bg-slate-50 rounded-lg text-sm" />
          </div>
          <Button variant="outline" className="h-10 rounded-lg border-slate-200 font-bold text-xs text-slate-600 px-4">
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {jobs.map((job, i) => (
            <Link href="/dashboard/candidates" key={i} className="block group">
              <Card className="p-4 border-slate-200 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer relative overflow-hidden">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center font-black text-base text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                      {job.title.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm text-slate-900">{job.title}</h4>
                        {job.managed && (
                          <Tooltip>
                            <TooltipTrigger>
                              <Badge className="bg-blue-50 text-blue-600 border-blue-100 rounded-md flex items-center gap-1 font-black text-[8px] uppercase tracking-widest px-1.5 py-0 cursor-help">
                                <Zap className="h-2.5 w-2.5 fill-blue-600" />
                                Curadoria Ativa
                              </Badge>
                            </TooltipTrigger>
                            <TooltipContent side="top">
                              Esta vaga está sob o serviço de Curadoria da Cevan.
                            </TooltipContent>
                          </Tooltip>
                        )}
                      </div>
                      <div className="flex items-center gap-3 mt-0.5 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                        <span className="flex items-center gap-1"><Briefcase className="h-3 w-3" /> {job.type}</span>
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> Hoje</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right hidden md:block">
                      <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{job.candidates} candidatos</p>
                      <p className="text-[9px] text-slate-400 font-bold uppercase">Interessados</p>
                    </div>
                    <Tooltip>
                      <TooltipTrigger>
                        <Badge className={`rounded-md px-2 py-0.5 font-black text-[9px] uppercase tracking-widest cursor-help ${
                          job.status === "Ativa" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : 
                          job.status === "Em Triagem" ? "bg-blue-50 text-blue-600 border-blue-100" : 
                          "bg-slate-100 text-slate-500 border-slate-200"
                        }`}>
                          {job.status}
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        {getStatusTooltip(job.status)}
                      </TooltipContent>
                    </Tooltip>
                    <div className="hidden md:flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50">
                        <Settings className="h-4 w-4" />
                      </Button>
                      <div className="flex items-center justify-center rounded-lg border border-slate-100 bg-slate-50 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all shadow-sm h-8 w-8">
                        <ChevronRight className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </TooltipProvider>
  );
}

