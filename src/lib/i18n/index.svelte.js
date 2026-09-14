import { getContext } from 'svelte';
import { LOCALE_KEY } from './locale.js';

export function useI18n() {
  return getContext(LOCALE_KEY);
}
