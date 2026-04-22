"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { 
  Briefcase, 
  Lock, 
  Mail, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  UserCircle 
} from "lucide-react";
import { loginWithCredentials } from "@/actions/auth";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    
    const result = await loginWithCredentials(formData);
    if (result?.error) {
      setError(result.error);
      setIsLoading(false);
    }
  };

  const quickLogin = async (e: string, p: string) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("email", e);
    formData.append("password", p);
    await loginWithCredentials(formData);
  };

  return (
    <div className="min-h-screen w-full flex bg-white font-sans text-slate-900 overflow-hidden">
      {/* Left Side: Form */}
      <div className="w-full lg:w-[45%] flex flex-col justify-center px-8 sm:px-16 lg:px-24 py-12 relative z-10 bg-white">
        <div className="max-w-md w-full mx-auto space-y-10">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Link href="/" className="inline-block">
              <Image src="/logoprincipal.png" alt="Cevan Serviços Empresariais" width={500} height={150} className="h-24 w-auto object-contain" />
            </Link>
          </div>

          <div className="space-y-2 text-center">
            <h1 className="text-4xl font-black tracking-tight text-slate-900">Bem-vindo de volta</h1>
            <p className="text-slate-500 font-medium leading-relaxed">
              Acesse sua conta para gerenciar candidaturas e processos seletivos de forma inteligente.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="font-bold text-slate-700 ml-1">E-mail Corporativo</Label>
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

              <div className="space-y-2">
                <div className="flex items-center justify-between ml-1">
                  <Label htmlFor="password" className="font-bold text-slate-700">Senha</Label>
                  <Link href="/forgot-password" className="text-xs font-bold text-blue-600 hover:underline">Esqueceu a senha?</Link>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••" 
                    className="h-14 pl-12 bg-slate-50 border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 transition-all"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
              {isLoading ? "Entrando..." : "Acessar Plataforma"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>

          {/* Quick Access Divider */}
          <div className="relative flex items-center gap-4 py-4">
            <div className="flex-1 h-px bg-slate-100" />
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Acesso Rápido (Dev)</span>
            <div className="flex-1 h-px bg-slate-100" />
          </div>

          {/* Quick Access Buttons */}
          <div className="grid grid-cols-3 gap-3">
            <button 
              onClick={() => quickLogin("admin@cevan.com.br", "123456")}
              className="flex flex-col items-center gap-2 p-3 rounded-2xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all group"
            >
              <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-white group-hover:shadow-md transition-all">
                <ShieldCheck className="h-5 w-5 text-slate-400 group-hover:text-blue-600" />
              </div>
              <span className="text-[10px] font-bold text-slate-500 group-hover:text-blue-600 uppercase">Admin</span>
            </button>

            <button 
              onClick={() => quickLogin("rh@google.com", "123456")}
              className="flex flex-col items-center gap-2 p-3 rounded-2xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all group"
            >
              <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-white group-hover:shadow-md transition-all">
                <Briefcase className="h-5 w-5 text-slate-400 group-hover:text-blue-600" />
              </div>
              <span className="text-[10px] font-bold text-slate-500 group-hover:text-blue-600 uppercase">Empresa</span>
            </button>

            <button 
              onClick={() => quickLogin("dev@talent.com", "123456")}
              className="flex flex-col items-center gap-2 p-3 rounded-2xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all group"
            >
              <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-white group-hover:shadow-md transition-all">
                <UserCircle className="h-5 w-5 text-slate-400 group-hover:text-blue-600" />
              </div>
              <span className="text-[10px] font-bold text-slate-500 group-hover:text-blue-600 uppercase">Candidato</span>
            </button>
          </div>

          <p className="text-center text-sm text-slate-500 font-medium">
            Não tem uma conta? <Link href="/onboarding" className="text-blue-600 font-black hover:underline">Cadastre sua empresa</Link>
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
            Curadoria Especializada
          </div>
          
          <h2 className="text-5xl font-black text-white leading-tight tracking-tight">
            Encontre os <span className="text-blue-400 italic">melhores</span> talentos sem o ruído.
          </h2>
          
          <p className="text-xl text-blue-100/70 font-medium leading-relaxed">
            Nossa plataforma utiliza curadoria humana e tecnologia para conectar sua empresa apenas aos candidatos que realmente importam.
          </p>

          <div className="pt-8 flex items-center gap-6">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-12 w-12 rounded-full border-4 border-slate-900 bg-slate-800 overflow-hidden shadow-xl">
                  <div className="w-full h-full bg-blue-500/20 flex items-center justify-center font-bold text-white text-xs">
                    U{i}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm font-bold text-white">
              +500 empresas <br /> <span className="text-blue-400 font-medium">contratando agora</span>
            </p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 right-20 h-64 w-64 bg-blue-500/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-20 left-20 h-64 w-64 bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />
      </div>
    </div>
  );
}
