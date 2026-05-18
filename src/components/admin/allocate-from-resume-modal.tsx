"use client";

import { useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus, Loader2, Building2, Briefcase } from "lucide-react";
import { adminAllocateCandidate } from "@/actions/placements";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Job = {
  id: string;
  title: string;
  openings: number;
  company: { name: string; logoUrl: string | null };
};

interface AllocateFromResumeModalProps {
  candidateId: string;
  candidateName: string;
  jobs: Job[];
}

export function AllocateFromResumeModal({
  candidateId,
  candidateName,
  jobs,
}: AllocateFromResumeModalProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [jobId, setJobId] = useState("");
  const [salary, setSalary] = useState("");
  const [startDate, setStartDate] = useState(
    () => new Date().toISOString().split("T")[0]
  );

  function handleSubmit() {
    if (!jobId || !salary || !startDate) return;
    const salaryInCents = Math.round(parseFloat(salary.replace(",", ".")) * 100);
    if (isNaN(salaryInCents) || salaryInCents <= 0) {
      toast.error("Informe um salário válido.");
      return;
    }
    startTransition(async () => {
      const result = await adminAllocateCandidate({
        candidateId,
        jobId,
        monthlySalary: salaryInCents,
        startDate,
      });
      if (result.success) {
        toast.success("Candidato alocado! Alocação criada com sucesso.");
        setIsOpen(false);
        setJobId("");
        setSalary("");
        router.refresh();
      } else {
        toast.error(result.error || "Erro ao alocar candidato.");
      }
    });
  }

  const selectCls =
    "w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-blue-500/20 outline-none appearance-none";

  const selectedJob = jobs.find((j) => j.id === jobId);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        render={
          <Button
            size="icon"
            variant="secondary"
            className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-200/60"
            title="Alocar em vaga de curadoria"
          >
            <UserPlus className="h-4 w-4" />
          </Button>
        }
      />
      <DialogContent className="sm:max-w-md w-[calc(100%-1rem)] bg-white rounded-3xl border-none shadow-2xl p-0 overflow-hidden">
        <div className="bg-slate-900 p-6 sm:p-8 text-white">
          <DialogHeader>
            <DialogTitle className="text-lg font-black text-white">
              Alocar em Vaga de Curadoria
            </DialogTitle>
            <DialogDescription className="text-slate-400 text-xs sm:text-sm font-medium mt-1">
              Enviando{" "}
              <span className="text-white font-bold">{candidateName}</span>{" "}
              diretamente para uma vaga ativa.
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-6 sm:p-8 space-y-5">
          <div className="space-y-2">
            <Label className="font-bold text-slate-700">Vaga de Curadoria</Label>
            {jobs.length === 0 ? (
              <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
                <Briefcase className="h-5 w-5 text-slate-300 shrink-0" />
                <p className="text-sm text-slate-400 font-medium">
                  Nenhuma vaga ativa no momento.
                </p>
              </div>
            ) : (
              <select
                className={selectCls}
                value={jobId}
                onChange={(e) => setJobId(e.target.value)}
              >
                <option value="">Selecione a vaga...</option>
                {jobs.map((job) => (
                  <option key={job.id} value={job.id}>
                    {job.title} — {job.company.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          {selectedJob && (
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl border border-blue-100">
              <div className="h-9 w-9 rounded-xl bg-white border border-blue-100 flex items-center justify-center font-black text-blue-500 text-sm overflow-hidden shrink-0">
                {selectedJob.company.logoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={selectedJob.company.logoUrl}
                    alt={selectedJob.company.name}
                    className="h-full w-full object-contain p-1"
                  />
                ) : (
                  <Building2 className="h-4 w-4" />
                )}
              </div>
              <div>
                <p className="text-xs font-black text-blue-900">{selectedJob.title}</p>
                <p className="text-[10px] font-bold text-blue-500 uppercase tracking-wide">
                  {selectedJob.company.name} · {selectedJob.openings} vaga{selectedJob.openings !== 1 ? "s" : ""}
                </p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="font-bold text-slate-700">Salário Mensal (R$)</Label>
              <Input
                type="number"
                min={1}
                placeholder="Ex: 5000"
                className="h-12 bg-slate-50 border-slate-200 rounded-xl font-bold"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label className="font-bold text-slate-700">Início</Label>
              <Input
                type="date"
                className="h-12 bg-slate-50 border-slate-200 rounded-xl font-bold"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
          </div>
        </div>

        <DialogFooter className="p-4 sm:p-6 bg-slate-50 border-t border-slate-100 gap-3">
          <Button
            variant="ghost"
            className="rounded-xl font-bold h-11 px-6"
            onClick={() => setIsOpen(false)}
            disabled={isPending}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isPending || !jobId || !salary || jobs.length === 0}
            className="rounded-xl font-black h-11 px-8 bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-200 uppercase text-xs tracking-widest"
          >
            {isPending ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <UserPlus className="h-4 w-4 mr-2" />
            )}
            {isPending ? "Alocando..." : "Alocar Candidato"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
