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

export interface OrderItem {
  id: string
  name: string
  price: number
  qty: number
  mode: 'buy' | 'rent'
}

export interface OrderRequest {
  id?: string
  created_at?: string
  customer_name?: string
  customer_email?: string
  customer_phone: string
  customer_location?: string
  items: OrderItem[]
  subtotal: number
  currency?: string
  status?: 'pending' | 'processing' | 'confirmed' | 'fulfilled' | 'completed' | 'cancelled'
  rental_dates?: string
  notes?: string
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
 * Helper to submit an order request to Supabase
 */
export async function submitOrderRequest(order: OrderRequest) {
  const client = getSupabase()
  if (!client) {
    return { success: false, fallback: true, error: 'Supabase credentials not configured' }
  }

  try {
    const { data, error } = await client
      .from('orders')
      .insert([
        {
          customer_name: order.customer_name || 'Guest',
          customer_email: order.customer_email || 'Not provided',
          customer_phone: order.customer_phone,
          customer_location: order.customer_location || 'Sfax, Tunisia',
          items: order.items,
          subtotal: order.subtotal,
          currency: order.currency || 'TND',
          status: 'pending',
          rental_dates: order.rental_dates || null,
          notes: order.notes || null,
        },
      ])
      .select()

    if (error) {
      console.error('Supabase order request error:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (err) {
    console.error('Failed to submit order request:', err)
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
 * Helper to fetch latest orders from Supabase
 */
export async function fetchOrders(): Promise<OrderRequest[]> {
  const client = getSupabase()
  if (!client) return []
  try {
    const { data, error } = await client
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return (data as OrderRequest[]) || []
  } catch (err) {
    console.warn('Failed to fetch orders from Supabase:', err)
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
 * Update order status in Supabase
 */
export async function updateOrderInDb(id: string, status: string) {
  const client = getSupabase()
  if (!client) return { success: false }
  try {
    const { error } = await client.from('orders').update({ status }).eq('id', id)
    if (error) throw error
    return { success: true }
  } catch (err) {
    console.warn('Failed to update order in Supabase:', err)
    return { success: false }
  }
}

/**
 * Delete order from Supabase
 */
export async function deleteOrderInDb(id: string) {
  const client = getSupabase()
  if (!client) return { success: false }
  try {
    const { error } = await client.from('orders').delete().eq('id', id)
    if (error) throw error
    return { success: true }
  } catch (err) {
    console.warn('Failed to delete order in Supabase:', err)
    return { success: false }
  }
}

/**
 * Sync entire portfolio settings to Supabase
 */
export async function syncPortfolioSettingsToDb(payload: Record<string, unknown>) {
  const client = getSupabase()
  if (!client) return { success: false, error: 'No database configured' }
  try {
    const { data, error } = await client
      .from('portfolio_settings')
      .upsert({
        id: 'current_state',
        updated_at: new Date().toISOString(),
        ...payload,
      })
      .select()

    if (error) throw error
    return { success: true, data }
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
    const { data, error } = await client
      .from('portfolio_settings')
      .select('*')
      .eq('id', 'current_state')
      .maybeSingle()

    if (error) throw error
    return data
  } catch (err) {
    console.warn('Failed to fetch portfolio settings from Supabase:', err)
    return null
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

/**
 * Send an SMS-style high priority browser / OS / mobile notification
 */
export function sendDeviceNotification(title: string, options?: { body?: string; icon?: string; tag?: string }) {
  if (typeof window === 'undefined' || !('Notification' in window)) return
  if (isNotificationsMuted()) return

  // Play audio chime immediately
  playNotificationSound()

  // Vibrate mobile device (if supported) - SMS pattern: buzz, pause, buzz
  if ('navigator' in window && 'vibrate' in navigator) {
    try {
      navigator.vibrate([200, 100, 200, 100, 300])
    } catch {
      // ignore
    }
  }

  if (Notification.permission === 'granted') {
    try {
      new Notification(title, {
        body: options?.body || 'New update in Farah Affes Studio',
        icon: options?.icon || '/images/farah-portrait.png',
        badge: '/favicon.ico',
        tag: options?.tag || 'farah-portfolio-alert',
        silent: false,
      })
    } catch (err) {
      console.warn('Browser notification error:', err)
    }
  }
}
