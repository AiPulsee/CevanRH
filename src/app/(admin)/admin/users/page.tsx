"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  User, 
  Search, 
  Mail, 
  MoreHorizontal,
  Trash2
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { ConfirmAction } from "@/components/ui/confirm-action";

export default function AdminUsers() {
  const users = [
    { name: "Cevan Administrador", email: "admin@cevan.com.br", role: "ADMINISTRADOR", status: "Ativo", joined: "01 Jan 2026" },
    { name: "Danilo Silva", email: "rh@google.com", role: "EMPRESA", status: "Ativo", joined: "12 Jan 2026" },
    { name: "Lucas Dev", email: "dev@talent.com", role: "CANDIDATO", status: "Ativo", joined: "15 Jan 2026" },
    { name: "Ana Beatriz", email: "ana@company.com", role: "EMPRESA", status: "Pendente", joined: "20 Abr 2026" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Usuários</h1>
          <p className="text-sm text-slate-500 font-medium">Gerencie permissões e visualize a base total de usuários.</p>
        </div>
      </div>

      <div className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-slate-200 shadow-sm">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input placeholder="Buscar por nome ou e-mail..." className="pl-10 h-10 border-none bg-slate-50 rounded-lg text-sm" />
        </div>
        <div className="flex gap-2">
          {["Todos", "Administradores", "Empresas", "Candidatos"].map(filter => (
            <Badge key={filter} variant="outline" className="rounded-lg h-9 px-3 flex items-center border-slate-200 bg-white text-slate-500 font-bold hover:bg-slate-50 cursor-pointer text-[10px]">
              {filter}
            </Badge>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="px-5 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400">Usuário</th>
                <th className="px-5 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400">Nível</th>
                <th className="px-5 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                <th className="px-5 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400">Membro desde</th>
                <th className="px-5 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {users.map((user) => (
                <tr key={user.email} className="hover:bg-slate-50/50 transition-all group">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 border border-slate-200 text-xs">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{user.name}</p>
                        <p className="text-[10px] text-slate-400">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <Badge className={cn(
                      "rounded-md px-1.5 py-0.5 text-[9px] font-bold uppercase border-none",
                      user.role === "ADMINISTRADOR" ? "bg-rose-500/10 text-rose-600" :
                      user.role === "EMPRESA" ? "bg-blue-500/10 text-blue-600" :
                      "bg-slate-100 text-slate-500"
                    )}>
                      {user.role}
                    </Badge>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5">
                      <span className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        user.status === "Ativo" ? "bg-green-500" : "bg-orange-400"
                      )} />
                      <span className="text-xs font-medium text-slate-600">{user.status}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-xs text-slate-500 font-medium">
                    {user.joined}
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
                        onConfirm={() => console.log("Usuário deletado")}
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
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}

