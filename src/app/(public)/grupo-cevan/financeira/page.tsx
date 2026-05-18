"use client";

import { motion } from "framer-motion";
import {
  ArrowRight, ArrowUpRight, Phone, Mail,
  Shield, BadgeCheck, Zap,
} from "lucide-react";

const VIEW = { once: true };
const fu = { opacity: 0, y: 20 };
function ft(d = 0) {
  return { opacity: 1, y: 0, transition: { duration: 0.5, delay: d, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } };
}

export default function FinanceiraPage() {
  return (
    <div className="flex flex-col w-full overflow-hidden bg-white text-[#0B1222]" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ── HERO ── */}
      <section className="relative pt-24 sm:pt-36 pb-0 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-slate-100" />
        <div className="absolute top-40 right-0 w-96 h-96 bg-[#003399]/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-5 lg:px-12 relative z-10">
          <motion.div initial={fu} animate={ft(0)} className="flex items-center gap-2 mb-10 sm:mb-16">
            <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Grupo Cevan</span>
            <span className="text-slate-200">/</span>
            <span className="text-[11px] font-black text-[#003399] uppercase tracking-[0.2em]">Financeira</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Left: headline */}
            <div className="lg:col-span-7 lg:pr-16 pb-12 lg:pb-24 lg:border-r border-slate-100">
              <motion.div initial={fu} animate={ft(0.05)} className="mb-5">
                <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-[#D4AF37]">
                  <span className="h-px w-8 bg-[#D4AF37]" />
                  Confiança e Inovação
                </span>
              </motion.div>

              <motion.h1 initial={fu} animate={ft(0.08)}
                className="text-[2.4rem] sm:text-5xl lg:text-[4.5rem] font-black text-[#0B1222] leading-[0.95] tracking-tight mb-6 sm:mb-8">
                Crédito que respeita<br />
                <span className="text-[#003399]">quem você é.</span>
              </motion.h1>

              <motion.p initial={fu} animate={ft(0.16)}
                className="text-slate-500 text-base sm:text-xl font-medium leading-relaxed mb-8 sm:mb-12 max-w-md">
                Bolsa Família, Consignado INSS e soluções sob medida para o seu crescimento. Atendimento humano e ágil.
              </motion.p>

              <motion.div initial={fu} animate={ft(0.24)} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <a href="https://wa.me/5598000000000" target="_blank" rel="noreferrer"
                  className="group inline-flex items-center justify-center gap-3 h-14 px-8 rounded-2xl bg-[#003399] hover:bg-[#002b80] active:scale-[0.98] text-white font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-blue-900/20">
                  Falar no WhatsApp
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="tel:+5598000000000"
                  className="inline-flex items-center justify-center gap-3 h-14 px-8 rounded-2xl border-2 border-slate-100 text-[#0B1222] hover:border-[#D4AF37] hover:text-[#D4AF37] active:scale-[0.98] font-black text-xs uppercase tracking-widest transition-all">
                  <Phone className="h-4 w-4" />
                  Atendimento
                </a>
              </motion.div>
            </div>

            {/* Right: stats */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.8 }}
              className="lg:col-span-5 lg:pl-12 flex flex-col justify-center pb-12 lg:pb-24 pt-8 lg:pt-0">
              <div className="relative">
                <div className="absolute -left-4 top-0 w-1 h-full bg-[#D4AF37]" />
                <p className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400 mb-3">Crédito concedido</p>
                <p className="text-5xl sm:text-[5rem] lg:text-[7rem] font-black text-[#0B1222] leading-none tracking-tighter">
                  R$50<span className="text-[#D4AF37]">M</span>
                </p>
                <p className="text-slate-400 font-bold text-base sm:text-lg mt-3 uppercase tracking-widest">no Maranhão</p>
              </div>

              <div className="grid grid-cols-3 gap-2 sm:gap-6 mt-6 sm:mt-12 pt-6 sm:pt-12 border-t border-slate-100">
                {[
                  { v: "24h", l: "Análise", c: "#003399" },
                  { v: "98%", l: "Satisfação", c: "#D4AF37" },
                  { v: "BCB", l: "Regulado", c: "#003399" }
                ].map(stat => (
                  <div key={stat.l}>
                    <p className="text-2xl sm:text-3xl font-black tracking-tighter" style={{ color: stat.c }}>{stat.v}</p>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{stat.l}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-5 lg:px-12">
          <div className="h-px bg-slate-100" />
        </div>
      </section>

      {/* ── PRODUTOS ── */}
      <section className="py-14 sm:py-24 lg:py-40">
        <div className="max-w-7xl mx-auto px-5 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-24">
            <motion.div initial={fu} whileInView={ft(0)} viewport={VIEW} className="lg:col-span-4">
              <span className="text-[11px] font-black uppercase tracking-[0.4em] text-[#D4AF37] mb-4 sm:mb-6 block">SOLUÇÕES FINANCEIRAS</span>
              <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black text-[#0B1222] tracking-tighter leading-none mb-5 sm:mb-8">
                Excelência em<br />cada contrato
              </h2>
              <p className="text-slate-500 text-base sm:text-lg font-medium leading-relaxed max-w-sm">
                Desenvolvemos produtos que unem a modernidade tecnológica com a segurança do sistema financeiro nacional.
              </p>
            </motion.div>

            <div className="lg:col-span-8 space-y-px bg-slate-100">
              {[
                {
                  num: "01",
                  eyebrow: "Crédito Pessoal",
                  name: "Bolsa Família",
                  desc: "Crédito com débito direto na conta do benefício. Para quem recebe mínimo R$400 de auxílio.",
                  details: ["Análise simplificada", "Liberação em 24h", "Parcelas fixas", "Sem consulta SPC/Serasa"],
                  rate: "a partir de R$101",
                },
                {
                  num: "02",
                  eyebrow: "Consignado",
                  name: "INSS",
                  desc: "Desconto direto na aposentadoria ou pensão. Até 45% da margem disponível em até 96 parcelas.",
                  details: ["Melhores taxas do mercado", "Prazos estendidos", "Contratação digital", "Segurança total"],
                  rate: "1,85% ao mês",
                },
                {
                  num: "03",
                  eyebrow: "Para Empresas",
                  name: "CevanPay",
                  desc: "Maquininhas com taxas progressivas e antecipação de recebíveis para o seu negócio.",
                  details: ["Taxas competitivas", "Receba no dia seguinte", "Suporte local", "Tecnologia de ponta"],
                  rate: "consulte condições",
                },
              ].map((p, i) => (
                <motion.div key={p.num} initial={fu} whileInView={ft(i * 0.1)} viewport={VIEW}
                  className="group bg-white py-7 px-4 sm:py-12 sm:px-8 grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-8 hover:bg-slate-50 active:bg-slate-50 transition-all duration-300 cursor-pointer"
                  onClick={() => window.open("https://wa.me/5598000000000", "_blank")}>

                  <div className="hidden md:block md:col-span-1">
                    <span className="text-sm font-black text-slate-200 group-hover:text-[#003399] transition-colors">{p.num}</span>
                  </div>

                  <div className="md:col-span-6">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#D4AF37] mb-2">{p.eyebrow}</p>
                    <h3 className="text-2xl sm:text-3xl font-black text-[#0B1222] mb-3 group-hover:text-[#003399] transition-colors">{p.name}</h3>
                    <p className="text-slate-500 text-sm sm:text-base font-medium leading-relaxed">{p.desc}</p>
                  </div>

                  <div className="md:col-span-5 flex flex-row md:flex-col justify-between gap-4 sm:gap-8">
                    <ul className="space-y-1 sm:space-y-2">
                      {p.details.map((d) => (
                        <li key={d} className="flex items-center gap-2 text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-400">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37] shrink-0" />
                          {d}
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-col items-end justify-between py-1">
                      <div className="text-right">
                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Destaque</p>
                        <p className="text-sm font-black text-[#003399]">{p.rate}</p>
                      </div>
                      <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border border-slate-100 group-hover:bg-[#003399] group-hover:text-white flex items-center justify-center transition-all duration-300">
                        <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── COMO FUNCIONA ── */}
      <section className="py-20 sm:py-32 bg-[#003399] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#FFFFFF 2px, transparent 0)', backgroundSize: '30px 30px' }} />

        <div className="max-w-7xl mx-auto px-5 lg:px-12 relative z-10">
          <motion.div initial={fu} whileInView={ft(0)} viewport={VIEW} className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-24 gap-6">
            <div className="space-y-3">
              <span className="text-[#D4AF37] font-black text-[11px] uppercase tracking-[0.4em]">NOSSO PROCESSO</span>
              <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black text-white tracking-tighter">O caminho para sua conquista</h2>
            </div>
            <a href="https://wa.me/5598000000000" target="_blank" rel="noreferrer"
              className="h-14 px-8 sm:px-10 rounded-2xl bg-[#D4AF37] text-black font-black text-xs uppercase tracking-widest inline-flex items-center justify-center active:scale-[0.98] shadow-2xl shadow-black/20 hover:scale-105 transition-all w-full sm:w-auto">
              Iniciar Simulação <ArrowRight className="h-4 w-4 ml-3" />
            </a>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 rounded-2xl sm:rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl">
            {[
              { n: "01", title: "Contato Inicial", desc: "WhatsApp ou telefone. Identificamos sua necessidade real." },
              { n: "02", title: "Documentação", desc: "Envio prático e digital dos documentos básicos necessários." },
              { n: "03", title: "Análise Ágil", desc: "Perfil avaliado em até 24 horas por nossa equipe especialista." },
              { n: "04", title: "Realização", desc: "Valor aprovado e liberado direto na sua conta bancária." },
            ].map((s, i) => (
              <motion.div key={s.n} initial={fu} whileInView={ft(i * 0.08)} viewport={VIEW}
                className="bg-[#003399] hover:bg-white/[0.05] p-7 sm:p-12 flex flex-col gap-6 sm:gap-10 transition-colors">
                <span className="text-[#D4AF37] font-black text-xl sm:text-2xl tracking-tighter">{s.n}</span>
                <div>
                  <h3 className="text-white font-black text-xl sm:text-2xl mb-3 leading-tight">{s.title}</h3>
                  <p className="text-blue-100/60 font-medium leading-relaxed text-sm sm:text-base">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div initial={fu} whileInView={ft(0.2)} viewport={VIEW}
            className="mt-12 sm:mt-16 flex flex-wrap gap-6 sm:gap-8 items-center justify-center border-t border-white/10 pt-12 sm:pt-16">
            {[
              { icon: Shield, text: "REGULADO PELO BCB", color: "#D4AF37" },
              { icon: BadgeCheck, text: "OPERAÇÕES SEGURAS", color: "#FFFFFF" },
              { icon: Zap, text: "ANÁLISE EM 24H", color: "#D4AF37" },
            ].map((t) => (
              <div key={t.text} className="flex items-center gap-3">
                <t.icon className="h-5 w-5" style={{ color: t.color }} />
                <span className="text-white font-black text-[10px] uppercase tracking-[0.3em]">{t.text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="py-16 sm:py-24 lg:py-48 bg-white overflow-hidden relative">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[120px] -translate-x-1/2 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-5 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-20 items-center relative z-10">
          <motion.div initial={fu} whileInView={ft(0)} viewport={VIEW} className="lg:col-span-8">
            <span className="text-[11px] font-black uppercase tracking-[0.4em] text-[#003399] mb-6 sm:mb-8 block">PRONTO PARA O PRÓXIMO PASSO?</span>
            <h2 className="text-3xl sm:text-5xl lg:text-8xl font-black text-[#0B1222] leading-[0.9] tracking-tighter">
              Sua meta financeira <br />
              <span className="text-[#D4AF37]">começa aqui.</span>
            </h2>
          </motion.div>
          <motion.div initial={fu} whileInView={ft(0.1)} viewport={VIEW} className="lg:col-span-4 flex flex-col gap-4 sm:gap-6">
            <a href="https://wa.me/5598000000000" target="_blank" rel="noreferrer"
              className="group inline-flex items-center justify-between gap-3 h-16 px-8 rounded-2xl bg-[#003399] hover:bg-[#D4AF37] hover:text-black active:scale-[0.98] text-white font-black text-xs uppercase tracking-widest transition-all duration-300 shadow-2xl shadow-blue-900/20">
              Solicitar Crédito
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="mailto:financeira@cevan.com.br"
              className="inline-flex items-center justify-between h-16 px-8 rounded-2xl border-2 border-slate-100 text-[#0B1222] hover:border-[#003399] hover:text-[#003399] active:scale-[0.98] font-black text-xs uppercase tracking-widest transition-all">
              <span className="flex items-center gap-3"><Mail className="h-4 w-4" /> E-mail</span>
              <ArrowUpRight className="h-4 w-4 text-slate-300" />
            </a>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
