import * as React from "react";
import { Navigate, useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/common/code-block";
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
        <h1 className="text-2xl font-semibold tracking-tight">{component.name}</h1>
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
            {doc ? doc.preview : <p className="text-sm text-muted-foreground">Preview coming soon.</p>}
          </CardContent>
        </Card>
      </section>

      {doc && (
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

      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">Use Cases</h2>
        <ul className="list-inside list-disc space-y-1.5 text-sm text-muted-foreground">
          {component.useCases.map((useCase) => (
            <li key={useCase}>{useCase}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
