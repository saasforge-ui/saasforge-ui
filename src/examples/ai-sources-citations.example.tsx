import { AiSourcesCitations } from "@/components/saas/ai/ai-sources-citations";

export default function Example() {
  return (
    <AiSourcesCitations
      className="mx-auto max-w-xl"
      content={
        "Usage-based pricing tends to lift net revenue retention because expansion happens automatically as customers grow [1]. The trade-off is less predictable revenue, which is why many teams pair it with a platform fee [2].\n\nIf you're switching, grandfather existing customers for at least one billing cycle and publish a calculator so buyers can estimate their bill [3][1]."
      }
      sources={[
        {
          id: 1,
          title: "The state of usage-based pricing in B2B SaaS",
          url: "https://www.example.com/reports/usage-based-pricing",
          snippet: "Companies with usage-based models reported a median net revenue retention of 115%, versus 106% for seat-based peers.",
        },
        {
          id: 2,
          title: "Hybrid pricing: combining platform fees with metered usage",
          url: "https://blog.example.org/hybrid-pricing",
          snippet: "A small committed platform fee stabilizes cash flow while metered usage captures upside from your largest accounts.",
        },
        {
          id: 3,
          title: "How to migrate customers to a new pricing model without churn",
          url: "https://docs.example.dev/guides/pricing-migration",
          snippet: "Communicate early, grandfather existing plans and give customers a self-serve way to model their new costs.",
        },
      ]}
    />
  );
}
