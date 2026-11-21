import * as React from "react";
import { Check, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { PricingPlan } from "@/types";

export interface PricingPlanComparisonProps {
  plans: PricingPlan[];
  /** Controlled billing period. Defaults to internal state when omitted. */
  yearly?: boolean;
  onYearlyChange?: (yearly: boolean) => void;
  onSelectPlan?: (plan: PricingPlan) => void;
  currentPlanId?: string;
  className?: string;
}

export function PricingPlanComparison({
  plans,
  yearly: yearlyProp,
  onYearlyChange,
  onSelectPlan,
  currentPlanId,
  className,
}: PricingPlanComparisonProps) {
  const [yearlyState, setYearlyState] = React.useState(false);
  const yearly = yearlyProp ?? yearlyState;

  const setYearly = (value: boolean) => {
    setYearlyState(value);
    onYearlyChange?.(value);
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="mb-6 flex items-center justify-center gap-3">
        <Label htmlFor="pricing-comparison-toggle" className={!yearly ? "font-semibold" : "text-muted-foreground"}>
          Monthly
        </Label>
        <Switch id="pricing-comparison-toggle" checked={yearly} onCheckedChange={setYearly} />
        <Label htmlFor="pricing-comparison-toggle" className={yearly ? "font-semibold" : "text-muted-foreground"}>
          Yearly
        </Label>
      </div>

      <div className={cn("grid grid-cols-1 gap-4", plans.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-4")}>
        {plans.map((plan) => {
          const isCurrent = plan.id === currentPlanId;
          return (
            <Card key={plan.id} className={cn(plan.recommended && "border-primary ring-1 ring-primary")}>
              <CardHeader>
                {plan.recommended && (
                  <Badge className="mb-2 w-fit" variant="default">
                    Recommended
                  </Badge>
                )}
                <CardTitle className="text-base">{plan.name}</CardTitle>
                <p className="text-2xl font-semibold tracking-tight">
                  ${yearly ? plan.yearlyPrice : plan.monthlyPrice}
                  <span className="text-sm font-normal text-muted-foreground">/mo</span>
                </p>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  {plan.features.map((feature) => (
                    <li key={feature.label} className="flex items-start gap-2">
                      {feature.included ? (
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden="true" />
                      ) : (
                        <Minus className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                      )}
                      <span className={!feature.included ? "text-muted-foreground" : undefined}>
                        {typeof feature.included === "string" ? `${feature.label} (${feature.included})` : feature.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  variant={plan.recommended ? "default" : "outline"}
                  disabled={isCurrent}
                  onClick={() => onSelectPlan?.(plan)}
                >
                  {isCurrent ? "Current plan" : `Choose ${plan.name}`}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
