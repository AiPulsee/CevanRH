"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Check, 
  ShieldCheck, 
  Zap, 
  Building2, 
  Crown, 
  ArrowRight,
  MessageCircle,
  Lock,
  Headphones,
  CheckCircle2
} from "lucide-react";

export default function PricingPage() {
  const plans = [
    {
      name: "SaaS Autônomo",
      price: "Solução Tech",
      desc: "Ideal para empresas com RH próprio que buscam tecnologia de ponta para triagem e gestão.",
      icon: Zap,
      color: "blue",
      features: [
        "Acesso completo ao Dashboard ATS",
        "Triagem via IA (Processamento Natural)",
        "Gerador de Vagas Inteligente",
        "Gestão de Candidatos via Kanban",
        "Página de Vagas Premium Personalizada",
        "Analytics e Dashboards em Tempo Real",
        "Suporte via Central de Ajuda"
      ],
      cta: "Testar Gratuitamente",
      popular: false
    },
    {
      name: "Curadoria Cevan",
      price: "Full Service",
      desc: "Nossa equipe de especialistas faz todo o recrutamento, da vaga até a shortlist final.",
      icon: Crown,
      color: "indigo",
      features: [
        "Tudo do plano SaaS Autônomo",
        "Sourcing ativo de talentos (Hunting)",
        "Triagem Humana por especialistas",
        "Entrevistas prévias realizadas pela Cevan",
        "Checagem de referências e antecedentes",
        "Entrega de Shortlist (Top 3 Candidatos)",
        "Suporte Prioritário 24/7"
      ],
      cta: "Falar com Consultor",
      popular: true
    }
  ];

  const faqs = [
    { q: "Como funciona a triagem por IA?", a: "Nossa IA analisa semanticamente o currículo e a vaga, identificando compatibilidade de competências e cultura, indo além de simples palavras-chave." },
    { q: "Posso cancelar a qualquer momento?", a: "Sim, no modelo SaaS não há fidelidade. Você paga pelo uso mensal e pode cancelar quando desejar." },
    { q: "Qual o prazo médio da Curadoria?", a: "Em média, entregamos a shortlist de candidatos finalistas em até 10 dias úteis para cargos operacionais e especialistas." },
    { q: "Meus dados estão seguros?", a: "Sim, seguimos rigorosamente a LGPD. Todos os dados de candidatos e empresas são criptografados e armazenados com segurança máxima." }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFBFC] font-sans selection:bg-blue-100 selection:text-blue-900 mt-20">
      
      {/* Hero Section */}
      <section className="bg-white border-b border-slate-100 py-24 lg:py-32 relative overflow-hidden text-center">
        <div className="absolute top-0 left-1/2 w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Badge className="bg-blue-50 text-blue-600 border-blue-100 rounded-full px-4 py-1 font-black mb-6 uppercase tracking-[0.2em] text-[10px]">
            Investimento & Performance
          </Badge>
          <h1 className="text-5xl lg:text-7xl font-black text-slate-900 mb-8 tracking-tight leading-[0.95] max-w-4xl mx-auto">
            Escolha o modelo ideal para o <span className="text-blue-600">seu time</span> escalar.
          </h1>
          <p className="text-slate-500 font-medium mb-12 text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
            Seja através de nossa tecnologia autônoma ou com a mão de obra de nossos especialistas, temos a solução certa para o seu RH.
          </p>
        </div>
      </section>

      {/* Pricing Grid */}
      <section className="py-24 -mt-16 lg:-mt-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {plans.map((plan, i) => (
              <Card key={plan.name} className={`group p-10 lg:p-12 rounded-[3rem] bg-white border-slate-200 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 relative flex flex-col h-full overflow-hidden ${plan.popular ? 'border-blue-200' : ''}`}>
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-black px-6 py-2.5 rounded-bl-3xl uppercase tracking-[0.15em] z-20">
                    Sugerido pela Cevan
                  </div>
                )}

                <div className="relative z-10">
                  <div className={`h-16 w-16 rounded-[1.5rem] ${plan.color === 'blue' ? 'bg-blue-50 text-blue-600' : 'bg-slate-900 text-white'} flex items-center justify-center mb-8 shadow-sm`}>
                    <plan.icon className="h-8 w-8" />
                  </div>
                  
                  <div className="mb-8">
                    <h3 className="text-3xl font-black text-slate-900 mb-3">{plan.name}</h3>
                    <p className="text-slate-500 text-[15px] font-medium leading-relaxed">{plan.desc}</p>
                  </div>

                  <div className="mb-10 pb-8 border-b border-slate-100">
                    <span className="text-4xl font-black text-slate-900">{plan.price}</span>
                    <span className="text-slate-400 font-bold ml-2 text-sm uppercase tracking-widest">/ Consultar</span>
                  </div>

                  <div className="space-y-5 mb-12 flex-1">
                    {plan.features.map((feature, j) => (
                      <div key={j} className="flex items-start gap-3">
                        <CheckCircle2 className={`h-5 w-5 shrink-0 ${plan.color === 'blue' ? 'text-blue-600' : 'text-slate-900'}`} />
                        <span className="text-[14px] font-bold text-slate-700 leading-tight">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button className={`w-full h-16 rounded-2xl font-black text-[13px] uppercase tracking-widest transition-all group-hover:scale-[1.02] active:scale-[0.98] ${
                    plan.color === 'blue' 
                      ? 'bg-slate-900 text-white hover:bg-slate-800' 
                      : 'bg-blue-600 text-white hover:bg-blue-700 shadow-xl shadow-blue-200'
                  }`}>
                    {plan.cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & FAQ */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Trust Info */}
            <div className="space-y-12">
              <div>
                <Badge className="bg-emerald-50 text-emerald-600 border-none rounded-full px-3 py-1 font-black mb-4 uppercase tracking-widest text-[9px]">
                  Segurança & Suporte
                </Badge>
                <h2 className="text-4xl font-black text-slate-900 mb-6 leading-tight">Pronto para o <br />próximo nível?</h2>
                <p className="text-slate-500 font-medium leading-relaxed max-w-md">
                  Mais do que uma ferramenta, somos o seu braço direito estratégico na atração e retenção de talentos de alta performance.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                    <Lock className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-sm mb-1">LGPD Compliance</h4>
                    <p className="text-xs text-slate-400 font-medium leading-normal">Seus dados e de candidatos protegidos por lei.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                    <Headphones className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-sm mb-1">Suporte VIP</h4>
                    <p className="text-xs text-slate-400 font-medium leading-normal">Time de consultoria sempre pronto para ajudar.</p>
                  </div>
                </div>
              </div>

              <div className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100 flex items-center gap-6">
                <Building2 className="h-10 w-10 text-slate-400" />
                <div>
                  <h4 className="font-black text-slate-900 mb-1">Empresa de Grande Porte?</h4>
                  <p className="text-sm text-slate-500 font-medium">Oferecemos SLAs personalizados e integrações via API para alto volume.</p>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="space-y-6">
              <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-2">
                <MessageCircle className="h-6 w-6 text-blue-600" /> Perguntas Frequentes
              </h3>
              <div className="space-y-4">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="p-6 rounded-2xl border border-slate-100 bg-white hover:border-blue-100 transition-colors">
                    <h4 className="font-black text-slate-900 text-[15px] mb-2">{faq.q}</h4>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
