# Curadoria Ativa (Managed Jobs)

**Caminho:** [src/app/(admin)/admin/managed/page.tsx](src/app/(admin)/admin/managed/page.tsx)
**Acesso:** `/admin/managed`
**Role necessário:** `ADMIN`

## Descrição
Área central do trabalho de curadoria da Cevan. Lista todas as vagas do tipo `MANAGED` e oferece o fluxo completo de triagem — da candidatura recebida até a indicação ao cliente.

## Funcionalidades

### Lista de Vagas VIP
Cards com cada vaga Managed mostrando:
- Empresa cliente e título da vaga
- Contador de candidatos: total recebidos vs. indicados ao cliente (ex: "3 de 5")
- Status da vaga (Ativa, Fechada, Arquivada)
- Data de criação

### Modal de Triagem
Ao clicar em uma vaga, abre um modal com todos os candidatos daquela vaga. Para cada candidato:

1. **Dados do currículo**: nome, e-mail, link para download do PDF.
2. **Carta de apresentação**: exibida se enviada.
3. **Botão "Analisar com IA"**: dispara o Server Action `analyzeCandidate`.
   - Extrai texto do PDF (via `pdf-parse`)
   - Envia para a Groq API (modelo `llama-3.3-70b-versatile`)
   - Exibe: score (0–100), recomendação (APPROVE/MAYBE/REJECT), pontos fortes, pontos de atenção, resumo executivo

### Ações por Candidato
- **Indicar ao Cliente** → Application → `SHORTLISTED` + cria registro em `Shortlist` com `adminFeedback`
- **Contratar** → Application → `HIRED` + cria `Placement` com status `TRIAL`
- **Reprovar** → Application → `REJECTED`

### Métricas por Vaga
Progresso visual de quantos candidatos foram indicados de um total desejado, permitindo ao consultor saber quando a vaga está suficientemente abastecida para o cliente.

## Fluxo Típico de Uso
1. Vaga Managed criada → aparece na lista
2. Candidatos se inscrevem via portal público
3. Consultor abre o modal da vaga
4. Analisa cada candidato com IA
5. Indica os melhores (shortlist) ou reprova
6. Quando empresa confirma interesse, registra contratação
7. Alocação criada → aparece em `/admin/placements`
