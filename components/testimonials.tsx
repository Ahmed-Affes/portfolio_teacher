import { Quote, Star } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { TESTIMONIALS } from '@/lib/data'

export function Testimonials() {
  return (
    <section id="testimonials" className="section-shell relative bg-muted/30">
      <div className="section-inner section-stack">
        <Reveal>
          <SectionHeading
            number="06"
            eyebrow="Kind words"
            title="Loved by students, parents & teachers"
            align="center"
          />
        </Reveal>

        <div className="scrollbar-hide -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 sm:mx-0 sm:grid sm:snap-none sm:grid-cols-3 sm:gap-4 sm:overflow-visible sm:px-0">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={i} delay={i * 40} className="w-[80vw] shrink-0 snap-center sm:w-auto">
              <figure className="flex h-full flex-col rounded-xl border border-border/60 bg-card p-4 sm:rounded-2xl sm:p-5">
                <Quote className="size-5 text-primary/60" />
                <div className="mt-1.5 flex gap-0.5 text-primary">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="size-3 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-2 flex-1 text-xs leading-relaxed text-foreground sm:text-sm">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-3 border-t border-border/50 pt-3">
                  <p className="text-xs font-semibold">{t.name}</p>
                  <p className="text-[0.65rem] text-muted-foreground">{t.role}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
