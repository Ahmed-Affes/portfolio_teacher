'use client'

import { useState } from 'react'
import { ArrowRight, HelpCircle, Plus } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { FAQS } from '@/lib/data'
import { cn } from '@/lib/utils'

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="section-shell relative overflow-hidden">
      <div className="section-inner">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12 xl:gap-16">
          {/* Left Column */}
          <Reveal>
            <div className="flex flex-col items-start">
              <SectionHeading
                number="07"
                eyebrow="Frequently Asked"
                title="Everything you need to know"
                intro="Answers about handmade prop rentals, printable digital downloads, and custom teacher workshops."
              />

              <div className="mt-6 rounded-2xl border border-border/75 bg-card p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-primary/20 text-foreground">
                    <HelpCircle className="size-5" />
                  </span>
                  <div>
                    <h4 className="font-serif text-sm font-semibold text-foreground">Have a unique question?</h4>
                    <p className="text-xs text-muted-foreground">Farah is always happy to discuss custom ideas.</p>
                  </div>
                </div>
                <a
                  href="#contact"
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-secondary py-2.5 text-xs font-semibold text-secondary-foreground shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                >
                  Send a message
                  <ArrowRight className="size-3.5 text-primary" />
                </a>
              </div>
            </div>
          </Reveal>

          {/* Right Column: Accordion */}
          <ul className="space-y-3">
            {FAQS.map((faq, i) => {
              const isOpen = openIndex === i
              return (
                <Reveal key={faq.q} delay={i * 40}>
                  <li
                    className={cn(
                      'overflow-hidden rounded-2xl border bg-card transition-all duration-300 shadow-2xs',
                      isOpen
                        ? 'border-primary/50 shadow-md ring-1 ring-primary/25'
                        : 'border-border/75 hover:border-primary/30',
                    )}
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-4 p-4 text-left sm:p-5"
                    >
                      <span className="font-serif text-sm font-semibold text-foreground sm:text-base">
                        {faq.q}
                      </span>
                      <span
                        className={cn(
                          'flex size-8 shrink-0 items-center justify-center rounded-full transition-transform duration-300',
                          isOpen
                            ? 'rotate-45 bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground',
                        )}
                      >
                        <Plus className="size-4" />
                      </span>
                    </button>
                    <div
                      className={cn(
                        'grid transition-all duration-300 ease-in-out',
                        isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
                      )}
                    >
                      <div className="overflow-hidden">
                        <p className="border-t border-border/40 p-4 pt-3 text-xs leading-relaxed text-muted-foreground sm:p-5 sm:pt-3 sm:text-sm text-pretty">
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
      </div>
    </section>
  )
}
