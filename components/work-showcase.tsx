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
  FloatingCloud,
  SmilingFlower,
  SmilingStar,
  PastelBalloon,
} from '@/components/cloud-decorations'

const FILTERS: { id: WorkCategory; label: string; color: string }[] = [
  { id: 'all', label: 'All Works 🎨', color: 'bg-[#FFC837]' },
  { id: 'props', label: 'DIY Props & Kits ✂️', color: 'bg-[#A7F3D0]' },
  { id: 'posters', label: 'Posters & Guides 📜', color: 'bg-[#FFE68C]' },
  { id: 'flyers', label: 'Flyers & Events 🎈', color: 'bg-[#FFB5B5]' },
  { id: 'worksheets', label: 'Worksheets & Quests 📝', color: 'bg-[#DDD6FE]' },
  { id: 'classroom', label: 'Classroom Moments 📸', color: 'bg-[#FED7AA]' },
]

const INITIAL_VISIBLE_COUNT = 9
const LOAD_MORE_STEP = 6
const PIN_COLORS = ['red', 'mint', 'yellow', 'purple', 'coral'] as const

export function WorkShowcase() {
  const { state } = usePortfolio()
  const { works } = state
  const [filter, setFilter] = useState<WorkCategory>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null)
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT)

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
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeItemIndex === null) return
      if (e.key === 'ArrowLeft') handlePrev()
      if (e.key === 'ArrowRight') handleNext()
      if (e.key === 'Escape') setActiveItemIndex(null)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeItemIndex, handlePrev, handleNext])

  return (
    <section id="work" className="section-shell relative bg-[#FAF5EC] py-10 sm:py-14 lg:py-16 overflow-hidden">
      {/* Happy Stationary Decorations */}
      <FloatingCloud mood="smiling" size="md" className="top-6 right-8 opacity-60 hidden md:block" />
      <SmilingStar size={34} color="#FFC837" className="top-24 left-10 opacity-75 hidden sm:block" />
      <SmilingFlower size={42} color="#FFB5B5" className="bottom-14 right-8 opacity-70 hidden md:block" />
      <PastelBalloon color="#FFC837" size={44} className="bottom-28 left-6 opacity-70 hidden lg:block" />

      <SectionScene theme="work" pattern="grid" />

      <div className="section-inner section-stack">
        {/* Section Header */}
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <SectionHeading
              number="02"
              eyebrow="Creative Craft Gallery ✂️"
              title="Classroom aids, posters & handmade props"
              intro="Explore educational materials crafted to spark curiosity and active language acquisition."
              typewriterIntro
            />
          </Reveal>

          {/* Search Bar Control */}
          <Reveal delay={60}>
            <div className="relative w-full sm:w-72">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#2D1F1D]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search crafts, phonics..."
                className="w-full rounded-full border-[1.5px] border-[#2D1F1D]/40 bg-white py-2.5 pl-9 pr-8 text-xs font-bold text-[#2D1F1D] placeholder:text-[#6B5550] shadow-[1.5px_1.5px_0px_rgba(45,31,29,0.3)] focus:outline-none focus:ring-2 focus:ring-[#FFC837]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#2D1F1D] hover:text-[#FF7D6B] cursor-pointer"
                  aria-label="Clear search"
                >
                  <X className="size-3.5" />
                </button>
              )}
            </div>
          </Reveal>
        </div>

        {/* Category Filter Chips with Live Counts & Horizontal Scroll Fade */}
        <Reveal delay={80} className="w-full">
          <div className="relative -mx-4 sm:mx-0 px-4 sm:px-0">
            <div className="scroll-fade-r sm:[mask-image:none] scrollbar-hide flex gap-2 sm:gap-2.5 overflow-x-auto pb-2 pt-1 snap-x snap-mandatory sm:flex-wrap sm:overflow-visible pr-8 sm:pr-0">
              {FILTERS.map((f) => {
                const isSelected = filter === f.id
                const count = categoryCounts[f.id] || 0
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFilter(f.id)}
                    className={cn(
                      'group inline-flex shrink-0 snap-start items-center gap-1.5 sm:gap-2 rounded-2xl border-[1.5px] border-[#2D1F1D]/50 px-3.5 py-2 text-xs font-black transition-all duration-150 cursor-pointer min-h-[44px] touch-manipulation',
                      isSelected
                        ? `${f.color} text-[#2D1F1D] shadow-[2px_2px_0px_rgba(45,31,29,0.6)] -translate-y-0.5`
                        : 'bg-white text-[#6B5550] shadow-[1.5px_1.5px_0px_rgba(45,31,29,0.3)] hover:bg-[#FFE68C]/30 hover:text-[#2D1F1D]',
                    )}
                  >
                    <span>{f.label}</span>
                    <span
                      className={cn(
                        'rounded-full border border-[#2D1F1D]/40 px-1.5 py-0.2 text-[0.65rem] font-black',
                        isSelected ? 'bg-white text-[#2D1F1D]' : 'bg-[#FAF5EC] text-[#2D1F1D]',
                      )}
                    >
                      {count}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </Reveal>

        {/* Showcase Items Exhibition: Rich Multi-Size Bento Scrapbook Grid */}
        {filteredItems.length === 0 ? (
          <Reveal>
            <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-[#2D1F1D]/30 bg-white p-12 text-center shadow-[0_10px_25px_rgba(45,31,29,0.05),3px_3px_0px_rgba(45,31,29,0.5)]">
              <span className="text-4xl">🔍</span>
              <p className="mt-3 font-sans text-base font-bold text-[#2D1F1D]">
                No craft items found matching your filters.
              </p>
              <button
                type="button"
                onClick={() => {
                  setFilter('all')
                  setSearchQuery('')
                }}
                className="cute-btn mt-4 bg-[#FFE68C] px-5 py-2 text-xs font-black text-[#2D1F1D]"
              >
                Reset all filters
              </button>
            </div>
          </Reveal>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch">
            {displayedItems.map((item, i) => {
              const actualIndex = filteredItems.findIndex((fi) => fi.id === item.id)
              const pinColor = PIN_COLORS[i % PIN_COLORS.length]
              const hasTape = i % 3 === 0
              const rotationClass = i % 2 === 0 ? 'rotate-0 sm:rotate-[-0.4deg]' : 'rotate-0 sm:rotate-[0.4deg]'

              return (
                <div key={item.id} className="relative w-full max-w-full">
                  <Reveal delay={(i % 6) * 45} className="h-full">
                    <div className="group relative w-full h-full pt-3">
                      {/* Scrapbook Pushpin / Washi Tape Accent */}
                      {hasTape ? (
                        <WashiTape
                          color={i % 6 === 0 ? '#FFC837' : '#A7F3D0'}
                          className="left-6 sm:left-8 top-1 w-20 sm:w-24 z-30"
                          pattern={i % 6 === 0 ? 'stripes' : 'dots'}
                        />
                      ) : (
                        <PushPin color={pinColor} size={22} className="left-1/2 top-3 z-30" />
                      )}

                      <div
                        className={cn(
                          'relative flex w-full h-full flex-col justify-between overflow-hidden rounded-[1.8rem_1.3rem_2rem_1.5rem] border-[1.5px] border-[#3E251E]/40 bg-white shadow-[0_6px_16px_rgba(45,31,29,0.05),2.5px_2.5px_0px_rgba(45,31,29,0.6)] hover:-translate-y-1.5 hover:shadow-[0_16px_32px_rgba(45,31,29,0.12),4px_4px_0px_rgba(45,31,29,0.8)] transition-all duration-300',
                          rotationClass,
                        )}
                      >
                        {/* Top Photo Section */}
                        <div className="p-3.5 sm:p-4 pb-0">
                          <div
                            onClick={() => setActiveItemIndex(actualIndex)}
                            className="relative aspect-[16/11] sm:aspect-[4/3] w-full overflow-hidden rounded-xl border-[1.5px] border-[#2D1F1D]/20 bg-[#FFF9E6] cursor-pointer group/img shrink-0"
                          >
                            <Image
                              src={item.image || '/placeholder.svg'}
                              alt={item.title}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                              className="object-cover transition-transform duration-500 group-hover/img:scale-105"
                            />

                            {/* Tag Badge */}
                            <div className="absolute left-2.5 top-2.5 flex items-center gap-1.5 flex-wrap">
                              <span className="rounded-full border border-[#2D1F1D]/40 bg-[#FFE68C] px-2.5 py-0.5 text-[0.68rem] font-black uppercase text-[#2D1F1D] shadow-xs">
                                {item.tag}
                              </span>
                            </div>

                            {/* Zoom Lightbox Trigger */}
                            <span className="absolute right-2.5 top-2.5 flex size-7 items-center justify-center rounded-full border border-[#2D1F1D]/40 bg-white text-[#2D1F1D] shadow-xs transition-all group-hover/img:scale-110">
                              <Maximize2 className="size-3.5" />
                            </span>

                            {/* Year / Format Badge */}
                            {item.year && (
                              <div className="absolute bottom-2 right-2 rounded-md border border-[#2D1F1D]/30 bg-white/95 px-2 py-0.5 text-[0.62rem] font-bold text-[#2D1F1D]">
                                🗓️ {item.year}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Card Body Section */}
                        <div className="flex-1 flex flex-col justify-between p-3.5 sm:p-4 pt-3 space-y-2">
                          <div className="space-y-1.5">
                            <div
                              onClick={() => setActiveItemIndex(actualIndex)}
                              className="flex items-start justify-between gap-2 cursor-pointer group/title"
                            >
                              <h3 className="font-sans text-base sm:text-[1.05rem] font-black text-[#2D1F1D] leading-snug transition-colors group-hover/title:text-[#FF7D6B] line-clamp-1">
                                {item.title}
                              </h3>
                              <ArrowUpRight className="size-4 shrink-0 text-[#2D1F1D] transition-transform group-hover/title:translate-x-0.5 group-hover/title:-translate-y-0.5" />
                            </div>

                            <p className="text-xs sm:text-[0.82rem] font-medium leading-relaxed text-[#6B5550] line-clamp-2 sm:line-clamp-3">
                              {item.description}
                            </p>

                            {/* Highlights Badges */}
                            {item.highlights && item.highlights.length > 0 && (
                              <div className="flex flex-wrap gap-1.5 pt-1">
                                {item.highlights.slice(0, 2).map((h) => (
                                  <span
                                    key={h}
                                    className="inline-flex items-center gap-1 rounded-md border border-[#2D1F1D]/25 bg-[#FAF5EC] px-1.5 py-0.5 text-[0.62rem] font-bold text-[#2D1F1D]"
                                  >
                                    <Sparkles className="size-2.5 text-[#FF7D6B]" />
                                    <span>{h}</span>
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Bottom Action Footer */}
                          <div className="flex items-center justify-between gap-2 pt-3 border-t border-[#2D1F1D]/12 mt-2">
                            <button
                              type="button"
                              onClick={() => setActiveItemIndex(actualIndex)}
                              className="cute-btn flex-1 bg-[#FFE68C] px-3 py-2 text-xs font-black text-[#2D1F1D] hover:bg-[#FFD54F] cursor-pointer min-h-[38px] flex items-center justify-center touch-manipulation"
                            >
                              <span>Inspect Lightbox 🔍</span>
                            </button>
                            <a
                              href="#contact"
                              className="cute-btn flex-1 bg-white px-3 py-2 text-xs font-black text-[#2D1F1D] hover:bg-[#FAF5EC] cursor-pointer min-h-[38px] flex items-center justify-center touch-manipulation"
                            >
                              <span>Order Custom 💌</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                </div>
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
              className="cute-btn bg-white px-8 py-3 text-xs font-black text-[#2D1F1D] hover:bg-[#FAF5EC] sm:text-sm cursor-pointer shadow-[0_4px_12px_rgba(45,31,29,0.05),2px_2px_0px_rgba(45,31,29,0.5)]"
            >
              <span>Load More Crafts ({filteredItems.length - visibleCount} remaining) 🎒</span>
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
            className="relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-[2.5rem] border-[1.5px] border-[#3E251E]/50 bg-white shadow-[0_24px_50px_rgba(45,31,29,0.25),5px_5px_0px_rgba(45,31,29,0.5)]"
          >
            {/* Header with Title & Close button */}
            <div className="flex items-center justify-between border-b border-[#2D1F1D]/20 bg-[#FFE68C] px-6 py-4">
              <div className="flex items-center gap-2">
                <span className="rounded-full border border-[#2D1F1D]/30 bg-white px-3 py-0.5 text-xs font-black text-[#2D1F1D]">
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
                className="flex size-8 items-center justify-center rounded-full border border-[#2D1F1D]/30 bg-white text-[#2D1F1D] transition-colors hover:bg-[#FF7D6B] hover:text-white"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto p-6 sm:p-8">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border-[1.5px] border-[#2D1F1D]/30 bg-[#FFF9E6]">
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
                          className="inline-flex items-center gap-1.5 rounded-xl border border-[#2D1F1D]/30 bg-[#A7F3D0] px-3 py-1 text-xs font-bold text-[#2D1F1D] shadow-[1.5px_1.5px_0px_rgba(45,31,29,0.3)]"
                        >
                          <CheckCircle2 className="size-3.5 stroke-[2.5]" />
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#2D1F1D]/15 pt-4">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="flex size-9 items-center justify-center rounded-2xl border border-[#2D1F1D]/40 bg-[#FAF5EC] text-[#2D1F1D] shadow-[1.5px_1.5px_0px_rgba(45,31,29,0.3)] hover:bg-[#FFE68C]"
                    >
                      <ChevronLeft className="size-5" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="flex size-9 items-center justify-center rounded-2xl border border-[#2D1F1D]/40 bg-[#FAF5EC] text-[#2D1F1D] shadow-[1.5px_1.5px_0px_rgba(45,31,29,0.3)] hover:bg-[#FFE68C]"
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
