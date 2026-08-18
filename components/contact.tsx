'use client'

import { useState } from 'react'
import { CheckCircle2, Mail, MapPin, MessageCircle, Send } from 'lucide-react'
import { CONTACT } from '@/lib/data'
import { useToast } from '@/components/toast-provider'
import { submitContactMessage } from '@/lib/supabase'
import { cn } from '@/lib/utils'

type Errors = Partial<Record<'name' | 'email' | 'message', string>>

const ROLES = ['A student', 'A parent', 'A teacher / educator', 'Something else']
const TOPICS = ['Buy materials', 'Rent for a workshop', 'Custom project', 'General question']

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
    if (message.length < 10) next.message = 'Tell me a little more (10+ characters).'
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

    // Save message to Supabase database
    await submitContactMessage({
      name,
      email,
      role,
      topic,
      message,
    })

    // Open mailto fallback so user can also send email directly
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
    'w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/40 text-base'

  return (
    <section id="contact" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="overflow-hidden rounded-[2.5rem] border border-border bg-card shadow-xl shadow-foreground/5">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
            {/* Info panel */}
            <div className="relative flex flex-col justify-between gap-8 bg-secondary p-8 text-secondary-foreground sm:p-10 lg:p-12">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-primary/25 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                  Contact
                </span>
                <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight text-balance sm:text-4xl">
                  Let&apos;s connect!
                </h2>
                <p className="mt-4 text-base leading-relaxed text-secondary-foreground/80 text-pretty">
                  Have a question, want to rent or buy learning materials, or request a
                  custom DIY project? Send a message and I&apos;ll get back to you.
                </p>
              </div>

              <ul className="flex flex-col gap-4">
                <li>
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="group flex items-center gap-3.5 text-secondary-foreground/90 transition-colors hover:text-primary"
                  >
                    <span className="flex size-12 items-center justify-center rounded-2xl bg-white/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <Mail className="size-5" />
                    </span>
                    <div>
                      <span className="block text-xs text-secondary-foreground/60">
                        Email
                      </span>
                      <span className="font-medium">{CONTACT.email}</span>
                    </div>
                  </a>
                </li>
                <li>
                  <a
                    href={`https://wa.me/${CONTACT.whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3.5 text-secondary-foreground/90 transition-colors hover:text-primary"
                  >
                    <span className="flex size-12 items-center justify-center rounded-2xl bg-white/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <MessageCircle className="size-5" />
                    </span>
                    <div>
                      <span className="block text-xs text-secondary-foreground/60">
                        WhatsApp
                      </span>
                      <span className="font-medium">{CONTACT.whatsapp}</span>
                    </div>
                  </a>
                </li>
                <li className="flex items-center gap-3.5 text-secondary-foreground/90">
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-white/10 text-primary">
                    <MapPin className="size-5" />
                  </span>
                  <div>
                    <span className="block text-xs text-secondary-foreground/60">
                      Location
                    </span>
                    <span className="font-medium">{CONTACT.location}</span>
                  </div>
                </li>
              </ul>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4.5 text-sm text-secondary-foreground/75">
                ⚡ Typical response time: within 24 hours on weekdays.
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6 p-8 sm:p-10 lg:p-12">
              {sent && (
                <div className="flex items-start gap-3 rounded-2xl border border-primary/30 bg-primary/10 p-4 text-foreground">
                  <CheckCircle2 className="mt-0.5 size-5 text-primary" />
                  <div className="text-sm">
                    <p className="font-semibold">Message sent successfully!</p>
                    <p className="text-muted-foreground">
                      Your inquiry has been stored in Farah&apos;s database and an email draft opened.
                    </p>
                  </div>
                </div>
              )}

              {/* Role selector */}
              <div>
                <label className="block text-sm font-semibold text-foreground">
                  I am a...
                </label>
                <div className="mt-2.5 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {ROLES.map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRole(r)}
                      className={cn(
                        'rounded-xl border px-3 py-2.5 text-xs sm:text-sm font-medium transition-all duration-200',
                        role === r
                          ? 'border-primary bg-primary/20 font-semibold text-foreground shadow-sm'
                          : 'border-border bg-card text-muted-foreground hover:bg-muted',
                      )}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* Topic selector */}
              <div>
                <label className="block text-sm font-semibold text-foreground">
                  Topic of interest
                </label>
                <div className="mt-2.5 grid grid-cols-2 gap-2">
                  {TOPICS.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTopic(t)}
                      className={cn(
                        'rounded-xl border px-3.5 py-2.5 text-xs sm:text-sm font-medium transition-all duration-200',
                        topic === t
                          ? 'border-secondary bg-secondary text-secondary-foreground font-semibold shadow-sm'
                          : 'border-border bg-card text-muted-foreground hover:bg-muted',
                      )}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-foreground">
                    Your name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="e.g. Mariam Ben Ali"
                    className={cn('mt-1.5', inputClass, errors.name && 'border-destructive')}
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-destructive">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-foreground">
                    Email address *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="e.g. mariam@example.com"
                    className={cn('mt-1.5', inputClass, errors.email && 'border-destructive')}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-destructive">{errors.email}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-foreground">
                  Your message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  placeholder="Tell me about your students, workshop date, or material request..."
                  className={cn('mt-1.5 resize-none', inputClass, errors.message && 'border-destructive')}
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-destructive">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30 disabled:opacity-50"
              >
                <Send className="size-4" />
                {isSubmitting ? 'Sending...' : 'Send message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
