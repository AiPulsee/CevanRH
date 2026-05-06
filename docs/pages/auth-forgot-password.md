# Recuperar Senha

**Caminho:** `src/app/(auth)/forgot-password/page.tsx`  
**Acesso:** `/forgot-password`

## 📝 Descrição
Página de recuperação de senha para membros da equipe administrativa que perderam o acesso.

## 🚀 Principais Funcionalidades
- **Formulário de E-mail**: Entrada do e-mail associado à conta.
- **Feedback de Sucesso**: Exibe confirmação visual após o envio.
- **Link de retorno**: Atalho para voltar ao `/login`.

## ⚠️ Observação
O envio do e-mail é atualmente uma **simulação via `setTimeout`** — não há integração real com SMTP ou provedor de reset de senha. Necessita de implementação com NextAuth `sendPasswordResetEmail` ou equivalente.
