"use client";

import { useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  FileText,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Zap,
  Download,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Briefcase,
  X,
  UserCheck,
  Sparkles,
  ThumbsUp,
  ThumbsDown,
  Minus,
  Mail,
  MessageSquare,
  AlertCircle,
} from "lucide-react";
import { shortlistApplication, rejectApplication } from "@/actions/applications";
import { hireAndPlace } from "@/actions/placements";
import { analyzeCandidate, type AIAnalysisResult } from "@/actions/ai-analysis";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

type App = {
  id: string;
  status: string;
  resumeUrl: string;
  coverLetter: string | null;
  candidate: { name: string | null; email: string | null };
};

interface ScreeningModalProps {
  jobTitle: string;
  companyName: string;
  applications: App[];
}

function isStorageUrl(url: string) {
  try {
    const { hostname } = new URL(url);
    return !["example.com", "placeholder-endpoint.com", "localhost"].includes(hostname) &&
      !hostname.includes("placeholder");
  } catch {
    return false;
  }
}

export function ScreeningModal({ jobTitle, companyName, applications }: ScreeningModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [apps, setApps] = useState<App[]>(() =>
    applications.filter((a) => a.status !== "REJECTED" && a.status !== "HIRED")
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mode, setMode] = useState<"review" | "hire">("review");
  const [salary, setSalary] = useState("");
  const [startDate, setStartDate] = useState(
    () => new Date().toISOString().split("T")[0]
  );
  const [aiResult, setAiResult] = useState<AIAnalysisResult | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [, startTransition] = useTransition();

  const currentApp = apps[currentIndex];
  const isShortlisted = currentApp?.status === "SHORTLISTED";
  const actionableCount = apps.length;

  function advanceAfterRemove(removedId: string) {
    const newApps = apps.filter((a) => a.id !== removedId);
    setApps(newApps);
    setCurrentIndex((i) => Math.min(i, Math.max(0, newApps.length - 1)));
    setMode("review");
    setAiResult(null);
    setShowAI(false);
  }

  function handleNavigate(newIndex: number) {
    setCurrentIndex(newIndex);
    setAiResult(null);
    setShowAI(false);
  }

  async function handleAnalyzeAI() {
    if (!currentApp) return;
    setAiLoading(true);
    setShowAI(true);
    const res = await analyzeCandidate(currentApp.id);
    setAiLoading(false);
    if (res.success) {
      setAiResult(res.data);
    } else {
      toast.error(res.error);
      setShowAI(false);
    }
  }

  function handleShortlist() {
    if (!currentApp) return;
    startTransition(async () => {
      const res = await shortlistApplication(currentApp.id, "Candidato aprovado na triagem inicial.");
      if (res.success) {
        setApps((prev) =>
          prev.map((a) => (a.id === currentApp.id ? { ...a, status: "SHORTLISTED" } : a))
        );
        toast.success("Candidato indicado para o cliente!");
      } else {
        toast.error("Erro ao indicar candidato.");
      }
    });
  }

  function handleReject() {
    if (!currentApp) return;
    startTransition(async () => {
      const res = await rejectApplication(currentApp.id);
      if (res.success) {
        advanceAfterRemove(currentApp.id);
        toast.success("Candidato reprovado.");
      } else {
        toast.error("Erro ao reprovar candidato.");
      }
    });
  }

  function handleHire() {
    if (!currentApp || !salary || !startDate) return;
    const salaryInCents = Math.round(parseFloat(salary.replace(",", ".")) * 100);
    if (isNaN(salaryInCents) || salaryInCents <= 0) {
      toast.error("Informe um salário válido.");
      return;
    }
    startTransition(async () => {
      const res = await hireAndPlace({
        applicationId: currentApp.id,
        monthlySalary: salaryInCents,
        startDate,
      });
      if (res.success) {
        advanceAfterRemove(currentApp.id);
        setSalary("");
        toast.success("Candidato contratado! Alocação criada em Alocações.");
      } else {
        toast.error(res.error || "Erro ao contratar candidato.");
      }
    });
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) setMode("review");
      }}
    >
      <DialogTrigger
        render={
          <Button className="rounded-2xl h-14 px-8 font-bold bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all hover:-translate-y-0.5 active:translate-y-0">
            Fazer Triagem
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        }
      />
      <DialogContent
        showCloseButton={false}
        className="flex flex-col w-[95vw] max-w-6xl h-[90vh] bg-[#F1F5F9] rounded-[2.5rem] border-none p-0 overflow-hidden shadow-[0_32px_64px_-15px_rgba(0,0,0,0.25)]"
      >
        {/* Header */}
        <div className="bg-slate-950 p-4 sm:p-8 text-white shrink-0 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent pointer-events-none" />
          
          <div className="flex items-center justify-between relative z-10 gap-4 mb-4 sm:mb-0">
            {/* Logo & Job Info */}
            <div className="flex items-center gap-3 sm:gap-6">
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20 shrink-0">
                <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-white fill-white" />
              </div>
              <div className="min-w-0">
                <h2 className="text-sm sm:text-lg font-black tracking-tight text-white leading-tight truncate">
                  {jobTitle}
                </h2>
                <p className="text-[9px] sm:text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5 truncate">
                  {companyName} • Triagem
                </p>
              </div>
            </div>

            {/* Desktop Center Info */}
            <div className="hidden lg:flex flex-1 items-center justify-center gap-8 px-8">
              <div className="h-10 w-px bg-slate-800" />
              <div className="text-center">
                <h3 className="text-lg font-black text-blue-400 tracking-tight leading-none">
                  {currentApp?.candidate?.name || "Candidato"}
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-1">{currentApp?.candidate?.email}</p>
              </div>
              <div className="h-10 w-px bg-slate-800" />
            </div>

            {/* Navigation & Close */}
            <div className="flex items-center gap-2 sm:gap-4 shrink-0">
              <div className="hidden sm:flex items-center gap-2 mr-2">
                <Button
                  variant="ghost"
                  size="icon"
                  disabled={currentIndex === 0}
                  onClick={() => handleNavigate(currentIndex - 1)}
                  className="rounded-xl h-9 w-9 text-slate-400 hover:text-white hover:bg-white/10"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <div className="flex flex-col items-center min-w-[50px]">
                  <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest leading-none mb-1">Fila</span>
                  <span className="text-[11px] font-black text-slate-400 leading-none">
                    {currentIndex + 1}/{apps.length}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  disabled={currentIndex === apps.length - 1}
                  onClick={() => handleNavigate(currentIndex + 1)}
                  className="rounded-xl h-9 w-9 text-slate-400 hover:text-white hover:bg-white/10"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-white/40 hover:text-white hover:bg-white/10 rounded-xl h-10 w-10"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Mobile Secondary Header (Candidate & Nav) */}
          <div className="sm:hidden flex items-center justify-between pt-3 border-t border-white/5 relative z-10">
            <div className="min-w-0">
              <h3 className="text-sm font-black text-blue-400 tracking-tight truncate">
                {currentApp?.candidate?.name || "Candidato"}
              </h3>
              <p className="text-[10px] text-slate-500 font-medium truncate">{currentApp?.candidate?.email}</p>
            </div>
            <div className="flex items-center gap-1 shrink-0 ml-4">
              <Button
                variant="ghost"
                size="icon"
                disabled={currentIndex === 0}
                onClick={() => handleNavigate(currentIndex - 1)}
                className="rounded-lg h-8 w-8 text-slate-400"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-[10px] font-black text-slate-500 min-w-[30px] text-center">
                {currentIndex + 1}/{apps.length}
              </span>
              <Button
                variant="ghost"
                size="icon"
                disabled={currentIndex === apps.length - 1}
                onClick={() => handleNavigate(currentIndex + 1)}
                className="rounded-lg h-8 w-8 text-slate-400"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {apps.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-white">
            <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center mb-6">
              <Briefcase className="h-8 w-8 text-slate-300" />
            </div>
            <h3 className="text-xl font-black text-slate-900 tracking-tight">Triagem concluída</h3>
            <p className="text-sm text-slate-500 max-w-sm mx-auto mt-2 leading-relaxed">
              Todos os currículos deste lote foram processados.
            </p>
            <Button onClick={() => setIsOpen(false)} className="mt-8 rounded-xl h-11 px-8 font-bold bg-slate-900 text-white w-full sm:w-auto">
              Sair
            </Button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto lg:overflow-hidden flex flex-col lg:flex-row p-4 sm:p-8 gap-6 sm:gap-8">
            {/* Main Content: Resume/AI Panel */}
            <div className="w-full lg:flex-1 h-[500px] lg:h-full bg-white rounded-[1.5rem] sm:rounded-[2rem] shadow-sm border border-slate-200/50 overflow-hidden relative flex flex-col shrink-0 lg:shrink">
              <AnimatePresence mode="wait">
                {showAI ? (
                  <motion.div 
                    key="ai-panel"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="flex-1 flex flex-col overflow-hidden"
                  >
                    {aiLoading ? (
                      <div className="flex-1 flex flex-col items-center justify-center text-center gap-6 p-8 sm:p-12">
                        <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-3xl bg-violet-50 flex items-center justify-center animate-bounce">
                          <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-violet-500" />
                        </div>
                        <p className="text-base sm:text-lg font-black text-slate-900 tracking-tight">Analisando currículo...</p>
                      </div>
                    ) : aiResult ? (
                      <AIAnalysisPanel result={aiResult} onClose={() => setShowAI(false)} />
                    ) : null}
                  </motion.div>
                ) : (
                  <motion.div 
                    key="resume-preview"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex-1 flex flex-col"
                  >
                    {currentApp?.resumeUrl?.endsWith(".pdf") && isStorageUrl(currentApp.resumeUrl) ? (
                      <iframe
                        src={`${currentApp.resumeUrl}#toolbar=0`}
                        className="w-full h-full border-none"
                        title="Visualizar Currículo"
                      />
                    ) : (
                      <div className="flex-1 flex flex-col items-center justify-center text-center p-8 sm:p-12">
                        <FileText className="h-12 w-12 sm:h-16 sm:w-16 text-slate-200 mb-4" />
                        <p className="text-base sm:text-lg font-black text-slate-900">Visualização não disponível</p>
                        <Button 
                          variant="outline" 
                          className="mt-6 rounded-xl h-11 px-6 sm:px-8 font-bold"
                          onClick={() => currentApp && window.open(currentApp.resumeUrl, '_blank')}
                        >
                          Baixar Currículo
                        </Button>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Sidebar: Message + Actions */}
            <div className="w-full lg:w-[380px] flex flex-col gap-6 shrink-0 lg:h-full lg:overflow-y-auto pb-8 lg:pb-0">
              {/* Message from Candidate */}
              <div className="bg-white rounded-[1.5rem] sm:rounded-[2rem] p-6 border border-slate-200/50 shadow-sm flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <MessageSquare className="h-4 w-4 text-blue-600" />
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Apresentação</p>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed italic">
                  &quot;{currentApp?.coverLetter || "O candidato não enviou uma mensagem."}&quot;
                </p>
                
                <div className="mt-6 pt-6 border-t border-slate-100 space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Documento</p>
                    {currentApp && (
                      <a 
                        href={currentApp.resumeUrl} 
                        target="_blank" 
                        className="text-[10px] font-black text-blue-600 uppercase hover:underline"
                      >
                        Abrir PDF
                      </a>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    className="w-full rounded-xl h-12 font-bold text-slate-600 border-slate-200 bg-slate-50/50"
                    onClick={() => currentApp && window.open(currentApp.resumeUrl, '_blank')}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Baixar Currículo
                  </Button>
                </div>
              </div>

              {/* Action Area */}
              <div className="bg-slate-900 rounded-[1.5rem] sm:rounded-[2rem] p-6 shadow-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent pointer-events-none" />
                
                {mode === "hire" ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4 relative z-10"
                  >
                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Salário sugerido</label>
                        <Input
                          type="number"
                          placeholder="Ex: 5000"
                          value={salary}
                          onChange={(e) => setSalary(e.target.value)}
                          className="h-12 rounded-xl border-slate-700 bg-slate-800 text-white font-black"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Previsão Início</label>
                        <Input
                          type="date"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          className="h-12 rounded-xl border-slate-700 bg-slate-800 text-white font-black"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        onClick={() => setMode("review")}
                        className="h-14 rounded-xl bg-slate-800 text-slate-400 hover:text-white font-bold transition-all"
                      >
                        Voltar
                      </Button>
                      <Button
                        onClick={handleHire}
                        disabled={!salary}
                        className="h-14 rounded-xl bg-blue-600 text-white hover:bg-blue-700 font-bold shadow-lg shadow-blue-500/20"
                      >
                        Contratar
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  <div className="space-y-4 relative z-10">
                    <Button
                      onClick={handleAnalyzeAI}
                      disabled={aiLoading}
                      className={cn(
                        "w-full h-14 rounded-xl font-black uppercase tracking-widest text-[11px] transition-all",
                        showAI && aiResult
                          ? "bg-violet-600/20 text-violet-400 border border-violet-600/30"
                          : "bg-violet-600 text-white hover:bg-violet-700 shadow-lg shadow-violet-500/20"
                      )}
                    >
                      <Sparkles className="h-5 w-5 mr-3" />
                      {showAI && aiResult ? "Reanalisar" : "IA Inteligente"}
                    </Button>
                    <div className="flex flex-col gap-3">
                      {isShortlisted ? (
                        <Button
                          onClick={() => setMode("hire")}
                          className="h-14 rounded-xl bg-blue-600 text-white hover:bg-blue-700 font-black uppercase tracking-widest text-[11px]"
                        >
                          <UserCheck className="h-5 w-5 mr-3" />
                          Contratar
                        </Button>
                      ) : (
                        <Button
                          onClick={handleShortlist}
                          className="h-14 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 font-black uppercase tracking-widest text-[11px]"
                        >
                          <ThumbsUp className="h-5 w-5 mr-3" />
                          Indicar p/ Cliente
                        </Button>
                      )}
                      <Button
                        onClick={handleReject}
                        className="h-14 rounded-xl bg-rose-600/10 text-rose-500 hover:bg-rose-600 hover:text-white border border-rose-600/20 font-black uppercase tracking-widest text-[11px] transition-all"
                      >
                        <XCircle className="h-5 w-5 mr-3" />
                        Reprovar
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

const SCORE_COLOR = (score: number) =>
  score >= 75 ? "text-emerald-600" : score >= 50 ? "text-amber-500" : "text-rose-500";

const SCORE_BG = (score: number) =>
  score >= 75 ? "bg-emerald-50 border-emerald-100" : score >= 50 ? "bg-amber-50 border-amber-100" : "bg-rose-50 border-rose-100";

const REC_CONFIG = {
  APPROVE: { label: "Recomendado", icon: ThumbsUp, color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-100" },
  MAYBE: { label: "Avaliar Detalhes", icon: Minus, color: "text-amber-600", bg: "bg-amber-50 border-amber-100" },
  REJECT: { label: "Não Recomendado", icon: ThumbsDown, color: "text-rose-600", bg: "bg-rose-50 border-rose-100" },
};

function AIAnalysisPanel({
  result,
  onClose,
}: {
  result: AIAnalysisResult;
  onClose: () => void;
}) {
  const rec = REC_CONFIG[result.recommendation];
  const RecIcon = rec.icon;

  return (
    <div className="h-full flex flex-col p-8 overflow-y-auto custom-scrollbar bg-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-violet-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <span className="text-lg font-black text-slate-900 tracking-tight">Análise Inteligente</span>
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Motor Neural v4.0</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-blue-600 text-xs font-black uppercase tracking-widest transition-colors flex items-center gap-2"
        >
          <FileText className="h-4 w-4" />
          Voltar p/ Currículo
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Fit Score */}
        <div className={cn("p-6 rounded-[2.5rem] border-2 text-center flex flex-col items-center justify-center shadow-sm transition-all", SCORE_BG(result.score))}>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3">
            Career Fit Score
          </p>
          <div className="relative inline-block">
             <p className={cn("text-5xl font-black", SCORE_COLOR(result.score))}>
              {result.score}
            </p>
            <span className={cn("text-xs font-bold absolute -top-1 -right-4", SCORE_COLOR(result.score))}>%</span>
          </div>
        </div>

        {/* AI Recommendation */}
        <div className={cn("p-6 rounded-[2.5rem] border-2 flex flex-col items-center justify-center gap-3 shadow-sm", rec.bg)}>
          <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center", rec.bg.replace('bg-', 'bg-white/'))}>
             <RecIcon className={cn("h-7 w-7", rec.color)} />
          </div>
          <div className="text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-0.5">Veredito</p>
            <p className={cn("text-lg font-black tracking-tight", rec.color)}>{rec.label}</p>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
           <Zap className="h-4 w-4 text-violet-600 fill-violet-600" />
           <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Resumo Executivo</p>
        </div>
        <div className="p-6 rounded-[2rem] bg-slate-50 border border-slate-100 text-sm font-medium text-slate-700 leading-relaxed shadow-inner">
          {result.summary}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Strengths */}
        {result.strengths.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
               <ThumbsUp className="h-4 w-4 text-emerald-600" />
               <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600">Diferenciais</p>
            </div>
            <div className="space-y-3">
              {result.strengths.map((s, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3 p-4 rounded-2xl bg-emerald-50/40 border border-emerald-100/50 hover:bg-emerald-50 transition-colors"
                >
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                  <p className="text-sm font-bold text-slate-700">{s}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Concerns */}
        {result.concerns.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
               <AlertCircle className="h-4 w-4 text-amber-600" />
               <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-600">Riscos e Atenção</p>
            </div>
            <div className="space-y-3">
              {result.concerns.map((c, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3 p-4 rounded-2xl bg-amber-50/40 border border-amber-100/50 hover:bg-amber-50 transition-colors"
                >
                  <XCircle className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                  <p className="text-sm font-bold text-slate-700">{c}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
