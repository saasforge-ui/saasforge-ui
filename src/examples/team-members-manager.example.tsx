import { TeamMembersManager } from "@/components/saas/users/team-members-manager";
import { mockUsers } from "@/data/mock-data";

export default function Example() {
  return (
    <TeamMembersManager
      members={mockUsers}
      onInvite={(email, role) => console.log("invite", email, role)}
      onRoleChange={(member, role) => console.log("role change", member.id, role)}
      onRemove={(member) => console.log("remove", member.id)}
    />
  );
}
