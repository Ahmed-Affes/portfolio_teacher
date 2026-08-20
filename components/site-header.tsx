'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Menu, ShoppingBag, Sparkles, X, Heart } from 'lucide-react'
import { NAV_ITEMS } from '@/lib/data'
import { useCart } from '@/components/cart-provider'
import { HeaderMusicButton } from '@/components/ambient-music'
import { usePortfolio } from '@/lib/portfolio-context'
import { cn } from '@/lib/utils'

export function SiteHeader() {
  const [active, setActive] = useState('home')
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { count, openCart } = useCart()
  const { state } = usePortfolio()

  const profile = state.profile || {
    name: 'Farah Affes',
    tagline: 'Teacher Studio',
    avatarImage: '/images/farah-portrait.png',
    avatarType: 'image',
    badgeEmoji: '✨',
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = NAV_ITEMS.map((n) => document.getElementById(n.id)).filter(
      (el): el is HTMLElement => Boolean(el),
    )
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-10% 0px -70% 0px', threshold: [0, 0.25, 0.5] },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const handleNav = (id: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault()
    setActive(id)
    setMenuOpen(false)
    const target = document.getElementById(id)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      window.history.pushState(null, '', `#${id}`)
    }
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 transition-all duration-300 px-3 pt-3 sm:px-6 sm:pt-4">
      <nav
        className={cn(
          'mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 rounded-full border-[1.5px] border-[#2D1F1D]/35 px-4 py-2 transition-all duration-300 sm:h-16 sm:px-6',
          scrolled || menuOpen
            ? 'bg-white/95 shadow-[0_10px_25px_rgba(45,31,29,0.08),2.5px_2.5px_0px_rgba(45,31,29,0.5)] backdrop-blur-md'
            : 'bg-white/85 shadow-[0_4px_16px_rgba(45,31,29,0.05),2px_2px_0px_rgba(45,31,29,0.4)] backdrop-blur-sm',
        )}
      >
        <a
          href="#home"
          onClick={(e) => handleNav('home', e)}
          className="group flex min-w-0 items-center gap-2.5 transition-transform hover:scale-105 active:scale-95"
        >
          <div className="relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full border-[1.5px] border-[#2D1F1D]/40 bg-[#FFC837] text-[#2D1F1D] shadow-[1.5px_1.5px_0px_rgba(45,31,29,0.3)] transition-transform group-hover:rotate-6 sm:size-10">
            {profile.avatarImage && profile.avatarType !== 'icon' ? (
              <Image
                src={profile.avatarImage}
                alt={profile.name || 'Farah Affes'}
                fill
                className="object-cover"
              />
            ) : (
              <Sparkles className="size-4 text-[#2D1F1D] fill-[#FFC837]" />
            )}
          </div>
          <div className="flex flex-col">
            <span className="truncate font-sans text-base font-bold leading-none text-[#2D1F1D] sm:text-lg">
              {profile.name || 'Farah Affes'}
            </span>
            <span className="text-[0.65rem] font-bold text-[#FF7D6B] leading-tight flex items-center gap-1">
              <span>{profile.tagline || 'Teacher Studio'}</span>
              <Heart className="size-2.5 fill-[#FF7D6B]" />
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <ul className="hidden items-center gap-1 rounded-full border border-[#2D1F1D]/15 bg-[#FAF5EC] p-1 xl:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = active === item.id
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleNav(item.id, e)}
                  className={cn(
                    'relative whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-bold transition-all duration-150',
                    isActive
                      ? 'bg-[#FFC837] text-[#2D1F1D] border border-[#2D1F1D]/40 shadow-[1.5px_1.5px_0px_rgba(45,31,29,0.3)]'
                      : 'text-[#6B5550] hover:text-[#2D1F1D] hover:bg-[#FFE68C]/40',
                  )}
                >
                  {item.label}
                </a>
              </li>
            )
          })}
        </ul>

        {/* Action Buttons: Cart + Ambient Music + Contact + Mobile Menu */}
        <div className="flex shrink-0 items-center gap-2">
          <HeaderMusicButton />

          <button
            type="button"
            onClick={openCart}
            aria-label={`Open cart, ${count} items`}
            className="relative flex size-9 items-center justify-center rounded-full border-[1.5px] border-[#2D1F1D]/40 bg-[#A7F3D0] text-[#2D1F1D] shadow-[1.5px_1.5px_0px_rgba(45,31,29,0.3)] hover:scale-105 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all sm:size-10 cursor-pointer"
          >
            <ShoppingBag className="size-4" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex min-w-4 items-center justify-center rounded-full border border-[#2D1F1D]/40 bg-[#FF7D6B] px-1 py-0.5 text-[0.65rem] font-black text-white shadow-xs animate-bounce">
                {count}
              </span>
            )}
          </button>

          <a
            href="#contact"
            onClick={(e) => handleNav('contact', e)}
            className="hidden rounded-full border-[1.5px] border-[#2D1F1D]/40 bg-[#FF7D6B] px-4 py-1.5 text-xs font-bold text-white shadow-[1.5px_1.5px_0px_rgba(45,31,29,0.3)] hover:bg-[#FF6B6B] hover:scale-105 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all sm:inline-flex sm:text-sm"
          >
            Say Hello! 🌸
          </a>

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
            className="flex size-9 items-center justify-center rounded-full border-[1.5px] border-[#2D1F1D]/40 bg-[#FFE68C] text-[#2D1F1D] shadow-[1.5px_1.5px_0px_rgba(45,31,29,0.3)] xl:hidden sm:size-10 cursor-pointer"
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {menuOpen && (
        <div className="fixed inset-x-3 top-20 z-40 rounded-3xl border-[1.5px] border-[#2D1F1D]/40 bg-white p-4 shadow-[0_16px_36px_rgba(45,31,29,0.12),3px_3px_0px_rgba(45,31,29,0.5)] xl:hidden">
          <ul className="grid grid-cols-2 gap-2">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleNav(item.id, e)}
                  className={cn(
                    'block rounded-2xl border border-[#2D1F1D]/30 px-3 py-2.5 text-center text-xs font-bold transition-all shadow-[1.5px_1.5px_0px_rgba(45,31,29,0.3)] active:shadow-none active:translate-y-[1px]',
                    active === item.id
                      ? 'bg-[#FFC837] text-[#2D1F1D]'
                      : 'bg-[#FAF5EC] text-[#6B5550]',
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
