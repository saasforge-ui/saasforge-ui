import * as React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface MentionableUser {
  id: string;
  name: string;
}

export interface MentionAutocompleteInputProps {
  users: MentionableUser[];
  placeholder?: string;
  onSubmit: (content: string, mentionedIds: string[]) => void;
  className?: string;
}

export function MentionAutocompleteInput({
  users,
  placeholder = "Write a comment... use @ to mention someone",
  onSubmit,
  className,
}: MentionAutocompleteInputProps) {
  const [value, setValue] = React.useState("");
  const [mentioned, setMentioned] = React.useState<string[]>([]);

  const mentionQuery = React.useMemo(() => {
    const match = value.match(/@([\w]*)$/);
    return match ? match[1] : null;
  }, [value]);

  const suggestions = React.useMemo(() => {
    if (mentionQuery === null) return [];
    return users.filter((u) => u.name.toLowerCase().includes(mentionQuery.toLowerCase())).slice(0, 5);
  }, [mentionQuery, users]);

  function selectUser(user: MentionableUser) {
    setValue((v) => v.replace(/@([\w]*)$/, `@${user.name} `));
    setMentioned((prev) => (prev.includes(user.id) ? prev : [...prev, user.id]));
  }

  function handleSubmit() {
    if (!value.trim()) return;
    onSubmit(value, mentioned);
    setValue("");
    setMentioned([]);
  }

  return (
    <div className={cn("relative w-full max-w-md", className)}>
      <div className="flex gap-2">
        <Input value={value} onChange={(e) => setValue(e.target.value)} placeholder={placeholder} />
        <Button disabled={!value.trim()} onClick={handleSubmit}>
          Post
        </Button>
      </div>

      {suggestions.length > 0 && (
        <div className="absolute left-0 top-full z-10 mt-1 w-56 rounded-md border border-border bg-popover p-1 shadow-md">
          {suggestions.map((user) => (
            <button
              key={user.id}
              type="button"
              onClick={() => selectUser(user)}
              className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm hover:bg-accent"
            >
              <Avatar className="h-5 w-5">
                <AvatarFallback className="text-[10px]">{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              {user.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
