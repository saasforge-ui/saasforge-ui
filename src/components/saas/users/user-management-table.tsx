import * as React from "react";
import { AlertTriangle, MoreHorizontal, Search, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EmptyState } from "@/components/saas/utilities/empty-state";
import { cn, formatRelativeTime } from "@/lib/utils";
import type { SaaSUser, UserRole, UserStatus } from "@/types";

export interface UserManagementTableProps {
  /** Full user dataset. Search, role/status filtering and pagination are computed client-side. */
  users: SaaSUser[];
  /** Rows per page (default 5). */
  pageSize?: number;
  isLoading?: boolean;
  /** Error message. When set, an error state replaces the table. */
  error?: string;
  onRetry?: () => void;
  onView?: (user: SaaSUser) => void;
  onEdit?: (user: SaaSUser) => void;
  onSuspend?: (user: SaaSUser) => void;
  onDelete?: (user: SaaSUser) => void;
  className?: string;
}

const statusVariant: Record<UserStatus, "success" | "secondary" | "destructive"> = {
  active: "success",
  invited: "secondary",
  suspended: "destructive",
};

const roles: UserRole[] = ["Owner", "Admin", "Member", "Viewer"];
const statuses: UserStatus[] = ["active", "invited", "suspended"];

export function UserManagementTable({
  users,
  pageSize = 5,
  isLoading = false,
  error,
  onRetry,
  onView,
  onEdit,
  onSuspend,
  onDelete,
  className,
}: UserManagementTableProps) {
  const [query, setQuery] = React.useState("");
  const [roleFilter, setRoleFilter] = React.useState<UserRole | "all">("all");
  const [statusFilter, setStatusFilter] = React.useState<UserStatus | "all">("all");
  const [page, setPage] = React.useState(1);

  const filtered = React.useMemo(() => {
    return users.filter((user) => {
      const matchesQuery =
        query === "" ||
        user.name.toLowerCase().includes(query.toLowerCase()) ||
        user.email.toLowerCase().includes(query.toLowerCase());
      const matchesRole = roleFilter === "all" || user.role === roleFilter;
      const matchesStatus = statusFilter === "all" || user.status === statusFilter;
      return matchesQuery && matchesRole && matchesStatus;
    });
  }, [users, query, roleFilter, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paged = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  React.useEffect(() => {
    setPage(1);
  }, [query, roleFilter, statusFilter]);

  if (isLoading) {
    return (
      <div className={cn("w-full space-y-3", className)}>
        <Skeleton className="h-9 w-full max-w-sm" />
        <div className="space-y-2 rounded-lg border border-border p-3">
          {Array.from({ length: pageSize }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn("flex flex-col items-center gap-3 rounded-lg border border-dashed border-border p-10 text-center", className)}>
        <AlertTriangle className="h-8 w-8 text-destructive" aria-hidden="true" />
        <div>
          <p className="font-medium">Couldn't load users</p>
          <p className="mt-1 text-sm text-muted-foreground">{error}</p>
        </div>
        {onRetry && (
          <Button size="sm" variant="outline" onClick={onRetry}>
            Try again
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className={cn("w-full", className)}>
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <div className="relative min-w-48 flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name or email..."
            className="pl-10"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search users"
          />
        </div>
        <Select value={roleFilter} onValueChange={(v) => setRoleFilter(v as UserRole | "all")}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All roles</SelectItem>
            {roles.map((role) => (
              <SelectItem key={role} value={role}>
                {role}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as UserStatus | "all")}>
          <SelectTrigger className="w-36">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            {statuses.map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No users found"
          description="Try adjusting your search or filters."
        />
      ) : (
        <>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-left text-xs uppercase text-muted-foreground">
                <tr>
                  <th className="px-4 py-2 font-medium">User</th>
                  <th className="hidden px-4 py-2 font-medium sm:table-cell">Role</th>
                  <th className="px-4 py-2 font-medium">Status</th>
                  <th className="hidden px-4 py-2 font-medium md:table-cell">Last active</th>
                  <th className="px-4 py-2" />
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {paged.map((user) => (
                  <tr key={user.id}>
                    <td className="px-4 py-2">
                      <div className="flex items-center gap-2.5">
                        <Avatar className="h-8 w-8">
                          {user.avatarUrl && <AvatarImage src={user.avatarUrl} alt="" />}
                          <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <p className="truncate font-medium">{user.name}</p>
                          <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="hidden px-4 py-2 text-muted-foreground sm:table-cell">{user.role}</td>
                    <td className="px-4 py-2">
                      <Badge variant={statusVariant[user.status]}>{user.status}</Badge>
                    </td>
                    <td className="hidden px-4 py-2 text-muted-foreground md:table-cell">
                      {formatRelativeTime(user.lastActiveAt)}
                    </td>
                    <td className="px-4 py-2 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            aria-label={`Actions for ${user.name}`}
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => onView?.(user)}>View</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onEdit?.(user)}>Edit</DropdownMenuItem>
                          {user.status !== "suspended" && (
                            <DropdownMenuItem onClick={() => onSuspend?.(user)}>Suspend</DropdownMenuItem>
                          )}
                          <DropdownMenuItem variant="destructive" onClick={() => onDelete?.(user)}>
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="mt-3 flex items-center justify-between text-sm text-muted-foreground">
              <span>
                Page {currentPage} of {totalPages} · {filtered.length} users
              </span>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
