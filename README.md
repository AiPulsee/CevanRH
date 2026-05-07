# CevanRH — Plataforma de Recrutamento Inteligente

Sistema ATS (Applicant Tracking System) completo desenvolvido para a **Cevan Serviços Empresariais**, combinando triagem automatizada por IA com curadoria humana especializada.

---

## Visão Geral

O CevanRH opera em dois modelos de serviço simultâneos:

- **Self-Service**: A empresa publica vagas e gerencia candidatos de forma autônoma.
- **Managed (Curadoria)**: A equipe Cevan conduz a triagem completa — a IA analisa os currículos, os consultores validam, e apenas os melhores perfis são entregues ao cliente.

O sistema gera comissão automaticamente (padrão: 50% do 1º salário) quando um candidato é efetivado.

---

## Tech Stack

| Camada | Tecnologia |
|---|---|
| Framework | Next.js (App Router) + TypeScript |
| Banco de Dados | PostgreSQL via Prisma ORM |
| Autenticação | NextAuth.js (credenciais + OAuth) |
| IA / Triagem | Groq API — modelo `llama-3.3-70b-versatile` |
| Storage de Currículos | Cloudflare R2 |
| UI | Tailwind CSS + Radix UI / Shadcn |
| Animações | Framer Motion |

---

## Configuração do Ambiente

### 1. Instalar dependências

```bash
npm install
```

### 2. Variáveis de ambiente

Crie o arquivo `.env` na raiz com as seguintes chaves:

```env
# Banco de dados
DATABASE_URL="postgresql://user:password@host:5432/cevanrh"

# Autenticação
NEXTAUTH_SECRET="seu-secret-aqui"
NEXTAUTH_URL="http://localhost:3000"

# IA — Groq
GROQ_API_KEY="gsk_..."

# Storage — Cloudflare R2
R2_ACCOUNT_ID="..."
R2_ACCESS_KEY_ID="..."
R2_SECRET_ACCESS_KEY="..."
R2_BUCKET_NAME="cevanrh-uploads"
R2_PUBLIC_DOMAIN="https://pub-xxx.r2.dev"
```

### 3. Preparar o banco de dados

```bash
# Aplicar o schema
npx prisma db push

# Popular dados iniciais (opcional)
npx prisma db seed
```

### 4. Iniciar o servidor

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

---

## Estrutura de Rotas

### Área Pública (`/`)
| Rota | Descrição |
|---|---|
| `/` | Landing page — hero, vagas em destaque, CTAs |
| `/jobs` | Mural de vagas com filtros |
| `/jobs/[slug]` | Detalhe da vaga + formulário de candidatura |
| `/servicos` | Apresentação dos serviços Cevan |
| `/grupo-cevan` | Apresentação do grupo |
| `/how-it-works` | Como funciona o processo |
| `/about` | Sobre a empresa |

### Painel Admin (`/admin`) — Role: ADMIN
| Rota | Descrição |
|---|---|
| `/admin` | Dashboard principal — KPIs e visão geral |
| `/admin/managed` | Curadoria ativa — triagem de vagas Managed |
| `/admin/placements` | Alocações — gestão de contratos e períodos de experiência |
| `/admin/finance` | Finanças — controle de comissões |
| `/admin/analytics` | Relatórios — funil de conversão e gráficos de crescimento |
| `/admin/companies` | Empresas clientes cadastradas |
| `/admin/resumes` | Banco global de currículos |
| `/admin/settings` | Configurações do sistema |

---

## Fluxo Principal de Recrutamento

```
Candidato aplica via /jobs/[slug]
        ↓
Currículo enviado ao Cloudflare R2
        ↓
Application criada (status: APPLIED)
        ↓  Admin executa análise de IA
IA (Groq) retorna score 0–100 + recommendation + strengths + concerns
        ↓  Admin aprova
Application → SHORTLISTED  →  Shortlist record criado com adminFeedback
        ↓  Admin contrata
Application → HIRED
        ↓
Placement criado (status: TRIAL, 90 dias)
        ↓  Empresa confirma efetivação
Placement → EFFECTIVE
        ↓
Commission criada automaticamente (padrão 50% do 1º salário)
        ↓
Ciclo: PENDING → INVOICED → PAID
```

---

## Scripts Disponíveis

```bash
npm run dev       # Servidor de desenvolvimento
npm run build     # Build de produção
npm run start     # Servidor de produção
npm run lint      # Verificação ESLint
npx prisma studio # Interface visual do banco de dados
```
