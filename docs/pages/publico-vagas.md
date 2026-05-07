# Mural de Vagas e Detalhe de Vaga

## Mural de Vagas

**Caminho:** [src/app/(public)/jobs/page.tsx](src/app/(public)/jobs/page.tsx)
**Acesso:** `/jobs`
**Autenticação:** Não obrigatória

### Descrição
Listagem pública de todas as vagas com status `ACTIVE`. Foco em usabilidade, com filtros que atualizam a URL para permitir compartilhamento de buscas.

### Funcionalidades

#### Busca Multifiltro
Componente [src/components/public/job-filters.tsx](src/components/public/job-filters.tsx) com:
- **Palavra-chave**: busca em título e descrição
- **Localização**: cidade ou estado
- **Tipo de contrato**: CLT, PJ, Estágio, Temporário
- **Nível de experiência**: Júnior, Pleno, Sênior
- **Remoto**: toggle para filtrar apenas vagas remotas

Todos os filtros são query params na URL (ex: `/jobs?q=dev&location=SP&remote=true`), permitindo compartilhamento e retorno à busca pelo botão voltar.

#### Cards de Vaga
Cada card exibe:
- Logo e nome da empresa
- Título da vaga
- Localização + badge "Remoto" se `isRemote: true`
- Faixa salarial (quando informada)
- Tipo de contrato
- Data de publicação (ex: "Há 2 dias")
- Badge de destaque para vagas recentes (< 48h)

#### Paginação
Navegação por lotes de vagas (padrão: 12 por página). Implementada com query param `?page=2`.

### Dados Carregados
Filtros são passados como `searchParams` para o Server Component, que executa a query Prisma com `where` dinâmico. Nenhum fetch client-side.

---

## Detalhe de Vaga

**Caminho:** [src/app/(public)/jobs/[slug]/page.tsx](src/app/(public)/jobs/[slug]/page.tsx)
**Acesso:** `/jobs/[slug]`
**Autenticação:** Não obrigatória

### Descrição
Página completa de uma vaga com todas as informações e o formulário de candidatura.

### Seções

#### Informações da Vaga
- Título, empresa (com logo), localização, tipo de contrato
- Faixa salarial e nível de experiência
- Descrição completa
- Responsabilidades (lista formatada)
- Requisitos (lista formatada)
- Benefícios
- Dicas da Cevan (quando disponíveis)

#### Formulário de Candidatura
Componente [src/components/public/job-application-form.tsx](src/components/public/job-application-form.tsx):

1. **Dados pessoais**: nome e e-mail
2. **Upload do currículo**: PDF enviado diretamente para Cloudflare R2 via presigned URL
3. **Carta de apresentação** (opcional): textarea livre
4. **Submissão**: chama Server Action `applyToJob`

**Validações:**
- E-mail único por vaga (não permite candidatura duplicada — erro Prisma `P2002`)
- URL do currículo validada contra `R2_PUBLIC_DOMAIN` antes de criar a candidatura
- Candidato criado automaticamente no banco se for o primeiro acesso

#### Feedback ao Candidato
Após candidatura enviada com sucesso:
- Mensagem de confirmação
- Orientação sobre próximos passos
- O candidato não recebe e-mail automático (por enquanto)

### Geração de Slug
Cada vaga tem um slug único gerado no momento da criação:
```
slug = titulo-em-kebab-case + "-" + random(5chars)
ex: "desenvolvedor-frontend-pleno-ab3k9"
```

### Metadados SEO
A página gera `title` e `description` dinâmicos a partir dos dados da vaga para indexação no Google.
