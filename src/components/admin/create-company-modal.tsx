"use client";

import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, Globe, ShieldCheck, Plus } from "lucide-react";

export function CreateCompanyModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger 
        render={
          <Button className="rounded-xl font-bold h-12 px-6 bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200">
            <Plus className="h-4 w-4 mr-2" />
            Nova Empresa
          </Button>
        }
      />
      <DialogContent className="sm:max-w-xl w-[95vw] bg-white rounded-[2.5rem] border-none shadow-2xl p-0 overflow-hidden">
        <div className="bg-slate-900 p-10 text-white">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 rounded-xl bg-blue-500 flex items-center justify-center">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <DialogTitle className="text-2xl font-black">Cadastrar Empresa</DialogTitle>
            </div>
            <DialogDescription className="text-slate-400 font-medium">
              Registre um novo cliente corporativo no sistema.
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-8 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="font-bold text-slate-700">Nome da Empresa</Label>
              <Input id="name" placeholder="Ex: Acme Corp" className="h-12 bg-slate-50 border-slate-200 rounded-xl" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug" className="font-bold text-slate-700">Slug / URL</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">cevan.com.br/</span>
                <Input id="slug" placeholder="acme" className="h-12 pl-[90px] bg-slate-50 border-slate-200 rounded-xl text-sm" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="plan" className="font-bold text-slate-700">Plano Inicial</Label>
              <select id="plan" className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 text-sm font-bold focus:ring-2 focus:ring-blue-500/20 outline-none">
                <option>FREE</option>
                <option selected>PRO</option>
                <option>ENTERPRISE</option>
              </select>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100 flex items-start gap-3">
            <ShieldCheck className="h-5 w-5 text-blue-500 mt-0.5" />
            <p className="text-[10px] text-blue-700 leading-relaxed font-medium">
              Após o cadastro, um e-mail de convite será enviado automaticamente para o administrador da empresa configurado abaixo.
            </p>
          </div>
        </div>

        <DialogFooter className="p-8 bg-slate-50 border-t border-slate-100 gap-3">
          <Button variant="ghost" className="rounded-xl font-bold h-12 px-8" onClick={() => setIsOpen(false)}>Cancelar</Button>
          <Button className="rounded-xl font-black h-12 px-10 bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-200 uppercase text-xs tracking-widest">
            Criar Registro
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
