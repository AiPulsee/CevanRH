"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  Mail, 
  Globe, 
  Calendar,
  CheckCircle2,
  XCircle,
  FileText,
  Users
} from "lucide-react";

interface ReviewCompanyModalProps {
  company: {
    name: string;
    slug: string;
    plan: string;
    requestDate: string;
  };
}

export function ReviewCompanyModal({ company }: ReviewCompanyModalProps) {
  return (
    <Dialog>
      <DialogTrigger nativeButton={true}>
        <Button variant="outline" className="rounded-lg border-amber-200 text-amber-700 bg-amber-50 hover:bg-amber-100 font-bold h-9 text-xs">
          Revisar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] rounded-2xl border-none shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-black text-slate-900">Revisar Solicitação</DialogTitle>
          <DialogDescription className="text-slate-500 font-medium">
            Analise os dados da empresa antes de aprovar o acesso à plataforma.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
            <div className="h-12 w-12 rounded-lg bg-white flex items-center justify-center border border-slate-200 shadow-sm">
              <Building2 className="h-6 w-6 text-slate-400" />
            </div>
            <div>
              <h4 className="font-black text-slate-900">{company.name}</h4>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">/{company.slug}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                <Mail className="h-3 w-3" /> E-mail de Contato
              </p>
              <p className="text-sm font-bold text-slate-700">contato@{company.slug}.com</p>
            </div>
            <div className="space-y-1.5">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                <Globe className="h-3 w-3" /> Website
              </p>
              <p className="text-sm font-bold text-blue-600 underline">www.{company.slug}.com</p>
            </div>
            <div className="space-y-1.5">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                <Calendar className="h-3 w-3" /> Data do Pedido
              </p>
              <p className="text-sm font-bold text-slate-700">{company.requestDate}</p>
            </div>
            <div className="space-y-1.5">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                <FileText className="h-3 w-3" /> Plano Pretendido
              </p>
              <Badge variant="outline" className="rounded-md border-amber-200 text-amber-700 bg-amber-50 text-[10px] font-black">
                {company.plan}
              </Badge>
            </div>
          </div>

          <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 flex items-start gap-3">
            <div className="p-2 bg-white rounded-lg border border-blue-200">
              <Users className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <p className="text-xs font-black text-blue-900">Verificação de Compliance</p>
              <p className="text-[10px] text-blue-700 font-medium mt-0.5 leading-relaxed">
                Nenhuma irregularidade encontrada no CNPJ vinculado. Empresa elegível para o plano selecionado.
              </p>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="ghost" className="rounded-xl font-bold text-slate-500 hover:text-rose-600 hover:bg-rose-50 h-11">
            <XCircle className="h-4 w-4 mr-2" /> Rejeitar
          </Button>
          <Button className="rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black h-11 px-6 shadow-lg shadow-emerald-900/10 transition-all">
            <CheckCircle2 className="h-4 w-4 mr-2" /> Aprovar Empresa
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
