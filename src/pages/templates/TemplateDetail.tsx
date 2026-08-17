import * as React from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { PurchaseButton } from "@/components/common/purchase-button";
import { getTemplateBySlug } from "@/data/templates";
import { getComponentBySlug } from "@/data/components";
import { trackEvent } from "@/lib/analytics";

import { AnalyticsDashboard } from "@/components/premium-preview/analytics-dashboard";
import { BillingSettingsPanel } from "@/components/premium-preview/billing-settings-panel";
import { AdminUsersPanel } from "@/components/premium-preview/admin-users-panel";

const templatePreviews: Record<string, React.ReactNode> = {
  "analytics-dashboard": <AnalyticsDashboard />,
  "billing-settings-panel": <BillingSettingsPanel />,
  "admin-users-panel": <AdminUsersPanel />,
};

export default function TemplateDetail() {
  const { slug } = useParams<{ slug: string }>();
  const template = slug ? getTemplateBySlug(slug) : undefined;

  React.useEffect(() => {
    if (template) {
      trackEvent("template_preview", { component: template.slug, tier: "ultimate" });
    }
  }, [template]);

  if (!template) {
    return <Navigate to="/templates" replace />;
  }

  const preview = templatePreviews[template.slug];
  const builtFromComponents = template.componentSlugs
    .map((componentSlug) => getComponentBySlug(componentSlug))
    .filter((component): component is NonNullable<typeof component> => Boolean(component));

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-10 sm:px-6 lg:px-8">
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-2xl font-semibold tracking-tight">{template.name}</h1>
          <Badge variant="secondary">ULTIMATE</Badge>
        </div>
        <p className="mt-2 text-muted-foreground">{template.description}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {template.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">Live Preview</h2>
        <Card>
          <CardContent className="overflow-x-auto p-4">{preview}</CardContent>
        </Card>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-dashed border-border bg-muted/30 px-4 py-3">
          <p className="text-sm text-muted-foreground">
            This is a live preview with sample data. Full source for this template is part of SaaSForge UI Ultimate.
          </p>
          <PurchaseButton product="saasforge-ui-ultimate" size="sm">
            Unlock in Ultimate
          </PurchaseButton>
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Built from these components
        </h2>
        <p className="mb-3 text-sm text-muted-foreground">
          This template composes the following SaaSForge UI components. Don't need the whole template? Each
          component is also available on its own in Pro.
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {builtFromComponents.map((component) => (
            <Link key={component.slug} to={`/components/${component.slug}`}>
              <Card className="h-full transition-colors hover:border-primary/40">
                <CardContent className="flex items-center justify-between gap-2 p-4">
                  <div>
                    <p className="text-sm font-medium">{component.name}</p>
                    <p className="text-xs text-muted-foreground">{component.category}</p>
                  </div>
                  {component.isFree ? (
                    <Badge variant="success">FREE</Badge>
                  ) : (
                    <Badge variant="secondary">PRO</Badge>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          Want the full source for this template?{" "}
          <Link to="/pricing" className="font-medium text-primary underline-offset-4 hover:underline">
            See pricing
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
