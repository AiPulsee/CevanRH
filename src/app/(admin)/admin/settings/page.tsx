import { getSettings } from "@/actions/settings";
import SettingsForm from "@/components/admin/settings-form";

const SETTING_KEYS = [
  "managed.fee_percentage",
  "managed.fee_type",
  "managed.fee_fixed",
];

export default async function AdminSettingsPage() {
  const settings = await getSettings(SETTING_KEYS);
  return <SettingsForm initialSettings={settings} />;
}
