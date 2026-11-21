import * as React from "react";
import { StickyTableOfContents } from "@/components/saas/navigation/sticky-table-of-contents";

export default function Example() {
  const [activeId, setActiveId] = React.useState("installation");

  return (
    <StickyTableOfContents
      activeId={activeId}
      onNavigate={setActiveId}
      items={[
        { id: "overview", label: "Overview" },
        { id: "installation", label: "Installation" },
        { id: "usage", label: "Usage" },
        { id: "props", label: "Props", level: 2 },
        { id: "examples", label: "Examples", level: 2 },
      ]}
    />
  );
}
