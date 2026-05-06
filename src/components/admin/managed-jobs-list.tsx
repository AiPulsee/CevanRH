"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Search,
  Building2,
  Clock,
  Users2,
  CheckCircle2,
  Briefcase,
} from "lucide-react";
import { ScreeningModal } from "@/components/admin/screening-modal";
import { cn } from "@/lib/utils";

type App = {
  id: string;
  status: string;
  resumeUrl: string;
  coverLetter: string | null;
  candidate: { name: string | null; email: string | null };
};

type ManagedJob = {
  id: string;
  title: string;
  status: string;
  location: string;
  isRemote: boolean;
  salaryRange: string | null;
  company: { name: string; logoUrl: string | null };
  _count: { applications: number };
  applications: App[];
};

function statusLabel(status: string) {
  if (status === "ACTIVE") return "Triagem Ativa";
  if (status === "DRAFT") return "Aguardando Início";
  return "Finalizado";
}

type StatusFilter = "ALL" | "ACTIVE" | "CLOSED";

export function ManagedJobsList({ jobs }: { jobs: ManagedJob[] }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("ALL");

  const filtered = jobs.filter((job) => {
    const matchesSearch =
      !search ||
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "ALL" ||
      (statusFilter === "ACTIVE" && job.status === "ACTIVE") ||
      (statusFilter === "CLOSED" && (job.status === "CLOSED" || job.status === "ARCHIVED"));
    return matchesSearch && matchesStatus;
  });

  if (jobs.length === 0) {
    return (
      <Card className="p-12 border-slate-200 bg-white rounded-2xl shadow-sm text-center">
        <Briefcase className="h-10 w-10 text-slate-200 mx-auto mb-3" />
        <p className="text-slate-400 font-medium">
          Nenhuma vaga de curadoria cadastrada ainda.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Buscar vaga ou empresa..."
            className="pl-10 h-10 bg-white border-slate-200 rounded-lg text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-1.5 bg-slate-100 rounded-lg p-1">
          {(["ALL", "ACTIVE", "CLOSED"] as StatusFilter[]).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                statusFilter === s
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {s === "ALL" ? "Todos" : s === "ACTIVE" ? "Triagem Ativa" : "Finalizados"}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="py-8 text-center text-sm text-slate-400 font-medium">
          Nenhuma vaga encontrada para "{search}".
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {filtered.map((job) => {
            const shortlistedCount = job.applications.filter(
              (a) => a.status === "SHORTLISTED"
            ).length;
            return (
              <Card
                key={job.id}
                className="p-4 sm:p-5 border-slate-200 bg-white rounded-xl shadow-sm hover:border-blue-200 transition-all group"
              >
                <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 sm:gap-6">
                  <div className="flex items-center gap-3 sm:gap-4 flex-1">
                    <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center font-black text-blue-500 text-base sm:text-lg overflow-hidden shrink-0">
                      {job.company.logoUrl ? (
                        <img
                          src={job.company.logoUrl}
                          alt={job.company.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        job.company.name.charAt(0)
                      )}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                        {job.title}
                      </h4>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-[9px] sm:text-[10px] text-slate-500 font-bold uppercase">
                        <span className="flex items-center gap-1.5">
                          <Building2 className="h-3 w-3" /> {job.company.name}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-3 w-3" />{" "}
                          {job.isRemote ? "Remoto" : job.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 flex-[1.5] py-2 border-y border-slate-50 sm:border-none">
                    <div className="space-y-1">
                      <p className="text-[9px] font-bold uppercase text-slate-400">
                        Status
                      </p>
                      <Badge
                        className={cn(
                          "rounded-md px-1.5 py-0.5 text-[8px] sm:text-[9px] font-bold uppercase",
                          job.status === "CLOSED" || job.status === "ARCHIVED"
                            ? "bg-green-100 text-green-700 border-none"
                            : "bg-blue-50 text-blue-600 border-none"
                        )}
                      >
                        {statusLabel(job.status)}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[9px] font-bold uppercase text-slate-400">
                        Inscritos
                      </p>
                      <div className="flex items-center gap-1.5">
                        <Users2 className="h-3.5 w-3.5 text-slate-400" />
                        <span className="font-black text-xs sm:text-sm text-slate-900">
                          {job._count.applications}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[9px] font-bold uppercase text-slate-400">
                        Indicados
                      </p>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                        <span className="font-black text-xs sm:text-sm text-slate-900">
                          {shortlistedCount} / 5
                        </span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[9px] font-bold uppercase text-slate-400">
                        Salário
                      </p>
                      <span className="text-[10px] sm:text-[11px] font-black text-slate-600 truncate block">
                        {job.salaryRange || "A combinar"}
                      </span>
                    </div>
                  </div>

                  <div className="w-full xl:w-auto">
                    <ScreeningModal
                      jobTitle={job.title}
                      companyName={job.company.name}
                      applications={job.applications}
                    />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
