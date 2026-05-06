export const dynamic = "force-dynamic";

import { getUsers } from "@/actions/users";
import { prisma } from "@/lib/prisma";
import { UsersTable } from "@/components/admin/users-table";
import { CreateUserModal } from "@/components/admin/create-user-modal";

export default async function AdminUsers() {
  const [users, companies] = await Promise.all([
    getUsers(),
    prisma.company.findMany({ select: { id: true, name: true }, orderBy: { name: "asc" } }),
  ]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Usuários</h1>
          <p className="text-sm text-slate-500 font-medium">
            Gerencie permissões e visualize a base total de usuários. ({users.length} cadastrados)
          </p>
        </div>
        <CreateUserModal companies={companies} />
      </div>

      <UsersTable users={users} />
    </div>
  );
}
