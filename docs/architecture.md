# Arquitetura Técnica - CevanRH

O CevanRH é uma plataforma moderna construída com o ecossistema Next.js, focada em performance, escalabilidade e facilidade de manutenção.

## 🛠️ Tech Stack
- **Framework**: [Next.js 14+](https://nextjs.org/) (App Router)
- **Linguagem**: [TypeScript](https://www.typescriptlang.org/)
- **Banco de Dados**: [PostgreSQL](https://www.postgresql.org/) com [Prisma ORM](https://www.prisma.io/)
- **Autenticação**: [NextAuth.js](https://next-auth.js.org/)
- **Estilização**: [Tailwind CSS](https://tailwindcss.com/)
- **Componentes UI**: [Radix UI](https://www.radix-ui.com/) + [Shadcn/UI](https://ui.shadcn.com/)
- **Animações**: [Framer Motion](https://www.framer.com/motion/)
- **IA**: [Google Gemini Pro](https://ai.google.dev/) (via `@google/generative-ai`)
- **Gestão de Datas**: [date-fns](https://date-fns.org/)

## 📁 Estrutura de Pastas
- `src/app`: Rotas, layouts e páginas do Next.js.
- `src/components`: Componentes React reutilizáveis.
  - `admin/`: Componentes específicos do painel administrativo.
  - `public/`: Componentes do portal do candidato.
  - `ui/`: Componentes de base (botões, inputs, modais).
- `src/actions`: Server Actions para mutação de dados e lógica de negócio.
- `src/lib`: Configurações de bibliotecas (Prisma, Auth, AI).
- `src/types`: Definições de tipos TypeScript.
- `prisma/`: Schema do banco de dados e scripts de seed.

## 🚀 Como Rodar o Projeto
1. Instale as dependências: `npm install`
2. Configure o arquivo `.env` (DATABASE_URL, NEXTAUTH_SECRET, GOOGLE_GEMINI_API_KEY).
3. Sincronize o banco: `npx prisma db push`
4. Popule os dados iniciais: `npx prisma db seed`
5. Inicie o servidor: `npm run dev`
