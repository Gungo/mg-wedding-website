<script>
  import Section from '$lib/components/Section.svelte';
  import { wedding } from '$lib/content/wedding.js';

  const s = wedding.schedule;
</script>

<Section id="order-of-events" title={s.title} titleStyle="display">
  <div class="wrap">
    <img class="koi" src="/images/canva/decor/koi.png" alt="" />
    <ol>
      {#each s.items as item}
        <li>
          <p class="name">{item.name}</p>
          <p class="time">{item.time}</p>
          {#if item.place}
            <p class="place">{item.place}</p>
          {/if}
        </li>
      {/each}
    </ol>
    <img class="moon" src="/images/canva/decor/moon.png" alt="" />
  </div>
  {#if s.note}
    <p class="note">{s.note}</p>
  {/if}
</Section>

<style>
  .wrap {
    position: relative;
    max-width: 36rem;
    margin: 0 auto;
    padding-inline: clamp(3.5rem, 10vw, 5rem);
  }

  ol {
    list-style: none;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: clamp(1.5rem, 4vh, 2.25rem);
  }

  .name {
    font-family: var(--font-display);
    font-size: clamp(1.15rem, 2.4vw, 1.45rem);
    letter-spacing: 0.06em;
  }

  .time,
  .place {
    font-family: var(--font-sans);
    font-size: clamp(0.75rem, 1.4vw, 0.88rem);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    margin-top: 0.25rem;
  }

  .place {
    color: var(--color-text-muted);
  }

  .note {
    max-width: 38rem;
    margin: clamp(2.5rem, 5vh, 3.5rem) auto 0;
    text-align: center;
    font-family: var(--font-sans);
    font-size: clamp(0.7rem, 1.3vw, 0.82rem);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    line-height: 1.7;
    padding-inline: 1.25rem;
  }

  .koi,
  .moon {
    position: absolute;
    width: clamp(4.5rem, 14vw, 7.5rem);
    height: auto;
    pointer-events: none;
  }

  .koi {
    top: -1rem;
    left: 0;
  }

  .moon {
    right: 0;
    top: 30%;
    width: clamp(3.5rem, 12vw, 6rem);
  }
</style>
