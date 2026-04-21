"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { 
  Building2, 
  MapPin, 
  Globe, 
  ArrowRight, 
  CheckCircle2, 
  UploadCloud,
  Zap
} from "lucide-react";
import Link from "next/link";

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleFinish = () => {
    setIsLoading(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 sm:p-8 font-sans">
      
      {/* Brand Header */}
      <div className="absolute top-8 left-0 right-0 flex justify-center">
        <Link href="/" className="inline-block">
          <Image src="/logoprincipal.png" alt="CevanRH" width={500} height={150} className="h-24 w-auto object-contain" />
        </Link>
      </div>

      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4 px-2">
            {[1, 2, 3].map((i) => (
              <div 
                key={i}
                className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-black transition-all ${
                  step >= i 
                    ? "bg-blue-600 text-white shadow-md shadow-blue-200" 
                    : "bg-slate-200 text-slate-400"
                }`}
              >
                {step > i ? <CheckCircle2 className="h-4 w-4" /> : i}
              </div>
            ))}
          </div>
          <div className="relative h-2 bg-slate-200 rounded-full overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-blue-600 transition-all duration-500 ease-out"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <Card className="bg-white border-slate-100 shadow-xl shadow-slate-200/50 rounded-[2rem] p-8 sm:p-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          
          {step === 1 && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="space-y-2 text-center">
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Bem-vindo à CevanRH! 👋</h1>
                <p className="text-slate-500 font-medium">Vamos configurar o perfil da sua empresa para atrair os melhores talentos.</p>
              </div>

              <div className="space-y-5">
                <div className="space-y-2">
                  <Label className="font-bold text-slate-700 ml-1">Nome da Empresa</Label>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <Input placeholder="Ex: Acme Corp" className="h-14 pl-12 bg-slate-50 border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 font-medium" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="font-bold text-slate-700 ml-1">Segmento de Atuação</Label>
                  <select className="w-full h-14 px-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 font-medium text-slate-700 outline-none appearance-none">
                    <option value="">Selecione uma área...</option>
                    <option value="tech">Tecnologia & Software</option>
                    <option value="fin">Serviços Financeiros</option>
                    <option value="health">Saúde & Bem-estar</option>
                    <option value="retail">Varejo & E-commerce</option>
                  </select>
                </div>
              </div>

              <Button onClick={handleNext} className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black uppercase text-xs tracking-widest shadow-xl shadow-blue-200">
                Continuar
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
              <div className="space-y-2 text-center">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Presença Digital 🌐</h2>
                <p className="text-slate-500 font-medium">Como os candidatos encontrarão você?</p>
              </div>

              <div className="space-y-5">
                <div className="space-y-2">
                  <Label className="font-bold text-slate-700 ml-1">Logo da Empresa</Label>
                  <div className="border-2 border-dashed border-slate-200 rounded-3xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition-colors group">
                    <div className="h-14 w-14 rounded-full bg-blue-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <UploadCloud className="h-6 w-6 text-blue-600" />
                    </div>
                    <p className="font-bold text-slate-700">Clique para fazer upload</p>
                    <p className="text-xs text-slate-400 mt-1">PNG, JPG ou SVG (Max. 2MB)</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label className="font-bold text-slate-700 ml-1">Website</Label>
                    <div className="relative">
                      <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <Input placeholder="www.empresa.com" className="h-14 pl-12 bg-slate-50 border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 font-medium" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="font-bold text-slate-700 ml-1">Localização Principal</Label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <Input placeholder="São Paulo, SP" className="h-14 pl-12 bg-slate-50 border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 font-medium" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button variant="outline" onClick={() => setStep(1)} className="h-14 rounded-2xl border-slate-200 font-bold px-8">
                  Voltar
                </Button>
                <Button onClick={handleNext} className="flex-1 h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black uppercase text-xs tracking-widest shadow-xl shadow-blue-200">
                  Quase lá!
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500 text-center">
              <div className="h-24 w-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="h-12 w-12 text-blue-600" />
              </div>

              <div className="space-y-2">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Tudo pronto! 🎉</h2>
                <p className="text-slate-500 font-medium text-lg leading-relaxed max-w-md mx-auto">
                  Sua empresa já está configurada. Agora você pode acessar o painel e publicar sua primeira vaga.
                </p>
              </div>

              <div className="pt-6">
                <Button 
                  onClick={handleFinish} 
                  disabled={isLoading}
                  className="w-full h-16 rounded-[2rem] bg-blue-600 hover:bg-blue-700 text-white font-black uppercase text-sm tracking-widest shadow-2xl shadow-blue-200 hover:scale-105 transition-all"
                >
                  {isLoading ? "Preparando seu painel..." : "Acessar meu Dashboard"}
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
