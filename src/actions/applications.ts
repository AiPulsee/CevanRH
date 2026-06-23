"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createNotification } from "./notifications";
import { ApplicationStatus } from "@prisma/client";
import { requireAdminPermission, ok, fail } from "@/lib/permissions";
import { z } from "zod";
import { randomUUID } from "crypto";

const applySchema = z.object({
  jobId: z.string().min(1, "ID da vaga inválido"),
  name: z.string().min(2, "Nome muito curto").max(100, "Nome muito longo"),
  email: z.string().email("E-mail inválido"),
  resumeUrl: z.string().url("URL de currículo inválida"),
  coverLetter: z.string().max(1000, "Carta muito longa").optional(),
});

const talentBankSchema = z.object({
  name: z.string().min(2, "Nome muito curto").max(100, "Nome muito longo"),
  email: z.string().email("E-mail inválido"),
  resumeUrl: z.string().url("URL de currículo inválida"),
  coverLetter: z.string().max(1000, "Mensagem muito longa").optional(),
});

export async function joinTalentBank(data: {
  name: string;
  email: string;
  resumeUrl: string;
  coverLetter?: string;
}) {
  const validated = talentBankSchema.safeParse(data);
  if (!validated.success) return fail(validated.error.issues[0].message);

  const { name, email, resumeUrl, coverLetter } = validated.data;

  const r2Domain = process.env.R2_PUBLIC_DOMAIN;
  if (!r2Domain || !resumeUrl.startsWith(r2Domain)) {
    return fail("URL de currículo inválida.");
  }

  try {
    let user = await prisma.user.findFirst({ where: { email } });
    if (!user) {
      user = await prisma.user.create({
        data: { name, email, role: "CANDIDATE" },
      });
    }

    // jobId = null → entrada no banco de talentos
    const id = randomUUID();
    const now = new Date();
    await prisma.$executeRaw`
      INSERT INTO applications (id, resume_url, cover_letter, status, candidate_id, created_at, updated_at)
      VALUES (${id}, ${resumeUrl}, ${coverLetter ?? null}, 'APPLIED', ${user.id}, ${now}, ${now})
    `;

    await createNotification({
      title: "Novo Currículo no Banco de Talentos",
      message: `${name} (${email}) enviou o currículo para o banco de talentos.`,
      type: "INFO",
    });

    revalidatePath("/admin/resumes");
    revalidatePath("/admin");

    return { success: true as const };
  } catch (error: any) {
    console.error("Erro ao cadastrar no banco de talentos:", error);
    return fail("Ocorreu um erro ao enviar seu currículo. Tente novamente.");
  }
}

export async function applyToJob(data: {
  jobId: string;
  name: string;
  email: string;
  resumeUrl: string;
  coverLetter?: string;
}) {
  const validated = applySchema.safeParse(data);
  if (!validated.success) {
    return fail(validated.error.issues[0].message);
  }

  const { jobId, name, email, resumeUrl, coverLetter } = validated.data;

  const r2Domain = process.env.R2_PUBLIC_DOMAIN;
  if (!r2Domain || !resumeUrl.startsWith(r2Domain)) {
    return fail("URL de currículo inválida.");
  }

  try {
    const job = await prisma.job.findFirst({
      where: { id: jobId },
      select: { id: true, status: true, title: true },
    });

    if (!job) return fail("Vaga não encontrada.");
    if (job.status !== "ACTIVE") return fail("Esta vaga não está mais aceitando candidaturas.");

    let user = await prisma.user.findFirst({ where: { email } });

    if (!user) {
      user = await prisma.user.create({
        data: { name, email, role: "CANDIDATE" },
      });
    }

    const application = await prisma.application.create({
      data: { jobId, candidateId: user.id, resumeUrl, coverLetter, status: "APPLIED" },
      include: { job: { select: { title: true } } },
    });

    await createNotification({
      title: "Nova Candidatura!",
      message: `${name} se candidatou para a vaga de ${application.job?.title ?? "uma vaga"}.`,
      type: "SUCCESS",
    });

    revalidatePath(`/jobs/${jobId}`);
    revalidatePath("/admin");
    revalidatePath("/admin/managed");

    return { success: true as const, applicationId: application.id };
  } catch (error: any) {
    console.error("Erro ao processar candidatura:", error);
    if (error.code === "P2002") {
      return fail("Você já se candidatou a esta vaga.");
    }
    return fail("Ocorreu um erro ao enviar sua candidatura.");
  }
}

const manualResumeSchema = z.object({
  name: z.string().min(2, "Nome muito curto").max(100, "Nome muito longo"),
  email: z.string().email("E-mail inválido").optional().or(z.literal("")),
  resumeUrl: z.string().url("URL de currículo inválida"),
});

export async function createManualResume(data: {
  name: string;
  email?: string;
  resumeUrl: string;
}) {
  const session = await auth();
  const permError = requireAdminPermission(session, "MANAGED");
  if (permError) return permError;

  const validated = manualResumeSchema.safeParse(data);
  if (!validated.success) return fail(validated.error.issues[0].message);

  const { name, email, resumeUrl } = validated.data;

  const r2Domain = process.env.R2_PUBLIC_DOMAIN;
  if (!r2Domain || !resumeUrl.startsWith(r2Domain)) {
    return fail("URL de currículo inválida.");
  }

  try {
    const resolvedEmail = email || `sem-email-${randomUUID()}@cevanrh.local`;
    let user = email
      ? await prisma.user.findFirst({ where: { email } })
      : null;
    if (!user) {
      user = await prisma.user.create({
        data: { name, email: resolvedEmail, role: "CANDIDATE" },
      });
    }

    const id = randomUUID();
    const now = new Date();
    await prisma.$executeRaw`
      INSERT INTO applications (id, resume_url, status, candidate_id, created_at, updated_at)
      VALUES (${id}, ${resumeUrl}, 'APPLIED', ${user.id}, ${now}, ${now})
    `;

    revalidatePath("/admin/resumes");
    revalidatePath("/admin");
    return ok();
  } catch (error: any) {
    console.error("Erro ao cadastrar currículo:", error);
    return fail("Erro ao cadastrar currículo.");
  }
}

export async function getApplications(filters?: { jobId?: string; status?: ApplicationStatus }) {
  const session = await auth();
  const permError = requireAdminPermission(session, "MANAGED");
  if (permError) return [];

  try {
    return await prisma.application.findMany({
      where: {
        ...(filters?.jobId && { jobId: filters.jobId }),
        ...(filters?.status && { status: filters.status }),
      },
      include: {
        candidate: { select: { id: true, name: true, email: true } },
        job: { include: { company: { select: { name: true } } } },
      },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Erro ao buscar candidaturas:", error);
    return [];
  }
}

export async function rejectApplication(applicationId: string) {
  const session = await auth();
  const permError = requireAdminPermission(session, "MANAGED");
  if (permError) return permError;

  try {
    const app = await prisma.application.findUnique({
      where: { id: applicationId },
      select: { status: true },
    });
    if (!app) return fail("Candidatura não encontrada.");
    if (app.status === "HIRED") return fail("Não é possível reprovar uma candidatura já contratada.");
    if (app.status === "REJECTED") return fail("Candidatura já está reprovada.");

    await prisma.application.update({
      where: { id: applicationId },
      data: { status: "REJECTED" },
    });
    revalidatePath("/admin/managed");
    revalidatePath("/admin");
    return ok();
  } catch (error) {
    console.error("Erro ao reprovar candidatura:", error);
    return fail("Erro ao reprovar candidatura.");
  }
}

export async function getJobApplicationsForScreening(jobId: string) {
  const session = await auth();
  const permError = requireAdminPermission(session, "MANAGED");
  if (permError) return { success: false as const, error: permError.error };

  try {
    const data = await prisma.application.findMany({
      where: { jobId, status: { notIn: ["REJECTED", "HIRED"] } },
      select: {
        id: true,
        status: true,
        resumeUrl: true,
        coverLetter: true,
        aiScore: true,
        aiRecommendation: true,
        aiSummary: true,
        candidate: { select: { name: true, email: true } },
      },
      orderBy: { createdAt: "desc" },
    });
    return { success: true as const, data };
  } catch {
    return { success: false as const, error: "Erro ao buscar candidaturas." };
  }
}

export async function shortlistApplication(applicationId: string, feedback?: string) {
  const session = await auth();
  const permError = requireAdminPermission(session, "MANAGED");
  if (permError) return permError;

  try {
    const app = await prisma.application.findUnique({
      where: { id: applicationId },
      select: { status: true },
    });
    if (!app) return fail("Candidatura não encontrada.");
    if (app.status === "HIRED") return fail("Não é possível selecionar uma candidatura já contratada.");
    if (app.status === "REJECTED") return fail("Não é possível selecionar uma candidatura reprovada.");

    await prisma.application.update({
      where: { id: applicationId },
      data: {
        status: "SHORTLISTED",
        shortlist: {
          upsert: {
            create: { adminFeedback: feedback },
            update: { adminFeedback: feedback },
          },
        },
      },
    });

    revalidatePath("/admin/managed");
    revalidatePath("/admin");
    return ok();
  } catch (error) {
    console.error("Erro ao favoritar candidatura:", error);
    return fail("Erro ao atualizar status.");
  }
}
