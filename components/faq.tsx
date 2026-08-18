'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { FAQS } from '@/lib/data'
import { cn } from '@/lib/utils'

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="section-shell relative">
      <div className="section-inner">
        <div className="grid gap-5 lg:grid-cols-[0.75fr_1.25fr] lg:gap-8">
          <Reveal>
            <SectionHeading
              number="07"
              eyebrow="FAQ"
              title="Questions, answered"
              intro="Resources, rentals, and custom lesson design."
            />
            <a href="#contact" className="mt-4 inline-flex rounded-full bg-secondary px-4 py-2 text-xs font-semibold text-secondary-foreground">
              Still curious? Ask me
            </a>
          </Reveal>

          <ul className="space-y-2">
            {FAQS.map((faq, i) => {
              const isOpen = open === i
              return (
                <Reveal key={faq.q} delay={i * 30}>
                  <li className={cn('overflow-hidden rounded-xl border bg-card', isOpen ? 'border-primary/25' : 'border-border/60')}>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-3 px-3.5 py-3 text-left sm:px-4"
                    >
                      <span className="text-xs font-semibold text-foreground sm:text-sm">{faq.q}</span>
                      <span className={cn('flex size-7 shrink-0 items-center justify-center rounded-full transition-transform', isOpen ? 'rotate-45 bg-primary text-primary-foreground' : 'bg-primary/15')}>
                        <Plus className="size-3.5" />
                      </span>
                    </button>
                    <div className={cn('grid transition-all', isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}>
                      <div className="overflow-hidden">
                        <p className="px-3.5 pb-3.5 text-xs leading-relaxed text-muted-foreground sm:px-4 sm:pb-4 sm:text-sm">{faq.a}</p>
                      </div>
                    </div>
                  </li>
                </Reveal>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
