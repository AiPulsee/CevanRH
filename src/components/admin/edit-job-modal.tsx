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
import { Pencil, Loader2, Save } from "lucide-react";
import { updateJob } from "@/actions/jobs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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
  const [requirements, setRequirements] = useState(job.requirements ?? "");
  const [responsibilities, setResponsibilities] = useState(job.responsibilities ?? "");
  const [benefits, setBenefits] = useState(job.benefits ?? "");
  const [tips, setTips] = useState(job.tips ?? "");

  function handleSave() {
    startTransition(async () => {
      const result = await updateJob(job.id, {
        title,
        description,
        location,
        isRemote,
        salaryRange: salaryRange || undefined,
        status: status as "ACTIVE" | "CLOSED" | "DRAFT",
        requirements: requirements || undefined,
        responsibilities: responsibilities || undefined,
        benefits: benefits || undefined,
        tips: tips || undefined,
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
            className="h-8 w-8 rounded-lg hover:bg-blue-50 hover:text-blue-600"
          >
            <Pencil className="h-4 w-4" />
          </Button>
        }
      />
      <DialogContent className="sm:max-w-2xl w-[95vw] bg-white rounded-[1.5rem] sm:rounded-[2rem] border-none shadow-2xl p-0 overflow-hidden flex flex-col max-h-[90vh]">
        <div className="bg-slate-900 p-6 sm:p-8 text-white flex-shrink-0">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl font-black text-white">Editar Vaga</DialogTitle>
            <DialogDescription className="text-slate-400 text-xs sm:text-sm font-medium mt-0.5 sm:mt-1">
              Atualize as informações da vaga de curadoria.
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-5">
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
              <select
                className={selectCls}
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="ACTIVE">Triagem Ativa</option>
                <option value="DRAFT">Rascunho</option>
                <option value="CLOSED">Encerrada</option>
              </select>
            </div>

            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
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

        <DialogFooter className="p-6 bg-slate-50 border-t border-slate-100 gap-3 flex-shrink-0">
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
            {isPending ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            {isPending ? "Salvando..." : "Salvar Alterações"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
