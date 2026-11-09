<script>
  import Section from '$lib/components/Section.svelte';
  import { useI18n } from '$lib/i18n/index.svelte.js';

  const i18n = useI18n();
  const r = $derived(i18n.wedding.registry);
</script>

<Section id="registry">
  <div class="registry">
    {#if r.url}
      <a
        class="gift-link"
        href={r.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={r.label}
      >
        <span class="icon" aria-hidden="true">
          <svg viewBox="0 0 48 48" fill="none">
            <rect x="8" y="18" width="32" height="22" stroke="currentColor" stroke-width="1.4" />
            <path d="M8 18h32" stroke="currentColor" stroke-width="1.4" />
            <path d="M24 18v22" stroke="currentColor" stroke-width="1.4" />
            <path d="M24 18c0-6 4.5-10 9-8.5 2.5 1 4 4 3 7.5H24Z" stroke="currentColor" stroke-width="1.4" />
            <path d="M24 18c0-6-4.5-10-9-8.5C12.5 10.5 11 13.5 12 17h12Z" stroke="currentColor" stroke-width="1.4" />
          </svg>
        </span>
      </a>
    {:else}
      <div class="icon" aria-hidden="true">
        <svg viewBox="0 0 48 48" fill="none">
          <rect x="8" y="18" width="32" height="22" stroke="currentColor" stroke-width="1.4" />
          <path d="M8 18h32" stroke="currentColor" stroke-width="1.4" />
          <path d="M24 18v22" stroke="currentColor" stroke-width="1.4" />
          <path d="M24 18c0-6 4.5-10 9-8.5 2.5 1 4 4 3 7.5H24Z" stroke="currentColor" stroke-width="1.4" />
          <path d="M24 18c0-6-4.5-10-9-8.5C12.5 10.5 11 13.5 12 17h12Z" stroke="currentColor" stroke-width="1.4" />
        </svg>
      </div>
    {/if}
    <p class="note">
      {r.noteBefore}{#if r.url}<a
          href={r.url}
          target="_blank"
          rel="noopener noreferrer">{r.noteLinkLabel}</a
        >{:else}{r.noteLinkLabel}{/if}{r.noteAfter}
    </p>
  </div>
</Section>

<style>
  .registry {
    max-width: 48rem;
    margin-inline: auto;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }

  .gift-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.85rem;
    color: var(--color-text);
    text-decoration: none;
    border: 1.5px solid var(--color-text);
    cursor: pointer;
    transition:
      background-color var(--duration-normal) var(--ease-elegant),
      color var(--duration-normal) var(--ease-elegant),
      transform var(--duration-normal) var(--ease-elegant);
  }

  .gift-link:hover {
    background-color: var(--color-text);
    color: var(--color-bg);
    transform: translateY(-2px);
  }

  .gift-link:focus-visible {
    outline: 2px solid var(--color-text);
    outline-offset: 4px;
  }

  .icon {
    width: 2.75rem;
    height: 2.75rem;
    color: inherit;
    display: block;
  }

  .icon svg {
    width: 100%;
    height: 100%;
  }

  .note {
    font-size: clamp(1.05rem, 2vw, 1.25rem);
    line-height: 1.65;
  }

  .note a {
    color: inherit;
    text-decoration: underline;
    text-underline-offset: 0.2em;
  }
</style>
