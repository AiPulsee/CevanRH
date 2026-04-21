"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Briefcase, 
  Users, 
  Clock, 
  MapPin, 
  ChevronRight, 
  Zap,
  Search,
  Filter
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { CreateJobModal } from "@/components/dashboard/create-job-modal";
import Link from "next/link";

export default function JobsPage() {
  const jobs = [
    { title: "Senior Frontend Engineer", status: "Ativa", candidates: 42, type: "Full-time", managed: true },
    { title: "Product Designer", status: "Em Triagem", candidates: 18, type: "Híbrido", managed: true },
    { title: "Node.js Backend Developer", status: "Pausada", candidates: 0, type: "PJ / Remoto", managed: false },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight">Minhas Vagas</h1>
          <p className="text-muted-foreground mt-1">Gerencie suas oportunidades e acompanhe o fluxo de candidatos.</p>
        </div>
        <CreateJobModal />
      </div>

      <div className="flex items-center gap-4 bg-white p-3 rounded-2xl border border-border shadow-sm">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar por cargo..." className="pl-10 h-10 border-border bg-secondary/30 rounded-xl" />
        </div>
        <Button variant="outline" className="h-10 rounded-xl border-border font-bold text-muted-foreground">
          <Filter className="h-4 w-4 mr-2" />
          Filtrar
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {jobs.map((job, i) => (
          <Link href="/dashboard/candidates" key={i} className="block">
            <Card className="p-6 border-border bg-white rounded-[2rem] shadow-sm hover:shadow-md transition-all group cursor-pointer relative overflow-hidden">
              {job.managed && (
                <div className="absolute top-0 right-0 p-4">
                  <Badge className="bg-primary/10 text-primary border-primary/20 rounded-lg flex items-center gap-1 font-black text-[10px] uppercase tracking-widest">
                    <Zap className="h-3 w-3 fill-primary" />
                    Managed
                  </Badge>
                </div>
              )}
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-2xl bg-secondary border border-border flex items-center justify-center font-black text-xl text-primary shadow-inner">
                    {job.title.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg group-hover:text-primary transition-colors">{job.title}</h4>
                    <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground font-medium">
                      <span className="flex items-center gap-1"><Briefcase className="h-3.5 w-3.5" /> {job.type}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> Publicada hoje</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-8">
                  <div className="text-right hidden md:block">
                    <p className="text-xs font-black text-foreground uppercase tracking-widest">{job.candidates} candidatos</p>
                    <p className="text-[10px] text-muted-foreground mt-1">Interessados</p>
                  </div>
                  <Badge variant={job.status === "Ativa" ? "default" : "secondary"} className="rounded-lg px-3 py-1 font-bold text-[10px] uppercase">
                    {job.status}
                  </Badge>
                  <div className="flex items-center justify-center rounded-xl border border-border bg-white group-hover:bg-primary group-hover:text-white transition-all shadow-sm h-12 w-12">
                    <ChevronRight className="h-6 w-6" />
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
