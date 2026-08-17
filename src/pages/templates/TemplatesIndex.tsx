import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { templateRegistry } from "@/data/templates";

export default function TemplatesIndex() {
  return (
    <div className="mx-auto max-w-7xl space-y-12 px-4 py-10 sm:px-6 lg:px-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard Templates</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          {templateRegistry.length} full-page dashboard templates composed from SaaSForge UI Pro components. Live
          previews are free to browse; full source is part of SaaSForge UI Ultimate.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {templateRegistry.map((template) => (
          <Link key={template.slug} to={`/templates/${template.slug}`}>
            <Card className="h-full transition-colors hover:border-primary/40">
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-base">{template.name}</CardTitle>
                  <Badge variant="secondary">ULTIMATE</Badge>
                </div>
                <CardDescription>{template.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-1.5">
                {template.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
