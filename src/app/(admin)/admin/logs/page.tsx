import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ScrollText, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { AuditLogDetails } from "@/components/admin/audit-log-details";

export const revalidate = 0;

const ACTION_LABELS: Record<string, { label: string; color: string }> = {
  CREATE_PLACEMENT:   { label: "Alocação criada",       color: "bg-emerald-100 text-emerald-800" },
  CONFIRM_EFFECTIVE:  { label: "Efetivação confirmada", color: "bg-teal-100 text-teal-800" },
  TERMINATE_PLACEMENT:{ label: "Alocação encerrada",    color: "bg-red-100 text-red-800" },
  HIRE_AND_PLACE:     { label: "Candidato enviado",     color: "bg-blue-100 text-blue-800" },
  ADMIN_ALLOCATE:     { label: "Alocação admin",        color: "bg-indigo-100 text-indigo-800" },
  COMMISSION_INVOICED:{ label: "Comissão faturada",     color: "bg-amber-100 text-amber-800" },
  COMMISSION_PAID:    { label: "Comissão paga",         color: "bg-green-100 text-green-800" },
  COMMISSION_WAIVED:  { label: "Comissão dispensada",   color: "bg-slate-100 text-slate-600" },
  CREATE_USER:        { label: "Usuário criado",        color: "bg-violet-100 text-violet-800" },
  UPDATE_USER:        { label: "Usuário atualizado",    color: "bg-purple-100 text-purple-800" },
  DELETE_USER:        { label: "Usuário excluído",      color: "bg-rose-100 text-rose-800" },
};

const PAGE_SIZE = 25;

export default async function AuditLogsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; action?: string }>;
}) {
  const session = await auth();
  if (!session || (session.user as any).role !== "ADMIN") redirect("/admin");

  const { page: pageParam, action: actionFilter } = await searchParams;
  const page = Math.max(1, parseInt(pageParam ?? "1"));

  const where = actionFilter ? { action: actionFilter } : {};

  const [logs, total] = await Promise.all([
    prisma.auditLog.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.auditLog.count({ where }),
  ]);

  // Fetch actor names for all user IDs in one query
  const userIds = [...new Set(logs.map((l) => l.userId).filter(Boolean))] as string[];
  const users = userIds.length
    ? await prisma.user.findMany({ where: { id: { in: userIds } }, select: { id: true, name: true, email: true } })
    : [];
  const userMap = Object.fromEntries(users.map((u) => [u.id, u.name ?? u.email ?? "—"]));

  const totalPages = Math.ceil(total / PAGE_SIZE);
  const actionKeys = Object.keys(ACTION_LABELS);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <div className="flex items-center gap-1.5 text-blue-600 mb-1">
          <ScrollText className="h-4 w-4" />
          <span className="text-[10px] font-black uppercase tracking-widest">Sistema</span>
        </div>
        <h1 className="text-2xl font-black text-slate-900">Logs de Auditoria</h1>
        <p className="text-sm text-slate-500 font-medium">
          Histórico completo de ações realizadas no sistema — {total} {total === 1 ? "registro" : "registros"}.
        </p>
      </div>

      {/* Filter chips */}
      <div className="flex flex-wrap gap-2">
        <Link
          href="/admin/logs"
          className={`px-3 py-1.5 rounded-full text-[11px] font-bold transition-all ${
            !actionFilter ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"
          }`}
        >
          Todos
        </Link>
        {actionKeys.map((key) => {
          const meta = ACTION_LABELS[key];
          const isActive = actionFilter === key;
          return (
            <Link
              key={key}
              href={`/admin/logs?action=${key}`}
              className={`px-3 py-1.5 rounded-full text-[11px] font-bold transition-all ${
                isActive ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"
              }`}
            >
              {meta.label}
            </Link>
          );
        })}
      </div>

      {logs.length === 0 ? (
        <Card className="p-12 border-slate-200 bg-white rounded-2xl shadow-sm text-center">
          <ScrollText className="h-10 w-10 text-slate-200 mx-auto mb-3" />
          <p className="text-slate-400 font-medium">Nenhum log de auditoria encontrado.</p>
        </Card>
      ) : (
        <Card className="border-slate-200 bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/60">
                  <th className="text-left px-4 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400 whitespace-nowrap">Data / Hora</th>
                  <th className="text-left px-4 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400">Ação</th>
                  <th className="text-left px-4 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400">Usuário</th>
                  <th className="text-left px-4 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400">Detalhes</th>
                  <th className="text-left px-4 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400">Dados</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {logs.map((log) => {
                  const meta = ACTION_LABELS[log.action] ?? { label: log.action, color: "bg-slate-100 text-slate-600" };
                  const actorName = log.userId ? (userMap[log.userId] ?? "Usuário removido") : "Sistema";
                  return (
                    <tr key={log.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="px-4 py-3 text-[11px] text-slate-400 font-mono whitespace-nowrap">
                        {format(log.createdAt, "dd/MM/yy HH:mm", { locale: ptBR })}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-black ${meta.color}`}>
                          {meta.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-[12px] font-medium text-slate-700 whitespace-nowrap">
                        {actorName}
                      </td>
                      <td className="px-4 py-3 text-[12px] text-slate-500 max-w-[260px] truncate">
                        {log.details ?? "—"}
                      </td>
                      <td className="px-4 py-3">
                        {(log.before || log.after) && (
                          <AuditLogDetails before={log.before} after={log.after} />
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100 bg-slate-50/40">
              <p className="text-[11px] text-slate-400 font-medium">
                {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, total)} de {total}
              </p>
              <div className="flex items-center gap-1">
                {page > 1 && (
                  <Link
                    href={`/admin/logs?page=${page - 1}${actionFilter ? `&action=${actionFilter}` : ""}`}
                    className="h-8 w-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-200 transition-colors"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Link>
                )}
                <span className="text-[11px] font-bold text-slate-600 px-2">
                  {page} / {totalPages}
                </span>
                {page < totalPages && (
                  <Link
                    href={`/admin/logs?page=${page + 1}${actionFilter ? `&action=${actionFilter}` : ""}`}
                    className="h-8 w-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-200 transition-colors"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                )}
              </div>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
