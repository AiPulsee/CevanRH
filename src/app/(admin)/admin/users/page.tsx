import { getUsers } from "@/actions/users";
import { UsersTable } from "@/components/admin/users-table";

export default async function AdminUsers() {
  const users = await getUsers();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Usuários</h1>
          <p className="text-sm text-slate-500 font-medium">
            Gerencie permissões e visualize a base total de usuários. ({users.length} cadastrados)
          </p>
        </div>
      </div>

      <UsersTable users={users} />
    </div>
  );
}
