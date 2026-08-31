'use client'

import { useState } from 'react'
import { ArrowRight, HelpCircle, Plus, Sparkles } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { SectionScene } from '@/components/section-scene'
import { usePortfolio } from '@/lib/portfolio-context'
import { cn } from '@/lib/utils'
import {
  PushPin,
  FloatingCloud,
  DoodleLightbulb,
  SmilingStar,
  SmilingFlower,
} from '@/components/cloud-decorations'

export function Faq() {
  const { state } = usePortfolio()
  const { faqs } = state
  const activeFaqs = faqs.filter((f) => f.isActive !== false)
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="section-shell relative overflow-hidden bg-white py-10 sm:py-14 lg:py-16">
      {/* Happy Stationary Decorations */}
      <FloatingCloud mood="smiling" size="md" className="top-6 right-8 opacity-60 hidden md:block" />
      <DoodleLightbulb size={46} className="top-14 left-8 opacity-75 hidden lg:block" />
      <SmilingStar size={34} color="#FFC837" className="bottom-14 right-10 opacity-75 hidden sm:block" />
      <SmilingFlower size={40} color="#FFB5B5" className="bottom-10 left-8 opacity-70 hidden md:block" />

      <SectionScene theme="faq" pattern="grid" />

      <div className="section-inner">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          {/* Left Column */}
          <Reveal>
            <div className="flex flex-col items-start">
              <SectionHeading
                number="06"
                eyebrow="Got Questions? 💡"
                title="Everything you need to know"
                intro="Answers about teaching methodology, tactile props, and teacher training workshops."
                typewriterIntro
              />

              <div className="group relative mt-4 sm:mt-6 w-full pt-3">
                {/* 3D PushPin piercing into Help Desk card */}
                <PushPin color="coral" size={22} className="left-6 sm:left-8 top-3 z-30" />

                <div className="relative w-full overflow-hidden rounded-[1.6rem_1.2rem_1.8rem_1.4rem] sm:rounded-[2.6rem_1.6rem_2.8rem_1.8rem] border-[1.5px] border-[#3E251E]/40 bg-[#FFE68C] p-4 sm:p-6 text-[#2D1F1D] shadow-[0_8px_24px_rgba(45,31,29,0.06),2.5px_2.5px_0px_rgba(45,31,29,0.6)] sm:shadow-[0_12px_28px_rgba(45,31,29,0.08),3px_3px_0px_rgba(45,31,29,0.6)] rotate-0 sm:rotate-[-0.5deg]">
                  {/* Card Header & Fast Response Pill */}
                  <div className="flex items-start justify-between gap-2.5">
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <span className="flex size-9 sm:size-11 items-center justify-center rounded-xl sm:rounded-2xl border border-[#2D1F1D]/30 bg-white text-[#2D1F1D] shadow-xs">
                        <HelpCircle className="size-4.5 sm:size-5.5 text-[#FF7D6B]" />
                      </span>
                      <div>
                        <h4 className="font-sans text-sm sm:text-lg font-black text-[#2D1F1D]">
                          Atelier Help Desk
                        </h4>
                        <p className="text-[0.68rem] sm:text-xs font-bold text-[#6B5550]">Quick Answers &amp; Inquiries</p>
                      </div>
                    </div>

                    <span className="rounded-full border border-[#2D1F1D]/30 bg-white px-2 py-0.5 text-[0.62rem] sm:text-[0.65rem] font-black uppercase text-[#10B981] shadow-2xs shrink-0">
                      ⚡ &lt; 2h reply
                    </span>
                  </div>

                  {/* Highlights checklist */}
                  <div className="mt-3.5 space-y-1.5 sm:space-y-2 border-t border-[#2D1F1D]/15 pt-3 text-[0.72rem] sm:text-xs font-bold text-[#2D1F1D]">
                    <div className="flex items-start gap-2">
                      <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-[#10B981] text-[0.55rem] text-white mt-0.5">✓</span>
                      <span><strong>100% Handcrafted:</strong> Durable laminated props built for active classrooms.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-[#10B981] text-[0.55rem] text-white mt-0.5">✓</span>
                      <span><strong>Flexible Options:</strong> Buy printable PDFs or rent physical story kits in Sfax.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-[#10B981] text-[0.55rem] text-white mt-0.5">✓</span>
                      <span><strong>Custom Requests:</strong> Bespoke phonics flashcards &amp; puppets made to order.</span>
                    </div>
                  </div>

                  {/* Teacher Note Memo */}
                  <div className="mt-3.5 rounded-xl sm:rounded-2xl border border-[#2D1F1D]/30 bg-white/90 p-2.5 sm:p-3 shadow-2xs">
                    <p className="text-[0.68rem] sm:text-xs font-bold leading-relaxed text-[#6B5550]">
                      <span className="text-[#FF7D6B] font-black">Teacher Farah's Note:</span> Have a special classroom theme or school play coming up? Drop me a message and we'll craft the perfect learning aids together!
                    </p>
                  </div>

                  {/* Action CTA Buttons */}
                  <div className="mt-3.5 flex flex-col sm:flex-row gap-2">
                    <a
                      href="#contact"
                      className="cute-btn flex-1 bg-[#FF7D6B] py-2.5 text-xs font-black text-white hover:bg-[#FF6B6B] min-h-[44px] flex items-center justify-center gap-1.5 touch-manipulation"
                    >
                      <span>Custom Inquiry 🌸</span>
                      <ArrowRight className="size-3.5 stroke-[2.5]" />
                    </a>
                    {state.contact?.whatsapp && (
                      <a
                        href={`https://wa.me/${(state.contact.whatsappRaw || state.contact.whatsapp).replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cute-btn bg-[#A7F3D0] px-4 py-2.5 text-xs font-black text-[#2D1F1D] hover:bg-[#86EFAC] min-h-[44px] flex items-center justify-center touch-manipulation"
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
          <ul className="space-y-3 sm:space-y-3.5">
            {activeFaqs.map((faq, i) => {
              const isOpen = openIndex === i
              return (
                <Reveal key={faq.id || faq.q || i} delay={i * 40} className="w-full">
                  <li
                    className={cn(
                      'overflow-hidden rounded-[1.4rem_1.1rem_1.6rem_1.2rem] sm:rounded-[1.8rem_1.2rem_2rem_1.4rem] border-[1.5px] border-[#3E251E]/40 bg-white transition-all duration-300',
                      isOpen
                        ? 'shadow-[0_8px_20px_rgba(45,31,29,0.06),2.5px_2.5px_0px_rgba(45,31,29,0.6)] -translate-y-0.5'
                        : 'shadow-[0_4px_12px_rgba(45,31,29,0.04),2px_2px_0px_rgba(45,31,29,0.4)] hover:shadow-[0_8px_20px_rgba(45,31,29,0.08),3px_3px_0px_rgba(45,31,29,0.6)]',
                    )}
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-3 p-3.5 sm:p-5 text-left cursor-pointer min-h-[48px] touch-manipulation"
                    >
                      <span className="font-sans text-sm sm:text-lg font-black text-[#2D1F1D] leading-snug">
                        {faq.q}
                      </span>
                      <span
                        className={cn(
                          'flex size-8 sm:size-9 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl border-[1.5px] border-[#2D1F1D] transition-transform duration-200',
                          isOpen
                            ? 'rotate-45 bg-[#FF7D6B] text-white shadow-xs'
                            : 'bg-[#FFE68C] text-[#2D1F1D]',
                        )}
                      >
                        <Plus className="size-4 sm:size-5 stroke-[2.5]" />
                      </span>
                    </button>
                    <div
                      className={cn(
                        'grid transition-all duration-200 ease-in-out',
                        isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
                      )}
                    >
                      <div className="overflow-hidden">
                        <p className="border-t border-[#2D1F1D]/10 p-3.5 sm:p-5 pt-2.5 sm:pt-3 text-xs sm:text-sm font-medium leading-relaxed text-[#6B5550] text-pretty">
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
