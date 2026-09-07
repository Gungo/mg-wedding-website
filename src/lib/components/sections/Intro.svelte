<script>
  import { wedding } from '$lib/content/wedding.js';
</script>

<section class="intro" id="intro">
  <p class="tagline">{wedding.tagline}</p>
  {#each wedding.intro as para}
    <p class="copy">{para}</p>
  {/each}
</section>

<style>
  .intro {
    max-width: 52rem;
    margin: 0 auto;
    padding: clamp(3rem, 8vh, 5.5rem) clamp(1.25rem, 4vw, 2.5rem) 0;
    text-align: center;
  }

  .tagline {
    font-family: var(--font-display);
    font-weight: 600;
    font-size: clamp(1.35rem, 4.2vw, 2.35rem);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    line-height: 1.25;
    margin-bottom: clamp(1.5rem, 4vh, 2.25rem);
    color: var(--color-text);
  }

  .copy {
    font-size: clamp(1.05rem, 2vw, 1.25rem);
    line-height: 1.7;
    margin-bottom: 1rem;
  }

  .copy:last-child {
    margin-bottom: 0;
  }
</style>
