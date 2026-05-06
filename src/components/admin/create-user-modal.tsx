"use client";

import { useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus, Loader2, Eye, EyeOff } from "lucide-react";
import { createUser } from "@/actions/users";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Company = { id: string; name: string };

export function CreateUserModal({ companies }: { companies: Company[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("CANDIDATE");
  const [companyId, setCompanyId] = useState("");

  function reset() {
    setName(""); setEmail(""); setPassword("");
    setRole("CANDIDATE"); setCompanyId("");
    setShowPassword(false);
  }

  function handleSubmit() {
    startTransition(async () => {
      const result = await createUser({ name, email, password, role, companyId: companyId || undefined });
      if (result.success) {
        toast.success("Usuário criado com sucesso!");
        reset();
        setIsOpen(false);
        router.refresh();
      } else {
        toast.error(result.error || "Erro ao criar usuário.");
      }
    });
  }

  const selectCls =
    "w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-blue-500/20 outline-none appearance-none";

  const ROLE_LABEL: Record<string, string> = {
    ADMIN: "Administrador",
    EMPLOYER: "Empresa (RH)",
    CANDIDATE: "Candidato",
  };

  return (
    <Dialog open={isOpen} onOpenChange={(v) => { setIsOpen(v); if (!v) reset(); }}>
      <DialogTrigger
        render={
          <Button className="rounded-xl font-bold h-10 px-5 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200 text-sm gap-2">
            <UserPlus className="h-4 w-4" />
            Novo Usuário
          </Button>
        }
      />
      <DialogContent className="sm:max-w-lg w-[95vw] bg-white rounded-[2rem] border-none shadow-2xl p-0 overflow-hidden">
        <div className="bg-slate-900 p-8 text-white">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-1">
              <div className="h-10 w-10 rounded-xl bg-blue-500 flex items-center justify-center">
                <UserPlus className="h-5 w-5 text-white" />
              </div>
              <DialogTitle className="text-xl font-black text-white">Cadastrar Usuário</DialogTitle>
            </div>
            <DialogDescription className="text-slate-400 font-medium">
              Crie uma conta de acesso ao sistema.
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-8 space-y-5">
          <div className="space-y-2">
            <Label className="font-bold text-slate-700">Nome completo</Label>
            <Input
              placeholder="Ex: Maria Silva"
              className="h-12 bg-slate-50 border-slate-200 rounded-xl font-medium"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label className="font-bold text-slate-700">E-mail</Label>
            <Input
              type="email"
              placeholder="usuario@email.com"
              className="h-12 bg-slate-50 border-slate-200 rounded-xl font-medium"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label className="font-bold text-slate-700">Senha</Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Mínimo 6 caracteres"
                className="h-12 bg-slate-50 border-slate-200 rounded-xl font-medium pr-12"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="font-bold text-slate-700">Perfil de Acesso</Label>
            <select
              className={selectCls}
              value={role}
              onChange={(e) => { setRole(e.target.value); setCompanyId(""); }}
            >
              {Object.entries(ROLE_LABEL).map(([val, label]) => (
                <option key={val} value={val}>{label}</option>
              ))}
            </select>
          </div>

          {role === "EMPLOYER" && (
            <div className="space-y-2">
              <Label className="font-bold text-slate-700">Empresa vinculada</Label>
              <select
                className={selectCls}
                value={companyId}
                onChange={(e) => setCompanyId(e.target.value)}
              >
                <option value="">Selecione uma empresa...</option>
                {companies.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
          )}

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-500 font-medium leading-relaxed">
            {role === "ADMIN" && "Acesso total ao painel administrativo da Cevan."}
            {role === "EMPLOYER" && "Acesso ao portal da empresa vinculada para acompanhar vagas e candidatos."}
            {role === "CANDIDATE" && "Acesso ao portal do candidato para acompanhar candidaturas."}
          </div>
        </div>

        <DialogFooter className="p-6 bg-slate-50 border-t border-slate-100 gap-3">
          <Button
            variant="ghost"
            className="rounded-xl font-bold h-11 px-6"
            onClick={() => setIsOpen(false)}
            disabled={isPending}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isPending || !name || !email || !password}
            className="rounded-xl font-black h-11 px-8 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200 uppercase text-xs tracking-widest"
          >
            {isPending ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <UserPlus className="h-4 w-4 mr-2" />}
            {isPending ? "Criando..." : "Criar Usuário"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
