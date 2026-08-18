'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import {
  CheckCircle2,
  Clock,
  GraduationCap,
  Play,
  Sparkles,
  Video as VideoIcon,
  X,
} from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { VIDEOS, type Video, type VideoCategory } from '@/lib/data'
import { cn } from '@/lib/utils'

const VIDEO_FILTERS: { id: VideoCategory; label: string }[] = [
  { id: 'all', label: 'All Lessons' },
  { id: 'pronunciation', label: 'Pronunciation & Phonics' },
  { id: 'grammar', label: 'Grammar Made Simple' },
  { id: 'storytelling', label: 'Storytelling & Immersion' },
  { id: 'workshop', label: 'Teacher Workshops' },
]

export function Videos() {
  const [activeCategory, setActiveCategory] = useState<VideoCategory>('all')
  const [activeVideo, setActiveVideo] = useState<Video | null>(null)

  const filteredVideos = useMemo(() => {
    if (activeCategory === 'all') return VIDEOS
    return VIDEOS.filter((v) => v.category === activeCategory)
  }, [activeCategory])

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

  return (
    <section
      id="videos"
      className="section-shell relative overflow-hidden bg-secondary text-secondary-foreground"
    >
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-0 size-96 rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute -right-32 bottom-0 size-96 rounded-full bg-white/5 blur-[100px]" />
        <div className="noise-overlay absolute inset-0 opacity-[0.03]" />
        <div className="grid-paper absolute inset-0 opacity-[0.035]" />
      </div>

      <div className="section-inner section-stack relative">
        {/* Top Header & Filter Tabs */}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <SectionHeading
              number="03"
              eyebrow="Video Masterclasses"
              title="Mini-lessons & classroom highlights"
              intro="Short, focused instructional clips you can share with students — from phonics drills to story immersion."
              dark
            />
          </Reveal>

          <Reveal delay={60}>
            <div className="flex shrink-0 items-center gap-2 text-xs text-secondary-foreground/70">
              <span className="flex size-2 rounded-full bg-primary animate-pulse" />
              <span>{VIDEOS.length} Educational Clips Available</span>
            </div>
          </Reveal>
        </div>

        {/* Video Category Filter Tabs */}
        <Reveal delay={80}>
          <div className="scrollbar-hide flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible">
            {VIDEO_FILTERS.map((f) => {
              const isSelected = activeCategory === f.id
              const count =
                f.id === 'all'
                  ? VIDEOS.length
                  : VIDEOS.filter((v) => v.category === f.id).length
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setActiveCategory(f.id)}
                  className={cn(
                    'group inline-flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-all duration-300',
                    isSelected
                      ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                      : 'border border-white/10 bg-white/5 text-secondary-foreground/75 hover:bg-white/10 hover:text-white',
                  )}
                >
                  <span>{f.label}</span>
                  <span
                    className={cn(
                      'rounded-full px-1.5 py-0.2 text-[0.65rem] font-bold transition-colors',
                      isSelected ? 'bg-secondary text-white' : 'bg-white/10 text-secondary-foreground/60',
                    )}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </div>
        </Reveal>

        {/* Video Cards Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5">
          {filteredVideos.map((video, i) => (
            <Reveal key={video.id} delay={i * 60}>
              <button
                type="button"
                onClick={() => setActiveVideo(video)}
                className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] text-left shadow-lg backdrop-blur-xs transform-gpu transition-[transform,box-shadow,border-color,background-color] duration-300 ease-out hover:-translate-y-1 hover:border-primary/40 hover:bg-white/[0.08] hover:shadow-xl hover:shadow-black/30 will-change-transform"
              >
                {/* Video Thumbnail Screen */}
                <div className="relative aspect-video w-full overflow-hidden isolate bg-black/40">
                  <Image
                    src={video.thumbnail || '/placeholder.svg'}
                    alt={video.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transform-gpu transition-transform duration-500 ease-out group-hover:scale-105 will-change-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30" />

                  {/* Pulsing Play Button */}
                  <span
                    className="absolute left-1/2 top-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl shadow-primary/30 ring-4 ring-white/15 transform-gpu transition-transform duration-300 ease-out group-hover:scale-110 group-hover:ring-primary/40 sm:size-14"
                    aria-hidden="true"
                  >
                    <Play className="ml-1 size-5 fill-current sm:size-6" />
                  </span>

                  {/* Duration Badge */}
                  <span className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-black/70 px-2.5 py-1 text-[0.65rem] font-semibold text-white backdrop-blur-sm">
                    <Clock className="size-3" />
                    {video.duration}
                  </span>

                  {/* Level Pill */}
                  <span className="absolute left-3 top-3 rounded-full bg-white/15 px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-white backdrop-blur-md">
                    {video.level}
                  </span>
                </div>

                {/* Video Info Panel */}
                <div className="flex flex-1 flex-col p-4 sm:p-5">
                  <span className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-primary">
                    {video.category.replace('-', ' ')}
                  </span>
                  <h3 className="mt-1.5 font-serif text-base font-semibold leading-snug text-white transition-colors group-hover:text-primary sm:text-lg">
                    {video.title}
                  </h3>

                  {video.takeaways && video.takeaways.length > 0 && (
                    <p className="mt-2 text-xs text-secondary-foreground/60 line-clamp-2">
                      Key focus: {video.takeaways[0]}
                    </p>
                  )}
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Cinema Modal Video Player */}
      {activeVideo && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeVideo.title}
          onClick={() => setActiveVideo(null)}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/90 p-3 backdrop-blur-md duration-300 animate-in fade-in sm:p-5"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-white/15 bg-card text-card-foreground shadow-2xl duration-300 animate-in zoom-in-95"
          >
            {/* Close button */}
            <button
              type="button"
              aria-label="Close video"
              onClick={() => setActiveVideo(null)}
              className="absolute right-4 top-4 z-20 flex size-10 items-center justify-center rounded-full bg-black/70 text-white backdrop-blur transition-colors hover:bg-black"
            >
              <X className="size-5" />
            </button>

            {/* Video player canvas */}
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video
              src={activeVideo.src}
              poster={activeVideo.thumbnail}
              controls
              autoPlay
              className="aspect-video w-full bg-black object-contain"
            />

            {/* Video metadata */}
            <div className="overflow-y-auto p-5 sm:p-7">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-primary/20 px-3 py-1 text-xs font-bold uppercase tracking-wide text-foreground ring-1 ring-primary/30">
                  {activeVideo.level} · {activeVideo.duration}
                </span>
                <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground uppercase">
                  {activeVideo.category}
                </span>
              </div>

              <h3 className="mt-3 font-serif text-xl font-semibold text-foreground sm:text-2xl">
                {activeVideo.title}
              </h3>

              {activeVideo.takeaways && (
                <div className="mt-4 border-t border-border/60 pt-4">
                  <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-foreground">
                    <Sparkles className="size-3.5 text-primary" />
                    Key Teaching Takeaways
                  </h4>
                  <ul className="mt-2.5 space-y-2">
                    {activeVideo.takeaways.map((t) => (
                      <li key={t} className="flex items-start gap-2.5 text-xs text-muted-foreground sm:text-sm">
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
