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

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Empresas Clientes</h1>
          <p className="text-sm text-slate-500 font-medium">
            Gestão de clientes e parceiros corporativos.
          </p>
        </div>
        <CreateCompanyModal />
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="p-4 sm:p-5 border-slate-200 bg-white rounded-2xl shadow-sm">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center">
              <Building2 className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-slate-400">Total de Clientes</p>
              <h3 className="text-xl font-black text-slate-900">{companies.length}</h3>
            </div>
          </div>
        </Card>
        <Card className="p-4 sm:p-5 border-slate-200 bg-white rounded-2xl shadow-sm">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-indigo-50 flex items-center justify-center">
              <Zap className="h-5 w-5 text-indigo-600" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-slate-400">Vagas Publicadas</p>
              <h3 className="text-xl font-black text-slate-900">{totalJobs}</h3>
            </div>
          </div>
        </Card>
        <Card className="p-4 sm:p-5 border-slate-200 bg-white rounded-2xl shadow-sm sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-emerald-50 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-slate-400">Contratações</p>
              <h3 className="text-xl font-black text-slate-900">{totalShortlists}</h3>
            </div>
          </div>
        </Card>
      </div>

      <CompaniesGrid companies={companies} />
    </div>
  );
}
