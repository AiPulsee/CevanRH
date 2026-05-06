"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShieldCheck, ArrowUpRight, Loader2, Zap } from "lucide-react";
import { ResumeUpload } from "@/components/forms/resume-upload";
import { JobType } from "@prisma/client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { applyToJob } from "@/actions/applications";

interface JobApplicationFormProps {
  jobId: string;
  jobType: JobType;
}

export function JobApplicationForm({ jobId, jobType }: JobApplicationFormProps) {
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleApply = async () => {
    if (!resumeUrl || !name || !email) return;
    
    setIsSubmitting(true);
    setError(null);
    
    const result = await applyToJob({
      jobId,
      name,
      email,
      resumeUrl,
    });

    if (result.success) {
      setIsSuccess(true);
    } else {
      setError(result.error || "Erro desconhecido");
    }
    
    setIsSubmitting(false);
  };

  if (isSuccess) {
    return (
      <Card className="p-8 rounded-2xl bg-emerald-50 text-emerald-900 border-emerald-100 text-center space-y-4">
        <div className="mx-auto h-16 w-16 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-lg">
          <ShieldCheck className="h-8 w-8" />
        </div>
        <h3 className="text-xl font-black">Candidatura Enviada!</h3>
        <p className="text-sm font-medium text-emerald-700">Boa sorte, {name.split(' ')[0]}! Seu perfil foi enviado com sucesso para esta vaga.</p>
      </Card>
    );
  }

  return (
    <Card className="p-8 rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 shadow-2xl shadow-blue-900/40 text-white space-y-6 border-none relative overflow-hidden group">
      {/* Elementos decorativos de fundo */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-600/20 transition-all duration-700" />
      
      <div className="space-y-3 text-center relative z-10">
        <div className="inline-flex items-center justify-center p-2 bg-blue-500/10 rounded-full mb-1">
          <Zap className="h-4 w-4 text-blue-400 fill-blue-400" />
        </div>
        <h3 className="text-2xl font-black leading-tight text-white tracking-tight">Candidatar-se</h3>
        <p className="text-[11px] text-slate-400 font-medium leading-relaxed max-w-[280px] mx-auto">
          {jobType === "MANAGED" 
            ? "Vaga com curadoria Cevan. Seu currículo será analisado por nossos especialistas."
            : "Sua candidatura será enviada para o RH da empresa parceira."}
        </p>
      </div>
      
      <div className="space-y-4 relative z-10">
        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label className="text-[10px] font-bold uppercase text-slate-400 ml-1">Nome Completo</Label>
            <Input 
              placeholder="Ex: João Silva" 
              className="h-12 bg-white/10 border-white/10 rounded-xl text-white placeholder:text-slate-400/50 focus:bg-white/20 font-medium"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-[10px] font-bold uppercase text-slate-400 ml-1">E-mail</Label>
            <Input 
              type="email"
              placeholder="seu@email.com" 
              className="h-12 bg-white/10 border-white/10 rounded-xl text-white placeholder:text-slate-400/50 focus:bg-white/20 font-medium"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="p-0.5 rounded-[1.5rem] bg-gradient-to-b from-white/10 to-transparent">
          <ResumeUpload onUploadComplete={(url) => setResumeUrl(url)} variant="dark" />
        </div>
        
        {error && (
          <p className="text-[10px] text-rose-400 font-bold text-center bg-rose-400/10 py-2 rounded-lg">
            {error}
          </p>
        )}

        <Button 
          onClick={handleApply}
          disabled={!resumeUrl || !name || !email || isSubmitting}
          className={`w-full h-14 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all duration-500 ${
            resumeUrl && name && email
              ? "bg-blue-600 text-white hover:bg-blue-500 shadow-[0_10px_30px_rgba(37,99,235,0.4)]" 
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
      
      <div className="pt-2 relative z-10 flex flex-col items-center gap-3">
        <div className="flex items-center gap-2 text-[10px] text-slate-500 uppercase tracking-widest font-black">
          <ShieldCheck className="h-3.5 w-3.5 text-blue-500/50" />
          Dados Protegidos
        </div>
      </div>
    </Card>
  );
}
