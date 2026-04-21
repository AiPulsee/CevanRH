"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, ArrowLeft, Zap, CheckCircle2 } from "lucide-react";
import Image from "next/image";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulação de chamada de API
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full flex bg-white font-sans text-slate-900 overflow-hidden">
      {/* Left Side: Form */}
      <div className="w-full lg:w-[45%] flex flex-col justify-center px-8 sm:px-16 lg:px-24 py-12 relative z-10 bg-white">
        <div className="max-w-md w-full mx-auto space-y-10">
          
          <Link href="/login" className="inline-flex items-center text-sm font-bold text-slate-400 hover:text-blue-600 transition-colors w-fit group">
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Voltar para o login
          </Link>

          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Link href="/" className="inline-block">
              <Image src="/logoprincipal.png" alt="CevanRH" width={500} height={150} className="h-24 w-auto object-contain" />
            </Link>
          </div>

          <div className="space-y-2 text-center">
            <h1 className="text-4xl font-black tracking-tight text-slate-900">Recuperar Senha</h1>
            <p className="text-slate-500 font-medium leading-relaxed">
              Digite o e-mail associado à sua conta. Enviaremos um link seguro para você criar uma nova senha.
            </p>
          </div>

          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="font-bold text-slate-700 ml-1">E-mail de Cadastro</Label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="voce@empresa.com" 
                      className="h-14 pl-12 bg-slate-50 border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 transition-all font-medium"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black uppercase text-xs tracking-widest shadow-2xl shadow-blue-200 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                {isLoading ? "Enviando..." : "Enviar link de recuperação"}
              </Button>
            </form>
          ) : (
            <div className="p-8 rounded-[2rem] bg-emerald-50 border border-emerald-100 flex flex-col items-center text-center space-y-4 animate-in fade-in zoom-in duration-500">
              <div className="h-16 w-16 bg-emerald-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="h-8 w-8 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 mb-2">E-mail enviado!</h3>
                <p className="text-sm font-medium text-slate-600 leading-relaxed">
                  Verifique a caixa de entrada de <span className="font-bold text-slate-900">{email}</span>. O link de recuperação expira em 30 minutos.
                </p>
              </div>
              <Button 
                variant="outline"
                className="mt-4 rounded-xl border-emerald-200 text-emerald-700 hover:bg-emerald-100 hover:text-emerald-800 font-bold w-full"
                onClick={() => setIsSuccess(false)}
              >
                Tentar outro e-mail
              </Button>
            </div>
          )}

          <p className="text-center text-sm text-slate-500 font-medium">
            Lembrou sua senha? <Link href="/login" className="text-blue-600 font-black hover:underline">Faça login aqui</Link>
          </p>
        </div>
      </div>

      {/* Right Side: Visual Content */}
      <div className="hidden lg:flex lg:flex-1 relative bg-slate-900 items-center justify-center p-24 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/login-bg.png"
            alt="Recruitment Background"
            fill
            className="object-cover opacity-60 mix-blend-luminosity scale-110 blur-[2px]"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-950/90 via-slate-900/80 to-blue-900/40" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-lg space-y-8 animate-in fade-in slide-in-from-right duration-1000">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-black uppercase tracking-widest">
            <Zap className="h-3 w-3 fill-white" />
            Acesso Seguro
          </div>
          
          <h2 className="text-5xl font-black text-white leading-tight tracking-tight">
            Recupere seu acesso e continue a <span className="text-blue-400 italic">evolução</span>.
          </h2>
          
          <p className="text-xl text-blue-100/70 font-medium leading-relaxed">
            Seus dados e o andamento das suas vagas estão seguros com a nossa criptografia de ponta a ponta.
          </p>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 right-20 h-64 w-64 bg-blue-500/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-20 left-20 h-64 w-64 bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />
      </div>
    </div>
  );
}
