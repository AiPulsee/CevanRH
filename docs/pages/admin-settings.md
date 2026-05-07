# Configurações do Sistema

**Caminho:** [src/app/(admin)/admin/settings/page.tsx](src/app/(admin)/admin/settings/page.tsx)
**Acesso:** `/admin/settings`
**Role necessário:** `ADMIN`

## Descrição
Interface para ajuste de parâmetros operacionais do sistema sem necessidade de alterar código ou fazer deploy. As configurações são persistidas na tabela `Setting` (chave-valor) do banco de dados.

## Configurações Disponíveis

### Financeiro
| Chave | Campo | Descrição |
|---|---|---|
| `managed.fee_percentage` | Taxa de Comissão (%) | Percentual aplicado sobre o 1º salário para calcular comissões. Padrão: 50. Alterações afetam apenas novas comissões — as existentes mantêm o percentual original. |

### Segurança
| Chave | Campo | Descrição |
|---|---|---|
| `security.block_registrations` | Bloquear Novos Cadastros | Quando ativo, impede que novos usuários se cadastrem no portal público. Útil para períodos de manutenção ou controle de acesso. |
| `security.2fa_required` | Exigir 2FA | Quando ativo, todos os usuários admin precisam configurar autenticação de dois fatores para acessar o painel. |

### SMTP (E-mail)
| Chave | Campo | Descrição |
|---|---|---|
| `smtp.server` | Servidor SMTP | Endereço do servidor de e-mail (ex: `smtp.gmail.com`) |
| `smtp.port` | Porta | Porta de conexão (ex: `587` para TLS, `465` para SSL) |
| `smtp.encryption` | Criptografia | Tipo: `TLS` ou `SSL` |

## Implementação

As configurações são carregadas com `getSettings(keys)` no Server Component e passadas como `initialSettings` para o componente client [src/components/admin/settings-form.tsx](src/components/admin/settings-form.tsx).

O formulário usa Server Action `updateSettings` para salvar via `prisma.setting.upsert` — cria o registro se não existir, atualiza se já existir.

### Estrutura no Banco
```
Setting {
  key:       "managed.fee_percentage"   // PK
  value:     "50"                        // Sempre string
  updatedAt: 2024-01-15T10:30:00Z
}
```

## Impacto das Configurações

- **`managed.fee_percentage`**: Lida em tempo real pela página `/admin/placements` (cálculo de receita potencial) e no momento de criar uma `Commission`.
- **`security.block_registrations`**: Verificada no Server Action de registro público.
- **`security.2fa_required`**: Verificada no middleware de autenticação.
- **SMTP**: Usada no serviço de envio de e-mails transacionais.
