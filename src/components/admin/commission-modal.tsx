"use client";

import { useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  DollarSign,
  CheckCircle2,
  FileText,
  AlertTriangle,
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

export function CommissionModal({
  commission,
  candidateName,
  companyName,
  onUpdate,
  children,
}: CommissionModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [invoiceNumber, setInvoiceNumber] = useState(commission.invoiceNumber ?? "");
  const [, startTransition] = useTransition();

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

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger render={children} />
      <DialogContent className="sm:max-w-md bg-white rounded-[2rem] border-none shadow-2xl p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0">
            <DollarSign className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900">Gerenciar Comissão</h3>
            <p className="text-xs text-slate-400 font-medium">
              {candidateName} · {companyName}
            </p>
          </div>
        </div>

        {/* Amount block */}
        <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 mb-6">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">
            Valor da Comissão
          </p>
          <p className="text-3xl font-black text-slate-900">{fmt(commission.amount)}</p>
          <Badge
            className={cn(
              "mt-2 border-none font-bold text-[9px] uppercase",
              commission.status === "PAID"
                ? "bg-emerald-100 text-emerald-700"
                : commission.status === "INVOICED"
                ? "bg-blue-100 text-blue-700"
                : commission.status === "PENDING"
                ? "bg-amber-100 text-amber-700"
                : "bg-slate-100 text-slate-500"
            )}
          >
            {commission.status === "PAID"
              ? "Pago"
              : commission.status === "INVOICED"
              ? "Faturado"
              : commission.status === "PENDING"
              ? "Pendente"
              : "Dispensado"}
          </Badge>
        </div>

        {/* Actions: PENDING */}
        {commission.status === "PENDING" && (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                Nº da Nota Fiscal (opcional)
              </label>
              <Input
                placeholder="Ex: NF-2024-001"
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
                className="h-11 rounded-xl border-slate-200 font-medium"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={handleInvoice}
                className="h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold gap-2"
              >
                <FileText className="h-4 w-4" /> Faturar
              </Button>
              <Button
                onClick={handlePaid}
                className="h-12 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold gap-2"
              >
                <CheckCircle2 className="h-4 w-4" /> Marcar Pago
              </Button>
            </div>
          </div>
        )}

        {/* Actions: INVOICED */}
        {commission.status === "INVOICED" && (
          <div className="space-y-4">
            {commission.invoiceNumber && (
              <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
                <p className="text-[10px] font-black uppercase text-blue-400 mb-0.5">
                  Nota Fiscal
                </p>
                <p className="text-sm font-bold text-blue-800">{commission.invoiceNumber}</p>
              </div>
            )}
            <Button
              onClick={handlePaid}
              className="w-full h-12 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold gap-2"
            >
              <CheckCircle2 className="h-4 w-4" /> Confirmar Recebimento
            </Button>
          </div>
        )}

        {/* PAID - read only */}
        {commission.status === "PAID" && (
          <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-100 text-center">
            <CheckCircle2 className="h-8 w-8 text-emerald-500 mx-auto mb-2" />
            <p className="text-sm font-bold text-emerald-700">Comissão recebida com sucesso</p>
          </div>
        )}

        {/* Waive - only when actionable */}
        {(commission.status === "PENDING" || commission.status === "INVOICED") && (
          <Button
            onClick={handleWaive}
            variant="ghost"
            className="w-full mt-3 h-10 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 font-medium text-xs gap-2"
          >
            <AlertTriangle className="h-3.5 w-3.5" /> Dispensar Comissão
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
}
