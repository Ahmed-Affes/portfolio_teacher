'use client'

import { useState } from 'react'
import { CheckCircle2, Clock, Mail, MapPin, MessageCircle, Send } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { CONTACT } from '@/lib/data'
import { useToast } from '@/components/toast-provider'
import { submitContactMessage } from '@/lib/supabase'
import { cn } from '@/lib/utils'

type Errors = Partial<Record<'name' | 'email' | 'message', string>>

const ROLES = ['Student', 'Parent', 'Teacher / Educator', 'Other']
const TOPICS = ['Buy materials', 'Rent for workshop', 'Custom project', 'General question']

export function Contact() {
  const { toast } = useToast()
  const [role, setRole] = useState(ROLES[0])
  const [topic, setTopic] = useState(TOPICS[0])
  const [errors, setErrors] = useState<Errors>({})
  const [sent, setSent] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validate = (form: HTMLFormElement): Errors => {
    const data = new FormData(form)
    const next: Errors = {}
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const message = String(data.get('message') ?? '').trim()
    if (name.length < 2) next.name = 'Please enter your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = 'Enter a valid email address.'
    if (message.length < 6) next.message = 'Please enter a message.'
    return next
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const next = validate(form)
    setErrors(next)
    if (Object.keys(next).length > 0) return

    setIsSubmitting(true)
    const data = new FormData(form)
    const name = String(data.get('name'))
    const email = String(data.get('email'))
    const message = String(data.get('message'))

    await submitContactMessage({
      name,
      email,
      role,
      topic,
      message,
    })

    const subject = encodeURIComponent(`[${topic}] Portfolio enquiry from ${name}`)
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nI am: ${role}\nTopic: ${topic}\n\n${message}`,
    )
    window.open(`mailto:${CONTACT.email}?subject=${subject}&body=${body}`, '_blank')

    setSent(true)
    setIsSubmitting(false)
    toast('Thanks! Your message has been received.')
    form.reset()
    setRole(ROLES[0])
    setTopic(TOPICS[0])
  }

  const inputClass =
    'w-full rounded-xl border border-border/70 bg-background/80 px-4 py-2.5 text-sm text-foreground outline-none transition-all duration-300 placeholder:text-muted-foreground focus:border-primary focus:bg-background focus:ring-2 focus:ring-primary/30'

  return (
    <section id="contact" className="relative scroll-mt-20 py-16 sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-64 bg-gradient-to-t from-muted/50 to-transparent" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="overflow-hidden rounded-3xl border border-border/60 bg-card shadow-2xl shadow-foreground/5">
            <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
              <div className="relative flex flex-col justify-between gap-8 overflow-hidden bg-secondary p-6 text-secondary-foreground sm:p-10">
                <div className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-primary/10 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-8 -left-8 size-48 rounded-full bg-white/5 blur-2xl" />

                <div className="relative">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/20 px-3.5 py-1 text-[0.7rem] font-bold uppercase tracking-[0.12em] text-primary ring-1 ring-primary/30">
                    Contact
                  </span>
                  <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight sm:text-4xl">
                    Let&apos;s connect!
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-secondary-foreground/80 text-pretty">
                    Have a question, want to rent or buy materials, or request a custom DIY project?
                    Send a message and I&apos;ll get back to you promptly.
                  </p>
                </div>

                <ul className="relative flex flex-col gap-4">
                  {[
                    {
                      icon: Mail,
                      label: 'Email',
                      value: CONTACT.email,
                      href: `mailto:${CONTACT.email}`,
                    },
                    {
                      icon: MessageCircle,
                      label: 'WhatsApp',
                      value: CONTACT.whatsapp,
                      href: `https://wa.me/${CONTACT.whatsapp.replace(/[^0-9]/g, '')}`,
                      external: true,
                    },
                    {
                      icon: MapPin,
                      label: 'Location',
                      value: CONTACT.location,
                    },
                  ].map((item) => (
                    <li key={item.label}>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.external ? '_blank' : undefined}
                          rel={item.external ? 'noopener noreferrer' : undefined}
                          className="group flex items-center gap-4 text-secondary-foreground/90 transition-colors hover:text-primary"
                        >
                          <span className="flex size-11 items-center justify-center rounded-xl bg-white/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-lg group-hover:shadow-primary/20">
                            <item.icon className="size-4.5" />
                          </span>
                          <div>
                            <span className="block text-[0.65rem] font-semibold uppercase tracking-wider text-secondary-foreground/50">
                              {item.label}
                            </span>
                            <span className="text-sm font-medium">{item.value}</span>
                          </div>
                        </a>
                      ) : (
                        <div className="flex items-center gap-4 text-secondary-foreground/90">
                          <span className="flex size-11 items-center justify-center rounded-xl bg-white/10 text-primary">
                            <item.icon className="size-4.5" />
                          </span>
                          <div>
                            <span className="block text-[0.65rem] font-semibold uppercase tracking-wider text-secondary-foreground/50">
                              {item.label}
                            </span>
                            <span className="text-sm font-medium">{item.value}</span>
                          </div>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>

                <div className="relative flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-secondary-foreground/80">
                  <Clock className="size-4 shrink-0 text-primary" />
                  Typical response time: within 24 hours on weekdays.
                </div>
              </div>

              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5 p-6 sm:p-10">
                {sent && (
                  <div className="flex items-start gap-3 rounded-xl border border-primary/30 bg-primary/10 p-4 text-foreground">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
                    <div className="text-sm">
                      <p className="font-semibold">Message sent successfully!</p>
                      <p className="text-muted-foreground">
                        Your inquiry has been stored and an email draft opened.
                      </p>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-foreground">
                    I am a...
                  </label>
                  <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {ROLES.map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setRole(r)}
                        className={cn(
                          'rounded-xl border px-2.5 py-2.5 text-xs font-medium transition-all duration-300',
                          role === r
                            ? 'border-primary bg-primary/20 font-semibold text-foreground shadow-sm'
                            : 'border-border/70 bg-background/50 text-muted-foreground hover:border-border hover:bg-muted',
                        )}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-foreground">
                    Topic of interest
                  </label>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {TOPICS.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTopic(t)}
                        className={cn(
                          'rounded-xl border px-3 py-2.5 text-xs font-medium transition-all duration-300',
                          topic === t
                            ? 'border-secondary bg-secondary font-semibold text-secondary-foreground shadow-sm'
                            : 'border-border/70 bg-background/50 text-muted-foreground hover:border-border hover:bg-muted',
                        )}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-foreground">
                      Your name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Mariam Ben Ali"
                      className={cn('mt-2', inputClass, errors.name && 'border-destructive ring-destructive/30')}
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-destructive">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-foreground">
                      Email address *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="mariam@example.com"
                      className={cn('mt-2', inputClass, errors.email && 'border-destructive ring-destructive/30')}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-destructive">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-foreground">
                    Your message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    placeholder="Tell me about your students, workshop date, or material request..."
                    className={cn('mt-2 resize-none', inputClass, errors.message && 'border-destructive ring-destructive/30')}
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-destructive">{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/35 disabled:opacity-50"
                >
                  <Send className="size-4" />
                  {isSubmitting ? 'Sending...' : 'Send message'}
                </button>
              </form>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
