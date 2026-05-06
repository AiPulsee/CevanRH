"use client";

import { Badge } from "@/components/ui/badge";
import { Building2, Heart, ShieldCheck, Target, TrendingUp } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white mt-24">
      {/* Narrative Section */}
      <section className="py-24 lg:py-32 overflow-hidden">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="flex-1 space-y-8">
              <Badge className="bg-blue-50 text-blue-600 border-blue-100 rounded-full px-4 py-1.5 font-bold">
                Conheça a Cevan
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.1]">
                Unindo Expertise Humana à <span className="text-blue-600">Inteligência Artificial</span>.
              </h1>
              <p className="text-slate-600 text-lg leading-relaxed">
                A **Cevan Serviços Empresariais** nasceu com uma missão clara: desburocratizar o RH e encontrar o &quot;match&quot; perfeito entre empresas e talentos. 
                <br /><br />
                Acreditamos que a tecnologia deve ser uma ponte, não uma barreira. Por isso, desenvolvemos a **Cevan Serviços Empresariais**, uma plataforma que utiliza IA de ponta para o trabalho pesado, permitindo que nossos especialistas foquem no que realmente importa: **o potencial humano**.
              </p>
              
              <div className="grid grid-cols-2 gap-8 pt-4">
                <div>
                  <h4 className="text-4xl font-black text-slate-900">10+</h4>
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-1">Anos de Experiência</p>
                </div>
                <div>
                  <h4 className="text-4xl font-black text-slate-900">5k+</h4>
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-1">Vagas Preenchidas</p>
                </div>
              </div>
            </div>
            
            <div className="flex-1 relative">
              <div className="relative z-10 rounded-[4rem] overflow-hidden shadow-2xl shadow-blue-200">
                <Image 
                  src="/feature-woman.png" 
                  alt="Cevan Expertise" 
                  width={600} 
                  height={800} 
                  className="w-full h-auto object-cover"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl lg:text-5xl font-black text-slate-900 mb-6">Nossos Pilares</h2>
            <p className="text-slate-500 text-lg">O que nos guia todos os dias na busca pela excelência em cada contratação.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Ética e Transparência",
                desc: "Processos claros para candidatos e empresas, garantindo segurança jurídica e moral em todas as etapas.",
                icon: ShieldCheck,
                color: "text-emerald-500",
                bg: "bg-emerald-50"
              },
              {
                title: "Inovação Constante",
                desc: "Investimos nas melhores ferramentas de IA para garantir que nossos clientes estejam sempre à frente no mercado.",
                icon: TrendingUp,
                color: "text-blue-500",
                bg: "bg-blue-50"
              },
              {
                title: "Foco nas Pessoas",
                desc: "Por trás de cada currículo existe um sonho. Nosso trabalho é conectar esses sonhos às empresas certas.",
                icon: Heart,
                color: "text-rose-500",
                bg: "bg-rose-50"
              }
            ].map((item, i) => (
              <div key={i} className="p-10 bg-white rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-500 group">
                <div className={`h-16 w-16 rounded-2xl ${item.bg} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                  <item.icon className={`h-8 w-8 ${item.color}`} />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-4">{item.title}</h3>
                <p className="text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="bg-slate-900 rounded-[4rem] p-12 lg:p-24 text-white flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1">
              <div className="h-16 w-16 rounded-2xl bg-blue-500/20 flex items-center justify-center mb-8">
                <Target className="h-8 w-8 text-blue-400" />
              </div>
              <h2 className="text-3xl lg:text-5xl font-black mb-8 leading-tight">Nossa Visão de Futuro</h2>
              <p className="text-slate-400 text-lg leading-relaxed">
                Queremos ser a maior referência em **Recrutamento Inteligente** do Brasil, provando que é possível escalar um negócio de RH mantendo a essência humana e a qualidade impecável de cada entrega.
              </p>
            </div>
            <div className="flex-1 grid grid-cols-1 gap-6 w-full">
              {[
                { label: "Precisão", value: "98%", desc: "De assertividade nas shortlists entregues." },
                { label: "Agilidade", value: "3x Mais", desc: "Rápido que o recrutamento tradicional." },
                { label: "Satisfação", value: "99%", desc: "NPS médio dos nossos clientes corporativos." }
              ].map((stat, i) => (
                <div key={i} className="p-8 bg-white/5 rounded-3xl border border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-blue-400 font-black text-2xl">{stat.value}</span>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{stat.label}</span>
                  </div>
                  <p className="text-sm text-slate-400 font-medium">{stat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Social Section */}
      <section className="py-24 border-t border-slate-100">
        <div className="container mx-auto px-6 max-w-6xl text-center">
          <div className="flex items-center justify-center gap-3 mb-10 text-slate-400">
            <Building2 className="h-6 w-6" />
            <span className="font-bold tracking-widest uppercase text-xs">Cevan Serviços Empresariais LTDA</span>
          </div>
          <p className="text-slate-500 max-w-2xl mx-auto text-sm leading-relaxed">
            Localizados no coração pulsante do mercado brasileiro, atendemos empresas de todos os portes com soluções personalizadas de recrutamento e gestão de talentos.
          </p>
        </div>
      </section>
    </div>
  );
}
