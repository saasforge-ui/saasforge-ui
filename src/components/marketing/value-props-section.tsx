import { Code2, ShieldCheck, Sparkles, Layers3 } from "lucide-react";

const props = [
  {
    icon: Code2,
    title: "Copy & Customize",
    description: "No black-box components. Take the source and make it yours.",
  },
  {
    icon: ShieldCheck,
    title: "Production Ready",
    description: "Loading states, empty states, validation, responsive behavior and accessibility included.",
  },
  {
    icon: Sparkles,
    title: "TypeScript First",
    description: "Strong types and predictable component APIs.",
  },
  {
    icon: Layers3,
    title: "Built for SaaS",
    description: "Billing, analytics, users, teams, permissions and settings out of the box.",
  },
];

export function ValuePropsSection() {
  return (
    <section className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Why developers use SaaSForge UI</h2>
          <p className="mt-3 text-muted-foreground">Built for developers who want to ship faster.</p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {props.map(({ icon: Icon, title, description }) => (
            <div key={title}>
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="font-semibold">{title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
