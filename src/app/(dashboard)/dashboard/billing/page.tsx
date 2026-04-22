"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { 
  CreditCard, 
  Receipt, 
  ArrowUpRight, 
  CheckCircle2, 
  TrendingUp,
  Download,
  ShieldCheck,
  Info
} from "lucide-react";

export default function BillingPage() {
  return (
    <TooltipProvider>
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-blue-600 mb-1">
              <ShieldCheck className="h-4 w-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">Gestão de Assinatura</span>
            </div>
            <h1 className="text-2xl font-black text-slate-900">Financeiro e Plano</h1>
            <p className="text-sm text-slate-500 font-medium">Gerencie sua conta, faturas e métodos de pagamento.</p>
          </div>
          <Button className="rounded-lg font-bold h-10 px-6 bg-slate-900 text-white text-xs">
            Upgrade de Plano
            <TrendingUp className="ml-2 h-3.5 w-3.5" />
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Card de Plano Atual */}
          <Card className="lg:col-span-2 p-6 border-slate-200 bg-white rounded-2xl shadow-sm relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row justify-between gap-6">
              <div className="space-y-5 flex-1">
                <div>
                  <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Plano Ativo</p>
                  <h3 className="text-2xl font-black text-slate-900">Pro Business</h3>
                  <p className="text-xs text-slate-400 font-medium mt-1">Próxima renovação: 12 de Maio, 2026.</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-1.5 mb-1">
                      <p className="text-[10px] text-slate-400 font-bold uppercase">Vagas Usadas</p>
                      <Tooltip>
                        <TooltipTrigger className="cursor-help">
                          <Info className="h-3 w-3 text-slate-300" />
                        </TooltipTrigger>
                        <TooltipContent side="top">
                          Limite de vagas simultâneas no seu plano.
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <p className="text-xl font-black text-slate-900">08 <span className="text-xs font-medium text-slate-400">/ 10</span></p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-1.5 mb-1">
                      <p className="text-[10px] text-slate-400 font-bold uppercase">Candidatos</p>
                      <Tooltip>
                        <TooltipTrigger className="cursor-help">
                          <Info className="h-3 w-3 text-slate-300" />
                        </TooltipTrigger>
                        <TooltipContent side="top">
                          Você pode receber currículos ilimitados.
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <p className="text-xl font-black text-slate-900">Ilimitado</p>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-1">
                    <span className="text-slate-400">Consumo de Vagas</span>
                    <span className="text-blue-600">80%</span>
                  </div>
                  <Tooltip>
                    <TooltipTrigger className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden block cursor-help">
                      <div className="h-full bg-blue-600 rounded-full shadow-sm" style={{ width: "80%" }} />
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      Restam 2 vagas disponíveis para publicação.
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>

            <div className="w-full md:w-64 space-y-4 p-5 rounded-xl bg-blue-50/50 border border-blue-100">
              <h4 className="font-bold text-xs text-blue-900 uppercase tracking-tight">Benefícios Pro:</h4>
              <ul className="space-y-2.5">
                {[
                  "Suporte prioritário 24/7",
                  "Filtros de IA avançados",
                  "Equipe até 5 usuários",
                  "Branding Personalizado",
                ].map(feature => (
                  <li key={feature} className="flex items-start gap-2 text-[11px] text-slate-600 font-medium">
                    <CheckCircle2 className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="w-full h-9 rounded-lg border-blue-200 text-blue-700 font-bold text-[10px] hover:bg-blue-100 mt-2 bg-white">
                Gerenciar Recursos
              </Button>
            </div>
          </div>
        </Card>

        {/* Método de Pagamento */}
        <Card className="p-6 border-slate-200 bg-white rounded-2xl shadow-sm flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center">
                <CreditCard className="h-4.5 w-4.5 text-slate-600" />
              </div>
              <h3 className="font-bold text-base text-slate-900">Pagamento</h3>
            </div>
            
            <div className="p-5 rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-transparent relative group overflow-hidden">
              <p className="text-[9px] text-slate-400 font-black mb-1 uppercase tracking-widest">Cartão Principal</p>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-5 w-8 bg-white border border-slate-100 rounded flex items-center justify-center font-bold text-[7px] italic text-blue-600">VISA</div>
                <span className="font-black text-base text-slate-900 tracking-wider">•••• 4242</span>
              </div>
              <Badge variant="outline" className="rounded-md border-blue-200 text-blue-600 bg-white text-[9px] font-black">EXP 12/28</Badge>
            </div>
          </div>

          <Button variant="ghost" className="w-full h-10 rounded-lg font-bold text-blue-600 hover:bg-blue-50 text-xs">
            Alterar Cartão
            <ArrowUpRight className="ml-2 h-3.5 w-3.5" />
          </Button>
        </Card>

        {/* Tabela de Faturas */}
        <Card className="lg:col-span-3 p-6 border-slate-200 bg-white rounded-2xl shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center">
                <Receipt className="h-4.5 w-4.5 text-slate-600" />
              </div>
              <h3 className="font-bold text-base text-slate-900">Histórico de Faturas</h3>
            </div>
            <Button variant="outline" size="sm" className="h-8 rounded-lg border-slate-200 bg-white font-bold text-[10px] px-4">Filtrar</Button>
          </div>

          <div className="space-y-1">
            {[
              { id: "#INV-2026-001", date: "12 Abr, 2026", amount: "R$ 499,00", status: "Pago" },
              { id: "#INV-2026-002", date: "12 Mar, 2026", amount: "R$ 499,00", status: "Pago" },
              { id: "#INV-2026-003", date: "12 Fev, 2026", amount: "R$ 499,00", status: "Pago" },
            ].map((invoice, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-all border border-transparent">
                <div className="flex items-center flex-1">
                  <span className="font-bold text-xs text-slate-900 w-32">{invoice.id}</span>
                  <span className="text-[11px] text-slate-500 font-medium w-32">{invoice.date}</span>
                  <span className="font-black text-xs text-slate-900 w-24">{invoice.amount}</span>
                  <Badge className="bg-emerald-50 text-emerald-600 border-emerald-100 rounded-md text-[9px] font-black px-2 py-0.5">{invoice.status}</Badge>
                </div>
                <Button variant="outline" size="icon" className="h-8 w-8 rounded-lg border-slate-200 bg-white shadow-sm hover:text-blue-600 hover:border-blue-200">
                  <Download className="h-3.5 w-3.5" />
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
      </div>
    </TooltipProvider>
  );
}

