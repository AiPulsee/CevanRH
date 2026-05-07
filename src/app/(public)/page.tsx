export const dynamic = "force-dynamic";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cevan Serviços Empresariais | Vagas de Emprego no Maranhão e Brasil",
  description: "Encontre vagas de emprego com curadoria especializada no Maranhão e em todo o Brasil. A Cevan Serviços Empresariais conecta talentos e empresas com processo seletivo personalizado.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Cevan Serviços Empresariais | Vagas de Emprego no Maranhão e Brasil",
    description: "Encontre vagas de emprego com curadoria especializada no Maranhão e em todo o Brasil.",
    url: "/",
    type: "website",
  },
};

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users, TrendingUp, ShieldCheck, ChevronRight,
  MapPin, Building2, Clock, ArrowRight, Briefcase,
  Mail, Phone, Star, CheckCircle2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

export default async function HomePage() {
  const featuredJobs = await prisma.job.findMany({
    where: { status: "ACTIVE" },
    include: { company: true },
    take: 6,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex flex-col w-full bg-[#fdfdfd] font-sans text-[#202124] selection:bg-blue-100 selection:text-blue-900">

      {/* ── HERO ── */}
      {/* Mobile: gradient background, no image. Desktop: split with photo on right */}
      <section className="relative overflow-hidden flex items-center
        pt-28 pb-16 min-h-[580px]
        lg:pt-48 lg:pb-40 lg:min-h-[750px]
        bg-gradient-to-br from-[#f0f5ff] via-white to-[#e8f0fe]
        lg:bg-transparent">

        {/* Desktop-only: subtle blob */}
        <div className="absolute top-0 left-0 w-0 lg:w-[500px] h-0 lg:h-[500px] bg-blue-50/60 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

        {/* Photo — 0 size on mobile, right half on desktop */}
        <div className="absolute top-0 right-0 w-0 h-0 lg:w-[48%] lg:h-full z-0 lg:rounded-bl-[350px] overflow-hidden lg:shadow-[-20px_0_50px_rgba(0,0,0,0.05)]">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#1967D2]/95 via-[#1967D2]/75 to-blue-400/40 mix-blend-multiply z-10" />
          <div className="absolute inset-0 bg-blue-900/10 backdrop-blur-[1px] z-10" />
          <Image src="/hero-man.png" alt="Cevan Serviços Empresariais" fill className="object-cover opacity-90 scale-105 hover:scale-110 transition-transform duration-[10000ms]" priority />
        </div>

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="w-full lg:w-[58%] pr-0 lg:pr-16 space-y-7 lg:space-y-10">

            <div className="space-y-4 lg:space-y-5 text-center lg:text-left">
              <Badge className="bg-[#1967D2]/10 text-[#1967D2] border-none rounded-full px-4 py-1.5 font-black uppercase tracking-widest text-[10px]">
                Cevan Serviços Empresariais
              </Badge>
              <h1 className="text-[2rem] sm:text-4xl md:text-5xl lg:text-[62px] font-black tracking-tight text-slate-900 leading-[1.1] lg:leading-[1.05]">
                Gestão empresarial<br />
                <span className="text-[#1967D2]">com quem entende.</span>
              </h1>
              <p className="text-slate-500 text-[15px] sm:text-lg lg:text-xl max-w-md mx-auto lg:mx-0 leading-relaxed font-medium">
                Terceirização de RH, Gestão Financeira e Estratégia Tributária — e as melhores vagas do mercado para quem busca crescer.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-sm mx-auto sm:max-w-xl lg:mx-0">
              <Link href="/servicos" className="block">
                <div className="group flex items-center gap-4 bg-[#1967D2] hover:bg-blue-700 text-white rounded-2xl p-4 lg:p-5 cursor-pointer transition-all duration-300 hover:-translate-y-1 shadow-xl shadow-blue-300/40">
                  <div className="h-10 w-10 lg:h-12 lg:w-12 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                    <Building2 className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-black text-[14px] lg:text-[15px] leading-tight">Sou Empresário</p>
                    <p className="text-blue-200 text-[11px] lg:text-[12px] font-medium mt-0.5">Ver serviços empresariais</p>
                  </div>
                  <ArrowRight className="h-4 w-4 ml-auto opacity-60 group-hover:translate-x-1 transition-transform shrink-0" />
                </div>
              </Link>
              <Link href="/jobs" className="block">
                <div className="group flex items-center gap-4 bg-white hover:bg-slate-50 text-slate-900 rounded-2xl p-4 lg:p-5 cursor-pointer transition-all duration-300 hover:-translate-y-1 shadow-lg border border-slate-200">
                  <div className="h-10 w-10 lg:h-12 lg:w-12 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                    <Briefcase className="h-5 w-5 lg:h-6 lg:w-6 text-slate-600" />
                  </div>
                  <div>
                    <p className="font-black text-[14px] lg:text-[15px] leading-tight">Busco Emprego</p>
                    <p className="text-slate-400 text-[11px] lg:text-[12px] font-medium mt-0.5">Ver vagas disponíveis</p>
                  </div>
                  <ArrowRight className="h-4 w-4 ml-auto opacity-30 group-hover:opacity-60 group-hover:translate-x-1 transition-all shrink-0" />
                </div>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ── VAGAS EM DESTAQUE ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
            <div>
              <p className="text-[11px] font-black text-[#1967D2] uppercase tracking-[0.2em] mb-1">Para Candidatos</p>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Vagas em Destaque</h2>
            </div>
            <Link href="/jobs">
              <Button variant="outline" className="h-10 px-5 rounded-xl border-slate-200 text-slate-600 font-bold text-[13px] hover:border-[#1967D2]/30 hover:text-[#1967D2] hover:bg-blue-50/40 transition-all shrink-0">
                Ver todas as vagas <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Job list */}
          {featuredJobs.length > 0 ? (
            <div className="flex flex-col divide-y divide-slate-100">
              {featuredJobs.map((job) => (
                <Link key={job.id} href={`/jobs/${job.slug}`} className="group">
                  <div className="flex items-center gap-5 py-5 hover:bg-slate-50/70 -mx-4 px-4 rounded-2xl transition-all duration-200">
                    {/* Logo */}
                    <div className={`h-12 w-12 sm:h-14 sm:w-14 rounded-2xl ${job.type === "MANAGED" ? "bg-[#1967D2]" : "bg-slate-700"} flex items-center justify-center text-white font-black text-lg shrink-0 group-hover:scale-105 transition-transform duration-300`}>
                      {job.company.logoUrl
                        ? <img src={job.company.logoUrl} alt={job.company.name} className="h-full w-full object-cover rounded-2xl" />
                        : job.company.name.charAt(0)}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4">
                        <h3 className="font-extrabold text-[15px] sm:text-[17px] text-slate-900 group-hover:text-[#1967D2] transition-colors truncate">{job.title}</h3>
                        <span className="font-black text-green-600 text-[14px] shrink-0">{job.salaryRange || "A combinar"}</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-[12px] text-slate-400 font-medium">
                        <span className="flex items-center gap-1.5"><Building2 className="h-3 w-3" />{job.company.name}</span>
                        <span className="flex items-center gap-1.5"><MapPin className="h-3 w-3" />{job.isRemote ? "Remoto" : job.location}</span>
                        <span className="flex items-center gap-1.5"><Clock className="h-3 w-3" />{formatDistanceToNow(new Date(job.createdAt), { addSuffix: true, locale: ptBR })}</span>
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="hidden sm:flex h-9 w-9 rounded-full border border-slate-100 items-center justify-center group-hover:border-[#1967D2] group-hover:bg-[#1967D2] group-hover:text-white transition-all duration-300 shrink-0">
                      <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <Briefcase className="h-10 w-10 text-slate-200 mx-auto mb-3" />
              <p className="text-slate-400 font-medium">Nenhuma vaga ativa no momento. Volte em breve!</p>
            </div>
          )}

          {/* CTA inferior */}
          {featuredJobs.length > 0 && (
            <div className="mt-8 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-slate-400 text-[13px] font-medium">
                Mostrando {featuredJobs.length} vagas em destaque
              </p>
              <Link href="/jobs">
                <Button className="h-11 px-7 rounded-xl bg-[#1967D2] hover:bg-blue-700 font-black text-[11px] uppercase tracking-widest shadow-lg shadow-blue-100 transition-all">
                  Explorar todas as vagas <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ── SERVIÇOS (dark, impactful) ── */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#1967D2] to-transparent opacity-50" />
        <div className="absolute -top-60 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#1967D2]/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
            <div className="space-y-4 max-w-xl">
              <p className="text-[11px] font-black text-[#1967D2] uppercase tracking-[0.2em]">Para Empresas</p>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                Sua empresa mais organizada.<br />
                <span className="text-[#1967D2]">Você mais tranquilo.</span>
              </h2>
            </div>
            <p className="text-slate-400 text-[15px] font-medium leading-relaxed max-w-sm">
              RH, Financeiro e Tributário em um único parceiro — para você focar nas vendas enquanto a Cevan resolve o resto.
            </p>
          </div>

          {/* Service cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
            {[
              {
                icon: Users,
                title: "Terceirização de RH",
                desc: "Recrutamento, admissão, ponto eletrônico, férias e desligamentos. Nós somos o RH da sua empresa.",
                items: ["Recrutamento & Seleção", "Controle de Ponto", "Gestão de Férias"],
                color: "#1967D2",
              },
              {
                icon: TrendingUp,
                title: "Gestão Financeira",
                desc: "Fluxo de caixa, DRE e controle de despesas. Você saberá exatamente quanto lucra.",
                items: ["Fluxo de Caixa", "DRE Mensal", "Relatórios de Desempenho"],
                color: "#059669",
              },
              {
                icon: ShieldCheck,
                title: "Estratégia Tributária",
                desc: "Pague menos imposto, dentro da lei. Regularizamos o faturamento com total segurança.",
                items: ["Redução Legal de Impostos", "Regularização Fiscal", "Enquadramento Correto"],
                color: "#7c3aed",
              },
            ].map(({ icon: Icon, title, desc, items, color }) => (
              <div key={title} className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-[1.75rem] p-7 transition-all duration-300">
                <div className="h-12 w-12 rounded-2xl flex items-center justify-center mb-5" style={{ background: `${color}25` }}>
                  <Icon className="h-6 w-6" style={{ color }} />
                </div>
                <h3 className="font-black text-white text-[17px] mb-2">{title}</h3>
                <p className="text-slate-400 text-[13px] font-medium leading-relaxed mb-5">{desc}</p>
                <div className="space-y-2">
                  {items.map(item => (
                    <div key={item} className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0" style={{ color }} />
                      <span className="text-[12px] font-semibold text-slate-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-white/10">
            <div className="flex items-center gap-6 text-slate-400 text-[13px] font-medium">
              {["RH Completo", "Financeiro", "Tributário"].map((s) => (
                <span key={s} className="flex items-center gap-1.5">
                  <Star className="h-3.5 w-3.5 text-[#1967D2]" />{s}
                </span>
              ))}
            </div>
            <Link href="/servicos">
              <Button className="h-12 px-8 rounded-xl bg-[#1967D2] hover:bg-blue-500 font-black text-[11px] uppercase tracking-widest shadow-xl shadow-blue-900/40 transition-all hover:-translate-y-0.5">
                Ver serviços e preços <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Texto */}
            <div className="space-y-6">
              <p className="text-[11px] font-black text-[#1967D2] uppercase tracking-[0.2em]">Vamos Conversar</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                Enquanto você cuida<br />
                das vendas, a Cevan<br />
                <span className="text-[#1967D2]">cuida da gestão.</span>
              </h2>
              <p className="text-slate-500 text-[15px] sm:text-[17px] font-medium leading-relaxed max-w-md">
                Fale agora com um especialista e descubra como eliminar os custos invisíveis que travam o crescimento da sua empresa.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a href="mailto:atendimento@cevan.com.br">
                  <Button size="lg" className="h-13 w-full sm:w-auto px-8 rounded-2xl bg-[#1967D2] hover:bg-blue-700 font-black text-[11px] uppercase tracking-[0.15em] shadow-xl shadow-blue-200/60 hover:-translate-y-0.5 transition-all">
                    <Mail className="mr-2.5 h-4 w-4" /> Enviar E-mail
                  </Button>
                </a>
                <a href="tel:+551234567890">
                  <Button size="lg" variant="outline" className="h-13 w-full sm:w-auto px-8 rounded-2xl border-slate-200 text-slate-700 font-black text-[11px] uppercase tracking-[0.15em] hover:border-[#1967D2]/30 hover:bg-blue-50/40 transition-all">
                    <Phone className="mr-2.5 h-4 w-4" /> Ligar Agora
                  </Button>
                </a>
              </div>
            </div>

            {/* Imagem + overlay */}
            <div className="relative group">
              <div className="absolute inset-0 bg-[#1967D2]/10 rounded-[2.5rem] blur-3xl group-hover:bg-[#1967D2]/20 transition-all duration-700" />
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src="/feature-woman.png"
                  alt="Equipe Cevan"
                  width={700}
                  height={520}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />
                <div className="absolute bottom-7 left-7 right-7">
                  <p className="text-[10px] font-black uppercase tracking-[0.25em] text-blue-300 mb-1.5">Cevan Serviços Empresariais</p>
                  <p className="text-white font-black text-xl leading-tight">Gestão profissional para empresas que querem crescer de verdade.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
