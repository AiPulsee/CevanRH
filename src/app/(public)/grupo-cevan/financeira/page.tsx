"use client";

import { motion } from "framer-motion";
import {
  ArrowRight, ArrowUpRight, Phone, Mail,
  ChevronRight, Shield, BadgeCheck, Zap,
} from "lucide-react";

const VIEW = { once: true };
const fu = { opacity: 0, y: 20 };
function ft(d = 0) {
  return { opacity: 1, y: 0, transition: { duration: 0.5, delay: d, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } };
}

export default function FinanceiraPage() {
  return (
    <div className="flex flex-col w-full overflow-hidden bg-white text-[#0B1222]" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ─────────────────────────────────────────
          HERO
          Layout: número grande à direita como elemento visual,
          headline à esquerda, sem background, sem gradiente.
      ───────────────────────────────────────── */}
      <section className="relative pt-36 pb-0 overflow-hidden">
        {/* Linha decorativa top */}
        <div className="absolute top-0 left-0 right-0 h-px bg-slate-100" />

        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Breadcrumb */}
          <motion.div initial={fu} animate={ft(0)} className="flex items-center gap-2 mb-16">
            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-widest">Grupo Cevan</span>
            <span className="text-slate-200">·</span>
            <span className="text-[11px] font-medium text-[#1967D2] uppercase tracking-widest">Financeira</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Left: headline */}
            <div className="lg:col-span-7 lg:pr-16 pb-16 lg:pb-24 lg:border-r border-slate-100">
              <motion.h1 initial={fu} animate={ft(0.08)}
                className="text-4xl sm:text-5xl lg:text-[3.75rem] font-black text-[#0B1222] leading-[1.08] tracking-[-0.03em] mb-8">
                Crédito que respeita<br />
                <span className="text-[#1967D2]">quem você é.</span>
              </motion.h1>

              <motion.p initial={fu} animate={ft(0.16)}
                className="text-slate-500 text-lg font-normal leading-[1.75] mb-10 max-w-md">
                Bolsa Família, Consignado INSS e maquininhas para empresas. Atendimento humano, análise em 24 horas.
              </motion.p>

              <motion.div initial={fu} animate={ft(0.24)} className="flex flex-wrap gap-3">
                <a href="https://wa.me/5598000000000" target="_blank" rel="noreferrer"
                  className="group inline-flex items-center gap-2.5 h-12 px-7 rounded-full bg-[#0B1222] hover:bg-[#1967D2] text-white font-semibold text-sm transition-all duration-200">
                  Falar no WhatsApp
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </a>
                <a href="tel:+5598000000000"
                  className="inline-flex items-center gap-2 h-12 px-7 rounded-full border border-slate-200 text-slate-600 hover:border-[#1967D2] hover:text-[#1967D2] font-semibold text-sm transition-all duration-200">
                  <Phone className="h-3.5 w-3.5" />
                  (98) 0000-0000
                </a>
              </motion.div>
            </div>

            {/* Right: número enorme como elemento visual */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }}
              className="lg:col-span-5 lg:pl-12 flex flex-col justify-center pb-16 lg:pb-24">
              <p className="text-[11px] font-medium uppercase tracking-widest text-slate-400 mb-4">Crédito concedido</p>
              <p className="text-[5rem] lg:text-[7rem] font-black text-[#0B1222] leading-none tracking-[-0.04em]">
                R$50<span className="text-[#1967D2]">M</span>
              </p>
              <p className="text-slate-400 font-medium text-sm mt-4">para mais de <strong className="text-[#0B1222]">2.000 clientes</strong> no Maranhão</p>

              <div className="flex gap-8 mt-10 pt-10 border-t border-slate-100">
                <div>
                  <p className="text-2xl font-black text-[#0B1222] tracking-tight">24h</p>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">análise de crédito</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-[#0B1222] tracking-tight">98%</p>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">satisfação</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-[#0B1222] tracking-tight">BCB</p>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">regulamentado</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Linha divisória */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="h-px bg-slate-100" />
        </div>
      </section>

      {/* ─────────────────────────────────────────
          PRODUTOS — lista editorial com dividers,
          não cards com gradiente.
      ───────────────────────────────────────── */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Label coluna sticky */}
            <motion.div initial={fu} whileInView={ft(0)} viewport={VIEW} className="lg:col-span-3">
              <p className="text-[11px] font-medium uppercase tracking-widest text-slate-400 mb-3">Soluções</p>
              <h2 className="text-2xl font-black text-[#0B1222] tracking-tight leading-snug">
                O que<br />oferecemos
              </h2>
            </motion.div>

            {/* Lista de produtos */}
            <div className="lg:col-span-9">
              {[
                {
                  num: "01",
                  eyebrow: "Crédito Pessoal",
                  name: "Bolsa Família",
                  desc: "Crédito com débito direto na conta do benefício. Para quem recebe mínimo R$400 de auxílio.",
                  details: ["R$101 a R$750 · Novo", "R$61 a R$750 · Refinanciamento", "Parcela máxima R$159", "Prazo até 12 meses"],
                  rate: "a partir de R$101",
                  href: "https://wa.me/5598000000000",
                },
                {
                  num: "02",
                  eyebrow: "Consignado",
                  name: "INSS",
                  desc: "Desconto direto na aposentadoria ou pensão. Até 45% da margem disponível em até 96 parcelas.",
                  details: ["35% empréstimo + 5% + 5% cartões", "Taxa teto 1,85% a.m.", "Até 96 parcelas mensais", "Desbloqueio via Meu INSS"],
                  rate: "1,85% ao mês",
                  href: "https://wa.me/5598000000000",
                },
                {
                  num: "03",
                  eyebrow: "Para Empresas",
                  name: "CevanPay",
                  desc: "Maquininhas com taxas progressivas. Quanto mais você vende, menor a taxa. S920 ou P2 Smart.",
                  details: ["Débito/Pix: 2,95% → 2,25%", "Crédito 1x: 5,05% → 4,35%", "S920 R$399 · P2 Smart R$799", "Comodato grátis (100k+/mês)"],
                  rate: "a partir de 2,25%",
                  href: "https://wa.me/5598000000000",
                },
              ].map((p, i) => (
                <motion.div key={p.num} initial={fu} whileInView={ft(i * 0.1)} viewport={VIEW}
                  className="group border-t border-slate-100 py-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 hover:bg-slate-50/50 -mx-6 lg:-mx-12 px-6 lg:px-12 transition-colors duration-300 cursor-pointer"
                  onClick={() => window.open(p.href, "_blank")}>

                  {/* Número */}
                  <div className="lg:col-span-1">
                    <span className="text-sm font-black text-slate-200 group-hover:text-[#1967D2] transition-colors">{p.num}</span>
                  </div>

                  {/* Nome + desc */}
                  <div className="lg:col-span-5">
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 mb-2">{p.eyebrow}</p>
                    <h3 className="text-2xl font-black text-[#0B1222] mb-3 group-hover:text-[#1967D2] transition-colors">{p.name}</h3>
                    <p className="text-slate-500 font-normal leading-relaxed text-[15px]">{p.desc}</p>
                  </div>

                  {/* Detalhes */}
                  <div className="lg:col-span-4">
                    <ul className="space-y-1.5">
                      {p.details.map((d) => (
                        <li key={d} className="flex items-center gap-2 text-[13px] text-slate-500">
                          <span className="h-1 w-1 rounded-full bg-[#1967D2] shrink-0" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Rate + CTA */}
                  <div className="lg:col-span-2 flex flex-col items-start lg:items-end justify-between gap-4">
                    <div className="text-right">
                      <p className="text-xs text-slate-400 font-medium">Taxa</p>
                      <p className="text-sm font-black text-[#0B1222]">{p.rate}</p>
                    </div>
                    <div className="h-9 w-9 rounded-full border border-slate-200 group-hover:border-[#1967D2] group-hover:bg-[#1967D2] flex items-center justify-center transition-all duration-200 shrink-0">
                      <ArrowUpRight className="h-4 w-4 text-slate-400 group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </motion.div>
              ))}
              <div className="border-t border-slate-100" />
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          COMO FUNCIONA — linha do tempo horizontal
          Tipografia é o layout.
      ───────────────────────────────────────── */}
      <section className="py-24 bg-[#0B1222]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div initial={fu} whileInView={ft(0)} viewport={VIEW} className="flex items-end justify-between mb-16 gap-8">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-widest text-slate-600 mb-3">Processo</p>
              <h2 className="text-3xl lg:text-4xl font-black text-white tracking-tight">Como funciona</h2>
            </div>
            <a href="https://wa.me/5598000000000" target="_blank" rel="noreferrer"
              className="shrink-0 inline-flex items-center gap-2 h-10 px-6 rounded-full border border-white/10 text-white/60 hover:text-white hover:border-white/30 font-medium text-sm transition-all">
              Começar agora <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden">
            {[
              { n: "01", title: "Contato", desc: "WhatsApp ou telefone. Nosso time identifica o produto certo para você." },
              { n: "02", title: "Documentação", desc: "Envio simples de documento, CPF e comprovante de benefício." },
              { n: "03", title: "Análise", desc: "Perfil avaliado em até 24 horas com retorno personalizado." },
              { n: "04", title: "Liberação", desc: "Valor aprovado direto na sua conta, sem complicação." },
            ].map((s, i) => (
              <motion.div key={s.n} initial={fu} whileInView={ft(i * 0.08)} viewport={VIEW}
                className="bg-[#0B1222] hover:bg-white/[0.04] transition-colors p-8 flex flex-col gap-6">
                <span className="text-[#1967D2] font-black text-lg">{s.n}</span>
                <div>
                  <h3 className="text-white font-black text-lg mb-2">{s.title}</h3>
                  <p className="text-slate-500 text-sm font-normal leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Trust strip */}
          <motion.div initial={fu} whileInView={ft(0.2)} viewport={VIEW}
            className="mt-8 flex flex-wrap gap-6 lg:gap-10 items-center">
            {[
              { icon: Shield, text: "Operações regulamentadas" },
              { icon: BadgeCheck, text: "Banco Central do Brasil" },
              { icon: Zap, text: "Análise em até 24h" },
            ].map((t) => (
              <div key={t.text} className="flex items-center gap-2.5">
                <t.icon className="h-4 w-4 text-slate-600 shrink-0" />
                <span className="text-slate-600 font-medium text-sm">{t.text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          CTA FINAL — clean, espaço generoso,
          uma única ação clara.
      ───────────────────────────────────────── */}
      <section className="py-28 lg:py-36 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <motion.div initial={fu} whileInView={ft(0)} viewport={VIEW} className="lg:col-span-8">
            <p className="text-[11px] font-medium uppercase tracking-widest text-slate-400 mb-6">Atendimento</p>
            <h2 className="text-4xl lg:text-6xl font-black text-[#0B1222] leading-[1.05] tracking-[-0.03em]">
              Pronto para<br />
              <span className="text-[#1967D2]">começar?</span>
            </h2>
          </motion.div>
          <motion.div initial={fu} whileInView={ft(0.1)} viewport={VIEW} className="lg:col-span-4 flex flex-col gap-4">
            <a href="https://wa.me/5598000000000" target="_blank" rel="noreferrer"
              className="group inline-flex items-center justify-between gap-3 h-14 px-7 rounded-2xl bg-[#0B1222] hover:bg-[#1967D2] text-white font-semibold text-[14px] transition-all duration-200">
              Falar no WhatsApp
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a href="mailto:financeira@cevan.com.br"
              className="inline-flex items-center justify-between gap-3 h-14 px-7 rounded-2xl border border-slate-200 text-slate-600 hover:border-slate-300 font-medium text-[14px] transition-colors">
              <span className="flex items-center gap-2"><Mail className="h-4 w-4" /> financeira@cevan.com.br</span>
              <ArrowUpRight className="h-4 w-4 text-slate-300" />
            </a>
            <p className="text-xs text-slate-400 font-medium pt-1">
              Resposta em até 24h úteis · Sem compromisso
            </p>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
