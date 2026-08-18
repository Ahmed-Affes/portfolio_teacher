'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Clock, Play, X } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { VIDEOS, type Video } from '@/lib/data'

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
    <section
      id="videos"
      className="relative scroll-mt-20 overflow-hidden bg-secondary py-16 text-secondary-foreground sm:py-20 lg:py-24"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-0 size-96 rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute -right-20 bottom-0 size-80 rounded-full bg-white/5 blur-[100px]" />
        <div className="noise-overlay absolute inset-0 opacity-[0.03]" />
        <div className="grid-paper absolute inset-0 opacity-[0.04]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            number="03"
            eyebrow="Video lessons"
            title="Mini-lessons & classroom highlights"
            intro="Short, focused clips you can share with students — from pronunciation tips to story-time moments."
            dark
          />
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {VIDEOS.map((video, i) => (
            <Reveal key={video.id} delay={i * 80}>
              <button
                type="button"
                onClick={() => setActive(video)}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] text-left shadow-lg transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/40 hover:bg-white/[0.08] hover:shadow-2xl hover:shadow-black/20"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-black/30">
                  <Image
                    src={video.thumbnail || '/placeholder.svg'}
                    alt={video.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />
                  <span className="absolute left-1/2 top-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl shadow-primary/30 ring-4 ring-white/10 transition-all duration-300 group-hover:scale-110 group-hover:ring-primary/30">
                    <Play className="ml-1 size-6 fill-current" />
                  </span>
                  <span className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 text-[0.7rem] font-semibold text-white backdrop-blur-sm">
                    <Clock className="size-3" />
                    {video.duration}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <span className="text-[0.65rem] font-bold uppercase tracking-[0.15em] text-primary">
                    {video.level}
                  </span>
                  <h3 className="mt-2 font-serif text-lg font-semibold leading-snug text-white">
                    {video.title}
                  </h3>
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
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md duration-300 animate-in fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-card text-card-foreground shadow-2xl duration-300 animate-in zoom-in-95"
          >
            <button
              type="button"
              aria-label="Close video"
              onClick={() => setActive(null)}
              className="absolute right-4 top-4 z-10 flex size-10 items-center justify-center rounded-full bg-black/70 text-white backdrop-blur transition-colors hover:bg-black"
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
            <div className="p-6">
              <span className="rounded-full bg-primary/20 px-3 py-1 text-xs font-bold uppercase tracking-wide text-foreground ring-1 ring-primary/30">
                {active.level} · {active.duration}
              </span>
              <h3 className="mt-3 font-serif text-xl font-semibold text-foreground">
                {active.title}
              </h3>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
