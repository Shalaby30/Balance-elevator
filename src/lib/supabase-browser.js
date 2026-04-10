"use client";

import { createClient } from "@supabase/supabase-js";

// Temporarily hardcoded - move to env vars later
const SUPABASE_URL = 'https://qlnekecubhblxpzlynab.supabase.co';
const SUPABASE_KEY = 'sb_publishable_knJxUIQ1kPMutanPNjtnSA_eobmdbs8';

export function getSupabaseBrowser() {
  return createClient(SUPABASE_URL, SUPABASE_KEY);
}
