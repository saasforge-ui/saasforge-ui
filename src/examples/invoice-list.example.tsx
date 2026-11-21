import { InvoiceList } from "@/components/saas/billing/invoice-list";
import { mockInvoices } from "@/data/mock-data";

export default function Example() {
  return (
    <InvoiceList
      invoices={mockInvoices}
      onView={(invoice) => console.log("view", invoice.id)}
      onDownload={(invoice) => console.log("download", invoice.id)}
    />
  );
}
