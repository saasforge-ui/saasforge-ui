import * as React from "react";
import { Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EmptyState } from "@/components/saas/utilities/empty-state";
import { cn } from "@/lib/utils";
import type { SaaSUser, UserRole, UserStatus } from "@/types";

export interface TeamMembersManagerProps {
  members: SaaSUser[];
  isLoading?: boolean;
  invitableRoles?: UserRole[];
  onInvite?: (email: string, role: UserRole) => void;
  onRoleChange?: (member: SaaSUser, role: UserRole) => void;
  onRemove?: (member: SaaSUser) => void;
  className?: string;
}

const statusVariant: Record<UserStatus, "success" | "secondary" | "destructive"> = {
  active: "success",
  invited: "secondary",
  suspended: "destructive",
};

export function TeamMembersManager({
  members,
  isLoading = false,
  invitableRoles = ["Admin", "Member", "Viewer"],
  onInvite,
  onRoleChange,
  onRemove,
  className,
}: TeamMembersManagerProps) {
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [role, setRole] = React.useState<UserRole>(invitableRoles[0] ?? "Member");

  const handleInvite = () => {
    if (!email) return;
    onInvite?.(email, role);
    setEmail("");
    setOpen(false);
  };

  if (isLoading) {
    return (
      <div className={cn("w-full max-w-lg space-y-2", className)}>
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-14 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className={cn("w-full max-w-lg text-left", className)}>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold">Team members</h3>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm">Invite member</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite a team member</DialogTitle>
              <DialogDescription>They'll receive an email invitation to join this workspace.</DialogDescription>
            </DialogHeader>
            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label htmlFor="invite-email">Email</Label>
                <Input
                  id="invite-email"
                  type="email"
                  placeholder="teammate@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="invite-role">Role</Label>
                <Select value={role} onValueChange={(v) => setRole(v as UserRole)}>
                  <SelectTrigger id="invite-role">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {invitableRoles.map((r) => (
                      <SelectItem key={r} value={r}>
                        {r}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleInvite} disabled={!email}>
                Send invite
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {members.length === 0 ? (
        <EmptyState icon={Users} title="No team members yet" description="Invite your first teammate to get started." />
      ) : (
        <div className="divide-y divide-border rounded-lg border border-border">
          {members.map((member) => (
            <div key={member.id} className="flex flex-wrap items-center justify-between gap-3 p-4">
              <div className="flex min-w-0 items-center gap-3">
                <Avatar className="h-8 w-8">
                  {member.avatarUrl && <AvatarImage src={member.avatarUrl} alt="" />}
                  <AvatarFallback>{member.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{member.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{member.email}</p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Badge variant={statusVariant[member.status]}>{member.status}</Badge>
                {onRoleChange ? (
                  <Select value={member.role} onValueChange={(v) => onRoleChange(member, v as UserRole)}>
                    <SelectTrigger className="h-8 w-28 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {(["Owner", "Admin", "Member", "Viewer"] satisfies UserRole[]).map((r) => (
                        <SelectItem key={r} value={r}>
                          {r}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <span className="text-xs text-muted-foreground">{member.role}</span>
                )}
                {onRemove && member.role !== "Owner" && (
                  <Button variant="ghost" size="sm" onClick={() => onRemove(member)}>
                    Remove
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
