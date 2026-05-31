import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Safely initialize Supabase client to prevent app-wide crash if environment variables are missing
export const supabase = (() => {
  if (supabaseUrl && supabaseAnonKey) {
    try {
      return createClient(supabaseUrl, supabaseAnonKey);
    } catch (e) {
      console.error("Failed to initialize Supabase client:", e);
    }
  }

  console.warn("Supabase environment variables are missing. Contact form submissions will not work.");

  // Return a dummy client to avoid crashes when calling supabase.from(...).insert(...)
  return {
    from: () => ({
      insert: async () => ({
        error: new Error("Supabase is not configured. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your environment variables."),
        data: null,
      }),
    }),
  } as any;
})();
