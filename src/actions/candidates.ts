"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireAdminPermission, ok, fail } from "@/lib/permissions";
import { auth } from "@/lib/auth";
import { logAction } from "@/lib/audit";

export async function deleteCandidate(candidateId: string) {
  const session = await auth();
  const permError = requireAdminPermission(session, "RESUMES");
  if (permError) return permError;

  const candidate = await prisma.user.findUnique({
    where: { id: candidateId },
    select: {
      id: true,
      name: true,
      applications: {
        select: { id: true, placement: { select: { id: true } } },
      },
    },
  });

  if (!candidate) return fail("Candidato não encontrado.");

  const hasPlacement = candidate.applications.some((a) => a.placement !== null);
  if (hasPlacement) {
    return fail(
      "Este candidato possui alocações registradas e não pode ser excluído. Encerre as alocações antes de remover o candidato."
    );
  }

  try {
    await prisma.user.delete({ where: { id: candidateId } });

    await logAction("DELETE_CANDIDATE", `Excluiu candidato ${candidateId} (${candidate.name})`);
    revalidatePath("/admin/resumes");
    revalidatePath("/admin");
    return ok();
  } catch (err) {
    console.error(err);
    return fail("Erro interno ao excluir candidato.");
  }
}
