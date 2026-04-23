"use client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { modules, timeline, infra } from "./data";
import Image from "next/image";
import {
  Globe, Shield, Building2, User, Command, Sparkles, UserCheck, DollarSign,
  CheckCircle2, ArrowRight, Clock, Server, ChevronDown, Star, Zap, Check, X,
  Calendar, Layers, Package, Gift, MousePointerClick
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, any> = { Globe, Shield, Building: Building2, User, Command, Sparkles, UserCheck, DollarSign, Zap };
const fmt = (v: number) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 0 }).format(v);

export default function PropostaPage() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>(modules.map(m => m.id));

  const essentials = modules.filter(m => m.essential);
  const extras = modules.filter(m => !m.essential);
  
  const toggleModule = (id: number) => {
    if (modules.find(m => m.id === id)?.essential) return;
    
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const isAllSelected = selectedIds.length === modules.length;
  const currentTotal = useMemo(() => {
    if (isAllSelected) return 62000;
    return modules.filter(m => selectedIds.includes(m.id)).reduce((s, m) => s + m.price, 0);
  }, [selectedIds, isAllSelected]);

  const totalIndividual = modules.reduce((s, m) => s + m.price, 0);
  const discount = totalIndividual - 62000;

  return (
    <div className="min-h-screen bg-[#fafbfc] font-sans text-slate-900">
      {/* HERO */}
      <section className="relative py-16 lg:py-24 overflow-hidden bg-white border-b border-slate-100">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-50/60 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-indigo-50/40 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3" />
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Image src="/logoprincipal.png" alt="Cevan" width={300} height={80} className="h-16 w-auto object-contain mx-auto mb-10" />
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] mb-6">
              Plataforma de <span className="text-blue-600">Recrutamento</span><br />& Seleção Inteligente
            </h1>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#solucao">
                <Button className="h-14 px-10 rounded-2xl bg-blue-600 hover:bg-blue-700 font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-200/50">
                  Ver Solução <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* DETALHAMENTO DO ECOSSISTEMA */}
      <section id="solucao" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl lg:text-5xl font-black tracking-tight mb-6">Uma solução <span className="text-blue-600">Completa</span></h2>
          </div>

          <div className="space-y-32">
            {/* Pillar 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative">
                <div className="absolute -top-12 -left-12 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-60" />
                <div className="relative bg-slate-50 rounded-[3rem] p-12 border border-slate-100 shadow-inner text-center lg:text-left">
                  <div className="h-16 w-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto lg:mx-0 mb-8 shadow-lg shadow-blue-200">
                    <Globe className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-black mb-6">01. Onde os candidatos te acham</h3>
                  <p className="text-slate-600 font-medium leading-relaxed mb-8">
                    Imagine um site que já nasce preparado para o Google. Quando alguém procurar por uma vaga na sua região, sua empresa aparece primeiro.
                  </p>
                  <div className="space-y-4">
                    {[
                      { t: "Vira um App no celular", d: "O candidato instala seu site como um ícone no celular, sem precisar ir na Play Store." },
                      { t: "Inscrição Rápida", d: "Ele envia o currículo em segundos, até pelo celular, sem formulários chatos." },
                      { t: "Status em Tempo Real", d: "O candidato sabe se foi aprovado ou não sem precisar te ligar ou mandar email." }
                    ].map((item, i) => (
                      <div key={i} className="bg-white/50 p-4 rounded-2xl border border-slate-100">
                        <p className="text-sm font-black text-slate-900 mb-1 flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-blue-500" /> {item.t}
                        </p>
                        <p className="text-[11px] text-slate-500 font-medium leading-tight">{item.d}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="lg:pl-10">
                <Badge className="bg-blue-50 text-blue-600 mb-6">Atração de Talentos</Badge>
                <h4 className="text-4xl font-black mb-6 leading-tight">Sua marca com cara de multinacional.</h4>
                <p className="text-slate-500 text-lg leading-relaxed font-medium">
                  Não é apenas um site, é uma ferramenta de marketing. Você terá um portal de vagas moderno que passa confiança e profissionalismo, fazendo com que os melhores talentos queiram trabalhar com você.
                </p>
                <div className="mt-8 p-6 bg-blue-50 rounded-2xl border border-blue-100">
                  <p className="text-sm font-bold text-blue-800">💡 O que isso resolve:</p>
                  <p className="text-sm text-blue-600 mt-1 italic">"Acaba com a bagunça de currículos chegando por WhatsApp e e-mail pessoal."</p>
                </div>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center lg:flex-row-reverse">
              <div className="lg:order-2 relative">
                 <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-emerald-50 rounded-full blur-3xl opacity-60" />
                 <div className="relative bg-slate-50 rounded-[3rem] p-12 border border-slate-100 shadow-inner text-center lg:text-left">
                  <div className="h-16 w-16 bg-emerald-600 rounded-2xl flex items-center justify-center mx-auto lg:mx-0 mb-8 shadow-lg shadow-emerald-200">
                    <Sparkles className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-black mb-6">02. O Robô que te ajuda a escolher</h3>
                  <p className="text-slate-600 font-medium leading-relaxed mb-8">
                    Recebeu 500 currículos? Nosso sistema usa Inteligência Artificial para ler todos eles e te dizer quem são os 10 melhores.
                  </p>
                  <div className="space-y-4">
                    {[
                      { t: "Leitura Automática", d: "O sistema lê o currículo sozinho e identifica experiências e cursos automaticamente." },
                      { t: "Ranking de Estrelas", d: "A IA dá uma nota para cada candidato baseado no que você pediu na vaga." },
                      { t: "Avisos Automáticos", d: "O sistema avisa o candidato por e-mail sobre cada etapa, sem você precisar escrever nada." }
                    ].map((item, i) => (
                      <div key={i} className="bg-white/50 p-4 rounded-2xl border border-slate-100">
                        <p className="text-sm font-black text-slate-900 mb-1 flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-emerald-500" /> {item.t}
                        </p>
                        <p className="text-[11px] text-slate-500 font-medium leading-tight">{item.d}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="lg:order-1 lg:pr-10">
                <Badge className="bg-emerald-50 text-emerald-600 mb-6">IA & Produtividade</Badge>
                <h4 className="text-4xl font-black mb-6 leading-tight">Chega de perder horas lendo papel.</h4>
                <p className="text-slate-500 text-lg leading-relaxed font-medium">
                  A Inteligência Artificial não substitui o humano, ela libera o seu tempo para o que importa: a entrevista. Você foca na conversa, enquanto o robô cuida da organização e da triagem inicial.
                </p>
                <div className="mt-8 p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
                  <p className="text-sm font-bold text-emerald-800">💡 O que isso resolve:</p>
                  <p className="text-sm text-emerald-600 mt-1 italic">"Elimina aquele trabalho manual e chato de ficar comparando currículo por currículo."</p>
                </div>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative">
                <div className="absolute -top-12 -left-12 w-64 h-64 bg-indigo-50 rounded-full blur-3xl opacity-60" />
                <div className="relative bg-slate-50 rounded-[3rem] p-12 border border-slate-100 shadow-inner text-center lg:text-left">
                  <div className="h-16 w-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto lg:mx-0 mb-8 shadow-lg shadow-indigo-200">
                    <Command className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-black mb-6">03. O Controle do seu Dinheiro</h3>
                  <p className="text-slate-600 font-medium leading-relaxed mb-8">
                    Saiba exatamente quanto você está faturando, quais empresas são mais lucrativas e quem precisa pagar.
                  </p>
                  <div className="space-y-4">
                    {[
                      { t: "Gestão de Comissões", d: "Cálculo automático de quanto você ganha por cada contratação feita." },
                      { t: "Alerta de Efetivação", d: "O sistema te avisa quando os 90 dias de experiência estão acabando para você faturar." },
                      { t: "Gráficos de Sucesso", d: "Veja em segundos quantas vagas você fechou no mês e sua taxa de acerto." }
                    ].map((item, i) => (
                      <div key={i} className="bg-white/50 p-4 rounded-2xl border border-slate-100">
                        <p className="text-sm font-black text-slate-900 mb-1 flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-indigo-500" /> {item.t}
                        </p>
                        <p className="text-[11px] text-slate-500 font-medium leading-tight">{item.d}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="lg:pl-10">
                <Badge className="bg-indigo-50 text-indigo-600 mb-6">Gestão de Negócio</Badge>
                <h4 className="text-4xl font-black mb-6 leading-tight">Seu RH como uma empresa de tecnologia.</h4>
                <p className="text-slate-500 text-lg leading-relaxed font-medium">
                  Tenha em mãos os mesmos relatórios que grandes consultorias usam. O painel financeiro e operacional te dá a clareza necessária para crescer e escalar sua consultoria sem perder o controle.
                </p>
                <div className="mt-8 p-6 bg-indigo-50 rounded-2xl border border-indigo-100">
                  <p className="text-sm font-bold text-indigo-800">💡 O que isso resolve:</p>
                  <p className="text-sm text-indigo-600 mt-1 italic">"Acaba com o esquecimento de cobranças e a falta de clareza sobre o lucro real."</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CLICK HELP */}
      <div className="bg-blue-600 text-white py-3 text-center">
        <p className="text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2">
          <MousePointerClick className="h-4 w-4" /> Clique nos cards para selecionar ou desmarcar os módulos
        </p>
      </div>

      {/* MÓDULOS ESSENCIAIS */}
      <section id="modulos" className="py-12 lg:py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl lg:text-4xl font-black tracking-tight mb-4">Módulos <span className="text-emerald-600">Essenciais</span></h2>
            <p className="text-slate-500 font-medium max-w-xl mx-auto">A base da plataforma. Selecione para ver as funcionalidades.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {essentials.map((mod, i) => {
              const Icon = iconMap[mod.icon];
              const open = expandedId === mod.id;
              const selected = selectedIds.includes(mod.id);
              return (
                <motion.div key={mod.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <Card className={cn(
                    "bg-white border-slate-200 rounded-2xl shadow-sm overflow-hidden transition-all relative",
                    open ? "shadow-lg border-blue-200" : "hover:shadow-md",
                    selected ? "border-blue-500 ring-1 ring-blue-500/20" : "opacity-75 grayscale-[0.5]"
                  )}>
                    <div className="flex">
                      <div 
                        className={cn(
                          "w-12 border-r border-slate-100 flex items-center justify-center transition-colors bg-blue-50 text-blue-600"
                        )}
                      >
                        <Shield className="h-4 w-4 opacity-40" />
                      </div>
                      
                      <button onClick={() => setExpandedId(open ? null : mod.id)} className="flex-1 p-6 flex items-center gap-5 text-left">
                        <div className={cn(
                          "h-14 w-14 rounded-2xl flex items-center justify-center shrink-0 transition-colors",
                          selected ? "bg-blue-50 border border-blue-100" : "bg-slate-50 border border-slate-100"
                        )}>
                          {Icon && <Icon className={cn("h-6 w-6", selected ? "text-blue-600" : "text-slate-400")} />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={cn("text-[9px] font-black uppercase tracking-widest text-blue-600")}>
                              Módulo {mod.id}
                            </span>
                            <Badge className="bg-blue-600 text-white border-none text-[8px] font-black uppercase">Obrigatório</Badge>
                          </div>
                          <h3 className={cn("text-lg font-black transition-colors", selected ? "text-slate-900" : "text-slate-500")}>
                            {mod.name}
                          </h3>
                        </div>
                        <div className="text-right shrink-0 mr-4">
                          <p className={cn("text-xl font-black", selected ? "text-slate-900" : "text-slate-400")}>
                            {fmt(mod.price)}
                          </p>
                        </div>
                        <ChevronDown className={`h-5 w-5 text-slate-300 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
                      </button>
                    </div>

                    <AnimatePresence>
                      {open && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }} 
                          animate={{ height: "auto", opacity: 1 }} 
                          exit={{ height: 0, opacity: 0 }}
                          className="px-6 pb-6 border-t border-slate-100 ml-12"
                        >
                          <p className="text-sm text-slate-500 font-medium mt-4 mb-4">{mod.desc}</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {mod.items.map((item, j) => (
                              <div key={j} className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                                <span className="font-medium text-slate-700">{item}</span>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* MÓDULOS COMPLEMENTARES */}
      <section className="py-12 lg:py-16 bg-white border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <Badge className="bg-indigo-50 text-indigo-600 border-indigo-100 rounded-full px-4 py-1 font-black uppercase tracking-[0.2em] text-[10px] mb-4">
              Diferenciais Competitivos
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-black tracking-tight mb-4">Módulos <span className="text-indigo-600">Complementares</span></h2>
            <p className="text-slate-500 font-medium max-w-xl mx-auto">Funcionalidades avançadas. Clique para incluir no projeto.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {extras.map((mod, i) => {
              const Icon = iconMap[mod.icon];
              const selected = selectedIds.includes(mod.id);
              return (
                <motion.div key={mod.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                  <Card 
                    onClick={() => toggleModule(mod.id)}
                    className={cn(
                      "p-7 bg-white border-slate-200 rounded-2xl shadow-sm transition-all h-full flex flex-col cursor-pointer relative group",
                      selected ? "border-indigo-500 ring-1 ring-indigo-500/20 shadow-lg -translate-y-1" : "opacity-60 hover:opacity-100 grayscale-[0.8] hover:grayscale-0"
                    )}
                  >
                    <div className={cn(
                      "absolute top-4 right-4 h-6 w-6 rounded-full border-2 flex items-center justify-center transition-colors",
                      selected ? "bg-indigo-600 border-indigo-600 text-white" : "border-slate-200 text-transparent"
                    )}>
                      <Check className="h-4 w-4" />
                    </div>

                    <div className={cn(
                      "h-12 w-12 rounded-xl border flex items-center justify-center mb-5 transition-colors",
                      selected ? "bg-indigo-50 border-indigo-100" : "bg-slate-50 border-slate-100"
                    )}>
                      {Icon && <Icon className={cn("h-5 w-5", selected ? "text-indigo-600" : "text-slate-400")} />}
                    </div>
                    <span className={cn("text-[9px] font-black uppercase tracking-widest mb-1", selected ? "text-indigo-600" : "text-slate-400")}>
                      Módulo {mod.id}
                    </span>
                    <h3 className={cn("text-base font-black mb-2 transition-colors", selected ? "text-slate-900" : "text-slate-500")}>
                      {mod.name}
                    </h3>
                    <p className="text-xs text-slate-400 font-medium mb-5 flex-1">{mod.desc}</p>
                    
                    <div className="space-y-1.5 mb-5">
                      {mod.items.slice(0, 4).map((item, j) => (
                        <div key={j} className="flex items-center gap-2 text-[11px]">
                          <Check className={cn("h-3 w-3 shrink-0", selected ? "text-indigo-500" : "text-slate-300")} />
                          <span className={cn("font-medium", selected ? "text-slate-600" : "text-slate-400")}>{item}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="pt-4 border-t border-slate-100">
                      <p className={cn("text-2xl font-black transition-colors", selected ? "text-slate-900" : "text-slate-400")}>
                        {fmt(mod.price)}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>


      {/* INVESTIMENTO / COMBO */}
      <section id="investimento" className="py-12 lg:py-16">
        <div className="max-w-5xl mx-auto px-6 text-center mb-10">
           <Badge className="bg-blue-50 text-blue-600 border-blue-100 rounded-full px-4 py-1 font-black uppercase tracking-[0.2em] text-[10px] mb-4">
              Resumo do Projeto
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-black tracking-tight">Investimento <span className="text-blue-600">Final</span></h2>
        </div>

        <div className="max-w-4xl mx-auto px-6">
            <Card className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 p-8 lg:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 h-1 w-full bg-gradient-to-r from-blue-500 to-indigo-500" />
              
              <div className="relative z-10 flex flex-col items-center">
                <div className="h-14 w-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-6">
                  {isAllSelected ? <Gift className="h-7 w-7 text-blue-600" /> : <Package className="h-7 w-7 text-blue-400" />}
                </div>
                
                <h3 className="text-xl lg:text-2xl font-black mb-1 text-slate-900">
                  {isAllSelected ? "Resumo do Pacote Completo" : "Resumo da Seleção"}
                </h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-8 flex items-center gap-2">
                  <MousePointerClick className="h-3 w-3" /> Clique nos itens abaixo para personalizar
                </p>
                
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 mb-10 pb-10 border-b border-slate-100">
                  {modules.map(m => {
                    const selected = selectedIds.includes(m.id);
                    return (
                      <div 
                        key={m.id} 
                        onClick={() => toggleModule(m.id)}
                        className={cn(
                          "flex items-center justify-between transition-all group/item",
                          selected ? "opacity-100" : "opacity-30 hover:opacity-60",
                          m.essential ? "cursor-default" : "cursor-pointer"
                        )}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <div className={cn(
                            "h-4 w-4 rounded-full border flex items-center justify-center transition-colors",
                            selected ? "bg-emerald-500 border-emerald-500 text-white" : "border-slate-200 text-transparent"
                          )}>
                            <Check className="h-2.5 w-2.5" />
                          </div>
                          <span className={cn("text-[13px] font-bold transition-colors flex items-center gap-2", selected ? "text-slate-700" : "text-slate-400")}>
                            {m.name}
                            {m.essential && (
                              <span className="text-[9px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded-md font-black uppercase tracking-tighter">
                                Obrigatório
                              </span>
                            )}
                          </span>
                        </div>
                        <span className="text-[11px] font-mono text-slate-400 shrink-0">{fmt(m.price)}</span>
                      </div>
                    )
                  })}
                </div>

                <div className="w-full text-center">
                  {isAllSelected ? (
                    <>
                      <div className="flex items-center justify-center gap-4 mb-4">
                        <span className="text-xl line-through text-slate-400 font-bold">{fmt(totalIndividual)}</span>
                        <Badge className="bg-emerald-100 text-emerald-700 border-none text-[11px] font-black uppercase px-3 py-1">
                          ECONOMIA DE {fmt(discount)}
                        </Badge>
                      </div>
                      <p className="text-5xl lg:text-6xl font-black text-slate-900 mb-2">{fmt(62000)}</p>
                      <p className="text-blue-600 font-black uppercase tracking-widest text-[10px]">Valor Total com Desconto de Pacote</p>
                    </>
                  ) : (
                    <>
                      <p className="text-5xl lg:text-6xl font-black text-slate-900 mb-2">{fmt(currentTotal)}</p>
                      <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">Subtotal dos Módulos Selecionados</p>
                      
                    </>
                  )}
                </div>
              </div>
            </Card>
        </div>
      </section>

      {/* CRONOGRAMA & INFRA */}
      <section className="py-12 bg-white border-y border-slate-100">
        <div className="max-w-4xl mx-auto px-6">
            {/* Cronograma */}
            <div>
              <div className="mb-8 text-center">
                <h2 className="text-2xl font-black tracking-tight mb-2 text-slate-900">Cronograma de Entrega</h2>
                <p className="text-sm text-slate-500 font-medium">Prazo total estimado de 3 meses (12 semanas).</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {timeline.map((t, i) => (
                  <Card key={i} className="p-6 bg-white border-slate-200 rounded-2xl shadow-sm text-center">
                    <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center mx-auto mb-4">
                      <Calendar className="h-5 w-5 text-blue-600" />
                    </div>
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">{t.phase} — {t.weeks}</p>
                    <h4 className="font-black text-slate-900 mb-1">{t.name}</h4>
                    <p className="text-xs text-slate-400 font-medium mb-3">{t.modules}</p>
                  </Card>
                ))}
              </div>
            </div>
        </div>
      </section>

      {/* INCLUSO / NÃO INCLUSO */}
      <section className="py-12 bg-white border-t border-slate-100">
        <div className="max-w-2xl mx-auto px-6">
          <Card className="p-8 border-emerald-100 bg-emerald-50/30 rounded-2xl">
            <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-emerald-500" /> Incluído no Projeto</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {["Código-fonte completo","Deploy na Vercel","Gateway de Pagamento","Integração com IA","Sistema de Notificações","App PWA Instalável","Suporte e Documentação"].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span className="font-medium text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

    </div>
  );
}
