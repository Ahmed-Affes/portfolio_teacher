'use client'

import { useState } from 'react'
import { ArrowRight, HelpCircle, Plus, Sparkles } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { SectionScene } from '@/components/section-scene'
import { usePortfolio } from '@/lib/portfolio-context'
import { cn } from '@/lib/utils'
import { PushPin } from '@/components/cloud-decorations'

export function Faq() {
  const { state } = usePortfolio()
  const { faqs } = state
  const activeFaqs = faqs.filter((f) => f.isActive !== false)
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="section-shell relative overflow-hidden bg-white py-10 sm:py-14 lg:py-16">
      <SectionScene theme="faq" pattern="grid" />

      <div className="section-inner">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          {/* Left Column */}
          <Reveal>
            <div className="flex flex-col items-start">
              <SectionHeading
                number="07"
                eyebrow="Got Questions? 💡"
                title="Everything you need to know"
                intro="Answers about handmade prop rentals, printable digital downloads, and custom teacher workshops."
                typewriterIntro
              />

              <div className="group relative mt-6 w-full">
                {/* 3D PushPin on unclipped outer wrapper */}
                <PushPin color="coral" className="left-8 -top-1" />

                <div className="relative w-full overflow-hidden rounded-[2.6rem_1.6rem_2.8rem_1.8rem] border-[1.5px] border-[#3E251E]/40 bg-[#FFE68C] p-5 sm:p-6 text-[#2D1F1D] shadow-[0_12px_28px_rgba(45,31,29,0.08),3px_3px_0px_rgba(45,31,29,0.6)] rotate-[-0.5deg]">
                  {/* Card Header & Fast Response Pill */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="flex size-11 items-center justify-center rounded-2xl border border-[#2D1F1D]/30 bg-white text-[#2D1F1D] shadow-[1.5px_1.5px_0px_rgba(45,31,29,0.3)]">
                        <HelpCircle className="size-5.5 text-[#FF7D6B]" />
                      </span>
                      <div>
                        <h4 className="font-sans text-base font-black text-[#2D1F1D] sm:text-lg">
                          Atelier Help Desk
                        </h4>
                        <p className="text-xs font-bold text-[#6B5550]">Quick Answers &amp; Custom Orders</p>
                      </div>
                    </div>

                    <span className="rounded-full border border-[#2D1F1D]/30 bg-white px-2.5 py-0.5 text-[0.65rem] font-black uppercase text-[#10B981] shadow-2xs">
                      ⚡ &lt; 2h reply
                    </span>
                  </div>

                  {/* Highlights checklist */}
                  <div className="mt-4 space-y-2 border-t border-[#2D1F1D]/15 pt-3.5 text-xs font-bold text-[#2D1F1D]">
                    <div className="flex items-start gap-2">
                      <span className="flex size-4.5 shrink-0 items-center justify-center rounded-full bg-[#10B981] text-[0.6rem] text-white">✓</span>
                      <span><strong>100% Handcrafted:</strong> Durable laminated props built for active classrooms.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="flex size-4.5 shrink-0 items-center justify-center rounded-full bg-[#10B981] text-[0.6rem] text-white">✓</span>
                      <span><strong>Flexible Options:</strong> Buy printable PDFs or rent physical story kits in Sfax.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="flex size-4.5 shrink-0 items-center justify-center rounded-full bg-[#10B981] text-[0.6rem] text-white">✓</span>
                      <span><strong>Custom Requests:</strong> Bespoke phonics flashcards &amp; puppets made to order.</span>
                    </div>
                  </div>

                  {/* Teacher Note Memo */}
                  <div className="mt-4 rounded-2xl border border-[#2D1F1D]/30 bg-white/90 p-3 shadow-2xs">
                    <p className="text-xs font-bold leading-relaxed text-[#6B5550]">
                      <span className="text-[#FF7D6B] font-black">Teacher Farah's Note:</span> Have a special classroom theme or school play coming up? Drop me a message and we'll craft the perfect learning aids together!
                    </p>
                  </div>

                  {/* Action CTA Buttons */}
                  <div className="mt-4 flex flex-col sm:flex-row gap-2">
                    <a
                      href="#contact"
                      className="cute-btn flex-1 bg-[#FF7D6B] py-2.5 text-xs font-black text-white hover:bg-[#FF6B6B]"
                    >
                      <span>Custom Inquiry 🌸</span>
                      <ArrowRight className="size-3.5 stroke-[2.5]" />
                    </a>
                    {state.contact?.whatsapp && (
                      <a
                        href={`https://wa.me/${(state.contact.whatsappRaw || state.contact.whatsapp).replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cute-btn bg-[#A7F3D0] px-4 py-2.5 text-xs font-black text-[#2D1F1D] hover:bg-[#86EFAC]"
                      >
                        <span>WhatsApp 💬</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right Column: Accordion */}
          <ul className="space-y-3.5">
            {activeFaqs.map((faq, i) => {
              const isOpen = openIndex === i
              return (
                <Reveal key={faq.id || faq.q || i} delay={i * 40}>
                  <li
                    className={cn(
                      'overflow-hidden rounded-[1.8rem_1.2rem_2rem_1.4rem] border-[1.5px] border-[#3E251E]/40 bg-white transition-all duration-300',
                      isOpen
                        ? 'shadow-[0_10px_25px_rgba(45,31,29,0.06),3px_3px_0px_rgba(45,31,29,0.6)] -translate-y-0.5 scale-[1.01]'
                        : 'shadow-[0_4px_12px_rgba(45,31,29,0.04),2px_2px_0px_rgba(45,31,29,0.4)] hover:shadow-[0_8px_20px_rgba(45,31,29,0.08),3px_3px_0px_rgba(45,31,29,0.6)]',
                    )}
                  >

                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-4 p-5 text-left cursor-pointer"
                    >
                      <span className="font-sans text-base font-black text-[#2D1F1D] sm:text-lg">
                        {faq.q}
                      </span>
                      <span
                        className={cn(
                          'flex size-9 shrink-0 items-center justify-center rounded-2xl border-2 border-[#2D1F1D] transition-transform duration-200',
                          isOpen
                            ? 'rotate-45 bg-[#FF7D6B] text-white shadow-xs'
                            : 'bg-[#FFE68C] text-[#2D1F1D]',
                        )}
                      >
                        <Plus className="size-5 stroke-[2.5]" />
                      </span>
                    </button>
                    <div
                      className={cn(
                        'grid transition-all duration-200 ease-in-out',
                        isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
                      )}
                    >
                      <div className="overflow-hidden">
                        <p className="border-t-2 border-[#2D1F1D]/10 p-5 pt-3 text-sm font-medium leading-relaxed text-[#6B5550] text-pretty">
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
