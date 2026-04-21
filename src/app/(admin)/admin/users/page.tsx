"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  User, 
  Search, 
  Filter, 
  Mail, 
  MoreHorizontal,
  ShieldAlert,
  UserCheck,
  Trash2
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { ConfirmAction } from "@/components/ui/confirm-action";

export default function AdminUsers() {
  const users = [
    { name: "Cevan Admin", email: "admin@cevan.com.br", role: "ADMIN", status: "Active", joined: "01 Jan 2026" },
    { name: "Danilo Silva", email: "rh@google.com", role: "EMPLOYER", status: "Active", joined: "12 Jan 2026" },
    { name: "Lucas Dev", email: "dev@talent.com", role: "CANDIDATE", status: "Active", joined: "15 Jan 2026" },
    { name: "Ana Beatriz", email: "ana@company.com", role: "EMPLOYER", status: "Pending", joined: "20 Abr 2026" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">Todos os Usuários</h1>
          <p className="text-slate-500 mt-1">Gerencie permissões e visualize a base total de usuários da plataforma.</p>
        </div>
      </div>

      <div className="flex items-center gap-4 bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input placeholder="Buscar por nome ou e-mail..." className="pl-10 h-10 border-slate-200 bg-slate-50 rounded-xl" />
        </div>
        <div className="flex gap-2">
          {["Todos", "Admin", "Employer", "Candidate"].map(filter => (
            <Badge key={filter} variant="outline" className="rounded-lg h-10 px-4 flex items-center border-slate-200 bg-white text-slate-500 font-bold hover:bg-slate-50 cursor-pointer transition-all">
              {filter}
            </Badge>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50">
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Usuário</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Nível</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Membro desde</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {users.map((user) => (
              <tr key={user.email} className="hover:bg-slate-50/50 transition-all group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 border border-slate-200">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{user.name}</p>
                      <p className="text-[10px] text-slate-400">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Badge className={cn(
                    "rounded-lg px-2 py-0.5 text-[10px] font-black uppercase border-none",
                    user.role === "ADMIN" ? "bg-rose-500/10 text-rose-600" :
                    user.role === "EMPLOYER" ? "bg-blue-500/10 text-blue-600" :
                    "bg-slate-100 text-slate-500"
                  )}>
                    {user.role}
                  </Badge>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5">
                    <span className={cn(
                      "h-1.5 w-1.5 rounded-full",
                      user.status === "Active" ? "bg-green-500" : "bg-orange-400"
                    )} />
                    <span className="text-xs font-medium text-slate-600">{user.status}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-xs text-slate-500 font-medium">
                  {user.joined}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                      <Mail className="h-4 w-4 text-slate-400" />
                    </Button>
                    <ConfirmAction
                      title="Excluir Usuário?"
                      description="Esta ação não pode ser desfeita. O usuário perderá acesso total à plataforma imediatamente."
                      variant="danger"
                      actionText="Sim, Excluir"
                      onConfirm={() => console.log("User deleted")}
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
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
