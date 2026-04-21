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
  Activity,
  LineChart,
  BrainCircuit
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { logout } from "@/actions/auth";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navigation = [
    { name: "Visão Global", href: "/admin", icon: Activity },
    { name: "Empresas", href: "/admin/companies", icon: Building2 },
    { name: "Métricas", href: "/admin/finance", icon: LineChart },
    { name: "Vagas p/ Curadoria", href: "/admin/managed", icon: Zap },
    { name: "Controle da IA", href: "/admin/ai", icon: BrainCircuit },
    { name: "Todos Usuários", href: "/admin/users", icon: Users2 },
    { name: "Configurações", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-[#f1f5f9] text-foreground overflow-hidden">
      {/* Admin Sidebar - Premium Dark Mode */}
      <aside className="w-72 border-r border-slate-800 bg-[#0f172a] text-slate-300 flex flex-col z-20 shadow-2xl shadow-slate-900/50">
        <div className="p-8">
          <Link href="/" className="flex items-center justify-center group">
            <Image src="/logoprincipal.png" alt="CevanAdmin" width={400} height={120} className="h-20 w-auto object-contain brightness-0 invert opacity-90 transition-opacity group-hover:opacity-100" />
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-1.5 mt-2">
          <p className="px-4 text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4">Menu Principal</p>
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all group",
                  isActive 
                    ? "bg-blue-600/10 text-blue-400 border border-blue-500/10" 
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                )}
              >
                <div className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-xl transition-all",
                  isActive ? "bg-blue-500 text-white shadow-md shadow-blue-500/20" : "bg-slate-800/50 text-slate-400 group-hover:bg-slate-700 group-hover:text-white"
                )}>
                  <item.icon className="h-5 w-5" />
                </div>
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Profile / Logout */}
        <div className="p-6 mt-auto border-t border-slate-800/50">
          <form action={async () => {
            await logout();
          }} className="flex items-center justify-between mt-6 px-2">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center font-black text-white text-sm shadow-md shadow-blue-600/20">
                AD
              </div>
              <div className="overflow-hidden">
                <span className="block text-sm font-bold text-white truncate">Super Admin</span>
                <span className="block text-[10px] font-medium text-slate-500 truncate">Sair do sistema</span>
              </div>
            </div>
            <Button type="submit" variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10">
              <LogOut className="h-5 w-5" />
            </Button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-20 border-b border-slate-200 bg-white flex items-center justify-between px-8 z-10 shadow-sm">
          <div className="flex items-center gap-4">
            <Badge className="bg-blue-50 text-blue-600 border border-blue-100 rounded-full px-4 py-1 font-bold">
              Ambiente de Produção
            </Badge>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative w-72 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input 
                placeholder="Buscar no sistema..." 
                className="pl-12 h-12 border-none bg-slate-100 rounded-2xl focus-visible:ring-2 focus-visible:ring-blue-500/20 font-medium text-sm text-slate-900"
              />
            </div>
            <Button variant="ghost" size="icon" className="relative h-12 w-12 rounded-2xl bg-white shadow-sm border border-slate-100 hover:bg-slate-50">
              <Bell className="h-5 w-5 text-slate-400" />
              <span className="absolute top-3 right-3 w-2 h-2 bg-blue-500 rounded-full border-2 border-white" />
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
