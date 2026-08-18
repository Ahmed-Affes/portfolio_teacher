'use client'

import { useState } from 'react'
import { ArrowRight, CheckCircle2, GraduationCap, Heart, Sparkles, Users } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { AUDIENCES } from '@/lib/data'
import { cn } from '@/lib/utils'

const ICONS = {
  students: GraduationCap,
  parents: Heart,
  teachers: Users,
} as const

export function WhoIServe() {
  const [active, setActive] = useState(AUDIENCES[0].id)
  const current = AUDIENCES.find((a) => a.id === active) ?? AUDIENCES[0]
  const Icon = ICONS[current.id as keyof typeof ICONS]

  return (
    <section id="serve" className="section-shell relative overflow-hidden">
      <div className="section-inner section-stack">
        <Reveal>
          <SectionHeading
            number="05"
            eyebrow="Target Audiences"
            title="Tailored support for every learning stage"
            intro="Specialized resources and collaborative services designed for students, parents, and fellow teachers."
            align="center"
          />
        </Reveal>

        {/* Tab Buttons */}
        <Reveal delay={60}>
          <div className="mx-auto flex max-w-md gap-1.5 rounded-full border border-border/80 bg-card p-1.5 shadow-sm">
            {AUDIENCES.map((a) => {
              const TabIcon = ICONS[a.id as keyof typeof ICONS]
              const isSelected = active === a.id
              return (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => setActive(a.id)}
                  className={cn(
                    'flex flex-1 items-center justify-center gap-2 rounded-full py-2 text-xs font-semibold transition-all duration-300',
                    isSelected
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  <TabIcon className="size-4" />
                  <span>{a.title.replace('For ', '')}</span>
                </button>
              )
            })}
          </div>
        </Reveal>

        {/* Active Content Card */}
        <Reveal delay={100}>
          <div className="overflow-hidden rounded-3xl border border-border/75 bg-card shadow-xl shadow-foreground/5 transition-all duration-500">
            <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
              {/* Left Column: Visual Highlight */}
              <div className="relative flex flex-col justify-between gap-6 overflow-hidden bg-secondary p-6 text-secondary-foreground sm:p-8">
                <div className="pointer-events-none absolute -right-12 -top-12 size-48 rounded-full bg-primary/15 blur-3xl" />

                <div className="relative">
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="mt-4 font-serif text-2xl font-semibold text-white">
                    {current.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-secondary-foreground/80 text-pretty">
                    {current.intro}
                  </p>
                </div>

                <div className="relative flex items-center gap-2 text-xs text-primary font-semibold">
                  <Sparkles className="size-4" />
                  <span>Personalized &amp; Structured Scaffolding</span>
                </div>
              </div>

              {/* Right Column: Key Offerings & CTA */}
              <div className="flex flex-col justify-between gap-6 p-6 sm:p-8">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    What You Receive
                  </h4>
                  <ul className="mt-4 space-y-3">
                    {current.points.map((point) => (
                      <li key={point} className="flex items-start gap-3 text-sm text-foreground">
                        <CheckCircle2 className="mt-0.5 size-4.5 shrink-0 text-primary" />
                        <span className="leading-snug">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-border/60 pt-4">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 rounded-full bg-secondary px-6 py-3 text-xs font-semibold text-secondary-foreground shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg sm:text-sm"
                  >
                    Start a conversation
                    <ArrowRight className="size-4 text-primary" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
