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
import { supabase, isSupabaseConfigured } from '@/lib/supabase'

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
}

export type FaqItem = {
  id: string
  q: string
  a: string
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
  status: 'unread' | 'read' | 'replied'
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

const STORAGE_KEY = 'farah_portfolio_data_v2'
const PIN_STORAGE_KEY = 'farah_admin_pin_v2'

export const INITIAL_HERO: HeroData = {
  eyebrow: 'English Educator & DIY Learning Material Designer',
  titlePrefix: 'Empowering learners through',
  highlightWord: 'interactive',
  titleSuffix: 'English education',
  bio: "Aslema! I'm Farah — transforming language acquisition into an engaging, tactile, and joyful experience for students, parents, and fellow teachers in Sfax and beyond.",
  ctaWorkText: 'Explore my materials',
  ctaContactText: 'Get in touch',
  marqueeItems: [
    'Phonics & Literacy Mastery',
    'Handmade Classroom Props',
    'Printable PDF Worksheets',
    'Teacher Training Workshops',
    'ESL Curriculum Design',
    'Interactive Storytelling Kits',
    'Active Movement Language Games',
  ],
}

export const INITIAL_STATS: StatItem[] = [
  { id: 's1', value: '6+', label: 'Years in education' },
  { id: 's2', value: '120+', label: 'DIY props crafted' },
  { id: 's3', value: '40+', label: 'Teacher workshops' },
  { id: 's4', value: '900+', label: 'Learners inspired' },
]

export const INITIAL_ABOUT: AboutData = {
  eyebrow: 'Pedagogy & Philosophy',
  title: 'Where linguistics meets tactile creativity',
  intro: 'A modern educator designing sensory, high-retention English learning experiences.',
  bio1: 'As an English educator and specialized learning material crafter based in Sfax, Tunisia, I bridge the gap between academic linguistic theory and joyful, hands-on classroom immersion.',
  bio2: 'Every worksheet, phonics wheel, and interactive game is engineered to lower learners’ affective anxiety, build enduring speaking confidence, and spark lifelong curiosity.',
  manifestoQuote: 'Language isn’t memorized from a dry textbook — it truly sticks when learners can touch it, build with it, and laugh along the way.',
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
}

export const INITIAL_TESTIMONIALS: TestimonialItem[] = DEFAULT_TESTIMONIALS.map((t, idx) => ({
  id: `t${idx + 1}`,
  quote: t.quote,
  name: t.name,
  role: t.role,
  rating: 5,
}))

export const INITIAL_FAQS: FaqItem[] = DEFAULT_FAQS.map((f, idx) => ({
  id: `faq${idx + 1}`,
  q: f.q,
  a: f.a,
}))

export const INITIAL_CONTACT: ContactData = {
  email: DEFAULT_CONTACT.email,
  whatsapp: DEFAULT_CONTACT.whatsapp,
  whatsappRaw: DEFAULT_CONTACT.whatsappRaw,
  location: DEFAULT_CONTACT.location,
  responseTime: '<24 hours',
  openForWorkshops: true,
}

export const DEFAULT_PORTFOLIO_STATE: PortfolioState = {
  hero: INITIAL_HERO,
  stats: INITIAL_STATS,
  about: INITIAL_ABOUT,
  works: DEFAULT_WORKS,
  videos: DEFAULT_VIDEOS,
  products: DEFAULT_PRODUCTS,
  audiences: DEFAULT_AUDIENCES,
  testimonials: INITIAL_TESTIMONIALS,
  faqs: INITIAL_FAQS,
  contact: INITIAL_CONTACT,
  messages: [
    {
      id: 'msg_seed_1',
      created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
      name: 'Nour Cheniti',
      email: 'nour.cheniti@example.tn',
      role: 'Parent',
      topic: 'Buy materials',
      message: 'Hello Farah! I want to purchase the Rotating Phonics Blending Wheel for my 6-year-old son in Sfax. How can we arrange pickup or delivery?',
      status: 'unread',
    },
    {
      id: 'msg_seed_2',
      created_at: new Date(Date.now() - 3600000 * 72).toISOString(),
      name: 'Yassine Triki',
      email: 'yassine.triki@school.tn',
      role: 'Teacher / Educator',
      topic: 'Rent for workshop',
      message: 'Greetings! We are organizing an English Day workshop next month and would love to rent the Storytelling Felt Kit and Dice Set for 3 days.',
      status: 'read',
    },
  ],
  orders: [
    {
      id: 'ord_seed_1',
      created_at: new Date(Date.now() - 3600000 * 12).toISOString(),
      customer_name: 'Mariem Ben Salah',
      customer_email: 'mariem.bs@example.com',
      customer_phone: '52095014',
      customer_location: 'Sfax',
      items: [
        { id: 'p1', name: 'Printable ESL Worksheet & Activity Bundle', price: 12, qty: 1, mode: 'buy' },
        { id: 'p3', name: 'Rotating Phonics Blending Wheel', price: 22, qty: 1, mode: 'buy' },
      ],
      subtotal: 34,
      currency: 'TND',
      status: 'pending',
      notes: 'Please contact via WhatsApp for fast pickup in Sfax',
    },
  ],
  adminPin: 'farah2026',
}

export type PortfolioContextType = {
  state: PortfolioState
  isLoaded: boolean
  // Hero & Stats
  updateHero: (hero: Partial<HeroData>) => void
  updateStats: (stats: StatItem[]) => void
  // About & Pillars
  updateAbout: (about: Partial<AboutData>) => void
  updatePillar: (id: string, pillar: Partial<AboutPillar>) => void
  // Works CRUD
  addWork: (item: Omit<WorkItem, 'id'>) => string
  updateWork: (id: string, item: Partial<WorkItem>) => void
  deleteWork: (id: string) => void
  reorderWorks: (items: WorkItem[]) => void
  // Videos CRUD
  addVideo: (item: Omit<Video, 'id'>) => string
  updateVideo: (id: string, item: Partial<Video>) => void
  deleteVideo: (id: string) => void
  // Products CRUD
  addProduct: (item: Omit<Product, 'id'>) => string
  updateProduct: (id: string, item: Partial<Product>) => void
  deleteProduct: (id: string) => void
  // Audiences CRUD
  addAudience: (item: Omit<Audience, 'id'>) => string
  updateAudience: (id: string, item: Partial<Audience>) => void
  deleteAudience: (id: string) => void
  addAudiencePoint: (audienceId: string, point: string) => void
  removeAudiencePoint: (audienceId: string, pointIndex: number) => void
  // Testimonials CRUD
  addTestimonial: (item: Omit<TestimonialItem, 'id'>) => string
  updateTestimonial: (id: string, item: Partial<TestimonialItem>) => void
  deleteTestimonial: (id: string) => void
  // FAQ CRUD
  addFaq: (item: Omit<FaqItem, 'id'>) => string
  updateFaq: (id: string, item: Partial<FaqItem>) => void
  deleteFaq: (id: string) => void
  // Contact & Settings
  updateContact: (contact: Partial<ContactData>) => void
  updateAdminPin: (newPin: string) => void
  // Messages & Orders
  addMessage: (msg: { name: string; email: string; role: string; topic: string; message: string }) => Promise<string>
  updateMessageStatus: (id: string, status: StoredMessage['status']) => void
  markMessageRead: (id: string, status?: StoredMessage['status']) => void
  deleteMessage: (id: string) => void
  addOrder: (order: {
    customerName?: string
    customer_name?: string
    customerPhone?: string
    customer_phone?: string
    customerEmail?: string
    customer_email?: string
    customerLocation?: string
    customer_location?: string
    rentalDates?: string
    rental_dates?: string
    notes?: string
    items: StoredOrderItem[]
    subtotal: number
    currency?: string
    status?: StoredOrder['status']
  }) => Promise<string>
  updateOrderStatus: (id: string, status: StoredOrder['status']) => void
  deleteOrder: (id: string) => void
  // System Tools
  resetToDefaults: () => void
  exportBackupJson: () => string
  exportDataJson: () => string
  importBackupJson: (jsonString: string) => boolean
  importDataJson: (jsonString: string) => boolean
}

const PortfolioContext = createContext<PortfolioContextType | null>(null)

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<PortfolioState>(DEFAULT_PORTFOLIO_STATE)
  const [isLoaded, setIsLoaded] = useState(false)

  // Hydrate from localStorage on client mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as Partial<PortfolioState>
        setState((prev) => ({
          ...prev,
          ...parsed,
          contact: {
            ...DEFAULT_CONTACT,
            ...(parsed.contact || {}),
            whatsapp: parsed.contact?.whatsapp || DEFAULT_CONTACT.whatsapp,
            whatsappRaw: parsed.contact?.whatsappRaw || DEFAULT_CONTACT.whatsappRaw,
            location: parsed.contact?.location || DEFAULT_CONTACT.location,
            responseTime: parsed.contact?.responseTime || '<24 hours',
            openForWorkshops: parsed.contact?.openForWorkshops ?? true,
          },
          hero: {
            ...INITIAL_HERO,
            ...(parsed.hero || {}),
          },
          about: {
            ...INITIAL_ABOUT,
            ...(parsed.about || {}),
          },
          stats: parsed.stats && parsed.stats.length > 0 ? parsed.stats : INITIAL_STATS,
          works: parsed.works && parsed.works.length > 0 ? parsed.works : DEFAULT_WORKS,
          videos: parsed.videos && parsed.videos.length > 0 ? parsed.videos : DEFAULT_VIDEOS,
          products: parsed.products && parsed.products.length > 0 ? parsed.products : DEFAULT_PRODUCTS,
          audiences: parsed.audiences && parsed.audiences.length > 0 ? parsed.audiences : DEFAULT_AUDIENCES,
          testimonials: parsed.testimonials && parsed.testimonials.length > 0 ? parsed.testimonials : INITIAL_TESTIMONIALS,
          faqs: parsed.faqs && parsed.faqs.length > 0 ? parsed.faqs : INITIAL_FAQS,
          messages: parsed.messages || DEFAULT_PORTFOLIO_STATE.messages,
          orders: parsed.orders || DEFAULT_PORTFOLIO_STATE.orders,
          adminPin: localStorage.getItem(PIN_STORAGE_KEY) || parsed.adminPin || 'farah2026',
        }))
      }
    } catch (e) {
      console.warn('Failed to load local portfolio state:', e)
    } finally {
      setIsLoaded(true)
    }
  }, [])

  // Persist to localStorage whenever state changes
  const persistState = useCallback((newState: PortfolioState) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newState))
    } catch (e) {
      console.warn('Failed to save to localStorage:', e)
    }
  }, [])

  // Hero & Stats
  const updateHero = useCallback((heroUpdates: Partial<HeroData>) => {
    setState((prev) => {
      const next = { ...prev, hero: { ...prev.hero, ...heroUpdates } }
      persistState(next)
      return next
    })
  }, [persistState])

  const updateStats = useCallback((newStats: StatItem[]) => {
    setState((prev) => {
      const next = { ...prev, stats: newStats }
      persistState(next)
      return next
    })
  }, [persistState])

  // About & Pillars
  const updateAbout = useCallback((aboutUpdates: Partial<AboutData>) => {
    setState((prev) => {
      const next = { ...prev, about: { ...prev.about, ...aboutUpdates } }
      persistState(next)
      return next
    })
  }, [persistState])

  const updatePillar = useCallback((id: string, pillarUpdates: Partial<AboutPillar>) => {
    setState((prev) => {
      const updatedPillars = prev.about.pillars.map((p) =>
        p.id === id ? { ...p, ...pillarUpdates } : p
      )
      const next = { ...prev, about: { ...prev.about, pillars: updatedPillars } }
      persistState(next)
      return next
    })
  }, [persistState])

  // Works CRUD
  const addWork = useCallback((item: Omit<WorkItem, 'id'>): string => {
    const id = `work_${Date.now()}`
    const newItem: WorkItem = { id, ...item }
    setState((prev) => {
      const next = { ...prev, works: [newItem, ...prev.works] }
      persistState(next)
      return next
    })
    return id
  }, [persistState])

  const updateWork = useCallback((id: string, itemUpdates: Partial<WorkItem>) => {
    setState((prev) => {
      const next = {
        ...prev,
        works: prev.works.map((w) => (w.id === id ? { ...w, ...itemUpdates } : w)),
      }
      persistState(next)
      return next
    })
  }, [persistState])

  const deleteWork = useCallback((id: string) => {
    setState((prev) => {
      const next = { ...prev, works: prev.works.filter((w) => w.id !== id) }
      persistState(next)
      return next
    })
  }, [persistState])

  const reorderWorks = useCallback((newWorks: WorkItem[]) => {
    setState((prev) => {
      const next = { ...prev, works: newWorks }
      persistState(next)
      return next
    })
  }, [persistState])

  // Videos CRUD
  const addVideo = useCallback((item: Omit<Video, 'id'>): string => {
    const id = `vid_${Date.now()}`
    const newItem: Video = { id, ...item }
    setState((prev) => {
      const next = { ...prev, videos: [newItem, ...prev.videos] }
      persistState(next)
      return next
    })
    return id
  }, [persistState])

  const updateVideo = useCallback((id: string, itemUpdates: Partial<Video>) => {
    setState((prev) => {
      const next = {
        ...prev,
        videos: prev.videos.map((v) => (v.id === id ? { ...v, ...itemUpdates } : v)),
      }
      persistState(next)
      return next
    })
  }, [persistState])

  const deleteVideo = useCallback((id: string) => {
    setState((prev) => {
      const next = { ...prev, videos: prev.videos.filter((v) => v.id !== id) }
      persistState(next)
      return next
    })
  }, [persistState])

  // Products CRUD
  const addProduct = useCallback((item: Omit<Product, 'id'>): string => {
    const id = `prod_${Date.now()}`
    const newItem: Product = { id, ...item, options: item.options || ['buy'] }
    setState((prev) => {
      const next = { ...prev, products: [newItem, ...prev.products] }
      persistState(next)
      return next
    })
    return id
  }, [persistState])

  const updateProduct = useCallback((id: string, itemUpdates: Partial<Product>) => {
    setState((prev) => {
      const next = {
        ...prev,
        products: prev.products.map((p) => (p.id === id ? { ...p, ...itemUpdates } : p)),
      }
      persistState(next)
      return next
    })
  }, [persistState])

  const deleteProduct = useCallback((id: string) => {
    setState((prev) => {
      const next = { ...prev, products: prev.products.filter((p) => p.id !== id) }
      persistState(next)
      return next
    })
  }, [persistState])

  // Audiences CRUD
  const addAudience = useCallback((item: Omit<Audience, 'id'>): string => {
    const id = `aud_${Date.now()}`
    const newItem: Audience = { id, ...item }
    setState((prev) => {
      const next = { ...prev, audiences: [...prev.audiences, newItem] }
      persistState(next)
      return next
    })
    return id
  }, [persistState])

  const updateAudience = useCallback((id: string, itemUpdates: Partial<Audience>) => {
    setState((prev) => {
      const next = {
        ...prev,
        audiences: prev.audiences.map((a) => (a.id === id ? { ...a, ...itemUpdates } : a)),
      }
      persistState(next)
      return next
    })
  }, [persistState])

  const deleteAudience = useCallback((id: string) => {
    setState((prev) => {
      const next = { ...prev, audiences: prev.audiences.filter((a) => a.id !== id) }
      persistState(next)
      return next
    })
  }, [persistState])

  const addAudiencePoint = useCallback((audienceId: string, point: string) => {
    setState((prev) => {
      const next = {
        ...prev,
        audiences: prev.audiences.map((a) =>
          a.id === audienceId ? { ...a, points: [...a.points, point] } : a
        ),
      }
      persistState(next)
      return next
    })
  }, [persistState])

  const removeAudiencePoint = useCallback((audienceId: string, pointIndex: number) => {
    setState((prev) => {
      const next = {
        ...prev,
        audiences: prev.audiences.map((a) =>
          a.id === audienceId
            ? { ...a, points: a.points.filter((_, idx) => idx !== pointIndex) }
            : a
        ),
      }
      persistState(next)
      return next
    })
  }, [persistState])

  // Testimonials CRUD
  const addTestimonial = useCallback((item: Omit<TestimonialItem, 'id'>): string => {
    const id = `test_${Date.now()}`
    const newItem: TestimonialItem = { id, rating: 5, ...item }
    setState((prev) => {
      const next = { ...prev, testimonials: [newItem, ...prev.testimonials] }
      persistState(next)
      return next
    })
    return id
  }, [persistState])

  const updateTestimonial = useCallback((id: string, itemUpdates: Partial<TestimonialItem>) => {
    setState((prev) => {
      const next = {
        ...prev,
        testimonials: prev.testimonials.map((t) => (t.id === id ? { ...t, ...itemUpdates } : t)),
      }
      persistState(next)
      return next
    })
  }, [persistState])

  const deleteTestimonial = useCallback((id: string) => {
    setState((prev) => {
      const next = { ...prev, testimonials: prev.testimonials.filter((t) => t.id !== id) }
      persistState(next)
      return next
    })
  }, [persistState])

  // FAQ CRUD
  const addFaq = useCallback((item: Omit<FaqItem, 'id'>): string => {
    const id = `faq_${Date.now()}`
    const newItem: FaqItem = { id, ...item }
    setState((prev) => {
      const next = { ...prev, faqs: [...prev.faqs, newItem] }
      persistState(next)
      return next
    })
    return id
  }, [persistState])

  const updateFaq = useCallback((id: string, itemUpdates: Partial<FaqItem>) => {
    setState((prev) => {
      const next = {
        ...prev,
        faqs: prev.faqs.map((f) => (f.id === id ? { ...f, ...itemUpdates } : f)),
      }
      persistState(next)
      return next
    })
  }, [persistState])

  const deleteFaq = useCallback((id: string) => {
    setState((prev) => {
      const next = { ...prev, faqs: prev.faqs.filter((f) => f.id !== id) }
      persistState(next)
      return next
    })
  }, [persistState])

  // Contact & PIN
  const updateContact = useCallback((contactUpdates: Partial<ContactData>) => {
    setState((prev) => {
      const next = {
        ...prev,
        contact: {
          ...prev.contact,
          ...contactUpdates,
          whatsapp: contactUpdates.whatsapp || prev.contact.whatsapp,
          whatsappRaw: contactUpdates.whatsappRaw || prev.contact.whatsappRaw,
          location: contactUpdates.location || prev.contact.location,
        },
      }
      persistState(next)
      return next
    })
  }, [persistState])

  const updateAdminPin = useCallback((newPin: string) => {
    setState((prev) => {
      const next = { ...prev, adminPin: newPin }
      try {
        localStorage.setItem(PIN_STORAGE_KEY, newPin)
      } catch (e) {}
      persistState(next)
      return next
    })
  }, [persistState])

  // Messages & Orders
  const addMessage = useCallback(
    async (msg: { name: string; email: string; role: string; topic: string; message: string }): Promise<string> => {
      const id = `msg_${Date.now()}`
      const newMsg: StoredMessage = {
        id,
        created_at: new Date().toISOString(),
        status: 'unread',
        ...msg,
      }
      setState((prev) => {
        const next = { ...prev, messages: [newMsg, ...prev.messages] }
        persistState(next)
        return next
      })
      return id
    },
    [persistState]
  )

  const updateMessageStatus = useCallback((id: string, status: StoredMessage['status']) => {
    setState((prev) => {
      const next = {
        ...prev,
        messages: prev.messages.map((m) => (m.id === id ? { ...m, status } : m)),
      }
      persistState(next)
      return next
    })
  }, [persistState])

  const markMessageRead = useCallback((id: string, status: StoredMessage['status'] = 'read') => {
    updateMessageStatus(id, status)
  }, [updateMessageStatus])

  const deleteMessage = useCallback((id: string) => {
    setState((prev) => {
      const next = { ...prev, messages: prev.messages.filter((m) => m.id !== id) }
      persistState(next)
      return next
    })
  }, [persistState])

  const addOrder = useCallback(
    async (order: {
      customerName?: string
      customer_name?: string
      customerPhone?: string
      customer_phone?: string
      customerEmail?: string
      customer_email?: string
      customerLocation?: string
      customer_location?: string
      rentalDates?: string
      rental_dates?: string
      notes?: string
      items: StoredOrderItem[]
      subtotal: number
      currency?: string
      status?: StoredOrder['status']
    }): Promise<string> => {
      const id = `ord_${Date.now()}`
      const newOrder: StoredOrder = {
        id,
        created_at: new Date().toISOString(),
        customer_name: order.customer_name || order.customerName || 'Anonymous Customer',
        customer_phone: order.customer_phone || order.customerPhone || '',
        customer_email: order.customer_email || order.customerEmail || '',
        customer_location: order.customer_location || order.customerLocation || 'Sfax, Tunisia',
        rental_dates: order.rental_dates || order.rentalDates,
        notes: order.notes,
        items: order.items,
        subtotal: order.subtotal,
        currency: order.currency || 'TND',
        status: order.status || 'pending',
      }
      setState((prev) => {
        const next = { ...prev, orders: [newOrder, ...prev.orders] }
        persistState(next)
        return next
      })
      return id
    },
    [persistState]
  )

  const updateOrderStatus = useCallback((id: string, status: StoredOrder['status']) => {
    setState((prev) => {
      const next = {
        ...prev,
        orders: prev.orders.map((o) => (o.id === id ? { ...o, status } : o)),
      }
      persistState(next)
      return next
    })
  }, [persistState])

  const deleteOrder = useCallback((id: string) => {
    setState((prev) => {
      const next = { ...prev, orders: prev.orders.filter((o) => o.id !== id) }
      persistState(next)
      return next
    })
  }, [persistState])

  // System Tools
  const resetToDefaults = useCallback(() => {
    setState(DEFAULT_PORTFOLIO_STATE)
    try {
      localStorage.removeItem(STORAGE_KEY)
      localStorage.removeItem(PIN_STORAGE_KEY)
    } catch (e) {}
  }, [])

  const exportBackupJson = useCallback((): string => {
    return JSON.stringify(state, null, 2)
  }, [state])

  const exportDataJson = exportBackupJson

  const importBackupJson = useCallback((jsonString: string): boolean => {
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
  }, [persistState])

  const importDataJson = importBackupJson

  const value = useMemo(
    () => ({
      state,
      isLoaded,
      updateHero,
      updateStats,
      updateAbout,
      updatePillar,
      addWork,
      updateWork,
      deleteWork,
      reorderWorks,
      addVideo,
      updateVideo,
      deleteVideo,
      addProduct,
      updateProduct,
      deleteProduct,
      addAudience,
      updateAudience,
      deleteAudience,
      addAudiencePoint,
      removeAudiencePoint,
      addTestimonial,
      updateTestimonial,
      deleteTestimonial,
      addFaq,
      updateFaq,
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
      updateHero,
      updateStats,
      updateAbout,
      updatePillar,
      addWork,
      updateWork,
      deleteWork,
      reorderWorks,
      addVideo,
      updateVideo,
      deleteVideo,
      addProduct,
      updateProduct,
      deleteProduct,
      addAudience,
      updateAudience,
      deleteAudience,
      addAudiencePoint,
      removeAudiencePoint,
      addTestimonial,
      updateTestimonial,
      deleteTestimonial,
      addFaq,
      updateFaq,
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
    ]
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
