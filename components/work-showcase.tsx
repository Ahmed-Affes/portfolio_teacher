'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Columns3,
  Grid,
  Info,
  LayoutGrid,
  Maximize2,
  MessageSquare,
  Search,
  SlidersHorizontal,
  Sparkles,
  X,
} from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { type WorkCategory, type WorkItem } from '@/lib/data'
import { usePortfolio } from '@/lib/portfolio-context'
import { cn } from '@/lib/utils'

const FILTERS: { id: WorkCategory; label: string }[] = [
  { id: 'all', label: 'All Works' },
  { id: 'props', label: 'DIY Props & Kits' },
  { id: 'posters', label: 'Posters & Guides' },
  { id: 'flyers', label: 'Flyers & Events' },
  { id: 'worksheets', label: 'Worksheets & Quests' },
  { id: 'classroom', label: 'Classroom Moments' },
]

const INITIAL_VISIBLE_COUNT = 6
const LOAD_MORE_STEP = 6

export function WorkShowcase() {
  const { state } = usePortfolio()
  const { works } = state
  const [filter, setFilter] = useState<WorkCategory>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null)
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT)
  const [viewMode, setViewMode] = useState<'grid' | 'bento'>('grid')

  // Only display active works on public site
  const activeWorks = useMemo(() => works.filter((w) => w.isActive !== false), [works])

  // Calculate item counts for each category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: activeWorks.length }
    FILTERS.forEach((f) => {
      if (f.id !== 'all') {
        counts[f.id] = activeWorks.filter((item) => item.category === f.id).length
      }
    })
    return counts
  }, [activeWorks])

  // Filter & Search logic
  const filteredItems = useMemo(() => {
    return activeWorks.filter((item) => {
      const matchesCategory = filter === 'all' || item.category === filter
      const matchesSearch =
        searchQuery === '' ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.highlights && item.highlights.some((h) => h.toLowerCase().includes(searchQuery.toLowerCase())))
      return matchesCategory && matchesSearch
    })
  }, [activeWorks, filter, searchQuery])

  // Reset pagination when filter or search changes
  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE_COUNT)
  }, [filter, searchQuery])

  // Currently visible items on page
  const displayedItems = useMemo(() => {
    return filteredItems.slice(0, visibleCount)
  }, [filteredItems, visibleCount])

  const activeItem = activeItemIndex !== null ? filteredItems[activeItemIndex] : null

  // Lightbox keyboard navigation
  const handlePrev = useCallback(() => {
    if (activeItemIndex === null) return
    setActiveItemIndex((prev) => (prev! > 0 ? prev! - 1 : filteredItems.length - 1))
  }, [activeItemIndex, filteredItems.length])

  const handleNext = useCallback(() => {
    if (activeItemIndex === null) return
    setActiveItemIndex((prev) => (prev! < filteredItems.length - 1 ? prev! + 1 : 0))
  }, [activeItemIndex, filteredItems.length])

  useEffect(() => {
    if (activeItemIndex === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveItemIndex(null)
      if (e.key === 'ArrowLeft') handlePrev()
      if (e.key === 'ArrowRight') handleNext()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [activeItemIndex, handlePrev, handleNext])

  return (
    <section id="work" className="section-shell relative overflow-hidden">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 section-glow" />

      <div className="section-inner section-stack">
        {/* Section Heading & Controls */}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <SectionHeading
              number="02"
              eyebrow="Creative Portfolio"
              title="Classroom aids, posters & handmade props"
              intro="Explore educational materials crafted to spark curiosity and active language acquisition."
            />
          </Reveal>

          {/* Search & Layout Switcher Controls */}
          <Reveal delay={60}>
            <div className="flex flex-wrap items-center gap-2.5">
              {/* Instant Search Bar */}
              <div className="relative min-w-[200px] flex-1 sm:w-64 sm:flex-initial">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search works, phonics, verbs..."
                  className="w-full rounded-full border border-border/80 bg-card py-2 pl-9 pr-8 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label="Clear search"
                  >
                    <X className="size-3.5" />
                  </button>
                )}
              </div>

              {/* Layout Switcher Toggle */}
              <div className="flex items-center rounded-full border border-border/80 bg-card p-1 shadow-xs">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  title="Grid View (Balanced Cards)"
                  aria-label="Grid View"
                  className={cn(
                    'flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-300',
                    viewMode === 'grid'
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  <Grid className="size-3.5" />
                  <span className="hidden sm:inline">Grid</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('bento')}
                  title="Bento View (Editorial Magazine)"
                  aria-label="Bento View"
                  className={cn(
                    'flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-300',
                    viewMode === 'bento'
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  <LayoutGrid className="size-3.5" />
                  <span className="hidden sm:inline">Bento</span>
                </button>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Category Filter Chips with Live Counts */}
        <Reveal delay={80}>
          <div className="scrollbar-hide flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible">
            {FILTERS.map((f) => {
              const isSelected = filter === f.id
              const count = categoryCounts[f.id] || 0
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFilter(f.id)}
                  className={cn(
                    'group inline-flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-all duration-300',
                    isSelected
                      ? 'bg-secondary text-secondary-foreground shadow-md'
                      : 'border border-border/70 bg-card/80 text-muted-foreground hover:border-primary/40 hover:bg-card hover:text-foreground',
                  )}
                >
                  <span>{f.label}</span>
                  <span
                    className={cn(
                      'rounded-full px-1.5 py-0.2 text-[0.65rem] font-bold transition-colors',
                      isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground group-hover:text-foreground',
                    )}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </div>
        </Reveal>

        {/* Works Gallery Grid / Bento */}
        {filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border/80 bg-card/50 p-12 text-center">
            <SlidersHorizontal className="size-10 text-muted-foreground/50" />
            <h3 className="mt-3 font-serif text-lg font-semibold text-foreground">No matching materials found</h3>
            <p className="mt-1 max-w-sm text-xs text-muted-foreground">
              Try adjusting your search query or switching to another category.
            </p>
            <button
              type="button"
              onClick={() => {
                setFilter('all')
                setSearchQuery('')
              }}
              className="mt-4 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-sm"
            >
              Reset filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          /* Standard 3-Column / 2-Column Grid */
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5">
            {displayedItems.map((item, i) => {
              const actualIndex = filteredItems.findIndex((fi) => fi.id === item.id)
              return (
                <Reveal key={item.id} delay={(i % 6) * 40}>
                  <button
                    type="button"
                    onClick={() => setActiveItemIndex(actualIndex)}
                    className="card-shine group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-card text-left shadow-sm transform-gpu transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-foreground/5 will-change-transform"
                  >
                    {/* Media Thumbnail */}
                    <div className="relative aspect-[16/10.5] w-full overflow-hidden isolate bg-muted">
                      <Image
                        src={item.image || '/placeholder.svg'}
                        alt={item.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transform-gpu transition-transform duration-500 ease-out group-hover:scale-105 will-change-transform"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-secondary/15 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-85" />

                      {/* Tag pill */}
                      <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-primary-foreground shadow-md">
                        {item.tag}
                      </span>

                      {/* Maximize Icon */}
                      <span className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full bg-card/90 text-foreground opacity-0 shadow-lg backdrop-blur-sm transform-gpu transition-[opacity,transform] duration-300 group-hover:opacity-100 group-hover:scale-105">
                        <Maximize2 className="size-3.5" />
                      </span>

                      {/* Format pill */}
                      {item.format && (
                        <span className="absolute bottom-3 left-3 rounded-md bg-secondary/85 px-2 py-0.5 text-[0.65rem] font-medium text-white backdrop-blur-xs">
                          {item.format}
                        </span>
                      )}
                    </div>

                    {/* Content Details */}
                    <div className="flex flex-1 flex-col p-4 sm:p-5">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-serif text-base font-semibold leading-snug text-foreground transition-colors group-hover:text-primary sm:text-lg">
                          {item.title}
                        </h3>
                        <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
                      </div>

                      <p className="mt-2 flex-1 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                        {item.description}
                      </p>

                      {/* Micro highlights */}
                      {item.highlights && item.highlights.length > 0 && (
                        <div className="mt-3.5 flex flex-wrap gap-1.5 border-t border-border/50 pt-3">
                          {item.highlights.slice(0, 2).map((h) => (
                            <span
                              key={h}
                              className="rounded-full bg-muted/60 px-2 py-0.5 text-[0.65rem] font-medium text-muted-foreground"
                            >
                              {h}
                            </span>
                          ))}
                          {item.highlights.length > 2 && (
                            <span className="rounded-full bg-primary/15 px-1.5 py-0.5 text-[0.65rem] font-bold text-foreground">
                              +{item.highlights.length - 2}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </button>
                </Reveal>
              )
            })}
          </div>
        ) : (
          /* Editorial Bento Layout */
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5">
            {displayedItems.map((item, i) => {
              const actualIndex = filteredItems.findIndex((fi) => fi.id === item.id)
              const isFeature = i % 4 === 0 || i % 4 === 3

              return (
                <Reveal
                  key={item.id}
                  delay={(i % 6) * 40}
                  className={cn(isFeature && 'sm:col-span-2 lg:col-span-2')}
                >
                  <button
                    type="button"
                    onClick={() => setActiveItemIndex(actualIndex)}
                    className={cn(
                      'card-shine group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-border/75 bg-card text-left shadow-sm transform-gpu transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-foreground/5 will-change-transform',
                      isFeature ? 'md:grid md:grid-cols-[1.1fr_0.9fr]' : 'flex flex-col',
                    )}
                  >
                    {/* Media Image */}
                    <div
                      className={cn(
                        'relative w-full overflow-hidden isolate bg-muted',
                        isFeature ? 'aspect-[16/10] md:h-full md:aspect-auto' : 'aspect-[16/10.5]',
                      )}
                    >
                      <Image
                        src={item.image || '/placeholder.svg'}
                        alt={item.title}
                        fill
                        sizes={isFeature ? '(max-width: 1024px) 100vw, 66vw' : '(max-width: 1024px) 50vw, 33vw'}
                        className="object-cover transform-gpu transition-transform duration-500 ease-out group-hover:scale-105 will-change-transform"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-secondary/15 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-85" />

                      <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-primary-foreground shadow-md">
                        {item.tag}
                      </span>

                      <span className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full bg-card/90 text-foreground opacity-0 shadow-lg backdrop-blur-sm transform-gpu transition-[opacity,transform] duration-300 group-hover:opacity-100 group-hover:scale-105">
                        <Maximize2 className="size-3.5" />
                      </span>

                      {item.year && (
                        <span className="absolute bottom-3 left-3 rounded-md bg-secondary/85 px-2 py-0.5 text-[0.65rem] font-medium text-white backdrop-blur-xs">
                          {item.year}
                        </span>
                      )}
                    </div>

                    {/* Details Panel */}
                    <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
                      <div>
                        {item.format && (
                          <span className="text-[0.65rem] font-bold uppercase tracking-wider text-primary">
                            {item.format}
                          </span>
                        )}
                        <h3 className="mt-1 font-serif text-lg font-semibold leading-snug text-foreground transition-colors group-hover:text-primary sm:text-xl">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                          {item.description}
                        </p>
                      </div>

                      {item.highlights && item.highlights.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-1.5 border-t border-border/50 pt-3">
                          {item.highlights.map((h) => (
                            <span
                              key={h}
                              className="inline-flex items-center gap-1 rounded-md bg-muted/60 px-2 py-0.5 text-[0.65rem] font-medium text-foreground"
                            >
                              <CheckCircle2 className="size-2.5 text-primary" />
                              {h}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </button>
                </Reveal>
              )
            })}
          </div>
        )}

        {/* Smart Progressive "Load More" */}
        {filteredItems.length > visibleCount && (
          <Reveal delay={100}>
            <div className="flex flex-col items-center justify-center gap-2 pt-4">
              <button
                type="button"
                onClick={() => setVisibleCount((prev) => prev + LOAD_MORE_STEP)}
                className="group inline-flex items-center gap-2 rounded-full border border-border/80 bg-card px-7 py-3 text-xs font-semibold text-foreground shadow-sm transition-all duration-300 hover:border-primary hover:bg-primary hover:text-primary-foreground hover:shadow-lg hover:-translate-y-0.5 sm:text-sm"
              >
                <Sparkles className="size-4 text-primary transition-colors group-hover:text-primary-foreground" />
                Show more materials ({filteredItems.length - visibleCount} remaining)
              </button>
              <p className="text-[0.65rem] text-muted-foreground">
                Showing {visibleCount} of {filteredItems.length} items
              </p>
            </div>
          </Reveal>
        )}
      </div>

      {/* World-Class Pro Lightbox Detail Modal */}
      {activeItem && activeItemIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeItem.title}
          onClick={() => setActiveItemIndex(null)}
          className="fixed inset-0 z-[95] flex items-center justify-center bg-black/85 p-3 backdrop-blur-md duration-300 animate-in fade-in sm:p-5 lg:p-8"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-white/20 bg-card shadow-2xl duration-300 animate-in zoom-in-95 lg:grid lg:grid-cols-[1.15fr_0.85fr]"
          >
            {/* Close button */}
            <button
              type="button"
              aria-label="Close modal"
              onClick={() => setActiveItemIndex(null)}
              className="absolute right-4 top-4 z-30 flex size-9 items-center justify-center rounded-full bg-black/70 text-white shadow-lg backdrop-blur-md transition-transform hover:scale-110 hover:bg-black"
            >
              <X className="size-4.5" />
            </button>

            {/* Left Column: Media Presentation Stage */}
            <div className="relative flex aspect-[16/11] w-full flex-col justify-between overflow-hidden bg-muted lg:aspect-auto lg:h-full">
              <Image
                src={activeItem.image || '/placeholder.svg'}
                alt={activeItem.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

              {/* Top info badge */}
              <div className="relative z-10 flex items-center justify-between p-4 sm:p-5">
                <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-md">
                  {activeItem.tag}
                </span>
                <span className="rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
                  {activeItemIndex + 1} of {filteredItems.length}
                </span>
              </div>

              {/* Left / Right Arrow Navigation buttons */}
              {filteredItems.length > 1 && (
                <div className="absolute inset-x-3 top-1/2 z-20 flex -translate-y-1/2 items-center justify-between pointer-events-none">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      handlePrev()
                    }}
                    aria-label="Previous item"
                    className="pointer-events-auto flex size-11 items-center justify-center rounded-full bg-black/70 text-white shadow-xl backdrop-blur-md transform-gpu transition-transform duration-200 hover:scale-110 hover:bg-black will-change-transform"
                  >
                    <ChevronLeft className="size-6" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleNext()
                    }}
                    aria-label="Next item"
                    className="pointer-events-auto flex size-11 items-center justify-center rounded-full bg-black/70 text-white shadow-xl backdrop-blur-md transform-gpu transition-transform duration-200 hover:scale-110 hover:bg-black will-change-transform"
                  >
                    <ChevronRight className="size-6" />
                  </button>
                </div>
              )}

              {/* Bottom interactive navigation dot bar */}
              <div className="relative z-10 flex items-center justify-between p-4 text-xs text-white/80">
                <span className="text-[0.7rem] font-medium">Use ← / → keys to browse</span>
                <div className="flex gap-1">
                  {filteredItems.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveItemIndex(idx)}
                      className={cn(
                        'h-1.5 rounded-full transition-all',
                        activeItemIndex === idx ? 'w-5 bg-primary' : 'w-1.5 bg-white/40 hover:bg-white',
                      )}
                      aria-label={`Jump to item ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Editorial Detail Drawer */}
            <div className="flex flex-1 flex-col justify-between overflow-y-auto p-6 sm:p-8">
              <div>
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-muted-foreground">
                  {activeItem.format && (
                    <span className="rounded-full bg-primary/15 px-2.5 py-0.5 text-foreground font-bold">
                      {activeItem.format}
                    </span>
                  )}
                  {activeItem.year && <span>· Released {activeItem.year}</span>}
                </div>

                <h3 className="mt-3 font-serif text-2xl font-semibold leading-tight text-foreground sm:text-3xl">
                  {activeItem.title}
                </h3>

                <p className="mt-3 text-xs leading-relaxed text-muted-foreground sm:text-sm text-pretty">
                  {activeItem.description}
                </p>

                {/* Pedagogical Highlights Breakdown */}
                {activeItem.highlights && activeItem.highlights.length > 0 && (
                  <div className="mt-5 rounded-2xl border border-border/70 bg-muted/30 p-4">
                    <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-foreground">
                      <Sparkles className="size-3.5 text-primary" />
                      Pedagogical Highlights
                    </h4>
                    <ul className="mt-2.5 space-y-2">
                      {activeItem.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2.5 text-xs text-foreground sm:text-sm">
                          <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Inquire & Order Action Footer */}
              <div className="mt-6 border-t border-border/60 pt-4">
                <div className="flex flex-col gap-2.5">
                  <a
                    href="#contact"
                    onClick={() => setActiveItemIndex(null)}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3 text-xs font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:shadow-xl sm:text-sm"
                  >
                    <MessageSquare className="size-4" />
                    Inquire or request this material
                  </a>
                  <p className="text-center text-[0.65rem] text-muted-foreground">
                    Available for workshop demonstration, custom sizing, or localized rental in Tunis.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
