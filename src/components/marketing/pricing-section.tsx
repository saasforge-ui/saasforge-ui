import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { PurchaseButton } from "@/components/common/purchase-button";
import { pricingConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

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

      <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
        {tiers.map((tier) => (
          <Card
            key={tier.id}
            className={cn("flex flex-col", tier.highlighted && "border-primary shadow-md ring-1 ring-primary")}
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
              {tier.href.startsWith("kofi:") ? (
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
        ))}
      </div>
    </section>
  );
}
