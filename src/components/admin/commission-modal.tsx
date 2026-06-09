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
  DollarSign,
  CheckCircle2,
  FileText,
  AlertTriangle,
  User,
  Building2,
  ArrowRight,
} from "lucide-react";
import {
  markCommissionAsInvoiced,
  markCommissionAsPaid,
  waiveCommission,
} from "@/actions/commissions";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type CommissionStatus = "PENDING" | "INVOICED" | "PAID" | "WAIVED";

type CommissionData = {
  id: string;
  amount: number;
  status: CommissionStatus;
  invoiceNumber: string | null;
};

interface CommissionModalProps {
  commission: CommissionData;
  candidateName: string;
  companyName: string;
  onUpdate: (id: string, newStatus: CommissionStatus, invoiceNumber?: string) => void;
  children: React.ReactElement;
}

function fmt(cents: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(cents / 100);
}

const STATUS_META: Record<
  CommissionStatus,
  { label: string; bg: string; text: string; border: string; dot: string }
> = {
  PENDING:  { label: "Pendente",   bg: "bg-amber-50",   text: "text-amber-700",   border: "border-amber-200",  dot: "bg-amber-400" },
  INVOICED: { label: "Faturado",   bg: "bg-blue-50",    text: "text-blue-700",    border: "border-blue-200",   dot: "bg-blue-400"  },
  PAID:     { label: "Recebido",   bg: "bg-blue-50",    text: "text-blue-700",   border: "border-blue-200",  dot: "bg-blue-500"  },
  WAIVED:   { label: "Dispensado", bg: "bg-slate-50",   text: "text-slate-500",   border: "border-slate-200",  dot: "bg-slate-300" },
};

const FLOW_STEPS: CommissionStatus[] = ["PENDING", "INVOICED", "PAID"];

export function CommissionModal({
  commission,
  candidateName,
  companyName,
  onUpdate,
  children,
}: CommissionModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [invoiceNumber, setInvoiceNumber] = useState(commission.invoiceNumber ?? "");
  const [isPending, startTransition] = useTransition();

  const meta = STATUS_META[commission.status];

  function handleInvoice() {
    startTransition(async () => {
      const res = await markCommissionAsInvoiced(commission.id, invoiceNumber);
      if (res.success) {
        onUpdate(commission.id, "INVOICED", invoiceNumber || undefined);
        toast.success("Comissão marcada como faturada!");
        setIsOpen(false);
      } else {
        toast.error(res.error || "Erro ao faturar comissão.");
      }
    });
  }

  function handlePaid() {
    startTransition(async () => {
      const res = await markCommissionAsPaid(commission.id);
      if (res.success) {
        onUpdate(commission.id, "PAID");
        toast.success("Pagamento confirmado!");
        setIsOpen(false);
      } else {
        toast.error(res.error || "Erro ao confirmar pagamento.");
      }
    });
  }

  function handleWaive() {
    startTransition(async () => {
      const res = await waiveCommission(commission.id);
      if (res.success) {
        onUpdate(commission.id, "WAIVED");
        toast.success("Comissão dispensada.");
        setIsOpen(false);
      } else {
        toast.error(res.error || "Erro ao dispensar comissão.");
      }
    });
  }

  const currentStep = FLOW_STEPS.indexOf(commission.status);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger render={children} />
      <DialogContent className="sm:max-w-md w-[95vw] bg-white rounded-[1.5rem] sm:rounded-[2rem] border-none shadow-2xl p-0 max-h-[95vh] overflow-y-auto">

        {/* Header com gradiente */}
        <div className="relative bg-gradient-to-br from-slate-900 to-slate-700 rounded-t-[1.5rem] sm:rounded-t-[2rem] px-6 pt-6 pb-8">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                <DollarSign className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-base font-black text-white">Gerenciar Comissão</h3>
                <p className="text-[11px] text-white/50 font-medium mt-0.5">Acompanhe e atualize o status do pagamento</p>
              </div>
            </div>
            {/* Status badge no header */}
            <span className={cn(
              "shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border",
              meta.bg, meta.text, meta.border
            )}>
              <span className={cn("h-1.5 w-1.5 rounded-full", meta.dot)} />
              {meta.label}
            </span>
          </div>

          {/* Valor em destaque */}
          <div className="mt-5">
            <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Valor</p>
            <p className="text-4xl font-black text-white tracking-tight">{fmt(commission.amount)}</p>
          </div>

          {/* Infos candidato / empresa */}
          <div className="flex gap-4 mt-4">
            <div className="flex items-center gap-1.5 min-w-0">
              <User className="h-3 w-3 text-white/40 shrink-0" />
              <p className="text-[11px] text-white/60 font-medium truncate">{candidateName}</p>
            </div>
            <div className="flex items-center gap-1.5 min-w-0">
              <Building2 className="h-3 w-3 text-white/40 shrink-0" />
              <p className="text-[11px] text-white/60 font-medium truncate">{companyName}</p>
            </div>
          </div>
        </div>

        {/* Stepper de progresso (só para status não-dispensado) */}
        {commission.status !== "WAIVED" && (
          <div className="px-6 py-4 border-b border-slate-100">
            <div className="flex items-center gap-1">
              {FLOW_STEPS.map((step, i) => {
                const stepMeta = STATUS_META[step];
                const done = currentStep > i;
                const active = currentStep === i;
                return (
                  <div key={step} className="flex items-center gap-1 flex-1 min-w-0">
                    <div className="flex flex-col items-center gap-1">
                      <div className={cn(
                        "h-6 w-6 rounded-full flex items-center justify-center shrink-0 text-[9px] font-black border transition-all",
                        done ? "bg-blue-600 border-blue-600 text-white"
                          : active ? cn(stepMeta.bg, stepMeta.border, stepMeta.text, "border")
                          : "bg-slate-100 border-slate-200 text-slate-400"
                      )}>
                        {done ? <CheckCircle2 className="h-3.5 w-3.5" /> : i + 1}
                      </div>
                      <p className={cn(
                        "text-[8px] font-black uppercase tracking-wider whitespace-nowrap",
                        done ? "text-blue-600" : active ? stepMeta.text : "text-slate-300"
                      )}>
                        {stepMeta.label}
                      </p>
                    </div>
                    {i < FLOW_STEPS.length - 1 && (
                      <div className={cn(
                        "flex-1 h-px mx-1 mb-3",
                        done ? "bg-blue-300" : "bg-slate-100"
                      )} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Corpo das ações */}
        <div className="p-6 space-y-4">

          {/* PENDING */}
          {commission.status === "PENDING" && (
            <>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Nº da Nota Fiscal <span className="normal-case font-medium text-slate-300">(opcional)</span>
                </label>
                <Input
                  placeholder="Ex: NF-2024-001"
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                  className="h-11 rounded-xl border-slate-200 font-medium bg-slate-50 focus:bg-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={handleInvoice}
                  disabled={isPending}
                  className="h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold gap-2 text-xs"
                >
                  <FileText className="h-4 w-4" />
                  Faturar
                  <ArrowRight className="h-3.5 w-3.5 ml-auto" />
                </Button>
                <Button
                  onClick={handlePaid}
                  disabled={isPending}
                  className="h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold gap-2 text-xs"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Marcar Pago
                  <ArrowRight className="h-3.5 w-3.5 ml-auto" />
                </Button>
              </div>
            </>
          )}

          {/* INVOICED */}
          {commission.status === "INVOICED" && (
            <>
              {commission.invoiceNumber && (
                <div className="flex items-center gap-3 p-3.5 bg-blue-50 rounded-xl border border-blue-100">
                  <FileText className="h-4 w-4 text-blue-400 shrink-0" />
                  <div>
                    <p className="text-[9px] font-black uppercase text-blue-400 mb-0.5">Nota Fiscal</p>
                    <p className="text-sm font-bold text-blue-800">{commission.invoiceNumber}</p>
                  </div>
                </div>
              )}
              <Button
                onClick={handlePaid}
                disabled={isPending}
                className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold gap-2"
              >
                <CheckCircle2 className="h-4 w-4" />
                Confirmar Recebimento
                <ArrowRight className="h-3.5 w-3.5 ml-auto" />
              </Button>
            </>
          )}

          {/* PAID */}
          {commission.status === "PAID" && (
            <div className="flex flex-col items-center gap-3 py-4 px-5 bg-blue-50 rounded-2xl border border-blue-100">
              <div className="h-14 w-14 rounded-2xl bg-blue-100 flex items-center justify-center">
                <CheckCircle2 className="h-7 w-7 text-blue-600" />
              </div>
              <div className="text-center">
                <p className="text-sm font-black text-blue-900">Comissão recebida!</p>
                <p className="text-[11px] text-blue-600 font-medium mt-0.5">Pagamento confirmado com sucesso.</p>
              </div>
            </div>
          )}

          {/* WAIVED */}
          {commission.status === "WAIVED" && (
            <div className="flex flex-col items-center gap-3 py-4 px-5 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="h-14 w-14 rounded-2xl bg-slate-100 flex items-center justify-center">
                <AlertTriangle className="h-7 w-7 text-slate-400" />
              </div>
              <div className="text-center">
                <p className="text-sm font-black text-slate-600">Comissão dispensada</p>
                <p className="text-[11px] text-slate-400 font-medium mt-0.5">Esta comissão foi dispensada e não será cobrada.</p>
              </div>
            </div>
          )}
        </div>

        {/* Dispensar — rodapé separado */}
        {(commission.status === "PENDING" || commission.status === "INVOICED") && (
          <div className="px-6 pb-6">
            <div className="h-px bg-slate-100 mb-4" />
            <Button
              onClick={handleWaive}
              disabled={isPending}
              variant="ghost"
              className="w-full h-10 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 font-medium text-xs gap-2"
            >
              <AlertTriangle className="h-3.5 w-3.5" />
              Dispensar Comissão
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
