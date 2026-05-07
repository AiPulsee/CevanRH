# Arquitetura Técnica — CevanRH

O CevanRH é construído sobre o ecossistema Next.js com App Router, priorizando performance de servidor e separação clara entre lógica de negócio e interface.

---

## Tech Stack

| Categoria | Tecnologia | Finalidade |
|---|---|---|
| Framework | Next.js (App Router) | Roteamento, SSR, Server Actions |
| Linguagem | TypeScript | Tipagem estática em todo o projeto |
| Banco de Dados | PostgreSQL + Prisma ORM | Persistência relacional com migrations |
| Autenticação | NextAuth.js | Sessões, roles e proteção de rotas |
| IA / LLM | Groq API (`llama-3.3-70b-versatile`) | Triagem inteligente de currículos |
| Extração de PDF | `pdf-parse` | Leitura do texto de currículos em PDF |
| Storage | Cloudflare R2 | Upload e hospedagem de arquivos de currículo |
| Estilização | Tailwind CSS | Utility-first CSS |
| Componentes UI | Radix UI + Shadcn/UI | Acessibilidade e consistência visual |
| Animações | Framer Motion | Transições de interface |
| Validação | Zod | Validação de schemas em Server Actions |
| Datas | date-fns | Formatação e cálculos de datas |

---

## Estrutura de Pastas

```
src/
├── app/
│   ├── (admin)/admin/        # Painel administrativo — protegido por role ADMIN
│   │   ├── page.tsx          # Dashboard principal
│   │   ├── managed/          # Curadoria de vagas Managed
│   │   ├── placements/       # Gestão de alocações e períodos de experiência
│   │   ├── finance/          # Controle de comissões
│   │   ├── analytics/        # Relatórios e funil de conversão
│   │   ├── companies/        # Gestão de empresas clientes
│   │   ├── resumes/          # Banco global de currículos
│   │   └── settings/         # Configurações do sistema
│   ├── (public)/             # Área pública — sem autenticação obrigatória
│   │   ├── page.tsx          # Landing page
│   │   ├── jobs/             # Mural de vagas e detalhe de vaga
│   │   ├── servicos/         # Apresentação de serviços
│   │   ├── grupo-cevan/      # Sobre o Grupo Cevan
│   │   └── how-it-works/     # Como funciona o processo
│   ├── layout.tsx            # Layout raiz (fonte, tema)
│   ├── robots.ts             # Configuração de robots.txt
│   └── sitemap.ts            # Geração dinâmica do sitemap
├── actions/                  # Server Actions (lógica de negócio no servidor)
│   ├── applications.ts       # Candidaturas: aplicar, aprovar, reprovar, shortlist
│   ├── jobs.ts               # Vagas: criar, atualizar, deletar
│   ├── ai-analysis.ts        # Triagem por IA via Groq
│   ├── placements.ts         # Alocações: criar, efetivação, encerramento
│   ├── notifications.ts      # Sistema de notificações internas
│   ├── settings.ts           # Leitura e escrita de configurações
│   ├── auth.ts               # Registro e autenticação de usuários
│   ├── users.ts              # Gestão de usuários e permissões
│   ├── upload.ts             # Upload de arquivos para Cloudflare R2
│   └── generate-job.ts       # Geração de vagas assistida por IA
├── components/
│   ├── admin/                # Componentes exclusivos do painel admin
│   ├── public/               # Componentes do portal público
│   ├── dashboard/            # Componentes compartilhados de dashboard
│   └── ui/                   # Componentes base (Button, Card, Modal, etc.)
├── lib/
│   ├── auth.ts               # Configuração do NextAuth (handlers + session)
│   ├── auth.config.ts        # Providers, callbacks e proteção de rotas
│   └── prisma.ts             # Instância singleton do PrismaClient
└── types/                    # Definições TypeScript customizadas
prisma/
├── schema.prisma             # Schema completo do banco de dados
└── seed.ts                   # Script de seed para dados iniciais
```

---

## Padrão de Autenticação e Roles

O sistema utiliza três roles com controle de acesso progressivo:

| Role | Acesso | Descrição |
|---|---|---|
| `ADMIN` | Painel `/admin` completo | Consultores e operadores da Cevan |
| `EMPLOYER` | Dashboard da empresa | Colaboradores de empresas clientes |
| `CANDIDATE` | Área do candidato | Criado automaticamente ao aplicar para uma vaga |

Permissões granulares adicionais são armazenadas como array de strings no campo `permissions` do modelo `User`, checadas em componentes específicos do painel admin.

---

## Motor de IA — Groq / Llama 3.3

A triagem automatizada usa a **Groq API** com o modelo `llama-3.3-70b-versatile`.

### Fluxo de análise
1. Admin clica em "Analisar com IA" no modal de triagem.
2. O Server Action `analyzeCandidate` é chamado com o `applicationId`.
3. O currículo PDF é baixado da URL do R2 e seu texto é extraído com `pdf-parse` (limite de 6.000 caracteres).
4. O sistema monta um prompt com contexto da vaga + texto do currículo + carta de apresentação.
5. A Groq retorna um JSON estruturado com: `score`, `recommendation`, `strengths`, `concerns`, `summary`.
6. Resultado exibido no modal sem persistência em banco (análise sob demanda).

### Critérios de pontuação (score 0–100)
| Faixa | Significado |
|---|---|
| 85–100 | Experiência direta nos requisitos principais |
| 70–84 | Boa aderência, maioria dos requisitos evidenciada |
| 50–69 | Experiência relevante com lacunas |
| 30–49 | Fit incerto — requer entrevista confirmatória |
| 0–29 | Candidato claramente inadequado |

### Resiliência
- Timeout de 8 segundos no download do PDF.
- Tratamento explícito de erros 429 (rate limit), 401/403 (API key inválida).
- Se o PDF não for legível e não houver carta, a análise é bloqueada com mensagem clara.

---

## Upload de Arquivos — Cloudflare R2

Todos os currículos são enviados diretamente para um bucket R2 via presigned URL.

- A URL pública do arquivo é validada contra `R2_PUBLIC_DOMAIN` antes de criar uma candidatura.
- Isso impede que candidaturas sejam criadas com URLs externas ou falsas.

---

## Server Actions

Toda a mutação de dados passa por Server Actions em `src/actions/`. Cada action:
1. Verifica a sessão via `auth()`.
2. Checa o role necessário (ex: `role !== "ADMIN"`).
3. Valida os dados de entrada com Zod (quando aplicável).
4. Executa a query Prisma.
5. Chama `revalidatePath()` nas rotas afetadas.

---

## Como Rodar o Projeto

```bash
# 1. Instalar dependências
npm install

# 2. Configurar variáveis de ambiente
cp .env.example .env
# Editar .env com DATABASE_URL, NEXTAUTH_SECRET, GROQ_API_KEY, R2_*

# 3. Aplicar schema no banco
npx prisma db push

# 4. Seed (opcional)
npx prisma db seed

# 5. Iniciar
npm run dev
```
