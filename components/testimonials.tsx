'use client'

import { useState } from 'react'
import { GraduationCap, MessageSquarePlus, Quote, Send, Star, X, Heart } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { SectionScene } from '@/components/section-scene'
import { usePortfolio } from '@/lib/portfolio-context'
import { useToast } from '@/components/toast-provider'
import { WoodenPeg, ClotheslineRope } from '@/components/cloud-decorations'
import { cn } from '@/lib/utils'

export function Testimonials() {
  const { state, addMessage, addTestimonial } = usePortfolio()
  const { testimonials } = state
  const { toast } = useToast()

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)
  const [authorName, setAuthorName] = useState('')
  const [authorRole, setAuthorRole] = useState('Parent • Sfax')
  const [reviewQuote, setReviewQuote] = useState('')
  const [reviewRating, setReviewRating] = useState<number>(5)
  const [includeRating, setIncludeRating] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const activeTestimonials = testimonials.filter((t) => t.isActive !== false)

  const cardBgs = ['bg-[#FFE68C]', 'bg-[#FFB5B5]', 'bg-[#A7F3D0]', 'bg-[#DDD6FE]', 'bg-[#FED7AA]']
  const pegColors: ('wood' | 'coral' | 'yellow' | 'mint' | 'lavender')[] = [
    'wood',
    'coral',
    'yellow',
    'mint',
    'lavender',
  ]
  const swayAnimations = [
    'animate-clothesline-1',
    'animate-clothesline-2',
    'animate-clothesline-3',
  ]

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!authorName.trim() || !reviewQuote.trim()) return

    setIsSubmitting(true)

    // 1. Add as a pending/live testimonial in state
    addTestimonial({
      name: authorName.trim(),
      role: authorRole.trim(),
      quote: reviewQuote.trim(),
      rating: includeRating ? reviewRating : 0,
      showRating: includeRating,
      isActive: true,
    })

    // 2. Also record in messages inbox for Farah
    addMessage({
      name: authorName.trim(),
      email: 'Feedback Form (In-App)',
      role: authorRole.trim(),
      topic: 'New Testimonial Review',
      message: `"${reviewQuote.trim()}" (Rating: ${includeRating ? `${reviewRating} / 5 Stars` : 'Quote only'})`,
      status: 'unread',
    })

    setIsSubmitting(false)
    setIsReviewModalOpen(false)
    setAuthorName('')
    setReviewQuote('')
    toast('Thank you for your love! Your review has been published 🌸')
  }

  return (
    <section id="testimonials" className="section-shell relative overflow-hidden bg-transparent py-10 sm:py-14 lg:py-16">
      <SectionScene theme="testimonials" pattern="dots" />

      <div className="section-inner section-stack">
        <Reveal>
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:items-end">
            <SectionHeading
              number="06"
              eyebrow="Kind Words &amp; Love 💖"
              title="Loved by students, parents & fellow educators"
              intro="Real feedback from families and teachers who have used Farah's props and workshops across Sfax and Tunisia."
              align="left"
              typewriterIntro
            />

            <button
              type="button"
              onClick={() => setIsReviewModalOpen(true)}
              className="cute-btn bg-[#FFC837] px-5 py-2.5 text-xs font-black text-[#2D1F1D] hover:bg-[#FFB800] sm:text-sm"
            >
              <MessageSquarePlus className="size-4 stroke-[2.5]" />
              <span>Leave a Review 🌸</span>
            </button>
          </div>
        </Reveal>

        {/* Clothesline Rope with Hanging Cards Grid */}
        <div className="relative pt-6">
          {/* Single continuous smooth Clothesline Rope running directly through clothespin notches */}
          <ClotheslineRope className="top-1 opacity-95" />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 pt-4">
            {activeTestimonials.map((t, i) => {
              const hasStars = t.showRating !== false && (t.rating ?? 0) > 0
              const pegColor = pegColors[i % pegColors.length]
              const swayAnim = swayAnimations[i % swayAnimations.length]

              return (
                <Reveal key={t.id || i} delay={i * 60}>
                  {/* Hanging Clothesline Card Container with Physics Sway Animation */}
                  <div
                    className={cn(
                      'group relative h-full pt-5 transition-all duration-300',
                      swayAnim,
                      'hover:!transform-none hover:-translate-y-2',
                    )}
                  >
                    {/* 3D Handcrafted Wooden Clothespin clamping the card directly onto the rope */}
                    <WoodenPeg color={pegColor} size={36} className="left-1/2 -top-4.5" />

                    <figure
                      className={`relative flex h-full flex-col justify-between overflow-hidden rounded-[2.4rem_1.6rem_2.2rem_1.8rem] border-3 border-[#2D1F1D] p-5 shadow-[5px_5px_0px_#2D1F1D] transition-all duration-300 group-hover:shadow-[9px_9px_0px_#2D1F1D] ${cardBgs[i % cardBgs.length]} sm:p-6`}
                    >
                      {/* Inner dashed craft stitch border */}
                      <div className="pointer-events-none absolute inset-2 rounded-[2rem_1.2rem_1.8rem_1.4rem] border-2 border-dashed border-[#2D1F1D]/20" />

                      {/* Top clothesline grip notch line */}
                      <div className="absolute left-1/2 -translate-x-1/2 top-0 h-1.5 w-12 rounded-b-md bg-[#2D1F1D]/20 z-10" />

                      <div>
                        <div className="flex items-center justify-between">
                          {hasStars ? (
                            <div className="flex gap-1 text-[#FFC837]">
                              {Array.from({ length: t.rating || 5 }).map((_, s) => (
                                <Star key={s} className="size-4.5 fill-[#FFC837] stroke-[#2D1F1D] stroke-[1.5]" />
                              ))}
                            </div>
                          ) : (
                            <span className="rounded-full border border-[#2D1F1D] bg-[#A7F3D0] px-2.5 py-0.5 text-[0.68rem] font-black uppercase tracking-wider text-[#2D1F1D]">
                              Verified Review ✨
                            </span>
                          )}
                          <Quote className="size-6 text-[#FF7D6B] fill-[#FF7D6B]/20" />
                        </div>

                        <blockquote className="mt-4 font-sans text-sm font-bold leading-relaxed text-[#2D1F1D] sm:text-base text-pretty">
                          &ldquo;{t.quote}&rdquo;
                        </blockquote>
                      </div>

                      <figcaption className="mt-6 flex items-center gap-3 border-t-2 border-[#2D1F1D]/10 pt-4">
                        <div className="flex size-10 items-center justify-center rounded-2xl border-2 border-[#2D1F1D] bg-[#FFE68C] text-xs font-black text-[#2D1F1D] shadow-xs">
                          {t.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-sans text-sm font-black text-[#2D1F1D]">{t.name}</p>
                          <p className="text-xs font-bold text-[#6B5550]">{t.role}</p>
                        </div>
                      </figcaption>
                    </figure>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>

      {/* Review Submission Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2D1F1D]/80 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-[2.5rem] border-3 border-[#2D1F1D] bg-white p-6 shadow-[10px_10px_0px_#2D1F1D] sm:p-8">
            <div className="flex items-center justify-between border-b-2 border-[#2D1F1D] pb-4">
              <div className="flex items-center gap-2">
                <span className="flex size-9 items-center justify-center rounded-2xl border-2 border-[#2D1F1D] bg-[#FFC837] text-[#2D1F1D]">
                  <Heart className="size-4.5 fill-[#FF7D6B] text-[#2D1F1D]" />
                </span>
                <h3 className="font-sans text-xl font-black text-[#2D1F1D]">Leave an Endorsement</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsReviewModalOpen(false)}
                className="flex size-8 items-center justify-center rounded-full border-2 border-[#2D1F1D] bg-[#FAF5EC] text-[#2D1F1D] hover:bg-[#FF7D6B] hover:text-white"
              >
                <X className="size-4" />
              </button>
            </div>

            <form onSubmit={handleReviewSubmit} className="mt-5 space-y-4">
              <div>
                <label className="mb-1 block text-xs font-black text-[#2D1F1D]">Your Name</label>
                <input
                  type="text"
                  required
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="e.g. Samira Trabelsi"
                  className="w-full rounded-2xl border-2 border-[#2D1F1D] bg-[#FAF5EC] p-3 text-xs font-bold text-[#2D1F1D] outline-none focus:bg-white focus:ring-2 focus:ring-[#FFC837]"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-black text-[#2D1F1D]">Your Role / Relationship</label>
                <input
                  type="text"
                  required
                  value={authorRole}
                  onChange={(e) => setAuthorRole(e.target.value)}
                  placeholder="e.g. Parent of 5th Grader • Primary Teacher in Sfax"
                  className="w-full rounded-2xl border-2 border-[#2D1F1D] bg-[#FAF5EC] p-3 text-xs font-bold text-[#2D1F1D] outline-none focus:bg-white focus:ring-2 focus:ring-[#FFC837]"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-black text-[#2D1F1D]">Your Experience with Farah</label>
                <textarea
                  rows={3}
                  required
                  value={reviewQuote}
                  onChange={(e) => setReviewQuote(e.target.value)}
                  placeholder="How did Farah's props, teaching, or workshops benefit your learner?"
                  className="w-full resize-none rounded-2xl border-2 border-[#2D1F1D] bg-[#FAF5EC] p-3 text-xs font-bold text-[#2D1F1D] outline-none focus:bg-white focus:ring-2 focus:ring-[#FFC837]"
                />
              </div>

              <div className="rounded-2xl border-2 border-[#2D1F1D] bg-[#FFE68C] p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black text-[#2D1F1D]">Include Star Rating?</label>
                  <input
                    type="checkbox"
                    checked={includeRating}
                    onChange={(e) => setIncludeRating(e.target.checked)}
                    className="size-4 rounded-md border-2 border-[#2D1F1D] text-[#FFC837] focus:ring-[#FFC837] cursor-pointer"
                  />
                </div>

                {includeRating && (
                  <div className="flex items-center gap-2 pt-1">
                    <span className="text-xs font-bold text-[#2D1F1D]">Rating:</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewRating(star)}
                          className="p-0.5 hover:scale-125 transition-transform cursor-pointer"
                        >
                          <Star
                            className={`size-5 ${
                              star <= reviewRating
                                ? 'fill-[#FFC837] stroke-[#2D1F1D] stroke-[1.5]'
                                : 'text-[#2D1F1D]/30'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                    <span className="text-xs font-black text-[#2D1F1D]">({reviewRating} / 5 Stars)</span>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3 border-t-2 border-[#2D1F1D]/10 pt-4">
                <button
                  type="button"
                  onClick={() => setIsReviewModalOpen(false)}
                  className="cute-btn bg-[#FAF5EC] px-4 py-2.5 text-xs font-bold text-[#2D1F1D]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="cute-btn bg-[#FF7D6B] px-6 py-2.5 text-xs font-black text-white hover:bg-[#FF6B6B]"
                >
                  <Send className="size-3.5" />
                  <span>{isSubmitting ? 'Posting...' : 'Submit Endorsement 🌸'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  )
}
