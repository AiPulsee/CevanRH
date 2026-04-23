export const modules = [
  {
    id: 1, essential: true, icon: "Globe",
    name: "Site Público",
    desc: "Vitrine digital da plataforma com design de alta performance, busca inteligente, vagas em destaque e páginas institucionais completas.",
    items: ["Landing Page com Hero e busca","Listagem e Detalhe de Vagas","Catálogo de Empresas","Blog/Conteúdo institucional","SEO otimizado e animações","Filtros avançados de busca"],
    price: 6500,
  },
  {
    id: 2, essential: true, icon: "Shield",
    name: "Autenticação & Segurança",
    desc: "Sistema robusto de login, cadastro e controle de acesso com múltiplos perfis e proteção de rotas.",
    items: ["Login com email/senha (bcrypt)","Cadastro Empresa (onboarding multi-step)","Recuperação de senha","Sessão JWT com roles (Admin/Empresa/Candidato)","Middleware de proteção Edge Runtime","Redirecionamento por perfil"],
    price: 4500,
  },
  {
    id: 3, essential: false, icon: "Building",
    name: "Painel da Empresa",
    desc: "Central de operações completa para a empresa contratante gerenciar vagas, candidatos e processos seletivos.",
    items: ["Dashboard com KPIs em tempo real","CRUD completo de vagas (16+ campos)","Pipeline de candidatos com status","Modal de detalhes do candidato","Financeiro e histórico de faturas","Configurações da empresa"],
    price: 12000,
  },
  {
    id: 4, essential: false, icon: "User",
    name: "Portal do Candidato",
    desc: "Espaço dedicado ao candidato para gerenciar perfil profissional, currículo e acompanhar candidaturas.",
    items: ["Dashboard pessoal de candidaturas","Upload de currículo (drag-and-drop)","Armazenamento em nuvem (AWS S3)","Formulário de candidatura integrado","Acompanhamento de status em tempo real","Configurações e preferências"],
    price: 7000,
  },
  {
    id: 5, essential: true, icon: "Command",
    name: "Painel Administrativo",
    desc: "Central de comando da equipe Cevan com visão 360° do ecossistema: empresas, usuários, métricas e configurações.",
    items: ["Dashboard com KPIs e gráficos","Integração com IA (OpenAI/GPT)","Sistema de notificações (E-mail/Push)","Gestão de empresas e usuários","Monitor de vendas ao vivo","Configurações globais e API"],
    price: 11500,
  },
  {
    id: 6, essential: false, icon: "Sparkles",
    name: "Curadoria Especializada",
    desc: "Fluxo operacional de vagas managed: triagem interna pela Cevan, avaliação de candidatos e entrega de shortlist ao cliente.",
    items: ["Fila de vagas managed com status","Modal de screening com notas internas","Feedback admin + feedback do cliente","Badge 'Patrocinada' em vagas managed","Shortlist com controle de aprovação"],
    price: 10500,
  },
  {
    id: 7, essential: false, icon: "UserCheck",
    name: "Alocações & Recrutamento",
    desc: "Controle completo do período de experiência de 90 dias para candidatos colocados pela Cevan nas empresas.",
    items: ["Tabela de alocações com progress bars","Countdown animado de 90 dias","Alertas automáticos (< 7 dias)","Botões Efetivar / Não Efetivar","Insights: taxa de conversão, tempo médio","Cards de próximos vencimentos"],
    price: 9500,
  },
  {
    id: 8, essential: false, icon: "DollarSign",
    name: "Gestão Financeira & Comissões",
    desc: "Controle de comissões (50% do salário) geradas por efetivação, com faturamento, relatórios e acompanhamento.",
    items: ["Dashboard financeiro com métricas","Tabela de comissões com lifecycle","Cálculo automático 50% do salário","Controle de NF/fatura e vencimentos","Gráfico de performance anual","Visibilidade da comissão pela empresa"],
    price: 9500,
  },
  {
    id: 9, essential: false, icon: "Zap",
    name: "Aplicativo Mobile PWA",
    desc: "Transforme sua plataforma em um App instalável direto no celular do candidato, sem precisar de lojas (App Store/Play Store).",
    items: ["Ícone na tela inicial do celular","Navegação ultra-rápida offline","Notificações Push nativas","Interface adaptada para touch","Instalação via navegador (PWA)","Redução de custos com lojas"],
    price: 1500,
  },
  {
    id: 10, essential: false, icon: "DollarSign",
    name: "Gateway & Checkout Digital",
    desc: "Automatize suas cobranças e ofereça pagamentos seguros via Pix, Cartão ou Boleto direto na plataforma.",
    items: ["Checkout transparente integrado","Integração com Stripe/Asaas/Pix","Webhooks de status de pagamento","Gestão de planos e assinaturas","Emissão de recibos automáticos","Segurança PCI Compliance"],
    price: 1500,
  },
];

export const timeline = [
  { phase: "Fase 1", name: "Fundação", modules: "Módulos 1, 2, 5", weeks: "4 semanas" },
  { phase: "Fase 2", name: "Painéis", modules: "Módulos 3, 4", weeks: "4 semanas" },
  { phase: "Fase 3", name: "Estratégico", modules: "Módulos 6, 7, 8", weeks: "4 semanas" },
];

export const infra = [
  { name: "Vercel (Hosting)", desc: "Deploy, CDN, Edge Functions", cost: "Grátis → R$ 100/mês" },
  { name: "Neon (Banco)", desc: "PostgreSQL Serverless", cost: "Grátis → R$ 125/mês" },
  { name: "AWS S3 (Storage)", desc: "Currículos e documentos", cost: "R$ 5-30/mês" },
  { name: "Domínio .com.br", desc: "URL personalizada", cost: "R$ 40/ano" },
];
