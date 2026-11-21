import { Check, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ComparisonColumn {
  id: string;
  label: string;
  highlighted?: boolean;
}

export interface ComparisonRow {
  label: string;
  values: Record<string, boolean | string>;
}

export interface ComparisonTableProps {
  columns: ComparisonColumn[];
  rows: ComparisonRow[];
  className?: string;
}

export function ComparisonTable({ columns, rows, className }: ComparisonTableProps) {
  return (
    <div className={cn("w-full overflow-x-auto rounded-lg border border-border", className)}>
      <table className="w-full text-sm">
        <thead className="bg-muted/50 text-left text-xs uppercase text-muted-foreground">
          <tr>
            <th className="px-4 py-2 font-medium">Feature</th>
            {columns.map((column) => (
              <th
                key={column.id}
                className={cn("px-4 py-2 text-center font-medium", column.highlighted && "text-foreground")}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map((row) => (
            <tr key={row.label}>
              <td className="px-4 py-2 font-medium">{row.label}</td>
              {columns.map((column) => {
                const value = row.values[column.id];
                return (
                  <td key={column.id} className={cn("px-4 py-2 text-center", column.highlighted && "bg-primary/5")}>
                    {typeof value === "string" ? (
                      <span>{value}</span>
                    ) : value ? (
                      <Check className="mx-auto h-4 w-4 text-success" aria-label="Included" />
                    ) : (
                      <Minus className="mx-auto h-4 w-4 text-muted-foreground" aria-label="Not included" />
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
