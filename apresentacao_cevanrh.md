# CevanRH — Apresentação do Sistema

## Uma Plataforma ATS de Nova Geração com Curadoria Humana

Este documento apresenta o funcionamento, a arquitetura e os diferenciais do sistema **CevanRH**, projetado como solução exclusiva que une Inteligência Artificial com a expertise humana da **Cevan Serviços Empresariais**.

---

## 1. O Conceito Central

O CevanRH não é apenas um portal de vagas. É um **ATS (Applicant Tracking System)** completo, operando simultaneamente em dois modelos de serviço:

**Problema 1 → Excesso de currículos irrelevantes**
Resolvido pela Triagem de IA: o sistema lê o currículo, avalia compatibilidade com a vaga e gera um score de 0 a 100 com pontos fortes e de atenção, em segundos.

**Problema 2 → Lentidão para criar anúncios de vagas**
Resolvido pelo Gerador de Vagas com IA: a empresa informa o título e a IA produz uma descrição profissional completa.

**Problema 3 → Falta de tempo do RH para triagem profunda**
Resolvido pelo serviço de **Curadoria Premium (Managed)**: a equipe Cevan conduz toda a triagem e entrega apenas os melhores perfis para o cliente.

---

## 2. Os Dois Modelos de Serviço

### Self-Service
A empresa publica a vaga diretamente no portal. A vaga aparece publicamente em `/jobs`, recebe candidatos e a empresa gerencia o processo. O sistema oferece suporte de IA na triagem, mas a decisão e o contato são da empresa.

### Managed (Curadoria)
A empresa contrata a Cevan para gerenciar o processo de ponta a ponta:
1. A Cevan cria a vaga (pode usar o Gerador de IA).
2. O portal recebe candidatos.
3. Os consultores Cevan analisam cada currículo com suporte de IA.
4. Apenas os candidatos pré-aprovados são indicados ao cliente.
5. A contratação é registrada e a comissão gerada automaticamente.

---

## 3. O Fluxo de Recrutamento Completo

```
CANDIDATO                      SISTEMA                        CONSULTORES CEVAN
─────────                      ───────                        ────────────────
Acessa /jobs
Filtra vagas
Clica na vaga
                         Página de detalhes
Preenche formulário
Envia currículo (PDF)
                         Upload → Cloudflare R2
                         Candidatura criada (APPLIED)
                         Notificação para admin
                                                    Admin vê na fila de triagem
                                                    Clica "Analisar com IA"
                         IA extrai texto do PDF
                         Prompt montado com vaga + currículo
                         Groq API → score + análise
                                                    Admin lê análise
                                                    Decide: Aprovar / Reprovar
                                                    ↓ Aprovar
                         Status → SHORTLISTED
                         Shortlist record criado
                                                    Cliente recebe indicação
                                                    Empresa contrata
                                                    Admin registra contratação
                         Application → HIRED
                         Placement criado (TRIAL)
                         [90 dias depois]
                         Empresa confirma efetivação
                         Placement → EFFECTIVE
                         Commission gerada (50% do 1º salário)
```

---

## 4. O Motor de IA

O sistema utiliza a **Groq API** com o modelo `llama-3.3-70b-versatile` — um dos LLMs mais rápidos disponíveis para inferência, garantindo análise em menos de 3 segundos por candidato.

### O que a IA entrega

Para cada candidatura analisada, o sistema retorna:

| Campo | Descrição |
|---|---|
| `score` | Nota de 0 a 100 de compatibilidade com a vaga |
| `recommendation` | `APPROVE`, `MAYBE` ou `REJECT` |
| `strengths` | 2–3 pontos positivos concretos do perfil |
| `concerns` | 1–2 pontos de atenção identificados |
| `summary` | Um parágrafo com o parecer final do recrutador virtual |

### Como a IA é alimentada
1. O PDF do currículo é baixado da URL do R2 e seu texto é extraído.
2. O sistema combina: título da vaga, descrição, requisitos, responsabilidades + texto do currículo + carta de apresentação.
3. A IA é instruída como "especialista sênior em recrutamento da Cevan RH".
4. A resposta é um JSON estruturado — sem texto livre, sem ambiguidade.

---

## 5. Painel Administrativo — A Central de Operações

O painel admin (`/admin`) é onde a equipe Cevan trabalha. Suas áreas:

### Dashboard Principal
Visão instantânea da operação: KPIs de faturamento mensal, meta de colocações, candidatos em triagem, vagas ativas. Gráfico de evolução mensal.

### Curadoria Ativa (`/admin/managed`)
Lista todas as vagas Managed. Para cada vaga: botão de triagem que abre o modal com análise de IA. Ações: indicar ao cliente, reprovar, contratar.

### Alocações (`/admin/placements`)
Controle completo dos candidatos contratados. Monitora quem está no período de experiência, quais vencem nos próximos 7 dias (alerta vermelho pulsante), taxa de efetivação e receita potencial em andamentos.

### Finanças (`/admin/finance`)
Ciclo completo das comissões: PENDING → INVOICED → PAID. Exibe valor total a receber, pendentes aguardando NF, faturados aguardando pagamento, total histórico recebido.

### Relatórios (`/admin/analytics`)
Funil de conversão visual (Candidaturas → Revisão → Selecionados → Contratados → Efetivados). Gráficos de volume de candidaturas e novas empresas por mês. Distribuição Managed x Self-Service. Índices: candidaturas por vaga, vagas por empresa.

### Banco de Currículos (`/admin/resumes`)
Base global de todos os currículos recebidos. Busca por nome, e-mail ou cargo. Filtro por tipo (Managed/Self-Service). Exportação para Excel.

---

## 6. Modelo Financeiro

### Geração da Comissão
Quando um Placement é efetivado, o sistema cria automaticamente uma Commission com:
- `baseSalary` = salário registrado no Placement
- `percentage` = configuração `managed.fee_percentage` (padrão: 50%)
- `amount` = `baseSalary * percentage / 100`

### Exemplo
Candidato efetivado com salário de R$ 4.000:
- Commission gerada: R$ 2.000 (50% do 1º salário)
- Status inicial: `PENDING`
- Admin emite NF → status `INVOICED`
- Empresa paga → status `PAID`

O percentual de comissão é editável em `/admin/settings` sem necessidade de deploy.

---

## 7. Configurações do Sistema

Editáveis pelo admin sem código, via `/admin/settings`:

| Configuração | Descrição |
|---|---|
| Taxa de comissão | Percentual sobre o 1º salário (padrão 50%) |
| Bloquear registros | Impede novos cadastros públicos |
| 2FA obrigatório | Exige autenticação de dois fatores |
| SMTP | Configurações de envio de e-mail |

---

## 8. Tecnologia e Escalabilidade

- **Next.js com App Router**: Renderização no servidor — páginas carregam dados antes de chegar ao browser.
- **Server Actions**: Toda mutação de dados acontece no servidor, nunca exposta ao cliente.
- **Cloudflare R2**: Storage global de baixa latência para currículos.
- **PostgreSQL**: Banco relacional com constraints e índices otimizados para queries de recrutamento.
- **Prisma ORM**: Schema como fonte de verdade — migrations controladas e tipagem automática.

A arquitetura suporta de 10 a 10.000 empresas sem mudanças estruturais, escalando horizontalmente nos serviços de nuvem.
