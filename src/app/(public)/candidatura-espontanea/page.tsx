import type { Metadata } from "next";
import { TalentBankForm } from "@/components/public/talent-bank-form";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Users, Zap, ShieldCheck, Clock, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Banco de Talentos | Cevan Serviços Empresariais",
  description: "Não encontrou a vaga ideal? Cadastre seu currículo no banco de talentos da Cevan e seja encontrado pelas melhores empresas do Maranhão.",
  alternates: { canonical: "/candidatura-espontanea" },
};

const BENEFITS = [
  {
    icon: Zap,
    title: "Visibilidade Imediata",
    desc: "Seu perfil entra imediatamente no radar dos nossos consultores de RH.",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: Users,
    title: "Acesso a Empresas Exclusivas",
    desc: "Conectamos você a empresas que buscam talentos mesmo sem vaga aberta.",
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
  {
    icon: ShieldCheck,
    title: "Processo Transparente",
    desc: "Você é notificado assim que surgir uma oportunidade compatível com seu perfil.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    icon: Clock,
    title: "Sem Prazo de Validade",
    desc: "Seu currículo fica ativo no banco enquanto você não solicitar a remoção.",
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
];

export default async function TalentBankPage() {
  const talentCount = await prisma.application.count({ where: { jobId: null } });

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFBFC] font-sans mt-24">

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#f0f5ff] via-white to-[#e8f0fe] py-20 lg:py-32 border-b border-blue-100/60 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <Badge className="bg-blue-600/10 text-blue-600 border-none rounded-full px-4 py-1.5 font-black mb-6 uppercase tracking-[0.2em] text-[9px] sm:text-[10px]">
            Banco de Talentos
          </Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-6 tracking-tighter leading-tight">
            Não encontrou a vaga ideal?<br />
            <span className="text-[#1967D2]">Fique no nosso radar.</span>
          </h1>
          <p className="text-slate-500 font-medium text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-8">
            Cadastre seu currículo e nossos consultores entrarão em contato quando surgir uma oportunidade alinhada ao seu perfil — mesmo antes de ela ser publicada.
          </p>
          {talentCount > 0 && (
            <div className="inline-flex items-center gap-2 bg-white border border-slate-100 rounded-full px-4 py-2 shadow-sm">
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-bold text-slate-600">
                {talentCount} {talentCount === 1 ? "profissional cadastrado" : "profissionais cadastrados"}
              </span>
            </div>
          )}
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Left — benefits + form */}
          <div className="space-y-10">
            {/* Benefits */}
            <div className="space-y-4">
              <h2 className="text-xl font-black text-slate-900">Por que se cadastrar?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {BENEFITS.map((b) => (
                  <div key={b.title} className="flex gap-3 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
                    <div className={`h-9 w-9 rounded-xl ${b.bg} flex items-center justify-center shrink-0`}>
                      <b.icon className={`h-4 w-4 ${b.color}`} />
                    </div>
                    <div>
                      <p className="text-[12px] font-black text-slate-900 mb-0.5">{b.title}</p>
                      <p className="text-[11px] text-slate-500 leading-relaxed">{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* How it works */}
            <div className="space-y-4">
              <h2 className="text-xl font-black text-slate-900">Como funciona</h2>
              <ol className="space-y-3">
                {[
                  "Você preenche o formulário e envia seu currículo em PDF",
                  "Nossa equipe analisa seu perfil e cadastra no banco de talentos",
                  "Quando surgir uma vaga compatível, entraremos em contato",
                  "Você participa do processo seletivo com suporte da Cevan",
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-[#1967D2] text-white flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">
                      {i + 1}
                    </div>
                    <p className="text-[13px] text-slate-600 font-medium leading-relaxed">{step}</p>
                  </li>
                ))}
              </ol>
            </div>

            {/* Link to active jobs */}
            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-between gap-4">
              <div>
                <p className="text-[11px] font-black text-blue-800 uppercase tracking-wider mb-0.5">Prefere uma vaga específica?</p>
                <p className="text-[12px] text-blue-600 font-medium">Veja todas as nossas oportunidades abertas agora.</p>
              </div>
              <Link
                href="/jobs"
                className="shrink-0 inline-flex items-center gap-1.5 text-[11px] font-black text-[#1967D2] hover:text-blue-800 transition-colors whitespace-nowrap"
              >
                Ver vagas
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Right — form */}
          <div className="lg:sticky lg:top-28">
            <Card className="p-6 sm:p-8 rounded-3xl border-slate-100 shadow-[0_8px_40px_rgba(0,0,0,0.06)]">
              <div className="mb-6 space-y-1">
                <h2 className="text-xl font-black text-slate-900">Envie seu currículo</h2>
                <p className="text-[12px] text-slate-400 font-medium">Preencha os campos abaixo — leva menos de 2 minutos.</p>
              </div>
              <TalentBankForm />
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
}
