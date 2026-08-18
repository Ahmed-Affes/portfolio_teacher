'use client'

import { useEffect, useState } from 'react'
import { Menu, ShoppingBag, Sparkles, X } from 'lucide-react'
import { NAV_ITEMS } from '@/lib/data'
import { useCart } from '@/components/cart-provider'
import { cn } from '@/lib/utils'

export function SiteHeader() {
  const [active, setActive] = useState('home')
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { count, openCart } = useCart()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
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
      { rootMargin: '-15% 0px -65% 0px', threshold: [0, 0.2, 0.5, 0.8] },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

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
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b border-border/70 bg-background/90 shadow-xs backdrop-blur-md'
          : 'bg-background/50 backdrop-blur-sm',
      )}
    >
      <nav className="mx-auto flex h-16 sm:h-18 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a
          href="#home"
          onClick={(e) => handleNav('home', e)}
          className="group flex items-center gap-2.5"
        >
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-xs transition-transform group-hover:scale-105">
            <Sparkles className="size-5" />
          </span>
          <span className="font-serif text-xl font-semibold leading-none tracking-tight">
            Farah Affes
          </span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => handleNav(item.id, e)}
                className={cn(
                  'relative rounded-full px-4 py-2 text-sm font-medium transition-colors',
                  active === item.id
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {active === item.id && (
                  <span className="absolute inset-0 -z-10 rounded-full bg-primary/35 shadow-sm" />
                )}
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={openCart}
            aria-label={`Open cart, ${count} items`}
            className="relative flex size-11 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm transition-all hover:bg-muted hover:shadow"
          >
            <ShoppingBag className="size-5" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex min-w-5 items-center justify-center rounded-full bg-secondary px-1.5 py-0.5 text-[0.7rem] font-bold text-secondary-foreground">
                {count}
              </span>
            )}
          </button>

          <a
            href="#contact"
            onClick={(e) => handleNav('contact', e)}
            className="hidden rounded-full bg-secondary px-5 py-2.5 text-sm font-semibold text-secondary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:shadow sm:inline-flex"
          >
            Get in touch
          </a>

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
            className="flex size-11 items-center justify-center rounded-full border border-border bg-card text-foreground lg:hidden"
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          'overflow-hidden border-b border-border bg-background/98 backdrop-blur-lg transition-all duration-300 lg:hidden',
          menuOpen ? 'max-h-[32rem]' : 'max-h-0 border-b-0',
        )}
      >
        <ul className="mx-auto grid max-w-6xl gap-1.5 px-4 py-5 sm:px-6">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => handleNav(item.id, e)}
                className={cn(
                  'block rounded-xl px-4 py-3 text-base font-medium transition-colors',
                  active === item.id
                    ? 'bg-primary/30 text-foreground font-semibold'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
