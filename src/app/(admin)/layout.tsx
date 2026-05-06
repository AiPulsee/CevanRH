import { auth } from "@/lib/auth";
import { AdminLayoutClient } from "@/components/admin/admin-layout-client";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  const permissions = (session?.user as any)?.permissions || null;

  return (
    <AdminLayoutClient userName={session?.user?.name ?? null} permissions={permissions}>
      {children}
    </AdminLayoutClient>
  );
}
