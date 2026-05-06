"use client";

import { useState, useTransition } from "react";
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
  History,
  CheckCircle2,
} from "lucide-react";
import { saveSettings } from "@/actions/settings";

type Props = {
  initialSettings: Record<string, string>;
};

export default function SettingsForm({ initialSettings }: Props) {
  const [activeTab, setActiveTab] = useState("geral");
  const [settings, setSettings] = useState(initialSettings);
  const [saved, setSaved] = useState(false);
  const [isPending, startTransition] = useTransition();

  const update = (key: string, value: string) =>
    setSettings((prev) => ({ ...prev, [key]: value }));

  const toggle = (key: string) => {
    const next = settings[key] === "true" ? "false" : "true";
    setSettings((prev) => ({ ...prev, [key]: next }));
    startTransition(async () => {
      await saveSettings({ [key]: next });
    });
  };

  const handleSave = (keys: string[]) => {
    startTransition(async () => {
      const data: Record<string, string> = {};
      for (const key of keys) data[key] = settings[key] ?? "";
      await saveSettings(data);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    });
  };

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
        <p className="text-sm text-slate-500 font-medium">
          Gerencie variáveis globais, segurança e integrações.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <aside className="space-y-1">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              variant={activeTab === item.id ? "secondary" : "ghost"}
              className={`w-full justify-start gap-3 h-10 rounded-lg font-bold transition-all text-xs ${
                activeTab === item.id
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "text-slate-500 hover:bg-slate-50"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Button>
          ))}
        </aside>

        <div className="md:col-span-2 space-y-4">
          {saved && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold animate-in fade-in duration-300">
              <CheckCircle2 className="h-4 w-4" />
              Configurações salvas com sucesso.
            </div>
          )}

          {activeTab === "geral" && (
            <Card className="p-6 border-slate-200 bg-white rounded-2xl shadow-sm space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="space-y-4">
                <h3 className="text-base font-bold">Serviço Curadoria (Managed)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="fee"
                      className="text-[10px] font-bold uppercase text-slate-400"
                    >
                      Taxa Administrativa (%)
                    </Label>
                    <Input
                      id="fee"
                      value={settings["managed.fee_percentage"]}
                      onChange={(e) => update("managed.fee_percentage", e.target.value)}
                      className="h-10 bg-slate-50 border-slate-200 rounded-lg text-sm"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="sla"
                      className="text-[10px] font-bold uppercase text-slate-400"
                    >
                      SLA de Triagem (Horas)
                    </Label>
                    <Input
                      id="sla"
                      value={settings["managed.sla_hours"]}
                      onChange={(e) => update("managed.sla_hours", e.target.value)}
                      className="h-10 bg-slate-50 border-slate-200 rounded-lg text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <Button
                  onClick={() =>
                    handleSave(["managed.fee_percentage", "managed.sla_hours"])
                  }
                  disabled={isPending}
                  className="rounded-lg font-bold h-10 px-6 bg-slate-900 text-white text-xs"
                >
                  {isPending ? "Salvando..." : "Salvar Alterações"}
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
                  <button
                    onClick={() => toggle("security.2fa_required")}
                    disabled={isPending}
                    className="w-full flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-all cursor-pointer"
                  >
                    <div className="text-left">
                      <p className="text-xs font-bold text-slate-900">Autenticação 2FA</p>
                      <p className="text-[10px] text-slate-500 font-medium">
                        Obrigatório para Administradores.
                      </p>
                    </div>
                    <div
                      className={`h-5 w-9 rounded-full flex items-center px-1 transition-colors ${
                        settings["security.2fa_required"] === "true"
                          ? "bg-blue-600"
                          : "bg-slate-200"
                      }`}
                    >
                      <div
                        className={`h-3 w-3 bg-white rounded-full shadow-sm transition-transform ${
                          settings["security.2fa_required"] === "true" ? "ml-auto" : ""
                        }`}
                      />
                    </div>
                  </button>

                  <button
                    onClick={() => toggle("security.block_registrations")}
                    disabled={isPending}
                    className="w-full flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-all cursor-pointer"
                  >
                    <div className="text-left">
                      <p className="text-xs font-bold text-slate-900">
                        Bloquear Novos Registros
                      </p>
                      <p className="text-[10px] text-slate-500 font-medium">
                        Manutenção temporária do sistema.
                      </p>
                    </div>
                    <div
                      className={`h-5 w-9 rounded-full flex items-center px-1 transition-colors ${
                        settings["security.block_registrations"] === "true"
                          ? "bg-blue-600"
                          : "bg-slate-200"
                      }`}
                    >
                      <div
                        className={`h-3 w-3 bg-white rounded-full shadow-sm transition-transform ${
                          settings["security.block_registrations"] === "true" ? "ml-auto" : ""
                        }`}
                      />
                    </div>
                  </button>
                </div>
              </div>
            </Card>
          )}

          {activeTab === "email" && (
            <Card className="p-6 border-slate-200 bg-white rounded-2xl shadow-sm space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
              <h3 className="text-base font-bold">Servidor de E-mail (SMTP)</h3>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold uppercase text-slate-400">
                    Servidor
                  </Label>
                  <Input
                    value={settings["smtp.server"]}
                    onChange={(e) => update("smtp.server", e.target.value)}
                    className="h-10 bg-slate-50 rounded-lg text-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-[10px] font-bold uppercase text-slate-400">
                      Porta
                    </Label>
                    <Input
                      value={settings["smtp.port"]}
                      onChange={(e) => update("smtp.port", e.target.value)}
                      className="h-10 bg-slate-50 rounded-lg text-sm"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-[10px] font-bold uppercase text-slate-400">
                      Criptografia
                    </Label>
                    <Input
                      value={settings["smtp.encryption"]}
                      onChange={(e) => update("smtp.encryption", e.target.value)}
                      className="h-10 bg-slate-50 rounded-lg text-sm"
                    />
                  </div>
                </div>
                <Button
                  onClick={() => handleSave(["smtp.server", "smtp.port", "smtp.encryption"])}
                  disabled={isPending}
                  className="w-full h-10 rounded-lg font-bold bg-slate-900 text-white text-xs"
                >
                  {isPending ? "Salvando..." : "Salvar Configurações SMTP"}
                </Button>
              </div>
            </Card>
          )}

          {activeTab === "database" && (
            <Card className="p-6 border-slate-200 bg-white rounded-2xl shadow-sm space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold">Banco de Dados</h3>
                <Badge className="bg-emerald-500 text-white text-[9px] border-none font-bold">
                  ATIVO
                </Badge>
              </div>
              <div className="p-4 rounded-xl bg-slate-900 text-white font-mono text-[10px] leading-relaxed">
                <p>PostgreSQL 16.2</p>
                <p className="mt-1 text-emerald-400">Conexões: 14/100</p>
                <p className="text-blue-400">Tamanho: 1.2 GB</p>
              </div>
              <div className="pt-2 flex gap-2">
                <Button className="flex-1 rounded-lg h-10 font-bold bg-blue-600 text-xs">
                  Backup
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 rounded-lg h-10 font-bold text-xs"
                >
                  <History className="h-4 w-4 mr-2" /> Restaurar
                </Button>
              </div>
            </Card>
          )}

          {activeTab === "api" && (
            <Card className="p-6 border-slate-200 bg-white rounded-2xl shadow-sm space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="space-y-4">
                <h3 className="text-base font-bold">Integrações API</h3>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-[9px] font-bold uppercase text-slate-400">
                      Chave de Produção
                    </p>
                    <p className="text-xs font-mono">sk_live_••••••••••••••••4242</p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Key className="h-4 w-4" />
                  </Button>
                </div>
                <Button className="w-full h-10 rounded-lg font-bold bg-slate-900 text-white text-xs">
                  Gerar Nova Chave
                </Button>
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
