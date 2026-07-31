import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { categories, componentRegistry } from "@/data/components";

export default function ComponentsIndex() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Component Showcase</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          {componentRegistry.length} production-ready React components for SaaS dashboards. Free components include
          full source code; Pro components are preview-only until you upgrade.
        </p>
      </div>

      {categories.map((category) => (
        <section key={category} id={category.toLowerCase()}>
          <h2 className="mb-4 text-lg font-semibold">{category}</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {componentRegistry
              .filter((c) => c.category === category)
              .map((component) => (
                <Link key={component.slug} to={`/components/${component.slug}`}>
                  <Card className="h-full transition-colors hover:border-primary/40">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-base">{component.name}</CardTitle>
                        {component.isFree ? (
                          <Badge variant="success">FREE</Badge>
                        ) : (
                          <Badge variant="secondary">PRO</Badge>
                        )}
                      </div>
                      <CardDescription>{component.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-1.5">
                      {component.tags.map((tag) => (
                        <span key={tag} className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                          {tag}
                        </span>
                      ))}
                    </CardContent>
                  </Card>
                </Link>
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}
