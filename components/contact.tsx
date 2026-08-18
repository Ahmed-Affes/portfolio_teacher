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

    // Open mailto fallback so user can also send email directly if desired
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
    'w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/40'

  return (
    <section id="contact" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="overflow-hidden rounded-[2rem] border border-border bg-card shadow-xl shadow-foreground/5">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
            {/* Info panel */}
            <div className="relative flex flex-col justify-between gap-8 bg-secondary p-8 text-secondary-foreground sm:p-10">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-primary/25 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                  Contact
                </span>
                <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight text-balance sm:text-4xl">
                  Let&apos;s connect!
                </h2>
                <p className="mt-4 leading-relaxed text-secondary-foreground/75 text-pretty">
                  Have a question, want to rent or buy learning materials, or request a
                  custom DIY project? Send a message and I&apos;ll get back to you.
                </p>
              </div>

              <ul className="flex flex-col gap-4">
                <li>
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="group flex items-center gap-3 text-secondary-foreground/90 transition-colors hover:text-primary"
                  >
                    <span className="flex size-11 items-center justify-center rounded-xl bg-white/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <Mail className="size-5" />
                    </span>
                    <span>
                      <span className="block text-xs text-secondary-foreground/60">
                        Email
                      </span>
                      <span className="font-medium">{CONTACT.email}</span>
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={`https://wa.me/${CONTACT.whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-3 text-secondary-foreground/90 transition-colors hover:text-primary"
                  >
                    <span className="flex size-11 items-center justify-center rounded-xl bg-white/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <MessageCircle className="size-5" />
                    </span>
                    <span>
                      <span className="block text-xs text-secondary-foreground/60">
                        WhatsApp
                      </span>
                      <span className="font-medium">{CONTACT.whatsapp}</span>
                    </span>
                  </a>
                </li>
                <li className="flex items-center gap-3 text-secondary-foreground/90">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-white/10 text-primary">
                    <MapPin className="size-5" />
                  </span>
                  <span>
                    <span className="block text-xs text-secondary-foreground/60">
                      Based in
                    </span>
                    <span className="font-medium">{CONTACT.location}</span>
                  </span>
                </li>
              </ul>
            </div>

            {/* Form */}
            <div className="p-8 sm:p-10">
              {sent ? (
                <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                  <span className="flex size-16 items-center justify-center rounded-full bg-primary/20 text-foreground">
                    <CheckCircle2 className="size-8" />
                  </span>
                  <h3 className="font-serif text-2xl font-semibold">Message ready!</h3>
                  <p className="max-w-sm leading-relaxed text-muted-foreground text-pretty">
                    Your email draft just opened. If it didn&apos;t, reach me directly at{' '}
                    <a
                      href={`mailto:${CONTACT.email}`}
                      className="font-medium text-foreground underline underline-offset-4"
                    >
                      {CONTACT.email}
                    </a>
                    .
                  </p>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="mt-2 rounded-full bg-secondary px-5 py-2.5 text-sm font-semibold text-secondary-foreground transition-transform hover:-translate-y-0.5"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
                  <div>
                    <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Your full name"
                      aria-invalid={Boolean(errors.name)}
                      onChange={() => setErrors((prev) => ({ ...prev, name: undefined }))}
                      className={cn(inputClass, errors.name && 'border-destructive')}
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-destructive">{errors.name}</p>
                    )}
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="role" className="mb-1.5 block text-sm font-medium">
                        I am
                      </label>
                      <select
                        id="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className={inputClass}
                      >
                        {ROLES.map((r) => (
                          <option key={r}>{r}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="topic" className="mb-1.5 block text-sm font-medium">
                        I want to
                      </label>
                      <select
                        id="topic"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className={inputClass}
                      >
                        {TOPICS.map((t) => (
                          <option key={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
                      Email address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      aria-invalid={Boolean(errors.email)}
                      onChange={() => setErrors((prev) => ({ ...prev, email: undefined }))}
                      className={cn(inputClass, errors.email && 'border-destructive')}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-destructive">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      placeholder="Tell me what you're looking for…"
                      aria-invalid={Boolean(errors.message)}
                      onChange={() => setErrors((prev) => ({ ...prev, message: undefined }))}
                      className={cn(inputClass, 'resize-none', errors.message && 'border-destructive')}
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-destructive">{errors.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-transform hover:-translate-y-0.5"
                  >
                    <Send className="size-4" />
                    Send message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
