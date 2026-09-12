import { json, error } from '@sveltejs/kit';
import { dev } from '$app/environment';
import { writeFile } from 'node:fs/promises';
import path from 'node:path';

const FILE = path.resolve('src/lib/content/layout-overrides.json');

function assertLocalDev(getClientAddress) {
  if (!dev) {
    error(403, 'Layout editing is only available in local development');
  }
  // Soft check: prefer loopback, but Vite --host may report LAN IP
  try {
    const addr = getClientAddress?.() ?? '';
    const ok =
      !addr ||
      addr === '127.0.0.1' ||
      addr === '::1' ||
      addr.startsWith('192.168.') ||
      addr.startsWith('10.') ||
      addr.startsWith('172.');
    if (!ok) error(403, 'Layout editing blocked for this client');
  } catch {
    // getClientAddress can throw behind some adapters — still allow in dev
  }
}

export async function GET({ getClientAddress }) {
  assertLocalDev(getClientAddress);
  const { readFile } = await import('node:fs/promises');
  try {
    const raw = await readFile(FILE, 'utf8');
    return json(JSON.parse(raw));
  } catch {
    return json({});
  }
}

export async function POST({ request, getClientAddress }) {
  assertLocalDev(getClientAddress);

  let body;
  try {
    body = await request.json();
  } catch {
    error(400, 'Invalid JSON');
  }

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    error(400, 'Overrides must be an object');
  }

  // Keep file tidy: drop empty entries
  const cleaned = {};
  for (const [id, value] of Object.entries(body)) {
    if (!value || typeof value !== 'object') continue;
    const entry = {};
    for (const key of ['x', 'y', 'scale', 'rotate', 'flipX', 'flipY', 'text']) {
      if (value[key] !== undefined && value[key] !== null) entry[key] = value[key];
    }
    if (Object.keys(entry).length) cleaned[id] = entry;
  }

  await writeFile(FILE, `${JSON.stringify(cleaned, null, 2)}\n`, 'utf8');
  return json({ ok: true, count: Object.keys(cleaned).length });
}
