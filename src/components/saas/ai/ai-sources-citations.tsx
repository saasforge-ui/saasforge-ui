import * as React from "react";
import { ExternalLink } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Popover, PopoverAnchor, PopoverContent } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export interface CitationSource {
  /** Citation number referenced in the text as `[n]`. */
  id: number;
  title: string;
  url: string;
  snippet?: string;
}

export interface AiSourcesCitationsProps {
  /** Answer text. `[1]`, `[2]`… markers become citation chips; blank lines split paragraphs. */
  content: string;
  sources: CitationSource[];
  defaultSourcesOpen?: boolean;
  className?: string;
}

const HOVER_OPEN_DELAY = 200;
const HOVER_CLOSE_DELAY = 150;

function getDomain(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function Favicon({ domain, className }: { domain: string; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex h-4 w-4 shrink-0 items-center justify-center rounded-[4px] bg-muted text-[9px] font-semibold uppercase text-muted-foreground ring-1 ring-border",
        className,
      )}
    >
      {domain.charAt(0)}
    </span>
  );
}

function CitationChip({ source }: { source: CitationSource }) {
  const [open, setOpen] = React.useState(false);
  const openedByHoverRef = React.useRef(false);
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const domain = getDomain(source.url);

  React.useEffect(() => () => clearTimeout(timerRef.current), []);

  const schedule = (next: boolean, delay: number) => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if (next) openedByHoverRef.current = true;
      setOpen(next);
    }, delay);
  };

  // Hover preview is a mouse-only enhancement; tap/click/keyboard always work via onClick.
  const hoverHandlers = {
    onPointerEnter: (event: React.PointerEvent) => {
      if (event.pointerType === "mouse") schedule(true, open ? 0 : HOVER_OPEN_DELAY);
    },
    onPointerLeave: (event: React.PointerEvent) => {
      if (event.pointerType === "mouse" && openedByHoverRef.current) schedule(false, HOVER_CLOSE_DELAY);
    },
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverAnchor asChild>
        <button
          ref={buttonRef}
          type="button"
          {...hoverHandlers}
          onClick={() => {
            clearTimeout(timerRef.current);
            // A click "pins" a hover-opened preview instead of closing it.
            if (open && openedByHoverRef.current) {
              openedByHoverRef.current = false;
              return;
            }
            openedByHoverRef.current = false;
            setOpen(!open);
          }}
          aria-label={`Source ${source.id}: ${source.title}`}
          aria-expanded={open}
          className={cn(
            "mx-0.5 inline-flex h-[1.15rem] min-w-[1.15rem] -translate-y-px items-center justify-center rounded-[5px] border border-border bg-muted px-1 align-middle font-mono text-[10px] font-medium leading-none text-muted-foreground outline-none transition-[background-color,color,border-color,scale] duration-150 ease-out-strong hover:border-ring/40 hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.97]",
            open && "border-ring/40 bg-accent text-foreground",
          )}
        >
          {source.id}
        </button>
      </PopoverAnchor>
      <PopoverContent
        side="top"
        align="start"
        className="w-80 p-3"
        {...hoverHandlers}
        // Don't steal focus for hover previews; click-opened previews move focus inside for keyboard users.
        onOpenAutoFocus={(event) => {
          if (openedByHoverRef.current) event.preventDefault();
        }}
        onInteractOutside={(event) => {
          // Clicks on our own chip are handled by its onClick.
          if (buttonRef.current?.contains(event.target as Node)) event.preventDefault();
        }}
      >
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Favicon domain={domain} />
          <span className="truncate">{domain}</span>
        </div>
        <p className="mt-1.5 line-clamp-2 text-sm font-medium leading-snug">{source.title}</p>
        {source.snippet && <p className="mt-1 line-clamp-3 text-xs leading-relaxed text-muted-foreground">{source.snippet}</p>}
        <a
          href={source.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center gap-1 rounded-sm text-xs font-medium text-foreground underline-offset-4 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring"
        >
          Open source
          <ExternalLink className="h-3 w-3" aria-hidden="true" />
        </a>
      </PopoverContent>
    </Popover>
  );
}

function renderWithCitations(text: string, sourcesById: Map<number, CitationSource>) {
  return text.split(/(\[\d+\])/g).map((part, index) => {
    const match = /^\[(\d+)\]$/.exec(part);
    if (!match) return <React.Fragment key={index}>{part}</React.Fragment>;
    const source = sourcesById.get(Number(match[1]));
    // Unknown citation numbers fall back to plain text rather than a broken chip.
    return source ? <CitationChip key={index} source={source} /> : <React.Fragment key={index}>{part}</React.Fragment>;
  });
}

export function AiSourcesCitations({ content, sources, defaultSourcesOpen = false, className }: AiSourcesCitationsProps) {
  const sourcesById = React.useMemo(() => new Map(sources.map((source) => [source.id, source])), [sources]);
  const paragraphs = content.split(/\n{2,}/).filter((paragraph) => paragraph.trim().length > 0);

  return (
    <div className={cn("w-full space-y-3 text-sm leading-relaxed text-foreground", className)}>
      {paragraphs.map((paragraph, index) => (
        <p key={index} className="break-words">
          {renderWithCitations(paragraph, sourcesById)}
        </p>
      ))}

      {sources.length > 0 && (
        <Accordion type="single" collapsible defaultValue={defaultSourcesOpen ? "sources" : undefined}>
          <AccordionItem value="sources" className="rounded-lg border border-border px-3">
            <AccordionTrigger className="py-2.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <span className="flex items-center gap-2">
                <span className="flex -space-x-1" aria-hidden="true">
                  {sources.slice(0, 3).map((source) => (
                    <Favicon key={source.id} domain={getDomain(source.url)} className="ring-2 ring-background" />
                  ))}
                </span>
                Sources ({sources.length})
              </span>
            </AccordionTrigger>
            <AccordionContent className="pb-3">
              <ol className="space-y-1">
                {sources.map((source) => {
                  const domain = getDomain(source.url);
                  return (
                    <li key={source.id}>
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2.5 rounded-md px-2 py-1.5 outline-none transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <span className="w-4 shrink-0 text-right font-mono text-[11px] text-muted-foreground">{source.id}</span>
                        <Favicon domain={domain} />
                        <span className="min-w-0 flex-1 truncate text-sm text-foreground">{source.title}</span>
                        <span className="hidden shrink-0 text-xs text-muted-foreground sm:inline">{domain}</span>
                        <ExternalLink className="h-3 w-3 shrink-0 text-muted-foreground" aria-hidden="true" />
                      </a>
                    </li>
                  );
                })}
              </ol>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    </div>
  );
}
