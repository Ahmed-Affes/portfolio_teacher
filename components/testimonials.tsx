'use client'

import { useState } from 'react'
import { GraduationCap, MessageSquarePlus, Quote, Send, Star, X } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { usePortfolio } from '@/lib/portfolio-context'
import { useToast } from '@/components/toast-provider'
import { submitContactMessage } from '@/lib/supabase'

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

    await submitContactMessage({
      name: authorName.trim(),
      email: 'Feedback Form',
      role: authorRole.trim(),
      topic: 'Community Testimonial',
      message: reviewQuote.trim(),
      status: 'unread',
    })

    setIsSubmitting(false)
    setIsReviewModalOpen(false)
    setAuthorName('')
    setReviewQuote('')
    toast('Thank you for your endorsement! Your review has been added.')
  }

  return (
    <section id="testimonials" className="section-shell relative overflow-hidden bg-muted/40">
      <div className="section-inner section-stack">
        <Reveal>
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:items-end">
            <SectionHeading
              number="06"
              eyebrow="Community Endorsements"
              title="Loved by students, parents & fellow educators"
              intro="Real feedback from families and teachers who have used Farah's props and workshops across Sfax and Tunisia."
              align="left"
            />

            <button
              type="button"
              onClick={() => setIsReviewModalOpen(true)}
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-5 py-2.5 text-xs font-semibold text-foreground transition-all hover:bg-primary hover:text-primary-foreground hover:shadow-md sm:text-sm"
            >
              <MessageSquarePlus className="size-4 text-primary" />
              Leave a Review / Endorsement
            </button>
          </div>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
          {activeTestimonials.map((t, i) => {
            const hasStars = t.showRating !== false && (t.rating ?? 0) > 0

            return (
              <Reveal key={t.id || i} delay={i * 60}>
                <figure className="card-shine group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border/75 bg-card p-6 shadow-sm transform-gpu transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 will-change-transform sm:p-7">
                  <div>
                    <div className="flex items-center justify-between">
                      {hasStars ? (
                        <div className="flex gap-1 text-primary">
                          {Array.from({ length: t.rating || 5 }).map((_, s) => (
                            <Star key={s} className="size-4 fill-current" />
                          ))}
                        </div>
                      ) : (
                        <span className="rounded-md bg-muted px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-muted-foreground">
                          Verified Feedback
                        </span>
                      )}
                      <Quote className="size-6 text-primary/40 transition-colors group-hover:text-primary" />
                    </div>

                    <blockquote className="mt-4 font-serif text-sm leading-relaxed text-foreground sm:text-base text-pretty">
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>
                  </div>

                  <figcaption className="mt-6 flex items-center gap-3 border-t border-border/60 pt-4">
                    <div className="flex size-10 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-foreground ring-1 ring-primary/30">
                      {t.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-serif text-sm font-semibold text-foreground">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </figcaption>
                </figure>
              </Reveal>
            )
          })}
        </div>
      </div>

      {/* IN-APP REVIEW SUBMISSION MODAL */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl border border-border/80 bg-card p-6 shadow-2xl sm:p-8">
            <div className="flex items-center justify-between border-b border-border/60 pb-3.5">
              <div className="flex items-center gap-2">
                <span className="flex size-8 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <Star className="size-4 fill-current" />
                </span>
                <h3 className="font-serif text-lg font-bold">Leave an Endorsement</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsReviewModalOpen(false)}
                className="rounded-full p-1.5 hover:bg-muted"
              >
                <X className="size-4" />
              </button>
            </div>

            <form onSubmit={handleReviewSubmit} className="mt-4 space-y-4">
              <div>
                <label className="mb-1 block text-xs font-semibold">Your Name</label>
                <input
                  type="text"
                  required
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="e.g. Samira Trabelsi"
                  className="w-full rounded-xl border border-border bg-background p-2.5 text-xs text-foreground outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold">Your Role / Relationship</label>
                <input
                  type="text"
                  required
                  value={authorRole}
                  onChange={(e) => setAuthorRole(e.target.value)}
                  placeholder="e.g. Parent of 5th Grader • Primary Teacher in Sfax"
                  className="w-full rounded-xl border border-border bg-background p-2.5 text-xs text-foreground outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold">Your Endorsement / Experience</label>
                <textarea
                  rows={3}
                  required
                  value={reviewQuote}
                  onChange={(e) => setReviewQuote(e.target.value)}
                  placeholder="How did Farah's props, teaching, or workshops benefit your learner?"
                  className="w-full resize-none rounded-xl border border-border bg-background p-2.5 text-xs text-foreground outline-none focus:border-primary"
                />
              </div>

              <div className="rounded-xl border border-border bg-muted/20 p-3.5 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold">Include Star Rating?</label>
                  <input
                    type="checkbox"
                    checked={includeRating}
                    onChange={(e) => setIncludeRating(e.target.checked)}
                    className="size-4 rounded text-primary focus:ring-primary cursor-pointer"
                  />
                </div>

                {includeRating && (
                  <div className="flex items-center gap-2 pt-1">
                    <span className="text-xs text-muted-foreground">Rating:</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewRating(star)}
                          className="p-0.5 hover:scale-110 transition-transform"
                        >
                          <Star
                            className={`size-5 ${
                              star <= reviewRating ? 'fill-primary text-primary' : 'text-muted-foreground/40'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                    <span className="text-xs font-bold text-primary">({reviewRating} / 5)</span>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-2.5 border-t border-border/60 pt-3.5">
                <button
                  type="button"
                  onClick={() => setIsReviewModalOpen(false)}
                  className="rounded-xl border border-border px-4 py-2 text-xs font-semibold hover:bg-muted"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-5 py-2 text-xs font-semibold text-primary-foreground shadow-md hover:shadow-lg disabled:opacity-50"
                >
                  <Send className="size-3.5" />
                  {isSubmitting ? 'Posting...' : 'Submit Endorsement'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  )
}
