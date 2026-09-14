<script>
  import '../app.css';
  import { onMount } from 'svelte';
  import { setContext } from 'svelte';
  import { wedding as en } from '$lib/content/wedding.js';
  import { wedding as es } from '$lib/content/wedding.es.js';
  import { LOCALE_KEY, normalizeLocale, persistLocale } from '$lib/i18n/locale.js';

  let { data, children } = $props();
  let lang = $state(normalizeLocale(data.locale));

  function setLang(next) {
    lang = normalizeLocale(next);
    persistLocale(lang);
  }

  setContext(LOCALE_KEY, {
    get lang() {
      return lang;
    },
    get wedding() {
      return lang === 'es' ? es : en;
    },
    setLang,
    toggle() {
      setLang(lang === 'es' ? 'en' : 'es');
    }
  });

  onMount(() => {
    try {
      const stored = localStorage.getItem(LOCALE_KEY);
      if (stored === 'es' || stored === 'en') setLang(stored);
    } catch {
      // Ignore private-mode / blocked storage.
    }
  });
</script>

<div class="page-shell">
  {@render children()}
</div>

<style>
  .page-shell {
    min-height: 100vh;
    width: 100%;
  }
</style>
