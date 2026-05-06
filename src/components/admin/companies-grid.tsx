"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Building2, Globe, Search, Users2, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { PaginationBar } from "@/components/ui/pagination-bar";

const PAGE_SIZE = 12;

type Company = {
  id: string;
  name: string;
  slug: string;
  logoUrl: string | null;
  plan: string;
  _count: { jobs: number; users: number };
};

export function CompaniesGrid({ companies }: { companies: Company[] }) {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = companies.filter(
    (c) =>
      !search ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.slug.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  function handleSearch(v: string) {
    setSearch(v);
    setCurrentPage(1);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-slate-200 shadow-sm max-w-md">
        <Search className="h-4 w-4 text-slate-400 ml-2 shrink-0" />
        <Input
          placeholder="Buscar empresa por nome ou slug..."
          className="border-none bg-transparent shadow-none focus-visible:ring-0 h-8 text-sm"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      {filtered.length === 0 ? (
        <div className="py-10 text-center text-sm text-slate-400 font-medium">
          Nenhuma empresa encontrada para &quot;{search}&quot;.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginated.map((company) => (
            <Card
              key={company.id}
              className="group overflow-hidden border-slate-200 bg-white rounded-3xl hover:border-blue-500/30 transition-all hover:shadow-xl hover:shadow-blue-500/5"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div className="h-14 w-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center font-black text-slate-400 text-xl overflow-hidden">
                    {company.logoUrl ? (
                      <img
                        src={company.logoUrl}
                        alt={company.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      company.name.charAt(0)
                    )}
                  </div>
                  <Badge
                    className={cn(
                      "rounded-lg px-2 py-1 text-[10px] font-black uppercase border-none",
                      company.plan === "ENTERPRISE"
                        ? "bg-slate-900 text-white"
                        : company.plan === "PRO"
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 text-slate-600"
                    )}
                  >
                    {company.plan}
                  </Badge>
                </div>

                <div className="space-y-1">
                  <h4 className="text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                    {company.name}
                  </h4>
                  <div className="flex items-center gap-2 text-slate-400">
                    <Globe className="h-3.5 w-3.5 shrink-0" />
                    <span className="text-[11px] font-bold uppercase tracking-tight truncate">
                      {company.slug}.cevan.com.br
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-slate-50">
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100/50">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">
                      Vagas
                    </p>
                    <div className="flex items-center gap-1.5">
                      <Zap className="h-3.5 w-3.5 text-blue-500" />
                      <span className="text-sm font-black text-slate-900">
                        {company._count.jobs}
                      </span>
                    </div>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100/50">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">
                      Usuários
                    </p>
                    <div className="flex items-center gap-1.5">
                      <Users2 className="h-3.5 w-3.5 text-indigo-500" />
                      <span className="text-sm font-black text-slate-900">
                        {company._count.users}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <PaginationBar page={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      )}

      {companies.length === 0 && (
        <div className="py-20 text-center">
          <Building2 className="h-16 w-16 text-slate-100 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-slate-900">Nenhuma empresa cadastrada</h3>
          <p className="text-slate-400 text-sm max-w-xs mx-auto mt-1">
            Comece cadastrando seu primeiro cliente.
          </p>
        </div>
      )}
    </div>
  );
}
