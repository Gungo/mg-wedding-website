<script>
  import Section from '$lib/components/Section.svelte';
  import Carousel from '$lib/components/Carousel.svelte';
  import { wedding } from '$lib/content/wedding.js';

  const t = wedding.thingsToDo;
</script>

<Section id="things-to-do" title={t.title} titleStyle="script" bleed>
  <Carousel>
    {#each t.items as item}
      <article class="card">
        <div class="photo-wrap">
          <img src={item.image} alt={item.imageAlt} />
        </div>
        <div class="copy">
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </div>
      </article>
    {/each}
  </Carousel>
</Section>

<style>
  .card {
    display: grid;
    grid-template-columns: 1fr;
    gap: clamp(1.25rem, 3vw, 2rem);
    align-items: center;
    min-height: 280px;
    padding: clamp(1.25rem, 3vw, 2rem);
    border: 1px solid var(--color-text);
    background: var(--color-sand-light);
  }

  .photo-wrap {
    outline: 1px solid var(--color-text);
    outline-offset: 6px;
    margin: 6px;
  }

  .photo-wrap img {
    width: 100%;
    aspect-ratio: 1;
    object-fit: cover;
    display: block;
  }

  .copy {
    text-align: center;
    padding: 0 0.5rem 0.5rem;
  }

  h3 {
    font-family: var(--font-body);
    font-weight: var(--font-weight-medium);
    font-size: clamp(0.8rem, 1.4vw, 0.95rem);
    letter-spacing: 0.22em;
    text-transform: uppercase;
    margin-bottom: 1rem;
  }

  p {
    font-size: clamp(1rem, 1.8vw, 1.15rem);
    font-style: italic;
    line-height: 1.55;
    color: var(--color-text);
  }

  @media (min-width: 800px) {
    .card {
      grid-template-columns: 1fr 1fr;
      min-height: 360px;
      padding: 1.75rem;
    }

    .copy {
      padding: 1rem 1.25rem;
    }
  }
</style>
