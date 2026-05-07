"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, UserCircle, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { PublicFooter } from "@/components/public/footer";
import { useState, useEffect } from "react";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setIsMenuOpen(false); }, [pathname]);

  const isGrupoCevan = pathname.startsWith("/grupo-cevan");
  const hideFooter = pathname === "/grupo-cevan/financeira" || pathname === "/grupo-cevan/supermercado";

  const defaultNavLinks = [
    { name: "Início", href: "/" },
    { name: "Vagas", href: "/jobs" },
    { name: "Para Empresas", href: "/servicos" },
    { name: "Grupo Cevan", href: "/grupo-cevan" },
    { name: "Quem Somos", href: "/about" },
  ];

  const grupoCevanNavLinks = [
    { name: "Início", href: "/grupo-cevan" },
    { name: "Sobre", href: "/grupo-cevan/sobre" },
    { name: "Financeira", href: "/grupo-cevan/financeira" },
    { name: "Serviços Empresariais", href: "/" },
    { name: "Supermercado", href: "/grupo-cevan/supermercado" },
  ];

  const navLinks = isGrupoCevan ? grupoCevanNavLinks : defaultNavLinks;

  return (
    <div className="flex min-h-screen flex-col bg-[#fafafa] text-foreground">

      <nav className={cn(
        "fixed top-0 left-0 right-0 z-50 flex items-center px-5 sm:px-8 lg:px-14 transition-all duration-300",
        scrolled
          ? "h-16 bg-white shadow-[0_2px_24px_rgba(0,0,0,0.07)] border-b border-slate-100"
          : "h-20 lg:h-24 bg-white/90 backdrop-blur-xl border-b border-slate-200/50"
      )}>

        {/* Logo */}
        <Link href={isGrupoCevan ? "/grupo-cevan" : "/"} className="flex-none flex items-center gap-3 group z-10">
          <Image
            src={isGrupoCevan ? "/logotipo-grupocevan.png" : "/logoprincipal.png"}
            alt={isGrupoCevan ? "Grupo Cevan" : "Cevan"}
            width={220}
            height={64}
            className={cn(
              "w-auto object-contain transition-all duration-300",
              scrolled ? "h-8" : "h-10 lg:h-12"
            )}
            priority
          />
        </Link>

        {/* Desktop Nav Links — centered */}
        <div className="hidden lg:flex items-center gap-1 mx-auto z-10">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "relative px-4 py-2 rounded-xl text-[14px] font-semibold tracking-tight transition-all duration-200 whitespace-nowrap",
                  isActive
                    ? "text-[#1967D2]"
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                )}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-xl bg-blue-50 -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Desktop Right Actions */}
        <div className="hidden lg:flex items-center gap-3 z-10 ml-auto lg:ml-0">
          {!isGrupoCevan && (
            <>
              <Link
                href="/login"
                className="flex items-center gap-2 h-10 px-4 rounded-xl text-[13px] font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all"
              >
                <UserCircle className="h-4 w-4 text-slate-400" />
                Área Restrita
              </Link>
              <div className="w-px h-5 bg-slate-200" />
            </>
          )}

          <Link
            href="/#contato"
            className="inline-flex items-center gap-2 h-10 px-5 rounded-xl bg-[#1967D2] hover:bg-[#1250b0] text-white font-bold text-[13px] transition-all hover:shadow-lg hover:shadow-blue-200 active:scale-95"
          >
            Fale Conosco
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden ml-auto flex items-center justify-center h-10 w-10 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors z-10"
          aria-label="Menu"
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[55] lg:hidden"
            />

            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="fixed top-0 right-0 bottom-0 w-[80%] max-w-[340px] z-[60] lg:hidden bg-white shadow-2xl flex flex-col"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
                <Image src={isGrupoCevan ? "/logotipo-grupocevan.png" : "/logoprincipal.png"} alt={isGrupoCevan ? "Grupo Cevan" : "Cevan"} width={120} height={36} className="h-7 w-auto object-contain" />
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="h-9 w-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Links */}
              <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
                <p className="px-3 mb-3 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Menu</p>
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={cn(
                        "flex items-center justify-between px-4 py-3.5 rounded-2xl font-semibold text-[15px] transition-all",
                        isActive
                          ? "bg-blue-50 text-[#1967D2]"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      )}
                    >
                      {link.name}
                      <ArrowRight className={cn(
                        "h-4 w-4 transition-all duration-200",
                        isActive ? "text-[#1967D2] translate-x-0 opacity-100" : "opacity-0 -translate-x-2"
                      )} />
                    </Link>
                  );
                })}
              </nav>

              {/* Drawer footer CTAs */}
              <div className="px-4 pb-8 pt-4 border-t border-slate-100 space-y-3">
                <Link
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-slate-50 text-slate-700 font-semibold hover:bg-slate-100 transition-all"
                >
                  <UserCircle className="h-5 w-5 text-slate-400" />
                  Área Restrita
                </Link>
                <Link
                  href="/#contato"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-[#1967D2] text-white font-black text-[13px] uppercase tracking-widest shadow-lg shadow-blue-200 hover:bg-[#1250b0] transition-all"
                >
                  <Mail className="h-4 w-4" />
                  Fale Conosco
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main className="flex-1">
        {children}
      </main>
      {!hideFooter && <PublicFooter />}
    </div>
  );
}
