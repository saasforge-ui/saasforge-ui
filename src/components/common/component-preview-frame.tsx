import type * as React from "react";
import { cn } from "@/lib/utils";

export interface ComponentPreviewFrameProps {
  title: string;
  category: string;
  variant?: "light" | "dark";
  children: React.ReactNode;
}

/**
 * A chrome-free preview wrapper intended for generating marketing screenshots
 * (README, Ko-fi product images, social posts) — not used in the app shell.
 */
export function ComponentPreviewFrame({ title, category, variant = "light", children }: ComponentPreviewFrameProps) {
  return (
    <div
      className={cn(
        "flex min-h-screen w-full flex-col items-center justify-center gap-8 p-12",
        variant === "dark" ? "dark bg-background text-foreground" : "bg-background text-foreground",
      )}
    >
      <div className="text-center">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{category}</p>
        <h1 className="mt-1 text-xl font-semibold">{title}</h1>
      </div>
      <div className="w-full max-w-2xl">{children}</div>
    </div>
  );
}
