"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Settings, 
  ShieldCheck, 
  Mail, 
  Database,
  Globe,
  Lock
} from "lucide-react";

export default function AdminSettings() {
  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-slate-900">Configurações do Sistema</h1>
        <p className="text-slate-500 mt-1">Gerencie variáveis globais, segurança e integrações de backoffice.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <aside className="space-y-1">
          {[
            { name: "Geral", icon: Settings, active: true },
            { name: "Segurança", icon: ShieldCheck },
            { name: "Config. de E-mail", icon: Mail },
            { name: "Banco de Dados", icon: Database },
            { name: "API & Webhooks", icon: Globe },
          ].map((item) => (
            <Button 
              key={item.name} 
              variant={item.active ? "secondary" : "ghost"} 
              className={`w-full justify-start gap-3 h-12 rounded-xl font-bold transition-all ${item.active ? "bg-indigo-500/10 text-indigo-600 border border-indigo-500/20" : "text-slate-500 hover:bg-slate-50"}`}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Button>
          ))}
        </aside>

        <div className="md:col-span-2 space-y-6">
          <Card className="p-8 border-slate-200 bg-white rounded-[2.5rem] shadow-sm space-y-8">
            <div className="space-y-6">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Lock className="h-5 w-5 text-indigo-500" />
                Segurança Global
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <div>
                    <p className="text-sm font-bold text-slate-900">Autenticação de Dois Fatores (2FA)</p>
                    <p className="text-xs text-slate-500 font-medium">Obrigatório para todos os Administradores.</p>
                  </div>
                  <div className="h-6 w-10 bg-indigo-600 rounded-full flex items-center px-1">
                    <div className="h-4 w-4 bg-white rounded-full ml-auto shadow-sm" />
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <div>
                    <p className="text-sm font-bold text-slate-900">Manutenção do Sistema</p>
                    <p className="text-xs text-slate-500 font-medium">Bloquear novos registros temporariamente.</p>
                  </div>
                  <div className="h-6 w-10 bg-slate-200 rounded-full flex items-center px-1">
                    <div className="h-4 w-4 bg-white rounded-full shadow-sm" />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold">Variáveis do Managed Service</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fee" className="font-bold">Taxa Managed (%)</Label>
                  <Input id="fee" defaultValue="15%" className="h-12 bg-slate-50 border-slate-200 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sla" className="font-bold">SLA de Triagem (Horas)</Label>
                  <Input id="sla" defaultValue="48h" className="h-12 bg-slate-50 border-slate-200 rounded-xl" />
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-200 flex justify-end gap-3">
              <Button variant="ghost" className="rounded-xl font-bold h-12 px-8">Descartar</Button>
              <Button className="rounded-xl font-bold h-12 px-8 bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200">
                Salvar Configurações
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
