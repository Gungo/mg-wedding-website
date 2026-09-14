export const LOCALE_KEY = 'mg-locale';

/** @param {unknown} value */
export function normalizeLocale(value) {
  return value === 'es' ? 'es' : 'en';
}

export function persistLocale(lang) {
  const next = normalizeLocale(lang);
  if (typeof document === 'undefined') return;
  document.documentElement.lang = next;
  document.cookie = `${LOCALE_KEY}=${next}; Path=/; Max-Age=31536000; SameSite=Lax`;
  try {
    localStorage.setItem(LOCALE_KEY, next);
  } catch {
    // Ignore private-mode / blocked storage.
  }
}
