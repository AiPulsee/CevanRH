# Relatórios Gerais (Analytics)

**Caminho:** [src/app/(admin)/admin/analytics/page.tsx](src/app/(admin)/admin/analytics/page.tsx)
**Acesso:** `/admin/analytics`
**Role necessário:** `ADMIN`

## Descrição
Painel de análise de performance e crescimento da plataforma. Todos os dados são calculados no servidor com queries agregadas ao PostgreSQL, sem dependência de ferramentas externas de analytics.

## Funcionalidades

### KPI Cards (4 métricas globais)
| Métrica | Fonte | Descrição |
|---|---|---|
| Empresas Cadastradas | `Company.count()` | Total acumulado desde o início |
| Total de Candidaturas | `Application.count()` | Todas as candidaturas de todos os períodos |
| Vagas Publicadas | `Job.count()` | Todas as vagas de todos os status e tipos |
| Alocações Totais | `Placement.count()` | Histórico total (Trial + Effective + Terminated) |

Cada card tem um tooltip explicativo ao hover.

### Gráfico de Volume de Candidaturas
Barras verticais dos últimos 6 meses. O mês atual é destacado em azul. Exibe o número absoluto de candidaturas acima de cada barra. Útil para identificar sazonalidade e picos de atração.

### Gráfico de Novas Empresas
Barras verticais dos últimos 6 meses mostrando quantas empresas foram cadastradas em cada período. Indicador de crescimento da base de clientes.

### Funil de Conversão
Visualização horizontal com 5 etapas em sequência:

```
Candidaturas → Em Revisão → Selecionados → Contratados → Efetivados
```

Cada etapa tem uma barra de progresso relativa ao valor máximo do funil. Abaixo do funil, exibe a **Taxa de Efetivação**: percentual de candidaturas que resultaram em efetivação.

### Distribuição de Vagas (Managed vs Self-Service)
Duas barras de progresso mostrando a proporção entre vagas Managed e Self-Service com percentuais.

Dois índices de benchmark:
- **Taxa Candidatura/Vaga**: média de candidaturas por vaga publicada (indica atratividade)
- **Vagas por Empresa**: média de vagas por empresa cadastrada (indica engajamento dos clientes)

## Implementação Técnica
A página usa `Promise.all` para paralelizar todas as queries, minimizando o tempo de carregamento. Nenhum dado é cacheado — usa `force-dynamic` para garantir dados sempre atualizados.

Os gráficos são renderizados em CSS puro (sem biblioteca de charts), usando `div` com altura percentual calculada no servidor.
