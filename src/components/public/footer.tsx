import Image from "next/image";

export function PublicFooter() {
  return (
    <footer className="bg-slate-900 text-white pt-24 pb-12 rounded-t-[3rem] lg:rounded-t-[4rem] relative overflow-hidden z-20">
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#1967D2] to-transparent opacity-50" />
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-16">
          <div className="lg:col-span-2 space-y-8 pr-10">
             <div className="flex items-center gap-3">
               <Image src="/logoprincipal.png" alt="Cevan Serviços Empresariais" width={320} height={96} className="h-16 w-auto object-contain brightness-0 invert opacity-90" />
             </div>
             <div className="space-y-1">
               <p className="text-slate-400 text-[13px] font-bold tracking-widest uppercase">Plantão VIP Ininterrupto</p>
               <p className="text-white text-[32px] font-black tracking-tight">123 456 7890</p>
             </div>
             <p className="text-[15px] text-slate-400 leading-relaxed font-medium">
               Avenida Paulista, 1000, Bela Vista <br/> São Paulo - SP, 01310-100, Brasil.<br/>
               <a href="mailto:atendimento@cevan.com.br" className="text-white font-bold hover:text-[#1967D2] transition-colors mt-4 inline-block underline underline-offset-4 decoration-slate-600 hover:decoration-[#1967D2]">atendimento@cevan.com.br</a>
             </p>
          </div>
          
          {[
            { title: "Para Candidatos", items: ["Pesquisar Vagas", "Perfil Campeão", "Blog de Carreira"] },
            { title: "Para Empresas", items: ["Anunciar Vaga", "Curadoria Especializada", "Planos e Preços"] },
            { title: "A Cevan", items: ["Nossa História", "Como Funciona", "Termos de Uso", "Privacidade"] },
          ].map((col) => (
            <div key={col.title} className="space-y-8 lg:ml-auto">
              <h4 className="font-extrabold text-[18px] text-white tracking-wide">{col.title}</h4>
              <ul className="space-y-4 text-slate-400 text-[15px] font-medium">
                {col.items.map(item => (
                  <li key={item}>
                    <a href="#" className="hover:text-blue-400 hover:translate-x-1.5 inline-block transition-transform duration-300">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-10 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6 text-[14px] text-slate-500 font-medium">
          <p>© {new Date().getFullYear()} Cevan Serviços Empresariais. Todos os direitos reservados.</p>
          <div className="flex gap-4">
            {['Facebook', 'Twitter', 'LinkedIn', 'Instagram'].map(social => (
              <a key={social} href="#" className="hover:text-white transition-colors bg-slate-800/50 hover:bg-[#1967D2] px-4 py-2 rounded-full shadow-sm text-[13px] tracking-wide font-bold">{social}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
