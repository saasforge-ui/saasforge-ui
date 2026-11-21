import * as React from "react";
import { KeyRound, LayoutDashboard, ShieldCheck, Users } from "lucide-react";
import { VerticalNavSidebar } from "@/components/saas/navigation/vertical-nav-sidebar";
import { OrganizationSwitcher } from "@/components/saas/settings/organization-switcher";
import { UserManagementTable } from "@/components/saas/users/user-management-table";
import { TeamMembersManager } from "@/components/saas/users/team-members-manager";
import { RolePermissionMatrix } from "@/components/saas/users/role-permission-matrix";
import { ApiKeyManager } from "@/components/saas/settings/api-key-manager";
import { mockApiKeys, mockOrganizations, mockPermissionMatrix, mockUsers } from "@/data/mock-data";

/**
 * Admin & Users Panel — a full-page template composed entirely from existing
 * SaaSForge UI Pro components. Vertical Nav Sidebar provides the page chrome;
 * User Management Table, Team Members Manager, Role & Permission Matrix,
 * Organization Switcher and API Key Manager make up the content.
 */
export default function AdminUsersPanelTemplate() {
  const [activeNavId, setActiveNavId] = React.useState("users");
  const [activeOrgId, setActiveOrgId] = React.useState(mockOrganizations[0].id);

  return (
    <div className="flex min-h-screen w-full bg-background text-foreground">
      <aside className="hidden w-60 shrink-0 border-r border-border p-4 lg:block">
        <VerticalNavSidebar
          activeId={activeNavId}
          onNavigate={setActiveNavId}
          sections={[
            {
              items: [{ id: "overview", label: "Overview", icon: LayoutDashboard }],
            },
            {
              title: "Administration",
              items: [
                { id: "users", label: "Users", icon: Users },
                { id: "roles", label: "Roles & permissions", icon: ShieldCheck },
                { id: "api-keys", label: "API keys", icon: KeyRound },
              ],
            },
          ]}
        />
      </aside>

      <div className="min-w-0 flex-1">
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-6 py-4">
          <div>
            <h1 className="text-lg font-semibold tracking-tight">Admin &amp; Users</h1>
            <p className="text-sm text-muted-foreground">Manage users, teams, permissions and API access</p>
          </div>
          <OrganizationSwitcher
            organizations={mockOrganizations}
            activeOrgId={activeOrgId}
            onSwitchOrg={setActiveOrgId}
            onCreateOrg={() => console.log("create organization")}
          />
        </header>

        <main className="space-y-8 p-6">
          <section className="space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">All users</h2>
            <UserManagementTable users={mockUsers} />
          </section>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <section className="space-y-3">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Team members</h2>
              <TeamMembersManager
                members={mockUsers.slice(0, 4)}
                onInvite={(email, role) => console.log("invite", email, role)}
                onRoleChange={(member, role) => console.log("role change", member.id, role)}
                onRemove={(member) => console.log("remove", member.id)}
                className="max-w-none"
              />
            </section>
            <section className="space-y-3">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Role &amp; permission matrix</h2>
              <RolePermissionMatrix rows={mockPermissionMatrix} onToggle={(feature, role, value) => console.log(feature, role, value)} />
            </section>
          </div>

          <section className="space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">API keys</h2>
            <ApiKeyManager
              apiKeys={mockApiKeys}
              onCreate={() => console.log("create key")}
              onRevoke={(key) => console.log("revoke", key.id)}
              onCopy={(key) => console.log("copy", key.id)}
            />
          </section>
        </main>
      </div>
    </div>
  );
}
