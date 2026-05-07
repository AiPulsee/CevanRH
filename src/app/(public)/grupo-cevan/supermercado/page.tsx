"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight, ShoppingCart, Leaf, Truck, Star,
  MapPin, Phone, Mail, Clock, Heart, Flame,
  ChevronRight, Wheat, Fish, Coffee, ShoppingBag,
} from "lucide-react";

const VIEW = { once: true };
const fu = { opacity: 0, y: 40 };
function ft(d = 0) {
  return { opacity: 1, y: 0, transition: { duration: 0.65, delay: d, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } };
}

const units = [
  {
    name: "Buriticupu",
    city: "Buriticupu/MA",
    address: "Buriticupu — MA",
    whatsapp: "https://wa.me/5598000000001",
    hours: [
      { day: "Segunda a Sexta", time: "07:30 – 19:30" },
      { day: "Sábado", time: "07:30 – 18:30" },
      { day: "Domingo", time: "Fechado" },
    ],
  },
  {
    name: "Santa Luzia",
    city: "Santa Luzia/MA",
    address: "Av. Newton Bello, 687 — Santa Luzia/MA",
    whatsapp: "https://wa.me/5598000000002",
    hours: [
      { day: "Segunda a Sexta", time: "07:30 – 19:00" },
      { day: "Sábado", time: "07:30 – 18:00" },
      { day: "Domingo", time: "Fechado" },
    ],
  },
];

const pillars = [
  { icon: Leaf, title: "Produtos de Qualidade", desc: "Qualidade garantida diariamente em todos os departamentos, selecionada com cuidado.", color: "bg-emerald-600", textColor: "text-white", descColor: "text-emerald-100", tag: "Prioridade #1", tagBg: "bg-emerald-500 text-white" },
  { icon: Truck, title: "Delivery Rápido", desc: "Entrega rápida e segura até a sua porta em Buriticupu e Santa Luzia.", color: "bg-[#0B1222]", textColor: "text-white", descColor: "text-slate-400", tag: "Disponível", tagBg: "bg-blue-500/20 text-blue-300" },
  { icon: Star, title: "Ofertas Especiais", desc: "Preços competitivos sempre. Promoções e ofertas especiais toda semana.", color: "bg-amber-500", textColor: "text-white", descColor: "text-amber-100", tag: "Toda semana", tagBg: "bg-amber-400 text-white" },
];

const depts = [
  { icon: Leaf, title: "Hortifrúti", desc: "Frutas, legumes e verduras frescos, renovados diariamente.", iconBg: "bg-emerald-50", iconColor: "text-emerald-600" },
  { icon: Flame, title: "Açougue", desc: "Carnes selecionadas e cortadas na hora por profissionais.", iconBg: "bg-red-50", iconColor: "text-red-600" },
  { icon: Wheat, title: "Padaria", desc: "Pão fresquinho todo dia a partir das 7h30 da manhã.", iconBg: "bg-amber-50", iconColor: "text-amber-600" },
  { icon: Fish, title: "Pescados", desc: "Peixaria completa com produtos frescos e congelados.", iconBg: "bg-blue-50", iconColor: "text-blue-600" },
  { icon: Coffee, title: "Mercearia", desc: "Linha completa de alimentos, higiene e limpeza.", iconBg: "bg-purple-50", iconColor: "text-purple-600" },
  { icon: ShoppingBag, title: "Comprar Online", desc: "Faça seu pedido pelo WhatsApp e receba em casa.", iconBg: "bg-emerald-50", iconColor: "text-emerald-600" },
];

export default function SupermercadoPage() {
  return (
    <div className="flex flex-col w-full font-sans bg-white text-slate-900 overflow-hidden">

      {/* ── HERO SPLIT ── */}
      <section className="relative min-h-screen grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
        {/* Left: image */}
        <div className="relative min-h-[50vh] lg:min-h-0 order-2 lg:order-1">
          <Image src="/cevan-supermarket.png" alt="Cevan Supermercado" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1222]/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white lg:to-transparent" />

          {/* Floating badges */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
            className="absolute bottom-10 left-8 flex gap-3">
            <div className="bg-emerald-600 text-white rounded-2xl px-5 py-4 shadow-2xl">
              <p className="text-2xl font-black leading-none">2</p>
              <p className="text-emerald-200 text-xs font-bold uppercase tracking-wider mt-1">Unidades</p>
            </div>
            <div className="bg-white text-slate-900 rounded-2xl px-5 py-4 shadow-2xl">
              <p className="text-2xl font-black leading-none">7:30h</p>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mt-1">Abre todo dia</p>
            </div>
          </motion.div>
        </div>

        {/* Right: content */}
        <div className="relative flex flex-col justify-center px-8 sm:px-14 lg:px-16 xl:px-20 pt-36 pb-16 lg:pt-0 bg-white order-1 lg:order-2">
          <div className="absolute left-0 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-emerald-200 to-transparent hidden lg:block" />

          <motion.div initial={fu} animate={ft(0)}>
            <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.35em] text-emerald-600 mb-8">
              <span className="h-px w-8 bg-emerald-600" /> Grupo Cevan — Varejo Alimentar
            </span>
          </motion.div>

          <motion.h1 initial={fu} animate={ft(0.1)}
            className="text-5xl sm:text-6xl xl:text-[5.5rem] font-black text-[#0B1222] leading-[0.92] tracking-tighter mb-5">
            A máquina de<br />
            <span className="text-emerald-600">vendas</span> que<br />
            nunca para!
          </motion.h1>

          <motion.p initial={fu} animate={ft(0.2)}
            className="text-slate-500 text-lg font-medium leading-relaxed mb-8 max-w-md">
            No Cevan Supermercados, você é sempre bem-vindo! Produtos de qualidade, atendimento feito com carinho e preços que cabem no seu bolso.
          </motion.p>

          {/* Unit quick links */}
          <motion.div initial={fu} animate={ft(0.3)} className="flex flex-col sm:flex-row gap-3 mb-8">
            <a href={units[0].whatsapp} target="_blank" rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 h-14 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-[12px] uppercase tracking-wider transition-all hover:-translate-y-0.5 shadow-xl shadow-emerald-200">
              <Phone className="h-4 w-4" /> WhatsApp Buriticupu
            </a>
            <a href={units[1].whatsapp} target="_blank" rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 h-14 px-6 rounded-2xl border-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50 font-black text-[12px] uppercase tracking-wider transition-all">
              <Phone className="h-4 w-4" /> WhatsApp Santa Luzia
            </a>
          </motion.div>

          {/* Tags */}
          <motion.div initial={fu} animate={ft(0.4)} className="flex flex-wrap gap-2">
            {["Santa Luzia/MA", "Buriticupu/MA", "Delivery", "Comprar Online", "Abre às 7h30"].map((tag) => (
              <span key={tag} className="text-xs font-bold text-slate-400 border border-slate-200 rounded-full px-4 py-1.5 hover:border-emerald-300 hover:text-emerald-700 transition-colors">
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 3 PILARES (bento) ── */}
      <section className="py-24 lg:py-32 bg-[#f8faff]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={fu} whileInView={ft(0)} viewport={VIEW} className="mb-14">
            <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600 mb-4">
              <span className="h-px w-6 bg-emerald-600" /> O que nos define
            </span>
            <h2 className="text-4xl lg:text-5xl font-black text-[#0B1222] tracking-tighter">
              Por que escolher o <span className="text-emerald-600">Cevan?</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {pillars.map((p, i) => (
              <motion.div key={p.title} initial={fu} whileInView={ft(i * 0.1)} viewport={VIEW}
                className={`${p.color} rounded-[2rem] p-8 flex flex-col justify-between min-h-[240px] group hover:scale-[1.02] transition-transform duration-300`}>
                <div className="flex items-start justify-between">
                  <div className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center">
                    <p.icon className={`h-6 w-6 ${p.textColor}`} />
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-widest rounded-full px-3 py-1 ${p.tagBg}`}>{p.tag}</span>
                </div>
                <div className="mt-8">
                  <h3 className={`text-xl font-black mb-2 ${p.textColor}`}>{p.title}</h3>
                  <p className={`text-sm font-medium leading-relaxed ${p.descColor}`}>{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOBRE ── */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={fu} whileInView={ft(0)} viewport={VIEW}>
            <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600 mb-5">
              <span className="h-px w-6 bg-emerald-600" /> Sobre Nós
            </span>
            <h2 className="text-4xl lg:text-5xl font-black text-[#0B1222] tracking-tighter leading-tight mb-7">
              Presentes no seu<br />
              <span className="text-emerald-600">dia a dia</span>
            </h2>
            <p className="text-slate-500 text-xl font-medium leading-relaxed mb-10">
              "No Cevan Supermercados, você é sempre bem-vindo! Fazemos questão de estar presentes no seu dia a dia, oferecendo produtos de qualidade, atendimento feito com carinho e preços que cabem no seu bolso."
            </p>
            <div className="grid grid-cols-3 gap-4">
              {[
                { n: "2", l: "Unidades" },
                { n: "7:30h", l: "Abertura" },
                { n: "100%", l: "Qualidade" },
              ].map((s) => (
                <div key={s.l} className="bg-[#f8faff] border border-slate-100 rounded-2xl px-4 py-5 text-center">
                  <p className="text-2xl font-black text-[#0B1222] tracking-tighter">{s.n}</p>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">{s.l}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Departamentos */}
          <motion.div initial={fu} whileInView={ft(0.15)} viewport={VIEW}>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6">Nossos Departamentos</p>
            <div className="grid grid-cols-2 gap-3">
              {depts.map((d, i) => (
                <motion.div key={d.title} initial={fu} whileInView={ft(i * 0.07)} viewport={VIEW}
                  className="flex gap-3 items-start bg-[#f8faff] border border-slate-100 rounded-2xl p-4 hover:border-emerald-200 hover:shadow-md transition-all duration-200">
                  <div className={`h-9 w-9 rounded-xl ${d.iconBg} flex items-center justify-center shrink-0`}>
                    <d.icon className={`h-4 w-4 ${d.iconColor}`} />
                  </div>
                  <div>
                    <h4 className="font-black text-[#0B1222] text-sm">{d.title}</h4>
                    <p className="text-xs text-slate-400 font-medium leading-snug mt-0.5">{d.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── LOJAS & HORÁRIOS ── */}
      <section id="lojas" className="py-24 lg:py-32 bg-[#0B1222] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-30"
          style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.04) 1px,transparent 0)", backgroundSize: "28px 28px" }} />
        <div className="absolute -top-40 left-0 w-[500px] h-[500px] bg-emerald-700/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div initial={fu} whileInView={ft(0)} viewport={VIEW} className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400 mb-5">
              <span className="h-px w-8 bg-emerald-400" /> Onde estamos <span className="h-px w-8 bg-emerald-400" />
            </span>
            <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tighter">
              Nossas <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-200">2 Unidades</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {units.map((unit, i) => (
              <motion.div key={unit.name} initial={fu} whileInView={ft(i * 0.15)} viewport={VIEW}
                className="bg-white/[0.04] border border-white/8 rounded-[2rem] p-8 hover:bg-white/[0.07] hover:border-emerald-500/20 transition-all duration-300">
                {/* Header */}
                <div className="flex items-start justify-between mb-7">
                  <div>
                    <h3 className="text-2xl font-black text-white">{unit.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <MapPin className="h-4 w-4 text-emerald-400 shrink-0" />
                      <span className="text-slate-400 font-medium text-sm">{unit.address}</span>
                    </div>
                  </div>
                  <div className="h-12 w-12 rounded-2xl bg-emerald-500/15 flex items-center justify-center">
                    <ShoppingCart className="h-6 w-6 text-emerald-400" />
                  </div>
                </div>

                {/* Horários */}
                <div className="space-y-2 mb-7">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-600 mb-3">Horário de Funcionamento</p>
                  {unit.hours.map((h) => (
                    <div key={h.day} className="flex items-center justify-between py-2.5 border-b border-white/5 last:border-0">
                      <div className="flex items-center gap-2">
                        <Clock className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                        <span className="text-slate-400 font-semibold text-sm">{h.day}</span>
                      </div>
                      <span className={`font-black text-sm ${h.time === "Fechado" ? "text-red-400" : "text-white"}`}>
                        {h.time}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <a href={unit.whatsapp} target="_blank" rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full h-12 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-[12px] uppercase tracking-widest transition-all">
                  <Phone className="h-4 w-4" /> WhatsApp {unit.name}
                </a>
              </motion.div>
            ))}
          </div>

          {/* Comprar online banner */}
          <motion.div initial={fu} whileInView={ft(0.2)} viewport={VIEW}
            className="mt-6 bg-emerald-600/15 border border-emerald-500/20 rounded-2xl px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0">
                <ShoppingBag className="h-6 w-6 text-emerald-400" />
              </div>
              <div>
                <p className="text-white font-black">Comprar Online</p>
                <p className="text-slate-400 font-medium text-sm">Peça pelo WhatsApp e receba em casa nas duas unidades</p>
              </div>
            </div>
            <div className="flex gap-3 shrink-0">
              <a href={units[0].whatsapp} target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 h-10 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-[11px] uppercase tracking-wider transition-all">
                Buriticupu
              </a>
              <a href={units[1].whatsapp} target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 h-10 px-5 rounded-xl border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 font-black text-[11px] uppercase tracking-wider transition-all">
                Santa Luzia
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="relative bg-emerald-600 py-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.07) 1px,transparent 0)", backgroundSize: "28px 28px" }} />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="text-[18vw] font-black text-white/[0.06] tracking-tighter leading-none whitespace-nowrap">CEVAN</span>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={fu} whileInView={ft(0)} viewport={VIEW}>
            <h2 className="text-5xl lg:text-7xl font-black text-white tracking-tighter leading-[0.92] mb-5">
              Venha nos<br />visitar!
            </h2>
            <p className="text-emerald-100 text-xl font-medium leading-relaxed max-w-md">
              Qualidade, carinho e preços que cabem no seu bolso. Duas unidades esperando por você no Maranhão.
            </p>
          </motion.div>
          <motion.div initial={fu} whileInView={ft(0.15)} viewport={VIEW} className="flex flex-col gap-4">
            <a href="#lojas"
              className="inline-flex items-center justify-center gap-2 h-16 px-10 rounded-2xl bg-white text-emerald-700 hover:bg-emerald-50 font-black uppercase tracking-widest text-[12px] transition-all hover:-translate-y-1 shadow-2xl">
              Ver Nossas Lojas <MapPin className="h-4 w-4" />
            </a>
            <div className="grid grid-cols-2 gap-3">
              <a href={units[0].whatsapp} target="_blank" rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 h-14 rounded-2xl border-2 border-white/30 text-white hover:bg-white/10 font-black text-[12px] transition-all">
                <Phone className="h-4 w-4" /> Buriticupu
              </a>
              <a href={units[1].whatsapp} target="_blank" rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 h-14 rounded-2xl border-2 border-white/30 text-white hover:bg-white/10 font-black text-[12px] transition-all">
                <Phone className="h-4 w-4" /> Santa Luzia
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
