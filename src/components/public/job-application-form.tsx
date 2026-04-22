"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShieldCheck, ArrowUpRight, Loader2, Zap } from "lucide-react";
import { ResumeUpload } from "@/components/forms/resume-upload";
import { JobType } from "@prisma/client";

interface JobApplicationFormProps {
  jobId: string;
  jobType: JobType;
}

export function JobApplicationForm({ jobId, jobType }: JobApplicationFormProps) {
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleApply = async () => {
    if (!resumeUrl) return;
    
    setIsSubmitting(true);
    // Simular envio (depois podemos implementar a action real)
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <Card className="p-8 rounded-2xl bg-emerald-50 text-emerald-900 border-emerald-100 text-center space-y-4">
        <div className="mx-auto h-16 w-16 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-lg">
          <ShieldCheck className="h-8 w-8" />
        </div>
        <h3 className="text-xl font-black">Candidatura Enviada!</h3>
        <p className="text-sm font-medium text-emerald-700">Boa sorte! Seu perfil foi enviado com sucesso para esta vaga.</p>
      </Card>
    );
  }

  return (
    <Card className="p-8 rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 shadow-2xl shadow-blue-900/40 text-white space-y-8 border-none relative overflow-hidden group">
      {/* Elementos decorativos de fundo */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-600/20 transition-all duration-700" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-400/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

      <div className="space-y-3 text-center relative z-10">
        <div className="inline-flex items-center justify-center p-2 bg-blue-500/10 rounded-full mb-2">
          <Zap className="h-4 w-4 text-blue-400 fill-blue-400" />
        </div>
        <h3 className="text-2xl font-black leading-tight text-white tracking-tight">Candidatar-se Agora</h3>
        <p className="text-[12px] text-slate-400 font-medium leading-relaxed max-w-[240px] mx-auto">
          {jobType === "MANAGED" 
            ? "Vaga com curadoria exclusiva Cevan. Seu perfil será analisado por especialistas."
            : "Sua candidatura será enviada diretamente para o RH da empresa."}
        </p>
      </div>
      
      <div className="space-y-6 relative z-10">
        <div className="p-0.5 rounded-[1.5rem] bg-gradient-to-b from-white/10 to-transparent">
          <ResumeUpload onUploadComplete={(url) => setResumeUrl(url)} variant="dark" />
        </div>
        
        <Button 
          onClick={handleApply}
          disabled={!resumeUrl || isSubmitting}
          className={`w-full h-14 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all duration-500 ${
            resumeUrl 
              ? "bg-blue-600 text-white hover:bg-blue-500 shadow-[0_10px_30px_rgba(37,99,235,0.4)] hover:-translate-y-1" 
              : "bg-white/5 text-white/30 cursor-not-allowed"
          }`}
        >
          {isSubmitting ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <>
              Confirmar Candidatura
              <ArrowUpRight className="ml-2 h-5 w-5" />
            </>
          )}
        </Button>
      </div>
      
      <div className="pt-4 relative z-10">
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-2 text-[10px] text-slate-500 uppercase tracking-widest font-black">
            <ShieldCheck className="h-3.5 w-3.5 text-blue-500/50" />
            Processo 100% Seguro
          </div>
          <div className="h-1 w-12 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent rounded-full" />
        </div>
      </div>
    </Card>
  );
}
