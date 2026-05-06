"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createNotification } from "./notifications";

export async function applyToJob(data: {
  jobId: string;
  name: string;
  email: string;
  resumeUrl: string;
  coverLetter?: string;
}) {
  try {
    // 1. Encontrar ou criar o usuário (candidato)
    let user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          role: "CANDIDATE",
        },
      });
    }

    // 2. Criar a candidatura
    const application = await prisma.application.create({
      data: {
        jobId: data.jobId,
        candidateId: user.id,
        resumeUrl: data.resumeUrl,
        coverLetter: data.coverLetter,
        status: "APPLIED",
      },
      include: {
        job: { select: { title: true } }
      }
    });

    // 3. Notificar os admins
    await createNotification({
      title: "Nova Candidatura!",
      message: `${data.name} se candidatou para a vaga de ${application.job.title}.`,
      type: "SUCCESS"
    });

    revalidatePath(`/jobs/${data.jobId}`);
    revalidatePath("/admin");
    revalidatePath("/admin/managed");

    return { success: true, applicationId: application.id };
  } catch (error: any) {
    console.error("Erro ao processar candidatura:", error);
    if (error.code === 'P2002') {
      return { error: "Você já se candidatou a esta vaga." };
    }
    return { error: "Ocorreu um erro ao enviar sua candidatura." };
  }
}

export async function getApplications(filters?: { jobId?: string; status?: any }) {
  try {
    return await prisma.application.findMany({
      where: {
        ...(filters?.jobId && { jobId: filters.jobId }),
        ...(filters?.status && { status: filters.status }),
      },
      include: {
        candidate: { select: { id: true, name: true, email: true } },
        job: { 
          include: { 
            company: { select: { name: true } } 
          } 
        },
      },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Erro ao buscar candidaturas:", error);
    return [];
  }
}

export async function rejectApplication(applicationId: string) {
  try {
    await prisma.application.update({
      where: { id: applicationId },
      data: { status: "REJECTED" },
    });
    revalidatePath("/admin/managed");
    return { success: true };
  } catch (error) {
    console.error("Erro ao reprovar candidatura:", error);
    return { error: "Erro ao reprovar candidatura." };
  }
}

export async function shortlistApplication(applicationId: string, feedback?: string) {
  try {
    const application = await prisma.application.update({
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
    return { success: true };
  } catch (error) {
    console.error("Erro ao favoritar candidatura:", error);
    return { error: "Erro ao atualizar status." };
  }
}

