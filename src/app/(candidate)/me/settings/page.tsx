"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  User, 
  Lock, 
  Bell, 
  Mail,
  ShieldCheck,
  Smartphone,
  EyeOff
} from "lucide-react";

export default function CandidateSettingsPage() {
  const [activeTab, setActiveTab] = useState("perfil");

  const menuItems = [
    { id: "perfil", name: "Dados Pessoais", icon: User },
    { id: "seguranca", name: "Segurança", icon: Lock },
    { id: "notificacoes", name: "Notificações", icon: Bell },
    { id: "credentials", name: "E-mail & Senha", icon: Mail },
  ];

  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-black tracking-tight">Configurações de Perfil</h1>
        <p className="text-muted-foreground mt-1">Gerencie sua privacidade e preferências de comunicação.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <aside className="space-y-1">
          {menuItems.map((item) => (
            <Button 
              key={item.id} 
              onClick={() => setActiveTab(item.id)}
              variant={activeTab === item.id ? "secondary" : "ghost"} 
              className={`w-full justify-start gap-3 h-12 rounded-xl font-bold transition-all ${activeTab === item.id ? "bg-primary/5 text-primary" : "text-muted-foreground hover:bg-secondary"}`}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Button>
          ))}
        </aside>

        <div className="md:col-span-2 space-y-6">
          {activeTab === "perfil" && (
            <Card className="p-8 border-border bg-white rounded-[2.5rem] shadow-sm space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center gap-6">
                <div className="h-20 w-20 rounded-[1.5rem] bg-primary/10 border border-primary/20 flex items-center justify-center font-black text-2xl text-primary">
                  D
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold">Foto de Perfil</h3>
                  <p className="text-xs text-muted-foreground">Sua foto será vista pelos recrutadores.</p>
                  <div className="flex gap-2 mt-2">
                    <Button size="sm" variant="outline" className="rounded-lg h-8 text-[10px] font-black uppercase">Alterar</Button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="font-bold">Nome</Label>
                  <Input id="firstName" defaultValue="Danilo" className="h-12 bg-secondary/50 border-border rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="font-bold">Sobrenome</Label>
                  <Input id="lastName" defaultValue="Silva" className="h-12 bg-secondary/50 border-border rounded-xl" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="email" className="font-bold">E-mail de Contato</Label>
                  <Input id="email" defaultValue="dev@talent.com" className="h-12 bg-secondary/50 border-border rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="font-bold">Telefone / WhatsApp</Label>
                  <Input id="phone" placeholder="(11) 99999-9999" className="h-12 bg-secondary/50 border-border rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city" className="font-bold">Cidade</Label>
                  <Input id="city" defaultValue="São Paulo, SP" className="h-12 bg-secondary/50 border-border rounded-xl" />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100 flex items-start gap-3">
                <ShieldCheck className="h-5 w-5 text-blue-500 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-xs font-bold text-blue-900">Privacidade de Perfil</p>
                  <p className="text-[10px] text-blue-700 leading-relaxed">Apenas empresas das vagas que você se candidatou podem ver seu perfil completo e currículo.</p>
                </div>
              </div>

              <div className="pt-6 border-t border-border flex justify-end gap-3">
                <Button className="rounded-xl font-bold h-12 px-8">Salvar Dados</Button>
              </div>
            </Card>
          )}

          {activeTab === "seguranca" && (
            <Card className="p-8 border-border bg-white rounded-[2.5rem] shadow-sm space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="space-y-6">
                <h3 className="text-lg font-bold">Segurança e Privacidade</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-secondary/50 border border-border">
                    <div className="flex items-center gap-3">
                      <Smartphone className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm font-bold">Verificação em Duas Etapas</p>
                        <p className="text-xs text-muted-foreground">Proteja sua conta com SMS ou App.</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="rounded-lg font-bold">Ativar</Button>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-2xl bg-secondary/50 border border-border">
                    <div className="flex items-center gap-3">
                      <EyeOff className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm font-bold">Perfil Invisível</p>
                        <p className="text-xs text-muted-foreground">Ocultar seu perfil de buscas globais.</p>
                      </div>
                    </div>
                    <div className="h-6 w-10 bg-secondary rounded-full border border-border flex items-center px-1">
                      <div className="h-4 w-4 bg-white rounded-full shadow-sm" />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {activeTab === "notificacoes" && (
            <Card className="p-8 border-border bg-white rounded-[2.5rem] shadow-sm space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <h3 className="text-lg font-bold">Preferências de Alerta</h3>
              <div className="space-y-4">
                {[
                  "Novas vagas compatíveis com meu perfil",
                  "Mensagens de recrutadores",
                  "Atualizações no status da candidatura",
                  "Newsletter mensal de carreira",
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <span className="text-sm font-medium">{item}</span>
                    <div className={`h-6 w-10 rounded-full flex items-center px-1 ${i < 3 ? 'bg-primary' : 'bg-secondary'}`}>
                      <div className={`h-4 w-4 bg-white rounded-full shadow-sm ${i < 3 ? 'ml-auto' : ''}`} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {activeTab === "credentials" && (
            <Card className="p-8 border-border bg-white rounded-[2.5rem] shadow-sm space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <h3 className="text-lg font-bold">Acesso à Conta</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="font-bold">E-mail de Login</Label>
                  <Input defaultValue="dev@talent.com" className="h-12 bg-secondary/50 border-border rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold">Senha Atual</Label>
                  <Input type="password" value="••••••••" className="h-12 bg-secondary/50 border-border rounded-xl" readOnly />
                </div>
                <Button variant="outline" className="w-full h-12 rounded-xl font-bold border-primary/20 text-primary hover:bg-primary/5">
                  Solicitar Alteração de Senha
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
