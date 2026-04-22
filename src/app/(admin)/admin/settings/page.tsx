"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Settings, 
  ShieldCheck, 
  Mail, 
  Database,
  Globe,
  Lock,
  Key,
  History
} from "lucide-react";

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState("geral");

  const menuItems = [
    { id: "geral", name: "Geral", icon: Settings },
    { id: "seguranca", name: "Segurança", icon: ShieldCheck },
    { id: "email", name: "E-mail", icon: Mail },
    { id: "database", name: "Banco de Dados", icon: Database },
    { id: "api", name: "Integrações", icon: Globe },
  ];

  return (
    <div className="max-w-4xl space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Configurações</h1>
        <p className="text-sm text-slate-500 font-medium">Gerencie variáveis globais, segurança e integrações.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <aside className="space-y-1">
          {menuItems.map((item) => (
            <Button 
              key={item.id} 
              onClick={() => setActiveTab(item.id)}
              variant={activeTab === item.id ? "secondary" : "ghost"} 
              className={`w-full justify-start gap-3 h-10 rounded-lg font-bold transition-all text-xs ${activeTab === item.id ? "bg-blue-600 text-white hover:bg-blue-700" : "text-slate-500 hover:bg-slate-50"}`}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Button>
          ))}
        </aside>

        <div className="md:col-span-2 space-y-4">
          {activeTab === "geral" && (
            <Card className="p-6 border-slate-200 bg-white rounded-2xl shadow-sm space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="space-y-4">
                <h3 className="text-base font-bold">Serviço Curadoria (Managed)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="fee" className="text-[10px] font-bold uppercase text-slate-400">Taxa Administrativa (%)</Label>
                    <Input id="fee" defaultValue="15%" className="h-10 bg-slate-50 border-slate-200 rounded-lg text-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="sla" className="text-[10px] font-bold uppercase text-slate-400">SLA de Triagem (Horas)</Label>
                    <Input id="sla" defaultValue="48h" className="h-10 bg-slate-50 border-slate-200 rounded-lg text-sm" />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <Button className="rounded-lg font-bold h-10 px-6 bg-slate-900 text-white text-xs">
                  Salvar Alterações
                </Button>
              </div>
            </Card>
          )}

          {activeTab === "seguranca" && (
            <Card className="p-6 border-slate-200 bg-white rounded-2xl shadow-sm space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="space-y-4">
                <h3 className="text-base font-bold flex items-center gap-2">
                  <Lock className="h-4 w-4 text-blue-600" />
                  Segurança Global
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <div>
                      <p className="text-xs font-bold text-slate-900">Autenticação 2FA</p>
                      <p className="text-[10px] text-slate-500 font-medium">Obrigatório para Administradores.</p>
                    </div>
                    <div className="h-5 w-9 bg-blue-600 rounded-full flex items-center px-1">
                      <div className="h-3 w-3 bg-white rounded-full ml-auto shadow-sm" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <div>
                      <p className="text-xs font-bold text-slate-900">Bloquear Novos Registros</p>
                      <p className="text-[10px] text-slate-500 font-medium">Manutenção temporária do sistema.</p>
                    </div>
                    <div className="h-5 w-9 bg-slate-200 rounded-full flex items-center px-1">
                      <div className="h-3 w-3 bg-white rounded-full shadow-sm" />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {activeTab === "email" && (
            <Card className="p-6 border-slate-200 bg-white rounded-2xl shadow-sm space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
              <h3 className="text-base font-bold">Servidor de E-mail (SMTP)</h3>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold uppercase text-slate-400">Servidor</Label>
                  <Input defaultValue="smtp.sendgrid.net" className="h-10 bg-slate-50 rounded-lg text-sm" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-[10px] font-bold uppercase text-slate-400">Porta</Label>
                    <Input defaultValue="587" className="h-10 bg-slate-50 rounded-lg text-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-[10px] font-bold uppercase text-slate-400">Criptografia</Label>
                    <Input defaultValue="TLS" className="h-10 bg-slate-50 rounded-lg text-sm" />
                  </div>
                </div>
                <Button variant="outline" className="w-full h-10 rounded-lg font-bold text-xs">Testar Conexão</Button>
              </div>
            </Card>
          )}

          {activeTab === "database" && (
            <Card className="p-6 border-slate-200 bg-white rounded-2xl shadow-sm space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold">Banco de Dados</h3>
                <Badge className="bg-emerald-500 text-white text-[9px] border-none font-bold">ATIVO</Badge>
              </div>
              <div className="p-4 rounded-xl bg-slate-900 text-white font-mono text-[10px] leading-relaxed">
                <p>PostgreSQL 16.2</p>
                <p className="mt-1 text-emerald-400">Conexões: 14/100</p>
                <p className="text-blue-400">Tamanho: 1.2 GB</p>
              </div>
              <div className="pt-2 flex gap-2">
                <Button className="flex-1 rounded-lg h-10 font-bold bg-blue-600 text-xs">Backup</Button>
                <Button variant="outline" className="flex-1 rounded-lg h-10 font-bold text-xs"><History className="h-4 w-4 mr-2" /> Restaurar</Button>
              </div>
            </Card>
          )}

          {activeTab === "api" && (
            <Card className="p-6 border-slate-200 bg-white rounded-2xl shadow-sm space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="space-y-4">
                <h3 className="text-base font-bold">Integrações API</h3>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-[9px] font-bold uppercase text-slate-400">Chave de Produção</p>
                    <p className="text-xs font-mono">sk_live_••••••••••••••••4242</p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8"><Key className="h-4 w-4" /></Button>
                </div>
                <Button className="w-full h-10 rounded-lg font-bold bg-slate-900 text-white text-xs">Gerar Nova Chave</Button>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <h3 className="text-base font-bold mb-3">Eventos (Webhooks)</h3>
                <div className="space-y-1">
                  <div className="flex justify-between p-2 rounded-lg hover:bg-slate-50 transition-all text-xs">
                    <span className="font-medium text-slate-600">Stripe Payment</span>
                    <span className="text-emerald-500 font-bold">200 OK</span>
                  </div>
                  <div className="flex justify-between p-2 rounded-lg hover:bg-slate-50 transition-all text-xs">
                    <span className="font-medium text-slate-600">SendGrid Alert</span>
                    <span className="text-emerald-500 font-bold">200 OK</span>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

