

"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Building, 
  User, 
  Shield, 
  Bell, 
  Globe,
  Upload,
  Image as ImageIcon,
  Heart,
  Plus,
  LayoutTemplate
} from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("perfil");

  const tabs = [
    { id: "perfil", name: "Perfil da Empresa", icon: Building },
    { id: "carreiras", name: "Portal de Carreiras", icon: LayoutTemplate },
    { id: "conta", name: "Minha Conta", icon: User },
    { id: "seguranca", name: "Segurança", icon: Shield },
    { id: "notificacoes", name: "Notificações", icon: Bell },
  ];

  return (
    <div className="max-w-5xl space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-slate-900">Configurações</h1>
        <p className="text-slate-500 mt-1 font-medium">Gerencie seu perfil, empresa e preferências da conta.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Navigation Tabs (Vertical) */}
        <aside className="w-full md:w-64 space-y-1">
          {tabs.map((item) => (
            <Button 
              key={item.id} 
              onClick={() => setActiveTab(item.id)}
              variant={activeTab === item.id ? "secondary" : "ghost"} 
              className={`w-full justify-start gap-3 h-12 rounded-xl font-bold transition-all ${activeTab === item.id ? "bg-blue-50 text-blue-700" : "text-slate-500 hover:bg-slate-50"}`}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Button>
          ))}
        </aside>

        {/* Content */}
        <div className="flex-1 space-y-6">
          {activeTab === "perfil" && (
            <Card className="p-8 border-slate-100 bg-white rounded-[2.5rem] shadow-sm space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <div className="h-24 w-24 rounded-[2rem] bg-slate-50 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 group cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all">
                  <Upload className="h-6 w-6 mb-1 group-hover:text-blue-600" />
                  <span className="text-[10px] font-bold uppercase">Logo</span>
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-slate-900">Logo da Empresa</h3>
                  <p className="text-xs text-slate-500 font-medium">PNG ou JPG até 2MB. Recomendado 512x512px.</p>
                  <div className="flex gap-2 mt-2">
                    <Button size="sm" variant="outline" className="rounded-lg h-8 text-[10px] font-black uppercase text-slate-600">Remover</Button>
                    <Button size="sm" className="rounded-lg h-8 text-[10px] font-black uppercase bg-slate-900 hover:bg-slate-800 text-white">Alterar</Button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="companyName" className="font-bold text-slate-700">Nome da Empresa</Label>
                  <Input id="companyName" defaultValue="Google Cloud BR" className="h-12 bg-slate-50 border-slate-200 rounded-xl font-medium text-slate-900" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website" className="font-bold text-slate-700">Website Oficial</Label>
                  <Input id="website" defaultValue="https://google.com" className="h-12 bg-slate-50 border-slate-200 rounded-xl font-medium text-slate-900" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="description" className="font-bold text-slate-700">Sobre a Empresa</Label>
                  <Textarea 
                    id="description" 
                    className="bg-slate-50 border-slate-200 rounded-xl min-h-[120px] resize-none font-medium text-slate-900"
                    defaultValue="O Google Cloud acelera a capacidade das organizações em transformar digitalmente seus negócios..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location" className="font-bold text-slate-700">Sede Principal</Label>
                  <Input id="location" defaultValue="São Paulo, SP" className="h-12 bg-slate-50 border-slate-200 rounded-xl font-medium text-slate-900" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry" className="font-bold text-slate-700">Setor</Label>
                  <Input id="industry" defaultValue="Tecnologia" className="h-12 bg-slate-50 border-slate-200 rounded-xl font-medium text-slate-900" />
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 flex justify-end gap-3">
                <Button variant="ghost" className="rounded-xl font-bold h-12 px-8 text-slate-500">Descartar</Button>
                <Button className="rounded-xl font-bold h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200">Salvar Perfil</Button>
              </div>
            </Card>
          )}

          {activeTab === "carreiras" && (
            <Card className="p-8 border-slate-100 bg-white rounded-[2.5rem] shadow-sm space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
              
              {/* Banner Cover */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4">Capa do Portal (Banner)</h3>
                <div className="h-48 w-full rounded-3xl bg-slate-50 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 group cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('/feature-woman.png')] bg-cover bg-center opacity-40 mix-blend-luminosity"></div>
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="h-12 w-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                      <ImageIcon className="h-5 w-5 text-blue-600" />
                    </div>
                    <span className="font-bold text-slate-700 text-sm">Trocar Imagem de Capa</span>
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Benefícios Oferecidos</h3>
                    <p className="text-sm text-slate-500 font-medium mt-1">Selecione os benefícios que aparecerão na sua página.</p>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-lg h-9 font-bold text-blue-600 border-blue-200 bg-blue-50">
                    <Plus className="h-4 w-4 mr-1" /> Novo
                  </Button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {["Saúde & Bem-estar", "Equipamento Top", "Auxílio Alimentação", "Bolsa de Estudos", "Gympass", "Trabalho Remoto"].map((ben, i) => (
                    <div key={i} className="px-4 py-2 rounded-xl border border-slate-200 bg-slate-50 flex items-center gap-2 cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all">
                      <Heart className="h-4 w-4 text-blue-500" />
                      <span className="text-sm font-bold text-slate-700">{ben}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Office Photos */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4">Galeria de Cultura (Fotos do Escritório)</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-32 rounded-2xl bg-[url('/hero-man.png')] bg-cover bg-center border border-slate-200"></div>
                  <div className="h-32 rounded-2xl bg-[url('/feature-woman.png')] bg-cover bg-center border border-slate-200"></div>
                  <div className="h-32 rounded-2xl bg-slate-50 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 group cursor-pointer hover:border-blue-400 transition-all">
                    <Plus className="h-6 w-6 mb-1 text-slate-300 group-hover:text-blue-500" />
                    <span className="text-[10px] font-bold uppercase">Adicionar</span>
                  </div>
                </div>
              </div>

              {/* Highlight / Testimonial */}
              <div>
                 <h3 className="text-lg font-bold text-slate-900 mb-4">Depoimento em Destaque</h3>
                 <div className="space-y-4">
                    <Textarea 
                      className="bg-slate-50 border-slate-200 rounded-xl min-h-[80px] resize-none font-medium text-slate-900"
                      defaultValue='"Trabalhar aqui é ter a certeza de que você está construindo o futuro..."'
                    />
                    <div className="flex gap-4">
                      <Input placeholder="Nome do Funcionário" defaultValue="Carlos Mendes" className="h-12 bg-slate-50 border-slate-200 rounded-xl font-medium" />
                      <Input placeholder="Cargo" defaultValue="Senior Software Engineer" className="h-12 bg-slate-50 border-slate-200 rounded-xl font-medium" />
                    </div>
                 </div>
              </div>

              <div className="pt-6 border-t border-slate-100 flex justify-end gap-3">
                <Button className="rounded-xl font-bold h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200">
                  Atualizar Portal de Carreiras
                </Button>
              </div>
            </Card>
          )}

          {/* Placeholder for other tabs */}
          {["conta", "seguranca", "notificacoes"].includes(activeTab) && (
            <Card className="p-12 border-slate-100 bg-white rounded-[2.5rem] shadow-sm flex flex-col items-center justify-center text-center animate-in fade-in slide-in-from-right-4 duration-500">
              <Shield className="h-12 w-12 text-slate-300 mb-4" />
              <h3 className="text-xl font-bold text-slate-900">Em Desenvolvimento</h3>
              <p className="text-slate-500 font-medium max-w-sm mt-2">
                As configurações de segurança e notificações serão integradas na próxima atualização.
              </p>
            </Card>
          )}

        </div>
      </div>
    </div>
  );
}
