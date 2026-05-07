# Modelo de Dados — CevanRH

Schema completo do banco de dados PostgreSQL gerenciado pelo Prisma ORM.

---

## Diagrama de Relacionamentos

```
User ──────────────── Application ──── Job ──── Company
                           │
                      ┌────┴────┐
                   Shortlist  Placement ──── Commission
                                   │
                              (Registra efetivação e gera comissão)

Transaction     (pagamentos Stripe — standalone)
Setting         (configurações chave-valor)
AuditLog        (log de ações administrativas)
Notification    (alertas internos para admins)
```

---

## Entidades

### User
Representa candidatos, colaboradores de empresas e administradores da Cevan.

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | String (UUID) | Identificador único |
| `name` | String? | Nome completo |
| `email` | String (unique) | E-mail — chave de login |
| `password` | String? | Hash bcrypt — null para OAuth |
| `image` | String? | URL do avatar |
| `role` | `Role` | `ADMIN`, `EMPLOYER` ou `CANDIDATE` |
| `companyId` | String? | FK para `Company` (null para candidatos livres) |
| `permissions` | String[] | Permissões granulares adicionais para ADMINs |
| `createdAt` | DateTime | Data de cadastro |

**Nota:** Candidatos são criados automaticamente no momento da primeira candidatura, sem necessidade de registro prévio.

---

### Company
Empresas clientes que publicam vagas e utilizam os serviços da Cevan.

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | String (UUID) | Identificador único |
| `name` | String | Nome da empresa |
| `slug` | String (unique) | URL-friendly — usado nas rotas públicas |
| `logoUrl` | String? | URL da logomarca |
| `website` | String? | Site oficial |
| `description` | String? | Descrição da empresa |
| `stripeId` | String? | ID do cliente no Stripe para cobrança |
| `industry` | String? | Setor de atuação |
| `location` | String? | Localização sede |
| `email` | String? | E-mail de contato principal |

---

### Job (Vaga)
Oportunidade de emprego publicada por uma empresa.

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | String (UUID) | Identificador único |
| `title` | String | Título da vaga |
| `slug` | String (unique) | URL-friendly gerado automaticamente |
| `description` | String | Descrição completa |
| `location` | String | Localização do trabalho |
| `isRemote` | Boolean | Indica trabalho remoto |
| `salaryRange` | String? | Faixa salarial (ex: "R$ 3.000 – R$ 5.000") |
| `type` | `JobType` | `SELF_SERVICE` ou `MANAGED` |
| `status` | `JobStatus` | `DRAFT`, `ACTIVE`, `CLOSED` ou `ARCHIVED` |
| `requirements` | String? | Requisitos técnicos e comportamentais |
| `responsibilities` | String? | Responsabilidades do cargo |
| `benefits` | String? | Benefícios oferecidos |
| `tips` | String? | Dicas para candidatos — usado pela IA |
| `contractType` | String? | CLT, PJ, Estágio, etc. |
| `experienceLevel` | String? | Júnior, Pleno, Sênior, etc. |
| `companyId` | String | FK para `Company` — cascade delete |

---

### Application (Candidatura)
Vínculo entre um candidato e uma vaga. Núcleo do fluxo de recrutamento.

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | String (UUID) | Identificador único |
| `resumeUrl` | String | URL do currículo no Cloudflare R2 |
| `coverLetter` | String? | Carta de apresentação (texto livre) |
| `status` | `ApplicationStatus` | Etapa atual no funil |
| `jobId` | String | FK para `Job` |
| `candidateId` | String | FK para `User` |

**Constraint**: `(jobId, candidateId)` é único — um candidato não pode aplicar duas vezes à mesma vaga.

**Ciclo de status:**
```
APPLIED → REVIEWING → SHORTLISTED → INTERVIEW → HIRED
                                  ↘ REJECTED (qualquer etapa)
```

---

### Shortlist
Registro de quando um admin indica um candidato ao cliente (vagas Managed).

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | String (UUID) | Identificador único |
| `applicationId` | String (unique) | FK para `Application` |
| `adminFeedback` | String? | Comentário interno do consultor |
| `clientReview` | String? | Feedback da empresa cliente |
| `isApproved` | Boolean? | `true` = cliente aprovou, `false` = recusou, `null` = pendente |

---

### Placement (Alocação)
Criado quando um candidato é contratado. Gerencia o período de experiência e a efetivação.

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | String (UUID) | Identificador único |
| `applicationId` | String (unique) | FK para `Application` |
| `status` | `PlacementStatus` | `TRIAL`, `EFFECTIVE`, `TERMINATED` ou `CANCELLED` |
| `monthlySalary` | Int | Salário mensal em **centavos** (ex: 500000 = R$ 5.000) |
| `startDate` | DateTime | Data de início |
| `trialEndDate` | DateTime | Fim do período de experiência (normalmente 90 dias) |
| `effectiveDate` | DateTime? | Data de efetivação (preenchida quando EFFECTIVE) |
| `terminationDate` | DateTime? | Data de desligamento |
| `terminationReason` | String? | Motivo do desligamento |
| `adminNotes` | String? | Notas internas do consultor |
| `companyFeedback` | String? | Avaliação da empresa sobre o candidato |

**Ciclo de status:**
```
TRIAL → EFFECTIVE   (empresa confirma efetivação → Commission gerada)
      → TERMINATED  (candidato ou empresa encerram antes do prazo)
      → CANCELLED   (alocação cancelada antes de iniciar)
```

---

### Commission (Comissão)
Gerada automaticamente quando um Placement é efetivado. Controla o ciclo financeiro.

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | String (UUID) | Identificador único |
| `placementId` | String (unique) | FK para `Placement` |
| `baseSalary` | Int | Salário base em centavos |
| `percentage` | Float | Percentual da comissão (padrão: 50.0) |
| `amount` | Int | Valor calculado em centavos (`baseSalary * percentage / 100`) |
| `status` | `CommissionStatus` | Etapa do ciclo financeiro |
| `invoiceNumber` | String? | Número da nota fiscal emitida |
| `dueDate` | DateTime? | Vencimento da fatura |
| `paidAt` | DateTime? | Data efetiva do pagamento |
| `companyId` | String | FK direto para `Company` (para queries financeiras rápidas) |

**Ciclo de status:**
```
PENDING → INVOICED → PAID
        → WAIVED   (comissão dispensada pelo admin)
```

**Configuração**: O percentual padrão (50%) é configurável via `Setting` com chave `managed.fee_percentage`.

---

### Transaction
Registro de pagamentos processados via Stripe. Standalone — não relacionado diretamente a Commission.

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | String (UUID) | Identificador único |
| `amount` | Int | Valor em centavos |
| `currency` | String | Moeda (padrão: "BRL") |
| `status` | String | Status vindo do Stripe |
| `provider` | String | Provedor do pagamento (ex: "stripe") |
| `providerId` | String (unique) | ID da transação no provedor |
| `companyId` | String | Empresa que realizou o pagamento |

---

### Setting
Store chave-valor para configurações do sistema editáveis pelo admin.

| Chave | Valor Padrão | Descrição |
|---|---|---|
| `managed.fee_percentage` | `"50"` | Percentual de comissão sobre o 1º salário |
| `security.2fa_required` | `"false"` | Exige autenticação de dois fatores |
| `security.block_registrations` | `"false"` | Bloqueia novos cadastros públicos |
| `smtp.server` | — | Servidor SMTP para envio de e-mails |
| `smtp.port` | — | Porta do servidor SMTP |
| `smtp.encryption` | — | Tipo de criptografia (TLS/SSL) |

---

### AuditLog
Registro imutável de ações administrativas relevantes para auditoria.

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | String (UUID) | Identificador único |
| `action` | String | Nome da ação executada |
| `details` | String? | Detalhes adicionais da ação |
| `userId` | String? | Usuário que executou (null = sistema) |
| `createdAt` | DateTime | Timestamp da ação |

---

### Notification
Alertas internos exibidos no painel admin. Criados automaticamente por eventos do sistema.

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | String (UUID) | Identificador único |
| `title` | String | Título curto da notificação |
| `message` | String | Mensagem completa |
| `type` | String | `INFO`, `SUCCESS`, `WARNING`, `ERROR` |
| `isRead` | Boolean | Se foi lida pelo admin |
| `userId` | String? | Destinatário (null = todos os admins) |
| `createdAt` | DateTime | Timestamp de criação |

**Trigger automático**: Toda nova candidatura gera uma notificação do tipo `SUCCESS` para os admins.

---

## Enumerações (Enums)

### Role
| Valor | Descrição |
|---|---|
| `ADMIN` | Consultores/operadores da Cevan — acesso total ao painel admin |
| `EMPLOYER` | Colaboradores de empresas clientes — acesso ao dashboard da empresa |
| `CANDIDATE` | Candidatos a vagas — criados automaticamente ao se candidatar |

### JobType
| Valor | Descrição |
|---|---|
| `SELF_SERVICE` | Vaga gerida pela própria empresa — aparece publicamente em `/jobs` |
| `MANAGED` | Vaga sob curadoria da Cevan — triagem conduzida pelos consultores |

### JobStatus
| Valor | Descrição |
|---|---|
| `DRAFT` | Rascunho — não aparece no portal público |
| `ACTIVE` | Publicada — visível em `/jobs` e aceitando candidaturas |
| `CLOSED` | Encerrada — não aceita novas candidaturas |
| `ARCHIVED` | Arquivada — removida das listagens, mantida para histórico |

### ApplicationStatus
| Valor | Descrição |
|---|---|
| `APPLIED` | Candidatura recebida, aguardando revisão |
| `REVIEWING` | Admin está analisando (IA ou manual) |
| `SHORTLISTED` | Indicado ao cliente (cria registro em `Shortlist`) |
| `INTERVIEW` | Convocado para entrevista |
| `REJECTED` | Reprovado em qualquer etapa |
| `HIRED` | Contratado — dispara criação de `Placement` |

### PlacementStatus
| Valor | Descrição |
|---|---|
| `TRIAL` | Em período de experiência (normalmente 90 dias) |
| `EFFECTIVE` | Efetivado — dispara geração de `Commission` |
| `TERMINATED` | Desligado antes ou após o prazo |
| `CANCELLED` | Alocação cancelada antes de iniciar |

### CommissionStatus
| Valor | Descrição |
|---|---|
| `PENDING` | Gerada, aguardando emissão de nota fiscal |
| `INVOICED` | Nota fiscal emitida, aguardando pagamento da empresa |
| `PAID` | Pagamento confirmado |
| `WAIVED` | Comissão dispensada pelo admin (cortesia ou correção) |
