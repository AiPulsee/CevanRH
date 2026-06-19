"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { XCircle } from "lucide-react";

const QUICK_REASONS = [
  "Perfil não se encaixou na cultura da empresa",
  "Faltou habilidade técnica para a função",
  "Questão salarial — expectativa acima do oferecido",
  "Candidato desistiu da vaga",
  "Empresa desistiu da contratação",
  "Comportamento inadequado durante o período",
];

interface TerminateModalProps {
  candidateName: string;
  companyName: string;
  onConfirm: (reason: string) => void;
  children: React.ReactElement;
}

export function TerminateModal({
  candidateName,
  companyName,
  onConfirm,
  children,
}: TerminateModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [reason, setReason] = useState("");

  function handleConfirm() {
    onConfirm(reason.trim() || "Não efetivado pela empresa.");
    setIsOpen(false);
    setReason("");
  }

  function handleQuickReason(r: string) {
    setReason(r);
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { setIsOpen(open); if (!open) setReason(""); }}>
      <DialogTrigger render={children} />
      <DialogContent className="sm:max-w-md w-[95vw] bg-white rounded-[1.5rem] border-none shadow-2xl p-0">
        <div className="bg-gradient-to-br from-rose-600 to-rose-500 rounded-t-[1.5rem] px-6 pt-6 pb-7">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center shrink-0">
              <XCircle className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-black text-white">Encerrar Contratação</h3>
              <p className="text-[10px] text-white/60 font-medium">
                {candidateName} · {companyName}
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">
              Motivo do Encerramento
            </p>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {QUICK_REASONS.map((r) => (
                <button
                  key={r}
                  onClick={() => handleQuickReason(r)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-all ${
                    reason === r
                      ? "bg-rose-50 border-rose-300 text-rose-700"
                      : "bg-slate-50 border-slate-200 text-slate-500 hover:border-rose-200 hover:text-rose-600"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
            <Textarea
              placeholder="Ou descreva o motivo livremente..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="rounded-xl border-slate-200 bg-slate-50 focus:bg-white text-sm font-medium resize-none"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="h-11 rounded-xl border-slate-200 font-bold text-slate-600"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleConfirm}
              className="h-11 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs uppercase tracking-widest"
            >
              Encerrar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
