"use client";

import { useState, useTransition, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ConfirmAction } from "@/components/ui/confirm-action";
import {
  Search,
  Building2,
  Clock,
  Users2,
  CheckCircle2,
  Briefcase,
  Trash2,
  Wallet,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { ScreeningModal } from "@/components/admin/screening-modal";
import { EditJobModal } from "@/components/admin/edit-job-modal";
import { EntryFeeModal } from "@/components/admin/entry-fee-modal";
import { deleteJob } from "@/actions/jobs";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type EntryFeeStatus = "AWAITING" | "PAID" | "WAIVED";

type ManagedJob = {
  id: string;
  title: string;
  description: string;
  status: string;
  location: string;
  isRemote: boolean;
  salaryRange: string | null;
  requirements: string | null;
  responsibilities: string | null;
  benefits: string | null;
  tips: string | null;
  openings: number;
  feeType?: string | null;
  feePercentage?: number | null;
  feeFixed?: number | null;
  trialDays?: number | null;
  entryFeeStatus?: string | null;
  entryFeeAmount?: number | null;
  entryFeePaidAt?: Date | null;
  company: { name: string; logoUrl: string | null };
  _count: { applications: number };
  shortlistCount: number;
  hasEffectivePlacement: boolean;
};

function statusLabel(status: string) {
  if (status === "ACTIVE") return "Triagem Ativa";
  if (status === "DRAFT") return "Rascunho";
  return "Encerrada";
}

const ENTRY_FEE_META: Record<EntryFeeStatus, { label: string; bg: string; text: string }> = {
  AWAITING: { label: "Pgto. Pendente", bg: "bg-amber-50 border-amber-200", text: "text-amber-700" },
  PAID:     { label: "Pgto. Recebido", bg: "bg-violet-50 border-violet-200", text: "text-violet-700" },
  WAIVED:   { label: "Taxa Dispensada", bg: "bg-slate-100 border-slate-200", text: "text-slate-500" },
};

type StatusFilter = "ALL" | "ACTIVE" | "CLOSED";

export function ManagedJobsList({ jobs: initial, highlightJobId }: { jobs: ManagedJob[]; highlightJobId?: string }) {
  const router = useRouter();
  const [jobs, setJobs] = useState(initial);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("ALL");
  const [, startTransition] = useTransition();

  useEffect(() => {
    if (highlightJobId) {
      const el = document.getElementById(`job-${highlightJobId}`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [highlightJobId]);

  const filtered = jobs.filter((job) => {
    const matchesSearch =
      !search ||
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "ALL" ||
      (statusFilter === "ACTIVE" && job.status === "ACTIVE") ||
      (statusFilter === "CLOSED" && (job.status === "CLOSED" || job.status === "ARCHIVED"));
    return matchesSearch && matchesStatus;
  });

  function handleDelete(jobId: string) {
    startTransition(async () => {
      const result = await deleteJob(jobId);
      if (result.success) {
        setJobs((prev) => prev.filter((j) => j.id !== jobId));
        toast.success("Vaga excluída com sucesso.");
        router.refresh();
      } else {
        toast.error(result.error || "Erro ao excluir vaga.");
      }
    });
  }

  function handleEntryFeeUpdate(jobId: string, newStatus: EntryFeeStatus, amount?: number) {
    setJobs((prev) =>
      prev.map((j) =>
        j.id === jobId
          ? {
              ...j,
              entryFeeStatus: newStatus,
              ...(amount != null ? { entryFeeAmount: amount } : {}),
              ...(newStatus === "PAID" ? { entryFeePaidAt: new Date() } : {}),
            }
          : j
      )
    );
  }

  if (jobs.length === 0) {
    return (
      <Card className="p-12 border-slate-200 bg-white rounded-2xl shadow-sm text-center">
        <Briefcase className="h-10 w-10 text-slate-200 mx-auto mb-3" />
        <p className="text-slate-400 font-medium">
          Nenhuma vaga de curadoria cadastrada ainda.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Buscar vaga ou empresa..."
            className="pl-10 h-11 bg-white border-slate-200 rounded-xl text-sm w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-1 bg-slate-100 rounded-xl p-1 shrink-0">
          {(["ALL", "ACTIVE", "CLOSED"] as StatusFilter[]).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                statusFilter === s
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {s === "ALL" ? "Todos" : s === "ACTIVE" ? "Triagem Ativa" : "Encerradas"}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="py-8 text-center text-sm text-slate-400 font-medium">
          Nenhuma vaga encontrada para &quot;{search}&quot;.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {filtered.map((job) => {
            const shortlistedCount = job.shortlistCount;
            const showTriagem = job.status === "ACTIVE" || !job.hasEffectivePlacement;
            const entryFeeStatus = (job.entryFeeStatus as EntryFeeStatus) ?? "AWAITING";
            const feeMeta = ENTRY_FEE_META[entryFeeStatus];

            return (
              <Card
                key={job.id}
                id={`job-${job.id}`}
                className={cn(
                  "p-4 sm:p-5 border-slate-200 bg-white rounded-xl shadow-sm hover:border-blue-200 transition-all group",
                  highlightJobId === job.id && "ring-2 ring-violet-400 border-violet-300"
                )}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex items-center gap-3 sm:gap-4 flex-1">
                    <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center font-black text-blue-500 text-base sm:text-lg overflow-hidden shrink-0">
                      {job.company.logoUrl ? (
                        <img
                          src={job.company.logoUrl}
                          alt={job.company.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        job.company.name.charAt(0)
                      )}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                        {job.title}
                      </h4>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-[9px] sm:text-[10px] text-slate-500 font-bold uppercase">
                        <span className="flex items-center gap-1.5">
                          <Building2 className="h-3 w-3" /> {job.company.name}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-3 w-3" />{" "}
                          {job.isRemote ? "Remoto" : job.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 flex-[1.5] py-3 border-y border-slate-100 lg:border-none lg:py-0">
                    <div className="space-y-1">
                      <p className="text-[9px] font-bold uppercase text-slate-400">Status</p>
                      <Badge
                        className={cn(
                          "rounded-md px-1.5 py-0.5 text-[8px] sm:text-[9px] font-bold uppercase",
                          job.status === "CLOSED" || job.status === "ARCHIVED"
                            ? "bg-green-100 text-green-700 border-none"
                            : "bg-blue-50 text-blue-600 border-none"
                        )}
                      >
                        {statusLabel(job.status)}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[9px] font-bold uppercase text-slate-400">Inscritos</p>
                      <div className="flex items-center gap-1.5">
                        <Users2 className="h-3.5 w-3.5 text-slate-400" />
                        <span className="font-black text-xs sm:text-sm text-slate-900">
                          {job._count.applications}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[9px] font-bold uppercase text-slate-400">Indicados</p>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                        <span className="font-black text-xs sm:text-sm text-slate-900">
                          {shortlistedCount} / {job.openings}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[9px] font-bold uppercase text-slate-400">Pagamento</p>
                      <EntryFeeModal
                        jobId={job.id}
                        jobTitle={job.title}
                        companyName={job.company.name}
                        currentStatus={entryFeeStatus}
                        feeType={job.feeType}
                        feeFixed={job.feeFixed}
                        feePercentage={job.feePercentage}
                        onUpdate={handleEntryFeeUpdate}
                      >
                        <button className={cn(
                          "inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md border text-[8px] sm:text-[9px] font-black uppercase tracking-wider transition-all hover:opacity-80 cursor-pointer",
                          feeMeta.bg, feeMeta.text
                        )}>
                          <Wallet className="h-2.5 w-2.5 shrink-0" />
                          {feeMeta.label}
                        </button>
                      </EntryFeeModal>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full lg:w-auto">
                    {showTriagem && (
                      <ScreeningModal
                        jobId={job.id}
                        jobTitle={job.title}
                        companyName={job.company.name}
                      />
                    )}
                    <Link href={`/admin/managed/${job.id}`}>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-lg hover:bg-blue-50 hover:text-blue-600"
                        title="Ver painel da vaga"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </Link>
                    <EditJobModal job={job} />
                    <ConfirmAction
                      title="Excluir Vaga?"
                      description="Esta ação não pode ser desfeita. Todas as candidaturas vinculadas também serão removidas."
                      variant="danger"
                      actionText="Sim, Excluir"
                      onConfirm={() => handleDelete(job.id)}
                    >
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-lg hover:bg-rose-50 hover:text-rose-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </ConfirmAction>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
