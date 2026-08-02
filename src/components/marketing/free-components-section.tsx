import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { freeComponents } from "@/data/components";

const PREVIEW_COUNT = 6;

export function FreeComponentsSection() {
  const preview = freeComponents.slice(0, PREVIEW_COUNT);
  const remaining = freeComponents.length - preview.length;

  return (
    <section id="free-components" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Try it before you buy it.</h2>
        <p className="mt-3 text-muted-foreground">
          Get {freeComponents.length} production-ready components completely free.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {preview.map((component) => (
          <Card key={component.slug} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{component.name}</CardTitle>
                <span className="rounded-full bg-success/15 px-2.5 py-0.5 text-xs font-medium text-success">
                  FREE
                </span>
              </div>
              <CardDescription>{component.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1" />
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link to={`/components/${component.slug}`}>
                  View documentation
                  <ArrowRight />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Button asChild>
          <Link to="/components">
            {remaining > 0 ? `See ${remaining} more free components` : "Explore Free Components"}
            <ArrowRight />
          </Link>
        </Button>
      </div>
    </section>
  );
}
