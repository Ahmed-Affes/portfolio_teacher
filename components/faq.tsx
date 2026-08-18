'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { FAQS } from '@/lib/data'
import { cn } from '@/lib/utils'

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="scroll-mt-20 py-10 sm:py-14 lg:py-16">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] items-start">
        <div>
          <SectionHeading
            eyebrow="FAQ"
            title="Questions, answered"
            intro="Everything you need to know about educational resources, prop rentals, and custom lesson design."
          />
          <a
            href="#contact"
            className="mt-5 inline-flex rounded-full bg-secondary px-5 py-2.5 text-xs sm:text-sm font-semibold text-secondary-foreground shadow-xs transition-all hover:-translate-y-0.5 hover:shadow"
          >
            Still curious? Ask me
          </a>
        </div>

        <ul className="flex flex-col gap-2.5">
          {FAQS.map((faq, i) => {
            const isOpen = open === i
            return (
              <li
                key={faq.q}
                className="overflow-hidden rounded-2xl border border-border bg-card shadow-xs transition-colors"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left"
                >
                  <span className="font-semibold text-xs sm:text-sm text-foreground text-pretty">{faq.q}</span>
                  <span
                    className={cn(
                      'flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/20 text-foreground transition-transform duration-300',
                      isOpen && 'rotate-45 bg-primary text-primary-foreground',
                    )}
                  >
                    <Plus className="size-3.5" />
                  </span>
                </button>
                <div
                  className={cn(
                    'grid transition-all duration-300 ease-out',
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-4 pb-4 text-xs sm:text-sm leading-relaxed text-muted-foreground text-pretty">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
