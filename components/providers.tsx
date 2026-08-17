'use client'

import { CartProvider } from '@/components/cart-provider'
import { ToastProvider } from '@/components/toast-provider'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <CartProvider>{children}</CartProvider>
    </ToastProvider>
  )
}
