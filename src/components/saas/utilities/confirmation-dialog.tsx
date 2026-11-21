import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { AlertTriangle, Info, Loader2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ConfirmationDialogVariant = "destructive" | "warning" | "information";

export interface ConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  variant?: ConfirmationDialogVariant;
  confirmLabel?: string;
  cancelLabel?: string;
  isLoading?: boolean;
  onConfirm: () => void;
}

const variantConfig: Record<ConfirmationDialogVariant, { icon: typeof AlertTriangle; iconClassName: string; confirmVariant: "default" | "destructive" }> = {
  destructive: { icon: AlertTriangle, iconClassName: "text-destructive bg-destructive/10", confirmVariant: "destructive" },
  warning: { icon: AlertTriangle, iconClassName: "text-warning-foreground bg-warning/20", confirmVariant: "default" },
  information: { icon: Info, iconClassName: "text-primary bg-primary/10", confirmVariant: "default" },
};

export function ConfirmationDialog({
  open,
  onOpenChange,
  title,
  description,
  variant = "information",
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  isLoading = false,
  onConfirm,
}: ConfirmationDialogProps) {
  const { icon: Icon, iconClassName, confirmVariant } = variantConfig[variant];

  return (
    <AlertDialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <AlertDialogPrimitive.Portal>
        <AlertDialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/50 animate-in fade-in-0" />
        <AlertDialogPrimitive.Content
          className={cn(
            "fixed left-1/2 top-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-lg border border-border bg-card p-6 shadow-lg animate-in fade-in-0 zoom-in-95",
          )}
        >
          <div className={cn("mb-4 flex h-10 w-10 items-center justify-center rounded-full", iconClassName)}>
            <Icon className="h-5 w-5" aria-hidden="true" />
          </div>
          <AlertDialogPrimitive.Title className="text-base font-semibold">{title}</AlertDialogPrimitive.Title>
          {description && (
            <AlertDialogPrimitive.Description className="mt-1.5 text-sm text-muted-foreground">
              {description}
            </AlertDialogPrimitive.Description>
          )}
          <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <AlertDialogPrimitive.Cancel
              className={cn(buttonVariants({ variant: "outline" }))}
              disabled={isLoading}
            >
              {cancelLabel}
            </AlertDialogPrimitive.Cancel>
            <AlertDialogPrimitive.Action
              className={cn(buttonVariants({ variant: confirmVariant }))}
              disabled={isLoading}
              onClick={(e) => {
                e.preventDefault();
                onConfirm();
              }}
            >
              {isLoading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
              {confirmLabel}
            </AlertDialogPrimitive.Action>
          </div>
        </AlertDialogPrimitive.Content>
      </AlertDialogPrimitive.Portal>
    </AlertDialogPrimitive.Root>
  );
}
