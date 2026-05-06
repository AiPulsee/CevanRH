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
  LineChart,
  LayoutDashboard,
  UserCheck,
  Receipt,
  FileText,
  Menu,
  X,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { logout } from "@/actions/auth";
import { NotificationsPopover } from "@/components/admin/notifications-popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogPortal, DialogOverlay } from "@/components/ui/dialog";

const ALL_SECTIONS = [
  {
    label: "Painel de Controle",
    items: [
      { name: "Painel", href: "/admin", icon: LayoutDashboard },
      { name: "Relatórios Gerais", href: "/admin/analytics", icon: LineChart, key: "ANALYTICS" },
    ],
  },
  {
    label: "Recrutamento & Seleção",
    items: [
      { name: "Banco de Currículos", href: "/admin/resumes", icon: FileText, key: "RESUMES" },
      { name: "Curadoria (Vagas)", href: "/admin/managed", icon: Zap, key: "MANAGED" },
      { name: "Alocações", href: "/admin/placements", icon: UserCheck, key: "PLACEMENTS" },
      { name: "Finanças", href: "/admin/finance", icon: Receipt, key: "FINANCE" },
      { name: "Empresas", href: "/admin/companies", icon: Building2, key: "COMPANIES" },
    ],
  },
  {
    label: "Sistema & Gestão",
    items: [
      { name: "Usuários ADM", href: "/admin/users", icon: Users2, key: "USERS" },
      { name: "Configurações", href: "/admin/settings", icon: Settings, key: "SETTINGS" },
    ],
  },
];

interface Props {
  children: React.ReactNode;
  userName: string | null;
  permissions: string[] | null; // null = acesso total (master)
}

export function AdminLayoutClient({ children, userName, permissions }: Props) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const allPermKeys = ALL_SECTIONS.flatMap(s => s.items.map(i => i.key)).filter(Boolean) as string[];
  const isMaster = permissions === null || (Array.isArray(permissions) && allPermKeys.every(k => permissions.includes(k)));

  const menuSections = ALL_SECTIONS.map((section) => ({
    ...section,
    items: section.items.filter(
      (item) => isMaster || !(item as any).key || (Array.isArray(permissions) && permissions.includes((item as any).key))
    ),
  })).filter((section) => section.items.length > 0);

  return (
    <TooltipProvider>
      <div className="flex min-h-screen bg-[#F8FAFC] text-foreground overflow-hidden relative">
        {/* Sidebar Desktop */}
        <aside className="w-76 border-r border-slate-800/50 bg-[#0B1222] text-slate-300 hidden lg:flex flex-col z-20 shadow-2xl transition-all duration-300">
          <SidebarContent pathname={pathname} menuSections={menuSections} />
        </aside>

        {/* Sidebar Mobile */}
        <Dialog open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <DialogPortal>
            <DialogOverlay className="bg-black/60 backdrop-blur-sm z-50" />
            <DialogContent
              className="fixed top-0 left-0 h-full w-[300px] -translate-x-0 -translate-y-0 p-0 rounded-none border-none bg-[#0B1222] z-50 animate-in slide-in-from-left duration-300"
              showCloseButton={false}
            >
              <div className="h-full flex flex-col relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-6 text-slate-400 hover:text-white"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <X className="h-6 w-6" />
                </Button>
                <SidebarContent pathname={pathname} menuSections={menuSections} isMobile />
              </div>
            </DialogContent>
          </DialogPortal>
        </Dialog>

        {/* Conteúdo */}
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          <header className="h-20 border-b border-slate-200 bg-white/80 backdrop-blur-xl flex items-center justify-between px-6 md:px-10 z-10 sticky top-0">
            <div className="flex items-center gap-3 md:gap-6">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden h-9 w-9 text-slate-600 hover:bg-slate-100 rounded-xl"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <h1 className="text-sm md:text-xl font-black text-slate-900 tracking-tight uppercase whitespace-nowrap overflow-hidden text-ellipsis max-w-[120px] xs:max-w-[200px] sm:max-w-none">
                Painel Administrativo
              </h1>
            </div>

            <div className="flex items-center gap-6">
              <div className="relative w-72 group hidden lg:block">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                <Input
                  placeholder="Busca rápida..."
                  className="pl-12 h-11 border-none bg-slate-100 rounded-2xl focus-visible:ring-4 focus-visible:ring-blue-500/10 font-bold text-sm text-slate-900 transition-all"
                />
              </div>

            <div className="flex items-center gap-3 md:gap-4">
              <div className="flex items-center gap-3 border-l border-slate-100 pl-4 md:pl-6">
                <NotificationsPopover />
                <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2 px-1">
                    <div className="text-right hidden md:block leading-none mr-1">
                      <p className="text-[11px] font-black text-slate-900 truncate max-w-[100px]">
                        {userName ?? "Admin"}
                      </p>
                      <p className="text-[8px] font-black text-blue-500 uppercase mt-0.5">
                        {isMaster ? "Mestre" : "Restrito"}
                      </p>
                    </div>
                    <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center font-black text-white text-[10px] shadow-md shrink-0">
                      {(userName ?? "AD").slice(0, 2).toUpperCase()}
                    </div>
                  </div>
                  <form action={async () => { await logout(); }}>
                    <Button
                      type="submit"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-lg text-slate-400 hover:text-rose-500 transition-all"
                    >
                      <LogOut className="h-3.5 w-3.5" />
                    </Button>
                  </form>
                </div>
              </div>
            </div>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto bg-[#F8FAFC] p-4 sm:p-6 md:p-10 custom-scrollbar">
            <div className="max-w-[1500px] mx-auto w-full">{children}</div>
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}

function SidebarContent({ pathname, menuSections, isMobile }: {
  pathname: string;
  menuSections: typeof ALL_SECTIONS;
  isMobile?: boolean;
}) {
  return (
    <>
      <div className={cn("p-8 flex flex-col items-center border-b border-white/5", isMobile && "items-start px-6")}>
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
            <p className="px-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">
              {section.label}
            </p>
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
                    <item.icon
                      className={cn(
                        "h-5 w-5 transition-transform group-hover:scale-110",
                        isActive ? "text-white" : "text-slate-500 group-hover:text-blue-400"
                      )}
                    />
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
    </>
  );
}
