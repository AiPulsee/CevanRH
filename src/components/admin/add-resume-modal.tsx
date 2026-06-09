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
import { FilePlus, Loader2 } from "lucide-react";
import { ResumeUpload } from "@/components/forms/resume-upload";
import { createManualResume } from "@/actions/applications";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function AddResumeModal() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");

  function handleClose() {
    setIsOpen(false);
    setName("");
    setEmail("");
    setResumeUrl("");
  }

  function handleSubmit() {
    if (!name || !resumeUrl) return;
    startTransition(async () => {
      const result = await createManualResume({ name, email, resumeUrl });
      if (result.success) {
        toast.success("Currículo cadastrado com sucesso!");
        handleClose();
        router.refresh();
      } else {
        toast.error(result.error || "Erro ao cadastrar currículo.");
      }
    });
  }

  const canSubmit = name.trim().length >= 2 && (!email || email.includes("@")) && !!resumeUrl;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) handleClose(); else setIsOpen(true); }}>
      <DialogTrigger
        render={
          <Button className="h-11 px-5 rounded-xl font-black text-xs bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200 uppercase tracking-widest gap-2">
            <FilePlus className="h-4 w-4" />
            Adicionar Currículo
          </Button>
        }
      />
      <DialogContent className="sm:max-w-md w-[calc(100%-1rem)] bg-white rounded-3xl border-none shadow-2xl p-0 overflow-hidden">
        <div className="bg-slate-900 p-6 sm:p-8 text-white">
          <DialogHeader>
            <DialogTitle className="text-lg font-black text-white">
              Adicionar Currículo
            </DialogTitle>
            <DialogDescription className="text-slate-400 text-xs sm:text-sm font-medium mt-1">
              Cadastre um candidato manualmente, sem vínculo com uma vaga específica.
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-6 sm:p-8 space-y-5">
          <div className="space-y-2">
            <Label className="font-bold text-slate-700">Nome completo</Label>
            <Input
              placeholder="Ex: João Silva"
              className="h-12 bg-slate-50 border-slate-200 rounded-xl font-bold"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isPending}
            />
          </div>

          <div className="space-y-2">
            <Label className="font-bold text-slate-700">
              E-mail <span className="text-slate-400 font-medium text-xs">(opcional)</span>
            </Label>
            <Input
              type="email"
              placeholder="Ex: joao@email.com"
              className="h-12 bg-slate-50 border-slate-200 rounded-xl font-bold"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isPending}
            />
          </div>

          <div className="space-y-2">
            <Label className="font-bold text-slate-700">Currículo</Label>
            <ResumeUpload onUploadComplete={setResumeUrl} />
          </div>
        </div>

        <DialogFooter className="p-4 sm:p-6 bg-slate-50 border-t border-slate-100 gap-3">
          <Button
            variant="ghost"
            className="rounded-xl font-bold h-11 px-6"
            onClick={handleClose}
            disabled={isPending}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isPending || !canSubmit}
            className="rounded-xl font-black h-11 px-8 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200 uppercase text-xs tracking-widest"
          >
            {isPending ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <FilePlus className="h-4 w-4 mr-2" />
            )}
            {isPending ? "Cadastrando..." : "Cadastrar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
