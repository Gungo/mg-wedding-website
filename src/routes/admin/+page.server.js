import { redirect } from '@sveltejs/kit';
import { getRsvps, getNotificationEmails } from '$lib/server/db.js';

export async function load({ cookies }) {
  if (cookies.get('admin_session') !== 'authenticated') {
    throw redirect(303, '/');
  }
  const [rsvps, notificationEmails] = await Promise.all([getRsvps(), getNotificationEmails()]);
  return { rsvps, notificationEmails };
}
