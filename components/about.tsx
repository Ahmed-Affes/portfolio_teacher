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
    text: 'A researcher mindset for how language is really acquired.',
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
    <section id="about" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <div className="relative order-last lg:order-first">
          <div className="relative mx-auto max-w-md overflow-hidden rounded-[2rem] border-4 border-card shadow-2xl shadow-foreground/10">
            <Image
              src="/images/farah-portrait.png"
              alt="Portrait of Farah Affes holding a handmade educational prop"
              width={560}
              height={640}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 left-1/2 w-[min(90%,22rem)] -translate-x-1/2 rounded-2xl border border-border bg-secondary p-5 text-secondary-foreground shadow-xl">
            <p className="font-serif text-lg leading-snug text-pretty">
              &ldquo;Learning sticks when you can touch it, play with it, and laugh
              along the way.&rdquo;
            </p>
          </div>
        </div>

        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/20 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-foreground">
            About me
          </span>
          <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight tracking-tight text-balance sm:text-4xl">
            Turning English lessons into hands-on adventures
          </h2>
          <div className="mt-5 space-y-4 text-lg leading-relaxed text-muted-foreground text-pretty">
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

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {highlights.map((h) => (
              <div
                key={h.title}
                className="rounded-2xl border border-border bg-card p-5 transition-shadow hover:shadow-lg hover:shadow-foreground/5"
              >
                <span className="flex size-10 items-center justify-center rounded-xl bg-primary/25 text-foreground">
                  <h.icon className="size-5" />
                </span>
                <h3 className="mt-3 font-semibold">{h.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {h.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
