import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    question: "Is SaaSForge UI really free?",
    answer:
      "Yes — and it always will be. Every component and template is free forever and open source under the MIT license: full TypeScript source, docs and examples, no paid tiers, no locked features, no license keys.",
  },
  {
    question: "Can I use SaaSForge UI in commercial projects?",
    answer:
      "Yes. The MIT license allows commercial use in client work, internal tools and products you sell. Just keep the license notice.",
  },
  {
    question: "How do I add a component to my project?",
    answer:
      "Open any component page, copy the source into your project and install the listed dependencies. Each page includes a usage example and the full props reference.",
  },
  {
    question: "Does this include a backend or database?",
    answer:
      "No. SaaSForge UI is entirely frontend. Components receive data and callbacks through props so you can wire them up to whatever backend you use.",
  },
  {
    question: "Can I contribute?",
    answer: "Yes. Issues and pull requests are welcome on GitHub.",
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
