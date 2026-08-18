'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Clock, Play, X } from 'lucide-react'
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
    <section id="videos" className="scroll-mt-24 bg-secondary py-20 text-secondary-foreground sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/25 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            Video lessons
          </span>
          <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight tracking-tight text-balance sm:text-4xl text-secondary-foreground">
            Mini-lessons &amp; classroom highlights
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-secondary-foreground/80 text-pretty">
            Short, focused clips you can share with students — from pronunciation tips to
            full story-time moments.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {VIDEOS.map((video) => (
            <button
              key={video.id}
              type="button"
              onClick={() => setActive(video)}
              className="group flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:bg-white/10 shadow-lg"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-black/20">
                <Image
                  src={video.thumbnail || '/placeholder.svg'}
                  alt={video.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                <span className="absolute left-1/2 top-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl transition-transform duration-300 group-hover:scale-110">
                  <Play className="ml-1 size-6 fill-current" />
                </span>
                <span className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-black/70 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
                  <Clock className="size-3" />
                  {video.duration}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                  {video.level}
                </span>
                <h3 className="mt-1.5 font-serif text-lg font-semibold leading-tight text-white">
                  {video.title}
                </h3>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Video modal */}
      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          onClick={() => setActive(null)}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm duration-200 animate-in fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl overflow-hidden rounded-3xl bg-card text-card-foreground shadow-2xl duration-200 animate-in zoom-in-95"
          >
            <button
              type="button"
              aria-label="Close video"
              onClick={() => setActive(null)}
              className="absolute right-3 top-3 z-10 flex size-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur transition-colors hover:bg-black/90"
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
              <span className="rounded-full bg-primary/25 px-3 py-1 text-xs font-semibold text-foreground">
                {active.level} · {active.duration}
              </span>
              <h3 className="mt-2 font-serif text-xl font-semibold text-foreground">{active.title}</h3>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
