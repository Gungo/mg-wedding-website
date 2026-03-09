export async function handle({ event, resolve }) {
  let deviceId = event.cookies.get('device_id');

  if (!deviceId) {
    deviceId = crypto.randomUUID();
    event.cookies.set('device_id', deviceId, {
      path: '/',
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 365
    });
  }

  event.locals.deviceId = deviceId;
  event.locals.hasSubmitted = event.cookies.get('has_submitted') === 'true';

  return resolve(event);
}
