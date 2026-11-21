import { AlertTriangle, Bell, CheckCircle2, Info, Trash2, XCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/saas/utilities/empty-state";
import { cn, formatRelativeTime } from "@/lib/utils";
import type { NotificationItem, NotificationType } from "@/types";

export interface NotificationsCenterProps {
  notifications: NotificationItem[];
  isLoading?: boolean;
  onMarkAsRead?: (id: string) => void;
  onMarkAllAsRead?: () => void;
  onDelete?: (id: string) => void;
  className?: string;
}

const iconByType: Record<NotificationType, { icon: LucideIcon; className: string }> = {
  success: { icon: CheckCircle2, className: "text-success" },
  warning: { icon: AlertTriangle, className: "text-warning-foreground" },
  error: { icon: XCircle, className: "text-destructive" },
  information: { icon: Info, className: "text-primary" },
};

export function NotificationsCenter({
  notifications,
  isLoading = false,
  onMarkAsRead,
  onMarkAllAsRead,
  onDelete,
  className,
}: NotificationsCenterProps) {
  const unreadCount = notifications.filter((n) => !n.read).length;

  if (isLoading) {
    return (
      <div className={cn("w-full max-w-md space-y-2", className)}>
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className={cn("w-full max-w-md text-left", className)}>
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold">Notifications</h3>
          {unreadCount > 0 && <Badge variant="secondary">{unreadCount} new</Badge>}
        </div>
        {onMarkAllAsRead && unreadCount > 0 && (
          <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={onMarkAllAsRead}>
            Mark all as read
          </Button>
        )}
      </div>

      {notifications.length === 0 ? (
        <EmptyState icon={Bell} title="No notifications" description="You're all caught up." />
      ) : (
        <div className="divide-y divide-border rounded-lg border border-border">
          {notifications.map((notification) => {
            const { icon: Icon, className: iconClassName } = iconByType[notification.type];
            return (
              <div
                key={notification.id}
                className={cn("flex items-start gap-3 p-4", !notification.read && "bg-muted/40")}
              >
                <Icon className={cn("mt-0.5 h-4 w-4 shrink-0", iconClassName)} aria-hidden="true" />
                <button
                  type="button"
                  className="min-w-0 flex-1 text-left"
                  onClick={() => !notification.read && onMarkAsRead?.(notification.id)}
                >
                  <p className="text-sm font-medium">{notification.title}</p>
                  <p className="text-xs text-muted-foreground">{notification.description}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{formatRelativeTime(notification.timestamp)}</p>
                </button>
                {onDelete && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 shrink-0"
                    aria-label={`Delete notification: ${notification.title}`}
                    onClick={() => onDelete(notification.id)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
