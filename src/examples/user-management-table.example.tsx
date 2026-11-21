import { UserManagementTable } from "@/components/saas/users/user-management-table";
import { mockUsers } from "@/data/mock-data";

export default function Example() {
  return (
    <UserManagementTable
      users={mockUsers}
      onView={(user) => console.log("view", user)}
      onEdit={(user) => console.log("edit", user)}
      onSuspend={(user) => console.log("suspend", user)}
      onDelete={(user) => console.log("delete", user)}
    />
  );
}
