import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import type { PermissionMatrixRow, UserRole } from "@/types";

export interface RolePermissionMatrixProps {
  rows: PermissionMatrixRow[];
  roles?: UserRole[];
  isLoading?: boolean;
  /** Omit to render a read-only matrix; provide to make checkboxes interactive. */
  onToggle?: (feature: string, role: UserRole, value: boolean) => void;
  className?: string;
}

const defaultRoles: UserRole[] = ["Owner", "Admin", "Member", "Viewer"];

export function RolePermissionMatrix({
  rows,
  roles = defaultRoles,
  isLoading = false,
  onToggle,
  className,
}: RolePermissionMatrixProps) {
  if (isLoading) {
    return (
      <div className={cn("w-full space-y-2", className)}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className={cn("w-full overflow-x-auto rounded-lg border border-border text-left", className)}>
      <table className="w-full text-sm">
        <thead className="bg-muted/50 text-left text-xs uppercase text-muted-foreground">
          <tr>
            <th className="px-4 py-2 font-medium">Feature</th>
            {roles.map((role) => (
              <th key={role} className="px-4 py-2 text-center font-medium">
                {role}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map((row) => (
            <tr key={row.feature}>
              <td className="px-4 py-2 font-medium">{row.feature}</td>
              {roles.map((role) => (
                <td key={role} className="px-4 py-2 text-center">
                  <Checkbox
                    checked={row.roles[role] ?? false}
                    disabled={!onToggle}
                    onCheckedChange={(checked) => onToggle?.(row.feature, role, checked === true)}
                    aria-label={`${role}: ${row.feature}`}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
