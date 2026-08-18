import { Quote, Star } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { TESTIMONIALS } from '@/lib/data'

const AVATAR_COLORS = [
  'bg-primary/25 text-foreground',
  'bg-secondary/15 text-secondary',
  'bg-accent text-accent-foreground',
]

export function Testimonials() {
  return (
    <section id="testimonials" className="relative scroll-mt-20 bg-muted/35 py-16 sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-0 noise-overlay opacity-[0.02]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            number="06"
            eyebrow="Kind words"
            title="Loved by students, parents & teachers"
            intro="Feedback from classrooms, workshops, and parents who have experienced Farah's interactive teaching approach."
            align="center"
          />
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={i} delay={i * 80}>
              <figure className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border/60 bg-card p-6 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/25 hover:shadow-xl hover:shadow-primary/5">
                <div className="absolute -right-4 -top-4 size-24 rounded-full bg-primary/5 transition-transform duration-500 group-hover:scale-150" />
                <div className="relative">
                  <Quote className="size-8 text-primary/60" />
                  <div className="mt-3 flex items-center gap-0.5 text-primary">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} className="size-3.5 fill-current" />
                    ))}
                  </div>
                  <blockquote className="mt-4 text-sm leading-relaxed text-foreground text-pretty">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                </div>
                <figcaption className="relative mt-6 flex items-center gap-3 border-t border-border/60 pt-5">
                  <span
                    className={`flex size-10 shrink-0 items-center justify-center rounded-full font-serif text-sm font-bold ${AVATAR_COLORS[i % AVATAR_COLORS.length]}`}
                  >
                    {t.name.charAt(0)}
                  </span>
                  <div>
                    <p className="font-semibold text-sm text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
