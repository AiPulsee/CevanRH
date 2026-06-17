import Image from "next/image";
import Link from "next/link";
import { Instagram, Facebook } from "lucide-react";
import { WHATSAPP_HREF } from "@/lib/contact";

export function PublicFooter() {
  return (
    <footer className="bg-slate-900 text-white pt-16 sm:pt-24 pb-12 rounded-t-[2rem] sm:rounded-t-[4rem] relative overflow-hidden z-20">
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#1967D2] to-transparent opacity-50" />
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 sm:gap-16 mb-12 sm:mb-16">
          <div className="lg:col-span-2 space-y-6 sm:space-y-8 pr-0 lg:pr-10 text-center lg:text-left flex flex-col items-center lg:items-start">
             <div className="flex items-center gap-3">
               <Image src="/cevanempresarial/logocevanempresarial.png" alt="Cevan Serviços Empresariais" width={320} height={96} className="h-12 sm:h-16 w-auto object-contain brightness-0 invert opacity-90" />
             </div>
             <div className="space-y-1">
               <p className="text-slate-400 text-[11px] sm:text-[13px] font-black tracking-widest uppercase">Fale com um Especialista</p>
               <a
                 href={WHATSAPP_HREF}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="text-white text-[24px] sm:text-[32px] font-black tracking-tight leading-none hover:text-[#1967D2] transition-colors inline-block"
               >
                 98 92000-7888
               </a>
             </div>
             <p className="text-sm sm:text-[15px] text-slate-400 leading-relaxed font-medium">
               Av. Newton Bello, 1032 - B, Centro, Santa Luzia/MA <br/>
               <a href="mailto:rh.cevanservicos@gmail.com" className="text-white font-bold hover:text-[#1967D2] transition-colors mt-4 inline-block underline underline-offset-4 decoration-slate-600 hover:decoration-[#1967D2]">rh.cevanservicos@gmail.com</a>
             </p>
          </div>
          
          {[
            { title: "Navegação", items: [{ name: "Serviços", href: "/servicos" }, { name: "Vagas de Emprego", href: "/jobs" }] },
            { title: "Empresa", items: [{ name: "Quem Somos", href: "/about" }, { name: "Grupo Cevan", href: "/grupo-cevan" }] },
          ].map((col) => (
            <div key={col.title} className="space-y-6 sm:space-y-8 lg:ml-auto text-center lg:text-left">
              <h4 className="font-extrabold text-[16px] sm:text-[18px] text-white tracking-wide">{col.title}</h4>
              <ul className="space-y-3 sm:space-y-4 text-slate-400 text-sm sm:text-[15px] font-medium">
                {col.items.map(item => (
                    <li key={item.name}>
                      <Link href={item.href} className="hover:text-blue-400 hover:translate-x-1.5 inline-block transition-transform duration-300">
                        {item.name}
                      </Link>
                    </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 sm:pt-10 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6 text-[13px] sm:text-[14px] text-slate-500 font-medium text-center">
          <p>© {new Date().getFullYear()} Cevan Serviços Empresariais. <br className="sm:hidden" /> Todos os direitos reservados.</p>

          <a
            href="https://www.instagram.com/ipulsemkt?igsh=MWlpb3A3MWQzb3Z5"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-slate-800/40 border border-slate-700/50 rounded-full pl-1.5 pr-4 py-1.5 hover:border-[#1967D2]/50 hover:bg-slate-800/70 transition-colors"
          >
            <Image src="/brasaoipulse.png" alt="iPulse" width={24} height={24} className="h-6 w-6 rounded-full object-contain shrink-0" />
            <span className="text-slate-400">Desenvolvido por <span className="text-slate-200 font-bold">iPulse</span></span>
          </a>

          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {[
              { name: 'Instagram', href: 'https://www.instagram.com/cevanempresarial/', icon: Instagram },
              { name: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61589249430689', icon: Facebook },
            ].map(social => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="flex items-center justify-center h-10 w-10 rounded-full bg-slate-800/50 text-slate-300 hover:text-white hover:bg-[#1967D2] transition-colors shadow-sm"
              >
                <social.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
