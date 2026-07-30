import { Link } from "react-router-dom";
import { ArrowRight, Lock } from "lucide-react";
import { PurchaseButton } from "@/components/common/purchase-button";
import { Badge } from "@/components/ui/badge";
import { componentRegistry } from "@/data/components";

export function PremiumComponentsSection() {
  return (
    <section className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">20 components. One dashboard's worth of work, skipped.</h2>
          <p className="mt-3 text-muted-foreground">
            Every component ships with TypeScript types, states, and documentation. Free components are fully open —
            Pro components are preview-only until you upgrade.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {componentRegistry.map((component) => (
            <Link
              key={component.slug}
              to={`/components/${component.slug}`}
              className="group flex flex-col gap-2 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/40"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-sm font-medium leading-tight">{component.name}</span>
                {component.isFree ? (
                  <Badge variant="success" className="shrink-0">
                    FREE
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="shrink-0 gap-1">
                    <Lock className="h-3 w-3" /> PRO
                  </Badge>
                )}
              </div>
              <span className="text-xs text-muted-foreground">{component.category}</span>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <PurchaseButton size="lg">
            Get all 20 components
            <ArrowRight />
          </PurchaseButton>
        </div>
      </div>
    </section>
  );
}
