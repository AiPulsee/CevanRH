"use client";

import { useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Wallet,
  CheckCircle2,
  ArrowRight,
  Ban,
} from "lucide-react";
import { markEntryFeePaid, waiveEntryFee } from "@/actions/jobs";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type EntryFeeStatus = "AWAITING" | "PAID" | "WAIVED";

interface EntryFeeModalProps {
  jobId: string;
  jobTitle: string;
  companyName: string;
  currentStatus: EntryFeeStatus;
  feeType?: string | null;
  feeFixed?: number | null;
  feePercentage?: number | null;
  onUpdate: (jobId: string, newStatus: EntryFeeStatus, amount?: number) => void;
  children: React.ReactElement;
}

function fmt(cents: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(cents / 100);
}

export function EntryFeeModal({
  jobId,
  jobTitle,
  companyName,
  currentStatus,
  feeType,
  feeFixed,
  feePercentage,
  onUpdate,
  children,
}: EntryFeeModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [amountInput, setAmountInput] = useState(
    feeType === "fixed" && feeFixed ? (feeFixed / 100).toFixed(2) : ""
  );
  const [isPending, startTransition] = useTransition();

  const suggestedLabel =
    feeType === "fixed" && feeFixed
      ? fmt(feeFixed)
      : feeType === "percentage" && feePercentage
      ? `${feePercentage}% do primeiro salário`
      : null;

  function handleConfirm() {
    startTransition(async () => {
      const amountCents = amountInput ? Math.round(parseFloat(amountInput.replace(",", ".")) * 100) : undefined;
      const res = await markEntryFeePaid(jobId, amountCents);
      if (res.success) {
        onUpdate(jobId, "PAID", amountCents);
        toast.success("Pagamento de entrada registrado!");
        setIsOpen(false);
      } else {
        toast.error(res.error || "Erro ao registrar pagamento.");
      }
    });
  }

  function handleWaive() {
    startTransition(async () => {
      const res = await waiveEntryFee(jobId);
      if (res.success) {
        onUpdate(jobId, "WAIVED");
        toast.success("Taxa de entrada dispensada.");
        setIsOpen(false);
      } else {
        toast.error(res.error || "Erro ao dispensar taxa.");
      }
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger render={children} />
      <DialogContent className="sm:max-w-md w-[95vw] bg-white rounded-[2rem] border border-slate-100 shadow-2xl p-0 max-h-[95vh] overflow-y-auto">
        
        {/* Top Section - Clean & Airy */}
        <div className="px-6 pt-6 pb-2 relative bg-slate-50/50">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center border border-slate-200 shadow-sm shrink-0">
                <Wallet className="h-5 w-5 text-slate-600" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-800 tracking-tight">Taxa de Entrada</h3>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5">Gestão de pagamento</p>
              </div>
            </div>
            {/* Status badge */}
            <span className={cn(
              "shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border bg-white shadow-sm",
              currentStatus === "PAID" ? "text-emerald-600 border-emerald-200" :
              currentStatus === "AWAITING" ? "text-amber-600 border-amber-200" :
              "text-slate-500 border-slate-200"
            )}>
              <span className={cn(
                "h-1.5 w-1.5 rounded-full",
                currentStatus === "PAID" ? "bg-emerald-500" :
                currentStatus === "AWAITING" ? "bg-amber-500" :
                "bg-slate-400"
              )} />
              {currentStatus === "PAID" ? "RECEBIDO" : currentStatus === "AWAITING" ? "PENDENTE" : "DISPENSADO"}
            </span>
          </div>

          <div className="flex items-center justify-center mt-8 mb-4">
            <div className="inline-flex items-center gap-3 sm:gap-4 px-4 py-2 bg-white rounded-full border border-slate-200 shadow-sm max-w-full">
              <div className="flex items-center gap-1.5 min-w-0">
                <p className="text-[12px] text-slate-600 font-medium truncate max-w-[120px]">{jobTitle}</p>
              </div>
              <div className="h-3 w-px bg-slate-200 shrink-0" />
              <div className="flex items-center gap-1.5 min-w-0">
                <p className="text-[12px] text-slate-600 font-medium truncate max-w-[120px]">{companyName}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Body Area */}
        <div className="p-6 bg-white">
          <div className="space-y-6">
            
            {currentStatus === "PAID" && (
              <div className="flex flex-col items-center gap-3 py-6 px-5 bg-emerald-50 rounded-2xl border border-emerald-100">
                <div className="h-14 w-14 rounded-full bg-white flex items-center justify-center shadow-sm border border-emerald-200">
                  <CheckCircle2 className="h-7 w-7 text-emerald-600" />
                </div>
                <div className="text-center">
                  <p className="text-lg font-black text-emerald-900">Pagamento Recebido!</p>
                  <p className="text-sm text-emerald-600 font-medium mt-1">A taxa de entrada já foi confirmada.</p>
                </div>
              </div>
            )}

            {(currentStatus === "AWAITING" || currentStatus === "WAIVED") && (
              <>
                {suggestedLabel && (
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500 ml-1">
                      Taxa configurada
                    </label>
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center">
                        <Wallet className="h-4 w-4 text-slate-400" />
                      </div>
                      <p className="text-sm font-black text-slate-800">{suggestedLabel}</p>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500 ml-1">
                    Valor recebido <span className="normal-case font-medium text-slate-400">(R$, opcional)</span>
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="Ex: 1500.00"
                    value={amountInput}
                    onChange={(e) => setAmountInput(e.target.value)}
                    className="h-12 rounded-xl border-slate-200 font-medium bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 shadow-sm transition-colors"
                  />
                </div>

                <div className="pt-2">
                  <Button
                    onClick={handleConfirm}
                    disabled={isPending}
                    className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold gap-2 shadow-md shadow-blue-600/20"
                  >
                    <CheckCircle2 className="h-4 w-4 text-blue-200" />
                    Confirmar Recebimento
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Footer actions */}
        {(currentStatus === "AWAITING" || currentStatus === "WAIVED") && (
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-center rounded-b-[2rem]">
            <Button
              onClick={handleWaive}
              disabled={isPending}
              variant="ghost"
              className="h-10 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 font-semibold text-[13px] transition-colors px-6 gap-2"
            >
              <Ban className="h-4 w-4" />
              Dispensar taxa de entrada
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
