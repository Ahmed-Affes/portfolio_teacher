'use client'

import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react'
import {
  WORK_ITEMS as DEFAULT_WORKS,
  VIDEOS as DEFAULT_VIDEOS,
  PRODUCTS as DEFAULT_PRODUCTS,
  STATS as DEFAULT_STATS,
  ABOUT_PILLARS as DEFAULT_PILLARS,
  CAREER_MILESTONES as DEFAULT_MILESTONES,
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
  type CareerMilestone,
  type MilestoneCategory,
} from '@/lib/data'
import {
  supabase,
  getSupabase,
  isSupabaseConfigured,
  requestNotificationPermission,
  playNotificationSound,
  sendDeviceNotification,
  syncPortfolioSettingsToDb,
  fetchPortfolioSettingsFromDb,
  fetchContactMessages,
  fetchOrders,
  submitContactMessage,
  updateContactMessageInDb,
  deleteContactMessageInDb,
  submitOrderRequest,
  updateOrderInDb,
  deleteOrderInDb,
  deleteTableItemInDb,
  isNotificationsMuted as getStoredNotificationsMuted,
  setNotificationsMuted as setStoredNotificationsMuted,
} from '@/lib/supabase'

export type { WorkItem, Video, Product, Audience, WorkCategory, VideoCategory, CareerMilestone, MilestoneCategory }

export type ProfileBrandingData = {
  name: string
  tagline: string
  avatarImage: string
  avatarType: 'image' | 'icon'
  badgeEmoji?: string
}

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
  milestones?: CareerMilestone[]
}

export type TestimonialItem = {
  id: string
  quote: string
  name: string
  role: string
  rating?: number
  showRating?: boolean
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
  profile: ProfileBrandingData
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

const STORAGE_KEY = 'farah_portfolio_state_v3'
const SYNC_EVENT_KEY = 'farah_portfolio_sync_event'

const INITIAL_STATE: PortfolioState = {
  profile: {
    name: 'Farah Affes',
    tagline: 'Teacher Studio',
    avatarImage: '/images/farah-portrait.png',
    avatarType: 'image',
    badgeEmoji: '✨',
  },
  hero: {
    eyebrow: 'Passionate Primary & Middle School English Teacher • Sfax, Tunisia',
    titlePrefix: 'Making English',
    highlightWord: 'tactile, playful',
    titleSuffix: '& unforgettable.',
    bio: 'Dedicated primary and middle school educator bridging phonetic mastery, immersive storytelling, and handcrafted DIY props to empower young English learners.',
    ctaWorkText: 'Explore my materials',
    ctaContactText: 'Get in touch',
    image: '/images/hero-classroom.png',
    marqueeItems: [
      'Phonics & Literacy Mastery',
      'Handmade Classroom Props',
      'Printable PDF Worksheets',
      'Teacher Training Workshops',
      'ESL Curriculum Design',
      'Interactive Storytelling Kits',
    ],
  },
  stats: [
    { id: 's1', value: DEFAULT_STATS[0].value, label: DEFAULT_STATS[0].label },
    { id: 's2', value: DEFAULT_STATS[1].value, label: DEFAULT_STATS[1].label },
    { id: 's3', value: DEFAULT_STATS[2].value, label: DEFAULT_STATS[2].label },
    { id: 's4', value: DEFAULT_STATS[3].value, label: DEFAULT_STATS[3].label },
  ],
  about: {
    eyebrow: 'Pedagogy & Philosophy',
    title: 'Transforming language learning into a hands-on adventure.',
    intro:
      'Hello! I am Farah Affes — an English educator based in Sfax, Tunisia. I believe that children acquire language most naturally when they can touch, manipulate, and play with concepts.',
    bio1:
      'Over the past 6+ years in primary and preparatory classrooms, I have observed that traditional rote drills often create anxiety for emerging bilingual learners. My response was to build physical, tactile learning aids: rotating phonics wheels that make sound blending intuitive, oversized action dice for dynamic speaking games, and character-driven storytelling kits.',
    bio2:
      'Beyond daily classroom instruction, I design print-ready worksheets, guide teachers through hands-on material making workshops, and provide classroom prop sets for rent across schools and tutoring centers in Tunisia.',
    portraitImage: '/images/farah-portrait.png',
    manifestoQuote:
      'When a child touches a word, moves a syllable with their hands, and acts out a story, English stops being a school subject and becomes their voice.',
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
    milestones: DEFAULT_MILESTONES.map((m) => ({
      ...m,
      isActive: true,
    })),
  },
  works: DEFAULT_WORKS.map((w) => ({
    ...w,
    isActive: true,
  })),
  videos: DEFAULT_VIDEOS.map((v) => ({
    ...v,
    isActive: true,
  })),
  products: DEFAULT_PRODUCTS.map((p) => ({
    ...p,
    isActive: true,
  })),
  audiences: DEFAULT_AUDIENCES.map((a) => ({
    ...a,
    isActive: true,
  })),
  testimonials: DEFAULT_TESTIMONIALS.map((t, idx) => ({
    id: `t_${idx + 1}`,
    name: t.name,
    role: t.role,
    quote: t.quote,
    rating: 5,
    showRating: true,
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
  isNotificationsMuted: boolean
  toggleNotificationsMuted: () => void
  requestNotifications: () => Promise<boolean>
  testNotificationChime: () => void

  // Content Mutators
  updateProfile: (profile: Partial<ProfileBrandingData>) => void
  updateHero: (hero: Partial<HeroData>) => void
  updateAbout: (about: Partial<AboutData>) => void
  updateContact: (contact: Partial<ContactData>) => void
  updateStats: (stats: StatItem[]) => void

  // Milestones (Education, Career & Life Journey) CRUD
  addMilestone: (milestone: Omit<CareerMilestone, 'id'>) => void
  updateMilestone: (id: string, milestone: Partial<CareerMilestone>) => void
  toggleMilestoneActive: (id: string) => void
  deleteMilestone: (id: string) => void
  reorderMilestones: (milestones: CareerMilestone[]) => void

  // Works CRUD
  addWork: (work: Omit<WorkItem, 'id'>) => void
  updateWork: (id: string, work: Partial<WorkItem>) => void
  toggleWorkActive: (id: string) => void
  deleteWork: (id: string) => void

  // Videos CRUD
  addVideo: (video: Omit<Video, 'id'>) => void
  updateVideo: (id: string, video: Partial<Video>) => void
  toggleVideoActive: (id: string) => void
  deleteVideo: (id: string) => void

  // Products CRUD
  addProduct: (product: Omit<Product, 'id'>) => void
  updateProduct: (id: string, product: Partial<Product>) => void
  toggleProductActive: (id: string) => void
  deleteProduct: (id: string) => void

  // Audiences CRUD
  addAudience: (audience: Omit<Audience, 'id'>) => void
  updateAudience: (id: string, audience: Partial<Audience>) => void
  toggleAudienceActive: (id: string) => void
  deleteAudience: (id: string) => void
  addAudiencePoint: (audienceId: string, point: string) => void
  removeAudiencePoint: (audienceId: string, index: number) => void

  // Testimonials CRUD
  addTestimonial: (item: Omit<TestimonialItem, 'id'>) => void
  updateTestimonial: (id: string, item: Partial<TestimonialItem>) => void
  toggleTestimonialActive: (id: string) => void
  deleteTestimonial: (id: string) => void

  // FAQ CRUD
  addFaq: (faq: Omit<FaqItem, 'id'>) => void
  updateFaq: (id: string, faq: Partial<FaqItem>) => void
  toggleFaqActive: (id: string) => void
  deleteFaq: (id: string) => void

  // Messages & Orders
  addMessage: (msg: {
    name: string
    email: string
    role: string
    topic: string
    message: string
    status?: StoredMessage['status']
  }) => void
  markMessageRead: (id: string, status?: StoredMessage['status']) => void
  deleteMessage: (id: string) => void

  addOrder: (order: Omit<StoredOrder, 'id' | 'created_at'>) => void
  updateOrderStatus: (id: string, status: StoredOrder['status']) => void
  deleteOrder: (id: string) => void

  // Admin PIN & Backups
  updateAdminPin: (newPin: string) => void
  resetToDefaults: () => void
  exportDataJson: () => string
  importDataJson: (jsonString: string) => boolean
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined)

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<PortfolioState>(INITIAL_STATE)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isRealtimeConnected, setIsRealtimeConnected] = useState(false)
  const [hasNotificationPermission, setHasNotificationPermission] = useState(false)
  const [isNotificationsMuted, setIsNotificationsMutedState] = useState(false)

  // 1. Persist State and Broadcast Cross-Tab & Supabase helper
  const broadcastAndPersist = useCallback((newState: PortfolioState) => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newState))
        // Dispatch local event for same-tab & cross-tab instant responsiveness
        window.dispatchEvent(new CustomEvent(SYNC_EVENT_KEY, { detail: newState }))
      }
    } catch (e) {
      console.warn('Failed to save to localStorage:', e)
    }

    // Also sync snapshot to Supabase cloud database
    syncPortfolioSettingsToDb({
      hero: newState.hero,
      about: newState.about,
      stats: newState.stats,
      contact: newState.contact,
      works: newState.works,
      videos: newState.videos,
      products: newState.products,
      audiences: newState.audiences,
      testimonials: newState.testimonials,
      faqs: newState.faqs,
      admin_pin: newState.adminPin,
    })
  }, [])

  // 2. Initial Mount: Load Local + Fetch Cloud Database snapshot
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Notification states
    setIsNotificationsMutedState(getStoredNotificationsMuted())
    if ('Notification' in window) {
      setHasNotificationPermission(Notification.permission === 'granted')
    }

    // Step A: Load from localStorage immediately (fast 0ms paint)
    let current = INITIAL_STATE
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        const parsedMilestones = parsed.about?.milestones
        const resolvedMilestones =
          Array.isArray(parsedMilestones) && parsedMilestones.length >= DEFAULT_MILESTONES.length
            ? parsedMilestones
            : DEFAULT_MILESTONES.map((m) => ({ ...m, isActive: true }))

        current = {
          ...INITIAL_STATE,
          ...parsed,
          hero: { ...INITIAL_STATE.hero, ...(parsed.hero || {}) },
          about: {
            ...INITIAL_STATE.about,
            ...(parsed.about || {}),
            milestones: resolvedMilestones,
          },
          contact: { ...INITIAL_STATE.contact, ...(parsed.contact || {}) },
          works: (parsed.works || INITIAL_STATE.works).map((w: WorkItem) => ({
            ...w,
            isActive: w.isActive !== undefined ? w.isActive : true,
          })),
          videos: (parsed.videos || INITIAL_STATE.videos).map((v: Video) => ({
            ...v,
            isActive: v.isActive !== undefined ? v.isActive : true,
          })),
          products: (parsed.products || INITIAL_STATE.products).map((p: Product) => ({
            ...p,
            isActive: p.isActive !== undefined ? p.isActive : true,
          })),
          audiences: (parsed.audiences || INITIAL_STATE.audiences).map((a: Audience) => ({
            ...a,
            isActive: a.isActive !== undefined ? a.isActive : true,
          })),
          testimonials: (parsed.testimonials || INITIAL_STATE.testimonials).map((t: TestimonialItem) => ({
            ...t,
            isActive: t.isActive !== undefined ? t.isActive : true,
            showRating: t.showRating !== undefined ? t.showRating : true,
          })),
          faqs: (parsed.faqs || INITIAL_STATE.faqs).map((f: FaqItem) => ({
            ...f,
            isActive: f.isActive !== undefined ? f.isActive : true,
          })),
          messages: parsed.messages || [],
          orders: parsed.orders || [],
        }
        setState(current)
      }
    } catch (e) {
      console.warn('LocalStorage parse error:', e)
    } finally {
      setIsLoaded(true)
    }

    // Step B: Fetch latest Cloud State from Supabase (for mobile & multi-device sync)
    async function loadCloudState() {
      try {
        const [cloudSettings, cloudMessages, cloudOrders] = await Promise.all([
          fetchPortfolioSettingsFromDb(),
          fetchContactMessages(),
          fetchOrders(),
        ])

        // If cloud database has no data yet (0 rows), seed with baseline defaults
        if (
          !cloudSettings ||
          !cloudSettings.hero ||
          !Array.isArray(cloudSettings.works) ||
          cloudSettings.works.length === 0
        ) {
          syncPortfolioSettingsToDb({
            hero: INITIAL_STATE.hero,
            about: INITIAL_STATE.about,
            stats: INITIAL_STATE.stats,
            contact: INITIAL_STATE.contact,
            works: INITIAL_STATE.works,
            videos: INITIAL_STATE.videos,
            products: INITIAL_STATE.products,
            audiences: INITIAL_STATE.audiences,
            testimonials: INITIAL_STATE.testimonials,
            faqs: INITIAL_STATE.faqs,
            admin_pin: INITIAL_STATE.adminPin,
          })
        }

        setState((prev) => {
          const cloudMilestones = (cloudSettings?.about as any)?.milestones
          const resolvedCloudMilestones =
            Array.isArray(cloudMilestones) && cloudMilestones.length >= DEFAULT_MILESTONES.length
              ? cloudMilestones
              : prev.about.milestones && prev.about.milestones.length >= DEFAULT_MILESTONES.length
                ? prev.about.milestones
                : DEFAULT_MILESTONES.map((m) => ({ ...m, isActive: true }))

          const merged: PortfolioState = {
            ...prev,
            hero: cloudSettings?.hero ? { ...prev.hero, ...(cloudSettings.hero || {}) } : prev.hero,
            about: {
              ...(cloudSettings?.about ? { ...prev.about, ...(cloudSettings.about || {}) } : prev.about),
              milestones: resolvedCloudMilestones,
            },
            stats: Array.isArray(cloudSettings?.stats) && cloudSettings.stats.length > 0 ? (cloudSettings.stats as StatItem[]) : prev.stats,
            contact: cloudSettings?.contact ? { ...prev.contact, ...(cloudSettings.contact || {}) } : prev.contact,
            works: Array.isArray(cloudSettings?.works) && cloudSettings.works.length > 0 ? (cloudSettings.works as WorkItem[]) : prev.works,
            videos: Array.isArray(cloudSettings?.videos) && cloudSettings.videos.length > 0 ? (cloudSettings.videos as Video[]) : prev.videos,
            products: Array.isArray(cloudSettings?.products) && cloudSettings.products.length > 0 ? (cloudSettings.products as Product[]) : prev.products,
            audiences: Array.isArray(cloudSettings?.audiences) && cloudSettings.audiences.length > 0 ? (cloudSettings.audiences as Audience[]) : prev.audiences,
            testimonials: Array.isArray(cloudSettings?.testimonials) && cloudSettings.testimonials.length > 0 ? (cloudSettings.testimonials as TestimonialItem[]) : prev.testimonials,
            faqs: Array.isArray(cloudSettings?.faqs) && cloudSettings.faqs.length > 0 ? (cloudSettings.faqs as FaqItem[]) : prev.faqs,
            adminPin: (cloudSettings?.admin_pin as string) || prev.adminPin,
            messages: cloudMessages && cloudMessages.length > 0 ? (cloudMessages as StoredMessage[]) : prev.messages,
            orders: cloudOrders && cloudOrders.length > 0 ? (cloudOrders as StoredOrder[]) : prev.orders,
          }
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(merged))
          } catch {
            // ignore
          }
          return merged
        })
      } catch (err) {
        console.warn('Could not sync cloud state from Supabase:', err)
      }
    }

    loadCloudState()

    // Step C: Listen to same-tab and cross-tab storage events
    const handleSyncEvent = (e: Event) => {
      const customEvent = e as CustomEvent<PortfolioState>
      if (customEvent.detail) {
        setState(customEvent.detail)
      }
    }

    const handleStorageEvent = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          setState(JSON.parse(e.newValue))
        } catch {
          // ignore
        }
      }
    }

    window.addEventListener(SYNC_EVENT_KEY, handleSyncEvent)
    window.addEventListener('storage', handleStorageEvent)

    return () => {
      window.removeEventListener(SYNC_EVENT_KEY, handleSyncEvent)
      window.removeEventListener('storage', handleStorageEvent)
    }
  }, [])

  // 3. Supabase Realtime Subscription Integration across all tables
  useEffect(() => {
    const client = getSupabase()
    if (!client) {
      setIsRealtimeConnected(false)
      return
    }

    const channel = client
      .channel('public_realtime_portfolio_v4')
      // Listen to new contact messages
      .on(
        'postgres_changes' as any,
        { event: '*', schema: 'public', table: 'contact_messages' },
        (payload: any) => {
          if (payload.eventType === 'INSERT') {
            const newRow = payload.new as StoredMessage
            setState((prev) => {
              const exists = prev.messages.some(
                (m) =>
                  m.id === newRow.id ||
                  (m.name === newRow.name &&
                    m.email === newRow.email &&
                    m.message === newRow.message),
              )

              let updated: StoredMessage[]
              if (exists) {
                updated = prev.messages.map((m) =>
                  m.name === newRow.name &&
                  m.email === newRow.email &&
                  m.message === newRow.message
                    ? newRow
                    : m,
                )
              } else {
                updated = [newRow, ...prev.messages]
              }

              try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...prev, messages: updated }))
              } catch {}
              return { ...prev, messages: updated }
            })

            sendDeviceNotification(`📬 New Message: ${newRow.name}`, {
              body: `${newRow.topic || 'Inquiry'}: "${newRow.message.slice(0, 80)}..."`,
              icon: '/images/farah-portrait.png',
            })
          } else if (payload.eventType === 'UPDATE') {
            const updatedRow = payload.new as StoredMessage
            setState((prev) => {
              const updated = prev.messages.map((m) => (m.id === updatedRow.id ? updatedRow : m))
              try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...prev, messages: updated }))
              } catch {}
              return { ...prev, messages: updated }
            })
          } else if (payload.eventType === 'DELETE') {
            const oldRow = payload.old as { id: string }
            setState((prev) => {
              const updated = prev.messages.filter((m) => m.id !== oldRow.id)
              try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...prev, messages: updated }))
              } catch {}
              return { ...prev, messages: updated }
            })
          }
        },
      )
      // Listen to new shop orders
      .on('postgres_changes' as any, { event: '*', schema: 'public', table: 'orders' }, (payload: any) => {
        if (payload.eventType === 'INSERT') {
          const newOrder = payload.new as StoredOrder
          setState((prev) => {
            const exists = prev.orders.some(
              (o) =>
                o.id === newOrder.id ||
                (o.customer_phone === newOrder.customer_phone &&
                  o.subtotal === newOrder.subtotal &&
                  o.customer_name === newOrder.customer_name),
            )

            let updated: StoredOrder[]
            if (exists) {
              updated = prev.orders.map((o) =>
                o.customer_phone === newOrder.customer_phone &&
                o.subtotal === newOrder.subtotal &&
                o.customer_name === newOrder.customer_name
                  ? newOrder
                  : o,
              )
            } else {
              updated = [newOrder, ...prev.orders]
            }

            try {
              localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...prev, orders: updated }))
            } catch {}
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
            try {
              localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...prev, orders: updated }))
            } catch {}
            return { ...prev, orders: updated }
          })
        } else if (payload.eventType === 'DELETE') {
          const oldOrder = payload.old as { id: string }
          setState((prev) => {
            const updated = prev.orders.filter((o) => o.id !== oldOrder.id)
            try {
              localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...prev, orders: updated }))
            } catch {}
            return { ...prev, orders: updated }
          })
        }
      })
      // Listen to portfolio settings (hero, about, contact, stats)
      .on(
        'postgres_changes' as any,
        { event: '*', schema: 'public', table: 'portfolio_settings' },
        (payload: any) => {
          if (payload.eventType === 'INSERT' || payload.eventType === 'UPDATE') {
            const newSettings = payload.new as Record<string, unknown>
            setState((prev) => {
              const merged: PortfolioState = {
                ...prev,
                hero: newSettings.hero ? { ...prev.hero, ...(newSettings.hero as Partial<HeroData>) } : prev.hero,
                about: newSettings.about ? { ...prev.about, ...(newSettings.about as Partial<AboutData>) } : prev.about,
                stats: Array.isArray(newSettings.stats) ? (newSettings.stats as StatItem[]) : prev.stats,
                contact: newSettings.contact ? { ...prev.contact, ...(newSettings.contact as Partial<ContactData>) } : prev.contact,
                works: Array.isArray(newSettings.works) ? (newSettings.works as WorkItem[]) : prev.works,
                videos: Array.isArray(newSettings.videos) ? (newSettings.videos as Video[]) : prev.videos,
                products: Array.isArray(newSettings.products) ? (newSettings.products as Product[]) : prev.products,
                audiences: Array.isArray(newSettings.audiences) ? (newSettings.audiences as Audience[]) : prev.audiences,
                testimonials: Array.isArray(newSettings.testimonials) ? (newSettings.testimonials as TestimonialItem[]) : prev.testimonials,
                faqs: Array.isArray(newSettings.faqs) ? (newSettings.faqs as FaqItem[]) : prev.faqs,
                adminPin: (newSettings.admin_pin as string) || prev.adminPin,
              }
              try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(merged))
              } catch {}
              return merged
            })
          }
        },
      )
      // Listen to works table
      .on('postgres_changes' as any, { event: '*', schema: 'public', table: 'works' }, (payload: any) => {
        if (payload.eventType === 'INSERT' || payload.eventType === 'UPDATE') {
          const row = payload.new as any
          const item: WorkItem = {
            id: row.id,
            title: row.title,
            category: row.category,
            tag: row.tag,
            image: row.image,
            description: row.description,
            format: row.format || '',
            year: row.year || '',
            highlights: row.highlights || [],
            isActive: row.is_active !== false,
          }
          setState((prev) => {
            const exists = prev.works.some((w) => w.id === item.id)
            const updated = exists ? prev.works.map((w) => (w.id === item.id ? item : w)) : [item, ...prev.works]
            try {
              localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...prev, works: updated }))
            } catch {}
            return { ...prev, works: updated }
          })
        } else if (payload.eventType === 'DELETE') {
          const oldRow = payload.old as { id: string }
          setState((prev) => {
            const updated = prev.works.filter((w) => w.id !== oldRow.id)
            try {
              localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...prev, works: updated }))
            } catch {}
            return { ...prev, works: updated }
          })
        }
      })
      // Listen to videos table
      .on('postgres_changes' as any, { event: '*', schema: 'public', table: 'videos' }, (payload: any) => {
        if (payload.eventType === 'INSERT' || payload.eventType === 'UPDATE') {
          const row = payload.new as any
          const item: Video = {
            id: row.id,
            title: row.title,
            duration: row.duration,
            level: row.level,
            category: row.category,
            thumbnail: row.thumbnail,
            src: row.src,
            takeaways: row.takeaways || [],
            isActive: row.is_active !== false,
          }
          setState((prev) => {
            const exists = prev.videos.some((v) => v.id === item.id)
            const updated = exists ? prev.videos.map((v) => (v.id === item.id ? item : v)) : [item, ...prev.videos]
            try {
              localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...prev, videos: updated }))
            } catch {}
            return { ...prev, videos: updated }
          })
        } else if (payload.eventType === 'DELETE') {
          const oldRow = payload.old as { id: string }
          setState((prev) => {
            const updated = prev.videos.filter((v) => v.id !== oldRow.id)
            try {
              localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...prev, videos: updated }))
            } catch {}
            return { ...prev, videos: updated }
          })
        }
      })
      // Listen to products table
      .on('postgres_changes' as any, { event: '*', schema: 'public', table: 'products' }, (payload: any) => {
        if (payload.eventType === 'INSERT' || payload.eventType === 'UPDATE') {
          const row = payload.new as any
          const item: Product = {
            id: row.id,
            name: row.name,
            category: row.category,
            image: row.image,
            description: row.description,
            buyPrice: row.buy_price != null ? Number(row.buy_price) : undefined,
            rentPrice: row.rent_price != null ? Number(row.rent_price) : undefined,
            options: row.options || ['buy'],
            features: row.features || [],
            isActive: row.is_active !== false,
          }
          setState((prev) => {
            const exists = prev.products.some((p) => p.id === item.id)
            const updated = exists ? prev.products.map((p) => (p.id === item.id ? item : p)) : [item, ...prev.products]
            try {
              localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...prev, products: updated }))
            } catch {}
            return { ...prev, products: updated }
          })
        } else if (payload.eventType === 'DELETE') {
          const oldRow = payload.old as { id: string }
          setState((prev) => {
            const updated = prev.products.filter((p) => p.id !== oldRow.id)
            try {
              localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...prev, products: updated }))
            } catch {}
            return { ...prev, products: updated }
          })
        }
      })
      // Listen to testimonials table
      .on('postgres_changes' as any, { event: '*', schema: 'public', table: 'testimonials' }, (payload: any) => {
        if (payload.eventType === 'INSERT' || payload.eventType === 'UPDATE') {
          const row = payload.new as any
          const item: TestimonialItem = {
            id: row.id,
            name: row.name,
            role: row.role,
            quote: row.quote,
            rating: row.rating != null ? Number(row.rating) : 5,
            showRating: (row.rating ?? 0) > 0,
            isActive: row.is_active !== false,
          }
          setState((prev) => {
            const exists = prev.testimonials.some((t) => t.id === item.id)
            const updated = exists ? prev.testimonials.map((t) => (t.id === item.id ? item : t)) : [item, ...prev.testimonials]
            try {
              localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...prev, testimonials: updated }))
            } catch {}
            return { ...prev, testimonials: updated }
          })
        } else if (payload.eventType === 'DELETE') {
          const oldRow = payload.old as { id: string }
          setState((prev) => {
            const updated = prev.testimonials.filter((t) => t.id !== oldRow.id)
            try {
              localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...prev, testimonials: updated }))
            } catch {}
            return { ...prev, testimonials: updated }
          })
        }
      })
      // Listen to faqs table
      .on('postgres_changes' as any, { event: '*', schema: 'public', table: 'faqs' }, (payload: any) => {
        if (payload.eventType === 'INSERT' || payload.eventType === 'UPDATE') {
          const row = payload.new as any
          const item: FaqItem = {
            id: row.id,
            q: row.q,
            a: row.a,
            isActive: row.is_active !== false,
          }
          setState((prev) => {
            const exists = prev.faqs.some((f) => f.id === item.id)
            const updated = exists ? prev.faqs.map((f) => (f.id === item.id ? item : f)) : [item, ...prev.faqs]
            try {
              localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...prev, faqs: updated }))
            } catch {}
            return { ...prev, faqs: updated }
          })
        } else if (payload.eventType === 'DELETE') {
          const oldRow = payload.old as { id: string }
          setState((prev) => {
            const updated = prev.faqs.filter((f) => f.id !== oldRow.id)
            try {
              localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...prev, faqs: updated }))
            } catch {}
            return { ...prev, faqs: updated }
          })
        }
      })
      .subscribe((status: string) => {
        if (status === 'SUBSCRIBED') {
          setIsRealtimeConnected(true)
        } else {
          setIsRealtimeConnected(false)
        }
      })

    return () => {
      if (client) {
        client.removeChannel(channel)
      }
    }
  }, [])

  // Toggle Mute Notifications
  const toggleNotificationsMuted = useCallback(() => {
    setIsNotificationsMutedState((prev) => {
      const next = !prev
      setStoredNotificationsMuted(next)
      return next
    })
  }, [])

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
    sendDeviceNotification('Farah Affes Studio Alert Test', {
      body: 'Notifications are active and connected in real-time!',
    })
  }, [])

  // --- Profile & Branding Mutator ---
  const updateProfile = useCallback(
    (profileUpdates: Partial<ProfileBrandingData>) => {
      setState((prev) => {
        const nextProfile = { ...(prev.profile || INITIAL_STATE.profile), ...profileUpdates }
        const newState = { ...prev, profile: nextProfile }
        broadcastAndPersist(newState)
        return newState
      })
    },
    [broadcastAndPersist],
  )

  // --- Hero & Stats Mutators ---
  const updateHero = useCallback(
    (heroUpdates: Partial<HeroData>) => {
      setState((prev) => {
        const nextHero = { ...prev.hero, ...heroUpdates }
        const newState = { ...prev, hero: nextHero }
        broadcastAndPersist(newState)
        return newState
      })
    },
    [broadcastAndPersist],
  )

  const updateStats = useCallback(
    (newStats: StatItem[]) => {
      setState((prev) => {
        const newState = { ...prev, stats: newStats }
        broadcastAndPersist(newState)
        return newState
      })
    },
    [broadcastAndPersist],
  )

  // --- About Mutators ---
  const updateAbout = useCallback(
    (aboutUpdates: Partial<AboutData>) => {
      setState((prev) => {
        const nextAbout = { ...prev.about, ...aboutUpdates }
        const newState = { ...prev, about: nextAbout }
        broadcastAndPersist(newState)
        return newState
      })
    },
    [broadcastAndPersist],
  )

  // --- Milestones (Education, Career & Life Journey) CRUD ---
  const addMilestone = useCallback(
    (milestoneData: Omit<CareerMilestone, 'id'>) => {
      setState((prev) => {
        const currentMilestones = prev.about.milestones || DEFAULT_MILESTONES
        const newMilestone: CareerMilestone = {
          ...milestoneData,
          id: `m_${Date.now()}`,
          isActive: milestoneData.isActive !== undefined ? milestoneData.isActive : true,
        }
        const nextAbout = {
          ...prev.about,
          milestones: [newMilestone, ...currentMilestones],
        }
        const newState = { ...prev, about: nextAbout }
        broadcastAndPersist(newState)
        return newState
      })
    },
    [broadcastAndPersist],
  )

  const updateMilestone = useCallback(
    (id: string, updates: Partial<CareerMilestone>) => {
      setState((prev) => {
        const currentMilestones = prev.about.milestones || DEFAULT_MILESTONES
        const updated = currentMilestones.map((m) => (m.id === id ? { ...m, ...updates } : m))
        const nextAbout = { ...prev.about, milestones: updated }
        const newState = { ...prev, about: nextAbout }
        broadcastAndPersist(newState)
        return newState
      })
    },
    [broadcastAndPersist],
  )

  const toggleMilestoneActive = useCallback(
    (id: string) => {
      setState((prev) => {
        const currentMilestones = prev.about.milestones || DEFAULT_MILESTONES
        const updated = currentMilestones.map((m) =>
          m.id === id ? { ...m, isActive: m.isActive === false } : m,
        )
        const nextAbout = { ...prev.about, milestones: updated }
        const newState = { ...prev, about: nextAbout }
        broadcastAndPersist(newState)
        return newState
      })
    },
    [broadcastAndPersist],
  )

  const deleteMilestone = useCallback(
    (id: string) => {
      setState((prev) => {
        const currentMilestones = prev.about.milestones || DEFAULT_MILESTONES
        const updated = currentMilestones.filter((m) => m.id !== id)
        const nextAbout = { ...prev.about, milestones: updated }
        const newState = { ...prev, about: nextAbout }
        broadcastAndPersist(newState)
        return newState
      })
    },
    [broadcastAndPersist],
  )

  const reorderMilestones = useCallback(
    (newMilestones: CareerMilestone[]) => {
      setState((prev) => {
        const nextAbout = { ...prev.about, milestones: newMilestones }
        const newState = { ...prev, about: nextAbout }
        broadcastAndPersist(newState)
        return newState
      })
    },
    [broadcastAndPersist],
  )

  // --- Contact Mutator ---
  const updateContact = useCallback(
    (contactUpdates: Partial<ContactData>) => {
      setState((prev) => {
        const nextContact = { ...prev.contact, ...contactUpdates }
        const newState = { ...prev, contact: nextContact }
        broadcastAndPersist(newState)
        return newState
      })
    },
    [broadcastAndPersist],
  )

  // --- Works Showcase CRUD ---
  const addWork = useCallback(
    (workData: Omit<WorkItem, 'id'>) => {
      setState((prev) => {
        const newWork: WorkItem = {
          ...workData,
          id: `work_${Date.now()}`,
          isActive: workData.isActive !== undefined ? workData.isActive : true,
        }
        const newState = { ...prev, works: [newWork, ...prev.works] }
        broadcastAndPersist(newState)
        return newState
      })
    },
    [broadcastAndPersist],
  )

  const updateWork = useCallback(
    (id: string, updates: Partial<WorkItem>) => {
      setState((prev) => {
        const updatedWorks = prev.works.map((w) => (w.id === id ? { ...w, ...updates } : w))
        const newState = { ...prev, works: updatedWorks }
        broadcastAndPersist(newState)
        return newState
      })
    },
    [broadcastAndPersist],
  )

  const toggleWorkActive = useCallback(
    (id: string) => {
      setState((prev) => {
        const updatedWorks = prev.works.map((w) =>
          w.id === id ? { ...w, isActive: w.isActive === false ? true : false } : w,
        )
        const newState = { ...prev, works: updatedWorks }
        broadcastAndPersist(newState)
        return newState
      })
    },
    [broadcastAndPersist],
  )

  const deleteWork = useCallback(
    (id: string) => {
      deleteTableItemInDb('works', id)
      setState((prev) => {
        const updatedWorks = prev.works.filter((w) => w.id !== id)
        const newState = { ...prev, works: updatedWorks }
        broadcastAndPersist(newState)
        return newState
      })
    },
    [broadcastAndPersist],
  )

  // --- Video Lessons CRUD ---
  const addVideo = useCallback(
    (videoData: Omit<Video, 'id'>) => {
      setState((prev) => {
        const newVideo: Video = {
          ...videoData,
          id: `vid_${Date.now()}`,
          isActive: videoData.isActive !== undefined ? videoData.isActive : true,
        }
        const newState = { ...prev, videos: [newVideo, ...prev.videos] }
        broadcastAndPersist(newState)
        return newState
      })
    },
    [broadcastAndPersist],
  )

  const updateVideo = useCallback(
    (id: string, updates: Partial<Video>) => {
      setState((prev) => {
        const updatedVideos = prev.videos.map((v) => (v.id === id ? { ...v, ...updates } : v))
        const newState = { ...prev, videos: updatedVideos }
        broadcastAndPersist(newState)
        return newState
      })
    },
    [broadcastAndPersist],
  )

  const toggleVideoActive = useCallback(
    (id: string) => {
      setState((prev) => {
        const updatedVideos = prev.videos.map((v) =>
          v.id === id ? { ...v, isActive: v.isActive === false ? true : false } : v,
        )
        const newState = { ...prev, videos: updatedVideos }
        broadcastAndPersist(newState)
        return newState
      })
    },
    [broadcastAndPersist],
  )

  const deleteVideo = useCallback(
    (id: string) => {
      deleteTableItemInDb('videos', id)
      setState((prev) => {
        const updatedVideos = prev.videos.filter((v) => v.id !== id)
        const newState = { ...prev, videos: updatedVideos }
        broadcastAndPersist(newState)
        return newState
      })
    },
    [broadcastAndPersist],
  )

  // --- Products CRUD ---
  const addProduct = useCallback(
    (productData: Omit<Product, 'id'>) => {
      setState((prev) => {
        const newProduct: Product = {
          ...productData,
          id: `prod_${Date.now()}`,
          isActive: productData.isActive !== undefined ? productData.isActive : true,
        }
        const newState = { ...prev, products: [newProduct, ...prev.products] }
        broadcastAndPersist(newState)
        return newState
      })
    },
    [broadcastAndPersist],
  )

  const updateProduct = useCallback(
    (id: string, updates: Partial<Product>) => {
      setState((prev) => {
        const updatedProducts = prev.products.map((p) => (p.id === id ? { ...p, ...updates } : p))
        const newState = { ...prev, products: updatedProducts }
        broadcastAndPersist(newState)
        return newState
      })
    },
    [broadcastAndPersist],
  )

  const toggleProductActive = useCallback(
    (id: string) => {
      setState((prev) => {
        const updatedProducts = prev.products.map((p) =>
          p.id === id ? { ...p, isActive: p.isActive === false ? true : false } : p,
        )
        const newState = { ...prev, products: updatedProducts }
        broadcastAndPersist(newState)
        return newState
      })
    },
    [broadcastAndPersist],
  )

  const deleteProduct = useCallback(
    (id: string) => {
      deleteTableItemInDb('products', id)
      setState((prev) => {
        const updatedProducts = prev.products.filter((p) => p.id !== id)
        const newState = { ...prev, products: updatedProducts }
        broadcastAndPersist(newState)
        return newState
      })
    },
    [broadcastAndPersist],
  )

  // --- Audiences CRUD ---
  const addAudience = useCallback(
    (audienceData: Omit<Audience, 'id'>) => {
      setState((prev) => {
        const newAud: Audience = {
          ...audienceData,
          id: `aud_${Date.now()}`,
          isActive: audienceData.isActive !== undefined ? audienceData.isActive : true,
        }
        const newState = { ...prev, audiences: [...prev.audiences, newAud] }
        broadcastAndPersist(newState)
        return newState
      })
    },
    [broadcastAndPersist],
  )

  const updateAudience = useCallback(
    (id: string, updates: Partial<Audience>) => {
      setState((prev) => {
        const updated = prev.audiences.map((a) => (a.id === id ? { ...a, ...updates } : a))
        const newState = { ...prev, audiences: updated }
        broadcastAndPersist(newState)
        return newState
      })
    },
    [broadcastAndPersist],
  )

  const toggleAudienceActive = useCallback(
    (id: string) => {
      setState((prev) => {
        const updated = prev.audiences.map((a) =>
          a.id === id ? { ...a, isActive: a.isActive === false ? true : false } : a,
        )
        const newState = { ...prev, audiences: updated }
        broadcastAndPersist(newState)
        return newState
      })
    },
    [broadcastAndPersist],
  )

  const deleteAudience = useCallback(
    (id: string) => {
      setState((prev) => {
        const updated = prev.audiences.filter((a) => a.id !== id)
        const newState = { ...prev, audiences: updated }
        broadcastAndPersist(newState)
        return newState
      })
    },
    [broadcastAndPersist],
  )

  const addAudiencePoint = useCallback(
    (audienceId: string, point: string) => {
      if (!point.trim()) return
      setState((prev) => {
        const updated = prev.audiences.map((a) =>
          a.id === audienceId ? { ...a, points: [...a.points, point.trim()] } : a,
        )
        const newState = { ...prev, audiences: updated }
        broadcastAndPersist(newState)
        return newState
      })
    },
    [broadcastAndPersist],
  )

  const removeAudiencePoint = useCallback(
    (audienceId: string, index: number) => {
      setState((prev) => {
        const updated = prev.audiences.map((a) => {
          if (a.id !== audienceId) return a
          const newPoints = [...a.points]
          newPoints.splice(index, 1)
          return { ...a, points: newPoints }
        })
        const newState = { ...prev, audiences: updated }
        broadcastAndPersist(newState)
        return newState
      })
    },
    [broadcastAndPersist],
  )

  // --- Testimonials CRUD ---
  const addTestimonial = useCallback(
    (itemData: Omit<TestimonialItem, 'id'>) => {
      setState((prev) => {
        const newTest: TestimonialItem = {
          ...itemData,
          id: `test_${Date.now()}`,
          isActive: itemData.isActive !== undefined ? itemData.isActive : true,
          showRating: itemData.showRating !== undefined ? itemData.showRating : true,
        }
        const newState = { ...prev, testimonials: [newTest, ...prev.testimonials] }
        broadcastAndPersist(newState)
        return newState
      })
    },
    [broadcastAndPersist],
  )

  const updateTestimonial = useCallback(
    (id: string, updates: Partial<TestimonialItem>) => {
      setState((prev) => {
        const updated = prev.testimonials.map((t) => (t.id === id ? { ...t, ...updates } : t))
        const newState = { ...prev, testimonials: updated }
        broadcastAndPersist(newState)
        return newState
      })
    },
    [broadcastAndPersist],
  )

  const toggleTestimonialActive = useCallback(
    (id: string) => {
      setState((prev) => {
        const updated = prev.testimonials.map((t) =>
          t.id === id ? { ...t, isActive: t.isActive === false ? true : false } : t,
        )
        const newState = { ...prev, testimonials: updated }
        broadcastAndPersist(newState)
        return newState
      })
    },
    [broadcastAndPersist],
  )

  const deleteTestimonial = useCallback(
    (id: string) => {
      deleteTableItemInDb('testimonials', id)
      setState((prev) => {
        const updated = prev.testimonials.filter((t) => t.id !== id)
        const newState = { ...prev, testimonials: updated }
        broadcastAndPersist(newState)
        return newState
      })
    },
    [broadcastAndPersist],
  )

  // --- FAQ CRUD ---
  const addFaq = useCallback(
    (faqData: Omit<FaqItem, 'id'>) => {
      setState((prev) => {
        const newFaq: FaqItem = {
          ...faqData,
          id: `faq_${Date.now()}`,
          isActive: faqData.isActive !== undefined ? faqData.isActive : true,
        }
        const newState = { ...prev, faqs: [...prev.faqs, newFaq] }
        broadcastAndPersist(newState)
        return newState
      })
    },
    [broadcastAndPersist],
  )

  const updateFaq = useCallback(
    (id: string, updates: Partial<FaqItem>) => {
      setState((prev) => {
        const updated = prev.faqs.map((f) => (f.id === id ? { ...f, ...updates } : f))
        const newState = { ...prev, faqs: updated }
        broadcastAndPersist(newState)
        return newState
      })
    },
    [broadcastAndPersist],
  )

  const toggleFaqActive = useCallback(
    (id: string) => {
      setState((prev) => {
        const updated = prev.faqs.map((f) =>
          f.id === id ? { ...f, isActive: f.isActive === false ? true : false } : f,
        )
        const newState = { ...prev, faqs: updated }
        broadcastAndPersist(newState)
        return newState
      })
    },
    [broadcastAndPersist],
  )

  const deleteFaq = useCallback(
    (id: string) => {
      deleteTableItemInDb('faqs', id)
      setState((prev) => {
        const updated = prev.faqs.filter((f) => f.id !== id)
        const newState = { ...prev, faqs: updated }
        broadcastAndPersist(newState)
        return newState
      })
    },
    [broadcastAndPersist],
  )

  // --- Messages & Orders Management ---
  const addMessage = useCallback(
    (msgData: {
      name: string
      email: string
      role: string
      topic: string
      message: string
      status?: StoredMessage['status']
    }) => {
      // 1. Send to Supabase directly
      submitContactMessage({
        name: msgData.name,
        email: msgData.email,
        role: msgData.role,
        topic: msgData.topic,
        message: msgData.message,
        status: msgData.status || 'unread',
      })

      // 2. Update local state
      setState((prev) => {
        const newMsg: StoredMessage = {
          ...msgData,
          status: msgData.status || 'unread',
          id: `msg_${Date.now()}`,
          created_at: new Date().toISOString(),
        }
        const updated = [newMsg, ...prev.messages]
        const newState = { ...prev, messages: updated }
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(newState))
        } catch {}
        return newState
      })
    },
    [],
  )

  const markMessageRead = useCallback(
    (id: string, status: StoredMessage['status'] = 'read') => {
      updateContactMessageInDb(id, status)
      setState((prev) => {
        const updated = prev.messages.map((m) => (m.id === id ? { ...m, status } : m))
        const newState = { ...prev, messages: updated }
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(newState))
        } catch {}
        return newState
      })
    },
    [],
  )

  const deleteMessage = useCallback((id: string) => {
    deleteContactMessageInDb(id)
    setState((prev) => {
      const updated = prev.messages.filter((m) => m.id !== id)
      const newState = { ...prev, messages: updated }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newState))
      } catch {}
      return newState
    })
  }, [])

  const addOrder = useCallback((orderData: Omit<StoredOrder, 'id' | 'created_at'>) => {
    submitOrderRequest({
      customer_name: orderData.customer_name,
      customer_email: orderData.customer_email,
      customer_phone: orderData.customer_phone,
      customer_location: orderData.customer_location,
      items: orderData.items,
      subtotal: orderData.subtotal,
      currency: orderData.currency,
      status: orderData.status,
      rental_dates: orderData.rental_dates,
      notes: orderData.notes,
    })

    setState((prev) => {
      const newOrder: StoredOrder = {
        ...orderData,
        id: `ord_${Date.now()}`,
        created_at: new Date().toISOString(),
      }
      const updated = [newOrder, ...prev.orders]
      const newState = { ...prev, orders: updated }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newState))
      } catch {}
      return newState
    })
  }, [])

  const updateOrderStatus = useCallback((id: string, status: StoredOrder['status']) => {
    updateOrderInDb(id, status)
    setState((prev) => {
      const updated = prev.orders.map((o) => (o.id === id ? { ...o, status } : o))
      const newState = { ...prev, orders: updated }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newState))
      } catch {}
      return newState
    })
  }, [])

  const deleteOrder = useCallback((id: string) => {
    deleteOrderInDb(id)
    setState((prev) => {
      const updated = prev.orders.filter((o) => o.id !== id)
      const newState = { ...prev, orders: updated }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newState))
      } catch {}
      return newState
    })
  }, [])

  // --- Admin PIN & System Backups ---
  const updateAdminPin = useCallback(
    (newPin: string) => {
      setState((prev) => {
        const newState = { ...prev, adminPin: newPin }
        broadcastAndPersist(newState)
        return newState
      })
    },
    [broadcastAndPersist],
  )

  const resetToDefaults = useCallback(() => {
    setState(INITIAL_STATE)
    broadcastAndPersist(INITIAL_STATE)
  }, [broadcastAndPersist])

  const exportDataJson = useCallback(() => {
    return JSON.stringify(state, null, 2)
  }, [state])

  const importDataJson = useCallback(
    (jsonString: string) => {
      try {
        const parsed = JSON.parse(jsonString)
        if (parsed && typeof parsed === 'object') {
          const merged: PortfolioState = {
            ...INITIAL_STATE,
            ...parsed,
          }
          setState(merged)
          broadcastAndPersist(merged)
          return true
        }
        return false
      } catch (err) {
        console.error('Failed to import JSON data:', err)
        return false
      }
    },
    [broadcastAndPersist],
  )

  const contextValue = useMemo<PortfolioContextType>(
    () => ({
      state,
      isLoaded,
      isRealtimeConnected,
      hasNotificationPermission,
      isNotificationsMuted,
      toggleNotificationsMuted,
      requestNotifications,
      testNotificationChime,
      updateProfile,
      updateHero,
      updateAbout,
      updateContact,
      updateStats,
      addMilestone,
      updateMilestone,
      toggleMilestoneActive,
      deleteMilestone,
      reorderMilestones,
      addWork,
      updateWork,
      toggleWorkActive,
      deleteWork,
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
      addMessage,
      markMessageRead,
      deleteMessage,
      addOrder,
      updateOrderStatus,
      deleteOrder,
      updateAdminPin,
      resetToDefaults,
      exportDataJson,
      importDataJson,
    }),
    [
      state,
      isLoaded,
      isRealtimeConnected,
      hasNotificationPermission,
      isNotificationsMuted,
      toggleNotificationsMuted,
      requestNotifications,
      testNotificationChime,
      updateProfile,
      updateHero,
      updateAbout,
      updateContact,
      updateStats,
      addMilestone,
      updateMilestone,
      toggleMilestoneActive,
      deleteMilestone,
      reorderMilestones,
      addWork,
      updateWork,
      toggleWorkActive,
      deleteWork,
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
      addMessage,
      markMessageRead,
      deleteMessage,
      addOrder,
      updateOrderStatus,
      deleteOrder,
      updateAdminPin,
      resetToDefaults,
      exportDataJson,
      importDataJson,
    ],
  )

  return <PortfolioContext.Provider value={contextValue}>{children}</PortfolioContext.Provider>
}

export function usePortfolio() {
  const context = useContext(PortfolioContext)
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider')
  }
  return context
}
