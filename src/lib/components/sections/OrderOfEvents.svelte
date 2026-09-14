<script>
  import Section from '$lib/components/Section.svelte';
  import { useI18n } from '$lib/i18n/index.svelte.js';

  const i18n = useI18n();
  const s = $derived(i18n.wedding.schedule);
  const ui = $derived(i18n.wedding.ui);
</script>

<div class="schedule">
  <Section id="order-of-events" title={s.title} titleStyle="display">
    <div class="body">
      <img
        class="side-photo"
        src="/images/canva/photos/shared-drink.jpg"
        alt={ui.shareDrinkAlt}
      />
      <div class="wrap">
        <ol>
          {#each s.items as item}
            <li>
              {#if item.icon}
                <img
                  class="icon"
                  class:icon-throwdown={item.id === 'throwdown'}
                  src={item.icon}
                  alt=""
                />
              {/if}
              <p class="name">{item.name}</p>
              <p class="time">{item.time}</p>
              {#if item.place}
                <p class="place">{item.place}</p>
              {/if}
            </li>
          {/each}
        </ol>
      </div>
    </div>
    {#if s.note}
      <div class="note-block">
        <img class="icon note-icon" src="/images/canva/decor/moon.png" alt="" />
        <p class="note">{s.note}</p>
      </div>
    {/if}
  </Section>
</div>

<style>
  .schedule {
    position: relative;
    background: #e5e3ff;
    width: 100%;
    overflow: visible;
  }

  .body {
    display: grid;
    grid-template-columns: 1fr;
    gap: clamp(1.75rem, 4vw, 2.75rem);
    align-items: start;
    max-width: 56rem;
    margin: 0 auto;
  }

  .side-photo {
    width: 100%;
    max-width: 22rem;
    margin-inline: auto;
    aspect-ratio: 2 / 3;
    object-fit: cover;
    display: block;
  }

  .wrap {
    position: relative;
    max-width: 31rem;
    margin: 0 auto;
    padding-inline: 1rem;
    overflow: visible;
  }

  ol {
    list-style: none;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: clamp(1.75rem, 4.5vh, 2.5rem);
  }

  li {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .icon {
    height: 3.5rem;
    width: auto;
    max-width: 6.5rem;
    margin-bottom: 0.65rem;
    object-fit: contain;
    pointer-events: none;
  }

  .icon-throwdown {
    height: 3.5rem;
    width: auto;
    max-width: 2.25rem;
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

  .note-block {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 46rem;
    margin: clamp(2.5rem, 5vh, 3.5rem) auto 0;
    padding-inline: 1.25rem;
  }

  .note-icon {
    margin-bottom: 0.65rem;
  }

  .note {
    text-align: center;
    font-family: var(--font-sans);
    font-size: clamp(0.82rem, 1.5vw, 0.95rem);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    line-height: 1.85;
  }

  @media (min-width: 800px) {
    .body {
      grid-template-columns: minmax(14rem, 20rem) minmax(0, 1fr);
      align-items: center;
      max-width: 64rem;
      gap: clamp(2rem, 5vw, 3.5rem);
    }

    .side-photo {
      max-width: none;
      margin-inline: 0;
    }

    .wrap {
      margin: 0 auto;
    }

    /* Line up with the schedule column (same grid as .body) */
    .note-block {
      max-width: 64rem;
      margin-inline: auto;
      padding-inline: 0;
      display: grid;
      grid-template-columns: minmax(14rem, 20rem) minmax(0, 1fr);
      column-gap: clamp(2rem, 5vw, 3.5rem);
      justify-items: center;
    }

    .note-icon,
    .note {
      grid-column: 2;
      width: 100%;
      max-width: 46rem;
      padding-inline: 1.25rem;
      box-sizing: border-box;
    }
  }

  @media (max-width: 720px) {
    .wrap {
      max-width: 20rem;
    }

    .icon {
      height: 3rem;
    }

    .icon-throwdown {
      height: 3rem;
      max-width: 1.85rem;
    }
  }
</style>
