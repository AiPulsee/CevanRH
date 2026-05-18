export const dynamic = "force-dynamic";

import { getAllNotifications } from "@/actions/notifications";
import { NotificationsClient } from "@/components/admin/notifications-client";
import { Bell } from "lucide-react";

export default async function NotificationsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; filter?: string }>;
}) {
  const { page: pageParam, filter } = await searchParams;
  const page = Math.max(1, parseInt(pageParam ?? "1"));
  const { items, total } = await getAllNotifications(page, 20);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-blue-600 mb-1">
            <Bell className="h-4 w-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">Sistema</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900">Atividades</h1>
          <p className="text-sm text-slate-500 font-medium">
            Histórico completo de notificações e eventos do sistema.
          </p>
        </div>
      </div>

      <NotificationsClient
        initialItems={items}
        total={total}
        page={page}
        pageSize={20}
        initialFilter={(filter as "all" | "unread" | "WARNING") ?? "all"}
      />
    </div>
  );
}
