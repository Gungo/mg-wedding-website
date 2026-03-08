import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { getRsvps } from '$lib/server/db.js';

export async function POST({ request }) {
  const { password } = await request.json();
  if (!env.ADMIN_PASSWORD || password !== env.ADMIN_PASSWORD) {
    return json({ error: 'Invalid password' }, { status: 401 });
  }
  const rsvps = getRsvps();
  return json({ rsvps });
}
