import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cevan Supermercados | Qualidade e Tradição",
  description: "A máquina de vendas que nunca para! Produtos de qualidade, delivery e atendimento em Santa Luzia e Buriticupu/MA.",
};

function WhatsappIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const SCHEDULE = [
  { day: "Segunda-feira", buriticupu: "07:30–19:30", santaLuzia: "07:30–19:00" },
  { day: "Terça-feira", buriticupu: "07:30–19:30", santaLuzia: "07:30–19:00" },
  { day: "Quarta-feira", buriticupu: "07:30–19:30", santaLuzia: "07:30–19:00" },
  { day: "Quinta-feira", buriticupu: "07:30–19:30", santaLuzia: "07:30–19:00" },
  { day: "Sexta-feira", buriticupu: "07:30–19:30", santaLuzia: "07:30–19:00" },
  { day: "Sábado", buriticupu: "07:30–18:30", santaLuzia: "07:30–18:00" },
  { day: "Domingo", buriticupu: "Fechado", santaLuzia: "Fechado", closed: true },
];

export default function SupermercadoLinkPage() {
  return (
    <>
      <style>{`
        body { background: linear-gradient(135deg, #f1f5f9 0%, #e0e7ef 100%); min-height: 100vh; }
        .sup-card {
          background: linear-gradient(135deg, #fff 60%, #f3f6fa 100%);
          border-radius: 1.5rem;
          box-shadow: 0 6px 32px rgba(0,0,0,0.09);
          border: 1px solid #e5e7eb;
          transition: all .3s ease;
          margin-bottom: 1.25rem;
        }
        .sup-card:hover { transform: translateY(-3px); box-shadow: 0 12px 40px rgba(59,130,246,0.1); }
        .sup-btn {
          background: linear-gradient(90deg, #3b82f6 0%, #6366f1 100%);
          color: white; padding: 1rem 2rem; border-radius: 1rem;
          font-weight: 600; text-align: center; display: block;
          text-decoration: none; font-size: 1.05rem;
          box-shadow: 0 6px 20px rgba(59,130,246,0.25);
          transition: all .2s ease; width: 100%;
        }
        .sup-btn:hover { transform: translateY(-3px) scale(1.02); box-shadow: 0 12px 30px rgba(59,130,246,0.35); }
        .contact-btn {
          background: #f3f6fa; color: #2563eb;
          border-radius: 1rem; padding: 1rem;
          text-align: center; transition: all .2s ease;
          text-decoration: none;
          box-shadow: 0 2px 8px rgba(59,130,246,0.07);
          border: 1px solid #e5e7eb;
          display: flex; flex-direction: column; align-items: center; gap: .5rem;
        }
        .contact-btn:hover { background: #e0e7ef; transform: translateY(-3px); box-shadow: 0 8px 20px rgba(59,130,246,0.15); }
        .contact-btn.maps { background: #e0e7ef; color: #6366f1; }
        .contact-btn.maps:hover { background: #c7d2fe; color: #3730a3; }
        .service-item {
          background: #f8fafc; padding: 1rem 1.25rem;
          border-radius: .875rem; margin-bottom: .75rem;
          transition: all .2s ease; border: 1px solid #e5e7eb;
        }
        .service-item:hover { background: #f1f5f9; transform: translateX(6px); box-shadow: 0 4px 16px rgba(59,130,246,0.09); }
        .service-item.fresh { border-left: 4px solid #10b981; }
        .service-item.delivery { border-left: 4px solid #f59e0b; }
        .service-item.offers { border-left: 4px solid #3b82f6; }
        .whatsapp-float {
          position: fixed; bottom: 24px; right: 24px; z-index: 100;
          width: 60px; height: 60px; border-radius: 50%;
          background: #25d366;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 15px rgba(37,211,102,0.4);
          text-decoration: none; border: 3px solid white;
          transition: all .3s ease;
        }
        .whatsapp-float:hover { transform: scale(1.1); box-shadow: 0 8px 25px rgba(37,211,102,0.5); }
        .about-bg {
          background: linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%);
          color: white; padding: 1.5rem 1.25rem;
          border-radius: 1.25rem;
        }
        .schedule-bg {
          background: linear-gradient(90deg, #ec4899 0%, #be185d 100%);
          color: white; padding: 1.5rem 1.25rem;
          border-radius: 1.25rem;
        }
        .icon-circle {
          width: 52px; height: 52px; border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.4rem; background: #e0e7ef; flex-shrink: 0;
        }
        .fade-in { animation: fadeIn .7s ease; }
        @keyframes fadeIn { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
      `}</style>

      {/* WhatsApp float */}
      <a href="https://wa.me/5598982128321" target="_blank" rel="noreferrer" className="whatsapp-float">
        <WhatsappIcon className="h-7 w-7 text-white" />
      </a>

      <div className="max-w-xl mx-auto px-4 py-8 fade-in">

        {/* Fachada */}
        <div className="sup-card p-3 mb-5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/imglinks/cevan_fachada2.png" alt="Cevan Supermercado" className="w-full rounded-2xl object-cover" style={{ maxHeight: 280 }} />
        </div>

        {/* Header */}
        <div className="sup-card p-6 text-center">
          <div className="w-36 h-36 mx-auto mb-4 overflow-hidden rounded-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/imglinks/brasao-supermercado.png" alt="Cevan Supermercado" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-1">CEVAN</h1>
          <p className="text-base text-gray-600 font-semibold mb-4">A MÁQUINA DE VENDAS QUE NUNCA PARA!</p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full text-blue-700 text-sm font-medium">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
            Santa Luzia · Buriticupu/MA
          </div>
        </div>

        {/* Banner promocional */}
        <div className="sup-card p-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/imglinks/banner.png" alt="Ofertas" className="w-full rounded-2xl object-cover" style={{ maxHeight: 260 }} />
        </div>

        {/* Comprar online */}
        <div className="mb-5">
          <a href="https://compresemfila.app.link/11186" target="_blank" rel="noreferrer" className="sup-btn">
            🛒 Comprar Online
          </a>
        </div>

        {/* WhatsApp */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <a href="https://wa.me/5598982128321" target="_blank" rel="noreferrer" className="contact-btn">
            <WhatsappIcon className="h-7 w-7 text-green-600" />
            <span className="font-semibold text-sm">WhatsApp</span>
            <span className="text-xs opacity-80">Santa Luzia</span>
          </a>
          <a href="https://wa.me/5598988734850" target="_blank" rel="noreferrer" className="contact-btn">
            <WhatsappIcon className="h-7 w-7 text-green-600" />
            <span className="font-semibold text-sm">WhatsApp</span>
            <span className="text-xs opacity-80">Buriticupu</span>
          </a>
        </div>

        {/* Lojas */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <a href="https://www.google.com/maps/place/Av.+Newton+Bello,+687+-+Centro,+Santa+Luzia+-+MA,+65390-000" target="_blank" rel="noreferrer" className="contact-btn maps">
            <div className="icon-circle">🏪</div>
            <span className="font-semibold text-sm">Loja</span>
            <span className="text-xs opacity-80">Santa Luzia</span>
          </a>
          <a href="https://www.google.com/maps/search/Cevan+Supermercado+Buriticupu" target="_blank" rel="noreferrer" className="contact-btn maps">
            <div className="icon-circle">🏪</div>
            <span className="font-semibold text-sm">Loja</span>
            <span className="text-xs opacity-80">Buriticupu</span>
          </a>
        </div>

        {/* Serviços */}
        <div className="sup-card p-5">
          <div className="service-item fresh">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🌿</span>
              <div>
                <p className="font-semibold text-gray-800">Produtos de qualidade</p>
                <p className="text-sm text-gray-500">Qualidade garantida diariamente</p>
              </div>
            </div>
          </div>
          <div className="service-item delivery">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🚚</span>
              <div>
                <p className="font-semibold text-gray-800">Delivery</p>
                <p className="text-sm text-gray-500">Entrega rápida e segura</p>
              </div>
            </div>
          </div>
          <div className="service-item offers" style={{ marginBottom: 0 }}>
            <div className="flex items-center gap-3">
              <span className="text-2xl">🏷️</span>
              <div>
                <p className="font-semibold text-gray-800">Ofertas Especiais</p>
                <p className="text-sm text-gray-500">Preços competitivos sempre</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sobre */}
        <div className="sup-card p-5">
          <div className="about-bg">
            <h3 className="text-xl font-bold text-center mb-3">Sobre o CEVAN</h3>
            <p className="text-base leading-relaxed mb-4">
              No CEVAN SUPERMERCADOS, você é sempre bem-vindo! Fazemos questão de estar presentes no seu dia a dia, oferecendo produtos de qualidade, atendimento feito com carinho e preços que cabem no seu bolso.
            </p>
            <div className="text-center p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.18)" }}>
              <div className="text-3xl font-bold mb-1">2</div>
              <div className="text-sm opacity-90">Unidades</div>
            </div>
          </div>
        </div>

        {/* Horários */}
        <div className="sup-card p-5">
          <div className="schedule-bg">
            <h3 className="text-xl font-bold text-center mb-4">Horário de Funcionamento</h3>
            <div className="overflow-x-auto rounded-xl" style={{ background: "rgba(255,255,255,0.12)" }}>
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ background: "#be185d" }}>
                    <th className="py-2 px-3 text-left text-white font-semibold">Dia</th>
                    <th className="py-2 px-3 text-left text-white font-semibold">
                      Buriticupu
                    </th>
                    <th className="py-2 px-3 text-left text-white font-semibold">
                      Santa Luzia
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {SCHEDULE.map((row, i) => (
                    <tr key={row.day} style={{ background: i % 2 === 0 ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.13)" }}>
                      <td className="py-1.5 px-3 text-white">{row.day}</td>
                      <td className={`py-1.5 px-3 ${row.closed ? "text-yellow-300 font-semibold" : "text-white"}`}>{row.buriticupu}</td>
                      <td className={`py-1.5 px-3 ${row.closed ? "text-yellow-300 font-semibold" : "text-white"}`}>{row.santaLuzia}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sup-card p-5 text-center">
          <h4 className="text-xl font-bold text-gray-800 mb-1">CEVAN Supermercados</h4>
          <p className="text-gray-500 text-sm mb-2">Excelência em varejo alimentício</p>
          <div className="h-px bg-gray-200 mb-2" />
          <p className="text-sm text-gray-400">Santa Luzia · Buriticupu/MA</p>
        </div>

      </div>
    </>
  );
}
