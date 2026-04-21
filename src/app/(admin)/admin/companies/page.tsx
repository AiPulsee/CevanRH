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

export default function AdminCompanies() {
  const companies = [
    { name: "Google Cloud", slug: "google-cloud", plan: "PRO", status: "Ativo", employees: 42, jobs: 8, joined: "12 Jan 2026" },
    { name: "Nubank", slug: "nubank", plan: "ENTERPRISE", status: "Ativo", employees: 125, jobs: 14, joined: "05 Fev 2026" },
    { name: "Vercel", slug: "vercel", plan: "PRO", status: "Ativo", employees: 18, jobs: 4, joined: "10 Mar 2026" },
  ];

  const pendingCompanies = [
    { name: "SpaceX", slug: "spacex", plan: "FREE", requestDate: "20 Abr 2026 (Há 2h)" }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">Empresas Cadastradas</h1>
          <p className="text-slate-500 mt-1">Gerencie todos os clientes corporativos e seus respectivos planos.</p>
        </div>
        <CreateCompanyModal />
      </div>

      {/* Fila de Aprovação */}
      {pendingCompanies.length > 0 && (
        <Card className="border-amber-200 bg-amber-50 rounded-[2rem] p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="h-6 w-6 text-amber-500" />
            <h3 className="text-lg font-bold text-amber-900">Aprovação Pendente ({pendingCompanies.length})</h3>
          </div>
          <div className="space-y-3">
            {pendingCompanies.map((company) => (
              <div key={company.slug} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white rounded-2xl border border-amber-100 shadow-sm gap-4">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-500">
                    {company.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{company.name} <span className="text-sm text-slate-400 font-medium ml-1">/{company.slug}</span></h4>
                    <p className="text-xs text-slate-500 mt-0.5">Solicitado em: {company.requestDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Button variant="outline" className="rounded-xl border-amber-200 text-amber-700 bg-amber-50 hover:bg-amber-100 font-bold h-10">Revisar Cadastro</Button>
                  <Button className="rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold h-10 px-6 shadow-lg shadow-emerald-200">Aprovar Empresa</Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Toolbar */}
      <div className="flex items-center gap-4 bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input placeholder="Buscar por nome ou slug..." className="pl-10 h-10 border-slate-200 bg-slate-50 rounded-xl" />
        </div>
        <Button variant="outline" className="h-10 rounded-xl border-slate-200 font-bold text-slate-600">
          <Filter className="h-4 w-4 mr-2" />
          Filtros Avançados
        </Button>
      </div>

      {/* Companies List */}
      <div className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50">
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Empresa</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Plano</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Time / Vagas</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Desde</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {companies.map((company) => (
              <tr key={company.slug} className="hover:bg-slate-50/50 transition-all cursor-pointer group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-500">
                      {company.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{company.name}</p>
                      <p className="text-[10px] text-slate-400">/{company.slug}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Badge variant="outline" className="rounded-lg border-blue-200 text-blue-600 bg-blue-50/50 text-[10px] font-black">
                    {company.plan}
                  </Badge>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5">
                    {company.status === "Ativo" ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-orange-400" />
                    )}
                    <span className="text-xs font-medium text-slate-600">{company.status}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4 text-xs font-bold text-slate-600">
                    <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5 text-slate-400" /> {company.employees}</span>
                    <span className="flex items-center gap-1"><Building2 className="h-3.5 w-3.5 text-slate-400" /> {company.jobs}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-xs text-slate-500 font-medium">
                  {company.joined}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                    <Button variant="outline" size="sm" className="h-8 rounded-lg border-slate-200 font-bold text-slate-600 bg-white hover:text-blue-600 hover:bg-blue-50 transition-colors">
                      <LogIn className="h-3.5 w-3.5 mr-2" />
                      Acessar Painel
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-slate-400 hover:text-slate-900">
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
  );
}
