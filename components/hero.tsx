import Image from 'next/image'
import { ArrowRight, FileText, GraduationCap, Star } from 'lucide-react'
import { STATS } from '@/lib/data'

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-28 pb-16 sm:pt-32 lg:pb-24">
      <div className="grid-paper pointer-events-none absolute inset-0 -z-10 opacity-70" />
      <div className="pointer-events-none absolute -left-24 top-24 -z-10 size-72 rounded-full bg-primary/25 blur-3xl" />

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-muted-foreground">
            <span className="flex size-2 rounded-full bg-primary" />
            English educator &amp; DIY material designer
          </span>

          <h1 className="mt-6 font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Empowering learners through{' '}
            <span className="relative inline-block">
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

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#work"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-transform hover:-translate-y-0.5"
            >
              Explore my work
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3.5 text-base font-semibold text-foreground transition-colors hover:bg-muted"
            >
              Get in touch
            </a>
          </div>

          <dl className="mt-12 grid max-w-lg grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label}>
                <dt className="font-serif text-3xl font-semibold text-foreground">
                  {s.value}
                </dt>
                <dd className="mt-1 text-xs leading-snug text-muted-foreground">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Hero visual */}
        <div className="relative">
          <div className="relative overflow-hidden rounded-[2rem] border-4 border-card shadow-2xl shadow-foreground/10">
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
          <div className="absolute -left-4 top-10 hidden w-52 rotate-[-4deg] rounded-2xl border border-border bg-card p-3 shadow-xl shadow-foreground/10 sm:block">
            <div className="flex items-center gap-2">
              <span className="flex size-9 items-center justify-center rounded-xl bg-primary/25 text-foreground">
                <FileText className="size-4.5" />
              </span>
              <div>
                <p className="text-sm font-semibold leading-tight">New worksheet</p>
                <p className="text-xs text-muted-foreground">Phonics · Level 1</p>
              </div>
            </div>
          </div>

          {/* Floating rating card */}
          <div className="absolute -bottom-5 right-2 w-56 rotate-[3deg] rounded-2xl border border-border bg-card p-4 shadow-xl shadow-foreground/10 sm:right-4">
            <div className="flex items-center gap-1 text-primary">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-current" />
              ))}
            </div>
            <p className="mt-2 text-sm font-medium leading-snug text-pretty">
              &ldquo;My students finally love grammar practice!&rdquo;
            </p>
            <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
              <GraduationCap className="size-3.5" /> Fellow educator
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
