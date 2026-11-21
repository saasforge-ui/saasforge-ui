import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  onNavigate?: (href: string) => void;
  className?: string;
}

export function Breadcrumbs({ items, onNavigate, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center text-sm", className)}>
      <ol className="flex items-center gap-1.5">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
              {index > 0 && <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />}
              {isLast || !item.href ? (
                <span className={cn(isLast ? "font-medium text-foreground" : "text-muted-foreground")} aria-current={isLast ? "page" : undefined}>
                  {item.label}
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => onNavigate?.(item.href!)}
                  className="text-muted-foreground hover:text-foreground hover:underline"
                >
                  {item.label}
                </button>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
