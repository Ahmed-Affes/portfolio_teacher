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
  Heart,
  Sparkles,
} from 'lucide-react'
import { useCart } from '@/components/cart-provider'
import { useToast } from '@/components/toast-provider'
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

    // 1. Save to portfolio context & dispatch to Supabase
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
    toast('Order request submitted successfully! 🌸')
    clear()
  }

  return (
    <>
      <div
        aria-hidden={!isOpen}
        onClick={closeCart}
        className={cn(
          'fixed inset-0 z-[95] bg-[#2D1F1D]/60 backdrop-blur-xs transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart and checkout"
        className={cn(
          'fixed right-0 top-0 z-[96] flex h-dvh w-full max-w-md flex-col border-l-3 border-[#2D1F1D] bg-[#FAF5EC] shadow-[10px_0px_30px_rgba(45,31,29,0.3)] transition-transform duration-300',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <header className="flex items-center justify-between border-b-2 border-[#2D1F1D] bg-[#FFE68C] px-5 py-4">
          <div className="flex items-center gap-2 font-sans text-lg font-black text-[#2D1F1D]">
            {step === 'checkout' && (
              <button
                type="button"
                onClick={() => setStep('cart')}
                className="mr-1 flex size-8 items-center justify-center rounded-full border border-[#2D1F1D] bg-white hover:bg-[#FAF5EC]"
              >
                <ArrowLeft className="size-4" />
              </button>
            )}
            <ShoppingBag className="size-5" />
            <span>
              {step === 'checkout'
                ? 'Order Details 📝'
                : step === 'confirmed'
                  ? 'Order Confirmed 🎉'
                  : 'Your Craft Basket 🛒'}
            </span>
            {count > 0 && step === 'cart' && (
              <span className="rounded-full border border-[#2D1F1D] bg-[#FF7D6B] px-2 py-0.2 text-xs font-black text-white shadow-xs">
                {count}
              </span>
            )}
          </div>
          <button
            type="button"
            aria-label="Close cart"
            onClick={closeCart}
            className="flex size-8 items-center justify-center rounded-full border border-[#2D1F1D] bg-white text-[#2D1F1D] transition-colors hover:bg-[#FF7D6B] hover:text-white"
          >
            <X className="size-4.5" />
          </button>
        </header>

        {step === 'confirmed' ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center bg-white">
            <span className="flex size-18 items-center justify-center rounded-3xl border-3 border-[#2D1F1D] bg-[#A7F3D0] text-[#2D1F1D] shadow-[4px_4px_0px_#2D1F1D]">
              <CheckCircle2 className="size-10 stroke-[2.5]" />
            </span>
            <h3 className="font-sans text-2xl font-black text-[#2D1F1D]">
              Order Request Sent! 🌸
            </h3>
            <p className="max-w-xs text-xs font-bold leading-relaxed text-[#6B5550] text-pretty">
              Farah has received your order request. She will connect with you via WhatsApp or phone ({customerPhone}) shortly to arrange delivery in {customerLocation}.
            </p>
            <button
              type="button"
              onClick={closeCart}
              className="cute-btn mt-4 bg-[#FFC837] px-8 py-3 text-sm font-black text-[#2D1F1D] hover:bg-[#FFB800]"
            >
              Continue Exploring 🎒
            </button>
          </div>
        ) : lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center bg-white">
            <span className="flex size-16 items-center justify-center rounded-3xl border-2 border-[#2D1F1D] bg-[#FAF5EC] text-[#6B5550]">
              <ShoppingBag className="size-8" />
            </span>
            <p className="font-sans text-lg font-black text-[#2D1F1D]">Your basket is empty</p>
            <p className="text-xs font-bold text-[#6B5550] text-pretty max-w-xs">
              Browse the resource shop to add printable bundles or handmade props to buy or rent.
            </p>
            <button
              type="button"
              onClick={closeCart}
              className="cute-btn mt-3 bg-[#FFC837] px-6 py-2.5 text-xs font-black text-[#2D1F1D]"
            >
              Browse Resources 🌸
            </button>
          </div>
        ) : step === 'checkout' ? (
          <div className="flex flex-1 flex-col justify-between overflow-y-auto p-5 bg-white">
            <div className="space-y-4">
              <div className="rounded-2xl border-2 border-[#2D1F1D] bg-[#FFE68C] p-4 text-xs font-bold text-[#2D1F1D]">
                <p className="font-black text-sm">Tunisia Delivery &amp; Rental Process 📦</p>
                <p className="mt-1 text-[#2D1F1D]/80">
                  Cash on delivery / pickup in Sfax or express courier across Tunisia. Instant WhatsApp confirmation available.
                </p>
              </div>

              <div>
                <label className="mb-1 block text-xs font-black text-[#2D1F1D]">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 size-4 text-[#2D1F1D]" />
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Samia Mansour"
                    className="w-full rounded-2xl border-2 border-[#2D1F1D] bg-[#FAF5EC] py-2.5 pl-9 pr-3 text-xs font-bold text-[#2D1F1D] outline-none focus:bg-white focus:ring-2 focus:ring-[#FFC837]"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-black text-[#2D1F1D]">
                  WhatsApp / Phone Number *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 size-4 text-[#2D1F1D]" />
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="e.g. 52 000 000 / 98 000 000"
                    className="w-full rounded-2xl border-2 border-[#2D1F1D] bg-[#FAF5EC] py-2.5 pl-9 pr-3 text-xs font-bold text-[#2D1F1D] outline-none focus:bg-white focus:ring-2 focus:ring-[#FFC837]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-black text-[#2D1F1D]">
                    City / Governorate
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 size-4 text-[#2D1F1D]" />
                    <input
                      type="text"
                      value={customerLocation}
                      onChange={(e) => setCustomerLocation(e.target.value)}
                      placeholder="Sfax, Tunis, Sousse..."
                      className="w-full rounded-2xl border-2 border-[#2D1F1D] bg-[#FAF5EC] py-2.5 pl-9 pr-3 text-xs font-bold text-[#2D1F1D] outline-none focus:bg-white focus:ring-2 focus:ring-[#FFC837]"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-black text-[#2D1F1D]">
                    Email (optional)
                  </label>
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="samia@gmail.com"
                    className="w-full rounded-2xl border-2 border-[#2D1F1D] bg-[#FAF5EC] px-3 py-2.5 text-xs font-bold text-[#2D1F1D] outline-none focus:bg-white focus:ring-2 focus:ring-[#FFC837]"
                  />
                </div>
              </div>

              {hasRentals && (
                <div>
                  <label className="mb-1 block text-xs font-black text-[#2D1F1D]">
                    Requested Rental Date(s)
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 size-4 text-[#2D1F1D]" />
                    <input
                      type="text"
                      value={rentalDates}
                      onChange={(e) => setRentalDates(e.target.value)}
                      placeholder="e.g. Next Monday to Wednesday (3 days)"
                      className="w-full rounded-2xl border-2 border-[#2D1F1D] bg-[#FAF5EC] py-2.5 pl-9 pr-3 text-xs font-bold text-[#2D1F1D] outline-none focus:bg-white focus:ring-2 focus:ring-[#FFC837]"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="mb-1 block text-xs font-black text-[#2D1F1D]">
                  Special Instructions / Notes
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. For 4th-grade classroom event in Sakiet Ezzit..."
                  className="w-full resize-none rounded-2xl border-2 border-[#2D1F1D] bg-[#FAF5EC] p-3 text-xs font-bold text-[#2D1F1D] outline-none focus:bg-white focus:ring-2 focus:ring-[#FFC837]"
                />
              </div>

              <div className="rounded-2xl border-2 border-[#2D1F1D] bg-[#FAF5EC] p-3.5">
                <div className="flex items-center justify-between text-xs font-bold text-[#6B5550]">
                  <span>Items: {count}</span>
                  <span>Total amount:</span>
                </div>
                <div className="mt-1 flex items-baseline justify-between">
                  <span className="text-xs font-black text-[#2D1F1D]">Subtotal:</span>
                  <span className="font-sans text-xl font-black text-[#FF7D6B]">{subtotal} TND</span>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-2 border-t-2 border-[#2D1F1D]/10 pt-4">
              <button
                type="button"
                disabled={checkingOut}
                onClick={() => handlePlaceOrder('whatsapp')}
                className="cute-btn w-full bg-[#25D366] py-3.5 text-xs font-black text-white hover:bg-[#20bd5a] sm:text-sm"
              >
                <MessageCircle className="size-4.5 stroke-[2.5]" />
                <span>Confirm via WhatsApp 📱</span>
              </button>

              <button
                type="button"
                disabled={checkingOut}
                onClick={() => handlePlaceOrder('email')}
                className="cute-btn w-full bg-white py-2.5 text-xs font-bold text-[#2D1F1D] hover:bg-[#FAF5EC]"
              >
                Send as Email Order
              </button>
            </div>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y-2 divide-[#2D1F1D]/10 overflow-y-auto px-5 bg-white">
              {lines.map((line) => (
                <li key={line.key} className="flex gap-3 py-4">
                  <div className="relative size-20 shrink-0 overflow-hidden rounded-2xl border-2 border-[#2D1F1D] bg-[#FAF5EC]">
                    <Image
                      src={line.image || '/placeholder.svg'}
                      alt={line.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-xs font-black leading-tight text-[#2D1F1D] sm:text-sm">
                          {line.name}
                        </p>
                        <span className="mt-1 inline-block rounded-full border border-[#2D1F1D] bg-[#FFE68C] px-2 py-0.2 text-[0.65rem] font-black text-[#2D1F1D]">
                          {line.mode === 'rent' ? 'Rental / Day' : 'Purchase'}
                        </span>
                      </div>
                      <button
                        type="button"
                        aria-label={`Remove ${line.name}`}
                        onClick={() => removeItem(line.key)}
                        className="text-[#6B5550] transition-colors hover:text-[#FF5A5A]"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center rounded-xl border-2 border-[#2D1F1D] bg-[#FAF5EC] p-0.5">
                        <button
                          type="button"
                          aria-label="Decrease quantity"
                          onClick={() => updateQty(line.key, line.qty - 1)}
                          className="flex size-6 items-center justify-center rounded-lg hover:bg-white"
                        >
                          <Minus className="size-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-black">{line.qty}</span>
                        <button
                          type="button"
                          aria-label="Increase quantity"
                          onClick={() => updateQty(line.key, line.qty + 1)}
                          className="flex size-6 items-center justify-center rounded-lg hover:bg-white"
                        >
                          <Plus className="size-3" />
                        </button>
                      </div>
                      <span className="font-sans text-sm font-black text-[#2D1F1D]">
                        {line.price * line.qty} TND
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <footer className="border-t-2 border-[#2D1F1D] bg-[#FFE68C] px-5 py-4">
              <div className="flex items-center justify-between text-xs font-bold text-[#2D1F1D]">
                <span>Basket Subtotal</span>
                <span className="font-sans text-xl font-black text-[#2D1F1D]">
                  {subtotal} TND
                </span>
              </div>
              <p className="mt-1 text-[0.68rem] font-bold text-[#6B5550]">
                Rentals billed per day. Deliveries available in Sfax and across Tunisia.
              </p>
              <button
                type="button"
                onClick={() => setStep('checkout')}
                className="cute-btn mt-3 w-full bg-[#FF7D6B] py-3 text-sm font-black text-white hover:bg-[#FF6B6B]"
              >
                Proceed to Checkout ({subtotal} TND) 🚀
              </button>
              <button
                type="button"
                onClick={clear}
                className="mt-2 w-full text-center text-xs font-bold text-[#6B5550] hover:text-[#2D1F1D]"
              >
                Empty Basket
              </button>
            </footer>
          </>
        )}
      </aside>
    </>
  )
}
