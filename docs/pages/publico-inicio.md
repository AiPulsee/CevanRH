# Página Inicial Pública

**Caminho:** [src/app/(public)/page.tsx](src/app/(public)/page.tsx)
**Acesso:** `/`
**Autenticação:** Não obrigatória

## Descrição
Landing page principal do CevanRH. Porta de entrada para candidatos que buscam vagas e empresas que desejam contratar os serviços da Cevan. Otimizada para conversão e branding.

## Seções

### Hero Section
Bloco de impacto com headline principal, subtítulo e barra de busca rápida de vagas. Ao buscar, redireciona para `/jobs?q=termo`. Inclui estatísticas de credibilidade (ex: "X vagas ativas", "Y empresas parceiras").

### Categorias de Vagas
Grid de cards com as principais áreas de atuação:
- Tecnologia
- Vendas e Comercial
- Administração
- Logística
- Indústria
- RH

Cada categoria leva para `/jobs?category=tecnologia` com filtro pré-aplicado.

### Vagas em Destaque
Carrossel ou grid com as vagas mais recentes com status `ACTIVE`. Cada card exibe: título, empresa, localização, faixa salarial, tipo de contrato e badge "Remoto" se aplicável. Link direto para `/jobs/[slug]`.

### Seção "Para Empresas"
CTA voltado para empresas que querem contratar a Cevan. Apresenta os dois modelos de serviço (Self-Service e Managed) com call-to-action para contato ou cadastro.

### Como Funciona
Stepper visual explicando o processo do candidato:
1. Busque vagas compatíveis com seu perfil
2. Envie seu currículo com um clique
3. Acompanhe sua candidatura em tempo real
4. Receba a proposta

### Footer
Links para páginas institucionais, redes sociais e política de privacidade. Componente em [src/components/public/footer.tsx](src/components/public/footer.tsx).

## Dados Carregados no Servidor
- Vagas em destaque (últimas 6 vagas `ACTIVE`)
- Contadores para as estatísticas do hero
- Nenhum dado sensível exposto ao client
