'use client'

import { useState } from 'react'
import { Check, GraduationCap, Heart, Users } from 'lucide-react'
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
    <section id="serve" className="scroll-mt-20 py-10 sm:py-14 lg:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Services"
          title="Who I serve"
          intro="Tailored support and materials for everyone in the learning journey — pick the path that fits you."
          align="center"
        />

        {/* Compact Audience Tabs */}
        <div className="mx-auto mt-6 flex max-w-md flex-wrap justify-center gap-1.5 rounded-full border border-border bg-card p-1.5 shadow-xs">
          {AUDIENCES.map((a) => {
            const TabIcon = ICONS[a.id as keyof typeof ICONS]
            return (
              <button
                key={a.id}
                type="button"
                onClick={() => setActive(a.id)}
                className={cn(
                  'flex flex-1 items-center justify-center gap-1.5 rounded-full px-3 py-2 text-xs sm:text-sm font-semibold transition-all duration-200',
                  active === a.id
                    ? 'bg-primary text-primary-foreground shadow-xs'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/60',
                )}
              >
                <TabIcon className="size-3.5 sm:size-4" />
                {a.title.replace('For ', '')}
              </button>
            )
          })}
        </div>

        {/* Content Card */}
        <div
          key={current.id}
          className="mx-auto mt-6 grid max-w-3xl gap-6 rounded-3xl border border-border bg-card p-5 sm:p-7 shadow-sm transition-all duration-300 animate-in fade-in md:grid-cols-[1fr_1.3fr] items-center"
        >
          <div className="flex flex-col justify-center gap-3 rounded-2xl bg-secondary p-5 sm:p-6 text-secondary-foreground shadow-xs">
            <span className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
              <Icon className="size-5.5" />
            </span>
            <h3 className="font-serif text-xl font-semibold leading-tight">
              {current.title}
            </h3>
            <p className="text-xs sm:text-sm leading-relaxed text-secondary-foreground/80 text-pretty">
              {current.intro}
            </p>
          </div>

          <div className="flex flex-col justify-center">
            <ul className="flex flex-col gap-2.5">
              {current.points.map((point) => (
                <li key={point} className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/25 text-foreground">
                    <Check className="size-3" />
                  </span>
                  <span className="text-xs sm:text-sm leading-relaxed text-foreground">
                    {point}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-5 pt-3.5 border-t border-border/70">
              <a
                href="#contact"
                className="inline-flex rounded-full bg-secondary px-5 py-2.5 text-xs sm:text-sm font-semibold text-secondary-foreground shadow-xs transition-all hover:-translate-y-0.5 hover:shadow"
              >
                Let&apos;s work together
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
