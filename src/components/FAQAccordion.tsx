import { useState } from 'react';

interface FAQ {
  question: string;
  answer: string;
}

interface Props {
  faqs: FAQ[];
}

export default function FAQAccordion({ faqs }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {faqs.map((faq, index) => (
        <div key={index} className="border border-neutral-200 rounded-lg overflow-hidden">
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full flex items-center justify-between px-6 py-4 bg-white hover:bg-neutral-50 transition-colors text-left gap-4"
            aria-expanded={openIndex === index}
          >
            <span className="font-heading font-bold text-neutral-900 uppercase tracking-wide text-base">
              {faq.question}
            </span>
            <span className={`text-primary-600 shrink-0 transition-transform duration-200 ${openIndex === index ? 'rotate-180' : ''}`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </span>
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96' : 'max-h-0'}`}
          >
            <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-100 text-neutral-700 text-sm leading-relaxed" style={{fontFamily: 'var(--font-body)', textTransform: 'none'}}>
              {faq.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
