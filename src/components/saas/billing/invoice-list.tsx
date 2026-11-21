import { Download, Eye, Receipt } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/saas/utilities/empty-state";
import { cn, formatCurrency } from "@/lib/utils";
import type { InvoiceRecord } from "@/types";

export interface InvoiceListProps {
  invoices: InvoiceRecord[];
  isLoading?: boolean;
  onView?: (invoice: InvoiceRecord) => void;
  onDownload?: (invoice: InvoiceRecord) => void;
  className?: string;
}

const statusVariant: Record<InvoiceRecord["status"], "success" | "secondary" | "destructive" | "outline"> = {
  paid: "success",
  pending: "secondary",
  failed: "destructive",
  refunded: "outline",
};

export function InvoiceList({ invoices, isLoading = false, onView, onDownload, className }: InvoiceListProps) {
  if (isLoading) {
    return (
      <div className={cn("w-full space-y-2", className)}>
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-full" />
        ))}
      </div>
    );
  }

  if (invoices.length === 0) {
    return (
      <EmptyState
        icon={Receipt}
        title="No invoices yet"
        description="Invoices will appear here once your first billing cycle completes."
        className={className}
      />
    );
  }

  return (
    <div className={cn("w-full overflow-x-auto rounded-lg border border-border text-left", className)}>
      <table className="w-full text-sm">
        <thead className="bg-muted/50 text-left text-xs uppercase text-muted-foreground">
          <tr>
            <th className="px-4 py-2 font-medium">Invoice</th>
            <th className="px-4 py-2 font-medium">Date</th>
            <th className="px-4 py-2 font-medium">Amount</th>
            <th className="px-4 py-2 font-medium">Status</th>
            <th className="hidden px-4 py-2 font-medium sm:table-cell">Payment method</th>
            <th className="px-4 py-2" />
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {invoices.map((invoice) => (
            <tr key={invoice.id}>
              <td className="px-4 py-2 font-mono text-xs">{invoice.id}</td>
              <td className="px-4 py-2 text-muted-foreground">{invoice.date}</td>
              <td className="px-4 py-2 font-medium">{formatCurrency(invoice.amount, invoice.currency)}</td>
              <td className="px-4 py-2">
                <Badge variant={statusVariant[invoice.status]}>{invoice.status}</Badge>
              </td>
              <td className="hidden px-4 py-2 text-muted-foreground sm:table-cell">{invoice.paymentMethod}</td>
              <td className="px-4 py-2">
                <div className="flex justify-end gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    aria-label={`View ${invoice.id}`}
                    onClick={() => onView?.(invoice)}
                  >
                    <Eye className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    aria-label={`Download ${invoice.id}`}
                    onClick={() => onDownload?.(invoice)}
                  >
                    <Download className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
