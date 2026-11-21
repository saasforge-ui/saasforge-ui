import * as React from "react";
import { Check, Loader2, Pencil, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface ProductRow {
  id: string;
  name: string;
  price: number;
  stock: number;
}

interface DraftRow {
  name: string;
  price: string;
  stock: string;
  errors: { name?: string; price?: string; stock?: string };
}

const initialProducts: ProductRow[] = [
  { id: "p1", name: "Wireless Keyboard", price: 79, stock: 42 },
  { id: "p2", name: "USB-C Hub", price: 29, stock: 130 },
  { id: "p3", name: "Ergonomic Mouse", price: 45, stock: 0 },
];

function validateDraft(draft: DraftRow): DraftRow["errors"] {
  const errors: DraftRow["errors"] = {};
  if (draft.name.trim() === "") errors.name = "Name is required";

  const price = Number(draft.price);
  if (draft.price.trim() === "" || Number.isNaN(price) || price < 0) errors.price = "Enter a valid price";

  const stock = Number(draft.stock);
  if (draft.stock.trim() === "" || !Number.isInteger(stock) || stock < 0) errors.stock = "Enter a valid quantity";

  return errors;
}

export interface InlineEditableTableRowProps {
  className?: string;
}

export function InlineEditableTableRow({ className }: InlineEditableTableRowProps) {
  const [products, setProducts] = React.useState(initialProducts);
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [draft, setDraft] = React.useState<DraftRow | null>(null);
  const [savingId, setSavingId] = React.useState<string | null>(null);

  const startEdit = (row: ProductRow) => {
    setEditingId(row.id);
    setDraft({ name: row.name, price: String(row.price), stock: String(row.stock), errors: {} });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setDraft(null);
  };

  const saveEdit = async (id: string) => {
    if (!draft) return;
    const errors = validateDraft(draft);
    if (Object.keys(errors).length > 0) {
      setDraft({ ...draft, errors });
      return;
    }

    setSavingId(id);
    await new Promise((resolve) => setTimeout(resolve, 600));
    setProducts((prev) =>
      prev.map((row) =>
        row.id === id ? { ...row, name: draft.name.trim(), price: Number(draft.price), stock: Number(draft.stock) } : row,
      ),
    );
    setSavingId(null);
    setEditingId(null);
    setDraft(null);
  };

  return (
    <div className={cn("w-full overflow-x-auto rounded-lg border border-border", className)}>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/40 text-left text-xs text-muted-foreground">
            <th className="px-4 py-2 font-medium">Product</th>
            <th className="px-4 py-2 font-medium">Price</th>
            <th className="px-4 py-2 font-medium">Stock</th>
            <th className="px-4 py-2 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((row) => {
            const isEditing = editingId === row.id;
            const isSaving = savingId === row.id;

            return (
              <tr key={row.id} className="border-b border-border last:border-0">
                <td className="px-4 py-2.5 align-top">
                  {isEditing && draft ? (
                    <div>
                      <Input
                        value={draft.name}
                        onChange={(event) => setDraft({ ...draft, name: event.target.value, errors: { ...draft.errors, name: undefined } })}
                        aria-label="Product name"
                        className="h-8"
                      />
                      {draft.errors.name && <p className="mt-1 text-xs text-destructive">{draft.errors.name}</p>}
                    </div>
                  ) : (
                    row.name
                  )}
                </td>
                <td className="px-4 py-2.5 align-top">
                  {isEditing && draft ? (
                    <div>
                      <Input
                        type="number"
                        step="0.01"
                        value={draft.price}
                        onChange={(event) => setDraft({ ...draft, price: event.target.value, errors: { ...draft.errors, price: undefined } })}
                        aria-label="Price"
                        className="h-8 w-24"
                      />
                      {draft.errors.price && <p className="mt-1 text-xs text-destructive">{draft.errors.price}</p>}
                    </div>
                  ) : (
                    `$${row.price.toFixed(2)}`
                  )}
                </td>
                <td className="px-4 py-2.5 align-top">
                  {isEditing && draft ? (
                    <div>
                      <Input
                        type="number"
                        value={draft.stock}
                        onChange={(event) => setDraft({ ...draft, stock: event.target.value, errors: { ...draft.errors, stock: undefined } })}
                        aria-label="Stock quantity"
                        className="h-8 w-20"
                      />
                      {draft.errors.stock && <p className="mt-1 text-xs text-destructive">{draft.errors.stock}</p>}
                    </div>
                  ) : (
                    row.stock
                  )}
                </td>
                <td className="px-4 py-2.5 align-top text-right">
                  {isEditing ? (
                    <div className="flex justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => saveEdit(row.id)}
                        disabled={isSaving}
                        className="rounded p-1.5 text-success hover:bg-success/10 disabled:opacity-50"
                        aria-label="Save"
                      >
                        {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                      </button>
                      <button
                        type="button"
                        onClick={cancelEdit}
                        disabled={isSaving}
                        className="rounded p-1.5 text-muted-foreground hover:bg-muted disabled:opacity-50"
                        aria-label="Cancel"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => startEdit(row)}
                      className="rounded p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
                      aria-label={`Edit ${row.name}`}
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
