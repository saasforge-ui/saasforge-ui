import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { PurchaseButton } from "@/components/common/purchase-button";
import { pricingConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
} as const;

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 260, damping: 24 } },
} as const;

export function PricingSection() {
  const { tiers, launchOffer } = pricingConfig;

  return (
    <section id="pricing" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Simple, one-time pricing</h2>
        <p className="mt-3 text-muted-foreground">No subscriptions. Buy once, use forever, get lifetime updates.</p>
        {launchOffer.enabled && (
          <p className="mt-3 text-sm font-medium text-primary">
            {launchOffer.label}: ${launchOffer.originalPrice} pricing ends soon — {launchOffer.note}
          </p>
        )}
      </div>

      <motion.div
        className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3"
        variants={gridVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        {tiers.map((tier) => (
          <motion.div
            key={tier.id}
            variants={cardVariants}
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
          >
          <Card
            className={cn(
              "flex h-full flex-col transition-shadow duration-300 hover:shadow-lg",
              tier.highlighted && "border-primary shadow-md ring-1 ring-primary hover:shadow-primary/20",
            )}
          >
            <CardHeader>
              {tier.highlighted && (
                <span className="mb-2 inline-block w-fit rounded-full bg-primary px-2.5 py-0.5 text-xs font-medium text-primary-foreground">
                  Recommended
                </span>
              )}
              <CardTitle className="text-lg">{tier.name}</CardTitle>
              <p className="text-3xl font-semibold tracking-tight">
                ${tier.price}
                {tier.price > 0 && <span className="text-sm font-normal text-muted-foreground"> one-time</span>}
              </p>
              <CardDescription>{tier.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-2.5 text-sm">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              {tier.comingSoon ? (
                <Button className="w-full" variant="outline" disabled>
                  {tier.cta}
                </Button>
              ) : tier.href.startsWith("kofi:") ? (
                <PurchaseButton
                  className="w-full"
                  variant={tier.highlighted ? "default" : "outline"}
                  product={tier.id === "ultimate" ? "saasforge-ui-ultimate" : "saasforge-ui-pro"}
                >
                  {tier.cta}
                </PurchaseButton>
              ) : (
                <Button className="w-full" variant={tier.highlighted ? "default" : "outline"} asChild>
                  <Link to={tier.href}>{tier.cta}</Link>
                </Button>
              )}
            </CardFooter>
          </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
