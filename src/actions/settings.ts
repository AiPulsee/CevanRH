"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getSetting(key: string, defaultValue: string) {
  try {
    const setting = await prisma.setting.findUnique({
      where: { key },
    });
    return setting?.value ?? defaultValue;
  } catch (err) {
    return defaultValue;
  }
}

export async function getSettings(keys: string[]) {
  try {
    const settings = await prisma.setting.findMany({
      where: { key: { in: keys } },
    });
    
    const result: Record<string, string> = {};
    keys.forEach(k => {
      const s = settings.find(x => x.key === k);
      result[k] = s?.value ?? "";
    });
    return result;
  } catch (err) {
    return {};
  }
}

export async function updateSetting(key: string, value: string) {
  try {
    await prisma.setting.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
    revalidatePath("/admin/settings");
    revalidatePath("/admin/placements");
    return { success: true };
  } catch (err) {
    return { error: "Erro ao atualizar configuração" };
  }
}

export async function saveSettings(data: Record<string, string>) {
  try {
    const operations = Object.entries(data).map(([key, value]) =>
      prisma.setting.upsert({
        where: { key },
        update: { value },
        create: { key, value },
      })
    );
    await Promise.all(operations);
    revalidatePath("/admin/settings");
    revalidatePath("/admin/placements");
    return { success: true };
  } catch (err) {
    return { error: "Erro ao salvar configurações" };
  }
}
