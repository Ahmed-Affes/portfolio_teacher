'use client'

import { useState } from 'react'
import { Check, GraduationCap, Heart, Users } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { AUDIENCES } from '@/lib/data'
import { cn } from '@/lib/utils'

const ICONS = { students: GraduationCap, parents: Heart, teachers: Users } as const

export function WhoIServe() {
  const [active, setActive] = useState(AUDIENCES[0].id)
  const current = AUDIENCES.find((a) => a.id === active) ?? AUDIENCES[0]
  const Icon = ICONS[current.id as keyof typeof ICONS]

  return (
    <section id="serve" className="section-shell relative">
      <div className="section-inner section-stack">
        <Reveal>
          <SectionHeading
            number="05"
            eyebrow="Services"
            title="Who I serve"
            intro="Support for students, parents, and educators."
            align="center"
          />
        </Reveal>

        <Reveal delay={40}>
          <div className="mx-auto flex max-w-md gap-1 rounded-xl border border-border/60 bg-card p-1">
            {AUDIENCES.map((a) => {
              const TabIcon = ICONS[a.id as keyof typeof ICONS]
              return (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => setActive(a.id)}
                  className={cn(
                    'flex flex-1 items-center justify-center gap-1 rounded-lg px-2 py-2 text-[0.65rem] font-semibold sm:text-xs',
                    active === a.id ? 'bg-primary text-primary-foreground' : 'text-muted-foreground',
                  )}
                >
                  <TabIcon className="size-3.5" />
                  <span className="hidden sm:inline">{a.title.replace('For ', '')}</span>
                  <span className="sm:hidden">{a.title.replace('For ', '').slice(0, 3)}</span>
                </button>
              )
            })}
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div key={current.id} className="grid gap-4 rounded-2xl border border-border/60 bg-card p-4 sm:grid-cols-2 sm:p-5">
            <div className="rounded-xl bg-secondary p-4 text-secondary-foreground">
              <Icon className="size-5 text-primary" />
              <h3 className="mt-2 font-serif text-lg font-semibold">{current.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-secondary-foreground/80">{current.intro}</p>
            </div>
            <div className="flex flex-col justify-center">
              <ul className="space-y-2">
                {current.points.map((point) => (
                  <li key={point} className="flex items-start gap-2 text-xs sm:text-sm">
                    <Check className="mt-0.5 size-3.5 shrink-0 text-primary" />
                    {point}
                  </li>
                ))}
              </ul>
              <a href="#contact" className="mt-4 inline-flex w-fit rounded-full bg-secondary px-4 py-2 text-xs font-semibold text-secondary-foreground">
                Let&apos;s work together
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
