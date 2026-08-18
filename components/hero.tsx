'use client'

import Image from 'next/image'
import { ArrowRight, FileText, GraduationCap, Sparkles, Star } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { usePortfolio } from '@/lib/portfolio-context'

export function Hero() {
  const { state } = usePortfolio()
  const { hero, stats, works } = state

  const propsCount = works.filter((w) => w.category === 'props').length
  const marqueeList = hero.marqueeItems && hero.marqueeItems.length > 0 ? hero.marqueeItems : [
    'Phonics & Literacy Mastery',
    'Handmade Classroom Props',
    'Printable PDF Worksheets',
    'Teacher Training Workshops',
    'ESL Curriculum Design',
    'Interactive Storytelling Kits',
  ]

  return (
    <section
      id="home"
      className="section-shell relative flex min-h-[min(100svh,54rem)] flex-col justify-between overflow-hidden pt-[calc(var(--header-h)+1.25rem)] lg:pt-[calc(var(--header-h)+2rem)]"
    >
      {/* Dynamic Background Atmosphere */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="section-glow absolute inset-0" />
        <div className="noise-overlay absolute inset-0 opacity-[0.025]" />
        <div className="grid-paper absolute inset-0 opacity-50" />
        <div
          className="absolute -left-32 top-16 size-80 rounded-full bg-primary/25 blur-[100px] sm:size-96 transform-gpu will-change-transform"
          style={{ animation: 'pulse-glow 8s ease-in-out infinite' }}
        />
        <div
          className="absolute -right-24 top-36 size-72 rounded-full bg-accent/30 blur-[90px] sm:size-80 transform-gpu will-change-transform"
          style={{ animation: 'pulse-glow 10s ease-in-out infinite 2s' }}
        />
      </div>

      {/* Main Content Grid */}
      <div className="section-inner my-auto w-full">
        <div className="grid items-center gap-8 lg:grid-cols-[1.12fr_0.88fr] lg:gap-12 xl:gap-16">
          {/* Left Column: Headline, Bio, Actions, Stats */}
          <div className="flex flex-col items-start">
            <Reveal>
              <span className="inline-flex items-center gap-2.5 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-foreground shadow-xs">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-primary" />
                </span>
                {hero.eyebrow}
              </span>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="mt-4 font-serif text-[2.15rem] font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.25rem] xl:text-[3.5rem] text-balance">
                {hero.titlePrefix}{' '}
                <span className="highlight-underline whitespace-nowrap">{hero.highlightWord}</span>{' '}
                <span className="text-gradient">{hero.titleSuffix}</span>
              </h1>
            </Reveal>

            <Reveal delay={140}>
              <p className="mt-3.5 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base lg:text-lg text-pretty">
                {hero.bio}
              </p>
            </Reveal>

            <Reveal delay={200}>
              <div className="mt-5 flex flex-wrap items-center gap-3 sm:mt-6">
                <a
                  href="#work"
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-primary px-7 py-3 text-xs font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/35 sm:text-sm"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  {hero.ctaWorkText || 'Explore my materials'}
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/80 px-6 py-3 text-xs font-semibold text-foreground shadow-xs backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:bg-card hover:-translate-y-0.5 hover:shadow-md sm:text-sm"
                >
                  {hero.ctaContactText || 'Get in touch'}
                </a>
              </div>
            </Reveal>

            {/* Above-the-fold Quick Stats */}
            <Reveal delay={260}>
              <dl className="mt-6 grid w-full max-w-xl grid-cols-2 gap-x-6 gap-y-4 border-t border-border/60 pt-5 sm:grid-cols-4 sm:pt-6">
                {stats.map((s) => (
                  <div key={s.id || s.label} className="group flex flex-col">
                    <dt className="font-serif text-2xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-3xl">
                      {s.value}
                    </dt>
                    <dd className="mt-0.5 text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground sm:text-[0.7rem]">
                      {s.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* Right Column: Hero Visual with Floating Animated Badges */}
          <Reveal delay={100} direction="left" className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative">
              {/* Outer decorative ambient glow */}
              <div className="absolute -inset-3 rounded-[2.25rem] bg-gradient-to-br from-primary/30 via-transparent to-secondary/20 blur-md" />

              {/* Framed Hero Image */}
              <div className="relative aspect-[4/4.4] w-full overflow-hidden isolate rounded-[2rem] border-2 border-white/80 bg-card shadow-2xl shadow-foreground/15 ring-1 ring-border/50">
                <Image
                  src={hero.image || '/images/hero-classroom.png'}
                  alt="Farah teaching in a bright, engaging English classroom in Sfax"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 480px"
                  className="object-cover object-center transform-gpu transition-transform duration-500 ease-out hover:scale-105 will-change-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/35 via-transparent to-transparent" />
              </div>

              {/* Top-Left Floating Badge: New Worksheet */}
              <div
                className="animate-float absolute -left-4 top-8 hidden w-52 rounded-2xl border border-border/70 bg-card/95 p-3.5 shadow-xl backdrop-blur-md transform-gpu transition-transform duration-300 hover:scale-105 sm:block will-change-transform"
                style={{ '--float-rotate': '-3deg' } as React.CSSProperties}
              >
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-primary/20 text-foreground ring-1 ring-primary/30">
                    <FileText className="size-5" />
                  </span>
                  <div>
                    <p className="text-xs font-bold text-foreground">Interactive Worksheet</p>
                    <p className="text-[0.7rem] font-medium text-muted-foreground">Phonics &amp; Blends</p>
                  </div>
                </div>
              </div>

              {/* Bottom-Right Floating Badge: Educator Testimonial */}
              <div
                className="animate-float absolute -bottom-5 right-0 w-60 rounded-2xl border border-border/70 bg-card/95 p-4 shadow-xl backdrop-blur-md transform-gpu transition-transform duration-300 hover:scale-105 sm:right-2 will-change-transform"
                style={{ '--float-rotate': '2deg', animationDelay: '1.5s' } as React.CSSProperties}
              >
                <div className="flex items-center gap-0.5 text-primary">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-3.5 fill-current" />
                  ))}
                </div>
                <p className="mt-1.5 text-xs font-medium leading-snug text-foreground text-pretty">
                  &ldquo;My students finally love practicing irregular verbs!&rdquo;
                </p>
                <p className="mt-1.5 flex items-center gap-1.5 text-[0.7rem] font-semibold text-muted-foreground">
                  <GraduationCap className="size-3.5 text-primary" /> Primary School Teacher
                </p>
              </div>

              {/* Side Floating Badge: Handcrafted Props */}
              <div className="absolute -right-3 top-1/2 hidden -translate-y-1/2 rounded-2xl border border-primary/30 bg-primary/15 px-3.5 py-2 shadow-lg backdrop-blur-md lg:block">
                <div className="flex items-center gap-2">
                  <Sparkles className="size-4 text-primary" />
                  <span className="text-xs font-bold text-foreground">{propsCount > 0 ? `${propsCount}+ Handcrafted Props` : '120+ Handcrafted Props'}</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Infinite Marquee Strip */}
      <div className="relative mt-8 overflow-hidden border-y border-border/60 bg-muted/40 py-3 sm:mt-10">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent sm:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent sm:w-28" />
        <div className="flex animate-marquee whitespace-nowrap transform-gpu will-change-transform">
          {[...marqueeList, ...marqueeList].map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="mx-5 inline-flex items-center gap-2.5 text-xs font-semibold text-muted-foreground sm:mx-7 sm:text-sm"
            >
              <span className="size-1.5 rounded-full bg-primary" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
