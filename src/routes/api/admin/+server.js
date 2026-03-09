import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { getRsvps } from '$lib/server/db.js';

export async function POST({ request, cookies }) {
  const { password, action } = await request.json();

  if (action === 'logout') {
    cookies.delete('admin_session', { path: '/' });
    return json({ ok: true });
  }

  if (!env.ADMIN_PASSWORD || password !== env.ADMIN_PASSWORD) {
    return json({ error: 'Invalid password' }, { status: 401 });
  }

  cookies.set('admin_session', 'authenticated', {
    path: '/',
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    maxAge: 60 * 60 * 4
  });

  return json({ ok: true });
}

export async function GET({ cookies }) {
  if (cookies.get('admin_session') !== 'authenticated') {
    return json({ error: 'Unauthorized' }, { status: 401 });
  }
  const rsvps = await getRsvps();
  return json({ rsvps });
}
