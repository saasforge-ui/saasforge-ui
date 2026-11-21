import { TreeViewFileExplorer } from "@/components/saas/data/tree-view-file-explorer";

export default function Example() {
  return (
    <TreeViewFileExplorer
      onSelect={(node) => console.log("selected", node)}
      nodes={[
        {
          id: "src",
          name: "src",
          type: "folder",
          children: [
            {
              id: "components",
              name: "components",
              type: "folder",
              children: [
                { id: "button", name: "button.tsx", type: "file" },
                { id: "card", name: "card.tsx", type: "file" },
              ],
            },
            { id: "app", name: "App.tsx", type: "file" },
          ],
        },
        { id: "readme", name: "README.md", type: "file" },
      ]}
    />
  );
}
