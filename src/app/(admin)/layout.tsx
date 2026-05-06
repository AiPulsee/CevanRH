import { auth } from "@/lib/auth";
import { AdminLayoutClient } from "@/components/admin/admin-layout-client";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  const user = session?.user as { name?: string | null; permissions?: string | null } | undefined;

  const permissions: string[] | null =
    user?.permissions ? user.permissions.split(",").map((p) => p.trim()).filter(Boolean) : null;

  return (
    <AdminLayoutClient userName={user?.name ?? null} permissions={permissions}>
      {children}
    </AdminLayoutClient>
  );
}
