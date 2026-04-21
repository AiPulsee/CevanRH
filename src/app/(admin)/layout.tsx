"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  ShieldCheck, 
  Building2, 
  Users2, 
  Zap, 
  Settings, 
  LogOut,
  Search,
  Bell,
  Activity
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { logout } from "@/actions/auth";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navigation = [
    { name: "Visão Global", href: "/admin", icon: Activity },
    { name: "Empresas", href: "/admin/companies", icon: Building2 },
    { name: "Vagas p/ Curadoria", href: "/admin/managed", icon: Zap },
    { name: "Todos Usuários", href: "/admin/users", icon: Users2 },
    { name: "Configurações", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-[#f1f5f9] text-foreground overflow-hidden">
      {/* Admin Sidebar - Darker and more "Control Panel" feel */}
      <aside className="w-64 border-r border-slate-200 bg-slate-900 text-slate-300 flex flex-col z-20">
        <div className="p-6">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500">
              <ShieldCheck className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-black tracking-tighter text-white">Cevan<span className="text-indigo-400">Admin</span></span>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-1 mt-4">
          <p className="px-3 text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Menu Principal</p>
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all group",
                  isActive 
                    ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20" 
                    : "hover:bg-white/5 hover:text-white"
                )}
              >
                <item.icon className={cn(
                  "h-5 w-5 transition-colors",
                  isActive ? "text-indigo-400" : "text-slate-500 group-hover:text-white"
                )} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800 space-y-4">
          <div className="flex items-center gap-3 px-3 py-3 rounded-2xl bg-slate-800/50">
            <div className="h-10 w-10 rounded-full bg-slate-700 flex items-center justify-center font-bold text-indigo-400">
              AD
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-white truncate">Internal Team</p>
              <p className="text-[10px] text-slate-500">Super Admin</p>
            </div>
          </div>
          
          <form action={async () => {
            await logout();
          }}>
            <Button type="submit" variant="ghost" className="w-full justify-start gap-3 text-slate-500 hover:text-rose-400 hover:bg-rose-400/5 font-bold transition-all">
              <LogOut className="h-5 w-5" />
              Sair do Admin
            </Button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-8 z-10 shadow-sm">
          <div className="flex items-center gap-4">
            <Badge className="bg-indigo-500/10 text-indigo-600 border-indigo-500/20 rounded-full px-4">
              Ambiente de Produção
            </Badge>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative w-64 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input 
                placeholder="Buscar em todo o sistema..." 
                className="pl-10 h-10 border-slate-200 bg-slate-50 rounded-xl focus-visible:ring-indigo-500/20"
              />
            </div>
            <Button variant="ghost" size="icon" className="relative rounded-xl border border-slate-200 bg-white">
              <Bell className="h-5 w-5 text-slate-400" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full border-2 border-white" />
            </Button>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
}
