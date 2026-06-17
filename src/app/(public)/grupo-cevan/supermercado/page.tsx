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

const VIEW = { once: true, margin: "-80px" };
const fu = { opacity: 0, y: 24 };
function ft(d = 0) {
  return {
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: d, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  };
}

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
    address: "Av. Newton Bello, 1032 - B — Santa Luzia/MA",
    whatsapp: "https://wa.me/5598000000002",
    hours: [
      { day: "Segunda a Sexta", time: "07:30 – 19:00" },
      { day: "Sábado", time: "07:30 – 18:00" },
      { day: "Domingo", time: "Fechado" },
    ],
  },
];

const depts = [
  { num: "01", icon: Leaf, title: "Hortifrúti", desc: "Frutas, legumes e verduras frescos, selecionados e renovados diariamente direto dos produtores locais.", tag: "Renovado diariamente" },
  { num: "02", icon: Flame, title: "Açougue", desc: "Carnes nobres selecionadas e cortadas na hora por profissionais especializados. Do corte ao tempero.", tag: "Corte sob encomenda" },
  { num: "03", icon: Wheat, title: "Padaria", desc: "Pão fresquinho a partir das 7h30 todos os dias. Bolos, salgados e confeitaria artesanal.", tag: "A partir das 7h30" },
  { num: "04", icon: Fish, title: "Pescados", desc: "Peixaria completa com frutos do mar frescos e congelados. Procedência garantida, qualidade certificada.", tag: "Frescos e congelados" },
  { num: "05", icon: Coffee, title: "Mercearia", desc: "Linha completa de alimentos, higiene pessoal e produtos de limpeza das melhores marcas do mercado.", tag: "Linha completa" },
  { num: "06", icon: ShoppingBag, title: "Delivery", desc: "Faça seu pedido pelo WhatsApp e receba no conforto da sua casa. Atendemos toda a região.", tag: "Entrega rápida" },
];

const diferenciais = [
  { icon: Star, title: "Qualidade Garantida", desc: "Selecionamos apenas produtos de primeira qualidade, com controle rigoroso de validade e procedência em todos os departamentos.", stat: "100%", statLabel: "Qualidade verificada" },
  { icon: Truck, title: "Delivery nas Duas Cidades", desc: "Entregamos na sua porta em Buriticupu e Santa Luzia. Rápido, seguro e no horário combinado.", stat: "2", statLabel: "Cidades atendidas" },
  { icon: Heart, title: "Atendimento com Carinho", desc: "Nossa equipe é treinada para atender você com atenção e respeito. Cada cliente é único para a gente.", stat: "15+", statLabel: "Anos de tradição" },
];

const ONLINE_SHOP_URL = "https://www.compresemfila.com.br/delivery/loja/11186/loja?visitante=true&_branch_match_id=1581284821630949448&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXT87PLShKLU7NTcvMSdRLLCjQy8nMy9Y3NDS0MLOvK0pNSy0qysxLj08qyi8vTi2y9S9ILUoEAAt%2BnWs9AAAA";

export default function SupermercadoPage() {
  return (
    <div className="flex flex-col w-full bg-white text-[#202F36] overflow-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ── 01. HERO ── */}
      <section className="relative min-h-[100svh] lg:min-h-screen grid grid-cols-1 lg:grid-cols-2 overflow-hidden bg-white">

        {/* Left: image panel — shows below content on mobile */}
        <div className="relative min-h-[45vw] lg:min-h-0 order-2 lg:order-1">
          <Image
            src="/cevan-supermarket.png"
            alt="Cevan Supermercado"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[#202F36]/40 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#202F36] via-transparent to-transparent opacity-80" />

          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="flex flex-wrap items-end gap-3"
            >
              <div className="bg-[#FD0100] rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-4 shadow-2xl shadow-red-900/40">
                <p className="text-2xl sm:text-3xl font-black text-white leading-none">2</p>
                <p className="text-red-100 text-[10px] font-black uppercase tracking-widest mt-1">Unidades</p>
              </div>
              <div className="bg-white rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-4 shadow-2xl">
                <p className="text-2xl sm:text-3xl font-black text-[#202F36] leading-none">7:30</p>
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-1">Abre todo dia</p>
              </div>
              <div className="bg-[#1995E8] rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-4 shadow-2xl">
                <p className="text-2xl sm:text-3xl font-black text-white leading-none">15+</p>
                <p className="text-blue-100 text-[10px] font-black uppercase tracking-widest mt-1">Anos</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right: content — shows first on mobile */}
        <div className="relative flex flex-col justify-center px-5 sm:px-12 lg:px-20 pt-24 sm:pt-28 pb-10 lg:pt-0 bg-white order-1 lg:order-2">
          <div className="absolute left-0 top-[20%] bottom-[20%] w-px bg-gradient-to-b from-transparent via-[#1995E8]/20 to-transparent hidden lg:block" />

          <motion.div initial={fu} animate={ft(0)} className="flex items-center gap-2 mb-8">
            <Link href="/grupo-cevan" className="text-[11px] font-bold text-slate-400 uppercase tracking-widest hover:text-[#1995E8] transition-colors">
              Grupo Cevan
            </Link>
            <ChevronRight className="h-3 w-3 text-slate-300" />
            <span className="text-[11px] font-bold text-[#1995E8] uppercase tracking-widest">Supermercados</span>
          </motion.div>

          <motion.div initial={fu} animate={ft(0.08)}>
            <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.35em] text-[#FD0100] mb-5">
              <span className="h-px w-8 bg-[#FD0100]" />
              Varejo Alimentar — Maranhão
            </span>
          </motion.div>

          <motion.h1
            initial={fu}
            animate={ft(0.14)}
            className="text-[2.4rem] sm:text-5xl xl:text-[5.5rem] font-black text-[#202F36] leading-[0.95] tracking-tight mb-6"
          >
            Qualidade,<br />
            carinho e preço<br />
            <span className="text-[#FD0100]">que cabem</span><br />
            no bolso.
          </motion.h1>

          <motion.p
            initial={fu}
            animate={ft(0.2)}
            className="text-slate-500 text-base sm:text-lg font-medium leading-relaxed mb-8 max-w-md"
          >
            No Cevan Supermercados, você é sempre bem-vindo. Presentes no seu dia a dia com produtos frescos, atendimento humano e delivery rápido.
          </motion.p>

          <motion.div initial={fu} animate={ft(0.26)} className="flex flex-col gap-3 mb-8">
            <a
              href={ONLINE_SHOP_URL}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center justify-center gap-3 h-14 sm:h-16 w-full px-8 rounded-2xl bg-[#1995E8] hover:bg-[#1581c9] active:scale-[0.98] text-white font-black text-[12px] sm:text-[13px] uppercase tracking-widest transition-all shadow-2xl shadow-blue-200"
            >
              <ShoppingCart className="h-5 w-5" />
              COMPRE ONLINE AGORA
              <ArrowUpRight className="h-5 w-5 opacity-50 group-hover:opacity-100 transition-all" />
            </a>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={units[0].whatsapp}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-3 h-13 px-6 rounded-2xl border-2 border-slate-200 text-[#202F36] hover:border-[#FD0100] hover:text-[#FD0100] active:scale-[0.98] font-black text-[11px] uppercase tracking-widest transition-all py-4"
              >
                <Phone className="h-4 w-4" />
                Buriticupu
              </a>
              <a
                href={units[1].whatsapp}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-3 h-13 px-6 rounded-2xl border-2 border-slate-200 text-[#202F36] hover:border-[#FD0100] hover:text-[#FD0100] active:scale-[0.98] font-black text-[11px] uppercase tracking-widest transition-all py-4"
              >
                <Phone className="h-4 w-4" />
                Santa Luzia
              </a>
            </div>
          </motion.div>

          <motion.div initial={fu} animate={ft(0.32)} className="flex flex-wrap gap-2">
            {["Buriticupu/MA", "Santa Luzia/MA", "Delivery", "Abre às 7h30"].map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-black text-slate-400 border border-slate-100 rounded-full px-4 py-2 hover:border-[#1995E8]/30 hover:text-[#1995E8] transition-colors cursor-default"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 02. STATS BAR ── */}
      <section className="bg-[#1995E8]/5 py-12 sm:py-20 border-y border-slate-100 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span className="text-[15vw] font-black text-[#202F36]/[0.03] uppercase tracking-tighter whitespace-nowrap">CEVAN</span>
        </div>
        <div className="max-w-7xl mx-auto px-5 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-0 lg:divide-x divide-slate-100">
            {[
              { value: "2", label: "Unidades", icon: MapPin },
              { value: "15+", label: "Anos de Tradição", icon: Star },
              { value: "7h30", label: "Abre Todo Dia", icon: Clock },
              { value: "100%", label: "Qualidade", icon: BadgeCheck },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={fu}
                whileInView={ft(i * 0.08)}
                viewport={VIEW}
                className="flex flex-col items-center text-center px-4 sm:px-8"
              >
                <s.icon className="h-6 w-6 sm:h-7 sm:w-7 text-[#1995E8] mb-3 sm:mb-4 opacity-70" />
                <span className="text-4xl sm:text-5xl font-black text-[#202F36] tracking-tighter leading-none mb-2 sm:mb-3">
                  {s.value}
                </span>
                <span className="text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-widest">{s.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 03. DIFERENCIAIS ── */}
      <section className="py-14 sm:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-5 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <motion.div initial={fu} whileInView={ft(0)} viewport={VIEW} className="lg:col-span-4">
              <p className="text-[11px] font-black uppercase tracking-[0.3em] text-[#1995E8] mb-4">NOSSOS PILARES</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#202F36] tracking-tight leading-[1.1]">
                Por que escolher<br />o Cevan?
              </h2>
              <p className="text-slate-500 mt-5 text-base sm:text-lg font-medium leading-relaxed">
                Nossa história é construída sobre confiança e a satisfação de milhares de famílias maranhenses.
              </p>
            </motion.div>

            <div className="lg:col-span-8">
              {diferenciais.map((d, i) => (
                <motion.div
                  key={d.title}
                  initial={fu}
                  whileInView={ft(i * 0.1)}
                  viewport={VIEW}
                  className="group border-t border-slate-100 py-8 sm:py-12 grid grid-cols-1 md:grid-cols-12 gap-6 hover:bg-slate-50/80 -mx-5 lg:-mx-12 px-5 lg:px-12 transition-colors duration-300"
                >
                  <div className="md:col-span-1 flex items-start">
                    <div className="h-11 w-11 sm:h-12 sm:w-12 rounded-2xl bg-[#1995E8]/10 group-hover:bg-[#1995E8] flex items-center justify-center transition-all duration-300">
                      <d.icon className="h-5 w-5 sm:h-6 sm:w-6 text-[#1995E8] group-hover:text-white transition-colors" />
                    </div>
                  </div>

                  <div className="md:col-span-7">
                    <h3 className="text-xl sm:text-2xl font-black text-[#202F36] mb-3 group-hover:text-[#1995E8] transition-colors">
                      {d.title}
                    </h3>
                    <p className="text-slate-500 font-medium leading-relaxed text-sm sm:text-base">{d.desc}</p>
                  </div>

                  <div className="md:col-span-4 flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-4">
                    <div className="text-right">
                      <p className="text-3xl sm:text-4xl font-black text-[#202F36] tracking-tighter leading-none group-hover:text-[#FD0100] transition-colors">
                        {d.stat}
                      </p>
                      <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mt-1">{d.statLabel}</p>
                    </div>
                    <div className="h-10 w-10 rounded-full border border-slate-200 group-hover:border-[#FD0100] group-hover:bg-[#FD0100] flex items-center justify-center transition-all duration-300 shrink-0">
                      <ArrowUpRight className="h-5 w-5 text-slate-300 group-hover:text-white" />
                    </div>
                  </div>
                </motion.div>
              ))}
              <div className="border-t border-slate-100" />
            </div>
          </div>
        </div>
      </section>

      {/* ── 04. DEPARTAMENTOS ── */}
      <section className="py-14 sm:py-24 lg:py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-5">
          <motion.div initial={fu} whileInView={ft(0)} viewport={VIEW} className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-20">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.35em] text-[#FD0100] mb-4">
                <span className="h-px w-8 bg-[#FD0100]" />
                O QUE VOCÊ ENCONTRA AQUI
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black text-[#202F36] tracking-tighter">
                Nossos<br />
                <span className="text-[#1995E8]">Departamentos</span>
              </h2>
            </div>
            <p className="text-slate-500 font-semibold max-w-sm text-sm sm:text-base leading-relaxed lg:text-right">
              Tudo que sua família precisa no mesmo lugar, com frescor e preço justo.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {depts.map((d, i) => (
              <motion.div
                key={d.title}
                initial={fu}
                whileInView={ft(i * 0.08)}
                viewport={VIEW}
                className="group bg-white border border-slate-100 rounded-2xl sm:rounded-[2rem] p-5 sm:p-8 hover:border-[#1995E8]/30 hover:shadow-2xl active:scale-[0.99] transition-all duration-500"
              >
                <div className="flex items-start justify-between mb-6 sm:mb-8">
                  <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-[#1995E8]/5 group-hover:bg-[#1995E8] flex items-center justify-center transition-all duration-300">
                    <d.icon className="h-6 w-6 sm:h-7 sm:w-7 text-[#1995E8] group-hover:text-white" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#1995E8] bg-[#1995E8]/5 rounded-full px-3 sm:px-4 py-1.5 sm:py-2">
                    {d.tag}
                  </span>
                </div>
                <div>
                  <div className="flex items-baseline gap-2 sm:gap-3 mb-3">
                    <span className="text-sm font-black text-slate-200">{d.num}</span>
                    <h3 className="text-xl sm:text-2xl font-black text-[#202F36]">{d.title}</h3>
                  </div>
                  <p className="text-slate-500 text-sm sm:text-[15px] font-medium leading-relaxed">{d.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 05. SOBRE ── */}
      <section className="py-14 sm:py-24 lg:py-40 bg-white">
        <div className="max-w-7xl mx-auto px-5 grid grid-cols-1 lg:grid-cols-2 gap-14 sm:gap-24 items-center">

          <motion.div initial={fu} whileInView={ft(0)} viewport={VIEW} className="relative">
            <div className="relative rounded-2xl sm:rounded-[3rem] overflow-hidden aspect-[4/3] sm:aspect-[4/5] shadow-2xl">
              <Image src="/cevan-supermarket.png" alt="Cevan Supermercado" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#202F36]/80 via-transparent to-transparent" />
            </div>
            <div className="hidden sm:block absolute -right-8 -top-8 text-[150px] font-black text-[#202F36]/[0.05] select-none pointer-events-none">15</div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={VIEW}
              className="absolute bottom-4 right-2 sm:bottom-6 sm:-right-4 lg:-right-12 bg-[#FD0100] text-white rounded-2xl p-4 sm:p-8 shadow-2xl max-w-[160px] sm:max-w-[240px]"
            >
              <Users className="h-7 w-7 sm:h-8 sm:w-8 text-white/40 mb-3" />
              <p className="text-2xl sm:text-3xl font-black leading-none mb-2">Milhares</p>
              <p className="text-white/60 text-[10px] sm:text-xs font-black uppercase tracking-widest">de famílias atendidas</p>
            </motion.div>
          </motion.div>

          <motion.div initial={fu} whileInView={ft(0.15)} viewport={VIEW} className="space-y-8 sm:space-y-12">
            <div>
              <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.35em] text-[#1995E8] mb-5">
                <span className="h-px w-8 bg-[#1995E8]" />
                HISTÓRIA CEVAN
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black text-[#202F36] leading-[1] tracking-tighter">
                Presentes no seu<br />
                <span className="text-[#FD0100]">dia a dia</span>
              </h2>
            </div>

            <blockquote className="relative pl-6 sm:pl-8 border-l-[6px] border-[#1995E8]">
              <p className="text-slate-600 text-base sm:text-xl font-medium leading-relaxed italic">
                "No Cevan Supermercados, você é sempre bem-vindo! Fazemos questão de oferecer produtos de qualidade e atendimento com carinho."
              </p>
            </blockquote>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {[
                { icon: CheckCircle2, text: "Renovação diária" },
                { icon: CheckCircle2, text: "Equipe dedicada" },
                { icon: CheckCircle2, text: "Preços competitivos" },
                { icon: CheckCircle2, text: "Delivery rápido" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <Icon className="h-5 w-5 text-[#FD0100] shrink-0" />
                  <span className="text-[#202F36] font-black text-sm uppercase tracking-widest">{text}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3 pt-2">
              <a href={units[0].whatsapp} className="inline-flex items-center justify-center gap-3 h-14 px-8 rounded-2xl bg-[#202F36] hover:bg-[#1995E8] active:scale-[0.98] text-white font-black text-[12px] uppercase tracking-widest transition-all">
                Falar Conosco <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#lojas" className="inline-flex items-center justify-center gap-3 h-14 px-8 rounded-2xl border-2 border-slate-200 text-[#202F36] hover:border-[#1995E8] hover:text-[#1995E8] active:scale-[0.98] font-black text-[12px] uppercase tracking-widest transition-all">
                Ver Lojas <MapPin className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 06. COMO COMPRAR ── */}
      <section className="py-14 sm:py-24 bg-[#202F36] text-white">
        <div className="max-w-7xl mx-auto px-5 lg:px-12">
          <motion.div initial={fu} whileInView={ft(0)} viewport={VIEW} className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-20 gap-6">
            <div className="space-y-3">
              <p className="text-[11px] font-black uppercase tracking-[0.3em] text-[#1995E8]">PLATAFORMA DIGITAL</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter">Como comprar pelo Compre Sem Fila</h2>
            </div>
            <a href={ONLINE_SHOP_URL} target="_blank" rel="noreferrer"
              className="h-12 px-8 rounded-full bg-[#1995E8] text-white font-black text-[11px] uppercase tracking-widest inline-flex items-center justify-center active:scale-[0.98] shadow-lg shadow-blue-900/20 w-full sm:w-auto">
              Acessar Loja Online
            </a>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 rounded-2xl sm:rounded-3xl overflow-hidden">
            {[
              { n: "01", icon: ShoppingCart, title: "Acesse a Loja", desc: "Entre no site ou app oficial do Compre Sem Fila." },
              { n: "02", icon: Package, title: "Monte seu Carrinho", desc: "Escolha seus produtos favoritos entre milhares de itens." },
              { n: "03", icon: CheckCircle2, title: "Pagamento Seguro", desc: "Finalize sua compra com total segurança e agilidade." },
              { n: "04", icon: Truck, title: "Receba em Casa", desc: "Nossa equipe entrega tudo fresquinho na sua porta." },
            ].map((s, i) => (
              <motion.div
                key={s.n}
                initial={fu}
                whileInView={ft(i * 0.08)}
                viewport={VIEW}
                className="bg-[#202F36] hover:bg-white/[0.05] p-6 sm:p-10 flex flex-col gap-6 sm:gap-8 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="h-11 w-11 sm:h-12 sm:w-12 rounded-2xl bg-[#1995E8]/20 flex items-center justify-center">
                    <s.icon className="h-5 w-5 sm:h-6 sm:w-6 text-[#1995E8]" />
                  </div>
                  <span className="text-xl sm:text-2xl font-black text-white/10">{s.n}</span>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black mb-2 sm:mb-3">{s.title}</h3>
                  <p className="text-slate-400 text-sm font-medium leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 07. LOJAS ── */}
      <section id="lojas" className="py-14 sm:py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-5">
          <motion.div initial={fu} whileInView={ft(0)} viewport={VIEW} className="mb-12 sm:mb-20 text-center">
            <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.35em] text-[#FD0100] mb-4">NOSSAS UNIDADES</span>
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black text-[#202F36] tracking-tighter">Onde encontrar o Cevan</h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {units.map((unit, i) => (
              <motion.div
                key={unit.name}
                initial={fu}
                whileInView={ft(i * 0.1)}
                viewport={VIEW}
                className="group border border-slate-100 rounded-2xl sm:rounded-[2.5rem] p-6 sm:p-10 hover:border-[#1995E8]/30 hover:shadow-2xl transition-all duration-500"
              >
                <div className="flex flex-col sm:flex-row justify-between gap-6 mb-8">
                  <div className="space-y-3">
                    <span className="text-[10px] font-black text-[#1995E8] uppercase tracking-widest">Unidade {unit.num}</span>
                    <h3 className="text-3xl sm:text-4xl font-black text-[#202F36]">{unit.name}</h3>
                    <div className="flex items-center gap-3">
                      <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-[#FD0100] shrink-0" />
                      <span className="text-slate-500 font-semibold text-sm sm:text-base">{unit.address}</span>
                    </div>
                  </div>
                  <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl sm:rounded-3xl bg-[#202F36]/5 flex items-center justify-center text-[#202F36] group-hover:bg-[#202F36] group-hover:text-white transition-all duration-500 shrink-0">
                    <ShoppingCart className="h-8 w-8 sm:h-10 sm:w-10" />
                  </div>
                </div>

                <div className="h-px bg-slate-50 mb-7" />

                <div className="mb-8">
                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-5">Horário de Funcionamento</p>
                  <div className="space-y-1">
                    {unit.hours.map((h) => (
                      <div key={h.day} className="flex justify-between items-center py-3 border-b border-slate-50 last:border-0">
                        <span className="text-[#202F36] font-black text-xs sm:text-sm uppercase tracking-widest flex items-center gap-2 sm:gap-3">
                          <Clock className="h-4 w-4 text-slate-200 shrink-0" />
                          {h.day}
                        </span>
                        <span className={`text-xs sm:text-sm font-black px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl ${h.time === "Fechado" ? "bg-red-50 text-[#FD0100]" : "bg-[#1995E8]/10 text-[#1995E8]"}`}>
                          {h.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <a href={unit.whatsapp} className="flex items-center justify-between w-full h-14 sm:h-16 px-6 sm:px-8 rounded-2xl bg-[#FD0100] text-white font-black text-xs uppercase tracking-widest active:scale-[0.98] transition-all hover:scale-[1.02]">
                  <span>WhatsApp {unit.name}</span>
                  <ArrowRight className="h-5 w-5" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 08. CTA FINAL ── */}
      <section className="py-20 sm:py-32 bg-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] select-none">
          <span className="text-[18vw] font-black text-[#202F36]">CEVAN</span>
        </div>
        <div className="container mx-auto px-5 max-w-6xl relative z-10 text-center space-y-8 sm:space-y-12">
          <h2 className="text-4xl sm:text-6xl lg:text-8xl font-black text-[#202F36] tracking-tighter leading-none">
            Você é sempre <br />
            <span className="text-[#FD0100]">bem-vindo.</span>
          </h2>
          <p className="text-slate-500 text-base sm:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            Duas unidades no Maranhão esperando por você. Qualidade que sua família merece, com o preço que você procura.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href={ONLINE_SHOP_URL} target="_blank" rel="noreferrer"
              className="h-16 px-10 sm:px-12 rounded-2xl bg-[#1995E8] text-white font-black uppercase tracking-widest text-xs inline-flex items-center justify-center gap-4 hover:bg-[#1581c9] active:scale-[0.98] transition-all shadow-xl shadow-blue-200">
              Compre Online <ShoppingCart className="h-5 w-5" />
            </a>
            <a href="#lojas"
              className="h-16 px-10 sm:px-12 rounded-2xl bg-[#202F36] text-white font-black uppercase tracking-widest text-xs inline-flex items-center justify-center gap-4 hover:bg-[#1995E8] active:scale-[0.98] transition-all">
              Ver Lojas <MapPin className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
