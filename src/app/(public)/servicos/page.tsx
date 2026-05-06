import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Users, TrendingUp, ShieldCheck, ChevronRight, CheckCircle2,
  ArrowRight, Star, Zap, Building2, BarChart2, FileText,
  UserCheck, Search, Calendar, Award, Phone, Mail,
  ClipboardList, Banknote, Scale, Target,
} from "lucide-react";
import Link from "next/link";

export default function ServicosPage() {
  return (
    <div className="flex flex-col w-full bg-[#fdfdfd] font-sans text-[#202124] mt-24">

      {/* ── HERO ── */}
      <section className="py-20 lg:py-28 bg-white text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-50/60 rounded-full blur-[120px] pointer-events-none" />
        <div className="container mx-auto px-6 max-w-3xl relative z-10 space-y-5">
          <Badge className="bg-[#1967D2]/10 text-[#1967D2] border-none rounded-full px-4 py-1.5 font-black uppercase tracking-widest text-[10px]">
            Serviços Empresariais
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Tudo o que sua empresa precisa,<br />
            <span className="text-[#1967D2]">em um único parceiro.</span>
          </h1>
          <p className="text-slate-500 text-base sm:text-xl font-medium leading-relaxed max-w-2xl mx-auto">
            RH terceirizado, gestão financeira e estratégia tributária integrados. Assumimos a rotina para que você foque no crescimento.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            {[
              { icon: Users, label: "Terceirização de RH", href: "#rh" },
              { icon: TrendingUp, label: "Gestão Financeira", href: "#financeiro" },
              { icon: ShieldCheck, label: "Estratégia Tributária", href: "#tributario" },
            ].map(({ icon: Icon, label, href }) => (
              <a key={label} href={href} className="flex items-center gap-2 bg-slate-50 hover:bg-blue-50 border border-slate-100 hover:border-blue-100 rounded-xl px-4 py-2.5 transition-all group">
                <Icon className="h-4 w-4 text-[#1967D2]" />
                <span className="text-[13px] font-bold text-slate-700 group-hover:text-[#1967D2]">{label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUEM SOMOS ── */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 border border-slate-100 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="space-y-5">
                <Badge className="bg-[#1967D2]/10 text-[#1967D2] border-none rounded-full px-4 py-1.5 font-black uppercase tracking-widest text-[10px]">Quem Somos</Badge>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                  A Cevan nasceu para resolver os <span className="text-[#1967D2]">problemas reais</span> do empresário.
                </h2>
                <p className="text-slate-500 text-[15px] font-medium leading-relaxed">
                  A Cevan Serviços Empresariais é o braço estratégico do Grupo Cevan, criado para ajudar pequenas e médias empresas a crescerem com mais organização, lucro e segurança. Nossa equipe assume a rotina, os processos e a burocracia, enquanto você foca no que importa: vender e crescer.
                </p>
                <div className="bg-[#1967D2]/5 border border-[#1967D2]/15 rounded-xl p-4">
                  <p className="text-[#1967D2] font-black text-[12px] uppercase tracking-widest mb-1">Missão</p>
                  <p className="text-slate-700 font-semibold text-[14px] leading-relaxed">
                    Organizar empresas desorganizadas, reduzir prejuízos invisíveis e estruturar o negócio para crescer com segurança.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Building2, title: "Solução Completa", desc: "RH, Financeiro e Tributário em um único parceiro." },
                  { icon: Star, title: "Atendimento Consultivo", desc: "Pessoas resolvendo problemas reais, com atenção personalizada." },
                  { icon: Award, title: "Equipe Especializada", desc: "Suporte contábil e jurídico integrados ao serviço." },
                  { icon: Target, title: "Foco no Empresário", desc: "Eliminamos as dores invisíveis que consomem tempo e dinheiro." },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="bg-slate-50 rounded-2xl p-4 space-y-2">
                    <div className="h-9 w-9 rounded-xl bg-white shadow-sm flex items-center justify-center">
                      <Icon className="h-4 w-4 text-[#1967D2]" />
                    </div>
                    <p className="font-black text-slate-900 text-[13px]">{title}</p>
                    <p className="text-slate-500 text-[12px] font-medium leading-snug">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TERCEIRIZAÇÃO DE RH ── */}
      <section id="rh" className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-12 space-y-3">
            <Badge className="bg-blue-50 text-[#1967D2] border-none rounded-full px-4 py-1.5 font-black uppercase tracking-widest text-[10px]">Serviço 01</Badge>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">Terceirização de <span className="text-[#1967D2]">RH</span></h2>
            <p className="text-slate-500 text-base sm:text-lg font-medium max-w-2xl mx-auto leading-relaxed">
              A Cevan se torna o RH da sua empresa — cuidando de toda a rotina de gestão de pessoas com profissionalismo e proximidade.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
            {[
              { icon: Search, title: "Recrutamento e Seleção", desc: "Divulgação da vaga, triagem de currículos e apresentação dos candidatos mais qualificados." },
              { icon: UserCheck, title: "Admissão e Integração", desc: "Processo completo de entrada do colaborador, com documentação e apresentação da empresa." },
              { icon: ClipboardList, title: "Controle de Ponto Eletrônico", desc: "Implantação e gestão do sistema de jornada. Relatórios de horas extras, faltas e banco de horas." },
              { icon: Calendar, title: "Gestão de Férias e Afastamentos", desc: "Planejamento e controle de férias, banco de horas e ausências dos colaboradores." },
              { icon: Scale, title: "Orientação Disciplinar", desc: "Intervenção em situações de conduta, com orientação sobre postura profissional e regimento interno." },
              { icon: FileText, title: "Apoio em Desligamentos", desc: "Suporte nos processos de rescisão, com segurança jurídica e organização documental." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-[#1967D2]/20 hover:bg-blue-50/30 transition-all duration-300">
                <div className="h-10 w-10 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0 mt-0.5">
                  <Icon className="h-5 w-5 text-[#1967D2]" />
                </div>
                <div>
                  <p className="font-black text-slate-900 text-[14px]">{title}</p>
                  <p className="text-slate-500 text-[13px] font-medium leading-snug mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#1967D2] text-white rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="h-9 w-9 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <ShieldCheck className="h-5 w-5 text-white" />
            </div>
            <p className="text-[14px] font-medium leading-relaxed">
              <span className="font-black">Importante:</span> A Cevan não registra os colaboradores em seu próprio CNPJ. Os funcionários continuam sendo da empresa contratante. A Cevan gerencia, orienta e organiza.
            </p>
          </div>
        </div>
      </section>

      {/* ── RECRUTAMENTO PONTUAL ── */}
      <section id="recrutamento" className="py-20 bg-slate-50">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-12 space-y-3">
            <Badge className="bg-blue-50 text-[#1967D2] border-none rounded-full px-4 py-1.5 font-black uppercase tracking-widest text-[10px]">Serviço 02</Badge>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">Recrutamento <span className="text-[#1967D2]">Pontual</span></h2>
            <p className="text-slate-500 text-base sm:text-lg font-medium max-w-2xl mx-auto leading-relaxed">
              Para empresas que precisam preencher vagas específicas com agilidade e segurança. Contratação rápida com garantia de reposição.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { step: "01", icon: Search, title: "Divulgação da Vaga", desc: "A Cevan anuncia nos canais adequados para atrair os melhores candidatos." },
              { step: "02", icon: ClipboardList, title: "Triagem de Currículos", desc: "Seleção criteriosa dos perfis alinhados ao que a empresa precisa." },
              { step: "03", icon: Users, title: "Entrevistas", desc: "Condução das entrevistas pela equipe especializada da Cevan." },
              { step: "04", icon: ShieldCheck, title: "Checagem de Antecedentes", desc: "Verificação de histórico criminal e referências profissionais." },
              { step: "05", icon: UserCheck, title: "Apresentação dos Finalistas", desc: "A empresa recebe apenas candidatos pré-aprovados e toma a decisão final." },
              { step: "06", icon: Award, title: "Garantia de Reposição", desc: "Se o candidato não for efetivado em 90 dias, a Cevan refaz o processo gratuitamente." },
            ].map(({ step, icon: Icon, title, desc }) => (
              <div key={step} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                <div className="flex items-start gap-3 mb-4">
                  <span className="text-[28px] font-black text-[#1967D2]/20 leading-none">{step}</span>
                  <div className="h-8 w-8 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 mt-1">
                    <Icon className="h-4 w-4 text-[#1967D2]" />
                  </div>
                </div>
                <p className="font-black text-slate-900 text-[14px]">{title}</p>
                <p className="text-slate-500 text-[13px] font-medium leading-snug mt-1">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GESTÃO FINANCEIRA ── */}
      <section id="financeiro" className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            <div className="space-y-7">
              <div className="space-y-3">
                <Badge className="bg-emerald-50 text-emerald-700 border-none rounded-full px-4 py-1.5 font-black uppercase tracking-widest text-[10px]">Serviço 03</Badge>
                <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                  Gestão <span className="text-emerald-600">Financeira</span>
                </h2>
                <p className="text-slate-500 text-[15px] font-medium leading-relaxed">
                  Grande parte dos empresários não sabe exatamente quanto lucra por falta de controle estruturado. A Cevan organiza os números e transforma dados em decisões estratégicas.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  { icon: Banknote, title: "Contas a Pagar e a Receber", desc: "Controle completo dos compromissos financeiros e dos créditos a receber." },
                  { icon: TrendingUp, title: "Fluxo de Caixa", desc: "Monitoramento das entradas e saídas com visibilidade real da situação financeira." },
                  { icon: BarChart2, title: "Controle de Despesas", desc: "Categorização de gastos operacionais, pessoais e eventuais." },
                  { icon: FileText, title: "DRE — Demonstrativo de Resultado", desc: "Resultado financeiro periódico com clareza sobre o lucro real." },
                  { icon: Target, title: "Relatórios de Desempenho", desc: "Relatórios para orientar as decisões do empresário." },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex gap-3 items-start">
                    <div className="h-9 w-9 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="h-4 w-4 text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-black text-slate-900 text-[14px]">{title}</p>
                      <p className="text-slate-500 text-[13px] font-medium leading-snug mt-0.5">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5">
                <p className="text-emerald-700 font-black text-[12px] uppercase tracking-widest mb-1">Resultado Direto</p>
                <p className="text-slate-700 font-semibold text-[14px] leading-relaxed">
                  Com a Cevan cuidando do financeiro, você passa a ter clareza real sobre os números, identifica desperdícios e toma decisões com muito mais segurança.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-[2.5rem] bg-gradient-to-br from-emerald-500 to-teal-700 p-10 text-white text-center space-y-5 shadow-2xl">
                <BarChart2 className="h-16 w-16 mx-auto opacity-80" />
                <div className="space-y-1">
                  <p className="font-black text-4xl">+ Lucro</p>
                  <p className="font-black text-4xl text-emerald-200">- Desperdício</p>
                </div>
                <p className="text-emerald-100 font-medium text-[15px] max-w-xs mx-auto leading-relaxed">
                  Controle real sobre os números do seu negócio.
                </p>
                <p className="text-[11px] font-black uppercase tracking-widest text-emerald-300">Parte do Pacote de Gestão Completa</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ESTRATÉGIA TRIBUTÁRIA ── */}
      <section id="tributario" className="py-20 bg-slate-50">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="rounded-[2.5rem] bg-gradient-to-br from-violet-600 to-purple-800 p-10 text-white text-center space-y-5 shadow-2xl">
                <ShieldCheck className="h-16 w-16 mx-auto opacity-80" />
                <div className="space-y-1">
                  <p className="font-black text-4xl">Menos</p>
                  <p className="font-black text-4xl text-violet-200">Imposto.</p>
                  <p className="font-black text-2xl text-violet-300">Dentro da lei.</p>
                </div>
                <p className="text-violet-100 font-medium text-[15px] max-w-xs mx-auto leading-relaxed">
                  Redução legal e ética da carga tributária.
                </p>
              </div>
            </div>

            <div className="space-y-7 order-1 lg:order-2">
              <div className="space-y-3">
                <Badge className="bg-violet-50 text-violet-700 border-none rounded-full px-4 py-1.5 font-black uppercase tracking-widest text-[10px]">Serviço 04</Badge>
                <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                  Estratégia <span className="text-violet-600">Tributária</span>
                </h2>
                <p className="text-slate-500 text-[15px] font-medium leading-relaxed">
                  Muitas empresas pagam mais impostos do que deveriam. A Cevan atua de forma consultiva para regularizar essa situação e reduzir a carga tributária com total segurança jurídica.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  { icon: FileText, title: "Regularização do Faturamento", desc: "Alinhamento entre o faturamento real (Pix, cartão, dinheiro) e o declarado ao fisco, eliminando risco de autuação." },
                  { icon: TrendingUp, title: "Redução Legal de Impostos", desc: "Identificação de oportunidades dentro da lei para reduzir a carga tributária de forma ética." },
                  { icon: Scale, title: "Enquadramento Tributário Correto", desc: "Avaliação do regime mais vantajoso para o perfil e volume de faturamento." },
                  { icon: ShieldCheck, title: "Segurança Fiscal para Crescer", desc: "Com a tributação organizada, cresça sem medo de multas ou problemas com a Receita Federal." },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex gap-3 items-start">
                    <div className="h-9 w-9 rounded-xl bg-violet-50 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="h-4 w-4 text-violet-600" />
                    </div>
                    <div>
                      <p className="font-black text-slate-900 text-[14px]">{title}</p>
                      <p className="text-slate-500 text-[13px] font-medium leading-snug mt-0.5">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-violet-50 border border-violet-100 rounded-2xl p-5">
                <p className="text-violet-700 font-black text-[12px] uppercase tracking-widest mb-1">Suporte Completo</p>
                <p className="text-slate-700 font-semibold text-[14px] leading-relaxed">
                  Conta com um escritório de contabilidade parceiro e assessoria jurídica especializada. Um time completo, não apenas um consultor.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── INVESTIMENTO ── */}
      <section id="investimento" className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-12 space-y-3">
            <Badge className="bg-[#1967D2]/10 text-[#1967D2] border-none rounded-full px-4 py-1.5 font-black uppercase tracking-widest text-[10px]">Transparência Total</Badge>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">Tabela de <span className="text-[#1967D2]">Investimento</span></h2>
            <p className="text-slate-500 text-base sm:text-lg font-medium max-w-xl mx-auto leading-relaxed">
              Valores e entregáveis claros em cada serviço. Sem surpresas, sem letras miúdas.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
            {/* Terceirização de RH */}
            <Card className="p-7 border-slate-100 rounded-[2rem] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-400">
              <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center mb-5">
                <Users className="h-6 w-6 text-[#1967D2]" />
              </div>
              <h3 className="font-black text-[18px] text-slate-900 mb-1">Terceirização de RH</h3>
              <p className="text-slate-500 text-[13px] font-medium mb-7 leading-relaxed">Gestão completa do setor de recursos humanos.</p>
              <div className="space-y-5 border-t border-slate-100 pt-6">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Taxa de Implantação</p>
                  <p className="text-3xl font-black text-slate-900">R$ 1.500</p>
                  <p className="text-[12px] text-slate-400 font-medium mt-0.5">Valor único · até 50 colaboradores</p>
                </div>
                <div className="h-px bg-slate-100" />
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Mensalidade</p>
                  <p className="text-3xl font-black text-slate-900">R$ 100<span className="text-base text-slate-400 font-semibold">/colaborador</span></p>
                  <p className="text-[12px] text-slate-400 font-medium mt-0.5">Sem mínimo de colaboradores</p>
                </div>
              </div>
            </Card>

            {/* Pacote Completo */}
            <Card className="p-7 border-2 border-[#1967D2] rounded-[2rem] shadow-xl shadow-blue-100 hover:-translate-y-2 transition-all duration-400 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <Badge className="bg-[#1967D2] text-white border-none rounded-full px-5 py-1.5 font-black uppercase tracking-widest text-[10px] shadow-lg shadow-blue-200">Mais Popular</Badge>
              </div>
              <div className="h-12 w-12 rounded-2xl bg-[#1967D2] flex items-center justify-center mb-5">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-black text-[18px] text-slate-900 mb-1">Pacote de Gestão Completa</h3>
              <p className="text-slate-500 text-[13px] font-medium mb-7 leading-relaxed">RH + Financeiro + Suporte Estrutural integrados.</p>
              <div className="space-y-5 border-t border-slate-100 pt-6">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Implantação do Pacote</p>
                  <p className="text-3xl font-black text-slate-900">R$ 2.500</p>
                  <p className="text-[12px] text-slate-400 font-medium mt-0.5">Taxa única de entrada</p>
                </div>
                <div className="h-px bg-slate-100" />
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Consultoria Mensal</p>
                  <p className="text-3xl font-black text-[#1967D2]">R$ 2.000<span className="text-base text-slate-400 font-semibold">/mês</span></p>
                  <p className="text-[12px] text-slate-400 font-medium mt-0.5">Financeiro + suporte estrutural incluso</p>
                </div>
                <div className="h-px bg-slate-100" />
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">RH por Colaborador</p>
                  <p className="text-3xl font-black text-slate-900">R$ 100<span className="text-base text-slate-400 font-semibold">/colaborador</span></p>
                </div>
              </div>
            </Card>

            {/* Recrutamento Pontual */}
            <Card className="p-7 border-slate-100 rounded-[2rem] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-400">
              <div className="h-12 w-12 rounded-2xl bg-emerald-50 flex items-center justify-center mb-5">
                <UserCheck className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="font-black text-[18px] text-slate-900 mb-1">Recrutamento Pontual</h3>
              <p className="text-slate-500 text-[13px] font-medium mb-7 leading-relaxed">Contratação específica com garantia de reposição.</p>
              <div className="space-y-5 border-t border-slate-100 pt-6">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Taxa de Sucesso</p>
                  <p className="text-3xl font-black text-slate-900">50%<span className="text-base text-slate-400 font-semibold"> do 1.º salário</span></p>
                  <p className="text-[12px] text-slate-400 font-medium mt-0.5">Cobrado só quando a vaga é preenchida</p>
                </div>
                <div className="h-px bg-slate-100" />
                <div className="space-y-2">
                  {["Triagem e entrevistas inclusos", "Checagem de antecedentes", "Reposição gratuita em 90 dias"].map(item => (
                    <div key={item} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                      <span className="text-[13px] text-slate-600 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* ── POR QUE CEVAN ── */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#1967D2] to-transparent opacity-60" />
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-[#1967D2]/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <div className="text-center mb-12 space-y-3">
            <Badge className="bg-[#1967D2]/20 text-blue-300 border-none rounded-full px-4 py-1.5 font-black uppercase tracking-widest text-[10px]">Nossos Diferenciais</Badge>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight">Por que escolher a <span className="text-[#1967D2]">Cevan?</span></h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: Building2, title: "Solução Completa em Um Único Lugar", desc: "RH, Financeiro e Tributário integrados. Sem precisar contratar múltiplos fornecedores." },
              { icon: Star, title: "Atendimento Consultivo e Próximo", desc: "Somos pessoas resolvendo problemas reais com atenção personalizada e presença constante." },
              { icon: Target, title: "Foco em Pequenas e Médias Empresas", desc: "Preços justos, processos simples e resultados concretos para quem está crescendo." },
              { icon: ShieldCheck, title: "Suporte Contábil e Jurídico Integrado", desc: "Parceiros em contabilidade e direito empresarial para uma solução completa e segura." },
              { icon: Award, title: "Garantia de Reposição no Recrutamento", desc: "Se o candidato não for efetivado em 90 dias, refazemos o processo sem custo adicional." },
              { icon: Zap, title: "Resolução de Dores Reais", desc: "Eliminamos erros de folha, impostos a mais, contratações erradas e falta de controle financeiro." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-[#1967D2]/40 transition-all duration-300 group">
                <div className="h-10 w-10 rounded-xl bg-[#1967D2]/20 flex items-center justify-center mb-4 group-hover:bg-[#1967D2] transition-colors duration-500">
                  <Icon className="h-5 w-5 text-blue-300 group-hover:text-white transition-colors duration-500" />
                </div>
                <p className="font-black text-white text-[15px] mb-1.5 leading-snug">{title}</p>
                <p className="text-slate-400 text-[13px] font-medium leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        <div className="container mx-auto px-6 max-w-3xl text-center space-y-7">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Pronto para organizar<br /> sua <span className="text-[#1967D2]">empresa?</span>
          </h2>
          <p className="text-slate-500 text-base sm:text-lg font-medium leading-relaxed max-w-xl mx-auto">
            Fale com um especialista e descubra como a Cevan pode eliminar os custos invisíveis que travam o seu crescimento.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:atendimento@cevan.com.br">
              <Button size="lg" className="h-14 px-10 rounded-2xl bg-[#1967D2] hover:bg-blue-700 font-black text-[11px] uppercase tracking-[0.15em] shadow-2xl shadow-blue-200/60 hover:-translate-y-0.5 transition-all">
                <Mail className="mr-2.5 h-5 w-5" /> Enviar E-mail
              </Button>
            </a>
            <a href="tel:+551234567890">
              <Button size="lg" variant="outline" className="h-14 px-10 rounded-2xl border-slate-200 text-slate-700 font-black text-[11px] uppercase tracking-[0.15em] hover:bg-slate-50 transition-all">
                <Phone className="mr-2.5 h-5 w-5" /> Ligar Agora
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
