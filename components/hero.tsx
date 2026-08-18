import Image from 'next/image'
import { ArrowRight, FileText, GraduationCap, Star } from 'lucide-react'
import { STATS } from '@/lib/data'

export function Hero() {
  return (
    <section id="home" className="relative scroll-mt-20 pt-24 pb-8 sm:pt-28 sm:pb-12 lg:pt-28 lg:pb-14">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="grid-paper absolute inset-0 opacity-60" />
        <div className="absolute -left-20 top-16 size-72 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -right-20 top-28 size-64 rounded-full bg-accent/30 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
        <div className="flex flex-col items-start">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1 text-xs font-medium text-foreground shadow-xs">
            <span className="flex size-2 rounded-full bg-primary animate-pulse" />
            English educator &amp; DIY material designer
          </span>

          <h1 className="mt-4 font-serif text-3xl font-semibold leading-[1.12] tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance">
            Empowering learners through{' '}
            <span className="relative inline-block whitespace-nowrap">
              <span className="relative z-10">interactive</span>
              <span className="absolute inset-x-0 bottom-1 -z-0 h-2.5 sm:h-3 rounded-full bg-primary/60" />
            </span>{' '}
            English education
          </h1>

          <p className="mt-3.5 max-w-lg text-base sm:text-lg leading-relaxed text-muted-foreground text-pretty">
            Aslema! I&apos;m Farah — an English educator and content designer making
            language learning engaging, tactile, and accessible for students, parents,
            and fellow teachers.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <a
              href="#work"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-primary-foreground shadow-md shadow-primary/20 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30"
            >
              Explore my work
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-foreground shadow-xs transition-all hover:bg-muted hover:-translate-y-0.5"
            >
              Get in touch
            </a>
          </div>

          {/* Compact Stats Row */}
          <dl className="mt-7 grid w-full max-w-lg grid-cols-2 gap-4 sm:grid-cols-4 border-t border-border/70 pt-5">
            {STATS.map((s) => (
              <div key={s.label} className="flex flex-col">
                <dt className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
                  {s.value}
                </dt>
                <dd className="mt-0.5 text-xs font-medium leading-snug text-muted-foreground">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Hero visual */}
        <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
          <div className="relative aspect-[4/4.4] w-full overflow-hidden rounded-[2rem] border-4 border-card bg-card shadow-xl shadow-foreground/10">
            <Image
              src="/images/hero-classroom.png"
              alt="Farah teaching in a bright, engaging English classroom"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 480px"
              className="object-cover object-center"
            />
          </div>

          {/* Floating worksheet preview card */}
          <div className="absolute -left-3 top-6 hidden w-48 -rotate-3 rounded-2xl border border-border bg-card/95 p-3 shadow-lg backdrop-blur sm:block">
            <div className="flex items-center gap-2.5">
              <span className="flex size-9 items-center justify-center rounded-xl bg-primary/25 text-foreground">
                <FileText className="size-4.5" />
              </span>
              <div>
                <p className="text-xs font-semibold leading-tight text-foreground">New worksheet</p>
                <p className="text-[0.7rem] text-muted-foreground">Phonics · Level 1</p>
              </div>
            </div>
          </div>

          {/* Floating rating card */}
          <div className="absolute -bottom-4 right-2 w-52 rotate-2 rounded-2xl border border-border bg-card/95 p-3.5 shadow-lg backdrop-blur sm:right-3">
            <div className="flex items-center gap-0.5 text-primary">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-3.5 fill-current" />
              ))}
            </div>
            <p className="mt-1.5 text-xs font-medium leading-snug text-foreground text-pretty">
              &ldquo;My students finally love grammar practice!&rdquo;
            </p>
            <p className="mt-1 flex items-center gap-1 text-[0.7rem] text-muted-foreground">
              <GraduationCap className="size-3" /> Fellow educator
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
