import * as React from "react";
import { Bell, CheckCircle2, Info, AlertTriangle, XCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import type { NotificationItem, NotificationType } from "@/types";

const typeIcons: Record<NotificationType, typeof CheckCircle2> = {
  success: CheckCircle2,
  warning: AlertTriangle,
  error: XCircle,
  information: Info,
};

const typeColors: Record<NotificationType, string> = {
  success: "text-success",
  warning: "text-warning",
  error: "text-destructive",
  information: "text-primary",
};

const defaultNotifications: NotificationItem[] = [
  {
    id: "n1",
    type: "success",
    title: "Payment received",
    description: "Invoice #4821 was paid by Acme Inc.",
    timestamp: "2m ago",
    read: false,
    category: "Billing",
  },
  {
    id: "n2",
    type: "information",
    title: "New teammate joined",
    description: "Jordan Lee accepted their invite.",
    timestamp: "1h ago",
    read: false,
    category: "Team",
  },
  {
    id: "n3",
    type: "warning",
    title: "Storage almost full",
    description: "You've used 92% of your plan's storage.",
    timestamp: "3h ago",
    read: true,
    category: "Usage",
  },
];

export interface NotificationBellDropdownProps {
  notifications?: NotificationItem[];
  className?: string;
}

export function NotificationBellDropdown({ notifications: initial = defaultNotifications, className }: NotificationBellDropdownProps) {
  const [notifications, setNotifications] = React.useState(initial);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={cn("relative flex h-9 w-9 items-center justify-center rounded-md hover:bg-accent", className)}
          aria-label={`Notifications${unreadCount > 0 ? ` (${unreadCount} unread)` : ""}`}
        >
          <Bell className="h-4.5 w-4.5" />
          {unreadCount > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-medium text-destructive-foreground">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-0">
        <div className="flex items-center justify-between border-b border-border px-3 py-2.5">
          <p className="text-sm font-semibold">Notifications</p>
          <button
            type="button"
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            className="text-xs font-medium text-primary hover:underline disabled:pointer-events-none disabled:text-muted-foreground disabled:no-underline"
          >
            Mark all as read
          </button>
        </div>

        {notifications.length === 0 ? (
          <div className="px-4 py-8 text-center text-sm text-muted-foreground">You're all caught up.</div>
        ) : (
          <ul className="max-h-80 overflow-y-auto">
            {notifications.map((notification) => {
              const Icon = typeIcons[notification.type];
              return (
                <li key={notification.id}>
                  <button
                    type="button"
                    onClick={() => markAsRead(notification.id)}
                    className="flex w-full items-start gap-2.5 border-b border-border px-3 py-2.5 text-left last:border-0 hover:bg-accent"
                  >
                    <Icon className={cn("mt-0.5 h-4 w-4 shrink-0", typeColors[notification.type])} aria-hidden="true" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <p className="truncate text-sm font-medium">{notification.title}</p>
                        {!notification.read && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-label="Unread" />}
                      </div>
                      <p className="truncate text-xs text-muted-foreground">{notification.description}</p>
                      <p className="mt-0.5 text-[11px] text-muted-foreground">{notification.timestamp}</p>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
