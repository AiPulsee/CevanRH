import { PrismaClient, Role, PlanType, JobType, JobStatus, ApplicationStatus, PlacementStatus, CommissionStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando preenchimento do banco de dados...");
  const passwordHash = await bcrypt.hash("123456", 10);

  // 1. Criar Empresas
  const companiesData = [
    { name: "Google Cloud", slug: "google-cloud", industry: "Tecnologia", location: "São Paulo, SP", plan: PlanType.ENTERPRISE },
    { name: "Nubank", slug: "nubank", industry: "Fintech", location: "São Paulo, SP", plan: PlanType.PRO },
    { name: "Stripe", slug: "stripe", industry: "Tecnologia / Pagamentos", location: "Remoto / Global", plan: PlanType.PRO },
    { name: "Ambev", slug: "ambev", industry: "Bebidas", location: "Jaguariúna, SP", plan: PlanType.ENTERPRISE },
    { name: "Magazine Luiza", slug: "magalu", industry: "Varejo", location: "Franca, SP", plan: PlanType.PRO },
    { name: "Cevan RH", slug: "cevan-rh", industry: "Serviços", location: "Goiânia, GO", plan: PlanType.PRO },
  ];

  const companies = await Promise.all(
    companiesData.map(c => prisma.company.upsert({
      where: { slug: c.slug },
      update: { ...c },
      create: { ...c }
    }))
  );

  // 2. Criar Usuários
  const users = [
    { name: "Admin Cevan", email: "admin@cevan.com.br", role: Role.ADMIN },
    { name: "Danilo (RH Google)", email: "rh@google.com", role: Role.EMPLOYER, companyId: companies[0].id },
    { name: "Sarah (RH Nubank)", email: "rh@nubank.com.re", role: Role.EMPLOYER, companyId: companies[1].id },
    { name: "Lucas Dev", email: "dev@talent.com", role: Role.CANDIDATE },
    { name: "Ana Maria", email: "ana@talent.com", role: Role.CANDIDATE },
    { name: "Roberto Silva", email: "roberto@talent.com", role: Role.CANDIDATE },
    { name: "Juliana Costa", email: "ju@talent.com", role: Role.CANDIDATE },
    { name: "Felipe Souza", email: "felipe@talent.com", role: Role.CANDIDATE },
    { name: "Beatriz Oliveira", email: "bia@talent.com", role: Role.CANDIDATE },
  ];

  for (const u of users) {
    await prisma.user.upsert({
      where: { email: u.email },
      update: { role: u.role, password: passwordHash, companyId: u.companyId },
      create: { ...u, password: passwordHash }
    });
  }

  // 3. Criar Vagas
  const jobsData = [
    { title: "Senior Frontend Engineer", slug: "sr-frontend", type: JobType.MANAGED, status: JobStatus.ACTIVE, companyId: companies[0].id },
    { title: "Backend Node.js Developer", slug: "backend-node", type: JobType.MANAGED, status: JobStatus.ACTIVE, companyId: companies[1].id },
    { title: "Product Designer", slug: "prod-designer", type: JobType.SELF_SERVICE, status: JobStatus.ACTIVE, companyId: companies[2].id },
    { title: "Analista Financeiro", slug: "analista-fin", type: JobType.MANAGED, status: JobStatus.ACTIVE, companyId: companies[3].id },
    { title: "Gerente de Marketing", slug: "gerente-mkt", type: JobType.SELF_SERVICE, status: JobStatus.ACTIVE, companyId: companies[4].id },
    { title: "DevOps Engineer", slug: "devops", type: JobType.MANAGED, status: JobStatus.CLOSED, companyId: companies[0].id },
  ];

  const jobs = await Promise.all(
    jobsData.map(j => prisma.job.upsert({
      where: { slug: j.slug },
      update: { ...j, description: "Descrição detalhada da vaga simulada.", location: "Remoto" },
      create: { ...j, description: "Descrição detalhada da vaga simulada.", location: "Remoto" }
    }))
  );

  // 4. Criar Candidaturas
  const candidates = await prisma.user.findMany({ where: { role: Role.CANDIDATE } });
  
  for (const job of jobs) {
    // Cada vaga terá de 2 a 4 candidatos
    const count = Math.floor(Math.random() * 3) + 2;
    const shuffled = [...candidates].sort(() => 0.5 - Math.random());
    
    for (let i = 0; i < count; i++) {
      const candidate = shuffled[i];
      const statusList = [ApplicationStatus.APPLIED, ApplicationStatus.REVIEWING, ApplicationStatus.SHORTLISTED];
      const randomStatus = statusList[Math.floor(Math.random() * statusList.length)];
      
      await prisma.application.upsert({
        where: { jobId_candidateId: { jobId: job.id, candidateId: candidate.id } },
        update: { status: randomStatus },
        create: {
          jobId: job.id,
          candidateId: candidate.id,
          resumeUrl: "https://example.com/resume.pdf",
          coverLetter: "Olá, tenho muito interesse nesta vaga. Segue meu currículo para análise.",
          status: randomStatus
        }
      });
    }
  }

  // 5. Simular Contratações e Alocações
  const managedJobs = jobs.filter(j => j.type === JobType.MANAGED);
  for (let i = 0; i < 2; i++) {
    const job = managedJobs[i];
    const app = await prisma.application.findFirst({ where: { jobId: job.id } });
    
    if (app) {
      await prisma.application.update({
        where: { id: app.id },
        data: { status: ApplicationStatus.HIRED }
      });

      const salary = 800000; // 8k em centavos
      const commissionAmount = salary * 0.5; // 50% de comissão

      const placement = await prisma.placement.upsert({
        where: { applicationId: app.id },
        update: {},
        create: {
          applicationId: app.id,
          status: PlacementStatus.TRIAL,
          monthlySalary: salary,
          startDate: new Date(),
          trialEndDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
          adminNotes: "Candidato excelente, aprovado em todos os testes técnicos."
        }
      });

      await prisma.commission.upsert({
        where: { placementId: placement.id },
        update: {},
        create: {
          placementId: placement.id,
          baseSalary: salary,
          amount: commissionAmount,
          status: i === 0 ? CommissionStatus.PAID : CommissionStatus.PENDING,
          paidAt: i === 0 ? new Date() : null,
          companyId: job.companyId
        }
      });
    }
  }

  console.log("✅ Banco de dados populado com sucesso!");
  console.log("📊 Resumo:");
  console.log(`- Empresas: ${companies.length}`);
  console.log(`- Vagas: ${jobs.length}`);
  console.log(`- Candidatos: ${candidates.length}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
