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
    <section id="faq" className="relative scroll-mt-20 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16">
        <Reveal>
          <div>
            <SectionHeading
              number="07"
              eyebrow="FAQ"
              title="Questions, answered"
              intro="Everything you need to know about educational resources, prop rentals, and custom lesson design."
            />
            <a
              href="#contact"
              className="mt-6 inline-flex rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-secondary-foreground shadow-md shadow-secondary/15 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              Still curious? Ask me
            </a>
          </div>
        </Reveal>

        <ul className="flex flex-col gap-3">
          {FAQS.map((faq, i) => {
            const isOpen = open === i
            return (
              <Reveal key={faq.q} delay={i * 50}>
                <li
                  className={cn(
                    'overflow-hidden rounded-2xl border bg-card shadow-sm transition-all duration-300',
                    isOpen
                      ? 'border-primary/30 shadow-md shadow-primary/5'
                      : 'border-border/70 hover:border-border',
                  )}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="font-semibold text-sm text-foreground text-pretty sm:text-base">
                      {faq.q}
                    </span>
                    <span
                      className={cn(
                        'flex size-8 shrink-0 items-center justify-center rounded-full transition-all duration-300',
                        isOpen
                          ? 'rotate-45 bg-primary text-primary-foreground shadow-md'
                          : 'bg-primary/15 text-foreground',
                      )}
                    >
                      <Plus className="size-4" />
                    </span>
                  </button>
                  <div
                    className={cn(
                      'grid transition-all duration-300 ease-out',
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground text-pretty">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </li>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
