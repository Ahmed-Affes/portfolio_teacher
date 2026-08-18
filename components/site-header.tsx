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
    return () => { document.body.style.overflow = '' }
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
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled || menuOpen
          ? 'border-b border-border/50 glass shadow-sm'
          : 'bg-background/80 backdrop-blur-sm lg:bg-transparent lg:backdrop-blur-none',
      )}
    >
      <nav className="section-inner flex h-16 items-center justify-between gap-3 sm:h-[var(--header-h)]">
        <a
          href="#home"
          onClick={(e) => handleNav('home', e)}
          className="group flex min-w-0 items-center gap-2"
        >
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm sm:size-10 sm:rounded-xl">
            <Sparkles className="size-4 sm:size-5" />
          </span>
          <span className="truncate font-serif text-base font-semibold leading-none sm:text-lg">
            Farah Affes
          </span>
        </a>

        {/* Desktop nav — only on xl+ where 9 items fit */}
        <ul className="hidden items-center gap-0.5 rounded-full border border-border/50 bg-card/70 p-1 xl:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => handleNav(item.id, e)}
                className={cn(
                  'relative whitespace-nowrap rounded-full px-2.5 py-1.5 text-[0.75rem] font-medium transition-colors 2xl:px-3.5 2xl:text-[0.8125rem]',
                  active === item.id ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {active === item.id && (
                  <span className="absolute inset-0 -z-10 rounded-full bg-primary/30" />
                )}
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={openCart}
            aria-label={`Open cart, ${count} items`}
            className="relative flex size-9 items-center justify-center rounded-full border border-border/60 bg-card text-foreground sm:size-10"
          >
            <ShoppingBag className="size-4" />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex min-w-4 items-center justify-center rounded-full bg-secondary px-1 py-px text-[0.6rem] font-bold text-secondary-foreground ring-2 ring-background">
                {count}
              </span>
            )}
          </button>

          <a
            href="#contact"
            onClick={(e) => handleNav('contact', e)}
            className="hidden rounded-full bg-secondary px-4 py-2 text-xs font-semibold text-secondary-foreground sm:inline-flex sm:text-sm"
          >
            Contact
          </a>

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
            className="flex size-9 items-center justify-center rounded-full border border-border/60 bg-card xl:hidden sm:size-10"
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile + tablet menu */}
      {menuOpen && (
        <div className="fixed inset-0 top-16 z-40 bg-background/95 backdrop-blur-lg xl:hidden sm:top-[var(--header-h)]">
          <ul className="section-inner grid max-h-[calc(100dvh-var(--header-h))] grid-cols-2 gap-1.5 overflow-y-auto py-4 content-start">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleNav(item.id, e)}
                  className={cn(
                    'block rounded-xl px-3 py-3 text-sm font-medium transition-colors',
                    active === item.id
                      ? 'bg-primary/25 font-semibold text-foreground'
                      : 'text-muted-foreground hover:bg-muted',
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
