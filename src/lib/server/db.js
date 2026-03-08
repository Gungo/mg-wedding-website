import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

const DATA_DIR = join(process.cwd(), 'data');
const DB_PATH = join(DATA_DIR, 'rsvps.json');

function ensureDir() {
  try {
    if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
    return true;
  } catch {
    return false;
  }
}

function readDB() {
  try {
    if (!existsSync(DB_PATH)) return [];
    return JSON.parse(readFileSync(DB_PATH, 'utf-8'));
  } catch {
    return [];
  }
}

function writeDB(data) {
  if (!ensureDir()) return false;
  try {
    writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
    return true;
  } catch {
    return false;
  }
}

export function addRsvp(rsvp) {
  const db = readDB();
  db.push({ ...rsvp, createdAt: new Date().toISOString() });
  writeDB(db);
  return rsvp;
}

export function updateRsvpByDevice(deviceId, updates) {
  const db = readDB();
  const idx = db.findIndex(r => r.deviceId === deviceId);
  if (idx === -1) return null;
  db[idx] = { ...db[idx], ...updates, updatedAt: new Date().toISOString() };
  writeDB(db);
  return db[idx];
}

export function getRsvpByDevice(deviceId) {
  const db = readDB();
  return db.find(r => r.deviceId === deviceId) || null;
}

export function getRsvps() {
  return readDB();
}
