"use client";

import { useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Edit2, Shield, Loader2, Check } from "lucide-react";
import { updateUser } from "@/actions/users";
import { toast } from "sonner";

const PERMISSIONS = [
  { id: "MANAGED", label: "Curadoria (Managed)", color: "blue" },
  { id: "RESUMES", label: "Banco de Currículos", color: "purple" },
  { id: "COMPANIES", label: "Empresas", color: "orange" },
  { id: "PLACEMENTS", label: "Contratações", color: "emerald" },
  { id: "ANALYTICS", label: "Analytics", color: "indigo" },
  { id: "FINANCE", label: "Financeiro", color: "rose" },
  { id: "USERS", label: "Usuários", color: "slate" },
  { id: "SETTINGS", label: "Configurações", color: "amber" },
];

interface User {
  id: string;
  name: string | null;
  email: string | null;
  permissions: string[];
}

export function EditUserModal({ user }: { user: User }) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>(user.permissions || []);

  function togglePermission(id: string) {
    setSelectedPermissions((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    startTransition(async () => {
      const result = await updateUser(user.id, {
        name,
        email,
        permissions: selectedPermissions,
        ...(password && { password }),
      });

      if (result.success) {
        toast.success("Usuário atualizado com sucesso!");
        setOpen(false);
      } else {
        toast.error(result.error || "Erro ao atualizar usuário");
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all">
            <Edit2 className="h-4 w-4" />
          </Button>
        }
      />
      <DialogContent className="sm:max-w-[500px] w-[95vw] bg-white border-none rounded-[1.5rem] sm:rounded-[2rem] shadow-2xl p-0 overflow-hidden max-h-[95vh] overflow-y-auto">
        <DialogHeader className="bg-slate-950 p-6 sm:p-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-transparent pointer-events-none" />
            <div className="flex items-center gap-4 relative z-10">
                <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl sm:rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20 shrink-0">
                    <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <div>
                    <DialogTitle className="text-lg sm:text-xl font-black tracking-tight">Editar Usuário</DialogTitle>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5 sm:mt-1">Configurar Acessos e Perfil</p>
                </div>
            </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Nome Completo</Label>
              <Input name="name" defaultValue={user.name || ""} className="h-11 rounded-xl bg-slate-50 border-none font-bold text-sm" />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">E-mail</Label>
              <Input name="email" defaultValue={user.email || ""} className="h-11 rounded-xl bg-slate-50 border-none font-bold text-sm" />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Nova Senha (deixe vazio para manter)</Label>
            <Input name="password" type="password" className="h-11 rounded-xl bg-slate-50 border-none font-bold text-sm" />
          </div>

          <div className="space-y-4">
            <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Permissões de Acesso</Label>
            <div className="grid grid-cols-2 gap-2">
              {PERMISSIONS.map((p) => {
                const isActive = selectedPermissions.includes(p.id);
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => togglePermission(p.id)}
                    className={`flex items-center justify-between p-3 rounded-xl border-2 transition-all text-left ${
                      isActive 
                        ? "border-blue-600 bg-blue-50/50" 
                        : "border-slate-100 bg-white hover:border-slate-200"
                    }`}
                  >
                    <span className={`text-[11px] font-black ${isActive ? "text-blue-700" : "text-slate-600"}`}>
                      {p.label}
                    </span>
                    {isActive && <Check className="h-3 w-3 text-blue-600" />}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="ghost" onClick={() => setOpen(false)} className="flex-1 h-12 rounded-xl font-bold text-slate-500">
              Cancelar
            </Button>
            <Button disabled={isPending} className="flex-1 h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black shadow-lg shadow-blue-200">
              {isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : "Salvar Alterações"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
