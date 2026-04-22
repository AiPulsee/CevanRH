"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Zap, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock,
  Building2,
  Users2
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScreeningModal } from "@/components/admin/screening-modal";

export default function AdminManagedJobs() {
  const managedJobs = [
    { 
      id: 1, 
      company: "Google Cloud", 
      role: "Engenheiro Frontend Sênior", 
      status: "Triagem Ativa", 
      applicants: 142, 
      shortlisted: 3, 
      deadline: "24h restantes",
      priority: "Alta" 
    },
    { 
      id: 2, 
      company: "Nubank", 
      role: "Especialista em Segurança", 
      status: "Aguardando Início", 
      applicants: 45, 
      shortlisted: 0, 
      deadline: "3 dias",
      priority: "Média"
    },
    { 
      id: 3, 
      company: "Stripe", 
      role: "Desenvolvedor Backend", 
      status: "Finalizado", 
      applicants: 89, 
      shortlisted: 5, 
      deadline: "Concluído",
      priority: "Baixa"
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-blue-500 font-bold text-[10px] uppercase tracking-widest mb-1.5">
            <Zap className="h-3.5 w-3.5 fill-blue-500" />
            Curadoria Especializada
          </div>
          <h1 className="text-2xl font-black text-slate-900">Curadoria Ativa</h1>
          <p className="text-sm text-slate-500 font-medium">Gestão de triagem e seleção para clientes estratégicos.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="rounded-lg h-9 px-4 border-slate-200 bg-white font-bold text-xs text-slate-600">
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </Button>
        </div>
      </div>

      {/* Stats row for Admin */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-5 border-slate-200 bg-white rounded-2xl shadow-sm border-l-4 border-l-blue-500">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total sob Gestão</p>
          <h3 className="text-2xl font-black mt-1 text-slate-900">18</h3>
        </Card>
        <Card className="p-5 border-slate-200 bg-white rounded-2xl shadow-sm border-l-4 border-l-orange-500">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Em Triagem</p>
          <h3 className="text-2xl font-black mt-1 text-slate-900">12</h3>
        </Card>
        <Card className="p-5 border-slate-200 bg-white rounded-2xl shadow-sm border-l-4 border-l-green-500">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Selecionados</p>
          <h3 className="text-2xl font-black mt-1 text-slate-900">145</h3>
        </Card>
      </div>

      {/* Managed Jobs List */}
      <div className="space-y-4">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input placeholder="Buscar vaga ou empresa..." className="pl-10 h-10 bg-white border-slate-200 rounded-lg text-sm" />
        </div>

        <div className="grid grid-cols-1 gap-3">
          {managedJobs.map((job) => (
            <Card key={job.id} className="p-5 border-slate-200 bg-white rounded-xl shadow-sm hover:border-blue-200 transition-all group">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex items-center gap-4 flex-1">
                  <div className="h-12 w-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center font-black text-blue-500 text-lg">
                    {job.company.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors">{job.role}</h4>
                    <div className="flex items-center gap-3 mt-1 text-[10px] text-slate-500 font-bold uppercase">
                      <span className="flex items-center gap-1.5"><Building2 className="h-3 w-3" /> {job.company}</span>
                      <span className="flex items-center gap-1.5"><Clock className="h-3 w-3" /> {job.deadline}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 flex-[1.5] py-2">
                  <div className="space-y-1">
                    <p className="text-[9px] font-bold uppercase text-slate-400">Status</p>
                    <Badge className={cn(
                      "rounded-md px-1.5 py-0.5 text-[9px] font-bold uppercase",
                      job.status === "Finalizado" ? "bg-green-100 text-green-700 border-none" : "bg-blue-50 text-blue-600 border-none"
                    )}>
                      {job.status}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[9px] font-bold uppercase text-slate-400">Inscritos</p>
                    <div className="flex items-center gap-1.5">
                      <Users2 className="h-3.5 w-3.5 text-slate-400" />
                      <span className="font-black text-sm text-slate-900">{job.applicants}</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[9px] font-bold uppercase text-slate-400">Selecionados</p>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                      <span className="font-black text-sm text-slate-900">{job.shortlisted} / 5</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[9px] font-bold uppercase text-slate-400">Prioridade</p>
                    <span className={cn(
                      "text-[11px] font-black uppercase",
                      job.priority === "Alta" ? "text-rose-500" : "text-slate-600"
                    )}>{job.priority}</span>
                  </div>
                </div>

                <ScreeningModal jobTitle={job.role} companyName={job.company} />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}

