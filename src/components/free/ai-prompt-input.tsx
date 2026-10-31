import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, FileText, Paperclip, Square, X } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

export interface PromptAttachment {
  id: string;
  file: File;
  name: string;
  size: number;
}

export interface PromptModel {
  value: string;
  label: string;
}

export interface AiPromptInputProps {
  /** Called with the trimmed prompt and current attachments. The input clears afterwards. */
  onSubmit?: (value: string, attachments: PromptAttachment[]) => void;
  /** While true the send button becomes a stop button and Enter no longer submits. */
  isGenerating?: boolean;
  onStop?: () => void;
  models?: PromptModel[];
  /** Controlled model value. */
  model?: string;
  defaultModel?: string;
  onModelChange?: (value: string) => void;
  placeholder?: string;
  /** Max textarea height in px before it starts scrolling. */
  maxHeight?: number;
  /** Accepted file types for the attach button, e.g. "image/*,.pdf". */
  accept?: string;
  maxAttachments?: number;
  disabled?: boolean;
  className?: string;
}

const pressable =
  "transition-[background-color,color,opacity,scale] duration-150 ease-out-strong active:scale-[0.97] outline-none focus-visible:ring-2 focus-visible:ring-ring";

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

let attachmentCounter = 0;

export function AiPromptInput({
  onSubmit,
  isGenerating = false,
  onStop,
  models,
  model,
  defaultModel,
  onModelChange,
  placeholder = "Ask anything…",
  maxHeight = 200,
  accept,
  maxAttachments = 5,
  disabled = false,
  className,
}: AiPromptInputProps) {
  const [value, setValue] = React.useState("");
  const [attachments, setAttachments] = React.useState<PromptAttachment[]>([]);
  const [isDragging, setIsDragging] = React.useState(false);
  const [uncontrolledModel, setUncontrolledModel] = React.useState(defaultModel ?? models?.[0]?.value);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const hintId = React.useId();

  const activeModel = model ?? uncontrolledModel;
  const canSubmit = value.trim().length > 0 && !isGenerating && !disabled;

  // Auto-grow: reset to auto so it can shrink, then clamp to maxHeight and scroll beyond it.
  React.useLayoutEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    const next = Math.min(textarea.scrollHeight, maxHeight);
    textarea.style.height = `${next}px`;
    textarea.style.overflowY = textarea.scrollHeight > maxHeight ? "auto" : "hidden";
  }, [value, maxHeight]);

  const addFiles = (files: FileList | File[]) => {
    const incoming = Array.from(files).map((file) => ({
      id: `att-${++attachmentCounter}`,
      file,
      name: file.name,
      size: file.size,
    }));
    setAttachments((prev) => [...prev, ...incoming].slice(0, maxAttachments));
  };

  const removeAttachment = (id: string) => {
    setAttachments((prev) => prev.filter((attachment) => attachment.id !== id));
    textareaRef.current?.focus();
  };

  const submit = () => {
    if (!canSubmit) return;
    onSubmit?.(value.trim(), attachments);
    setValue("");
    setAttachments([]);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Ignore Enter while an IME composition is in progress (e.g. Japanese input).
    if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault();
      submit();
    }
  };

  const handleModelChange = (next: string) => {
    setUncontrolledModel(next);
    onModelChange?.(next);
  };

  const atAttachmentLimit = attachments.length >= maxAttachments;

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        submit();
      }}
      onDragOver={(event) => {
        if (disabled || !event.dataTransfer.types.includes("Files")) return;
        event.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setIsDragging(false);
      }}
      onDrop={(event) => {
        if (disabled) return;
        event.preventDefault();
        setIsDragging(false);
        if (event.dataTransfer.files.length) addFiles(event.dataTransfer.files);
      }}
      className={cn(
        "w-full rounded-xl border border-input bg-background p-2 shadow-sm transition-[border-color,box-shadow] duration-150 ease-out-strong focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/30",
        isDragging && "border-ring bg-accent/40",
        disabled && "opacity-60",
        className,
      )}
    >
      <AnimatePresence initial={false}>
        {attachments.length > 0 && (
          <motion.ul
            key="attachments"
            aria-label="Attachments"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
            className="flex flex-wrap gap-1.5 px-1 pb-2 pt-1"
          >
            <AnimatePresence initial={false}>
              {attachments.map((attachment) => (
                <motion.li
                  key={attachment.id}
                  layout="position"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.1 } }}
                  transition={{ type: "spring", duration: 0.3, bounce: 0 }}
                  className="flex max-w-[14rem] items-center gap-1.5 rounded-md border border-border bg-muted/60 py-1 pl-2 pr-1 text-xs"
                >
                  <FileText className="h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
                  <span className="truncate font-medium" title={attachment.name}>
                    {attachment.name}
                  </span>
                  <span className="shrink-0 text-muted-foreground">{formatBytes(attachment.size)}</span>
                  <button
                    type="button"
                    onClick={() => removeAttachment(attachment.id)}
                    aria-label={`Remove ${attachment.name}`}
                    className={cn("rounded-sm p-0.5 text-muted-foreground hover:bg-background hover:text-foreground", pressable)}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        )}
      </AnimatePresence>

      <label htmlFor={`${hintId}-input`} className="sr-only">
        Message
      </label>
      <textarea
        id={`${hintId}-input`}
        ref={textareaRef}
        rows={1}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        aria-describedby={hintId}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={handleKeyDown}
        onPaste={(event) => {
          if (event.clipboardData.files.length) {
            event.preventDefault();
            addFiles(event.clipboardData.files);
          }
        }}
        className="scrollbar-thin block w-full resize-none bg-transparent px-2 py-1.5 text-sm leading-6 outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed"
      />
      <span id={hintId} className="sr-only">
        Press Enter to send, Shift plus Enter for a new line.
      </span>

      <div className="mt-1 flex items-center gap-1">
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={accept}
          className="hidden"
          tabIndex={-1}
          onChange={(event) => {
            if (event.target.files?.length) addFiles(event.target.files);
            event.target.value = "";
          }}
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled || atAttachmentLimit}
          aria-label={atAttachmentLimit ? `Attachment limit reached (${maxAttachments})` : "Attach files"}
          className={cn(
            "inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:opacity-50",
            pressable,
          )}
        >
          <Paperclip className="h-4 w-4" />
        </button>

        {models && models.length > 0 && (
          <Select value={activeModel} onValueChange={handleModelChange} disabled={disabled}>
            <SelectTrigger
              aria-label="Model"
              className="h-8 w-auto max-w-[12rem] gap-1 border-0 bg-transparent px-2 text-xs font-medium text-muted-foreground shadow-none hover:bg-accent hover:text-foreground"
            >
              <SelectValue placeholder="Model" />
            </SelectTrigger>
            <SelectContent>
              {models.map((option) => (
                <SelectItem key={option.value} value={option.value} className="text-xs">
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        <button
          type={isGenerating ? "button" : "submit"}
          onClick={isGenerating ? onStop : undefined}
          disabled={isGenerating ? disabled : !canSubmit}
          aria-label={isGenerating ? "Stop generating" : "Send message"}
          className={cn(
            "relative ml-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-40",
            pressable,
          )}
        >
          <ArrowUp
            aria-hidden="true"
            className={cn(
              "absolute h-4 w-4 transition-[opacity,filter,scale] duration-200 ease-out-strong",
              isGenerating && "scale-90 opacity-0 blur-[2px]",
            )}
          />
          <Square
            aria-hidden="true"
            className={cn(
              "absolute h-3 w-3 fill-current transition-[opacity,filter,scale] duration-200 ease-out-strong",
              !isGenerating && "scale-90 opacity-0 blur-[2px]",
            )}
          />
        </button>
      </div>
    </form>
  );
}
