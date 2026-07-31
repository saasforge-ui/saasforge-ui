import { FAQAccordionSection } from "@/components/free/faq-accordion-section";

export default function Example() {
  return (
    <FAQAccordionSection
      description="Can't find what you're looking for? Reach out and we'll help."
      items={[
        {
          question: "Is this a component library or a full framework?",
          answer: "It's a copy-paste component library, like shadcn/ui — you own the code, no runtime dependency.",
        },
        {
          question: "Can I use this in a commercial project?",
          answer: "Yes, commercial usage is allowed for both the free and Pro components.",
        },
        {
          question: "Do you offer lifetime updates?",
          answer: "Yes — new components and improvements are included at no extra cost.",
        },
      ]}
    />
  );
}
