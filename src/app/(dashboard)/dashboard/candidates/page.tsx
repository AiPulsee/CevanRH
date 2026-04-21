"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  MoreHorizontal, 
  Search, 
  Filter, 
  Plus, 
  Mail, 
  Calendar, 
  User,
  Star
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { CandidateModal } from "@/components/dashboard/candidate-modal";

const columns = [
  { id: "new", name: "Novos", count: 12, color: "bg-blue-500" },
  { id: "screening", name: "Triagem", count: 5, color: "bg-blue-500" },
  { id: "interview", name: "Entrevista", count: 3, color: "bg-orange-500" },
  { id: "offer", name: "Proposta", count: 1, color: "bg-green-500" },
  { id: "hired", name: "Contratado", count: 0, color: "bg-emerald-500" },
];

const candidates = [
  { id: 1, name: "Lucas Andrade", role: "Sr. Frontend Dev", status: "new", rating: 5, avatar: "LA" },
  { id: 2, name: "Mariana Souza", role: "Product Designer", status: "screening", rating: 4, avatar: "MS" },
  { id: 3, name: "Roberto Silva", role: "Backend Node.js", status: "interview", rating: 5, avatar: "RS" },
  { id: 4, name: "Julia Lopes", role: "QA Engineer", status: "screening", rating: 3, avatar: "JL" },
  { id: 5, name: "Fernando Costa", role: "Full Stack Dev", status: "new", rating: 4, avatar: "FC" },
];

export default function CandidatesKanban() {
  return (
    <div className="h-full flex flex-col space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-foreground">Pipeline de Candidatos</h1>
          <p className="text-muted-foreground mt-1">Gerencie o progresso de todos os seus talentos em um só lugar.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl border-border bg-white shadow-sm font-bold">
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </Button>
          <Button className="rounded-xl font-bold shadow-lg shadow-primary/20">
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Candidato
          </Button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-4 bg-white p-2 rounded-2xl border border-border shadow-sm">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar por nome ou cargo..." className="pl-10 h-10 border-none bg-secondary/50 rounded-xl" />
        </div>
        <div className="h-6 w-[1px] bg-border" />
        <div className="flex gap-2">
          <Badge variant="secondary" className="bg-primary/5 text-primary border-primary/10 rounded-lg px-3">Todas as Vagas</Badge>
          <Badge variant="outline" className="rounded-lg px-3 border-border">Recentes</Badge>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 overflow-x-auto pb-4 custom-scrollbar">
        <div className="flex gap-6 h-full min-w-max">
          {columns.map((column) => (
            <div key={column.id} className="w-[420px] flex flex-col gap-4">
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${column.color}`} />
                  <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">{column.name}</h3>
                  <Badge variant="secondary" className="rounded-full h-5 w-5 p-0 flex items-center justify-center text-[10px] bg-secondary border-border">
                    {column.count}
                  </Badge>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-secondary">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex-1 grid grid-cols-2 gap-3 p-3 bg-secondary/30 rounded-[2rem] border border-border/50 content-start min-h-[500px]">
                {candidates
                  .filter((c) => c.status === column.id)
                  .map((candidate) => (
                    <CandidateModal key={candidate.id} candidate={candidate}>
                      <Card className="p-4 border-border bg-white rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col h-full">
                        <div className="flex flex-col gap-2 mb-3">
                          <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                            {candidate.avatar}
                          </div>
                          <div className="flex items-center gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-3 w-3 ${i < candidate.rating ? "fill-yellow-400 text-yellow-400" : "text-muted/30"}`} 
                              />
                            ))}
                          </div>
                        </div>
                        
                        <h4 className="font-bold text-sm group-hover:text-primary transition-colors">{candidate.name}</h4>
                        <p className="text-xs text-muted-foreground mb-4">{candidate.role}</p>
                        
                        <div className="flex flex-col gap-2 pt-3 border-t border-border mt-auto">
                          <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest text-center">
                            Ativo há 2d
                          </span>
                          <div className="flex items-center justify-center -space-x-2">
                            <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full bg-secondary border border-border z-10 hover:z-20">
                              <Mail className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full bg-secondary border border-border z-10 hover:z-20">
                              <Calendar className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </CandidateModal>
                  ))}
                
                <Button variant="ghost" className="col-span-2 w-full h-12 border-2 border-dashed border-border rounded-2xl text-muted-foreground hover:bg-white/50 hover:border-primary/30 transition-all mt-2">
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Candidato
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
