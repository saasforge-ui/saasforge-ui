import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { componentRegistry } from "@/data/components";

const PREVIEW_COUNT = 12;
const MotionLink = motion.create(Link);

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
} as const;

const tileVariants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 26 } },
} as const;

export function ComponentsSection() {
  const preview = componentRegistry.slice(0, PREVIEW_COUNT);
  const remaining = componentRegistry.length - preview.length;

  return (
    <section className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {componentRegistry.length} components. One dashboard's worth of work, skipped.
          </h2>
          <p className="mt-3 text-muted-foreground">
            Every component ships with full TypeScript source, states, documentation and examples — all free and open
            source.
          </p>
        </div>

        <motion.div
          className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {preview.map((component) => (
            <MotionLink
              key={component.slug}
              to={`/components/${component.slug}`}
              variants={tileVariants}
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 350, damping: 22 }}
              className="group flex flex-col gap-2 rounded-lg border border-border bg-card p-4 shadow-sm transition-shadow hover:border-primary/40 hover:shadow-md"
            >
              <span className="text-sm font-medium leading-tight">{component.name}</span>
              <span className="text-xs text-muted-foreground">{component.category}</span>
            </MotionLink>
          ))}
          {remaining > 0 && (
            <MotionLink
              to="/components"
              variants={tileVariants}
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 350, damping: 22 }}
              className="flex flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-border p-4 text-center transition-colors hover:border-primary/40 hover:bg-accent/50"
            >
              <span className="text-sm font-medium">+{remaining} more</span>
              <span className="text-xs text-muted-foreground">View full catalog</span>
            </MotionLink>
          )}
        </motion.div>

        <div className="mt-10 text-center">
          <Button size="lg" asChild>
            <Link to="/components">
              Browse all {componentRegistry.length} components
              <ArrowRight />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
