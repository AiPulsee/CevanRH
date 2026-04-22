"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Zap, CheckCircle2, MessageSquare, Download, ExternalLink, UserCheck, Loader2, Sparkles } from "lucide-react";

export default function ShortlistsPage() {
  const [approvedIds, setApprovedIds] = useState<number[]>([]);
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const handleApprove = (id: number) => {
    setLoadingId(id);
    setTimeout(() => {
      setApprovedIds([...approvedIds, id]);
      setLoadingId(null);
    }, 1000);
  };

  const candidates = [
    { id: 1, name: "Carlos Magno", exp: "15 anos", match: "98%", tags: ["Ex-Google", "Python", "Cloud"], avatar: "CM" },
    { id: 2, name: "Ana Beatriz", exp: "12 anos", match: "95%", tags: ["Scalability", "Fintech", "Teams"], avatar: "AB" },
    { id: 3, name: "Pedro Holanda", exp: "18 anos", match: "92%", tags: ["Security", "CTO", "IPO Experience"], avatar: "PH" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-blue-600 mb-1">
            <Sparkles className="h-4 w-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">Recomendação Cevan Engine</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900">Curadoria de Talentos</h1>
          <p className="text-sm text-slate-500 font-medium">Candidatos pré-selecionados por nossos especialistas e IA.</p>
        </div>
        <Button variant="outline" className="h-10 rounded-lg border-slate-200 bg-white font-bold text-xs text-slate-600 px-6">
          Suporte Especializado
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Vaga CTO */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="h-2 w-2 bg-blue-600 rounded-full" />
              Vaga: <span className="text-blue-600">Chief Technology Officer (CTO)</span>
            </h2>
            <Badge className="bg-blue-50 text-blue-600 border-blue-100 rounded-md text-[10px] font-bold px-2 py-0.5">3 Candidatos Recomendados</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {candidates.map((candidate, i) => {
              const isApproved = approvedIds.includes(candidate.id);
              const isLoading = loadingId === candidate.id;

              return (
                <Card key={i} className={`relative p-5 border-slate-200 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all group ${isApproved ? 'opacity-70 scale-[0.98]' : ''}`}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-12 w-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center font-black text-blue-600 text-lg">
                      {candidate.avatar}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">{candidate.name}</h4>
                      <p className="text-[11px] text-slate-400 font-medium">{candidate.exp} de exp.</p>
                    </div>
                    {isApproved && (
                      <div className="ml-auto h-6 w-6 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                        <CheckCircle2 className="h-4 w-4" />
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-1.5">
                      {candidate.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="rounded-md bg-slate-50 text-slate-500 border-slate-100 text-[9px] font-bold px-1.5 py-0">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="p-3.5 rounded-xl bg-blue-50/50 border border-blue-100">
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-[9px] font-black uppercase tracking-widest text-blue-600">Match de Perfil</span>
                        <span className="text-[11px] font-black text-blue-600">{candidate.match}</span>
                      </div>
                      <div className="h-1 w-full bg-blue-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 rounded-full" style={{ width: candidate.match }} />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <Button variant="outline" className="rounded-lg border-slate-200 bg-white text-[10px] font-bold h-9 text-slate-600">
                        <Download className="h-3 w-3 mr-1.5" />
                        CV
                      </Button>
                      <Button 
                        onClick={() => handleApprove(candidate.id)}
                        disabled={isApproved || isLoading}
                        className={`rounded-lg font-black text-[10px] h-9 transition-all uppercase tracking-widest ${isApproved ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-white hover:bg-slate-800'}`}
                      >
                        {isLoading ? <Loader2 className="h-3 w-3 animate-spin" /> : isApproved ? "Aprovado" : "Aprovar"}
                        {!isLoading && !isApproved && <UserCheck className="h-3 w-3 ml-1.5" />}
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Suporte CTA */}
        <Card className="p-6 rounded-2xl bg-slate-900 text-white border-none flex flex-col md:flex-row items-center gap-6">
          <div className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center text-blue-400 border border-white/10">
            <MessageSquare className="h-6 w-6" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-base font-black mb-1">Precisa de mais candidatos?</h3>
            <p className="text-slate-400 text-xs font-medium leading-relaxed">Fale agora com seu consultor dedicado para refinarmos a busca ou abrir uma nova triagem assistida.</p>
          </div>
          <Button className="rounded-lg font-black text-[10px] px-6 h-10 bg-blue-600 hover:bg-blue-700 text-white uppercase tracking-widest">
            Abrir Chat
            <ExternalLink className="ml-2 h-3 w-3" />
          </Button>
        </Card>
      </div>
    </div>
  );
}


