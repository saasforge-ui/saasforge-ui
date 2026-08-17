import * as React from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/common/code-block";
import { PurchaseButton } from "@/components/common/purchase-button";
import { getComponentBySlug } from "@/data/components";
import { componentDocs } from "@/data/component-docs";
import { trackEvent } from "@/lib/analytics";

export default function ComponentDetail() {
  const { slug } = useParams<{ slug: string }>();
  const component = slug ? getComponentBySlug(slug) : undefined;

  React.useEffect(() => {
    if (component) {
      trackEvent("component_preview", { component: component.slug, category: component.category });
    }
  }, [component]);

  if (!component) {
    return <Navigate to="/components" replace />;
  }

  const doc = componentDocs[component.slug];

  return (
    <div className="max-w-3xl space-y-10">
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-2xl font-semibold tracking-tight">{component.name}</h1>
          {component.isFree ? (
            <Badge variant="success">FREE</Badge>
          ) : component.ultimateOnly ? (
            <Badge variant="secondary" className="border-violet-500/30 bg-violet-500/10 text-violet-600 dark:text-violet-400">
              ULTIMATE
            </Badge>
          ) : (
            <Badge variant="secondary">PRO</Badge>
          )}
        </div>
        <p className="mt-2 text-muted-foreground">{component.description}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {component.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">Live Preview</h2>
        <Card>
          <CardContent className="flex items-center justify-center p-8">
            {doc ? (
              doc.preview
            ) : (
              <div className="flex w-full flex-col items-center gap-4 rounded-lg border border-primary/20 bg-primary/5 py-12 text-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Sparkles className="h-6 w-6" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-medium">
                    Full preview available in {component.ultimateOnly ? "Ultimate" : "Pro"}
                  </p>
                  <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                    This component is part of SaaSForge UI {component.ultimateOnly ? "Ultimate" : "Pro"}. Use cases:{" "}
                    {component.useCases.join(", ")}.
                  </p>
                </div>
                <PurchaseButton size="sm" product={component.ultimateOnly ? "saasforge-ui-ultimate" : "saasforge-ui-pro"}>
                  Unlock in {component.ultimateOnly ? "Ultimate" : "Pro"}
                </PurchaseButton>
              </div>
            )}
          </CardContent>
        </Card>
        {!component.isFree && doc && (
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-dashed border-border bg-muted/30 px-4 py-3">
            <p className="text-sm text-muted-foreground">
              This is a live preview with sample data. Full source, types, props and docs are part of SaaSForge UI{" "}
              {component.ultimateOnly ? "Ultimate" : "Pro"}.
            </p>
            <PurchaseButton size="sm" product={component.ultimateOnly ? "saasforge-ui-ultimate" : "saasforge-ui-pro"}>
              Unlock in {component.ultimateOnly ? "Ultimate" : "Pro"}
            </PurchaseButton>
          </div>
        )}
      </section>

      {component.isFree && doc && (
        <>
          <section>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">Installation</h2>
            <CodeBlock language="bash" code={`npm install ${(doc.installDeps ?? []).join(" ")}`} />
          </section>

          {doc.componentSource && (
            <section>
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Component Source
              </h2>
              <p className="mb-3 text-sm text-muted-foreground">
                Copy this file into your project at{" "}
                <code className="rounded bg-muted px-1.5 py-0.5 text-xs">{doc.componentSourcePath}</code> (or wherever
                you keep components) — this is the whole implementation, nothing else to fetch.
              </p>
              <CodeBlock code={doc.componentSource} />
            </section>
          )}

          <section>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">Usage Example</h2>
            <p className="mb-3 text-sm text-muted-foreground">
              How to call the component once you've copied it in. Adjust the import path to match where you placed
              the file above.
            </p>
            <CodeBlock code={doc.source ?? ""} />
          </section>

          <section>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">Props</h2>
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full text-sm">
                <thead className="bg-muted/50 text-left text-xs uppercase text-muted-foreground">
                  <tr>
                    <th className="px-4 py-2 font-medium">Prop</th>
                    <th className="px-4 py-2 font-medium">Type</th>
                    <th className="px-4 py-2 font-medium">Default</th>
                    <th className="px-4 py-2 font-medium">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {(doc.props ?? []).map((prop) => (
                    <tr key={prop.name}>
                      <td className="px-4 py-2 font-mono text-xs">
                        {prop.name}
                        {prop.required && <span className="text-destructive">*</span>}
                      </td>
                      <td className="px-4 py-2 font-mono text-xs text-muted-foreground">{prop.type}</td>
                      <td className="px-4 py-2 font-mono text-xs text-muted-foreground">{prop.default ?? "—"}</td>
                      <td className="px-4 py-2 text-muted-foreground">{prop.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">States</h2>
            <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {(doc.states ?? []).map((state) => (
                <li key={state} className="rounded-md border border-border px-3 py-2 text-sm">
                  {state}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Accessibility
            </h2>
            <ul className="list-inside list-disc space-y-1.5 text-sm text-muted-foreground">
              {(doc.accessibility ?? []).map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Customization
            </h2>
            <ul className="list-inside list-disc space-y-1.5 text-sm text-muted-foreground">
              {(doc.customization ?? []).map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Responsive Behavior
            </h2>
            <ul className="list-inside list-disc space-y-1.5 text-sm text-muted-foreground">
              {(doc.responsive ?? []).map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </section>
        </>
      )}

      {!component.isFree && (
        <section>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">Use Cases</h2>
          <ul className="list-inside list-disc space-y-1.5 text-sm text-muted-foreground">
            {component.useCases.map((useCase) => (
              <li key={useCase}>{useCase}</li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-muted-foreground">
            Want the full source, props API and documentation for this component?{" "}
            <Link to="/pricing" className="font-medium text-primary underline-offset-4 hover:underline">
              See pricing
            </Link>
            .
          </p>
        </section>
      )}
    </div>
  );
}
