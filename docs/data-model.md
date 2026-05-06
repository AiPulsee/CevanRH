# Modelo de Dados (Prisma)

O banco de dados da CevanRH foi projetado para suportar fluxos complexos de recrutamento, desde a inscrição até o faturamento da comissão.

## 📊 Entidades Principais

### 👤 User
Representa tanto os candidatos quanto os consultores internos (ADMIN).
- **Relacionamentos**: Possui muitas `Applications` e pode pertencer a uma `Company`.

### 🏢 Company
Empresas clientes que contratam os serviços da Cevan.
- **Relacionamentos**: Possui muitos `Jobs` e `Users` (Colaboradores).

### 💼 Job (Vaga)
Oportunidade de emprego. Pode ser `SELF_SERVICE` (pública) ou `MANAGED` (curadoria VIP).
- **Relacionamentos**: Pertence a uma `Company` e recebe muitas `Applications`.

### 📝 Application (Candidatura)
O vínculo entre um candidato e uma vaga.
- **Estados**: `APPLIED` (Inscrito), `SHORTLISTED` (Indicado), `HIRED` (Contratado), etc.

### 🎯 Placement (Contratação)
Registro de sucesso. Criado quando um candidato é contratado.
- **Controle**: Gerencia períodos de experiência e datas de início efetivo.

### 💰 Commission (Financeiro)
Calculada automaticamente com base no salário do `Placement`.
- **Regra**: Geralmente 50% do primeiro salário (configurável).

---

# IA e Triagem Inteligente

O CevanRH utiliza a API do **Google Gemini 2.0 Flash** para automatizar a triagem inicial de candidatos.

## 🤖 Como Funciona
1. **Extração**: O sistema envia o conteúdo da vaga e o currículo do candidato para a IA.
2. **Análise**: A IA avalia a compatibilidade técnica, experiência e fit cultural.
3. **Score**: Gera uma nota de 0 a 100 e um resumo executivo dos pontos fortes e fracos.
4. **Decisão**: O consultor humano usa essa análise para decidir se indica o candidato ao cliente.

## ⚠️ Resiliência
O sistema possui tratamento de erros para limites de cota da API (HTTP 429), garantindo que a interface não trave mesmo sob alta demanda.
