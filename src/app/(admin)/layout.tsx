import { auth } from "@/lib/auth";
import { AdminLayoutClient } from "@/components/admin/admin-layout-client";
import { checkTrialExpirations } from "@/actions/notifications";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  const permissions = (session?.user as any)?.permissions || null;

  // Run trial check in the background — does not block page render
  if ((session?.user as any)?.role === "ADMIN") {
    checkTrialExpirations().catch(() => {});
  }

  return (
    <AdminLayoutClient userName={session?.user?.name ?? null} permissions={permissions}>
      {children}
    </AdminLayoutClient>
  );
}
