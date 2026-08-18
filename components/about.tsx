'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  GraduationCap,
  Languages,
  Layers,
  Palette,
  Sparkles,
  Volume2,
} from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { usePortfolio } from '@/lib/portfolio-context'
import { cn } from '@/lib/utils'

const PILLAR_ICONS = [Languages, Palette, BookOpen, Layers]

export function About() {
  const { state } = usePortfolio()
  const { about, stats, contact } = state
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

  return (
    <section id="about" className="section-shell relative overflow-hidden">
      {/* Background ambient accents */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-32 top-1/4 size-96 rounded-full bg-primary/10 blur-[100px]" />
        <div className="absolute -right-32 bottom-1/4 size-96 rounded-full bg-secondary/5 blur-[120px]" />
        <div className="grid-paper absolute inset-0 opacity-40" />
      </div>

      <div className="section-inner section-stack">
        {/* Top Section Heading */}
        <Reveal>
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              number="01"
              eyebrow={about.eyebrow || 'Pedagogy & Philosophy'}
              title={about.title || 'Where linguistics meets tactile creativity'}
              intro={about.intro || 'A modern educator designing sensory, high-retention English learning experiences.'}
            />
            {contact.openForWorkshops && (
              <div className="hidden shrink-0 items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-foreground md:flex">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-primary" />
                </span>
                Open for workshops &amp; commissions
              </div>
            )}
          </div>
        </Reveal>

        {/* Master Bento Layout */}
        <div className="grid items-start gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:gap-12 xl:gap-14">
          {/* Left Column: Editorial Portrait & Philosophy */}
          <div className="flex flex-col gap-6">
            <Reveal direction="right">
              <div className="group relative mx-auto w-full max-w-sm lg:max-w-none">
                {/* Glow ring */}
                <div className="absolute -inset-2.5 rounded-[2.25rem] bg-gradient-to-tr from-primary/30 via-primary/10 to-secondary/20 blur-md transition-all duration-700 group-hover:blur-lg" />

                <div className="relative aspect-[4/4.7] w-full overflow-hidden isolate rounded-[2rem] border-2 border-white/80 bg-card shadow-2xl shadow-foreground/10 ring-1 ring-border/50">
                  <Image
                    src="/images/farah-portrait.png"
                    alt="Portrait of Farah Affes holding an educational prop in Sfax"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 440px"
                    className="object-cover object-top transform-gpu transition-transform duration-500 ease-out group-hover:scale-105 will-change-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 via-transparent to-transparent opacity-80" />

                  {/* Floating credentials pill */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-xl border border-white/20 bg-card/90 p-3 shadow-xl backdrop-blur-md">
                    <div className="flex items-center gap-2.5">
                      <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
                        <GraduationCap className="size-4.5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-foreground">Farah Affes</p>
                        <p className="text-[0.65rem] font-medium text-muted-foreground">
                          English Studies &amp; Linguistics
                        </p>
                      </div>
                    </div>
                    <span className="flex items-center gap-1 rounded-full bg-primary/20 px-2 py-0.5 text-[0.65rem] font-bold text-foreground ring-1 ring-primary/30">
                      <Award className="size-3" />
                      Verified
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Philosophy quote with interactive wave visualizer */}
            <Reveal delay={100} direction="right">
              <div className="group relative overflow-hidden rounded-2xl border border-border/70 bg-secondary p-5 text-secondary-foreground shadow-xl sm:p-6">
                <div className="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full bg-primary/15 blur-2xl" />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-primary">
                    <Sparkles className="size-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">The Core Manifesto</span>
                  </div>
                  {/* Animated sound wave decoration */}
                  <div className="flex h-6 items-end gap-0.5" title="Interactive phonics rhythm">
                    <Volume2 className="mr-1 size-3.5 text-primary/75" />
                    {[10, 18, 14, 22, 16, 20, 12, 16, 8].map((h, idx) => (
                      <span
                        key={idx}
                        className="w-0.5 origin-bottom rounded-full bg-primary/80 transition-colors duration-300 group-hover:bg-primary will-change-transform"
                        style={{
                          height: `${h}px`,
                          animation: `soundwave 1.2s ease-in-out infinite ${idx * 0.12}s`,
                        }}
                      />
                    ))}
                  </div>
                </div>

                <blockquote className="mt-3 font-serif text-base italic leading-relaxed text-secondary-foreground/95 sm:text-lg">
                  &ldquo;{about.manifestoQuote || 'Language isn’t memorized from a dry textbook — it truly sticks when learners can touch it, build with it, and laugh along the way.'}&rdquo;
                </blockquote>

                <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 text-xs text-secondary-foreground/75">
                  <span className="font-semibold text-primary">— {about.manifestoAuthor || 'Farah Affes'}</span>
                  <span>{about.manifestoLocation || contact.location || 'Sfax, Tunisia'}</span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Narrative, Interactive Pillars & Credentials */}
          <div className="flex flex-col gap-6">
            {/* Narrative bio */}
            <Reveal delay={60}>
              <div className="space-y-3.5 text-sm leading-relaxed text-muted-foreground sm:text-base text-pretty">
                <p>{about.bio1}</p>
                <p>{about.bio2}</p>
              </div>
            </Reveal>

            {/* Interactive 4-Pillar Atelier Navigator */}
            <Reveal delay={120}>
              <div className="rounded-2xl border border-border/80 bg-card p-4 shadow-sm sm:p-5">
                <div className="flex items-center justify-between border-b border-border/60 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="flex size-6 items-center justify-center rounded-md bg-primary/20 text-xs font-bold text-foreground">
                      {pillarsList.length}
                    </span>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-foreground sm:text-sm">
                      My Pedagogical Pillars
                    </h3>
                  </div>
                  <span className="text-[0.65rem] font-medium text-muted-foreground">
                    Click to explore approach
                  </span>
                </div>

                {/* Tab buttons */}
                <div className="mt-3.5 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {pillarsList.map((pillar, i) => {
                    const Icon = PILLAR_ICONS[i % PILLAR_ICONS.length] || Languages
                    const isSelected = safeIndex === i
                    return (
                      <button
                        key={pillar.id || i}
                        type="button"
                        onClick={() => setActivePillarIndex(i)}
                        className={cn(
                          'flex flex-col items-start gap-1.5 rounded-xl border p-2.5 text-left transition-all duration-300',
                          isSelected
                            ? 'border-primary bg-primary/10 shadow-sm ring-1 ring-primary/40'
                            : 'border-border/60 bg-muted/30 hover:border-primary/30 hover:bg-muted/60',
                        )}
                      >
                        <div className="flex w-full items-center justify-between">
                          <span
                            className={cn(
                              'flex size-7 items-center justify-center rounded-lg transition-colors',
                              isSelected ? 'bg-primary text-primary-foreground' : 'bg-background text-muted-foreground',
                            )}
                          >
                            <Icon className="size-3.5" />
                          </span>
                          <span className="font-serif text-[0.65rem] font-bold text-muted-foreground">
                            {pillar.number || `0${i + 1}`}
                          </span>
                        </div>
                        <span className="line-clamp-1 text-xs font-bold text-foreground">
                          {pillar.title.split('&')[0]}
                        </span>
                      </button>
                    )
                  })}
                </div>

                {/* Active Pillar Card Details */}
                <div className="mt-4 rounded-xl border border-primary/20 bg-primary/[0.04] p-4 transition-all duration-300">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4 className="font-serif text-base font-semibold text-foreground sm:text-lg">
                      {activePillar.title}
                    </h4>
                    <span className="rounded-full bg-primary/20 px-2.5 py-0.5 text-[0.65rem] font-bold uppercase text-foreground">
                      {activePillar.subtitle}
                    </span>
                  </div>

                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm text-pretty">
                    {activePillar.description}
                  </p>

                  {activePillar.highlights && activePillar.highlights.length > 0 && (
                    <div className="mt-3.5 flex flex-wrap gap-2 pt-2 border-t border-border/50">
                      {activePillar.highlights.map((h) => (
                        <span
                          key={h}
                          className="inline-flex items-center gap-1.5 rounded-md border border-border/70 bg-card px-2.5 py-1 text-[0.65rem] font-semibold text-foreground shadow-2xs sm:text-xs"
                        >
                          <CheckCircle2 className="size-3 text-primary" />
                          {h}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Reveal>

            {/* Stats & Milestones Bar */}
            <Reveal delay={160}>
              <dl className="grid grid-cols-2 gap-3 rounded-2xl border border-border/70 bg-card p-4 sm:grid-cols-4">
                {stats.map((s) => (
                  <div key={s.id || s.label} className="flex flex-col">
                    <dt className="font-serif text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                      {s.value}
                    </dt>
                    <dd className="mt-0.5 text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground sm:text-[0.7rem]">
                      {s.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            {/* Quick Action Buttons */}
            <Reveal delay={200}>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full bg-secondary px-6 py-3 text-xs font-semibold text-secondary-foreground shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg sm:text-sm"
                >
                  Book consultation or workshop
                  <ArrowRight className="size-4 text-primary" />
                </a>
                <a
                  href="#work"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-xs font-semibold text-foreground transition-all duration-300 hover:border-primary/40 hover:bg-muted sm:text-sm"
                >
                  View handcrafted materials
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
