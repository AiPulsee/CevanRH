"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import {
  Download,
  Building2,
  Calendar,
  Briefcase,
  Sparkles,
  ThumbsUp,
  ThumbsDown,
  Minus,
  AlertCircle,
  CheckCircle2,
  XCircle,
  FileText,
  Mail,
  X,
  Zap,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { analyzeCandidate, type AIAnalysisResult } from "@/actions/ai-analysis";
import { deleteCandidate } from "@/actions/candidates";
import { AllocateFromResumeModal } from "@/components/admin/allocate-from-resume-modal";
import { ConfirmAction } from "@/components/ui/confirm-action";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

type Job = {
  id: string;
  title: string;
  openings: number;
  salaryRange: string | null;
  company: { name: string; logoUrl: string | null };
};

type ResumeCardProps = {
  app: {
    id: string;
    status: string;
    resumeUrl: string;
    createdAt: Date;
    candidate: { id: string; name: string | null; email: string | null };
    job: { title: string; type: string; company: { name: string } } | null;
  };
  formattedDate: string;
  activeJobs: Job[];
};

const STATUS_LABEL: Record<string, string> = {
  APPLIED: "Inscrito",
  SHORTLISTED: "Indicado",
  HIRED: "Contratado",
  REJECTED: "Reprovado",
};

const STATUS_CLS: Record<string, string> = {
  APPLIED: "bg-slate-100 text-slate-600",
  SHORTLISTED: "bg-emerald-50 text-emerald-700",
  HIRED: "bg-blue-50 text-blue-700",
  REJECTED: "bg-rose-50 text-rose-600",
};

const SCORE_COLOR = (s: number) =>
  s >= 75 ? "text-emerald-600" : s >= 50 ? "text-amber-500" : "text-rose-500";
const SCORE_BG = (s: number) =>
  s >= 75
    ? "bg-emerald-50 border-emerald-100"
    : s >= 50
    ? "bg-amber-50 border-amber-100"
    : "bg-rose-50 border-rose-100";

const REC_CONFIG = {
  APPROVE: { label: "Recomendado", icon: ThumbsUp, color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-100" },
  MAYBE: { label: "Avaliar Detalhes", icon: Minus, color: "text-amber-600", bg: "bg-amber-50 border-amber-100" },
  REJECT: { label: "Não Recomendado", icon: ThumbsDown, color: "text-rose-600", bg: "bg-rose-50 border-rose-100" },
};

export function ResumeCardWithModal({ app, formattedDate, activeJobs }: ResumeCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [aiResult, setAiResult] = useState<AIAnalysisResult | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    setIsDeleting(true);
    const result = await deleteCandidate(app.candidate.id);
    if (!result.success) {
      toast.error(result.error || "Erro ao excluir candidato.");
    }
    setIsDeleting(false);
  }

  async function handleOpen() {
    setIsOpen(true);
    if (!app.job) return;
    if (aiResult) return;
    setAiLoading(true);
    setAiError(null);
    const res = await analyzeCandidate(app.id);
    if (res.success) {
      setAiResult(res.data);
    } else {
      setAiError(res.error);
    }
    setAiLoading(false);
  }

  const rec = aiResult ? REC_CONFIG[aiResult.recommendation] : null;
  const RecIcon = rec?.icon;

  return (
    <>
      <Card
        onClick={handleOpen}
        className="p-5 border-slate-200 bg-white rounded-2xl shadow-sm hover:border-blue-200 hover:shadow-md transition-all group cursor-pointer"
      >
        <div className="flex flex-col lg:flex-row lg:items-center gap-6">
          {/* Candidate Info */}
          <div className="flex items-center gap-4 flex-1">
            <div className="h-12 w-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center font-black text-blue-600 text-lg uppercase shrink-0">
              {app.candidate.name?.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors">
                  {app.candidate.name}
                </h4>
                <Badge
                  className={cn(
                    "rounded-md px-2 py-0.5 text-[9px] font-black uppercase border-none shrink-0",
                    STATUS_CLS[app.status] ?? "bg-slate-100 text-slate-600"
                  )}
                >
                  {STATUS_LABEL[app.status] ?? app.status}
                </Badge>
              </div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-tighter">
                {app.candidate.email}
              </p>
            </div>
          </div>

          {/* Job Info */}
          <div className="flex-[1.5] grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Vaga Original</p>
              <div className="flex items-center gap-2">
                <Briefcase className="h-3.5 w-3.5 text-slate-400" />
                <span className="text-sm font-bold text-slate-700">
                  {app.job?.title ?? "Banco de Talentos"}
                </span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Empresa / Tipo</p>
              <div className="flex items-center gap-3">
                {app.job ? (
                  <>
                    <span className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
                      <Building2 className="h-3.5 w-3.5" /> {app.job.company.name}
                    </span>
                    <Badge className="rounded-md px-1.5 py-0 text-[8px] font-black uppercase border-none bg-blue-50 text-blue-600">
                      Curadoria
                    </Badge>
                  </>
                ) : (
                  <Badge className="rounded-md px-1.5 py-0 text-[8px] font-black uppercase border-none bg-violet-50 text-violet-600">
                    Banco de Talentos
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Date & Actions */}
          <div className="flex flex-row items-center justify-between lg:justify-end gap-4 sm:gap-6 border-t lg:border-none pt-4 lg:pt-0">
            <div className="text-left lg:text-right">
              <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Recebido em</p>
              <div className="flex items-center gap-1.5 justify-start lg:justify-end mt-1">
                <Calendar className="h-3.5 w-3.5 text-slate-400" />
                <span className="text-xs font-bold text-slate-700">{formattedDate}</span>
              </div>
            </div>
            <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
              <Button
                nativeButton={false}
                render={<a href={app.resumeUrl} target="_blank" rel="noopener noreferrer" />}
                size="icon"
                variant="outline"
                className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl border-slate-200 bg-white"
                title="Baixar currículo"
              >
                <Download className="h-4 w-4" />
              </Button>
              <AllocateFromResumeModal
                applicationId={app.id}
                candidateId={app.candidate.id}
                candidateName={app.candidate.name ?? "Candidato"}
                jobs={activeJobs}
              />
              <ConfirmAction
                title="Excluir Candidato?"
                description={`Esta ação removerá ${app.candidate.name ?? "o candidato"} e todas as candidaturas vinculadas permanentemente.`}
                variant="danger"
                actionText="Sim, Excluir"
                onConfirm={handleDelete}
              >
                <Button
                  size="icon"
                  variant="ghost"
                  disabled={isDeleting}
                  className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl hover:bg-rose-50 hover:text-rose-600 text-slate-400"
                  title="Excluir candidato"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </ConfirmAction>
            </div>
          </div>
        </div>
      </Card>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          showCloseButton={false}
          className="w-[calc(100%-1rem)] sm:w-[95vw] max-w-3xl max-h-[90vh] bg-[#F1F5F9] rounded-3xl sm:rounded-[2rem] border-none p-0 overflow-hidden flex flex-col shadow-2xl"
        >
          {/* Header */}
          <div className="bg-slate-950 p-5 sm:p-7 text-white shrink-0 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent pointer-events-none" />
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-blue-600 flex items-center justify-center font-black text-white text-xl uppercase shadow-lg shadow-blue-500/30 shrink-0">
                  {app.candidate.name?.charAt(0)}
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-black text-white leading-tight">
                    {app.candidate.name}
                  </h2>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Mail className="h-3 w-3 text-slate-400" />
                    <p className="text-[10px] text-slate-400 font-bold">{app.candidate.email}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <div className="hidden sm:block text-right">
                  <p className="text-[9px] font-black uppercase text-slate-500 tracking-widest">
                    {app.job ? "Candidatou-se para" : "Origem"}
                  </p>
                  <p className="text-xs font-black text-slate-300 mt-0.5">
                    {app.job?.title ?? "Banco de Talentos"}
                  </p>
                  {app.job && (
                    <p className="text-[10px] text-slate-500 font-bold">{app.job.company.name}</p>
                  )}
                </div>
                <div className="flex items-center gap-2 ml-2">
                  <Badge
                    className={cn(
                      "rounded-lg px-2 py-1 text-[9px] font-black uppercase border-none hidden sm:flex",
                      STATUS_CLS[app.status] ?? "bg-slate-100 text-slate-600"
                    )}
                  >
                    {STATUS_LABEL[app.status] ?? app.status}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 text-white/40 hover:text-white hover:bg-white/10 rounded-xl"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-5">
            {/* Quick Info */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "Vaga", value: app.job?.title ?? "Banco de Talentos" },
                { label: "Empresa", value: app.job?.company.name ?? "—" },
                { label: "Recebido", value: formattedDate },
                {
                  label: "Tipo",
                  value: app.job ? "Curadoria" : "Banco de Talentos",
                },
              ].map((item) => (
                <div key={item.label} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
                  <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-1">{item.label}</p>
                  <p className="text-xs font-black text-slate-800 truncate">{item.value}</p>
                </div>
              ))}
            </div>

            {/* AI Analysis — só exibe quando há vaga vinculada */}
            {app.job && <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between p-5 border-b border-slate-50">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-xl bg-violet-600 flex items-center justify-center shadow-md shadow-violet-500/20">
                    <Sparkles className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-900">Análise Inteligente</p>
                  </div>
                </div>
                {aiResult && (
                  <button
                    onClick={() => { setAiResult(null); handleOpen(); }}
                    className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-violet-600 transition-colors"
                  >
                    Reanalisar
                  </button>
                )}
              </div>

              <AnimatePresence mode="wait">
                {aiLoading && (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center gap-4 p-12"
                  >
                    <div className="h-16 w-16 rounded-3xl bg-violet-50 flex items-center justify-center animate-bounce">
                      <Sparkles className="h-8 w-8 text-violet-500" />
                    </div>
                    <p className="text-base font-black text-slate-900">Analisando currículo...</p>
                    <p className="text-xs text-slate-400 font-medium">Aguarde alguns segundos</p>
                  </motion.div>
                )}

                {aiError && !aiLoading && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center gap-4 p-10"
                  >
                    <AlertCircle className="h-10 w-10 text-amber-400" />
                    <p className="text-sm font-bold text-slate-600 text-center max-w-xs">{aiError}</p>
                    <Button
                      onClick={() => { setAiResult(null); setAiError(null); handleOpen(); }}
                      className="rounded-xl h-10 px-6 font-bold bg-slate-900 text-white text-xs"
                    >
                      Tentar novamente
                    </Button>
                  </motion.div>
                )}

                {aiResult && !aiLoading && (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-5 sm:p-6 space-y-6"
                  >
                    {aiResult.source === "cover_letter" && (
                      <div className="flex items-start gap-3 p-4 rounded-2xl bg-amber-50 border border-amber-200">
                        <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
                        <p className="text-xs font-bold text-amber-700 leading-relaxed">
                          PDF não legível — análise feita com base na carta de apresentação. Resultados podem ser menos precisos.
                        </p>
                      </div>
                    )}

                    {/* Score + Verdict */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className={cn("p-5 rounded-[1.5rem] border-2 text-center flex flex-col items-center justify-center", SCORE_BG(aiResult.score))}>
                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2">
                          {app.job ? "Compatibilidade" : "Score do Perfil"}
                        </p>
                        <div className="relative inline-block">
                          <p className={cn("text-5xl font-black", SCORE_COLOR(aiResult.score))}>{aiResult.score}</p>
                          <span className={cn("text-xs font-bold absolute -top-1 -right-4", SCORE_COLOR(aiResult.score))}>%</span>
                        </div>
                      </div>
                      {rec && RecIcon && (
                        <div className={cn("p-5 rounded-[1.5rem] border-2 flex flex-col items-center justify-center gap-3", rec.bg)}>
                          <RecIcon className={cn("h-8 w-8", rec.color)} />
                          <div className="text-center">
                            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Veredito</p>
                            <p className={cn("text-sm font-black", rec.color)}>{rec.label}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Summary */}
                    <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                      <div className="flex items-center gap-2 mb-3">
                        <Zap className="h-4 w-4 text-violet-600 fill-violet-600" />
                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Resumo Executivo</p>
                      </div>
                      <p className="text-sm font-medium text-slate-700 leading-relaxed italic">
                        &ldquo;{aiResult.summary}&rdquo;
                      </p>
                    </div>

                    {/* Strengths & Concerns */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {aiResult.strengths.length > 0 && (
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <ThumbsUp className="h-4 w-4 text-emerald-600" />
                            <p className="text-[9px] font-black uppercase tracking-widest text-emerald-600">Diferenciais</p>
                          </div>
                          <div className="space-y-2">
                            {aiResult.strengths.map((s, i) => (
                              <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-emerald-50/60 border border-emerald-100/50">
                                <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                                <p className="text-xs font-bold text-slate-700">{s}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {aiResult.concerns.length > 0 && (
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <AlertCircle className="h-4 w-4 text-amber-600" />
                            <p className="text-[9px] font-black uppercase tracking-widest text-amber-600">Atenção</p>
                          </div>
                          <div className="space-y-2">
                            {aiResult.concerns.map((c, i) => (
                              <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-amber-50/60 border border-amber-100/50">
                                <XCircle className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                                <p className="text-xs font-bold text-slate-700">{c}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                  </motion.div>
                )}
              </AnimatePresence>
            </div>}

            {/* Resume link */}
            <a
              href={app.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:border-blue-200 hover:bg-blue-50 transition-all group/link"
            >
              <FileText className="h-5 w-5 text-slate-400 group-hover/link:text-blue-600 transition-colors" />
              <span className="text-sm font-bold text-slate-600 group-hover/link:text-blue-600 transition-colors">
                Abrir currículo completo
              </span>
              <Download className="h-4 w-4 text-slate-300 ml-auto group-hover/link:text-blue-500 transition-colors" />
            </a>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
