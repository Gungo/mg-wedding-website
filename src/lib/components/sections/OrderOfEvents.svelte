<script>
  import Section from '$lib/components/Section.svelte';
  import { wedding } from '$lib/content/wedding.js';

  const s = wedding.schedule;
</script>

<div class="schedule">
  <Section id="order-of-events" title={s.title} titleStyle="display">
    <div class="wrap">
      <img class="koi" src="/images/canva/decor/koi.png" alt="" />
      <ol>
        {#each s.items as item}
          <li>
            {#if item.icon}
              <img
                class="icon"
                class:icon-throwdown={item.name === 'First throwdown'}
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
    {#if s.note}
      <p class="note">{s.note}</p>
    {/if}
  </Section>

  <!-- Decor lives on the schedule shell so it stays in the side gutters -->
  <img
    class="sparkles"
    src="/images/canva/decor/sparkles-tall.png?v=4"
    alt=""
  />
  <img class="moon" src="/images/canva/decor/moon.png" alt="" />
</div>

<style>
  .schedule {
    position: relative;
    background: #e5e3ff;
    width: 100%;
    overflow: visible;
  }

  .wrap {
    position: relative;
    max-width: 26rem;
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
  .moon,
  .sparkles {
    position: absolute;
    pointer-events: none;
    z-index: 1;
  }

  .koi {
    top: -0.5rem;
    left: clamp(-5.5rem, -12vw, -3.5rem);
    width: clamp(5rem, 15vw, 8rem);
    height: auto;
  }

  .sparkles {
    right: clamp(1.25rem, 10vw, 7rem);
    top: 18%;
    width: clamp(3.25rem, 10vw, 5rem);
    height: auto;
    max-height: 45%;
    object-fit: contain;
    object-position: top center;
    filter: drop-shadow(0 0 1px rgba(255, 255, 255, 0.95))
      drop-shadow(0 0 6px rgba(255, 255, 255, 0.85));
  }

  .moon {
    top: 50%;
    right: clamp(0.75rem, 8vw, 5.5rem);
    width: clamp(5.5rem, 15vw, 8.5rem);
    height: auto;
    transform: translateY(-50%);
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

    .koi {
      left: -3.25rem;
      width: 4.5rem;
    }

    .moon {
      width: 4.5rem;
      right: 0.35rem;
    }

    .sparkles {
      width: 2.5rem;
      right: 0.5rem;
      top: 16%;
    }
  }
</style>
