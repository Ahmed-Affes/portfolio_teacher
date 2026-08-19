'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

type ParallaxFloatProps = {
  children: React.ReactNode
  className?: string
  speed?: number
  rotate?: number
}

export function ParallaxFloat({ children, className, speed = 0.12, rotate = 0 }: ParallaxFloatProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    let raf = 0
    const update = () => {
      const rect = el.getBoundingClientRect()
      const viewportCenter = window.innerHeight / 2
      const elementCenter = rect.top + rect.height / 2
      const distance = (elementCenter - viewportCenter) / window.innerHeight
      setOffset(distance * speed * 100)
    }

    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [speed])

  return (
    <div
      ref={ref}
      className={cn('will-change-transform', className)}
      style={{
        transform: `translate3d(0, ${offset}px, 0) rotate(${rotate}deg)`,
      }}
    >
      <div className="relative [&>*]:!relative [&>*]:!left-auto [&>*]:!right-auto [&>*]:!top-auto [&>*]:!bottom-auto">
        {children}
      </div>
    </div>
  )
}
