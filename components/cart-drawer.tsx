'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  MapPin,
  Minus,
  MessageCircle,
  Phone,
  Plus,
  ShoppingBag,
  Trash2,
  User,
  X,
} from 'lucide-react'
import { useCart } from '@/components/cart-provider'
import { useToast } from '@/components/toast-provider'
import { submitOrderRequest } from '@/lib/supabase'
import { usePortfolio } from '@/lib/portfolio-context'
import { cn } from '@/lib/utils'

export function CartDrawer() {
  const { lines, isOpen, closeCart, removeItem, updateQty, subtotal, count, clear } = useCart()
  const { state, addOrder } = usePortfolio()
  const { contact } = state
  const { toast } = useToast()

  const [step, setStep] = useState<'cart' | 'checkout' | 'confirmed'>('cart')
  const [checkingOut, setCheckingOut] = useState(false)
  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [customerEmail, setCustomerEmail] = useState('')
  const [customerLocation, setCustomerLocation] = useState('Sfax')
  const [rentalDates, setRentalDates] = useState('')
  const [notes, setNotes] = useState('')

  const hasRentals = lines.some((l) => l.mode === 'rent')

  useEffect(() => {
    if (!isOpen) {
      setStep('cart')
      return
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeCart()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, closeCart])

  const handlePlaceOrder = async (dispatchChannel: 'whatsapp' | 'email') => {
    if (!customerName.trim() || !customerPhone.trim()) {
      toast('Please provide your name and phone / WhatsApp number.')
      return
    }

    setCheckingOut(true)

    const orderItems = lines.map((l) => ({
      id: l.productId,
      name: l.name,
      price: l.price,
      qty: l.qty,
      mode: l.mode,
    }))

    // 1. Save to portfolio context state (Local Storage & Admin Portal)
    addOrder({
      customer_name: customerName.trim(),
      customer_phone: customerPhone.trim(),
      customer_email: customerEmail.trim(),
      customer_location: customerLocation.trim(),
      rental_dates: rentalDates.trim() || undefined,
      notes: notes.trim() || undefined,
      items: orderItems,
      subtotal,
      currency: 'TND',
      status: 'pending',
    })

    // 2. Also dispatch to Supabase database
    await submitOrderRequest({
      customer_name: customerName,
      customer_phone: customerPhone,
      customer_email: customerEmail,
      items: orderItems,
      subtotal,
      currency: 'TND',
      status: 'pending',
      notes: `${customerLocation ? `Location: ${customerLocation}. ` : ''}${rentalDates ? `Rental Dates: ${rentalDates}. ` : ''}${notes || ''}`,
    })

    const itemsText = lines
      .map(
        (l) =>
          `• ${l.name} (${l.mode === 'rent' ? 'Rental' : 'Buy'}) x${l.qty} = ${l.price * l.qty} TND`,
      )
      .join('\n')

    const whatsappMessage = `*NEW ORDER / RENTAL REQUEST*\n--------------------------\n*Customer:* ${customerName}\n*Phone:* ${customerPhone}\n*Location:* ${customerLocation}${customerEmail ? `\n*Email:* ${customerEmail}` : ''}${rentalDates ? `\n*Rental Dates:* ${rentalDates}` : ''}${notes ? `\n*Notes:* ${notes}` : ''}\n\n*Items Ordered:*\n${itemsText}\n\n*Total:* ${subtotal} TND\n--------------------------\n(Sent via Farah Affes Portfolio)`

    const whatsappRaw = contact.whatsappRaw || '21652095014'

    if (dispatchChannel === 'whatsapp') {
      window.open(
        `https://wa.me/${whatsappRaw}?text=${encodeURIComponent(whatsappMessage)}`,
        '_blank',
      )
    } else {
      const subject = encodeURIComponent(
        `[Order Request] ${customerName} - ${subtotal} TND (${count} items)`,
      )
      const body = encodeURIComponent(whatsappMessage)
      window.open(`mailto:${contact.email}?subject=${subject}&body=${body}`, '_blank')
    }

    setCheckingOut(false)
    setStep('confirmed')
    toast('Order request submitted successfully!')
    clear()
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
        aria-label="Shopping cart and checkout"
        className={cn(
          'fixed right-0 top-0 z-[96] flex h-dvh w-full max-w-md flex-col bg-card shadow-2xl transition-transform duration-300',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <header className="flex items-center justify-between border-b border-border px-5 py-4">
          <div className="flex items-center gap-2 font-serif text-xl font-semibold">
            {step === 'checkout' && (
              <button
                type="button"
                onClick={() => setStep('cart')}
                className="mr-1 flex size-7 items-center justify-center rounded-full hover:bg-muted"
              >
                <ArrowLeft className="size-4" />
              </button>
            )}
            <ShoppingBag className="size-5 text-primary" />
            <span>{step === 'checkout' ? 'Order Details' : step === 'confirmed' ? 'Order Confirmed' : 'Your cart'}</span>
            {count > 0 && step === 'cart' && (
              <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-bold text-primary-foreground">
                {count}
              </span>
            )}
          </div>
          <button
            type="button"
            aria-label="Close cart"
            onClick={closeCart}
            className="flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="size-5" />
          </button>
        </header>

        {step === 'confirmed' ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <span className="flex size-16 items-center justify-center rounded-full bg-primary/20 text-primary">
              <CheckCircle2 className="size-9" />
            </span>
            <h3 className="font-serif text-2xl font-semibold text-foreground">Order Request Sent!</h3>
            <p className="max-w-xs text-sm text-muted-foreground text-pretty">
              Farah has received your order request. She will connect with you via WhatsApp or phone ({customerPhone}) shortly to arrange delivery in {customerLocation}.
            </p>
            <button
              type="button"
              onClick={closeCart}
              className="mt-4 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg"
            >
              Continue Exploring
            </button>
          </div>
        ) : lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <span className="flex size-16 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <ShoppingBag className="size-7" />
            </span>
            <p className="font-serif text-lg font-semibold">Your cart is empty</p>
            <p className="text-sm text-muted-foreground text-pretty">
              Browse the resource hub to add printable bundles or DIY props to buy or rent.
            </p>
            <button
              type="button"
              onClick={closeCart}
              className="mt-2 rounded-full bg-secondary px-5 py-2.5 text-sm font-semibold text-secondary-foreground"
            >
              Continue browsing
            </button>
          </div>
        ) : step === 'checkout' ? (
          <div className="flex flex-1 flex-col justify-between overflow-y-auto p-5">
            <div className="space-y-4">
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-3.5 text-xs text-foreground">
                <p className="font-semibold text-primary">Tunisia Delivery &amp; Rental Process</p>
                <p className="mt-1 text-muted-foreground">
                  Cash on delivery / pickup in Sfax or express courier across Tunisia. Instant WhatsApp confirmation available.
                </p>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-foreground">
                  Full Name <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Samia Mansour"
                    className="w-full rounded-lg border border-border bg-background py-2 pl-9 pr-3 text-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-foreground">
                  WhatsApp / Phone Number <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="e.g. 52 000 000 / 98 000 000"
                    className="w-full rounded-lg border border-border bg-background py-2 pl-9 pr-3 text-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-foreground">
                    City / Governorate
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                    <input
                      type="text"
                      value={customerLocation}
                      onChange={(e) => setCustomerLocation(e.target.value)}
                      placeholder="Sfax, Tunis, Sousse..."
                      className="w-full rounded-lg border border-border bg-background py-2 pl-9 pr-3 text-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold text-foreground">
                    Email (optional)
                  </label>
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="samia@gmail.com"
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              {hasRentals && (
                <div>
                  <label className="mb-1 block text-xs font-semibold text-foreground">
                    Requested Rental Date(s)
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                    <input
                      type="text"
                      value={rentalDates}
                      onChange={(e) => setRentalDates(e.target.value)}
                      placeholder="e.g. Next Monday to Wednesday (3 days)"
                      className="w-full rounded-lg border border-border bg-background py-2 pl-9 pr-3 text-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="mb-1 block text-xs font-semibold text-foreground">
                  Special Instructions / School Details
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. For 4th-grade classroom event in Sakiet Ezzit..."
                  className="w-full resize-none rounded-lg border border-border bg-background p-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="rounded-xl border border-border bg-muted/40 p-3">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Items: {count}</span>
                  <span>Total amount:</span>
                </div>
                <div className="mt-1 flex items-baseline justify-between">
                  <span className="text-xs font-semibold text-foreground">Subtotal to pay:</span>
                  <span className="font-serif text-xl font-bold text-foreground">{subtotal} TND</span>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-2 border-t border-border pt-4">
              <button
                type="button"
                disabled={checkingOut}
                onClick={() => handlePlaceOrder('whatsapp')}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#25D366]/20 transition-all hover:bg-[#20bd5a] hover:-translate-y-0.5"
              >
                <MessageCircle className="size-4" />
                Confirm via WhatsApp (+216 52 095 014)
              </button>

              <button
                type="button"
                disabled={checkingOut}
                onClick={() => handlePlaceOrder('email')}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-xs font-semibold text-foreground transition-all hover:bg-muted"
              >
                Send as Email Order
              </button>
            </div>
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
                        <p className="text-sm font-semibold leading-tight">{line.name}</p>
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
                        <span className="w-7 text-center text-sm font-semibold">{line.qty}</span>
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
                Rentals billed per day. Deliveries available in Sfax and across Tunisia.
              </p>
              <button
                type="button"
                onClick={() => setStep('checkout')}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3.5 text-base font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
              >
                Proceed to Checkout ({subtotal} TND)
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
