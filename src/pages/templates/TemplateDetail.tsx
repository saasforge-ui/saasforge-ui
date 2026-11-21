import * as React from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import type { ComponentType } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/common/code-block";
import { getTemplateBySlug } from "@/data/templates";
import { getComponentBySlug } from "@/data/components";
import { trackEvent } from "@/lib/analytics";

// Globbed so every file in src/templates is picked up automatically — no hand-maintained map to forget.
const templateModules = import.meta.glob<{ default: ComponentType }>("../../templates/*.tsx", { eager: true });
const templateSources = import.meta.glob<string>("../../templates/*.tsx", {
  eager: true,
  query: "?raw",
  import: "default",
});

function slugFromPath(path: string) {
  return path.split("/").pop()!.replace(/\.tsx$/, "");
}

const templateComponents = Object.fromEntries(
  Object.entries(templateModules).map(([path, mod]) => [slugFromPath(path), mod.default]),
);
const templateSourceBySlug = Object.fromEntries(
  Object.entries(templateSources).map(([path, source]) => [slugFromPath(path), source]),
);

export default function TemplateDetail() {
  const { slug } = useParams<{ slug: string }>();
  const template = slug ? getTemplateBySlug(slug) : undefined;
  const TemplateComponent = template ? templateComponents[template.slug] : undefined;

  React.useEffect(() => {
    if (template) {
      trackEvent("template_preview", { component: template.slug });
    }
  }, [template]);

  if (!template || !TemplateComponent) {
    return <Navigate to="/templates" replace />;
  }

  const builtFromComponents = template.componentSlugs
    .map((componentSlug) => getComponentBySlug(componentSlug))
    .filter((component): component is NonNullable<typeof component> => Boolean(component));

  return (
    <div className="mx-auto max-w-7xl space-y-10 px-4 py-10 sm:px-6 lg:px-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{template.name}</h1>
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
          <CardContent className="overflow-x-auto p-4">
            <TemplateComponent />
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">Full Page Source</h2>
        <p className="mb-3 text-sm text-muted-foreground">
          Copy this file into your project at{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-xs">src/templates/{template.slug}.tsx</code>. It's
          built entirely from the components listed below.
        </p>
        <CodeBlock code={templateSourceBySlug[template.slug] ?? ""} />
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Built from these components
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {builtFromComponents.map((component) => (
            <Link key={component.slug} to={`/components/${component.slug}`}>
              <Card className="h-full transition-colors hover:border-primary/40">
                <CardContent className="p-4">
                  <p className="text-sm font-medium">{component.name}</p>
                  <p className="text-xs text-muted-foreground">{component.category}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
