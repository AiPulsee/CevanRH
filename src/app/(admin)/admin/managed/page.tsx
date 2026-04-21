"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Zap, 
  Search, 
  Filter, 
  ArrowRight, 
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
      role: "Senior Frontend Engineer", 
      status: "Triagem Ativa", 
      applicants: 142, 
      shortlisted: 3, 
      deadline: "24h restantes",
      priority: "Alta" 
    },
    { 
      id: 2, 
      company: "Nubank", 
      role: "Security Specialist", 
      status: "Aguardando Início", 
      applicants: 45, 
      shortlisted: 0, 
      deadline: "3 dias",
      priority: "Média"
    },
    { 
      id: 3, 
      company: "Stripe", 
      role: "Backend Dev", 
      status: "Finalizado", 
      applicants: 89, 
      shortlisted: 5, 
      deadline: "Concluído",
      priority: "Baixa"
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-blue-500 font-black text-xs uppercase tracking-widest mb-2">
            <Zap className="h-4 w-4 fill-blue-500" />
            Curadoria Especializada
          </div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">Vagas p/ Curadoria</h1>
          <p className="text-slate-500 mt-1">Gerencie a triagem e seleção de talentos para seus clientes premium.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl border-slate-200 bg-white font-bold text-slate-600">
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </Button>
        </div>
      </div>

      {/* Stats row for Admin */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 border-slate-200 bg-white rounded-3xl shadow-sm border-l-4 border-l-blue-500">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Managed</p>
          <h3 className="text-3xl font-black mt-1 text-slate-900">18</h3>
        </Card>
        <Card className="p-6 border-slate-200 bg-white rounded-3xl shadow-sm border-l-4 border-l-orange-500">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Em Triagem</p>
          <h3 className="text-3xl font-black mt-1 text-slate-900">12</h3>
        </Card>
        <Card className="p-6 border-slate-200 bg-white rounded-3xl shadow-sm border-l-4 border-l-green-500">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Shortlists Enviadas</p>
          <h3 className="text-3xl font-black mt-1 text-slate-900">145</h3>
        </Card>
      </div>

      {/* Managed Jobs Table/List */}
      <div className="space-y-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input placeholder="Buscar vaga ou empresa..." className="pl-10 h-12 bg-white border-slate-200 rounded-xl" />
        </div>

        <div className="grid grid-cols-1 gap-4">
          {managedJobs.map((job) => (
            <Card key={job.id} className="p-6 border-slate-200 bg-white rounded-[2rem] shadow-sm hover:border-blue-200 transition-all group">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                <div className="flex items-center gap-4 flex-1">
                  <div className="h-14 w-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center font-black text-blue-500 text-xl">
                    {job.company.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors">{job.role}</h4>
                    <div className="flex items-center gap-4 mt-1 text-xs text-slate-500 font-medium">
                      <span className="flex items-center gap-1"><Building2 className="h-3.5 w-3.5" /> {job.company}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {job.deadline}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 flex-[1.5]">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-tighter">Status</p>
                    <Badge className={cn(
                      "rounded-lg px-2 py-0.5 text-[10px] font-bold uppercase",
                      job.status === "Finalizado" ? "bg-green-100 text-green-700 border-none" : "bg-blue-50 text-blue-600 border-none"
                    )}>
                      {job.status}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-tighter">Candidatos</p>
                    <div className="flex items-center gap-2">
                      <Users2 className="h-4 w-4 text-slate-400" />
                      <span className="font-bold text-sm text-slate-900">{job.applicants}</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-tighter">Shortlisted</p>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span className="font-bold text-sm text-slate-900">{job.shortlisted} / 5</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-tighter">Prioridade</p>
                    <span className={cn(
                      "text-xs font-bold",
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

// Utility to handle classes (redundant if already in separate file but helpful for single-file preview)
function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
