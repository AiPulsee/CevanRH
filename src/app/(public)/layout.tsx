"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import Image from "next/image";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen flex-col bg-[#fafafa] text-foreground">
      {/* Premium Light Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center bg-white border-b border-slate-100 h-20 px-4 lg:px-10">
          {/* Logo */}
          <Link href="/" className="flex items-center group mr-4 lg:mr-12">
            <Image src="/logoprincipal.png" alt="CevanRH" width={280} height={80} className="h-14 w-auto object-contain" priority />
          </Link>

          <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-[#202124]">
            <Link href="/" className="hover:text-[#1967D2] transition-colors font-bold">Início</Link>
            <Link href="/jobs" className="hover:text-[#1967D2] transition-colors font-bold">Vagas</Link>
            <Link href="/empresas" className="hover:text-[#1967D2] transition-colors font-bold">Empresas</Link>
            <Link href="/candidatos" className="hover:text-[#1967D2] transition-colors font-bold">Candidatos</Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-6 ml-auto">
            <Link href="/login" className="text-sm font-bold text-[#202124] hover:text-[#1967D2] transition-colors">
              Entrar / Cadastrar
            </Link>
            <Button size="lg" className="rounded-xl font-bold bg-[#1967D2] hover:bg-blue-700 h-12 px-8">
              Anunciar Vaga
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden ml-auto items-center">
            <Button variant="ghost" size="icon" className="text-slate-600">
               <Menu className="h-8 w-8" />
            </Button>
          </div>
      </nav>

      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
