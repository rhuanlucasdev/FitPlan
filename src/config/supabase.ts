import { createClient } from "@supabase/supabase-js";

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://shefhxkgcxiplvixvwog.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNoZWZoeGtnY3hpcGx2aXh2d29nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0NDI3ODUsImV4cCI6MjA3MzAxODc4NX0.iklM78Xuc7qNcUjBCQtzw1OB6cAAMNZ54FSSet92xdE";

// Singleton pattern to avoid multiple instances
class SupabaseClientSingleton {
  private static instance: ReturnType<typeof createClient> | null = null;

  static getInstance() {
    if (!SupabaseClientSingleton.instance) {
      SupabaseClientSingleton.instance = createClient(supabaseUrl, supabaseKey);
    }
    return SupabaseClientSingleton.instance;
  }
}

export const supabase = SupabaseClientSingleton.getInstance();
