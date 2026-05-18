"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, MapPin, Phone, Globe, ShieldCheck, ArrowRight } from "lucide-react";

function useFooterLogo() {
  const pathname = usePathname();
  if (pathname.startsWith("/grupo-cevan/cevanpay"))
    return { src: "/cevanpay/Logo - Cevanpay.png", alt: "CevanPay" };
  if (pathname.startsWith("/grupo-cevan/financeira"))
    return { src: "/cevanfinanceira/logo Cevan Financeira 2.png", alt: "Cevan Financeira" };
  if (pathname.startsWith("/grupo-cevan/supermercado"))
    return { src: "/cevansupermercado/Logo - Cevan Supermercado.png", alt: "Cevan Supermercados" };
  return { src: "/logotipo-grupocevan.png", alt: "Grupo Cevan" };
}

export function GrupoCevanFooter() {
  const logo = useFooterLogo();

  return (
    <footer className="bg-[#0B1222] text-white pt-24 pb-12 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
      <div className="absolute -bottom-48 -left-48 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-8 mb-20">

          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-8">
            <Link href="/grupo-cevan" className="inline-block">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={250}
                height={100}
                className="h-9 w-auto object-contain"
              />
            </Link>
            <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-md">
              Uma holding multissetorial focada em transformar o mercado brasileiro através de excelência em gestão, finanças e serviços.
            </p>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-400">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <p className="text-white font-black text-sm uppercase tracking-widest">Compromisso Ético</p>
                <p className="text-slate-500 text-xs font-bold">Governança & Transparência</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-8">
            <h4 className="font-black text-xs uppercase tracking-[0.2em] text-blue-500">Navegação</h4>
            <ul className="space-y-4 text-slate-400 font-bold text-[15px]">
              <li><Link href="/grupo-cevan" className="hover:text-white transition-colors">Início</Link></li>
              <li><Link href="/grupo-cevan/sobre" className="hover:text-white transition-colors">Sobre o Grupo</Link></li>
              <li><Link href="/grupo-cevan/cevanpay" className="hover:text-white transition-colors">CevanPay</Link></li>
              <li><Link href="/grupo-cevan/financeira" className="hover:text-white transition-colors">Cevan Financeira</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Cevan Serviços</Link></li>
              <li><Link href="/grupo-cevan/supermercado" className="hover:text-white transition-colors">Supermercados</Link></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-5 space-y-8 lg:pl-10">
            <h4 className="font-black text-xs uppercase tracking-[0.2em] text-blue-500">Contato Corporativo</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-1">E-mail</p>
                    <p className="text-white font-bold text-sm">contato@grupocevan.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-1">Telefone</p>
                    <p className="text-white font-bold text-sm">(98) 98212-8321</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-1">Endereço</p>
                    <p className="text-white font-bold text-sm leading-relaxed">São Luís, MA <br /> Brasil</p>
                  </div>
                </div>
              </div>
            </div>

            <a
              href="https://wa.me/5598982128321"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 h-14 w-full justify-center rounded-2xl bg-[#1967D2] text-white font-black uppercase tracking-widest text-[11px] hover:bg-blue-500 transition-all group"
            >
              Fale Conosco <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[13px] text-slate-500 font-medium">
          <p>© {new Date().getFullYear()} Grupo Cevan Holding. Todos os direitos reservados.</p>
          <div className="flex items-center gap-8">
            <Link href="/about" className="hover:text-white transition-colors">Termos</Link>
            <Link href="/about" className="hover:text-white transition-colors">Privacidade</Link>
            <div className="flex items-center gap-2 text-slate-400">
              <Globe className="h-4 w-4" />
              <span>PT-BR</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
