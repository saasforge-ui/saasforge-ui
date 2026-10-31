import * as React from "react";
import { LayoutGroup } from "framer-motion";
import { Check, Copy, FileCode } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export interface CodeTab {
  /** Unique tab id. Defaults to `label`. */
  value?: string;
  label: string;
  code: string;
  /** Shown in the header above the code, e.g. "src/app.tsx". */
  filename?: string;
}

export interface CodeBlockTabsProps {
  tabs: CodeTab[];
  defaultValue?: string;
  showLineNumbers?: boolean;
  /** Max height of the code area before it scrolls vertically, e.g. "24rem". */
  maxHeight?: string;
  onCopy?: (tab: CodeTab) => void;
  className?: string;
}

const COPIED_MS = 1600;

function useCopyToClipboard() {
  const [copied, setCopied] = React.useState(false);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  React.useEffect(() => () => clearTimeout(timeoutRef.current), []);

  const copy = React.useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      return false;
    }
    setCopied(true);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setCopied(false), COPIED_MS);
    return true;
  }, []);

  return { copied, copy };
}

function CodeLines({ code, showLineNumbers, maxHeight }: { code: string; showLineNumbers: boolean; maxHeight?: string }) {
  const lines = code.replace(/\n$/, "").split("\n");
  const gutterWidth = `${String(lines.length).length + 1}ch`;

  return (
    <pre
      tabIndex={0}
      aria-label="Code"
      className="scrollbar-thin overflow-auto py-3 font-mono text-[13px] leading-6 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
      style={{ maxHeight }}
    >
      <code className="inline-block min-w-full">
        {lines.map((line, index) => (
          <span key={index} className="flex">
            {showLineNumbers && (
              <span
                aria-hidden="true"
                className="sticky left-0 shrink-0 select-none bg-muted/40 pl-4 pr-3 text-right text-muted-foreground/60 backdrop-blur-sm"
                style={{ minWidth: `calc(${gutterWidth} + 1.75rem)` }}
              >
                {index + 1}
              </span>
            )}
            <span className={cn("whitespace-pre pr-4", !showLineNumbers && "pl-4")}>{line || " "}</span>
          </span>
        ))}
      </code>
    </pre>
  );
}

export function CodeBlockTabs({ tabs, defaultValue, showLineNumbers = true, maxHeight, onCopy, className }: CodeBlockTabsProps) {
  const normalized = tabs.map((tab) => ({ ...tab, value: tab.value ?? tab.label }));
  const [active, setActive] = React.useState(defaultValue ?? normalized[0]?.value ?? "");
  const { copied, copy } = useCopyToClipboard();
  const groupId = React.useId();

  const activeTab = normalized.find((tab) => tab.value === active) ?? normalized[0];

  if (!activeTab) {
    return (
      <div className={cn("rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground", className)}>
        No code to display.
      </div>
    );
  }

  const handleCopy = async () => {
    if (await copy(activeTab.code)) onCopy?.(activeTab);
  };

  return (
    // LayoutGroup scopes the shared Tabs' active-pill layoutId so multiple code blocks on a page don't animate into each other.
    <LayoutGroup id={groupId}>
      <Tabs
        value={activeTab.value}
        onValueChange={setActive}
        className={cn("w-full overflow-hidden rounded-lg border border-border bg-muted/40 text-foreground", className)}
      >
        <div className="flex items-center gap-2 border-b border-border bg-background/60 px-2 py-1.5">
          {normalized.length > 1 ? (
            <TabsList aria-label="Language" className="h-8 shrink-0 bg-transparent p-0">
              {normalized.map((tab) => (
                <TabsTrigger key={tab.value} value={tab.value} className="h-7 px-2.5 text-xs">
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          ) : (
            <span className="px-2 text-xs font-medium text-muted-foreground">{activeTab.label}</span>
          )}

          {activeTab.filename && (
            <span className="flex min-w-0 items-center gap-1.5 border-l border-border pl-2 text-xs text-muted-foreground">
              <FileCode className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span className="truncate font-mono" title={activeTab.filename}>
                {activeTab.filename}
              </span>
            </span>
          )}

          <button
            type="button"
            onClick={handleCopy}
            aria-label={copied ? "Copied" : "Copy code"}
            className="relative ml-auto inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-muted-foreground outline-none transition-[background-color,color,scale] duration-150 ease-out-strong hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.97]"
          >
            <Copy
              aria-hidden="true"
              className={cn(
                "absolute h-3.5 w-3.5 transition-[opacity,filter,scale] duration-200 ease-out-strong",
                copied && "scale-90 opacity-0 blur-[2px]",
              )}
            />
            <Check
              aria-hidden="true"
              className={cn(
                "absolute h-3.5 w-3.5 text-success transition-[opacity,filter,scale] duration-200 ease-out-strong",
                !copied && "scale-90 opacity-0 blur-[2px]",
              )}
            />
          </button>
          <span role="status" className="sr-only">
            {copied ? "Code copied to clipboard" : ""}
          </span>
        </div>

        {normalized.map((tab) => (
          // The <pre> is the focusable scroll region, so the panel itself stays out of the tab order.
          <TabsContent key={tab.value} value={tab.value} tabIndex={-1} className="mt-0">

            <CodeLines code={tab.code} showLineNumbers={showLineNumbers} maxHeight={maxHeight} />
          </TabsContent>
        ))}
      </Tabs>
    </LayoutGroup>
  );
}
