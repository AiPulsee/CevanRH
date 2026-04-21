"use client";

import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Star,
  MessageSquare,
  FileText,
  Send,
  MoreHorizontal
} from "lucide-react";

export function CandidateModal({ children, candidate }: { children: React.ReactNode, candidate: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("resume");
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([
    { author: "Danilo (RH)", text: "Candidato muito comunicativo. Passou na primeira triagem técnica.", time: "Hoje, 10:30", rating: 4 },
    { author: "Mariana (Gestora)", text: "Gostei do portfólio, mas o salário esperado está um pouco acima do nosso teto.", time: "Ontem, 15:45", rating: 3 }
  ]);

  const handleAddNote = () => {
    if (!note) return;
    setNotes([{ author: "Você", text: note, time: "Agora", rating: 5 }, ...notes]);
    setNote("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-5xl w-[95vw] bg-slate-50 rounded-[2.5rem] border-none shadow-2xl p-0 overflow-hidden h-[85vh] flex flex-col">
        {/* Header Profile */}
        <div className="bg-white p-8 border-b border-slate-100 flex flex-col md:flex-row md:items-start justify-between gap-6 relative z-10 shadow-sm">
          <div className="flex items-start gap-5">
            <div className="h-20 w-20 rounded-[1.5rem] bg-blue-600 flex items-center justify-center font-black text-3xl text-white shadow-xl shadow-blue-200">
              {candidate.avatar}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <DialogTitle className="text-2xl font-black text-slate-900">{candidate.name}</DialogTitle>
                <Badge className="bg-blue-50 text-blue-600 hover:bg-blue-100 border-none rounded-lg px-3 uppercase text-[10px] tracking-widest font-bold">
                  {candidate.status}
                </Badge>
              </div>
              <p className="text-slate-500 font-medium mt-1">{candidate.role}</p>
              
              <div className="flex flex-wrap items-center gap-4 mt-4 text-xs font-medium text-slate-500">
                <span className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" /> candidato@email.com</span>
                <span className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" /> (11) 99999-9999</span>
                <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> São Paulo, SP</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" className="rounded-xl h-10 border-slate-200 font-bold bg-white text-slate-700">
              <Calendar className="h-4 w-4 mr-2" /> Agendar
            </Button>
            <Button className="rounded-xl h-10 bg-blue-600 hover:bg-blue-700 font-bold shadow-lg shadow-blue-200 text-white">
              Avançar Etapa
            </Button>
            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl">
              <MoreHorizontal className="h-5 w-5 text-slate-400" />
            </Button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar / Tabs */}
          <div className="w-64 bg-white border-r border-slate-100 p-6 flex flex-col gap-2 z-0">
            <button 
              onClick={() => setActiveTab("resume")}
              className={`flex items-center gap-3 w-full p-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'resume' ? 'bg-blue-50 text-blue-700' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              <FileText className="h-4 w-4" /> Currículo e Perfil
            </button>
            <button 
              onClick={() => setActiveTab("notes")}
              className={`flex items-center gap-3 w-full p-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'notes' ? 'bg-blue-50 text-blue-700' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              <MessageSquare className="h-4 w-4" /> Colaboração 
              <span className="ml-auto bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded-full">{notes.length}</span>
            </button>
          </div>

          {/* Main Area */}
          <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
            {activeTab === "resume" && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
                  <h3 className="font-black text-slate-900 mb-4 flex items-center gap-2">
                    <User className="h-5 w-5 text-blue-600" /> Resumo Profissional
                  </h3>
                  <p className="text-slate-600 leading-relaxed font-medium text-sm">
                    Desenvolvedor com mais de 5 anos de experiência focado em ecossistema JavaScript (React, Node.js). 
                    Experiência em arquitetura de micro-frontends e performance web. Apaixonado por UI/UX.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 space-y-4">
                  <h3 className="font-black text-slate-900 mb-2">Habilidades Avaliadas (Matching IA)</h3>
                  <div className="flex flex-wrap gap-2">
                    {["React", "Next.js", "TypeScript", "TailwindCSS", "Node.js", "GraphQL"].map(skill => (
                      <Badge key={skill} variant="outline" className="rounded-lg px-3 py-1.5 border-slate-200 text-slate-700 font-bold bg-slate-50">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "notes" && (
              <div className="h-full flex flex-col animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-black text-slate-900">Comentários Internos</h3>
                    <p className="text-sm text-slate-500 font-medium">Discuta este candidato com a sua equipe (Oculto para o candidato).</p>
                  </div>
                </div>

                <div className="flex-1 space-y-4 mb-6">
                  {notes.map((n, i) => (
                    <div key={i} className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600 text-xs">
                            {n.author.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-900">{n.author}</p>
                            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">{n.time}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, j) => (
                            <Star key={j} className={`h-3 w-3 ${j < n.rating ? "fill-yellow-400 text-yellow-400" : "text-slate-200"}`} />
                          ))}
                        </div>
                      </div>
                      <p className="text-slate-600 text-sm mt-3 ml-10 font-medium leading-relaxed">{n.text}</p>
                    </div>
                  ))}
                </div>

                {/* Input Area */}
                <div className="bg-white p-2 pl-4 rounded-3xl border border-blue-200 shadow-md shadow-blue-500/5 flex items-end gap-2 focus-within:ring-4 ring-blue-500/10 transition-all">
                  <Textarea 
                    placeholder="Deixe um comentário sobre a entrevista..."
                    className="border-none resize-none min-h-[60px] bg-transparent focus-visible:ring-0 p-2 font-medium"
                    value={note}
                    onChange={e => setNote(e.target.value)}
                  />
                  <Button onClick={handleAddNote} className="h-12 w-12 rounded-2xl bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-200 flex-shrink-0 mb-1 mr-1">
                    <Send className="h-5 w-5 text-white" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
