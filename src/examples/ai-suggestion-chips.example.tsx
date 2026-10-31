import * as React from "react";
import { BarChart3, Lightbulb, Mail, PenLine } from "lucide-react";
import { AiSuggestionChips } from "@/components/free/ai-suggestion-chips";

export default function Example() {
  const [selected, setSelected] = React.useState<string | null>(null);

  return (
    <div className="mx-auto w-full max-w-xl space-y-4">
      <AiSuggestionChips
        showTitle
        title="Try asking"
        onSelect={setSelected}
        suggestions={[
          { text: "Summarize last week's revenue and highlight anomalies", label: "Summarize revenue", icon: BarChart3 },
          { text: "Draft a follow-up email to churned customers", label: "Draft a win-back email", icon: Mail },
          { text: "Suggest three onboarding improvements", label: "Improve onboarding", icon: Lightbulb },
          { text: "Rewrite our pricing page headline", label: "Rewrite a headline", icon: PenLine },
          "What changed in the last release?",
        ]}
      />
      <p className="truncate text-xs text-muted-foreground">{selected ? `Selected: "${selected}"` : "Pick a suggestion."}</p>
    </div>
  );
}
