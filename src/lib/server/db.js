import { getSupabase } from './supabase.js';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

const DATA_DIR = join(process.cwd(), 'data');
const DB_PATH = join(DATA_DIR, 'rsvps.json');
const EMAILS_PATH = join(DATA_DIR, 'notification_emails.json');

function useSupabase() {
  return !!getSupabase();
}

// ── Local JSON fallback (dev without Supabase) ──

function ensureDir() {
  try {
    if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
    return true;
  } catch { return false; }
}

function readLocal() {
  try {
    if (!existsSync(DB_PATH)) return [];
    return JSON.parse(readFileSync(DB_PATH, 'utf-8'));
  } catch { return []; }
}

function writeLocal(data) {
  if (!ensureDir()) return;
  try { writeFileSync(DB_PATH, JSON.stringify(data, null, 2)); } catch { /* */ }
}

// ── Public API (auto-selects Supabase or local) ──

export async function addRsvp(rsvp) {
  if (useSupabase()) {
    const sb = getSupabase();
    const { error } = await sb.from('rsvps').insert({
      device_id: rsvp.deviceId,
      name: rsvp.name,
      email: rsvp.email,
      attending: rsvp.attending,
      guest_count: rsvp.guestCount,
      dietary: rsvp.dietary,
      message: rsvp.message
    });
    if (error) console.error('Supabase insert error:', error.message);
    return rsvp;
  }
  const db = readLocal();
  db.push({ ...rsvp, createdAt: new Date().toISOString() });
  writeLocal(db);
  return rsvp;
}

export async function updateRsvpByDevice(deviceId, updates) {
  if (useSupabase()) {
    const sb = getSupabase();
    const { data, error } = await sb.from('rsvps')
      .update({
        name: updates.name,
        email: updates.email,
        attending: updates.attending,
        guest_count: updates.guestCount,
        dietary: updates.dietary,
        message: updates.message,
        updated_at: new Date().toISOString()
      })
      .eq('device_id', deviceId)
      .select()
      .single();
    if (error) { console.error('Supabase update error:', error.message); return null; }
    return data;
  }
  const db = readLocal();
  const idx = db.findIndex(r => r.deviceId === deviceId);
  if (idx === -1) return null;
  db[idx] = { ...db[idx], ...updates, updatedAt: new Date().toISOString() };
  writeLocal(db);
  return db[idx];
}

export async function getRsvpByDevice(deviceId) {
  if (useSupabase()) {
    const sb = getSupabase();
    const { data } = await sb.from('rsvps')
      .select('*')
      .eq('device_id', deviceId)
      .limit(1)
      .maybeSingle();
    if (!data) return null;
    return {
      deviceId: data.device_id,
      name: data.name,
      email: data.email,
      attending: data.attending,
      guestCount: data.guest_count,
      dietary: data.dietary,
      message: data.message,
      createdAt: data.created_at
    };
  }
  const db = readLocal();
  return db.find(r => r.deviceId === deviceId) || null;
}

export async function getRsvps() {
  if (useSupabase()) {
    const sb = getSupabase();
    const { data, error } = await sb.from('rsvps')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) { console.error('Supabase read error:', error.message); return []; }
    return data.map(r => ({
      deviceId: r.device_id,
      name: r.name,
      email: r.email,
      attending: r.attending,
      guestCount: r.guest_count,
      dietary: r.dietary,
      message: r.message,
      createdAt: r.created_at,
      updatedAt: r.updated_at
    }));
  }
  return readLocal();
}

// ── Notification Emails ──

function readLocalEmails() {
  try {
    if (!existsSync(EMAILS_PATH)) return [];
    return JSON.parse(readFileSync(EMAILS_PATH, 'utf-8'));
  } catch { return []; }
}

function writeLocalEmails(data) {
  if (!ensureDir()) return;
  try { writeFileSync(EMAILS_PATH, JSON.stringify(data, null, 2)); } catch { /* */ }
}

export async function getNotificationEmails() {
  if (useSupabase()) {
    const sb = getSupabase();
    const { data, error } = await sb.from('notification_emails')
      .select('*')
      .order('created_at', { ascending: true });
    if (error) { console.error('Supabase emails read error:', error.message); return []; }
    return data.map(r => r.email);
  }
  return readLocalEmails();
}

export async function addNotificationEmail(email) {
  if (useSupabase()) {
    const sb = getSupabase();
    const { error } = await sb.from('notification_emails').insert({ email });
    if (error) console.error('Supabase email insert error:', error.message);
    return;
  }
  const emails = readLocalEmails();
  if (!emails.includes(email)) {
    emails.push(email);
    writeLocalEmails(emails);
  }
}

export async function removeNotificationEmail(email) {
  if (useSupabase()) {
    const sb = getSupabase();
    const { error } = await sb.from('notification_emails').delete().eq('email', email);
    if (error) console.error('Supabase email delete error:', error.message);
    return;
  }
  const emails = readLocalEmails();
  writeLocalEmails(emails.filter(e => e !== email));
}
