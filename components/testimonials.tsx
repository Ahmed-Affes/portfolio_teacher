import { Quote, Star } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { TESTIMONIALS } from '@/lib/data'

export function Testimonials() {
  return (
    <section id="testimonials" className="scroll-mt-20 py-10 sm:py-14 lg:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Kind words"
          title="Loved by students, parents & teachers"
          intro="Feedback from classrooms, workshops, and parents who have experienced Farah's interactive teaching approach."
          align="center"
        />

        <div className="mt-7 grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <figure
              key={i}
              className="flex flex-col justify-between rounded-2xl border border-border bg-card p-5 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div>
                <Quote className="size-6 text-primary" />
                <div className="mt-2 flex items-center gap-0.5 text-primary">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="size-3.5 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-2.5 text-xs sm:text-sm leading-relaxed text-foreground text-pretty">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
              </div>
              <figcaption className="mt-4 border-t border-border/70 pt-3">
                <p className="font-semibold text-xs sm:text-sm text-foreground">{t.name}</p>
                <p className="text-[0.75rem] text-muted-foreground">{t.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
