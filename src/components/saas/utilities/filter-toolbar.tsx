import { ArrowDownUp, Search, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export interface FilterOption {
  label: string;
  value: string;
}

export type FilterValue = string | string[] | { from?: string; to?: string } | undefined;

export interface FilterConfig {
  key: string;
  label: string;
  type: "select" | "multi-select" | "date-range";
  options?: FilterOption[];
}

export interface FilterToolbarProps {
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  filters: FilterConfig[];
  values: Record<string, FilterValue>;
  onChange: (key: string, value: FilterValue) => void;
  sortOptions?: FilterOption[];
  sortValue?: string;
  onSortChange?: (value: string) => void;
  onClear?: () => void;
  className?: string;
}

function isActive(value: FilterValue) {
  if (value === undefined) return false;
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === "object") return Boolean(value.from || value.to);
  return value !== "" && value !== "all";
}

export function FilterToolbar({
  searchPlaceholder = "Search...",
  searchValue,
  onSearchChange,
  filters,
  values,
  onChange,
  sortOptions,
  sortValue,
  onSortChange,
  onClear,
  className,
}: FilterToolbarProps) {
  const activeFilters = filters.filter((f) => isActive(values[f.key]));
  const hasActive = activeFilters.length > 0 || Boolean(searchValue);

  return (
    <div className={cn("w-full", className)}>
      <div className="flex flex-wrap items-center gap-2">
        {onSearchChange && (
          <div className="relative min-w-40 flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={searchPlaceholder}
              className="pl-10"
              value={searchValue ?? ""}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        )}

        {filters.map((filter) => {
          if (filter.type === "select") {
            const current = (values[filter.key] as string) ?? "all";
            return (
              <Select key={filter.key} value={current} onValueChange={(v) => onChange(filter.key, v)}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder={filter.label} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All {filter.label.toLowerCase()}</SelectItem>
                  {filter.options?.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            );
          }

          if (filter.type === "multi-select") {
            const current = (values[filter.key] as string[]) ?? [];
            return (
              <Popover key={filter.key}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="gap-1.5">
                    {filter.label}
                    {current.length > 0 && <Badge variant="secondary">{current.length}</Badge>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56 p-2" align="start">
                  <div className="space-y-1.5">
                    {filter.options?.map((opt) => {
                      const checked = current.includes(opt.value);
                      return (
                        <div key={opt.value} className="flex items-center gap-2">
                          <Checkbox
                            id={`${filter.key}-${opt.value}`}
                            checked={checked}
                            onCheckedChange={(v) =>
                              onChange(
                                filter.key,
                                v ? [...current, opt.value] : current.filter((c) => c !== opt.value),
                              )
                            }
                          />
                          <Label htmlFor={`${filter.key}-${opt.value}`} className="text-sm font-normal">
                            {opt.label}
                          </Label>
                        </div>
                      );
                    })}
                  </div>
                </PopoverContent>
              </Popover>
            );
          }

          const current = (values[filter.key] as { from?: string; to?: string }) ?? {};
          return (
            <Popover key={filter.key}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="gap-1.5">
                  {filter.label}
                  {(current.from || current.to) && <Badge variant="secondary">1</Badge>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64 space-y-2 p-3" align="start">
                <div className="space-y-1">
                  <Label htmlFor={`${filter.key}-from`}>From</Label>
                  <Input
                    id={`${filter.key}-from`}
                    type="date"
                    value={current.from ?? ""}
                    onChange={(e) => onChange(filter.key, { ...current, from: e.target.value })}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor={`${filter.key}-to`}>To</Label>
                  <Input
                    id={`${filter.key}-to`}
                    type="date"
                    value={current.to ?? ""}
                    onChange={(e) => onChange(filter.key, { ...current, to: e.target.value })}
                  />
                </div>
              </PopoverContent>
            </Popover>
          );
        })}

        {sortOptions && sortOptions.length > 0 && (
          <Select value={sortValue} onValueChange={onSortChange}>
            <SelectTrigger className="w-36">
              <ArrowDownUp className="h-3.5 w-3.5" />
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {hasActive && onClear && (
          <Button variant="ghost" size="sm" className="gap-1" onClick={onClear}>
            <X className="h-3.5 w-3.5" /> Clear filters
          </Button>
        )}
      </div>
    </div>
  );
}
