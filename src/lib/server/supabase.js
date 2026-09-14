import { createClient } from '@supabase/supabase-js';
import { dev } from '$app/environment';
import { env } from '$env/dynamic/private';

let _client;

export function getSupabase() {
  if (dev) return null;
  if (!_client) {
    if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_KEY) {
      return null;
    }
    _client = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_KEY);
  }
  return _client;
}
