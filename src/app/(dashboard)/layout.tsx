"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  Zap, 
  CreditCard, 
  Settings, 
  LogOut,
  ChevronRight,
  TrendingUp
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { logout } from "@/actions/auth";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navigation = [
    { name: "Visão Geral", href: "/dashboard", icon: LayoutDashboard },
    { name: "Minhas Vagas", href: "/dashboard/jobs", icon: Briefcase },
    { name: "Candidatos", href: "/dashboard/candidates", icon: Users },
    { name: "Curadoria", href: "/dashboard/shortlists", icon: Zap },
    { name: "Financeiro", href: "/dashboard/billing", icon: CreditCard },
    { name: "Configurações", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] text-foreground">
      {/* Sidebar - Matching User Screenshot */}
      <aside className="w-72 border-r border-slate-200 bg-white flex flex-col z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
        <div className="p-8">
          <Link href="/" className="flex items-center justify-center group">
            <Image src="/logoprincipal.png" alt="CevanRH" width={400} height={120} className="h-20 w-auto object-contain transition-transform group-hover:scale-105" priority />
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-1.5 mt-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all group",
                  isActive 
                    ? "bg-primary/5 text-primary" 
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <div className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-xl transition-all",
                  isActive ? "bg-primary text-white shadow-md shadow-primary/20" : "bg-transparent text-slate-400 group-hover:text-slate-600"
                )}>
                  <item.icon className="h-5 w-5" />
                </div>
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Plan Upgrade Card - From Screenshot */}
        <div className="p-6 mt-auto">
          <div className="p-5 rounded-[2rem] bg-white border border-slate-100 shadow-xl shadow-slate-200/50 space-y-4">
            <div className="space-y-1">
              <p className="text-[10px] font-black uppercase tracking-widest text-primary">Plano Pro</p>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">Sua empresa está com 80% da cota de vagas.</p>
            </div>
            <Button className="w-full rounded-xl font-black text-xs uppercase h-11 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
              Upgrade
            </Button>
          </div>
          
          <form action={async () => {
            await logout();
          }} className="flex items-center justify-between mt-6 px-2">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-slate-900 flex items-center justify-center font-black text-white text-sm">
                D
              </div>
              <span className="text-sm font-bold text-slate-900">Sair</span>
            </div>
            <Button type="submit" variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50">
              <LogOut className="h-5 w-5" />
            </Button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top bar with Search and Profile */}
        <header className="h-20 flex items-center justify-between px-8 bg-transparent z-10">
          <div className="relative w-96">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input 
              type="text" 
              placeholder="Pesquisar..." 
              className="w-full h-12 pl-12 pr-4 rounded-2xl border-none bg-white shadow-sm focus:ring-2 focus:ring-primary/20 transition-all font-medium text-sm"
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-white shadow-sm flex items-center justify-center border border-slate-100 cursor-pointer hover:bg-slate-50 transition-all">
              <TrendingUp className="h-5 w-5 text-slate-400" />
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="max-w-[1400px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
