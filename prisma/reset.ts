import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🧹 Limpando banco de dados...");

  await prisma.commission.deleteMany({});
  await prisma.placement.deleteMany({});
  await prisma.shortlist.deleteMany({});
  await prisma.application.deleteMany({});
  await prisma.job.deleteMany({});
  await prisma.notification.deleteMany({});
  await prisma.auditLog.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.company.deleteMany({});
  await prisma.setting.deleteMany({});

  console.log("✅ Banco limpo!");

  const passwordHash = await bcrypt.hash("c3v2n@", 10);

  await prisma.user.create({
    data: {
      name: "Cevan Admin",
      email: "cevan@grupocevan.com.br",
      password: passwordHash,
      role: Role.ADMIN,
      permissions: ["MANAGED", "RESUMES", "COMPANIES", "PLACEMENTS", "ANALYTICS", "FINANCE", "USERS", "SETTINGS"],
    },
  });

  console.log("✅ Usuário criado com sucesso!");
  console.log("   Email: cevan@grupocevan.com.br");
  console.log("   Senha: c3v2n@");
  console.log("   Role:  ADMIN (todas as permissões)");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
