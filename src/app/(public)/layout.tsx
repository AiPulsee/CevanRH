"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { PublicFooter } from "@/components/public/footer";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen flex-col bg-[#fafafa] text-foreground">
      {/* Refined Navigation Bar with Glassmorphism */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center bg-white/80 backdrop-blur-xl border-b border-slate-200/60 h-24 px-6 lg:px-16 transition-all duration-300">
          
          {/* Left: Logo Area */}
          <div className="flex-1 flex justify-start">
            <Link href="/" className="flex items-center group transition-transform hover:scale-[1.02]">
              <Image 
                src="/logoprincipal.png" 
                alt="Cevan Serviços Empresariais" 
                width={280} 
                height={80} 
                className="h-16 w-auto object-contain" 
                priority 
              />
            </Link>
          </div>

          {/* Center: Navigation Links */}
          <div className="hidden lg:flex items-center gap-8">
            {[
              { name: "Início", href: "/" },
              { name: "Vagas", href: "/jobs" },
              { name: "Empresas", href: "/empresas" },
              { name: "Como Funciona", href: "/how-it-works" },
              { name: "Planos", href: "/pricing" },
              { name: "Sobre a Cevan", href: "/about" },
            ].map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={link.name}
                  href={link.href} 
                  className={cn(
                    "relative py-2 text-[14px] font-bold tracking-tight transition-all duration-300",
                    isActive 
                      ? "text-[#1967D2]" 
                      : "text-slate-600 hover:text-[#1967D2]"
                  )}
                >
                  {link.name}
                  {isActive && (
                    <motion.div 
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#1967D2] rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right: Desktop Actions */}
          <div className="flex-1 hidden lg:flex items-center justify-end gap-8">
            <Link 
              href="/login" 
              className="text-[15px] font-bold text-slate-700 hover:text-[#1967D2] transition-all flex items-center gap-2 group"
            >
              <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                <span className="text-[10px]">👤</span>
              </div>
              Entrar / Cadastrar
            </Link>
            <Button 
              size="lg" 
              className="rounded-2xl font-black bg-[#1967D2] hover:bg-[#1557b0] h-14 px-10 shadow-xl shadow-blue-200/50 hover:shadow-blue-300/60 transition-all hover:-translate-y-0.5 active:scale-95 text-[13px] tracking-widest uppercase"
            >
              Anunciar Vaga
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden ml-auto items-center">
            <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/50">
               <Menu className="h-6 w-6" />
            </Button>
          </div>
      </nav>

      <main className="flex-1">
        {children}
      </main>
      <PublicFooter />
    </div>
  );
}
