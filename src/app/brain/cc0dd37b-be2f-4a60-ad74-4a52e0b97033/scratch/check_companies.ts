import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const companies = await prisma.company.findMany()
  console.log(`Total companies: ${companies.length}`)
  console.log(JSON.stringify(companies, null, 2))
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
