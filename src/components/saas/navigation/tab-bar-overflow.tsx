import { ChevronDown } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export interface TabBarItem {
  id: string;
  label: string;
}

export interface TabBarOverflowProps {
  tabs: TabBarItem[];
  activeTabId: string;
  onTabChange: (id: string) => void;
  maxVisible?: number;
  className?: string;
}

export function TabBarOverflow({ tabs, activeTabId, onTabChange, maxVisible = 4, className }: TabBarOverflowProps) {
  const visibleTabs = tabs.slice(0, maxVisible);
  const overflowTabs = tabs.slice(maxVisible);
  const activeInOverflow = overflowTabs.find((tab) => tab.id === activeTabId);

  return (
    <div className={cn("flex items-center gap-1 border-b border-border", className)} role="tablist">
      {visibleTabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          role="tab"
          aria-selected={tab.id === activeTabId}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "border-b-2 px-3 py-2 text-sm font-medium transition-colors",
            tab.id === activeTabId ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground",
          )}
        >
          {tab.label}
        </button>
      ))}
      {overflowTabs.length > 0 && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className={cn(
                "flex items-center gap-1 border-b-2 px-3 py-2 text-sm font-medium transition-colors",
                activeInOverflow ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {activeInOverflow ? activeInOverflow.label : "More"}
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {overflowTabs.map((tab) => (
              <DropdownMenuItem key={tab.id} onClick={() => onTabChange(tab.id)}>
                {tab.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}
