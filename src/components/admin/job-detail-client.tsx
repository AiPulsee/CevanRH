"use client";

import { useState, useTransition } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ConfirmAction } from "@/components/ui/confirm-action";
import { CommissionModal } from "@/components/admin/commission-modal";
import { TerminateModal } from "@/components/admin/terminate-modal";
import { EntryFeeModal } from "@/components/admin/entry-fee-modal";
import { confirmEffective, terminatePlacement } from "@/actions/placements";
import { format, differenceInDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  MapPin,
  Briefcase,
  Clock,
  CheckCircle2,
  XCircle,
  DollarSign,
  Users2,
  RefreshCw,
  Wallet,
  AlertTriangle,
  Ban,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

type EntryFeeStatus = "AWAITING" | "PAID" | "WAIVED";
type CommissionStatus = "PENDING" | "INVOICED" | "PAID" | "WAIVED";
type PlacementStatus = "TRIAL" | "EFFECTIVE" | "TERMINATED" | "CANCELLED";

type PlacementRow = {
  id: string;
  round: number;
  status: PlacementStatus;
  monthlySalary: number;
  startDate: Date;
  trialEndDate: Date;
  effectiveDate: Date | null;
  terminationDate: Date | null;
  terminationReason: string | null;
  candidate: { name: string; email: string };
  commission: {
    id: string;
    amount: number;
    status: CommissionStatus;
    invoiceNumber: string | null;
    invoiceUrl: string | null;
  } | null;
};

type JobData = {
  id: string;
  title: string;
  status: string;
  location: string;
  isRemote: boolean;
  salaryRange: string | null;
  requirements: string | null;
  openings: number;
  feeType: string | null;
  feeFixed: number | null;
  feePercentage: number | null;
  trialDays: number | null;
  entryFeeStatus: EntryFeeStatus;
  entryFeeAmount: number | null;
  company: { name: string; logoUrl: string | null };
  totalApplicants: number;
  shortlistedCount: number;
  placements: PlacementRow[];
};

function fmtBRL(cents: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(cents / 100);
}

function fmtDate(d: Date | null | undefined) {
  if (!d) return "—";
  return format(new Date(d), "dd/MM/yyyy", { locale: ptBR });
}

const PLACEMENT_CFG: Record<
  PlacementStatus,
  { label: string; icon: typeof Clock; ring: string; dot: string; badge: string }
> = {
  TRIAL: {
    label: "Em Andamento",
    icon: Clock,
    ring: "border-amber-300 bg-amber-500",
    dot: "bg-amber-400",
    badge: "bg-amber-50 text-amber-700 border-amber-200",
  },
  EFFECTIVE: {
    label: "Efetivado",
    icon: CheckCircle2,
    ring: "border-emerald-300 bg-emerald-500",
    dot: "bg-emerald-400",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  TERMINATED: {
    label: "Encerrado",
    icon: XCircle,
    ring: "border-rose-300 bg-rose-400",
    dot: "bg-rose-400",
    badge: "bg-rose-50 text-rose-700 border-rose-200",
  },
  CANCELLED: {
    label: "Cancelado",
    icon: Ban,
    ring: "border-slate-300 bg-slate-300",
    dot: "bg-slate-300",
    badge: "bg-slate-50 text-slate-500 border-slate-200",
  },
};

const ENTRY_FEE_CFG: Record<EntryFeeStatus, { label: string; bg: string; text: string }> = {
  AWAITING: { label: "Taxa Pendente", bg: "bg-amber-50 border-amber-200", text: "text-amber-700" },
  PAID:     { label: "Taxa Recebida", bg: "bg-violet-50 border-violet-200", text: "text-violet-700" },
  WAIVED:   { label: "Taxa Dispensada", bg: "bg-slate-100 border-slate-200", text: "text-slate-500" },
};

export function JobDetailClient({ job: initial }: { job: JobData }) {
  const [placements, setPlacements] = useState(initial.placements);
  const [entryFeeStatus, setEntryFeeStatus] = useState(initial.entryFeeStatus);
  const [entryFeeAmount, setEntryFeeAmount] = useState(initial.entryFeeAmount);
  const [, startTransition] = useTransition();

  const effectiveCount = placements.filter((p) => p.status === "EFFECTIVE").length;
  const hasActiveTrial = placements.some((p) => p.status === "TRIAL");
  const isFilled = effectiveCount >= initial.openings;

  const feeCfg = ENTRY_FEE_CFG[entryFeeStatus];

  function handleEffective(id: string) {
    startTransition(async () => {
      const r = await confirmEffective(id);
      if (r.success) {
        setPlacements((prev) =>
          prev.map((p) => (p.id === id ? { ...p, status: "EFFECTIVE" as PlacementStatus } : p))
        );
        toast.success("Candidato efetivado!");
      } else {
        toast.error((r as any).error || "Erro ao efetivar.");
      }
    });
  }

  function handleTerminate(id: string, reason: string) {
    startTransition(async () => {
      const r = await terminatePlacement(id, reason);
      if (r.success) {
        setPlacements((prev) =>
          prev.map((p) => (p.id === id ? { ...p, status: "TERMINATED" as PlacementStatus } : p))
        );
        toast.success("Contratação encerrada.");
      } else {
        toast.error((r as any).error || "Erro ao encerrar.");
      }
    });
  }

  function handleCommissionUpdate(
    commissionId: string,
    newStatus: CommissionStatus,
    invoiceNumber?: string,
    invoiceUrl?: string
  ) {
    setPlacements((prev) =>
      prev.map((p) => {
        if (p.commission?.id === commissionId) {
          return {
            ...p,
            commission: {
              ...p.commission!,
              status: newStatus,
              invoiceNumber: invoiceNumber ?? p.commission!.invoiceNumber,
              invoiceUrl: invoiceUrl ?? p.commission!.invoiceUrl,
            },
          };
        }
        return p;
      })
    );
  }

  function handleEntryFeeUpdate(_: string, newStatus: EntryFeeStatus, amount?: number) {
    setEntryFeeStatus(newStatus);
    if (amount != null) setEntryFeeAmount(amount);
  }

  const statusLabel =
    isFilled
      ? "Posição Preenchida"
      : initial.status === "ACTIVE"
      ? "Triagem Ativa"
      : initial.status === "CLOSED"
      ? "Fechada"
      : initial.status;

  const statusColor =
    isFilled ? "bg-emerald-100 text-emerald-700" :
    initial.status === "ACTIVE" ? "bg-blue-100 text-blue-700" :
    "bg-slate-100 text-slate-500";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center font-black text-blue-500 text-xl overflow-hidden shrink-0">
            {initial.company.logoUrl ? (
              <img src={initial.company.logoUrl} alt={initial.company.name} className="h-full w-full object-cover" />
            ) : (
              initial.company.name.charAt(0)
            )}
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-900 leading-tight">{initial.title}</h1>
            <p className="text-sm font-bold text-slate-500 mt-0.5">{initial.company.name}</p>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <Badge className={cn("rounded-lg px-2 py-0.5 text-[9px] font-bold uppercase border-none", statusColor)}>
                {statusLabel}
              </Badge>
              <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {initial.isRemote ? "Remoto" : initial.location}
              </span>
              {initial.openings > 1 && (
                <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                  <Briefcase className="h-3 w-3" />
                  {effectiveCount}/{initial.openings} vagas preenchidas
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Entry Fee Badge */}
        <div className="shrink-0">
          <EntryFeeModal
            jobId={initial.id}
            jobTitle={initial.title}
            companyName={initial.company.name}
            currentStatus={entryFeeStatus}
            feeType={initial.feeType}
            feeFixed={initial.feeFixed}
            feePercentage={initial.feePercentage}
            onUpdate={handleEntryFeeUpdate}
          >
            <button className={cn(
              "inline-flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all hover:opacity-80 cursor-pointer",
              feeCfg.bg, feeCfg.text
            )}>
              <Wallet className="h-3.5 w-3.5 shrink-0" />
              {feeCfg.label}
              {entryFeeAmount ? ` · ${fmtBRL(entryFeeAmount)}` : ""}
            </button>
          </EntryFeeModal>
        </div>
      </div>

      {/* Entry fee warning */}
      {entryFeeStatus === "AWAITING" && placements.length === 0 && (
        <Card className="p-4 border-amber-200 bg-amber-50 rounded-xl flex items-center gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0" />
          <p className="text-xs font-bold text-amber-800">
            Taxa de entrada pendente. O envio de candidatos está bloqueado até o recebimento ou dispensa da taxa.
          </p>
        </Card>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Inscritos", value: initial.totalApplicants, icon: Users2, color: "text-blue-600" },
          { label: "Selecionados", value: initial.shortlistedCount, icon: CheckCircle2, color: "text-emerald-600" },
          { label: "Rodadas", value: placements.length, icon: RefreshCw, color: "text-violet-600" },
          {
            label: "Efetivados",
            value: `${effectiveCount}/${initial.openings}`,
            icon: TrendingUp,
            color: isFilled ? "text-emerald-600" : "text-slate-500",
          },
        ].map((s) => (
          <Card key={s.label} className="p-4 border-slate-200 bg-white rounded-xl shadow-sm">
            <s.icon className={cn("h-4 w-4 mb-2", s.color)} />
            <p className="text-[9px] font-bold uppercase text-slate-400 tracking-widest">{s.label}</p>
            <p className="text-xl font-black text-slate-900">{s.value}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Timeline — 3/5 */}
        <div className="lg:col-span-3 space-y-4">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            Histórico de Candidatos
          </p>

          {placements.length === 0 ? (
            <Card className="p-10 border-slate-200 bg-white rounded-2xl shadow-sm text-center">
              <Users2 className="h-8 w-8 text-slate-200 mx-auto mb-3" />
              <p className="text-sm font-medium text-slate-400">
                Nenhum candidato enviado ainda.
              </p>
              {entryFeeStatus === "AWAITING" && (
                <p className="text-xs text-amber-600 font-bold mt-2">
                  Registre a taxa de entrada para liberar o envio.
                </p>
              )}
            </Card>
          ) : (
            <div className="relative space-y-0">
              {placements.map((p, i) => {
                const cfg = PLACEMENT_CFG[p.status];
                const Icon = cfg.icon;
                const isLast = i === placements.length - 1;
                const daysRemaining =
                  p.status === "TRIAL"
                    ? differenceInDays(new Date(p.trialEndDate), new Date())
                    : null;
                const isExpired = daysRemaining !== null && daysRemaining < 0;

                return (
                  <div key={p.id} className="flex gap-4">
                    {/* Timeline line */}
                    <div className="flex flex-col items-center shrink-0 pt-1">
                      <div className={cn(
                        "h-8 w-8 rounded-full border-2 flex items-center justify-center font-black text-xs text-white z-10 shrink-0",
                        cfg.ring
                      )}>
                        {p.round}
                      </div>
                      {!isLast && <div className="w-px flex-1 bg-slate-200 my-1.5 min-h-[32px]" />}
                    </div>

                    {/* Card */}
                    <div className={cn("flex-1 pb-6", isLast && "pb-1")}>
                      <Card className={cn(
                        "p-4 border-slate-200 bg-white rounded-xl shadow-sm",
                        p.status === "TRIAL" && isExpired && "border-rose-200 bg-rose-50/30"
                      )}>
                        {/* Top row */}
                        <div className="flex items-start justify-between gap-3 flex-wrap">
                          <div>
                            <p className="font-bold text-sm text-slate-900">{p.candidate.name}</p>
                            <p className="text-[11px] text-slate-400 font-medium">{p.candidate.email}</p>
                          </div>
                          <div className="flex items-center gap-2 flex-wrap">
                            {p.status === "TRIAL" && isExpired && (
                              <span className="flex items-center gap-1 text-[9px] font-black uppercase text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full border border-rose-200">
                                <span className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-pulse" />
                                Expirado {Math.abs(daysRemaining!)}d atrás
                              </span>
                            )}
                            <Badge className={cn("border font-bold text-[8px] uppercase tracking-wider rounded-lg px-2 py-0.5", cfg.badge)}>
                              <Icon className="h-2.5 w-2.5 mr-1" />
                              {cfg.label}
                            </Badge>
                          </div>
                        </div>

                        {/* Dates */}
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-slate-400 font-medium mt-3">
                          <span>Início: {fmtDate(p.startDate)}</span>
                          {p.status === "TRIAL" && !isExpired && (
                            <span className={daysRemaining! <= 7 ? "text-rose-500 font-bold" : daysRemaining! <= 15 ? "text-amber-500 font-bold" : ""}>
                              Trial até: {fmtDate(p.trialEndDate)} ({daysRemaining}d)
                            </span>
                          )}
                          {p.status === "EFFECTIVE" && (
                            <span className="text-emerald-600 font-bold">
                              Efetivado em: {fmtDate(p.effectiveDate)}
                            </span>
                          )}
                          {p.status === "TERMINATED" && (
                            <span className="text-rose-500">
                              Encerrado em: {fmtDate(p.terminationDate)}
                            </span>
                          )}
                          <span className="font-bold text-slate-600">{fmtBRL(p.monthlySalary)}/mês</span>
                        </div>

                        {/* Termination reason */}
                        {p.status === "TERMINATED" && p.terminationReason && (
                          <div className="mt-3 p-2.5 bg-rose-50 border border-rose-100 rounded-lg">
                            <p className="text-[9px] font-black uppercase text-rose-400 tracking-widest mb-0.5">Motivo</p>
                            <p className="text-[11px] font-medium text-rose-700">{p.terminationReason}</p>
                          </div>
                        )}

                        {/* Commission + Actions */}
                        <div className="flex items-center justify-between gap-3 mt-4 pt-3 border-t border-slate-100 flex-wrap">
                          {/* Commission badge */}
                          <div>
                            {p.commission ? (
                              <div className="flex items-center gap-2">
                                <DollarSign className="h-3.5 w-3.5 text-slate-400" />
                                <span className="text-xs font-black text-slate-700">{fmtBRL(p.commission.amount)}</span>
                                <span className={cn(
                                  "text-[8px] font-black uppercase tracking-widest",
                                  p.commission.status === "PAID" ? "text-emerald-500"
                                  : p.commission.status === "INVOICED" ? "text-blue-500"
                                  : p.commission.status === "PENDING" ? "text-amber-500"
                                  : "text-slate-400"
                                )}>
                                  {p.commission.status === "PAID" ? "Pago"
                                   : p.commission.status === "INVOICED" ? "Faturado"
                                   : p.commission.status === "PENDING" ? "Pendente"
                                   : "Dispensado"}
                                </span>
                              </div>
                            ) : p.status !== "CANCELLED" ? (
                              <span className="text-[9px] font-black text-violet-500 bg-violet-50 px-2 py-0.5 rounded-md uppercase tracking-wider">
                                Reposição
                              </span>
                            ) : null}
                          </div>

                          {/* Action buttons */}
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {p.status === "TRIAL" && (
                              <>
                                <ConfirmAction
                                  title="Confirmar Efetivação?"
                                  description={`${p.candidate.name} será marcado como efetivado.`}
                                  actionText="Efetivar"
                                  onConfirm={() => handleEffective(p.id)}
                                >
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="h-8 rounded-lg text-[10px] font-black uppercase border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                                  >
                                    <CheckCircle2 className="h-3 w-3 mr-1" />
                                    Efetivar
                                  </Button>
                                </ConfirmAction>
                                <TerminateModal
                                  candidateName={p.candidate.name}
                                  companyName={initial.company.name}
                                  onConfirm={(reason) => handleTerminate(p.id, reason)}
                                >
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="h-8 rounded-lg text-[10px] font-black uppercase text-rose-600 hover:bg-rose-50"
                                  >
                                    <XCircle className="h-3 w-3 mr-1" />
                                    Encerrar
                                  </Button>
                                </TerminateModal>
                              </>
                            )}
                            {p.status === "TERMINATED" && (
                              <Link href={`/admin/managed?highlight=${initial.id}`}>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-8 rounded-lg text-[10px] font-black uppercase border-violet-200 text-violet-700 hover:bg-violet-50"
                                >
                                  <RefreshCw className="h-3 w-3 mr-1" />
                                  Enviar Reposição
                                </Button>
                              </Link>
                            )}
                            {p.commission && (
                              <CommissionModal
                                commission={p.commission}
                                candidateName={p.candidate.name}
                                companyName={initial.company.name}
                                onUpdate={handleCommissionUpdate}
                              >
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className={cn(
                                    "h-8 rounded-lg text-[10px] font-black uppercase",
                                    p.commission.status === "PAID"
                                      ? "text-emerald-600 hover:bg-emerald-50"
                                      : p.commission.status === "WAIVED"
                                      ? "text-slate-500 hover:bg-slate-100"
                                      : "text-blue-600 hover:bg-blue-50"
                                  )}
                                >
                                  <DollarSign className="h-3 w-3 mr-1" />
                                  {p.commission.status === "PAID"
                                    ? "Ver Comissão"
                                    : "Gerir Comissão"}
                                </Button>
                              </CommissionModal>
                            )}
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Sidebar — 2/5 */}
        <div className="lg:col-span-2 space-y-4">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            Configuração da Vaga
          </p>

          <Card className="p-5 border-slate-200 bg-white rounded-2xl shadow-sm space-y-4">
            {initial.salaryRange && (
              <div>
                <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-1">Faixa Salarial</p>
                <p className="text-sm font-bold text-slate-800">{initial.salaryRange}</p>
              </div>
            )}

            <div>
              <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-1">Modelo de Honorários</p>
              <p className="text-sm font-bold text-slate-800">
                {initial.feeType === "fixed"
                  ? `Valor fixo: ${initial.feeFixed ? fmtBRL(initial.feeFixed) : "—"}`
                  : initial.feeType === "percentage"
                  ? `${initial.feePercentage ?? "—"}% do 1º salário`
                  : "Não configurado"}
              </p>
            </div>

            <div>
              <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-1">Período de Trial</p>
              <p className="text-sm font-bold text-slate-800">{initial.trialDays ?? 90} dias</p>
            </div>

            <div>
              <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-1">Vagas</p>
              <p className="text-sm font-bold text-slate-800">
                {effectiveCount} de {initial.openings} preenchida{initial.openings > 1 ? "s" : ""}
              </p>
            </div>

            <div>
              <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-1">Localização</p>
              <p className="text-sm font-bold text-slate-800">
                {initial.isRemote ? "Remoto" : initial.location}
              </p>
            </div>
          </Card>

          {/* Requirements */}
          {initial.requirements && (
            <Card className="p-5 border-slate-200 bg-white rounded-2xl shadow-sm">
              <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-3">Requisitos</p>
              <p className="text-xs font-medium text-slate-600 leading-relaxed whitespace-pre-line line-clamp-10">
                {initial.requirements}
              </p>
            </Card>
          )}

          {/* Finance summary */}
          {placements.some((p) => p.commission) && (
            <Card className="p-5 border-slate-200 bg-white rounded-2xl shadow-sm">
              <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-3">Resumo Financeiro</p>
              <div className="space-y-2">
                {entryFeeAmount && entryFeeStatus === "PAID" && (
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500 font-medium">Taxa de entrada</span>
                    <span className="font-black text-emerald-600">{fmtBRL(entryFeeAmount)}</span>
                  </div>
                )}
                {placements
                  .filter((p) => p.commission)
                  .map((p) => (
                    <div key={p.id} className="flex justify-between text-xs">
                      <span className="text-slate-500 font-medium">
                        Comissão R{p.round}
                      </span>
                      <span className={cn(
                        "font-black",
                        p.commission!.status === "PAID" ? "text-emerald-600"
                        : p.commission!.status === "WAIVED" ? "text-slate-400 line-through"
                        : "text-slate-700"
                      )}>
                        {fmtBRL(p.commission!.amount)}
                      </span>
                    </div>
                  ))}
                <div className="border-t border-slate-100 pt-2 flex justify-between text-xs">
                  <span className="font-bold text-slate-700">Total recebido</span>
                  <span className="font-black text-emerald-600">
                    {fmtBRL(
                      (entryFeeStatus === "PAID" ? (entryFeeAmount ?? 0) : 0) +
                      placements
                        .filter((p) => p.commission?.status === "PAID")
                        .reduce((acc, p) => acc + p.commission!.amount, 0)
                    )}
                  </span>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
