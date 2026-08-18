import Image from 'next/image'
import { BookOpen, Languages, Palette, Sparkles } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'

const highlights = [
  { icon: BookOpen, title: 'Classroom instruction', text: 'Hands-on lessons that keep every learner engaged.' },
  { icon: Languages, title: 'Linguistics background', text: 'Research-backed approach to language acquisition.' },
  { icon: Palette, title: 'Custom DIY props', text: 'Tactile tools designed around real learning goals.' },
  { icon: Sparkles, title: 'Content design', text: 'Print-ready posters, flyers, and worksheets.' },
]

export function About() {
  return (
    <section id="about" className="section-shell relative">
      <div className="section-inner section-stack">
        <div className="grid items-start gap-6 lg:grid-cols-2 lg:gap-8 xl:gap-10">
          <Reveal direction="right" className="relative mx-auto w-full max-w-[240px] sm:max-w-xs lg:mx-0 lg:max-w-none">
            <div className="relative aspect-[3/3.6] w-full overflow-hidden rounded-2xl border border-border/50 bg-card shadow-lg sm:aspect-[4/4.5] lg:rounded-[1.75rem]">
              <Image
                src="/images/farah-portrait.png"
                alt="Portrait of Farah Affes"
                fill
                sizes="(max-width: 1024px) 240px, 360px"
                className="object-cover object-top"
              />
            </div>
            <blockquote className="mt-3 rounded-xl border border-border/60 bg-secondary p-3.5 text-secondary-foreground sm:p-4">
              <p className="font-serif text-sm italic leading-relaxed sm:text-base">
                &ldquo;Learning sticks when you can touch it, play with it, and laugh along the way.&rdquo;
              </p>
              <footer className="mt-2 text-[0.65rem] font-bold uppercase tracking-wider text-primary">
                — Farah Affes
              </footer>
            </blockquote>
          </Reveal>

          <div className="section-stack">
            <Reveal>
              <SectionHeading
                number="01"
                eyebrow="About me"
                title="Turning English lessons into hands-on adventures"
              />
            </Reveal>

            <Reveal delay={60}>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base text-pretty">
                I&apos;m an English teacher and material designer passionate about dynamic, hands-on learning.
                Whether you&apos;re a student, parent, or educator looking to rent, buy, or collaborate — you&apos;re in the right place.
              </p>
            </Reveal>

            <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
              {highlights.map((h, i) => (
                <Reveal key={h.title} delay={100 + i * 40}>
                  <div className="h-full rounded-xl border border-border/60 bg-card p-3 transition-colors hover:border-primary/25 sm:p-3.5">
                    <span className="flex size-8 items-center justify-center rounded-lg bg-primary/15">
                      <h.icon className="size-3.5" />
                    </span>
                    <h3 className="mt-2 text-xs font-semibold text-foreground sm:text-sm">{h.title}</h3>
                    <p className="mt-1 text-[0.65rem] leading-relaxed text-muted-foreground sm:text-xs">{h.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
