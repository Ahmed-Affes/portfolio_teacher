'use client'

import { useState } from 'react'
import { ArrowRight, CheckCircle2, GraduationCap, Heart, Sparkles, Users, Star } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { SectionScene } from '@/components/section-scene'
import { type Audience } from '@/lib/data'
import { usePortfolio } from '@/lib/portfolio-context'
import { cn } from '@/lib/utils'
import { PushPin } from '@/components/cloud-decorations'

const ICONS = {
  students: GraduationCap,
  parents: Heart,
  teachers: Users,
} as const

const AUDIENCE_COLORS: Record<string, { bg: string; badge: string; accent: string }> = {
  students: { bg: 'bg-[#FFE68C]', badge: 'bg-[#FFC837]', accent: 'text-[#2D1F1D]' },
  parents: { bg: 'bg-[#FFB5B5]', badge: 'bg-[#FF7D6B]', accent: 'text-[#2D1F1D]' },
  teachers: { bg: 'bg-[#A7F3D0]', badge: 'bg-[#34D399]', accent: 'text-[#2D1F1D]' },
}

export function WhoIServe() {
  const { state } = usePortfolio()
  const { audiences } = state
  const activeAudiences = audiences.filter((a) => a.isActive !== false)
  const [active, setActive] = useState(activeAudiences[0]?.id || 'students')
  const current = activeAudiences.find((a) => a.id === active) ?? activeAudiences[0] ?? {
    id: 'students',
    title: 'For Students',
    intro: 'Playful mastery of phonics, grammar, and speaking fluency.',
    points: ['Sensory phonics kits', 'Gamified vocabulary cards'],
  }
  const Icon = ICONS[current.id as keyof typeof ICONS] || GraduationCap
  const theme = AUDIENCE_COLORS[current.id] || AUDIENCE_COLORS.students

  return (
    <section id="serve" className="section-shell relative overflow-hidden bg-transparent py-10 sm:py-14 lg:py-16">
      <SectionScene theme="serve" pattern="grid" />

      <div className="section-inner section-stack">
        <Reveal>
          <SectionHeading
            number="05"
            eyebrow="Target Audiences 🧸"
            title="Tailored support for every learning stage"
            intro="Specialized resources and collaborative services designed for students, parents, and fellow teachers in Sfax and beyond."
            align="center"
            typewriterIntro
          />
        </Reveal>

        {/* Tab Buttons */}
        <Reveal delay={60}>
          <div className="mx-auto flex w-full max-w-xl flex-wrap items-center justify-center gap-2.5 rounded-3xl border-3 border-[#2D1F1D] bg-white p-2 shadow-[4px_4px_0px_#2D1F1D]">
            {activeAudiences.map((a) => {
              const TabIcon = ICONS[a.id as keyof typeof ICONS] || GraduationCap
              const isSelected = active === a.id
              return (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => setActive(a.id)}
                  className={cn(
                    'flex flex-1 items-center justify-center gap-2 rounded-2xl border-2 border-transparent px-4 py-2.5 text-xs font-black whitespace-nowrap transition-all duration-200 cursor-pointer sm:px-5 sm:text-sm',
                    isSelected
                      ? 'border-[#2D1F1D] bg-[#FFC837] text-[#2D1F1D] shadow-[2px_2px_0px_#2D1F1D] -translate-y-0.5'
                      : 'text-[#6B5550] hover:text-[#2D1F1D] hover:bg-[#FFE68C]/30',
                  )}
                >
                  <TabIcon className="size-4 shrink-0" />
                  {a.title}
                </button>
              )
            })}
          </div>
        </Reveal>

        {/* Active Content Card — slides in when tab changes */}
        <Reveal delay={100} key={current.id}>
          <div className="group relative">
            {/* 3D PushPin on unclipped outer container */}
            <PushPin color="yellow" className="left-1/2 -top-1" />

            <div className="relative overflow-hidden rounded-[2.8rem_1.6rem_2.6rem_1.8rem] border-3 border-[#2D1F1D] bg-white shadow-[8px_8px_0px_#2D1F1D] animate-pop-in">
              <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
                {/* Left Column: Playful Pastel Panel */}
                <div className={`relative flex flex-col justify-between gap-5 p-5 sm:p-7 ${theme.bg} border-b-2 lg:border-b-0 lg:border-r-2 border-[#2D1F1D]`}>
                  <div>
                    <div className="flex size-12 items-center justify-center rounded-2xl border-2 border-[#2D1F1D] bg-white text-[#2D1F1D] shadow-[3px_3px_0px_#2D1F1D]">
                      <Icon className="size-6" />
                    </div>
                    <h3 className="mt-4 font-sans text-xl font-black text-[#2D1F1D] sm:text-2xl">
                      {current.title}
                    </h3>
                    <p className="mt-2 text-xs font-bold leading-relaxed text-[#6B5550] sm:text-sm">
                      {current.intro}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-black text-[#2D1F1D] bg-white/80 rounded-xl border border-[#2D1F1D] px-3 py-1.5 shadow-xs">
                    <Sparkles className="size-3.5 text-[#FF7D6B] fill-[#FF7D6B]" />
                    <span>Personalized &amp; Structured Hands-on Crafting</span>
                  </div>
                </div>

                {/* Right Column: Key Offerings & CTA */}
                <div className="flex flex-col justify-between gap-5 p-5 sm:p-7 bg-white">
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-wider text-[#2D1F1D] flex items-center gap-2">
                      <span>What You Receive</span>
                      <Star className="size-3.5 fill-[#FFC837] text-[#2D1F1D]" />
                    </h4>
                    <ul className="mt-4 space-y-3.5">
                      {current.points.map((point) => (
                        <li key={point} className="flex items-start gap-3 text-sm font-bold text-[#2D1F1D]">
                          <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#10B981] text-white">
                            <CheckCircle2 className="size-3.5 stroke-[3]" />
                          </span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t-2 border-[#2D1F1D]/10 pt-5">
                    <a
                      href="#contact"
                      className="cute-btn bg-[#FF7D6B] px-7 py-3.5 text-sm font-black text-white hover:bg-[#FF6B6B]"
                    >
                      <span>Start a Conversation with Farah 🌸</span>
                      <ArrowRight className="size-4.5 stroke-[2.5]" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
