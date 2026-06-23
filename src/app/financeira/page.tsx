import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cevan Financeira | Transformamos Crédito em Conquistas",
  description: "Empréstimo Consignado, Consórcios e Seguros em Santa Luzia/MA. Taxas competitivas e aprovação rápida.",
};

function WhatsappIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

const SERVICES = [
  {
    icon: "💰",
    title: "Empréstimo Consignado",
    desc: "Menores taxas do mercado",
    gradient: "from-[#1e58ba] to-[#3b82f6]",
  },
  {
    icon: "🤝",
    title: "Consórcios",
    desc: "Realize seus sonhos",
    gradient: "from-[#3b82f6] to-[#1d4ed8]",
  },
  {
    icon: "🛡️",
    title: "Seguros",
    desc: "Proteção completa",
    gradient: "from-[#6366f1] to-[#8b5cf6]",
  },
];

const WHY = [
  { title: "Taxas Competitivas", desc: "As melhores condições do mercado financeiro" },
  { title: "Aprovação Rápida", desc: "Processo ágil e totalmente descomplicado" },
  { title: "Atendimento Personalizado", desc: "Foco total nas suas necessidades" },
  { title: "Transparência Total", desc: "Sem surpresas ou taxas ocultas" },
];

const CONSIGNADO = [
  "Desconto automático na folha",
  "Taxas reduzidas",
  "Maior prazo para pagamento",
];

export default function FinanceiraLinkPage() {
  return (
    <>
      <style>{`
        body { background: linear-gradient(135deg, #0a0a0a 0%, #141414 50%, #0d0d0e 100%); min-height: 100vh; }
        .fin-bg {
          position: fixed; inset: 0; z-index: 0;
          background:
            radial-gradient(circle at 20% 20%, rgba(30,88,186,0.12) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(59,130,246,0.08) 0%, transparent 50%);
          animation: bgPulse 4s ease-in-out infinite;
        }
        @keyframes bgPulse { 0%,100%{opacity:.7} 50%{opacity:1} }
        .fin-grid {
          position: fixed; inset: 0; z-index: 1;
          opacity: 0.07;
          background-image:
            linear-gradient(rgba(30,88,186,.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(30,88,186,.4) 1px, transparent 1px);
          background-size: 60px 60px;
          animation: gridFlow 12s linear infinite;
        }
        @keyframes gridFlow { 0%{transform:translate(0,0)} 100%{transform:translate(60px,60px)} }
        .fin-card {
          background: rgba(255,255,255,0.97);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(30,88,186,0.15);
          box-shadow: 0 20px 40px rgba(0,0,0,0.15), 0 8px 16px rgba(30,88,186,0.1);
          border-radius: 1.5rem;
          margin-bottom: 1.25rem;
          transition: all .3s ease;
        }
        .fin-btn {
          background: linear-gradient(135deg, #1e58ba 0%, #3b82f6 100%);
          color: white; font-weight: 800; border-radius: 1rem;
          padding: 1.1rem 1.5rem;
          display: flex; align-items: center; justify-content: center; gap: .75rem;
          font-size: 1.1rem; text-decoration: none; width: 100%;
          box-shadow: 0 10px 30px rgba(30,88,186,0.4);
          transition: all .3s ease;
        }
        .fin-btn:hover { transform: translateY(-4px); box-shadow: 0 18px 40px rgba(30,88,186,0.55); }
        .social-card {
          background: rgba(255,255,255,0.95);
          border: 1px solid rgba(30,88,186,0.15);
          border-radius: 1rem; padding: 1.25rem;
          display: flex; flex-direction: column; align-items: center; gap: .5rem;
          text-decoration: none; transition: all .3s ease;
          box-shadow: 0 4px 16px rgba(0,0,0,0.08);
        }
        .social-card:hover { transform: translateY(-6px); box-shadow: 0 16px 32px rgba(0,0,0,0.15); }
        .service-item {
          background: #f8fafc; border: 2px solid transparent;
          border-radius: .875rem; padding: 1rem 1.25rem;
          transition: all .3s ease; position: relative; overflow: hidden;
        }
        .service-item::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, #1e58ba 0%, #3b82f6 100%);
          transform: scaleX(0); transition: transform .3s ease;
        }
        .service-item:hover { border-color: rgba(30,88,186,0.3); background: #fff; }
        .service-item:hover::before { transform: scaleX(1); }
        .timeline-item { position: relative; padding-left: 2rem; margin-bottom: 1.25rem; }
        .timeline-item::before {
          content: ''; position: absolute; left: 0; top: 6px;
          width: 14px; height: 14px;
          background: linear-gradient(135deg, #1e58ba, #3b82f6);
          border-radius: 50%; border: 3px solid white;
          box-shadow: 0 0 0 3px rgba(30,88,186,0.2);
        }
        .timeline-item::after {
          content: ''; position: absolute; left: 6px; top: 20px;
          width: 2px; height: calc(100% + 8px);
          background: linear-gradient(180deg, #1e58ba, transparent);
        }
        .timeline-item:last-child::after { display: none; }
        .whatsapp-float {
          position: fixed; bottom: 24px; right: 24px; z-index: 100;
          width: 64px; height: 64px; border-radius: 50%;
          background: linear-gradient(135deg, #25d366, #20ba5a);
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 8px 24px rgba(37,211,102,0.45);
          text-decoration: none;
          animation: wFloat 3s ease-in-out infinite;
        }
        @keyframes wFloat {
          0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)}
        }
        .whatsapp-float:hover { transform: scale(1.12) !important; }
        .section-bar {
          position: relative; padding-left: 1.25rem;
          font-weight: 800; font-size: 1.1rem; color: #1e58ba; margin-bottom: 1.25rem;
        }
        .section-bar::before {
          content: ''; position: absolute; left: 0; top: 0; bottom: 0;
          width: 4px; background: linear-gradient(180deg, #1e58ba, #3b82f6);
          border-radius: 2px;
        }
      `}</style>

      <div className="fin-bg" />
      <div className="fin-grid" />

      {/* WhatsApp float */}
      <a href="https://wa.me/5598981738065" target="_blank" rel="noreferrer" className="whatsapp-float">
        <WhatsappIcon className="h-8 w-8 text-white" />
      </a>

      <div className="relative z-10 py-8 px-4 max-w-md mx-auto">

        {/* Header */}
        <div className="fin-card p-8 text-center">
          <div className="w-24 h-24 rounded-2xl overflow-hidden mx-auto mb-5 shadow-xl" style={{ background: "linear-gradient(135deg,#1e58ba,#3b82f6)" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/imglinks/financeira-logo.jpg" alt="Cevan Financeira" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-4xl font-black text-slate-800">CEVAN</h1>
          <h2 className="text-2xl font-bold mt-1" style={{ color: "#1e58ba" }}>FINANCEIRA</h2>
          <p className="text-slate-600 font-semibold mt-2 mb-4">Transformamos crédito em conquistas</p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold" style={{ borderColor: "#1e58ba", color: "#1e58ba", background: "rgba(30,88,186,0.06)" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
            Santa Luzia/MA
          </div>
        </div>

        {/* CTA principal */}
        <div className="mb-5">
          <a href="https://wa.me/5598981738065" target="_blank" rel="noreferrer" className="fin-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-6 w-6"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="m8 21 4-4 4 4"/><path d="M8 10h.01M12 10h.01M16 10h.01"/></svg>
            SOLICITAR SIMULAÇÃO
          </a>
        </div>

        {/* Social cards */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <a href="https://maps.app.goo.gl/n3HfEjynDQkQiPaQ9" target="_blank" rel="noreferrer" className="social-card">
            <svg viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth={2} className="h-8 w-8"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
            <span className="font-bold text-slate-800 text-sm">Localização</span>
            <span className="text-slate-500 text-xs">Faça uma visita</span>
          </a>
          <a href="https://www.instagram.com/cevan.financeira/" target="_blank" rel="noreferrer" className="social-card">
            <InstagramIcon className="h-8 w-8 text-pink-500" />
            <span className="font-bold text-slate-800 text-sm">Instagram</span>
            <span className="text-slate-500 text-xs">@cevan.financeira</span>
          </a>
        </div>

        {/* Serviços */}
        <div className="fin-card p-6">
          <div className="section-bar">Nossos Serviços</div>
          <div className="space-y-3">
            {SERVICES.map((s) => (
              <div key={s.title} className="service-item flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.gradient} flex items-center justify-center text-xl shrink-0 shadow-md`}>
                  {s.icon}
                </div>
                <div>
                  <p className="font-bold text-slate-800">{s.title}</p>
                  <p className="text-slate-500 text-sm">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Por que escolher */}
        <div className="fin-card p-6">
          <div className="section-bar">Por que escolher a CEVAN?</div>
          <div>
            {WHY.map((w) => (
              <div key={w.title} className="timeline-item">
                <p className="font-bold text-slate-800 text-sm">{w.title}</p>
                <p className="text-slate-500 text-xs mt-0.5">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Consignado */}
        <div className="fin-card p-6">
          <div className="section-bar">Entenda o Consignado</div>
          <div className="rounded-xl p-4 mb-4 text-sm leading-relaxed" style={{ background: "linear-gradient(90deg,#eff6ff,#eef2ff)", border: "1px solid #1e58ba" }}>
            O <strong style={{ color: "#1e58ba" }}>empréstimo consignado</strong> é descontado direto da sua folha de pagamento, garantindo <strong style={{ color: "#1e58ba" }}>menores taxas</strong> e mais segurança para você e sua família.
          </div>
          <div className="space-y-2">
            {CONSIGNADO.map((item) => (
              <div key={item} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-100 text-sm text-slate-700 font-medium">
                <svg viewBox="0 0 24 24" fill="none" stroke="#1e58ba" strokeWidth={2.5} className="h-5 w-5 shrink-0"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Localização */}
        <div className="fin-card p-6 text-center">
          <svg viewBox="0 0 24 24" fill="none" stroke="#1e58ba" strokeWidth={2} className="h-10 w-10 mx-auto mb-3"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
          <h3 className="font-black text-slate-800 text-lg mb-3">Nossa Localização</h3>
          <a href="https://maps.app.goo.gl/n3HfEjynDQkQiPaQ9" target="_blank" rel="noreferrer">
            <div className="rounded-xl p-4 border text-sm" style={{ background: "linear-gradient(135deg,#f8fafc,#eff6ff)", borderColor: "#1e58ba" }}>
              <p className="font-bold text-slate-800">Avenida Newton Bello, 1032-A</p>
              <p className="text-slate-500 font-medium">Centro - Santa Luzia/MA</p>
              <div className="mt-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold" style={{ background: "linear-gradient(90deg,#dbeafe,#e0e7ff)", border: "1px solid #1e58ba", color: "#1e58ba" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3 w-3"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                Venha nos conhecer!
              </div>
            </div>
          </a>
        </div>

        {/* Footer */}
        <div className="fin-card p-5 text-center">
          <p className="font-black text-lg" style={{ color: "#1e58ba" }}>CEVAN FINANCEIRA</p>
          <p className="text-slate-500 text-sm font-medium">Confiança tem nome</p>
          <p className="text-sm font-bold mt-1" style={{ color: "#1e58ba" }}>Transformamos crédito em conquistas</p>
        </div>

      </div>
    </>
  );
}
