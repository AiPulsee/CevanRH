"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, ShieldCheck, Zap, Building2, Crown } from "lucide-react";
import { motion } from "framer-motion";

export default function PricingPage() {
  const plans = [
    {
      name: "SaaS Autônomo",
      price: "Sob Consulta",
      desc: "Ideal para empresas com RH próprio que buscam agilidade e tecnologia.",
      icon: Zap,
      color: "blue",
      features: [
        "Acesso completo ao Dashboard ATS",
        "Triagem ilimitada via Inteligência Artificial",
        "Gerador de Vagas Inteligente",
        "Gestão de Candidatos via Kanban",
        "Página de Vagas personalizada",
        "Suporte via Email"
      ],
      cta: "Começar Agora",
      popular: false
    },
    {
      name: "Curadoria Cevan",
      price: "Sob Consulta",
      desc: "Nossa equipe de especialistas faz o trabalho pesado para você.",
      icon: Crown,
      color: "indigo",
      features: [
        "Tudo do plano SaaS Autônomo",
        "Triagem Humana por especialistas",
        "Entrevistas prévias realizadas pela Cevan",
        "Checagem de referências e antecedentes",
        "Entrega de Shortlist (finalistas ideais)",
        "Suporte Prioritário 24/7"
      ],
      cta: "Falar com Consultor",
      popular: true
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white mt-24">
      {/* Hero */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
          <Badge className="bg-blue-500/20 text-blue-300 border-none rounded-full px-4 py-1.5 font-bold mb-6 uppercase tracking-widest text-[10px]">
            Investimento & Valor
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-black mb-6">Planos que Escalagem seu RH</h1>
          <p className="text-slate-400 text-lg">Seja de forma autônoma ou com nossa curadoria especializada, temos a solução ideal para sua empresa.</p>
        </div>
      </section>

      {/* Pricing Grid */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className={`p-10 rounded-[3rem] bg-white border-slate-200 shadow-sm hover:shadow-2xl transition-all duration-500 relative flex flex-col h-full ${plan.popular ? 'ring-4 ring-indigo-50 border-indigo-100' : ''}`}>
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-indigo-500 text-white text-[10px] font-black px-6 py-2 rounded-bl-3xl uppercase tracking-widest">
                      Mais Procurado
                    </div>
                  )}
                  
                  <div className="mb-8">
                    <div className={`h-14 w-14 rounded-2xl ${plan.color === 'blue' ? 'bg-blue-50 text-blue-500' : 'bg-indigo-50 text-indigo-500'} flex items-center justify-center mb-6`}>
                      <plan.icon className="h-7 w-7" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-2">{plan.name}</h3>
                    <p className="text-slate-500 text-sm font-medium leading-relaxed">{plan.desc}</p>
                  </div>

                  <div className="mb-8">
                    <span className="text-4xl font-black text-slate-900">{plan.price}</span>
                  </div>

                  <div className="space-y-4 mb-10 flex-1">
                    {plan.features.map((feature, j) => (
                      <div key={j} className="flex items-start gap-3">
                        <div className={`mt-1 h-5 w-5 rounded-full ${plan.color === 'blue' ? 'bg-blue-50 text-blue-500' : 'bg-indigo-50 text-indigo-500'} flex items-center justify-center shrink-0`}>
                          <Check className="h-3 w-3 stroke-[3]" />
                        </div>
                        <span className="text-sm font-bold text-slate-700 leading-tight">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button className={`w-full h-14 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
                    plan.color === 'blue' 
                      ? 'bg-slate-900 text-white hover:bg-slate-800' 
                      : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-xl shadow-indigo-100'
                  }`}>
                    {plan.cta}
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Note */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <div className="p-8 rounded-[2.5rem] bg-blue-50 border border-blue-100 flex items-center gap-6 text-left">
            <Building2 className="h-10 w-10 text-blue-600 shrink-0" />
            <div>
              <h4 className="font-black text-blue-900 mb-1">Grandes Corporações?</h4>
              <p className="text-sm text-blue-700 font-medium">Oferecemos condições personalizadas para empresas com alto volume de contratações mensais. Entre em contato para um diagnóstico gratuito.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
