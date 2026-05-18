"use client";

import { useState, useEffect } from "react";
import { Download, X, Share, Plus, Smartphone } from "lucide-react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

// Capture before React hydrates so we never miss the event
let _deferredPrompt: any = null;
if (typeof window !== "undefined") {
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    _deferredPrompt = e;
  });
}

function isStandalone() {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as any).standalone === true
  );
}

function isIOS() {
  if (typeof navigator === "undefined") return false;
  return /iphone|ipad|ipod/i.test(navigator.userAgent);
}

export function InstallPWAPrompt() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [installing, setInstalling] = useState(false);
  const [standalone, setStandalone] = useState(false);
  const [ios, setIos] = useState(false);

  useEffect(() => {
    setMounted(true);
    setStandalone(isStandalone());
    setIos(isIOS());

    if (_deferredPrompt) setDeferredPrompt(_deferredPrompt);

    const onPrompt = (e: Event) => {
      e.preventDefault();
      _deferredPrompt = e;
      setDeferredPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, []);

  async function handleInstall() {
    if (!deferredPrompt) return;
    setInstalling(true);
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    _deferredPrompt = null;
    setDeferredPrompt(null);
    setInstalling(false);
    if (outcome === "accepted") setOpen(false);
  }

  // Don't render while SSR or if already installed
  if (!mounted || standalone) return null;

  return (
    <>
      {/* Floating install button — always visible */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-black px-4 py-2.5 rounded-full shadow-lg shadow-blue-300/40 transition-all"
        aria-label="Instalar App"
      >
        <Smartphone className="h-3.5 w-3.5" />
        Instalar App
      </button>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            {/* Bottom sheet */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed bottom-0 left-0 right-0 z-[201] bg-white rounded-t-3xl shadow-2xl"
            >
              {/* Handle */}
              <div className="flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 rounded-full bg-slate-200" />
              </div>

              {/* Close */}
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="px-6 pt-4 pb-10 max-w-lg mx-auto">
                {/* App info */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-16 w-16 rounded-2xl overflow-hidden shadow-lg flex-none border border-slate-100">
                    <Image
                      src="/cevanempresarial/icon-192.png"
                      alt="Cevan"
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="text-lg font-black text-slate-900 leading-tight">Cevan Serviços</h2>
                    <p className="text-xs text-slate-500 font-medium">grupocevan.com.br</p>
                    <div className="flex items-center gap-0.5 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="h-3 w-3 fill-amber-400" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="text-[10px] font-bold text-slate-400 ml-1">Gratuito</span>
                    </div>
                  </div>
                </div>

                {/* iOS instructions */}
                {ios && (
                  <>
                    <p className="text-sm text-slate-600 font-medium leading-relaxed mb-5">
                      Adicione à sua tela de início para acesso rápido sem abrir o navegador.
                    </p>
                    <div className="space-y-3 mb-6">
                      <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50">
                        <div className="h-8 w-8 rounded-xl bg-blue-100 flex items-center justify-center flex-none">
                          <Share className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-xs font-black text-slate-800">1. Toque em Compartilhar</p>
                          <p className="text-[11px] text-slate-500 font-medium">Ícone na barra inferior do Safari</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50">
                        <div className="h-8 w-8 rounded-xl bg-blue-100 flex items-center justify-center flex-none">
                          <Plus className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-xs font-black text-slate-800">2. "Adicionar à Tela de Início"</p>
                          <p className="text-[11px] text-slate-500 font-medium">Role para baixo no menu e toque nessa opção</p>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setOpen(false)}
                      className="w-full py-3 rounded-2xl bg-slate-50 text-slate-500 font-bold text-sm hover:bg-slate-100 transition-colors"
                    >
                      Entendi
                    </button>
                  </>
                )}

                {/* Chrome / Android / Desktop — native prompt */}
                {!ios && deferredPrompt && (
                  <>
                    <p className="text-sm text-slate-600 font-medium leading-relaxed mb-6">
                      Instale o app da Cevan e acesse vagas de emprego com agilidade, direto da sua tela de início.
                    </p>
                    <div className="space-y-3">
                      <button
                        onClick={handleInstall}
                        disabled={installing}
                        className="w-full py-4 rounded-2xl bg-blue-600 text-white font-black text-sm tracking-wide shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-[0.98] transition-all disabled:opacity-60 flex items-center justify-center gap-2"
                      >
                        <Download className="h-4 w-4" />
                        {installing ? "Instalando..." : "Instalar App — Grátis"}
                      </button>
                      <button
                        onClick={() => setOpen(false)}
                        className="w-full py-3 rounded-2xl bg-slate-50 text-slate-500 font-bold text-sm hover:bg-slate-100 transition-colors"
                      >
                        Agora não
                      </button>
                    </div>
                  </>
                )}

                {/* Fallback: Chrome but no prompt yet (criteria not met / already installed) */}
                {!ios && !deferredPrompt && (
                  <>
                    <p className="text-sm text-slate-600 font-medium leading-relaxed mb-5">
                      Para instalar, use o menu do seu navegador e selecione <strong>"Instalar app"</strong> ou <strong>"Adicionar à tela inicial"</strong>.
                    </p>
                    <button
                      onClick={() => setOpen(false)}
                      className="w-full py-3 rounded-2xl bg-slate-50 text-slate-500 font-bold text-sm hover:bg-slate-100 transition-colors"
                    >
                      Entendi
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
