import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    question: "What do I get with SaaSForge UI Pro?",
    answer:
      "All 20 production-ready components with full TypeScript source, dark mode, documentation, usage examples, and lifetime updates for a single one-time payment.",
  },
  {
    question: "Can I use SaaSForge UI in commercial projects?",
    answer: "Yes. Pro and Ultimate licenses both include commercial usage rights for client and internal SaaS projects.",
  },
  {
    question: "Do the free components expire or become limited?",
    answer:
      "No. The 5 free components remain fully usable indefinitely — there's no trial period or feature reduction.",
  },
  {
    question: "Does this include a backend or database?",
    answer:
      "No. SaaSForge UI is entirely frontend. Components receive data and callbacks through props so you can wire them up to whatever backend you use.",
  },
  {
    question: "How do I pay?",
    answer: "Purchases are handled through Ko-fi. Clicking a purchase button redirects you to a secure Ko-fi checkout.",
  },
  {
    question: "Will I get future updates?",
    answer: "Yes, Pro and Ultimate include lifetime updates as new components and improvements ship.",
  },
];

export function FaqSection() {
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-semibold tracking-tight sm:text-3xl">
          Frequently asked questions
        </h2>
        <Accordion type="single" collapsible className="mt-10">
          {faqs.map((faq, i) => (
            <AccordionItem key={faq.question} value={`faq-${i}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
