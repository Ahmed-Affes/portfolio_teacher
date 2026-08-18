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
    <section id="work" className="scroll-mt-20 py-10 sm:py-14 lg:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <SectionHeading
            eyebrow="Portfolio"
            title="Teaching in action & visual aids"
            intro="Classroom activities, educational posters, and custom learning tools."
          />

          {/* Compact Filters */}
          <div className="flex flex-wrap gap-1.5 self-start sm:self-auto">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                className={cn(
                  'rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all duration-200',
                  filter === f.id
                    ? 'border-transparent bg-secondary text-secondary-foreground shadow-xs'
                    : 'border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground',
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActive(item)}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card text-left shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-foreground/10"
            >
              <div className="relative aspect-[16/11] w-full overflow-hidden bg-muted">
                <Image
                  src={item.image || '/placeholder.svg'}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-2.5 top-2.5 rounded-full bg-primary px-2.5 py-0.5 text-[0.7rem] font-semibold text-primary-foreground shadow-xs">
                  {item.tag}
                </span>
                <span className="absolute right-2.5 top-2.5 flex size-8 items-center justify-center rounded-full bg-card/90 text-foreground opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100 shadow-xs">
                  <Maximize2 className="size-3.5" />
                </span>
              </div>
              <div className="flex flex-1 flex-col p-4">
                <h3 className="font-serif text-base font-semibold leading-tight text-foreground">
                  {item.title}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                  {item.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox modal */}
      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          onClick={() => setActive(null)}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm duration-200 animate-in fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[85vh] w-full max-w-xl flex-col overflow-hidden rounded-3xl bg-card shadow-2xl duration-200 animate-in zoom-in-95"
          >
            <button
              type="button"
              aria-label="Close modal"
              onClick={() => setActive(null)}
              className="absolute right-3 top-3 z-10 flex size-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur transition-colors hover:bg-black/75"
            >
              <X className="size-4.5" />
            </button>
            <div className="relative aspect-[4/3] w-full bg-muted">
              <Image
                src={active.image || '/placeholder.svg'}
                alt={active.title}
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-cover"
              />
            </div>
            <div className="p-5">
              <span className="rounded-full bg-primary/25 px-2.5 py-0.5 text-xs font-semibold text-foreground">
                {active.tag}
              </span>
              <h3 className="mt-1.5 font-serif text-xl font-semibold text-foreground">
                {active.title}
              </h3>
              <p className="mt-1 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                {active.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
