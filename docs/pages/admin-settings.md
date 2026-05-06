# Configurações

**Caminho:** `src/app/(admin)/admin/settings/page.tsx`  
**Acesso:** `/admin/settings`

## 📝 Descrição
Painel de configurações globais do sistema, com abas organizadas por domínio.

## 🚀 Principais Funcionalidades
- **Geral**: Taxa administrativa e SLA do serviço Managed.
- **Segurança**: Ativação de 2FA e bloqueio de novos registros.
- **E-mail (SMTP)**: Configuração do servidor de envio de e-mails.
- **Banco de Dados**: Status da conexão PostgreSQL, backup e restauração.
- **Integrações**: Gestão de chave de API e webhooks (Stripe, SendGrid).

## ⚠️ Observação
Os botões de ação (Salvar, Backup, Restaurar, Testar Conexão, Gerar Nova Chave) são atualmente visuais — sem Server Actions conectadas.
