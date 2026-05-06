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

const PAGE_SIZE = 15;

type User = {
  id: string;
  name: string | null;
  email: string | null;
  role: string;
  createdAt: Date;
  company: { name: string } | null;
};

const ROLE_FILTERS = ["Todos", "Administradores", "Empresas", "Candidatos"] as const;
const ROLE_MAP: Record<string, string> = {
  ADMIN: "ADMIN",
  EMPLOYER: "EMPLOYER",
  CANDIDATE: "CANDIDATE",
};
const ROLE_LABEL: Record<string, string> = {
  ADMIN: "Administrador",
  EMPLOYER: "Empresa",
  CANDIDATE: "Candidato",
};
const ROLE_FILTER_MAP: Record<string, string | null> = {
  Todos: null,
  Administradores: "ADMIN",
  Empresas: "EMPLOYER",
  Candidatos: "CANDIDATE",
};

function cn(...c: (string | boolean | undefined)[]) {
  return c.filter(Boolean).join(" ");
}

export function UsersTable({ users: initial }: { users: User[] }) {
  const [users, setUsers] = useState(initial);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<typeof ROLE_FILTERS[number]>("Todos");
  const [currentPage, setCurrentPage] = useState(1);
  const [, startTransition] = useTransition();

  const filtered = users.filter((u) => {
    const matchSearch =
      !search ||
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase());
    const roleFilter = ROLE_FILTER_MAP[activeFilter];
    const matchRole = !roleFilter || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  function handleFilterChange(f: typeof ROLE_FILTERS[number]) {
    setActiveFilter(f);
    setCurrentPage(1);
  }

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
      {/* Search & filters */}
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
        <div className="flex gap-2 flex-wrap">
          {ROLE_FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => handleFilterChange(f)}
              className={cn(
                "rounded-lg h-9 px-3 flex items-center border font-bold text-[10px] transition-all",
                activeFilter === f
                  ? "bg-slate-900 text-white border-slate-900"
                  : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                {["Usuário", "Nível", "Empresa", "Membro desde", "Ações"].map((h, i) => (
                  <th
                    key={h}
                    className={cn(
                      "px-5 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400",
                      i === 4 && "text-right"
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
                  <td colSpan={5} className="px-5 py-10 text-center text-sm text-slate-400 font-medium">
                    Nenhum usuário encontrado.
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
                    <Badge
                      className={cn(
                        "rounded-md px-1.5 py-0.5 text-[9px] font-bold uppercase border-none",
                        user.role === "ADMIN" ? "bg-rose-500/10 text-rose-600" :
                        user.role === "EMPLOYER" ? "bg-blue-500/10 text-blue-600" :
                        "bg-slate-100 text-slate-500"
                      )}
                    >
                      {ROLE_LABEL[user.role] ?? user.role}
                    </Badge>
                  </td>
                  <td className="px-5 py-4 text-xs text-slate-500 font-medium">
                    {user.company?.name ?? "—"}
                  </td>
                  <td className="px-5 py-4 text-xs text-slate-500 font-medium">
                    {format(new Date(user.createdAt), "dd MMM yyyy", { locale: ptBR })}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-all">
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                        <Mail className="h-4 w-4 text-slate-400" />
                      </Button>
                      <ConfirmAction
                        title="Excluir Usuário?"
                        description="Esta ação não pode ser desfeita. O usuário perderá acesso imediatamente."
                        variant="danger"
                        actionText="Sim, Excluir"
                        onConfirm={() => handleDelete(user.id)}
                      >
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:text-rose-500">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </ConfirmAction>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                        <MoreHorizontal className="h-4 w-4 text-slate-400" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-slate-50 bg-slate-50/30 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-slate-400 font-medium">
            {filtered.length} de {users.length} usuário(s)
          </p>
          <PaginationBar page={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
      </div>
    </>
  );
}
