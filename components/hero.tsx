import Image from 'next/image'
import { ArrowRight, FileText, GraduationCap, Star } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { STATS } from '@/lib/data'

const MARQUEE_ITEMS = [
  'Phonics & literacy',
  'DIY classroom props',
  'Printable worksheets',
  'Workshop design',
  'ESL resources',
  'Storytelling sessions',
]

export function Hero() {
  return (
    <section id="home" className="section-shell relative overflow-hidden pt-[calc(var(--header-h)+1rem)] sm:pt-[calc(var(--header-h)+1.25rem)]">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="section-glow absolute inset-0" />
        <div className="grid-paper absolute inset-0 opacity-60" />
        <div className="absolute -left-24 top-16 size-64 rounded-full bg-primary/20 blur-[80px] sm:size-80" />
      </div>

      <div className="section-inner">
        <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-10 xl:gap-12">
          <div className="flex flex-col">
            <Reveal>
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-[0.65rem] font-semibold tracking-wide text-foreground sm:text-xs">
                <span className="size-1.5 rounded-full bg-primary" />
                English educator &amp; DIY material designer
              </span>
            </Reveal>

            <Reveal delay={60}>
              <h1 className="mt-3 font-serif text-[1.75rem] font-semibold leading-[1.1] tracking-tight sm:text-4xl lg:text-[2.75rem] xl:text-5xl text-balance">
                Empowering learners through{' '}
                <span className="highlight-underline">interactive</span>{' '}
                <span className="text-gradient">English education</span>
              </h1>
            </Reveal>

            <Reveal delay={120}>
              <p className="mt-2.5 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base text-pretty">
                Aslema! I&apos;m Farah — making language learning engaging, tactile, and accessible for students, parents, and fellow teachers.
              </p>
            </Reveal>

            <Reveal delay={180}>
              <div className="mt-4 flex flex-wrap gap-2.5">
                <a
                  href="#work"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 transition-all hover:-translate-y-0.5"
                >
                  Explore my work
                  <ArrowRight className="size-4" />
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition-all hover:bg-muted"
                >
                  Get in touch
                </a>
              </div>
            </Reveal>

            <Reveal delay={240}>
              <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-border/60 pt-4 sm:grid-cols-4">
                {STATS.map((s) => (
                  <div key={s.label}>
                    <dt className="font-serif text-xl font-bold text-foreground sm:text-2xl">{s.value}</dt>
                    <dd className="mt-0.5 text-[0.6rem] font-medium uppercase tracking-wide text-muted-foreground sm:text-[0.65rem]">
                      {s.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <Reveal delay={80} direction="left" className="relative mx-auto w-full max-w-xs sm:max-w-sm lg:max-w-none">
            <div className="relative aspect-[4/4.2] w-full overflow-hidden rounded-2xl border border-border/50 bg-card shadow-xl sm:rounded-[1.75rem] lg:aspect-[4/4.4]">
              <Image
                src="/images/hero-classroom.png"
                alt="Farah teaching in a bright, engaging English classroom"
                fill
                priority
                sizes="(max-width: 1024px) 80vw, 480px"
                className="object-cover object-center"
              />
            </div>

            <div className="absolute -bottom-3 right-0 w-48 rounded-xl border border-border/60 bg-card/95 p-3 shadow-lg backdrop-blur-sm sm:-bottom-4 sm:right-2 sm:w-52">
              <div className="flex items-center gap-0.5 text-primary">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-3 fill-current" />
                ))}
              </div>
              <p className="mt-1.5 text-[0.7rem] font-medium leading-snug text-foreground">
                &ldquo;My students finally love grammar practice!&rdquo;
              </p>
              <p className="mt-1 flex items-center gap-1 text-[0.65rem] text-muted-foreground">
                <GraduationCap className="size-3" /> Fellow educator
              </p>
            </div>

            <div className="absolute -left-2 top-4 hidden rounded-xl border border-border/60 bg-card/95 p-2.5 shadow-lg backdrop-blur-sm sm:block sm:-left-4 sm:p-3">
              <div className="flex items-center gap-2">
                <span className="flex size-8 items-center justify-center rounded-lg bg-primary/20">
                  <FileText className="size-3.5" />
                </span>
                <div>
                  <p className="text-[0.65rem] font-semibold">New worksheet</p>
                  <p className="text-[0.6rem] text-muted-foreground">Phonics · Level 1</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="relative mt-6 overflow-hidden border-y border-border/40 bg-muted/30 py-2.5 sm:mt-8">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={`${item}-${i}`} className="mx-4 inline-flex items-center gap-2 text-xs font-medium text-muted-foreground sm:mx-5 sm:text-sm">
              <span className="size-1 rounded-full bg-primary" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
