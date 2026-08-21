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
import {
  PushPin,
  FloatingCloud,
  DoodleEnvelope,
  SmilingFlower,
  SmilingStar,
  PastelBalloon,
} from '@/components/cloud-decorations'

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
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<Errors>({})
  const [sent, setSent] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateField = (field: 'name' | 'email' | 'message', val: string): string | undefined => {
    if (field === 'name') {
      if (!val.trim()) return 'Please enter your name.'
      if (val.trim().length < 2) return 'Name must be at least 2 characters.'
    }
    if (field === 'email') {
      if (!val.trim()) return 'Please enter your email address.'
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim())) return 'Please enter a valid email address (e.g. name@example.com).'
    }
    if (field === 'message') {
      if (!val.trim()) return 'Please enter a message.'
      if (val.trim().length < 6) return 'Message should be at least 6 characters.'
    }
    return undefined
  }

  const handleChange = (field: 'name' | 'email' | 'message', val: string) => {
    setFormData((prev) => ({ ...prev, [field]: val }))
    if (errors[field]) {
      const err = validateField(field, val)
      setErrors((prev) => ({ ...prev, [field]: err }))
    }
  }

  const handleBlur = (field: 'name' | 'email' | 'message') => {
    const err = validateField(field, formData[field])
    setErrors((prev) => ({ ...prev, [field]: err }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const nameErr = validateField('name', formData.name)
    const emailErr = validateField('email', formData.email)
    const messageErr = validateField('message', formData.message)

    const nextErrs: Errors = {}
    if (nameErr) nextErrs.name = nameErr
    if (emailErr) nextErrs.email = emailErr
    if (messageErr) nextErrs.message = messageErr

    setErrors(nextErrs)
    if (Object.keys(nextErrs).length > 0) {
      toast('Please check the required fields in the form ✍️')
      return
    }

    setErrors({})
    setIsSubmitting(true)

    try {
      await addMessage({
        name: formData.name.trim(),
        email: formData.email.trim(),
        role,
        topic,
        message: formData.message.trim(),
      })

      setSent(true)
      toast('Message sent! 💌 Thank you for reaching out to Farah! She will reply within 24 hours.')
      setFormData({ name: '', email: '', message: '' })
    } catch {
      toast('Could not send message. Please try sending via WhatsApp directly!')
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputClass =
    'w-full rounded-2xl border-[1.5px] border-[#2D1F1D]/35 bg-[#FAF5EC] px-4 py-2.5 text-xs font-bold text-[#2D1F1D] outline-none transition-all placeholder:text-[#6B5550]/60 focus:border-[#FF7D6B] focus:bg-white focus:shadow-[2px_2px_0px_rgba(45,31,29,0.2)] sm:text-sm'

  const selectClass =
    'w-full appearance-none rounded-2xl border-[1.5px] border-[#2D1F1D]/35 bg-[#FAF5EC] p-3 text-xs font-bold text-[#2D1F1D] outline-none transition-all focus:bg-white focus:ring-2 focus:ring-[#FFC837] cursor-pointer'
  return (
    <section id="contact" className="section-shell relative bg-white py-10 sm:py-14 lg:py-16 overflow-hidden">
      {/* Happy Stationary Decorations */}
      <FloatingCloud mood="laughing" size="md" className="top-6 left-8 opacity-60 hidden md:block" />
      <DoodleEnvelope size={52} className="top-12 right-12 opacity-75 hidden sm:block" />
      <SmilingStar size={34} color="#FFC837" className="bottom-14 left-8 opacity-75 hidden sm:block" />
      <SmilingFlower size={42} color="#FFB5B5" className="bottom-16 right-10 opacity-70 hidden md:block" />
      <PastelBalloon color="#FF7D6B" size={44} className="top-1/2 left-4 opacity-70 hidden xl:block" />

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
          <div className="grid grid-cols-1 gap-3.5 sm:gap-4 sm:grid-cols-3">
            {/* 1. Email Card */}
            <div className="group relative pt-3">
              <PushPin color="red" size={22} className="left-1/2 top-3 z-30" />
              <a
                href={`mailto:${contact.email}`}
                className="relative flex items-center justify-between rounded-[1.6rem_1.2rem_1.8rem_1.2rem] sm:rounded-[2rem_1.4rem_2.2rem_1.4rem] border-[1.5px] border-[#3E251E]/40 bg-[#FFE68C] p-3.5 sm:p-4 shadow-[0_6px_16px_rgba(45,31,29,0.05),2.5px_2.5px_0px_rgba(45,31,29,0.6)] sm:shadow-[0_8px_20px_rgba(45,31,29,0.06),3px_3px_0px_rgba(45,31,29,0.65)] transition-all hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(45,31,29,0.1),4.5px_4.5px_0px_rgba(45,31,29,0.75)] rotate-0 sm:rotate-[-0.6deg] touch-manipulation"
              >
                {/* Inner Dashed Stitch Border */}
                <div className="pointer-events-none absolute inset-1.5 rounded-[1.3rem_0.9rem_1.5rem_0.9rem] sm:rounded-[1.6rem_1rem_1.8rem_1rem] border border-dashed border-[#2D1F1D]/20" />

                <div className="relative flex items-center gap-2.5 sm:gap-3">
                  <span className="flex size-9 sm:size-10 items-center justify-center rounded-xl sm:rounded-2xl border border-[#2D1F1D]/30 bg-white text-[#2D1F1D] shadow-xs">
                    <Mail className="size-4.5 sm:size-5 text-[#FF7D6B]" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[0.62rem] sm:text-[0.68rem] font-black uppercase tracking-wider text-[#6B5550]">Email Farah</p>
                    <p className="text-xs font-black text-[#2D1F1D] sm:text-sm truncate">{contact.email}</p>
                  </div>
                </div>
                <ArrowRight className="size-4 stroke-[2.5] text-[#2D1F1D] shrink-0" />
              </a>
            </div>

            {/* 2. WhatsApp Card */}
            {(contact.whatsapp || contact.whatsappRaw) && (
              <div className="group relative pt-3">
                <PushPin color="mint" size={22} className="left-1/2 top-3 z-30" />
                <a
                  href={`https://wa.me/${(contact.whatsappRaw || contact.whatsapp).replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative flex items-center justify-between rounded-[1.4rem_1.8rem_1.3rem_1.8rem] sm:rounded-[1.6rem_2.2rem_1.5rem_2.4rem] border-[1.5px] border-[#3E251E]/40 bg-[#A7F3D0] p-3.5 sm:p-4 shadow-[0_6px_16px_rgba(45,31,29,0.05),2.5px_2.5px_0px_rgba(45,31,29,0.6)] sm:shadow-[0_8px_20px_rgba(45,31,29,0.06),3px_3px_0px_rgba(45,31,29,0.65)] transition-all hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(45,31,29,0.1),4.5px_4.5px_0px_rgba(45,31,29,0.75)] rotate-0 sm:rotate-[0.6deg] touch-manipulation"
                >
                  {/* Inner Dashed Stitch Border */}
                  <div className="pointer-events-none absolute inset-1.5 rounded-[1.1rem_1.5rem_1rem_1.5rem] sm:rounded-[1.2rem_1.8rem_1.1rem_2rem] border border-dashed border-[#2D1F1D]/20" />

                  <div className="relative flex items-center gap-2.5 sm:gap-3">
                    <span className="flex size-9 sm:size-10 items-center justify-center rounded-xl sm:rounded-2xl border border-[#2D1F1D]/30 bg-white text-[#2D1F1D] shadow-xs">
                      <MessageCircle className="size-4.5 sm:size-5 text-[#10B981]" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[0.62rem] sm:text-[0.68rem] font-black uppercase tracking-wider text-[#6B5550]">WhatsApp Direct</p>
                      <p className="text-xs font-black text-[#2D1F1D] sm:text-sm truncate">{contact.whatsapp}</p>
                    </div>
                  </div>
                  <ArrowRight className="size-4 stroke-[2.5] text-[#2D1F1D] shrink-0" />
                </a>
              </div>
            )}

            {/* 3. Studio Card */}
            <div className="group relative pt-3">
              <PushPin color="purple" size={22} className="left-1/2 top-3 z-30" />
              <div className="relative flex items-center gap-2.5 sm:gap-3 rounded-[1.8rem_1.3rem_1.6rem_1.4rem] sm:rounded-[2.2rem_1.5rem_2rem_1.8rem] border-[1.5px] border-[#3E251E]/40 bg-[#DDD6FE] p-3.5 sm:p-4 shadow-[0_6px_16px_rgba(45,31,29,0.05),2.5px_2.5px_0px_rgba(45,31,29,0.6)] sm:shadow-[0_8px_20px_rgba(45,31,29,0.06),3px_3px_0px_rgba(45,31,29,0.65)] rotate-0 sm:rotate-[-0.4deg]">
                {/* Inner Dashed Stitch Border */}
                <div className="pointer-events-none absolute inset-1.5 rounded-[1.5rem_1rem_1.3rem_1.1rem] sm:rounded-[1.8rem_1.1rem_1.6rem_1.4rem] border border-dashed border-[#2D1F1D]/20" />

                <span className="relative flex size-9 sm:size-10 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl border border-[#2D1F1D]/30 bg-white text-[#2D1F1D] shadow-xs">
                  <MapPin className="size-4.5 sm:size-5 text-[#8B5CF6]" />
                </span>
                <div className="relative min-w-0">
                  <p className="text-[0.62rem] sm:text-[0.68rem] font-black uppercase tracking-wider text-[#6B5550]">Teaching Studio</p>
                  <p className="text-xs font-black text-[#2D1F1D] sm:text-sm truncate">{contact.location}</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Master Contact Envelope Box with organic craft shape */}
        <Reveal delay={80}>
          <div className="group relative pt-3">
            {/* 3D PushPin piercing into envelope card */}
            <PushPin color="coral" size={22} className="left-1/2 top-3 z-30" />

            <div className="relative overflow-hidden rounded-[1.6rem_1.3rem_1.8rem_1.4rem] sm:rounded-[2.8rem_1.8rem_2.6rem_2rem] border-[1.5px] border-[#3E251E]/40 bg-[#FAF5EC] shadow-[0_10px_28px_rgba(45,31,29,0.06),3px_3px_0px_rgba(45,31,29,0.6)] sm:shadow-[0_14px_32px_rgba(45,31,29,0.08),4px_4px_0px_rgba(45,31,29,0.6)]">
              <div className="grid lg:grid-cols-5">
                {/* Info panel */}
                <div className="relative flex flex-col justify-between gap-4 sm:gap-5 p-4 sm:p-6 bg-[#FFE68C] border-b lg:border-b-0 lg:border-r border-[#2D1F1D]/20 lg:col-span-2">

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
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        onBlur={() => handleBlur('name')}
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                        placeholder="Mariam Ben Ali"
                        className={cn(inputClass, errors.name && 'border-[#FF5A5A] bg-[#FFF5F5]')}
                      />
                      {errors.name && (
                        <p id="name-error" className="mt-1 text-xs font-bold text-[#FF5A5A] flex items-center gap-1">
                          <span>⚠️</span> {errors.name}
                        </p>
                      )}
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
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        onBlur={() => handleBlur('email')}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                        placeholder="mariam@example.com"
                        className={cn(inputClass, errors.email && 'border-[#FF5A5A] bg-[#FFF5F5]')}
                      />
                      {errors.email && (
                        <p id="email-error" className="mt-1 text-xs font-bold text-[#FF5A5A] flex items-center gap-1">
                          <span>⚠️</span> {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label htmlFor="message" className="block text-xs font-black uppercase tracking-wider text-[#2D1F1D]">
                        Message *
                      </label>
                      <span className="text-[0.68rem] font-bold text-[#6B5550]">
                        {formData.message.length}/500
                      </span>
                    </div>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      maxLength={500}
                      required
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      onBlur={() => handleBlur('message')}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                      placeholder="Tell me about your students, workshop date, or material request..."
                      className={cn('resize-none', inputClass, errors.message && 'border-[#FF5A5A] bg-[#FFF5F5]')}
                    />
                    {errors.message && (
                      <p id="message-error" className="mt-1 text-xs font-bold text-[#FF5A5A] flex items-center gap-1">
                        <span>⚠️</span> {errors.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="cute-btn w-full bg-[#FF7D6B] py-3.5 text-sm font-black text-white hover:bg-[#FF6B6B] disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <Send className={cn('size-4', isSubmitting && 'animate-spin')} />
                    <span>{isSubmitting ? 'Sending Message to Farah...' : 'Send Message to Farah 🚀'}</span>
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
