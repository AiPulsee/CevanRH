export const dynamic = "force-dynamic";

import { getPlacements } from "@/actions/placements";
import { PlacementsTable } from "@/components/admin/placements-table";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  UserCheck,
  Clock,
  CheckCircle2,
  TrendingUp,
  DollarSign,
  AlertTriangle,
  CalendarDays
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { differenceInDays } from "date-fns";

export default async function AdminPlacementsPage() {
  const allPlacements = await getPlacements();

  // Map to the format expected by PlacementsTable
  const mappedPlacements = allPlacements.map((p) => {
    const daysRemaining = p.status === "TRIAL" ? differenceInDays(new Date(p.trialEndDate), new Date()) : 0;
    return {
      id: p.id,
      status: p.status as "TRIAL" | "EFFECTIVE" | "TERMINATED",
      monthlySalary: p.monthlySalary,
      startDate: p.startDate,
      trialEndDate: p.trialEndDate,
      daysRemaining: Math.max(0, daysRemaining),
      candidate: { 
        name: p.application.candidate.name || "Sem Nome", 
        email: p.application.candidate.email || "" 
      },
      company: { name: p.application.job.company.name },
      jobTitle: p.application.job.title,
      commission: p.commission ? {
        id: p.commission.id,
        amount: p.commission.amount,
        status: p.commission.status as "PENDING" | "INVOICED" | "PAID" | "WAIVED",
        invoiceNumber: p.commission.invoiceNumber,
      } : null,
    };
  });

  // Calculate Stats
  const inTrial = mappedPlacements.filter(p => p.status === "TRIAL");
  const effective = mappedPlacements.filter(p => p.status === "EFFECTIVE");
  const terminated = mappedPlacements.filter(p => p.status === "TERMINATED");
  
  const totalConversions = effective.length + terminated.length;
  const conversionRate = totalConversions > 0 
    ? ((effective.length / totalConversions) * 100).toFixed(1) 
    : "0";

  const potentialRevenue = inTrial.reduce((acc, p) => acc + (p.monthlySalary * 0.5), 0);
  
  const formatCurrencyCompact = (cents: number) => {
    return new Intl.NumberFormat("pt-BR", { 
      style: "currency", 
      currency: "BRL",
      notation: "compact",
      maximumFractionDigits: 1 
    }).format(cents / 100);
  };

  const stats = [
    { name: "Em Trial", value: inTrial.length.toString(), icon: Clock, change: `${inTrial.filter(p => p.daysRemaining <= 7).length} vencem em breve`, tooltip: "Candidatos atualmente no período de experiência (90 dias)" },
    { name: "Efetivados", value: effective.length.toString(), icon: CheckCircle2, change: "Total histórico", tooltip: "Candidatos que concluíram o trial e foram contratados definitivamente" },
    { name: "Taxa de Conversão", value: `${conversionRate}%`, icon: TrendingUp, change: "Trial para Efetivado", tooltip: "Percentual de trials que resultaram em efetivação (Efetivados ÷ Total encerrados)" },
    { name: "Receita Potencial", value: formatCurrencyCompact(potentialRevenue), icon: DollarSign, change: "Em trials ativos", tooltip: "Comissão esperada se todos os trials ativos forem efetivados (50% do 1º salário de cada)" },
  ];

  const urgentPlacements = inTrial.filter(p => p.daysRemaining <= 7);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-blue-600 mb-1">
            <UserCheck className="h-4 w-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">Módulo de Recrutamento</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900">Alocações</h1>
          <p className="text-sm text-slate-500 font-medium">Gerencie candidatos alocados em empresas e acompanhe o período de experiência.</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="p-5 border-slate-200 bg-white rounded-2xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <Tooltip>
                <TooltipTrigger render={
                  <div className="h-10 w-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center cursor-default">
                    <stat.icon className="h-5 w-5 text-slate-600" />
                  </div>
                } />
                <TooltipContent>{stat.tooltip}</TooltipContent>
              </Tooltip>
              <Badge className="bg-slate-100 text-slate-600 border-none font-bold text-[10px]">
                {stat.change}
              </Badge>
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.name}</p>
            <h3 className="text-2xl font-black text-slate-900">{stat.value}</h3>
          </Card>
        ))}
      </div>

      {/* Alertas de Vencimento */}
      {urgentPlacements.length > 0 && (
        <Card className="p-4 border-amber-200 bg-amber-50 rounded-2xl shadow-sm">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-amber-900">Atenção: Alocações prestes a vencer</h4>
              <p className="text-xs text-amber-700 font-medium">
                {urgentPlacements.length} alocação(ões) com menos de 7 dias para o fim do trial. Contate as empresas para confirmar efetivação.
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Tabela de Alocações */}
      <PlacementsTable placements={mappedPlacements} />

      {/* Timeline/Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Próximos Vencimentos */}
        <Card className="p-6 border-slate-200 bg-white rounded-2xl shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <CalendarDays className="h-4 w-4 text-amber-500" />
            <h3 className="text-sm font-bold text-slate-900">Próximos Vencimentos</h3>
          </div>
          <div className="space-y-3">
            {inTrial.length > 0 ? (
              inTrial
                .sort((a, b) => a.daysRemaining - b.daysRemaining)
                .slice(0, 5)
                .map((p) => (
                  <div key={p.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <Tooltip>
                        <TooltipTrigger render={
                          <div className={`h-2 w-2 rounded-full cursor-default ${
                            p.daysRemaining <= 7 ? "bg-rose-500 animate-pulse" :
                            p.daysRemaining <= 15 ? "bg-amber-500" : "bg-blue-500"
                          }`} />
                        } />
                        <TooltipContent>
                          {p.daysRemaining <= 7
                            ? "Urgente — vence em até 7 dias"
                            : p.daysRemaining <= 15
                            ? "Atenção — vence em até 15 dias"
                            : "Trial dentro do prazo"}
                        </TooltipContent>
                      </Tooltip>
                      <div>
                        <p className="text-[11px] font-bold text-slate-900">{p.candidate.name}</p>
                        <p className="text-[9px] text-slate-400 font-medium">{p.company.name}</p>
                      </div>
                    </div>
                    <span className={`text-[10px] font-black px-2 py-1 rounded-lg ${
                      p.daysRemaining <= 7 ? "text-rose-600 bg-rose-50" :
                      p.daysRemaining <= 15 ? "text-amber-600 bg-amber-50" :
                      "text-slate-600 bg-slate-50"
                    }`}>
                      {p.daysRemaining}d restantes
                    </span>
                  </div>
                ))
            ) : (
              <p className="text-xs text-slate-400 font-medium py-4 text-center">Nenhum trial ativo no momento.</p>
            )}
          </div>
        </Card>

        {/* Receita de Curadoria */}
        <Card className="p-6 border-none bg-blue-600 text-white rounded-2xl shadow-sm">
          <h3 className="text-sm font-bold mb-4">Receita de Curadoria</h3>
          <div className="space-y-4">
            <div>
              <p className="text-[9px] font-bold uppercase text-blue-200">Receita Potencial Total</p>
              <p className="text-2xl font-black">{new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(potentialRevenue / 100)}</p>
              <div className="h-1 w-full bg-white/20 rounded-full mt-1.5">
                <div className="h-full bg-white rounded-full w-full" />
              </div>
            </div>
            <div className="p-3 rounded-lg bg-white/5 border border-white/10">
              <p className="text-[9px] text-blue-200 font-medium leading-relaxed">
                Com {inTrial.length} candidatos em trial, a receita potencial de comissões (50% do primeiro salário) é de <span className="font-black text-white">{new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(potentialRevenue / 100)}</span>.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
