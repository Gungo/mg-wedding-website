import { redirect } from '@sveltejs/kit';
import { getRsvps } from '$lib/server/db.js';

export async function load({ cookies }) {
  if (cookies.get('admin_session') !== 'authenticated') {
    throw redirect(303, '/');
  }
  const rsvps = await getRsvps();
  return { rsvps };
}
