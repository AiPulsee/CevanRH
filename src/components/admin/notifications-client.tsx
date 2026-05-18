"use client";

import { useState, useTransition } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PaginationBar } from "@/components/ui/pagination-bar";
import { markAsRead, markAllAsRead } from "@/actions/notifications";
import { formatDistanceToNow, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import {
  Bell,
  CheckCircle2,
  AlertCircle,
  Info,
  AlertTriangle,
  Check,
  CheckCheck,
} from "lucide-react";
import { toast } from "sonner";

type Notification = {
  id: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: Date;
};

type Filter = "all" | "unread" | "WARNING";

const TYPE_CONFIG: Record<string, { icon: typeof Info; bg: string; text: string; label: string }> = {
  SUCCESS: { icon: CheckCircle2, bg: "bg-emerald-50",  text: "text-emerald-600", label: "Sucesso" },
  WARNING: { icon: AlertTriangle, bg: "bg-amber-50",   text: "text-amber-600",  label: "Aviso" },
  ERROR:   { icon: AlertCircle,  bg: "bg-rose-50",     text: "text-rose-600",   label: "Erro" },
  INFO:    { icon: Info,          bg: "bg-blue-50",     text: "text-blue-600",   label: "Info" },
};

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all",     label: "Todas" },
  { key: "unread",  label: "Não lidas" },
  { key: "WARNING", label: "Avisos" },
];

export function NotificationsClient({
  initialItems,
  total,
  page,
  pageSize,
  initialFilter,
}: {
  initialItems: Notification[];
  total: number;
  page: number;
  pageSize: number;
  initialFilter: Filter;
}) {
  const [items, setItems] = useState(initialItems);
  const [filter, setFilter] = useState<Filter>(initialFilter);
  const [, startTransition] = useTransition();

  const filtered = items.filter((n) => {
    if (filter === "unread")  return !n.isRead;
    if (filter === "WARNING") return n.type === "WARNING";
    return true;
  });

  const unreadCount = items.filter((n) => !n.isRead).length;

  function handleMarkOne(id: string) {
    startTransition(async () => {
      await markAsRead(id);
      setItems((prev) => prev.map((n) => n.id === id ? { ...n, isRead: true } : n));
    });
  }

  function handleMarkAll() {
    startTransition(async () => {
      await markAllAsRead();
      setItems((prev) => prev.map((n) => ({ ...n, isRead: true })));
      toast.success("Todas as notificações marcadas como lidas.");
    });
  }

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex gap-1.5 flex-wrap">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all",
                filter === f.key
                  ? "bg-slate-900 text-white"
                  : "bg-white text-slate-500 border border-slate-200 hover:border-slate-400"
              )}
            >
              {f.label}
              {f.key === "unread" && unreadCount > 0 && (
                <span className="ml-1.5 bg-rose-500 text-white text-[8px] font-black px-1 py-0.5 rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>
          ))}
        </div>

        {unreadCount > 0 && (
          <Button
            onClick={handleMarkAll}
            variant="outline"
            className="h-8 px-4 rounded-lg text-[10px] font-black uppercase tracking-wider border-slate-200 gap-1.5"
          >
            <CheckCheck className="h-3.5 w-3.5" />
            Marcar tudo como lido
          </Button>
        )}
      </div>

      {/* List */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <div className="py-16 text-center">
            <div className="h-14 w-14 rounded-2xl bg-slate-50 flex items-center justify-center mx-auto mb-4">
              <Bell className="h-7 w-7 text-slate-300" />
            </div>
            <p className="text-sm font-bold text-slate-400">Nenhuma notificação encontrada.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-50">
            {filtered.map((n) => {
              const cfg = TYPE_CONFIG[n.type] ?? TYPE_CONFIG.INFO;
              const Icon = cfg.icon;
              return (
                <div
                  key={n.id}
                  className={cn(
                    "flex items-start gap-4 p-5 group transition-colors",
                    !n.isRead ? "bg-blue-50/30 hover:bg-blue-50/50" : "hover:bg-slate-50/60"
                  )}
                >
                  {/* Icon */}
                  <div className={cn("h-9 w-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5", cfg.bg)}>
                    <Icon className={cn("h-4 w-4", cfg.text)} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className={cn(
                        "text-sm leading-tight",
                        !n.isRead ? "font-black text-slate-900" : "font-bold text-slate-600"
                      )}>
                        {n.title}
                      </p>
                      <div className="flex items-center gap-2 shrink-0">
                        <Badge className={cn(
                          "text-[8px] font-black uppercase px-1.5 py-0 border-none rounded-md",
                          cfg.bg, cfg.text
                        )}>
                          {cfg.label}
                        </Badge>
                        {!n.isRead && (
                          <div className="h-2 w-2 rounded-full bg-blue-500 shrink-0" />
                        )}
                      </div>
                    </div>

                    <p className="text-xs text-slate-500 font-medium leading-relaxed mb-2">
                      {n.message}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-400">
                        {formatDistanceToNow(new Date(n.createdAt), { addSuffix: true, locale: ptBR })}
                        {" · "}
                        {format(new Date(n.createdAt), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                      </span>

                      {!n.isRead && (
                        <button
                          onClick={() => handleMarkOne(n.id)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-[10px] font-black text-blue-600 hover:text-blue-700"
                        >
                          <Check className="h-3 w-3" />
                          Marcar como lida
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center">
          <PaginationBar
            page={page}
            totalPages={totalPages}
            baseHref="/admin/notifications"
          />
        </div>
      )}

      <p className="text-center text-[11px] text-slate-400 font-medium">
        {total} notificação(ões) no total
      </p>
    </div>
  );
}
