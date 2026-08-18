import Image from 'next/image'
import { ArrowRight, FileText, GraduationCap, Sparkles, Star } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { STATS } from '@/lib/data'

const MARQUEE_ITEMS = [
  'Phonics & literacy',
  'DIY classroom props',
  'Printable worksheets',
  'Workshop design',
  'ESL resources',
  'Storytelling sessions',
  'Grammar games',
  'Parent coaching',
]

export function Hero() {
  return (
    <section
      id="home"
      className="relative scroll-mt-20 overflow-hidden pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-20"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="section-glow absolute inset-0" />
        <div className="grid-paper absolute inset-0 opacity-70" />
        <div className="noise-overlay absolute inset-0 opacity-[0.025]" />
        <div
          className="absolute -left-32 top-20 size-96 rounded-full bg-primary/25 blur-[100px]"
          style={{ animation: 'pulse-glow 8s ease-in-out infinite' }}
        />
        <div
          className="absolute -right-24 top-40 size-80 rounded-full bg-accent/40 blur-[80px]"
          style={{ animation: 'pulse-glow 10s ease-in-out infinite 2s' }}
        />
        <div className="absolute bottom-0 left-1/2 h-px w-full max-w-4xl -translate-x-1/2 bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div className="flex flex-col items-start">
          <Reveal>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-foreground shadow-sm">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-primary" />
              </span>
              English educator &amp; DIY material designer
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-5 font-serif text-[2rem] font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.25rem] text-balance">
              Empowering learners through{' '}
              <span className="highlight-underline whitespace-nowrap">interactive</span>{' '}
              <span className="text-gradient">English education</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg text-pretty">
              Aslema! I&apos;m Farah — an English educator and content designer making
              language learning engaging, tactile, and accessible for students, parents,
              and fellow teachers.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="#work"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/35"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                Explore my work
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/80 px-7 py-3 text-sm font-semibold text-foreground shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:bg-card hover:-translate-y-0.5 hover:shadow-md"
              >
                Get in touch
              </a>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <dl className="mt-8 grid w-full max-w-xl grid-cols-2 gap-x-6 gap-y-5 border-t border-border/60 pt-6 sm:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.label} className="group flex flex-col">
                  <dt className="font-serif text-2xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-3xl">
                    {s.value}
                  </dt>
                  <dd className="mt-1 text-[0.7rem] font-medium uppercase tracking-wide leading-snug text-muted-foreground">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal delay={120} direction="left" className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative">
            <div className="absolute -inset-3 rounded-[2.25rem] bg-gradient-to-br from-primary/30 via-transparent to-secondary/20 blur-sm" />
            <div className="relative aspect-[4/4.4] w-full overflow-hidden rounded-[2rem] border border-white/60 bg-card shadow-2xl shadow-foreground/15 ring-1 ring-border/50">
              <Image
                src="/images/hero-classroom.png"
                alt="Farah teaching in a bright, engaging English classroom"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 480px"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/30 via-transparent to-transparent" />
            </div>

            <div
              className="animate-float absolute -left-4 top-8 hidden w-52 -rotate-3 rounded-2xl border border-border/60 bg-card/95 p-3.5 shadow-xl backdrop-blur-md sm:block"
              style={{ '--float-rotate': '-3deg' } as React.CSSProperties}
            >
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-xl bg-primary/20 text-foreground ring-1 ring-primary/30">
                  <FileText className="size-4.5" />
                </span>
                <div>
                  <p className="text-xs font-semibold text-foreground">New worksheet</p>
                  <p className="text-[0.7rem] text-muted-foreground">Phonics · Level 1</p>
                </div>
              </div>
            </div>

            <div
              className="animate-float absolute -bottom-5 right-0 w-56 rotate-2 rounded-2xl border border-border/60 bg-card/95 p-4 shadow-xl backdrop-blur-md sm:right-2"
              style={{ '--float-rotate': '2deg', animationDelay: '1.5s' } as React.CSSProperties}
            >
              <div className="flex items-center gap-0.5 text-primary">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-3.5 fill-current" />
                ))}
              </div>
              <p className="mt-2 text-xs font-medium leading-snug text-foreground text-pretty">
                &ldquo;My students finally love grammar practice!&rdquo;
              </p>
              <p className="mt-1.5 flex items-center gap-1.5 text-[0.7rem] text-muted-foreground">
                <GraduationCap className="size-3" /> Fellow educator
              </p>
            </div>

            <div className="absolute -right-2 top-1/2 hidden -translate-y-1/2 rounded-2xl border border-primary/30 bg-primary/15 px-3 py-2 shadow-lg backdrop-blur-sm lg:block">
              <div className="flex items-center gap-2">
                <Sparkles className="size-4 text-primary" />
                <span className="text-xs font-semibold text-foreground">120+ props</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="relative mt-12 overflow-hidden border-y border-border/50 bg-muted/40 py-3.5">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-muted/40 to-transparent sm:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-muted/40 to-transparent sm:w-24" />
        <div className="flex animate-marquee whitespace-nowrap">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="mx-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground"
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
