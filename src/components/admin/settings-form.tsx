"use client";

import { useState, useTransition } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2 } from "lucide-react";
import { saveSettings } from "@/actions/settings";

type Props = {
  initialSettings: Record<string, string>;
};

export default function SettingsForm({ initialSettings }: Props) {
  const [settings, setSettings] = useState(initialSettings);
  const [saved, setSaved] = useState(false);
  const [isPending, startTransition] = useTransition();

  const update = (key: string, value: string) =>
    setSettings((prev) => ({ ...prev, [key]: value }));

  const handleSave = () => {
    startTransition(async () => {
      await saveSettings({
        "managed.fee_percentage": settings["managed.fee_percentage"] ?? "",
        "managed.sla_hours": settings["managed.sla_hours"] ?? "",
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    });
  };

  return (
    <div className="max-w-2xl space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Configurações</h1>
        <p className="text-sm text-slate-500 font-medium">
          Gerencie as variáveis globais do sistema.
        </p>
      </div>

      {saved && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold animate-in fade-in duration-300">
          <CheckCircle2 className="h-4 w-4" />
          Configurações salvas com sucesso.
        </div>
      )}

      <Card className="p-6 border-slate-200 bg-white rounded-2xl shadow-sm space-y-6">
        <div>
          <h3 className="text-base font-bold">Serviço Curadoria (Managed)</h3>
          <p className="text-[11px] text-slate-400 font-medium mt-0.5">
            A taxa é aplicada automaticamente na próxima "Confirmação de Efetivação" em Alocações. Comissões já geradas não são alteradas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="fee" className="text-[10px] font-bold uppercase text-slate-400">
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
            <Label htmlFor="sla" className="text-[10px] font-bold uppercase text-slate-400">
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

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <Button
            onClick={handleSave}
            disabled={isPending}
            className="rounded-lg font-bold h-10 px-6 bg-slate-900 text-white text-xs"
          >
            {isPending ? "Salvando..." : "Salvar Alterações"}
          </Button>
        </div>
      </Card>
    </div>
  );
}
