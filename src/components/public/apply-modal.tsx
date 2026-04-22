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
import { 
  CheckCircle2, 
  ChevronRight, 
  Briefcase, 
  ShieldCheck,
  Zap,
  Loader2,
  Building2
} from "lucide-react";

interface ApplyModalProps {
  jobTitle: string;
  companyName: string;
  isManaged?: boolean;
}

export function ApplyModal({ jobTitle, companyName, isManaged }: ApplyModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleApply = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(val) => {
      setIsOpen(val);
      if (!val) setIsSuccess(false);
    }}>
      <DialogTrigger 
        nativeButton={false}
        render={
          <Button className="rounded-lg h-9 w-9 p-0 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm border border-slate-200 bg-white text-slate-400">
            <ChevronRight className="h-4 w-4" />
          </Button>
        }
      />
      <DialogContent className="sm:max-w-[400px] w-[95vw] bg-white rounded-2xl border-none shadow-2xl p-0 overflow-hidden">
        {!isSuccess ? (
          <>
            <div className="bg-slate-50 p-6 border-b border-slate-100 text-center">
              <div className="mx-auto h-14 w-14 rounded-xl bg-white shadow-sm flex items-center justify-center text-blue-600 border border-slate-200 mb-4">
                <Briefcase className="h-7 w-7" />
              </div>
              <DialogHeader>
                <DialogTitle className="text-xl font-black text-slate-900 leading-tight">Confirmar Candidatura</DialogTitle>
                <DialogDescription className="text-slate-500 font-medium text-xs mt-1">
                  Você está enviando seu perfil para a vaga de <span className="text-slate-900 font-bold">{jobTitle}</span> na <span className="text-slate-900 font-bold">{companyName}</span>.
                </DialogDescription>
              </DialogHeader>
            </div>

            <div className="p-5 space-y-4">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <div className="p-1.5 bg-emerald-50 rounded-lg">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-900 leading-none">Perfil e Currículo</p>
                  <p className="text-[10px] text-slate-500 mt-1 font-medium leading-relaxed">Seu currículo cadastrado e dados do perfil serão enviados para triagem.</p>
                </div>
              </div>

              {isManaged && (
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-blue-50 border border-blue-100">
                  <div className="p-1.5 bg-blue-100 rounded-lg">
                    <Zap className="h-4 w-4 text-blue-600 fill-blue-600" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-blue-900 leading-none uppercase tracking-widest">Curadoria Ativa</p>
                    <p className="text-[10px] text-blue-700 mt-1 font-medium leading-relaxed">Esta vaga conta com suporte da Cevan RH. Teremos um cuidado especial na sua avaliação.</p>
                  </div>
                </div>
              )}
            </div>

            <DialogFooter className="p-5 bg-slate-50 border-t border-slate-100 flex-col gap-2 sm:flex-col">
              <Button 
                disabled={isSubmitting}
                onClick={handleApply}
                className="w-full rounded-xl h-11 font-black uppercase text-[10px] tracking-widest shadow-lg shadow-blue-900/10 bg-blue-600 hover:bg-blue-700 text-white transition-all"
              >
                {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Confirmar e Enviar"}
              </Button>
              <Button 
                variant="ghost" 
                className="w-full rounded-lg font-bold h-9 text-slate-500 text-[10px] uppercase tracking-widest" 
                onClick={() => setIsOpen(false)}
              >
                Cancelar
              </Button>
            </DialogFooter>
          </>
        ) : (
          <div className="p-10 text-center space-y-5 animate-in fade-in zoom-in duration-500">
            <div className="mx-auto h-16 w-16 rounded-2xl bg-emerald-500 shadow-lg shadow-emerald-200 flex items-center justify-center text-white">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-black text-slate-900">Sucesso!</h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed px-4">Sua candidatura foi enviada. Agora é só aguardar o retorno da empresa.</p>
            </div>
            <Button 
              onClick={() => setIsOpen(false)}
              className="w-full rounded-xl h-11 font-black uppercase text-[10px] tracking-widest bg-slate-900 hover:bg-slate-800 text-white shadow-lg transition-all"
            >
              Concluído
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

