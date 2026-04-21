"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { 
  Search, MapPin, Zap, Code, Database, BarChart, Palette, HeartPulse, Headset, 
  Briefcase, ChevronRight, Star, Quote, CheckCircle2, Smartphone, Apple, Play, 
  Building2, Clock, DollarSign, Bookmark, ChevronDown
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full bg-[#fdfdfd] font-sans text-[#202124] selection:bg-blue-100 selection:text-blue-900">
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-32 overflow-hidden flex items-center min-h-[680px]">
        {/* Background Curvo Avançado com degradê sutil e blur */}
        <div className="absolute top-0 right-0 w-full lg:w-[50%] h-[92%] z-0 rounded-bl-[200px] lg:rounded-bl-[450px] overflow-hidden shadow-2xl">
           {/* Glassmorphism e gradiente por cima da imagem */}
           <div className="absolute inset-0 bg-gradient-to-tr from-[#1967D2]/90 via-[#1967D2]/70 to-blue-600/50 mix-blend-multiply z-10" />
           <div className="absolute inset-0 bg-blue-900/10 backdrop-blur-[2px] z-10" />
           <Image src="/feature-woman.png" alt="Equipe trabalhando" fill className="object-cover opacity-80" priority />
        </div>
        
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="w-full lg:w-[55%] pr-0 lg:pr-16 space-y-10">
            {/* Título com Highlight Gradiente */}
            <h1 className="text-4xl lg:text-[62px] font-extrabold tracking-[-1px] text-slate-900 leading-[1.12]">
              Existem <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#1967D2] to-blue-500 xl:inline-block hover:scale-105 transition-transform cursor-default">93.178</span> <br/> 
              Vagas para você!
            </h1>
            <p className="text-slate-500 text-lg lg:text-[19px] max-w-lg leading-relaxed mix-blend-multiply">
              Conecte-se com as organizações mais inovadoras do mercado, otimize sua jornada profissional e dispare na frente em processos seletivos exclusivos.
            </p>

            {/* Premium Search Bar com Glassmorphism e Glow Focus */}
            <div className="p-2 bg-white/80 backdrop-blur-xl rounded-[2rem] lg:rounded-full shadow-[0_8px_40px_rgb(25,103,210,0.06)] border border-white focus-within:shadow-[0_8px_50px_rgb(25,103,210,0.15)] focus-within:ring-4 focus-within:ring-blue-100/50 flex flex-col md:flex-row items-center w-full max-w-2xl transition-all duration-500">
              <div className="flex-1 flex items-center px-6 gap-3 w-full md:border-r border-slate-100 group">
                <Search className="h-5 w-5 text-slate-400 group-focus-within:text-[#1967D2] transition-colors flex-shrink-0" />
                <Input placeholder="Título, habilidade..." className="border-none bg-transparent h-14 focus-visible:ring-0 text-[15px] font-medium placeholder:text-slate-400 shadow-none px-0" />
              </div>
              <div className="flex-1 flex items-center px-6 gap-3 w-full group">
                <MapPin className="h-5 w-5 text-slate-400 group-focus-within:text-[#1967D2] transition-colors flex-shrink-0" />
                <Input placeholder="Cidade ou estado" className="border-none bg-transparent h-14 focus-visible:ring-0 text-[15px] font-medium placeholder:text-slate-400 shadow-none px-0" />
              </div>
              <Button size="lg" className="rounded-full px-12 h-14 font-bold bg-[#1967D2] hover:bg-blue-700 w-full md:w-auto mt-2 md:mt-0 shadow-lg shadow-blue-500/25 hover:shadow-blue-600/40 hover:-translate-y-0.5 transition-all duration-300">
                Buscar
              </Button>
            </div>
            
            <p className="text-[13px] text-slate-500 pt-1 font-medium flex gap-2 items-center">
              <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-md">Tendência:</span> 
              <span className="hover:text-[#1967D2] cursor-pointer transition-colors">Designer,</span>
              <span className="hover:text-[#1967D2] cursor-pointer transition-colors">Engenheiro,</span>
              <span className="hover:text-[#1967D2] cursor-pointer transition-colors">PHP</span>
            </p>

            {/* Logos Inline Interativos */}
            <div className="flex flex-wrap items-center gap-10 pt-10 w-full max-w-2xl">
               <span className="flex items-center gap-1.5 opacity-40 hover:opacity-100 grayscale hover:grayscale-0 hover:-translate-y-1 transition-all duration-500 cursor-pointer font-black text-xl tracking-tighter uppercase">
                 <div className="w-6 h-6 bg-black rounded flex items-center justify-center text-white text-[12px] font-sans">M</div> Medium
               </span>
               <span className="opacity-40 hover:opacity-100 grayscale hover:grayscale-0 hover:-translate-y-1 transition-all duration-500 cursor-pointer font-black text-xl tracking-tighter uppercase">Linear</span>
               <span className="opacity-40 hover:opacity-100 grayscale hover:grayscale-0 hover:-translate-y-1 transition-all duration-500 cursor-pointer italic font-serif lowercase text-xl tracking-tighter hover:text-yellow-500">mailchimp</span>
               <span className="opacity-40 hover:opacity-100 grayscale hover:grayscale-0 hover:-translate-y-1 transition-all duration-500 cursor-pointer tracking-tight lowercase text-xl font-bold hover:text-blue-600">stripe</span>
               <span className="opacity-40 hover:opacity-100 grayscale hover:grayscale-0 hover:-translate-y-1 transition-all duration-500 cursor-pointer normal-case tracking-tight font-bold text-xl hover:text-pink-500">inVision</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURED JOBS --- */}
      <section className="py-24 bg-white relative">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent opacity-50" />
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="text-[34px] font-bold text-slate-900 tracking-tight mb-3">Vagas Premium em <span className="text-[#1967D2]">Destaque</span></h2>
              <p className="text-slate-500 text-[16px] max-w-lg">Vagas selecionadas e curadas rigorosamente nas melhores empresas pagadoras do mercado nacional e internacional.</p>
            </div>
            <div className="mt-6 md:mt-0">
              <Button variant="outline" className="border border-slate-200 text-slate-600 rounded-xl flex items-center gap-3 font-semibold h-11 px-5 bg-white shadow-[0_2px_10px_rgb(0,0,0,0.02)] hover:bg-blue-50/50 hover:text-[#1967D2] hover:border-blue-100 transition-all">
                Mais Recentes <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-14">
            {[
              { role: "Engenheiro Frontend Gráfico", logo: "SF", bg: "bg-blue-600", comp: "Stripe Corp", pay: "R$ 15k - R$ 22k", urg: true },
              { role: "Head of Design e Estratégia", logo: "IN", bg: "bg-pink-600", comp: "InVision", pay: "R$ 20k - R$ 35k", urg: false },
              { role: "Cientista de Dados Avançado", logo: "AI", bg: "bg-blue-600", comp: "OpenAI BR", pay: "R$ 18k - R$ 28k", urg: false },
              { role: "Gerente de Produto Mobile", logo: "NV", bg: "bg-teal-600", comp: "Nubank", pay: "R$ 12k - R$ 19k", urg: true },
              { role: "Desenvolvedor Backend Golang", logo: "ML", bg: "bg-yellow-500", comp: "MercadoLivre", pay: "R$ 14k - R$ 21k", urg: false },
              { role: "Arquiteto de Soluções Cloud", logo: "AWS", bg: "bg-orange-500", comp: "Amazon", pay: "R$ 25k - R$ 40k", urg: true }
            ].map((v, i) => (
              <Card key={i} className="p-8 border border-slate-100 bg-white hover:border-blue-200 hover:shadow-[0_12px_40px_rgb(25,103,210,0.08)] hover:-translate-y-1 transition-all duration-500 flex flex-col gap-5 rounded-[1.2rem] relative group cursor-pointer">
                 <button className="absolute top-6 right-6 text-slate-200 hover:text-[#1967D2] hover:bg-blue-50 transition-colors p-2.5 rounded-full">
                   <Bookmark className="h-5 w-5" />
                 </button>
                 
                 <div className="flex items-start gap-5">
                   <div className={`h-14 w-14 mt-1.5 rounded-xl flex-shrink-0 flex items-center justify-center font-bold text-white text-[22px] shadow-sm tracking-tight ${v.bg} group-hover:scale-110 transition-transform duration-500`}>
                     {v.logo}
                   </div>
                   <div className="pr-12">
                     <h4 className="font-bold text-xl text-slate-900 group-hover:text-[#1967D2] transition-colors leading-[1.2] mb-3">{v.role}</h4>
                     <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[13.5px] text-slate-500 font-medium">
                       <span className="flex items-center gap-1.5 text-slate-700 font-semibold"><Briefcase className="h-4 w-4 text-[#1967D2]" /> {v.comp}</span>
                       <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-slate-400" /> São Paulo, SP</span>
                       <span className="flex items-center gap-1.5"><DollarSign className="h-4 w-4 text-green-500 font-bold" /> {v.pay}</span>
                     </div>
                   </div>
                 </div>
                 
                 <div className="flex gap-2.5 pt-2 pl-[76px]">
                   <Badge className="bg-blue-50/60 hover:bg-blue-100 text-[#1967D2] space-x-1 border-none rounded-full px-4 py-1.5 text-[11px] font-semibold transition-colors">Remoto</Badge>
                   <Badge className="bg-emerald-50/60 hover:bg-emerald-100 text-emerald-600 border-none rounded-full px-4 py-1.5 text-[11px] font-semibold transition-colors">CLT / PJ</Badge>
                   {v.urg && <Badge className="bg-orange-50/60 hover:bg-orange-100 text-orange-600 border-none rounded-full px-4 py-1.5 text-[11px] font-semibold shadow-[0_0_15px_rgba(249,115,22,0.1)] transition-colors">Urgente</Badge>}
                 </div>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <Button size="lg" className="bg-white text-[#1967D2] border-2 border-blue-100 hover:bg-[#1967D2] hover:text-white hover:border-[#1967D2] rounded-xl px-12 h-14 font-bold shadow-sm transition-all duration-300">
              Ver Todas as Vagas
            </Button>
          </div>
        </div>
      </section>

      {/* --- FEATURE SECTION (Millions of Jobs) --- */}
      <section className="py-24 bg-[#FAFBFC] border-t border-slate-100 overflow-hidden">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center gap-24">
            <div className="flex-1 relative w-full flex justify-center lg:justify-start">
               <div className="relative h-[420px] lg:h-[500px] w-[90%] max-w-[500px] rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] group cursor-pointer rotate-1 hover:rotate-0 transition-transform duration-700">
                  <Image src="/feature-woman.png" alt="Video cover" fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1967D2]/40 via-transparent to-transparent opacity-80" />
                  
                  {/* Glowing Play Button Effect */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center pointer-events-none group-hover:scale-125 group-hover:bg-white/30 transition-all duration-700 z-0" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-16 w-16 bg-white rounded-full flex items-center justify-center transition-transform duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.1)] group-hover:scale-110 z-10">
                     <Play className="h-6 w-6 text-[#1967D2] ml-1 fill-[#1967D2]" />
                  </div>
               </div>
               {/* Pattern Element */}
               <div className="absolute -bottom-10 -left-10 h-32 w-32 bg-[radial-gradient(#1967D2_2px,transparent_2px)] [background-size:16px_16px] opacity-10" />
            </div>
            
            <div className="flex-1 space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#1967D2] text-[12px] font-bold tracking-wide uppercase">
                <Zap className="h-3 w-3 fill-current" /> Alta Performance
              </div>
              <h2 className="text-3xl lg:text-[46px] font-extrabold leading-[1.15] text-slate-900 tracking-tight">O match ideal sob medida. <br/> Contratações <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1967D2] to-blue-500 inline-block">assertivas</span>.</h2>
              <p className="text-slate-500 leading-relaxed text-[17px] pr-8">Nossa inteligência artificial de ponta processa e analisa milhares de currículos em instantes, garantindo total aderência técnica e cultural entre talentos e as melhores empresas.</p>
              <ul className="space-y-5 pt-4">
                {[
                  "Processo simplificado em menos de 3 minutos", 
                  "Estatísticas transparentes e acompanhamento", 
                  "Testes práticos integrados direto na plataforma"
                ].map((t, i) => (
                  <li key={i} className="flex items-center gap-4 text-slate-700 font-semibold text-[16px] bg-white p-3 rounded-2xl shadow-[0_2px_15px_rgb(0,0,0,0.03)] border border-slate-50">
                    <div className="h-8 w-8 rounded-full bg-blue-50 text-[#1967D2] flex items-center justify-center shadow-sm">
                      <CheckCircle2 className="h-5 w-5 fill-[#1967D2] text-blue-50" />
                    </div>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-16 mt-32">
            {[
              { n: "4.2M", t: "Usuários Ativos e em busca", bg: "from-blue-50 to-transparent" },
              { n: "+12k", t: "Oportunidades Cadastradas Mensais", bg: "from-blue-50 to-transparent" },
              { n: "20", t: "Anos conectando vidas ao mercado", bg: "from-violet-50 to-transparent" }
            ].map((stat, i) => (
               <div key={i} className={`text-center p-10 rounded-[2rem] bg-gradient-to-b ${stat.bg} border-t-2 border-white`}>
                 <p className="text-5xl lg:text-[64px] font-black text-transparent bg-clip-text bg-gradient-to-br from-[#1967D2] to-blue-800 leading-none mb-4 drop-shadow-sm">{stat.n}</p>
                 <p className="text-[15px] font-bold text-slate-600 max-w-[150px] mx-auto leading-snug">{stat.t}</p>
               </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PREMIUM TOP COMPANIES --- */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="container mx-auto px-6 max-w-6xl text-center">
          <h2 className="text-[34px] font-bold mb-3 text-slate-900 tracking-tight">Gigantes Registradas</h2>
          <p className="text-slate-500 mb-16 text-[17px] max-w-2xl mx-auto">Estas incríveis organizações globais utilizam nosso software de pipeline contínuo para escalar seus melhores times.</p>
          
          <div className="flex flex-wrap justify-center gap-6 lg:gap-10">
            {[
              { name: "Unreal", text: "text-rose-500", shadow: "shadow-rose-100", border: 'border-rose-100', letter: "U" },
              { name: "Stripe", text: "text-[#635BFF]", shadow: "shadow-blue-100", border: 'border-blue-100',letter: "S" },
              { name: "Dropbox", text: "text-blue-600", shadow: "shadow-blue-100", border: 'border-blue-100', letter: "D" },
              { name: "Figma", text: "text-[#F24E1E]", shadow: "shadow-orange-100", border: 'border-orange-100', letter: "F" },
              { name: "Upwork", text: "text-[#14A800]", shadow: "shadow-green-100", border: 'border-emerald-100', letter: "UP" },
            ].map((c, i) => (
              <Card key={i} className={`flex flex-col items-center justify-center p-8 w-40 h-40 lg:w-48 lg:h-48 rounded-[2rem] border-2 border-slate-50 hover:${c.border} hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.1)] hover:${c.shadow} hover:-translate-y-2 transition-all duration-500 cursor-pointer bg-white group`}>
                <div className={`h-16 w-16 lg:h-20 lg:w-20 rounded-[1.2rem] bg-slate-50 flex items-center justify-center font-black text-3xl ${c.text} mb-4 group-hover:scale-110 transition-transform duration-500 group-hover:bg-white group-hover:shadow-sm`}>
                  {c.letter}
                </div>
                <span className="font-extrabold text-slate-800 text-[15px] group-hover:text-[#1967D2] transition-colors">{c.name}</span>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS (Deep Blue Box) --- */}
      <section className="py-32 bg-[#FAFBFC] relative overflow-hidden border-y border-slate-100 lg:min-h-[850px] flex items-center">
        <div className="container mx-auto px-6 max-w-5xl text-center relative z-10">
          <h2 className="text-3xl lg:text-[40px] font-extrabold mb-3 text-slate-900 tracking-tight">O que Dizem ao Nosso Respeito</h2>
          <p className="text-slate-500 mb-16 text-[17px]">Feedbacks de quem já transformou sua trajetória.</p>
          
          <div className="relative max-w-3xl mx-auto mt-24">
             {/* Quote Icon Flutuante 3D */}
             <div className="absolute -top-[4rem] left-1/2 -translate-x-1/2 h-20 w-20 bg-white shadow-[0_20px_40px_rgb(25,103,210,0.15)] rounded-full flex items-center justify-center z-20 transform hover:-translate-y-2 transition-transform duration-500">
                <Quote className="h-8 w-8 text-[#1967D2] fill-current" />
             </div>
             
             {/* Main Testimonial Box Premium */}
             <Card className="bg-gradient-to-br from-[#1967D2] via-blue-700 to-[#1e3a8a] text-white p-14 lg:p-20 rounded-[3rem] border-none shadow-[0_30px_60px_rgba(25,103,210,0.25)] relative z-10 text-center cursor-default">
               {/* Sutil background glow dentro do card */}
               <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
               <div className="relative z-10">
                 <div className="flex justify-center gap-1 mb-6 text-yellow-400">
                   {[1,2,3,4,5].map(s => <Star key={s} className="w-5 h-5 fill-current" />)}
                 </div>
                 <h4 className="font-bold text-[22px] mb-6 tracking-tight drop-shadow-md">Divisor de Águas na Carreira!</h4>
                 <p className="text-blue-50 text-[18px] lg:text-[20px] leading-[1.7] mb-12 mx-auto font-medium font-serif italic text-shadow-sm">
                   "Em menos de uma semana utilizando o algoritmo da CevanRH, consegui três entrevistas em multinacionais que eu jamais conseguiria contato direto. O layout é limpo e a usabilidade fantástica."
                 </p>
                 <div className="flex flex-col items-center">
                    <div className="h-20 w-20 rounded-full bg-white/20 border-4 border-white/30 backdrop-blur-md shadow-xl overflow-hidden relative mb-4 p-1">
                       <div className="w-full h-full rounded-full overflow-hidden relative">
                         <Image src="/feature-woman.png" alt="Avatar" fill className="object-cover" />
                       </div>
                    </div>
                    <h5 className="font-extrabold text-white text-[17px] tracking-wide">Roberta Martins</h5>
                    <p className="text-[13px] text-blue-200 mt-1.5 font-semibold tracking-widest uppercase">Diretora de Marketing</p>
                 </div>
               </div>
             </Card>

             {/* Indicadores Premium */}
             <div className="flex justify-center items-center gap-3 mt-12">
               <div className="h-2.5 w-10 bg-[#1967D2] shadow-[0_0_10px_rgba(25,103,210,0.4)] rounded-full transition-all" />
               <div className="h-2.5 w-2.5 bg-slate-200 border border-slate-300 rounded-full cursor-pointer hover:bg-slate-300 hover:scale-125 transition-all" />
               <div className="h-2.5 w-2.5 bg-slate-200 border border-slate-300 rounded-full cursor-pointer hover:bg-slate-300 hover:scale-125 transition-all" />
             </div>
          </div>
        </div>

        {/* Floating Avatars Avancados */}
        <div className="absolute inset-0 z-0 pointer-events-none hidden xl:block max-w-[1400px] mx-auto">
           {[
             { top: "20%", left: "10%", s: "h-20 w-20", d: "delay-0", bg: "bg-red-400" },
             { top: "60%", left: "5%", s: "h-16 w-16", d: "delay-150", bg: "bg-blue-400" },
             { top: "80%", left: "22%", s: "h-24 w-24", d: "delay-300", bg: "bg-teal-400" },
             { top: "15%", right: "12%", s: "h-20 w-20", d: "delay-200", bg: "bg-yellow-400" },
             { top: "50%", right: "8%", s: "h-16 w-16", d: "delay-500", bg: "bg-pink-400" },
             { top: "75%", right: "20%", s: "h-20 w-20", d: "delay-700", bg: "bg-blue-400" }
           ].map((av, i) => (
             <div key={i} style={{ top: av.top, left: av.left, right: av.right }} className={`absolute ${av.s} rounded-full bg-slate-100 shadow-[0_15px_30px_rgba(0,0,0,0.1)] overflow-hidden border-4 border-white animate-[bounce_6s_infinite] ${av.d}`}>
                <div className={`w-full h-full ${av.bg} opacity-20`} />
             </div>
           ))}
        </div>
      </section>

      {/* --- POPULAR CATEGORIES (Premium Grid) --- */}
      <section className="py-24 bg-white border-t border-slate-100 relative">
        <div className="container mx-auto px-6 max-w-6xl text-center relative z-10">
          <h2 className="text-[34px] font-bold mb-3 text-slate-900 tracking-tight">Áreas Mais Desejadas</h2>
          <p className="text-slate-500 mb-14 text-[16px]">Mais de 4 mil novas requisições processadas apenas hoje.</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { name: "Estratégia Vendas", icon: Database, count: "2.443 Vagas" },
              { name: "Design Digital", icon: Palette, count: "1.238 Vagas" },
              { name: "Growth Marketing", icon: BarChart, count: "896 Vagas" },
              { name: "Saúde & Tech", icon: HeartPulse, count: "4.502 Vagas" },
              { name: "Engenharia Soft", icon: Code, count: "12.039 Vagas" },
              { name: "Gestão Pessoas", icon: HeartPulse, count: "899 Vagas" },
              { name: "Dados & IA", icon: Headset, count: "5.441 Vagas" },
              { name: "Gerência Projetos", icon: Briefcase, count: "3.204 Vagas" },
            ].map((cat, i) => (
              <Card key={i} className="p-6 border border-slate-100 hover:border-[#1967D2]/40 shadow-sm hover:shadow-[0_15px_30px_-5px_rgba(25,103,210,0.08)] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer text-left flex items-center gap-5 rounded-2xl bg-white group">
                <div className="h-14 w-14 rounded-xl bg-blue-50/50 flex flex-shrink-0 items-center justify-center text-[#1967D2] group-hover:bg-[#1967D2] group-hover:text-white group-hover:shadow-[0_5px_15px_rgba(25,103,210,0.3)] transition-all duration-300">
                  <cat.icon className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-[15px] text-slate-900 group-hover:text-[#1967D2] transition-colors">{cat.name}</h4>
                  <p className="text-[13px] text-slate-500 font-medium pt-0.5">{cat.count}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* --- ALL CANDIDATES & BOTTOM BANNERS COMBINED EFFORT --- */}
      <section className="pt-24 pb-32 bg-[#FAFBFC] border-t border-slate-100">
        <div className="container mx-auto px-6 max-w-6xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-24">
            
            {/* Banner 1: Empregador (Recruiting Now) */}
            <div className="bg-[#f2f4f7] rounded-lg p-8 flex flex-col justify-center items-start relative overflow-hidden group min-h-[220px]">
              <div className="relative z-10 w-3/5">
                <h3 className="font-semibold text-slate-900 mb-6 text-[22px] leading-[1.3] relative">Recrutando <br/>Agora</h3>
                <Link href="/empresas" className="font-medium text-white bg-[#1967D2] hover:bg-blue-700 px-6 py-2.5 rounded-md text-[14px] transition-colors shadow-sm inline-block">
                  Ver Todas
                </Link>
              </div>
              
              {/* Illustration Right Side - Vector Icons */}
              <div className="absolute right-[-20px] bottom-[-20px] top-0 w-[55%] pointer-events-none flex items-center justify-center">
                 <div className="absolute right-10 bottom-6 bg-[#1967D2] text-white p-5 rounded-3xl -rotate-12 shadow-lg shadow-blue-500/20 group-hover:-translate-y-2 group-hover:rotate-0 transition-transform duration-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>
                 </div>
                 <div className="absolute top-10 right-4 text-slate-300 rotate-12 scale-150">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2 11 13"/><path d="m22 2-7 20-4-9-9-4Z"/></svg>
                 </div>
                 <div className="absolute top-8 right-24 w-8 h-8 rounded-full border-4 border-blue-200" />
              </div>
            </div>

            {/* Banner 2: Oportunidades (Membership Opportunities) */}
            <div className="bg-[#fdf8ed] rounded-lg p-8 flex flex-col justify-center items-start relative overflow-hidden group min-h-[220px]">
              <div className="relative z-10 w-3/5">
                <h3 className="font-semibold text-slate-900 mb-6 text-[22px] leading-[1.3] relative">Oportunidades de<br/>Assinatura</h3>
                <Link href="/candidatos" className="font-medium text-white bg-[#1967D2] hover:bg-blue-700 px-6 py-2.5 rounded-md text-[14px] transition-colors shadow-sm inline-block">
                  Ver Todas
                </Link>
              </div>
              
              {/* Illustration Right Side - Vector Icons */}
              <div className="absolute right-[-20px] bottom-[-20px] top-0 w-[55%] pointer-events-none flex items-center justify-center">
                 <div className="absolute right-8 bottom-4 bg-yellow-400 text-yellow-900 p-6 rounded-[2rem] rotate-6 shadow-lg shadow-yellow-500/20 group-hover:-translate-y-2 group-hover:rotate-0 transition-transform duration-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 18V6"/></svg>
                 </div>
                 <div className="absolute top-12 right-2 text-yellow-500/30 -rotate-12 scale-150">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                 </div>
              </div>
            </div>

            {/* Banner 3: Anunciar (Post a Vacancy) */}
            <div className="bg-[#eff3f9] rounded-lg p-8 flex flex-col justify-center items-start relative overflow-hidden group min-h-[220px]">
              <div className="relative z-10 w-3/5">
                <h3 className="font-semibold text-slate-900 mb-6 text-[22px] leading-[1.3] relative">Publicar uma<br/>Vaga</h3>
                <Link href="#" className="font-medium text-white bg-[#1967D2] hover:bg-blue-700 px-6 py-2.5 rounded-md text-[14px] transition-colors shadow-sm inline-block">
                  Ver Todas
                </Link>
              </div>

              {/* Illustration Right Side - Vector Icons */}
              <div className="absolute right-[-20px] bottom-[-20px] top-0 w-[55%] pointer-events-none flex items-center justify-center">
                 <div className="absolute right-10 bottom-6 bg-red-400 text-white p-5 rounded-xl border-b-4 border-red-500 shadow-lg shadow-red-500/20 group-hover:-translate-y-2 group-hover:rotate-0 transition-transform duration-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                 </div>
                 <div className="absolute top-10 right-4 text-blue-300 scale-125 rotate-12">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
                 </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* --- PREMIUM FOOTER --- */}
      <footer className="bg-slate-900 text-white pt-24 pb-12 rounded-t-[3rem] lg:rounded-t-[4rem] relative overflow-hidden mt-[-2rem] z-20">
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#1967D2] to-transparent opacity-50" />
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-16">
            <div className="lg:col-span-2 space-y-8 pr-10">
               <div className="flex items-center gap-3">
                 <Image src="/logoprincipal.png" alt="Cevan Serviços Empresariais" width={320} height={96} className="h-16 w-auto object-contain brightness-0 invert opacity-90" />
               </div>
               <div className="space-y-1">
                 <p className="text-slate-400 text-[13px] font-bold tracking-widest uppercase">Plantão VIP Ininterrupto</p>
                 <p className="text-white text-[32px] font-black tracking-tight">123 456 7890</p>
               </div>
               <p className="text-[15px] text-slate-400 leading-relaxed font-medium">
                 Avenida Paulista, 1000, Bela Vista <br/> São Paulo - SP, 01310-100, Brasil.<br/>
                 <a href="mailto:suporte@cevanrh.com.br" className="text-white font-bold hover:text-[#1967D2] transition-colors mt-4 inline-block underline underline-offset-4 decoration-slate-600 hover:decoration-[#1967D2]">suporte@cevanrh.com.br</a>
               </p>
            </div>
            
            {[
              { title: "Plataforma", items: ["Pesquisar Vagas", "Destaque seu Perfil", "Planilha Salarial", "App Mobile"] },
              { title: "Empresarial", items: ["Anunciar Vaga", "Caçar Talentos Bancos", "Processo Seletivo (ATS)", "Gestores"] },
              { title: "O CevanRH", items: ["Nossa História", "Trabalhe Conosco", "Políticas e Privacidade", "Imprensa"] },
            ].map((col) => (
              <div key={col.title} className="space-y-8 lg:ml-auto">
                <h4 className="font-extrabold text-[18px] text-white tracking-wide">{col.title}</h4>
                <ul className="space-y-4 text-slate-400 text-[15px] font-medium">
                  {col.items.map(item => (
                    <li key={item}>
                      <a href="#" className="hover:text-blue-400 hover:translate-x-1.5 inline-block transition-transform duration-300">{item}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-10 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6 text-[14px] text-slate-500 font-medium">
            <p>© {new Date().getFullYear()} Cevan Serviços Empresariais. Todos os direitos reservados.</p>
            <div className="flex gap-4">
              {['Facebook', 'Twitter', 'LinkedIn', 'Instagram'].map(social => (
                <a key={social} href="#" className="hover:text-white transition-colors bg-slate-800/50 hover:bg-[#1967D2] px-4 py-2 rounded-full shadow-sm text-[13px] tracking-wide font-bold">{social}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
