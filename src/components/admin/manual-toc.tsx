"use client";

import { useState } from "react";
import { ChevronDown, BookOpen } from "lucide-react";

type TocItem = { href: string; label: string };

export function ManualTOC({ items }: { items: TocItem[] }) {
  const [open, setOpen] = useState(false);

  return (
    <aside className="lg:w-56 shrink-0 lg:sticky lg:top-24">
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        {/* Mobile: toggle button */}
        <button
          className="lg:hidden w-full flex items-center justify-between px-4 py-3.5 text-sm font-black text-slate-800"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
        >
          <span className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-blue-600" />
            Sumário do Manual
          </span>
          <ChevronDown
            className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </button>

        {/* Nav — hidden on mobile unless open */}
        <div className={`${open ? "block" : "hidden"} lg:block p-4 border-t border-slate-100 lg:border-none`}>
          <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-3 hidden lg:block">
            Sumário
          </p>
          <nav className="space-y-0.5">
            {items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block px-2 py-1.5 rounded-lg text-[11px] font-semibold text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-all leading-tight"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
}
