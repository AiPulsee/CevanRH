"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Menu, X, ArrowRight, UserCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { PublicFooter } from "@/components/public/footer";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Início", href: "/" },
    { name: "Vagas", href: "/jobs" },
    { name: "Serviços", href: "/servicos" },
    { name: "Quem Somos", href: "/about" },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[#fafafa] text-foreground">
      {/* Refined Navigation Bar with Glassmorphism */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center bg-white/80 backdrop-blur-xl border-b border-slate-200/60 h-20 lg:h-24 px-6 lg:px-16 transition-all duration-300">
            
            {/* Left: Logo Area */}
            <div className="flex-1 flex justify-start">
              <Link href="/" className="flex items-center group transition-transform hover:scale-[1.02]">
                <Image 
                  src="/logoprincipal.png" 
                  alt="Cevan Serviços Empresariais" 
                  width={280} 
                  height={80} 
                  className="h-10 sm:h-12 lg:h-16 w-auto object-contain" 
                  priority 
                />
              </Link>
            </div>

            {/* Center: Navigation Links */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => {
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
                Área Restrita
              </Link>
              <Link
                href="/#contato"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "rounded-2xl font-black bg-[#1967D2] hover:bg-[#1557b0] h-14 px-10 shadow-xl shadow-blue-200/50 hover:shadow-blue-300/60 transition-all hover:-translate-y-0.5 active:scale-95 text-[13px] tracking-widest uppercase flex items-center justify-center text-white border-none"
                )}
              >
                Fale Conosco
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="flex lg:hidden ml-auto items-center">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="h-12 w-12 rounded-2xl bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/50"
              >
                 {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
        </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[55] lg:hidden"
            />
            
            {/* Drawer */}
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white z-[60] lg:hidden shadow-2xl flex flex-col"
            >
              <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <Image 
                  src="/logoprincipal.png" 
                  alt="Logo" 
                  width={140} 
                  height={40} 
                  className="h-8 w-auto object-contain" 
                />
                <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)} className="rounded-xl">
                  <X className="h-6 w-6 text-slate-400" />
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-6">
                <div className="space-y-2">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Navegação</p>
                  {navLinks.map((link) => (
                    <Link 
                      key={link.name} 
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={cn(
                        "flex items-center justify-between p-4 rounded-2xl font-bold transition-all",
                        pathname === link.href ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-50"
                      )}
                    >
                      {link.name}
                      <ArrowRight className={cn("h-4 w-4 transition-transform", pathname === link.href ? "translate-x-0" : "-translate-x-4 opacity-0")} />
                    </Link>
                  ))}
                </div>

                <div className="pt-6 border-t border-slate-100 space-y-4">
                  <Link 
                    href="/login" 
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 text-slate-700 font-bold hover:bg-slate-100 transition-all"
                  >
                    <UserCircle className="h-6 w-6 text-slate-400" />
                    Área Restrita
                  </Link>
                  <Link
                    href="/#contato"
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                      buttonVariants({ size: "lg" }),
                      "w-full h-16 rounded-2xl bg-[#1967D2] text-white font-black uppercase tracking-widest text-[12px] shadow-xl shadow-blue-200 flex items-center justify-center border-none"
                    )}
                  >
                    Fale Conosco
                  </Link>
                </div>
              </div>

              <div className="p-8 bg-slate-50 text-center">
                <p className="text-xs font-medium text-slate-400">© 2026 Cevan RH</p>
                <p className="text-[10px] font-bold text-slate-300 mt-1 uppercase tracking-widest">Excelência em Talentos</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main className="flex-1">
        {children}
      </main>
      <PublicFooter />
    </div>
  );
}
