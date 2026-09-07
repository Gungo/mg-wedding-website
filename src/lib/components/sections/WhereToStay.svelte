<script>
  import Section from '$lib/components/Section.svelte';
  import { wedding } from '$lib/content/wedding.js';

  const s = wedding.stay;
</script>

<Section id="where-to-stay" title={s.title} titleStyle="display">
  <div class="stay">
    <p class="place">
      <span>{s.place}</span>
      <img src="/images/canva/decor/cabin.png" alt="" />
      <span>{s.region}</span>
    </p>
    <p class="intro">{s.intro}</p>
    {#if s.items.length}
      <ul>
        {#each s.items as item}
          <li>
            <p class="name">{item.name}</p>
            {#if item.address}<p class="addr">{item.address}</p>{/if}
            <p>{item.description}</p>
          </li>
        {/each}
      </ul>
    {/if}
  </div>
</Section>

<style>
  .stay {
    max-width: 38rem;
    margin: 0 auto;
    text-align: center;
  }

  .place {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    font-family: var(--font-sans);
    letter-spacing: 0.16em;
    text-transform: uppercase;
    font-size: clamp(0.85rem, 1.6vw, 1rem);
    margin-bottom: 1.5rem;
  }

  .place img {
    width: clamp(5rem, 16vw, 7.5rem);
    height: auto;
  }

  .intro {
    font-size: clamp(1.05rem, 2vw, 1.22rem);
    line-height: 1.65;
  }

  ul {
    list-style: none;
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .name {
    font-family: var(--font-display);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: 0.35rem;
  }

  .addr {
    font-family: var(--font-sans);
    font-size: 0.75rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    margin-bottom: 0.65rem;
  }
</style>
