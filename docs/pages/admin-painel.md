# Dashboard Administrativo

**Caminho:** [src/app/(admin)/admin/page.tsx](src/app/(admin)/admin/page.tsx)
**Acesso:** `/admin`
**Role necessário:** `ADMIN`

## Descrição
A central de comando do consultor. Exibe uma visão em tempo real da saúde operacional da plataforma, com KPIs financeiros, volume de triagem e atalhos para as ações mais frequentes do dia a dia.

## Funcionalidades

### KPI Cards
Quatro métricas principais carregadas diretamente do banco:
- **Faturamento Mensal**: soma das comissões com status `PAID` no mês corrente.
- **Meta de Colocações**: progresso de contratações no mês em relação à meta configurada.
- **Candidatos em Triagem**: count de Applications com status `REVIEWING` ou `APPLIED`.
- **Vagas Ativas**: count de Jobs com status `ACTIVE`.

### Gráfico de Evolução
Visualização mensal dos últimos 6 meses com barras de contratações e faturamento. Permite identificar tendências de crescimento ou queda.

### Vagas Recentes
Lista das últimas vagas criadas com link direto para o modal de triagem. Atalho rápido para o fluxo mais comum do consultor.

### Status Operacional
Indicadores de progresso (progress bars) mostrando avanço em relação às metas do mês — contratações, triagens concluídas e comissões faturadas.

## Dados Carregados
Todos os dados são carregados no servidor (`async` Server Component) sem fetch client-side, garantindo que a página não exiba estados de loading.
