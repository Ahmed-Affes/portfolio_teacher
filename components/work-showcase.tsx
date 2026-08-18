'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { Maximize2, X } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { WORK_ITEMS, type WorkCategory, type WorkItem } from '@/lib/data'
import { cn } from '@/lib/utils'

const FILTERS: { id: WorkCategory; label: string }[] = [
  { id: 'all', label: 'All work' },
  { id: 'posters', label: 'Posters' },
  { id: 'flyers', label: 'Flyers' },
  { id: 'classroom', label: 'Classroom' },
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
    <section id="work" className="section-shell relative">
      <div className="section-inner section-stack">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <Reveal>
            <SectionHeading
              number="02"
              eyebrow="Portfolio"
              title="Teaching in action & visual aids"
              intro="Posters, flyers, and classroom moments."
            />
          </Reveal>
          <Reveal delay={40}>
            <div className="scrollbar-hide flex gap-1.5 overflow-x-auto pb-0.5 sm:flex-wrap sm:overflow-visible">
              {FILTERS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFilter(f.id)}
                  className={cn(
                    'shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all',
                    filter === f.id
                      ? 'bg-secondary text-secondary-foreground'
                      : 'border border-border/60 bg-card text-muted-foreground hover:text-foreground',
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {items.map((item, i) => (
            <Reveal key={item.id} delay={i * 40}>
              <button
                type="button"
                onClick={() => setActive(item)}
                className="group flex h-full w-full flex-col overflow-hidden rounded-xl border border-border/60 bg-card text-left shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md sm:rounded-2xl"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                  <Image
                    src={item.image || '/placeholder.svg'}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-2 top-2 rounded-full bg-primary px-2 py-0.5 text-[0.6rem] font-bold uppercase text-primary-foreground">
                    {item.tag}
                  </span>
                  <span className="absolute right-2 top-2 flex size-7 items-center justify-center rounded-full bg-card/90 opacity-0 transition-opacity group-hover:opacity-100">
                    <Maximize2 className="size-3.5" />
                  </span>
                </div>
                <div className="p-3 sm:p-3.5">
                  <h3 className="font-serif text-sm font-semibold leading-snug text-foreground line-clamp-1 sm:text-base">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-[0.65rem] leading-relaxed text-muted-foreground line-clamp-2 sm:text-xs">
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
          className="fixed inset-0 z-[90] flex items-center justify-center bg-secondary/90 p-3 backdrop-blur-md sm:p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[90vh] w-full max-w-xl flex-col overflow-hidden rounded-2xl bg-card shadow-2xl sm:rounded-3xl"
          >
            <button
              type="button"
              aria-label="Close modal"
              onClick={() => setActive(null)}
              className="absolute right-3 top-3 z-10 flex size-9 items-center justify-center rounded-full bg-secondary/80 text-white"
            >
              <X className="size-4" />
            </button>
            <div className="relative aspect-[4/3] bg-muted">
              <Image src={active.image || '/placeholder.svg'} alt={active.title} fill className="object-cover" />
            </div>
            <div className="p-4 sm:p-5">
              <span className="rounded-full bg-primary/20 px-2.5 py-0.5 text-[0.65rem] font-bold uppercase text-foreground">
                {active.tag}
              </span>
              <h3 className="mt-2 font-serif text-lg font-semibold text-foreground sm:text-xl">{active.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground sm:text-sm">{active.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
