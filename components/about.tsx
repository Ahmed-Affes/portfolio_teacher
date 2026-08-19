'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  GraduationCap,
  Languages,
  Layers,
  Palette,
  Sparkles,
  Heart,
  Volume2,
  Smile,
  Scissors,
  Lightbulb,
} from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { SectionScene } from '@/components/section-scene'
import { TypewriterText } from '@/components/typewriter-text'
import { usePortfolio } from '@/lib/portfolio-context'
import { cn } from '@/lib/utils'
import {
  WashiTape,
  CuteSticker,
  PushPin,
  SpiralBinderRings,
} from '@/components/cloud-decorations'

const PILLAR_ICONS = [Languages, Palette, BookOpen, Layers]
const PILLAR_TABS = [
  { id: 'p1', label: 'Linguistics', icon: '🔤', tabColor: 'bg-[#FFE68C]', activeBg: 'bg-[#FFF9E6]' },
  { id: 'p2', label: 'Tactile Props', icon: '✂️', tabColor: 'bg-[#A7F3D0]', activeBg: 'bg-[#F0FDF4]' },
  { id: 'p3', label: 'Story Quests', icon: '📖', tabColor: 'bg-[#DDD6FE]', activeBg: 'bg-[#F5F3FF]' },
  { id: 'p4', label: 'Joyful Fluency', icon: '🌟', tabColor: 'bg-[#FFB5B5]', activeBg: 'bg-[#FFF1F2]' },
]

export function About() {
  const { state } = usePortfolio()
  const { about, contact } = state
  const [activePillarIndex, setActivePillarIndex] = useState(0)

  const pillarsList = about.pillars && about.pillars.length > 0 ? about.pillars : []
  const safeIndex = activePillarIndex < pillarsList.length ? activePillarIndex : 0
  const activePillar = pillarsList[safeIndex] || {
    id: 'p1',
    number: '01',
    title: 'Linguistics & Applied Pedagogy',
    subtitle: 'Natural Acquisition Science',
    description: 'Rooted in communicative language teaching (CLT) and phonetic awareness.',
    highlights: ['Phoneme-Grapheme Mapping', 'Communicative Fluency'],
  }

  const currentTab = PILLAR_TABS[safeIndex] || PILLAR_TABS[0]

  return (
    <section id="about" className="section-shell relative overflow-hidden bg-transparent py-10 sm:py-14 lg:py-16">
      <div className="section-inner section-stack">
        {/* Top Section Heading */}
        <Reveal>
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              number="01"
              eyebrow={about.eyebrow || 'Meet Teacher Farah 🌸'}
              title={about.title || 'Where linguistics meets tactile creativity'}
              intro={about.intro || 'A joyful educator designing sensory, high-retention English learning experiences.'}
              typewriterIntro
            />
            {contact.openForWorkshops && (
              <div className="flex items-center gap-2">
                <CuteSticker color="mint" rotate="rotate-2" className="hidden md:inline-flex">
                  <span className="size-2.5 rounded-full bg-[#10B981] animate-ping" />
                  <span>Open for workshops &amp; commissions 🎨</span>
                </CuteSticker>
              </div>
            )}
          </div>
        </Reveal>

        {/* Master Scrapbook Atelier Workspace */}
        <div className="grid items-start gap-6 lg:grid-cols-[0.88fr_1.12fr] lg:gap-8">
          {/* LEFT COLUMN: Polaroid Portrait & Attached Manifesto Memo */}
          <div className="flex flex-col gap-4">
            {/* 1. Scrapbook Polaroid Portrait */}
            <Reveal direction="right">
              <div className="group relative mx-auto w-full max-w-sm lg:max-w-none">
                {/* 3D Pushpin and Washi Tape */}
                <PushPin color="red" className="left-1/2 -top-1" />
                <WashiTape color="#FFC837" className="left-8 -top-3 w-24" pattern="stripes" />

                <div className="relative aspect-[4/3.4] max-h-[320px] w-full overflow-hidden rounded-[2.8rem_1.6rem_2.6rem_1.8rem] border-3 border-[#2D1F1D] bg-white shadow-[7px_7px_0px_#2D1F1D] transition-transform duration-300 hover:rotate-1 rotate-[-0.6deg]">
                  <Image
                    src={about.portraitImage || '/images/farah-portrait.png'}
                    alt="Portrait of Farah Affes holding an educational prop in Sfax"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 440px"
                    className="object-cover object-top"
                  />

                  {/* Floating educator pill */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-2xl border-2 border-[#2D1F1D] bg-white/95 p-2 shadow-[2px_2px_0px_#2D1F1D] backdrop-blur-md">
                    <div className="flex items-center gap-2">
                      <div className="flex size-7.5 items-center justify-center rounded-xl border border-[#2D1F1D] bg-[#FFE68C] text-[#2D1F1D]">
                        <GraduationCap className="size-4" />
                      </div>
                      <div>
                        <p className="text-xs font-black text-[#2D1F1D]">Farah Affes</p>
                        <p className="text-[0.62rem] font-bold text-[#6B5550]">
                          English Linguistics &amp; Atelier Teacher
                        </p>
                      </div>
                    </div>
                    <span className="rounded-full border border-[#2D1F1D] bg-[#A7F3D0] px-2 py-0.5 text-[0.6rem] font-black text-[#2D1F1D]">
                      Sfax, TN 🌸
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* 2. Teacher Manifesto Memo Card with unique wavy blob border */}
            <Reveal delay={90} direction="right">
              <div className="group relative">
                {/* 3D PushPin on unclipped outer wrapper */}
                <PushPin color="purple" className="right-8 -top-1" />

                <div className="relative overflow-hidden rounded-[1.8rem_2.8rem_1.6rem_2.4rem] border-3 border-[#2D1F1D] bg-[#FFE68C] p-4 sm:p-5 text-[#2D1F1D] shadow-[6px_6px_0px_#2D1F1D] rotate-[0.6deg]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-[#2D1F1D]">
                      <Sparkles className="size-4 fill-[#FF7D6B] text-[#2D1F1D]" />
                      <span className="text-xs font-black uppercase tracking-wider">Teacher Manifesto</span>
                    </div>
                    {/* Animated sound wave */}
                    <div className="flex h-4 items-end gap-1">
                      <Volume2 className="mr-0.5 size-3.5 text-[#2D1F1D]" />
                      {[8, 14, 10, 18, 12, 16, 8].map((h, idx) => (
                        <span
                          key={idx}
                          className="w-0.5 rounded-full bg-[#2D1F1D]"
                          style={{
                            height: `${h}px`,
                            animation: `soundwave 1.2s ease-in-out infinite ${idx * 0.12}s`,
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  <blockquote className="mt-2.5 font-sans text-xs sm:text-sm font-bold leading-snug text-[#2D1F1D]">
                    &ldquo;
                    <TypewriterText
                      text={about.manifestoQuote || 'When a child touches a word, moves a syllable with their hands, and acts out a story, English stops being a school subject and becomes their voice.'}
                      speed={22}
                      startDelay={200}
                      showCursor={false}
                    />
                    &rdquo;
                  </blockquote>

                  <div className="mt-3 flex items-center justify-between border-t-2 border-[#2D1F1D]/15 pt-2 text-[0.68rem] font-bold text-[#6B5550]">
                    <span className="text-[#2D1F1D] font-black">— {about.manifestoAuthor || 'Farah Affes'}</span>
                    <span className="rounded-full bg-white/80 px-2 py-0.5 text-[0.62rem] text-[#2D1F1D] border border-[#2D1F1D]/20">
                      Classroom Tested ✨
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* RIGHT COLUMN: Interactive Teacher's Atelier Notebook Planner */}
          <div className="relative">
            <Reveal delay={80}>
              <div className="group relative">
                {/* Bookmark Index Tabs sticking out from the top of the notebook */}
                <div className="flex flex-wrap items-end gap-2 pl-6 sm:pl-10 pt-4 pb-0 overflow-visible">
                  {PILLAR_TABS.map((tab, idx) => {
                    const isSelected = safeIndex === idx
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActivePillarIndex(idx)}
                        className={cn(
                          'relative -mb-[3px] flex items-center gap-2 rounded-t-2xl border-2 border-[#2D1F1D] px-3.5 py-2 text-xs font-black transition-all duration-200 cursor-pointer select-none',
                          tab.tabColor,
                          isSelected
                            ? 'z-20 -translate-y-1 border-b-0 shadow-[0_-3px_0_#2D1F1D] text-[#2D1F1D]'
                            : 'z-10 opacity-75 hover:opacity-100 hover:-translate-y-0.5 text-[#2D1F1D]',
                        )}
                      >
                        <span className="text-sm">{tab.icon}</span>
                        <span className="font-sans font-black tracking-wide text-xs">{tab.label}</span>
                      </button>
                    )
                  })}
                </div>

                {/* Open Spiral-Bound Notebook Page with custom organic corners */}
                <div className="relative rounded-[2.4rem_1.8rem_2.8rem_1.6rem] border-3 border-[#2D1F1D] bg-[#FFFDF9] p-5 sm:p-7 shadow-[7px_7px_0px_#2D1F1D] overflow-hidden">
                  {/* Spiral wire binding coils on the left margin */}
                  <SpiralBinderRings count={5} />

                  <div className="pl-4 sm:pl-6">
                    {/* Story Header */}
                    <div className="flex items-center justify-between border-b-2 border-[#2D1F1D]/15 pb-3">
                      <div>
                        <span className="text-[0.65rem] font-black uppercase tracking-wider text-[#FF7D6B]">
                          Pedagogy Note • Page 0{safeIndex + 1}
                        </span>
                        <h3 className="font-sans text-lg font-black text-[#2D1F1D] sm:text-xl">
                          {activePillar.title}
                        </h3>
                      </div>

                      <span className="rounded-full border-2 border-[#2D1F1D] bg-[#FFE68C] px-2.5 py-0.5 text-[0.65rem] font-black text-[#2D1F1D] shadow-2xs">
                        {activePillar.subtitle}
                      </span>
                    </div>

                    {/* Narrative Description */}
                    <p className="mt-3.5 text-xs sm:text-sm leading-relaxed text-[#6B5550] font-medium">
                      {activePillar.description}
                    </p>

                    {/* Method Highlights */}
                    {activePillar.highlights && activePillar.highlights.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2 pt-3 border-t-2 border-[#2D1F1D]/10">
                        {activePillar.highlights.map((h) => (
                          <span
                            key={h}
                            className="inline-flex items-center gap-1.5 rounded-xl border-2 border-[#2D1F1D] bg-[#A7F3D0] px-2.5 py-1 text-xs font-bold text-[#2D1F1D] shadow-[2px_2px_0px_#2D1F1D]"
                          >
                            <CheckCircle2 className="size-3.5 stroke-[2.5] text-[#10B981]" />
                            {h}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Cute Atelier Secret Post-It Note */}
                    <div className="mt-4 rounded-2xl border-2 border-[#2D1F1D] bg-[#FAF5EC] p-3.5 shadow-2xs">
                      <div className="flex items-start gap-2.5">
                        <span className="text-xl">✂️</span>
                        <div>
                          <p className="text-xs font-black text-[#2D1F1D]">The Atelier Approach:</p>
                          <p className="text-[0.72rem] font-medium leading-relaxed text-[#6B5550] mt-0.5">
                            Traditional rote drills often create language anxiety. By building tactile felt letters, character dice, and story quests, learners touch English and speak with natural joy!
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action Shelf */}
                    <div className="mt-5 flex flex-col sm:flex-row gap-3 pt-3 border-t-2 border-[#2D1F1D]/10">
                      <a
                        href="#contact"
                        className="cute-btn flex-1 bg-[#FF7D6B] py-3 text-xs font-black text-white hover:bg-[#FF6B6B]"
                      >
                        <span>Book Workshop with Farah 🌸</span>
                        <ArrowRight className="size-4 stroke-[2.5]" />
                      </a>
                      <a
                        href="#work"
                        className="cute-btn bg-white px-5 py-3 text-xs font-black text-[#2D1F1D] hover:bg-[#FAF5EC]"
                      >
                        <span>Explore Crafts 🎒</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
