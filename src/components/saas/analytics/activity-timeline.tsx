import { Activity, CreditCard, KeyRound, Lock, Rocket, TrendingUp, UserPlus } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/saas/utilities/empty-state";
import { cn, formatRelativeTime } from "@/lib/utils";
import type { ActivityItem, ActivityType } from "@/types";

export interface ActivityTimelineProps {
  items: ActivityItem[];
  isLoading?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  className?: string;
}

const iconByType: Record<ActivityType, LucideIcon> = {
  user_joined: UserPlus,
  subscription_upgraded: TrendingUp,
  invoice_paid: CreditCard,
  project_created: Rocket,
  password_changed: Lock,
  api_key_generated: KeyRound,
};

export function ActivityTimeline({
  items,
  isLoading = false,
  emptyTitle = "No activity yet",
  emptyDescription = "Recent events will show up here as they happen.",
  className,
}: ActivityTimelineProps) {
  if (isLoading) {
    return (
      <div className={cn("w-full space-y-4", className)}>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex gap-3">
            <Skeleton className="h-8 w-8 shrink-0 rounded-full" />
            <div className="flex-1 space-y-1.5">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-3 w-2/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return <EmptyState icon={Activity} title={emptyTitle} description={emptyDescription} className={className} />;
  }

  return (
    <ol className={cn("w-full space-y-6 text-left", className)}>
      {items.map((item, index) => {
        const Icon = iconByType[item.type];
        return (
          <li key={item.id} className="relative flex gap-3 pl-1">
            {index < items.length - 1 && (
              <span className="absolute left-[15px] top-8 h-[calc(100%-0.5rem)] w-px bg-border" aria-hidden="true" />
            )}
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
              <Icon className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1 pb-1">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-medium">{item.title}</p>
                <span className="shrink-0 text-xs text-muted-foreground">{formatRelativeTime(item.timestamp)}</span>
              </div>
              <p className="mt-0.5 text-sm text-muted-foreground">{item.description}</p>
              {item.actor && (
                <div className="mt-2 flex items-center gap-1.5">
                  <Avatar className="h-5 w-5">
                    {item.actor.avatarUrl && <AvatarImage src={item.actor.avatarUrl} alt="" />}
                    <AvatarFallback className="text-[10px]">{item.actor.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-muted-foreground">{item.actor.name}</span>
                </div>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
