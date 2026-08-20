'use client'

import { useEffect, useState } from 'react'
import {
  Home,
  BookOpen,
  Palette,
  Video,
  ShoppingBag,
  Mail,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const BOTTOM_NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'about', label: 'Story', icon: BookOpen },
  { id: 'work', label: 'Crafts', icon: Palette },
  { id: 'videos', label: 'Lessons', icon: Video },
  { id: 'shop', label: 'Shop', icon: ShoppingBag },
  { id: 'contact', label: 'Contact', icon: Mail },
]

export function MobileBottomNav() {
  const [active, setActive] = useState('home')

  useEffect(() => {
    const sectionIds = BOTTOM_NAV_ITEMS.map((item) => item.id)

    const observer = new IntersectionObserver(
      (entries) => {
        // Find visible section with largest intersection ratio
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible.length > 0 && visible[0].target.id) {
          setActive(visible[0].target.id)
        }
      },
      {
        threshold: [0.15, 0.35, 0.6],
        rootMargin: '-10% 0px -40% 0px',
      },
    )

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const handleNav = (id: string, e: React.MouseEvent) => {
    e.preventDefault()
    setActive(id)
    const target = document.getElementById(id)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav
      aria-label="Mobile Navigation"
      className="fixed bottom-3 inset-x-3 sm:inset-x-6 z-40 lg:hidden pointer-events-auto"
    >
      <div className="mx-auto max-w-md rounded-full border-[1.5px] border-[#3E251E]/40 bg-[#2D1F1D]/90 px-1.5 py-1.5 shadow-[0_12px_32px_rgba(45,31,29,0.35)] backdrop-blur-md">
        <ul className="flex items-center justify-around gap-1">
          {BOTTOM_NAV_ITEMS.map((item) => {
            const Icon = item.icon
            const isSelected = active === item.id

            return (
              <li key={item.id} className="flex-1">
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleNav(item.id, e)}
                  aria-current={isSelected ? 'page' : undefined}
                  className={cn(
                    'flex flex-col items-center justify-center rounded-full py-1.5 px-1 text-center transition-all duration-200 cursor-pointer min-h-[44px]',
                    isSelected
                      ? 'bg-[#FFC837] text-[#2D1F1D] shadow-[0_2px_8px_rgba(255,200,55,0.4)] scale-105 font-black'
                      : 'text-[#EBE1CE]/80 hover:text-white hover:bg-white/10 font-bold',
                  )}
                >
                  <Icon className={cn('size-4 shrink-0', isSelected ? 'stroke-[2.5]' : 'stroke-[2]')} />
                  <span className="mt-0.5 text-[0.62rem] leading-none tracking-tight">
                    {item.label}
                  </span>
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
