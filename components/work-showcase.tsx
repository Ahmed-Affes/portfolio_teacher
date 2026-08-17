'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { Maximize2, X } from 'lucide-react'
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
    <section id="work" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Portfolio"
          title="Teaching in action & DIY visual aids"
          intro="A glimpse into my classroom activities, educational posters, and custom learning tools designed to inspire students."
        />

        {/* Filters */}
        <div className="mt-8 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={cn(
                'rounded-full border px-4 py-2 text-sm font-medium transition-colors',
                filter === f.id
                  ? 'border-transparent bg-secondary text-secondary-foreground'
                  : 'border-border bg-card text-muted-foreground hover:text-foreground',
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActive(item)}
              className="group relative overflow-hidden rounded-3xl border border-border bg-card text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-foreground/10"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={item.image || '/placeholder.svg'}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                  {item.tag}
                </span>
                <span className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-card/90 text-foreground opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
                  <Maximize2 className="size-4" />
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-serif text-lg font-semibold leading-tight">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                  {item.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          onClick={() => setActive(null)}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-foreground/70 p-4 backdrop-blur-sm duration-200 animate-in fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-border bg-card shadow-2xl duration-200 animate-in zoom-in-95"
          >
            <button
              type="button"
              aria-label="Close preview"
              onClick={() => setActive(null)}
              className="absolute right-4 top-4 z-10 flex size-10 items-center justify-center rounded-full bg-card/90 text-foreground shadow-md backdrop-blur transition-colors hover:bg-muted"
            >
              <X className="size-5" />
            </button>
            <div className="grid md:grid-cols-[1.4fr_1fr]">
              <div className="relative aspect-[4/3] md:aspect-auto">
                <Image
                  src={active.image || '/placeholder.svg'}
                  alt={active.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6 sm:p-8">
                <span className="rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-foreground">
                  {active.tag}
                </span>
                <h3 className="mt-4 font-serif text-2xl font-semibold leading-tight">
                  {active.title}
                </h3>
                <p className="mt-3 leading-relaxed text-muted-foreground text-pretty">
                  {active.description}
                </p>
                <a
                  href="#contact"
                  onClick={() => setActive(null)}
                  className="mt-6 inline-flex rounded-full bg-secondary px-5 py-2.5 text-sm font-semibold text-secondary-foreground transition-transform hover:-translate-y-0.5"
                >
                  Request something similar
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
