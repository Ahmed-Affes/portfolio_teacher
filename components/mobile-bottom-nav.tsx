'use client'

import { useEffect, useState } from 'react'
import {
  Home,
  BookOpen,
  Palette,
  Video,
  ShoppingBag,
  GraduationCap,
  Star,
  HelpCircle,
  Mail,
  Menu,
  X,
  Music,
  Disc3,
  Volume2,
  VolumeX,
} from 'lucide-react'
import { useMusic } from '@/components/ambient-music'
import { cn } from '@/lib/utils'

export const ALL_NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: Home, color: 'bg-[#FFC837]' },
  { id: 'about', label: 'Storybook', icon: BookOpen, color: 'bg-[#A7F3D0]' },
  { id: 'work', label: 'Crafts', icon: Palette, color: 'bg-[#FFE68C]' },
  { id: 'videos', label: 'Lessons', icon: Video, color: 'bg-[#FFB5B5]' },
  { id: 'shop', label: 'Shop', icon: ShoppingBag, color: 'bg-[#DDD6FE]' },
  { id: 'serve', label: 'Audience', icon: GraduationCap, color: 'bg-[#FED7AA]' },
  { id: 'testimonials', label: 'Reviews', icon: Star, color: 'bg-[#FFE68C]' },
  { id: 'faq', label: 'FAQ', icon: HelpCircle, color: 'bg-[#A7F3D0]' },
  { id: 'contact', label: 'Contact', icon: Mail, color: 'bg-[#FF7D6B]' },
]

export function MobileBottomNav() {
  const [active, setActive] = useState('home')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isPlaying, isMuted, currentTrack, togglePlay, toggleMute } = useMusic()

  useEffect(() => {
    const sectionIds = ALL_NAV_ITEMS.map((item) => item.id)

    const observer = new IntersectionObserver(
      (entries) => {
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
    setIsMenuOpen(false)
    const target = document.getElementById(id)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Primary quick bar items on mobile
  const primaryItems = ALL_NAV_ITEMS.slice(0, 5)

  return (
    <>
      {/* Full Sections Popover Sheet for Mobile */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end bg-black/60 backdrop-blur-xs p-3 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        >
          <div
            className="w-full rounded-[2.2rem] border-[1.5px] border-[#5A3822]/60 bg-[#241713] p-5 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] animate-pop-in text-[#FAF5EC]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#FAF5EC]/15 pb-3">
              <div className="flex items-center gap-2">
                <span className="flex size-7 items-center justify-center rounded-lg bg-[#FFC837] text-[#2D1F1D]">
                  <Palette className="size-4" />
                </span>
                <h3 className="font-sans text-sm font-black text-[#FAF5EC]">
                  Farah Affes • Studio Navigation
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsMenuOpen(false)}
                className="flex size-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 cursor-pointer"
                aria-label="Close navigation sheet"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* 3x3 Grid of All 9 Navigation Sections */}
            <div className="mt-4 grid grid-cols-3 gap-2.5">
              {ALL_NAV_ITEMS.map((item) => {
                const Icon = item.icon
                const isSelected = active === item.id

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={(e) => handleNav(item.id, e)}
                    className={cn(
                      'flex flex-col items-center justify-center gap-1.5 rounded-2xl border-[1.5px] p-3 text-center transition-all duration-200 cursor-pointer',
                      isSelected
                        ? 'border-[#FFC837] bg-[#FFC837] text-[#2D1F1D] shadow-[0_4px_14px_rgba(255,200,55,0.4)] scale-105 font-black'
                        : 'border-[#5A3822]/60 bg-[#2D1F1D] text-[#FAF5EC] hover:bg-white/10 font-bold',
                    )}
                  >
                    <span
                      className={cn(
                        'flex size-8 items-center justify-center rounded-xl border',
                        isSelected
                          ? 'border-[#2D1F1D]/30 bg-white text-[#2D1F1D]'
                          : `border-[#FAF5EC]/20 ${item.color} text-[#2D1F1D]`,
                      )}
                    >
                      <Icon className="size-4" />
                    </span>
                    <span className="text-[0.72rem] leading-tight">
                      {item.label}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Mobile Ambient Music Controller */}
            <div className="mt-4 flex items-center justify-between rounded-2xl border border-[#FAF5EC]/20 bg-[#2D1F1D] p-3 text-[#FAF5EC]">
              <div className="flex items-center gap-2.5">
                <span className="flex size-8 items-center justify-center rounded-xl bg-[#FFE68C] text-[#2D1F1D]">
                  {isPlaying ? (
                    <Disc3 className="size-4 text-[#FF7D6B] animate-spin" style={{ animationDuration: '3s' }} />
                  ) : (
                    <Music className="size-4" />
                  )}
                </span>
                <div>
                  <p className="text-xs font-black text-[#FAF5EC]">Atelier Ambient Music</p>
                  <p className="text-[0.62rem] text-[#FAF5EC]/70">{currentTrack.name} • {isPlaying ? 'Playing 🎵' : 'Paused'}</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={toggleMute}
                  aria-label={isMuted ? 'Unmute music' : 'Mute music'}
                  className="flex size-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 cursor-pointer"
                >
                  {isMuted ? <VolumeX className="size-3.5" /> : <Volume2 className="size-3.5" />}
                </button>
                <button
                  type="button"
                  onClick={togglePlay}
                  className="rounded-xl border border-[#2D1F1D] bg-[#FFC837] px-3 py-1.5 text-xs font-black text-[#2D1F1D] shadow-xs hover:bg-[#FFB800] cursor-pointer"
                >
                  {isPlaying ? 'Pause' : 'Play 🎵'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Bottom Nav Bar */}
      <nav
        aria-label="Mobile Bottom Navigation"
        className="fixed bottom-3 inset-x-3 sm:inset-x-6 z-40 lg:hidden pointer-events-auto"
      >
        <div className="mx-auto max-w-lg rounded-full border-[1.5px] border-[#5A3822]/60 bg-[#241713]/95 px-2 py-1.5 shadow-[0_16px_40px_rgba(36,23,19,0.5)] backdrop-blur-xl">
          <ul className="flex items-center justify-around gap-1">
            {primaryItems.map((item) => {
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
                        ? 'bg-[#FFC837] text-[#2D1F1D] shadow-[0_2px_10px_rgba(255,200,55,0.45)] scale-105 font-black'
                        : 'text-[#FAF5EC]/85 hover:text-white hover:bg-white/10 font-bold',
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

            {/* Menu / All 9 Sections Trigger */}
            <li className="flex-1">
              <button
                type="button"
                onClick={() => setIsMenuOpen((prev) => !prev)}
                aria-label="Open all navigation sections"
                className={cn(
                  'flex w-full flex-col items-center justify-center rounded-full py-1.5 px-1 text-center transition-all duration-200 cursor-pointer min-h-[44px]',
                  isMenuOpen || ['serve', 'testimonials', 'faq', 'contact'].includes(active)
                    ? 'bg-[#FF7D6B] text-white shadow-[0_2px_10px_rgba(255,125,107,0.45)] font-black'
                    : 'text-[#FAF5EC]/85 hover:text-white hover:bg-white/10 font-bold',
                )}
              >
                <Menu className="size-4 shrink-0 stroke-[2.5]" />
                <span className="mt-0.5 text-[0.62rem] leading-none tracking-tight">
                  More (9)
                </span>
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}
