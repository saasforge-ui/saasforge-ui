import * as React from "react";
import { AiPromptInput } from "@/components/free/ai-prompt-input";

const models = [
  { value: "fast", label: "Fast" },
  { value: "balanced", label: "Balanced" },
  { value: "reasoning", label: "Deep reasoning" },
];

export default function Example() {
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [lastPrompt, setLastPrompt] = React.useState<string | null>(null);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  React.useEffect(() => () => clearTimeout(timeoutRef.current), []);

  return (
    <div className="mx-auto w-full max-w-xl space-y-3">
      <AiPromptInput
        models={models}
        isGenerating={isGenerating}
        onSubmit={(value, attachments) => {
          setLastPrompt(attachments.length ? `${value} (+${attachments.length} file${attachments.length > 1 ? "s" : ""})` : value);
          setIsGenerating(true);
          timeoutRef.current = setTimeout(() => setIsGenerating(false), 3000);
        }}
        onStop={() => {
          clearTimeout(timeoutRef.current);
          setIsGenerating(false);
        }}
      />
      <p className="truncate text-xs text-muted-foreground">
        {lastPrompt ? `${isGenerating ? "Generating a reply to" : "Last prompt"}: "${lastPrompt}"` : "Type a prompt and press Enter."}
      </p>
    </div>
  );
}
