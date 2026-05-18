"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireAdminPermission, ok, fail } from "@/lib/permissions";
import { logAction } from "@/lib/audit";

const ALLOWED_SETTING_KEYS = new Set([
  "managed.fee_percentage",
  "managed.fee_type",
  "managed.fee_fixed",
]);

export async function getSetting(key: string, defaultValue: string) {
  const session = await auth();
  if (!session) return defaultValue;

  try {
    const setting = await prisma.setting.findUnique({ where: { key } });
    return setting?.value ?? defaultValue;
  } catch {
    return defaultValue;
  }
}

export async function getSettings(keys: string[]) {
  const session = await auth();
  if (!session) return {};

  try {
    const settings = await prisma.setting.findMany({
      where: { key: { in: keys } },
    });

    const result: Record<string, string> = {};
    keys.forEach((k) => {
      const s = settings.find((x) => x.key === k);
      result[k] = s?.value ?? "";
    });
    return result;
  } catch {
    return {};
  }
}

export async function updateSetting(key: string, value: string) {
  const session = await auth();
  const permError = requireAdminPermission(session, "SETTINGS");
  if (permError) return permError;

  if (!ALLOWED_SETTING_KEYS.has(key)) return fail("Chave de configuração inválida.");

  try {
    await prisma.setting.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
    await logAction("UPDATE_SETTING", `Atualizou configuração "${key}" para "${value}"`);
    revalidatePath("/admin/settings");
    revalidatePath("/admin/placements");
    return ok();
  } catch {
    return fail("Erro ao atualizar configuração");
  }
}

export async function saveSettings(data: Record<string, string>) {
  const session = await auth();
  const permError = requireAdminPermission(session, "SETTINGS");
  if (permError) return permError;

  const invalidKeys = Object.keys(data).filter((k) => !ALLOWED_SETTING_KEYS.has(k));
  if (invalidKeys.length > 0) return fail("Chaves de configuração inválidas.");

  try {
    const operations = Object.entries(data).map(([key, value]) =>
      prisma.setting.upsert({
        where: { key },
        update: { value },
        create: { key, value },
      })
    );
    await Promise.all(operations);
    await logAction("SAVE_SETTINGS", `Salvou configurações: ${Object.keys(data).join(", ")}`);
    revalidatePath("/admin/settings");
    revalidatePath("/admin/placements");
    return ok();
  } catch {
    return fail("Erro ao salvar configurações");
  }
}
