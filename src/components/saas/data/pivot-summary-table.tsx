import { cn } from "@/lib/utils";

export interface PivotSummaryTableProps {
  rows: string[];
  columns: string[];
  data: Record<string, Record<string, number>>;
  formatValue?: (value: number) => string;
  className?: string;
}

export function PivotSummaryTable({ rows, columns, data, formatValue, className }: PivotSummaryTableProps) {
  const format = formatValue ?? ((value: number) => value.toLocaleString("en-US"));

  const rowTotals = rows.map((row) => columns.reduce((sum, col) => sum + (data[row]?.[col] ?? 0), 0));
  const columnTotals = columns.map((col) => rows.reduce((sum, row) => sum + (data[row]?.[col] ?? 0), 0));
  const grandTotal = columnTotals.reduce((sum, value) => sum + value, 0);

  return (
    <div className={cn("w-full overflow-x-auto rounded-lg border border-border", className)}>
      <table className="w-full text-sm">
        <thead className="bg-muted/50 text-left text-xs uppercase text-muted-foreground">
          <tr>
            <th className="px-4 py-2 font-medium" />
            {columns.map((col) => (
              <th key={col} className="px-4 py-2 text-right font-medium">
                {col}
              </th>
            ))}
            <th className="px-4 py-2 text-right font-medium">Total</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map((row, rowIndex) => (
            <tr key={row}>
              <td className="px-4 py-2 font-medium">{row}</td>
              {columns.map((col) => (
                <td key={col} className="px-4 py-2 text-right text-muted-foreground">
                  {format(data[row]?.[col] ?? 0)}
                </td>
              ))}
              <td className="px-4 py-2 text-right font-medium">{format(rowTotals[rowIndex])}</td>
            </tr>
          ))}
        </tbody>
        <tfoot className="border-t border-border bg-muted/30 font-medium">
          <tr>
            <td className="px-4 py-2">Total</td>
            {columnTotals.map((total, index) => (
              <td key={columns[index]} className="px-4 py-2 text-right">
                {format(total)}
              </td>
            ))}
            <td className="px-4 py-2 text-right">{format(grandTotal)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
