'use client'

import { PortfolioProvider } from '@/lib/portfolio-context'
import { CartProvider } from '@/components/cart-provider'
import { ToastProvider } from '@/components/toast-provider'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PortfolioProvider>
      <ToastProvider>
        <CartProvider>{children}</CartProvider>
      </ToastProvider>
    </PortfolioProvider>
  )
}
