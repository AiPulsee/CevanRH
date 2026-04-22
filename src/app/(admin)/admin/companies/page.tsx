"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  Search, 
  Filter, 
  MoreHorizontal, 
  CheckCircle2, 
  XCircle,
  ExternalLink,
  Users,
  AlertTriangle,
  LogIn
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { CreateCompanyModal } from "@/components/admin/create-company-modal";
import { ReviewCompanyModal } from "@/components/admin/review-company-modal";

export default function AdminCompanies() {
  const companies = [
    { name: "Google Cloud", slug: "google-cloud", plan: "PROFISSIONAL", status: "Ativo", employees: 42, jobs: 8, joined: "12 Jan 2026", managed: true },
    { name: "Nubank", slug: "nubank", plan: "CORPORATIVO", status: "Ativo", employees: 125, jobs: 14, joined: "05 Fev 2026", managed: true },
    { name: "Vercel", slug: "vercel", plan: "PROFISSIONAL", status: "Ativo", employees: 18, jobs: 4, joined: "10 Mar 2026", managed: false },
  ];

  const pendingCompanies = [
    { name: "SpaceX", slug: "spacex", plan: "GRATUITO", requestDate: "20 Abr 2026 (Há 2h)" }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Empresas</h1>
          <p className="text-sm text-slate-500 font-medium">Gerencie clientes corporativos e seus planos.</p>
        </div>
        <CreateCompanyModal />
      </div>

      {/* Fila de Aprovação */}
      {pendingCompanies.length > 0 && (
        <Card className="border-amber-200 bg-amber-50 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            <h3 className="text-base font-bold text-amber-900">Aprovação Pendente ({pendingCompanies.length})</h3>
          </div>
          <div className="space-y-2">
            {pendingCompanies.map((company) => (
              <div key={company.slug} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white rounded-xl border border-amber-100 shadow-sm gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-sm">
                    {company.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{company.name} <span className="text-xs text-slate-400 font-medium ml-1">/{company.slug}</span></h4>
                    <p className="text-[10px] text-slate-500">Solicitado: {company.requestDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <ReviewCompanyModal company={company} />
                  <Button className="rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-bold h-9 px-4 text-xs">Aprovar</Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Ferramentas */}
      <div className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-slate-200 shadow-sm">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input placeholder="Buscar por nome ou slug..." className="pl-10 h-10 border-none bg-slate-50 rounded-lg text-sm" />
        </div>
        <Button variant="outline" className="h-10 rounded-lg border-slate-200 font-bold text-xs text-slate-600 px-4">
          <Filter className="h-4 w-4 mr-2" />
          Filtros
        </Button>
      </div>

      {/* Lista de Empresas */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="px-5 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400">Empresa</th>
                <th className="px-5 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400">Plano</th>
                <th className="px-5 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                <th className="px-5 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400">Curadoria</th>
                <th className="px-5 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400">Time / Vagas</th>
                <th className="px-5 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {companies.map((company) => (
                <tr key={company.slug} className="hover:bg-slate-50/50 transition-all cursor-pointer group">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-xs">
                        {company.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{company.name}</p>
                        <p className="text-[10px] text-slate-400">/{company.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <Badge variant="outline" className="rounded-md border-blue-200 text-blue-600 bg-blue-50/50 text-[10px] font-bold">
                      {company.plan}
                    </Badge>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5">
                      {company.status === "Ativo" ? (
                        <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                      ) : (
                        <XCircle className="h-3.5 w-3.5 text-orange-400" />
                      )}
                      <span className="text-xs font-medium text-slate-600">{company.status}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    {company.managed ? (
                      <Badge className="rounded-md bg-indigo-500 text-white border-none text-[9px] font-bold uppercase px-1.5">Ativa</Badge>
                    ) : (
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Inativa</span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3 text-xs font-bold text-slate-600">
                      <span className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5 text-slate-400" /> {company.employees}</span>
                      <span className="flex items-center gap-1.5"><Building2 className="h-3.5 w-3.5 text-slate-400" /> {company.jobs}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                      <Button variant="outline" size="sm" className="h-8 rounded-lg border-slate-200 font-bold text-[10px] text-slate-600 bg-white hover:text-blue-600 hover:bg-blue-50">
                        <LogIn className="h-3.5 w-3.5 mr-1.5" />
                        Acessar
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-slate-400">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
