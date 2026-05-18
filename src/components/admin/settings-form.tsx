"use client";

import { useState, useTransition } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, Percent, DollarSign } from "lucide-react";
import { saveSettings } from "@/actions/settings";
import { cn } from "@/lib/utils";

type FeeType = "percentage" | "fixed";

type Props = {
  initialSettings: Record<string, string>;
};

export default function SettingsForm({ initialSettings }: Props) {
  const [settings, setSettings] = useState(initialSettings);
  const [saved, setSaved] = useState(false);
  const [isPending, startTransition] = useTransition();

  const feeType: FeeType =
    (settings["managed.fee_type"] as FeeType) || "percentage";

  const update = (key: string, value: string) =>
    setSettings((prev) => ({ ...prev, [key]: value }));

  const handleFeeTypeChange = (type: FeeType) =>
    update("managed.fee_type", type);

  const handleSave = () => {
    startTransition(async () => {
      await saveSettings({
        "managed.fee_percentage": settings["managed.fee_percentage"] ?? "50",
        "managed.fee_type": settings["managed.fee_type"] ?? "percentage",
        "managed.fee_fixed": settings["managed.fee_fixed"] ?? "0",
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
            A taxa é aplicada automaticamente na próxima &quot;Confirmação de
            Efetivação&quot; em Alocações. Comissões já geradas não são
            alteradas.
          </p>
        </div>

        {/* Fee type toggle */}
        <div className="space-y-2">
          <Label className="text-[10px] font-bold uppercase text-slate-400">
            Tipo de Taxa
          </Label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => handleFeeTypeChange("percentage")}
              className={cn(
                "flex items-center gap-2 px-4 h-10 rounded-lg text-xs font-bold border transition-all",
                feeType === "percentage"
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-slate-50 text-slate-500 border-slate-200 hover:border-slate-400"
              )}
            >
              <Percent className="h-3.5 w-3.5" />
              Percentual (%)
            </button>
            <button
              type="button"
              onClick={() => handleFeeTypeChange("fixed")}
              className={cn(
                "flex items-center gap-2 px-4 h-10 rounded-lg text-xs font-bold border transition-all",
                feeType === "fixed"
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-slate-50 text-slate-500 border-slate-200 hover:border-slate-400"
              )}
            >
              <DollarSign className="h-3.5 w-3.5" />
              Valor Fixo (R$)
            </button>
          </div>
        </div>

        {/* Conditional input */}
        {feeType === "percentage" ? (
          <div className="max-w-xs space-y-1.5">
            <Label
              htmlFor="fee-pct"
              className="text-[10px] font-bold uppercase text-slate-400"
            >
              Taxa Administrativa (%)
            </Label>
            <div className="relative">
              <Input
                id="fee-pct"
                type="number"
                min="0"
                max="100"
                step="0.1"
                value={settings["managed.fee_percentage"] ?? "50"}
                onChange={(e) => update("managed.fee_percentage", e.target.value)}
                className="h-10 bg-slate-50 border-slate-200 rounded-lg text-sm pr-10"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                %
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium">
              Aplicado sobre o primeiro salário mensal do candidato contratado.
            </p>
          </div>
        ) : (
          <div className="max-w-xs space-y-1.5">
            <Label
              htmlFor="fee-fixed"
              className="text-[10px] font-bold uppercase text-slate-400"
            >
              Valor Fixo (R$)
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                R$
              </span>
              <Input
                id="fee-fixed"
                type="number"
                min="0"
                step="0.01"
                value={settings["managed.fee_fixed"] ?? "0"}
                onChange={(e) => update("managed.fee_fixed", e.target.value)}
                className="h-10 bg-slate-50 border-slate-200 rounded-lg text-sm pl-9"
              />
            </div>
            <p className="text-[10px] text-slate-400 font-medium">
              Valor fixo cobrado por contratação efetivada, independente do salário.
            </p>
          </div>
        )}

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
