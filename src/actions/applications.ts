"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createNotification } from "./notifications";
import { ApplicationStatus } from "@prisma/client";
import { requireAdminPermission, ok, fail } from "@/lib/permissions";
import { z } from "zod";

const applySchema = z.object({
  jobId: z.string().min(1, "ID da vaga inválido"),
  name: z.string().min(2, "Nome muito curto").max(100, "Nome muito longo"),
  email: z.string().email("E-mail inválido"),
  resumeUrl: z.string().url("URL de currículo inválida"),
  coverLetter: z.string().max(1000, "Carta muito longa").optional(),
});

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
    const job = await prisma.job.findUnique({
      where: { id: jobId },
      select: { id: true, status: true, title: true },
    });

    if (!job) return fail("Vaga não encontrada.");
    if (job.status !== "ACTIVE") return fail("Esta vaga não está mais aceitando candidaturas.");

    let user = await prisma.user.findUnique({ where: { email } });

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
      message: `${name} se candidatou para a vaga de ${application.job.title}.`,
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

export async function shortlistApplication(applicationId: string, feedback?: string) {
  const session = await auth();
  const permError = requireAdminPermission(session, "MANAGED");
  if (permError) return permError;

  try {
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
