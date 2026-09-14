<script>
  import { useI18n } from '$lib/i18n/index.svelte.js';

  const i18n = useI18n();
  const ui = $derived(i18n.wedding.ui);
</script>

<div class="lang-wrap">
  <div class="lang-toggle" role="group" aria-label={ui.langAria}>
    <button
      type="button"
      class="lang-btn"
      class:active={i18n.lang === 'en'}
      aria-pressed={i18n.lang === 'en'}
      onclick={() => i18n.setLang('en')}
    >
      {ui.langEn}
    </button>
    <span class="divider" aria-hidden="true">/</span>
    <button
      type="button"
      class="lang-btn"
      class:active={i18n.lang === 'es'}
      aria-pressed={i18n.lang === 'es'}
      onclick={() => i18n.setLang('es')}
    >
      {ui.langEs}
    </button>
  </div>
</div>

<style>
  .lang-wrap {
    display: flex;
    justify-content: center;
    padding: clamp(1.35rem, 3.5vh, 2rem) clamp(1.25rem, 4vw, 2.5rem) 0;
  }

  .lang-toggle {
    display: inline-flex;
    align-items: center;
    gap: 0.55rem;
    border: 1.5px solid var(--color-text);
    padding: 0.45em 1.15em;
    background: var(--color-bg);
  }

  .lang-btn {
    font-family: var(--font-sans);
    font-size: clamp(0.72rem, 1.3vw, 0.82rem);
    font-weight: 500;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--color-text-muted);
    background: transparent;
    border: 0;
    padding: 0.15em 0.1em;
    cursor: pointer;
    transition: color var(--duration-normal) var(--ease-elegant);
  }

  .lang-btn.active {
    color: var(--color-text);
    text-decoration: underline;
    text-underline-offset: 0.28em;
  }

  .lang-btn:hover {
    color: var(--color-text);
  }

  .divider {
    color: var(--color-border);
    font-family: var(--font-sans);
    letter-spacing: 0;
    font-size: 0.8rem;
  }
</style>
