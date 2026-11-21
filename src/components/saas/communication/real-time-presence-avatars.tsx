import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export type PresenceStatus = "online" | "away" | "idle" | "offline";

export interface PresenceUser {
  id: string;
  name: string;
  avatarUrl?: string;
  status: PresenceStatus;
}

export interface RealTimePresenceAvatarsProps {
  /** People currently viewing the page. */
  users: PresenceUser[];
  /** Max avatars shown before collapsing into a "+N" indicator. */
  maxVisible?: number;
  /**
   * Simulates other people randomly joining/leaving every few seconds using an internal
   * `setInterval`. Set to `false` for deterministic rendering in tests and snapshots.
   */
  simulateActivity?: boolean;
  className?: string;
}

const STATUS_RING: Record<PresenceStatus, string> = {
  online: "ring-success",
  away: "ring-warning",
  idle: "ring-muted-foreground/50",
  offline: "ring-border",
};

const STATUS_LABEL: Record<PresenceStatus, string> = {
  online: "Online",
  away: "Away",
  idle: "Idle",
  offline: "Offline",
};

const MOCK_POOL: PresenceUser[] = [
  { id: "mock-priya", name: "Priya Nair", status: "online" },
  { id: "mock-owen", name: "Owen Clarke", status: "online" },
  { id: "mock-sara", name: "Sara Kim", status: "away" },
  { id: "mock-diego", name: "Diego Alvarez", status: "online" },
  { id: "mock-mina", name: "Mina Cho", status: "idle" },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function RealTimePresenceAvatars({
  users,
  maxVisible = 4,
  simulateActivity = true,
  className,
}: RealTimePresenceAvatarsProps) {
  const [liveUsers, setLiveUsers] = React.useState(users);

  React.useEffect(() => {
    setLiveUsers(users);
  }, [users]);

  React.useEffect(() => {
    if (!simulateActivity) return;

    const interval = window.setInterval(() => {
      setLiveUsers((prev) => {
        const shouldAdd = prev.length < 8 && Math.random() > 0.45;
        if (shouldAdd) {
          const candidates = MOCK_POOL.filter((mock) => !prev.some((user) => user.id === mock.id));
          if (candidates.length === 0) return prev;
          const next = candidates[Math.floor(Math.random() * candidates.length)];
          return [...prev, next];
        }
        const removable = prev.filter((user) => user.id.startsWith("mock-"));
        if (removable.length === 0) return prev;
        const target = removable[Math.floor(Math.random() * removable.length)];
        return prev.filter((user) => user.id !== target.id);
      });
    }, 3500);

    return () => window.clearInterval(interval);
  }, [simulateActivity]);

  const visible = liveUsers.slice(0, maxVisible);
  const overflowCount = Math.max(0, liveUsers.length - maxVisible);

  return (
    <div
      className={cn("flex items-center", className)}
      role="group"
      aria-label={`${liveUsers.length} ${liveUsers.length === 1 ? "person" : "people"} currently viewing this page`}
    >
      <div className="flex -space-x-2">
        {visible.map((user) => (
          <Avatar
            key={user.id}
            title={`${user.name} · ${STATUS_LABEL[user.status]}`}
            className={cn("h-8 w-8 border-2 border-background ring-2", STATUS_RING[user.status])}
          >
            {user.avatarUrl && <AvatarImage src={user.avatarUrl} alt="" />}
            <AvatarFallback>{initials(user.name)}</AvatarFallback>
          </Avatar>
        ))}
      </div>
      {overflowCount > 0 && (
        <span
          title={`${overflowCount} more ${overflowCount === 1 ? "person" : "people"} viewing`}
          className="ml-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-medium text-muted-foreground"
        >
          +{overflowCount}
        </span>
      )}
    </div>
  );
}
