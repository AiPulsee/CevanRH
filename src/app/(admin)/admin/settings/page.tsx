import { getSettings } from "@/actions/settings";
import SettingsForm from "@/components/admin/settings-form";

const SETTING_KEYS = [
  "managed.fee_percentage",
  "managed.sla_hours",
  "security.2fa_required",
  "security.block_registrations",
  "smtp.server",
  "smtp.port",
  "smtp.encryption",
];

export default async function AdminSettingsPage() {
  const settings = await getSettings(SETTING_KEYS);
  return <SettingsForm initialSettings={settings} />;
}
