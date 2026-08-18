'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Clock, Play, X } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { VIDEOS, type Video } from '@/lib/data'

function VideoCard({ video, onPlay }: { video: Video; onPlay: () => void }) {
  return (
    <button
      type="button"
      onClick={onPlay}
      className="group grid h-full w-full grid-rows-[auto_1fr] overflow-hidden rounded-xl border border-white/12 bg-[oklch(0.32_0.045_255)] text-left shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-lg sm:rounded-2xl"
    >
      <div className="relative isolate aspect-video w-full overflow-hidden bg-black/40">
        <Image
          src={video.thumbnail || '/placeholder.svg'}
          alt={video.title}
          fill
          sizes="(max-width: 640px) 85vw, (max-width: 1024px) 45vw, 320px"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/20" />
        <span
          className="absolute left-1/2 top-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_4px_20px_oklch(0.80_0.17_86/0.45)] transition-transform duration-300 group-hover:scale-105 sm:size-12"
          aria-hidden="true"
        >
          <Play className="ml-0.5 size-5 fill-current sm:size-5" />
        </span>
        <span className="absolute bottom-2 right-2 flex items-center gap-1 rounded-full bg-black/70 px-2 py-0.5 text-[0.65rem] font-semibold text-white">
          <Clock className="size-3" />
          {video.duration}
        </span>
      </div>

      <div className="flex flex-col justify-center gap-1 p-3 sm:p-3.5">
        <span className="text-[0.6rem] font-bold uppercase tracking-[0.14em] text-primary sm:text-[0.65rem]">
          {video.level}
        </span>
        <h3 className="font-serif text-sm font-semibold leading-snug text-white line-clamp-2 sm:text-[0.9375rem]">
          {video.title}
        </h3>
      </div>
    </button>
  )
}

export function Videos() {
  const [active, setActive] = useState<Video | null>(null)

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
    <section id="videos" className="section-shell relative overflow-hidden bg-secondary text-secondary-foreground">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 top-0 size-72 rounded-full bg-primary/8 blur-[80px]" />
        <div className="noise-overlay absolute inset-0 opacity-[0.025]" />
        <div className="grid-paper absolute inset-0 opacity-[0.03]" />
      </div>

      <div className="section-inner section-stack relative">
        <Reveal>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              number="03"
              eyebrow="Video lessons"
              title="Mini-lessons & classroom highlights"
              intro="Short clips to share with students — pronunciation, grammar, and story-time."
              dark
              className="max-w-xl"
            />
            <p className="shrink-0 text-xs font-medium text-secondary-foreground/55 sm:text-right">
              {VIDEOS.length} videos · Tap to play
            </p>
          </div>
        </Reveal>

        <Reveal delay={60}>
          {/* Mobile: horizontal scroll — Desktop: equal 3-col grid */}
          <div className="scrollbar-hide -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1 sm:mx-0 sm:grid sm:snap-none sm:grid-cols-3 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0">
            {VIDEOS.map((video) => (
              <div
                key={video.id}
                className="w-[78vw] shrink-0 snap-center sm:w-auto sm:shrink"
              >
                <VideoCard video={video} onPlay={() => setActive(video)} />
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          onClick={() => setActive(null)}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/90 p-3 backdrop-blur-md sm:p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-card shadow-2xl sm:rounded-3xl"
          >
            <button
              type="button"
              aria-label="Close video"
              onClick={() => setActive(null)}
              className="absolute right-3 top-3 z-10 flex size-9 items-center justify-center rounded-full bg-black/70 text-white sm:right-4 sm:top-4 sm:size-10"
            >
              <X className="size-5" />
            </button>
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video
              src={active.src}
              poster={active.thumbnail}
              controls
              autoPlay
              className="aspect-video w-full bg-black"
            />
            <div className="p-4 sm:p-5">
              <span className="rounded-full bg-primary/20 px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide text-foreground">
                {active.level} · {active.duration}
              </span>
              <h3 className="mt-2 font-serif text-lg font-semibold text-foreground">{active.title}</h3>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
