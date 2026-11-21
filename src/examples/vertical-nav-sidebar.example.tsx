import * as React from "react";
import { BarChart3, CreditCard, LayoutDashboard, Settings, Users } from "lucide-react";
import { VerticalNavSidebar } from "@/components/saas/navigation/vertical-nav-sidebar";

export default function Example() {
  const [activeId, setActiveId] = React.useState("dashboard");

  return (
    <VerticalNavSidebar
      activeId={activeId}
      onNavigate={setActiveId}
      sections={[
        {
          items: [
            { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
            { id: "analytics", label: "Analytics", icon: BarChart3 },
          ],
        },
        {
          title: "Workspace",
          items: [
            { id: "team", label: "Team", icon: Users },
            { id: "billing", label: "Billing", icon: CreditCard },
            { id: "settings", label: "Settings", icon: Settings },
          ],
        },
      ]}
    />
  );
}
