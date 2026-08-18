import Image from 'next/image'
import { BookOpen, Languages, Palette, Sparkles } from 'lucide-react'

const highlights = [
  {
    icon: BookOpen,
    title: 'Classroom instruction',
    text: 'Hands-on lessons that keep every learner engaged and confident.',
  },
  {
    icon: Languages,
    title: 'Linguistics background',
    text: 'A researcher mindset for how language is really acquired naturally.',
  },
  {
    icon: Palette,
    title: 'Custom DIY props',
    text: 'Tactile, handmade tools designed around real learning goals.',
  },
  {
    icon: Sparkles,
    title: 'Content design',
    text: 'Beautiful, print-ready posters, flyers, and worksheets.',
  },
]

export function About() {
  return (
    <section id="about" className="scroll-mt-20 py-10 sm:py-14 lg:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
          {/* Portrait Column */}
          <div className="relative mx-auto w-full max-w-xs lg:max-w-none">
            <div className="relative aspect-[4/4.8] w-full overflow-hidden rounded-[2rem] border-4 border-card bg-card shadow-xl shadow-foreground/10">
              <Image
                src="/images/farah-portrait.png"
                alt="Portrait of Farah Affes holding a handmade educational prop"
                fill
                sizes="(max-width: 1024px) 100vw, 360px"
                className="object-cover object-top"
              />
            </div>
            
            <div className="mt-3 rounded-2xl border border-border bg-secondary p-3.5 text-secondary-foreground shadow-md">
              <p className="font-serif text-sm leading-snug text-pretty">
                &ldquo;Learning sticks when you can touch it, play with it, and laugh along the way.&rdquo;
              </p>
            </div>
          </div>

          {/* Text and Highlights Column */}
          <div className="flex flex-col">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/25 px-3 py-0.5 text-[0.75rem] font-semibold uppercase tracking-wider text-foreground">
                About me
              </span>
              <h2 className="mt-2 font-serif text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-3xl lg:text-3.5xl text-balance">
                Turning English lessons into hands-on adventures
              </h2>
            </div>

            <div className="mt-3.5 space-y-2.5 text-sm sm:text-base leading-relaxed text-muted-foreground text-pretty">
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

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {highlights.map((h) => (
                <div
                  key={h.title}
                  className="rounded-2xl border border-border bg-card p-3.5 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/25 text-foreground">
                      <h.icon className="size-4" />
                    </span>
                    <h3 className="font-semibold text-sm text-foreground">{h.title}</h3>
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                    {h.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
