import { createClient } from '@supabase/supabase-js'

// Use lazy initialization for Server Components compatibility
const getSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables')
  }
  
  return createClient(supabaseUrl, supabaseKey)
}

// For backward compatibility - will be created on first use
let supabaseInstance = null
export const supabase = new Proxy({}, {
  get: (target, prop) => {
    if (!supabaseInstance) {
      supabaseInstance = getSupabaseClient()
    }
    return supabaseInstance[prop]
  }
})

// Also export the getter for explicit use
export { getSupabaseClient }
