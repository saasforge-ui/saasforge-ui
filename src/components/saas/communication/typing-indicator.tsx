import { cn } from "@/lib/utils";

export interface TypingIndicatorProps {
  users: string[];
  className?: string;
}

function formatLabel(users: string[]) {
  if (users.length === 0) return "";
  if (users.length === 1) return `${users[0]} is typing...`;
  if (users.length === 2) return `${users[0]} and ${users[1]} are typing...`;
  return `${users[0]} and ${users.length - 1} others are typing...`;
}

export function TypingIndicator({ users, className }: TypingIndicatorProps) {
  if (users.length === 0) return null;

  return (
    <div className={cn("flex items-center gap-2 text-sm text-muted-foreground", className)} role="status">
      <span className="flex items-center gap-1 rounded-full bg-muted px-3 py-2">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground"
            style={{ animationDelay: `${i * 150}ms` }}
          />
        ))}
      </span>
      <span>{formatLabel(users)}</span>
    </div>
  );
}
