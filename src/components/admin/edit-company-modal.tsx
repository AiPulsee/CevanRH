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
import { Building2, Pencil, Loader2, Save } from "lucide-react";
import { updateCompany } from "@/actions/companies";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Company = {
  id: string;
  name: string;
  email: string | null;
  description: string | null;
  industry: string | null;
  location: string | null;
};

export function EditCompanyModal({ company }: { company: Company }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  const [name, setName] = useState(company.name);
  const [email, setEmail] = useState(company.email ?? "");
  const [description, setDescription] = useState(company.description ?? "");
  const [industry, setIndustry] = useState(company.industry ?? "");
  const [location, setLocation] = useState(company.location ?? "");

  function handleSave() {
    startTransition(async () => {
      const result = await updateCompany(company.id, {
        name,
        email: email || null,
        description: description || undefined,
        industry: industry || undefined,
        location: location || undefined,
      });

      if (result.success) {
        toast.success("Empresa atualizada com sucesso!");
        setIsOpen(false);
        router.refresh();
      } else {
        toast.error(result.error || "Erro ao atualizar empresa.");
      }
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-lg hover:bg-blue-50 hover:text-blue-600"
          >
            <Pencil className="h-4 w-4" />
          </Button>
        }
      />
      <DialogContent className="sm:max-w-xl w-[95vw] bg-white rounded-[1.5rem] sm:rounded-[2rem] border-none shadow-2xl p-0 overflow-hidden max-h-[95vh] overflow-y-auto">
        <div className="bg-slate-900 p-6 sm:p-8 text-white flex-shrink-0">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-1">
              <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-blue-500 flex items-center justify-center shrink-0">
                <Building2 className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <DialogTitle className="text-lg sm:text-xl font-black text-white">Editar Empresa</DialogTitle>
            </div>
            <DialogDescription className="text-slate-400 text-xs sm:text-sm font-medium mt-0.5">
              Atualize os dados do cliente corporativo.
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-6 sm:p-8 space-y-5">
          <div className="space-y-2">
            <Label className="font-bold text-slate-700">Nome da Empresa</Label>
            <Input
              className="h-12 bg-slate-50 border-slate-200 rounded-xl font-bold"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label className="font-bold text-slate-700">E-mail de Contato</Label>
            <Input
              type="email"
              placeholder="contato@empresa.com.br"
              className="h-12 bg-slate-50 border-slate-200 rounded-xl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="font-bold text-slate-700">Setor / Indústria</Label>
              <Input
                placeholder="Ex: Tecnologia"
                className="h-12 bg-slate-50 border-slate-200 rounded-xl"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label className="font-bold text-slate-700">Sede (Cidade/UF)</Label>
              <Input
                placeholder="Ex: Goiânia/GO"
                className="h-12 bg-slate-50 border-slate-200 rounded-xl"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="font-bold text-slate-700">Descrição</Label>
            <textarea
              placeholder="Sobre a empresa..."
              className="w-full min-h-[90px] p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500/20 outline-none resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
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
            onClick={handleSave}
            disabled={isPending || !name}
            className="rounded-xl font-black h-11 px-8 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200 uppercase text-xs tracking-widest"
          >
            {isPending ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            {isPending ? "Salvando..." : "Salvar Alterações"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
