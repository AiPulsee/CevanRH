"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const DEFAULTS: Record<string, string> = {
  "managed.fee_percentage": "15",
  "managed.sla_hours": "48",
  "security.2fa_required": "true",
  "security.block_registrations": "false",
  "smtp.server": "smtp.sendgrid.net",
  "smtp.port": "587",
  "smtp.encryption": "TLS",
};

export async function getSettings(keys: string[]): Promise<Record<string, string>> {
  const rows = await prisma.setting.findMany({ where: { key: { in: keys } } });
  const result: Record<string, string> = {};
  for (const key of keys) result[key] = DEFAULTS[key] ?? "";
  for (const row of rows) result[row.key] = row.value;
  return result;
}

export async function saveSettings(data: Record<string, string>): Promise<{ success: boolean }> {
  await prisma.$transaction(
    Object.entries(data).map(([key, value]) =>
      prisma.setting.upsert({ where: { key }, create: { key, value }, update: { value } })
    )
  );
  revalidatePath("/admin/settings");
  return { success: true };
}
