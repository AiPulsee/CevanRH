import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade | Cevan RH",
  description: "Política de Privacidade e tratamento de dados pessoais da plataforma Cevan RH, em conformidade com a LGPD.",
};

export default function PrivacidadePage() {
  return (
    <div className="flex flex-col min-h-screen bg-white mt-24">
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6 max-w-3xl">
          <h1 className="text-3xl lg:text-5xl font-black tracking-tight text-slate-900 mb-4">
            Política de Privacidade
          </h1>
          <p className="text-slate-500 text-sm mb-12">Última atualização: junho de 2026</p>

          <div className="prose prose-slate max-w-none space-y-10 text-slate-700 leading-relaxed">

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">1. Controlador dos Dados</h2>
              <p>
                A <strong>Cevan Serviços Empresariais</strong>, com sede em Av. Newton Bello, 1032 - B,
                Centro, Santa Luzia/MA, é a controladora dos dados pessoais coletados por meio da
                plataforma Cevan RH, nos termos da Lei Geral de Proteção de Dados (Lei nº 13.709/2018 — LGPD).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">2. Dados Coletados</h2>
              <p>Coletamos os seguintes dados pessoais:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li><strong>Candidatos:</strong> nome completo, e-mail, currículo (arquivo) e carta de apresentação opcional;</li>
                <li><strong>Usuários administrativos:</strong> nome, e-mail e credenciais de acesso;</li>
                <li><strong>Dados de uso:</strong> logs de acesso e ações realizadas na plataforma (para auditoria e segurança).</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">3. Finalidade do Tratamento</h2>
              <p>Os dados são utilizados exclusivamente para:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Conduzir processos seletivos e encaminhar candidaturas às empresas clientes;</li>
                <li>Comunicação durante e após o processo seletivo;</li>
                <li>Cumprimento de obrigações legais e contratuais;</li>
                <li>Segurança e integridade da plataforma.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">4. Base Legal</h2>
              <p>
                O tratamento de dados é realizado com base no <strong>consentimento</strong> do titular
                (art. 7º, I, LGPD) e no <strong>legítimo interesse</strong> da Cevan para a condução
                dos processos seletivos (art. 7º, IX, LGPD).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">5. Compartilhamento de Dados</h2>
              <p>
                Os dados dos candidatos poderão ser compartilhados com as <strong>empresas clientes</strong>{" "}
                para as quais a vaga está sendo conduzida. Não vendemos nem comercializamos dados pessoais
                a terceiros. O armazenamento de arquivos (currículos) é realizado na infraestrutura{" "}
                <strong>Cloudflare R2</strong>, com criptografia em trânsito e em repouso.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">6. Prazo de Retenção</h2>
              <p>
                Os dados são mantidos pelo prazo necessário para a execução dos processos seletivos e
                cumprimento de obrigações legais, ou enquanto houver interesse legítimo do candidato
                em permanecer no banco de talentos da Cevan.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">7. Direitos do Titular (LGPD)</h2>
              <p>Você tem direito a:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Confirmar a existência de tratamento dos seus dados;</li>
                <li>Acessar, corrigir ou atualizar seus dados;</li>
                <li>Solicitar a eliminação dos seus dados, quando aplicável;</li>
                <li>Revogar o consentimento a qualquer momento;</li>
                <li>Obter informações sobre o compartilhamento dos seus dados.</li>
              </ul>
              <p className="mt-3">
                Para exercer seus direitos, entre em contato pelo e-mail{" "}
                <a href="mailto:rh.cevanservicos@gmail.com" className="text-blue-600 hover:underline font-semibold">
                  rh.cevanservicos@gmail.com
                </a>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">8. Segurança</h2>
              <p>
                Adotamos medidas técnicas e organizacionais para proteger seus dados, incluindo
                autenticação segura, controle de acesso baseado em permissões, transmissão via
                HTTPS e registros de auditoria de todas as ações críticas.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">9. Cookies</h2>
              <p>
                Utilizamos cookies essenciais para o funcionamento da autenticação e sessão.
                Não utilizamos cookies de rastreamento ou publicidade de terceiros.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">10. Alterações nesta Política</h2>
              <p>
                Esta Política pode ser atualizada periodicamente. A data da última revisão é indicada
                no topo desta página. O uso continuado da plataforma após alterações implica a
                aceitação da nova versão.
              </p>
            </section>

            <section className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <h2 className="text-lg font-bold text-slate-900 mb-2">Encarregado de Dados (DPO)</h2>
              <p>
                Para questões relacionadas à privacidade e proteção de dados, entre em contato:
              </p>
              <ul className="mt-3 space-y-1">
                <li>
                  <strong>E-mail:</strong>{" "}
                  <a href="mailto:rh.cevanservicos@gmail.com" className="text-blue-600 hover:underline">
                    rh.cevanservicos@gmail.com
                  </a>
                </li>
                <li><strong>Telefone:</strong> (98) 92000-7888</li>
                <li><strong>Endereço:</strong> Av. Newton Bello, 1032 - B, Centro, Santa Luzia/MA</li>
              </ul>
            </section>

          </div>
        </div>
      </section>
    </div>
  );
}
