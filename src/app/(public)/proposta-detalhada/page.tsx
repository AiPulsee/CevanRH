"use client";

import { motion } from "framer-motion";
import { 
  Globe, 
  ShieldCheck, 
  LayoutDashboard, 
  Smartphone, 
  CheckCircle2, 
  ArrowRight,
  FileText,
  Clock,
  Code2,
  Zap
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const modules = [
  {
    id: "site-publico",
    title: "Plataforma Institucional & Presença Digital",
    icon: Globe,
    color: "bg-blue-500",
    status: "OBRIGATÓRIO",
    description: "Desenvolvimento de uma plataforma digital focada na apresentação da Cevan Serviços Empresariais. O sistema é projetado para converter visitantes em novos parceiros através de uma navegação fluida e tecnicamente eficiente.",
    features: [
      "Arquitetura Mobile-First com foco em usabilidade e rapidez",
      "Otimização On-Page para melhor posicionamento em buscas (SEO)",
      "Landing Pages estruturadas para conversão de novos clientes",
      "Integração de APIs para captura e organização de leads",
      "Otimização Core Web Vitals para carregamento ágil e estável",
      "Interface intuitiva com foco na jornada do usuário"
    ]
  },
  {
    id: "auth-seguranca",
    title: "Sistema de Autenticação & Segurança de Dados",
    icon: ShieldCheck,
    color: "bg-emerald-500",
    status: "OBRIGATÓRIO",
    description: "Estrutura de segurança projetada para garantir a proteção de informações e dados corporativos. Utiliza protocolos de autenticação modernos, assegurando que o acesso ao painel administrativo seja controlado e monitorado.",
    features: [
      "Implementação de Protocolo OAuth2/OpenID via NextAuth.js v5",
      "Criptografia para proteção de dados em repouso e trânsito",
      "Sistema de Controle de Acesso (RBAC) com permissões por cargo",
      "Fluxos de recuperação de acesso com tokens temporários",
      "Proteção contra vulnerabilidades comuns (SQLi, XSS, CSRF)",
      "Trilha de auditoria para monitoramento de ações administrativas"
    ]
  },
  {
    id: "painel-adm",
    title: "Painel Administrativo ATS (Gestão de Vagas)",
    icon: LayoutDashboard,
    color: "bg-indigo-600",
    status: "OBRIGATÓRIO",
    description: "Painel centralizado para o gerenciamento de processos seletivos. O módulo ATS organiza fluxos de recrutamento, permitindo que a equipe tome decisões com base em dados reais e otimize o tempo operacional.",
    features: [
      "Gerenciamento completo do Ciclo de Vida de Processos Seletivos",
      "Interface de Triagem com filtros práticos e organizados",
      "Pipeline de recrutamento dinâmico adaptável à demanda",
      "Dashboard com métricas de desempenho e produtividade",
      "Gestão centralizada de usuários e níveis de acesso",
      "Estrutura preparada para integração com armazenamento em nuvem"
    ]
  },
  {
    id: "app-pwa",
    title: "Acesso Mobile para Gestão (PWA)",
    icon: Smartphone,
    color: "bg-amber-500",
    status: "SELECIONADO",
    description: "Solução de mobilidade que permite a gestão da Cevan Serviços Empresariais fora do ambiente de desktop. Administradores possuem o controle da operação no celular, com a fluidez de um aplicativo instalado.",
    features: [
      "Tecnologia PWA para instalação e acesso rápido (Home Screen)",
      "Interface administrativa adaptada para uso em dispositivos móveis",
      "Sincronização em tempo real com a base de dados web",
      "Acesso aos principais indicadores através de atalhos",
      "Sistema de notificações e alertas administrativos",
      "Navegação otimizada para agilidade operacional no celular"
    ]
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

export default function PropostaDetalhadaPage() {
  return (
    <div className="min-h-screen bg-slate-50 pb-10 md:pb-20">
      {/* Printable Header - Hidden on Screen */}
      <div className="hidden print:block p-10 border-b border-slate-200 mb-10">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Memorial Descritivo e Técnico</h1>
            <p className="text-slate-500">Cevan Serviços Empresariais</p>
          </div>
          <div className="text-right">
            <p className="font-bold">Data: 29 de Abril de 2026</p>
            <p>Versão Técnica 1.0</p>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-white border-b border-slate-200 overflow-hidden pt-12 pb-16 md:pt-20 md:pb-32 print:hidden">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-blue-50 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[250px] h-[250px] md:w-[500px] md:h-[500px] bg-indigo-50 rounded-full blur-3xl opacity-50" />
        
        <div className="container relative z-10 px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight mb-4 md:mb-8"
            >
              Arquitetura e Escopo de <span className="text-[#1967D2]">Desenvolvimento</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-base md:text-lg text-slate-600 leading-relaxed mb-8 md:mb-10 max-w-2xl mx-auto"
            >
              Este documento detalha os aspectos técnicos e funcionalidades dos módulos que compõem 
              a solução tecnológica da Cevan Serviços Empresariais, focando na excelência da construção e engenharia de software.
            </motion.p>

          </div>
        </div>
      </section>

      {/* Modules Grid */}
      <section className="container px-4 md:px-6 -mt-8 md:-mt-12 relative z-20">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8"
        >
          {modules.map((module) => (
            <motion.div
              key={module.id}
              variants={itemVariants}
              className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-8 lg:p-10 border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-300 group"
            >
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-start mb-6 md:mb-8">
                  <div className={`p-3 md:p-4 rounded-xl md:rounded-2xl ${module.color} text-white shadow-lg`}>
                    <module.icon className="w-6 h-6 md:w-8 md:h-8" />
                  </div>
                  <span className={`text-[9px] md:text-[10px] font-black px-2 md:px-3 py-1 rounded-full ${module.status === 'OBRIGATÓRIO' ? 'bg-slate-100 text-slate-500' : 'bg-amber-50 text-amber-600'} uppercase tracking-widest block`}>
                    {module.status}
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 md:mb-4 group-hover:text-[#1967D2] transition-colors">
                  {module.title}
                </h3>
                
                <p className="text-sm md:text-base text-slate-600 mb-6 md:mb-8 leading-relaxed">
                  {module.description}
                </p>

                <div className="space-y-3 md:space-y-4 mt-auto">
                  <h4 className="text-[11px] md:text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Zap className="w-3 h-3 md:w-4 md:h-4 text-amber-500" />
                    Especificações Técnicas:
                  </h4>
                  <ul className="grid grid-cols-1 gap-2 md:gap-3">
                    {module.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 md:gap-3 text-xs md:text-sm text-slate-700 font-medium">
                        <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Technical Summary */}
      <section className="container px-4 md:px-6 mt-12 md:mt-20">
        <div className="bg-slate-900 rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 lg:p-16 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[200px] h-[200px] md:w-[400px] md:h-[400px] bg-blue-500/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center relative z-10">
            <div>
              <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6">Stack Tecnológica</h2>
              <p className="text-sm md:text-lg text-slate-400 mb-8 md:mb-10 leading-relaxed">
                A construção do ecossistema Cevan Serviços Empresariais utiliza tecnologias de ponta para garantir 
                o máximo de performance e segurança a longo prazo.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="p-2 md:p-3 bg-white/10 rounded-lg md:rounded-xl">
                    <Code2 className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Frontend</p>
                    <p className="text-sm md:text-base font-bold">Next.js 15 + React 19</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="p-2 md:p-3 bg-white/10 rounded-lg md:rounded-xl">
                    <ShieldCheck className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Auth</p>
                    <p className="text-sm md:text-base font-bold">NextAuth.js v5</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="p-2 md:p-3 bg-white/10 rounded-lg md:rounded-xl">
                    <LayoutDashboard className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Back-end</p>
                    <p className="text-sm md:text-base font-bold">Node.js + Serverless</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="p-2 md:p-3 bg-white/10 rounded-lg md:rounded-xl">
                    <Zap className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Persistência</p>
                    <p className="text-sm md:text-base font-bold">Prisma + PostgreSQL</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl md:rounded-3xl p-6 md:p-8 border border-white/10 flex flex-col items-center justify-center text-center">
              <div className="p-4 md:p-6 bg-white/10 rounded-full mb-4 md:mb-6">
                <ShieldCheck className="w-8 h-8 md:w-12 md:h-12 text-emerald-400" />
              </div>
              <h3 className="text-lg md:text-2xl font-bold mb-2 md:mb-4">Qualidade de Código</h3>
              <p className="text-xs md:text-base text-slate-400 leading-relaxed">
                Desenvolvimento seguindo as melhores práticas de Clean Code e segurança por design, 
                garantindo uma plataforma robusta.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer / CTA */}
      <footer className="container px-4 md:px-6 mt-12 md:mt-20 text-center print:hidden">
        <div className="max-w-2xl mx-auto">
          <Image 
            src="/logoprincipal.png" 
            alt="Cevan RH Logo" 
            width={140} 
            height={50} 
            className="mx-auto mb-6 opacity-50 grayscale md:w-[180px]"
          />
          <p className="text-slate-500 text-[11px] md:text-sm">
            © 2026 Cevan Serviços Empresariais Ltda. <br/>
            Este documento é confidencial e destinado exclusivamente ao cliente.
          </p>
        </div>
      </footer>
    </div>
  );
}
