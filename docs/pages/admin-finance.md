# Finanças (Comissões)

**Caminho:** [src/app/(admin)/admin/finance/page.tsx](src/app/(admin)/admin/finance/page.tsx)
**Acesso:** `/admin/finance`
**Role necessário:** `ADMIN`

## Descrição
Controle completo do ciclo financeiro das comissões geradas pelas efetivações. Permite à equipe Cevan acompanhar o fluxo de caixa — do momento em que a comissão é gerada até a confirmação do pagamento.

## Funcionalidades

### KPI Cards (4 métricas financeiras)

| Métrica | Cálculo | Tooltip |
|---|---|---|
| A Receber | `PENDING.sum + INVOICED.sum` | Valor que ainda entrará no caixa |
| Pendentes | `PENDING.count` | Aguardando emissão de nota fiscal |
| Faturados | `INVOICED.count` | NF emitida, aguardando pagamento |
| Total Recebido | `PAID.sum` | Receita efetivamente recebida (histórico) |

Valores monetários são formatados em BRL com notação compacta (ex: "R$ 12,5 mil").

Cada card tem borda colorida lateral para identificação visual rápida (azul, âmbar, índigo, verde).

### Tabela de Comissões
Componente `CommissionsTable` com colunas:
- Candidato (nome + e-mail)
- Empresa cliente
- Vaga
- Valor da comissão
- Status (badge colorido)
- Número da nota fiscal
- Data de vencimento
- Data de pagamento
- Ações disponíveis por status

### Ações por Status de Comissão

| Status Atual | Ações Disponíveis |
|---|---|
| `PENDING` | Marcar como Faturado (inserir número NF + data vencimento) |
| `INVOICED` | Confirmar Pagamento (preenche `paidAt`) / Cancelar |
| `PAID` | Visualizar apenas |
| `WAIVED` | Visualizar apenas |

### Ciclo de Status Completo

```
PENDING  →  INVOICED  →  PAID
  ↓              ↓
WAIVED        WAIVED    (admin pode dispensar em qualquer etapa aberta)
```

## Relacionamentos de Dados
Cada linha da tabela resulta de um JOIN completo:
```
Commission → Placement → Application → Candidate (User)
                                    → Job → Company
```

A query carrega tudo de uma vez com `include` aninhado, evitando N+1 queries.

## Valores em Centavos
Todos os valores monetários no banco são armazenados em **centavos** para evitar problemas de ponto flutuante:
- `Commission.amount = 200000` → R$ 2.000,00
- A função `fmt()` converte centavos para BRL formatado antes de exibir

## Estado Vazio
Quando não há comissões ainda, exibe uma mensagem orientando o consultor: "Efetive um candidato em Alocações para gerar a primeira comissão."
