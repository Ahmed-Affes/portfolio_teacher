'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import {
  CheckCircle2,
  ChevronRight,
  Clock,
  Play,
  Sparkles,
  Video as VideoIcon,
  X,
  Tv,
  Film,
} from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { SectionScene } from '@/components/section-scene'
import { type Video, type VideoCategory } from '@/lib/data'
import { usePortfolio } from '@/lib/portfolio-context'
import { cn } from '@/lib/utils'
import {
  CuteSticker,
  PushPin,
} from '@/components/cloud-decorations'

const VIDEO_FILTERS: { id: VideoCategory; label: string; color: string }[] = [
  { id: 'all', label: 'All Lessons 🎬', color: 'bg-[#FFC837]' },
  { id: 'pronunciation', label: 'Pronunciation & Phonics 🗣️', color: 'bg-[#A7F3D0]' },
  { id: 'grammar', label: 'Grammar Made Simple 🧩', color: 'bg-[#FFE68C]' },
  { id: 'storytelling', label: 'Storytelling & Immersion 📖', color: 'bg-[#FFB5B5]' },
  { id: 'workshop', label: 'Teacher Workshops 🎒', color: 'bg-[#DDD6FE]' },
]

export function Videos() {
  const { state } = usePortfolio()
  const { videos } = state
  const [activeCategory, setActiveCategory] = useState<VideoCategory>('all')
  const [activeVideo, setActiveVideo] = useState<Video | null>(null)

  const activeVideos = useMemo(() => videos.filter((v) => v.isActive !== false), [videos])

  const filteredVideos = useMemo(() => {
    if (activeCategory === 'all') return activeVideos
    return activeVideos.filter((v) => v.category === activeCategory)
  }, [activeVideos, activeCategory])

  useEffect(() => {
    if (!activeVideo) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setActiveVideo(null)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [activeVideo])

  const pinColors: ('red' | 'purple' | 'yellow' | 'mint' | 'coral')[] = [
    'purple',
    'yellow',
    'mint',
    'red',
    'coral',
  ]

  return (
    <section
      id="videos"
      className="section-shell relative overflow-hidden bg-gradient-to-b from-[#FFFDF9] to-[#FAF5EC] py-10 sm:py-14 lg:py-16"
    >
      <SectionScene theme="videos" pattern="dots" />

      <div className="section-inner section-stack relative">
        {/* Top Header & Filter Tabs */}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <SectionHeading
              number="03"
              eyebrow="Video Masterclasses 🎬"
              title="Mini-lessons & classroom highlights"
              intro="Short, focused instructional clips you can share with students — from phonics drills to story immersion."
              typewriterIntro
            />
          </Reveal>

          <Reveal delay={60}>
            <CuteSticker color="lavender" rotate="rotate-1">
              <span className="size-2 rounded-full bg-[#8B5CF6] animate-ping" />
              <span>{videos.length} Video Clips Available 🍿</span>
            </CuteSticker>
          </Reveal>
        </div>

        {/* Video Category Filter Tabs */}
        <Reveal delay={80}>
          <div className="scrollbar-hide flex gap-2.5 overflow-x-auto pb-2 sm:flex-wrap sm:overflow-visible">
            {VIDEO_FILTERS.map((f) => {
              const isSelected = activeCategory === f.id
              const count =
                f.id === 'all'
                  ? videos.length
                  : videos.filter((v) => v.category === f.id).length
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setActiveCategory(f.id)}
                  className={cn(
                    'group inline-flex shrink-0 items-center gap-2 rounded-2xl border-[1.5px] border-[#2D1F1D]/50 px-4 py-2 text-xs font-black transition-all duration-150 cursor-pointer',
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
        </Reveal>

        {/* Video Cards Grid — featured first item spans full width on large screens */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredVideos.map((video, i) => {
            const isFeatured = i === 0 && filteredVideos.length > 1
            const pinColors: ('red' | 'purple' | 'yellow' | 'mint' | 'coral')[] = [
              'coral',
              'yellow',
              'purple',
              'mint',
              'red',
            ]
            const pinColor = pinColors[i % pinColors.length]

            return (
              <Reveal key={video.id} delay={i * 60} className={cn(isFeatured && 'sm:col-span-2 lg:col-span-3')}>
                <div className="group relative h-full w-full">
                  {/* 3D PushPin on unclipped outer container */}
                  <PushPin color={pinColor} className="left-1/2 -top-1" />

                  <button
                    type="button"
                    onClick={() => setActiveVideo(video)}
                    className={cn(
                      'relative flex h-full w-full flex-col overflow-hidden rounded-[2.4rem_1.4rem_2.6rem_1.6rem] border-[1.5px] border-[#3E251E]/40 bg-white text-left shadow-[0_8px_20px_rgba(45,31,29,0.06),3px_3px_0px_rgba(45,31,29,0.65)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(45,31,29,0.1),4.5px_4.5px_0px_rgba(45,31,29,0.75)] cursor-pointer',
                      isFeatured ? 'rounded-[2.8rem_1.6rem_2.6rem_1.8rem] lg:grid lg:grid-cols-[1.2fr_0.8fr] lg:items-stretch' : (i % 2 === 0 ? 'rotate-[-0.4deg]' : 'rotate-[0.4deg]'),
                    )}
                  >
                    {/* Video Thumbnail Screen */}
                    <div className={cn(
                      'relative aspect-video w-full overflow-hidden bg-[#2D1F1D] border-b border-[#2D1F1D]/20',
                      isFeatured && 'lg:border-b-0 lg:border-r lg:aspect-auto lg:min-h-[280px]',
                    )}>
                      <Image
                        src={video.thumbnail || '/placeholder.svg'}
                        alt={video.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-[#2D1F1D]/30" />

                      {/* Pulsing Play Button */}
                      <span
                        className="absolute left-1/2 top-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[1.5px] border-[#2D1F1D] bg-[#FFC837] text-[#2D1F1D] shadow-[2px_2px_0px_rgba(45,31,29,0.6)] transition-transform duration-200 group-hover:scale-110"
                        aria-hidden="true"
                      >
                        <Play className="ml-1 size-6 fill-[#2D1F1D]" />
                      </span>

                      {/* Duration Badge */}
                      <span className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full border border-[#2D1F1D]/30 bg-white/95 px-2.5 py-0.5 text-[0.68rem] font-bold text-[#2D1F1D] shadow-xs">
                        <Clock className="size-3 text-[#FF7D6B]" />
                        {video.duration}
                      </span>

                      {/* Level pill */}
                      <span className="absolute left-3 top-3 rounded-full border border-[#2D1F1D]/30 bg-[#FFE68C] px-2.5 py-0.5 text-[0.65rem] font-black uppercase text-[#2D1F1D] shadow-xs">
                        {video.level}
                      </span>
                    </div>

                    {/* Video Info Content */}
                    <div className={cn('flex flex-1 flex-col p-5', isFeatured && 'lg:justify-center lg:p-8')}>
                      {isFeatured && (
                        <span className="mb-2 inline-flex w-fit items-center rounded-full border border-[#2D1F1D]/30 bg-[#FFE68C] px-3 py-0.5 text-[0.65rem] font-black uppercase text-[#2D1F1D] shadow-[1px_1px_0px_rgba(45,31,29,0.3)] animate-wiggle-in">
                          Featured Lesson 🌟
                        </span>
                      )}
                      <h3 className={cn(
                        'font-sans font-black leading-snug text-[#2D1F1D] transition-colors group-hover:text-[#FF7D6B]',
                        isFeatured ? 'text-xl sm:text-2xl' : 'text-base',
                      )}>
                        {video.title}
                      </h3>

                      <p className="mt-2 text-xs font-medium leading-relaxed text-[#6B5550] line-clamp-3">
                        {video.description}
                      </p>

                      <div className="mt-4 flex items-center justify-between border-t border-[#2D1F1D]/10 pt-3">
                        <span className="text-[0.7rem] font-bold text-[#6B5550]">
                          {video.ageGroup ? `Target: ${video.ageGroup}` : `Level: ${video.level || 'All Levels'}`}
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs font-black text-[#FF7D6B] group-hover:underline">
                          Watch Video <ChevronRight className="size-3.5" />
                        </span>
                      </div>
                    </div>
                  </button>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>

      {/* Video Modal Player */}
      {activeVideo && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeVideo.title}
          onClick={() => setActiveVideo(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#2D1F1D]/80 p-4 backdrop-blur-xs"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-[2.5rem] border-[1.5px] border-[#3E251E]/50 bg-white shadow-[0_24px_50px_rgba(45,31,29,0.25),5px_5px_0px_rgba(45,31,29,0.5)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#2D1F1D]/20 bg-[#FFE68C] px-6 py-4">
              <div className="flex items-center gap-2">
                <span className="rounded-full border border-[#2D1F1D]/30 bg-white px-3 py-0.5 text-xs font-black text-[#2D1F1D]">
                  {activeVideo.category}
                </span>
                <h3 className="font-sans text-base font-black text-[#2D1F1D] sm:text-lg">
                  {activeVideo.title}
                </h3>
              </div>
              <button
                type="button"
                aria-label="Close video"
                onClick={() => setActiveVideo(null)}
                className="flex size-8 items-center justify-center rounded-full border border-[#2D1F1D]/30 bg-white text-[#2D1F1D] transition-colors hover:bg-[#FF7D6B] hover:text-white"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Video Container */}
            <div className="overflow-y-auto p-6 sm:p-8">
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl border-[1.5px] border-[#2D1F1D]/30 bg-black">
                {activeVideo.src ? (
                  <video
                    src={activeVideo.src}
                    controls
                    autoPlay
                    playsInline
                    className="size-full object-cover"
                  />
                ) : (
                  <div className="flex size-full flex-col items-center justify-center gap-3 p-6 text-center text-white bg-[#2D1F1D]">
                    <Film className="size-12 text-[#FFC837]" />
                    <p className="font-sans text-base font-bold">
                      Classroom demonstration video
                    </p>
                  </div>
                )}
              </div>

              {activeVideo.takeaways && activeVideo.takeaways.length > 0 && (
                <div className="mt-5 space-y-2">
                  <h4 className="text-xs font-black uppercase tracking-wider text-[#2D1F1D]">
                    Learning Objectives Covered 🎓
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeVideo.takeaways.map((takeaway: string) => (
                      <span
                        key={takeaway}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-[#2D1F1D]/30 bg-[#A7F3D0] px-3 py-1 text-xs font-bold text-[#2D1F1D] shadow-[1.5px_1.5px_0px_rgba(45,31,29,0.3)]"
                      >
                        <CheckCircle2 className="size-3.5 stroke-[2.5]" />
                        {takeaway}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
