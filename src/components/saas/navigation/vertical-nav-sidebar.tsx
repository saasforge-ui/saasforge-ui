import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

export interface NavSection {
  title?: string;
  items: NavItem[];
}

export interface VerticalNavSidebarProps {
  sections: NavSection[];
  activeId: string;
  onNavigate: (id: string) => void;
  className?: string;
}

export function VerticalNavSidebar({ sections, activeId, onNavigate, className }: VerticalNavSidebarProps) {
  return (
    <nav className={cn("w-full max-w-52 space-y-5 text-left", className)}>
      {sections.map((section, index) => (
        <div key={section.title ?? index} className="space-y-0.5">
          {section.title && (
            <p className="mb-1.5 px-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {section.title}
            </p>
          )}
          {section.items.map((item) => {
            const Icon = item.icon;
            const isActive = item.id === activeId;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                className={cn(
                  "flex w-full items-center gap-2.5 rounded-md px-2.5 py-1.5 text-sm transition-colors",
                  isActive ? "bg-accent font-medium text-foreground" : "text-muted-foreground hover:bg-accent/50",
                )}
              >
                <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                {item.label}
              </button>
            );
          })}
        </div>
      ))}
    </nav>
  );
}
