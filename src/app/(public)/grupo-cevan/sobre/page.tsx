"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight, Target, Eye, Heart, Shield, TrendingUp,
  Users, Award, Building2, Globe, Lightbulb, CheckCircle2,
  ChevronRight, ArrowUpRight,
} from "lucide-react";

const VIEW = { once: true };
const fu = { opacity: 0, y: 20 };
function ft(d = 0) {
  return { opacity: 1, y: 0, transition: { duration: 0.6, delay: d, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } };
}

const timeline = [
  { year: "2009", title: "Fundação", description: "O Grupo Cevan nasce em São Luís do Maranhão com foco em soluções de crédito para PMEs." },
  { year: "2012", title: "Expansão Financeira", description: "Lançamento da Cevan Financeira com portfólio completo de antecipação de recebíveis e capital de giro." },
  { year: "2015", title: "Vertical de Serviços Empresariais", description: "Criação da Cevan Serviços Empresariais, unindo recrutamento especializado com tecnologia de IA." },
  { year: "2018", title: "Varejo Alimentar", description: "Inauguração do Cevan Supermercado, levando excelência e frescor às comunidades maranhenses." },
  { year: "2022", title: "Transformação Digital", description: "Adoção massiva de IA no processo de R&S e automação financeira, elevando padrões do grupo." },
  { year: "2024+", title: "Expansão Nacional", description: "Início da expansão para outros estados do Nordeste e Centro-Oeste do Brasil." },
];

const values = [
  { icon: Shield, title: "Integridade", description: "Agimos com transparência, ética e responsabilidade em todas as relações." },
  { icon: Lightbulb, title: "Inovação", description: "Adotamos tecnologia de ponta para oferecer soluções disruptivas." },
  { icon: Heart, title: "Humanização", description: "Colocamos as pessoas no centro de tudo — do cliente ao colaborador." },
  { icon: TrendingUp, title: "Excelência", description: "Perseguimos resultados superiores com rigor metodológico." },
  { icon: Globe, title: "Responsabilidade", description: "Comprometidos com o desenvolvimento sustentável da sociedade." },
  { icon: Users, title: "Colaboração", description: "Acreditamos no poder das parcerias estratégicas para criar valor real." },
];

const leadership = [
  { name: "Carlos Eduardo Vaz", role: "CEO & Fundador", initials: "CE" },
  { name: "Ana Paula Santos", role: "Diretora Financeira", initials: "AP" },
  { name: "Ricardo Mendes", role: "Dir. de Operações", initials: "RM" },
  { name: "Fernanda Lima", role: "Dir. de Pessoas", initials: "FL" },
];

export default function SobrePage() {
  return (
    <div className="flex flex-col w-full font-sans bg-white text-[#0B1222] overflow-hidden">

      {/* ── HERO ── */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden pt-20">
        {/* Subtle grid background */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{ backgroundImage: "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-50 rounded-full blur-[120px] -mr-96 -mt-96 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8">
              <motion.div initial={fu} animate={ft(0)} className="flex items-center gap-2 mb-10">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Grupo Cevan</span>
                <span className="h-px w-8 bg-slate-200" />
                <span className="text-[11px] font-bold text-[#1967D2] uppercase tracking-widest">Institucional</span>
              </motion.div>

              <motion.h1 initial={fu} animate={ft(0.1)}
                className="text-5xl sm:text-7xl lg:text-[5.5rem] font-black leading-[0.95] tracking-[-0.04em] mb-10">
                Uma holding focada em <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1967D2] to-blue-400">gerar valor real.</span>
              </motion.h1>

              <motion.p initial={fu} animate={ft(0.2)}
                className="text-slate-500 text-xl font-medium leading-relaxed max-w-2xl mb-12">
                Desde 2009, transformamos o cenário corporativo no Maranhão e no Brasil através de inovação, ética e um compromisso inabalável com a excelência.
              </motion.p>

              <motion.div initial={fu} animate={ft(0.3)} className="flex flex-wrap gap-12">
                {[
                  { n: "15+", l: "anos de história" },
                  { n: "10K+", l: "vidas impactadas" },
                  { n: "03", l: "unidades de negócio" },
                ].map((s) => (
                  <div key={s.l}>
                    <p className="text-4xl font-black tracking-tighter text-[#0B1222]">{s.n}</p>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">{s.l}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ESSÊNCIA ── */}
      <section className="py-24 lg:py-36 bg-[#0B1222] text-white relative overflow-hidden">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] -ml-60 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <motion.div initial={fu} whileInView={ft(0)} viewport={VIEW} className="lg:col-span-4 sticky top-32">
              <p className="text-[11px] font-bold uppercase tracking-widest text-blue-400 mb-6">Nossa Essência</p>
              <h2 className="text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-8">
                O que nos move<br /> todos os dias.
              </h2>
              <p className="text-slate-400 font-medium leading-relaxed">
                Acreditamos que negócios sólidos constroem sociedades melhores. Cada decisão corporativa leva em conta o bem-estar das comunidades que servimos.
              </p>
            </motion.div>

            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: Target, title: "Missão", text: "Oferecer soluções integradas que gerem valor real para clientes e sociedade — com ética e inovação." },
                { icon: Eye, title: "Visão", text: "Ser reconhecido como o maior grupo empresarial multissetorial do Nordeste até 2030." },
                { icon: Heart, title: "Propósito", text: "Transformar a realidade de pessoas e empresas através de tecnologia humana e finanças éticas." },
                { icon: Award, title: "Qualidade", text: "Entregar o padrão Cevan de excelência em cada uma de nossas unidades de negócio." },
              ].map((item, i) => (
                <motion.div key={item.title} initial={fu} whileInView={ft(i * 0.1)} viewport={VIEW}
                  className="bg-white/5 border border-white/10 rounded-[2rem] p-10 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                  <div className="h-14 w-14 rounded-2xl bg-[#1967D2]/20 flex items-center justify-center mb-8">
                    <item.icon className="h-7 w-7 text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-black mb-4">{item.title}</h3>
                  <p className="text-slate-400 font-medium leading-relaxed">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── VALORES (Grid Editorial) ── */}
      <section className="py-24 lg:py-36 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div initial={fu} whileInView={ft(0)} viewport={VIEW} className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-black text-[#0B1222] tracking-tighter">Nossos Valores</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {values.map((v, i) => (
              <motion.div key={v.title} initial={fu} whileInView={ft(i * 0.05)} viewport={VIEW}
                className="group flex gap-6 items-start">
                <div className="h-12 w-12 rounded-2xl bg-slate-50 flex items-center justify-center shrink-0 group-hover:bg-blue-50 transition-colors">
                  <v.icon className="h-5 w-5 text-slate-400 group-hover:text-[#1967D2] transition-colors" />
                </div>
                <div>
                  <h4 className="text-lg font-black text-[#0B1222] mb-2">{v.title}</h4>
                  <p className="text-slate-500 font-medium text-sm leading-relaxed">{v.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── JORNADA (Timeline) ── */}
      <section className="py-24 lg:py-36 bg-[#f8faff] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <motion.div initial={fu} whileInView={ft(0)} viewport={VIEW} className="lg:col-span-4">
              <p className="text-[11px] font-bold uppercase tracking-widest text-[#1967D2] mb-6">Nossa Jornada</p>
              <h2 className="text-4xl lg:text-5xl font-black text-[#0B1222] tracking-tighter leading-tight">
                15 Anos de <br />Crescimento.
              </h2>
            </motion.div>

            <div className="lg:col-span-8 relative">
              {/* Vertical line */}
              <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-px bg-slate-200" />

              <div className="space-y-12">
                {timeline.map((item, i) => (
                  <motion.div key={item.year} initial={fu} whileInView={ft(i * 0.05)} viewport={VIEW}
                    className={`relative flex flex-col ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} items-start lg:items-center gap-8 lg:gap-0`}>
                    
                    {/* Content Side */}
                    <div className="flex-1 w-full lg:px-12 text-left lg:text-right group">
                      <div className={`p-6 rounded-2xl border border-slate-100 bg-white hover:border-[#1967D2]/20 hover:shadow-lg transition-all duration-300 ${i % 2 !== 0 ? "lg:text-left" : ""}`}>
                        <span className="text-xl font-black text-[#1967D2] mb-2 block">{item.year}</span>
                        <h3 className="text-lg font-black text-[#0B1222] mb-2">{item.title}</h3>
                        <p className="text-slate-500 text-sm font-medium leading-relaxed">{item.description}</p>
                      </div>
                    </div>

                    {/* Dot */}
                    <div className="absolute left-4 lg:left-1/2 -translate-x-1/2 flex items-center justify-center z-10">
                      <div className="h-3 w-3 rounded-full bg-[#1967D2] ring-4 ring-white shadow-sm" />
                    </div>

                    {/* Spacer Side */}
                    <div className="flex-1 hidden lg:block" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── LIDERANÇA ── */}
      <section className="py-24 lg:py-36 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div initial={fu} whileInView={ft(0)} viewport={VIEW} className="text-center mb-20">
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-6">Time Executivo</p>
            <h2 className="text-4xl lg:text-5xl font-black text-[#0B1222] tracking-tighter">Liderança do Grupo</h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {leadership.map((person, i) => (
              <motion.div key={person.name} initial={fu} whileInView={ft(i * 0.1)} viewport={VIEW}
                className="group flex flex-col items-center">
                <div className="h-48 w-full rounded-[2.5rem] bg-slate-50 flex items-center justify-center text-3xl font-black text-slate-200 mb-6 group-hover:bg-blue-50 group-hover:text-[#1967D2] transition-all duration-500 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  {person.initials}
                </div>
                <h4 className="font-black text-[#0B1222] text-lg mb-1">{person.name}</h4>
                <p className="text-xs font-bold text-[#1967D2] uppercase tracking-widest">{person.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="py-24 lg:py-36 bg-[#0B1222] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-[0.05]"
          style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={fu} whileInView={ft(0)} viewport={VIEW}>
            <h2 className="text-5xl lg:text-7xl font-black text-white tracking-tighter leading-[0.95] mb-10">
              Faça parte da nossa <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1967D2] to-blue-300">história.</span>
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/#contato"
                className="group inline-flex items-center justify-center gap-3 h-16 px-12 rounded-2xl bg-[#1967D2] hover:bg-blue-600 text-white font-black uppercase tracking-widest text-[12px] transition-all hover:-translate-y-1 shadow-2xl shadow-blue-900/50">
                Falar com a Gente <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/grupo-cevan"
                className="inline-flex items-center justify-center gap-2 h-16 px-12 rounded-2xl border-2 border-white/10 text-white/60 hover:text-white hover:border-white/30 font-bold uppercase tracking-widest text-[12px] transition-all">
                Explorar Empresas
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
