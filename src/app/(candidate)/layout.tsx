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
  Briefcase
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { logout } from "@/actions/auth";

export default function CandidateLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navigation = [
    { name: "Minhas Vagas", href: "/me", icon: Home },
    { name: "Buscar Vagas", href: "/jobs", icon: Search },
    { name: "Meu Currículo", href: "/me/resume", icon: FileText },
    { name: "Configurações", href: "/me/settings", icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-[#fafafa] text-foreground">
      {/* Candidate Sidebar - Very clean, "Social/Personal" feel */}
      <aside className="w-64 border-r border-border bg-white flex flex-col z-20">
        <div className="p-6">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Briefcase className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-black tracking-tighter text-primary">Cevan<span className="text-foreground">RH</span></span>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-1 mt-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all",
                  isActive 
                    ? "bg-primary text-white shadow-lg shadow-primary/20" 
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-6">
          <div className="p-4 rounded-3xl bg-secondary border border-border">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2">Seu Perfil</p>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-black">
                D
              </div>
              <div>
                <p className="text-xs font-bold truncate">Danilo Silva</p>
                <p className="text-[10px] text-muted-foreground truncate">Desenvolvedor Full Stack</p>
              </div>
            </div>
            <form action={async () => {
              await logout();
            }}>
              <Button type="submit" variant="ghost" className="w-full mt-4 h-9 text-[10px] font-black uppercase text-rose-500 hover:bg-rose-50 hover:text-rose-600 transition-all">
                <LogOut className="h-3.5 w-3.5 mr-2" />
                Sair
              </Button>
            </form>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 border-b border-border bg-white/80 backdrop-blur-md flex items-center justify-between px-8 z-10">
          <h2 className="font-bold text-sm text-muted-foreground">Área do Candidato</h2>
          <Button variant="ghost" size="icon" className="relative rounded-full">
            <Bell className="h-5 w-5 text-muted-foreground" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
          </Button>
        </header>

        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
}
