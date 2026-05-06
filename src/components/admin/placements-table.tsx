"use client";

import { useState, useTransition } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ConfirmAction } from "@/components/ui/confirm-action";
import { CommissionModal } from "@/components/admin/commission-modal";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Clock,
  CheckCircle2,
  XCircle,
  Ban,
  Search,
  DollarSign,
} from "lucide-react";
import { confirmEffective, terminatePlacement } from "@/actions/placements";
import { PaginationBar } from "@/components/ui/pagination-bar";

const PAGE_SIZE = 10;

type CommissionStatus = "PENDING" | "INVOICED" | "PAID" | "WAIVED";
type PlacementStatus = "TRIAL" | "EFFECTIVE" | "TERMINATED" | "CANCELLED";

type Placement = {
  id: string;
  status: PlacementStatus;
  monthlySalary: number;
  trialEndDate: Date;
  daysRemaining: number;
  candidate: { name: string; email: string };
  company: { name: string };
  jobTitle: string;
  commission: {
    id: string;
    amount: number;
    status: CommissionStatus;
    invoiceNumber: string | null;
  } | null;
};

const STATUS_CONFIG: Record<
  PlacementStatus,
  { label: string; color: string; icon: typeof Clock }
> = {
  TRIAL: {
    label: "Em Trial",
    color: "bg-amber-50 text-amber-700 border-amber-200",
    icon: Clock,
  },
  EFFECTIVE: {
    label: "Efetivado",
    color: "bg-emerald-50 text-emerald-700 border-emerald-200",
    icon: CheckCircle2,
  },
  TERMINATED: {
    label: "Encerrado",
    color: "bg-rose-50 text-rose-700 border-rose-200",
    icon: XCircle,
  },
  CANCELLED: {
    label: "Cancelado",
    color: "bg-slate-100 text-slate-500 border-slate-200",
    icon: Ban,
  },
};

const FILTERS = ["Todos", "Em Trial", "Efetivados", "Encerrados"] as const;
const FILTER_MAP: Record<(typeof FILTERS)[number], PlacementStatus | null> = {
  Todos: null,
  "Em Trial": "TRIAL",
  Efetivados: "EFFECTIVE",
  Encerrados: "TERMINATED",
};

function fmt(cents: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(cents / 100);
}

function urgency(days: number) {
  if (days <= 7) return "text-rose-600 bg-rose-50";
  if (days <= 15) return "text-amber-600 bg-amber-50";
  return "text-slate-600 bg-slate-50";
}

export function PlacementsTable({ placements: initial }: { placements: Placement[] }) {
  const [placements, setPlacements] = useState(initial);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<(typeof FILTERS)[number]>("Todos");
  const [currentPage, setCurrentPage] = useState(1);
  const [, startTransition] = useTransition();

  const filtered = placements.filter((p) => {
    const s = search.toLowerCase();
    const matchSearch =
      !s ||
      p.candidate.name.toLowerCase().includes(s) ||
      p.company.name.toLowerCase().includes(s) ||
      p.jobTitle.toLowerCase().includes(s);
    const statusFilter = FILTER_MAP[activeFilter];
    return matchSearch && (!statusFilter || p.status === statusFilter);
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  function handleFilterChange(f: typeof FILTERS[number]) {
    setActiveFilter(f);
    setCurrentPage(1);
  }

  function handleSearchChange(v: string) {
    setSearch(v);
    setCurrentPage(1);
  }

  function handleConfirm(id: string) {
    startTransition(async () => {
      const r = await confirmEffective(id);
      if (r.success) {
        setPlacements((prev) =>
          prev.map((p) =>
            p.id === id
              ? {
                  ...p,
                  status: "EFFECTIVE" as PlacementStatus,
                  commission: {
                    id: crypto.randomUUID(),
                    amount: Math.round(p.monthlySalary * 0.5),
                    status: "PENDING" as CommissionStatus,
                    invoiceNumber: null,
                  },
                }
              : p
          )
        );
      }
    });
  }

  function handleTerminate(id: string) {
    startTransition(async () => {
      const r = await terminatePlacement(id);
      if (r.success) {
        setPlacements((prev) =>
          prev.map((p) =>
            p.id === id ? { ...p, status: "TERMINATED" as PlacementStatus } : p
          )
        );
      }
    });
  }

  function handleCommissionUpdate(
    commissionId: string,
    newStatus: CommissionStatus,
    invoiceNumber?: string
  ) {
    setPlacements((prev) =>
      prev.map((p) => {
        if (p.commission?.id === commissionId) {
          return {
            ...p,
            commission: {
              ...p.commission,
              status: newStatus,
              invoiceNumber: invoiceNumber ?? p.commission.invoiceNumber,
            },
          };
        }
        return p;
      })
    );
  }

  return (
    <TooltipProvider>
      <div className="border-slate-200 bg-white rounded-2xl shadow-sm overflow-hidden border">
        {/* Search & filter bar */}
        <div className="p-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Buscar por candidato ou empresa..."
              className="pl-10 h-9 border-slate-200 rounded-xl text-xs font-medium"
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => handleFilterChange(f)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${
                  activeFilter === f
                    ? "bg-slate-900 text-white"
                    : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                {[
                  "Candidato",
                  "Empresa / Vaga",
                  "Salário",
                  "Status",
                  "Trial",
                  "Comissão",
                  "Ações",
                ].map((h, i) => (
                  <th
                    key={h}
                    className={`p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest ${
                      i === 6 ? "text-right" : "text-left"
                    }`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="p-10 text-center text-sm text-slate-400 font-medium"
                  >
                    Nenhuma alocação encontrada.
                  </td>
                </tr>
              )}
              {paginated.map((p) => {
                const cfg = STATUS_CONFIG[p.status];
                const progress =
                  p.status === "TRIAL"
                    ? Math.round(
                        Math.max(0, Math.min(100, ((90 - p.daysRemaining) / 90) * 100))
                      )
                    : 0;
                return (
                  <tr
                    key={p.id}
                    className="border-b border-slate-50 hover:bg-slate-50/50 transition-all group"
                  >
                    {/* Candidate */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center font-black text-xs shrink-0">
                          {p.candidate.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-xs text-slate-900">
                            {p.candidate.name}
                          </p>
                          <p className="text-[10px] text-slate-400 font-medium">
                            {p.candidate.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    {/* Company / Job */}
                    <td className="p-4">
                      <p className="font-bold text-xs text-slate-900">{p.company.name}</p>
                      <p className="text-[10px] text-slate-400 font-medium">{p.jobTitle}</p>
                    </td>
                    {/* Salary */}
                    <td className="p-4">
                      <p className="font-black text-xs text-slate-900">
                        {fmt(p.monthlySalary)}
                      </p>
                      <p className="text-[9px] text-slate-400 font-bold uppercase">mensal</p>
                    </td>
                    {/* Status */}
                    <td className="p-4">
                      <Badge
                        className={`${cfg.color} border font-bold text-[9px] uppercase tracking-wider rounded-lg px-2 py-0.5`}
                      >
                        <cfg.icon className="h-3 w-3 mr-1" />
                        {cfg.label}
                      </Badge>
                    </td>
                    {/* Trial progress */}
                    <td className="p-4">
                      {p.status === "TRIAL" ? (
                        <div className="space-y-1.5 min-w-[120px]">
                          <div className="flex items-center justify-between">
                            <span
                              className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded ${urgency(p.daysRemaining)}`}
                            >
                              {p.daysRemaining}d restantes
                            </span>
                            <span className="text-[9px] font-bold text-slate-400">
                              {progress}%
                            </span>
                          </div>
                          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all ${
                                p.daysRemaining <= 7
                                  ? "bg-rose-500"
                                  : p.daysRemaining <= 15
                                  ? "bg-amber-500"
                                  : "bg-blue-500"
                              }`}
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>
                      ) : p.status === "EFFECTIVE" ? (
                        <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-1">
                          <CheckCircle2 className="h-3.5 w-3.5" /> Concluído
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-slate-400">—</span>
                      )}
                    </td>
                    {/* Commission */}
                    <td className="p-4">
                      {p.commission ? (
                        <div>
                          <p className="font-black text-xs text-slate-900">
                            {fmt(p.commission.amount)}
                          </p>
                          <p
                            className={`text-[8px] font-black uppercase tracking-widest mt-0.5 ${
                              p.commission.status === "PAID"
                                ? "text-emerald-500"
                                : p.commission.status === "PENDING"
                                ? "text-amber-500"
                                : p.commission.status === "INVOICED"
                                ? "text-blue-500"
                                : "text-slate-400"
                            }`}
                          >
                            {p.commission.status === "PAID"
                              ? "Pago"
                              : p.commission.status === "PENDING"
                              ? "Pendente"
                              : p.commission.status === "INVOICED"
                              ? "Faturado"
                              : "Dispensado"}
                          </p>
                        </div>
                      ) : p.status === "TRIAL" ? (
                        <div>
                          <p className="font-bold text-[10px] text-slate-400">
                            {fmt(Math.round(p.monthlySalary * 0.5))}
                          </p>
                          <p className="text-[8px] font-bold text-slate-300 uppercase">
                            Potencial
                          </p>
                        </div>
                      ) : (
                        <span className="text-[10px] font-bold text-slate-300">—</span>
                      )}
                    </td>
                    {/* Actions */}
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-all">
                        {p.status === "TRIAL" && (
                          <>
                            <ConfirmAction
                              title="Confirmar Efetivação?"
                              description={`${p.candidate.name} será marcado como efetivado na ${p.company.name} e a comissão de ${fmt(Math.round(p.monthlySalary * 0.5))} será gerada automaticamente.`}
                              actionText="Sim, Efetivar"
                              onConfirm={() => handleConfirm(p.id)}
                            >
                              <Tooltip>
                                <TooltipTrigger
                                  render={
                                    <Button
                                      size="icon"
                                      variant="ghost"
                                      className="h-8 w-8 rounded-lg hover:bg-emerald-50 hover:text-emerald-600"
                                    />
                                  }
                                >
                                  <CheckCircle2 className="h-4 w-4" />
                                </TooltipTrigger>
                                <TooltipContent>Confirmar Efetivação</TooltipContent>
                              </Tooltip>
                            </ConfirmAction>
                            <ConfirmAction
                              title="Encerrar Trial?"
                              description={`O período de experiência de ${p.candidate.name} será encerrado sem efetivação.`}
                              variant="danger"
                              actionText="Sim, Encerrar"
                              onConfirm={() => handleTerminate(p.id)}
                            >
                              <Tooltip>
                                <TooltipTrigger
                                  render={
                                    <Button
                                      size="icon"
                                      variant="ghost"
                                      className="h-8 w-8 rounded-lg hover:bg-rose-50 hover:text-rose-600"
                                    />
                                  }
                                >
                                  <XCircle className="h-4 w-4" />
                                </TooltipTrigger>
                                <TooltipContent>Encerrar Trial</TooltipContent>
                              </Tooltip>
                            </ConfirmAction>
                          </>
                        )}
                        {p.commission &&
                          (p.commission.status === "PENDING" ||
                            p.commission.status === "INVOICED") && (
                            <CommissionModal
                              commission={p.commission}
                              candidateName={p.candidate.name}
                              companyName={p.company.name}
                              onUpdate={handleCommissionUpdate}
                            >
                              <Tooltip>
                                <TooltipTrigger
                                  render={
                                    <Button
                                      size="icon"
                                      variant="ghost"
                                      className="h-8 w-8 rounded-lg hover:bg-blue-50 hover:text-blue-600"
                                    />
                                  }
                                >
                                  <DollarSign className="h-4 w-4" />
                                </TooltipTrigger>
                                <TooltipContent>Gerenciar Comissão</TooltipContent>
                              </Tooltip>
                            </CommissionModal>
                          )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-slate-50 bg-slate-50/30 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-slate-400 font-medium">
            {filtered.length} de {placements.length} alocação(ões)
          </p>
          <PaginationBar page={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
      </div>
    </TooltipProvider>
  );
}
