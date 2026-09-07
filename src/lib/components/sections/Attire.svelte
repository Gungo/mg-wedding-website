<script>
  import Section from '$lib/components/Section.svelte';
  import { wedding } from '$lib/content/wedding.js';

  const a = wedding.attire;
</script>

<Section id="attire" title={a.title} titleStyle="display">
  <div class="attire">
    <img class="berry left" src="/images/canva/decor/berry-left.png" alt="" />
    <img class="berry right" src="/images/canva/decor/berry-right.png" alt="" />
    <img class="shell" src="/images/canva/decor/shell.png" alt="" />
    <p class="level">{a.level}</p>
    {#if a.note}
      <p class="note">{a.note}</p>
    {/if}
  </div>
</Section>

<style>
  .attire {
    position: relative;
    max-width: 36rem;
    margin: 0 auto;
    text-align: center;
    padding: 0 4rem 1rem;
  }

  .shell {
    width: clamp(3.5rem, 10vw, 5rem);
    height: auto;
    margin: 0 auto 1.25rem;
  }

  .level {
    font-family: var(--font-sans);
    font-size: clamp(0.85rem, 1.6vw, 1.05rem);
    letter-spacing: 0.28em;
    text-transform: uppercase;
  }

  .note {
    margin-top: 1.25rem;
    font-size: clamp(1.05rem, 2vw, 1.2rem);
    line-height: 1.6;
  }

  .berry {
    position: absolute;
    top: -2.5rem;
    width: clamp(4.5rem, 14vw, 7rem);
    height: auto;
    pointer-events: none;
  }

  .left { left: -0.5rem; }
  .right { right: -0.5rem; }
</style>
