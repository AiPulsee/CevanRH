"use client";

import { useEffect, useState } from "react";
import { 
  Bell, 
  Check, 
  Circle, 
  Clock, 
  Info, 
  CheckCircle2, 
  AlertCircle 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getNotifications, markAsRead } from "@/actions/notifications";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";

export function NotificationsPopover() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchNotifications = async () => {
    const data = await getNotifications();
    setNotifications(data);
    setUnreadCount(data.filter((n: any) => !n.isRead).length);
  };

  useEffect(() => {
    fetchNotifications();
    // Polling básico a cada 30 segundos (ou poderíamos usar WebSockets/Pusher)
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleMarkAsRead = async (id: string) => {
    await markAsRead(id);
    fetchNotifications();
  };

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button variant="ghost" size="icon" className="relative h-11 w-11 rounded-xl bg-white shadow-sm border border-slate-100 group">
            <Bell className="h-5 w-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
            {unreadCount > 0 && (
              <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white animate-pulse" />
            )}
          </Button>
        }
      />
      <PopoverContent className="w-80 p-0 bg-white rounded-2xl border-slate-200 shadow-2xl overflow-hidden" align="end">
        <div className="p-4 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Notificações</h3>
          <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
            {unreadCount} novas
          </span>
        </div>
        <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
          {notifications.length === 0 ? (
            <div className="p-10 text-center">
              <Bell className="h-8 w-8 text-slate-200 mx-auto mb-2" />
              <p className="text-xs text-slate-400 font-medium">Nenhuma notificação por enquanto.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-50">
              {notifications.map((n) => (
                <div 
                  key={n.id} 
                  className={cn(
                    "p-4 transition-colors relative group",
                    !n.isRead ? "bg-blue-50/30" : "bg-white"
                  )}
                >
                  <div className="flex gap-3">
                    <div className={cn(
                      "h-8 w-8 rounded-lg flex items-center justify-center shrink-0",
                      n.type === "SUCCESS" ? "bg-emerald-50 text-emerald-600" :
                      n.type === "WARNING" ? "bg-amber-50 text-amber-600" :
                      n.type === "ERROR" ? "bg-rose-50 text-rose-600" :
                      "bg-blue-50 text-blue-600"
                    )}>
                      {n.type === "SUCCESS" ? <CheckCircle2 className="h-4 w-4" /> :
                       n.type === "ERROR" ? <AlertCircle className="h-4 w-4" /> :
                       <Info className="h-4 w-4" />}
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className={cn(
                        "text-[11px] leading-tight",
                        !n.isRead ? "font-black text-slate-900" : "font-bold text-slate-600"
                      )}>
                        {n.title}
                      </p>
                      <p className="text-[10px] text-slate-500 font-medium line-clamp-2">
                        {n.message}
                      </p>
                      <div className="flex items-center gap-1.5 pt-1">
                        <Clock className="h-3 w-3 text-slate-300" />
                        <span className="text-[9px] font-bold text-slate-400 uppercase">
                          {formatDistanceToNow(new Date(n.createdAt), { addSuffix: true, locale: ptBR })}
                        </span>
                      </div>
                    </div>
                    {!n.isRead && (
                      <button 
                        onClick={() => handleMarkAsRead(n.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg"
                      >
                        <Check className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="p-3 border-t border-slate-50 bg-slate-50/30 text-center">
          <Button variant="ghost" className="w-full text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 h-8">
            Ver todas as atividades
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
