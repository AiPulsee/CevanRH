"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight, ArrowUpRight, Phone, MapPin, Clock,
  Leaf, Flame, Wheat, Fish, Coffee, ShoppingBag,
  ShoppingCart, Star, Truck, Heart, CheckCircle2,
  ChevronRight, Package, BadgeCheck, Users,
} from "lucide-react";

/* ─────────── animation helpers ─────────── */
const VIEW = { once: true, margin: "-80px" };
const fu = { opacity: 0, y: 24 };
function ft(d = 0) {
  return {
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: d, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  };
}

/* ─────────── data ─────────── */
const units = [
  {
    num: "01",
    name: "Buriticupu",
    city: "Buriticupu — MA",
    address: "Buriticupu, Maranhão",
    whatsapp: "https://wa.me/5598000000001",
    hours: [
      { day: "Segunda a Sexta", time: "07:30 – 19:30" },
      { day: "Sábado", time: "07:30 – 18:30" },
      { day: "Domingo", time: "Fechado" },
    ],
  },
  {
    num: "02",
    name: "Santa Luzia",
    city: "Santa Luzia — MA",
    address: "Av. Newton Bello, 687 — Santa Luzia/MA",
    whatsapp: "https://wa.me/5598000000002",
    hours: [
      { day: "Segunda a Sexta", time: "07:30 – 19:00" },
      { day: "Sábado", time: "07:30 – 18:00" },
      { day: "Domingo", time: "Fechado" },
    ],
  },
];

const depts = [
  {
    num: "01",
    icon: Leaf,
    title: "Hortifrúti",
    desc: "Frutas, legumes e verduras frescos, selecionados e renovados diariamente direto dos produtores locais.",
    tag: "Renovado diariamente",
  },
  {
    num: "02",
    icon: Flame,
    title: "Açougue",
    desc: "Carnes nobres selecionadas e cortadas na hora por profissionais especializados. Do corte ao tempero.",
    tag: "Corte sob encomenda",
  },
  {
    num: "03",
    icon: Wheat,
    title: "Padaria",
    desc: "Pão fresquinho a partir das 7h30 todos os dias. Bolos, salgados e confeitaria artesanal.",
    tag: "A partir das 7h30",
  },
  {
    num: "04",
    icon: Fish,
    title: "Pescados",
    desc: "Peixaria completa com frutos do mar frescos e congelados. Procedência garantida, qualidade certificada.",
    tag: "Frescos e congelados",
  },
  {
    num: "05",
    icon: Coffee,
    title: "Mercearia",
    desc: "Linha completa de alimentos, higiene pessoal e produtos de limpeza das melhores marcas do mercado.",
    tag: "Linha completa",
  },
  {
    num: "06",
    icon: ShoppingBag,
    title: "Delivery",
    desc: "Faça seu pedido pelo WhatsApp e receba no conforto da sua casa. Atendemos toda a região.",
    tag: "Entrega rápida",
  },
];

const diferenciais = [
  {
    icon: Star,
    title: "Qualidade Garantida",
    desc: "Selecionamos apenas produtos de primeira qualidade, com controle rigoroso de validade e procedência em todos os departamentos.",
    stat: "100%",
    statLabel: "Qualidade verificada",
  },
  {
    icon: Truck,
    title: "Delivery nas Duas Cidades",
    desc: "Entregamos na sua porta em Buriticupu e Santa Luzia. Rápido, seguro e no horário combinado.",
    stat: "2",
    statLabel: "Cidades atendidas",
  },
  {
    icon: Heart,
    title: "Atendimento com Carinho",
    desc: "Nossa equipe é treinada para atender você com atenção e respeito. Cada cliente é único para a gente.",
    stat: "15+",
    statLabel: "Anos de tradição",
  },
];

export default function SupermercadoPage() {
  return (
    <div className="flex flex-col w-full bg-white text-[#0B1222] overflow-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ══════════════════════════════════════════
          01. HERO — editorial split
      ══════════════════════════════════════════ */}
      <section className="relative min-h-screen grid grid-cols-1 lg:grid-cols-2 overflow-hidden">

        {/* Left: image panel */}
        <div className="relative min-h-[55vh] lg:min-h-0 order-2 lg:order-1">
          <Image
            src="/cevan-supermarket.png"
            alt="Cevan Supermercado"
            fill
            className="object-cover"
            priority
          />
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1222]/70 via-[#0B1222]/10 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/90 lg:to-transparent hidden lg:block" />

          {/* Bottom stats overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="flex items-end gap-3"
            >
              <div className="bg-emerald-600 rounded-2xl px-6 py-4 shadow-2xl shadow-emerald-900/40">
                <p className="text-3xl font-black text-white leading-none">2</p>
                <p className="text-emerald-200 text-[10px] font-black uppercase tracking-widest mt-1">Unidades</p>
              </div>
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-2xl">
                <p className="text-3xl font-black text-[#0B1222] leading-none">7:30</p>
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-1">Abre todo dia</p>
              </div>
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-2xl">
                <p className="text-3xl font-black text-emerald-600 leading-none">15+</p>
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-1">Anos</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right: content */}
        <div className="relative flex flex-col justify-center px-8 sm:px-14 lg:px-16 xl:px-20 pt-32 pb-16 lg:pt-0 bg-white order-1 lg:order-2">
          {/* Vertical divider */}
          <div className="absolute left-0 top-[15%] bottom-[15%] w-px bg-gradient-to-b from-transparent via-emerald-100 to-transparent hidden lg:block" />

          {/* Breadcrumb */}
          <motion.div initial={fu} animate={ft(0)} className="flex items-center gap-2 mb-10">
            <Link href="/grupo-cevan" className="text-[11px] font-medium text-slate-400 uppercase tracking-widest hover:text-emerald-600 transition-colors">
              Grupo Cevan
            </Link>
            <ChevronRight className="h-3 w-3 text-slate-300" />
            <span className="text-[11px] font-medium text-emerald-600 uppercase tracking-widest">Supermercado</span>
          </motion.div>

          <motion.div initial={fu} animate={ft(0.08)}>
            <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.35em] text-emerald-600 mb-6">
              <span className="h-px w-8 bg-emerald-600" />
              Varejo Alimentar — Maranhão
            </span>
          </motion.div>

          <motion.h1
            initial={fu}
            animate={ft(0.14)}
            className="text-5xl sm:text-6xl xl:text-[5rem] font-black text-[#0B1222] leading-[0.95] tracking-[-0.03em] mb-6"
          >
            Qualidade,<br />
            carinho e preço<br />
            <span className="text-emerald-600">que cabem</span><br />
            no bolso.
          </motion.h1>

          <motion.p
            initial={fu}
            animate={ft(0.2)}
            className="text-slate-500 text-lg font-normal leading-[1.75] mb-8 max-w-md"
          >
            No Cevan Supermercados, você é sempre bem-vindo. Presentes no seu dia a dia com produtos frescos, atendimento feito com carinho e delivery rápido.
          </motion.p>

          <motion.div initial={fu} animate={ft(0.26)} className="flex flex-col sm:flex-row gap-3 mb-8">
            <a
              href={units[0].whatsapp}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center justify-center gap-2.5 h-13 px-7 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-[12px] uppercase tracking-widest transition-all hover:-translate-y-0.5 shadow-xl shadow-emerald-200"
            >
              <Phone className="h-4 w-4" />
              WhatsApp Buriticupu
              <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </a>
            <a
              href={units[1].whatsapp}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 h-13 px-7 rounded-2xl border-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50 font-black text-[12px] uppercase tracking-widest transition-all"
            >
              <Phone className="h-4 w-4" />
              WhatsApp Santa Luzia
            </a>
          </motion.div>

          <motion.div initial={fu} animate={ft(0.32)} className="flex flex-wrap gap-2">
            {["Buriticupu/MA", "Santa Luzia/MA", "Delivery", "Abre às 7h30", "Compra Online"].map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-bold text-slate-400 border border-slate-200 rounded-full px-4 py-1.5 hover:border-emerald-300 hover:text-emerald-700 transition-colors cursor-default"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          02. STATS BAR
      ══════════════════════════════════════════ */}
      <section className="bg-[#f0faf5] py-16 border-y border-emerald-100 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span className="text-[16vw] font-black text-emerald-600/[0.04] uppercase tracking-tighter whitespace-nowrap">CEVAN</span>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 divide-y-2 lg:divide-y-0 lg:divide-x divide-emerald-100">
            {[
              { value: "2", label: "Unidades no Maranhão", icon: MapPin },
              { value: "15+", label: "Anos de Tradição", icon: Star },
              { value: "7h30", label: "Abre Todo Dia", icon: Clock },
              { value: "100%", label: "Qualidade Garantida", icon: BadgeCheck },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={fu}
                whileInView={ft(i * 0.08)}
                viewport={VIEW}
                className="flex flex-col items-center text-center px-6 py-4"
              >
                <s.icon className="h-6 w-6 text-emerald-500 mb-3 opacity-70" />
                <span className="text-4xl lg:text-5xl font-black text-[#0B1222] tracking-tighter leading-none mb-2">
                  {s.value}
                </span>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{s.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          03. DIFERENCIAIS — editorial rows
      ══════════════════════════════════════════ */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Sticky label */}
            <motion.div initial={fu} whileInView={ft(0)} viewport={VIEW} className="lg:col-span-3">
              <p className="text-[11px] font-medium uppercase tracking-widest text-slate-400 mb-3">Nossos Pilares</p>
              <h2 className="text-2xl font-black text-[#0B1222] tracking-tight leading-snug">
                Por que<br />escolher o<br />Cevan?
              </h2>
            </motion.div>

            {/* Rows */}
            <div className="lg:col-span-9">
              {diferenciais.map((d, i) => (
                <motion.div
                  key={d.title}
                  initial={fu}
                  whileInView={ft(i * 0.1)}
                  viewport={VIEW}
                  className="group border-t border-slate-100 py-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 hover:bg-slate-50/60 -mx-6 lg:-mx-12 px-6 lg:px-12 transition-colors duration-300"
                >
                  {/* Icon + num */}
                  <div className="lg:col-span-1 flex items-start gap-3 lg:flex-col lg:gap-2">
                    <div className="h-10 w-10 rounded-xl bg-emerald-50 group-hover:bg-emerald-100 flex items-center justify-center transition-colors shrink-0">
                      <d.icon className="h-5 w-5 text-emerald-600" />
                    </div>
                    <span className="text-[11px] font-black text-slate-200 group-hover:text-emerald-400 transition-colors hidden lg:block mt-1">
                      0{i + 1}
                    </span>
                  </div>

                  {/* Title + desc */}
                  <div className="lg:col-span-7">
                    <h3 className="text-xl font-black text-[#0B1222] mb-3 group-hover:text-emerald-700 transition-colors">
                      {d.title}
                    </h3>
                    <p className="text-slate-500 font-normal leading-relaxed text-[15px]">{d.desc}</p>
                  </div>

                  {/* Stat */}
                  <div className="lg:col-span-4 flex flex-row lg:flex-col items-center lg:items-end justify-start lg:justify-center gap-3">
                    <div className="text-right">
                      <p className="text-3xl lg:text-4xl font-black text-[#0B1222] tracking-tighter leading-none group-hover:text-emerald-600 transition-colors">
                        {d.stat}
                      </p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">{d.statLabel}</p>
                    </div>
                    <div className="h-9 w-9 rounded-full border border-slate-200 group-hover:border-emerald-400 group-hover:bg-emerald-400 flex items-center justify-center transition-all duration-200 shrink-0">
                      <ArrowUpRight className="h-4 w-4 text-slate-300 group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </motion.div>
              ))}
              <div className="border-t border-slate-100" />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          04. DEPARTAMENTOS — bento grid
      ══════════════════════════════════════════ */}
      <section className="py-24 lg:py-32 bg-[#f8faff]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={fu} whileInView={ft(0)} viewport={VIEW} className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
            <div>
              <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.35em] text-emerald-600 mb-4">
                <span className="h-px w-8 bg-emerald-600" />
                O que você encontra aqui
              </span>
              <h2 className="text-4xl lg:text-5xl font-black text-[#0B1222] tracking-tighter">
                Nossos<br />
                <span className="text-emerald-600">Departamentos</span>
              </h2>
            </div>
            <p className="text-slate-500 font-medium max-w-sm text-[15px] leading-relaxed lg:text-right">
              Tudo que sua família precisa no mesmo lugar, com qualidade, variedade e preço justo.
            </p>
          </motion.div>

          {/* Bento grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {depts.map((d, i) => (
              <motion.div
                key={d.title}
                initial={fu}
                whileInView={ft(i * 0.08)}
                viewport={VIEW}
                className="group bg-white border border-slate-100 rounded-[1.75rem] p-7 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-50 transition-all duration-300 cursor-default"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="h-12 w-12 rounded-2xl bg-emerald-50 group-hover:bg-emerald-100 flex items-center justify-center transition-colors">
                    <d.icon className="h-6 w-6 text-emerald-600" />
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 group-hover:bg-emerald-100 rounded-full px-3 py-1.5 transition-colors">
                    {d.tag}
                  </span>
                </div>
                <div>
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-[10px] font-black text-slate-200 group-hover:text-emerald-300 transition-colors">{d.num}</span>
                    <h3 className="text-lg font-black text-[#0B1222]">{d.title}</h3>
                  </div>
                  <p className="text-slate-500 text-sm font-normal leading-relaxed">{d.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          05. SOBRE — image + texto com quote
      ══════════════════════════════════════════ */}
      <section className="py-24 lg:py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Image */}
          <motion.div initial={fu} whileInView={ft(0)} viewport={VIEW} className="relative">
            <div className="relative rounded-[2.5rem] overflow-hidden aspect-[4/5]">
              <Image src="/cevan-supermarket.png" alt="Cevan Supermercado" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1222]/50 via-transparent to-transparent" />
            </div>
            {/* Ghost number */}
            <div className="absolute -right-4 -top-4 text-[130px] lg:text-[160px] font-black leading-none text-emerald-600/[0.06] select-none pointer-events-none tracking-tighter">
              15
            </div>
            {/* Floating card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={VIEW}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="absolute bottom-8 -right-4 lg:-right-8 bg-emerald-600 text-white rounded-2xl p-6 shadow-2xl shadow-emerald-900/30 max-w-[200px]"
            >
              <Users className="h-6 w-6 text-emerald-200 mb-3" />
              <p className="text-2xl font-black leading-none mb-1">Milhares</p>
              <p className="text-emerald-200 text-xs font-bold uppercase tracking-wider">de famílias atendidas</p>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div initial={fu} whileInView={ft(0.15)} viewport={VIEW} className="space-y-8">
            <div>
              <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.35em] text-emerald-600 mb-5">
                <span className="h-px w-6 bg-emerald-600" />
                Sobre Nós
              </span>
              <h2 className="text-4xl lg:text-5xl font-black text-[#0B1222] leading-[1.05] tracking-tighter">
                Presentes no seu<br />
                <span className="text-emerald-600">dia a dia</span>
              </h2>
            </div>

            {/* Pull quote */}
            <blockquote className="relative pl-6 border-l-4 border-emerald-500">
              <p className="text-slate-700 text-lg font-medium leading-relaxed italic">
                "No Cevan Supermercados, você é sempre bem-vindo! Fazemos questão de estar presentes no seu dia a dia, oferecendo produtos de qualidade, atendimento feito com carinho e preços que cabem no seu bolso."
              </p>
            </blockquote>

            {/* Trust items */}
            <div className="space-y-4 pt-2">
              {[
                { icon: CheckCircle2, text: "Renovação diária dos produtos frescos" },
                { icon: CheckCircle2, text: "Equipe treinada e atendimento humanizado" },
                { icon: CheckCircle2, text: "Preços competitivos e promoções semanais" },
                { icon: CheckCircle2, text: "Delivery rápido nas duas cidades" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <Icon className="h-5 w-5 text-emerald-500 shrink-0" />
                  <span className="text-slate-700 font-semibold text-[15px]">{text}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={units[0].whatsapp}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 h-12 px-7 rounded-2xl bg-[#0B1222] hover:bg-emerald-600 text-white font-black text-[12px] uppercase tracking-widest transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-slate-900/20"
              >
                Falar no WhatsApp <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#lojas"
                className="inline-flex items-center gap-2 h-12 px-7 rounded-2xl border border-slate-200 text-slate-600 hover:border-emerald-300 hover:text-emerald-700 font-bold text-[12px] uppercase tracking-widest transition-all"
              >
                Ver Lojas <MapPin className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          06. COMO COMPRAR — process
      ══════════════════════════════════════════ */}
      <section className="py-24 lg:py-28 bg-[#0B1222]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div initial={fu} whileInView={ft(0)} viewport={VIEW} className="flex items-end justify-between mb-16 gap-8">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-widest text-slate-600 mb-3">Delivery</p>
              <h2 className="text-3xl lg:text-4xl font-black text-white tracking-tight">
                Como pedir pelo<br />WhatsApp
              </h2>
            </div>
            <div className="flex gap-3 shrink-0">
              <a
                href={units[0].whatsapp}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 h-10 px-5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-black text-[11px] uppercase tracking-wider transition-all"
              >
                Buriticupu
              </a>
              <a
                href={units[1].whatsapp}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 h-10 px-5 rounded-full border border-white/10 text-white/60 hover:text-white hover:border-white/30 font-medium text-[11px] uppercase tracking-wider transition-all"
              >
                Santa Luzia
              </a>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.05] rounded-2xl overflow-hidden">
            {[
              { n: "01", icon: Phone, title: "Chame no WhatsApp", desc: "Envie uma mensagem para a unidade mais próxima de você e diga o que precisa." },
              { n: "02", icon: Package, title: "Faça seu Pedido", desc: "Nossa equipe monta a lista completa com os produtos disponíveis no dia." },
              { n: "03", icon: CheckCircle2, title: "Confirme o Valor", desc: "Receba a confirmação com o total, formas de pagamento e prazo de entrega." },
              { n: "04", icon: Truck, title: "Receba em Casa", desc: "Seu pedido chega fresquinho, dentro do prazo, direto na sua porta." },
            ].map((s, i) => (
              <motion.div
                key={s.n}
                initial={fu}
                whileInView={ft(i * 0.08)}
                viewport={VIEW}
                className="bg-[#0B1222] hover:bg-white/[0.04] transition-colors p-8 flex flex-col gap-5"
              >
                <div className="flex items-center justify-between">
                  <div className="h-10 w-10 rounded-xl bg-emerald-500/15 flex items-center justify-center">
                    <s.icon className="h-5 w-5 text-emerald-400" />
                  </div>
                  <span className="text-lg font-black text-emerald-600/40">{s.n}</span>
                </div>
                <div>
                  <h3 className="text-white font-black text-base mb-2">{s.title}</h3>
                  <p className="text-slate-500 text-sm font-normal leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Trust strip */}
          <motion.div initial={fu} whileInView={ft(0.2)} viewport={VIEW} className="mt-8 flex flex-wrap gap-6 lg:gap-10 items-center">
            {[
              { icon: BadgeCheck, text: "Produtos frescos garantidos" },
              { icon: Clock, text: "Entrega no prazo combinado" },
              { icon: Heart, text: "Atendimento com carinho" },
            ].map((t) => (
              <div key={t.text} className="flex items-center gap-2.5">
                <t.icon className="h-4 w-4 text-slate-600 shrink-0" />
                <span className="text-slate-600 font-medium text-sm">{t.text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          07. LOJAS & HORÁRIOS
      ══════════════════════════════════════════ */}
      <section id="lojas" className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div initial={fu} whileInView={ft(0)} viewport={VIEW} className="mb-16">
            <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.35em] text-emerald-600 mb-4">
              <span className="h-px w-8 bg-emerald-600" />
              Onde estamos
            </span>
            <h2 className="text-4xl lg:text-5xl font-black text-[#0B1222] tracking-tighter">
              Nossas <span className="text-emerald-600">2 Unidades</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {units.map((unit, i) => (
              <motion.div
                key={unit.name}
                initial={fu}
                whileInView={ft(i * 0.12)}
                viewport={VIEW}
                className="group border border-slate-100 rounded-[2rem] p-8 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-50 transition-all duration-300"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Unidade {unit.num}</span>
                    <h3 className="text-3xl font-black text-[#0B1222] mt-1">{unit.name}</h3>
                    <div className="flex items-center gap-2 mt-2">
                      <MapPin className="h-4 w-4 text-emerald-500 shrink-0" />
                      <span className="text-slate-500 font-medium text-sm">{unit.address}</span>
                    </div>
                  </div>
                  <div className="h-14 w-14 rounded-2xl bg-emerald-50 group-hover:bg-emerald-100 flex items-center justify-center transition-colors shrink-0">
                    <ShoppingCart className="h-7 w-7 text-emerald-600" />
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-slate-100 mb-7" />

                {/* Horários */}
                <div className="mb-8">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Horário de Funcionamento</p>
                  <div className="space-y-0">
                    {unit.hours.map((h) => (
                      <div
                        key={h.day}
                        className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0"
                      >
                        <div className="flex items-center gap-2.5">
                          <Clock className="h-3.5 w-3.5 text-slate-300 shrink-0" />
                          <span className="text-slate-600 font-semibold text-sm">{h.day}</span>
                        </div>
                        <span className={`font-black text-sm px-3 py-1 rounded-lg ${
                          h.time === "Fechado"
                            ? "text-rose-500 bg-rose-50"
                            : "text-emerald-700 bg-emerald-50"
                        }`}>
                          {h.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <a
                  href={unit.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="group/btn inline-flex items-center justify-between w-full h-13 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-[12px] uppercase tracking-widest transition-all"
                >
                  <span className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    WhatsApp {unit.name}
                  </span>
                  <ArrowRight className="h-4 w-4 -translate-x-1 group-hover/btn:translate-x-0 transition-transform" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          08. CTA FINAL — editorial
      ══════════════════════════════════════════ */}
      <section className="py-28 lg:py-36 bg-[#f0faf5] border-t border-emerald-100 overflow-hidden relative">
        {/* Ghost text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="text-[14vw] font-black text-emerald-600/[0.05] tracking-tighter leading-none whitespace-nowrap">
            CEVAN
          </span>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <motion.div initial={fu} whileInView={ft(0)} viewport={VIEW} className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.35em] text-emerald-600 mb-6">
              <span className="h-px w-6 bg-emerald-600" />
              Venha nos visitar
            </span>
            <h2 className="text-5xl lg:text-7xl font-black text-[#0B1222] leading-[0.95] tracking-[-0.03em]">
              Você é sempre<br />
              <span className="text-emerald-600">bem-vindo.</span>
            </h2>
            <p className="text-slate-500 text-xl font-normal leading-relaxed mt-6 max-w-lg">
              Duas unidades no Maranhão esperando por você. Venha pessoalmente ou peça pelo WhatsApp — do jeito que for melhor para você.
            </p>
          </motion.div>

          <motion.div initial={fu} whileInView={ft(0.12)} viewport={VIEW} className="lg:col-span-5 flex flex-col gap-4">
            <a
              href="#lojas"
              className="group inline-flex items-center justify-between h-14 px-7 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-[12px] uppercase tracking-widest transition-all hover:-translate-y-0.5 shadow-xl shadow-emerald-200"
            >
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Ver Nossas Lojas
              </span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <div className="grid grid-cols-2 gap-3">
              <a
                href={units[0].whatsapp}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 h-13 rounded-2xl border-2 border-emerald-200 text-emerald-700 hover:bg-emerald-100 font-black text-[11px] uppercase tracking-wider transition-all"
              >
                <Phone className="h-3.5 w-3.5" />
                Buriticupu
              </a>
              <a
                href={units[1].whatsapp}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 h-13 rounded-2xl border-2 border-emerald-200 text-emerald-700 hover:bg-emerald-100 font-black text-[11px] uppercase tracking-wider transition-all"
              >
                <Phone className="h-3.5 w-3.5" />
                Santa Luzia
              </a>
            </div>
            <Link
              href="/grupo-cevan"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-emerald-600 font-medium text-sm transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
              Conhecer o Grupo Cevan
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
