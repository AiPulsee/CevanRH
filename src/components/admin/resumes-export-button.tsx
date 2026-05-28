"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export function ResumesExportButton({ searchParams }: { searchParams: string }) {
  const handleExport = () => {
    const url = `/api/admin/export/resumes${searchParams ? `?${searchParams}` : ""}`;
    window.location.href = url;
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
