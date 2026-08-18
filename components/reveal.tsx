'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

type RevealProps = {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
}

const directionClasses = {
  up: 'translate-y-3',
  down: '-translate-y-3',
  left: 'translate-x-3',
  right: '-translate-x-3',
  none: '',
}

export function Reveal({
  children,
  className,
  delay = 0,
  direction = 'up',
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px -20px 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        'transform-gpu transition-[opacity,transform] duration-500 ease-out will-change-[opacity,transform]',
        visible ? 'translate-x-0 translate-y-0 opacity-100' : cn('opacity-0', directionClasses[direction]),
        className,
      )}
    >
      {children}
    </div>
  )
}
