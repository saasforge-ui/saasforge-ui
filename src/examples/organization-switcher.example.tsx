import { OrganizationSwitcher } from "@/components/saas/settings/organization-switcher";
import { mockOrganizations } from "@/data/mock-data";

export default function Example() {
  return (
    <OrganizationSwitcher
      organizations={mockOrganizations}
      activeOrgId={mockOrganizations[0].id}
      onSwitchOrg={(orgId) => console.log("switch to", orgId)}
      onCreateOrg={() => console.log("create organization")}
    />
  );
}
