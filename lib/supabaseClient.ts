import { createClient } from '@supabase/supabase-js'

// These values come from your Supabase project
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Create a Supabase client instance
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
