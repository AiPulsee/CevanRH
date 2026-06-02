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
import { Textarea } from "@/components/ui/textarea";
import { Pencil, Loader2, Save, Percent, Clock, Receipt } from "lucide-react";
import { updateJob } from "@/actions/jobs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

type Job = {
  id: string;
  title: string;
  description: string;
  location: string;
  isRemote: boolean;
  salaryRange: string | null;
  status: string;
  requirements: string | null;
  responsibilities: string | null;
  benefits: string | null;
  tips: string | null;
  openings: number;
  feeType?: string | null;
  feePercentage?: number | null;
  feeFixed?: number | null;
  trialDays?: number | null;
};

export function EditJobModal({ job }: { job: Job }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  const [title, setTitle] = useState(job.title);
  const [description, setDescription] = useState(job.description);
  const [location, setLocation] = useState(job.location);
  const [isRemote, setIsRemote] = useState(job.isRemote);
  const [salaryRange, setSalaryRange] = useState(job.salaryRange ?? "");
  const [status, setStatus] = useState(job.status);
  const [openings, setOpenings] = useState(job.openings);
  const [requirements, setRequirements] = useState(job.requirements ?? "");
  const [responsibilities, setResponsibilities] = useState(job.responsibilities ?? "");
  const [benefits, setBenefits] = useState(job.benefits ?? "");
  const [tips, setTips] = useState(job.tips ?? "");
  const [feeType, setFeeType] = useState<"percentage" | "fixed">(
    (job.feeType as "percentage" | "fixed") ?? "percentage"
  );
  const [feeValue, setFeeValue] = useState(
    job.feeType === "fixed"
      ? String((job.feeFixed ?? 0) / 100)
      : String(job.feePercentage ?? "")
  );
  const [trialDays, setTrialDays] = useState(String(job.trialDays ?? 90));

  function handleSave() {
    startTransition(async () => {
      const result = await updateJob(job.id, {
        title,
        description,
        location,
        isRemote,
        salaryRange: salaryRange || undefined,
        status: status as "ACTIVE" | "CLOSED" | "DRAFT",
        openings,
        requirements: requirements || undefined,
        responsibilities: responsibilities || undefined,
        benefits: benefits || undefined,
        tips: tips || undefined,
        feeType,
        feePercentage: feeType === "percentage" && feeValue ? parseFloat(feeValue) : null,
        feeFixed: feeType === "fixed" && feeValue ? Math.round(parseFloat(feeValue) * 100) : null,
        trialDays: trialDays ? parseInt(trialDays) : null,
      });

      if (result.success) {
        toast.success("Vaga atualizada com sucesso!");
        setIsOpen(false);
        router.refresh();
      } else {
        toast.error(result.error || "Erro ao atualizar vaga.");
      }
    });
  }

  const selectCls =
    "w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-blue-500/20 outline-none appearance-none";

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-xl hover:bg-blue-50 hover:text-blue-600 text-slate-400"
          >
            <Pencil className="h-4 w-4" />
          </Button>
        }
      />
      <DialogContent className="sm:max-w-2xl w-[calc(100%-1rem)] sm:w-[95vw] bg-white rounded-3xl sm:rounded-[2rem] border-none shadow-2xl p-0 overflow-hidden flex flex-col max-h-[95vh] sm:max-h-[90vh]">
        <div className="bg-slate-900 p-5 sm:p-8 text-white flex-shrink-0">
          <DialogHeader>
            <DialogTitle className="text-xl font-black text-white">Editar Vaga</DialogTitle>
            <DialogDescription className="text-slate-400 text-xs sm:text-sm font-medium mt-1">
              Atualize as informações da vaga de curadoria.
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-5 custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2 md:col-span-2">
              <Label className="font-bold text-slate-700">Título da Vaga</Label>
              <Input
                className="h-12 bg-slate-50 border-slate-200 rounded-xl font-bold"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label className="font-bold text-slate-700">Localização</Label>
              <Input
                className="h-12 bg-slate-50 border-slate-200 rounded-xl"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label className="font-bold text-slate-700">Faixa Salarial</Label>
              <Input
                placeholder="Ex: R$ 10k - 15k"
                className="h-12 bg-slate-50 border-slate-200 rounded-xl"
                value={salaryRange}
                onChange={(e) => setSalaryRange(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label className="font-bold text-slate-700">Status</Label>
              <select className={selectCls} value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="ACTIVE">Triagem Ativa</option>
                <option value="DRAFT">Rascunho</option>
                <option value="CLOSED">Encerrada</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label className="font-bold text-slate-700">Nº de Vagas</Label>
              <Input
                type="number"
                min={1}
                className="h-12 bg-slate-50 border-slate-200 rounded-xl font-bold"
                value={openings}
                onChange={(e) => setOpenings(Math.max(1, parseInt(e.target.value) || 1))}
              />
            </div>

            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100 md:col-span-2">
              <input
                type="checkbox"
                id="editIsRemote"
                className="h-5 w-5 rounded border-slate-300 text-blue-600"
                checked={isRemote}
                onChange={(e) => setIsRemote(e.target.checked)}
              />
              <Label htmlFor="editIsRemote" className="font-bold text-slate-700 cursor-pointer">
                Vaga 100% Remota
              </Label>
            </div>
          </div>

          {/* Configurações Comerciais */}
          <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-5 space-y-4">
            <div className="flex items-center gap-2">
              <Receipt className="h-4 w-4 text-blue-600" />
              <p className="text-sm font-black text-blue-900">Configurações Comerciais</p>
              <span className="text-[10px] font-bold text-blue-400 ml-1">por vaga</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="font-bold text-slate-700 flex items-center gap-1.5">
                  <Percent className="h-3.5 w-3.5 text-slate-400" /> Taxa de Curadoria
                </Label>
                <div className="flex items-center gap-2 bg-white rounded-xl border border-slate-200 p-1">
                  <button
                    type="button"
                    onClick={() => setFeeType("percentage")}
                    className={cn(
                      "flex-1 py-2 rounded-lg text-xs font-bold transition-all",
                      feeType === "percentage" ? "bg-blue-600 text-white shadow-sm" : "text-slate-500 hover:text-slate-700"
                    )}
                  >
                    Percentual
                  </button>
                  <button
                    type="button"
                    onClick={() => setFeeType("fixed")}
                    className={cn(
                      "flex-1 py-2 rounded-lg text-xs font-bold transition-all",
                      feeType === "fixed" ? "bg-blue-600 text-white shadow-sm" : "text-slate-500 hover:text-slate-700"
                    )}
                  >
                    Valor Fixo
                  </button>
                </div>
                <Input
                  type="number"
                  min={0}
                  placeholder={feeType === "percentage" ? "Ex: 50 (%)" : "Ex: 2500 (R$)"}
                  className="h-11 bg-white border-slate-200 rounded-xl font-bold"
                  value={feeValue}
                  onChange={(e) => setFeeValue(e.target.value)}
                />
                <p className="text-[10px] text-slate-400 font-medium">
                  {feeType === "percentage"
                    ? "Percentual do 1º salário mensal do candidato"
                    : "Valor fixo em R$ cobrado na efetivação"}
                </p>
              </div>

              <div className="space-y-2">
                <Label className="font-bold text-slate-700 flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-slate-400" /> Período de Experiência
                </Label>
                <Input
                  type="number"
                  min={1}
                  max={365}
                  className="h-11 bg-white border-slate-200 rounded-xl font-bold"
                  value={trialDays}
                  onChange={(e) => setTrialDays(e.target.value)}
                />
                <p className="text-[10px] text-slate-400 font-medium">
                  Dias de experiência antes da efetivação (padrão: 90 dias)
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="font-bold text-slate-700">Descrição</Label>
            <Textarea
              className="min-h-[90px] bg-slate-50 border-slate-200 rounded-xl font-medium resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label className="font-bold text-slate-700">Requisitos</Label>
              <Textarea
                className="min-h-[100px] bg-slate-50 border-slate-200 rounded-xl text-sm font-medium resize-none"
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label className="font-bold text-slate-700">Responsabilidades</Label>
              <Textarea
                className="min-h-[100px] bg-slate-50 border-slate-200 rounded-xl text-sm font-medium resize-none"
                value={responsibilities}
                onChange={(e) => setResponsibilities(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label className="font-bold text-slate-700">Benefícios</Label>
              <Textarea
                className="min-h-[100px] bg-slate-50 border-slate-200 rounded-xl text-sm font-medium resize-none"
                value={benefits}
                onChange={(e) => setBenefits(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label className="font-bold text-slate-700">Dicas da Cevan</Label>
              <Textarea
                className="min-h-[100px] bg-slate-50 border-slate-200 rounded-xl text-sm font-medium resize-none"
                value={tips}
                onChange={(e) => setTips(e.target.value)}
              />
            </div>
          </div>
        </div>

        <DialogFooter className="p-4 sm:p-6 bg-slate-50 border-t border-slate-100 gap-3 flex-shrink-0">
          <Button
            variant="ghost"
            className="rounded-xl font-bold h-11 px-6"
            onClick={() => setIsOpen(false)}
            disabled={isPending}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            disabled={isPending || !title || !description}
            className="rounded-xl font-black h-11 px-8 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200 uppercase text-xs tracking-widest"
          >
            {isPending ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
            {isPending ? "Salvando..." : "Salvar Alterações"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
