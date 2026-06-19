"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Cookie, X } from "lucide-react";

const STORAGE_KEY = "cevan-cookie-consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      // Small delay so it doesn't flash on first paint
      const t = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  function accept() {
    localStorage.setItem(STORAGE_KEY, "all");
    setVisible(false);
  }

  function acceptEssential() {
    localStorage.setItem(STORAGE_KEY, "essential");
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="cookie-banner"
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: "spring", damping: 26, stiffness: 220 }}
          className="fixed bottom-4 left-4 right-4 z-[200] md:left-auto md:right-6 md:max-w-md"
        >
          <div className="bg-slate-900 text-white rounded-2xl shadow-2xl shadow-black/30 border border-slate-700/50 p-5 relative">
            <button
              onClick={acceptEssential}
              aria-label="Fechar"
              className="absolute top-3.5 right-3.5 h-7 w-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-start gap-3 pr-6">
              <div className="shrink-0 mt-0.5 h-9 w-9 rounded-xl bg-[#1967D2]/20 flex items-center justify-center">
                <Cookie className="h-5 w-5 text-[#4f8ef7]" />
              </div>
              <div>
                <p className="font-bold text-[15px] leading-snug">Usamos cookies</p>
                <p className="text-slate-400 text-[13px] leading-relaxed mt-1">
                  Utilizamos cookies essenciais para o funcionamento do site. Saiba mais em nossa{" "}
                  <Link href="/privacidade" className="text-[#4f8ef7] hover:underline font-semibold">
                    Política de Privacidade
                  </Link>
                  .
                </p>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <button
                onClick={acceptEssential}
                className="flex-1 h-10 rounded-xl border border-slate-600 text-slate-300 hover:text-white hover:border-slate-400 text-[13px] font-semibold transition-colors"
              >
                Apenas essenciais
              </button>
              <button
                onClick={accept}
                className="flex-1 h-10 rounded-xl bg-[#1967D2] hover:bg-[#1250b0] text-white text-[13px] font-bold transition-colors shadow-lg shadow-blue-900/30"
              >
                Aceitar todos
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
