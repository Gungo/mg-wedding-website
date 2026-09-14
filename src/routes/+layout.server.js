import { LOCALE_KEY, normalizeLocale } from '$lib/i18n/locale.js';

export function load({ locals, cookies }) {
  const locale = normalizeLocale(locals.locale ?? cookies.get(LOCALE_KEY));
  return { locale };
}
