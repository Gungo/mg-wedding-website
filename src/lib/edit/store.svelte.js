import { browser, dev } from '$app/environment';
import initial from '$lib/content/layout-overrides.json';

/** @typedef {{
 *   x?: number,
 *   y?: number,
 *   scale?: number,
 *   rotate?: number,
 *   flipX?: boolean,
 *   flipY?: boolean,
 *   text?: string
 * }} LayoutOverride */

function clone(value) {
  return /** @type {Record<string, LayoutOverride>} */ (
    JSON.parse(JSON.stringify(value ?? {}))
  );
}

/** Live-edit chrome is local/dev only. */
export function canLiveEdit() {
  if (!browser) return false;
  if (dev) return true;
  const host = window.location.hostname;
  return host === 'localhost' || host === '127.0.0.1';
}

export const edit = $state({
  on: false,
  selectedId: /** @type {string | null} */ (null),
  dirty: false,
  saving: false,
  message: ''
});

export const overrides = $state(clone(initial));

/** @param {string} id */
export function getOverride(id) {
  return overrides[id] ?? {};
}

/**
 * @param {string} id
 * @param {LayoutOverride} patch
 */
export function patchOverride(id, patch) {
  overrides[id] = { ...getOverride(id), ...patch };
  edit.dirty = true;
  edit.message = '';
}

/** @param {string} id */
export function resetOverride(id) {
  delete overrides[id];
  edit.dirty = true;
  edit.message = '';
  if (edit.selectedId === id) edit.selectedId = null;
}

/**
 * Replace an override entry entirely (or remove if empty).
 * @param {string} id
 * @param {LayoutOverride | null} next
 */
export function setOverride(id, next) {
  if (!next || Object.keys(next).length === 0) {
    delete overrides[id];
  } else {
    overrides[id] = next;
  }
  edit.dirty = true;
  edit.message = '';
}

export function selectEditable(id) {
  if (!edit.on) return;
  edit.selectedId = id;
}

export function clearSelection() {
  edit.selectedId = null;
}

export function toggleEditMode() {
  if (!canLiveEdit()) return;
  edit.on = !edit.on;
  if (!edit.on) {
    edit.selectedId = null;
    edit.message = '';
  }
}

export async function saveOverrides() {
  if (!canLiveEdit() || edit.saving) return false;
  edit.saving = true;
  edit.message = '';
  try {
    const res = await fetch('/api/layout-overrides', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(overrides)
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || `Save failed (${res.status})`);
    }
    edit.dirty = false;
    edit.message = 'Saved';
    return true;
  } catch (err) {
    edit.message = err instanceof Error ? err.message : 'Save failed';
    return false;
  } finally {
    edit.saving = false;
  }
}

/**
 * Build CSS individual transform properties from an override.
 * @param {LayoutOverride} o
 */
export function overrideStyle(o = {}) {
  const x = o.x ?? 0;
  const y = o.y ?? 0;
  const scale = o.scale ?? 1;
  const sx = (o.flipX ? -1 : 1) * scale;
  const sy = (o.flipY ? -1 : 1) * scale;
  const rotate = o.rotate ?? 0;
  return {
    translate: `${x}px ${y}px`,
    rotate: `${rotate}deg`,
    scale: `${sx} ${sy}`
  };
}
