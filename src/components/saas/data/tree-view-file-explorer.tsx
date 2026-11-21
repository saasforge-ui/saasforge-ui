import * as React from "react";
import { ChevronRight, File, Folder, FolderOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TreeNode } from "@/types";

export interface TreeViewFileExplorerProps {
  nodes: TreeNode[];
  onSelect?: (node: TreeNode) => void;
  selectedId?: string;
  className?: string;
}

function Node({
  node,
  depth,
  onSelect,
  selectedId,
}: {
  node: TreeNode;
  depth: number;
  onSelect?: (node: TreeNode) => void;
  selectedId?: string;
}) {
  const [open, setOpen] = React.useState(depth === 0);
  const isFolder = node.type === "folder";
  const isSelected = node.id === selectedId;

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          if (isFolder) setOpen((o) => !o);
          onSelect?.(node);
        }}
        style={{ paddingLeft: `${depth * 1.25 + 0.5}rem` }}
        className={cn(
          "flex w-full items-center gap-1.5 rounded-md py-1.5 pr-2 text-left text-sm hover:bg-accent",
          isSelected && "bg-accent font-medium",
        )}
      >
        {isFolder ? (
          <ChevronRight className={cn("h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform", open && "rotate-90")} />
        ) : (
          <span className="w-3.5 shrink-0" />
        )}
        {isFolder ? (
          open ? (
            <FolderOpen className="h-4 w-4 shrink-0 text-muted-foreground" />
          ) : (
            <Folder className="h-4 w-4 shrink-0 text-muted-foreground" />
          )
        ) : (
          <File className="h-4 w-4 shrink-0 text-muted-foreground" />
        )}
        <span className="truncate">{node.name}</span>
      </button>
      {isFolder && open && node.children?.map((child) => (
        <Node key={child.id} node={child} depth={depth + 1} onSelect={onSelect} selectedId={selectedId} />
      ))}
    </div>
  );
}

export function TreeViewFileExplorer({ nodes, onSelect, selectedId, className }: TreeViewFileExplorerProps) {
  return (
    <div className={cn("w-full max-w-sm text-left", className)}>
      {nodes.map((node) => (
        <Node key={node.id} node={node} depth={0} onSelect={onSelect} selectedId={selectedId} />
      ))}
    </div>
  );
}
