'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Grid,
  Info,
  LayoutGrid,
  Maximize2,
  Search,
  SlidersHorizontal,
  Sparkles,
  X,
  Palette,
  Heart,
} from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { SectionScene } from '@/components/section-scene'
import { type WorkCategory, type WorkItem } from '@/lib/data'
import { usePortfolio } from '@/lib/portfolio-context'
import { cn } from '@/lib/utils'
import {
  WashiTape,
  CuteSticker,
  PushPin,
  SwirlyArrow,
} from '@/components/cloud-decorations'

const FILTERS: { id: WorkCategory; label: string; color: string }[] = [
  { id: 'all', label: 'All Works 🎨', color: 'bg-[#FFC837]' },
  { id: 'props', label: 'DIY Props & Kits ✂️', color: 'bg-[#A7F3D0]' },
  { id: 'posters', label: 'Posters & Guides 📜', color: 'bg-[#FFE68C]' },
  { id: 'flyers', label: 'Flyers & Events 🎈', color: 'bg-[#FFB5B5]' },
  { id: 'worksheets', label: 'Worksheets & Quests 📝', color: 'bg-[#DDD6FE]' },
  { id: 'classroom', label: 'Classroom Moments 📸', color: 'bg-[#FED7AA]' },
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
  const [viewMode, setViewMode] = useState<'grid' | 'bento'>('bento')

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
        (item.highlights &&
          item.highlights.some((h) => h.toLowerCase().includes(searchQuery.toLowerCase())))
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

  const pinColors: ('red' | 'purple' | 'yellow' | 'mint' | 'coral')[] = [
    'red',
    'purple',
    'yellow',
    'mint',
    'coral',
  ]

  return (
    <section id="work" className="section-shell relative overflow-hidden bg-transparent py-10 sm:py-14 lg:py-16">
      <div className="section-inner section-stack">
        {/* Section Heading & Controls */}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <SectionHeading
              number="02"
              eyebrow="Creative Craft Gallery ✂️"
              title="Classroom aids, posters & handmade props"
              intro="Explore educational materials crafted to spark curiosity and active language acquisition."
              typewriterIntro
            />
          </Reveal>

          {/* Search & Layout Switcher Controls */}
          <Reveal delay={60}>
            <div className="flex flex-wrap items-center gap-3">
              {/* Search Bar */}
              <div className="relative min-w-[200px] flex-1 sm:w-64 sm:flex-initial">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#2D1F1D]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search crafts, phonics..."
                  className="w-full rounded-full border-2 border-[#2D1F1D] bg-white py-2 pl-9 pr-8 text-xs font-bold text-[#2D1F1D] placeholder:text-[#6B5550] shadow-[2px_2px_0px_#2D1F1D] focus:outline-none focus:ring-2 focus:ring-[#FFC837]"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#2D1F1D] hover:text-[#FF7D6B]"
                    aria-label="Clear search"
                  >
                    <X className="size-3.5" />
                  </button>
                )}
              </div>

              {/* Layout Switcher */}
              <div className="flex items-center rounded-full border-2 border-[#2D1F1D] bg-white p-0.5 shadow-[2px_2px_0px_#2D1F1D]">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={cn(
                    'flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-black transition-all cursor-pointer',
                    viewMode === 'grid' ? 'bg-[#FFC837] text-[#2D1F1D]' : 'text-[#6B5550]',
                  )}
                >
                  <Grid className="size-3.5" />
                  <span className="hidden sm:inline">Grid</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('bento')}
                  className={cn(
                    'flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-black transition-all cursor-pointer',
                    viewMode === 'bento' ? 'bg-[#FFC837] text-[#2D1F1D]' : 'text-[#6B5550]',
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
          <div className="scrollbar-hide flex gap-2.5 overflow-x-auto pb-2 sm:flex-wrap sm:overflow-visible">
            {FILTERS.map((f) => {
              const isSelected = filter === f.id
              const count = categoryCounts[f.id] || 0
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFilter(f.id)}
                  className={cn(
                    'group inline-flex shrink-0 items-center gap-2 rounded-2xl border-2 border-[#2D1F1D] px-4 py-2 text-xs font-black transition-all duration-150 cursor-pointer',
                    isSelected
                      ? `${f.color} text-[#2D1F1D] shadow-[3px_3px_0px_#2D1F1D] -translate-y-0.5`
                      : 'bg-white text-[#6B5550] shadow-[2px_2px_0px_#2D1F1D] hover:bg-[#FFE68C]/30 hover:text-[#2D1F1D]',
                  )}
                >
                  <span>{f.label}</span>
                  <span
                    className={cn(
                      'rounded-full border border-[#2D1F1D] px-1.5 py-0.2 text-[0.65rem] font-black',
                      isSelected ? 'bg-white text-[#2D1F1D]' : 'bg-[#FAF5EC] text-[#2D1F1D]',
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
          <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-[#2D1F1D] bg-white p-12 text-center shadow-[4px_4px_0px_#2D1F1D]">
            <SlidersHorizontal className="size-10 text-[#6B5550]" />
            <h3 className="mt-3 font-sans text-lg font-black text-[#2D1F1D]">
              No matching materials found
            </h3>
            <p className="mt-1 max-w-sm text-xs font-bold text-[#6B5550]">
              Try adjusting your search query or switching to another category.
            </p>
            <button
              type="button"
              onClick={() => {
                setFilter('all')
                setSearchQuery('')
              }}
              className="cute-btn mt-4 bg-[#FFC837] px-5 py-2 text-xs font-black text-[#2D1F1D]"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {displayedItems.map((item, i) => {
              const actualIndex = filteredItems.findIndex((fi) => fi.id === item.id)
              const isFeature = viewMode === 'bento' && (i % 4 === 0 || i % 4 === 3)
              const pinColors: ('red' | 'purple' | 'yellow' | 'mint' | 'coral')[] = [
                'yellow',
                'mint',
                'coral',
                'purple',
                'red',
              ]
              const pinColor = pinColors[i % pinColors.length]

              return (
                <Reveal
                  key={item.id}
                  delay={(i % 6) * 40}
                  className={cn(isFeature && 'sm:col-span-2 lg:col-span-2')}
                >
                  <div className="group relative h-full w-full">
                    {/* 3D PushPin & WashiTape on unclipped outer container */}
                    <PushPin color={pinColor} className={isFeature ? "right-8 -top-1" : "left-1/2 -top-1"} />
                    {isFeature && (
                      <WashiTape color="#FFC837" className="left-6 -top-2.5 w-20" pattern="stripes" />
                    )}

                    <button
                      type="button"
                      onClick={() => setActiveItemIndex(actualIndex)}
                      className={cn(
                        'relative flex h-full w-full flex-col overflow-hidden rounded-[2.4rem_1.4rem_2.6rem_1.6rem] border-3 border-[#2D1F1D] bg-white text-left shadow-[5px_5px_0px_#2D1F1D] transition-all duration-200 hover:-translate-y-1 hover:shadow-[8px_8px_0px_#2D1F1D] cursor-pointer',
                        isFeature ? 'rounded-[2.8rem_1.6rem_2.6rem_1.8rem] md:grid md:grid-cols-[1.15fr_0.85fr]' : (i % 2 === 0 ? 'rotate-[-0.4deg]' : 'rotate-[0.4deg]'),
                      )}
                    >
                      {/* Media Thumbnail */}
                      <div
                        className={cn(
                          'relative w-full overflow-hidden bg-[#FFF9E6]',
                          isFeature ? 'aspect-[16/10] md:h-full md:aspect-auto' : 'aspect-[16/10.5]',
                        )}
                      >
                        <Image
                          src={item.image || '/placeholder.svg'}
                          alt={item.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />

                        {/* Tag pill */}
                        <div className="absolute left-3 top-3 flex items-center gap-1.5">
                          <span className="rounded-full border-2 border-[#2D1F1D] bg-[#FFE68C] px-3 py-1 text-[0.7rem] font-black uppercase text-[#2D1F1D] shadow-[2px_2px_0px_#2D1F1D]">
                            {item.tag}
                          </span>
                          {isFeature && (
                            <span className="hidden sm:inline-flex items-center gap-1 rounded-full border-2 border-[#2D1F1D] bg-[#A7F3D0] px-2.5 py-0.5 text-[0.65rem] font-black uppercase text-[#2D1F1D] shadow-xs">
                              <Sparkles className="size-3 text-[#10B981]" />
                              <span>Featured</span>
                            </span>
                          )}
                        </div>

                        {/* Maximize Icon */}
                        <span className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full border-2 border-[#2D1F1D] bg-white text-[#2D1F1D] opacity-0 shadow-[2px_2px_0px_#2D1F1D] transition-all duration-200 group-hover:opacity-100 group-hover:scale-110">
                          <Maximize2 className="size-4" />
                        </span>
                      </div>

                      {/* Content Details */}
                      <div className="flex flex-1 flex-col p-5">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-sans text-base font-black leading-snug text-[#2D1F1D] transition-colors group-hover:text-[#FF7D6B] sm:text-lg">
                            {item.title}
                          </h3>
                          <ArrowUpRight className="size-4.5 shrink-0 text-[#2D1F1D] transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </div>

                        <p className="mt-2 flex-1 text-xs font-bold leading-relaxed text-[#6B5550] line-clamp-2">
                          {item.description}
                        </p>

                        {/* Highlights */}
                        {item.highlights && item.highlights.length > 0 && (
                          <div className="mt-4 flex flex-wrap gap-1.5 border-t-2 border-[#2D1F1D]/10 pt-3">
                            {item.highlights.slice(0, 2).map((h) => (
                              <span
                                key={h}
                                className="rounded-xl border border-[#2D1F1D] bg-[#FAF5EC] px-2.5 py-0.5 text-[0.68rem] font-bold text-[#2D1F1D]"
                              >
                                {h}
                              </span>
                            ))}
                            {item.highlights.length > 2 && (
                              <span className="rounded-xl border border-[#2D1F1D] bg-[#FFE68C] px-2 py-0.5 text-[0.68rem] font-black text-[#2D1F1D]">
                                +{item.highlights.length - 2}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </button>
                  </div>
                </Reveal>
              )
            })}
          </div>
        )}

        {/* Pagination Load More */}
        {filteredItems.length > visibleCount && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setVisibleCount((prev) => prev + LOAD_MORE_STEP)}
              className="cute-btn bg-[#FFC837] px-8 py-3 text-sm font-black text-[#2D1F1D] hover:bg-[#FFB800]"
            >
              <span>Load More Works ({filteredItems.length - visibleCount} more)</span>
              <ArrowRight className="size-4.5 stroke-[2.5]" />
            </button>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {activeItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeItem.title}
          onClick={() => setActiveItemIndex(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#2D1F1D]/80 p-4 backdrop-blur-xs"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-[2.5rem] border-3 border-[#2D1F1D] bg-white shadow-[12px_12px_0px_#2D1F1D]"
          >
            {/* Header with Title & Close button */}
            <div className="flex items-center justify-between border-b-2 border-[#2D1F1D] bg-[#FFE68C] px-6 py-4">
              <div className="flex items-center gap-2">
                <span className="rounded-full border border-[#2D1F1D] bg-white px-3 py-0.5 text-xs font-black text-[#2D1F1D]">
                  {activeItem.tag}
                </span>
                <h3 className="font-sans text-lg font-black text-[#2D1F1D]">
                  {activeItem.title}
                </h3>
              </div>
              <button
                type="button"
                aria-label="Close modal"
                onClick={() => setActiveItemIndex(null)}
                className="flex size-8 items-center justify-center rounded-full border border-[#2D1F1D] bg-white text-[#2D1F1D] transition-colors hover:bg-[#FF7D6B] hover:text-white"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto p-6 sm:p-8">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border-2 border-[#2D1F1D] bg-[#FFF9E6]">
                <Image
                  src={activeItem.image || '/placeholder.svg'}
                  alt={activeItem.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 768px"
                  className="object-cover"
                />
              </div>

              <div className="mt-5 space-y-4">
                <p className="text-sm font-bold leading-relaxed text-[#6B5550]">
                  {activeItem.description}
                </p>

                {activeItem.highlights && activeItem.highlights.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-black uppercase tracking-wider text-[#2D1F1D]">
                      Pedagogical Highlights &amp; Craft Details
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {activeItem.highlights.map((h) => (
                        <span
                          key={h}
                          className="inline-flex items-center gap-1.5 rounded-xl border-2 border-[#2D1F1D] bg-[#A7F3D0] px-3 py-1 text-xs font-bold text-[#2D1F1D] shadow-[2px_2px_0px_#2D1F1D]"
                        >
                          <CheckCircle2 className="size-3.5 stroke-[2.5]" />
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-between gap-3 border-t-2 border-[#2D1F1D]/10 pt-4">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="flex size-9 items-center justify-center rounded-2xl border-2 border-[#2D1F1D] bg-[#FAF5EC] text-[#2D1F1D] shadow-[2px_2px_0px_#2D1F1D] hover:bg-[#FFE68C]"
                    >
                      <ChevronLeft className="size-5" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="flex size-9 items-center justify-center rounded-2xl border-2 border-[#2D1F1D] bg-[#FAF5EC] text-[#2D1F1D] shadow-[2px_2px_0px_#2D1F1D] hover:bg-[#FFE68C]"
                    >
                      <ChevronRight className="size-5" />
                    </button>
                  </div>

                  <a
                    href="#contact"
                    onClick={() => setActiveItemIndex(null)}
                    className="cute-btn bg-[#FF7D6B] px-5 py-2 text-xs font-black text-white hover:bg-[#FF6B6B]"
                  >
                    <span>Inquire About This Craft 🌸</span>
                    <ArrowRight className="size-4 stroke-[2.5]" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
