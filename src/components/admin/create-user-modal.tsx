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
import { UserPlus, Loader2, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { createUser } from "@/actions/users";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const PERMISSION_OPTIONS = [
  { key: "painel",     label: "Painel",             group: "Painel de Controle" },
  { key: "analytics",  label: "Relatórios Gerais",  group: "Painel de Controle" },
  { key: "resumes",    label: "Banco de Currículos", group: "Recrutamento & Seleção" },
  { key: "managed",    label: "Curadoria (Vagas)",   group: "Recrutamento & Seleção" },
  { key: "placements", label: "Alocações",           group: "Recrutamento & Seleção" },
  { key: "finance",    label: "Finanças",            group: "Recrutamento & Seleção" },
  { key: "companies",  label: "Empresas",            group: "Recrutamento & Seleção" },
  { key: "users",      label: "Usuários ADM",        group: "Sistema & Gestão" },
  { key: "settings",   label: "Configurações",       group: "Sistema & Gestão" },
];

const GROUPS = ["Painel de Controle", "Recrutamento & Seleção", "Sistema & Gestão"];

export function CreateUserModal() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isMaster, setIsMaster] = useState(true);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  function reset() {
    setName(""); setEmail(""); setPassword("");
    setIsMaster(true); setSelected(new Set());
    setShowPassword(false);
  }

  function togglePermission(key: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  }

  function toggleGroup(group: string) {
    const groupKeys = PERMISSION_OPTIONS.filter((p) => p.group === group).map((p) => p.key);
    const allSelected = groupKeys.every((k) => selected.has(k));
    setSelected((prev) => {
      const next = new Set(prev);
      if (allSelected) groupKeys.forEach((k) => next.delete(k));
      else groupKeys.forEach((k) => next.add(k));
      return next;
    });
  }

  function handleSubmit() {
    startTransition(async () => {
      const permissions = isMaster ? null : Array.from(selected).join(",");
      const result = await createUser({ name, email, password, permissions });
      if (result.success) {
        toast.success("Administrador criado com sucesso!");
        reset();
        setIsOpen(false);
        router.refresh();
      } else {
        toast.error(result.error || "Erro ao criar usuário.");
      }
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={(v) => { setIsOpen(v); if (!v) reset(); }}>
      <DialogTrigger
        render={
          <Button className="rounded-xl font-bold h-10 px-5 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200 text-sm gap-2">
            <UserPlus className="h-4 w-4" />
            Novo Usuário ADM
          </Button>
        }
      />
      <DialogContent className="sm:max-w-lg w-[95vw] bg-white rounded-[2rem] border-none shadow-2xl p-0 overflow-hidden flex flex-col max-h-[90vh]">
        <div className="bg-slate-900 p-8 text-white flex-shrink-0">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-1">
              <div className="h-10 w-10 rounded-xl bg-blue-500 flex items-center justify-center">
                <UserPlus className="h-5 w-5 text-white" />
              </div>
              <DialogTitle className="text-xl font-black text-white">Novo Administrador</DialogTitle>
            </div>
            <DialogDescription className="text-slate-400 font-medium">
              Crie uma conta de acesso ao painel administrativo.
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-5">
          {/* Dados básicos */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="font-bold text-slate-700">Nome completo</Label>
              <Input
                placeholder="Ex: João Souza"
                className="h-12 bg-slate-50 border-slate-200 rounded-xl font-medium"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label className="font-bold text-slate-700">E-mail</Label>
              <Input
                type="email"
                placeholder="usuario@cevan.com.br"
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
          </div>

          {/* Nível de acesso */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <Label className="font-bold text-slate-700 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-blue-500" /> Nível de Acesso
            </Label>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setIsMaster(true)}
                className={`p-3 rounded-xl border-2 text-left transition-all ${
                  isMaster
                    ? "border-blue-500 bg-blue-50"
                    : "border-slate-200 bg-slate-50 hover:border-slate-300"
                }`}
              >
                <p className="text-xs font-black text-slate-900">Acesso Total</p>
                <p className="text-[10px] text-slate-500 font-medium mt-0.5">Todas as abas</p>
              </button>
              <button
                type="button"
                onClick={() => setIsMaster(false)}
                className={`p-3 rounded-xl border-2 text-left transition-all ${
                  !isMaster
                    ? "border-blue-500 bg-blue-50"
                    : "border-slate-200 bg-slate-50 hover:border-slate-300"
                }`}
              >
                <p className="text-xs font-black text-slate-900">Acesso Restrito</p>
                <p className="text-[10px] text-slate-500 font-medium mt-0.5">Escolher abas</p>
              </button>
            </div>

            {!isMaster && (
              <div className="space-y-4 pt-1">
                {GROUPS.map((group) => {
                  const groupItems = PERMISSION_OPTIONS.filter((p) => p.group === group);
                  const allChecked = groupItems.every((p) => selected.has(p.key));
                  return (
                    <div key={group} className="space-y-2">
                      <button
                        type="button"
                        onClick={() => toggleGroup(group)}
                        className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-700 transition-colors"
                      >
                        <div className={`h-3.5 w-3.5 rounded border-2 flex items-center justify-center transition-all ${allChecked ? "bg-blue-500 border-blue-500" : "border-slate-300"}`}>
                          {allChecked && <div className="h-1.5 w-1.5 bg-white rounded-sm" />}
                        </div>
                        {group}
                      </button>
                      <div className="grid grid-cols-2 gap-2 pl-1">
                        {groupItems.map((perm) => (
                          <label
                            key={perm.key}
                            className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-slate-50 transition-colors"
                          >
                            <input
                              type="checkbox"
                              className="h-4 w-4 rounded border-slate-300 text-blue-600 accent-blue-600"
                              checked={selected.has(perm.key)}
                              onChange={() => togglePermission(perm.key)}
                            />
                            <span className="text-xs font-medium text-slate-700">{perm.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="p-6 bg-slate-50 border-t border-slate-100 gap-3 flex-shrink-0">
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
            disabled={isPending || !name || !email || !password || (!isMaster && selected.size === 0)}
            className="rounded-xl font-black h-11 px-8 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200 uppercase text-xs tracking-widest"
          >
            {isPending ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <UserPlus className="h-4 w-4 mr-2" />}
            {isPending ? "Criando..." : "Criar Administrador"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
