'use client'

import { useState } from 'react'
import {
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Send,
  Sparkles,
} from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { usePortfolio } from '@/lib/portfolio-context'
import { useToast } from '@/components/toast-provider'
import { submitContactMessage } from '@/lib/supabase'
import { cn } from '@/lib/utils'

type Errors = Partial<Record<'name' | 'email' | 'message', string>>

const ROLES = ['Student', 'Parent', 'Teacher / Educator', 'Other']
const TOPICS = ['Buy materials', 'Rent for workshop', 'Custom project', 'General question']

const TRUST_STATS = [
  { value: '<24h', label: 'Response time' },
  { value: '900+', label: 'Learners reached' },
  { value: '40+', label: 'Workshops' },
]

export function Contact() {
  const { state, addMessage } = usePortfolio()
  const { contact } = state
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

    // Save to local portfolio context inbox for instant admin view & realtime sync
    addMessage({ name, email, role, topic, message })

    // Also dispatch to Supabase backend if configured
    await submitContactMessage({ name, email, role, topic, message })

    setSent(true)
    setIsSubmitting(false)
    toast('Your message has been sent directly to Farah! We will reply promptly.')
    form.reset()
    setRole(ROLES[0])
    setTopic(TOPICS[0])
  }

  const inputClass =
    'w-full rounded-lg border border-border/70 bg-background px-3 py-2 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/25'

  const selectClass =
    'w-full appearance-none rounded-lg border border-border/70 bg-background px-3 py-2 text-sm text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/25'

  return (
    <section id="contact" className="section-shell relative">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-muted/40 to-transparent" />

      <div className="section-inner section-stack">
        <Reveal>
          <SectionHeading
            number="08"
            eyebrow="Contact"
            title="Start a conversation"
            intro={`Questions about materials, rentals, or a custom project — reach out and Farah will respond promptly from ${contact.location}.`}
            align="center"
          />
        </Reveal>

        {/* Quick actions — visible on all screens */}
        <Reveal delay={40}>
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
            <a
              href={`mailto:${contact.email}`}
              className="group flex items-center justify-between rounded-xl border border-border/70 bg-card px-4 py-3 shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-lg bg-primary/15 text-foreground">
                  <Mail className="size-4" />
                </span>
                <div>
                  <p className="text-[0.65rem] font-bold uppercase tracking-wider text-muted-foreground">Email</p>
                  <p className="text-xs font-semibold text-foreground sm:text-sm">{contact.email}</p>
                </div>
              </div>
              <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
            </a>
            <a
              href={`https://wa.me/${contact.whatsappRaw || contact.whatsapp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between rounded-xl border border-border/70 bg-card px-4 py-3 shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-lg bg-primary/15 text-foreground">
                  <MessageCircle className="size-4" />
                </span>
                <div>
                  <p className="text-[0.65rem] font-bold uppercase tracking-wider text-muted-foreground">WhatsApp</p>
                  <p className="text-xs font-semibold text-foreground sm:text-sm">{contact.whatsapp}</p>
                </div>
              </div>
              <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
            </a>
            <div className="flex items-center gap-3 rounded-xl border border-border/70 bg-card px-4 py-3 shadow-sm">
              <span className="flex size-9 items-center justify-center rounded-lg bg-primary/15 text-foreground">
                <MapPin className="size-4" />
              </span>
              <div>
                <p className="text-[0.65rem] font-bold uppercase tracking-wider text-muted-foreground">Location</p>
                <p className="text-xs font-semibold text-foreground sm:text-sm">{contact.location}</p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-xl shadow-foreground/5 lg:rounded-3xl">
            <div className="grid lg:grid-cols-5">
              {/* Info panel — compact sidebar */}
              <div className="relative flex flex-col justify-between gap-5 overflow-hidden bg-secondary p-5 text-secondary-foreground sm:p-6 lg:col-span-2 lg:p-7">
                <div className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-primary/10 blur-3xl" />

                <div className="relative">
                  <div className="flex items-center gap-2">
                    <Sparkles className="size-4 text-primary" />
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">Why reach out</span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-secondary-foreground/80 text-pretty">
                    Rent classroom props, order printable packs, or collaborate on a custom DIY teaching aid tailored to your learners.
                  </p>
                </div>

                <ul className="relative space-y-2.5 text-sm">
                  {[
                    'Buy or rent educational materials',
                    'Request custom posters & worksheets',
                    'Book a workshop or collaboration',
                    'Ask about availability in Tunis',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                      <span className="text-secondary-foreground/85">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="relative grid grid-cols-3 gap-2 border-t border-white/10 pt-4">
                  {TRUST_STATS.map((s) => (
                    <div key={s.label} className="text-center">
                      <p className="font-serif text-lg font-bold text-primary">{s.value}</p>
                      <p className="mt-0.5 text-[0.6rem] font-medium uppercase tracking-wide text-secondary-foreground/50">
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="relative flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-xs text-secondary-foreground/75">
                  <Clock className="size-3.5 shrink-0 text-primary" />
                  Replies within 24 hours on weekdays
                </div>
              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                noValidate
                className="flex flex-col gap-3.5 p-5 sm:p-6 lg:col-span-3 lg:p-7"
              >
                {sent && (
                  <div className="flex items-start gap-2.5 rounded-lg border border-primary/30 bg-primary/10 p-3">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                    <div className="text-xs sm:text-sm">
                      <p className="font-semibold text-foreground">Message Sent Successfully!</p>
                      <p className="text-muted-foreground">Farah has received your inquiry in the studio and will respond within 24 hours.</p>
                    </div>
                  </div>
                )}

                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label htmlFor="role" className="mb-1.5 block text-[0.65rem] font-bold uppercase tracking-wider text-foreground">
                      I am a
                    </label>
                    <select
                      id="role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className={selectClass}
                    >
                      {ROLES.map((r) => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="topic" className="mb-1.5 block text-[0.65rem] font-bold uppercase tracking-wider text-foreground">
                      Topic
                    </label>
                    <select
                      id="topic"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className={selectClass}
                    >
                      {TOPICS.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-1.5 block text-[0.65rem] font-bold uppercase tracking-wider text-foreground">
                      Name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Mariam Ben Ali"
                      className={cn(inputClass, errors.name && 'border-destructive')}
                    />
                    {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-1.5 block text-[0.65rem] font-bold uppercase tracking-wider text-foreground">
                      Email *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="mariam@example.com"
                      className={cn(inputClass, errors.email && 'border-destructive')}
                    />
                    {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="mb-1.5 block text-[0.65rem] font-bold uppercase tracking-wider text-foreground">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    required
                    placeholder="Tell me about your students, workshop date, or material request..."
                    className={cn('resize-none', inputClass, errors.message && 'border-destructive')}
                  />
                  {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-50"
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
