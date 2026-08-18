import { Quote, Star } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { TESTIMONIALS } from '@/lib/data'

export function Testimonials() {
  return (
    <section id="testimonials" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Kind words"
          title="Loved by students, parents & teachers"
          intro="Real feedback from classrooms, workshops, and parents who have experienced Farah's interactive teaching approach."
          align="center"
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <figure
              key={i}
              className="flex flex-col justify-between rounded-3xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div>
                <Quote className="size-8 text-primary" />
                <div className="mt-3 flex items-center gap-0.5 text-primary">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="size-4 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-4 leading-relaxed text-foreground text-pretty">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
              </div>
              <figcaption className="mt-6 border-t border-border/70 pt-4">
                <p className="font-semibold text-foreground">{t.name}</p>
                <p className="text-sm text-muted-foreground">{t.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
