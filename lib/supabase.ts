import { createClient, SupabaseClient } from '@supabase/supabase-js'

let cachedClient: SupabaseClient | null = null
let cachedUrl = ''
let cachedKey = ''

export const DEFAULT_SUPABASE_URL = 'https://ljhfczykqylwokizacxw.supabase.co'
export const DEFAULT_SUPABASE_ANON_KEY = 'sb_publishable_n4SNlVZX6AutOjRN2qBQnA_5c7Smk87'

/**
 * Get active Supabase configuration (from env variables, local storage, or project defaults)
 */
export function getSupabaseConfig(): { url: string; anonKey: string } {
  let url = process.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_SUPABASE_URL
  let anonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    DEFAULT_SUPABASE_ANON_KEY

  if (typeof window !== 'undefined') {
    const customUrl = localStorage.getItem('farah_supabase_url')
    const customKey = localStorage.getItem('farah_supabase_anon_key')
    if (customUrl && customKey) {
      url = customUrl.trim()
      anonKey = customKey.trim()
    }
  }

  return { url, anonKey }
}

/**
 * Save custom Supabase credentials directly from Admin Settings
 */
export function saveSupabaseConfig(url: string, anonKey: string) {
  if (typeof window !== 'undefined') {
    if (url.trim() && anonKey.trim()) {
      localStorage.setItem('farah_supabase_url', url.trim())
      localStorage.setItem('farah_supabase_anon_key', anonKey.trim())
    } else {
      localStorage.removeItem('farah_supabase_url')
      localStorage.removeItem('farah_supabase_anon_key')
    }
  }
  cachedClient = null
  cachedUrl = ''
  cachedKey = ''
}

/**
 * Check if Supabase credentials are validly configured
 */
export function checkIsSupabaseConfigured(): boolean {
  const { url, anonKey } = getSupabaseConfig()
  return Boolean(url && anonKey && url.startsWith('http'))
}

export const isSupabaseConfigured = checkIsSupabaseConfigured()

/**
 * Get or create dynamic Supabase client
 */
export function getSupabase(): SupabaseClient | null {
  const { url, anonKey } = getSupabaseConfig()
  if (!url || !anonKey || !url.startsWith('http')) {
    return null
  }

  if (cachedClient && cachedUrl === url && cachedKey === anonKey) {
    return cachedClient
  }

  try {
    cachedUrl = url
    cachedKey = anonKey
    cachedClient = createClient(url, anonKey, {
      auth: { persistSession: false },
      realtime: {
        params: {
          eventsPerSecond: 10,
        },
      },
    })
    return cachedClient
  } catch (err) {
    console.warn('Failed to initialize Supabase client:', err)
    return null
  }
}

export const supabase = getSupabase()

export interface ContactMessage {
  id?: string
  created_at?: string
  name: string
  email: string
  role?: string
  topic?: string
  message: string
  status?: 'unread' | 'read' | 'replied' | 'archived'
}



/**
 * Helper to submit a contact message to Supabase
 */
export async function submitContactMessage(message: ContactMessage) {
  const client = getSupabase()
  if (!client) {
    return { success: false, fallback: true, error: 'Supabase credentials not configured' }
  }

  try {
    const { data, error } = await client
      .from('contact_messages')
      .insert([
        {
          name: message.name,
          email: message.email,
          role: message.role || 'Student',
          topic: message.topic || 'General question',
          message: message.message,
          status: 'unread',
        },
      ])
      .select()

    if (error) {
      console.error('Supabase contact message error:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (err) {
    console.error('Failed to submit contact message:', err)
    return { success: false, error: err instanceof Error ? err.message : 'Unknown error' }
  }
}

/**
 * Helper to fetch latest contact messages from Supabase
 */
export async function fetchContactMessages(): Promise<ContactMessage[]> {
  const client = getSupabase()
  if (!client) return []
  try {
    const { data, error } = await client
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return (data as ContactMessage[]) || []
  } catch (err) {
    console.warn('Failed to fetch contact messages from Supabase:', err)
    return []
  }
}



/**
 * Update message status in Supabase
 */
export async function updateContactMessageInDb(id: string, status: string) {
  const client = getSupabase()
  if (!client) return { success: false }
  try {
    const { error } = await client.from('contact_messages').update({ status }).eq('id', id)
    if (error) throw error
    return { success: true }
  } catch (err) {
    console.warn('Failed to update message in Supabase:', err)
    return { success: false }
  }
}

/**
 * Delete message from Supabase
 */
export async function deleteContactMessageInDb(id: string) {
  const client = getSupabase()
  if (!client) return { success: false }
  try {
    const { error } = await client.from('contact_messages').delete().eq('id', id)
    if (error) throw error
    return { success: true }
  } catch (err) {
    console.warn('Failed to delete message in Supabase:', err)
    return { success: false }
  }
}



/**
 * Sync entire portfolio settings & individual collections to Supabase
 */
export async function syncPortfolioSettingsToDb(payload: Record<string, unknown>) {
  const client = getSupabase()
  if (!client) return { success: false, error: 'No database configured' }

  try {
    // 1. Upsert into portfolio_settings (base settings + extra columns if supported)
    const { error: fullErr } = await client
      .from('portfolio_settings')
      .upsert({
        id: 'current_state',
        updated_at: new Date().toISOString(),
        ...payload,
      })

    if (fullErr) {
      // Fallback with standard base columns
      const basePayload: Record<string, unknown> = {
        id: 'current_state',
        updated_at: new Date().toISOString(),
        hero: payload.hero,
        about: payload.about,
        stats: payload.stats,
        contact: payload.contact,
        admin_pin: payload.admin_pin,
      }
      await client.from('portfolio_settings').upsert(basePayload)
    }

    // 2. Also populate dedicated Supabase tables: works, videos, products, testimonials, faqs
    if (Array.isArray(payload.works) && payload.works.length > 0) {
      const worksRows = (payload.works as any[]).map((w, idx) => ({
        id: w.id || `work_${idx}`,
        title: w.title,
        category: w.category,
        tag: w.tag,
        image: w.image,
        description: w.description,
        format: w.format || null,
        year: w.year || null,
        highlights: w.highlights || [],
        is_active: w.isActive !== false,
        sort_order: idx,
      }))
      await client.from('works').upsert(worksRows, { onConflict: 'id' })
    }

    if (Array.isArray(payload.videos) && payload.videos.length > 0) {
      const videoRows = (payload.videos as any[]).map((v, idx) => ({
        id: v.id || `vid_${idx}`,
        title: v.title,
        duration: v.duration,
        level: v.level,
        category: v.category,
        thumbnail: v.thumbnail,
        src: v.src,
        takeaways: v.takeaways || [],
        is_active: v.isActive !== false,
        sort_order: idx,
      }))
      await client.from('videos').upsert(videoRows, { onConflict: 'id' })
    }



    if (Array.isArray(payload.testimonials) && payload.testimonials.length > 0) {
      const testimonialRows = (payload.testimonials as any[]).map((t, idx) => ({
        id: t.id || `test_${idx}`,
        name: t.name,
        role: t.role,
        quote: t.quote,
        rating: t.rating ?? 5,
        is_active: t.isActive !== false,
        sort_order: idx,
      }))
      await client.from('testimonials').upsert(testimonialRows, { onConflict: 'id' })
    }

    if (Array.isArray(payload.faqs) && payload.faqs.length > 0) {
      const faqRows = (payload.faqs as any[]).map((f, idx) => ({
        id: f.id || `faq_${idx}`,
        q: f.q,
        a: f.a,
        is_active: f.isActive !== false,
        sort_order: idx,
      }))
      await client.from('faqs').upsert(faqRows, { onConflict: 'id' })
    }

    return { success: true }
  } catch (err) {
    console.warn('Failed to sync portfolio settings to Supabase:', err)
    return { success: false, error: err instanceof Error ? err.message : 'Unknown error' }
  }
}

/**
 * Fetch entire portfolio settings & collections snapshot from Supabase
 */
export async function fetchPortfolioSettingsFromDb() {
  const client = getSupabase()
  if (!client) return null
  try {
    const [settingsRes, worksRes, videosRes, testimonialsRes, faqsRes] =
      await Promise.all([
        client.from('portfolio_settings').select('*').eq('id', 'current_state').maybeSingle(),
        client.from('works').select('*').order('sort_order', { ascending: true }),
        client.from('videos').select('*').order('sort_order', { ascending: true }),
        client.from('testimonials').select('*').order('sort_order', { ascending: true }),
        client.from('faqs').select('*').order('sort_order', { ascending: true }),
      ])

    const settings = settingsRes.data || {}

    // Map works
    const works =
      worksRes.data && worksRes.data.length > 0
        ? worksRes.data.map((w: any) => ({
            id: w.id,
            title: w.title,
            category: w.category,
            tag: w.tag,
            image: w.image,
            description: w.description,
            format: w.format || '',
            year: w.year || '',
            highlights: w.highlights || [],
            isActive: w.is_active !== false,
          }))
        : settings.works || null

    // Map videos
    const videos =
      videosRes.data && videosRes.data.length > 0
        ? videosRes.data.map((v: any) => ({
            id: v.id,
            title: v.title,
            duration: v.duration,
            level: v.level,
            category: v.category,
            thumbnail: v.thumbnail,
            src: v.src,
            takeaways: v.takeaways || [],
            isActive: v.is_active !== false,
          }))
        : settings.videos || null



    // Map testimonials
    const testimonials =
      testimonialsRes.data && testimonialsRes.data.length > 0
        ? testimonialsRes.data.map((t: any) => ({
            id: t.id,
            name: t.name,
            role: t.role,
            quote: t.quote,
            rating: t.rating != null ? Number(t.rating) : 5,
            showRating: (t.rating ?? 0) > 0,
            isActive: t.is_active !== false,
          }))
        : settings.testimonials || null

    // Map faqs
    const faqs =
      faqsRes.data && faqsRes.data.length > 0
        ? faqsRes.data.map((f: any) => ({
            id: f.id,
            q: f.q,
            a: f.a,
            isActive: f.is_active !== false,
          }))
        : settings.faqs || null

    return {
      ...settings,
      works,
      videos,
      testimonials,
      faqs,
    }
  } catch (err) {
    console.warn('Failed to fetch portfolio settings from Supabase:', err)
    return null
  }
}

/**
 * Delete item from specific table in Supabase
 */
export async function deleteTableItemInDb(table: 'works' | 'videos' | 'testimonials' | 'faqs', id: string) {
  const client = getSupabase()
  if (!client) return { success: false }
  try {
    const { error } = await client.from(table).delete().eq('id', id)
    if (error) throw error
    return { success: true }
  } catch (err) {
    console.warn(`Failed to delete item from ${table} in Supabase:`, err)
    return { success: false }
  }
}

// ----------------------------------------------------
// PUSH & SMS-STYLE DEVICE NOTIFICATIONS WITH MUTE TOGGLE
// ----------------------------------------------------

let notificationsMuted = false

export function setNotificationsMuted(muted: boolean) {
  notificationsMuted = muted
  if (typeof window !== 'undefined') {
    localStorage.setItem('farah_notifications_muted', muted ? 'true' : 'false')
  }
}

export function isNotificationsMuted(): boolean {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('farah_notifications_muted')
    if (stored !== null) return stored === 'true'
  }
  return notificationsMuted
}

/**
 * Request notification permissions for Browser & Mobile Home-Screen / PWA
 */
export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return 'denied'
  }

  try {
    const permission = await Notification.requestPermission()
    if (permission === 'granted') {
      // Send immediate confirmation push notification to test OS & phone lockscreen
      sendDeviceNotification('🔔 Device Alerts Activated!', {
        body: 'You will now receive notifications outside this app on your phone lock screen and notification bar!',
        href: '/admin',
      })
    }
    return permission
  } catch {
    return 'denied'
  }
}

/**
 * Play a synthetic audio chime (rich crystal harmonic notification tone)
 */
export function playNotificationSound() {
  if (typeof window === 'undefined') return
  if (isNotificationsMuted()) return

  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (!AudioCtx) return

    const ctx = new AudioCtx()
    const now = ctx.currentTime

    // Main pleasant chord: C6 (1046Hz) -> E6 (1318Hz) -> G6 (1567Hz)
    const freqs = [1046.5, 1318.51, 1567.98]

    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, now + idx * 0.08)

      gain.gain.setValueAtTime(0.001, now + idx * 0.08)
      gain.gain.exponentialRampToValueAtTime(0.18, now + idx * 0.08 + 0.03)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.6)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(now + idx * 0.08)
      osc.stop(now + idx * 0.08 + 0.65)
    })
  } catch (err) {
    console.warn('Web Audio playback error:', err)
  }
}

export type PushNotificationData = {
  title: string
  body?: string
  icon?: string
  tag?: string
  href?: string
  timestamp?: number
}

export const PUSH_EVENT_KEY = 'farah_device_push_notification'

let lastDispatchedFingerprint = ''
let lastDispatchedTimestamp = 0

/**
 * Check if the current device/browser is authorized as an Admin Studio device
 * (Prevents public visitors and students from hearing chimes or receiving admin push popups)
 */
export function checkIsAdminDevice(): boolean {
  if (typeof window === 'undefined') return false
  if (window.location.pathname.startsWith('/admin')) return true
  try {
    if (localStorage.getItem('farah_admin_authenticated') === 'true') return true
  } catch {}
  return false
}

/**
 * Send an SMS-style high priority browser / OS / mobile notification
 * ONLY targeted to Farah's authorized Admin devices, with strict single-instance deduplication
 */
export function sendDeviceNotification(
  title: string,
  options?: { body?: string; icon?: string; tag?: string; href?: string },
) {
  if (typeof window === 'undefined') return

  // 1. Strict security check: only the admin device receives admin notifications!
  if (!checkIsAdminDevice()) return

  if (isNotificationsMuted()) return

  // 2. Strict cross-tab and in-memory deduplication (prevents duplicate triggers from multi-tab Realtime events)
  const fingerprint = `${title}:::${options?.body || ''}`
  const now = Date.now()
  if (fingerprint === lastDispatchedFingerprint && now - lastDispatchedTimestamp < 3500) {
    return
  }
  lastDispatchedFingerprint = fingerprint
  lastDispatchedTimestamp = now

  try {
    const globalLast = sessionStorage.getItem('farah_last_push_fingerprint')
    const globalTime = Number(sessionStorage.getItem('farah_last_push_time') || 0)
    if (globalLast === fingerprint && now - globalTime < 3500) {
      return
    }
    sessionStorage.setItem('farah_last_push_fingerprint', fingerprint)
    sessionStorage.setItem('farah_last_push_time', String(now))
  } catch {
    // ignore
  }

  // 3. Play audio chime immediately
  playNotificationSound()

  // 4. Vibrate mobile device (if supported) - SMS pattern: buzz, pause, buzz
  if ('navigator' in window && 'vibrate' in navigator) {
    try {
      navigator.vibrate([300, 100, 300, 100, 400])
    } catch {
      // ignore
    }
  }

  // 5. Trigger exactly ONE Native OS / Mobile Lock-Screen & System Tray Notification
  if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
    const deterministicTag =
      options?.tag || `farah-notify-${encodeURIComponent(title.replace(/\s+/g, '-').slice(0, 30))}`

    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.ready
        .then((registration) => {
          registration.showNotification(title, {
            body: options?.body || 'New update in Farah Affes Studio',
            icon: options?.icon || '/images/farah-portrait.png',
            badge: '/favicon.ico',
            vibrate: [300, 100, 300, 100, 400],
            tag: deterministicTag,
            renotify: false,
            requireInteraction: true,
            data: { url: options?.href || '/admin' },
          } as any)
        })
        .catch(() => {
          try {
            new Notification(title, {
              body: options?.body || 'New update in Farah Affes Studio',
              icon: options?.icon || '/images/farah-portrait.png',
              badge: '/favicon.ico',
              tag: deterministicTag,
            })
          } catch {}
        })
    } else {
      try {
        new Notification(title, {
          body: options?.body || 'New update in Farah Affes Studio',
          icon: options?.icon || '/images/farah-portrait.png',
          badge: '/favicon.ico',
          tag: deterministicTag,
        })
      } catch {}
    }
  }
}
