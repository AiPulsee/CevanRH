"use client";

import { useState, useTransition } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CommissionModal } from "@/components/admin/commission-modal";
import { Search, DollarSign, CheckCircle2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { PaginationBar } from "@/components/ui/pagination-bar";

const PAGE_SIZE = 10;
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

type CommissionStatus = "PENDING" | "INVOICED" | "PAID" | "WAIVED";

type CommissionRow = {
  id: string;
  amount: number;
  status: CommissionStatus;
  invoiceNumber: string | null;
  dueDate: Date | null;
  paidAt: Date | null;
  candidateName: string;
  candidateEmail: string;
  companyName: string;
  jobTitle: string;
};

const STATUS_FILTERS = ["Todos", "Pendentes", "Faturados", "Pagos", "Dispensados"] as const;
const STATUS_MAP: Record<(typeof STATUS_FILTERS)[number], CommissionStatus | null> = {
  Todos: null,
  Pendentes: "PENDING",
  Faturados: "INVOICED",
  Pagos: "PAID",
  Dispensados: "WAIVED",
};

const STATUS_LABEL: Record<CommissionStatus, string> = {
  PENDING: "Pendente",
  INVOICED: "Faturado",
  PAID: "Pago",
  WAIVED: "Dispensado",
};

const STATUS_COLOR: Record<CommissionStatus, string> = {
  PENDING: "bg-amber-100 text-amber-700",
  INVOICED: "bg-blue-100 text-blue-700",
  PAID: "bg-emerald-100 text-emerald-700",
  WAIVED: "bg-slate-100 text-slate-500",
};

function fmt(cents: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
    cents / 100
  );
}

export function CommissionsTable({
  commissions: initial,
}: {
  commissions: CommissionRow[];
}) {
  const [commissions, setCommissions] = useState(initial);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<(typeof STATUS_FILTERS)[number]>("Todos");
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = commissions.filter((c) => {
    const s = search.toLowerCase();
    const matchSearch =
      !s ||
      c.candidateName.toLowerCase().includes(s) ||
      c.companyName.toLowerCase().includes(s) ||
      c.jobTitle.toLowerCase().includes(s);
    const statusFilter = STATUS_MAP[activeFilter];
    return matchSearch && (!statusFilter || c.status === statusFilter);
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  function handleFilterChange(f: typeof STATUS_FILTERS[number]) {
    setActiveFilter(f);
    setCurrentPage(1);
  }

  function handleSearchChange(v: string) {
    setSearch(v);
    setCurrentPage(1);
  }

  function handleUpdate(id: string, newStatus: CommissionStatus, invoiceNumber?: string) {
    setCommissions((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              status: newStatus,
              invoiceNumber: invoiceNumber ?? c.invoiceNumber,
              paidAt: newStatus === "PAID" ? new Date() : c.paidAt,
            }
          : c
      )
    );
  }

  return (
    <div className="border-slate-200 bg-white rounded-2xl shadow-sm overflow-hidden border">
      {/* Filters */}
      <div className="p-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Buscar por candidato, empresa ou vaga..."
            className="pl-10 h-9 border-slate-200 rounded-xl text-xs font-medium"
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {STATUS_FILTERS.map((f) => (
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
              {["Candidato", "Empresa / Vaga", "Valor", "Status", "Vencimento", "Ações"].map(
                (h, i) => (
                  <th
                    key={h}
                    className={`p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest ${
                      i === 5 ? "text-right" : "text-left"
                    }`}
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 && (
              <tr>
                <td colSpan={6} className="p-10 text-center text-sm text-slate-400 font-medium">
                  Nenhuma comissão encontrada.
                </td>
              </tr>
            )}
            {paginated.map((c) => (
              <tr
                key={c.id}
                className="border-b border-slate-50 hover:bg-slate-50/50 transition-all group"
              >
                {/* Candidate */}
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center font-black text-xs shrink-0">
                      {c.candidateName.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-xs text-slate-900">{c.candidateName}</p>
                      <p className="text-[10px] text-slate-400 font-medium">{c.candidateEmail}</p>
                    </div>
                  </div>
                </td>
                {/* Company / Job */}
                <td className="p-4">
                  <p className="font-bold text-xs text-slate-900">{c.companyName}</p>
                  <p className="text-[10px] text-slate-400 font-medium">{c.jobTitle}</p>
                </td>
                {/* Amount */}
                <td className="p-4">
                  <p className="font-black text-xs text-slate-900">{fmt(c.amount)}</p>
                  {c.invoiceNumber && (
                    <p className="text-[9px] text-slate-400 font-medium">{c.invoiceNumber}</p>
                  )}
                </td>
                {/* Status */}
                <td className="p-4">
                  <Badge
                    className={`${STATUS_COLOR[c.status]} border-none font-bold text-[9px] uppercase tracking-wider rounded-lg px-2 py-0.5`}
                  >
                    {STATUS_LABEL[c.status]}
                  </Badge>
                  {c.status === "PAID" && c.paidAt && (
                    <p className="text-[9px] text-slate-400 font-medium mt-0.5">
                      {format(new Date(c.paidAt), "dd/MM/yyyy", { locale: ptBR })}
                    </p>
                  )}
                </td>
                {/* Due date */}
                <td className="p-4">
                  {c.dueDate ? (
                    <p className="text-xs font-bold text-slate-600">
                      {format(new Date(c.dueDate), "dd MMM yyyy", { locale: ptBR })}
                    </p>
                  ) : (
                    <span className="text-[10px] text-slate-300">—</span>
                  )}
                </td>
                {/* Actions */}
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end opacity-0 group-hover:opacity-100 transition-all">
                    {(c.status === "PENDING" || c.status === "INVOICED") && (
                      <CommissionModal
                        commission={c}
                        candidateName={c.candidateName}
                        companyName={c.companyName}
                        onUpdate={handleUpdate}
                      >
                        <Tooltip>
                          <TooltipTrigger render={
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 rounded-lg hover:bg-blue-50 hover:text-blue-600"
                            >
                              <DollarSign className="h-4 w-4" />
                            </Button>
                          } />
                          <TooltipContent>
                            {c.status === "PENDING" ? "Registrar faturamento (NF)" : "Registrar pagamento recebido"}
                          </TooltipContent>
                        </Tooltip>
                      </CommissionModal>
                    )}
                    {c.status === "PAID" && (
                      <Tooltip>
                        <TooltipTrigger render={<CheckCircle2 className="h-4 w-4 text-emerald-400" />} />
                        <TooltipContent>Comissão recebida — pago em {c.paidAt ? new Date(c.paidAt).toLocaleDateString("pt-BR") : "—"}</TooltipContent>
                      </Tooltip>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-5 py-3 border-t border-slate-50 bg-slate-50/30 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-[11px] text-slate-400 font-medium">
          {filtered.length} de {commissions.length} comissão(ões)
        </p>
        <PaginationBar page={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </div>
    </div>
  );
}
