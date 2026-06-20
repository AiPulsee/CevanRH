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
  LineChart,
  LayoutDashboard,
  UserCheck,
  Receipt,
  FileText,
  Menu,
  X,
  MoreHorizontal,
  BookOpen,
  ScrollText,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { logout } from "@/actions/auth";
import { NotificationsPopover } from "@/components/admin/notifications-popover";
import { GlobalSearch } from "@/components/admin/global-search";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogPortal, DialogOverlay } from "@/components/ui/dialog";

const ALL_SECTIONS = [
  {
    label: "Painel de Controle",
    items: [
      { name: "Painel", mobileName: "Painel", href: "/admin", icon: LayoutDashboard, tooltip: "Visão geral do sistema: candidaturas recentes, vagas ativas e alocações em andamento" },
      { name: "Relatórios Gerais", mobileName: "Relatórios", href: "/admin/analytics", icon: LineChart, key: "ANALYTICS", tooltip: "Funil de contratações, métricas de desempenho e taxa de conversão" },
    ],
  },
  {
    label: "Recrutamento & Seleção",
    items: [
      { name: "Banco de Talentos", mobileName: "Talentos", href: "/admin/resumes", icon: FileText, key: "RESUMES", tooltip: "Todos os currículos recebidos — filtre por tipo de vaga, busque candidatos e exporte planilha" },
      { name: "Curadoria (Vagas)", mobileName: "Curadoria", href: "/admin/managed", icon: Zap, key: "MANAGED", tooltip: "Vagas com triagem especializada pela Cevan — analise candidatos e selecione os melhores perfis" },
      { name: "Alocações", mobileName: "Alocações", href: "/admin/placements", icon: UserCheck, key: "PLACEMENTS", tooltip: "Candidatos contratados — acompanhe o período de experiência e confirme efetivações" },
    ],
  },
  {
    label: "Financeiro",
    items: [
      { name: "Finanças", mobileName: "Finanças", href: "/admin/finance", icon: Receipt, key: "FINANCE", tooltip: "Comissões geradas pelas efetivações — emita faturas e registre pagamentos recebidos" },
    ],
  },
  {
    label: "Gestão",
    items: [
      { name: "Empresas", mobileName: "Empresas", href: "/admin/companies", icon: Building2, key: "COMPANIES", tooltip: "Empresas clientes cadastradas, suas vagas e usuários vinculados" },
      { name: "Usuários", mobileName: "Usuários", href: "/admin/users", icon: Users2, key: "USERS", tooltip: "Gerenciar administradores do sistema, suas funções e permissões de acesso" },
      { name: "Logs de Auditoria", mobileName: "Logs", href: "/admin/logs", icon: ScrollText, key: "USERS", tooltip: "Histórico completo de ações realizadas no sistema — quem fez o quê e quando" },
    ],
  },
  {
    label: "Suporte",
    items: [
      { name: "Manual do Sistema", mobileName: "Manual", href: "/admin/manual", icon: BookOpen, tooltip: "Guia completo de uso do CevanRH para consultores" },
    ],
  },
];

// Items shown in the mobile bottom nav (in order of priority)
const BOTTOM_NAV_ITEMS = [
  { name: "Painel", href: "/admin", icon: LayoutDashboard },
  { name: "Curadoria", href: "/admin/managed", icon: Zap, key: "MANAGED" },
  { name: "Alocações", href: "/admin/placements", icon: UserCheck, key: "PLACEMENTS" },
  { name: "Finanças", href: "/admin/finance", icon: Receipt, key: "FINANCE" },
];

const ALL_FLAT = ALL_SECTIONS.flatMap((s) => s.items);

interface Props {
  children: React.ReactNode;
  userName: string | null;
  permissions: string[] | null;
}

export function AdminLayoutClient({ children, userName, permissions }: Props) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const allPermKeys = ALL_SECTIONS.flatMap((s) => s.items.map((i) => (i as any).key)).filter(Boolean) as string[];
  const isMaster =
    permissions === null ||
    (Array.isArray(permissions) && allPermKeys.every((k) => permissions.includes(k)));

  const hasPermission = (key?: string) =>
    !key || isMaster || (Array.isArray(permissions) && permissions.includes(key));

  const menuSections = ALL_SECTIONS.map((section) => ({
    ...section,
    items: section.items.filter((item) => hasPermission((item as any).key)),
  })).filter((section) => section.items.length > 0);

  const allMobileItems = menuSections.flatMap((section) => section.items);

  // Resolve the current page name for the header
  const currentPage = ALL_FLAT.find(
    (item) =>
      pathname === item.href ||
      (item.href !== "/admin" && pathname.startsWith(item.href))
  ) ?? ALL_FLAT[0];

  return (
    <TooltipProvider>
      <div className="flex min-h-screen bg-[#F8FAFC] text-foreground overflow-hidden relative">
        {/* Sidebar Desktop */}
        <aside className="w-76 border-r border-slate-800/50 bg-[#0B1222] text-slate-300 hidden lg:flex flex-col z-20 shadow-2xl">
          <SidebarContent pathname={pathname} menuSections={menuSections} />
        </aside>

        {/* Sidebar Mobile Drawer */}
        <Dialog open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <DialogContent
            className="fixed top-0 left-0 h-full w-[300px] max-w-full p-0 rounded-none border-none bg-[#0B1222] z-50 translate-x-0 translate-y-0 data-open:animate-in data-open:slide-in-from-left data-open:zoom-in-100 data-closed:animate-out data-closed:slide-out-to-left data-closed:zoom-out-100 duration-300"
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
        </Dialog>

        {/* Main column */}
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          {/* ── Header ── */}
          <header className="h-16 lg:h-20 border-b border-slate-200/60 bg-white/80 backdrop-blur-xl flex items-center justify-between px-4 lg:px-8 z-10 sticky top-0">
            {/* Left: page identity */}
            <div className="flex items-center gap-2 lg:gap-4">
              {/* Mobile logo (replaces the sidebar logo) */}
              <Link href="/admin" className="lg:hidden shrink-0">
                <Image
                  src="/cevanempresarial/logocevanempresarial.png"
                  alt="Cevan"
                  width={75}
                  height={24}
                  className="h-5 w-auto object-contain"
                />
              </Link>

              {/* Desktop: current page name + icon */}
              <div className="hidden lg:flex items-center gap-3.5">
                <div className="h-10 w-10 rounded-xl bg-blue-50 border border-blue-100/50 flex items-center justify-center shadow-sm">
                  <currentPage.icon className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 leading-none mb-1">
                    Admin
                  </p>
                  <h1 className="text-base font-bold text-slate-800 leading-none tracking-tight">
                    {currentPage.name}
                  </h1>
                </div>
              </div>
            </div>

            {/* Center: search (desktop) */}
            <div className="hidden lg:block flex-1 max-w-md mx-8">
              <GlobalSearch />
            </div>

            {/* Right: actions */}
            <div className="flex items-center gap-2 sm:gap-4 shrink-0">
              <NotificationsPopover />

              <div className="w-px h-6 bg-slate-200 hidden sm:block mx-1" />

              {/* User chip */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-3 py-1 rounded-full transition-all">
                  <div className="h-9 w-9 rounded-full bg-slate-900 flex items-center justify-center font-bold text-white text-xs shadow-sm shrink-0 select-none">
                    {(userName ?? "AD").slice(0, 2).toUpperCase()}
                  </div>
                  <p className="text-[14px] font-medium text-slate-700 truncate max-w-[120px] hidden lg:block">
                    {userName ?? "Admin"}
                  </p>
                </div>

                <Tooltip>
                  <form action={async () => { await logout(); }}>
                    <TooltipTrigger render={
                      <Button
                        type="submit"
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 rounded-full text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all shrink-0"
                      >
                        <LogOut className="h-[18px] w-[18px]" />
                      </Button>
                    } />
                  </form>
                  <TooltipContent side="bottom">Sair do sistema</TooltipContent>
                </Tooltip>
              </div>
            </div>
          </header>

          {/* ── Content ── */}
          <main className="flex-1 overflow-y-auto bg-[#F8FAFC] p-4 sm:p-6 md:p-10 pb-24 lg:pb-10 custom-scrollbar">
            <div className="max-w-[1500px] mx-auto w-full">{children}</div>
          </main>
        </div>

        {/* ── Bottom Nav (mobile only) ── */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
          <div className="flex items-stretch h-16 safe-area-bottom overflow-x-auto overflow-y-hidden snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {allMobileItems.map((item: any) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/admin" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "min-w-[72px] sm:min-w-[80px] shrink-0 flex flex-col items-center justify-center gap-1 transition-all relative snap-start",
                    isActive ? "text-blue-600" : "text-slate-400"
                  )}
                >
                  {isActive && (
                    <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-blue-600 rounded-full" />
                  )}
                  <item.icon className={cn("h-4 w-4 sm:h-5 sm:w-5 transition-transform mb-0.5", isActive && "scale-110")} />
                  <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-normal leading-tight w-full text-center truncate px-1">
                    {item.mobileName || item.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </TooltipProvider>
  );
}

function SidebarContent({
  pathname,
  menuSections,
  isMobile,
}: {
  pathname: string;
  menuSections: typeof ALL_SECTIONS;
  isMobile?: boolean;
}) {
  return (
    <>
      <div className={cn("px-6 py-8 flex flex-col items-center", isMobile && "items-start")}>
        <Link href="/" className="flex flex-col items-center group w-full">
          <Image
            src="/cevanempresarial/logocevanempresarial.png"
            alt="Cevan"
            width={240}
            height={70}
            className="h-10 w-auto object-contain brightness-0 invert opacity-90 transition-all group-hover:opacity-100 group-hover:scale-105"
          />
        </Link>
      </div>

      <nav className="flex-1 px-4 py-2 overflow-y-auto custom-scrollbar pb-10">
        <div className="space-y-6">
          {menuSections.map((section, sectionIdx) => (
            <div key={section.label}>
              {/* Section label */}
              <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-2">
                {section.label}
              </p>

              {/* Items */}
              <div className="space-y-1">
                {section.items.map((item) => {
                  const isActive = pathname === item.href ||
                    (item.href !== "/admin" && pathname.startsWith(item.href));
                  return (
                    <Tooltip key={item.name}>
                      <TooltipTrigger render={
                        <Link
                          href={item.href}
                          className={cn(
                            "flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] font-medium transition-all group relative",
                            isActive
                              ? "bg-blue-600/10 text-blue-400"
                              : "text-slate-400 hover:bg-slate-800/40 hover:text-slate-200"
                          )}
                        >
                          {isActive && (
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-blue-500 rounded-r-full shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                          )}
                          <item.icon
                            className={cn(
                              "h-5 w-5 transition-transform group-hover:scale-110",
                              isActive ? "text-blue-500" : "text-slate-500 group-hover:text-slate-300"
                            )}
                          />
                          <span className="truncate">{item.name}</span>
                        </Link>
                      } />
                      <TooltipContent side="right" className="max-w-[220px]">
                        {(item as any).tooltip}
                      </TooltipContent>
                    </Tooltip>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </>
  );
}
