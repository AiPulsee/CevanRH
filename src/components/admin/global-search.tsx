"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, Users2, Briefcase, Building2, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface SearchResults {
  candidates: { name: string | null; email: string | null; job: string }[];
  jobs: { id: string; title: string; type: string; company: string }[];
  companies: { id: string; name: string; industry: string | null }[];
}

type FlatResult =
  | { kind: "candidate"; name: string | null; email: string | null; job: string; href: string }
  | { kind: "job"; id: string; title: string; type: string; company: string; href: string }
  | { kind: "company"; id: string; name: string; industry: string | null; href: string };

export function GlobalSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResults | null>(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const router = useRouter();

  const flatResults: FlatResult[] = results
    ? [
        ...results.candidates.map((c) => ({
          kind: "candidate" as const,
          ...c,
          href: `/admin/resumes?q=${encodeURIComponent(c.name ?? c.email ?? "")}`,
        })),
        ...results.jobs.map((j) => ({
          kind: "job" as const,
          ...j,
          href: j.type === "MANAGED" ? "/admin/managed" : "/admin/resumes",
        })),
        ...results.companies.map((c) => ({
          kind: "company" as const,
          ...c,
          href: "/admin/companies",
        })),
      ]
    : [];

  const hasResults =
    results &&
    (results.candidates.length > 0 ||
      results.jobs.length > 0 ||
      results.companies.length > 0);

  const fetchResults = useCallback(async (q: string) => {
    if (q.length < 2) {
      setResults(null);
      setOpen(false);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/search?q=${encodeURIComponent(q)}`);
      if (res.ok) {
        const data: SearchResults = await res.json();
        setResults(data);
        setOpen(true);
        setActiveIndex(-1);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchResults(query), 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, fetchResults]);

  // Close on click outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open || flatResults.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, flatResults.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, -1));
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      router.push(flatResults[activeIndex].href);
      setOpen(false);
      setQuery("");
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const candidateOffset = 0;
  const jobOffset = results?.candidates.length ?? 0;
  const companyOffset = (results?.candidates.length ?? 0) + (results?.jobs.length ?? 0);

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-blue-500 transition-colors pointer-events-none" />
        {loading && (
          <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 animate-spin" />
        )}
        <Input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => hasResults && setOpen(true)}
          placeholder="Busca rápida..."
          className="pl-11 pr-10 h-10 border-none bg-slate-100 rounded-xl focus-visible:ring-2 focus-visible:ring-blue-500/20 font-medium text-sm text-slate-900 transition-all"
          autoComplete="off"
        />
      </div>

      {open && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-1 duration-150">
          {!hasResults ? (
            <p className="text-sm text-slate-400 font-medium text-center py-6">
              Nenhum resultado para &ldquo;{query}&rdquo;
            </p>
          ) : (
            <div className="py-2">
              {results!.candidates.length > 0 && (
                <Section label="Candidatos" icon={<Users2 className="h-3 w-3" />}>
                  {results!.candidates.map((c, i) => (
                    <ResultItem
                      key={`c-${i}`}
                      href={`/admin/resumes?q=${encodeURIComponent(c.name ?? c.email ?? "")}`}
                      active={activeIndex === candidateOffset + i}
                      onHover={() => setActiveIndex(candidateOffset + i)}
                      onSelect={() => { setOpen(false); setQuery(""); }}
                      primary={c.name ?? c.email ?? "—"}
                      secondary={c.job}
                    />
                  ))}
                </Section>
              )}

              {results!.jobs.length > 0 && (
                <Section label="Vagas" icon={<Briefcase className="h-3 w-3" />}>
                  {results!.jobs.map((j, i) => (
                    <ResultItem
                      key={`j-${i}`}
                      href={j.type === "MANAGED" ? "/admin/managed" : "/admin/resumes"}
                      active={activeIndex === jobOffset + i}
                      onHover={() => setActiveIndex(jobOffset + i)}
                      onSelect={() => { setOpen(false); setQuery(""); }}
                      primary={j.title}
                      secondary={j.company}
                      badge="Curadoria"
                      badgeColor="blue"
                    />
                  ))}
                </Section>
              )}

              {results!.companies.length > 0 && (
                <Section label="Empresas" icon={<Building2 className="h-3 w-3" />}>
                  {results!.companies.map((c, i) => (
                    <ResultItem
                      key={`co-${i}`}
                      href="/admin/companies"
                      active={activeIndex === companyOffset + i}
                      onHover={() => setActiveIndex(companyOffset + i)}
                      onSelect={() => { setOpen(false); setQuery(""); }}
                      primary={c.name}
                      secondary={c.industry ?? undefined}
                    />
                  ))}
                </Section>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Section({
  label,
  icon,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-1.5 px-4 pt-3 pb-1">
        <span className="text-slate-400">{icon}</span>
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</p>
      </div>
      {children}
    </div>
  );
}

function ResultItem({
  href,
  active,
  onHover,
  onSelect,
  primary,
  secondary,
  badge,
  badgeColor,
}: {
  href: string;
  active: boolean;
  onHover: () => void;
  onSelect: () => void;
  primary: string;
  secondary?: string;
  badge?: string;
  badgeColor?: "blue" | "emerald";
}) {
  return (
    <Link
      href={href}
      onClick={onSelect}
      onMouseEnter={onHover}
      className={cn(
        "flex items-center justify-between gap-3 px-4 py-2.5 transition-colors",
        active ? "bg-blue-50" : "hover:bg-slate-50"
      )}
    >
      <div className="min-w-0">
        <p className="text-sm font-bold text-slate-900 truncate">{primary}</p>
        {secondary && (
          <p className="text-xs text-slate-400 font-medium truncate">{secondary}</p>
        )}
      </div>
      {badge && (
        <span
          className={cn(
            "shrink-0 text-[9px] font-black uppercase tracking-wide rounded-md px-1.5 py-0.5",
            badgeColor === "blue" ? "bg-blue-50 text-blue-600" : "bg-emerald-50 text-emerald-600"
          )}
        >
          {badge}
        </span>
      )}
    </Link>
  );
}
