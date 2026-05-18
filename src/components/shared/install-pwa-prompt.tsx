"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download, X } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export function InstallPWAPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if it's iOS
    const isIosDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(isIosDevice);

    // Check if already installed
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches || (navigator as any).standalone;
    if (isStandalone) return;

    // Listen for the beforeinstallprompt event (Android/Chrome/Edge)
    const handleBeforeInstallPrompt = (e: Event) => {
      console.log("🔥 beforeinstallprompt event fired!");
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
      // Show custom prompt after a few seconds so it's not too intrusive immediately
      setTimeout(() => setShowPrompt(true), 1500);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // If iOS and not standalone, we can optionally show a manual prompt
    if (isIosDevice && !isStandalone) {
        console.log("📱 iOS device detected, not standalone.");
        const hasSeenPrompt = localStorage.getItem("pwa-prompt-seen");
        if (!hasSeenPrompt) {
            setTimeout(() => setShowPrompt(true), 1500);
        }
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleForceShow = () => {
    setShowPrompt(true);
  };

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      // Show the install prompt
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        console.log("User accepted the install prompt");
      } else {
        console.log("User dismissed the install prompt");
      }
      setDeferredPrompt(null);
      setShowPrompt(false);
    }
  };

  const handleClose = () => {
    setShowPrompt(false);
    if (isIOS) {
        localStorage.setItem("pwa-prompt-seen", "true");
    }
  };

  if (!showPrompt) {
    // Only in development, show a small button to force open it for testing
    if (process.env.NODE_ENV === "development") {
      return (
        <button
          onClick={handleForceShow}
          className="fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg z-50 text-xs font-bold"
        >
          Teste PWA
        </button>
      );
    }
    return null;
  }

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[100] w-[calc(100%-2rem)] sm:w-[380px] bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200"
        >
          <div className="bg-blue-600 p-5 flex items-center gap-4 text-white relative">
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 text-blue-200 hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="h-12 w-12 shrink-0 bg-white rounded-xl shadow-inner flex items-center justify-center overflow-hidden p-1.5">
              <Image
                src="/cevanempresarial/icon-192.png"
                alt="Cevan App"
                width={48}
                height={48}
                className="object-contain"
              />
            </div>
            <div className="pr-4">
              <h3 className="text-base font-black leading-tight">Instalar App Cevan</h3>
              <p className="text-blue-100 text-[11px] font-medium leading-snug mt-0.5">
                Acesso rápido às vagas direto da sua tela inicial.
              </p>
            </div>
          </div>

          <div className="p-5 bg-white">
            {isIOS ? (
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-sm text-slate-600 font-medium space-y-2">
                <p className="text-xs font-bold text-slate-900">Para instalar no iOS:</p>
                <ol className="list-decimal list-inside space-y-1.5 mt-2 text-[11px]">
                  <li>
                    Toque em <b>Compartilhar</b>{" "}
                    <span className="inline-block border border-slate-200 rounded p-0.5 align-middle bg-white">
                      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
                    </span>{" "}
                    no Safari.
                  </li>
                  <li>
                    Selecione <b>Adicionar à Tela de Início</b>{" "}
                    <span className="inline-block border border-slate-200 rounded p-0.5 align-middle bg-white">
                      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M12 8v8"/><path d="M8 12h8"/></svg>
                    </span>.
                  </li>
                </ol>
                <Button onClick={handleClose} variant="ghost" className="w-full h-8 mt-2 text-[10px] uppercase font-bold text-slate-400">
                  Entendi
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  onClick={handleClose}
                  variant="ghost"
                  className="flex-1 h-10 rounded-xl text-slate-500 font-bold text-xs hover:bg-slate-50"
                >
                  Agora não
                </Button>
                <Button
                  onClick={handleInstallClick}
                  className="flex-1 h-10 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-200"
                >
                  <Download className="mr-1.5 h-3.5 w-3.5" /> Instalar
                </Button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
