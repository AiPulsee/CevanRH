import Image from "next/image";
import { BookOpen, Zap, UserCheck, Receipt, FileText, Building2, CheckCircle2, XCircle, AlertTriangle, DollarSign, RefreshCw, Wallet, Sparkles, Layers, ArrowRight, Info } from "lucide-react";

export const metadata = { title: "Manual do Sistema — CevanRH" };

function Section({ id, children }: { id: string; children: React.ReactNode }) {
  return <section id={id} className="scroll-mt-24">{children}</section>;
}

function SectionTitle({ icon: Icon, title, subtitle }: { icon: React.ElementType; title: string; subtitle?: string }) {
  return (
    <div className="flex items-start gap-4 mb-6 pb-4 border-b border-slate-200">
      <div className="h-10 w-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 mt-0.5">
        <Icon className="h-5 w-5 text-blue-600" />
      </div>
      <div>
        <h2 className="text-xl font-black text-slate-900 tracking-tight">{title}</h2>
        {subtitle && <p className="text-sm text-slate-500 font-medium mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
}

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center shrink-0">
        <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-sm shrink-0">{n}</div>
        <div className="w-px flex-1 bg-slate-200 mt-1.5 min-h-[16px]" />
      </div>
      <div className="pb-5 flex-1 min-w-0">
        <p className="text-sm font-bold text-slate-900 mb-1">{title}</p>
        <div className="text-sm text-slate-600 leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

function LastStep({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center shrink-0">
        <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-sm shrink-0">{n}</div>
      </div>
      <div className="pb-1 flex-1 min-w-0">
        <p className="text-sm font-bold text-slate-900 mb-1">{title}</p>
        <div className="text-sm text-slate-600 leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

function Tip({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 p-4 bg-blue-50 border border-blue-200 rounded-xl my-4">
      <Info className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
      <p className="text-sm text-blue-800 font-medium leading-relaxed">{children}</p>
    </div>
  );
}

function Warn({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl my-4">
      <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
      <p className="text-sm text-amber-800 font-medium leading-relaxed">{children}</p>
    </div>
  );
}

function StatusBadge({ color, label, description }: { color: string; label: string; description: string }) {
  const colors: Record<string, string> = {
    amber: "bg-amber-50 border-amber-200 text-amber-700",
    violet: "bg-violet-50 border-violet-200 text-violet-700",
    emerald: "bg-emerald-50 border-emerald-200 text-emerald-700",
    rose: "bg-rose-50 border-rose-200 text-rose-700",
    slate: "bg-slate-100 border-slate-200 text-slate-500",
    blue: "bg-blue-50 border-blue-200 text-blue-700",
  };
  return (
    <div className="flex items-start gap-3 py-2">
      <span className={`shrink-0 inline-flex items-center px-2.5 py-0.5 rounded-lg border text-[10px] font-black uppercase tracking-widest ${colors[color]}`}>
        {label}
      </span>
      <p className="text-sm text-slate-600 font-medium">{description}</p>
    </div>
  );
}

function FlowArrow() {
  return <ArrowRight className="h-4 w-4 text-slate-400 mx-1 shrink-0" />;
}

function Screenshot({ src, caption, callouts }: { src: string; caption: string; callouts?: { x: string; y: string; label: string }[] }) {
  return (
    <figure className="my-6 rounded-2xl overflow-hidden border border-slate-200 shadow-lg bg-white">
      <div className="relative">
        <Image src={src} alt={caption} width={1440} height={900} className="w-full h-auto block" unoptimized />
        {callouts?.map((c, i) => (
          <div
            key={i}
            className="absolute flex items-center gap-1.5 pointer-events-none"
            style={{ left: c.x, top: c.y }}
          >
            <div className="h-5 w-5 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-[10px] shadow-lg ring-2 ring-white shrink-0">
              {i + 1}
            </div>
            <span className="bg-slate-900/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-md whitespace-nowrap shadow-lg">
              {c.label}
            </span>
          </div>
        ))}
      </div>
      <figcaption className="px-4 py-2.5 bg-slate-50 border-t border-slate-200 text-[11px] font-semibold text-slate-500 flex items-center gap-1.5">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0" />
        {caption}
      </figcaption>
    </figure>
  );
}

const TOC_ITEMS = [
  { href: "#introducao", label: "Introdução" },
  { href: "#dashboard", label: "Dashboard" },
  { href: "#curadoria", label: "Curadoria (Vagas)" },
  { href: "#taxa-entrada", label: "↳ Taxa de Entrada" },
  { href: "#painel-vaga", label: "↳ Painel da Vaga" },
  { href: "#triagem", label: "↳ Triagem de Candidatos" },
  { href: "#ia", label: "↳ Análise com IA" },
  { href: "#alocacoes", label: "Alocações" },
  { href: "#efetivar", label: "↳ Efetivar / Encerrar" },
  { href: "#reposicao", label: "↳ Reposição" },
  { href: "#comissoes", label: "Comissões" },
  { href: "#financas", label: "Finanças" },
  { href: "#analytics", label: "Analytics" },
  { href: "#talentos", label: "Banco de Talentos" },
  { href: "#empresas", label: "Empresas & Usuários" },
  { href: "#glossario", label: "Glossário de Status" },
];

export default function ManualPage() {
  return (
    <div className="animate-in fade-in duration-500">
      {/* Page header */}
      <div className="mb-8">
        <div className="flex items-center gap-1.5 text-blue-600 mb-1">
          <BookOpen className="h-4 w-4" />
          <span className="text-[10px] font-black uppercase tracking-widest">Documentação Interna</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900">Manual do Sistema CevanRH</h1>
        <p className="text-slate-500 font-medium mt-1">
          Guia completo para consultores — triagem, alocações, comissões e gestão de clientes.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Table of Contents — sticky sidebar */}
        <aside className="lg:w-56 shrink-0 lg:sticky lg:top-24">
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-3">Sumário</p>
            <nav className="space-y-0.5">
              {TOC_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block px-2 py-1.5 rounded-lg text-[11px] font-semibold text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-all leading-tight"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Content */}
        <div className="flex-1 min-w-0 space-y-12">

          {/* ── Introdução ── */}
          <Section id="introducao">
            <SectionTitle icon={BookOpen} title="Introdução" subtitle="O modelo de negócio e como o sistema apoia cada etapa" />

            <div className="prose prose-slate max-w-none">
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                O <strong>CevanRH</strong> é o sistema de gestão de recrutamento especializado da Cevan Empresariais. Ele suporta o modelo de <strong>curadoria</strong>: a empresa cliente paga uma <strong>taxa de entrada</strong> para a Cevan iniciar a triagem, e uma <strong>comissão</strong> quando o candidato passa pelo período de experiência e é efetivado.
              </p>

              <div className="bg-slate-900 rounded-2xl p-6 text-white mb-6">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Fluxo do Processo Cevan</p>
                <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
                  <span className="bg-white/10 px-3 py-1.5 rounded-lg">1. Cliente contrata</span>
                  <FlowArrow />
                  <span className="bg-white/10 px-3 py-1.5 rounded-lg">2. Taxa de entrada</span>
                  <FlowArrow />
                  <span className="bg-white/10 px-3 py-1.5 rounded-lg">3. Triagem + IA</span>
                  <FlowArrow />
                  <span className="bg-white/10 px-3 py-1.5 rounded-lg">4. Candidato enviado</span>
                  <FlowArrow />
                  <span className="bg-white/10 px-3 py-1.5 rounded-lg">5. Período de trial</span>
                  <FlowArrow />
                  <span className="bg-emerald-600 px-3 py-1.5 rounded-lg">6. Efetivado + Comissão</span>
                </div>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">
                Se o candidato não se adaptar durante o trial, a Cevan envia um substituto (rodada de reposição) sem custo adicional de taxa de entrada. A comissão só é devida quando o candidato é efetivado.
              </p>
            </div>
          </Section>

          {/* ── Dashboard ── */}
          <Section id="dashboard">
            <SectionTitle icon={LayoutDashboardIcon} title="Dashboard" subtitle="Painel principal com visão geral do negócio" />

            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              O Dashboard (<strong>/admin</strong>) é a primeira tela após o login. Exibe os indicadores mais importantes do momento.
            </p>

            <Screenshot
              src="/manual/dashboard.png"
              caption="Dashboard — visão geral: KPIs, gráfico de receita e atividade recente"
              callouts={[
                { x: "23%", y: "18%", label: "Novas empresas este mês" },
                { x: "44%", y: "18%", label: "Vagas em triagem ativa" },
                { x: "63%", y: "18%", label: "Candidatos aguardando triagem" },
                { x: "81%", y: "18%", label: "Receita do mês" },
              ]}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {[
                { label: "Candidaturas Recentes", desc: "Total de novas inscrições recebidas este mês em todas as vagas." },
                { label: "Vagas em Triagem", desc: "Vagas de curadoria com status Ativo — há candidatos aguardando análise." },
                { label: "Alocações em Andamento", desc: "Candidatos no período de trial. Fique atento aos que estão prestes a vencer." },
                { label: "Receita do Mês", desc: "Soma de comissões pagas e taxas de entrada recebidas no mês corrente. Passe o mouse para ver o detalhamento." },
              ].map((k) => (
                <div key={k.label} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{k.label}</p>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed">{k.desc}</p>
                </div>
              ))}
            </div>

            <Tip>Os KPIs do Dashboard têm tooltips explicativos — passe o mouse sobre o ícone de cada card para entender o que está sendo medido.</Tip>
          </Section>

          {/* ── Curadoria ── */}
          <Section id="curadoria">
            <SectionTitle icon={Zap} title="Curadoria (Vagas)" subtitle="Como criar e gerenciar vagas de triagem especializada" />

            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              Acesse <strong>Curadoria (Vagas)</strong> no menu lateral. Aqui ficam todas as vagas que a Cevan gerencia ativamente para clientes. Cada vaga passa pelo ciclo completo: criação → taxa de entrada → triagem → alocação → efetivação.
            </p>

            <Screenshot
              src="/manual/curadoria.png"
              caption="Lista de Curadoria — vagas ativas, encerradas, KPIs e botão de triagem"
              callouts={[
                { x: "13%", y: "18%", label: "Total sob gestão" },
                { x: "35%", y: "18%", label: "Em triagem ativa" },
                { x: "55%", y: "18%", label: "Selecionados" },
                { x: "57%", y: "52%", label: "Badge de pagamento" },
                { x: "72%", y: "52%", label: "Botão Fazer Triagem" },
              ]}
            />

            <h3 className="text-base font-black text-slate-900 mb-4">Criar uma nova vaga</h3>
            <div className="space-y-0 mb-6">
              <Step n={1} title="Clique em 'Nova Vaga' (canto superior direito)">
                O modal de criação de vaga será aberto.
              </Step>
              <Step n={2} title="Selecione a empresa cliente">
                Escolha a empresa que solicitou a contratação. Se ela ainda não estiver cadastrada, acesse <strong>Empresas</strong> primeiro.
              </Step>
              <Step n={3} title="Preencha o cargo e descrição">
                Título, descrição completa, localização, modelo (presencial/remoto), faixa salarial.
              </Step>
              <Step n={4} title="Configure os honorários da Cevan">
                <div className="space-y-1 mt-1">
                  <p><strong>Percentual:</strong> X% do primeiro salário bruto do candidato efetivado.</p>
                  <p><strong>Valor fixo:</strong> Um valor em reais acordado previamente com o cliente.</p>
                </div>
              </Step>
              <Step n={5} title="Defina o período de trial">
                Padrão do mercado: 90 dias. Pode ser ajustado por cliente.
              </Step>
              <LastStep n={6} title="Defina o número de vagas (openings)">
                Se o cliente precisa de mais de um profissional para a mesma função, aumente aqui. O sistema só fecha a vaga quando todas as posições forem preenchidas.
              </LastStep>
            </div>
          </Section>

          {/* ── Taxa de Entrada ── */}
          <Section id="taxa-entrada">
            <SectionTitle icon={Wallet} title="Taxa de Entrada" subtitle="Pagamento inicial do cliente antes do início da triagem" />

            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              Toda vaga começa com status de taxa <strong>Pendente</strong>. O sistema bloqueia o envio de candidatos enquanto a taxa não for registrada — isso garante que a Cevan não trabalhe sem receber a entrada.
            </p>

            <div className="space-y-2 mb-6">
              <StatusBadge color="amber" label="Pgto. Pendente" description="Taxa ainda não recebida. O envio de candidatos está bloqueado nesta vaga." />
              <StatusBadge color="violet" label="Pgto. Recebido" description="Pagamento confirmado. A triagem e o envio de candidatos estão liberados." />
              <StatusBadge color="slate" label="Taxa Dispensada" description="Taxa isenta por acordo comercial. O envio também está liberado." />
            </div>

            <h3 className="text-base font-black text-slate-900 mb-4">Como registrar o pagamento</h3>
            <div className="space-y-0 mb-4">
              <Step n={1} title="Na lista de Curadoria, localize a vaga">
                Cada card tem um badge de pagamento colorido na coluna <strong>Pagamento</strong>.
              </Step>
              <Step n={2} title="Clique no badge 'Pgto. Pendente'">
                O modal de taxa de entrada abrirá.
              </Step>
              <LastStep n={3} title="Informe o valor recebido e confirme">
                Escolha entre <strong>Recebido</strong> (informa o valor) ou <strong>Dispensado</strong> (isenta). O status atualiza imediatamente.
              </LastStep>
            </div>

            <Warn>Nunca tente enviar um candidato com a taxa pendente — o sistema vai bloquear a ação com uma mensagem de erro.</Warn>
          </Section>

          {/* ── Painel da Vaga ── */}
          <Section id="painel-vaga">
            <SectionTitle icon={FileText} title="Painel da Vaga" subtitle="Visão completa de uma vaga: histórico, candidatos e financeiro" />

            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              Cada vaga tem um painel individual acessível clicando no ícone <strong>↗</strong> em seu card na lista de Curadoria. O painel consolida tudo em um só lugar.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {[
                { t: "KPIs da Vaga", d: "Inscritos totais, candidatos selecionados, rodadas enviadas e quantas posições foram preenchidas." },
                { t: "Timeline de Candidatos", d: "Cada candidato enviado aparece como um card com suas datas, salário, status e botões de ação." },
                { t: "Configuração", d: "Faixa salarial, modelo de honorários, período de trial, número de vagas e localização." },
                { t: "Resumo Financeiro", d: "Taxa de entrada + comissões por rodada + total já recebido desta vaga." },
              ].map((i) => (
                <div key={i.t} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                  <p className="text-xs font-black text-slate-900 mb-1">{i.t}</p>
                  <p className="text-sm text-slate-500 leading-relaxed">{i.d}</p>
                </div>
              ))}
            </div>

            <Tip>No painel da vaga você pode efetivar, encerrar e gerenciar comissões diretamente, sem precisar ir à tela de Alocações.</Tip>
          </Section>

          {/* ── Triagem ── */}
          <Section id="triagem">
            <SectionTitle icon={Zap} title="Triagem de Candidatos" subtitle="Como avaliar e selecionar candidatos para o cliente" />

            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              Na lista de Curadoria, clique em <strong>Fazer Triagem</strong> na vaga desejada. O modal de triagem abrirá com todos os candidatos pendentes em fila.
            </p>

            <h3 className="text-base font-black text-slate-900 mb-4">Navegação na fila</h3>
            <p className="text-sm text-slate-600 mb-4 leading-relaxed">
              Use as setas <strong>← →</strong> para navegar entre candidatos. O contador no topo mostra a posição atual (ex: <strong>3/12</strong>). Os pontos coloridos no topo da fila mostram o score de IA de cada candidato — clique em qualquer ponto para pular direto para aquele candidato.
            </p>

            <h3 className="text-base font-black text-slate-900 mb-4">Ações disponíveis por candidato</h3>
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3 p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-black text-emerald-800 uppercase tracking-wide">Indicar p/ Cliente</p>
                  <p className="text-sm text-emerald-700 mt-0.5">Marca o candidato como selecionado. Quando pronto para contratar, o botão vira <strong>Contratar</strong> — informe salário e data de início para criar a alocação.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-rose-50 border border-rose-200 rounded-xl">
                <XCircle className="h-4 w-4 text-rose-600 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-black text-rose-800 uppercase tracking-wide">Reprovar</p>
                  <p className="text-sm text-rose-700 mt-0.5">Remove o candidato da fila. Ele não será mais exibido na triagem desta vaga.</p>
                </div>
              </div>
            </div>

            <h3 className="text-base font-black text-slate-900 mb-3">Contratar o candidato selecionado</h3>
            <div className="space-y-0 mb-4">
              <Step n={1} title="Clique em 'Indicar p/ Cliente'">O botão muda para <strong>Contratar</strong>.</Step>
              <Step n={2} title="Clique em 'Contratar'">Um formulário aparece pedindo o salário combinado (R$) e a previsão de início.</Step>
              <LastStep n={3} title="Confirme a contratação">Uma Alocação é criada automaticamente em <strong>Alocações</strong> com status <strong>Em Andamento (Trial)</strong>.</LastStep>
            </div>

            <Warn>A taxa de entrada precisa estar <strong>Recebida</strong> ou <strong>Dispensada</strong> antes de poder contratar. O botão Contratar será bloqueado caso contrário.</Warn>
          </Section>

          {/* ── IA ── */}
          <Section id="ia">
            <SectionTitle icon={Sparkles} title="Análise com Inteligência Artificial" subtitle="Como usar a IA para acelerar a triagem" />

            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              O sistema possui integração com IA (Groq / LLaMA 70B) que lê o PDF do currículo e gera um parecer instantâneo. Os scores ficam salvos — não é necessário reanalisar a cada abertura do modal.
            </p>

            <h3 className="text-base font-black text-slate-900 mb-4">Analisar candidato por candidato</h3>
            <div className="space-y-0 mb-6">
              <Step n={1} title="Abra o modal de triagem na vaga">Os candidatos já analisados mostram o score no topo do painel lateral.</Step>
              <Step n={2} title="Para um candidato específico, clique em 'Analisar com IA'">A IA lê o PDF, gera score de 0–100, veredito e pontos fortes/fracos.</Step>
              <LastStep n={3} title="Use o parecer para decidir">Score ≥ 75: recomendado. 50–74: avaliar com atenção. Abaixo de 50: não recomendado.</LastStep>
            </div>

            <h3 className="text-base font-black text-slate-900 mb-4">
              <span className="inline-flex items-center gap-2"><Layers className="h-4 w-4 text-violet-600" /> Analisar a Fila Inteira de Uma Vez</span>
            </h3>
            <div className="space-y-0 mb-4">
              <Step n={1} title="No cabeçalho do modal, clique em 'Analisar Fila (N)'">N é o número de candidatos ainda não analisados nesta abertura.</Step>
              <Step n={2} title="Aguarde o progresso (ex: '3/8...')">A IA processa um candidato de cada vez. Os pontos coloridos vão aparecendo em tempo real.</Step>
              <Step n={3} title="A fila é reordenada automaticamente">Ao terminar, os candidatos com maior score aparecem primeiro.</Step>
              <LastStep n={4} title="Reprovar em lote (opcional)">Um painel vermelho aparece sugerindo reprovar todos abaixo de 50% (ajustável para 30/40/50/60%). Clique no botão para confirmar a reprovação em massa.</LastStep>
            </div>

            <Tip>Os scores ficam salvos. Na próxima vez que abrir a triagem, os candidatos já aparecem ordenados pelo score — sem precisar reanalisar.</Tip>
          </Section>

          {/* ── Alocações ── */}
          <Section id="alocacoes">
            <SectionTitle icon={UserCheck} title="Alocações" subtitle="Gerenciamento do período de experiência dos candidatos contratados" />

            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              Acesse <strong>Alocações</strong> no menu lateral. Cada linha é um candidato que foi contratado. O sistema monitora o período de trial e exibe alertas quando o prazo está próximo ou vencido.
            </p>

            <Screenshot
              src="/manual/alocacoes.png"
              caption="Alocações — candidatos contratados com status de trial, efetivação e comissão"
              callouts={[
                { x: "13%", y: "17%", label: "Em andamento (trial)" },
                { x: "33%", y: "17%", label: "Efetivados no total" },
                { x: "53%", y: "17%", label: "Taxa de conversão" },
                { x: "73%", y: "17%", label: "Receita potencial" },
                { x: "60%", y: "58%", label: "Status da alocação" },
                { x: "75%", y: "58%", label: "Status da comissão" },
              ]}
            />

            <div className="space-y-2 mb-6">
              <StatusBadge color="amber" label="Em Andamento" description="Candidato no período de experiência. Aguardando confirmação de efetivação." />
              <StatusBadge color="emerald" label="Efetivado" description="Candidato passou pelo trial e foi contratado definitivamente. Comissão gerada." />
              <StatusBadge color="rose" label="Encerrado" description="Contratação encerrada durante o trial. Pode haver necessidade de reposição." />
            </div>

            <h3 className="text-base font-black text-slate-900 mb-4">Alertas de vencimento</h3>
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-3 p-3 bg-amber-50 border border-amber-200 rounded-xl">
                <span className="h-2 w-2 rounded-full bg-amber-500 shrink-0" />
                <p className="text-sm text-amber-800 font-medium"><strong>Amarelo:</strong> Trial vence em até 15 dias — entre em contato com o cliente.</p>
              </div>
              <div className="flex items-center gap-3 p-3 bg-rose-50 border border-rose-200 rounded-xl">
                <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse shrink-0" />
                <p className="text-sm text-rose-800 font-medium"><strong>Vermelho pulsando:</strong> Trial venceu — ação necessária: efetivar ou encerrar.</p>
              </div>
            </div>
          </Section>

          {/* ── Efetivar / Encerrar ── */}
          <Section id="efetivar">
            <SectionTitle icon={CheckCircle2} title="Efetivar ou Encerrar uma Alocação" subtitle="O que fazer quando o período de trial termina" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
                <p className="text-xs font-black text-emerald-800 uppercase tracking-widest mb-3">Efetivar</p>
                <ol className="space-y-2 text-sm text-emerald-700">
                  <li>1. Na tabela de Alocações, localize o candidato.</li>
                  <li>2. Clique em <strong>Efetivar</strong> (botão verde).</li>
                  <li>3. Confirme a ação no diálogo.</li>
                  <li>4. O status muda para <strong>Efetivado</strong> e a comissão é gerada automaticamente em <strong>Finanças</strong>.</li>
                </ol>
              </div>
              <div className="bg-rose-50 border border-rose-200 rounded-xl p-5">
                <p className="text-xs font-black text-rose-800 uppercase tracking-widest mb-3">Encerrar</p>
                <ol className="space-y-2 text-sm text-rose-700">
                  <li>1. Na tabela de Alocações, clique em <strong>Encerrar</strong> (botão vermelho).</li>
                  <li>2. Selecione um motivo rápido ou escreva livremente.</li>
                  <li>3. Confirme. O status muda para <strong>Encerrado</strong>.</li>
                  <li>4. A vaga volta para triagem ativa para receber um substituto.</li>
                </ol>
              </div>
            </div>

            <Tip>Se uma vaga tem mais de 1 posição (openings &gt; 1), a vaga só fecha definitivamente quando todas as posições forem efetivadas. Enquanto houver posições abertas, a triagem permanece ativa.</Tip>
          </Section>

          {/* ── Reposição ── */}
          <Section id="reposicao">
            <SectionTitle icon={RefreshCw} title="Reposição de Candidato" subtitle="Como enviar um substituto quando uma contratação é encerrada" />

            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              Quando uma alocação é encerrada, a vaga retorna ao status ativo e você pode enviar um novo candidato. Este segundo (ou terceiro) envio é uma <strong>rodada de reposição</strong>.
            </p>

            <div className="space-y-0 mb-4">
              <Step n={1} title="Acesse a Curadoria">A vaga aparecerá novamente com candidatos disponíveis.</Step>
              <Step n={2} title="Faça a triagem normalmente">Selecione o melhor candidato substituto e clique em Contratar.</Step>
              <LastStep n={3} title="Nova alocação criada">O sistema registra como Rodada 2 (ou 3, etc.). No histórico da vaga e no painel individual você verá todas as rodadas com seus status.</LastStep>
            </div>

            <Tip>A taxa de entrada <strong>não é cobrada novamente</strong> em reposições — ela já foi paga na abertura da vaga. A comissão só é gerada se o substituto também for efetivado.</Tip>
          </Section>

          {/* ── Comissões ── */}
          <Section id="comissoes">
            <SectionTitle icon={DollarSign} title="Comissões" subtitle="Ciclo completo da comissão: de pendente a pago" />

            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              Uma comissão é criada automaticamente quando um candidato é efetivado. O valor é calculado conforme o modelo de honorários configurado na vaga (percentual do salário ou valor fixo).
            </p>

            <div className="space-y-2 mb-6">
              <StatusBadge color="amber" label="Pendente" description="Comissão gerada, aguardando emissão de nota fiscal pelo cliente." />
              <StatusBadge color="blue" label="Faturado" description="NF recebida. Aguardando pagamento." />
              <StatusBadge color="emerald" label="Pago" description="Pagamento confirmado. Receita contabilizada." />
              <StatusBadge color="slate" label="Dispensado" description="Comissão isenta por acordo comercial." />
            </div>

            <h3 className="text-base font-black text-slate-900 mb-4">Como registrar o recebimento</h3>
            <div className="space-y-0 mb-4">
              <Step n={1} title="Em Alocações, localize o candidato efetivado">O botão de comissão aparece ao lado. Cor: azul (pendente), verde (pago), cinza (dispensado).</Step>
              <Step n={2} title="Clique no botão de comissão">O modal de comissão abre mostrando o valor, status e histórico.</Step>
              <Step n={3} title="Quando receber a NF, marque como 'Faturado'">Informe o número da nota fiscal e faça upload do PDF (opcional).</Step>
              <LastStep n={4} title="Quando o pagamento cair, marque como 'Pago'">A receita é registrada no Dashboard e na página de Finanças.</LastStep>
            </div>

            <Tip>Você também pode gerenciar comissões diretamente no <strong>Painel da Vaga</strong> (/admin/managed/[id]) sem precisar abrir a tela de Alocações.</Tip>
          </Section>

          {/* ── Finanças ── */}
          <Section id="financas">
            <SectionTitle icon={Receipt} title="Finanças" subtitle="Visão consolidada de todas as comissões e receitas" />

            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              Acesse <strong>Finanças</strong> no menu. A página consolida todas as comissões do sistema com filtros por status, empresa e período.
            </p>

            <Screenshot
              src="/manual/financas.png"
              caption="Finanças — visão consolidada de comissões: a receber, pendentes, faturados e total recebido"
              callouts={[
                { x: "22%", y: "24%", label: "A Receber (total em aberto)" },
                { x: "43%", y: "24%", label: "Pendentes (sem NF)" },
                { x: "60%", y: "24%", label: "Faturados (NF emitida)" },
                { x: "79%", y: "24%", label: "Total já recebido" },
                { x: "60%", y: "68%", label: "Status de cada comissão" },
              ]}
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              {[
                { label: "Receita Confirmada", desc: "Soma de comissões com status Pago." },
                { label: "A Receber", desc: "Comissões Pendentes ou Faturadas ainda não pagas." },
                { label: "Receita Total", desc: "Tudo que foi ou será recebido (Pago + A Receber)." },
              ].map((k) => (
                <div key={k.label} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{k.label}</p>
                  <p className="text-sm text-slate-600 mt-1">{k.desc}</p>
                </div>
              ))}
            </div>

            <Warn>As taxas de entrada são contabilizadas separadamente das comissões. O Dashboard mostra a receita combinada; Finanças mostra apenas comissões.</Warn>
          </Section>

          {/* ── Analytics ── */}
          <Section id="analytics">
            <SectionTitle icon={BarChart2} title="Analytics" subtitle="Funil de recrutamento e métricas de desempenho" />

            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              A página de <strong>Relatórios Gerais</strong> exibe o funil de recrutamento e os principais indicadores de performance.
            </p>

            <Screenshot
              src="/manual/analytics.png"
              caption="Relatórios Gerais — KPIs globais, volume de candidaturas e funil de conversão"
              callouts={[
                { x: "23%", y: "16%", label: "Empresas cadastradas" },
                { x: "43%", y: "16%", label: "Total de candidaturas" },
                { x: "63%", y: "16%", label: "Vagas publicadas" },
                { x: "81%", y: "16%", label: "Alocações totais" },
                { x: "22%", y: "83%", label: "Funil de conversão" },
                { x: "63%", y: "83%", label: "Vagas de curadoria" },
              ]}
            />

            <div className="space-y-3 mb-6">
              {[
                { label: "Candidaturas", desc: "Total de inscrições recebidas em vagas de curadoria." },
                { label: "Selecionados", desc: "Candidatos que passaram pela triagem e foram indicados." },
                { label: "Enviados (1ª vez)", desc: "Candidatos contratados em primeira rodada (não conta reposições)." },
                { label: "Efetivados", desc: "Candidatos que passaram pelo trial e foram contratados definitivamente." },
              ].map((s, i) => (
                <div key={s.label} className="flex items-center gap-3">
                  <div className="h-7 w-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black text-xs shrink-0">{i + 1}</div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{s.label}</p>
                    <p className="text-xs text-slate-500">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Tip>A taxa de conversão mostrada no funil é calculada entre <strong>Enviados na 1ª rodada</strong> e <strong>Efetivados</strong> — reposições não são contadas como novos candidatos para não distorcer o número.</Tip>
          </Section>

          {/* ── Banco de Talentos ── */}
          <Section id="talentos">
            <SectionTitle icon={FileText} title="Banco de Talentos" subtitle="Repositório de currículos recebidos" />

            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              Acesse <strong>Banco de Talentos</strong> para ver todos os currículos enviados pelos candidatos, independente de vaga. Você pode filtrar por tipo de vaga, buscar por nome e exportar a lista em planilha.
            </p>

            <h3 className="text-base font-black text-slate-900 mb-3">Cadastrar currículo manualmente</h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              Se um candidato enviou o currículo por WhatsApp ou e-mail, você pode cadastrá-lo manualmente: clique em <strong>Adicionar Currículo</strong>, informe nome, e-mail e faça upload do PDF.
            </p>

            <Tip>Currículos cadastrados manualmente ficam no banco sem vínculo com uma vaga específica. Para vinculá-los a uma triagem, encaminhe o candidato para se inscrever normalmente pela plataforma, ou use o campo de alocação direta.</Tip>
          </Section>

          {/* ── Empresas & Usuários ── */}
          <Section id="empresas">
            <SectionTitle icon={Building2} title="Empresas & Usuários" subtitle="Gestão de clientes e acessos ao sistema" />

            <h3 className="text-base font-black text-slate-900 mb-3">Empresas</h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              Acesse <strong>Empresas</strong> para cadastrar ou editar clientes. Cada empresa tem nome, logo, setor, site e e-mail de contato. As vagas são sempre vinculadas a uma empresa cadastrada.
            </p>

            <h3 className="text-base font-black text-slate-900 mb-3">Usuários</h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              Acesse <strong>Usuários</strong> para gerenciar quem tem acesso ao painel administrativo. Cada consultor pode ter permissões específicas:
            </p>

            <div className="space-y-2 mb-4">
              {[
                { perm: "MANAGED", desc: "Acesso à Curadoria: criar vagas, fazer triagem, contratar candidatos." },
                { perm: "PLACEMENTS", desc: "Acesso às Alocações: efetivar, encerrar e acompanhar trials." },
                { perm: "FINANCE", desc: "Acesso ao Financeiro e taxas de entrada: registrar NFs e pagamentos." },
                { perm: "ANALYTICS", desc: "Acesso aos Relatórios e métricas do funil." },
                { perm: "COMPANIES", desc: "Cadastrar e editar empresas clientes." },
                { perm: "RESUMES", desc: "Visualizar e exportar o Banco de Talentos." },
              ].map((p) => (
                <div key={p.perm} className="flex items-start gap-3">
                  <span className="shrink-0 inline-flex items-center px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-[9px] font-black uppercase tracking-widest text-slate-600 mt-0.5">{p.perm}</span>
                  <p className="text-sm text-slate-600">{p.desc}</p>
                </div>
              ))}
            </div>

            <Tip>O usuário <strong>Master</strong> tem acesso total e não está sujeito a restrições de permissão. Use com cautela — somente para administradores seniores.</Tip>
          </Section>

          {/* ── Glossário ── */}
          <Section id="glossario">
            <SectionTitle icon={BookOpen} title="Glossário de Status" subtitle="Referência rápida de todos os estados do sistema" />

            <div className="space-y-8">
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">Taxa de Entrada (Vaga)</p>
                <div className="space-y-2">
                  <StatusBadge color="amber" label="Pendente" description="Taxa não registrada. Envio de candidatos bloqueado." />
                  <StatusBadge color="violet" label="Recebido" description="Pagamento confirmado. Triagem liberada." />
                  <StatusBadge color="slate" label="Dispensado" description="Taxa isenta por acordo comercial. Triagem liberada." />
                </div>
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">Candidatura</p>
                <div className="space-y-2">
                  <StatusBadge color="blue" label="Inscrito" description="Candidato se inscreveu — aguardando triagem pelo consultor." />
                  <StatusBadge color="amber" label="Em Análise" description="Em avaliação pelo consultor." />
                  <StatusBadge color="emerald" label="Selecionado" description="Indicado para o cliente — pode ser contratado." />
                  <StatusBadge color="rose" label="Reprovado" description="Eliminado na triagem desta vaga." />
                  <StatusBadge color="violet" label="Contratado" description="Efetivado — alocação criada automaticamente." />
                </div>
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">Alocação</p>
                <div className="space-y-2">
                  <StatusBadge color="amber" label="Em Experiência" description="Candidato no período de trial. Aguardando efetivação." />
                  <StatusBadge color="emerald" label="Efetivado" description="Passou pelo trial e foi contratado definitivamente." />
                  <StatusBadge color="rose" label="Encerrado" description="Contratação encerrada durante o período de experiência." />
                  <StatusBadge color="slate" label="Cancelado" description="Cancelado antes do início do trabalho." />
                </div>
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">Comissão</p>
                <div className="space-y-2">
                  <StatusBadge color="amber" label="Pendente" description="Gerada, aguardando emissão de NF pelo cliente." />
                  <StatusBadge color="blue" label="Faturado" description="NF recebida. Aguardando pagamento." />
                  <StatusBadge color="emerald" label="Pago" description="Pagamento confirmado e receita contabilizada." />
                  <StatusBadge color="slate" label="Dispensado" description="Comissão isenta por acordo comercial." />
                </div>
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">Score de IA</p>
                <div className="space-y-2">
                  <StatusBadge color="emerald" label="75–100% · Recomendar" description="Candidato recomendado. Alta aderência ao perfil da vaga." />
                  <StatusBadge color="amber" label="50–74% · Avaliar" description="Avaliar com atenção. Aderência parcial ao perfil." />
                  <StatusBadge color="rose" label="0–49% · Reprovar" description="Não recomendado. Baixa aderência ao perfil da vaga." />
                </div>
              </div>
            </div>
          </Section>

        </div>
      </div>
    </div>
  );
}

// Inline icon para evitar import extra
function LayoutDashboardIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="7" height="9" x="3" y="3" rx="1" /><rect width="7" height="5" x="14" y="3" rx="1" /><rect width="7" height="9" x="14" y="12" rx="1" /><rect width="7" height="5" x="3" y="16" rx="1" />
    </svg>
  );
}

function BarChart2(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /><line x1="2" y1="20" x2="22" y2="20" />
    </svg>
  );
}
