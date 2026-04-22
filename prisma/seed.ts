import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // 1. Criar Empresas de Teste
  const google = await prisma.company.upsert({
    where: { slug: "google-cloud" },
    update: {},
    create: {
      name: "Google Cloud",
      slug: "google-cloud",
      description: "Líder mundial em tecnologia de nuvem e infraestrutura escalável.",
      industry: "Tecnologia",
      location: "São Paulo, SP",
      plan: "PRO",
    },
  });

  const nubank = await prisma.company.upsert({
    where: { slug: "nubank" },
    update: {},
    create: {
      name: "Nubank",
      slug: "nubank",
      description: "O maior banco digital do mundo, focado em simplificar a vida financeira.",
      industry: "Fintech",
      location: "São Paulo, SP",
      plan: "PRO",
    },
  });

  const stripe = await prisma.company.upsert({
    where: { slug: "stripe" },
    update: {},
    create: {
      name: "Stripe",
      slug: "stripe",
      description: "Infraestrutura financeira para a internet.",
      industry: "Tecnologia / Pagamentos",
      location: "Remoto / Global",
      plan: "PRO",
    },
  });

  // 2. Usuário ADMIN (Cevan Serviços Empresariais Internal)
  await prisma.user.upsert({
    where: { email: "admin@cevan.com.br" },
    update: { role: "ADMIN" },
    create: {
      name: "Cevan Admin",
      email: "admin@cevan.com.br",
      role: "ADMIN",
    },
  });

  // 3. Usuário EMPLOYER (Empresa / RH)
  await prisma.user.upsert({
    where: { email: "rh@google.com" },
    update: { role: "EMPLOYER", companyId: google.id },
    create: {
      name: "Danilo (RH Google)",
      email: "rh@google.com",
      role: "EMPLOYER",
      companyId: google.id,
    },
  });

  // 4. Usuário CANDIDATE (Candidato / Talento)
  await prisma.user.upsert({
    where: { email: "dev@talent.com" },
    update: { role: "CANDIDATE" },
    create: {
      name: "Lucas Dev",
      email: "dev@talent.com",
      role: "CANDIDATE",
    },
  });

  // 5. Criar Vagas de Exemplo
  const jobs = [
    {
      title: "Senior Frontend Engineer",
      slug: "senior-frontend-engineer",
      description: "Estamos em busca de um Engenheiro Frontend Sênior para liderar o desenvolvimento de interfaces modernas e escaláveis. Você trabalhará em produtos globais de alta visibilidade.",
      requirements: "• Experiência sólida com React, Next.js e TypeScript\n• Conhecimento profundo em CSS e performance web\n• Experiência com Design Systems e acessibilidade",
      benefits: "• Plano de Saúde Premium Bradesco\n• Vale Refeição de R$ 1.200,00\n• Auxílio Home Office mensal\n• Horário flexível",
      responsibilities: "• Liderar o desenvolvimento de novas features\n• Realizar code reviews e mentoria para devs junior/pleno\n• Garantir a qualidade e performance das interfaces",
      tips: "Foque em demonstrar seus projetos reais em Next.js durante a entrevista técnica.",
      location: "Remoto / SP",
      isRemote: true,
      salaryRange: "R$ 15k - 22k",
      type: "MANAGED" as const,
      status: "ACTIVE" as const,
    },
    {
      title: "Backend Developer (Node.js)",
      slug: "backend-developer-node-js",
      description: "Oportunidade para desenvolvedores apaixonados por sistemas distribuídos e alta performance. Você ajudará a escalar nossa infraestrutura para milhões de usuários.",
      requirements: "• Node.js avançado (Event Loop, Streams, etc)\n• PostgreSQL e Redis\n• Experiência com Docker e Kubernetes\n• Arquitetura de microsserviços",
      benefits: "• Salário competitivo em dólar\n• Stock Options\n• Bônus anual por performance\n• Seguro de vida internacional",
      responsibilities: "• Desenvolver APIs escaláveis e seguras\n• Otimizar queries e processos de banco de dados\n• Colaborar no design da arquitetura de sistemas",
      tips: "Dê atenção especial ao funcionamento interno do Node.js nos testes técnicos.",
      location: "Remoto (Global)",
      isRemote: true,
      salaryRange: "R$ 20k - 30k",
      type: "MANAGED" as const,
      status: "ACTIVE" as const,
    },
    {
      title: "Product Designer (UX/UI)",
      slug: "product-designer-ux-ui",
      description: "Venha desenhar o futuro dos nossos produtos digitais. Procuramos alguém com olhar crítico para UX e habilidades excepcionais em UI.",
      requirements: "• Domínio avançado do Figma\n• Experiência com Design Systems complexos\n• Habilidade em prototipagem de alta fidelidade\n• Portfólio demonstrando cases de sucesso",
      benefits: "• Kit de equipamentos Apple\n• Auxílio educação e cursos\n• Gympass\n• Cultura de feedback constante",
      responsibilities: "• Criar interfaces intuitivas e esteticamente agradáveis\n• Realizar testes de usabilidade com usuários reais\n• Manter e evoluir o nosso Design System",
      tips: "Apresente cases de UX que mostrem o problema resolvido, não apenas telas bonitas.",
      location: "São Paulo, SP",
      isRemote: false,
      salaryRange: "R$ 10k - 14k",
      type: "SELF_SERVICE" as const,
      status: "ACTIVE" as const,
    }
  ];

  for (const jobData of jobs) {
    await prisma.job.upsert({
      where: { slug: jobData.slug },
      update: { ...jobData, companyId: google.id },
      create: { ...jobData, companyId: google.id },
    });
  }

  console.log("✅ Usuários e vagas criados para teste:");
  console.log("- ADMIN: admin@cevan.com.br");
  console.log("- EMPLOYER: rh@google.com");
  console.log("- CANDIDATE: dev@talent.com");
  console.log("- Vagas criadas:", jobs.length);
  console.log("Senha para todos: 123456 (Mock)");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
