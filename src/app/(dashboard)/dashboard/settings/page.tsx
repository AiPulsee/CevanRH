"use client";

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
  Upload
} from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-black tracking-tight">Configurações</h1>
        <p className="text-muted-foreground mt-1">Gerencie seu perfil, empresa e preferências da conta.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Navigation Tabs (Vertical) */}
        <aside className="w-full md:w-64 space-y-1">
          {[
            { name: "Perfil da Empresa", icon: Building, active: true },
            { name: "Minha Conta", icon: User },
            { name: "Segurança", icon: Shield },
            { name: "Notificações", icon: Bell },
            { name: "Integrações", icon: Globe },
          ].map((item) => (
            <Button 
              key={item.name} 
              variant={item.active ? "secondary" : "ghost"} 
              className={`w-full justify-start gap-3 h-12 rounded-xl font-bold transition-all ${item.active ? "bg-primary/5 text-primary" : "text-muted-foreground hover:bg-secondary"}`}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Button>
          ))}
        </aside>

        {/* Content */}
        <div className="flex-1 space-y-6">
          <Card className="p-8 border-border bg-white rounded-[2.5rem] shadow-sm space-y-8">
            <div className="flex items-center gap-6">
              <div className="h-24 w-24 rounded-[2rem] bg-secondary border-2 border-dashed border-border flex flex-col items-center justify-center text-muted-foreground group cursor-pointer hover:border-primary/50 transition-all">
                <Upload className="h-6 w-6 mb-1 group-hover:text-primary" />
                <span className="text-[10px] font-bold uppercase">Logo</span>
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold">Logo da Empresa</h3>
                <p className="text-xs text-muted-foreground">PNG ou JPG até 2MB. Recomendado 512x512px.</p>
                <div className="flex gap-2 mt-2">
                  <Button size="sm" variant="outline" className="rounded-lg h-8 text-[10px] font-black uppercase">Remover</Button>
                  <Button size="sm" className="rounded-lg h-8 text-[10px] font-black uppercase">Alterar</Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="companyName" className="font-bold">Nome da Empresa</Label>
                <Input id="companyName" defaultValue="Google Cloud" className="h-12 bg-secondary/50 border-border rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website" className="font-bold">Website</Label>
                <Input id="website" defaultValue="https://google.com" className="h-12 bg-secondary/50 border-border rounded-xl" />
              </div>
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="description" className="font-bold">Descrição curta</Label>
                <Textarea 
                  id="description" 
                  className="bg-secondary/50 border-border rounded-xl min-h-[120px] resize-none"
                  placeholder="Conte um pouco sobre a cultura da sua empresa..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location" className="font-bold">Sede</Label>
                <Input id="location" defaultValue="Mountain View, CA" className="h-12 bg-secondary/50 border-border rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="industry" className="font-bold">Setor</Label>
                <Input id="industry" defaultValue="Tecnologia" className="h-12 bg-secondary/50 border-border rounded-xl" />
              </div>
            </div>

            <div className="pt-6 border-t border-border flex justify-end gap-3">
              <Button variant="ghost" className="rounded-xl font-bold h-12 px-8">Descartar</Button>
              <Button className="rounded-xl font-bold h-12 px-8 shadow-lg shadow-primary/20">Salvar Alterações</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
