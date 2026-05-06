import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const ALL_PERMS = [
  "PAINEL", "ANALYTICS", "RESUMES", "MANAGED", "PLACEMENTS", "FINANCE", "COMPANIES", "USERS", "SETTINGS"
];

async function main() {
  const user = await prisma.user.update({
    where: { email: "admin@cevan.com.br" },
    data: { permissions: { set: ALL_PERMS } },
  });
  console.log("Usuário atualizado com TODAS as permissões:", user.email);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
