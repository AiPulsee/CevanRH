"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationBarProps {
  page: number;
  totalPages: number;
  /** For server-rendered pages: base path (e.g. "/jobs") */
  baseHref?: string;
  /** Extra query params to preserve alongside ?page= */
  params?: Record<string, string>;
  /** For client components: calls back with the new page number */
  onPageChange?: (page: number) => void;
}

function getPageRange(current: number, total: number): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const core = new Set(
    [1, total, current - 1, current, current + 1].filter((p) => p >= 1 && p <= total)
  );
  const sorted = Array.from(core).sort((a, b) => a - b);

  const result: (number | "...")[] = [];
  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && (sorted[i] as number) - (sorted[i - 1] as number) > 1) result.push("...");
    result.push(sorted[i]);
  }
  return result;
}

interface PageBtnProps {
  p: number;
  page: number;
  baseHref?: string;
  params?: Record<string, string>;
  onPageChange?: (page: number) => void;
}

function PageBtn({ p, page, baseHref, params, onPageChange }: PageBtnProps) {
  const isActive = p === page;
  const base =
    "h-9 w-9 flex items-center justify-center rounded-xl text-xs font-black transition-all";
  const active = "bg-blue-600 text-white shadow-md shadow-blue-200";
  const inactive = "bg-white border border-slate-200 text-slate-600 hover:border-blue-400 hover:text-blue-600";

  function buildHref(pageNum: number) {
    const sp = new URLSearchParams(params);
    sp.set("page", String(pageNum));
    return `${baseHref}?${sp.toString()}`;
  }

  if (baseHref) {
    return (
      <Link href={buildHref(p)} className={`${base} ${isActive ? active : inactive}`}>
        {p}
      </Link>
    );
  }
  return (
    <button
      onClick={() => onPageChange?.(p)}
      className={`${base} ${isActive ? active : inactive}`}
    >
      {p}
    </button>
  );
}

interface NavBtnProps {
  direction: "prev" | "next";
  page: number;
  totalPages: number;
  baseHref?: string;
  params?: Record<string, string>;
  onPageChange?: (page: number) => void;
}

function NavBtn({ direction, page, totalPages, baseHref, params, onPageChange }: NavBtnProps) {
  const targetPage = direction === "prev" ? page - 1 : page + 1;
  const disabled = direction === "prev" ? page <= 1 : page >= totalPages;
  const base =
    "h-9 w-9 flex items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition-all";
  const enabled = "hover:border-blue-400 hover:text-blue-600";
  const dis = "opacity-40 cursor-not-allowed";

  function buildHref(pageNum: number) {
    const sp = new URLSearchParams(params);
    sp.set("page", String(pageNum));
    return `${baseHref}?${sp.toString()}`;
  }

  if (baseHref && !disabled) {
    return (
      <Link href={buildHref(targetPage)} className={`${base} ${enabled}`}>
        {direction === "prev" ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
      </Link>
    );
  }
  return (
    <button
      disabled={disabled}
      onClick={() => !disabled && onPageChange?.(targetPage)}
      className={`${base} ${disabled ? dis : enabled}`}
    >
      {direction === "prev" ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
    </button>
  );
}

export function PaginationBar({ page, totalPages, baseHref, params, onPageChange }: PaginationBarProps) {
  if (totalPages <= 1) return null;

  const range = getPageRange(page, totalPages);

  return (
    <div className="flex items-center justify-center gap-1.5">
      <NavBtn direction="prev" page={page} totalPages={totalPages} baseHref={baseHref} params={params} onPageChange={onPageChange} />
      {range.map((item, i) =>
        item === "..." ? (
          <span key={`ellipsis-${i}`} className="h-9 w-9 flex items-center justify-center text-slate-400 text-xs font-bold">
            …
          </span>
        ) : (
          <PageBtn key={item} p={item} page={page} baseHref={baseHref} params={params} onPageChange={onPageChange} />
        )
      )}
      <NavBtn direction="next" page={page} totalPages={totalPages} baseHref={baseHref} params={params} onPageChange={onPageChange} />
    </div>
  );
}
