import Image from 'next/image'
import { BookOpen, Languages, Palette, Sparkles } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'

const highlights = [
  {
    icon: BookOpen,
    title: 'Classroom instruction',
    text: 'Hands-on lessons that keep every learner engaged and confident.',
    span: 'col-span-1',
  },
  {
    icon: Languages,
    title: 'Linguistics background',
    text: 'A researcher mindset for how language is really acquired naturally.',
    span: 'col-span-1',
  },
  {
    icon: Palette,
    title: 'Custom DIY props',
    text: 'Tactile, handmade tools designed around real learning goals.',
    span: 'col-span-1',
  },
  {
    icon: Sparkles,
    title: 'Content design',
    text: 'Beautiful, print-ready posters, flyers, and worksheets.',
    span: 'col-span-1',
  },
]

export function About() {
  return (
    <section id="about" className="relative scroll-mt-20 py-16 sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-muted/30 to-transparent" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal direction="right" className="relative mx-auto w-full max-w-sm lg:max-w-none">
            <div className="absolute -left-6 top-8 hidden h-32 w-32 rounded-full bg-primary/15 blur-3xl lg:block" />
            <div className="relative">
              <div className="absolute -inset-2 rounded-[2.25rem] bg-gradient-to-br from-primary/20 to-secondary/10" />
              <div className="relative aspect-[4/4.8] w-full overflow-hidden rounded-[2rem] border border-white/50 bg-card shadow-2xl shadow-foreground/10 ring-1 ring-border/40">
                <Image
                  src="/images/farah-portrait.png"
                  alt="Portrait of Farah Affes holding a handmade educational prop"
                  fill
                  sizes="(max-width: 1024px) 100vw, 360px"
                  className="object-cover object-top"
                />
              </div>
            </div>

            <div className="relative -mt-6 mx-4 rounded-2xl border border-border/60 bg-secondary p-5 text-secondary-foreground shadow-xl">
              <div className="absolute -top-3 left-6 size-6 rotate-45 border-l border-t border-border/60 bg-secondary" />
              <p className="relative font-serif text-base italic leading-relaxed text-pretty">
                &ldquo;Learning sticks when you can touch it, play with it, and laugh along the way.&rdquo;
              </p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-primary">
                — Farah Affes
              </p>
            </div>
          </Reveal>

          <div className="flex flex-col">
            <Reveal>
              <SectionHeading
                number="01"
                eyebrow="About me"
                title="Turning English lessons into hands-on adventures"
              />
            </Reveal>

            <Reveal delay={100}>
              <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base text-pretty">
                <p>
                  I&apos;m an English teacher and material designer passionate about
                  creating dynamic, hands-on learning environments. With experience in
                  classroom instruction, linguistics, and custom DIY educational props, I
                  help students build confidence through interactive tools.
                </p>
                <p>
                  Whether you&apos;re a student looking for guidance, a parent seeking
                  resources, or an educator looking to rent, buy, or collaborate on creative
                  teaching aids — you&apos;re in the right place.
                </p>
              </div>
            </Reveal>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {highlights.map((h, i) => (
                <Reveal key={h.title} delay={160 + i * 60}>
                  <div className="card-shine group h-full rounded-2xl border border-border/70 bg-card p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                    <div className="flex items-start gap-3">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-foreground ring-1 ring-primary/20 transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:ring-primary">
                        <h.icon className="size-4.5" />
                      </span>
                      <div>
                        <h3 className="font-semibold text-foreground">{h.title}</h3>
                        <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                          {h.text}
                        </p>
                      </div>
                    </div>
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
