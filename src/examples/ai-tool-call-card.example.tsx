import * as React from "react";
import { Database, Globe, Mail } from "lucide-react";
import { AiToolCallCard } from "@/components/saas/ai/ai-tool-call-card";
import type { ToolCallStatus } from "@/components/saas/ai/ai-tool-call-card";

export default function Example() {
  const [searchStatus, setSearchStatus] = React.useState<ToolCallStatus>("running");
  const [emailStatus, setEmailStatus] = React.useState<ToolCallStatus>("error");
  const retryTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  React.useEffect(() => {
    const timeout = setTimeout(() => setSearchStatus("success"), 2200);
    return () => {
      clearTimeout(timeout);
      clearTimeout(retryTimeoutRef.current);
    };
  }, []);

  const retryEmail = () => {
    setEmailStatus("running");
    retryTimeoutRef.current = setTimeout(() => setEmailStatus("success"), 1600);
  };

  return (
    <div className="mx-auto w-full max-w-xl space-y-3">
      <AiToolCallCard
        name="query_database"
        description="Revenue by plan, last 30 days"
        icon={Database}
        status="success"
        durationMs={412}
        args={{ table: "invoices", groupBy: "plan", range: "30d" }}
        result={{ rows: [{ plan: "Starter", mrr: 4820 }, { plan: "Pro", mrr: 18240 }, { plan: "Enterprise", mrr: 31000 }] }}
        defaultExpanded={["result"]}
      />
      <AiToolCallCard
        name="web_search"
        description="Competitor pricing pages"
        icon={Globe}
        status={searchStatus}
        durationMs={2180}
        args={{ query: "saas analytics pricing 2026", limit: 5 }}
        result={{ results: 5, top: "https://example.com/pricing" }}
      />
      <AiToolCallCard
        name="send_email"
        icon={Mail}
        status={emailStatus}
        durationMs={1580}
        args={{ to: "team@acme.dev", subject: "Weekly revenue summary" }}
        result={{ id: "msg_8f2a", delivered: true }}
        error="SMTP timeout after 10s: mail.acme.dev did not respond."
        onRetry={retryEmail}
      />
    </div>
  );
}
