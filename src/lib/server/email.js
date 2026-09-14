import { Resend } from 'resend';
import { dev } from '$app/environment';
import { env } from '$env/dynamic/private';
import { getNotificationEmails } from './db.js';

function getResend() {
  if (dev) return null;
  if (!env.RESEND_API_KEY) return null;
  return new Resend(env.RESEND_API_KEY);
}

export async function sendRsvpNotification(rsvp) {
  const resend = getResend();
  if (!resend) return;

  const emails = await getNotificationEmails();
  if (emails.length === 0) return;

  const status = rsvp.attending === 'yes' ? 'Joyfully Accepts' : 'Respectfully Declines';

  const html = `
    <div style="font-family: Georgia, serif; max-width: 480px; margin: 0 auto; padding: 2rem; color: #2c2c2c;">
      <h2 style="font-weight: normal; font-style: italic; margin-bottom: 0.25rem;">New RSVP Received</h2>
      <hr style="border: none; border-top: 1px solid #ddd; margin: 1rem 0;" />
      <p><strong>Name:</strong> ${rsvp.name || '—'}</p>
      <p><strong>Email:</strong> ${rsvp.email || '—'}</p>
      <p><strong>Attending:</strong> ${status}</p>
      <p><strong>Guests:</strong> ${rsvp.guestCount || '1'}</p>
      <p><strong>Dietary:</strong> ${rsvp.dietary || 'None specified'}</p>
      ${rsvp.message ? `<p><strong>Message:</strong> ${rsvp.message}</p>` : ''}
      <hr style="border: none; border-top: 1px solid #ddd; margin: 1rem 0;" />
      <p style="font-size: 0.85rem; color: #888; font-style: italic;">M&G Wedding</p>
    </div>
  `;

  try {
    await resend.emails.send({
      from: 'M&G Wedding <onboarding@resend.dev>',
      to: emails,
      subject: `New RSVP: ${rsvp.name || 'Guest'} — ${status}`,
      html
    });
  } catch (err) {
    console.error('Resend email error:', err.message);
  }
}
