import { FolderPlus } from "lucide-react";
import { EmptyState } from "@/components/free/empty-state";

export default function Example() {
  return (
    <EmptyState
      icon={FolderPlus}
      title="No projects yet"
      description="Create your first project to get started."
      primaryAction={{ label: "Create project", onClick: () => {} }}
    />
  );
}
