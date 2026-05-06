import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.update({
    where: { email: "admin@cevan.com.br" },
    data: { permissions: { set: null } },
  });
  console.log("Usuário atualizado para MASTER:", user.email);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
