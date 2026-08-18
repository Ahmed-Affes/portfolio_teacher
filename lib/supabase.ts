import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

// Client-side Supabase instance
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

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
  if (!supabase) {
    return { success: false, fallback: true, error: 'Supabase credentials not configured' }
  }

  try {
    const { data, error } = await supabase
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
  if (!supabase) {
    return { success: false, fallback: true, error: 'Supabase credentials not configured' }
  }

  try {
    const { data, error } = await supabase
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
  if (!supabase) return []
  try {
    const { data, error } = await supabase
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
  if (!supabase) return []
  try {
    const { data, error } = await supabase
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
 * Sync entire portfolio settings to Supabase
 */
export async function syncPortfolioSettingsToDb(payload: Record<string, unknown>) {
  if (!supabase) return { success: false, error: 'No database configured' }
  try {
    const { data, error } = await supabase
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

// ----------------------------------------------------
// PUSH & SMS-STYLE DEVICE NOTIFICATIONS
// ----------------------------------------------------

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
