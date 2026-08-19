'use client'

import { SplitReveal } from '@/components/split-reveal'
import { TypewriterText } from '@/components/typewriter-text'
import { cn } from '@/lib/utils'

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'left',
  number,
  className,
  dark = false,
  animate = true,
  typewriterIntro = false,
}: {
  eyebrow: string
  title: string
  intro?: string
  align?: 'left' | 'center'
  number?: string
  className?: string
  dark?: boolean
  animate?: boolean
  typewriterIntro?: boolean
}) {
  const eyebrowBlock = (
    <div
      className={cn(
        'flex items-center gap-2.5',
        align === 'center' && 'justify-center',
      )}
    >
      {number && (
        <span className="font-sans text-2xl font-black text-[#FF7D6B] opacity-80 sm:text-3xl animate-pop-in">
          {number}
        </span>
      )}
      <span
        className={cn(
          'inline-flex items-center rounded-full border-2 border-[#2D1F1D] px-3.5 py-1 text-xs font-black uppercase tracking-wider shadow-[2px_2px_0px_#2D1F1D] animate-wiggle-in',
          dark
            ? 'bg-[#FFC837] text-[#2D1F1D]'
            : 'bg-[#FFE68C] text-[#2D1F1D]',
        )}
      >
        {eyebrow}
      </span>
    </div>
  )

  const titleBlock = animate ? (
    <SplitReveal
      text={title}
      as="h2"
      className={cn(
        'mt-3 font-sans text-2xl font-black leading-[1.18] tracking-tight sm:text-3xl lg:text-4xl text-balance text-[#2D1F1D]',
        dark && 'text-white',
      )}
      delay={120}
      stagger={45}
    />
  ) : (
    <h2
      className={cn(
        'mt-3 font-sans text-2xl font-black leading-[1.18] tracking-tight sm:text-3xl lg:text-4xl text-balance text-[#2D1F1D]',
        dark && 'text-white',
      )}
    >
      {title}
    </h2>
  )

  const introBlock = intro && (
    <p
      className={cn(
        'mt-2.5 text-sm leading-relaxed text-[#6B5550] sm:text-base font-medium text-pretty',
        dark && 'text-white/80',
        typewriterIntro && 'min-h-[1.5em]',
      )}
    >
      {typewriterIntro && animate ? (
        <TypewriterText text={intro} speed={28} startDelay={400} showCursor={false} />
      ) : (
        intro
      )}
    </p>
  )

  const content = (
    <>
      {eyebrowBlock}
      <div className="relative mt-3">
        {titleBlock}
        <span
          className={cn(
            'mt-2 block h-1 w-16 rounded-full bg-[#FF7D6B] origin-left',
            animate && 'animate-draw-underline',
            align === 'center' && 'mx-auto',
          )}
          aria-hidden="true"
        />
      </div>
      {introBlock}
    </>
  )

  return (
    <div
      className={cn(
        'max-w-2xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {content}
    </div>
  )
}
