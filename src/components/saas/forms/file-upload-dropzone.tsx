import * as React from "react";
import { File as FileIcon, ImageIcon, UploadCloud, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface UploadedFile {
  id: string;
  file: File;
  previewUrl?: string;
  progress: number;
  status: "uploading" | "done" | "error";
  errorMessage?: string;
}

export interface FileUploadDropzoneProps {
  accept?: string;
  maxSizeMB?: number;
  multiple?: boolean;
  onFilesChange?: (files: UploadedFile[]) => void;
  className?: string;
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function FileUploadDropzone({
  accept,
  maxSizeMB = 5,
  multiple = true,
  onFilesChange,
  className,
}: FileUploadDropzoneProps) {
  const [files, setFiles] = React.useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const simulateUpload = React.useCallback((id: string) => {
    const interval = setInterval(() => {
      setFiles((prev) => {
        const next = prev.map((entry) => {
          if (entry.id !== id || entry.status !== "uploading") return entry;
          const progress = Math.min(100, entry.progress + Math.random() * 25 + 10);
          return { ...entry, progress, status: progress >= 100 ? ("done" as const) : ("uploading" as const) };
        });
        if (next.every((entry) => entry.status !== "uploading" || entry.id !== id)) {
          clearInterval(interval);
        }
        return next;
      });
    }, 300);
  }, []);

  const addFiles = React.useCallback(
    (fileList: FileList | null) => {
      if (!fileList || fileList.length === 0) return;
      const incoming = Array.from(fileList);
      const maxBytes = maxSizeMB * 1024 * 1024;

      const next: UploadedFile[] = incoming.map((file) => {
        const isTooLarge = file.size > maxBytes;
        const isImage = file.type.startsWith("image/");
        return {
          id: `${file.name}-${file.size}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          file,
          previewUrl: isImage && !isTooLarge ? URL.createObjectURL(file) : undefined,
          progress: 0,
          status: isTooLarge ? "error" : "uploading",
          errorMessage: isTooLarge ? `File exceeds ${maxSizeMB}MB limit` : undefined,
        };
      });

      setFiles((prev) => {
        const combined = multiple ? [...prev, ...next] : next;
        onFilesChange?.(combined);
        return combined;
      });

      next
        .filter((entry) => entry.status === "uploading")
        .forEach((entry) => simulateUpload(entry.id));
    },
    [maxSizeMB, multiple, onFilesChange, simulateUpload],
  );

  const removeFile = (id: string) => {
    setFiles((prev) => {
      const removed = prev.find((entry) => entry.id === id);
      if (removed?.previewUrl) URL.revokeObjectURL(removed.previewUrl);
      const next = prev.filter((entry) => entry.id !== id);
      onFilesChange?.(next);
      return next;
    });
  };

  return (
    <div className={cn("w-full space-y-3", className)}>
      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") inputRef.current?.click();
        }}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={(event) => {
          event.preventDefault();
          setIsDragOver(false);
          addFiles(event.dataTransfer.files);
        }}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border bg-muted/30 px-6 py-8 text-center transition-colors",
          isDragOver && "border-primary bg-primary/5",
        )}
      >
        <UploadCloud className={cn("h-8 w-8 text-muted-foreground", isDragOver && "text-primary")} aria-hidden="true" />
        <p className="text-sm font-medium">Drag and drop files here, or click to browse</p>
        <p className="text-xs text-muted-foreground">
          {accept ? `${accept} · ` : ""}Up to {maxSizeMB}MB{multiple ? " each" : ""}
        </p>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          className="sr-only"
          onChange={(event) => {
            addFiles(event.target.files);
            event.target.value = "";
          }}
        />
      </div>

      {files.length > 0 && (
        <ul className="space-y-2">
          {files.map((entry) => (
            <li
              key={entry.id}
              className={cn(
                "flex items-center gap-3 rounded-md border border-border bg-card p-2.5",
                entry.status === "error" && "border-destructive/40 bg-destructive/5",
              )}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-md bg-muted">
                {entry.previewUrl ? (
                  <img src={entry.previewUrl} alt={entry.file.name} className="h-full w-full object-cover" />
                ) : entry.file.type.startsWith("image/") ? (
                  <ImageIcon className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <FileIcon className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-sm font-medium">{entry.file.name}</p>
                  <button
                    type="button"
                    onClick={() => removeFile(entry.id)}
                    className="shrink-0 text-muted-foreground hover:text-foreground"
                    aria-label={`Remove ${entry.file.name}`}
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
                <p className="text-xs text-muted-foreground">{formatBytes(entry.file.size)}</p>
                {entry.status === "error" ? (
                  <p className="mt-1 text-xs text-destructive">{entry.errorMessage}</p>
                ) : (
                  <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all duration-300",
                        entry.status === "done" ? "bg-success" : "bg-primary",
                      )}
                      style={{ width: `${entry.progress}%` }}
                    />
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
