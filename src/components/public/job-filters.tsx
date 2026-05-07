"use client";

import { useRouter, usePathname } from "next/navigation";
import { Search, MapPin, X, Wifi, Building, Zap, LayoutGrid, Filter, SlidersHorizontal } from "lucide-react";
import { useState } from "react";

interface JobFiltersProps {
  q?: string;
  location?: string;
  remote?: string;
  type?: string;
  only?: "search" | "sidebar";
}

export function JobFilters({ q, location, remote, type, only }: JobFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const hasActiveFilters = !!(q || location || remote || type);
  const activeFilterCount = [remote, type].filter(Boolean).length;

  function buildHref(overrides: Record<string, string | undefined>) {
    const params = new URLSearchParams();
    const values = { q, location, remote, type, ...overrides };
    Object.entries(values).forEach(([k, v]) => {
      if (v) params.set(k, v);
    });
    params.delete("page");
    return `${pathname}?${params.toString()}`;
  }

  function handleSearchSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const newQ = (fd.get("q") as string) || undefined;
    const newLoc = (fd.get("location") as string) || undefined;
    router.push(buildHref({ q: newQ, location: newLoc }));
  }

  function clearAll() {
    router.push(pathname);
  }

  const remoteOptions = [
    { label: "Todos", value: undefined, icon: LayoutGrid },
    { label: "Remoto", value: "true", icon: Wifi },
    { label: "Presencial", value: "false", icon: Building },
  ];

  const typeOptions = [
    { label: "Todos", value: undefined },
    { label: "Curadoria Ativa", value: "MANAGED" },
    { label: "Self-Service", value: "SELF_SERVICE" },
  ];

  const showSearch = !only || only === "search";
  const showSidebar = !only || only === "sidebar";

  return (
    <>
      {showSearch && (
        <form
          onSubmit={handleSearchSubmit}
          className="p-2 sm:p-1.5 bg-white rounded-2xl sm:rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-slate-100 flex flex-col md:flex-row items-center w-full max-w-5xl mx-auto transition-all duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.1)] gap-2 md:gap-0"
        >
          <div className="flex-[1.2] w-full flex items-center px-4 gap-3 group border-b md:border-b-0 md:border-r border-slate-100 pb-2 md:pb-0">
            <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0 group-focus-within:bg-blue-600 transition-all">
              <Search className="h-5 w-5 text-blue-600" />
            </div>
            <input
              name="q"
              defaultValue={q}
              placeholder="Qual cargo ou tecnologia?"
              className="h-12 sm:h-14 w-full bg-transparent border-none outline-none focus:ring-0 text-sm sm:text-[16px] font-bold placeholder:text-slate-300 px-2"
            />
          </div>
          <div className="flex-1 w-full flex items-center px-4 gap-3 group pb-2 md:pb-0">
            <div className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0 group-focus-within:bg-blue-600 transition-all">
              <MapPin className="h-5 w-5 text-slate-400" />
            </div>
            <input
              name="location"
              defaultValue={location}
              placeholder="Localização (Ex: Remoto)"
              className="h-12 sm:h-14 w-full bg-transparent border-none outline-none focus:ring-0 text-sm sm:text-[16px] font-bold placeholder:text-slate-300 px-2"
            />
          </div>
          <button
            type="submit"
            className="w-full md:w-auto h-12 sm:h-14 md:rounded-full rounded-xl px-12 bg-[#1967D2] hover:bg-blue-700 font-black shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all uppercase tracking-widest text-[10px] sm:text-xs text-white"
          >
            Localizar Vaga
          </button>
        </form>
      )}

      {showSidebar && (
        <>
          {/* Mobile filter toggle button — rendered inside sidebar slot, used by page */}
          <div className="lg:hidden">
            <button
              onClick={() => setMobileOpen(true)}
              className="flex items-center gap-2 h-10 px-4 rounded-xl border border-slate-200 bg-white text-slate-600 font-bold text-sm relative"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filtros
              {activeFilterCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-blue-600 text-white text-[10px] font-black flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile drawer overlay */}
          {mobileOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={() => setMobileOpen(false)}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 space-y-6 shadow-2xl animate-in slide-in-from-bottom duration-300 max-h-[85vh] overflow-y-auto">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Filter className="h-5 w-5 text-blue-600" />
                    <h3 className="font-black text-slate-900 text-lg">Filtros</h3>
                  </div>
                  <button onClick={() => setMobileOpen(false)} className="h-9 w-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors">
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <SidebarFilters
                  remote={remote}
                  type={type}
                  hasActiveFilters={hasActiveFilters}
                  remoteOptions={remoteOptions}
                  typeOptions={typeOptions}
                  buildHref={buildHref}
                  clearAll={() => { clearAll(); setMobileOpen(false); }}
                  onSelect={() => setMobileOpen(false)}
                />
              </div>
            </div>
          )}

          {/* Desktop sidebar filters */}
          <div className="hidden lg:contents">
            <SidebarFilters
              remote={remote}
              type={type}
              hasActiveFilters={hasActiveFilters}
              remoteOptions={remoteOptions}
              typeOptions={typeOptions}
              buildHref={buildHref}
              clearAll={clearAll}
            />
          </div>
        </>
      )}
    </>
  );
}

function SidebarFilters({
  remote, type, hasActiveFilters, remoteOptions, typeOptions, buildHref, clearAll, onSelect,
}: {
  remote?: string;
  type?: string;
  hasActiveFilters: boolean;
  remoteOptions: { label: string; value: string | undefined; icon: React.ElementType }[];
  typeOptions: { label: string; value: string | undefined }[];
  buildHref: (o: Record<string, string | undefined>) => string;
  clearAll: () => void;
  onSelect?: () => void;
}) {
  return (
    <>
      <div className="space-y-3">
        <h4 className="font-bold text-slate-900 text-[14px]">Modalidade</h4>
        <div className="space-y-2">
          {remoteOptions.map(({ label, value, icon: Icon }) => {
            const isActive = remote === value || (!remote && !value);
            return (
              <a
                key={label}
                href={buildHref({ remote: value })}
                onClick={onSelect}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all ${
                  isActive ? "bg-blue-50 text-[#1967D2] font-bold" : "text-slate-600 hover:bg-slate-50 font-medium"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="text-[14px]">{label}</span>
                {isActive && <div className="ml-auto h-2 w-2 rounded-full bg-[#1967D2]" />}
              </a>
            );
          })}
        </div>
      </div>

      <div className="space-y-3 pt-4 border-t border-slate-100">
        <h4 className="font-bold text-slate-900 text-[14px]">Tipo de Vaga</h4>
        <div className="space-y-2">
          {typeOptions.map(({ label, value }) => {
            const isActive = type === value || (!type && !value);
            return (
              <a
                key={label}
                href={buildHref({ type: value })}
                onClick={onSelect}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all ${
                  isActive ? "bg-blue-50 text-[#1967D2] font-bold" : "text-slate-600 hover:bg-slate-50 font-medium"
                }`}
              >
                {value === "MANAGED" && <Zap className="h-4 w-4 shrink-0 fill-current" />}
                {value === "SELF_SERVICE" && <LayoutGrid className="h-4 w-4 shrink-0" />}
                {!value && <Search className="h-4 w-4 shrink-0" />}
                <span className="text-[14px]">{label}</span>
                {isActive && <div className="ml-auto h-2 w-2 rounded-full bg-[#1967D2]" />}
              </a>
            );
          })}
        </div>
      </div>

      {hasActiveFilters && (
        <button
          onClick={clearAll}
          className="w-full flex items-center justify-center gap-2 font-bold text-rose-500 border border-rose-100 bg-rose-50/50 hover:bg-rose-100 transition-colors py-2 rounded-xl text-[13px] mt-2"
        >
          <X className="h-3.5 w-3.5" /> Limpar Filtros
        </button>
      )}
    </>
  );
}
