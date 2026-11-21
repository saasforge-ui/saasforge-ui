import * as React from "react";
import { Check, ChevronsUpDown, Plus, Search } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import type { OrganizationNode } from "@/types";

export interface OrganizationSwitcherProps {
  organizations: OrganizationNode[];
  activeOrgId: string;
  onSwitchOrg?: (orgId: string) => void;
  onCreateOrg?: () => void;
  className?: string;
}

export function OrganizationSwitcher({
  organizations,
  activeOrgId,
  onSwitchOrg,
  onCreateOrg,
  className,
}: OrganizationSwitcherProps) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");

  const activeOrg = organizations.find((o) => o.id === activeOrgId) ?? organizations[0];
  const filtered = organizations.filter((o) => o.name.toLowerCase().includes(query.toLowerCase()));

  if (!activeOrg) return null;

  return (
    <div className={cn("w-full max-w-xs", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-between">
            <span className="flex items-center gap-2 truncate">
              <Avatar className="h-5 w-5 shrink-0">
                <AvatarFallback className="text-[10px]">{activeOrg.avatarInitials}</AvatarFallback>
              </Avatar>
              <span className="truncate">{activeOrg.name}</span>
            </span>
            <ChevronsUpDown className="h-4 w-4 shrink-0 text-muted-foreground" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-72 p-0" align="start">
          <div className="border-b border-border p-2">
            <div className="relative">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                autoFocus
                placeholder="Search organizations..."
                className="pl-8"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="max-h-64 overflow-y-auto p-1">
            {filtered.map((org) => (
              <div key={org.id}>
                <button
                  type="button"
                  className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm hover:bg-accent"
                  onClick={() => {
                    onSwitchOrg?.(org.id);
                    setOpen(false);
                  }}
                >
                  <Avatar className="h-5 w-5">
                    <AvatarFallback className="text-[10px]">{org.avatarInitials}</AvatarFallback>
                  </Avatar>
                  <span className="flex-1 truncate">{org.name}</span>
                  {org.id === activeOrgId && <Check className="h-4 w-4 shrink-0" />}
                </button>
                {org.workspaces.length > 0 && (
                  <ul className="ml-9 border-l border-border pl-2">
                    {org.workspaces.map((ws) => (
                      <li key={ws.id} className="py-1 text-xs text-muted-foreground">
                        {ws.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
          {onCreateOrg && (
            <div className="border-t border-border p-1">
              <Button variant="ghost" className="w-full justify-start gap-2 text-sm" onClick={onCreateOrg}>
                <Plus className="h-4 w-4" /> Create organization
              </Button>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}
