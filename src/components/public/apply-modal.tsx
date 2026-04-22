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
  Loader2
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
    // Simular envio
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(val) => {
      setIsOpen(val);
      if (!val) setIsSuccess(false); // Reset ao fechar
    }}>
      <DialogTrigger 
        render={
          <Button className="rounded-xl h-12 w-12 p-0 group-hover:bg-primary group-hover:text-white transition-all shadow-sm border border-slate-200 bg-white text-slate-400">
            <ChevronRight className="h-6 w-6" />
          </Button>
        }
      />
      <DialogContent className="sm:max-w-md w-[95vw] bg-white rounded-[2.5rem] border-none shadow-2xl p-0 overflow-hidden text-center">
        {!isSuccess ? (
          <>
            <div className="bg-slate-50 p-10 border-b border-slate-100">
              <div className="mx-auto h-20 w-20 rounded-[2rem] bg-white shadow-xl flex items-center justify-center text-primary border border-slate-100 mb-6">
                <Briefcase className="h-10 w-10" />
              </div>
              <DialogHeader>
                <DialogTitle className="text-2xl font-black text-slate-900 leading-tight">Confirmar Candidatura</DialogTitle>
                <DialogDescription className="text-slate-500 font-medium">
                  Você está se candidatando para <strong>{jobTitle}</strong> na <strong>{companyName}</strong>.
                </DialogDescription>
              </DialogHeader>
            </div>

            <div className="p-8 space-y-6">
              <div className="space-y-4">
                <div className="flex items-start gap-4 text-left p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <ShieldCheck className="h-5 w-5 text-green-500 mt-1 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-slate-900">Seu currículo será enviado</p>
                    <p className="text-[10px] text-slate-500">Usaremos o currículo cadastrado no seu perfil.</p>
                  </div>
                </div>
                {isManaged && (
                  <div className="flex items-start gap-4 text-left p-4 rounded-2xl bg-primary/5 border border-primary/10">
                    <Zap className="h-5 w-5 text-primary mt-1 shrink-0 fill-primary" />
                    <div>
                      <p className="text-xs font-bold text-primary uppercase">Vaga com Curadoria</p>
                      <p className="text-[10px] text-primary/70">Esta vaga é gerenciada pela Cevan Serviços Empresariais. Teremos um cuidado especial com seu perfil.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <DialogFooter className="p-8 bg-slate-50 border-t border-slate-100 gap-3 sm:flex-col">
              <Button 
                disabled={isSubmitting}
                onClick={handleApply}
                className="w-full rounded-2xl h-14 font-black uppercase text-xs tracking-widest shadow-xl shadow-primary/20"
              >
                {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : "Confirmar e Enviar"}
              </Button>
              <Button 
                variant="ghost" 
                className="w-full rounded-xl font-bold h-10" 
                onClick={() => setIsOpen(false)}
              >
                Voltar
              </Button>
            </DialogFooter>
          </>
        ) : (
          <div className="p-12 space-y-6 animate-in fade-in zoom-in duration-500">
            <div className="mx-auto h-24 w-24 rounded-[2.5rem] bg-green-500 shadow-xl shadow-green-200 flex items-center justify-center text-white scale-110">
              <CheckCircle2 className="h-12 w-12" />
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-black text-slate-900">Sucesso!</h3>
              <p className="text-slate-500 font-medium">Sua candidatura foi enviada. Boa sorte no processo!</p>
            </div>
            <Button 
              onClick={() => setIsOpen(false)}
              className="w-full rounded-2xl h-14 font-black uppercase text-xs tracking-widest bg-green-600 hover:bg-green-700 shadow-xl shadow-green-200 mt-4"
            >
              Concluído
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
