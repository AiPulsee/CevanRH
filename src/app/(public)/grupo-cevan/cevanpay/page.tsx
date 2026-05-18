"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight, CreditCard, Zap, ShieldCheck, Smartphone,
  ArrowUpRight, ShoppingBag, Cpu, Layers, RefreshCw,
  ChevronDown, User, MessageSquare, Boxes, Lock, Check,
} from "lucide-react";
import { useState } from "react";

const VIEW = { once: true };
const fu = { opacity: 0, y: 24 };
function ft(d = 0) {
  return { opacity: 1, y: 0, transition: { duration: 0.6, delay: d, ease: "easeOut" as const } };
}

export default function CevanPayPage() {
  const [activeAccordion, setActiveAccordion] = useState(0);

  const industries = [
    { title: "E-commerce", icon: ShoppingBag, desc: "Soluções de pagamento otimizadas para lojas online com checkout rápido e seguro." },
    { title: "Educação", icon: Boxes, desc: "Facilitamos pagamentos de mensalidades e cursos com recorrência inteligente." },
    { title: "SaaS", icon: RefreshCw, desc: "Faturamento automatizado e gestão de assinaturas com fluxo de caixa previsível." },
    { title: "Freelance", icon: User, desc: "Receba de seus clientes de forma profissional com links de pagamento simples." },
  ];

  return (
    <div className="flex flex-col w-full font-sans overflow-hidden">

      {/* ── 01. HERO ── */}
      <section className="relative pt-20 pb-10 sm:pt-24 sm:pb-16 lg:pt-36 lg:pb-24 overflow-hidden min-h-[85vh] sm:min-h-[90vh] flex items-center bg-black">
        <div className="absolute inset-0 z-0">
          <Image src="/cevanpay/BG 1.png" alt="CevanPay" fill className="object-cover opacity-60" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-[#202F36]/80 via-transparent to-black" />
        </div>

        <div className="container mx-auto px-5 sm:px-6 max-w-7xl relative z-10">
          {/* Title centered */}
          <motion.h1
            initial={fu} animate={ft(0.1)}
            className="text-3xl sm:text-4xl md:text-6xl lg:text-[72px] font-black leading-[1.05] tracking-tight text-white text-center mb-8 sm:mb-12 lg:mb-16 max-w-4xl mx-auto"
          >
            Soluções de Pagamento<br className="hidden sm:block" /> Rápidas para o Mundo Atual
          </motion.h1>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">

            {/* Left: CTA */}
            <div className="lg:col-span-3 flex flex-col items-center lg:items-start gap-5 sm:gap-8 text-center lg:text-left order-3 lg:order-1">
              <motion.p initial={fu} animate={ft(0.2)} className="text-white/60 text-sm sm:text-base font-medium leading-relaxed max-w-xs">
                No mundo acelerado de hoje, empresas exigem soluções eficientes. É aí que a CevanPay entra.
              </motion.p>
              <motion.div initial={fu} animate={ft(0.3)}>
                <Link href="/#contato" className="inline-flex items-center gap-3 h-12 sm:h-14 px-6 sm:px-8 rounded-full bg-[#00DC00] text-black font-black uppercase tracking-widest text-[10px] hover:scale-105 active:scale-95 transition-all shadow-xl shadow-[#00DC00]/20">
                  CADASTRE-SE GRÁTIS <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </div>

            {/* Center: Machine */}
            <div className="lg:col-span-6 flex justify-center order-1 lg:order-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative w-full max-w-[260px] sm:max-w-[360px] lg:max-w-[480px]"
              >
                <div className="relative aspect-square flex items-center justify-center">
                  <Image src="/cevanpay/maquinninha mockup.png" alt="Maquininha" width={600} height={600} className="object-contain w-full h-full drop-shadow-2xl" priority />
                </div>
              </motion.div>
            </div>

            {/* Right: Stats */}
            <div className="lg:col-span-3 flex flex-row lg:flex-col justify-center lg:justify-start gap-8 sm:gap-12 order-2 lg:order-3">
              <motion.div initial={fu} animate={ft(0.5)} className="text-center lg:text-left">
                <p className="text-4xl sm:text-5xl font-black tracking-tighter text-white">89M+</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mt-1">Transações Diárias</p>
              </motion.div>
              <motion.div initial={fu} animate={ft(0.6)} className="text-center lg:text-left">
                <p className="text-4xl sm:text-5xl font-black text-[#1995E8] tracking-tighter">+9%</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mt-1">Cashback Real</p>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 02. PARTNERS ── */}
      <section className="py-8 sm:py-12 lg:py-20 bg-white">
        <div className="container mx-auto px-5 sm:px-6 max-w-7xl">
          <div className="flex flex-wrap justify-center items-center gap-5 sm:gap-10 lg:gap-20 opacity-40 grayscale">
            {["VISA", "MASTERCARD", "PAYPAL", "STRIPE", "APPLE PAY", "GOOGLE PAY"].map(brand => (
              <span key={brand} className="text-base sm:text-xl lg:text-2xl font-black tracking-tighter text-black">{brand}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── 03. MÉTODOS DE PAGAMENTO ── */}
      <section className="relative py-14 sm:py-24 lg:py-32 bg-black">
        <div className="absolute inset-0 z-0">
          <Image src="/cevanpay/BG 1.png" alt="BG" fill className="object-cover opacity-30" />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="container mx-auto px-5 sm:px-6 max-w-7xl relative z-10 text-white">
          <div className="text-center mb-10 sm:mb-16 lg:mb-20 space-y-3 sm:space-y-4">
            <span className="text-[#00DC00] font-black text-[9px] uppercase tracking-[0.3em] bg-[#00DC00]/10 px-4 py-1.5 rounded-full border border-[#00DC00]/20">FUNCIONALIDADES</span>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black tracking-tighter">Variedade de Métodos CevanPay</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {[
              { title: "Cartão", icon: CreditCard },
              { title: "FacePay24", icon: User },
              { title: "Visa Click", icon: Zap },
              { title: "PrivatPay", icon: Lock },
              { title: "Google Pay", icon: Smartphone },
              { title: "Apple Pay", icon: Smartphone },
              { title: "QR Code", icon: Smartphone },
              { title: "Parcelamento", icon: RefreshCw },
            ].map((item) => (
              <div key={item.title} className="bg-white/5 border border-white/10 rounded-2xl sm:rounded-[2rem] overflow-hidden group hover:border-[#00DC00]/40 active:scale-95 transition-all duration-300">
                <div className="h-16 sm:h-24 flex items-center justify-center bg-white/5 group-hover:bg-[#00DC00] transition-colors duration-300">
                  <item.icon className="h-7 w-7 sm:h-10 sm:w-10 text-[#1995E8] group-hover:text-black transition-colors duration-300" />
                </div>
                <div className="p-4 sm:p-8 space-y-2 sm:space-y-4">
                  <h3 className="text-base sm:text-xl font-black tracking-tight">{item.title}</h3>
                  <p className="text-white/40 text-xs sm:text-sm font-medium leading-relaxed hidden sm:block">Pagamentos convenientes e seguros.</p>
                  <Link href="#" className="hidden sm:inline-flex items-center gap-2 text-white font-black text-[10px] uppercase tracking-widest hover:text-[#00DC00] transition-colors">
                    Ler Mais <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 04. COMO CONECTAR ── */}
      <section className="py-14 sm:py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-5 sm:px-6 max-w-7xl text-center text-black">
          <div className="mb-10 sm:mb-16 space-y-3 sm:space-y-4">
            <span className="text-[#00DC00] font-black text-[9px] uppercase tracking-[0.3em] bg-[#00DC00]/10 px-4 py-1.5 rounded-full border border-[#00DC00]/20">PROCESSO DE CONEXÃO</span>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black tracking-tighter">Como Conectar com a CevanPay</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 lg:gap-10">
            {[
              "Crie uma nova conta de lojista na CevanPay",
              "Ative os quatro passos de ativação do lojista",
              "Otimize o método de integração com a CevanPay",
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-4 sm:gap-6 text-left bg-slate-50 p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200 hover:border-[#00DC00]/30 active:scale-[0.98] transition-all">
                <div className="h-12 w-12 sm:h-16 sm:w-16 bg-[#00DC00] text-black text-xl sm:text-2xl font-black rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-[#00DC00]/20">
                  {i + 1}
                </div>
                <p className="text-base sm:text-lg font-black leading-tight text-black/80">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 05. SETORES ── */}
      <section className="relative py-14 sm:py-24 lg:py-32 bg-black">
        <div className="absolute inset-0 z-0">
          <Image src="/cevanpay/BG 1.png" alt="BG" fill className="object-cover opacity-40" />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="container mx-auto px-5 sm:px-6 max-w-7xl relative z-10 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 items-center">

            <div className="space-y-8 sm:space-y-12">
              <div className="space-y-3 sm:space-y-4">
                <span className="text-[#00DC00] font-black text-[9px] uppercase tracking-[0.4em] bg-[#00DC00]/10 px-4 py-1.5 rounded-full border border-[#00DC00]/20">SOLUÇÕES DE PAGAMENTO</span>
                <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black tracking-tighter leading-[1]">Impulsionando<br />Cada Setor.</h2>
              </div>

              <div className="space-y-1">
                {industries.map((item, i) => (
                  <div key={item.title} className="border-b border-white/5">
                    <button
                      onClick={() => setActiveAccordion(i)}
                      className={`w-full py-5 sm:py-6 lg:py-8 flex items-center gap-4 sm:gap-6 text-left transition-all ${activeAccordion === i ? "text-[#00DC00]" : "text-white"}`}
                    >
                      <div className={`h-10 w-10 sm:h-12 sm:w-12 rounded-xl flex items-center justify-center shrink-0 transition-all ${activeAccordion === i ? "bg-[#00DC00] text-black" : "bg-white/5 text-[#1995E8]"}`}>
                        <item.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                      </div>
                      <span className="text-xl sm:text-2xl font-black tracking-tight">{item.title}</span>
                      <ChevronDown className={`ml-auto h-5 w-5 sm:h-6 sm:w-6 shrink-0 transition-transform duration-300 ${activeAccordion === i ? "rotate-180" : ""}`} />
                    </button>
                    {activeAccordion === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        className="pb-6 pl-14 sm:pl-16"
                      >
                        <p className="text-white/50 text-sm sm:text-base font-medium leading-relaxed max-w-md">{item.desc}</p>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Animated card — hidden on small mobile */}
            <div className="hidden sm:flex relative justify-center">
              <div className="relative w-full max-w-[360px] aspect-square flex items-center justify-center">
                <div className="absolute inset-0 border-[20px] sm:border-[25px] border-[#00DC00]/5 rounded-full" />
                <motion.div
                  animate={{ y: [0, -16, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="relative z-10 w-[280px] sm:w-[320px] lg:w-[380px] h-[170px] sm:h-[200px] lg:h-[240px] bg-[#00DC00] rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 shadow-[0_20px_70px_rgba(0,220,0,0.3)] overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20" />
                  <div className="flex flex-col h-full justify-between text-black">
                    <div className="flex justify-between items-start">
                      <div className="h-8 w-12 sm:h-10 sm:w-16 bg-black/20 rounded-lg sm:rounded-xl" />
                      <Check className="h-5 w-5 sm:h-6 sm:w-6 text-black/40" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-black/40">VALOR DA TRANSAÇÃO</p>
                      <p className="text-2xl sm:text-3xl lg:text-5xl font-black">R$ 12.450,00</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 06. POR QUE NOS ESCOLHER ── */}
      <section className="py-14 sm:py-24 lg:py-32 bg-white text-black">
        <div className="container mx-auto px-5 sm:px-6 max-w-7xl text-center">
          <div className="mb-10 sm:mb-16 lg:mb-20 space-y-3 sm:space-y-4">
            <span className="text-[#00DC00] font-black text-[9px] uppercase tracking-[0.4em] bg-[#00DC00]/10 px-4 py-1.5 rounded-full border border-[#00DC00]/20">POR QUE NOS ESCOLHER</span>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black tracking-tighter">Eleve seus Pagamentos Conosco</h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
            {[
              { title: "Rápido e Seguro", desc: "Agilidade e segurança em cada transação.", icon: ShieldCheck },
              { title: "Suporte 24/7", desc: "Assistência ao vivo sempre disponível.", icon: MessageSquare },
              { title: "API Dedicada", desc: "Soluções robustas para desenvolvedores.", icon: Cpu },
              { title: "Automatizado", desc: "Processos automáticos para máxima eficiência.", icon: Layers },
            ].map((item) => (
              <div key={item.title} className="space-y-4 sm:space-y-8 group">
                <div className="h-16 w-16 sm:h-24 sm:w-24 bg-[#202F36] rounded-[1.5rem] sm:rounded-[2rem] mx-auto flex items-center justify-center border border-slate-200 group-hover:bg-[#00DC00] active:scale-95 transition-all duration-300 shadow-md sm:shadow-lg">
                  <item.icon className="h-7 w-7 sm:h-10 sm:w-10 text-[#00DC00] group-hover:text-black transition-colors duration-300" />
                </div>
                <div className="space-y-1 sm:space-y-4">
                  <h3 className="text-sm sm:text-xl font-black tracking-tight">{item.title}</h3>
                  <p className="text-black/40 text-xs sm:text-sm font-medium leading-relaxed hidden sm:block">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 07. TARIFAS ── */}
      <section className="relative py-14 sm:py-24 lg:py-32 bg-black">
        <div className="absolute inset-0 z-0">
          <Image src="/cevanpay/BG 1.png" alt="BG" fill className="object-cover opacity-50" />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="container mx-auto px-5 sm:px-6 max-w-7xl relative z-10 text-white">
          <div className="text-center mb-10 sm:mb-16 lg:mb-20 space-y-3 sm:space-y-4">
            <span className="text-[#00DC00] font-black text-[9px] uppercase tracking-[0.4em] bg-[#00DC00]/10 px-4 py-1.5 rounded-full border border-[#00DC00]/20">TARIFAS</span>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black tracking-tighter">Preços Claros para Transações</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 lg:gap-10 max-w-6xl mx-auto">

            {/* Card Geral */}
            <div className="bg-white/5 border border-white/10 rounded-2xl sm:rounded-[2.5rem] p-6 sm:p-10 hover:border-[#00DC00]/20 transition-all">
              <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 items-start sm:items-center">
                <div className="flex-1 space-y-5">
                  <h3 className="text-3xl font-black">Geral</h3>
                  <p className="text-white/40 font-medium text-sm sm:text-base">Nossa comissão deduzida, seu dinheiro depositado sem complicações.</p>
                  <ul className="space-y-3">
                    {["Dia bancário único para sua conta.", "Para faturamentos mensais variados."].map(li => (
                      <div key={li} className="flex gap-3 items-center">
                        <div className="h-2 w-2 rounded-full bg-[#00DC00] shrink-0" />
                        <p className="text-[11px] font-black uppercase tracking-widest text-white/80">{li}</p>
                      </div>
                    ))}
                  </ul>
                  <button className="h-12 sm:h-14 px-8 sm:px-10 rounded-full bg-[#00DC00] text-black font-black uppercase tracking-widest text-[10px] w-full sm:w-auto active:scale-95 transition-all">CONECTAR AGORA</button>
                </div>
                <div className="text-center sm:border-l sm:border-white/10 sm:pl-10">
                  <p className="text-6xl sm:text-7xl font-black leading-none">1,9%</p>
                  <p className="text-[9px] font-black text-white/40 uppercase tracking-[0.3em] mt-2">Sem taxas ocultas</p>
                </div>
              </div>
            </div>

            {/* Card Individual */}
            <div className="bg-white/5 border border-[#00DC00]/40 rounded-2xl sm:rounded-[2.5rem] p-6 sm:p-10">
              <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 items-start sm:items-center">
                <div className="flex-1 space-y-5">
                  <h3 className="text-3xl font-black">Individual</h3>
                  <p className="text-white/40 font-medium text-sm sm:text-base">Solicite condições reduzidas exclusivas para sua operação:</p>
                  <ul className="space-y-3">
                    {["Depósitos rápidos e seguros.", "Faturamento superior a R$ 300.000 mensais."].map(li => (
                      <div key={li} className="flex gap-3 items-center">
                        <div className="h-2 w-2 rounded-full bg-[#1995E8] shrink-0" />
                        <p className="text-[11px] font-black uppercase tracking-widest text-white/80">{li}</p>
                      </div>
                    ))}
                  </ul>
                  <button className="h-12 sm:h-14 px-8 sm:px-10 rounded-full border-2 border-white/10 text-white font-black uppercase tracking-widest text-[10px] w-full sm:w-auto hover:bg-white/5 transition-all">SOLICITAR AGORA</button>
                </div>
                <div className="flex sm:flex-col items-center sm:items-center gap-8 sm:gap-0 sm:space-y-8 sm:border-l sm:border-white/10 sm:pl-10">
                  <div className="text-center">
                    <p className="text-xs font-black uppercase text-[#1995E8] tracking-widest">ONGs</p>
                    <p className="text-4xl sm:text-5xl font-black">0%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-black uppercase text-[#1995E8] tracking-widest">Condomínios</p>
                    <p className="text-4xl sm:text-5xl font-black text-[#00DC00]">1%</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 08. CTA FINAL ── */}
      <section className="py-10 sm:py-16 lg:py-24 bg-white text-black">
        <div className="container mx-auto px-5 sm:px-6 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 bg-[#202F36] rounded-2xl sm:rounded-[3rem] py-10 sm:py-16 lg:py-20 px-6 sm:px-12 lg:px-24 relative overflow-hidden text-center lg:text-left">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#00DC00]/10 rounded-full blur-[90px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <h2 className="text-3xl sm:text-4xl lg:text-7xl font-black tracking-tighter max-w-2xl leading-[1] relative z-10 text-white">
              Pronto para elevar<br className="hidden sm:block" /> seu pagamento?
            </h2>
            <Link
              href="/#contato"
              className="h-14 sm:h-16 lg:h-20 px-8 sm:px-12 lg:px-16 w-full sm:w-auto rounded-full bg-[#00DC00] text-black font-black uppercase tracking-[0.15em] text-xs flex items-center justify-center gap-4 active:scale-95 hover:scale-105 transition-all shadow-2xl shadow-[#00DC00]/30 relative z-10"
            >
              CADASTRAR AGORA <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
