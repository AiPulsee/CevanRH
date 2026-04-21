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
import { Textarea } from "@/components/ui/textarea";
import { 
  Plus, 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Zap,
  Info
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function CreateJobModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger 
        render={
          <Button className="rounded-xl font-bold shadow-lg shadow-primary/20">
            <Plus className="h-4 w-4 mr-2" />
            Criar Nova Vaga
          </Button>
        }
      />
      <DialogContent className="sm:max-w-4xl w-[95vw] bg-white rounded-[2.5rem] border-none shadow-2xl p-0 overflow-hidden">
        <div className="bg-primary p-10 text-white relative overflow-hidden">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <DialogTitle className="text-2xl font-black">Nova Oportunidade</DialogTitle>
            </div>
            <DialogDescription className="text-white/80 font-medium">
              Preencha os detalhes abaixo para publicar sua vaga no CevanRH.
            </DialogDescription>
          </DialogHeader>
          <div className="absolute -bottom-12 -right-12 h-40 w-40 bg-white/10 rounded-full blur-3xl" />
        </div>

        <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="title" className="font-bold text-slate-700">Título da Vaga</Label>
              <Input id="title" placeholder="Ex: Senior Frontend Engineer" className="h-12 bg-slate-50 border-slate-200 rounded-xl" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type" className="font-bold text-slate-700">Tipo de Contrato</Label>
              <select id="type" className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none">
                <option>Tempo Integral (CLT)</option>
                <option>PJ / Contractor</option>
                <option>Meio Período</option>
                <option>Estágio</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="font-bold text-slate-700">Localização</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input id="location" placeholder="Remoto ou Cidade" className="h-12 pl-10 bg-slate-50 border-slate-200 rounded-xl" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="salary" className="font-bold text-slate-700">Faixa Salarial (Opcional)</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input id="salary" placeholder="Ex: R$ 10k - 15k" className="h-12 pl-10 bg-slate-50 border-slate-200 rounded-xl" />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="font-bold text-slate-700">Modelo de Recrutamento</Label>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 rounded-xl border-2 border-primary bg-primary/5 cursor-pointer relative overflow-hidden group">
                  <p className="text-xs font-black text-primary uppercase tracking-tighter">Curadoria Cevan</p>
                  <p className="text-[10px] text-primary/70 leading-tight">Nós fazemos a triagem</p>
                  <Zap className="absolute -right-2 -bottom-2 h-8 w-8 text-primary/10 fill-primary/10" />
                </div>
                <div className="p-3 rounded-xl border border-slate-200 bg-white cursor-pointer hover:border-slate-300 transition-all">
                  <p className="text-xs font-black text-slate-400 uppercase tracking-tighter">Autônomo</p>
                  <p className="text-[10px] text-slate-400 leading-tight">Você faz a triagem</p>
                </div>
              </div>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description" className="font-bold text-slate-700">Descrição e Requisitos</Label>
              <Textarea 
                id="description" 
                placeholder="Descreva as responsabilidades e o que você busca no candidato..." 
                className="min-h-[150px] bg-slate-50 border-slate-200 rounded-xl resize-none"
              />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100 flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-500 mt-0.5" />
            <p className="text-xs text-blue-700 leading-relaxed font-medium">
              Ao escolher o modelo <span className="font-bold uppercase">Curadoria Cevan</span>, seu crédito de curadoria será consumido após a aprovação da vaga por nossa equipe interna.
            </p>
          </div>
        </div>

        <DialogFooter className="p-8 bg-slate-50 border-t border-slate-100 gap-3">
          <Button variant="ghost" className="rounded-xl font-bold h-12 px-8" onClick={() => setIsOpen(false)}>Cancelar</Button>
          <Button className="rounded-xl font-black h-12 px-10 shadow-xl shadow-primary/20 uppercase text-xs tracking-widest">
            Publicar Vaga
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
