import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { getRsvps, getNotificationEmails, addNotificationEmail, removeNotificationEmail } from '$lib/server/db.js';

function isAuthed(cookies) {
  return cookies.get('admin_session') === 'authenticated';
}

export async function POST({ request, cookies }) {
  const body = await request.json();
  const { password, action, email } = body;

  if (action === 'logout') {
    cookies.delete('admin_session', { path: '/' });
    return json({ ok: true });
  }

  if (action === 'add_email') {
    if (!isAuthed(cookies)) return json({ error: 'Unauthorized' }, { status: 401 });
    if (!email) return json({ error: 'Email required' }, { status: 400 });
    await addNotificationEmail(email);
    const emails = await getNotificationEmails();
    return json({ emails });
  }

  if (action === 'remove_email') {
    if (!isAuthed(cookies)) return json({ error: 'Unauthorized' }, { status: 401 });
    if (!email) return json({ error: 'Email required' }, { status: 400 });
    await removeNotificationEmail(email);
    const emails = await getNotificationEmails();
    return json({ emails });
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
  if (!isAuthed(cookies)) {
    return json({ error: 'Unauthorized' }, { status: 401 });
  }
  const [rsvps, emails] = await Promise.all([getRsvps(), getNotificationEmails()]);
  return json({ rsvps, emails });
}
