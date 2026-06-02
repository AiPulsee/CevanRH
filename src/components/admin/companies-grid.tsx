"use client";

import { useState, useTransition } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ConfirmAction } from "@/components/ui/confirm-action";
import {
  Building2,
  Globe,
  Search,
  Users2,
  Zap,
  Trash2,
  MapPin,
  Mail,
} from "lucide-react";
import Image from "next/image";
import { PaginationBar } from "@/components/ui/pagination-bar";
import { EditCompanyModal } from "@/components/admin/edit-company-modal";
import { deleteCompany } from "@/actions/companies";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const PAGE_SIZE = 15;

type Company = {
  id: string;
  name: string;
  slug: string;
  email: string | null;
  description: string | null;
  industry: string | null;
  location: string | null;
  logoUrl: string | null;
  _count: { jobs: number; users: number };
};

export function CompaniesGrid({ companies: initial }: { companies: Company[] }) {
  const router = useRouter();
  const [companies, setCompanies] = useState(initial);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [, startTransition] = useTransition();

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

  function handleDelete(companyId: string) {
    startTransition(async () => {
      const result = await deleteCompany(companyId);
      if (result.success) {
        setCompanies((prev) => prev.filter((c) => c.id !== companyId));
        toast.success("Empresa excluída com sucesso.");
        router.refresh();
      } else {
        toast.error(result.error || "Erro ao excluir empresa.");
      }
    });
  }

  return (
    <div className="space-y-4">
      {/* Search */}
      <Card className="p-4 border-slate-200 bg-white rounded-2xl shadow-sm">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Buscar empresa por nome ou slug..."
            className="h-11 pl-11 bg-slate-50 border-slate-200 rounded-xl text-sm font-medium w-full"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </Card>

      {/* Results count */}
      {search && (
        <p className="text-xs font-bold text-slate-400 -mt-2">
          {filtered.length} resultado{filtered.length !== 1 ? "s" : ""} para &ldquo;{search}&rdquo;
        </p>
      )}

      {/* List */}
      <div className="space-y-3">
        {paginated.length === 0 ? (
          <Card className="p-12 text-center border-slate-200 bg-white rounded-2xl">
            <Building2 className="h-12 w-12 text-slate-200 mx-auto mb-4" />
            {search ? (
              <p className="text-slate-400 font-bold">
                Nenhuma empresa encontrada para &ldquo;{search}&rdquo;.
              </p>
            ) : (
              <>
                <p className="text-slate-700 font-black text-lg">Nenhuma empresa cadastrada</p>
                <p className="text-slate-400 text-sm mt-1">
                  Comece cadastrando seu primeiro cliente.
                </p>
              </>
            )}
          </Card>
        ) : (
          paginated.map((company) => (
            <Card
              key={company.id}
              className="p-5 border-slate-200 bg-white rounded-2xl shadow-sm hover:border-blue-200 hover:shadow-md transition-all group"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                {/* Logo + Name */}
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="h-14 w-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center font-black text-slate-400 text-xl overflow-hidden shrink-0">
                    {company.logoUrl ? (
                      <Image
                        src={company.logoUrl}
                        alt={company.name}
                        width={56}
                        height={56}
                        className="h-full w-full object-contain p-1.5"
                      />
                    ) : (
                      company.name.charAt(0)
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-black text-base text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                        {company.name}
                      </h4>
                      <Badge className="rounded-md px-2 py-0.5 text-[9px] font-black uppercase border-none bg-blue-50 text-blue-600 shrink-0">
                        Cliente
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <Globe className="h-3 w-3 text-slate-400 shrink-0" />
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight truncate">
                        {company.slug}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Meta info */}
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 sm:flex-nowrap">
                  {company.location && (
                    <div className="flex items-center gap-1.5 shrink-0">
                      <MapPin className="h-3.5 w-3.5 text-slate-400" />
                      <span className="text-xs font-bold text-slate-500">{company.location}</span>
                    </div>
                  )}
                  {company.email && (
                    <div className="flex items-center gap-1.5 shrink-0">
                      <Mail className="h-3.5 w-3.5 text-slate-400" />
                      <span className="text-xs font-bold text-slate-500 truncate max-w-[160px]">
                        {company.email}
                      </span>
                    </div>
                  )}
                </div>

                {/* Stats + Actions */}
                <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6 border-t sm:border-none pt-4 sm:pt-0 mt-1 sm:mt-0">
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                        Vagas
                      </p>
                      <div className="flex items-center gap-1 justify-center mt-0.5">
                        <Zap className="h-3 w-3 text-indigo-500" />
                        <span className="text-sm font-black text-slate-900">
                          {company._count.jobs}
                        </span>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                        Usuários
                      </p>
                      <div className="flex items-center gap-1 justify-center mt-0.5">
                        <Users2 className="h-3 w-3 text-blue-500" />
                        <span className="text-sm font-black text-slate-900">
                          {company._count.users}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <EditCompanyModal company={company} />
                    <ConfirmAction
                      title="Excluir Empresa?"
                      description="Esta ação é irreversível. Todas as vagas e dados relacionados serão removidos."
                      variant="danger"
                      actionText="Sim, Excluir"
                      onConfirm={() => handleDelete(company.id)}
                    >
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 rounded-xl hover:bg-rose-50 hover:text-rose-600 text-slate-400"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </ConfirmAction>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {totalPages > 1 && (
        <PaginationBar page={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      )}
    </div>
  );
}
