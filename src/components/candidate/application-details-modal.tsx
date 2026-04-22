"use client";

import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  Building2,
  Calendar,
  MessageSquare
} from "lucide-react";

interface ApplicationDetailsModalProps {
  jobTitle: string;
  companyName: string;
  status: string;
  color: string;
}

export function ApplicationDetailsModal({ jobTitle, companyName, status, color }: ApplicationDetailsModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const timeline = [
    { date: "Há 3 dias", title: "Candidatura Recebida", desc: "Seu perfil foi enviado para a triagem inicial.", done: true },
    { date: "Há 1 dia", title: "Perfil Visualizado", desc: "Um recrutador da " + companyName + " analisou seu currículo.", done: true },
    { date: "Agora", title: status, desc: "Seu perfil está sendo avaliado em comparação com outros candidatos.", done: false },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger 
        nativeButton={true}
        render={
          <Button variant="ghost" size="icon" className="rounded-xl border border-border bg-white group-hover:bg-primary group-hover:text-white transition-all shadow-sm h-12 w-12">
            <ArrowRight className="h-5 w-5" />
          </Button>
        }
      />
      <DialogContent className="sm:max-w-2xl w-[95vw] bg-white rounded-[2.5rem] border-none shadow-2xl p-0 overflow-hidden flex flex-col">
        {/* Header Section */}
        <div className={`p-10 text-white relative overflow-hidden ${color}`}>
          <div className="relative z-10 space-y-4">
            <Badge className="bg-white/20 text-white border-none font-bold text-[10px] uppercase tracking-widest px-3 py-1">
              Status: {status}
            </Badge>
            <h2 className="text-3xl font-black leading-tight">{jobTitle}</h2>
            <div className="flex items-center gap-4 text-white/80 font-bold text-sm">
              <span className="flex items-center gap-1.5"><Building2 className="h-4 w-4" /> {companyName}</span>
              <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> Remoto / SP</span>
            </div>
          </div>
          <div className="absolute -bottom-12 -right-12 h-48 w-48 bg-white/10 rounded-full blur-3xl" />
        </div>

        {/* Timeline Section */}
        <div className="p-10 space-y-8 flex-1 overflow-y-auto custom-scrollbar">
          <div className="space-y-6">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Histórico do Processo
            </h3>

            <div className="relative space-y-8 pl-8 before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
              {timeline.map((step, i) => (
                <div key={i} className="relative">
                  <div className={`absolute -left-8 top-1 h-7 w-7 rounded-full border-4 border-white shadow-sm flex items-center justify-center ${step.done ? "bg-green-500" : "bg-slate-200 animate-pulse"}`}>
                    {step.done && <CheckCircle2 className="h-4 w-4 text-white" />}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <p className={`font-bold text-sm ${step.done ? "text-slate-900" : "text-slate-400"}`}>{step.title}</p>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">{step.date}</span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-secondary/50 border border-border space-y-4">
            <div className="flex items-center gap-3">
              <MessageSquare className="h-5 w-5 text-primary" />
              <p className="text-sm font-bold text-slate-900">Mensagem do Recrutador</p>
            </div>
            <p className="text-xs text-slate-600 italic">
              "Olá Danilo! Gostamos muito do seu portfólio. Estamos finalizando a primeira triagem e entraremos em contato em breve."
            </p>
          </div>
        </div>

        <DialogFooter className="p-8 bg-slate-50 border-t border-slate-100 gap-3 shrink-0">
          <Button variant="ghost" className="rounded-xl font-bold h-12 px-8" onClick={() => setIsOpen(false)}>Fechar</Button>
          <Button className="rounded-xl font-black h-12 px-10 shadow-lg shadow-primary/20 uppercase text-xs tracking-widest">
            Enviar Mensagem
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
