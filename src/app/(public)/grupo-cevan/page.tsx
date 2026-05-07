"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Phone, ShieldCheck, TrendingUp, Users, Award, Wallet, Building2, ShoppingCart, ChevronRight, Mail, MapPin } from "lucide-react";

const VIEW = { once: true };
const fadeUpBase = { opacity: 0, y: 32 };
function fadeUpTo(delay = 0) {
  return { opacity: 1, y: 0, transition: { duration: 0.7, delay, ease: "easeOut" as const } };
}

export default function GrupoCevanPage() {
  return (
    <div className="flex flex-col w-full font-sans bg-white text-slate-900 overflow-hidden">

      {/* ── 01. HERO — SPLIT LAYOUT ── */}
      <section className="relative flex flex-col lg:flex-row min-h-screen mt-20 lg:mt-24">

        {/* Left: Navy panel */}
        <div className="relative flex flex-col justify-center px-8 sm:px-14 lg:px-20 py-20 lg:py-0 w-full lg:w-[52%] bg-[#0B1222] z-10 overflow-hidden">
          <div className="absolute inset-0 opacity-[0.06] pointer-events-none"
            style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 0)', backgroundSize: '28px 28px' }} />
          <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-blue-700/20 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-20 right-0 w-[300px] h-[300px] bg-blue-600/10 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative z-10 max-w-xl">
            <motion.div initial={fadeUpBase} animate={fadeUpTo(0)}>
              <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 mb-8">
                <span className="h-px w-8 bg-blue-400" />
                Somos o Grupo Cevan
              </span>
            </motion.div>

            <motion.h1
              initial={fadeUpBase}
              animate={fadeUpTo(0.15)}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[1.05] tracking-tighter mb-8"
            >
              Soluções Corporativas{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200">
                Personalizadas
              </span>{" "}
              para o Brasil
            </motion.h1>

            <motion.p
              initial={fadeUpBase}
              animate={fadeUpTo(0.3)}
              className="text-slate-400 text-lg font-medium leading-relaxed mb-12"
            >
              Um ecossistema de empresas que une inteligência financeira, gestão de talentos e excelência no varejo — tudo sob um único padrão de qualidade.
            </motion.p>

            <motion.div
              initial={fadeUpBase}
              animate={fadeUpTo(0.45)}
              className="flex flex-col sm:flex-row gap-4 mb-14"
            >
              <Link
                href="/#contato"
                className="inline-flex items-center justify-center gap-2 h-14 px-9 rounded-2xl bg-[#1967D2] hover:bg-blue-500 text-white font-black uppercase tracking-widest text-[11px] transition-all hover:-translate-y-0.5 shadow-xl shadow-blue-900/40"
              >
                Fale com a Gente <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#sobre"
                className="inline-flex items-center justify-center gap-2 h-14 px-9 rounded-2xl border border-white/10 text-white/70 hover:text-white hover:border-white/30 font-bold uppercase tracking-widest text-[11px] transition-all"
              >
                Conheça o Grupo
              </Link>
            </motion.div>

            <motion.div
              initial={fadeUpBase}
              animate={fadeUpTo(0.6)}
              className="flex items-center gap-4 border-t border-white/5 pt-10"
            >
              <div className="h-12 w-12 rounded-xl bg-blue-600/20 flex items-center justify-center shrink-0">
                <Phone className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Central de Atendimento</p>
                <p className="text-white font-black text-lg tracking-tight">atendimento@cevan.com.br</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right: Photo */}
        <div className="relative w-full lg:w-[48%] min-h-[60vw] lg:min-h-0">
          <Image src="/hero-man.png" alt="Grupo Cevan" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1222]/60 via-transparent to-transparent lg:from-[#0B1222]/30" />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="absolute bottom-8 left-8 lg:bottom-12 lg:left-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5 flex items-center gap-4"
          >
            <div className="h-12 w-12 rounded-xl bg-[#1967D2] flex items-center justify-center shrink-0">
              <Award className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-white font-black text-lg leading-none">15+ Anos</p>
              <p className="text-white/60 text-xs font-medium mt-1">de Excelência no Mercado</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 02. STATS BAR ── */}
      <section className="bg-[#f0f5ff] py-20 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span className="text-[18vw] font-black text-[#1967D2]/[0.04] uppercase tracking-tighter whitespace-nowrap">CEVAN</span>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
            {[
              { number: "15+", label: "Anos de Mercado", icon: Award },
              { number: "10K+", label: "Vagas Preenchidas", icon: Users },
              { number: "3", label: "Verticais de Negócio", icon: Building2 },
              { number: "100%", label: "Foco em Resultados", icon: TrendingUp },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={fadeUpBase}
                whileInView={fadeUpTo(i * 0.1)}
                viewport={VIEW}
                className="flex flex-col items-center text-center p-6"
              >
                <stat.icon className="h-7 w-7 text-[#1967D2] mb-4 opacity-60" />
                <span className="text-5xl lg:text-6xl font-black text-[#0B1222] tracking-tighter leading-none mb-2">{stat.number}</span>
                <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 03. ABOUT — IMAGE LEFT / TEXT RIGHT ── */}
      <section id="sobre" className="py-24 lg:py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          <motion.div initial={fadeUpBase} whileInView={fadeUpTo(0)} viewport={VIEW} className="relative">
            <div className="relative rounded-[2.5rem] overflow-hidden aspect-[4/5]">
              <Image src="/feature-woman.png" alt="Sobre o Grupo Cevan" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1222]/60 via-transparent to-transparent" />
            </div>
            <div className="absolute -right-6 -top-6 text-[140px] lg:text-[180px] font-black leading-none text-[#1967D2]/[0.06] select-none pointer-events-none tracking-tighter">
              01
            </div>
            <div className="absolute bottom-8 -right-4 lg:-right-8 bg-[#0B1222] text-white rounded-2xl p-6 shadow-2xl">
              <p className="text-3xl font-black mb-1">Maranhão</p>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">& Todo o Brasil</p>
            </div>
          </motion.div>

          <motion.div initial={fadeUpBase} whileInView={fadeUpTo(0.15)} viewport={VIEW} className="space-y-8">
            <div>
              <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-[#1967D2] mb-5">
                <span className="h-px w-6 bg-[#1967D2]" />
                Sobre Nós
              </span>
              <h2 className="text-4xl lg:text-5xl font-black text-[#0B1222] leading-tight tracking-tighter">
                Quem É o{" "}
                <span className="text-[#1967D2]">Grupo Cevan?</span>
              </h2>
            </div>
            <p className="text-slate-500 text-lg font-medium leading-relaxed">
              Somos um grupo empresarial multissetorial com sede no Maranhão, atuando em finanças, serviços empresariais e varejo. Nossa missão é transformar desafios corporativos em resultados concretos.
            </p>
            <div className="space-y-4">
              {[
                { icon: ShieldCheck, text: "Governança corporativa com padrão internacional" },
                { icon: TrendingUp, text: "Crescimento consistente e sustentável" },
                { icon: Users, text: "Time especializado e multidisciplinar" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                    <Icon className="h-5 w-5 text-[#1967D2]" />
                  </div>
                  <p className="text-slate-700 font-semibold">{text}</p>
                </div>
              ))}
            </div>
            <Link
              href="/#contato"
              className="inline-flex items-center gap-2 h-14 px-9 rounded-2xl bg-[#0B1222] hover:bg-[#1967D2] text-white font-black uppercase tracking-widest text-[11px] transition-all hover:-translate-y-0.5 shadow-xl shadow-slate-900/20"
            >
              Fale Conosco <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── 04. EMPRESAS DO GRUPO ── */}
      <section id="financeira" className="py-24 lg:py-32 bg-[#f8faff] overflow-hidden relative">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none hidden lg:block">
          <span className="text-[12vw] font-black text-[#1967D2]/[0.04] uppercase tracking-tighter">EMPRESAS</span>
        </div>

        <div className="max-w-7xl mx-auto px-6 space-y-28 lg:space-y-40 relative z-10">

          {/* — Cevan Financeira — */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div initial={fadeUpBase} whileInView={fadeUpTo(0)} viewport={VIEW} className="order-2 lg:order-1 space-y-7">
              <div>
                <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-[#1967D2] mb-5">
                  <span className="h-px w-6 bg-[#1967D2]" />
                  Vertical Financeira
                </span>
                <h2 className="text-4xl lg:text-5xl font-black text-[#0B1222] leading-tight tracking-tighter">
                  Cevan <span className="text-[#1967D2]">Financeira</span>
                </h2>
              </div>
              <p className="text-slate-500 text-lg font-medium leading-relaxed">
                Especialistas em antecipação de recebíveis, estruturação de crédito e capital de giro. Soluções financeiras ágeis para negócios em expansão.
              </p>
              <ul className="space-y-3 text-slate-600 font-semibold">
                {["Antecipação de Recebíveis", "Crédito Empresarial", "Consultoria Financeira", "Capital de Giro"].map(item => (
                  <li key={item} className="flex items-center gap-3">
                    <ChevronRight className="h-4 w-4 text-[#1967D2] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/#contato" className="inline-flex items-center gap-2 text-[#1967D2] font-black uppercase tracking-widest text-[11px] hover:gap-4 transition-all">
                Saiba Mais <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>

            <motion.div initial={fadeUpBase} whileInView={fadeUpTo(0.2)} viewport={VIEW} className="order-1 lg:order-2 relative">
              <div className="relative rounded-[2.5rem] overflow-hidden aspect-[4/3]">
                <Image src="/cevan-finance.png" alt="Cevan Financeira" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-transparent" />
              </div>
              <div className="absolute -left-6 -bottom-6 text-[100px] lg:text-[130px] font-black leading-none text-[#1967D2]/[0.06] select-none pointer-events-none tracking-tighter">02</div>
              <div className="absolute top-6 right-6 h-16 w-16 rounded-2xl bg-[#1967D2] flex items-center justify-center shadow-xl shadow-blue-900/30">
                <Wallet className="h-8 w-8 text-white" />
              </div>
            </motion.div>
          </div>

          {/* — Cevan Serviços — */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div initial={fadeUpBase} whileInView={fadeUpTo(0)} viewport={VIEW} className="relative">
              <div className="relative rounded-[2.5rem] overflow-hidden aspect-[4/3]">
                <Image src="/feature-woman.png" alt="Cevan Serviços" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900/20 to-transparent" />
              </div>
              <div className="absolute -right-6 -bottom-6 text-[100px] lg:text-[130px] font-black leading-none text-[#1967D2]/[0.06] select-none pointer-events-none tracking-tighter">03</div>
              <div className="absolute top-6 left-6 h-16 w-16 rounded-2xl bg-[#0B1222] flex items-center justify-center shadow-xl">
                <Building2 className="h-8 w-8 text-white" />
              </div>
            </motion.div>

            <motion.div initial={fadeUpBase} whileInView={fadeUpTo(0.2)} viewport={VIEW} className="space-y-7">
              <div>
                <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-[#1967D2] mb-5">
                  <span className="h-px w-6 bg-[#1967D2]" />
                  Vertical de Serviços Empresariais
                </span>
                <h2 className="text-4xl lg:text-5xl font-black text-[#0B1222] leading-tight tracking-tighter">
                  Cevan <span className="text-[#1967D2]">Serviços Empresariais</span>
                </h2>
              </div>
              <p className="text-slate-500 text-lg font-medium leading-relaxed">
                Recrutamento especializado, BPO e terceirização de processos corporativos com suporte de inteligência artificial. Conectamos os melhores talentos às melhores empresas do Brasil.
              </p>
              <ul className="space-y-3 text-slate-600 font-semibold">
                {["Recrutamento & Seleção", "BPO Empresarial", "Terceirização de RH", "Análise com IA"].map(item => (
                  <li key={item} className="flex items-center gap-3">
                    <ChevronRight className="h-4 w-4 text-[#1967D2] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/jobs" className="inline-flex items-center gap-2 text-[#1967D2] font-black uppercase tracking-widest text-[11px] hover:gap-4 transition-all">
                Ver Vagas Abertas <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>

          {/* — Cevan Supermercado — */}
          <div id="supermercado" className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div initial={fadeUpBase} whileInView={fadeUpTo(0)} viewport={VIEW} className="order-2 lg:order-1 space-y-7">
              <div>
                <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-[#1967D2] mb-5">
                  <span className="h-px w-6 bg-[#1967D2]" />
                  Vertical de Varejo
                </span>
                <h2 className="text-4xl lg:text-5xl font-black text-[#0B1222] leading-tight tracking-tighter">
                  Cevan <span className="text-[#1967D2]">Supermercado</span>
                </h2>
              </div>
              <p className="text-slate-500 text-lg font-medium leading-relaxed">
                Tradição e frescor no setor varejista de alimentos. Operamos com logística de ponta e compromisso com a qualidade, atendendo comunidades em toda a região do Maranhão.
              </p>
              <ul className="space-y-3 text-slate-600 font-semibold">
                {["Varejo Alimentar", "Logística Própria", "Produtos Frescos", "Expansão Regional"].map(item => (
                  <li key={item} className="flex items-center gap-3">
                    <ChevronRight className="h-4 w-4 text-[#1967D2] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/#contato" className="inline-flex items-center gap-2 text-[#1967D2] font-black uppercase tracking-widest text-[11px] hover:gap-4 transition-all">
                Saiba Mais <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>

            <motion.div initial={fadeUpBase} whileInView={fadeUpTo(0.2)} viewport={VIEW} className="order-1 lg:order-2 relative">
              <div className="relative rounded-[2.5rem] overflow-hidden aspect-[4/3]">
                <Image src="/cevan-supermarket.png" alt="Cevan Supermercado" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 to-transparent" />
              </div>
              <div className="absolute -left-6 -bottom-6 text-[100px] lg:text-[130px] font-black leading-none text-[#1967D2]/[0.06] select-none pointer-events-none tracking-tighter">04</div>
              <div className="absolute top-6 right-6 h-16 w-16 rounded-2xl bg-emerald-600 flex items-center justify-center shadow-xl shadow-emerald-900/30">
                <ShoppingCart className="h-8 w-8 text-white" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 05. CTA BANNER ── */}
      <section className="relative overflow-hidden bg-[#0B1222]">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
          <div className="relative min-h-[320px] lg:min-h-0">
            <Image src="/feature-woman.png" alt="Fale com a Cevan" fill className="object-cover object-top" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0B1222]/80 lg:to-[#0B1222]" />
          </div>

          <motion.div
            initial={fadeUpBase}
            whileInView={fadeUpTo(0)}
            viewport={VIEW}
            className="flex flex-col justify-center px-10 sm:px-16 lg:px-20 py-16 lg:py-0 relative z-10"
          >
            <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 mb-7">
              <span className="h-px w-6 bg-blue-400" />
              Vamos Começar
            </span>
            <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight tracking-tighter mb-6">
              Transforme os Rumos da{" "}
              <span className="text-[#1967D2]">Sua Empresa</span>
            </h2>
            <p className="text-slate-400 text-lg font-medium leading-relaxed mb-10 max-w-md">
              Agende uma reunião estratégica com nossa equipe e descubra como o Grupo Cevan pode impulsionar o seu negócio.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/#contato"
                className="inline-flex items-center justify-center gap-2 h-14 px-9 rounded-2xl bg-[#1967D2] hover:bg-blue-500 text-white font-black uppercase tracking-widest text-[11px] transition-all hover:-translate-y-0.5 shadow-xl shadow-blue-900/40"
              >
                Solicitar Consultoria <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="mailto:atendimento@cevan.com.br"
                className="inline-flex items-center justify-center gap-2 h-14 px-9 rounded-2xl border border-white/10 text-white/70 hover:text-white hover:border-white/30 font-bold text-[13px] transition-all"
              >
                <Mail className="h-4 w-4" />
                Enviar E-mail
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 06. CONTACT ROW ── */}
      <section className="bg-[#f0f5ff] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {[
              { icon: Phone, label: "Telefone", value: "+55 (98) 0000-0000" },
              { icon: Mail, label: "E-mail", value: "atendimento@cevan.com.br" },
              { icon: MapPin, label: "Localização", value: "São Luís, Maranhão — Brasil" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex flex-col items-center gap-4">
                <div className="h-14 w-14 rounded-2xl bg-[#1967D2] flex items-center justify-center shadow-lg shadow-blue-200">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">{label}</p>
                  <p className="font-bold text-[#0B1222]">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
