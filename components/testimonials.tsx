import { Quote, Star } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { TESTIMONIALS } from '@/lib/data'

export function Testimonials() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Kind words"
          title="Loved by students, parents & teachers"
          align="center"
        />

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <figure
              key={i}
              className="flex flex-col rounded-3xl border border-border bg-card p-6 shadow-sm"
            >
              <Quote className="size-8 text-primary" />
              <div className="mt-3 flex items-center gap-0.5 text-primary">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="size-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-3 flex-1 leading-relaxed text-foreground text-pretty">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5 border-t border-border pt-4">
                <p className="font-semibold">{t.name}</p>
                <p className="text-sm text-muted-foreground">{t.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
