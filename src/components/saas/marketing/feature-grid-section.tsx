import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FeatureItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface FeatureGridSectionProps {
  title?: string;
  description?: string;
  features: FeatureItem[];
  className?: string;
}

export function FeatureGridSection({ title, description, features, className }: FeatureGridSectionProps) {
  return (
    <div className={cn("w-full max-w-4xl text-left", className)}>
      {(title || description) && (
        <div className="mb-10 max-w-2xl">
          {title && <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>}
          {description && <p className="mt-2 text-muted-foreground">{description}</p>}
        </div>
      )}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <div key={feature.title} className="space-y-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="font-medium">{feature.title}</p>
                <p className="mt-1.5 text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
