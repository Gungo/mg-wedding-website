<script>
  import Section from '$lib/components/Section.svelte';
  import { wedding } from '$lib/content/wedding.js';

  const r = wedding.registry;
</script>

<Section id="registry">
  <div class="registry">
    <div class="icon" aria-hidden="true">
      <svg viewBox="0 0 48 48" fill="none">
        <rect x="8" y="18" width="32" height="22" stroke="currentColor" stroke-width="1.4" />
        <path d="M8 18h32" stroke="currentColor" stroke-width="1.4" />
        <path d="M24 18v22" stroke="currentColor" stroke-width="1.4" />
        <path d="M24 18c0-6 4.5-10 9-8.5 2.5 1 4 4 3 7.5H24Z" stroke="currentColor" stroke-width="1.4" />
        <path d="M24 18c0-6-4.5-10-9-8.5C12.5 10.5 11 13.5 12 17h12Z" stroke="currentColor" stroke-width="1.4" />
      </svg>
    </div>
    <p class="note">{r.note}</p>
    {#if r.url}
      <a class="ghost-btn" href={r.url} target="_blank" rel="noopener noreferrer">{r.label}</a>
    {/if}
  </div>
</Section>

<style>
  .registry {
    max-width: 40rem;
    margin-inline: auto;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }

  .icon {
    width: 2.75rem;
    height: 2.75rem;
    color: var(--color-text);
  }

  .icon svg {
    width: 100%;
    height: 100%;
  }

  .note {
    font-size: clamp(1.05rem, 2vw, 1.25rem);
    line-height: 1.65;
  }

  .ghost-btn {
    display: inline-block;
    margin-top: 0.5rem;
    font-family: var(--font-body);
    font-size: clamp(0.8rem, 1.4vw, 0.95rem);
    font-weight: var(--font-weight-medium);
    letter-spacing: 0.22em;
    text-transform: uppercase;
    text-decoration: none;
    color: var(--color-text);
    border: 1.5px solid var(--color-text);
    padding: 0.75em 2.25em;
    transition: background-color var(--duration-normal) var(--ease-elegant),
                color var(--duration-normal) var(--ease-elegant);
  }

  .ghost-btn:hover {
    background-color: var(--color-text);
    color: var(--color-bg);
  }
</style>
