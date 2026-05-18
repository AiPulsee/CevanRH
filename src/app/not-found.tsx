import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft, SearchX } from "lucide-react";

export default function NotFound() {
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

      <div className="h-20 w-20 rounded-3xl bg-slate-100 flex items-center justify-center mb-6">
        <SearchX className="h-10 w-10 text-slate-400" />
      </div>

      <h1 className="text-6xl font-black text-slate-900 tracking-tight mb-2">404</h1>
      <p className="text-lg font-bold text-slate-600 mb-1">Página não encontrada</p>
      <p className="text-sm text-slate-400 font-medium max-w-sm mb-8">
        O endereço que você tentou acessar não existe ou foi movido.
      </p>

      <Button
        nativeButton={false}
        render={<Link href="/" />}
        className="h-12 px-8 rounded-2xl bg-slate-900 text-white font-bold text-sm gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar ao início
      </Button>
    </div>
  );
}
