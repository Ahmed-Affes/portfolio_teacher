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
    <section id="serve" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Services"
          title="Who I serve"
          intro="Tailored support and materials for everyone in the learning journey — pick the path that fits you."
          align="center"
        />

        <div className="mx-auto mt-10 flex max-w-md flex-wrap justify-center gap-2 rounded-full border border-border bg-card p-1.5 shadow-sm">
          {AUDIENCES.map((a) => {
            const TabIcon = ICONS[a.id as keyof typeof ICONS]
            return (
              <button
                key={a.id}
                type="button"
                onClick={() => setActive(a.id)}
                className={cn(
                  'flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-200',
                  active === a.id
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/60',
                )}
              >
                <TabIcon className="size-4" />
                {a.title.replace('For ', '')}
              </button>
            )
          })}
        </div>

        <div
          key={current.id}
          className="mx-auto mt-8 grid max-w-4xl gap-8 rounded-[2rem] border border-border bg-card p-6 shadow-md transition-all duration-300 animate-in fade-in sm:p-10 md:grid-cols-[1fr_1.2fr] items-center"
        >
          <div className="flex flex-col justify-center gap-4 rounded-2xl bg-secondary p-6 sm:p-8 text-secondary-foreground shadow-sm">
            <span className="flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md shadow-primary/30">
              <Icon className="size-7" />
            </span>
            <h3 className="font-serif text-2xl font-semibold leading-tight">
              {current.title}
            </h3>
            <p className="leading-relaxed text-secondary-foreground/80 text-pretty">
              {current.intro}
            </p>
          </div>

          <div className="flex flex-col justify-center">
            <ul className="flex flex-col gap-3.5">
              {current.points.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/25 text-foreground">
                    <Check className="size-3.5" />
                  </span>
                  <span className="text-base leading-relaxed text-foreground">
                    {point}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-4 border-t border-border/70">
              <a
                href="#contact"
                className="inline-flex rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-secondary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:shadow"
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
