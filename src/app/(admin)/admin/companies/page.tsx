import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/card";
import { Building2, Zap, TrendingUp } from "lucide-react";
import { CreateCompanyModal } from "@/components/admin/create-company-modal";
import { CompaniesGrid } from "@/components/admin/companies-grid";

export default async function AdminCompaniesPage() {
  const [companies, totalJobs, totalShortlists] = await Promise.all([
    prisma.company.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        email: true,
        description: true,
        industry: true,
        location: true,
        logoUrl: true,
        _count: { select: { jobs: true, users: true } },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.job.count(),
    prisma.shortlist.count(),
  ]);

  const stats = [
    {
      label: "Total de Clientes",
      value: companies.length,
      icon: Building2,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-l-blue-500",
    },
    {
      label: "Vagas Publicadas",
      value: totalJobs,
      icon: Zap,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      border: "border-l-indigo-500",
    },
    {
      label: "Contratações",
      value: totalShortlists,
      icon: TrendingUp,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-l-emerald-500",
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Empresas Clientes</h1>
          <p className="text-sm text-slate-500 font-medium">
            Gestão de clientes e parceiros corporativos.
          </p>
        </div>
        <CreateCompanyModal />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {stats.map((s) => (
          <Card
            key={s.label}
            className={`p-4 border-slate-200 bg-white rounded-2xl shadow-sm border-l-4 ${s.border}`}
          >
            <div className="flex items-center gap-3">
              <div className={`h-9 w-9 rounded-xl ${s.bg} flex items-center justify-center shrink-0`}>
                <s.icon className={`h-4 w-4 ${s.color}`} />
              </div>
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 leading-none mb-1">
                  {s.label}
                </p>
                <h3 className={`text-2xl font-black ${s.color}`}>{s.value}</h3>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <CompaniesGrid companies={companies} />
    </div>
  );
}
