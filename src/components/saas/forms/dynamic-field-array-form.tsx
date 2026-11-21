import * as React from "react";
import { Check, Loader2, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { UserRole } from "@/types";

interface InviteRow {
  id: string;
  email: string;
  role: UserRole;
  error?: string;
}

const roles: UserRole[] = ["Owner", "Admin", "Member", "Viewer"];
const MAX_ROWS = 10;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function createRow(): InviteRow {
  return { id: `row-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, email: "", role: "Member" };
}

export interface DynamicFieldArrayFormProps {
  onSubmit?: (invites: { email: string; role: UserRole }[]) => void;
  className?: string;
}

export function DynamicFieldArrayForm({ onSubmit, className }: DynamicFieldArrayFormProps) {
  const [rows, setRows] = React.useState<InviteRow[]>([createRow()]);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const addRow = () => {
    setRows((prev) => (prev.length >= MAX_ROWS ? prev : [...prev, createRow()]));
    setIsSuccess(false);
  };

  const removeRow = (id: string) => {
    setRows((prev) => (prev.length <= 1 ? prev : prev.filter((row) => row.id !== id)));
    setIsSuccess(false);
  };

  const updateRow = (id: string, patch: Partial<InviteRow>) => {
    setRows((prev) => prev.map((row) => (row.id === id ? { ...row, ...patch } : row)));
    setIsSuccess(false);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const validated = rows.map((row) => ({
      ...row,
      error: row.email.trim() === "" ? "Email is required" : EMAIL_PATTERN.test(row.email) ? undefined : "Enter a valid email address",
    }));
    setRows(validated);
    if (validated.some((row) => row.error)) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSubmitting(false);
    setIsSuccess(true);
    onSubmit?.(validated.map(({ email, role }) => ({ email, role })));
  };

  return (
    <form onSubmit={handleSubmit} noValidate className={cn("w-full max-w-lg space-y-3", className)}>
      <div className="space-y-2">
        {rows.map((row, index) => (
          <div key={row.id} className="flex items-start gap-2">
            <div className="flex-1 space-y-1">
              <Label htmlFor={`invite-email-${row.id}`} className="sr-only">
                Email {index + 1}
              </Label>
              <Input
                id={`invite-email-${row.id}`}
                type="email"
                placeholder="teammate@company.com"
                value={row.email}
                onChange={(event) => updateRow(row.id, { email: event.target.value, error: undefined })}
                aria-invalid={row.error ? true : undefined}
              />
              {row.error && <p className="text-xs text-destructive">{row.error}</p>}
            </div>
            <div className="w-32 shrink-0">
              <Select value={row.role} onValueChange={(value) => updateRow(row.id, { role: value as UserRole })}>
                <SelectTrigger aria-label={`Role for row ${index + 1}`}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <button
              type="button"
              onClick={() => removeRow(row.id)}
              disabled={rows.length <= 1}
              className="mt-1.5 shrink-0 text-muted-foreground hover:text-destructive disabled:pointer-events-none disabled:opacity-30"
              aria-label={`Remove row ${index + 1}`}
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      <Button type="button" variant="outline" size="sm" onClick={addRow} disabled={rows.length >= MAX_ROWS}>
        <Plus className="h-3.5 w-3.5" />
        Add another
      </Button>

      <div className="flex items-center gap-3 pt-2">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
          Send invites
        </Button>
        {isSuccess && (
          <p className="flex items-center gap-1.5 text-sm text-success">
            <Check className="h-4 w-4" /> Invites sent successfully.
          </p>
        )}
      </div>
    </form>
  );
}
