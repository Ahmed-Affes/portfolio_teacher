'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

type SplitRevealProps = {
  text: string
  className?: string
  wordClassName?: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  delay?: number
  stagger?: number
  mode?: 'words' | 'chars'
}

export function SplitReveal({
  text,
  className,
  wordClassName,
  as: Tag = 'h2',
  delay = 0,
  stagger = 55,
  mode = 'words',
}: SplitRevealProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -30px 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const parts =
    mode === 'chars'
      ? text.split('')
      : text.split(/(\s+)/).filter((part) => part.length > 0)

  return (
    <Tag className={cn(className)}>
      <span ref={ref} className="inline">
        {parts.map((part, i) => {
          const isSpace = /^\s+$/.test(part)
          if (isSpace) return part

          return (
            <span
              key={`${part}-${i}`}
              className={cn(
                'inline-block transform-gpu transition-[opacity,transform,filter] duration-700 ease-out',
                visible
                  ? 'translate-y-0 opacity-100 blur-0'
                  : 'translate-y-[0.65em] opacity-0 blur-[3px]',
                wordClassName,
              )}
              style={{ transitionDelay: `${delay + i * stagger}ms` }}
            >
              {part}
            </span>
          )
        })}
      </span>
    </Tag>
  )
}
