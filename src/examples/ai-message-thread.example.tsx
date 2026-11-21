import * as React from "react";
import { AiMessageThread } from "@/components/saas/ai/ai-message-thread";
import type { ThreadMessage } from "@/components/saas/ai/ai-message-thread";

const demoReplies = [
  "Your churn rose from 2.1% to 3.4% last month. Most of the increase came from annual Starter plans reaching renewal without an onboarding call. I'd start with a renewal reminder 14 days out and a one-click downgrade instead of cancel.",
  "Here's a quick plan:\n\n1. Tag accounts renewing in the next 30 days.\n2. Trigger a check-in email from their account owner.\n3. Offer a downgrade path before the cancel button.\n\nWant me to draft the email?",
];

const demoPrompts = ["Why did churn go up last month?", "What should we do about it?"];

export default function Example() {
  const [messages, setMessages] = React.useState<ThreadMessage[]>([
    { id: "m1", role: "user", content: "Give me a one-line summary of this week's signups." },
    { id: "m2", role: "assistant", content: "You had 412 signups this week, up 18% on last week, with most coming from the new pricing page." },
  ]);
  const [turn, setTurn] = React.useState(0);
  const intervalRef = React.useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const isStreaming = messages.some((message) => message.isStreaming);

  React.useEffect(() => () => clearInterval(intervalRef.current), []);

  // Reveals the reply a couple of words at a time to simulate token streaming.
  const stream = (id: string, fullText: string) => {
    const words = fullText.split(/(\s+)/);
    let index = 0;
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      index += 2;
      const done = index >= words.length;
      setMessages((prev) =>
        prev.map((message) => (message.id === id ? { ...message, content: words.slice(0, index).join(""), isStreaming: !done } : message)),
      );
      if (done) clearInterval(intervalRef.current);
    }, 45);
  };

  const ask = () => {
    const replyIndex = turn % demoReplies.length;
    const assistantId = `a-${Date.now()}`;
    setMessages((prev) => [
      ...prev,
      { id: `u-${Date.now()}`, role: "user", content: demoPrompts[replyIndex] },
      { id: assistantId, role: "assistant", content: "", isStreaming: true },
    ]);
    setTurn((value) => value + 1);
    stream(assistantId, demoReplies[replyIndex]);
  };

  const regenerate = (id: string) => {
    const original = messages.find((message) => message.id === id)?.content || demoReplies[0];
    setMessages((prev) => prev.map((message) => (message.id === id ? { ...message, content: "", isStreaming: true } : message)));
    stream(id, original);
  };

  return (
    <div className="mx-auto w-full max-w-2xl space-y-3">
      <AiMessageThread messages={messages} onRegenerate={regenerate} />
      <button
        type="button"
        onClick={ask}
        disabled={isStreaming}
        className="rounded-md border border-border px-3 py-1.5 text-sm font-medium outline-none transition-[background-color,scale] duration-150 ease-out-strong hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50"
      >
        {isStreaming ? "Streaming…" : "Ask a follow-up"}
      </button>
    </div>
  );
}
