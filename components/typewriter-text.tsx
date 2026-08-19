'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

type TypewriterTextProps = {
  text: string
  className?: string
  speed?: number
  startDelay?: number
  showCursor?: boolean
  as?: 'span' | 'p' | 'div'
  onComplete?: () => void
}

export function TypewriterText({
  text,
  className,
  speed = 35,
  startDelay = 0,
  showCursor = true,
  as: Tag = 'span',
  onComplete,
}: TypewriterTextProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setDisplayed(text)
      setDone(true)
      onComplete?.()
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -40px 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [text, onComplete])

  useEffect(() => {
    if (!started) return

    let index = 0
    let intervalId: ReturnType<typeof setInterval> | undefined

    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        index += 1
        setDisplayed(text.slice(0, index))
        if (index >= text.length) {
          if (intervalId) clearInterval(intervalId)
          setDone(true)
          onComplete?.()
        }
      }, speed)
    }, startDelay)

    return () => {
      clearTimeout(timeoutId)
      if (intervalId) clearInterval(intervalId)
    }
  }, [started, text, speed, startDelay, onComplete])

  return (
    <Tag className={cn('inline', className)}>
      <span ref={ref} className="inline">
        {displayed}
        {showCursor && !done && (
          <span className="ml-0.5 inline-block w-[2px] animate-typewriter-cursor bg-current align-middle" aria-hidden="true">
            &nbsp;
          </span>
        )}
      </span>
    </Tag>
  )
}
