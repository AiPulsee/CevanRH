"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  Home, 
  Search, 
  FileText, 
  Settings, 
  LogOut,
  Bell,
  Briefcase,
  TrendingUp
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { logout } from "@/actions/auth";

export default function CandidateLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navigation = [
    { name: "Painel Principal", href: "/me", icon: Home },
    { name: "Buscar Vagas", href: "/jobs", icon: Search },
    { name: "Meu Currículo", href: "/me/resume", icon: FileText },
    { name: "Configurações", href: "/me/settings", icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] text-foreground">
      {/* Candidate Sidebar - Refined look */}
      <aside className="w-72 border-r border-slate-200 bg-white flex flex-col z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
        <div className="p-8">
          <Link href="/" className="flex items-center justify-center group">
            <Image src="/logoprincipal.png" alt="Cevan Serviços Empresariais" width={400} height={120} className="h-20 w-auto object-contain transition-transform group-hover:scale-105" />
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-1.5 mt-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href || (item.href === '/me' && pathname === '/me');
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all group",
                  isActive 
                    ? "bg-blue-600/5 text-blue-600" 
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <div className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-xl transition-all",
                  isActive ? "bg-blue-600 text-white shadow-md shadow-blue-600/20" : "bg-transparent text-slate-400 group-hover:text-slate-600"
                )}>
                  <item.icon className="h-5 w-5" />
                </div>
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Profile Completion Card */}
        <div className="p-6 mt-auto">
          <div className="p-5 rounded-[2rem] bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-xl shadow-blue-600/30 space-y-4">
            <div className="space-y-1">
              <p className="text-[10px] font-black uppercase tracking-widest text-blue-200">Perfil Campeão</p>
              <div className="flex items-center justify-between">
                <p className="text-xs text-white font-medium">85% Completo</p>
                <span className="text-xs font-bold text-yellow-300">Alto Rank</span>
              </div>
            </div>
            <div className="h-1.5 w-full bg-black/20 rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full w-[85%]" />
            </div>
            <Button className="w-full rounded-xl font-black text-xs uppercase h-10 bg-white hover:bg-slate-50 text-blue-600 shadow-sm mt-2">
              Completar Agora
            </Button>
          </div>
          
          <form action={async () => {
            await logout();
          }} className="flex items-center justify-between mt-6 px-2">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center font-black text-slate-600 text-sm border border-slate-200">
                DS
              </div>
              <div className="overflow-hidden">
                <span className="block text-sm font-bold text-slate-900 truncate">Danilo Silva</span>
                <span className="block text-[10px] font-medium text-slate-500 truncate">Sair da conta</span>
              </div>
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
              <Search className="h-5 w-5" />
            </div>
            <input 
              type="text" 
              placeholder="Buscar vagas, empresas..." 
              className="w-full h-12 pl-12 pr-4 rounded-2xl border-none bg-white shadow-sm focus:ring-2 focus:ring-blue-600/20 transition-all font-medium text-sm text-slate-900 placeholder:text-slate-400"
            />
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative h-12 w-12 rounded-2xl bg-white shadow-sm border border-slate-100 hover:bg-slate-50">
              <Bell className="h-5 w-5 text-slate-400" />
              <span className="absolute top-3 right-3 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
            </Button>
            <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl bg-white shadow-sm border border-slate-100 hover:bg-slate-50">
              <TrendingUp className="h-5 w-5 text-slate-400" />
            </Button>
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
