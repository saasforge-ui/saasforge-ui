import * as React from "react";
import { Bell, Home, Search, Settings, User } from "lucide-react";
import { MobileBottomNav } from "@/components/saas/navigation/mobile-bottom-nav";

export default function Example() {
  const [activeId, setActiveId] = React.useState("home");

  return (
    <MobileBottomNav
      activeId={activeId}
      onNavigate={setActiveId}
      items={[
        { id: "home", label: "Home", icon: Home },
        { id: "search", label: "Search", icon: Search },
        { id: "alerts", label: "Alerts", icon: Bell },
        { id: "settings", label: "Settings", icon: Settings },
        { id: "profile", label: "Profile", icon: User },
      ]}
    />
  );
}
