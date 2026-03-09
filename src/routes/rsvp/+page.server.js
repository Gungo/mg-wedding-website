import { redirect } from '@sveltejs/kit';
import { addRsvp, updateRsvpByDevice, getRsvpByDevice } from '$lib/server/db.js';

export async function load({ locals }) {
  const existing = await getRsvpByDevice(locals.deviceId);
  return {
    existing: existing ? {
      name: existing.name,
      email: existing.email,
      attending: existing.attending,
      guestCount: existing.guestCount,
      dietary: existing.dietary,
      message: existing.message
    } : null
  };
}

export const actions = {
  default: async ({ request, cookies, locals }) => {
    const data = await request.formData();

    const rsvp = {
      deviceId: locals.deviceId,
      name: data.get('guest-name'),
      email: data.get('guest-email'),
      attending: data.get('attending'),
      guestCount: data.get('guest-count'),
      dietary: data.get('dietary'),
      message: data.get('message')
    };

    const existing = await getRsvpByDevice(locals.deviceId);
    if (existing) {
      await updateRsvpByDevice(locals.deviceId, rsvp);
    } else {
      await addRsvp(rsvp);
    }

    cookies.set('has_submitted', 'true', {
      path: '/',
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 365
    });

    throw redirect(303, '/');
  }
};
