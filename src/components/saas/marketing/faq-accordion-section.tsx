import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQAccordionSectionProps {
  title?: string;
  description?: string;
  items: FAQItem[];
  className?: string;
}

export function FAQAccordionSection({
  title = "Frequently asked questions",
  description,
  items,
  className,
}: FAQAccordionSectionProps) {
  return (
    <div className={cn("w-full max-w-2xl text-left", className)}>
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        {description && <p className="mt-2 text-muted-foreground">{description}</p>}
      </div>
      <Accordion type="single" collapsible>
        {items.map((item, index) => (
          <AccordionItem key={item.question} value={`item-${index}`}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
