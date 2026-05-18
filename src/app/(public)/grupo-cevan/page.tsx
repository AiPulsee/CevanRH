"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight, Phone, ShieldCheck, Award,
  Mail, MapPin, CheckCircle2, Zap, Globe,
} from "lucide-react";

function FadeUp({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const VERTICALS = [
  {
    title: "Cevan Financeira",
    tagline: "Crédito & Recebíveis",
    desc: "Antecipação de recebíveis e crédito estruturado PJ para empresas que querem crescer.",
    href: "/grupo-cevan/financeira",
    image: "/cevan-finance.png",
    logo: "/cevanfinanceira/logo Cevan Financeira 2.png",
    overlayColor: "from-blue-900/80",
    textAccent: "text-blue-400",
    borderAccent: "border-blue-900/30 hover:border-blue-500/50",
  },
  {
    title: "Cevan Serviços",
    tagline: "Talentos & RH",
    desc: "Gestão de talentos, terceirização administrativa e soluções completas de RH.",
    href: "/jobs",
    image: "/feature-woman.png",
    logo: null,
    overlayColor: "from-emerald-900/80",
    textAccent: "text-emerald-400",
    borderAccent: "border-emerald-900/30 hover:border-emerald-500/50",
  },
  {
    title: "Cevan Supermercados",
    tagline: "Varejo Alimentar",
    desc: "Rede de supermercados com foco em qualidade, frescor e atendimento humano.",
    href: "/grupo-cevan/supermercado",
    image: "/cevan-supermarket.png",
    logo: "/cevansupermercado/Logo - Cevan Supermercado.png",
    overlayColor: "from-orange-900/80",
    textAccent: "text-orange-400",
    borderAccent: "border-orange-900/30 hover:border-orange-500/50",
  },
  {
    title: "CevanPay",
    tagline: "Fintech & Pagamentos",
    desc: "Soluções de pagamento, maquininhas e gestão financeira digital para seu negócio.",
    href: "/grupo-cevan/cevanpay",
    image: "/cevanpay/maquinninha mockup.png",
    logo: "/cevanpay/Logo - Cevanpay.png",
    overlayColor: "from-[#0B1222]/90",
    textAccent: "text-blue-400",
    borderAccent: "border-slate-700/30 hover:border-blue-500/50",
    imageFit: "object-contain bg-[#0B1222]",
  },
];

const PILLARS = [
  { icon: ShieldCheck, title: "Governança Sólida", desc: "Transparência e ética em todas as decisões." },
  { icon: Zap, title: "Inovação Constante", desc: "Tecnologia de ponta em todas as verticais." },
  { icon: Globe, title: "Visão Estratégica", desc: "Execução precisa para resultados sustentáveis." },
  { icon: CheckCircle2, title: "Foco em Pessoas", desc: "Nosso maior ativo são as pessoas do Grupo Cevan." },
];

export default function GrupoCevanPage() {
  return (
    <div className="flex flex-col w-full font-sans bg-white text-slate-900">

      {/* ── 01. HERO ── */}
      <section className="relative pt-24 pb-10 lg:pt-44 lg:pb-32 overflow-hidden bg-[#F8F9FC]">
        <div
          className="absolute inset-0 z-0 opacity-[0.035]"
          style={{ backgroundImage: "linear-gradient(to right, #000 1px, transparent 1px)", backgroundSize: "80px 100%" }}
        />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-400/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-5 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center">

            {/* Copy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="space-y-5 lg:space-y-8"
            >
              <h1 className="text-[2.8rem] sm:text-5xl lg:text-[82px] font-extrabold tracking-tight leading-[1.05] text-[#0B1222]">
                GRUPO <br />
                <span className="text-blue-600">CEVAN.</span>
              </h1>

              <p className="text-slate-500 text-base sm:text-lg lg:text-xl font-medium max-w-xl leading-relaxed">
                Um ecossistema integrado de negócios que conecta finanças, pessoas, varejo e tecnologia para gerar resultados reais.
              </p>

              {/* Stat pills — compact on mobile */}
              <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-3">
                {[
                  { value: "4+", label: "Verticais" },
                  { value: "10+", label: "Anos" },
                  { value: "500+", label: "Empresas" },
                  { value: "MA", label: "Maranhão" },
                ].map(s => (
                  <div key={s.label} className="flex items-center gap-2 px-3 py-2 rounded-full bg-white border border-slate-200 shadow-sm">
                    <span className="text-sm font-black text-[#0B1222]">{s.value}</span>
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">{s.label}</span>
                  </div>
                ))}
              </div>

              {/* Buttons — full-width on mobile */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-1">
                <Link
                  href="#verticais"
                  className="h-13 sm:h-14 px-6 sm:px-8 rounded-xl bg-blue-600 hover:bg-[#0B1222] text-white font-bold uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 transition-all shadow-lg shadow-blue-600/20"
                >
                  Nossas Verticais <ArrowRight className="h-4 w-4 shrink-0" />
                </Link>
                <Link
                  href="/#contato"
                  className="h-13 sm:h-14 px-6 sm:px-8 rounded-xl border-2 border-[#0B1222] text-[#0B1222] hover:bg-[#0B1222] hover:text-white font-bold uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 transition-all"
                >
                  Solicitar Proposta
                </Link>
              </div>
            </motion.div>

            {/* Hero image — hidden on small phones, shown from sm up */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15 }}
              className="hidden sm:block relative"
            >
              <div className="relative aspect-[4/3] rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.12)]">
                <Image src="/holding-hero.png" alt="Grupo Cevan" fill className="object-cover" priority />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#0B1222]/20 to-transparent" />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── 02. SOBRE A HOLDING ── */}
      <section className="py-14 sm:py-24 lg:py-36 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 items-center">

            {/* Image — compact on mobile */}
            <FadeUp>
              <div className="relative">
                <div className="relative aspect-[4/3] sm:aspect-square lg:aspect-[4/5] rounded-2xl sm:rounded-[2.5rem] overflow-hidden shadow-xl sm:shadow-2xl">
                  <Image src="/cevan-finance.png" alt="Sobre o Grupo Cevan" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1222]/40 to-transparent" />
                </div>
                {/* Decorative circles — desktop only */}
                <div className="hidden sm:block absolute -right-8 -top-8 h-32 w-32 rounded-full border-2 border-blue-600/20 pointer-events-none" />
                <div className="hidden sm:block absolute -right-4 -top-4 h-16 w-16 rounded-full bg-blue-600/10 pointer-events-none" />
                {/* Stats card */}
                <div className="absolute right-3 sm:right-0 md:-right-6 bottom-4 sm:bottom-12 bg-[#0B1222] text-white rounded-xl sm:rounded-2xl p-3 sm:p-6 shadow-xl sm:shadow-2xl">
                  <p className="text-[9px] font-black uppercase tracking-widest text-blue-400 mb-0.5">Presença</p>
                  <p className="text-lg sm:text-3xl font-black leading-tight">Maranhão</p>
                  <p className="text-slate-400 text-xs sm:text-sm font-medium mt-0.5">Brasil</p>
                </div>
              </div>
            </FadeUp>

            {/* Text */}
            <div className="space-y-6 sm:space-y-10">
              <FadeUp delay={0.1}>
                <span className="text-blue-600 font-black text-xs sm:text-sm tracking-widest uppercase">Sobre a Holding</span>
                <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B1222] tracking-tight leading-tight">
                  Um grupo construído para <span className="text-blue-600">criar valor real.</span>
                </h2>
              </FadeUp>

              <FadeUp delay={0.15}>
                <p className="text-slate-500 text-base sm:text-lg font-medium leading-relaxed">
                  O Grupo Cevan nasceu da necessidade de criar conexões reais entre capital, tecnologia e pessoas. Hoje operamos como uma força estratégica que impulsiona múltiplas verticais de negócio no Maranhão.
                </p>
              </FadeUp>

              <FadeUp delay={0.2}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
                  {PILLARS.map((p) => (
                    <div key={p.title} className="flex gap-3 items-start p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-100 hover:bg-blue-50/30 transition-all">
                      <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-600 shrink-0">
                        <p.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                      </div>
                      <div>
                        <h4 className="text-sm sm:text-base font-black text-[#0B1222]">{p.title}</h4>
                        <p className="text-slate-400 text-xs sm:text-sm font-medium mt-1 leading-relaxed">{p.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </FadeUp>

              <FadeUp delay={0.3}>
                <Link
                  href="/grupo-cevan/sobre"
                  className="inline-flex items-center gap-3 h-12 sm:h-14 px-6 sm:px-8 rounded-xl bg-[#0B1222] text-white font-bold uppercase tracking-widest text-[11px] hover:bg-blue-600 transition-all"
                >
                  Nossa História <ArrowRight className="h-4 w-4" />
                </Link>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* ── 03. VERTICAIS ── */}
      <section id="verticais" className="py-14 sm:py-24 lg:py-36 bg-[#0B1222] relative overflow-hidden">
        <div
          className="absolute inset-0 z-0 opacity-[0.06]"
          style={{ backgroundImage: "linear-gradient(to right, #fff 1px, transparent 1px)", backgroundSize: "80px 100%" }}
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-5 sm:px-6 relative z-10">
          <FadeUp className="text-center max-w-2xl mx-auto space-y-3 sm:space-y-5 mb-10 sm:mb-16">
            <span className="text-blue-400 font-black text-xs sm:text-sm tracking-widest uppercase">Nossas Verticais</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Soluções especializadas para <span className="text-blue-400">cada desafio.</span>
            </h2>
            <p className="text-slate-400 text-base sm:text-lg font-medium">
              Quatro áreas integradas, cada uma líder em seu segmento.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {VERTICALS.map((card, i) => (
              <FadeUp key={card.title} delay={i * 0.08}>
                <Link
                  href={card.href}
                  className={`group flex flex-col h-full rounded-2xl sm:rounded-3xl overflow-hidden border ${card.borderAccent} bg-[#0f1623] active:scale-[0.98] hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/30 transition-all duration-300`}
                >
                  {/* Image */}
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className={`transition-transform duration-500 group-hover:scale-105 ${card.imageFit ?? "object-cover"}`}
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${card.overlayColor} to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300`} />
                  </div>

                  {/* Text */}
                  <div className="flex flex-col flex-1 p-5 sm:p-7 gap-3">
                    {card.logo ? (
                      <div className="h-7 sm:h-8">
                        <Image src={card.logo} alt={card.title} width={140} height={28} className="h-7 sm:h-8 w-auto object-contain object-left" />
                      </div>
                    ) : (
                      <h3 className="text-lg sm:text-xl font-black text-white tracking-tight">{card.title}</h3>
                    )}
                    <p className="text-slate-400 font-medium leading-relaxed text-sm flex-1">{card.desc}</p>
                    <div className={`flex items-center gap-2 ${card.textAccent} font-black uppercase tracking-widest text-[10px] group-hover:gap-3 transition-all`}>
                      Ver Detalhes <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    </div>
                  </div>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── 04. NÚMEROS ── */}
      <section className="py-12 sm:py-20 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-0 lg:divide-x divide-slate-100">
            {[
              { value: "4", suffix: "+", label: "Verticais", sub: "integradas" },
              { value: "10", suffix: "+", label: "Anos", sub: "no Maranhão" },
              { value: "500", suffix: "+", label: "Empresas", sub: "atendidas" },
              { value: "100", suffix: "M+", label: "Volume", sub: "processado" },
            ].map((stat, i) => (
              <FadeUp key={stat.label} delay={i * 0.08} className="text-center lg:px-12 py-4 sm:py-6">
                <p className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0B1222] tracking-tight leading-none">
                  {stat.value}<span className="text-blue-600">{stat.suffix}</span>
                </p>
                <p className="text-sm sm:text-base font-black text-[#0B1222] mt-2 sm:mt-3">{stat.label}</p>
                <p className="text-xs sm:text-sm text-slate-400 font-medium mt-0.5">{stat.sub}</p>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── 05. CTA ── */}
      <section className="relative py-14 sm:py-24 lg:py-32 bg-[#0B1222] overflow-hidden">
        <div
          className="absolute inset-0 z-0 opacity-[0.06]"
          style={{ backgroundImage: "linear-gradient(to right, #fff 1px, transparent 1px)", backgroundSize: "100px 100%" }}
        />
        <div className="absolute -top-24 right-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-5 sm:px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center lg:justify-between gap-8 lg:gap-12">

            <FadeUp className="space-y-4 sm:space-y-6 max-w-2xl text-center lg:text-left">
              <span className="inline-block text-[10px] font-black uppercase tracking-widest text-blue-400 px-3 py-1.5 rounded-full bg-blue-400/10 border border-blue-400/20">
                Fale com um Especialista
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black text-white tracking-tight leading-tight">
                Pronto para elevar o seu <span className="text-blue-400">negócio ao próximo nível?</span>
              </h2>
              <p className="text-slate-400 text-base sm:text-lg font-medium">
                Nossos consultores estão prontos para desenhar a melhor estratégia para você.
              </p>
            </FadeUp>

            <FadeUp delay={0.15} className="flex flex-col sm:flex-row gap-3 sm:gap-5 w-full lg:w-auto shrink-0">
              <Link
                href="/#contato"
                className="h-14 px-8 rounded-xl bg-blue-600 text-white font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 shadow-xl hover:bg-blue-500 transition-all"
              >
                Agendar Reunião <ArrowRight className="h-4 w-4 shrink-0" />
              </Link>
              <a
                href="https://wa.me/5598982128321"
                target="_blank"
                rel="noreferrer"
                className="h-14 px-6 sm:px-8 rounded-xl border border-white/15 text-white font-bold flex items-center justify-center gap-3 hover:bg-white/5 transition-all"
              >
                <Phone className="h-5 w-5 text-slate-400 shrink-0" />
                <div className="text-left">
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">WhatsApp</p>
                  <p className="text-sm sm:text-base font-black">(98) 98212-8321</p>
                </div>
              </a>
            </FadeUp>

          </div>
        </div>
      </section>

      {/* ── 06. QUOTE ── */}
      <section className="py-14 sm:py-24 lg:py-36 bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <FadeUp>
            <div className="bg-gradient-to-br from-[#F8F9FC] to-blue-50/50 rounded-2xl sm:rounded-[2.5rem] p-7 sm:p-12 lg:p-20 border border-blue-100/60 relative overflow-hidden">
              <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-blue-600/5 pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-blue-600/5 pointer-events-none" />

              <div className="relative z-10 text-center space-y-6 sm:space-y-8 max-w-4xl mx-auto">
                <div className="h-12 w-12 sm:h-16 sm:w-16 mx-auto bg-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-600/30">
                  <Award className="h-6 w-6 sm:h-8 sm:w-8" />
                </div>
                <blockquote className="text-lg sm:text-2xl lg:text-4xl font-extrabold text-[#0B1222] tracking-tight leading-snug">
                  "No Grupo Cevan, acreditamos que a{" "}
                  <span className="text-blue-600">transparência</span> e a{" "}
                  <span className="text-blue-600">inovação</span>{" "}
                  são os únicos caminhos para a longevidade corporativa."
                </blockquote>
                <div className="flex items-center justify-center gap-3 sm:gap-4 pt-2">
                  <Image src="/brasao-grupocevan.png" alt="Brasão" width={36} height={36} className="h-8 w-8 sm:h-10 sm:w-10 object-contain" />
                  <div className="text-left">
                    <p className="text-sm sm:text-base font-black text-[#0B1222]">Conselho Diretor</p>
                    <p className="text-xs sm:text-sm font-bold text-slate-400 uppercase tracking-[0.2em]">Holding Grupo Cevan</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── 07. CONTATO ── */}
      <section className="bg-[#F8F9FC] py-14 sm:py-20 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <FadeUp className="text-center mb-8 sm:mb-12">
            <h3 className="text-xl sm:text-2xl font-black text-[#0B1222] tracking-tight">Entre em Contato</h3>
            <p className="text-slate-400 font-medium mt-1 sm:mt-2 text-sm sm:text-base">Estamos disponíveis para atender você.</p>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6">
            {[
              { icon: Mail, label: "E-mail", value: "contato@grupocevan.com", href: "mailto:contato@grupocevan.com" },
              { icon: MapPin, label: "Localização", value: "São Luís, Maranhão", href: "#" },
              { icon: Phone, label: "WhatsApp", value: "(98) 98212-8321", href: "https://wa.me/5598982128321" },
            ].map((item, i) => (
              <FadeUp key={item.label} delay={i * 0.08}>
                <a
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="flex gap-4 items-center p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white border border-slate-100 hover:border-blue-200 hover:shadow-lg active:scale-[0.98] transition-all group"
                >
                  <div className="h-11 w-11 sm:h-12 sm:w-12 rounded-xl bg-blue-50 group-hover:bg-blue-600 flex items-center justify-center text-blue-600 group-hover:text-white transition-all shrink-0">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{item.label}</p>
                    <p className="text-sm sm:text-base font-black text-[#0B1222] mt-0.5 truncate">{item.value}</p>
                  </div>
                </a>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
