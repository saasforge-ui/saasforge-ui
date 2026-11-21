import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BottomNavItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

export interface MobileBottomNavProps {
  items: BottomNavItem[];
  activeId: string;
  onNavigate: (id: string) => void;
  className?: string;
}

export function MobileBottomNav({ items, activeId, onNavigate, className }: MobileBottomNavProps) {
  return (
    <nav
      className={cn("flex w-full max-w-sm items-center justify-around border-t border-border bg-card py-2", className)}
      aria-label="Primary"
    >
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = item.id === activeId;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onNavigate(item.id)}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "flex flex-col items-center gap-1 px-3 py-1 text-xs",
              isActive ? "text-primary" : "text-muted-foreground",
            )}
          >
            <Icon className="h-5 w-5" aria-hidden="true" />
            {item.label}
          </button>
        );
      })}
    </nav>
  );
}
