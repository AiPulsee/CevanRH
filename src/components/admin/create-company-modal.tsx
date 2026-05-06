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
import { Building2, Plus, Loader2 } from "lucide-react";
import { createCompany } from "@/actions/companies";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

export function CreateCompanyModal() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [industry, setIndustry] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = () => {
    startTransition(async () => {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("description", description);
      formData.append("industry", industry);
      formData.append("location", location);

      const result = await createCompany({}, formData);
      if (result.success) {
        setIsOpen(false);
        setName("");
        setEmail("");
        router.refresh();
      } else {
        alert(result.error || "Erro ao criar empresa");
      }
    });
  };

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
      <DialogContent className="sm:max-w-xl w-[95vw] bg-white rounded-[1.5rem] sm:rounded-[2.5rem] border-none shadow-2xl p-0 overflow-hidden max-h-[95vh] overflow-y-auto">
        <div className="bg-slate-900 p-6 sm:p-10 text-white flex-shrink-0">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-blue-500 flex items-center justify-center shrink-0">
                <Building2 className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <DialogTitle className="text-xl sm:text-2xl font-black">Cadastrar Empresa</DialogTitle>
            </div>
            <DialogDescription className="text-slate-400 text-xs sm:text-sm font-medium">
              Registre um novo cliente corporativo no sistema.
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="font-bold text-slate-700">Nome da Empresa</Label>
              <Input 
                id="name" 
                placeholder="Ex: Acme Corp" 
                className="h-12 bg-slate-50 border-slate-200 rounded-xl font-bold" 
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="font-bold text-slate-700">E-mail de Contato</Label>
              <Input 
                id="email" 
                type="email"
                placeholder="contato@empresa.com.br" 
                className="h-12 bg-slate-50 border-slate-200 rounded-xl font-bold text-blue-600" 
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="industry" className="font-bold text-slate-700">Setor / Indústria</Label>
                <Input 
                  id="industry" 
                  placeholder="Ex: Tecnologia" 
                  className="h-12 bg-slate-50 border-slate-200 rounded-xl"
                  value={industry}
                  onChange={e => setIndustry(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location" className="font-bold text-slate-700">Sede (Cidade/UF)</Label>
                <Input 
                  id="location" 
                  placeholder="Ex: São José dos Campos/SP" 
                  className="h-12 bg-slate-50 border-slate-200 rounded-xl"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="font-bold text-slate-700">Descrição da Empresa</Label>
              <textarea 
                id="description" 
                placeholder="Conte sobre a empresa..." 
                className="w-full min-h-[100px] p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500/20 outline-none"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between p-5 rounded-3xl bg-indigo-50 border border-indigo-100 mt-2">
              <div className="space-y-0.5">
                <Label className="text-sm font-bold text-indigo-900 leading-none">Curadoria Ativa</Label>
                <p className="text-[10px] text-indigo-600/70 font-medium">Equipe Cevan gerencia os candidatos desta empresa.</p>
              </div>
              <select className="h-10 px-4 rounded-xl border border-indigo-200 bg-white text-[10px] font-black uppercase outline-none focus:ring-2 focus:ring-indigo-500/20 shadow-sm">
                <option value="false">Não</option>
                <option value="true" selected>Sim</option>
              </select>
            </div>
          </div>
        </div>

        <DialogFooter className="p-8 bg-slate-50 border-t border-slate-100 gap-3">
          <Button variant="ghost" className="rounded-xl font-bold h-12 px-8" onClick={() => setIsOpen(false)} disabled={isPending}>Cancelar</Button>
          <Button 
            onClick={handleSubmit}
            disabled={isPending || !name || !email}
            className="rounded-xl font-black h-12 px-10 bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-200 uppercase text-xs tracking-widest"
          >
            {isPending ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Plus className="h-4 w-4 mr-2" />}
            {isPending ? "Criando..." : "Criar Registro"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
