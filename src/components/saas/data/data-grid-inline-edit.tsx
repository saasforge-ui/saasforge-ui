import * as React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface DataGridColumn {
  key: string;
  label: string;
}

export interface DataGridInlineEditProps {
  columns: DataGridColumn[];
  rows: Record<string, string>[];
  onCellChange: (rowIndex: number, key: string, value: string) => void;
  className?: string;
}

export function DataGridInlineEdit({ columns, rows, onCellChange, className }: DataGridInlineEditProps) {
  const [editing, setEditing] = React.useState<{ row: number; key: string } | null>(null);

  return (
    <div className={cn("w-full overflow-x-auto rounded-lg border border-border", className)}>
      <table className="w-full text-sm">
        <thead className="bg-muted/50 text-left text-xs uppercase text-muted-foreground">
          <tr>
            {columns.map((column) => (
              <th key={column.key} className="px-4 py-2 font-medium">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column) => {
                const isEditing = editing?.row === rowIndex && editing.key === column.key;
                return (
                  <td key={column.key} className="p-0">
                    {isEditing ? (
                      <Input
                        autoFocus
                        defaultValue={row[column.key]}
                        onBlur={(e) => {
                          onCellChange(rowIndex, column.key, e.target.value);
                          setEditing(null);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") e.currentTarget.blur();
                          if (e.key === "Escape") setEditing(null);
                        }}
                        className="h-9 rounded-none border-0 border-2 border-primary px-4 focus-visible:ring-0"
                      />
                    ) : (
                      <button
                        type="button"
                        onClick={() => setEditing({ row: rowIndex, key: column.key })}
                        className="block w-full px-4 py-2 text-left hover:bg-accent"
                      >
                        {row[column.key] || <span className="text-muted-foreground">—</span>}
                      </button>
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
