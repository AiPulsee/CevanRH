import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termos de Uso | Cevan RH",
  description: "Termos de Uso da plataforma Cevan RH — Cevan Serviços Empresariais.",
};

export default function TermosPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white mt-24">
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6 max-w-3xl">
          <h1 className="text-3xl lg:text-5xl font-black tracking-tight text-slate-900 mb-4">
            Termos de Uso
          </h1>
          <p className="text-slate-500 text-sm mb-12">Última atualização: junho de 2026</p>

          <div className="prose prose-slate max-w-none space-y-10 text-slate-700 leading-relaxed">

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">1. Aceitação dos Termos</h2>
              <p>
                Ao acessar ou utilizar a plataforma Cevan RH, operada pela <strong>Cevan Serviços Empresariais</strong>,
                você concorda com estes Termos de Uso. Caso não concorde, não utilize nossos serviços.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">2. Descrição do Serviço</h2>
              <p>
                A Cevan RH é uma plataforma de recrutamento e seleção que conecta candidatos a oportunidades
                de emprego gerenciadas pela Cevan Serviços Empresariais. Os serviços incluem:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Cadastro e envio de currículos para vagas publicadas;</li>
                <li>Triagem, entrevistas e processo seletivo conduzidos pela equipe Cevan;</li>
                <li>Gestão de alocações e acompanhamento pós-contratação.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">3. Cadastro e Responsabilidades do Candidato</h2>
              <p>Ao se candidatar a uma vaga, o usuário se compromete a:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Fornecer informações verdadeiras, precisas e atualizadas;</li>
                <li>Não utilizar a plataforma para fins ilícitos ou fraudulentos;</li>
                <li>Não enviar currículos ou documentos de terceiros sem autorização.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">4. Propriedade Intelectual</h2>
              <p>
                Todo o conteúdo da plataforma — textos, logotipos, design e funcionalidades — é de
                propriedade exclusiva da Cevan Serviços Empresariais. É proibida a reprodução ou uso
                sem autorização prévia e por escrito.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">5. Limitação de Responsabilidade</h2>
              <p>
                A Cevan RH atua como intermediadora no processo seletivo. Não garantimos a contratação
                do candidato nem a disponibilidade permanente das vagas. O resultado do processo seletivo
                é de responsabilidade exclusiva das empresas clientes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">6. Modificações</h2>
              <p>
                Reservamo-nos o direito de alterar estes Termos a qualquer momento. A continuidade do
                uso da plataforma após publicação de alterações constitui aceitação dos novos Termos.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">7. Foro e Lei Aplicável</h2>
              <p>
                Estes Termos são regidos pelas leis brasileiras. Fica eleito o foro da comarca de
                Santa Luzia/MA para dirimir quaisquer controvérsias.
              </p>
            </section>

            <section className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <h2 className="text-lg font-bold text-slate-900 mb-2">Contato</h2>
              <p>
                Dúvidas sobre estes Termos? Entre em contato conosco pelo e-mail{" "}
                <a href="mailto:rh.cevanservicos@gmail.com" className="text-blue-600 hover:underline font-semibold">
                  rh.cevanservicos@gmail.com
                </a>{" "}
                ou pelo WhatsApp <strong>(98) 92000-7888</strong>.
              </p>
            </section>

          </div>
        </div>
      </section>
    </div>
  );
}
