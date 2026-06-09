"use client";

import { useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  UserPlus,
  Loader2,
  Building2,
  Briefcase,
  Sparkles,
  ThumbsUp,
  ThumbsDown,
  Minus,
  AlertCircle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
} from "lucide-react";
import { adminAllocateCandidate } from "@/actions/placements";
import { analyzeAgainstJob, type AIAnalysisResult } from "@/actions/ai-analysis";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

type Job = {
  id: string;
  title: string;
  openings: number;
  salaryRange: string | null;
  company: { name: string; logoUrl: string | null };
};

interface AllocateFromResumeModalProps {
  applicationId: string;
  candidateId: string;
  candidateName: string;
  jobs: Job[];
}

function parseSalaryFromRange(range: string | null): string {
  if (!range) return "";
  const cleaned = range.replace(/R\$\s*/gi, "").replace(/\./g, "").replace(/,/g, ".");
  const match = cleaned.match(/\d+(\.\d+)?/);
  return match ? String(Math.round(parseFloat(match[0]))) : "";
}

const SCORE_COLOR = (s: number) =>
  s >= 75 ? "text-emerald-600" : s >= 50 ? "text-amber-500" : "text-rose-500";
const SCORE_BG = (s: number) =>
  s >= 75 ? "bg-emerald-50 border-emerald-200" : s >= 50 ? "bg-amber-50 border-amber-200" : "bg-rose-50 border-rose-200";

const REC_CONFIG = {
  APPROVE: { label: "Recomendado", icon: ThumbsUp, color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-200" },
  MAYBE:   { label: "Avaliar Detalhes", icon: Minus, color: "text-amber-600", bg: "bg-amber-50 border-amber-200" },
  REJECT:  { label: "Não Recomendado", icon: ThumbsDown, color: "text-rose-600", bg: "bg-rose-50 border-rose-200" },
};

export function AllocateFromResumeModal({
  applicationId,
  candidateId,
  candidateName,
  jobs,
}: AllocateFromResumeModalProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isAllocating, startAllocating] = useTransition();
  const [isAnalyzing, startAnalyzing] = useTransition();

  const [jobId, setJobId] = useState("");
  const [salary, setSalary] = useState("");
  const [startDate, setStartDate] = useState(() => new Date().toISOString().split("T")[0]);

  const [analysis, setAnalysis] = useState<AIAnalysisResult | null>(null);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [analyzedJobId, setAnalyzedJobId] = useState<string | null>(null);

  const selectedJob = jobs.find((j) => j.id === jobId);

  function handleJobChange(id: string) {
    setJobId(id);
    const job = jobs.find((j) => j.id === id);
    if (job) setSalary(parseSalaryFromRange(job.salaryRange));
    // reset analysis when job changes
    if (id !== analyzedJobId) {
      setAnalysis(null);
      setAnalysisError(null);
    }
  }

  function handleAnalyze() {
    if (!jobId) return;
    setAnalysis(null);
    setAnalysisError(null);
    startAnalyzing(async () => {
      const res = await analyzeAgainstJob(applicationId, jobId);
      if (res.success) {
        setAnalysis(res.data);
        setAnalyzedJobId(jobId);
      } else {
        setAnalysisError(res.error);
      }
    });
  }

  function handleAllocate() {
    if (!jobId || !salary || !startDate) return;
    const salaryInCents = Math.round(parseFloat(salary.replace(",", ".")) * 100);
    if (isNaN(salaryInCents) || salaryInCents <= 0) {
      toast.error("Informe um salário válido.");
      return;
    }
    startAllocating(async () => {
      const result = await adminAllocateCandidate({ candidateId, jobId, monthlySalary: salaryInCents, startDate });
      if (result.success) {
        toast.success("Candidato alocado com sucesso!");
        setIsOpen(false);
        setJobId(""); setSalary(""); setAnalysis(null); setAnalysisError(null); setAnalyzedJobId(null);
        router.refresh();
      } else {
        toast.error(result.error || "Erro ao alocar candidato.");
      }
    });
  }

  function handleClose() {
    setIsOpen(false);
    setJobId(""); setSalary(""); setAnalysis(null); setAnalysisError(null); setAnalyzedJobId(null);
  }

  const rec = analysis ? REC_CONFIG[analysis.recommendation] : null;
  const RecIcon = rec?.icon;
  const analysisIsForCurrentJob = analyzedJobId === jobId;

  const selectCls =
    "w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-blue-500/20 outline-none appearance-none";

  return (
    <>
      <Button
        size="icon"
        variant="secondary"
        className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-200/60"
        title="Alocar em vaga de curadoria"
        onClick={() => setIsOpen(true)}
      >
        <UserPlus className="h-4 w-4" />
      </Button>
      <Dialog open={isOpen} onOpenChange={(v) => { if (!v) handleClose(); }}>
        <DialogContent className="sm:max-w-lg w-[calc(100%-1rem)] bg-white rounded-3xl border-none shadow-2xl p-0 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-slate-900 px-6 py-5 text-white shrink-0">
          <DialogHeader>
            <DialogTitle className="text-base font-black text-white">Alocar em Vaga de Curadoria</DialogTitle>
            <DialogDescription className="text-slate-400 text-xs font-medium mt-0.5">
              Candidato: <span className="text-white font-bold">{candidateName}</span>
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-5">

            {/* Job selector */}
            <div className="space-y-2">
              <Label className="font-bold text-slate-700 text-sm">Vaga de Curadoria</Label>
              {jobs.length === 0 ? (
                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <Briefcase className="h-5 w-5 text-slate-300 shrink-0" />
                  <p className="text-sm text-slate-400 font-medium">Nenhuma vaga ativa no momento.</p>
                </div>
              ) : (
                <select className={selectCls} value={jobId} onChange={(e) => handleJobChange(e.target.value)}>
                  <option value="">Selecione a vaga...</option>
                  {jobs.map((job) => (
                    <option key={job.id} value={job.id}>
                      {job.title} — {job.company.name}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Selected job info + Analyze button */}
            {selectedJob && (
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl border border-blue-100">
                  <div className="h-9 w-9 rounded-xl bg-white border border-blue-100 flex items-center justify-center font-black text-blue-500 text-sm overflow-hidden shrink-0">
                    {selectedJob.company.logoUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={selectedJob.company.logoUrl} alt={selectedJob.company.name} className="h-full w-full object-contain p-1" />
                    ) : (
                      <Building2 className="h-4 w-4" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-black text-blue-900 truncate">{selectedJob.title}</p>
                    <p className="text-[10px] font-bold text-blue-500 uppercase tracking-wide">
                      {selectedJob.company.name} · {selectedJob.openings} vaga{selectedJob.openings !== 1 ? "s" : ""}
                    </p>
                  </div>
                  <Button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                    className="shrink-0 h-9 px-4 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-[11px] gap-1.5 shadow-md shadow-violet-200"
                  >
                    {isAnalyzing ? (
                      <><Loader2 className="h-3.5 w-3.5 animate-spin" /> Analisando...</>
                    ) : analysisIsForCurrentJob && analysis ? (
                      <><RotateCcw className="h-3.5 w-3.5" /> Reanalisar</>
                    ) : (
                      <><Sparkles className="h-3.5 w-3.5" /> Analisar</>
                    )}
                  </Button>
                </div>

                {/* Analysis result */}
                {analysisIsForCurrentJob && (analysis || analysisError) && (
                  <div className="rounded-2xl border border-slate-100 bg-slate-50 overflow-hidden">
                    <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-100">
                      <div className="h-6 w-6 rounded-lg bg-violet-600 flex items-center justify-center">
                        <Sparkles className="h-3.5 w-3.5 text-white" />
                      </div>
                      <p className="text-[11px] font-black text-slate-700 uppercase tracking-widest">Análise de Compatibilidade</p>
                    </div>

                    {analysisError && (
                      <div className="flex items-start gap-3 p-4">
                        <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                        <p className="text-xs font-bold text-slate-600">{analysisError}</p>
                      </div>
                    )}

                    {analysis && (
                      <div className="p-4 space-y-4">
                        {/* Score + Verdict */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className={cn("p-4 rounded-2xl border-2 text-center", SCORE_BG(analysis.score))}>
                            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">Compatibilidade</p>
                            <p className={cn("text-4xl font-black", SCORE_COLOR(analysis.score))}>
                              {analysis.score}<span className="text-lg">%</span>
                            </p>
                          </div>
                          {rec && RecIcon && (
                            <div className={cn("p-4 rounded-2xl border-2 flex flex-col items-center justify-center gap-2", rec.bg)}>
                              <RecIcon className={cn("h-7 w-7", rec.color)} />
                              <div className="text-center">
                                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Veredito</p>
                                <p className={cn("text-xs font-black", rec.color)}>{rec.label}</p>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Summary */}
                        <p className="text-xs font-medium text-slate-600 italic bg-white rounded-xl px-4 py-3 border border-slate-100">
                          &ldquo;{analysis.summary}&rdquo;
                        </p>

                        {/* Strengths + Concerns */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {analysis.strengths.length > 0 && (
                            <div className="space-y-2">
                              <p className="text-[9px] font-black uppercase tracking-widest text-emerald-600 flex items-center gap-1">
                                <ThumbsUp className="h-3 w-3" /> Diferenciais
                              </p>
                              {analysis.strengths.map((s, i) => (
                                <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-emerald-50 border border-emerald-100">
                                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 mt-0.5 shrink-0" />
                                  <p className="text-[11px] font-bold text-slate-700">{s}</p>
                                </div>
                              ))}
                            </div>
                          )}
                          {analysis.concerns.length > 0 && (
                            <div className="space-y-2">
                              <p className="text-[9px] font-black uppercase tracking-widest text-amber-600 flex items-center gap-1">
                                <AlertCircle className="h-3 w-3" /> Atenção
                              </p>
                              {analysis.concerns.map((c, i) => (
                                <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-amber-50 border border-amber-100">
                                  <XCircle className="h-3.5 w-3.5 text-amber-500 mt-0.5 shrink-0" />
                                  <p className="text-[11px] font-bold text-slate-700">{c}</p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Salary + Date */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="font-bold text-slate-700 text-sm">Salário Mensal (R$)</Label>
                <Input
                  type="number"
                  min={1}
                  placeholder="Ex: 5000"
                  className="h-12 bg-slate-50 border-slate-200 rounded-xl font-bold"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                />
                {selectedJob?.salaryRange && (
                  <p className="text-[10px] text-slate-400 font-medium">
                    Faixa: <span className="font-bold text-slate-600">{selectedJob.salaryRange}</span>
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label className="font-bold text-slate-700 text-sm">Início</Label>
                <Input
                  type="date"
                  className="h-12 bg-slate-50 border-slate-200 rounded-xl font-bold"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-100 flex gap-3 shrink-0">
          <Button
            variant="ghost"
            className="rounded-xl font-bold h-11 px-5 flex-1"
            onClick={handleClose}
            disabled={isAllocating}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleAllocate}
            disabled={isAllocating || !jobId || !salary || jobs.length === 0}
            className="rounded-xl font-black h-11 px-6 flex-1 bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-200 uppercase text-xs tracking-widest gap-2"
          >
            {isAllocating ? (
              <><Loader2 className="h-4 w-4 animate-spin" /> Alocando...</>
            ) : (
              <><UserPlus className="h-4 w-4" /> Alocar Candidato <ArrowRight className="h-3.5 w-3.5" /></>
            )}
          </Button>
        </div>
      </DialogContent>
      </Dialog>
    </>
  );
}
