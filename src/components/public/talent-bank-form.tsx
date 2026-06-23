"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ResumeUpload } from "@/components/forms/resume-upload";
import { joinTalentBank } from "@/actions/applications";
import { ShieldCheck, ArrowUpRight, Loader2, CheckCircle2 } from "lucide-react";

export function TalentBankForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = !!resumeUrl && !!name.trim() && !!email.trim() && !isSubmitting;

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setIsSubmitting(true);
    setError(null);

    const result = await joinTalentBank({
      name: name.trim(),
      email: email.trim(),
      resumeUrl: resumeUrl!,
      coverLetter: coverLetter.trim() || undefined,
    });

    if (result.success) {
      setIsSuccess(true);
    } else {
      setError((result as any).error ?? "Erro desconhecido.");
    }
    setIsSubmitting(false);
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center gap-6 py-10 text-center">
        <div className="h-20 w-20 rounded-full bg-emerald-500 flex items-center justify-center shadow-xl shadow-emerald-200">
          <CheckCircle2 className="h-10 w-10 text-white" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-black text-slate-900">Currículo Recebido!</h3>
          <p className="text-slate-500 font-medium max-w-sm mx-auto">
            Obrigado, <span className="font-bold text-slate-700">{name.split(" ")[0]}</span>! Seu perfil foi adicionado ao nosso banco de talentos. Entraremos em contato quando surgir uma oportunidade alinhada ao seu perfil.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Nome Completo *
          </Label>
          <Input
            placeholder="Ex: Maria Silva"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-12 rounded-xl border-slate-200 focus:border-blue-500"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            E-mail *
          </Label>
          <Input
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 rounded-xl border-slate-200 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
          Apresentação{" "}
          <span className="normal-case font-normal text-slate-400">(opcional)</span>
        </Label>
        <Textarea
          placeholder="Conte um pouco sobre você, sua área de atuação e o tipo de oportunidade que busca..."
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
          maxLength={1000}
          className="resize-none min-h-[100px] rounded-xl border-slate-200 focus:border-blue-500 text-sm"
        />
        {coverLetter.length > 0 && (
          <p className="text-[10px] text-slate-400 text-right">{coverLetter.length}/1000</p>
        )}
      </div>

      <div>
        <Label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
          Currículo (PDF) *
        </Label>
        <ResumeUpload onUploadComplete={(url) => setResumeUrl(url)} variant="light" />
      </div>

      {error && (
        <p className="text-[11px] text-rose-600 font-bold text-center bg-rose-50 border border-rose-100 rounded-xl py-3">
          {error}
        </p>
      )}

      <Button
        onClick={handleSubmit}
        disabled={!canSubmit}
        className="w-full h-14 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] bg-[#1967D2] hover:bg-blue-700 text-white shadow-lg shadow-blue-200 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
      >
        {isSubmitting ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <>
            Enviar para o Banco de Talentos
            <ArrowUpRight className="ml-2 h-5 w-5" />
          </>
        )}
      </Button>

      <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
        <ShieldCheck className="h-3.5 w-3.5 text-blue-400" />
        Seus dados são protegidos e nunca compartilhados sem consentimento
      </div>
    </div>
  );
}
