'use client'

import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'
import { cn } from '@/lib/utils'

export function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={cn(
        'fixed bottom-6 right-6 z-40 flex size-12 items-center justify-center rounded-full border-2 border-[#2D1F1D] bg-[#FFC837] text-[#2D1F1D] shadow-[3px_3px_0px_#2D1F1D] transition-all duration-200 hover:-translate-y-1 hover:shadow-[5px_5px_0px_#2D1F1D] active:translate-y-0 active:shadow-none cursor-pointer',
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0',
      )}
    >
      <ArrowUp className="size-5 stroke-[2.5]" />
    </button>
  )
}
