"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  UserPlus, 
  Cpu, 
  Trophy,
  Building2,
  Zap,
  Users2,
  FileSearch,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Target
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function HowItWorksPage() {
  const [activeTab, setActiveTab] = useState<'candidate' | 'company'>('company');

  const candidateSteps = [
    {
      title: "Cadastro & Perfil Inteligente",
      desc: "Crie sua conta e faça upload do seu currículo. Nossa IA extrai automaticamente suas experiências e habilidades, criando um perfil otimizado para os algoritmos de busca.",
      icon: UserPlus,
      color: "blue"
    },
    {
      title: "Match via Inteligência Artificial",
      desc: "Não perca tempo com vagas que não combinam com você. Nosso sistema te avisa quando uma vaga tem alto 'Score de Match' com suas competências e pretensões.",
      icon: Cpu,
      color: "indigo"
    },
    {
      title: "Triagem e Curadoria",
      desc: "Seu perfil será analisado por nossa IA e, em vagas gerenciadas, por nossos especialistas. Você recebe feedback sobre sua evolução no processo seletivo.",
      icon: FileSearch,
      color: "purple"
    },
    {
      title: "A Conquista da Vaga",
      desc: "Participe de entrevistas assertivas com empresas que realmente valorizam seu perfil. Menos burocracia e mais foco no seu talento.",
      icon: Trophy,
      color: "emerald"
    }
  ];

  const companySteps = [
    {
      title: "Anúncio Assistido por IA",
      desc: "Descreva o que precisa e nossa IA gera a descrição da vaga ideal, focada em atrair os melhores talentos e alinhada à sua cultura.",
      icon: Sparkles,
      color: "blue"
    },
    {
      title: "Triagem Automatizada",
      desc: "Receba centenas de currículos, mas visualize apenas os melhores. Nossa IA rankeia os candidatos por compatibilidade técnica e comportamental.",
      icon: Target,
      color: "indigo"
    },
    {
      title: "Gestão em Pipeline (Kanban)",
      desc: "Acompanhe todos os processos em uma interface intuitiva. Arraste candidatos entre etapas de entrevista, teste e proposta com facilidade.",
      icon: Zap,
      color: "purple"
    },
    {
      title: "Contratação de Alta Performance",
      desc: "Para quem busca o máximo de segurança, nossa Curadoria Humana entrega apenas os finalistas (Shortlist) prontos para a decisão final.",
      icon: Users2,
      color: "emerald"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFBFC] mt-24 font-sans">
      {/* Hero Section */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="container mx-auto px-6 max-w-5xl relative z-10 text-center">
          <Badge className="bg-blue-500/20 text-blue-300 border-none rounded-full px-4 py-1.5 font-black mb-6 uppercase tracking-widest text-[10px]">
            Tecnologia + Expertise Humana
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-black tracking-tight mb-8">
            Como a <span className="text-blue-400 font-black">Cevan Serviços Empresariais</span> Funciona para Você
          </h1>
          <p className="text-slate-400 text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
            Seja você um talento em busca de novos desafios ou uma empresa buscando excelência, nossa plataforma é o ponto de encontro ideal.
          </p>
        </div>
      </section>

      {/* Tab Selector */}
      <section className="py-12 bg-white border-b border-slate-100 sticky top-24 z-30">
        <div className="container mx-auto px-6 flex justify-center">
          <div className="bg-slate-100 p-1.5 rounded-2xl flex items-center gap-1 shadow-inner">
            <button 
              onClick={() => setActiveTab('company')}
              className={cn(
                "px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all",
                activeTab === 'company' 
                  ? "bg-white text-blue-600 shadow-md" 
                  : "text-slate-500 hover:text-slate-700"
              )}
            >
              Para Empresas
            </button>
            <button 
              onClick={() => setActiveTab('candidate')}
              className={cn(
                "px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all",
                activeTab === 'candidate' 
                  ? "bg-white text-blue-600 shadow-md" 
                  : "text-slate-500 hover:text-slate-700"
              )}
            >
              Para Candidatos
            </button>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            
            {/* Left Side: Content */}
            <div className="space-y-12">
              <div>
                <Badge className="bg-blue-50 text-blue-600 border-none rounded-lg px-3 py-1 font-black uppercase text-[10px] mb-4">
                  Passo a Passo
                </Badge>
                <h2 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                  {activeTab === 'company' 
                    ? "Sua Empresa com Recrutamento Especializado" 
                    : "Sua Carreira em um Novo Patamar"}
                </h2>
                <p className="text-slate-500 mt-4 text-lg font-medium leading-relaxed">
                  {activeTab === 'company' 
                    ? "Elimine o ruído e foque no que importa: escolher o profissional ideal para sua cultura."
                    : "Pare de enviar currículos para o vácuo. Seja encontrado pelas melhores oportunidades do mercado."}
                </p>
              </div>

              <div className="space-y-10">
                {(activeTab === 'company' ? companySteps : candidateSteps).map((step, i) => (
                  <motion.div 
                    key={step.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-6 group"
                  >
                    <div className={cn(
                      "h-14 w-14 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110 shadow-lg",
                      step.color === 'blue' && "bg-blue-50 text-blue-600 shadow-blue-100",
                      step.color === 'indigo' && "bg-indigo-50 text-indigo-600 shadow-indigo-100",
                      step.color === 'purple' && "bg-purple-50 text-purple-600 shadow-purple-100",
                      step.color === 'emerald' && "bg-emerald-50 text-emerald-600 shadow-emerald-100"
                    )}>
                      <step.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900 text-lg mb-2">{step.title}</h4>
                      <p className="text-slate-500 text-[15px] font-medium leading-relaxed">{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Side: Visual Aid */}
            <div className="relative group lg:block hidden">
                <div className="absolute inset-0 bg-blue-600/5 rounded-[3rem] blur-3xl group-hover:bg-blue-600/10 transition-all duration-700" />
                <div className="relative bg-white border border-slate-100 rounded-[3rem] p-12 shadow-2xl">
                    {/* Simulated Interface */}
                    <div className="space-y-6">
                       <div className="flex items-center justify-between pb-6 border-b border-slate-50">
                          <div className="flex gap-3 items-center">
                             <div className="h-10 w-10 rounded-full bg-slate-100 animate-pulse" />
                             <div className="space-y-1.5">
                                <div className="h-3 w-32 bg-slate-200 rounded animate-pulse" />
                                <div className="h-2 w-20 bg-slate-100 rounded animate-pulse" />
                             </div>
                          </div>
                          <Badge className="bg-emerald-50 text-emerald-600 border-none font-black text-[10px]">Active</Badge>
                       </div>
                       <div className="space-y-4">
                          <div className="h-4 w-full bg-slate-50 rounded" />
                          <div className="h-4 w-3/4 bg-slate-50 rounded" />
                          <div className="h-4 w-1/2 bg-slate-50 rounded" />
                       </div>
                       <div className="grid grid-cols-2 gap-4 pt-4">
                          <div className="h-20 bg-blue-50 rounded-2xl flex flex-col items-center justify-center p-4">
                             <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">IA Score</span>
                             <span className="text-2xl font-black text-blue-900">9.8</span>
                          </div>
                          <div className="h-20 bg-indigo-50 rounded-2xl flex flex-col items-center justify-center p-4">
                             <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-1">Status</span>
                             <span className="text-sm font-black text-indigo-900">Finalista</span>
                          </div>
                       </div>
                    </div>

                    <div className="mt-12 p-6 rounded-2xl bg-slate-900 text-white">
                       <div className="flex items-center gap-3 mb-4">
                          <Sparkles className="h-5 w-5 text-blue-400" />
                          <span className="text-sm font-bold">Relatório de IA</span>
                       </div>
                       <p className="text-xs text-slate-400 font-medium leading-relaxed italic">
                         "Candidato apresenta 98% de compatibilidade técnica e alinhamento cultural de 94% com a visão da empresa."
                       </p>
                    </div>
                </div>
            </div>

          </div>
        </div>
      </section>

      {/* Benefits Summary Section */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6 max-w-6xl text-center">
           <h2 className="text-3xl font-black text-slate-900 mb-16 tracking-tight">Vantagens Exclusivas</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="space-y-6">
                 <div className="h-16 w-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto">
                    <CheckCircle2 className="h-8 w-8 text-blue-600" />
                 </div>
                 <h3 className="font-bold text-xl text-slate-900">Agilidade Real</h3>
                 <p className="text-slate-500 font-medium">Processos que levavam semanas agora são resolvidos em dias.</p>
              </div>
              <div className="space-y-6">
                 <div className="h-16 w-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto">
                    <Building2 className="h-8 w-8 text-indigo-600" />
                 </div>
                 <h3 className="font-bold text-xl text-slate-900">Authority</h3>
                 <p className="text-slate-500 font-medium">As melhores empresas do país confiam em nossa curadoria.</p>
              </div>
              <div className="space-y-6">
                 <div className="h-16 w-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto">
                    <Users2 className="h-8 w-8 text-emerald-600" />
                 </div>
                 <h3 className="font-bold text-xl text-slate-900">Cuidado Humano</h3>
                 <p className="text-slate-500 font-medium">Não somos apenas algoritmos. Somos pessoas conectando pessoas.</p>
              </div>
           </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
           <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mb-8 tracking-tight">Pronto para dar o próximo passo?</h2>
           <p className="text-slate-500 text-lg mb-12 max-w-xl mx-auto font-medium">Escolha o seu perfil e junte-se à revolução do recrutamento inteligente.</p>
           <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="h-14 px-10 rounded-2xl bg-[#1967D2] hover:bg-blue-700 font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-100 flex items-center gap-2">
                 Sou Empresa <ChevronRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-10 rounded-2xl border-slate-200 text-slate-700 font-black text-xs uppercase tracking-widest hover:bg-slate-50 flex items-center gap-2">
                 Sou Candidato <ChevronRight className="h-4 w-4" />
              </Button>
           </div>
        </div>
      </section>
    </div>
  );
}
