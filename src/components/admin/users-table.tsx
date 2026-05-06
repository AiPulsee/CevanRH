"use client";

import { useState, useTransition } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ConfirmAction } from "@/components/ui/confirm-action";
import { Search, Mail, Trash2, MoreHorizontal } from "lucide-react";
import { deleteUser } from "@/actions/users";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { PaginationBar } from "@/components/ui/pagination-bar";
import { cn } from "@/lib/utils";

import { EditUserModal } from "./edit-user-modal";

const PAGE_SIZE = 15;

type User = {
  id: string;
  name: string | null;
  email: string | null;
  role: string;
  permissions: string[];
  createdAt: Date;
  company: { name: string } | null;
};

const PERMISSIONS_MAP: Record<string, string> = {
  MANAGED: "Managed",
  RESUMES: "Resumos",
  COMPANIES: "Empresas",
  PLACEMENTS: "Contratações",
  ANALYTICS: "Analytics",
  FINANCE: "Finanças",
  USERS: "Usuários",
  SETTINGS: "Configs",
};

export function UsersTable({ users: initial }: { users: User[] }) {
  const [users, setUsers] = useState(initial.filter(u => u.role === "ADMIN"));
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [, startTransition] = useTransition();

  const filtered = users.filter((u) => {
    const matchSearch =
      !search ||
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase());
    return matchSearch;
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  function handleSearchChange(v: string) {
    setSearch(v);
    setCurrentPage(1);
  }

  function handleDelete(userId: string) {
    startTransition(async () => {
      const result = await deleteUser(userId);
      if (result.success) {
        setUsers((prev) => prev.filter((u) => u.id !== userId));
      }
    });
  }

  return (
    <>
      {/* Search */}
      <div className="flex flex-wrap items-center gap-3 bg-white p-2.5 rounded-xl border border-slate-200 shadow-sm">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Buscar por nome ou e-mail..."
            className="pl-10 h-10 border-none bg-slate-50 rounded-lg text-sm"
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>
        <Badge variant="outline" className="rounded-lg h-9 px-4 border-slate-100 bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Apenas Administradores
        </Badge>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                {["Usuário", "Permissões de Acesso", "Membro desde", "Ações"].map((h, i) => (
                  <th
                    key={h}
                    className={cn(
                      "px-5 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400",
                      i === 3 && "text-right"
                    )}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {paginated.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-5 py-10 text-center text-sm text-slate-400 font-medium">
                    Nenhum usuário administrador encontrado.
                  </td>
                </tr>
              )}
              {paginated.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/50 transition-all group">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 border border-slate-200 text-xs">
                        {(user.name ?? user.email ?? "?").charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{user.name ?? "—"}</p>
                        <p className="text-[10px] text-slate-400">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex flex-wrap gap-1">
                      {user.permissions && user.permissions.length > 0 ? (
                        user.permissions.map((p) => (
                          <Badge key={p} className="bg-blue-50 text-blue-600 border-none rounded px-1.5 py-0 text-[8px] font-black uppercase">
                            {PERMISSIONS_MAP[p] || p}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-[10px] text-slate-300 font-bold italic">Nenhuma</span>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-4 text-xs text-slate-500 font-medium">
                    {format(new Date(user.createdAt), "dd MMM yyyy", { locale: ptBR })}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-all">
                      
                      <EditUserModal user={user} />

                      <ConfirmAction
                        title="Excluir Usuário?"
                        description="Esta ação não pode ser desfeita. O usuário perderá acesso imediatamente."
                        variant="danger"
                        actionText="Sim, Excluir"
                        onConfirm={() => handleDelete(user.id)}
                      >
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-rose-50 hover:text-rose-600 transition-all">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </ConfirmAction>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-slate-50 bg-slate-50/30 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-slate-400 font-medium">
            {filtered.length} de {users.length} administrador(es)
          </p>
          <PaginationBar page={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
      </div>
    </>
  );
}
