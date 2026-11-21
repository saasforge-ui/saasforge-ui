import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { KanbanCard, KanbanColumn } from "@/types";

export interface KanbanBoardProps {
  columns: KanbanColumn[];
  onCardClick?: (columnId: string, card: KanbanCard) => void;
  className?: string;
}

export function KanbanBoard({ columns, onCardClick, className }: KanbanBoardProps) {
  return (
    <div className={cn("flex w-full gap-4 overflow-x-auto text-left", className)}>
      {columns.map((column) => (
        <div key={column.id} className="w-64 shrink-0 rounded-lg bg-muted/40 p-3">
          <div className="mb-3 flex items-center justify-between px-1">
            <p className="text-sm font-semibold">{column.title}</p>
            <span className="text-xs text-muted-foreground">{column.cards.length}</span>
          </div>
          <div className="space-y-2">
            {column.cards.map((card) => (
              <Card
                key={card.id}
                className={cn("cursor-pointer", onCardClick && "hover:border-primary/40")}
                onClick={() => onCardClick?.(column.id, card)}
              >
                <CardContent className="space-y-2 p-3">
                  <p className="text-sm font-medium">{card.title}</p>
                  {card.description && <p className="text-xs text-muted-foreground">{card.description}</p>}
                  {card.labels && card.labels.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {card.labels.map((label) => (
                        <Badge key={label} variant="secondary">
                          {label}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
