'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useToast } from '@/components/toast-provider'

export type CartMode = 'buy' | 'rent'

export type CartLine = {
  key: string
  productId: string
  name: string
  image: string
  mode: CartMode
  price: number
  qty: number
}

type CartContextValue = {
  lines: CartLine[]
  count: number
  subtotal: number
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
  addItem: (item: Omit<CartLine, 'key' | 'qty'>) => void
  removeItem: (key: string) => void
  updateQty: (key: string, qty: number) => void
  clear: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}

const MAX_QTY = 10
const CART_STORAGE_KEY = 'farah_cart_v1'

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [hydrated, setHydrated] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed)) {
          setLines(parsed)
        }
      }
    } catch {
      // Ignore parse errors
    } finally {
      setHydrated(true)
    }
  }, [])

  useEffect(() => {
    if (!hydrated) return
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(lines))
    } catch {
      // Ignore storage errors
    }
  }, [lines, hydrated])

  const addItem = useCallback<CartContextValue['addItem']>(
    (item) => {
      const key = `${item.productId}-${item.mode}`
      setLines((prev) => {
        const existing = prev.find((l) => l.key === key)
        if (existing) {
          return prev.map((l) =>
            l.key === key ? { ...l, qty: Math.min(MAX_QTY, l.qty + 1) } : l,
          )
        }
        return [...prev, { ...item, key, qty: 1 }]
      })
      toast(
        `${item.name} added to cart (${item.mode === 'rent' ? 'Rental' : 'Purchase'})`,
      )
      setIsOpen(true)
    },
    [toast],
  )

  const removeItem = useCallback((key: string) => {
    setLines((prev) => prev.filter((l) => l.key !== key))
  }, [])

  const updateQty = useCallback((key: string, qty: number) => {
    const clamped = Math.max(1, Math.min(MAX_QTY, qty))
    setLines((prev) => prev.map((l) => (l.key === key ? { ...l, qty: clamped } : l)))
  }, [])

  const clear = useCallback(() => setLines([]), [])

  const { count, subtotal } = useMemo(() => {
    return lines.reduce(
      (acc, l) => {
        acc.count += l.qty
        acc.subtotal += l.qty * l.price
        return acc
      },
      { count: 0, subtotal: 0 },
    )
  }, [lines])

  const value: CartContextValue = {
    lines,
    count,
    subtotal,
    isOpen,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
    addItem,
    removeItem,
    updateQty,
    clear,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
} 
