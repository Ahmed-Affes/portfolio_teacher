'use client'

import { cn } from '@/lib/utils'

export type SectionTheme =
  | 'about'
  | 'work'
  | 'videos'
  | 'shop'
  | 'serve'
  | 'testimonials'
  | 'faq'
  | 'contact'

type SectionSceneProps = {
  theme: SectionTheme
  pattern?: 'dots' | 'grid' | 'none'
  className?: string
}

const PATTERN_CLASS = {
  dots: 'dots-pattern opacity-25',
  grid: 'grid-paper opacity-25',
  none: '',
} as const

/**
 * Section texture only. Decorative objects now live in SideStoryCanvas so there
 * is one coordinated, scroll-driven background instead of duplicate static layers.
 */
export function SectionScene({ pattern = 'dots', className }: SectionSceneProps) {
  return (
    <div
      className={cn('pointer-events-none absolute inset-0 z-0 overflow-hidden', className)}
      aria-hidden="true"
    >
      {pattern !== 'none' && <div className={cn('absolute inset-0', PATTERN_CLASS[pattern])} />}
    </div>
  )
}
