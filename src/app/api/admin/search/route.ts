import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session?.user || (session.user as any).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const q = request.nextUrl.searchParams.get("q")?.trim();
  if (!q || q.length < 2) {
    return NextResponse.json({ candidates: [], jobs: [], companies: [] });
  }

  const mode = "insensitive" as const;

  const [rawCandidates, jobs, companies] = await Promise.all([
    prisma.application.findMany({
      where: {
        OR: [
          { candidate: { name: { contains: q, mode } } },
          { candidate: { email: { contains: q, mode } } },
        ],
      },
      select: {
        candidateId: true,
        candidate: { select: { name: true, email: true } },
        job: { select: { title: true } },
      },
      orderBy: { createdAt: "desc" },
      take: 20,
    }),
    prisma.job.findMany({
      where: {
        OR: [
          { title: { contains: q, mode } },
          { company: { name: { contains: q, mode } } },
        ],
      },
      select: {
        id: true,
        title: true,
        type: true,
        company: { select: { name: true } },
      },
      take: 4,
    }),
    prisma.company.findMany({
      where: { name: { contains: q, mode } },
      select: { id: true, name: true, industry: true },
      take: 4,
    }),
  ]);

  // Deduplicate candidates by candidateId
  const seen = new Set<string>();
  const candidates = rawCandidates
    .filter((a) => {
      if (seen.has(a.candidateId)) return false;
      seen.add(a.candidateId);
      return true;
    })
    .slice(0, 4)
    .map((a) => ({
      name: a.candidate.name,
      email: a.candidate.email,
      job: a.job?.title ?? "—",
    }));

  return NextResponse.json({
    candidates,
    jobs: jobs.map((j) => ({
      id: j.id,
      title: j.title,
      type: j.type,
      company: j.company.name,
    })),
    companies: companies.map((c) => ({
      id: c.id,
      name: c.name,
      industry: c.industry,
    })),
  });
}
