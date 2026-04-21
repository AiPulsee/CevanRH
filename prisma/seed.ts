import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // 1. Criar uma Empresa de Teste
  const company = await prisma.company.upsert({
    where: { slug: "google-cloud" },
    update: {},
    create: {
      name: "Google Cloud",
      slug: "google-cloud",
      description: "Líder mundial em tecnologia de nuvem.",
      plan: "PRO",
    },
  });

  // 2. Usuário ADMIN (CevanRH Internal)
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
    update: { role: "EMPLOYER", companyId: company.id },
    create: {
      name: "Danilo (RH Google)",
      email: "rh@google.com",
      role: "EMPLOYER",
      companyId: company.id,
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

  console.log("✅ Usuários criados para teste:");
  console.log("- ADMIN: admin@cevan.com.br");
  console.log("- EMPLOYER: rh@google.com");
  console.log("- CANDIDATE: dev@talent.com");
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
