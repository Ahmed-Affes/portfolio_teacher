'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react'
import { useCart } from '@/components/cart-provider'
import { useToast } from '@/components/toast-provider'
import { CONTACT } from '@/lib/data'
import { cn } from '@/lib/utils'

export function CartDrawer() {
  const { lines, isOpen, closeCart, removeItem, updateQty, subtotal, count, clear } =
    useCart()
  const { toast } = useToast()
  const [checkingOut, setCheckingOut] = useState(false)

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeCart()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, closeCart])

  const handleCheckout = () => {
    setCheckingOut(true)
    const itemsList = lines
      .map(
        (l) =>
          `• ${l.name} (${l.mode === 'rent' ? 'Rental' : 'Purchase'}) x${l.qty} = ${l.price * l.qty} TND`,
      )
      .join('\n')
    const subject = encodeURIComponent(`Material & Resource Order Request (${count} items)`)
    const body = encodeURIComponent(
      `Hello Farah,\n\nI would like to place an order request for the following items from your resource hub:\n\n${itemsList}\n\nSubtotal: ${subtotal} TND\n\nPlease let me know availability and payment/pickup details.\n\nThank you!`,
    )
    window.open(`mailto:${CONTACT.email}?subject=${subject}&body=${body}`, '_blank')
    setTimeout(() => {
      setCheckingOut(false)
      clear()
      closeCart()
      toast('Order request draft opened! Farah will confirm details.')
    }, 1000)
  }

  return (
    <>
      <div
        aria-hidden={!isOpen}
        onClick={closeCart}
        className={cn(
          'fixed inset-0 z-[95] bg-foreground/50 backdrop-blur-sm transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={cn(
          'fixed right-0 top-0 z-[96] flex h-dvh w-full max-w-md flex-col bg-card shadow-2xl transition-transform duration-300',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <header className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="flex items-center gap-2 font-serif text-xl font-semibold">
            <ShoppingBag className="size-5" />
            Your cart
            {count > 0 && (
              <span className="rounded-full bg-primary px-2 py-0.5 text-sm text-primary-foreground">
                {count}
              </span>
            )}
          </h2>
          <button
            type="button"
            aria-label="Close cart"
            onClick={closeCart}
            className="flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="size-5" />
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <span className="flex size-16 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <ShoppingBag className="size-7" />
            </span>
            <p className="font-serif text-lg font-semibold">Your cart is empty</p>
            <p className="text-sm text-muted-foreground text-pretty">
              Browse the resource hub to add printable bundles or DIY props to buy or
              rent.
            </p>
            <button
              type="button"
              onClick={closeCart}
              className="mt-2 rounded-full bg-secondary px-5 py-2.5 text-sm font-semibold text-secondary-foreground"
            >
              Continue browsing
            </button>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-border overflow-y-auto px-5">
              {lines.map((line) => (
                <li key={line.key} className="flex gap-3 py-4">
                  <div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-muted">
                    <Image
                      src={line.image || '/placeholder.svg'}
                      alt={line.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-semibold leading-tight">
                          {line.name}
                        </p>
                        <span className="mt-0.5 inline-block rounded-full bg-primary/20 px-2 py-0.5 text-xs font-medium text-foreground">
                          {line.mode === 'rent' ? 'Rental / day' : 'Purchase'}
                        </span>
                      </div>
                      <button
                        type="button"
                        aria-label={`Remove ${line.name}`}
                        onClick={() => removeItem(line.key)}
                        className="text-muted-foreground transition-colors hover:text-destructive"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="flex items-center rounded-full border border-border">
                        <button
                          type="button"
                          aria-label="Decrease quantity"
                          onClick={() => updateQty(line.key, line.qty - 1)}
                          className="flex size-7 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted"
                        >
                          <Minus className="size-3.5" />
                        </button>
                        <span className="w-7 text-center text-sm font-semibold">
                          {line.qty}
                        </span>
                        <button
                          type="button"
                          aria-label="Increase quantity"
                          onClick={() => updateQty(line.key, line.qty + 1)}
                          className="flex size-7 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted"
                        >
                          <Plus className="size-3.5" />
                        </button>
                      </div>
                      <span className="font-serif text-base font-semibold">
                        {line.price * line.qty} TND
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <footer className="border-t border-border px-5 py-4">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Subtotal</span>
                <span className="font-serif text-xl font-semibold text-foreground">
                  {subtotal} TND
                </span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Rentals billed per day. Final total confirmed by email.
              </p>
              <button
                type="button"
                onClick={handleCheckout}
                disabled={checkingOut}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3.5 text-base font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:opacity-70"
              >
                {checkingOut ? 'Sending request…' : 'Request this order'}
              </button>
              <button
                type="button"
                onClick={clear}
                className="mt-2 w-full rounded-full px-5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Clear cart
              </button>
            </footer>
          </>
        )}
      </aside>
    </>
  )
}
