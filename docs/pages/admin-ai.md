# Motor de IA

**Caminho:** `src/app/(admin)/admin/ai/page.tsx`  
**Acesso:** `/admin/ai`

## 📝 Descrição
Painel de configuração da Cevan Engine — o módulo de inteligência artificial responsável pela geração de descrições de vagas e pela triagem automática de currículos.

## 🚀 Principais Funcionalidades
- **Prompts do Sistema**: Edição dos prompts para "Gerador de Vagas" e "Triagem Automática".
- **Parâmetros do Modelo**: Ajuste de Máximo de Tokens e Temperatura.
- **Métricas de Uso**: Requisições mensais e custo estimado da API.
- **Chave API**: Campo para atualização da chave de autenticação do provedor de IA.

## ⚠️ Observações
- A UI exibe referências a "GPT-4o" e "OpenAI", mas o provedor real é **Google Gemini** (`@google/generative-ai`), conforme definido em `docs/architecture.md`. Os campos são visuais e não persistem dados.
- Os botões de ação (Salvar, Atualizar Chave) não possuem Server Actions conectadas — a página é um protótipo de UI.
