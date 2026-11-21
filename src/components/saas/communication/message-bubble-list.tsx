import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn, formatRelativeTime } from "@/lib/utils";
import type { ChatMessage } from "@/types";

export interface MessageBubbleListProps {
  messages: ChatMessage[];
  currentUserId: string;
  className?: string;
}

export function MessageBubbleList({ messages, currentUserId, className }: MessageBubbleListProps) {
  return (
    <div className={cn("w-full max-w-md space-y-3 text-left", className)}>
      {messages.map((message) => {
        const isMe = message.senderId === currentUserId;
        return (
          <div key={message.id} className={cn("flex items-end gap-2", isMe && "flex-row-reverse")}>
            <Avatar className="h-7 w-7 shrink-0">
              {message.avatarUrl && <AvatarImage src={message.avatarUrl} alt="" />}
              <AvatarFallback className="text-xs">{message.senderName.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className={cn("flex max-w-[75%] flex-col", isMe && "items-end")}>
              <div
                className={cn(
                  "rounded-2xl px-3.5 py-2 text-sm",
                  isMe ? "bg-primary text-primary-foreground" : "bg-muted",
                )}
              >
                {message.content}
              </div>
              <span className="mt-1 text-xs text-muted-foreground">{formatRelativeTime(message.timestamp)}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
