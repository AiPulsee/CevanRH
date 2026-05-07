# Banco de Currículos

**Caminho:** [src/app/(admin)/admin/resumes/page.tsx](src/app/(admin)/admin/resumes/page.tsx)
**Acesso:** `/admin/resumes`
**Role necessário:** `ADMIN`

## Descrição
Base de dados global contendo todos os currículos já recebidos pelo sistema, independentemente da vaga original ou do status da candidatura. Funciona como um banco de talentos permanente da Cevan.

## Funcionalidades

### Busca Global
Campo de pesquisa em tempo real que filtra por:
- **Nome** do candidato
- **E-mail** do candidato
- **Cargo** mencionado no currículo

A busca é executada no servidor a cada keystroke (debounce aplicado no cliente).

### Filtros por Tipo de Vaga
Alternância rápida entre:
- **Managed**: candidatos de vagas sob curadoria Cevan
- **Self-Service**: candidatos de vagas gerenciadas pelas próprias empresas
- **Todos**: visão consolidada

### Exportação para Excel
Botão de exportação que gera um arquivo `.xlsx` com todos os registros visíveis após aplicação dos filtros atuais. Colunas exportadas: nome, e-mail, vaga, empresa, data de candidatura, status atual.

O componente [src/components/admin/resumes-export-button.tsx](src/components/admin/resumes-export-button.tsx) gerencia a lógica de exportação no client-side.

### Visualização de Currículo
Para cada candidato na lista:
- **Download direto** do PDF via link para o Cloudflare R2
- **Link externo** caso o currículo seja um URL (LinkedIn, portfólio, etc.)
- **Badge de status** da candidatura mais recente

### Informações Exibidas por Candidato
| Campo | Origem |
|---|---|
| Nome e e-mail | `User.name`, `User.email` |
| Vaga original | `Application → Job.title` |
| Empresa | `Application → Job → Company.name` |
| Data de candidatura | `Application.createdAt` |
| Status atual | `Application.status` |
| Link do currículo | `Application.resumeUrl` |

## Casos de Uso
- Buscar um candidato específico que não passou em uma vaga anterior mas pode ser reaproveitado em nova oportunidade
- Verificar histórico de candidaturas de um perfil
- Exportar lista completa de talentos para análise offline
