# Gestão de Empresas

**Caminho:** [src/app/(admin)/admin/companies/page.tsx](src/app/(admin)/admin/companies/page.tsx)
**Acesso:** `/admin/companies`
**Role necessário:** `ADMIN`

## Descrição
Cadastro e gestão centralizada de todas as empresas clientes da Cevan. Serve como base para vincular vagas, usuários (colaboradores) e transações a cada cliente.

## Funcionalidades

### Grid de Clientes
Visualização em grid com cards de cada empresa. Cada card exibe:
- Logomarca (ou ícone padrão se não cadastrada)
- Nome e setor de atuação
- Localização
- Vagas abertas atualmente
- Total histórico de contratações
- Status da conta

### Cadastro de Nova Empresa
Modal com formulário para inserção de:
- **Nome** e **Slug** (URL-friendly — gerado automaticamente ou personalizado)
- **CNPJ** (opcional)
- **Logo** (URL ou upload)
- **Website**
- **Descrição** da empresa
- **Setor** de atuação
- **Localização** da sede
- **E-mail** de contato principal
- **Stripe ID** para integração de cobrança (opcional)

### Edição de Empresa
Mesmos campos do cadastro, editáveis após criação. Slug só pode ser alterado se não houver vagas vinculadas (para não quebrar URLs públicas).

### Métricas por Cliente
Cada card exibe:
- Quantidade de vagas abertas (`ACTIVE`)
- Total de candidaturas recebidas
- Contratações realizadas via plataforma

### Exclusão de Empresa
Exclusão em cascata: ao remover uma empresa, todas as vagas (e candidaturas) vinculadas são removidas (configurado com `onDelete: Cascade` no schema).

## Relacionamentos
- Uma empresa pode ter múltiplos `Jobs`
- Uma empresa pode ter múltiplos `Users` (colaboradores com role `EMPLOYER`)
- Comissões têm `companyId` direto para queries financeiras sem JOIN adicional
