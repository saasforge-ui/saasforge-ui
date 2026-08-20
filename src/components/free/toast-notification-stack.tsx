import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, Info, X, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export type ToastVariant = "success" | "error" | "warning" | "info";

export interface ToastItem {
  id: string;
  variant: ToastVariant;
  message: string;
}

const TOAST_DURATION_MS = 4000;

const variantConfig: Record<ToastVariant, { icon: typeof CheckCircle2; className: string; barClassName: string }> = {
  success: { icon: CheckCircle2, className: "border-success/30 bg-success/10 text-success", barClassName: "bg-success" },
  error: { icon: XCircle, className: "border-destructive/30 bg-destructive/10 text-destructive", barClassName: "bg-destructive" },
  warning: { icon: AlertTriangle, className: "border-warning/30 bg-warning/10 text-warning", barClassName: "bg-warning" },
  info: { icon: Info, className: "border-primary/30 bg-primary/10 text-primary", barClassName: "bg-primary" },
};

const variantMessages: Record<ToastVariant, string> = {
  success: "Changes saved successfully.",
  error: "Something went wrong. Please try again.",
  warning: "Your session will expire in 5 minutes.",
  info: "A new version is available.",
};

function Toast({ toast, onDismiss }: { toast: ToastItem; onDismiss: (id: string) => void }) {
  const config = variantConfig[toast.variant];
  const Icon = config.icon;

  React.useEffect(() => {
    const timeout = setTimeout(() => onDismiss(toast.id), TOAST_DURATION_MS);
    return () => clearTimeout(timeout);
  }, [toast.id, onDismiss]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 60, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 40, scale: 0.9, transition: { duration: 0.15 } }}
      transition={{ type: "spring", stiffness: 420, damping: 32 }}
      role="status"
      className={cn("relative w-80 overflow-hidden rounded-lg border bg-card p-3 pr-8 shadow-lg", config.className)}
    >
      <div className="flex items-start gap-2.5">
        <Icon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
        <p className="text-sm text-foreground">{toast.message}</p>
      </div>
      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        className="absolute right-2 top-2 text-muted-foreground transition-colors hover:text-foreground"
        aria-label="Dismiss notification"
      >
        <X className="h-3.5 w-3.5" />
      </button>
      <div className="absolute inset-x-0 bottom-0 h-0.5 bg-black/10">
        <motion.div
          className={cn("h-full origin-left", config.barClassName)}
          initial={{ scaleX: 1 }}
          animate={{ scaleX: 0 }}
          transition={{ duration: TOAST_DURATION_MS / 1000, ease: "linear" }}
        />
      </div>
    </motion.div>
  );
}

export function ToastNotificationStack({ className }: { className?: string }) {
  const [toasts, setToasts] = React.useState<ToastItem[]>([]);

  const pushToast = (variant: ToastVariant) => {
    const toast: ToastItem = {
      id: `${variant}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      variant,
      message: variantMessages[variant],
    };
    setToasts((prev) => [...prev, toast]);
  };

  const dismissToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <div className={cn("relative min-h-40 w-full", className)}>
      <div className="flex flex-wrap gap-2">
        <motion.button
          type="button"
          whileTap={{ scale: 0.96 }}
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          onClick={() => pushToast("success")}
          className="rounded-md border border-success/30 bg-success/10 px-3 py-1.5 text-sm font-medium text-success hover:bg-success/20"
        >
          Trigger success
        </motion.button>
        <motion.button
          type="button"
          whileTap={{ scale: 0.96 }}
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          onClick={() => pushToast("error")}
          className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-1.5 text-sm font-medium text-destructive hover:bg-destructive/20"
        >
          Trigger error
        </motion.button>
        <motion.button
          type="button"
          whileTap={{ scale: 0.96 }}
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          onClick={() => pushToast("warning")}
          className="rounded-md border border-warning/30 bg-warning/10 px-3 py-1.5 text-sm font-medium text-warning hover:bg-warning/20"
        >
          Trigger warning
        </motion.button>
        <motion.button
          type="button"
          whileTap={{ scale: 0.96 }}
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          onClick={() => pushToast("info")}
          className="rounded-md border border-primary/30 bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary hover:bg-primary/20"
        >
          Trigger info
        </motion.button>
      </div>

      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
        <AnimatePresence>
          {toasts.map((toast) => (
            <Toast key={toast.id} toast={toast} onDismiss={dismissToast} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
