import { RolePermissionMatrix } from "@/components/saas/users/role-permission-matrix";
import { mockPermissionMatrix } from "@/data/mock-data";

export default function Example() {
  return <RolePermissionMatrix rows={mockPermissionMatrix} onToggle={(feature, role, value) => console.log(feature, role, value)} />;
}
