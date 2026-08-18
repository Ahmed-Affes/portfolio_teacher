'use client'

import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react'
import {
  WORK_ITEMS as DEFAULT_WORKS,
  VIDEOS as DEFAULT_VIDEOS,
  PRODUCTS as DEFAULT_PRODUCTS,
  STATS as DEFAULT_STATS,
  ABOUT_PILLARS as DEFAULT_PILLARS,
  AUDIENCES as DEFAULT_AUDIENCES,
  TESTIMONIALS as DEFAULT_TESTIMONIALS,
  FAQS as DEFAULT_FAQS,
  CONTACT as DEFAULT_CONTACT,
  type WorkItem,
  type Video,
  type Product,
  type Audience,
  type WorkCategory,
  type VideoCategory,
} from '@/lib/data'
import {
  supabase,
  isSupabaseConfigured,
  requestNotificationPermission,
  playNotificationSound,
  sendDeviceNotification,
  syncPortfolioSettingsToDb,
} from '@/lib/supabase'

export type { WorkItem, Video, Product, Audience, WorkCategory, VideoCategory }

export type StatItem = {
  id: string
  value: string
  label: string
}

export type HeroData = {
  eyebrow: string
  titlePrefix: string
  highlightWord: string
  titleSuffix: string
  bio: string
  ctaWorkText: string
  ctaContactText: string
  image: string
  marqueeItems: string[]
}

export type AboutPillar = {
  id: string
  number: string
  title: string
  subtitle: string
  description: string
  highlights: string[]
}

export type PillarItem = AboutPillar

export type AboutData = {
  eyebrow: string
  title: string
  intro: string
  bio1: string
  bio2: string
  portraitImage: string
  manifestoQuote: string
  manifestoAuthor: string
  manifestoLocation: string
  pillars: AboutPillar[]
}

export type TestimonialItem = {
  id: string
  quote: string
  name: string
  role: string
  rating?: number
  isActive?: boolean
}

export type FaqItem = {
  id: string
  q: string
  a: string
  isActive?: boolean
}

export type ContactData = {
  email: string
  whatsapp: string
  whatsappRaw: string
  location: string
  responseTime: string
  openForWorkshops: boolean
}

export type StoredMessage = {
  id: string
  created_at: string
  name: string
  email: string
  role: string
  topic: string
  message: string
  status: 'unread' | 'read' | 'replied' | 'archived'
}

export type StoredOrderItem = {
  id: string
  name: string
  price: number
  qty: number
  mode: 'buy' | 'rent'
}

export type StoredOrder = {
  id: string
  created_at: string
  customer_name: string
  customer_email?: string
  customer_phone: string
  customer_location?: string
  items: StoredOrderItem[]
  subtotal: number
  currency: string
  status: 'pending' | 'confirmed' | 'fulfilled' | 'cancelled' | 'processing' | 'completed'
  rental_dates?: string
  notes?: string
}

export type PortfolioState = {
  hero: HeroData
  stats: StatItem[]
  about: AboutData
  works: WorkItem[]
  videos: Video[]
  products: Product[]
  audiences: Audience[]
  testimonials: TestimonialItem[]
  faqs: FaqItem[]
  contact: ContactData
  messages: StoredMessage[]
  orders: StoredOrder[]
  adminPin: string
}

const STORAGE_KEY = 'farah_portfolio_state_v2'

const INITIAL_STATE: PortfolioState = {
  hero: {
    eyebrow: 'Interactive English & Phonics Educator',
    titlePrefix: 'Making English',
    highlightWord: 'tactile, intuitive,',
    titleSuffix: 'and unforgettable.',
    bio: 'Empowering young learners, supporting dedicated parents, and equipping passionate teachers with handcrafted DIY props, phonics toolkits, and dynamic classroom experiences.',
    ctaWorkText: 'Explore handcrafted materials',
    ctaContactText: 'Get in touch for workshops',
    image: '/images/hero-classroom.png',
    marqueeItems: [
      'Interactive DIY Props',
      'Tactile Phonics Wheels',
      'Kinesthetic Speaking Games',
      'Printable ESL Activity Bundles',
      'Teacher Training Workshops',
      'Montessori-Inspired Kits',
      'Custom Classroom Posters',
    ],
  },
  stats: [
    { id: 's1', value: '6+', label: 'Years Teaching' },
    { id: 's2', value: '900+', label: 'Learners Inspired' },
    { id: 's3', value: '80+', label: 'DIY Props Crafted' },
    { id: 's4', value: '25+', label: 'Workshops Given' },
  ],
  about: {
    eyebrow: 'Meet Farah Affes',
    title: 'A passionate educator turning abstract linguistics into tangible wonder.',
    intro:
      'English Teacher, Educational Content Creator & Kinesthetic Material Designer based in Sfax, Tunisia.',
    bio1:
      'For over six years, I have dedicated myself to transforming language acquisition from a passive chore into an active, tactile adventure. I believe children learn best when they can touch, rotate, build, and discover language with their own hands.',
    bio2:
      'Every phonics spinner, storytelling felt board, and printable quest I create is tested directly in real classrooms to spark curiosity, eliminate intimidation, and foster genuine conversational confidence.',
    portraitImage: '/images/farah-portrait.png',
    manifestoQuote:
      'Language is not a formula to memorize — it is a world to inhabit, touch, and celebrate.',
    manifestoAuthor: 'Farah Affes',
    manifestoLocation: 'Sfax, Tunisia',
    pillars: DEFAULT_PILLARS.map((p) => ({
      id: p.id,
      number: p.number,
      title: p.title,
      subtitle: p.subtitle,
      description: p.description,
      highlights: p.highlights,
    })),
  },
  works: DEFAULT_WORKS.map((w) => ({ ...w, isActive: true })),
  videos: DEFAULT_VIDEOS.map((v) => ({ ...v, isActive: true })),
  products: DEFAULT_PRODUCTS.map((p) => ({ ...p, isActive: true })),
  audiences: DEFAULT_AUDIENCES.map((a) => ({ ...a, isActive: true })),
  testimonials: DEFAULT_TESTIMONIALS.map((t, idx) => ({
    id: `t_${idx + 1}`,
    quote: t.quote,
    name: t.name,
    role: t.role,
    rating: 5,
    isActive: true,
  })),
  faqs: DEFAULT_FAQS.map((f, idx) => ({
    id: `faq_${idx + 1}`,
    q: f.q,
    a: f.a,
    isActive: true,
  })),
  contact: {
    email: DEFAULT_CONTACT.email,
    whatsapp: DEFAULT_CONTACT.whatsapp,
    whatsappRaw: DEFAULT_CONTACT.whatsappRaw,
    location: DEFAULT_CONTACT.location,
    responseTime: 'Within 24 hours',
    openForWorkshops: true,
  },
  messages: [],
  orders: [],
  adminPin: 'farah2026',
}

interface PortfolioContextType {
  state: PortfolioState
  isLoaded: boolean
  isRealtimeConnected: boolean
  hasNotificationPermission: boolean
  requestNotifications: () => Promise<boolean>
  testNotificationChime: () => void

  // Hero & Stats
  updateHero: (hero: Partial<HeroData>) => void
  updateStats: (stats: StatItem[]) => void

  // About & Pillars
  updateAbout: (about: Partial<AboutData>) => void
  updatePillar: (id: string, updates: Partial<AboutPillar>) => void

  // Works
  addWork: (work: Omit<WorkItem, 'id'>) => void
  updateWork: (id: string, updates: Partial<WorkItem>) => void
  toggleWorkActive: (id: string) => void
  deleteWork: (id: string) => void
  reorderWorks: (items: WorkItem[]) => void

  // Videos
  addVideo: (video: Omit<Video, 'id'>) => void
  updateVideo: (id: string, updates: Partial<Video>) => void
  toggleVideoActive: (id: string) => void
  deleteVideo: (id: string) => void

  // Products
  addProduct: (product: Omit<Product, 'id'>) => void
  updateProduct: (id: string, updates: Partial<Product>) => void
  toggleProductActive: (id: string) => void
  deleteProduct: (id: string) => void

  // Audiences
  addAudience: (audience: Omit<Audience, 'id'>) => void
  updateAudience: (id: string, updates: Partial<Audience>) => void
  toggleAudienceActive: (id: string) => void
  deleteAudience: (id: string) => void
  addAudiencePoint: (audienceId: string, point: string) => void
  removeAudiencePoint: (audienceId: string, index: number) => void

  // Testimonials
  addTestimonial: (testimonial: Omit<TestimonialItem, 'id'>) => void
  updateTestimonial: (id: string, updates: Partial<TestimonialItem>) => void
  toggleTestimonialActive: (id: string) => void
  deleteTestimonial: (id: string) => void

  // FAQs
  addFaq: (faq: Omit<FaqItem, 'id'>) => void
  updateFaq: (id: string, updates: Partial<FaqItem>) => void
  toggleFaqActive: (id: string) => void
  deleteFaq: (id: string) => void

  // Contact Info
  updateContact: (contact: Partial<ContactData>) => void

  // Admin Security
  updateAdminPin: (newPin: string) => void

  // Messages Inbox
  addMessage: (msg: Omit<StoredMessage, 'id' | 'created_at' | 'status'>) => void
  updateMessageStatus: (id: string, status: StoredMessage['status']) => void
  markMessageRead: (id: string, status?: StoredMessage['status']) => void
  deleteMessage: (id: string) => void

  // Orders Tracker
  addOrder: (order: Omit<StoredOrder, 'id' | 'created_at'>) => void
  updateOrderStatus: (id: string, status: StoredOrder['status']) => void
  deleteOrder: (id: string) => void

  // System State Management
  resetToDefaults: () => void
  exportBackupJson: () => string
  exportDataJson: () => string
  importBackupJson: (jsonString: string) => boolean
  importDataJson: (jsonString: string) => boolean
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined)

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<PortfolioState>(INITIAL_STATE)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isRealtimeConnected, setIsRealtimeConnected] = useState(false)
  const [hasNotificationPermission, setHasNotificationPermission] = useState(false)

  // 1. Initial State Load from LocalStorage
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        if ('Notification' in window) {
          setHasNotificationPermission(Notification.permission === 'granted')
        }

        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
          const parsed = JSON.parse(stored)
          setState((prev) => ({
            ...prev,
            ...parsed,
            hero: { ...prev.hero, ...(parsed.hero || {}) },
            about: { ...prev.about, ...(parsed.about || {}) },
            contact: { ...prev.contact, ...(parsed.contact || {}) },
            works: (parsed.works || prev.works).map((w: WorkItem) => ({
              ...w,
              isActive: w.isActive !== undefined ? w.isActive : true,
            })),
            videos: (parsed.videos || prev.videos).map((v: Video) => ({
              ...v,
              isActive: v.isActive !== undefined ? v.isActive : true,
            })),
            products: (parsed.products || prev.products).map((p: Product) => ({
              ...p,
              isActive: p.isActive !== undefined ? p.isActive : true,
            })),
            audiences: (parsed.audiences || prev.audiences).map((a: Audience) => ({
              ...a,
              isActive: a.isActive !== undefined ? a.isActive : true,
            })),
            testimonials: (parsed.testimonials || prev.testimonials).map((t: TestimonialItem) => ({
              ...t,
              isActive: t.isActive !== undefined ? t.isActive : true,
            })),
            faqs: (parsed.faqs || prev.faqs).map((f: FaqItem) => ({
              ...f,
              isActive: f.isActive !== undefined ? f.isActive : true,
            })),
            messages: parsed.messages || prev.messages,
            orders: parsed.orders || prev.orders,
          }))
        }
      }
    } catch (e) {
      console.warn('Failed to load portfolio state from localStorage:', e)
    } finally {
      setIsLoaded(true)
    }
  }, [])

  // 2. Persist State to LocalStorage helper
  const persistState = useCallback((newState: PortfolioState) => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newState))
      }
    } catch (e) {
      console.warn('Failed to save portfolio state to localStorage:', e)
    }
  }, [])

  // 3. Supabase Realtime Subscription Integration
  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return

    const channel = supabase
      .channel('public_realtime_portfolio')
      // Listen to new contact messages
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'contact_messages' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            const newRow = payload.new as StoredMessage
            setState((prev) => {
              // Avoid duplicates
              if (prev.messages.some((m) => m.id === newRow.id)) return prev
              const updated = [newRow, ...prev.messages]
              persistState({ ...prev, messages: updated })
              return { ...prev, messages: updated }
            })

            // Trigger sound & push notification
            sendDeviceNotification(`📬 New Message: ${newRow.name}`, {
              body: `${newRow.topic || 'Inquiry'}: "${newRow.message.slice(0, 80)}..."`,
              icon: '/images/farah-portrait.png',
            })
          } else if (payload.eventType === 'UPDATE') {
            const updatedRow = payload.new as StoredMessage
            setState((prev) => {
              const updated = prev.messages.map((m) => (m.id === updatedRow.id ? updatedRow : m))
              persistState({ ...prev, messages: updated })
              return { ...prev, messages: updated }
            })
          } else if (payload.eventType === 'DELETE') {
            const oldRow = payload.old as { id: string }
            setState((prev) => {
              const updated = prev.messages.filter((m) => m.id !== oldRow.id)
              persistState({ ...prev, messages: updated })
              return { ...prev, messages: updated }
            })
          }
        },
      )
      // Listen to new shop orders
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, (payload) => {
        if (payload.eventType === 'INSERT') {
          const newOrder = payload.new as StoredOrder
          setState((prev) => {
            if (prev.orders.some((o) => o.id === newOrder.id)) return prev
            const updated = [newOrder, ...prev.orders]
            persistState({ ...prev, orders: updated })
            return { ...prev, orders: updated }
          })

          sendDeviceNotification(`🛍️ New Order: ${newOrder.customer_name}`, {
            body: `Total: ${newOrder.subtotal} TND (${newOrder.customer_phone})`,
            icon: '/images/farah-portrait.png',
          })
        } else if (payload.eventType === 'UPDATE') {
          const updatedOrder = payload.new as StoredOrder
          setState((prev) => {
            const updated = prev.orders.map((o) => (o.id === updatedOrder.id ? updatedOrder : o))
            persistState({ ...prev, orders: updated })
            return { ...prev, orders: updated }
          })
        } else if (payload.eventType === 'DELETE') {
          const oldOrder = payload.old as { id: string }
          setState((prev) => {
            const updated = prev.orders.filter((o) => o.id !== oldOrder.id)
            persistState({ ...prev, orders: updated })
            return { ...prev, orders: updated }
          })
        }
      })
      // Listen to portfolio settings changes
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'portfolio_settings' },
        (payload) => {
          if (payload.eventType === 'INSERT' || payload.eventType === 'UPDATE') {
            const newSettings = payload.new as Partial<PortfolioState>
            setState((prev) => {
              const merged = {
                ...prev,
                hero: { ...prev.hero, ...(newSettings.hero || {}) },
                about: { ...prev.about, ...(newSettings.about || {}) },
                stats: (newSettings.stats as StatItem[]) || prev.stats,
                contact: { ...prev.contact, ...(newSettings.contact || {}) },
              }
              persistState(merged)
              return merged
            })
          }
        },
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          setIsRealtimeConnected(true)
        } else {
          setIsRealtimeConnected(false)
        }
      })

    return () => {
      if (supabase) {
        supabase.removeChannel(channel)
      }
    }
  }, [persistState])

  // Notification Permission Request
  const requestNotifications = useCallback(async () => {
    const permission = await requestNotificationPermission()
    const granted = permission === 'granted'
    setHasNotificationPermission(granted)
    if (granted) {
      playNotificationSound()
    }
    return granted
  }, [])

  const testNotificationChime = useCallback(() => {
    playNotificationSound()
    sendDeviceNotification('Farah Affes Studio Test Alert', {
      body: 'Notifications are active and connected in real-time!',
    })
  }, [])

  // --- Hero & Stats Mutators ---
  const updateHero = useCallback(
    (heroUpdates: Partial<HeroData>) => {
      setState((prev) => {
        const nextHero = { ...prev.hero, ...heroUpdates }
        const newState = { ...prev, hero: nextHero }
        persistState(newState)
        syncPortfolioSettingsToDb({ hero: nextHero })
        return newState
      })
    },
    [persistState],
  )

  const updateStats = useCallback(
    (stats: StatItem[]) => {
      setState((prev) => {
        const newState = { ...prev, stats }
        persistState(newState)
        syncPortfolioSettingsToDb({ stats })
        return newState
      })
    },
    [persistState],
  )

  // --- About & Pillars Mutators ---
  const updateAbout = useCallback(
    (aboutUpdates: Partial<AboutData>) => {
      setState((prev) => {
        const nextAbout = { ...prev.about, ...aboutUpdates }
        const newState = { ...prev, about: nextAbout }
        persistState(newState)
        syncPortfolioSettingsToDb({ about: nextAbout })
        return newState
      })
    },
    [persistState],
  )

  const updatePillar = useCallback(
    (id: string, updates: Partial<AboutPillar>) => {
      setState((prev) => {
        const updatedPillars = prev.about.pillars.map((p) =>
          p.id === id ? { ...p, ...updates } : p,
        )
        const nextAbout = { ...prev.about, pillars: updatedPillars }
        const newState = { ...prev, about: nextAbout }
        persistState(newState)
        syncPortfolioSettingsToDb({ about: nextAbout })
        return newState
      })
    },
    [persistState],
  )

  // --- Works Mutators (with Activate / Deactivate) ---
  const addWork = useCallback(
    (work: Omit<WorkItem, 'id'>) => {
      setState((prev) => {
        const newWork: WorkItem = {
          ...work,
          id: `w_${Date.now()}`,
          isActive: work.isActive !== undefined ? work.isActive : true,
        }
        const newState = { ...prev, works: [newWork, ...prev.works] }
        persistState(newState)
        return newState
      })
    },
    [persistState],
  )

  const updateWork = useCallback(
    (id: string, updates: Partial<WorkItem>) => {
      setState((prev) => {
        const updatedWorks = prev.works.map((w) => (w.id === id ? { ...w, ...updates } : w))
        const newState = { ...prev, works: updatedWorks }
        persistState(newState)
        return newState
      })
    },
    [persistState],
  )

  const toggleWorkActive = useCallback(
    (id: string) => {
      setState((prev) => {
        const updatedWorks = prev.works.map((w) =>
          w.id === id ? { ...w, isActive: w.isActive === false ? true : false } : w,
        )
        const newState = { ...prev, works: updatedWorks }
        persistState(newState)
        return newState
      })
    },
    [persistState],
  )

  const deleteWork = useCallback(
    (id: string) => {
      setState((prev) => {
        const newState = { ...prev, works: prev.works.filter((w) => w.id !== id) }
        persistState(newState)
        return newState
      })
    },
    [persistState],
  )

  const reorderWorks = useCallback(
    (items: WorkItem[]) => {
      setState((prev) => {
        const newState = { ...prev, works: items }
        persistState(newState)
        return newState
      })
    },
    [persistState],
  )

  // --- Videos Mutators (with Activate / Deactivate) ---
  const addVideo = useCallback(
    (video: Omit<Video, 'id'>) => {
      setState((prev) => {
        const newVideo: Video = {
          ...video,
          id: `v_${Date.now()}`,
          isActive: video.isActive !== undefined ? video.isActive : true,
        }
        const newState = { ...prev, videos: [newVideo, ...prev.videos] }
        persistState(newState)
        return newState
      })
    },
    [persistState],
  )

  const updateVideo = useCallback(
    (id: string, updates: Partial<Video>) => {
      setState((prev) => {
        const updatedVideos = prev.videos.map((v) => (v.id === id ? { ...v, ...updates } : v))
        const newState = { ...prev, videos: updatedVideos }
        persistState(newState)
        return newState
      })
    },
    [persistState],
  )

  const toggleVideoActive = useCallback(
    (id: string) => {
      setState((prev) => {
        const updatedVideos = prev.videos.map((v) =>
          v.id === id ? { ...v, isActive: v.isActive === false ? true : false } : v,
        )
        const newState = { ...prev, videos: updatedVideos }
        persistState(newState)
        return newState
      })
    },
    [persistState],
  )

  const deleteVideo = useCallback(
    (id: string) => {
      setState((prev) => {
        const newState = { ...prev, videos: prev.videos.filter((v) => v.id !== id) }
        persistState(newState)
        return newState
      })
    },
    [persistState],
  )

  // --- Products Mutators (with Activate / Deactivate) ---
  const addProduct = useCallback(
    (product: Omit<Product, 'id'>) => {
      setState((prev) => {
        const newProduct: Product = {
          ...product,
          id: `p_${Date.now()}`,
          isActive: product.isActive !== undefined ? product.isActive : true,
        }
        const newState = { ...prev, products: [newProduct, ...prev.products] }
        persistState(newState)
        return newState
      })
    },
    [persistState],
  )

  const updateProduct = useCallback(
    (id: string, updates: Partial<Product>) => {
      setState((prev) => {
        const updatedProducts = prev.products.map((p) =>
          p.id === id ? { ...p, ...updates } : p,
        )
        const newState = { ...prev, products: updatedProducts }
        persistState(newState)
        return newState
      })
    },
    [persistState],
  )

  const toggleProductActive = useCallback(
    (id: string) => {
      setState((prev) => {
        const updatedProducts = prev.products.map((p) =>
          p.id === id ? { ...p, isActive: p.isActive === false ? true : false } : p,
        )
        const newState = { ...prev, products: updatedProducts }
        persistState(newState)
        return newState
      })
    },
    [persistState],
  )

  const deleteProduct = useCallback(
    (id: string) => {
      setState((prev) => {
        const newState = { ...prev, products: prev.products.filter((p) => p.id !== id) }
        persistState(newState)
        return newState
      })
    },
    [persistState],
  )

  // --- Audiences Mutators (with Activate / Deactivate) ---
  const addAudience = useCallback(
    (audience: Omit<Audience, 'id'>) => {
      setState((prev) => {
        const newAudience: Audience = {
          ...audience,
          id: `aud_${Date.now()}`,
          isActive: audience.isActive !== undefined ? audience.isActive : true,
        }
        const newState = { ...prev, audiences: [...prev.audiences, newAudience] }
        persistState(newState)
        return newState
      })
    },
    [persistState],
  )

  const updateAudience = useCallback(
    (id: string, updates: Partial<Audience>) => {
      setState((prev) => {
        const updatedAudiences = prev.audiences.map((a) =>
          a.id === id ? { ...a, ...updates } : a,
        )
        const newState = { ...prev, audiences: updatedAudiences }
        persistState(newState)
        return newState
      })
    },
    [persistState],
  )

  const toggleAudienceActive = useCallback(
    (id: string) => {
      setState((prev) => {
        const updatedAudiences = prev.audiences.map((a) =>
          a.id === id ? { ...a, isActive: a.isActive === false ? true : false } : a,
        )
        const newState = { ...prev, audiences: updatedAudiences }
        persistState(newState)
        return newState
      })
    },
    [persistState],
  )

  const deleteAudience = useCallback(
    (id: string) => {
      setState((prev) => {
        const newState = { ...prev, audiences: prev.audiences.filter((a) => a.id !== id) }
        persistState(newState)
        return newState
      })
    },
    [persistState],
  )

  const addAudiencePoint = useCallback(
    (audienceId: string, point: string) => {
      if (!point.trim()) return
      setState((prev) => {
        const updated = prev.audiences.map((a) => {
          if (a.id === audienceId) {
            return { ...a, points: [...a.points, point.trim()] }
          }
          return a
        })
        const newState = { ...prev, audiences: updated }
        persistState(newState)
        return newState
      })
    },
    [persistState],
  )

  const removeAudiencePoint = useCallback(
    (audienceId: string, index: number) => {
      setState((prev) => {
        const updated = prev.audiences.map((a) => {
          if (a.id === audienceId) {
            return { ...a, points: a.points.filter((_, i) => i !== index) }
          }
          return a
        })
        const newState = { ...prev, audiences: updated }
        persistState(newState)
        return newState
      })
    },
    [persistState],
  )

  // --- Testimonials Mutators (with Activate / Deactivate) ---
  const addTestimonial = useCallback(
    (testimonial: Omit<TestimonialItem, 'id'>) => {
      setState((prev) => {
        const newTest: TestimonialItem = {
          ...testimonial,
          id: `t_${Date.now()}`,
          rating: testimonial.rating || 5,
          isActive: testimonial.isActive !== undefined ? testimonial.isActive : true,
        }
        const newState = { ...prev, testimonials: [newTest, ...prev.testimonials] }
        persistState(newState)
        return newState
      })
    },
    [persistState],
  )

  const updateTestimonial = useCallback(
    (id: string, updates: Partial<TestimonialItem>) => {
      setState((prev) => {
        const updated = prev.testimonials.map((t) => (t.id === id ? { ...t, ...updates } : t))
        const newState = { ...prev, testimonials: updated }
        persistState(newState)
        return newState
      })
    },
    [persistState],
  )

  const toggleTestimonialActive = useCallback(
    (id: string) => {
      setState((prev) => {
        const updated = prev.testimonials.map((t) =>
          t.id === id ? { ...t, isActive: t.isActive === false ? true : false } : t,
        )
        const newState = { ...prev, testimonials: updated }
        persistState(newState)
        return newState
      })
    },
    [persistState],
  )

  const deleteTestimonial = useCallback(
    (id: string) => {
      setState((prev) => {
        const newState = {
          ...prev,
          testimonials: prev.testimonials.filter((t) => t.id !== id),
        }
        persistState(newState)
        return newState
      })
    },
    [persistState],
  )

  // --- FAQs Mutators (with Activate / Deactivate) ---
  const addFaq = useCallback(
    (faq: Omit<FaqItem, 'id'>) => {
      setState((prev) => {
        const newFaq: FaqItem = {
          ...faq,
          id: `faq_${Date.now()}`,
          isActive: faq.isActive !== undefined ? faq.isActive : true,
        }
        const newState = { ...prev, faqs: [...prev.faqs, newFaq] }
        persistState(newState)
        return newState
      })
    },
    [persistState],
  )

  const updateFaq = useCallback(
    (id: string, updates: Partial<FaqItem>) => {
      setState((prev) => {
        const updated = prev.faqs.map((f) => (f.id === id ? { ...f, ...updates } : f))
        const newState = { ...prev, faqs: updated }
        persistState(newState)
        return newState
      })
    },
    [persistState],
  )

  const toggleFaqActive = useCallback(
    (id: string) => {
      setState((prev) => {
        const updated = prev.faqs.map((f) =>
          f.id === id ? { ...f, isActive: f.isActive === false ? true : false } : f,
        )
        const newState = { ...prev, faqs: updated }
        persistState(newState)
        return newState
      })
    },
    [persistState],
  )

  const deleteFaq = useCallback(
    (id: string) => {
      setState((prev) => {
        const newState = { ...prev, faqs: prev.faqs.filter((f) => f.id !== id) }
        persistState(newState)
        return newState
      })
    },
    [persistState],
  )

  // --- Contact Data Mutators ---
  const updateContact = useCallback(
    (contactUpdates: Partial<ContactData>) => {
      setState((prev) => {
        const nextContact = { ...prev.contact, ...contactUpdates }
        const newState = { ...prev, contact: nextContact }
        persistState(newState)
        syncPortfolioSettingsToDb({ contact: nextContact })
        return newState
      })
    },
    [persistState],
  )

  // --- Admin Security ---
  const updateAdminPin = useCallback(
    (newPin: string) => {
      setState((prev) => {
        const newState = { ...prev, adminPin: newPin }
        persistState(newState)
        syncPortfolioSettingsToDb({ admin_pin: newPin })
        return newState
      })
    },
    [persistState],
  )

  // --- Messages Inbox Mutators ---
  const addMessage = useCallback(
    (msg: Omit<StoredMessage, 'id' | 'created_at' | 'status'>) => {
      const newMsg: StoredMessage = {
        ...msg,
        id: `msg_${Date.now()}`,
        created_at: new Date().toISOString(),
        status: 'unread',
      }
      setState((prev) => {
        const updated = [newMsg, ...prev.messages]
        const newState = { ...prev, messages: updated }
        persistState(newState)
        return newState
      })

      // Send immediate local notification & sound
      sendDeviceNotification(`📬 New Message: ${msg.name}`, {
        body: `${msg.topic || 'Inquiry'}: "${msg.message.slice(0, 80)}..."`,
      })
    },
    [persistState],
  )

  const updateMessageStatus = useCallback(
    (id: string, status: StoredMessage['status']) => {
      setState((prev) => {
        const updated = prev.messages.map((m) => (m.id === id ? { ...m, status } : m))
        const newState = { ...prev, messages: updated }
        persistState(newState)
        return newState
      })
    },
    [persistState],
  )

  const markMessageRead = useCallback(
    (id: string, status: StoredMessage['status'] = 'read') => {
      updateMessageStatus(id, status)
    },
    [updateMessageStatus],
  )

  const deleteMessage = useCallback(
    (id: string) => {
      setState((prev) => {
        const updated = prev.messages.filter((m) => m.id !== id)
        const newState = { ...prev, messages: updated }
        persistState(newState)
        return newState
      })
    },
    [persistState],
  )

  // --- Orders Tracker Mutators ---
  const addOrder = useCallback(
    (order: Omit<StoredOrder, 'id' | 'created_at'>) => {
      const newOrder: StoredOrder = {
        ...order,
        id: `ord_${Date.now()}`,
        created_at: new Date().toISOString(),
      }
      setState((prev) => {
        const updated = [newOrder, ...prev.orders]
        const newState = { ...prev, orders: updated }
        persistState(newState)
        return newState
      })

      sendDeviceNotification(`🛍️ New Order: ${order.customer_name}`, {
        body: `Total: ${order.subtotal} TND (${order.customer_phone})`,
      })
    },
    [persistState],
  )

  const updateOrderStatus = useCallback(
    (id: string, status: StoredOrder['status']) => {
      setState((prev) => {
        const updated = prev.orders.map((o) => (o.id === id ? { ...o, status } : o))
        const newState = { ...prev, orders: updated }
        persistState(newState)
        return newState
      })
    },
    [persistState],
  )

  const deleteOrder = useCallback(
    (id: string) => {
      setState((prev) => {
        const updated = prev.orders.filter((o) => o.id !== id)
        const newState = { ...prev, orders: updated }
        persistState(newState)
        return newState
      })
    },
    [persistState],
  )

  // --- System Reset & Backup Management ---
  const resetToDefaults = useCallback(() => {
    setState(INITIAL_STATE)
    persistState(INITIAL_STATE)
  }, [persistState])

  const exportBackupJson = useCallback((): string => {
    return JSON.stringify(state, null, 2)
  }, [state])

  const exportDataJson = exportBackupJson

  const importBackupJson = useCallback(
    (jsonString: string): boolean => {
      try {
        const parsed = JSON.parse(jsonString)
        if (parsed && typeof parsed === 'object' && parsed.hero && parsed.about) {
          setState((prev) => ({
            ...prev,
            ...parsed,
          }))
          persistState(parsed)
          return true
        }
        return false
      } catch (e) {
        console.error('Import failed:', e)
        return false
      }
    },
    [persistState],
  )

  const importDataJson = importBackupJson

  const value = useMemo(
    () => ({
      state,
      isLoaded,
      isRealtimeConnected,
      hasNotificationPermission,
      requestNotifications,
      testNotificationChime,
      updateHero,
      updateStats,
      updateAbout,
      updatePillar,
      addWork,
      updateWork,
      toggleWorkActive,
      deleteWork,
      reorderWorks,
      addVideo,
      updateVideo,
      toggleVideoActive,
      deleteVideo,
      addProduct,
      updateProduct,
      toggleProductActive,
      deleteProduct,
      addAudience,
      updateAudience,
      toggleAudienceActive,
      deleteAudience,
      addAudiencePoint,
      removeAudiencePoint,
      addTestimonial,
      updateTestimonial,
      toggleTestimonialActive,
      deleteTestimonial,
      addFaq,
      updateFaq,
      toggleFaqActive,
      deleteFaq,
      updateContact,
      updateAdminPin,
      addMessage,
      updateMessageStatus,
      markMessageRead,
      deleteMessage,
      addOrder,
      updateOrderStatus,
      deleteOrder,
      resetToDefaults,
      exportBackupJson,
      exportDataJson,
      importBackupJson,
      importDataJson,
    }),
    [
      state,
      isLoaded,
      isRealtimeConnected,
      hasNotificationPermission,
      requestNotifications,
      testNotificationChime,
      updateHero,
      updateStats,
      updateAbout,
      updatePillar,
      addWork,
      updateWork,
      toggleWorkActive,
      deleteWork,
      reorderWorks,
      addVideo,
      updateVideo,
      toggleVideoActive,
      deleteVideo,
      addProduct,
      updateProduct,
      toggleProductActive,
      deleteProduct,
      addAudience,
      updateAudience,
      toggleAudienceActive,
      deleteAudience,
      addAudiencePoint,
      removeAudiencePoint,
      addTestimonial,
      updateTestimonial,
      toggleTestimonialActive,
      deleteTestimonial,
      addFaq,
      updateFaq,
      toggleFaqActive,
      deleteFaq,
      updateContact,
      updateAdminPin,
      addMessage,
      updateMessageStatus,
      markMessageRead,
      deleteMessage,
      addOrder,
      updateOrderStatus,
      deleteOrder,
      resetToDefaults,
      exportBackupJson,
      exportDataJson,
      importBackupJson,
      importDataJson,
    ],
  )

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>
}

export function usePortfolio() {
  const context = useContext(PortfolioContext)
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider')
  }
  return context
}
