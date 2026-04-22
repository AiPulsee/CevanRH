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
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-40 overflow-hidden flex items-center min-h-[750px]">
        {/* Background Shapes for Depth */}
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-blue-50/50 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        
        {/* Background Curvo Avançado */}
        <div className="absolute top-0 right-0 w-full lg:w-[50%] h-full z-0 lg:rounded-bl-[350px] overflow-hidden shadow-[-20px_0_50px_rgba(0,0,0,0.05)]">
           <div className="absolute inset-0 bg-gradient-to-tr from-[#1967D2]/95 via-[#1967D2]/80 to-blue-500/40 mix-blend-multiply z-10" />
           <div className="absolute inset-0 bg-blue-900/10 backdrop-blur-[1px] z-10" />
           <Image src="/feature-woman.png" alt="Cevan Hero" fill className="object-cover opacity-90 scale-105 hover:scale-110 transition-transform duration-[10000ms]" priority />
        </div>
        
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="w-full lg:w-[58%] pr-0 lg:pr-12 space-y-12">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-[64px] font-black tracking-tight text-slate-900 leading-[1.05]">
                Existem <span className="text-[#1967D2]">93.178</span> <br/> 
                Vagas para você!
              </h1>
              <p className="text-slate-500 text-lg lg:text-xl max-w-xl leading-relaxed">
                Conecte-se com as organizações mais inovadoras do mercado e dispare na frente em processos seletivos exclusivos.
              </p>
            </div>

            {/* Search Box Refined & Aligned */}
            <div className="p-1.5 bg-white rounded-2xl lg:rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-slate-100 flex flex-col md:flex-row items-center w-full max-w-3xl transition-all duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.1)] group/search">
                <div className="flex-[1.2] w-full flex items-center px-4 gap-3 group border-b md:border-b-0 md:border-r border-slate-100">
                  <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0 group-focus-within:bg-blue-600 group-focus-within:text-white transition-all">
                    <Search className="h-5 w-5 text-blue-600 group-focus-within:text-current transition-colors" />
                  </div>
                  <input 
                    placeholder="Qual cargo ou tecnologia?" 
                    className="h-14 w-full bg-transparent border-none outline-none focus:ring-0 text-[16px] font-bold placeholder:text-slate-300 px-2"
                  />
                </div>
                <div className="flex-1 w-full flex items-center px-4 gap-3 group">
                  <div className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0 group-focus-within:bg-blue-600 group-focus-within:text-white transition-all">
                    <MapPin className="h-5 w-5 text-slate-400 group-focus-within:text-current transition-colors" />
                  </div>
                  <input 
                    placeholder="Localização (Ex: Remoto)" 
                    className="h-14 w-full bg-transparent border-none outline-none focus:ring-0 text-[16px] font-bold placeholder:text-slate-300 px-2"
                  />
                </div>
                <Button className="w-full md:w-auto h-14 md:rounded-full rounded-xl px-12 bg-[#1967D2] hover:bg-blue-700 font-black shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all uppercase tracking-widest text-xs">
                  Buscar Vagas
                </Button>
            </div>
            
            <div className="flex flex-col gap-8">
              <p className="text-[13px] text-slate-400 font-bold flex gap-3 items-center">
                <span className="text-slate-900 uppercase tracking-widest text-[11px]">Tendência:</span> 
                {["Designer", "Engenheiro", "PHP"].map(t => (
                  <span key={t} className="hover:text-[#1967D2] cursor-pointer transition-colors border-b border-transparent hover:border-blue-200">{t}</span>
                ))}
              </p>

              {/* Logos Inline Interativos - Better Aligned */}
              <div className="flex flex-wrap items-center gap-x-12 gap-y-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
                 <span className="flex items-center gap-2 font-black text-xl tracking-tighter uppercase cursor-default">
                   <div className="w-6 h-6 bg-black rounded flex items-center justify-center text-white text-[12px]">M</div> Medium
                 </span>
                 <span className="font-black text-xl tracking-tighter uppercase cursor-default">Linear</span>
                 <span className="italic font-serif lowercase text-xl tracking-tighter cursor-default">mailchimp</span>
                 <span className="tracking-tight lowercase text-xl font-bold cursor-default">stripe</span>
                 <span className="normal-case tracking-tight font-bold text-xl cursor-default">inVision</span>
              </div>
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
              <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-3">Vagas em <span className="text-[#1967D2]">Destaque</span></h2>
              <p className="text-slate-500 text-[16px] max-w-lg font-medium">Vagas selecionadas rigorosamente nas melhores empresas do mercado.</p>
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
            ].map((job, i) => (
              <Card key={i} className="group p-8 border-slate-100 hover:border-[#1967D2]/30 hover:shadow-[0_20px_40px_rgb(25,103,210,0.06)] hover:-translate-y-1.5 transition-all duration-500 cursor-pointer rounded-[2rem] bg-white relative overflow-hidden">
                <div className="flex items-center gap-6 relative z-10">
                  <div className={`h-[72px] w-[72px] rounded-2xl ${job.bg} flex items-center justify-center text-white font-black text-2xl shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                    {job.logo}
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-extrabold text-[19px] text-slate-900 group-hover:text-[#1967D2] transition-colors">{job.role}</h4>
                    <div className="flex items-center gap-3 text-slate-500 text-[13px] font-bold uppercase tracking-wider">
                      <span className="flex items-center gap-1.5"><Building2 className="h-3.5 w-3.5 text-[#1967D2]" /> {job.comp}</span>
                      <span className="w-1 h-1 bg-slate-200 rounded-full" />
                      <span className="flex items-center gap-1.5 font-black text-green-600">{job.pay}</span>
                    </div>
                  </div>
                </div>
                {job.urg && (
                  <Badge className="absolute top-6 right-6 bg-red-50 text-red-500 border-none font-black text-[10px] px-3 py-1 uppercase tracking-widest">Urgente</Badge>
                )}
                <div className="mt-8 pt-8 border-t border-slate-50 flex items-center justify-between text-[13px] font-bold">
                  <div className="flex gap-4 text-slate-400 uppercase tracking-widest text-[10px]">
                    <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> Remoto</span>
                    <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> 12h Atrás</span>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-[#1967D2] group-hover:text-white transition-all duration-500">
                    <ChevronRight className="h-5 w-5" />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="flex justify-center">
             <Button size="lg" className="rounded-full h-14 px-10 font-black text-xs uppercase tracking-[0.2em] bg-slate-900 text-white hover:bg-[#1967D2] shadow-xl shadow-slate-200 hover:shadow-blue-200 hover:-translate-y-1 transition-all duration-500">
               Explorar Todas as Vagas <ChevronRight className="ml-2 h-4 w-4" />
             </Button>
          </div>
        </div>
      </section>

      {/* --- CULTURA E CURADORIA --- */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
             <div className="relative group">
                <div className="absolute inset-0 bg-blue-600/10 rounded-[3rem] blur-3xl group-hover:bg-blue-600/20 transition-all duration-700" />
                <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
                  <Image src="/feature-woman.png" alt="Curadoria de talentos" width={800} height={600} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                  <div className="absolute bottom-10 left-10 text-white">
                    <p className="text-[11px] font-black uppercase tracking-[0.3em] mb-2 text-blue-400">Metodologia Cevan</p>
                    <h3 className="text-3xl font-black leading-tight">Curadoria Humana <br/> + Inteligência Artificial</h3>
                  </div>
                </div>
             </div>
             
             <div className="space-y-10">
                <div className="space-y-6">
                  <Badge className="bg-[#1967D2]/10 text-[#1967D2] border-none rounded-full px-4 py-1.5 font-black uppercase tracking-widest text-[10px]">Nossa Missão</Badge>
                  <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">O Fim da Triagem <br/> <span className="text-[#1967D2]">Interminável.</span></h2>
                  <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-xl">
                    Nossa plataforma não apenas lista currículos. Nós utilizamos IA de última geração para filtrar talentos técnicos e nossa equipe humana para validar o "soft skill" e a cultura.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                   {[
                     { icon: Zap, title: "Velocidade Real", desc: "Aprovações em menos de 48h." },
                     { icon: Star, title: "Qualidade Premium", desc: "Apenas o Top 3% dos talentos." },
                     { icon: CheckCircle2, title: "Match Perfeito", desc: "Foco total na cultura organizacional." },
                     { icon: Building2, title: "Global Network", desc: "Vagas em mais de 12 países." },
                   ].map((item, i) => (
                     <div key={i} className="flex gap-4">
                        <div className="h-12 w-12 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0">
                          <item.icon className="h-5 w-5 text-[#1967D2]" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-black text-slate-900 text-[15px]">{item.title}</h4>
                          <p className="text-slate-500 text-[13px] font-medium leading-snug">{item.desc}</p>
                        </div>
                     </div>
                   ))}
                </div>

                <div className="pt-6">
                  <Button className="h-14 px-10 rounded-2xl bg-[#1967D2] hover:bg-blue-700 font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-100">
                    Saber Mais Sobre a Curadoria
                  </Button>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* --- CATEGORIES --- */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-7xl text-center mb-16">
          <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Onde Precisamos de Você?</h2>
          <p className="text-slate-500 font-medium">Categorias com maior volume de contratações esta semana.</p>
        </div>
        
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Code, title: "Desenvolvimento", jobs: "12.4k" },
              { icon: Palette, title: "Design & UX", jobs: "5.1k" },
              { icon: BarChart, title: "Marketing Digital", jobs: "8.2k" },
              { icon: Headset, title: "Vendas & CS", jobs: "15.9k" },
              { icon: Database, title: "Data Science", jobs: "3.2k" },
              { icon: HeartPulse, title: "Recursos Humanos", jobs: "4.5k" },
              { icon: Briefcase, title: "Finanças", jobs: "2.8k" },
              { icon: Smartphone, title: "Mobile Apps", jobs: "6.7k" },
            ].map((cat, i) => (
              <Card key={i} className="group p-8 border-slate-100 hover:border-[#1967D2]/20 hover:bg-blue-50/10 transition-all duration-300 cursor-pointer rounded-[2rem] flex flex-col items-center text-center shadow-sm">
                <div className="h-16 w-16 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 group-hover:bg-[#1967D2] transition-colors duration-500">
                  <cat.icon className="h-6 w-6 text-slate-600 group-hover:text-white transition-colors duration-500" />
                </div>
                <h4 className="font-extrabold text-slate-900 mb-1 text-[16px]">{cat.title}</h4>
                <p className="text-[12px] font-black text-[#1967D2] uppercase tracking-widest">{cat.jobs} Vagas</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
