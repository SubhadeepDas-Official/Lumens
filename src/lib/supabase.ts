import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isSupabaseConfigured =
  typeof supabaseUrl === 'string' &&
  supabaseUrl.length > 0 &&
  !supabaseUrl.startsWith('your_') &&
  typeof supabaseAnonKey === 'string' &&
  supabaseAnonKey.length > 0 &&
  !supabaseAnonKey.startsWith('your_')

export const supabase = createClient(
  supabaseUrl ?? 'https://placeholder.supabase.co',
  supabaseAnonKey ?? 'placeholder-key',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
)

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          name: string
          email: string
          role: string
          avatar: string | null
          joined_date: string | null
          bio: string | null
          phone: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id: string
          name: string
          email: string
          role: string
          avatar?: string | null
          joined_date?: string | null
          bio?: string | null
          phone?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          email?: string
          role?: string
          avatar?: string | null
          joined_date?: string | null
          bio?: string | null
          phone?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
    }
  }
}
