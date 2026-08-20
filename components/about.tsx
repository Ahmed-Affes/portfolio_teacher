'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Image from 'next/image'
import {
  CheckCircle2,
  GraduationCap,
  Sparkles,
  Volume2,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  ArrowRight,
  PartyPopper,
  BookOpen,
  Award,
  Compass,
  Mail,
  ShoppingBag,
} from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { SectionScene } from '@/components/section-scene'
import { TypewriterText } from '@/components/typewriter-text'
import { usePortfolio, type CareerMilestone, type MilestoneCategory } from '@/lib/portfolio-context'
import { CAREER_MILESTONES } from '@/lib/data'
import { cn } from '@/lib/utils'
import { WashiTape, CuteSticker, PushPin } from '@/components/cloud-decorations'

const CHAPTER_CONFIG: {
  id: MilestoneCategory
  chapterNum: number
  title: string
  subtitle: string
  icon: string
  color: string
  accentColor: string
  badgeBg: string
  summaryBullets: string[]
  teaser: string
}[] = [
  {
    id: 'education',
    chapterNum: 1,
    title: 'Education',
    subtitle: 'Academic Linguistics & Research',
    icon: '🎓',
    color: 'bg-[#A7F3D0]',
    accentColor: '#059669',
    badgeBg: '#E6F9F0',
    summaryBullets: [
      'Bachelor in English Linguistics & Literature (Faculty of Letters Sfax)',
      'Advanced research in Phonetics & Communicative Language Teaching (CLT)',
      'Grounded in multi-sensory second-language acquisition for young learners',
    ],
    teaser:
      'With university linguistic theory mastered, step into Farah’s vibrant primary classroom to see concepts brought to life.',
  },
  {
    id: 'career',
    chapterNum: 2,
    title: 'Teaching',
    subtitle: 'Classroom Leadership & ESL',
    icon: '💼',
    color: 'bg-[#DDD6FE]',
    accentColor: '#7C3AED',
    badgeBg: '#F3EEFF',
    summaryBullets: [
      '6+ years instructing primary & middle school ESL student cohorts',
      '900+ learners empowered with gamified speaking & theater quests',
      'Low affective filter methodology that turns shy students into confident speakers',
    ],
    teaser:
      'To solve classroom learning hurdles, Farah launched her own sensory prop atelier to handcraft tactile learning tools.',
  },
  {
    id: 'life',
    chapterNum: 3,
    title: 'Atelier',
    subtitle: 'Handcrafted Props & Sensory Lab',
    icon: '✂️',
    color: 'bg-[#FFB5B5]',
    accentColor: '#E11D48',
    badgeBg: '#FFF0F0',
    summaryBullets: [
      'Founded Farah Creative Atelier & Tactile Educational Material Lab',
      'Handcrafted 100+ bespoke felt storytelling boards & double-disc phonics dials',
      'Teacher prop rental service loved by educators across Tunisia',
    ],
    teaser:
      'With popular props in high demand, Farah started leading teacher training masterclasses and pedagogical workshops.',
  },
  {
    id: 'achievement',
    chapterNum: 4,
    title: 'Workshops',
    subtitle: 'Teacher Training & Seminars',
    icon: '🏆',
    color: 'bg-[#FED7AA]',
    accentColor: '#EA580C',
    badgeBg: '#FFF6EB',
    summaryBullets: [
      'Hands-on masterclasses for Tunisian educators on building DIY sensory aids',
      'Print-ready visual bundles, differentiated grammar worksheets & phonics sets',
      'Pedagogical keynote speaker on communicative ESL methodologies',
    ],
    teaser:
      'You have explored all 4 chapters of Farah’s journey! Ready to collaborate or book a prop?',
  },
]

type BookSpread =
  | {
      type: 'milestone'
      chapter: (typeof CHAPTER_CONFIG)[number]
      milestone: CareerMilestone
      pageInChapter: number
      totalInChapter: number
      spreadIndex: number
    }
  | {
      type: 'chapter-transition'
      completedChapter: (typeof CHAPTER_CONFIG)[number]
      nextChapter: (typeof CHAPTER_CONFIG)[number]
      spreadIndex: number
    }
  | {
      type: 'finale'
      spreadIndex: number
    }

type FlipState = {
  isFlipping: boolean
  direction: 'forward' | 'backward'
  fromIdx: number
  toIdx: number
}

// Brass Antique Filigree Corner Protector Component
function BookBrassCorner({
  position,
}: {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
}) {
  const positionClasses = {
    'top-left': '-top-1.5 -left-1.5 rounded-tl-xl border-t-2 border-l-2',
    'top-right': '-top-1.5 -right-1.5 rounded-tr-xl border-t-2 border-r-2',
    'bottom-left': '-bottom-1.5 -left-1.5 rounded-bl-xl border-b-2 border-l-2',
    'bottom-right': '-bottom-1.5 -right-1.5 rounded-br-xl border-b-2 border-r-2',
  }[position]

  return (
    <div
      className={cn(
        'absolute size-8 z-45 pointer-events-none border-[#785116] bg-gradient-to-br from-[#FFE898] via-[#D4AF37] to-[#8C6D23] shadow-[1.5px_1.5px_3px_rgba(0,0,0,0.4)] flex items-center justify-center',
        positionClasses,
      )}
    >
      {/* Ornate corner rivet */}
      <span className="size-1.5 rounded-full bg-[#523A12] border border-[#FFE898]/70 shadow-inner" />
    </div>
  )
}

export function About() {
  const { state } = usePortfolio()
  const { about, contact } = state

  // Retrieve active milestones with guaranteed fallback to default CAREER_MILESTONES
  const rawMilestones =
    about?.milestones && about.milestones.length >= CAREER_MILESTONES.length
      ? about.milestones
      : CAREER_MILESTONES
  const allMilestones: CareerMilestone[] =
    rawMilestones.length > 0
      ? rawMilestones.filter((m) => m.isActive !== false)
      : CAREER_MILESTONES

  // Build the book spreads including milestone pages and dedicated chapter transition pages
  const bookSpreads: BookSpread[] = []
  let spreadCounter = 0

  CHAPTER_CONFIG.forEach((chapter, chapIdx) => {
    const chapterMilestones = allMilestones.filter((m) => m.category === chapter.id)
    const milestonesToRender =
      chapterMilestones.length > 0
        ? chapterMilestones
        : allMilestones.filter((m) => m.category === 'education')

    milestonesToRender.forEach((milestone, mIdx) => {
      bookSpreads.push({
        type: 'milestone',
        chapter,
        milestone,
        pageInChapter: mIdx + 1,
        totalInChapter: milestonesToRender.length,
        spreadIndex: spreadCounter++,
      })
    })

    // After all milestones in this chapter, add dedicated chapter transition spread
    const nextChapter =
      chapIdx < CHAPTER_CONFIG.length - 1 ? CHAPTER_CONFIG[chapIdx + 1] : null

    if (nextChapter) {
      bookSpreads.push({
        type: 'chapter-transition',
        completedChapter: chapter,
        nextChapter,
        spreadIndex: spreadCounter++,
      })
    } else {
      // Grand finale spread at the very end of the book
      bookSpreads.push({
        type: 'finale',
        spreadIndex: spreadCounter++,
      })
    }
  })

  const totalSpreads = Math.max(1, bookSpreads.length)

  // Current active spread index
  const [activeIdx, setActiveIdx] = useState(0)

  // 3D Flip Animation State
  const [flipState, setFlipState] = useState<FlipState>({
    isFlipping: false,
    direction: 'forward',
    fromIdx: 0,
    toIdx: 0,
  })

  // Lightbox Modal State
  const [lightboxData, setLightboxData] = useState<{
    milestone: CareerMilestone
    photoIndex: number
  } | null>(null)

  const flipTimerRef = useRef<NodeJS.Timeout | null>(null)

  const safeIdx = Math.max(0, Math.min(activeIdx, totalSpreads - 1))
  const currentSpread = bookSpreads[safeIdx] || bookSpreads[0]

  // Active category derived from current spread
  const activeCategory: MilestoneCategory =
    currentSpread.type === 'milestone'
      ? currentSpread.chapter.id
      : currentSpread.type === 'chapter-transition'
        ? currentSpread.completedChapter.id
        : 'achievement'

  // Finalize flip animation smoothly
  const finishFlip = useCallback((targetIdx: number) => {
    if (flipTimerRef.current) {
      clearTimeout(flipTimerRef.current)
      flipTimerRef.current = null
    }
    setActiveIdx(targetIdx)
    setFlipState({
      isFlipping: false,
      direction: 'forward',
      fromIdx: targetIdx,
      toIdx: targetIdx,
    })
  }, [])

  // Trigger smooth 3D physical page turn with fail-safe timer
  const turnToSpread = useCallback(
    (targetIdx: number) => {
      const clampedIdx = Math.max(0, Math.min(targetIdx, totalSpreads - 1))
      if (clampedIdx === safeIdx) return

      if (flipTimerRef.current) {
        clearTimeout(flipTimerRef.current)
      }

      const direction = clampedIdx > safeIdx ? 'forward' : 'backward'
      const fromIndex = safeIdx

      setFlipState({
        isFlipping: true,
        direction,
        fromIdx: fromIndex,
        toIdx: clampedIdx,
      })

      // 480ms timer to finalize flip
      flipTimerRef.current = setTimeout(() => {
        finishFlip(clampedIdx)
      }, 480)
    },
    [safeIdx, totalSpreads, finishFlip],
  )

  // Switch category tab -> jump to the first milestone spread of that category
  const handleCategoryClick = (catId: MilestoneCategory) => {
    const targetIdx = bookSpreads.findIndex(
      (s) => s.type === 'milestone' && s.chapter.id === catId,
    )
    if (targetIdx !== -1 && targetIdx !== safeIdx) {
      turnToSpread(targetIdx)
    }
  }

  // Cleanup timer on unmount only
  useEffect(() => {
    return () => {
      if (flipTimerRef.current) clearTimeout(flipTimerRef.current)
    }
  }, [])

  // Keyboard navigation for turning book pages
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxData) return
      if (e.key === 'ArrowRight' && safeIdx < totalSpreads - 1) {
        turnToSpread(safeIdx + 1)
      } else if (e.key === 'ArrowLeft' && safeIdx > 0) {
        turnToSpread(safeIdx - 1)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [safeIdx, totalSpreads, lightboxData, turnToSpread])

  // Helpers for 3D flip layers
  const fromSpread = bookSpreads[flipState.fromIdx] || currentSpread
  const toSpread = bookSpreads[flipState.toIdx] || currentSpread

  // =========================================================================
  // RENDER LEFT PAGE (Either Milestone spotlight, Transition summary, or Finale)
  // =========================================================================
  const renderLeftPageContent = (
    spread: BookSpread,
    idx: number,
    isStatic = false,
  ) => {
    if (spread.type === 'milestone') {
      const { milestone, chapter, pageInChapter, totalInChapter } = spread
      const photos =
        milestone?.images && milestone.images.length > 0
          ? milestone.images
          : [milestone?.image || '/images/farah-portrait.png']
      const spotlightImg = photos[0]

      return (
        <div className="size-full flex flex-col justify-between p-3.5 sm:p-4.5 bg-[#FCF9F2] select-none shadow-[inset_0_0_20px_rgba(180,150,110,0.06)] border-r border-[#E5DAC6]/80">
          {/* Top Chapter Header */}
          <div className="flex items-center justify-between border-b border-[#2D1F1D]/15 pb-1.5 shrink-0 gap-2">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="text-[0.68rem] font-black uppercase tracking-wider font-sans text-[#FF7D6B] shrink-0">
                Chapter {chapter.chapterNum}: {chapter.title}
              </span>
              {totalInChapter > 1 && (
                <span className="rounded-full border border-[#2D1F1D] bg-[#FFE68C] px-2 py-0.2 text-[0.55rem] font-black font-sans text-[#2D1F1D] shrink-0">
                  Part {pageInChapter}/{totalInChapter}
                </span>
              )}
            </div>

            <span className="text-[0.62rem] font-bold text-[#6B5550] font-sans shrink-0 whitespace-nowrap bg-[#FAF5EC] border border-[#2D1F1D]/15 rounded-md px-1.5 py-0.2">
              Page {(idx + 1) * 2 - 1}
            </span>
          </div>

          {/* Chapter Spotlight Photo Pinned with 3D Pushpin */}
          <div className="relative mx-auto w-full max-w-[175px] h-[126px] flex items-center justify-center my-auto pt-1">
            <PushPin color="red" size={24} className="left-1/2 top-0" />

            <div
              onClick={() =>
                !flipState.isFlipping &&
                setLightboxData({
                  milestone,
                  photoIndex: 0,
                })
              }
              className="group/spotlight relative aspect-[4/3] h-full overflow-hidden rounded-xl border-2 border-[#2D1F1D] bg-white p-1 shadow-[3px_3px_0px_#2D1F1D] cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[4.5px_4.5px_0px_#2D1F1D] rotate-[-0.6deg]"
            >
              <div className="relative size-full overflow-hidden rounded-lg">
                <Image
                  src={spotlightImg}
                  alt={milestone?.title || 'Milestone photo'}
                  fill
                  sizes="(max-width: 768px) 180px, 200px"
                  className="object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover/spotlight:opacity-100 transition-opacity">
                  <span className="flex size-5 items-center justify-center rounded-full bg-white text-[#2D1F1D] shadow-xs">
                    <Maximize2 className="size-2.5" />
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Highlights / Skills Stickers (Clean & Fully Visible) */}
          <div className="flex flex-wrap gap-1.5 items-center my-auto py-1 shrink-0">
            {milestone?.highlights &&
              milestone.highlights.length > 0 &&
              milestone.highlights.slice(0, 3).map((h, hIdx) => (
                <span
                  key={hIdx}
                  className="inline-flex items-center gap-1 rounded-lg border border-[#2D1F1D] bg-white px-2 py-0.5 text-[0.62rem] font-bold font-sans text-[#2D1F1D] shadow-[1px_1px_0px_#2D1F1D]"
                >
                  <CheckCircle2 className="size-2.5 stroke-[2.5] text-[#10B981] shrink-0" />
                  <span className="truncate max-w-[135px]">{h}</span>
                </span>
              ))}
          </div>

          {/* BOTTOM-LEFT CORNER: Turn Back Navigation Button */}
          <div className="flex items-center justify-between pt-1.5 border-t border-[#2D1F1D]/15 shrink-0">
            <button
              type="button"
              disabled={idx === 0 || !isStatic}
              onClick={() => isStatic && turnToSpread(idx - 1)}
              className={cn(
                'flex items-center gap-1 rounded-lg border-2 border-[#2D1F1D] px-2.5 py-1 text-xs font-black font-sans transition-all cursor-pointer select-none',
                idx > 0 && isStatic
                  ? 'bg-[#FFE68C] text-[#2D1F1D] shadow-[2px_2px_0px_#2D1F1D] hover:-translate-x-0.5 hover:bg-[#FFD952]'
                  : 'opacity-40 bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed',
              )}
            >
              <ChevronLeft className="size-3.5" />
              <span>‹ Previous</span>
            </button>

            <span className="text-[0.62rem] font-bold text-[#6B5550] font-sans">
              {idx + 1} of {totalSpreads}
            </span>
          </div>
        </div>
      )
    }

    if (spread.type === 'chapter-transition') {
      const { completedChapter } = spread

      return (
        <div className="size-full flex flex-col justify-between p-3.5 sm:p-4.5 bg-[#FCF9F2] select-none shadow-[inset_0_0_20px_rgba(180,150,110,0.06)] border-r border-[#E5DAC6]/80">
          {/* Top Header */}
          <div className="flex items-center justify-between border-b border-[#2D1F1D]/15 pb-1.5 shrink-0">
            <span className="rounded-full border border-[#2D1F1D] bg-[#A7F3D0] px-2.5 py-0.5 text-[0.65rem] font-black text-[#065F46] shadow-[1px_1px_0px_#2D1F1D]">
              ✨ Chapter {completedChapter.chapterNum} Complete
            </span>
            <span className="text-[0.62rem] font-bold text-[#6B5550] bg-[#FAF5EC] border border-[#2D1F1D]/15 rounded-md px-1.5 py-0.2">
              Page {(idx + 1) * 2 - 1}
            </span>
          </div>

          {/* Center Achievement Certificate Card */}
          <div className="my-auto space-y-2 rounded-2xl border-2 border-[#2D1F1D] bg-[#FFF8E7] p-3 shadow-[3px_3px_0px_#2D1F1D]">
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-xl border border-[#2D1F1D] bg-white text-base shadow-xs">
                {completedChapter.icon}
              </div>
              <div>
                <h4 className="font-sans text-xs font-black text-[#2D1F1D]">
                  Chapter {completedChapter.chapterNum}: {completedChapter.title}
                </h4>
                <p className="text-[0.6rem] font-bold text-[#6B5550]">
                  {completedChapter.subtitle}
                </p>
              </div>
            </div>

            <div className="space-y-1 border-t border-[#2D1F1D]/15 pt-2">
              {completedChapter.summaryBullets.map((bullet, bIdx) => (
                <div key={bIdx} className="flex items-start gap-1.5 text-[0.65rem] font-medium text-[#2D1F1D] leading-tight">
                  <CheckCircle2 className="size-3 text-[#10B981] shrink-0 mt-0.5" />
                  <span>{bullet}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Left Button */}
          <div className="flex items-center justify-between pt-1.5 border-t border-[#2D1F1D]/15 shrink-0">
            <button
              type="button"
              disabled={idx === 0 || !isStatic}
              onClick={() => isStatic && turnToSpread(idx - 1)}
              className={cn(
                'flex items-center gap-1 rounded-lg border-2 border-[#2D1F1D] px-2.5 py-1 text-xs font-black font-sans transition-all cursor-pointer select-none',
                idx > 0 && isStatic
                  ? 'bg-[#FFE68C] text-[#2D1F1D] shadow-[2px_2px_0px_#2D1F1D] hover:-translate-x-0.5'
                  : 'opacity-40 bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed',
              )}
            >
              <ChevronLeft className="size-3.5" />
              <span>‹ Previous Page</span>
            </button>
            <span className="text-[0.62rem] font-bold text-[#6B5550]">
              {idx + 1} of {totalSpreads}
            </span>
          </div>
        </div>
      )
    }

    // Finale Left Page (Timeline Recap)
    return (
      <div className="size-full flex flex-col justify-between p-3.5 sm:p-4.5 bg-[#FCF9F2] select-none shadow-[inset_0_0_20px_rgba(180,150,110,0.06)] border-r border-[#E5DAC6]/80">
        <div className="flex items-center justify-between border-b border-[#2D1F1D]/15 pb-1.5 shrink-0">
          <span className="rounded-full border border-[#2D1F1D] bg-[#FFE68C] px-2.5 py-0.5 text-[0.65rem] font-black text-[#2D1F1D]">
            🌟 Farah’s Journey Recap
          </span>
          <span className="text-[0.62rem] font-bold text-[#6B5550] bg-[#FAF5EC] border border-[#2D1F1D]/15 rounded-md px-1.5 py-0.2">
            Page {(idx + 1) * 2 - 1}
          </span>
        </div>

        <div className="my-auto space-y-1.5 rounded-2xl border-2 border-[#2D1F1D] bg-white p-3 shadow-[3px_3px_0px_#2D1F1D]">
          <div className="flex items-center gap-1.5 text-xs font-black text-[#2D1F1D]">
            <Sparkles className="size-3.5 text-[#FF7D6B]" />
            <span>4 Chapters of Dedication</span>
          </div>
          <div className="grid grid-cols-2 gap-1.5 pt-1 text-[0.62rem]">
            <div className="rounded-lg border border-[#2D1F1D]/20 bg-[#F0FDF4] p-1.5">
              <span className="font-black text-[#059669]">🎓 Linguistics</span>
              <p className="text-[0.55rem] text-[#6B5550]">Phonetics &amp; CLT</p>
            </div>
            <div className="rounded-lg border border-[#2D1F1D]/20 bg-[#FAF5FF] p-1.5">
              <span className="font-black text-[#7C3AED]">💼 Classroom</span>
              <p className="text-[0.55rem] text-[#6B5550]">900+ ESL Learners</p>
            </div>
            <div className="rounded-lg border border-[#2D1F1D]/20 bg-[#FFF1F2] p-1.5">
              <span className="font-black text-[#E11D48]">✂️ Atelier</span>
              <p className="text-[0.55rem] text-[#6B5550]">100+ Custom Props</p>
            </div>
            <div className="rounded-lg border border-[#2D1F1D]/20 bg-[#FFF7ED] p-1.5">
              <span className="font-black text-[#EA580C]">🏆 Workshops</span>
              <p className="text-[0.55rem] text-[#6B5550]">Teacher Seminars</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1.5 border-t border-[#2D1F1D]/15 shrink-0">
          <button
            type="button"
            disabled={idx === 0 || !isStatic}
            onClick={() => isStatic && turnToSpread(idx - 1)}
            className="flex items-center gap-1 rounded-lg border-2 border-[#2D1F1D] bg-[#FFE68C] px-2.5 py-1 text-xs font-black shadow-[2px_2px_0px_#2D1F1D] cursor-pointer"
          >
            <ChevronLeft className="size-3.5" />
            <span>‹ Previous Page</span>
          </button>
          <span className="text-[0.62rem] font-bold text-[#6B5550]">
            {idx + 1} of {totalSpreads}
          </span>
        </div>
      </div>
    )
  }

  // =========================================================================
  // RENDER RIGHT PAGE (Either Milestone details, Next Chapter CTA, or Finale)
  // =========================================================================
  const renderRightPageContent = (
    spread: BookSpread,
    idx: number,
    isStatic = false,
  ) => {
    if (spread.type === 'milestone') {
      const { milestone, chapter } = spread
      const photos =
        milestone?.images && milestone.images.length > 0
          ? milestone.images
          : [milestone?.image || '/images/farah-portrait.png']

      return (
        <div className="size-full flex flex-col justify-between p-3.5 sm:p-4.5 bg-[#FCF9F2] select-none shadow-[inset_0_0_20px_rgba(180,150,110,0.06)] border-l border-[#E5DAC6]/80">
          {/* Right Page Top Header */}
          <div className="flex items-center justify-between border-b border-[#2D1F1D]/15 pb-1.5 shrink-0 gap-2">
            <div className="flex items-center gap-1.5 min-w-0 flex-1">
              <span className="shrink-0 inline-flex items-center gap-1 rounded-full border border-[#2D1F1D] bg-[#A7F3D0] px-2.5 py-0.5 text-[0.62rem] font-black font-sans text-[#2D1F1D] shadow-[1px_1px_0px_#2D1F1D]">
                <span>{milestone?.badgeEmoji || chapter.icon}</span>
                <span className="truncate max-w-[90px] sm:max-w-none">
                  {milestone?.categoryLabel || chapter.title}
                </span>
              </span>

              <span className="inline-flex items-center gap-1 text-[0.68rem] font-bold text-[#6B5550] font-sans truncate min-w-0">
                <MapPin className="size-2.5 text-[#FF7D6B] shrink-0" />
                <span className="truncate">{milestone?.organization}</span>
              </span>
            </div>

            <span className="shrink-0 text-[0.62rem] font-bold text-[#6B5550] font-sans whitespace-nowrap bg-[#FAF5EC] border border-[#2D1F1D]/15 rounded-md px-1.5 py-0.2">
              Page {(idx + 1) * 2}
            </span>
          </div>

          {/* Title & Narrative Section */}
          <div className="space-y-1 my-auto">
            <h3 className="font-sans text-sm sm:text-[0.92rem] font-black text-[#2D1F1D] leading-snug line-clamp-2 min-h-[2.3rem] flex items-center">
              {milestone?.title}
            </h3>

            <p className="font-sans text-xs sm:text-[0.76rem] font-medium leading-relaxed text-[#2D1F1D] line-clamp-3 overflow-hidden">
              {milestone?.description}
            </p>
          </div>

          {/* Multi-Photo Snapshots Strip (Clean & Uncrowded) */}
          <div className="pt-1 border-t border-[#2D1F1D]/15 shrink-0">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[0.62rem] font-black uppercase font-sans text-[#2D1F1D] flex items-center gap-1">
                <Sparkles className="size-2.5 text-[#FF7D6B]" />
                <span>Snapshots ({photos.length})</span>
              </span>
              <span className="text-[0.55rem] font-bold text-[#6B5550] font-sans">
                Click to zoom 🔍
              </span>
            </div>

            <div className="grid grid-cols-3 gap-1.5 h-[56px]">
              {photos.slice(0, 3).map((photoUrl, pIdx) => {
                const pinColors: ('mint' | 'purple' | 'coral')[] = ['mint', 'purple', 'coral']
                const pinColor = pinColors[pIdx % pinColors.length]

                return (
                  <div
                    key={pIdx}
                    onClick={() =>
                      !flipState.isFlipping &&
                      setLightboxData({
                        milestone,
                        photoIndex: pIdx,
                      })
                    }
                    className="group/photo relative h-full rounded-xl border-2 border-[#2D1F1D] bg-white p-0.5 shadow-[1.5px_1.5px_0px_#2D1F1D] cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_#2D1F1D] select-none"
                  >
                    <PushPin color={pinColor} size={16} className="left-1/2 top-0" />

                    <div className="relative size-full overflow-hidden rounded-lg border border-[#2D1F1D]/10 bg-[#2D1F1D]/5">
                      <Image
                        src={photoUrl}
                        alt={`${milestone?.title} ${pIdx + 1}`}
                        fill
                        sizes="(max-width: 768px) 100px, 120px"
                        className="object-cover transition-transform duration-300 group-hover/photo:scale-105"
                      />

                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity duration-200 group-hover/photo:opacity-100">
                        <span className="flex size-4 items-center justify-center rounded-full border border-[#2D1F1D] bg-[#FFE68C] text-[#2D1F1D]">
                          <Maximize2 className="size-2" />
                        </span>
                      </div>

                      <div className="absolute bottom-0.5 right-0.5 rounded bg-white/95 px-1 text-[0.45rem] font-black font-sans text-[#2D1F1D] border border-[#2D1F1D]/30">
                        #{pIdx + 1}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* BOTTOM-RIGHT CORNER: Turn Page Forward Navigation Button */}
          <div className="flex items-center justify-between pt-1.5 border-t border-[#2D1F1D]/15 shrink-0">
            <div className="flex items-center gap-1">
              {bookSpreads.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={() => turnToSpread(dotIdx)}
                  aria-label={`Go to spread ${dotIdx + 1}`}
                  className={cn(
                    'size-2 rounded-full border border-[#2D1F1D] transition-all cursor-pointer',
                    dotIdx === idx
                      ? 'bg-[#FF7D6B] scale-125 shadow-xs'
                      : 'bg-white hover:bg-[#FFE68C]',
                  )}
                />
              ))}
            </div>

            <button
              type="button"
              disabled={idx === totalSpreads - 1 || !isStatic}
              onClick={() => isStatic && turnToSpread(idx + 1)}
              className={cn(
                'flex items-center gap-1 rounded-lg border-2 border-[#2D1F1D] px-2.5 py-1 text-xs font-black font-sans transition-all cursor-pointer select-none',
                idx < totalSpreads - 1 && isStatic
                  ? 'bg-[#A7F3D0] text-[#065F46] shadow-[2px_2px_0px_#2D1F1D] hover:translate-x-0.5 hover:bg-[#6EE7B7]'
                  : 'opacity-40 bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed',
              )}
            >
              <span>Turn Page 📄</span>
              <ChevronRight className="size-3.5" />
            </button>
          </div>
        </div>
      )
    }

    if (spread.type === 'chapter-transition') {
      const { nextChapter } = spread

      return (
        <div className="size-full flex flex-col justify-between p-3.5 sm:p-4.5 bg-[#FCF9F2] select-none shadow-[inset_0_0_20px_rgba(180,150,110,0.06)] border-l border-[#E5DAC6]/80">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#2D1F1D]/15 pb-1.5 shrink-0">
            <span className="rounded-full border border-[#2D1F1D] bg-[#DDD6FE] px-2.5 py-0.5 text-[0.65rem] font-black text-[#5B21B6] shadow-[1px_1px_0px_#2D1F1D]">
              🚀 Up Next: Chapter {nextChapter.chapterNum}
            </span>
            <span className="text-[0.62rem] font-bold text-[#6B5550] bg-[#FAF5EC] border border-[#2D1F1D]/15 rounded-md px-1.5 py-0.2">
              Page {(idx + 1) * 2}
            </span>
          </div>

          {/* Big Next Chapter Invitation Card */}
          <div className="my-auto space-y-2.5 rounded-2xl border-3 border-[#2D1F1D] bg-white p-3.5 shadow-[4px_4px_0px_#2D1F1D] text-center">
            <div className="mx-auto flex size-11 items-center justify-center rounded-2xl border-2 border-[#2D1F1D] bg-[#FFE68C] text-xl shadow-[2px_2px_0px_#2D1F1D] animate-bounce">
              {nextChapter.icon}
            </div>

            <div>
              <h3 className="font-sans text-sm sm:text-base font-black text-[#2D1F1D]">
                Chapter {nextChapter.chapterNum}: {nextChapter.title}
              </h3>
              <p className="text-[0.68rem] font-bold text-[#6B5550]">
                {nextChapter.subtitle}
              </p>
            </div>

            <p className="text-[0.68rem] font-medium leading-relaxed text-[#2D1F1D]/80">
              {nextChapter.teaser}
            </p>

            <button
              type="button"
              disabled={!isStatic}
              onClick={() => isStatic && turnToSpread(idx + 1)}
              className="w-full rounded-xl border-2 border-[#2D1F1D] bg-[#A7F3D0] hover:bg-[#6EE7B7] py-2 px-3 text-xs font-black text-[#065F46] shadow-[2.5px_2.5px_0px_#2D1F1D] flex items-center justify-center gap-1.5 cursor-pointer transition-all hover:translate-y-[-1px]"
            >
              <span>Open Chapter {nextChapter.chapterNum}: {nextChapter.title}</span>
              <ArrowRight className="size-3.5" />
            </button>
          </div>

          {/* Bottom Right Page Turn Button */}
          <div className="flex items-center justify-between pt-1.5 border-t border-[#2D1F1D]/15 shrink-0">
            <div className="flex items-center gap-1">
              {bookSpreads.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={() => turnToSpread(dotIdx)}
                  className={cn(
                    'size-2 rounded-full border border-[#2D1F1D] transition-all cursor-pointer',
                    dotIdx === idx ? 'bg-[#FF7D6B] scale-125' : 'bg-white',
                  )}
                />
              ))}
            </div>

            <button
              type="button"
              disabled={idx === totalSpreads - 1 || !isStatic}
              onClick={() => isStatic && turnToSpread(idx + 1)}
              className="flex items-center gap-1 rounded-lg border-2 border-[#2D1F1D] bg-[#A7F3D0] px-2.5 py-1 text-xs font-black text-[#065F46] shadow-[2px_2px_0px_#2D1F1D] cursor-pointer"
            >
              <span>Next Chapter ➔</span>
            </button>
          </div>
        </div>
      )
    }

    // Finale Right Page (Action Hub)
    return (
      <div className="size-full flex flex-col justify-between p-3.5 sm:p-4.5 bg-[#FCF9F2] select-none shadow-[inset_0_0_20px_rgba(180,150,110,0.06)] border-l border-[#E5DAC6]/80">
        <div className="flex items-center justify-between border-b border-[#2D1F1D]/15 pb-1.5 shrink-0">
          <span className="rounded-full border border-[#2D1F1D] bg-[#FFB5B5] px-2.5 py-0.5 text-[0.65rem] font-black text-[#881337] shadow-[1px_1px_0px_#2D1F1D]">
            🎉 Story Completed!
          </span>
          <span className="text-[0.62rem] font-bold text-[#6B5550] bg-[#FAF5EC] border border-[#2D1F1D]/15 rounded-md px-1.5 py-0.2">
            Page {(idx + 1) * 2}
          </span>
        </div>

        <div className="my-auto space-y-2 rounded-2xl border-3 border-[#2D1F1D] bg-[#FFF8E7] p-3 shadow-[4px_4px_0px_#2D1F1D] text-center">
          <PartyPopper className="mx-auto size-7 text-[#FF7D6B]" />
          <div>
            <h3 className="font-sans text-sm font-black text-[#2D1F1D]">
              Ready to Collaborate?
            </h3>
            <p className="text-[0.65rem] font-bold text-[#6B5550]">
              Bring interactive props &amp; workshops to your classroom
            </p>
          </div>

          <div className="space-y-1.5 pt-1">
            <a
              href="#contact"
              className="w-full rounded-xl border-2 border-[#2D1F1D] bg-[#FFB5B5] hover:bg-[#FF8A8A] py-1.5 px-3 text-xs font-black text-[#881337] shadow-[2px_2px_0px_#2D1F1D] flex items-center justify-center gap-1.5 transition-all"
            >
              <Mail className="size-3.5" />
              <span>Book a Workshop / Commission</span>
            </a>
            <a
              href="#materials"
              className="w-full rounded-xl border-2 border-[#2D1F1D] bg-white hover:bg-[#FFE68C] py-1.5 px-3 text-xs font-black text-[#2D1F1D] shadow-[2px_2px_0px_#2D1F1D] flex items-center justify-center gap-1.5 transition-all"
            >
              <ShoppingBag className="size-3.5 text-[#059669]" />
              <span>Explore Prop Atelier &amp; Rentals</span>
            </a>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1.5 border-t border-[#2D1F1D]/15 shrink-0">
          <button
            type="button"
            onClick={() => turnToSpread(0)}
            className="rounded-lg border-2 border-[#2D1F1D] bg-[#FFE68C] px-2.5 py-1 text-xs font-black text-[#2D1F1D] shadow-[1.5px_1.5px_0px_#2D1F1D] cursor-pointer"
          >
            ↺ Read From Start
          </button>
          <span className="text-[0.62rem] font-bold text-[#6B5550]">
            The End ✨
          </span>
        </div>
      </div>
    )
  }

  return (
    <section
      id="about"
      className="section-shell relative overflow-hidden bg-[#FAF6F0] py-8 sm:py-12 lg:py-14"
    >
      <SectionScene theme="about" pattern="dots" />

      <div className="section-inner section-stack">
        {/* Top Section Heading */}
        <Reveal>
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              number="01"
              eyebrow={about.eyebrow || 'Meet Teacher Farah 🌸'}
              title={about.title || 'My Education, Teaching Career & Creative Journey'}
              intro={
                about.intro ||
                'Turn the pages of my journey storybook to explore my university linguistics degrees, primary ESL classroom leadership, and handcrafted prop atelier.'
              }
              typewriterIntro
            />
            {contact.openForWorkshops && (
              <div className="flex items-center gap-2">
                <CuteSticker color="mint" rotate="rotate-2" className="hidden md:inline-flex">
                  <span className="size-2.5 rounded-full bg-[#10B981] animate-ping" />
                  <span>Open for workshops &amp; commissions 🎨</span>
                </CuteSticker>
              </div>
            )}
          </div>
        </Reveal>

        {/* ========================================================================= */}
        {/* 2-COLUMN LAYOUT: LEFT (PORTRAIT + MANIFESTO) | RIGHT (REAL PHYSICAL BOOK) */}
        {/* ========================================================================= */}
        <div className="grid items-start gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:gap-8">
          {/* ========================================================================= */}
          {/* LEFT COLUMN: Clean Polaroid Portrait & Teacher Manifesto (OUTSIDE BOOK)   */}
          {/* ========================================================================= */}
          <div className="flex flex-col gap-3.5">
            {/* 1. Scrapbook Polaroid Portrait */}
            <Reveal direction="right">
              <div className="group relative mx-auto w-full max-w-sm lg:max-w-none">
                {/* 3D Pushpin and Washi Tape */}
                <PushPin color="red" size={30} className="left-1/2 -top-1" />
                <WashiTape color="#FFC837" className="left-8 -top-3 w-22" pattern="stripes" />

                <div className="relative aspect-[4/3.2] max-h-[260px] w-full overflow-hidden rounded-[2.2rem_1.4rem_2.2rem_1.6rem] border-3 border-[#2D1F1D] bg-white shadow-[6px_6px_0px_#2D1F1D] transition-transform duration-300 hover:rotate-1 rotate-[-0.6deg]">
                  <Image
                    src={about.portraitImage || '/images/farah-portrait.png'}
                    alt="Portrait of Farah Affes holding an educational prop in Sfax"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 420px"
                    className="object-cover object-top"
                  />

                  {/* Floating educator pill */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between rounded-xl border-2 border-[#2D1F1D] bg-white/95 p-2 shadow-[2px_2px_0px_#2D1F1D] backdrop-blur-md">
                    <div className="flex items-center gap-2">
                      <div className="flex size-6.5 items-center justify-center rounded-lg border border-[#2D1F1D] bg-[#FFE68C] text-[#2D1F1D]">
                        <GraduationCap className="size-3.5" />
                      </div>
                      <div>
                        <p className="text-xs font-black text-[#2D1F1D]">Farah Affes</p>
                        <p className="text-[0.6rem] font-bold text-[#6B5550]">
                          English Linguistics &amp; Atelier Teacher
                        </p>
                      </div>
                    </div>
                    <span className="rounded-full border border-[#2D1F1D] bg-[#A7F3D0] px-2 py-0.5 text-[0.58rem] font-black text-[#2D1F1D]">
                      Sfax, TN 🌸
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* 2. Teacher Manifesto Sticky Note */}
            <Reveal delay={90} direction="right">
              <div className="group relative">
                <PushPin color="purple" size={26} className="right-8 -top-1" />

                <div className="relative overflow-hidden rounded-[1.6rem_2.2rem_1.4rem_2rem] border-3 border-[#2D1F1D] bg-[#FFE68C] p-3.5 sm:p-4 text-[#2D1F1D] shadow-[5px_5px_0px_#2D1F1D] rotate-[0.6deg]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-[#2D1F1D]">
                      <Sparkles className="size-3.5 fill-[#FF7D6B] text-[#2D1F1D]" />
                      <span className="text-[0.7rem] font-black uppercase tracking-wider font-sans">
                        Teacher Manifesto
                      </span>
                    </div>
                    {/* Animated sound wave */}
                    <div className="flex h-3.5 items-end gap-1">
                      <Volume2 className="mr-0.5 size-3 text-[#2D1F1D]" />
                      {[8, 14, 10, 16, 12].map((h, idx) => (
                        <span
                          key={idx}
                          className="w-0.5 rounded-full bg-[#2D1F1D]"
                          style={{
                            height: `${h}px`,
                            animation: `soundwave 1.2s ease-in-out infinite ${idx * 0.12}s`,
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  <blockquote className="mt-2 font-hand text-sm sm:text-base font-bold leading-snug text-[#2D1F1D]">
                    &ldquo;
                    <TypewriterText
                      text={
                        about.manifestoQuote ||
                        'When a child touches a word, moves a syllable with their hands, and acts out a story, English stops being a school subject and becomes their voice.'
                      }
                      speed={20}
                      startDelay={200}
                      showCursor={false}
                    />
                    &rdquo;
                  </blockquote>

                  <div className="mt-2.5 flex items-center justify-between border-t border-[#2D1F1D]/20 pt-1.5 text-[0.65rem] font-bold text-[#6B5550]">
                    <span className="text-[#2D1F1D] font-black font-sans">
                      — {about.manifestoAuthor || 'Farah Affes'}
                    </span>
                    <span className="rounded-full bg-white/85 px-2 py-0.2 text-[0.58rem] text-[#2D1F1D] border border-[#2D1F1D]/30 font-black font-sans">
                      Classroom Tested ✨
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: REALISTIC PHYSICAL HARDCOVER BOOK WITH STACKED PAGES & TABS */}
          {/* ========================================================================= */}
          <div className="relative">
            <Reveal delay={80}>
              {/* 4 PHYSICAL BOOK CHAPTER INDEX TABS (EQUAL WIDTH, NO OVERFLOW) */}
              <div className="grid grid-cols-4 gap-1 sm:gap-2 px-3 sm:px-5 mb-0 select-none">
                {CHAPTER_CONFIG.map((tab) => {
                  const isSelected = activeCategory === tab.id
                  const count = allMilestones.filter((m) => m.category === tab.id).length

                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => handleCategoryClick(tab.id)}
                      className={cn(
                        'relative -mb-[3px] flex items-center justify-center gap-1 sm:gap-1.5 rounded-t-xl sm:rounded-t-2xl border-3 border-[#2D1F1D] py-1.5 sm:py-2 px-1 text-center font-sans font-black transition-all duration-200 cursor-pointer select-none',
                        tab.color,
                        isSelected
                          ? 'z-20 -translate-y-1 sm:-translate-y-1.5 border-b-0 shadow-[0_-3px_0_#2D1F1D] text-[#2D1F1D]'
                          : 'z-10 opacity-70 hover:opacity-100 hover:-translate-y-0.5 text-[#2D1F1D]',
                      )}
                    >
                      <span className="text-xs sm:text-sm">{tab.icon}</span>
                      <span className="text-[0.7rem] sm:text-xs font-black truncate">
                        {tab.title}
                      </span>
                      {count > 0 && (
                        <span className="rounded-full bg-white/90 border border-[#2D1F1D]/30 px-1.5 py-0.2 text-[0.55rem] font-black shrink-0 hidden sm:inline">
                          {count}
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>

              {/* REALISTIC VINTAGE HARDCOVER BOOK WITH BRASS CORNERS */}
              <div className="relative rounded-[2.2rem_2.2rem_1.8rem_1.8rem] border-4 border-[#2D1F1D] bg-[#241713] p-2.5 sm:p-3 shadow-[0_22px_48px_rgba(36,23,19,0.4),8px_12px_0px_#2D1F1D]">
                {/* 4 Antique Brass Filigree Metallic Corners */}
                <BookBrassCorner position="top-left" />
                <BookBrassCorner position="top-right" />
                <BookBrassCorner position="bottom-left" />
                <BookBrassCorner position="bottom-right" />

                {/* Hardcover Perimeter Gold Stitched Line */}
                <div className="absolute inset-1.5 rounded-[1.8rem_1.8rem_1.4rem_1.4rem] border border-dashed border-[#D4AF37]/35 pointer-events-none" />

                {/* ------------------------------------------------------------- */}
                {/* PHYSICAL 3D STACKED PAPER PAGES BLOCK (DECKLE EDGE TEXTURE)   */}
                {/* ------------------------------------------------------------- */}
                <div
                  style={{
                    background:
                      'repeating-linear-gradient(to bottom, #F7F1E5, #F7F1E5 2px, #EBE1CE 3px, #EBE1CE 4px)',
                  }}
                  className="relative rounded-[1.6rem_1.6rem_1.2rem_1.2rem] p-1.5 sm:p-2 border-r-4 border-l-3 border-b-3 border-[#C9BDA8] shadow-[inset_0_2px_4px_rgba(0,0,0,0.15)]"
                >
                  {/* Left Side Paper Thickness Stack Fanning */}
                  <div className="absolute inset-y-2 left-0.5 w-1 border-r border-[#C9BDA8] pointer-events-none" />
                  <div className="absolute inset-y-3 left-1 w-1 border-r border-[#B8AA94] pointer-events-none" />

                  {/* Right Side Paper Thickness Stack Fanning (Deckle Paper Layers) */}
                  <div className="absolute inset-y-2 right-0.5 w-1 border-l border-[#C9BDA8] pointer-events-none" />
                  <div className="absolute inset-y-3 right-1 w-1 border-l border-[#B8AA94] pointer-events-none" />
                  <div className="absolute inset-y-4 right-1.5 w-1 border-l border-[#A89880] pointer-events-none" />

                  {/* Hanging Crimson Silk Bookmark Ribbon from Center Spine */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-40 pointer-events-none drop-shadow-md">
                    <div className="h-7 w-3.5 bg-gradient-to-b from-[#DC2626] to-[#B91C1C] border-2 border-[#2D1F1D] rounded-t-xs relative">
                      <div className="absolute -bottom-1.5 left-0 right-0 h-1.5 bg-[#B91C1C] clip-ribbon-v" />
                    </div>
                  </div>

                  {/* ----------------------------------------------------------------- */}
                  {/* DESKTOP VIEW: AUTHENTIC 3D PHYSICAL BOOK SPREAD WITH TURNING LEAF */}
                  {/* ----------------------------------------------------------------- */}
                  <div
                    style={{ perspective: '1600px' }}
                    className="hidden lg:block relative rounded-[1.1rem] border-2 border-[#2D1F1D]/25 bg-[#FCF9F2] shadow-[inset_0_0_25px_rgba(180,150,110,0.08)] overflow-hidden h-[395px]"
                  >
                    {/* BASE LAYER (Underneath): Left Page Base + Right Page Base */}
                    <div className="absolute inset-0 grid grid-cols-2 bg-[#FCF9F2]">
                      {/* Left Static Base */}
                      <div className="h-full overflow-hidden">
                        {renderLeftPageContent(
                          flipState.isFlipping && flipState.direction === 'backward'
                            ? toSpread
                            : currentSpread,
                          flipState.isFlipping && flipState.direction === 'backward'
                            ? flipState.toIdx
                            : safeIdx,
                          !flipState.isFlipping,
                        )}
                      </div>

                      {/* Right Static Base */}
                      <div className="h-full overflow-hidden">
                        {renderRightPageContent(
                          flipState.isFlipping && flipState.direction === 'forward'
                            ? toSpread
                            : currentSpread,
                          flipState.isFlipping && flipState.direction === 'forward'
                            ? flipState.toIdx
                            : safeIdx,
                          !flipState.isFlipping,
                        )}
                      </div>
                    </div>

                    {/* 3D FLIPPING LEAF (FORWARD: Right Leaf flips to Left) */}
                    {flipState.isFlipping && flipState.direction === 'forward' && (
                      <div
                        onAnimationEnd={() => finishFlip(flipState.toIdx)}
                        style={{
                          position: 'absolute',
                          top: 0,
                          bottom: 0,
                          left: '50%',
                          width: '50%',
                          transformOrigin: 'left center',
                          transformStyle: 'preserve-3d',
                          animation: 'pageFlipForward 0.48s cubic-bezier(0.4, 0, 0.2, 1) forwards',
                          zIndex: 30,
                        }}
                      >
                        {/* FRONT FACE (Turning Old Right Page) */}
                        <div
                          style={{
                            position: 'absolute',
                            inset: 0,
                            backfaceVisibility: 'hidden',
                            WebkitBackfaceVisibility: 'hidden',
                          }}
                          className="border-l border-[#2D1F1D]/20 bg-[#FCF9F2] shadow-[-10px_0_25px_rgba(0,0,0,0.18)]"
                        >
                          {renderRightPageContent(fromSpread, flipState.fromIdx, false)}
                          {/* Shading overlay during lift */}
                          <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-black/5 to-transparent pointer-events-none" />
                        </div>

                        {/* BACK FACE (Incoming New Left Page) */}
                        <div
                          style={{
                            position: 'absolute',
                            inset: 0,
                            transform: 'rotateY(180deg)',
                            backfaceVisibility: 'hidden',
                            WebkitBackfaceVisibility: 'hidden',
                          }}
                          className="border-r border-[#2D1F1D]/20 bg-[#FCF9F2] shadow-[10px_0_25px_rgba(0,0,0,0.18)]"
                        >
                          {renderLeftPageContent(toSpread, flipState.toIdx, false)}
                          {/* Shading overlay landing */}
                          <div className="absolute inset-0 bg-gradient-to-l from-black/20 via-black/5 to-transparent pointer-events-none" />
                        </div>
                      </div>
                    )}

                    {/* 3D FLIPPING LEAF (BACKWARD: Left Leaf flips to Right) */}
                    {flipState.isFlipping && flipState.direction === 'backward' && (
                      <div
                        onAnimationEnd={() => finishFlip(flipState.toIdx)}
                        style={{
                          position: 'absolute',
                          top: 0,
                          bottom: 0,
                          left: '0',
                          width: '50%',
                          transformOrigin: 'right center',
                          transformStyle: 'preserve-3d',
                          animation: 'pageFlipBackward 0.48s cubic-bezier(0.4, 0, 0.2, 1) forwards',
                          zIndex: 30,
                        }}
                      >
                        {/* FRONT FACE (Turning Old Left Page) */}
                        <div
                          style={{
                            position: 'absolute',
                            inset: 0,
                            backfaceVisibility: 'hidden',
                            WebkitBackfaceVisibility: 'hidden',
                          }}
                          className="border-r border-[#2D1F1D]/20 bg-[#FCF9F2] shadow-[10px_0_25px_rgba(0,0,0,0.18)]"
                        >
                          {renderLeftPageContent(fromSpread, flipState.fromIdx, false)}
                          {/* Shading overlay during lift */}
                          <div className="absolute inset-0 bg-gradient-to-l from-black/25 via-black/5 to-transparent pointer-events-none" />
                        </div>

                        {/* BACK FACE (Incoming New Right Page) */}
                        <div
                          style={{
                            position: 'absolute',
                            inset: 0,
                            transform: 'rotateY(-180deg)',
                            backfaceVisibility: 'hidden',
                            WebkitBackfaceVisibility: 'hidden',
                          }}
                          className="border-l border-[#2D1F1D]/20 bg-[#FCF9F2] shadow-[-10px_0_25px_rgba(0,0,0,0.18)]"
                        >
                          {renderRightPageContent(toSpread, flipState.toIdx, false)}
                          {/* Shading overlay landing */}
                          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/5 to-transparent pointer-events-none" />
                        </div>
                      </div>
                    )}

                    {/* CENTRAL SPINE CREASE & SHADOW (Deep 3D paper trough) */}
                    <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-7 z-35 pointer-events-none bg-gradient-to-r from-black/16 via-transparent to-black/16">
                      <div className="h-full w-full border-r border-dashed border-[#2D1F1D]/25 flex flex-col justify-around items-center py-3">
                        <span className="size-1 rounded-full bg-[#2D1F1D]/35" />
                        <span className="size-1 rounded-full bg-[#2D1F1D]/35" />
                        <span className="size-1 rounded-full bg-[#2D1F1D]/35" />
                      </div>
                    </div>
                  </div>

                  {/* ----------------------------------------------------------------- */}
                  {/* MOBILE / TABLET VIEW: CLEAN RESPONSIVE JOURNAL SPREAD             */}
                  {/* ----------------------------------------------------------------- */}
                  <div className="block lg:hidden rounded-[1.1rem] border-2 border-[#2D1F1D]/20 bg-[#FCF9F2] p-4 space-y-4">
                    {currentSpread.type === 'milestone' ? (
                      <>
                        {/* Header */}
                        <div className="flex items-center justify-between border-b border-[#2D1F1D]/15 pb-2 gap-2">
                          <div className="flex items-center gap-1.5 min-w-0">
                            <span className="shrink-0 rounded-full border border-[#2D1F1D] bg-[#A7F3D0] px-2.5 py-0.5 text-[0.65rem] font-black text-[#2D1F1D]">
                              {currentSpread.milestone?.badgeEmoji || currentSpread.chapter.icon}{' '}
                              {currentSpread.milestone?.categoryLabel || currentSpread.chapter.title}
                            </span>
                            <span className="text-[0.62rem] font-bold text-[#6B5550] truncate">
                              {currentSpread.milestone?.organization}
                            </span>
                          </div>
                          <span className="shrink-0 text-[0.62rem] font-bold text-[#6B5550] bg-[#FAF5EC] border border-[#2D1F1D]/15 rounded-md px-1.5 py-0.5">
                            Ch. {currentSpread.chapter.chapterNum} • {currentSpread.pageInChapter}/
                            {currentSpread.totalInChapter}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="font-sans text-base font-black text-[#2D1F1D] leading-snug">
                          {currentSpread.milestone?.title}
                        </h3>

                        {/* Spotlight Photo */}
                        {(() => {
                          const photos =
                            currentSpread.milestone?.images && currentSpread.milestone.images.length > 0
                              ? currentSpread.milestone.images
                              : [currentSpread.milestone?.image || '/images/farah-portrait.png']
                          const spotlightImg = photos[0]

                          return (
                            <div
                              onClick={() =>
                                setLightboxData({
                                  milestone: currentSpread.milestone,
                                  photoIndex: 0,
                                })
                              }
                              className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border-2 border-[#2D1F1D] bg-white p-1 shadow-[3px_3px_0px_#2D1F1D] cursor-pointer"
                            >
                              <Image
                                src={spotlightImg}
                                alt={currentSpread.milestone?.title || 'Milestone photo'}
                                fill
                                className="object-cover rounded-lg"
                              />
                              <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity">
                                <span className="flex size-7 items-center justify-center rounded-full bg-white text-[#2D1F1D] shadow-sm">
                                  <Maximize2 className="size-3.5" />
                                </span>
                              </div>
                            </div>
                          )
                        })()}

                        {/* Story Narrative */}
                        <p className="font-sans text-xs font-medium leading-relaxed text-[#2D1F1D]">
                          {currentSpread.milestone?.description}
                        </p>

                        {/* Highlights */}
                        {currentSpread.milestone?.highlights && currentSpread.milestone.highlights.length > 0 && (
                          <div className="flex flex-wrap gap-1 pt-1">
                            {currentSpread.milestone.highlights.map((h, hIdx) => (
                              <span
                                key={hIdx}
                                className="inline-flex items-center gap-1 rounded-lg border border-[#2D1F1D] bg-white px-2 py-0.5 text-[0.62rem] font-black text-[#2D1F1D] shadow-[1px_1px_0px_#2D1F1D]"
                              >
                                <CheckCircle2 className="size-2.5 text-[#10B981]" />
                                <span>{h}</span>
                              </span>
                            ))}
                          </div>
                        )}
                      </>
                    ) : currentSpread.type === 'chapter-transition' ? (
                      /* Mobile Chapter Transition Card */
                      <div className="space-y-3 rounded-2xl border-2 border-[#2D1F1D] bg-white p-4 shadow-[3px_3px_0px_#2D1F1D]">
                        <div className="flex items-center justify-between border-b border-[#2D1F1D]/15 pb-2">
                          <span className="rounded-full bg-[#A7F3D0] border border-[#2D1F1D] px-2.5 py-0.5 text-[0.65rem] font-black text-[#065F46]">
                            ✨ Chapter {currentSpread.completedChapter.chapterNum} Complete
                          </span>
                          <span className="text-xs font-bold text-[#6B5550]">
                            Up Next: {currentSpread.nextChapter.icon}
                          </span>
                        </div>

                        <div className="text-center space-y-1.5 py-2">
                          <h4 className="font-sans text-base font-black text-[#2D1F1D]">
                            Chapter {currentSpread.nextChapter.chapterNum}: {currentSpread.nextChapter.title}
                          </h4>
                          <p className="text-xs font-medium text-[#6B5550]">
                            {currentSpread.nextChapter.teaser}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => turnToSpread(safeIdx + 1)}
                          className="w-full rounded-xl border-2 border-[#2D1F1D] bg-[#A7F3D0] py-2.5 text-xs font-black text-[#065F46] shadow-[2px_2px_0px_#2D1F1D] flex items-center justify-center gap-1.5"
                        >
                          <span>Open Chapter {currentSpread.nextChapter.chapterNum}: {currentSpread.nextChapter.title} ➔</span>
                        </button>
                      </div>
                    ) : (
                      /* Mobile Finale Card */
                      <div className="space-y-3 rounded-2xl border-2 border-[#2D1F1D] bg-[#FFF8E7] p-4 shadow-[3px_3px_0px_#2D1F1D] text-center">
                        <PartyPopper className="mx-auto size-8 text-[#FF7D6B]" />
                        <h4 className="font-sans text-base font-black text-[#2D1F1D]">
                          Full Journey Story Completed!
                        </h4>
                        <p className="text-xs text-[#6B5550]">
                          Ready to bring interactive props &amp; workshops to your school?
                        </p>
                        <div className="space-y-2 pt-1">
                          <a
                            href="#contact"
                            className="block w-full rounded-xl border-2 border-[#2D1F1D] bg-[#FFB5B5] py-2 text-xs font-black text-[#881337] shadow-[2px_2px_0px_#2D1F1D]"
                          >
                            Book a Workshop / Commission
                          </a>
                          <a
                            href="#materials"
                            className="block w-full rounded-xl border-2 border-[#2D1F1D] bg-white py-2 text-xs font-black text-[#2D1F1D] shadow-[2px_2px_0px_#2D1F1D]"
                          >
                            Explore Props Atelier
                          </a>
                        </div>
                      </div>
                    )}

                    {/* Mobile Navigation Buttons */}
                    <div className="flex items-center justify-between pt-2 border-t border-[#2D1F1D]/15">
                      <button
                        type="button"
                        disabled={safeIdx === 0}
                        onClick={() => turnToSpread(safeIdx - 1)}
                        className={cn(
                          'flex items-center gap-1 rounded-lg border-2 border-[#2D1F1D] px-3 py-1.5 text-xs font-black transition-all',
                          safeIdx > 0
                            ? 'bg-[#FFE68C] text-[#2D1F1D] shadow-[2px_2px_0px_#2D1F1D]'
                            : 'opacity-40 bg-gray-100 text-gray-400 border-gray-300',
                        )}
                      >
                        <ChevronLeft className="size-4" />
                        <span>Previous</span>
                      </button>

                      <div className="flex items-center gap-1">
                        {bookSpreads.map((_, dotIdx) => (
                          <button
                            key={dotIdx}
                            type="button"
                            onClick={() => turnToSpread(dotIdx)}
                            className={cn(
                              'size-2 rounded-full border border-[#2D1F1D] transition-all',
                              dotIdx === safeIdx ? 'bg-[#FF7D6B] scale-125' : 'bg-white',
                            )}
                          />
                        ))}
                      </div>

                      <button
                        type="button"
                        disabled={safeIdx === totalSpreads - 1}
                        onClick={() => turnToSpread(safeIdx + 1)}
                        className={cn(
                          'flex items-center gap-1 rounded-lg border-2 border-[#2D1F1D] px-3 py-1.5 text-xs font-black transition-all',
                          safeIdx < totalSpreads - 1
                            ? 'bg-[#A7F3D0] text-[#065F46] shadow-[2px_2px_0px_#2D1F1D]'
                            : 'opacity-40 bg-gray-100 text-gray-400 border-gray-300',
                        )}
                      >
                        <span>Next</span>
                        <ChevronRight className="size-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* FULL-SCREEN PHOTO LIGHTBOX MODAL WITH GALLERY NAVIGATION                  */}
      {/* ========================================================================= */}
      {lightboxData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 sm:p-6 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative flex max-h-[94vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border-3 border-[#2D1F1D] bg-[#FCF9F2] shadow-[10px_10px_0px_#2D1F1D]">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b-3 border-[#2D1F1D] bg-[#FAF5EC] px-5 py-3">
              <div className="flex items-center gap-2">
                <span className="text-base">{lightboxData.milestone.badgeEmoji || '📸'}</span>
                <div>
                  <h4 className="font-sans text-xs sm:text-sm font-black text-[#2D1F1D]">
                    {lightboxData.milestone.title}
                  </h4>
                  <p className="text-[0.62rem] font-bold text-[#6B5550]">
                    {lightboxData.milestone.organization} • {lightboxData.milestone.period}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setLightboxData(null)}
                className="flex size-7.5 items-center justify-center rounded-full border-2 border-[#2D1F1D] bg-[#FFB5B5] hover:bg-[#FF8A8A] cursor-pointer transition-colors"
              >
                <X className="size-4 text-[#2D1F1D]" />
              </button>
            </div>

            {/* Photo Container with Next/Previous Controls */}
            {(() => {
              const photos =
                lightboxData.milestone.images && lightboxData.milestone.images.length > 0
                  ? lightboxData.milestone.images
                  : [lightboxData.milestone.image || '/images/farah-portrait.png']

              const currentImg = photos[lightboxData.photoIndex] || photos[0]

              const handlePrev = () => {
                setLightboxData({
                  ...lightboxData,
                  photoIndex: (lightboxData.photoIndex - 1 + photos.length) % photos.length,
                })
              }

              const handleNext = () => {
                setLightboxData({
                  ...lightboxData,
                  photoIndex: (lightboxData.photoIndex + 1) % photos.length,
                })
              }

              return (
                <div className="relative aspect-[4/3] max-h-[60vh] w-full bg-[#2D1F1D]/10 overflow-hidden flex items-center justify-center">
                  <Image
                    src={currentImg}
                    alt={lightboxData.milestone.title}
                    fill
                    className="object-contain"
                  />

                  {/* Previous / Next Arrow Controls for Multiple Photos */}
                  {photos.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={handlePrev}
                        className="absolute left-3 top-1/2 -translate-y-1/2 flex size-9 items-center justify-center rounded-full border-2 border-[#2D1F1D] bg-white/90 shadow-[2px_2px_0px_#2D1F1D] hover:bg-[#FFE68C] cursor-pointer"
                      >
                        <ChevronLeft className="size-4.5 text-[#2D1F1D]" />
                      </button>
                      <button
                        type="button"
                        onClick={handleNext}
                        className="absolute right-3 top-1/2 -translate-y-1/2 flex size-9 items-center justify-center rounded-full border-2 border-[#2D1F1D] bg-white/90 shadow-[2px_2px_0px_#2D1F1D] hover:bg-[#FFE68C] cursor-pointer"
                      >
                        <ChevronRight className="size-4.5 text-[#2D1F1D]" />
                      </button>

                      {/* Photo Index Counter */}
                      <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 rounded-full border-2 border-[#2D1F1D] bg-white/95 px-2.5 py-0.5 text-[0.68rem] font-black font-sans text-[#2D1F1D] shadow-[2px_2px_0px_#2D1F1D]">
                        📸 {lightboxData.photoIndex + 1} / {photos.length}
                      </div>
                    </>
                  )}
                </div>
              )
            })()}

            {/* Modal Footer Description */}
            <div className="p-3.5 sm:p-4 space-y-2.5 bg-[#FCF9F2]">
              <p className="font-sans text-xs sm:text-[0.8rem] font-medium leading-relaxed text-[#2D1F1D]">
                {lightboxData.milestone.description}
              </p>

              {/* Thumbnails strip if multiple photos */}
              {(() => {
                const photos =
                  lightboxData.milestone.images && lightboxData.milestone.images.length > 0
                    ? lightboxData.milestone.images
                    : [lightboxData.milestone.image || '/images/farah-portrait.png']

                if (photos.length <= 1) return null

                return (
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-0.5">
                    {photos.map((pUrl, pIdx) => (
                      <button
                        key={pIdx}
                        type="button"
                        onClick={() =>
                          setLightboxData({
                            ...lightboxData,
                            photoIndex: pIdx,
                          })
                        }
                        className={cn(
                          'relative size-12 shrink-0 overflow-hidden rounded-lg border-2 transition-all cursor-pointer',
                          lightboxData.photoIndex === pIdx
                            ? 'border-[#2D1F1D] ring-2 ring-[#FFE68C] scale-105 shadow-[2px_2px_0px_#2D1F1D]'
                            : 'border-[#2D1F1D]/30 opacity-70 hover:opacity-100',
                        )}
                      >
                        <Image src={pUrl} alt="Thumbnail" fill className="object-cover" />
                      </button>
                    ))}
                  </div>
                )
              })()}

              <div className="flex justify-end pt-1.5 border-t border-[#2D1F1D]/10">
                <button
                  type="button"
                  onClick={() => setLightboxData(null)}
                  className="rounded-lg border-2 border-[#2D1F1D] bg-[#FFE68C] px-4 py-1 text-xs font-black font-sans text-[#2D1F1D] shadow-[2px_2px_0px_#2D1F1D] hover:bg-[#FFD952] cursor-pointer"
                >
                  Close Photo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

