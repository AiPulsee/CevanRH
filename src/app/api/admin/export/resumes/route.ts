import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { JobType } from "@prisma/client";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

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

function escapeCsv(value: string): string {
  return `"${String(value).replace(/"/g, '""')}"`;
}

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session || (session.user as { role?: string })?.role !== "ADMIN") {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const { searchParams } = request.nextUrl;
  const typeFilter = searchParams.get("type") || undefined;
  const query = searchParams.get("q") || undefined;
  const statusFilter = searchParams.get("status") || undefined;
  const sort = searchParams.get("sort") || "desc";
  const companyFilter = searchParams.get("company") || undefined;

  const where: Record<string, unknown> = {
    ...(typeFilter && { job: { type: typeFilter as JobType } }),
    ...(statusFilter && { status: statusFilter }),
    ...(companyFilter && { job: { company: { id: companyFilter } } }),
    ...(query && {
      OR: [
        { candidate: { name: { contains: query, mode: "insensitive" } } },
        { candidate: { email: { contains: query, mode: "insensitive" } } },
        { job: { title: { contains: query, mode: "insensitive" } } },
        { job: { company: { name: { contains: query, mode: "insensitive" } } } },
      ],
    }),
  };

  const whereResolved =
    typeFilter && companyFilter
      ? { ...where, job: { type: typeFilter as JobType, company: { id: companyFilter } } }
      : where;

  const applications = await prisma.application.findMany({
    where: whereResolved,
    select: {
      candidate: { select: { name: true, email: true } },
      job: {
        select: {
          title: true,
          type: true,
          company: { select: { name: true } },
        },
      },
      status: true,
      resumeUrl: true,
      createdAt: true,
    },
    orderBy: { createdAt: sort === "asc" ? "asc" : "desc" },
    take: 5000,
  });

  const headers = ["Nome", "Email", "Vaga", "Empresa", "Tipo", "Status", "Data", "URL Currículo"];
  const rows = applications.map((app) => [
    app.candidate.name ?? "",
    app.candidate.email ?? "",
    app.job?.title ?? "Cadastro Manual",
    app.job?.company.name ?? "",
    app.job ? (TYPE_LABEL[app.job.type] ?? app.job.type) : "Manual",
    STATUS_LABEL[app.status] ?? app.status,
    format(new Date(app.createdAt), "dd/MM/yyyy", { locale: ptBR }),
    app.resumeUrl ?? "",
  ]);

  const csv =
    "﻿" +
    [headers, ...rows]
      .map((row) => row.map(escapeCsv).join(","))
      .join("\n");

  const filename = `curriculos-${new Date().toISOString().slice(0, 10)}.csv`;

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
