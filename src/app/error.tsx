"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RefreshCw, AlertTriangle } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Global Error]", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center px-6 text-center">
      <Link href="/" className="mb-10">
        <Image
          src="/cevanempresarial/logocevanempresarial.png"
          alt="Cevan"
          width={160}
          height={48}
          className="h-10 w-auto object-contain"
        />
      </Link>

      <div className="h-20 w-20 rounded-3xl bg-rose-50 flex items-center justify-center mb-6">
        <AlertTriangle className="h-10 w-10 text-rose-400" />
      </div>

      <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Algo deu errado</h1>
      <p className="text-sm text-slate-400 font-medium max-w-sm mb-8">
        Ocorreu um erro inesperado. Tente novamente ou volte ao início.
        {error.digest && (
          <span className="block mt-2 text-[10px] text-slate-300 font-mono">
            Ref: {error.digest}
          </span>
        )}
      </p>

      <div className="flex items-center gap-3">
        <Button
          onClick={reset}
          className="h-12 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Tentar novamente
        </Button>
        <Button
          nativeButton={false}
          render={<Link href="/" />}
          variant="outline"
          className="h-12 px-6 rounded-2xl font-bold text-sm gap-2 border-slate-200"
        >
          <ArrowLeft className="h-4 w-4" />
          Início
        </Button>
      </div>
    </div>
  );
}
