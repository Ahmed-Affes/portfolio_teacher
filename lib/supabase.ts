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
  status?: 'unread' | 'read' | 'replied'
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
  customer_phone?: string
  items: OrderItem[]
  subtotal: number
  currency?: string
  status?: 'pending' | 'confirmed' | 'fulfilled' | 'cancelled'
  notes?: string
}

/**
 * Helper to submit a contact message to Supabase
 */
export async function submitContactMessage(message: ContactMessage) {
  if (!supabase) {
    console.warn('Supabase is not configured. Skipping database record.')
    return { success: false, fallback: true, error: 'Supabase credentials not configured' }
  }

  try {
    const { data, error } = await supabase
      .from('contact_messages')
      .insert([
        {
          name: message.name,
          email: message.email,
          role: message.role || 'A student',
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
    console.warn('Supabase is not configured. Skipping database record.')
    return { success: false, fallback: true, error: 'Supabase credentials not configured' }
  }

  try {
    const { data, error } = await supabase
      .from('orders')
      .insert([
        {
          customer_name: order.customer_name || 'Guest',
          customer_email: order.customer_email || 'Not provided',
          customer_phone: order.customer_phone || null,
          items: order.items,
          subtotal: order.subtotal,
          currency: order.currency || 'TND',
          status: 'pending',
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
