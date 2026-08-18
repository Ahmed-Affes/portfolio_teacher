'use client'

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Check, X, Bell, ExternalLink } from 'lucide-react'
import { PUSH_EVENT_KEY, type PushNotificationData } from '@/lib/supabase'

type Toast = { id: number; message: string }
type PushBanner = PushNotificationData & { id: number }

const ToastContext = createContext<{
  toast: (message: string) => void
  showPushBanner: (banner: PushNotificationData) => void
} | null>(null)

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const [pushBanners, setPushBanners] = useState<PushBanner[]>([])
  const counter = useRef(0)

  const toast = useCallback((message: string) => {
    const id = counter.current++
    setToasts((prev) => [...prev, { id, message }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3200)
  }, [])

  const showPushBanner = useCallback((banner: PushNotificationData) => {
    // Only display in-app push popup banners when the user is inside the Admin Studio
    if (typeof window !== 'undefined' && !window.location.pathname.startsWith('/admin')) {
      return
    }

    const id = counter.current++
    const newBanner: PushBanner = { ...banner, id }
    setPushBanners((prev) => [newBanner, ...prev.slice(0, 2)]) // keep max 3 on screen

    setTimeout(() => {
      setPushBanners((prev) => prev.filter((b) => b.id !== id))
    }, 6500)
  }, [])

  // Listen to global push notification events from Supabase Realtime
  useEffect(() => {
    const handlePushEvent = (e: Event) => {
      const customEvent = e as CustomEvent<PushNotificationData>
      if (customEvent.detail) {
        showPushBanner(customEvent.detail)
      }
    }

    window.addEventListener(PUSH_EVENT_KEY, handlePushEvent)
    return () => {
      window.removeEventListener(PUSH_EVENT_KEY, handlePushEvent)
    }
  }, [showPushBanner])

  const dismissToast = (id: number) => setToasts((prev) => prev.filter((t) => t.id !== id))
  const dismissBanner = (id: number) => setPushBanners((prev) => prev.filter((b) => b.id !== id))

  return (
    <ToastContext.Provider value={{ toast, showPushBanner }}>
      {children}

      {/* 1. TOP FLOATING INTERACTIVE PUSH NOTIFICATION BANNERS (Mobile & PC) */}
      <div className="pointer-events-none fixed inset-x-3 top-3 z-[120] flex flex-col items-center gap-2.5 sm:inset-x-auto sm:right-4 sm:top-4 sm:w-96">
        {pushBanners.map((banner) => (
          <div
            key={banner.id}
            role="alert"
            className="pointer-events-auto flex w-full max-w-md items-start gap-3 rounded-2xl border border-primary/40 bg-card/95 p-3.5 shadow-2xl backdrop-blur-xl duration-300 animate-in slide-in-from-top-4 fade-in dark:bg-card/90"
          >
            <div className="relative size-10 shrink-0 overflow-hidden rounded-xl border border-primary/30 bg-muted">
              <Image
                src={banner.icon || '/images/farah-portrait.png'}
                alt="Notification icon"
                fill
                className="object-cover"
              />
              <span className="absolute -bottom-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-primary text-[0.6rem] text-primary-foreground shadow-xs">
                <Bell className="size-2.5" />
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1">
                <span className="text-[0.65rem] font-bold uppercase tracking-wider text-primary">
                  Farah Studio • Alert
                </span>
                <span className="text-[0.65rem] text-muted-foreground">Just now</span>
              </div>
              <h4 className="truncate font-serif text-sm font-bold text-foreground">
                {banner.title}
              </h4>
              {banner.body && (
                <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground text-pretty">
                  {banner.body}
                </p>
              )}

              {banner.href && (
                <div className="mt-2 flex items-center gap-2">
                  <Link
                    href={banner.href}
                    onClick={() => dismissBanner(banner.id)}
                    className="inline-flex items-center gap-1 rounded-lg bg-primary px-2.5 py-1 text-[0.7rem] font-bold text-primary-foreground hover:bg-primary/90"
                  >
                    <span>Open in Admin</span>
                    <ExternalLink className="size-3" />
                  </Link>
                </div>
              )}
            </div>

            <button
              type="button"
              aria-label="Dismiss alert"
              onClick={() => dismissBanner(banner.id)}
              className="shrink-0 rounded-lg p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          </div>
        ))}
      </div>

      {/* 2. BOTTOM STANDARD CONFIRMATION TOASTS */}
      <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[100] flex flex-col items-center gap-2 px-4">
        {toasts.map((t) => (
          <div
            key={t.id}
            role="status"
            className="pointer-events-auto flex w-full max-w-sm items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-lg shadow-foreground/10 duration-300 animate-in slide-in-from-bottom-4 fade-in"
          >
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Check className="size-4" />
            </span>
            <p className="flex-1 text-sm font-medium text-foreground text-pretty">{t.message}</p>
            <button
              type="button"
              aria-label="Dismiss notification"
              onClick={() => dismissToast(t.id)}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
