import { createClient } from '@supabase/supabase-js';
import { env } from '$env/dynamic/private';

let _client;

export function getSupabase() {
  if (!_client) {
    if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_KEY) {
      return null;
    }
    _client = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_KEY);
  }
  return _client;
}
