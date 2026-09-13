<script>
  import Section from '$lib/components/Section.svelte';
  import { wedding } from '$lib/content/wedding.js';

  const m = wedding.maps;
</script>

<Section id="maps" title={m.title} titleStyle="display" bleed>
  <div class="maps">
    {#each m.items as item}
      <figure>
        <img src={item.src} alt={item.alt} />
      </figure>
    {/each}
  </div>
</Section>

<style>
  .maps {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.25rem;
    max-width: 1320px;
    margin: 0 auto;
    padding-inline: clamp(1.25rem, 4vw, 2.5rem);
  }

  figure img {
    width: 100%;
    height: auto;
    border: 1px solid var(--color-border);
  }

  @media (min-width: 800px) {
    .maps {
      grid-template-columns: 1fr 1fr;
    }
  }
</style>
