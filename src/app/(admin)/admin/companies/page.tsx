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
  Users
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { CreateCompanyModal } from "@/components/admin/create-company-modal";

export default function AdminCompanies() {
  const companies = [
    { name: "Google Cloud", slug: "google-cloud", plan: "PRO", status: "Ativo", employees: 42, jobs: 8, joined: "12 Jan 2026" },
    { name: "Nubank", slug: "nubank", plan: "ENTERPRISE", status: "Ativo", employees: 125, jobs: 14, joined: "05 Fev 2026" },
    { name: "SpaceX", slug: "spacex", plan: "FREE", status: "Pendente", employees: 5, jobs: 1, joined: "20 Abr 2026" },
    { name: "Vercel", slug: "vercel", plan: "PRO", status: "Ativo", employees: 18, jobs: 4, joined: "10 Mar 2026" },
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
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400"></th>
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
                  <Badge variant="outline" className="rounded-lg border-indigo-200 text-indigo-600 bg-indigo-50/50 text-[10px] font-black">
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
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                      <ExternalLink className="h-4 w-4 text-slate-400" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                      <MoreHorizontal className="h-4 w-4 text-slate-400" />
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
