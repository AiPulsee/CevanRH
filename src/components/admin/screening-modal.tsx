"use client";

import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  FileText, 
  CheckCircle2, 
  XCircle, 
  ArrowRight,
  Zap,
  Download,
  ExternalLink,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Card } from "@/components/ui/card";

interface ScreeningModalProps {
  jobTitle: string;
  companyName: string;
}

export function ScreeningModal({ jobTitle, companyName }: ScreeningModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const candidates = [
    { 
      name: "Carlos Magno", 
      role: "Full Stack Developer", 
      exp: "8 anos", 
      match: "98%", 
      summary: "Especialista em React e Node.js com passagens por grandes fintechs. Experiência sólida em sistemas de alta escalabilidade.",
      skills: ["React", "Node.js", "AWS", "TypeScript"]
    },
    { 
      name: "Ana Beatriz", 
      role: "Frontend Specialist", 
      exp: "5 anos", 
      match: "92%", 
      summary: "Foco total em UX/UI e performance frontend. Grande conhecimento em Next.js e Design Systems.",
      skills: ["Next.js", "Tailwind", "Figma", "Unit Testing"]
    },
  ];

  const candidate = candidates[currentIndex];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger 
        nativeButton={false}
        render={
          <Button className="rounded-2xl h-14 px-8 font-bold bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200">
            Fazer Triagem
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        }
      />
      <DialogContent className="sm:max-w-6xl w-[95vw] h-[90vh] bg-[#F8FAFC] rounded-[3rem] border-none shadow-2xl p-0 overflow-hidden flex flex-col">
        {/* Header - Fixed */}
        <div className="bg-slate-900 p-8 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-blue-500 flex items-center justify-center">
              <Zap className="h-6 w-6 text-white fill-white" />
            </div>
            <div>
              <h2 className="text-xl font-black">{jobTitle}</h2>
              <p className="text-xs text-slate-400 font-medium">{companyName} • Triagem Managed</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right mr-4">
              <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Progresso da Curadoria</p>
              <p className="text-sm font-bold text-blue-400">3 de 5 candidatos selecionados</p>
            </div>
            <div className="h-2 w-32 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: "60%" }} />
            </div>
          </div>
        </div>

        {/* Content Area - Scrollable */}
        <div className="flex-1 overflow-hidden flex flex-col lg:flex-row p-8 gap-8">
          {/* Left: Candidate Profile Card */}
          <div className="w-full lg:w-[450px] flex flex-col gap-6 overflow-y-auto custom-scrollbar pr-2">
            <Card className="p-8 border-none bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-20 w-20 rounded-[2rem] bg-blue-50 text-blue-600 flex items-center justify-center font-black text-2xl border-2 border-blue-100">
                  {candidate.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900">{candidate.name}</h3>
                  <Badge className="bg-blue-500/10 text-blue-600 border-none font-bold text-[10px] uppercase">{candidate.match} de Afinidade</Badge>
                </div>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Cargo Atual</p>
                    <p className="text-xs font-bold text-slate-800">{candidate.role}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Experiência</p>
                    <p className="text-xs font-bold text-slate-800">{candidate.exp}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-bold text-slate-900">Resumo Profissional</p>
                  <p className="text-sm text-slate-600 leading-relaxed">{candidate.summary}</p>
                </div>

                <div className="space-y-3">
                  <p className="text-sm font-bold text-slate-900">Principais Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {candidate.skills.map(skill => (
                      <Badge key={skill} variant="secondary" className="bg-white border-slate-200 text-slate-500 rounded-lg text-[10px] font-bold">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex gap-2">
                  <Button variant="outline" className="flex-1 rounded-xl border-slate-200 h-12 font-bold">
                    <Download className="h-4 w-4 mr-2" />
                    Baixar PDF
                  </Button>
                  <Button variant="ghost" size="icon" className="h-12 w-12 rounded-xl border border-slate-200">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>

            <div className="flex justify-between items-center px-4">
              <Button 
                variant="ghost" 
                disabled={currentIndex === 0} 
                onClick={() => setCurrentIndex(i => i - 1)}
                className="rounded-xl font-bold"
              >
                <ChevronLeft className="h-4 w-4 mr-1" /> Anterior
              </Button>
              <span className="text-xs font-bold text-slate-400">{currentIndex + 1} de {candidates.length}</span>
              <Button 
                variant="ghost" 
                disabled={currentIndex === candidates.length - 1} 
                onClick={() => setCurrentIndex(i => i + 1)}
                className="rounded-xl font-bold"
              >
                Próximo <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>

          {/* Right: Resume Preview / Notes Area */}
          <div className="flex-1 flex flex-col gap-6">
            <div className="flex-1 bg-white rounded-[2.5rem] border border-slate-200 shadow-inner p-10 flex flex-col items-center justify-center text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-slate-50/50 backdrop-blur-[2px] z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Button className="bg-blue-600 rounded-xl font-bold px-8 h-12 shadow-xl shadow-blue-200">Ver Currículo Completo</Button>
              </div>
              <FileText className="h-24 w-24 text-slate-200 mb-4" />
              <p className="text-lg font-bold text-slate-400">Visualização do Currículo</p>
              <p className="text-sm text-slate-300">O preview do currículo aparecerá aqui.</p>
            </div>

            {/* Final Actions */}
            <div className="grid grid-cols-2 gap-4">
              <Button className="h-16 rounded-[1.5rem] bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-100 font-black uppercase tracking-widest text-xs transition-all">
                <XCircle className="h-5 w-5 mr-3" />
                Rejeitar Candidato
              </Button>
              <Button className="h-16 rounded-[1.5rem] bg-blue-600 text-white hover:bg-blue-700 shadow-xl shadow-blue-200 font-black uppercase tracking-widest text-xs transition-all">
                <CheckCircle2 className="h-5 w-5 mr-3" />
                Aprovar para Curadoria
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
