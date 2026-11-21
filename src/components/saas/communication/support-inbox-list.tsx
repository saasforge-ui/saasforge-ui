import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn, formatRelativeTime } from "@/lib/utils";
import type { SupportConversation } from "@/types";

export interface SupportInboxListProps {
  conversations: SupportConversation[];
  selectedId?: string;
  onSelect?: (id: string) => void;
  className?: string;
}

const statusVariant: Record<SupportConversation["status"], "success" | "secondary" | "outline"> = {
  open: "success",
  pending: "secondary",
  closed: "outline",
};

export function SupportInboxList({ conversations, selectedId, onSelect, className }: SupportInboxListProps) {
  return (
    <div className={cn("w-full max-w-md divide-y divide-border rounded-lg border border-border text-left", className)}>
      {conversations.map((conversation) => {
        const isSelected = conversation.id === selectedId;
        return (
          <button
            key={conversation.id}
            type="button"
            onClick={() => onSelect?.(conversation.id)}
            className={cn("flex w-full items-start gap-3 p-4 text-left transition-colors", isSelected ? "bg-accent" : "hover:bg-accent/50")}
          >
            <Avatar className="h-9 w-9 shrink-0">
              {conversation.avatarUrl && <AvatarImage src={conversation.avatarUrl} alt="" />}
              <AvatarFallback>{conversation.customerName.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="truncate text-sm font-medium">{conversation.customerName}</p>
                <span className="shrink-0 text-xs text-muted-foreground">{formatRelativeTime(conversation.timestamp)}</span>
              </div>
              <p className="truncate text-sm text-muted-foreground">{conversation.lastMessage}</p>
              <div className="mt-1 flex items-center gap-2">
                <Badge variant={statusVariant[conversation.status]}>{conversation.status}</Badge>
                {conversation.unreadCount ? (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-xs font-medium text-primary-foreground">
                    {conversation.unreadCount}
                  </span>
                ) : null}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
