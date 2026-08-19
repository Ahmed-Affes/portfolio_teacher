'use client'

import { useState } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  Sparkles,
  Heart,
} from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { SectionScene } from '@/components/section-scene'
import { usePortfolio } from '@/lib/portfolio-context'
import { useToast } from '@/components/toast-provider'
import { cn } from '@/lib/utils'
import { PushPin } from '@/components/cloud-decorations'

type Errors = Partial<Record<'name' | 'email' | 'message', string>>

const ROLES = ['Student 🎒', 'Parent 💖', 'Teacher / Educator 📚', 'Other 🎨']
const TOPICS = ['Buy materials 🛒', 'Rent for workshop 🔄', 'Custom project ✂️', 'General question 🌸']

const TRUST_STATS = [
  { value: '<24h', label: 'Response time' },
  { value: '900+', label: 'Happy Learners' },
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

    const fd = new FormData(form)

    const name = String(fd.get('name') || '').trim()
    const email = String(fd.get('email') || '').trim()
    const message = String(fd.get('message') || '').trim()

    const errs: Errors = {}
    if (!name) errs.name = 'Please enter your name'
    if (!email || !email.includes('@')) errs.email = 'Please enter a valid email address'
    if (!message) errs.message = 'Please write a message'

    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    setErrors({})
    setIsSubmitting(true)

    try {
      await addMessage({
        name,
        email,
        role,
        topic,
        message,
      })

      toast('Message sent! 💌 Thank you for reaching out to Farah! She will reply within 24 hours.')

      form.reset()
    } catch {
      toast('Could not send message. Please try sending an email or message via WhatsApp directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputClass =
    'w-full rounded-2xl border-2 border-[#2D1F1D] bg-[#FAF5EC] px-4 py-2.5 text-xs font-bold text-[#2D1F1D] outline-none transition-all placeholder:text-[#6B5550]/60 focus:border-[#FF7D6B] focus:bg-white focus:shadow-[2px_2px_0px_#2D1F1D] sm:text-sm'

  const selectClass =
    'w-full appearance-none rounded-2xl border-2 border-[#2D1F1D] bg-[#FAF5EC] p-3 text-xs font-bold text-[#2D1F1D] outline-none transition-all focus:bg-white focus:ring-2 focus:ring-[#FFC837] cursor-pointer'

  return (
    <section id="contact" className="section-shell relative bg-transparent py-10 sm:py-14 lg:py-16 overflow-hidden">
      <SectionScene theme="contact" pattern="dots" />

      <div className="section-inner section-stack">
        <Reveal>
          <SectionHeading
            number="08"
            eyebrow="Say Hello &amp; Collaborate 💌"
            title="Let’s create joyful learning experiences"
            intro="Have a project in mind, need custom teaching materials, or want to host a hands-on crafting workshop? Reach out today!"
            align="center"
            typewriterIntro
          />
        </Reveal>

        {/* Quick Contact Action Cards with organic craft radii & dashed stitch framing */}
        <Reveal delay={40}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {/* 1. Email Card */}
            <div className="group relative">
              <PushPin color="red" className="left-1/2 -top-1" />
              <a
                href={`mailto:${contact.email}`}
                className="relative flex items-center justify-between rounded-[2rem_1.4rem_2.2rem_1.4rem] border-3 border-[#2D1F1D] bg-[#FFE68C] p-4 shadow-[5px_5px_0px_#2D1F1D] transition-all hover:-translate-y-1 hover:shadow-[7px_7px_0px_#2D1F1D] rotate-[-0.6deg]"
              >
                {/* Inner Dashed Stitch Border */}
                <div className="pointer-events-none absolute inset-1.5 rounded-[1.6rem_1rem_1.8rem_1rem] border-2 border-dashed border-[#2D1F1D]/25" />

                <div className="relative flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-2xl border-2 border-[#2D1F1D] bg-white text-[#2D1F1D] shadow-xs">
                    <Mail className="size-5 text-[#FF7D6B]" />
                  </span>
                  <div>
                    <p className="text-[0.68rem] font-black uppercase tracking-wider text-[#6B5550]">Email Farah</p>
                    <p className="text-xs font-black text-[#2D1F1D] sm:text-sm">{contact.email}</p>
                  </div>
                </div>
                <ArrowRight className="size-4 stroke-[2.5] text-[#2D1F1D]" />
              </a>
            </div>

            {/* 2. WhatsApp Card */}
            {(contact.whatsapp || contact.whatsappRaw) && (
              <div className="group relative">
                <PushPin color="mint" className="left-1/2 -top-1" />
                <a
                  href={`https://wa.me/${(contact.whatsappRaw || contact.whatsapp).replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative flex items-center justify-between rounded-[1.6rem_2.2rem_1.5rem_2.4rem] border-3 border-[#2D1F1D] bg-[#A7F3D0] p-4 shadow-[5px_5px_0px_#2D1F1D] transition-all hover:-translate-y-1 hover:shadow-[7px_7px_0px_#2D1F1D] rotate-[0.6deg]"
                >
                  {/* Inner Dashed Stitch Border */}
                  <div className="pointer-events-none absolute inset-1.5 rounded-[1.2rem_1.8rem_1.1rem_2rem] border-2 border-dashed border-[#2D1F1D]/25" />

                  <div className="relative flex items-center gap-3">
                    <span className="flex size-10 items-center justify-center rounded-2xl border-2 border-[#2D1F1D] bg-white text-[#2D1F1D] shadow-xs">
                      <MessageCircle className="size-5 text-[#10B981]" />
                    </span>
                    <div>
                      <p className="text-[0.68rem] font-black uppercase tracking-wider text-[#6B5550]">WhatsApp Direct</p>
                      <p className="text-xs font-black text-[#2D1F1D] sm:text-sm">{contact.whatsapp}</p>
                    </div>
                  </div>
                  <ArrowRight className="size-4 stroke-[2.5] text-[#2D1F1D]" />
                </a>
              </div>
            )}

            {/* 3. Studio Card */}
            <div className="group relative">
              <PushPin color="purple" className="left-1/2 -top-1" />
              <div className="relative flex items-center gap-3 rounded-[2.2rem_1.5rem_2rem_1.8rem] border-3 border-[#2D1F1D] bg-[#DDD6FE] p-4 shadow-[5px_5px_0px_#2D1F1D] rotate-[-0.4deg]">
                {/* Inner Dashed Stitch Border */}
                <div className="pointer-events-none absolute inset-1.5 rounded-[1.8rem_1.1rem_1.6rem_1.4rem] border-2 border-dashed border-[#2D1F1D]/25" />

                <span className="relative flex size-10 shrink-0 items-center justify-center rounded-2xl border-2 border-[#2D1F1D] bg-white text-[#2D1F1D] shadow-xs">
                  <MapPin className="size-5 text-[#8B5CF6]" />
                </span>
                <div className="relative">
                  <p className="text-[0.68rem] font-black uppercase tracking-wider text-[#6B5550]">Teaching Studio</p>
                  <p className="text-xs font-black text-[#2D1F1D] sm:text-sm">{contact.location}</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Master Contact Envelope Box with organic craft shape */}
        <Reveal delay={80}>
          <div className="group relative">
            {/* 3D PushPin on unclipped outer wrapper */}
            <PushPin color="coral" className="left-1/2 -top-1" />

            <div className="relative overflow-hidden rounded-[2.8rem_1.8rem_2.6rem_2rem] border-3 border-[#2D1F1D] bg-[#FAF5EC] shadow-[8px_8px_0px_#2D1F1D]">
              <div className="grid lg:grid-cols-5">
                {/* Info panel */}
                <div className="relative flex flex-col justify-between gap-5 p-5 sm:p-6 bg-[#FFE68C] border-b-2 lg:border-b-0 lg:border-r-2 border-[#2D1F1D] lg:col-span-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <Sparkles className="size-4.5 text-[#FF7D6B] fill-[#FF7D6B]" />
                      <span className="text-xs font-black uppercase tracking-wider text-[#2D1F1D]">
                        Why Reach Out
                      </span>
                    </div>
                    <p className="mt-3 text-sm font-bold leading-relaxed text-[#6B5550]">
                    Rent classroom props, order printable packs, or collaborate on a custom DIY teaching aid tailored to your learners.
                  </p>
                </div>

                <ul className="space-y-3 text-xs font-bold text-[#2D1F1D] sm:text-sm">
                  {[
                    '🎨 Buy or rent handcrafted materials',
                    '📝 Request custom worksheets & quest packs',
                    '🌸 Book a teacher training workshop',
                    '📍 Local pickup or delivery across Sfax',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="grid grid-cols-3 gap-2 border-t-2 border-[#2D1F1D]/10 pt-4">
                  {TRUST_STATS.map((s) => (
                    <div key={s.label} className="text-center rounded-xl bg-white border border-[#2D1F1D] p-2 shadow-xs">
                      <p className="font-sans text-base font-black text-[#2D1F1D]">{s.value}</p>
                      <p className="text-[0.6rem] font-bold text-[#6B5550]">
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 rounded-2xl border-2 border-[#2D1F1D] bg-white px-3.5 py-2.5 text-xs font-bold text-[#2D1F1D]">
                  <Clock className="size-4 text-[#FF7D6B]" />
                  <span>Replies within 24 hours with warmth &amp; care!</span>
                </div>
              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                noValidate
                className="flex flex-col gap-4 p-6 sm:p-8 bg-white lg:col-span-3"
              >
                {sent && (
                  <div className="flex items-start gap-3 rounded-2xl border-2 border-[#2D1F1D] bg-[#A7F3D0] p-4 text-[#2D1F1D] shadow-[3px_3px_0px_#2D1F1D]">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 stroke-[3]" />
                    <div className="text-xs sm:text-sm font-bold">
                      <p className="font-black text-sm">Message Sent Successfully! 🌸</p>
                      <p className="text-[#2D1F1D]/80">Farah has received your inquiry in the studio and will respond within 24 hours.</p>
                    </div>
                  </div>
                )}

                <div className="grid gap-3.5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="role" className="mb-1.5 block text-xs font-black uppercase tracking-wider text-[#2D1F1D]">
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
                    <label htmlFor="topic" className="mb-1.5 block text-xs font-black uppercase tracking-wider text-[#2D1F1D]">
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

                <div className="grid gap-3.5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-1.5 block text-xs font-black uppercase tracking-wider text-[#2D1F1D]">
                      Name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Mariam Ben Ali"
                      className={cn(inputClass, errors.name && 'border-[#FF5A5A]')}
                    />
                    {errors.name && <p className="mt-1 text-xs font-bold text-[#FF5A5A]">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-1.5 block text-xs font-black uppercase tracking-wider text-[#2D1F1D]">
                      Email *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="mariam@example.com"
                      className={cn(inputClass, errors.email && 'border-[#FF5A5A]')}
                    />
                    {errors.email && <p className="mt-1 text-xs font-bold text-[#FF5A5A]">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="mb-1.5 block text-xs font-black uppercase tracking-wider text-[#2D1F1D]">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    required
                    placeholder="Tell me about your students, workshop date, or material request..."
                    className={cn('resize-none', inputClass, errors.message && 'border-[#FF5A5A]')}
                  />
                  {errors.message && <p className="mt-1 text-xs font-bold text-[#FF5A5A]">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="cute-btn w-full bg-[#FF7D6B] py-3.5 text-sm font-black text-white hover:bg-[#FF6B6B]"
                >
                  <Send className="size-4" />
                  <span>{isSubmitting ? 'Sending Message...' : 'Send Message to Farah 🚀'}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </Reveal>
      </div>
    </section>
  )
}
