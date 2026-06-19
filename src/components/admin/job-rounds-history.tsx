"use client";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  History,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  XCircle,
  Clock,
  RefreshCw,
} from "lucide-react";
import { cn } from "@/lib/utils";

type RoundStatus = "TRIAL" | "EFFECTIVE" | "TERMINATED" | "CANCELLED";

type PlacementRound = {
  round: number;
  status: RoundStatus;
  candidateName: string;
  candidateEmail: string;
  startDate: Date;
  trialEndDate: Date;
  terminationReason?: string | null;
  effectiveDate?: Date | null;
  terminationDate?: Date | null;
};

type JobHistory = {
  jobId: string;
  jobTitle: string;
  companyName: string;
  placements: PlacementRound[];
};

const ROUND_STATUS: Record<RoundStatus, { label: string; icon: typeof Clock; color: string }> = {
  TRIAL:      { label: "Em Andamento", icon: Clock,        color: "text-amber-600 bg-amber-50 border-amber-200" },
  EFFECTIVE:  { label: "Efetivado",    icon: CheckCircle2, color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
  TERMINATED: { label: "Encerrado",    icon: XCircle,      color: "text-rose-600 bg-rose-50 border-rose-200" },
  CANCELLED:  { label: "Cancelado",    icon: XCircle,      color: "text-slate-500 bg-slate-50 border-slate-200" },
};

function JobCard({ job }: { job: JobHistory }) {
  const [expanded, setExpanded] = useState(false);
  const totalRounds = job.placements.length;
  const effective = job.placements.find((p) => p.status === "EFFECTIVE");
  const hasReplacement = totalRounds > 1;

  return (
    <Card className="border-slate-200 bg-white rounded-2xl shadow-sm overflow-hidden">
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center justify-between p-4 sm:p-5 hover:bg-slate-50/60 transition-colors text-left"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="h-9 w-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center font-black text-blue-500 text-sm shrink-0">
            {job.companyName.charAt(0)}
          </div>
          <div className="min-w-0">
            <p className="font-bold text-sm text-slate-900 truncate">{job.jobTitle}</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">{job.companyName}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0 ml-3">
          {hasReplacement && (
            <span className="flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-violet-600 bg-violet-50 border border-violet-200 px-2 py-0.5 rounded-full">
              <RefreshCw className="h-2.5 w-2.5" /> {totalRounds} rodadas
            </span>
          )}
          {effective && (
            <span className="text-[9px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
              Posição preenchida
            </span>
          )}
          {expanded ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
        </div>
      </button>

      {expanded && (
        <div className="border-t border-slate-100">
          <div className="relative px-4 sm:px-5 py-4 space-y-0">
            {job.placements.map((p, i) => {
              const cfg = ROUND_STATUS[p.status];
              const Icon = cfg.icon;
              const isLast = i === job.placements.length - 1;

              return (
                <div key={i} className="flex gap-3 sm:gap-4">
                  {/* Timeline column */}
                  <div className="flex flex-col items-center shrink-0">
                    <div className={cn(
                      "h-7 w-7 rounded-full border-2 flex items-center justify-center font-black text-[10px] z-10",
                      p.status === "EFFECTIVE" ? "bg-emerald-500 border-emerald-500 text-white"
                        : p.status === "TRIAL" ? "bg-amber-400 border-amber-400 text-white"
                        : "bg-rose-100 border-rose-300 text-rose-600"
                    )}>
                      {p.round}
                    </div>
                    {!isLast && <div className="w-px flex-1 bg-slate-200 my-1" />}
                  </div>

                  {/* Content */}
                  <div className={cn("pb-5 min-w-0 flex-1", isLast && "pb-2")}>
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <div>
                        <p className="font-bold text-xs text-slate-900">{p.candidateName}</p>
                        <p className="text-[10px] text-slate-400 font-medium">{p.candidateEmail}</p>
                      </div>
                      <Badge className={cn("border font-bold text-[8px] uppercase tracking-wider rounded-lg px-2 py-0.5 shrink-0", cfg.color)}>
                        <Icon className="h-2.5 w-2.5 mr-1" />
                        {cfg.label}
                      </Badge>
                    </div>

                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-slate-400 font-medium mb-2">
                      <span>Início: {format(new Date(p.startDate), "dd/MM/yyyy", { locale: ptBR })}</span>
                      {p.status === "EFFECTIVE" && p.effectiveDate && (
                        <span className="text-emerald-600 font-bold">
                          Efetivado em: {format(new Date(p.effectiveDate), "dd/MM/yyyy", { locale: ptBR })}
                        </span>
                      )}
                      {p.status === "TERMINATED" && p.terminationDate && (
                        <span className="text-rose-500">
                          Encerrado em: {format(new Date(p.terminationDate), "dd/MM/yyyy", { locale: ptBR })}
                        </span>
                      )}
                      {p.status === "TRIAL" && (
                        <span>Trial até: {format(new Date(p.trialEndDate), "dd/MM/yyyy", { locale: ptBR })}</span>
                      )}
                    </div>

                    {p.terminationReason && p.status === "TERMINATED" && (
                      <div className="p-2.5 bg-rose-50 border border-rose-100 rounded-xl">
                        <p className="text-[9px] font-black uppercase text-rose-400 tracking-widest mb-0.5">Motivo</p>
                        <p className="text-[11px] font-medium text-rose-700 leading-relaxed">{p.terminationReason}</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </Card>
  );
}

export function JobRoundsHistory({ jobs }: { jobs: JobHistory[] }) {
  if (jobs.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <History className="h-4 w-4 text-slate-500" />
        <h3 className="text-sm font-bold text-slate-900">Histórico por Vaga</h3>
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-100 px-2 py-0.5 rounded-full">
          {jobs.length} {jobs.length === 1 ? "vaga" : "vagas"}
        </span>
      </div>
      <div className="space-y-3">
        {jobs.map((job) => (
          <JobCard key={job.jobId} job={job} />
        ))}
      </div>
    </div>
  );
}
