import Image from 'next/image'
import { ArrowRight, FileText, GraduationCap, Star } from 'lucide-react'
import { STATS } from '@/lib/data'

export function Hero() {
  return (
    <section id="home" className="relative scroll-mt-24 pt-28 pb-16 sm:pt-32 lg:pt-36 lg:pb-24">
      {/* Background patterns */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="grid-paper absolute inset-0 opacity-70" />
        <div className="absolute -left-20 top-20 size-80 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -right-20 top-40 size-72 rounded-full bg-accent/30 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="flex flex-col items-start">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-foreground shadow-sm">
            <span className="flex size-2 rounded-full bg-primary animate-pulse" />
            English educator &amp; DIY material designer
          </span>

          <h1 className="mt-6 font-serif text-4xl font-semibold leading-[1.1] tracking-tight text-balance sm:text-5xl lg:text-6xl text-foreground">
            Empowering learners through{' '}
            <span className="relative inline-block whitespace-nowrap">
              <span className="relative z-10">interactive</span>
              <span className="absolute inset-x-0 bottom-1 -z-0 h-3 rounded-full bg-primary/60 sm:h-4" />
            </span>{' '}
            English education
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty">
            Aslema! I&apos;m Farah — an English educator and content designer making
            language learning engaging, tactile, and accessible for students, parents,
            and fellow teachers.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <a
              href="#work"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30"
            >
              Explore my work
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-7 py-3.5 text-base font-semibold text-foreground shadow-sm transition-all hover:bg-muted hover:-translate-y-0.5"
            >
              Get in touch
            </a>
          </div>

          <dl className="mt-12 grid w-full max-w-lg grid-cols-2 gap-6 sm:grid-cols-4 border-t border-border/70 pt-8">
            {STATS.map((s) => (
              <div key={s.label}>
                <dt className="font-serif text-3xl font-bold text-foreground">
                  {s.value}
                </dt>
                <dd className="mt-1 text-xs font-medium leading-snug text-muted-foreground">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Hero visual */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative overflow-hidden rounded-[2.5rem] border-4 border-card bg-card shadow-2xl shadow-foreground/10">
            <Image
              src="/images/hero-classroom.png"
              alt="Farah teaching in a bright, engaging English classroom"
              width={720}
              height={820}
              priority
              className="h-full w-full object-cover"
            />
          </div>

          {/* Floating worksheet preview card */}
          <div className="absolute -left-2 top-8 hidden w-52 -rotate-3 rounded-2xl border border-border bg-card/95 p-3.5 shadow-xl shadow-foreground/10 backdrop-blur sm:block">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl bg-primary/25 text-foreground">
                <FileText className="size-5" />
              </span>
              <div>
                <p className="text-sm font-semibold leading-tight text-foreground">New worksheet</p>
                <p className="text-xs text-muted-foreground">Phonics · Level 1</p>
              </div>
            </div>
          </div>

          {/* Floating rating card */}
          <div className="absolute -bottom-5 right-2 w-60 rotate-2 rounded-2xl border border-border bg-card/95 p-4 shadow-xl shadow-foreground/10 backdrop-blur sm:right-4">
            <div className="flex items-center gap-1 text-primary">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-current" />
              ))}
            </div>
            <p className="mt-2 text-sm font-medium leading-snug text-foreground text-pretty">
              &ldquo;My students finally love grammar practice!&rdquo;
            </p>
            <p className="mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
              <GraduationCap className="size-3.5" /> Fellow educator
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
