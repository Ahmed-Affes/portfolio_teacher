'use client'

import { useEffect } from 'react'
import { PortfolioProvider } from '@/lib/portfolio-context'
import { CartProvider } from '@/components/cart-provider'
import { ToastProvider } from '@/components/toast-provider'

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Register Service Worker for Native OS System & Mobile Lock Screen Notifications
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js', { scope: '/' })
        .then((reg) => {
          console.log('Farah Studio OS Push Service Worker registered:', reg.scope)
        })
        .catch((err) => {
          console.warn('Service Worker registration error:', err)
        })
    }
  }, [])

  return (
    <PortfolioProvider>
      <ToastProvider>
        <CartProvider>{children}</CartProvider>
      </ToastProvider>
    </PortfolioProvider>
  )
}
