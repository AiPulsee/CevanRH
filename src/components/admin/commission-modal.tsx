"use client";

import { useState, useTransition, useRef } from "react";
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
  Paperclip,
  X,
  ExternalLink,
  Loader2,
} from "lucide-react";
import {
  markCommissionAsInvoiced,
  markCommissionAsPaid,
  waiveCommission,
} from "@/actions/commissions";
import { getInvoicePresignedUrl } from "@/actions/upload";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type CommissionStatus = "PENDING" | "INVOICED" | "PAID" | "WAIVED";

type CommissionData = {
  id: string;
  amount: number;
  status: CommissionStatus;
  invoiceNumber: string | null;
  invoiceUrl?: string | null;
};

interface CommissionModalProps {
  commission: CommissionData;
  candidateName: string;
  companyName: string;
  onUpdate: (id: string, newStatus: CommissionStatus, invoiceNumber?: string, invoiceUrl?: string) => void;
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
  PAID:     { label: "Recebido",   bg: "bg-blue-50",    text: "text-blue-700",    border: "border-blue-200",   dot: "bg-blue-500"  },
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
  const [invoiceFile, setInvoiceFile] = useState<File | null>(null);
  const [invoiceUrl, setInvoiceUrl] = useState<string | null>(commission.invoiceUrl ?? null);
  const [isUploading, setIsUploading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const meta = STATUS_META[commission.status];
  const isWorking = isPending || isUploading;

  async function uploadFile(file: File): Promise<string> {
    setIsUploading(true);
    try {
      const { uploadUrl, fileUrl } = await getInvoicePresignedUrl(file.name, file.type, file.size);
      const res = await fetch(uploadUrl, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type },
      });
      if (!res.ok) throw new Error("Falha no upload.");
      return fileUrl;
    } finally {
      setIsUploading(false);
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Arquivo muito grande. Máximo 10 MB.");
      return;
    }
    if (file.type !== "application/pdf") {
      toast.error("Apenas arquivos PDF são aceitos.");
      return;
    }
    setInvoiceFile(file);
    setInvoiceUrl(null);
  }

  function removeFile() {
    setInvoiceFile(null);
    setInvoiceUrl(commission.invoiceUrl ?? null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function handleInvoice() {
    startTransition(async () => {
      try {
        let uploadedUrl = invoiceUrl;
        if (invoiceFile) {
          uploadedUrl = await uploadFile(invoiceFile);
        }
        const res = await markCommissionAsInvoiced(
          commission.id,
          invoiceNumber,
          uploadedUrl ?? undefined
        );
        if (res.success) {
          onUpdate(commission.id, "INVOICED", invoiceNumber || undefined, uploadedUrl ?? undefined);
          toast.success("Comissão marcada como faturada!");
          setIsOpen(false);
        } else {
          toast.error(res.error || "Erro ao faturar comissão.");
        }
      } catch {
        toast.error("Erro ao fazer upload da nota fiscal.");
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
      <DialogContent className="sm:max-w-md w-[95vw] bg-white rounded-[2rem] border border-slate-100 shadow-2xl p-0 max-h-[95vh] overflow-y-auto">

        {/* Top Section - Clean & Airy */}
        <div className="px-6 pt-6 pb-2 relative bg-slate-50/50">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center border border-slate-200 shadow-sm shrink-0">
                <DollarSign className="h-5 w-5 text-slate-600" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-800 tracking-tight">Gerenciar Comissão</h3>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5">Detalhes do pagamento</p>
              </div>
            </div>
            <span className={cn(
              "shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border bg-white shadow-sm",
              meta.text, meta.border
            )}>
              <span className={cn("h-1.5 w-1.5 rounded-full", meta.dot)} />
              {meta.label}
            </span>
          </div>

          {/* Valor da Comissão - Huge & Free */}
          <div className="mt-8 flex flex-col items-center justify-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400 mb-1.5">Valor da Comissão</p>
            <p className="text-5xl font-black text-slate-900 tracking-tighter">{fmt(commission.amount)}</p>
          </div>

          {/* Info Candidato & Empresa - Pill */}
          <div className="flex items-center justify-center mt-6 mb-4">
            <div className="inline-flex items-center gap-3 sm:gap-4 px-4 py-2 bg-white rounded-full border border-slate-200 shadow-sm max-w-full">
              <div className="flex items-center gap-1.5 min-w-0">
                <User className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                <p className="text-[12px] text-slate-600 font-medium truncate max-w-[120px]">{candidateName}</p>
              </div>
              <div className="h-3 w-px bg-slate-200 shrink-0" />
              <div className="flex items-center gap-1.5 min-w-0">
                <Building2 className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                <p className="text-[12px] text-slate-600 font-medium truncate max-w-[120px]">{companyName}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Perfect Stepper */}
        {commission.status !== "WAIVED" && (
          <div className="px-8 py-6 border-b border-slate-100 bg-white">
            <div className="relative flex items-start justify-between max-w-[280px] mx-auto pt-2">
              <div className="absolute top-6 left-0 w-full h-0.5 bg-slate-100 -z-10 -translate-y-1/2" />
              <div 
                className="absolute top-6 left-0 h-0.5 bg-blue-600 -z-10 -translate-y-1/2 transition-all duration-500 ease-in-out" 
                style={{ width: currentStep === 0 ? '0%' : currentStep === 1 ? '50%' : '100%' }} 
              />
              
              {FLOW_STEPS.map((step, i) => {
                const stepMeta = STATUS_META[step];
                const done = currentStep > i;
                const active = currentStep === i;
                return (
                  <div key={step} className="flex flex-col items-center gap-2.5 w-16">
                    <div className={cn(
                      "h-8 w-8 rounded-full flex items-center justify-center text-[12px] font-bold transition-all",
                      done ? "bg-blue-600 text-white shadow-md shadow-blue-600/20 border-2 border-blue-600"
                        : active ? "bg-white border-[3px] border-blue-600 text-blue-600 shadow-sm"
                        : "bg-white border-2 border-slate-200 text-slate-300"
                    )}>
                      {done ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
                    </div>
                    <p className={cn(
                      "text-[9px] font-bold uppercase tracking-widest text-center leading-tight",
                      done ? "text-slate-700" : active ? "text-blue-600" : "text-slate-400"
                    )}>
                      {stepMeta.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Body Area */}
        <div className="p-6 bg-white">
          <div className="space-y-6">

            {/* PENDING */}
            {commission.status === "PENDING" && (
              <>
                <div className="space-y-2">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500 ml-1">
                    Nº da Nota Fiscal <span className="normal-case font-medium text-slate-400">(opcional)</span>
                  </label>
                  <Input
                    placeholder="Ex: NF-2024-001"
                    value={invoiceNumber}
                    onChange={(e) => setInvoiceNumber(e.target.value)}
                    className="h-12 rounded-xl border-slate-200 font-medium bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 shadow-sm transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500 ml-1">
                    Anexar Nota Fiscal <span className="normal-case font-medium text-slate-400">(PDF, até 10 MB)</span>
                  </label>

                  {invoiceFile ? (
                    <div className="flex items-center gap-3 p-3.5 bg-blue-50 rounded-xl border border-blue-100">
                      <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center border border-blue-100 shadow-sm shrink-0">
                        <FileText className="h-4 w-4 text-blue-500" />
                      </div>
                      <span className="text-[13px] font-bold text-blue-800 truncate flex-1">{invoiceFile.name}</span>
                      <button
                        onClick={removeFile}
                        className="h-7 w-7 rounded-full bg-blue-200 hover:bg-blue-300 flex items-center justify-center transition-colors shrink-0"
                      >
                        <X className="h-3.5 w-3.5 text-blue-700" />
                      </button>
                    </div>
                  ) : invoiceUrl ? (
                    <div className="flex items-center gap-3 p-3.5 bg-emerald-50 rounded-xl border border-emerald-100">
                      <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center border border-emerald-100 shadow-sm shrink-0">
                        <FileText className="h-4 w-4 text-emerald-500" />
                      </div>
                      <span className="text-[13px] font-bold text-emerald-800 truncate flex-1">Nota fiscal anexada</span>
                      <a
                        href={invoiceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-7 w-7 rounded-full bg-emerald-200 hover:bg-emerald-300 flex items-center justify-center transition-colors shrink-0"
                      >
                        <ExternalLink className="h-3.5 w-3.5 text-emerald-700" />
                      </a>
                      <button
                        onClick={removeFile}
                        className="h-7 w-7 rounded-full bg-emerald-200 hover:bg-emerald-300 flex items-center justify-center transition-colors shrink-0"
                      >
                        <X className="h-3.5 w-3.5 text-emerald-700" />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full h-14 rounded-xl border-2 border-dashed border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 bg-slate-50 transition-all flex items-center justify-center gap-2 text-[13px] font-bold text-slate-500 hover:text-blue-600"
                    >
                      <Paperclip className="h-4 w-4" />
                      Selecionar arquivo PDF
                    </button>
                  )}

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="application/pdf"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <Button
                    onClick={handleInvoice}
                    disabled={isWorking}
                    className="h-12 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold gap-2 shadow-sm"
                  >
                    {isWorking ? <Loader2 className="h-4 w-4 animate-spin text-slate-400" /> : <FileText className="h-4 w-4 text-slate-400" />}
                    Faturar
                  </Button>
                  <Button
                    onClick={handlePaid}
                    disabled={isWorking}
                    className="h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold gap-2 shadow-md shadow-blue-600/20"
                  >
                    <CheckCircle2 className="h-4 w-4 text-blue-200" />
                    Marcar Pago
                  </Button>
                </div>
              </>
            )}

            {/* INVOICED */}
            {commission.status === "INVOICED" && (
              <>
                <div className="space-y-3">
                  {commission.invoiceNumber && (
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center border border-slate-200 shadow-sm shrink-0">
                          <FileText className="h-5 w-5 text-slate-500" />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Nota Fiscal Emitida</p>
                          <p className="text-[13px] font-black text-slate-800">{commission.invoiceNumber}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  {commission.invoiceUrl && (
                    <a
                      href={commission.invoiceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 bg-blue-50/50 rounded-xl border border-blue-100 hover:bg-blue-50 transition-colors group"
                    >
                      <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center border border-blue-100 shadow-sm shrink-0">
                        <FileText className="h-5 w-5 text-blue-500" />
                      </div>
                      <span className="text-[13px] font-bold text-blue-900 flex-1">Visualizar nota fiscal anexada</span>
                      <ExternalLink className="h-4 w-4 text-blue-400 group-hover:text-blue-600" />
                    </a>
                  )}
                </div>
                <div className="pt-2">
                  <Button
                    onClick={handlePaid}
                    disabled={isWorking}
                    className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold gap-2 shadow-md shadow-blue-600/20"
                  >
                    <CheckCircle2 className="h-5 w-5 text-blue-200" />
                    Confirmar Recebimento
                  </Button>
                </div>
              </>
            )}

            {/* PAID */}
            {commission.status === "PAID" && (
              <div className="space-y-4">
                <div className="flex flex-col items-center gap-3 py-6 px-5 bg-emerald-50 rounded-2xl border border-emerald-100">
                  <div className="h-14 w-14 rounded-full bg-white flex items-center justify-center shadow-sm border border-emerald-200">
                    <CheckCircle2 className="h-7 w-7 text-emerald-600" />
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-black text-emerald-900">Comissão Recebida!</p>
                    <p className="text-sm text-emerald-600 font-medium mt-1">O pagamento foi confirmado com sucesso.</p>
                  </div>
                </div>
                {commission.invoiceUrl && (
                  <a
                    href={commission.invoiceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100 hover:bg-slate-100 transition-colors group"
                  >
                    <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center border border-slate-200 shadow-sm shrink-0">
                      <FileText className="h-5 w-5 text-slate-500" />
                    </div>
                    <span className="text-[13px] font-bold text-slate-700 flex-1">Visualizar nota fiscal</span>
                    <ExternalLink className="h-4 w-4 text-slate-400 group-hover:text-slate-600" />
                  </a>
                )}
              </div>
            )}

            {/* WAIVED */}
            {commission.status === "WAIVED" && (
              <div className="flex flex-col items-center gap-3 py-6 px-5 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="h-14 w-14 rounded-full bg-white flex items-center justify-center shadow-sm border border-slate-200">
                  <AlertTriangle className="h-7 w-7 text-slate-400" />
                </div>
                <div className="text-center">
                  <p className="text-lg font-black text-slate-700">Comissão Cancelada</p>
                  <p className="text-sm text-slate-500 font-medium mt-1">Esta comissão foi dispensada e não será cobrada.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer actions */}
        {(commission.status === "PENDING" || commission.status === "INVOICED") && (
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-center rounded-b-[2rem]">
            <Button
              onClick={handleWaive}
              disabled={isWorking}
              variant="ghost"
              className="h-10 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 font-semibold text-[13px] transition-colors px-6 gap-2"
            >
              <AlertTriangle className="h-4 w-4" />
              Cancelar Comissão
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
