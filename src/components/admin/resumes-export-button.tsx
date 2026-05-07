"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

type ExportRow = {
  name: string;
  email: string;
  jobTitle: string;
  company: string;
  type: string;
  status: string;
  date: string;
  resumeUrl: string;
};

const TYPE_LABEL: Record<string, string> = {
  MANAGED: "Curadoria",
  SELF_SERVICE: "Público",
};

const STATUS_LABEL: Record<string, string> = {
  APPLIED: "Candidatado",
  REVIEWING: "Em Análise",
  SHORTLISTED: "Selecionado",
  INTERVIEW: "Entrevista",
  REJECTED: "Reprovado",
  HIRED: "Contratado",
};

export function ResumesExportButton({ data }: { data: ExportRow[] }) {
  const handleExport = () => {
    const headers = ["Nome", "Email", "Vaga", "Empresa", "Tipo", "Status", "Data", "URL Currículo"];
    const rows = data.map((d) => [
      d.name, d.email, d.jobTitle, d.company,
      TYPE_LABEL[d.type] ?? d.type,
      STATUS_LABEL[d.status] ?? d.status,
      d.date, d.resumeUrl,
    ]);
    const csv = [headers, ...rows]
      .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `curriculos-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Button
      variant="outline"
      className="rounded-xl h-10 px-4 border-slate-200 font-bold text-xs text-slate-600 gap-2"
      onClick={handleExport}
    >
      <Download className="h-3.5 w-3.5" /> Exportar Planilha
    </Button>
  );
}
