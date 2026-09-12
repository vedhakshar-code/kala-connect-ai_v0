import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

/**
 * Validates if actual, valid Supabase credentials have been provided.
 */
export const isSupabaseConfigured: boolean = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl.startsWith('https://') &&
  supabaseUrl !== 'https://placeholder.supabase.co' &&
  !supabaseUrl.includes('your-project') &&
  supabaseAnonKey !== 'placeholder-anon-key' &&
  supabaseAnonKey !== 'your-anon-key'
)

// Fallback dummy credentials to avoid createClient throwing during initialization
const activeUrl = isSupabaseConfigured ? supabaseUrl : 'https://placeholder.supabase.co'
const activeKey = isSupabaseConfigured ? supabaseAnonKey : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.placeholder'

export const supabase: SupabaseClient = createClient(activeUrl, activeKey)
