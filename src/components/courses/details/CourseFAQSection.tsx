import { AccordionItem } from '@/components/ui/accordion'
import { courseFaqs } from '@/data/courseDetailsContent'
import { SectionLabel } from './SectionLabel'

export function CourseFAQSection() {
  return (
    <section className="py-8">
      <div className="text-center">
        <SectionLabel>FAQs</SectionLabel>
        <h2 className="mt-3 text-xl font-bold sm:text-2xl">
          Frequently Asked Questions From Our Students
        </h2>
      </div>

      <div className="mx-auto mt-6 max-w-3xl overflow-hidden rounded-[16px] border border-border/40 bg-bg-secondary/20">
        {courseFaqs.map((faq, index) => (
          <AccordionItem
            key={faq.question}
            defaultOpen={index === 0}
            className="px-5"
            title={<span className="text-sm font-medium text-white">{faq.question}</span>}
          >
            <p className="text-sm leading-relaxed text-white/60">{faq.answer}</p>
          </AccordionItem>
        ))}
      </div>
    </section>
  )
}
