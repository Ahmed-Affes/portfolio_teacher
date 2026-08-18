'use client'

import { useState } from 'react'
import { Check, GraduationCap, Heart, Users } from 'lucide-react'
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
    <section id="serve" className="relative scroll-mt-20 py-16 sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-48 section-glow" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            number="05"
            eyebrow="Services"
            title="Who I serve"
            intro="Tailored support and materials for everyone in the learning journey — pick the path that fits you."
            align="center"
          />
        </Reveal>

        <Reveal delay={80}>
          <div className="mx-auto mt-8 flex max-w-lg flex-wrap justify-center gap-1.5 rounded-2xl border border-border/60 bg-card/80 p-2 shadow-sm backdrop-blur-sm">
            {AUDIENCES.map((a) => {
              const TabIcon = ICONS[a.id as keyof typeof ICONS]
              return (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => setActive(a.id)}
                  className={cn(
                    'flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-xs font-semibold transition-all duration-300 sm:text-sm',
                    active === a.id
                      ? 'bg-secondary text-secondary-foreground shadow-md'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                  )}
                >
                  <TabIcon className="size-4" />
                  {a.title.replace('For ', '')}
                </button>
              )
            })}
          </div>
        </Reveal>

        <Reveal delay={160}>
          <div
            key={current.id}
            className="mx-auto mt-8 grid max-w-4xl gap-6 overflow-hidden rounded-3xl border border-border/70 bg-card shadow-lg transition-all duration-500 animate-in fade-in md:grid-cols-[1fr_1.4fr]"
          >
            <div className="relative flex flex-col justify-center gap-4 bg-secondary p-6 text-secondary-foreground sm:p-8">
              <div className="absolute -right-8 -top-8 size-32 rounded-full bg-primary/10 blur-2xl" />
              <span className="relative flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/25">
                <Icon className="size-6" />
              </span>
              <h3 className="relative font-serif text-2xl font-semibold leading-tight">
                {current.title}
              </h3>
              <p className="relative text-sm leading-relaxed text-secondary-foreground/80 text-pretty">
                {current.intro}
              </p>
            </div>

            <div className="flex flex-col justify-center p-6 sm:p-8">
              <ul className="flex flex-col gap-3">
                {current.points.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-foreground ring-1 ring-primary/25">
                      <Check className="size-3.5" />
                    </span>
                    <span className="text-sm leading-relaxed text-foreground">{point}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 border-t border-border/60 pt-5">
                <a
                  href="#contact"
                  className="inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30"
                >
                  Let&apos;s work together
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
