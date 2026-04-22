"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  Building2, 
  Users2, 
  Zap, 
  Settings, 
  LogOut,
  Search,
  Bell,
  LineChart,
  BrainCircuit,
  LayoutDashboard
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { logout } from "@/actions/auth";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const menuSections = [
    {
      label: "Painel de Controle",
      items: [
        { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
        { name: "Métricas Financeiras", href: "/admin/finance", icon: LineChart },
      ]
    },
    {
      label: "Gestão da Rede",
      items: [
        { name: "Empresas", href: "/admin/companies", icon: Building2 },
        { name: "Usuários", href: "/admin/users", icon: Users2 },
      ]
    },
    {
      label: "Operações IA",
      items: [
        { name: "Curadoria", href: "/admin/managed", icon: Zap },
        { name: "Motor de IA", href: "/admin/ai", icon: BrainCircuit },
      ]
    },
    {
      label: "Sistema",
      items: [
        { name: "Configurações", href: "/admin/settings", icon: Settings },
      ]
    }
  ];

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] text-foreground overflow-hidden">
      {/* Sidebar Administrativa */}
      <aside className="w-76 border-r border-slate-800/50 bg-[#0B1222] text-slate-300 flex flex-col z-20 shadow-2xl transition-all duration-300">
        <div className="p-8 flex flex-col items-center border-b border-white/5">
          <Link href="/" className="flex flex-col items-center group w-full">
            <Image 
              src="/logoprincipal.png" 
              alt="Cevan" 
              width={240} 
              height={70} 
              className="h-14 w-auto object-contain brightness-0 invert opacity-100 transition-all group-hover:scale-105" 
            />
          </Link>
        </div>

        <nav className="flex-1 px-5 py-8 space-y-8 overflow-y-auto custom-scrollbar pb-10">
          {menuSections.map((section) => (
            <div key={section.label} className="space-y-2.5">
              <p className="px-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">{section.label}</p>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link 
                      key={item.name} 
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3.5 px-4 py-3 rounded-2xl text-[13px] font-bold transition-all group relative",
                        isActive 
                          ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" 
                          : "text-slate-400 hover:bg-white/5 hover:text-white"
                      )}
                    >
                      <item.icon className={cn(
                        "h-5 w-5 transition-transform group-hover:scale-110",
                        isActive ? "text-white" : "text-slate-500 group-hover:text-blue-400"
                      )} />
                      {item.name}
                      {isActive && (
                        <div className="absolute right-4 w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </aside>

      {/* Área de Conteúdo */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header Compacto */}
        <header className="h-20 border-b border-slate-200 bg-white/80 backdrop-blur-xl flex items-center justify-between px-10 z-10 sticky top-0">
          <div className="flex items-center gap-6">
            <h1 className="text-xl font-black text-slate-900 tracking-tight uppercase">Painel Administrativo</h1>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative w-72 group hidden lg:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              <Input 
                placeholder="Busca rápida..." 
                className="pl-12 h-11 border-none bg-slate-100 rounded-2xl focus-visible:ring-4 focus-visible:ring-blue-500/10 font-bold text-sm text-slate-900 transition-all"
              />
            </div>
            
            <div className="flex items-center gap-4 border-l border-slate-100 pl-6">
              <Button variant="ghost" size="icon" className="relative h-11 w-11 rounded-xl bg-white shadow-sm border border-slate-100 group">
                <Bell className="h-5 w-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
                <span className="absolute top-3 right-3 w-2 h-2 bg-blue-600 rounded-full border-2 border-white" />
              </Button>

              <div className="flex items-center gap-3 bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-3 px-2">
                  <div className="text-right hidden sm:block leading-none">
                    <p className="text-[11px] font-black text-slate-900">Super Admin</p>
                    <p className="text-[9px] font-bold text-blue-500 uppercase mt-1">Master</p>
                  </div>
                  <div className="h-9 w-9 rounded-xl bg-blue-600 flex items-center justify-center font-black text-white text-xs shadow-lg">
                    AD
                  </div>
                </div>
                <form action={async () => {
                  await logout();
                }}>
                  <Button type="submit" variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-slate-400 hover:text-rose-500 transition-all">
                    <LogOut className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </header>

        {/* Conteúdo Principal */}
        <main className="flex-1 overflow-y-auto bg-[#F8FAFC] p-10 custom-scrollbar">
          <div className="max-w-[1500px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

