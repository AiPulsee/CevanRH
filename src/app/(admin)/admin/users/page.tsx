export const dynamic = "force-dynamic";

import { getUsers } from "@/actions/users";
import { UsersTable } from "@/components/admin/users-table";
import { CreateUserModal } from "@/components/admin/create-user-modal";

export default async function AdminUsers() {
  const users = await getUsers();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Usuários ADM</h1>
          <p className="text-sm text-slate-500 font-medium">
            Gerencie os administradores e suas permissões de acesso. ({users.filter(u => u.role === "ADMIN").length} administradores)
          </p>
        </div>
        <CreateUserModal />
      </div>

      <UsersTable users={users} />
    </div>
  );
}
