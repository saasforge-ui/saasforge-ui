import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn, formatRelativeTime } from "@/lib/utils";
import type { CommentItem } from "@/types";

export interface CommentThreadProps {
  comments: CommentItem[];
  onReply?: (parentId: string, content: string) => void;
  onSubmit?: (content: string) => void;
  className?: string;
}

function Comment({ comment, onReply, depth = 0 }: { comment: CommentItem; onReply?: (parentId: string, content: string) => void; depth?: number }) {
  const [replying, setReplying] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <div className={cn(depth > 0 && "ml-10 mt-3 border-l border-border pl-4")}>
      <div className="flex gap-2.5">
        <Avatar className="h-8 w-8">
          {comment.author.avatarUrl && <AvatarImage src={comment.author.avatarUrl} alt="" />}
          <AvatarFallback>{comment.author.name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-2">
            <p className="text-sm font-medium">{comment.author.name}</p>
            <p className="text-xs text-muted-foreground">{formatRelativeTime(comment.timestamp)}</p>
          </div>
          <p className="mt-0.5 text-sm text-muted-foreground">{comment.content}</p>
          {onReply && (
            <button
              type="button"
              onClick={() => setReplying((r) => !r)}
              className="mt-1 text-xs font-medium text-muted-foreground hover:text-foreground"
            >
              Reply
            </button>
          )}
          {replying && (
            <div className="mt-2 flex gap-2">
              <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Write a reply..."
                className="h-8 text-sm"
              />
              <Button
                size="sm"
                disabled={!value}
                onClick={() => {
                  onReply?.(comment.id, value);
                  setValue("");
                  setReplying(false);
                }}
              >
                Reply
              </Button>
            </div>
          )}
        </div>
      </div>
      {comment.replies?.map((reply) => (
        <Comment key={reply.id} comment={reply} onReply={onReply} depth={depth + 1} />
      ))}
    </div>
  );
}

export function CommentThread({ comments, onReply, onSubmit, className }: CommentThreadProps) {
  const [value, setValue] = React.useState("");

  return (
    <div className={cn("w-full max-w-lg space-y-4 text-left", className)}>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} onReply={onReply} />
      ))}
      {onSubmit && (
        <div className="flex gap-2 border-t border-border pt-4">
          <Input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Add a comment..." />
          <Button
            disabled={!value}
            onClick={() => {
              onSubmit(value);
              setValue("");
            }}
          >
            Post
          </Button>
        </div>
      )}
    </div>
  );
}
