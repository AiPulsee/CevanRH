# Alocações (Placements)

**Caminho:** [src/app/(admin)/admin/placements/page.tsx](src/app/(admin)/admin/placements/page.tsx)
**Acesso:** `/admin/placements`
**Role necessário:** `ADMIN`

## Descrição
Central de gestão de candidatos contratados. Acompanha o período de experiência de cada alocação, alerta sobre vencimentos próximos, e exibe a receita potencial de comissões.

## Funcionalidades

### KPI Cards
| Métrica | Descrição |
|---|---|
| Em Andamento | Candidatos no período de experiência (TRIAL) — inclui alerta de quantos vencem em breve |
| Efetivados | Total histórico de placements com status EFFECTIVE |
| Taxa de Conversão | `Efetivados ÷ (Efetivados + Terminados)` — exclui os ainda em andamento |
| Receita Potencial | Soma das comissões que seriam geradas se todos os andamentos atuais fossem efetivados |

O cálculo da Receita Potencial usa o percentual configurado em `managed.fee_percentage` (via `getSetting`), garantindo que reflita sempre a taxa atual, não hardcoded.

### Alerta de Vencimento
Banner amarelo visível quando há alocações com menos de 7 dias para o fim do período de experiência. Instrui o consultor a contatar as empresas para confirmar efetivação.

### Tabela de Alocações
Componente [src/components/admin/placements-table.tsx](src/components/admin/placements-table.tsx) com cada alocação exibindo:
- Nome e e-mail do candidato
- Empresa e título da vaga
- Data de início e fim do período de experiência
- Dias restantes (indicador colorido: verde/amarelo/vermelho)
- Salário mensal
- Comissão vinculada (status e valor)
- Ações: Efetivar, Encerrar, Editar notas

### Próximos Vencimentos
Card lateral com lista das 5 alocações que vencem primeiro. Indicador visual por urgência:
- **Ponto vermelho pulsante**: vence em ≤ 7 dias
- **Ponto amarelo**: vence em ≤ 15 dias
- **Ponto azul**: dentro do prazo normal

### Card de Receita de Curadoria
Card azul de destaque com a receita potencial total se todos os andamentos ativos forem efetivados. Contextualiza o valor com texto: "Com X candidatos em andamento, a receita potencial é de R$..."

## Ciclo de Vida de uma Alocação

```
Candidatura HIRED
      ↓
Placement criado (TRIAL)
      ↓
[Período de experiência — tipicamente 90 dias]
      ↓
Empresa confirma → Placement → EFFECTIVE
                             → Commission PENDING gerada automaticamente

Ou:
Desligamento → Placement → TERMINATED (+ terminationDate + terminationReason)
```

## Geração de Comissão
A comissão é criada automaticamente quando o status muda para `EFFECTIVE`. O valor é calculado como:
```
amount = monthlySalary × (managed.fee_percentage / 100)
```
Salários e comissões são armazenados em **centavos** (ex: R$ 5.000 = `500000`).
