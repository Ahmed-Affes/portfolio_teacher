'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { ArrowUpRight, Maximize2, X } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { WORK_ITEMS, type WorkCategory, type WorkItem } from '@/lib/data'
import { cn } from '@/lib/utils'

const FILTERS: { id: WorkCategory; label: string }[] = [
  { id: 'all', label: 'All work' },
  { id: 'posters', label: 'Posters & guides' },
  { id: 'flyers', label: 'Flyers & events' },
  { id: 'classroom', label: 'Classroom moments' },
]

export function WorkShowcase() {
  const [filter, setFilter] = useState<WorkCategory>('all')
  const [active, setActive] = useState<WorkItem | null>(null)

  const items = useMemo(
    () => (filter === 'all' ? WORK_ITEMS : WORK_ITEMS.filter((w) => w.category === filter)),
    [filter],
  )

  useEffect(() => {
    if (!active) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setActive(null)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [active])

  return (
    <section id="work" className="relative scroll-mt-20 py-16 sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-64 section-glow" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <Reveal>
            <SectionHeading
              number="02"
              eyebrow="Portfolio"
              title="Teaching in action & visual aids"
              intro="Classroom activities, educational posters, and custom learning tools."
            />
          </Reveal>

          <Reveal delay={80}>
            <div className="flex flex-wrap gap-1.5 rounded-full border border-border/60 bg-card/80 p-1.5 shadow-sm backdrop-blur-sm">
              {FILTERS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFilter(f.id)}
                  className={cn(
                    'rounded-full px-4 py-2 text-xs font-semibold transition-all duration-300',
                    filter === f.id
                      ? 'bg-secondary text-secondary-foreground shadow-md'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <Reveal key={item.id} delay={i * 50}>
              <button
                type="button"
                onClick={() => setActive(item)}
                className="card-shine group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-card text-left shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/25 hover:shadow-xl hover:shadow-foreground/8"
              >
                <div className="relative aspect-[16/11] w-full overflow-hidden bg-muted">
                  <Image
                    src={item.image || '/placeholder.svg'}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/70 via-secondary/10 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />
                  <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-primary-foreground shadow-md">
                    {item.tag}
                  </span>
                  <span className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-card/90 text-foreground opacity-0 shadow-lg backdrop-blur transition-all duration-300 group-hover:opacity-100">
                    <Maximize2 className="size-4" />
                  </span>
                  <div className="absolute inset-x-0 bottom-0 flex translate-y-2 items-end justify-between p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <span className="text-sm font-semibold text-white">{item.title}</span>
                    <ArrowUpRight className="size-4 text-primary" />
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-serif text-lg font-semibold leading-tight text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 flex-1 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          onClick={() => setActive(null)}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-secondary/90 p-4 backdrop-blur-md duration-300 animate-in fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-card shadow-2xl duration-300 animate-in zoom-in-95 slide-in-from-bottom-4"
          >
            <button
              type="button"
              aria-label="Close modal"
              onClick={() => setActive(null)}
              className="absolute right-4 top-4 z-10 flex size-10 items-center justify-center rounded-full bg-secondary/80 text-white backdrop-blur transition-colors hover:bg-secondary"
            >
              <X className="size-5" />
            </button>
            <div className="relative aspect-[4/3] w-full bg-muted">
              <Image
                src={active.image || '/placeholder.svg'}
                alt={active.title}
                fill
                sizes="(max-width: 768px) 100vw, 672px"
                className="object-cover"
              />
            </div>
            <div className="p-6 sm:p-8">
              <span className="rounded-full bg-primary/20 px-3 py-1 text-xs font-bold uppercase tracking-wide text-foreground ring-1 ring-primary/30">
                {active.tag}
              </span>
              <h3 className="mt-3 font-serif text-2xl font-semibold text-foreground">
                {active.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {active.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
