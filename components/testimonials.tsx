'use client'

import { GraduationCap, Quote, Star } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { usePortfolio } from '@/lib/portfolio-context'

export function Testimonials() {
  const { state } = usePortfolio()
  const { testimonials } = state
  const activeTestimonials = testimonials.filter((t) => t.isActive !== false)

  return (
    <section id="testimonials" className="section-shell relative overflow-hidden bg-muted/40">
      <div className="section-inner section-stack">
        <Reveal>
          <SectionHeading
            number="06"
            eyebrow="Community Endorsements"
            title="Loved by students, parents & fellow educators"
            intro="Real feedback from families and teachers who have used Farah's props and workshops across Sfax and Tunisia."
            align="center"
          />
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
          {activeTestimonials.map((t, i) => (
            <Reveal key={t.id || i} delay={i * 60}>
              <figure className="card-shine group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border/75 bg-card p-6 shadow-sm transform-gpu transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 will-change-transform sm:p-7">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1 text-primary">
                      {Array.from({ length: t.rating || 5 }).map((_, s) => (
                        <Star key={s} className="size-4 fill-current" />
                      ))}
                    </div>
                    <Quote className="size-6 text-primary/40 transition-colors group-hover:text-primary" />
                  </div>

                  <blockquote className="mt-4 font-serif text-sm leading-relaxed text-foreground sm:text-base text-pretty">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                </div>

                <figcaption className="mt-6 flex items-center gap-3 border-t border-border/60 pt-4">
                  <div className="flex size-10 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-foreground ring-1 ring-primary/30">
                    {t.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-serif text-sm font-semibold text-foreground">{t.name}</p>
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
