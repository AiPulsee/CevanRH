"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  UserPlus, 
  Cpu, 
  Trophy,
  Building2,
  Zap,
  Users2,
  FileSearch,
  ChevronRight,
  Sparkles,
  Target,
  ArrowRight,
  MousePointer2,
  BarChart3,
  Search
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function HowItWorksPage() {
  const [activeTab, setActiveTab] = useState<'candidate' | 'company'>('company');

  const candidateSteps = [
    {
      step: "01",
      title: "Perfil Inteligente",
      desc: "Nossa IA processa seu currículo e cria um perfil otimizado focado nas suas competências reais.",
      icon: UserPlus,
      color: "blue"
    },
    {
      step: "02",
      title: "Match Predictor",
      desc: "Você só recebe notificações de vagas onde sua chance de contratação é estatisticamente alta.",
      icon: Cpu,
      color: "indigo"
    },
    {
      step: "03",
      title: "Curadoria & Feedback",
      desc: "Acompanhe cada etapa com transparência total e feedbacks reais sobre sua performance.",
      icon: FileSearch,
      color: "purple"
    },
    {
      step: "04",
      title: "Sua Nova Jornada",
      desc: "Entrevistas assertivas em empresas que buscam exatamente o seu conjunto de talentos.",
      icon: Trophy,
      color: "emerald"
    }
  ];

  const companySteps = [
    {
      step: "01",
      title: "Design de Vaga via IA",
      desc: "Nossa tecnologia estrutura sua vaga focando na conversão dos talentos de alta performance.",
      icon: Sparkles,
      color: "blue"
    },
    {
      step: "02",
      title: "Ranking Semântico",
      desc: "Visualize os candidatos rankeados por compatibilidade técnica e cultural em segundos.",
      icon: Target,
      color: "indigo"
    },
    {
      step: "03",
      title: "Pipeline Ágil",
      desc: "Gerencie candidatos em um Kanban intuitivo com automações que aceleram sua decisão.",
      icon: Zap,
      color: "purple"
    },
    {
      step: "04",
      title: "Shortlist de Elite",
      desc: "Receba apenas os finalistas validados por nossos especialistas, prontos para a proposta.",
      icon: Users2,
      color: "emerald"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFBFC] mt-20 font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* Hero Section - Clean & High Impact */}
      <section className="bg-white border-b border-slate-100 py-24 lg:py-32 relative overflow-hidden text-center">
        <div className="absolute top-0 left-1/2 w-[800px] h-[800px] bg-blue-50/50 rounded-full blur-[140px] -translate-x-1/2 -translate-y-1/2" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Badge className="bg-blue-50 text-blue-600 border-blue-100 rounded-full px-4 py-1 font-black mb-6 uppercase tracking-[0.2em] text-[10px]">
            Fluxo de Trabalho Inteligente
          </Badge>
          <h1 className="text-5xl lg:text-6xl font-black text-slate-900 mb-8 tracking-tight leading-[1.1] max-w-4xl mx-auto">
            A ponte inteligente entre o <span className="text-blue-600">talento</span> e o próximo grande desafio.
          </h1>
          <p className="text-slate-500 font-medium mb-12 text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
            Unimos inteligência de dados com curadoria humana para criar processos seletivos rápidos, assertivos e humanos.
          </p>

          <div className="inline-flex bg-slate-50 p-1.5 rounded-[1.5rem] border border-slate-100 shadow-sm relative">
            <button 
              onClick={() => setActiveTab('company')}
              className={cn(
                "px-10 py-3 rounded-[1rem] font-black text-[11px] uppercase tracking-widest transition-all relative z-10",
                activeTab === 'company' ? "text-blue-600" : "text-slate-400 hover:text-slate-600"
              )}
            >
              Para Empresas
            </button>
            <button 
              onClick={() => setActiveTab('candidate')}
              className={cn(
                "px-10 py-3 rounded-[1rem] font-black text-[11px] uppercase tracking-widest transition-all relative z-10",
                activeTab === 'candidate' ? "text-blue-600" : "text-slate-400 hover:text-slate-600"
              )}
            >
              Para Candidatos
            </button>
            <motion.div 
              layoutId="tab-bg"
              className="absolute inset-y-1.5 bg-white rounded-[1rem] shadow-sm border border-slate-100"
              initial={false}
              animate={{ 
                x: activeTab === 'company' ? 6 : 148,
                width: activeTab === 'company' ? 142 : 156
              }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          </div>
        </div>
      </section>

      {/* Main Journey Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            
            {/* Left Side: Vertical Journey */}
            <div className="space-y-12 relative">
              <div className="absolute left-[31px] top-10 bottom-10 w-[2px] bg-slate-100" />
              
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeTab}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-16"
                >
                  {(activeTab === 'company' ? companySteps : candidateSteps).map((step, i) => (
                    <div key={step.step} className="flex gap-8 group relative z-10">
                      <div className={cn(
                        "h-16 w-16 rounded-[1.2rem] flex items-center justify-center shrink-0 transition-all duration-500 shadow-xl border-4 border-white",
                        step.color === 'blue' && "bg-blue-600 text-white",
                        step.color === 'indigo' && "bg-slate-900 text-white",
                        step.color === 'purple' && "bg-indigo-600 text-white",
                        step.color === 'emerald' && "bg-blue-600 text-white"
                      )}>
                        <step.icon className="h-6 w-6" />
                      </div>
                      <div className="pt-2">
                        <span className="text-[11px] font-black text-blue-600 uppercase tracking-widest mb-2 block">
                          Passo {step.step}
                        </span>
                        <h4 className="font-black text-slate-900 text-2xl mb-3 tracking-tight group-hover:text-blue-600 transition-colors">
                          {step.title}
                        </h4>
                        <p className="text-slate-500 text-[15px] font-medium leading-relaxed max-w-md">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Side: High-End Mockup */}
            <div className="lg:block hidden relative">
                <div className="absolute inset-0 bg-blue-50 rounded-[4rem] blur-3xl opacity-50" />
                <Card className="relative bg-white border-slate-100 rounded-[3rem] p-10 shadow-2xl overflow-hidden border-2">
                    <div className="flex items-center justify-between mb-10 pb-6 border-b border-slate-50">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                          <BarChart3 className="h-6 w-6" />
                        </div>
                        <div>
                          <h5 className="font-black text-slate-900 tracking-tight">Cevan Insight Engine</h5>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Análise de Dados em Tempo Real</p>
                        </div>
                      </div>
                      <Badge className="bg-emerald-50 text-emerald-600 border-none font-black text-[10px]">98% Match</Badge>
                    </div>

                    <div className="space-y-8">
                       <div className="grid grid-cols-3 gap-4">
                          {[1,2,3].map(i => (
                            <div key={i} className="h-2 bg-slate-50 rounded-full relative overflow-hidden">
                              <motion.div 
                                className="absolute inset-y-0 left-0 bg-blue-600"
                                initial={{ width: 0 }}
                                animate={{ width: i === 1 ? '90%' : i === 2 ? '75%' : '85%' }}
                                transition={{ duration: 1, delay: 0.5 }}
                              />
                            </div>
                          ))}
                       </div>
                       
                       <div className="p-6 rounded-[2rem] bg-slate-900 text-white relative overflow-hidden">
                          <div className="absolute top-0 right-0 p-4 opacity-20"><Search className="h-12 w-12" /></div>
                          <div className="flex items-center gap-2 mb-4">
                            <Sparkles className="h-4 w-4 text-blue-400" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-blue-100">Inteligência Preditiva</span>
                          </div>
                          <p className="text-[13px] font-medium leading-relaxed text-slate-300 italic">
                            "Este candidato possui as hard skills essenciais para o cargo e apresenta um alinhamento cultural superior à média do setor."
                          </p>
                       </div>

                       <div className="flex items-center justify-between p-4 bg-blue-50 rounded-2xl border border-blue-100">
                          <div className="flex items-center gap-3">
                            <Users2 className="h-5 w-5 text-blue-600" />
                            <span className="font-black text-xs text-blue-900">Aprovação Curadoria</span>
                          </div>
                          <div className="flex -space-x-2">
                             {[1,2,3].map(i => (
                               <div key={i} className="h-8 w-8 rounded-full bg-slate-200 border-2 border-white" />
                             ))}
                          </div>
                       </div>
                    </div>
                </Card>

                {/* Floating elements */}
                <div className="absolute -bottom-6 -left-6 p-6 bg-white rounded-3xl shadow-xl border border-slate-100 z-20 hidden xl:block">
                   <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                        <Trophy className="h-5 w-5" />
                      </div>
                      <span className="font-black text-sm text-slate-900">Shortlist Pronta</span>
                   </div>
                </div>
            </div>

          </div>
        </div>
      </section>

      {/* Trust & Stats Section */}
      <section className="py-24 bg-[#FAFBFC]">
        <div className="max-w-7xl mx-auto px-6">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
              <div className="space-y-4">
                 <h3 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter">70%</h3>
                 <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">Mais rápido que processos comuns</p>
              </div>
              <div className="space-y-4">
                 <h3 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter">94%</h3>
                 <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">Taxa de retenção pós-contratação</p>
              </div>
              <div className="space-y-4">
                 <h3 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter">15k+</h3>
                 <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">Talentos de elite em nossa rede</p>
              </div>
           </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
           <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-8 tracking-tight">Pronto para transformar sua <br />forma de contratar?</h2>
           <p className="text-slate-500 text-lg mb-12 max-w-xl mx-auto font-medium leading-relaxed">
             Junte-se às empresas que já descobriram o poder do recrutamento inteligente com a Cevan.
           </p>
           <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="h-16 px-12 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-[13px] uppercase tracking-widest shadow-2xl shadow-blue-200 transition-all group">
                 Sou Empresa <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="h-16 px-12 rounded-2xl border-slate-200 text-slate-900 font-black text-[13px] uppercase tracking-widest hover:bg-slate-50 transition-all">
                 Sou Candidato
              </Button>
           </div>
        </div>
      </section>
    </div>
  );
}
