import { Hash, Lock, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ChatChannel } from "@/types";

export interface ChatChannelSidebarProps {
  channels: ChatChannel[];
  activeChannelId: string;
  onSelectChannel: (id: string) => void;
  onCreateChannel?: () => void;
  className?: string;
}

export function ChatChannelSidebar({
  channels,
  activeChannelId,
  onSelectChannel,
  onCreateChannel,
  className,
}: ChatChannelSidebarProps) {
  return (
    <nav className={cn("w-full max-w-56 space-y-0.5 text-left", className)} aria-label="Channels">
      <div className="mb-2 flex items-center justify-between px-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Channels</p>
        {onCreateChannel && (
          <button type="button" onClick={onCreateChannel} aria-label="Create channel" className="text-muted-foreground hover:text-foreground">
            <Plus className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
      {channels.map((channel) => {
        const isActive = channel.id === activeChannelId;
        return (
          <button
            key={channel.id}
            type="button"
            onClick={() => onSelectChannel(channel.id)}
            className={cn(
              "flex w-full items-center gap-1.5 rounded-md px-2 py-1.5 text-sm transition-colors",
              isActive ? "bg-accent font-medium text-foreground" : "text-muted-foreground hover:bg-accent/50",
            )}
          >
            {channel.isPrivate ? <Lock className="h-3.5 w-3.5 shrink-0" /> : <Hash className="h-3.5 w-3.5 shrink-0" />}
            <span className="truncate">{channel.name}</span>
            {!!channel.unreadCount && (
              <span className="ml-auto flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-medium text-primary-foreground">
                {channel.unreadCount}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
}
