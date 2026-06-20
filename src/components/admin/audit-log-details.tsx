"use client";

import { useState } from "react";
import { Eye } from "lucide-react";

interface Props {
  before: unknown | null;
  after: unknown | null;
}

export function AuditLogDetails({ before, after }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="h-7 w-7 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
        title="Ver dados"
      >
        <Eye className="h-3.5 w-3.5" />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[80vh] overflow-y-auto p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-black text-slate-900">Dados da ação</h2>
              <button
                onClick={() => setOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-lg leading-none"
              >
                ×
              </button>
            </div>

            {before != null && (
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5">
                  Antes
                </p>
                <pre className="text-[11px] bg-slate-50 border border-slate-100 rounded-xl p-3 overflow-x-auto text-slate-700 font-mono whitespace-pre-wrap">
                  {JSON.stringify(before, null, 2)}
                </pre>
              </div>
            )}

            {after != null && (
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5">
                  Depois
                </p>
                <pre className="text-[11px] bg-slate-50 border border-slate-100 rounded-xl p-3 overflow-x-auto text-slate-700 font-mono whitespace-pre-wrap">
                  {JSON.stringify(after, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
