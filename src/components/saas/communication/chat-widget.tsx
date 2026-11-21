import * as React from "react";
import { MessageCircle, Send, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { ChatMessage } from "@/types";

export interface ChatWidgetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  messages: ChatMessage[];
  currentUserId: string;
  onSend: (content: string) => void;
  isSending?: boolean;
  title?: string;
  className?: string;
}

export function ChatWidget({
  open,
  onOpenChange,
  messages,
  currentUserId,
  onSend,
  isSending = false,
  title = "Chat with us",
  className,
}: ChatWidgetProps) {
  const [value, setValue] = React.useState("");

  function handleSend() {
    if (!value.trim()) return;
    onSend(value);
    setValue("");
  }

  if (!open) {
    return (
      <Button
        className="h-12 w-12 rounded-full p-0 shadow-lg"
        onClick={() => onOpenChange(true)}
        aria-label="Open chat"
      >
        <MessageCircle className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <div className={cn("flex h-[28rem] w-full max-w-sm flex-col rounded-lg border border-border bg-card shadow-lg", className)}>
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <p className="text-sm font-semibold">{title}</p>
        <button type="button" onClick={() => onOpenChange(false)} aria-label="Close chat" className="text-muted-foreground hover:text-foreground">
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {messages.map((message) => {
          const isMe = message.senderId === currentUserId;
          return (
            <div key={message.id} className={cn("flex items-end gap-2", isMe && "flex-row-reverse")}>
              <Avatar className="h-6 w-6 shrink-0">
                {message.avatarUrl && <AvatarImage src={message.avatarUrl} alt="" />}
                <AvatarFallback className="text-[10px]">{message.senderName.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div
                className={cn(
                  "max-w-[75%] rounded-2xl px-3 py-2 text-sm",
                  isMe ? "bg-primary text-primary-foreground" : "bg-muted",
                )}
              >
                {message.content}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-2 border-t border-border p-3">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type a message..."
          className="h-9"
        />
        <Button size="icon" className="h-9 w-9 shrink-0" disabled={!value.trim() || isSending} onClick={handleSend} aria-label="Send message">
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
