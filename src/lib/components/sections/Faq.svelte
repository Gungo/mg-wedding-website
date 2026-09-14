<script>
  import Section from '$lib/components/Section.svelte';
  import { useI18n } from '$lib/i18n/index.svelte.js';

  const i18n = useI18n();
  const f = $derived(i18n.wedding.faq);
</script>

<Section id="faq" title={f.title} titleStyle="script">
  <div class="faq">
    {#each f.items as item}
      <div class="item">
        <p class="q">{item.q}</p>
        <p class="a">{item.a}</p>
      </div>
    {/each}
  </div>
</Section>

<style>
  .faq {
    max-width: 46rem;
    margin-inline: auto;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: clamp(1.75rem, 4vh, 2.5rem);
  }

  .q {
    font-size: clamp(1.05rem, 2vw, 1.25rem);
    font-weight: var(--font-weight-medium);
    margin-bottom: 0.45rem;
  }

  .a {
    font-size: clamp(1rem, 1.8vw, 1.15rem);
    color: var(--color-text);
    line-height: 1.6;
  }
</style>
