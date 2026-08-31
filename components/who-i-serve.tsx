'use client'

import { useState } from 'react'
import { ArrowRight, CheckCircle2, GraduationCap, Heart, Sparkles, Users, Star } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { SectionScene } from '@/components/section-scene'
import { type Audience } from '@/lib/data'
import { usePortfolio } from '@/lib/portfolio-context'
import { cn } from '@/lib/utils'
import {
  PushPin,
  FloatingCloud,
  DoodleRainbow,
  FloatingTweety,
  SmilingFlower,
  SmilingStar,
  PastelBalloon,
} from '@/components/cloud-decorations'

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
    <section id="serve" className="section-shell relative overflow-hidden bg-[#FAF5EC] py-10 sm:py-14 lg:py-16">
      {/* Happy Stationary Decorations */}
      <FloatingCloud mood="laughing" size="md" className="top-6 right-8 opacity-60 hidden sm:block" />
      <DoodleRainbow size={68} className="top-12 left-6 opacity-70 hidden md:block" />
      <SmilingStar size={34} color="#FFC837" className="bottom-14 left-8 opacity-75 hidden sm:block" />
      <SmilingFlower size={42} color="#A7F3D0" className="bottom-10 right-10 opacity-70 hidden md:block" />
      <FloatingTweety size={46} className="top-1/2 left-4 opacity-75 hidden lg:block" />

      <SectionScene theme="serve" pattern="grid" />

      <div className="section-inner section-stack">
        <Reveal>
          <SectionHeading
            number="04"
            eyebrow="Target Audiences 🧸"
            title="Tailored support for every learning stage"
            intro="Specialized resources and collaborative services designed for students, parents, and fellow teachers in Sfax and beyond."
            align="center"
            typewriterIntro
          />
        </Reveal>

        {/* Tab Buttons */}
        <Reveal delay={60} className="w-full">
          <div className="mx-auto w-full max-w-md grid grid-cols-3 gap-1 rounded-2xl sm:rounded-full border-[1.5px] border-[#3E251E]/40 bg-white p-1.5 shadow-[0_6px_16px_rgba(45,31,29,0.05),2px_2px_0px_rgba(45,31,29,0.6)]">
            {activeAudiences.map((a) => {
              const TabIcon = ICONS[a.id as keyof typeof ICONS] || GraduationCap
              const isSelected = active === a.id
              const shortLabel =
                a.id === 'students' ? 'Students' : a.id === 'parents' ? 'Parents' : 'Teachers'

              return (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => setActive(a.id)}
                  className={cn(
                    'flex items-center justify-center gap-1 sm:gap-1.5 rounded-xl sm:rounded-full px-2 py-2 text-xs font-black transition-all duration-200 cursor-pointer min-h-[44px] touch-manipulation',
                    isSelected
                      ? 'border border-[#2D1F1D]/40 bg-[#FFC837] text-[#2D1F1D] shadow-[1.5px_1.5px_0px_rgba(45,31,29,0.4)] -translate-y-0.5'
                      : 'text-[#6B5550] hover:text-[#2D1F1D] hover:bg-[#FFE68C]/30',
                  )}
                >
                  <TabIcon className="size-3.5 sm:size-4 shrink-0" />
                  <span className="truncate">{shortLabel}</span>
                </button>
              )
            })}
          </div>
        </Reveal>

        {/* Active Content Card — slides in when tab changes */}
        <Reveal delay={100} key={current.id} className="w-full">
          <div className="group relative pt-3">
            {/* 3D PushPin piercing directly into the card's top edge (no floating gap) */}
            <PushPin color="yellow" size={24} className="left-1/2 top-3 z-30" />

            <div className="relative overflow-hidden rounded-[1.6rem_1.3rem_1.8rem_1.4rem] sm:rounded-[2.8rem_1.6rem_2.6rem_1.8rem] border-[1.5px] border-[#3E251E]/40 bg-white shadow-[0_8px_24px_rgba(45,31,29,0.06),3px_3px_0px_rgba(45,31,29,0.6)] sm:shadow-[0_14px_32px_rgba(45,31,29,0.08),4px_4px_0px_rgba(45,31,29,0.6)] animate-pop-in">
              <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
                {/* Left Column: Playful Pastel Panel */}
                <div className={`relative flex flex-col justify-between gap-4 sm:gap-5 p-4 sm:p-7 ${theme.bg} border-b lg:border-b-0 lg:border-r border-[#2D1F1D]/20`}>
                  <div>
                    <div className="flex size-10 sm:size-12 items-center justify-center rounded-xl sm:rounded-2xl border-[1.5px] border-[#2D1F1D]/40 bg-white text-[#2D1F1D] shadow-[2px_2px_0px_rgba(45,31,29,0.4)]">
                      <Icon className="size-5 sm:size-6" />
                    </div>
                    <h3 className="mt-3 sm:mt-4 font-sans text-lg sm:text-2xl font-black text-[#2D1F1D]">
                      {current.title}
                    </h3>
                    <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm font-bold leading-relaxed text-[#6B5550]">
                      {current.intro}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 sm:gap-2 text-[0.68rem] sm:text-xs font-black text-[#2D1F1D] bg-white/80 rounded-xl border border-[#2D1F1D]/30 px-2.5 sm:px-3 py-1.5 shadow-xs">
                    <Sparkles className="size-3 sm:size-3.5 text-[#FF7D6B] fill-[#FF7D6B] shrink-0" />
                    <span>Personalized &amp; Structured Hands-on Crafting</span>
                  </div>
                </div>

                {/* Right Column: Key Offerings & CTA */}
                <div className="flex flex-col justify-between gap-4 sm:gap-5 p-4 sm:p-7 bg-white">
                  <div>
                    <h4 className="text-[0.68rem] sm:text-xs font-black uppercase tracking-wider text-[#2D1F1D] flex items-center gap-1.5">
                      <span>What You Receive</span>
                      <Star className="size-3 sm:size-3.5 fill-[#FFC837] text-[#2D1F1D]" />
                    </h4>
                    <ul className="mt-3 sm:mt-4 space-y-2.5 sm:space-y-3.5">
                      {current.points.map((point) => (
                        <li key={point} className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-sm font-bold text-[#2D1F1D]">
                          <span className="flex size-4.5 sm:size-5 shrink-0 items-center justify-center rounded-full bg-[#10B981] text-white mt-0.5">
                            <CheckCircle2 className="size-3 sm:size-3.5 stroke-[3]" />
                          </span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t border-[#2D1F1D]/10 pt-4 sm:pt-5">
                    <a
                      href="#contact"
                      className="cute-btn w-full sm:w-auto bg-[#FF7D6B] px-5 sm:px-7 py-3 text-xs sm:text-sm font-black text-white hover:bg-[#FF6B6B] min-h-[44px] flex items-center justify-center gap-2 touch-manipulation"
                    >
                      <span>Start a Conversation with Farah 🌸</span>
                      <ArrowRight className="size-4 stroke-[2.5]" />
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
