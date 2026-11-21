import * as React from "react";
import { CheckCircle2, Loader2, ThumbsDown, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type FeedbackRating = "positive" | "negative";

export interface FeedbackWidgetProps {
  onSubmit: (rating: FeedbackRating, comment: string) => void;
  isSubmitting?: boolean;
  isSubmitted?: boolean;
  className?: string;
}

export function FeedbackWidget({ onSubmit, isSubmitting = false, isSubmitted = false, className }: FeedbackWidgetProps) {
  const [rating, setRating] = React.useState<FeedbackRating | null>(null);
  const [comment, setComment] = React.useState("");

  if (isSubmitted) {
    return (
      <div className={cn("flex w-full max-w-sm flex-col items-center gap-2 rounded-lg border border-border p-6 text-center", className)}>
        <CheckCircle2 className="h-6 w-6 text-success" aria-hidden="true" />
        <p className="text-sm font-medium">Thanks for your feedback!</p>
      </div>
    );
  }

  return (
    <div className={cn("w-full max-w-sm space-y-3 rounded-lg border border-border p-4 text-left", className)}>
      <p className="text-sm font-medium">Was this helpful?</p>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setRating("positive")}
          aria-pressed={rating === "positive"}
          aria-label="Helpful"
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-md border",
            rating === "positive" ? "border-success bg-success/10 text-success" : "border-border text-muted-foreground hover:bg-accent",
          )}
        >
          <ThumbsUp className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => setRating("negative")}
          aria-pressed={rating === "negative"}
          aria-label="Not helpful"
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-md border",
            rating === "negative" ? "border-destructive bg-destructive/10 text-destructive" : "border-border text-muted-foreground hover:bg-accent",
          )}
        >
          <ThumbsDown className="h-4 w-4" />
        </button>
      </div>
      {rating && (
        <>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Anything else you'd like to share? (optional)"
            rows={3}
            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          <Button
            size="sm"
            className="w-full"
            disabled={isSubmitting}
            onClick={() => onSubmit(rating, comment)}
          >
            {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
            Submit feedback
          </Button>
        </>
      )}
    </div>
  );
}
