import * as React from "react";
import { Copy, KeyRound, Plus, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/saas/utilities/empty-state";
import { ConfirmationDialog } from "@/components/saas/utilities/confirmation-dialog";
import { cn, formatRelativeTime } from "@/lib/utils";
import type { ApiKeyRecord } from "@/types";

export interface ApiKeyManagerProps {
  apiKeys: ApiKeyRecord[];
  isLoading?: boolean;
  isRevoking?: boolean;
  onCreate?: () => void;
  onRevoke?: (key: ApiKeyRecord) => void;
  onCopy?: (key: ApiKeyRecord) => void;
  className?: string;
}

export function ApiKeyManager({
  apiKeys,
  isLoading = false,
  isRevoking = false,
  onCreate,
  onRevoke,
  onCopy,
  className,
}: ApiKeyManagerProps) {
  const [pendingKey, setPendingKey] = React.useState<ApiKeyRecord | null>(null);

  if (isLoading) {
    return (
      <div className={cn("w-full space-y-2", className)}>
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className={cn("w-full text-left", className)}>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold">API keys</h3>
        {onCreate && (
          <Button size="sm" onClick={onCreate}>
            <Plus className="h-4 w-4" /> Create key
          </Button>
        )}
      </div>

      {apiKeys.length === 0 ? (
        <EmptyState
          icon={KeyRound}
          title="No API keys"
          description="Create a key to authenticate requests to the API."
          primaryAction={onCreate ? { label: "Create key", onClick: onCreate } : undefined}
        />
      ) : (
        <div className="divide-y divide-border rounded-lg border border-border">
          {apiKeys.map((key) => (
            <div key={key.id} className="flex items-center justify-between gap-3 p-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium">{key.name}</p>
                  <Badge variant={key.status === "active" ? "success" : "secondary"}>{key.status}</Badge>
                </div>
                <p className="mt-0.5 flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
                  {key.maskedKey}
                  {onCopy && (
                    <button
                      type="button"
                      onClick={() => onCopy(key)}
                      aria-label={`Copy ${key.name} key`}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <Copy className="h-3 w-3" />
                    </button>
                  )}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Last used {key.lastUsedAt ? formatRelativeTime(key.lastUsedAt) : "never"}
                </p>
              </div>
              {key.status === "active" && onRevoke && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 shrink-0 text-destructive"
                  aria-label={`Revoke ${key.name}`}
                  onClick={() => setPendingKey(key)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
      )}

      <ConfirmationDialog
        open={pendingKey !== null}
        onOpenChange={(open) => !open && setPendingKey(null)}
        variant="destructive"
        title="Revoke API key?"
        description={
          pendingKey ? `"${pendingKey.name}" will stop working immediately. This action cannot be undone.` : undefined
        }
        confirmLabel="Revoke key"
        isLoading={isRevoking}
        onConfirm={() => {
          if (pendingKey) onRevoke?.(pendingKey);
          setPendingKey(null);
        }}
      />
    </div>
  );
}
