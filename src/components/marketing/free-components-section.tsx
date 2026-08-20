import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { freeComponents } from "@/data/components";

const PREVIEW_COUNT = 6;

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
} as const;

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 280, damping: 24 } },
} as const;

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

      <motion.div
        className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        variants={gridVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
        {preview.map((component) => (
          <motion.div
            key={component.slug}
            variants={cardVariants}
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
          >
          <Card className="flex h-full flex-col transition-shadow duration-300 hover:shadow-lg">
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
          </motion.div>
        ))}
      </motion.div>

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
