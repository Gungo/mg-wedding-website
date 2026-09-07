<script>
  import Section from '$lib/components/Section.svelte';
  import { wedding } from '$lib/content/wedding.js';

  const s = wedding.story;
</script>

<Section id="our-story" title={s.title} titleStyle="display">
  <div class="ornament">
    <img src="/images/canva/decor/planet-left.png" alt="" />
    <img class="pearl" src="/images/canva/decor/pearl.png" alt="" />
    <img src="/images/canva/decor/planet-right.png" alt="" />
  </div>

  <div class="story">
    <img class="photo" src={s.photos[0].src} alt={s.photos[0].alt} />
    <ul>
      {#each s.words as word}
        <li>{word}</li>
      {/each}
    </ul>
    <img class="photo" src={s.photos[1].src} alt={s.photos[1].alt} />
  </div>
</Section>

<style>
  .ornament {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: clamp(1rem, 4vw, 2.5rem);
    margin: -1rem auto 2rem;
    max-width: 28rem;
  }

  .ornament img {
    width: clamp(3.5rem, 10vw, 5.5rem);
    height: auto;
  }

  .pearl {
    width: clamp(2.4rem, 7vw, 3.6rem) !important;
  }

  .story {
    display: grid;
    grid-template-columns: 1fr;
    gap: clamp(1.5rem, 3vw, 2.5rem);
    align-items: start;
    max-width: 1100px;
    margin: 0 auto;
  }

  .photo {
    width: 100%;
    aspect-ratio: 3 / 4;
    object-fit: cover;
  }

  ul {
    list-style: none;
    text-align: center;
    font-family: var(--font-sans);
    font-size: clamp(0.72rem, 1.3vw, 0.85rem);
    letter-spacing: 0.18em;
    text-transform: uppercase;
    line-height: 1.85;
  }

  @media (min-width: 800px) {
    .story {
      grid-template-columns: 1fr 0.7fr 1fr;
      align-items: center;
    }
  }
</style>
