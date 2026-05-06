export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/card";
import { Receipt, TrendingUp, Clock, CheckCircle2, Ban } from "lucide-react";
import { CommissionsTable } from "@/components/admin/commissions-table";

export default async function AdminFinancePage() {
  const [commissions, summary] = await Promise.all([
    prisma.commission.findMany({
      include: {
        placement: {
          include: {
            application: {
              include: {
                candidate: { select: { name: true, email: true } },
                job: {
                  include: { company: { select: { name: true } } },
                },
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.commission.groupBy({
      by: ["status"],
      _sum: { amount: true },
      _count: { id: true },
    }),
  ]);

  const rows = commissions.map((c) => ({
    id: c.id,
    amount: c.amount,
    status: c.status as "PENDING" | "INVOICED" | "PAID" | "WAIVED",
    invoiceNumber: c.invoiceNumber,
    dueDate: c.dueDate,
    paidAt: c.paidAt,
    candidateName: c.placement.application.candidate.name ?? "Sem Nome",
    candidateEmail: c.placement.application.candidate.email ?? "",
    companyName: c.placement.application.job.company.name,
    jobTitle: c.placement.application.job.title,
  }));

  function fmt(cents: number) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(cents / 100);
  }

  const byStatus = Object.fromEntries(
    summary.map((s) => [s.status, { sum: s._sum.amount ?? 0, count: s._count.id }])
  );

  const totalReceivable =
    (byStatus["PENDING"]?.sum ?? 0) + (byStatus["INVOICED"]?.sum ?? 0);
  const totalPaid = byStatus["PAID"]?.sum ?? 0;
  const pendingCount = byStatus["PENDING"]?.count ?? 0;
  const invoicedCount = byStatus["INVOICED"]?.count ?? 0;

  const stats = [
    {
      name: "A Receber",
      value: fmt(totalReceivable),
      sub: `${pendingCount + invoicedCount} em aberto`,
      icon: TrendingUp,
      accent: "border-l-blue-500",
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      name: "Pendentes",
      value: pendingCount.toString(),
      sub: "Aguardando faturamento",
      icon: Clock,
      accent: "border-l-amber-500",
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
    },
    {
      name: "Faturados",
      value: invoicedCount.toString(),
      sub: "NF emitida, aguardando pgto",
      icon: Receipt,
      accent: "border-l-indigo-500",
      iconBg: "bg-indigo-50",
      iconColor: "text-indigo-600",
    },
    {
      name: "Total Recebido",
      value: fmt(totalPaid),
      sub: `${byStatus["PAID"]?.count ?? 0} comissões pagas`,
      icon: CheckCircle2,
      accent: "border-l-emerald-500",
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div>
        <div className="flex items-center gap-1.5 text-blue-600 mb-1">
          <Receipt className="h-4 w-4" />
          <span className="text-[10px] font-black uppercase tracking-widest">Controle Financeiro</span>
        </div>
        <h1 className="text-2xl font-black text-slate-900">Finanças</h1>
        <p className="text-sm text-slate-500 font-medium">
          Acompanhe todas as comissões geradas pelas efetivações.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card
            key={s.name}
            className={`p-5 border-slate-200 bg-white rounded-2xl shadow-sm border-l-4 ${s.accent}`}
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className={`h-10 w-10 rounded-xl ${s.iconBg} flex items-center justify-center`}
              >
                <s.icon className={`h-5 w-5 ${s.iconColor}`} />
              </div>
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              {s.name}
            </p>
            <h3 className="text-2xl font-black text-slate-900">{s.value}</h3>
            <p className="text-[10px] text-slate-400 font-medium mt-0.5">{s.sub}</p>
          </Card>
        ))}
      </div>

      {/* Empty state */}
      {rows.length === 0 ? (
        <Card className="p-12 border-slate-200 bg-white rounded-2xl shadow-sm text-center">
          <Ban className="h-10 w-10 text-slate-200 mx-auto mb-3" />
          <p className="text-slate-400 font-medium">
            Nenhuma comissão gerada ainda. Efetive um candidato em Alocações para gerar a primeira
            comissão.
          </p>
        </Card>
      ) : (
        <CommissionsTable commissions={rows} />
      )}
    </div>
  );
}
