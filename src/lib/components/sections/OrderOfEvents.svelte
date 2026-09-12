<script>
  import Section from '$lib/components/Section.svelte';
  import Editable from '$lib/components/edit/Editable.svelte';
  import { wedding } from '$lib/content/wedding.js';

  const s = wedding.schedule;
</script>

<div class="schedule">
  <Section id="order-of-events" title={s.title} titleStyle="display">
    <div class="wrap">
      <Editable id="schedule.koi" class="koi">
        <img src="/images/canva/decor/koi.png" alt="" />
      </Editable>

      <ol>
        {#each s.items as item, i}
          <li>
            {#if item.icon}
              <Editable
                id={`schedule.icon.${i}`}
                class={item.name === 'First throwdown' ? 'icon icon-throwdown' : 'icon'}
              >
                <img src={item.icon} alt="" />
              </Editable>
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
      <Editable id="schedule.note" type="text" class="note" text={s.note} />
    {/if}
  </Section>

  <Editable id="schedule.sparkles" class="sparkles">
    <img src="/images/canva/decor/sparkles-tall.png?v=4" alt="" />
  </Editable>

  <div class="moon-slot">
    <Editable id="schedule.moon" class="moon-edit">
      <img src="/images/canva/decor/moon.png" alt="" />
    </Editable>
  </div>
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

  :global(.schedule .icon) {
    position: relative;
    height: 3.5rem;
    width: auto;
    max-width: 6.5rem;
    margin-bottom: 0.65rem;
  }

  :global(.schedule .icon img) {
    height: 3.5rem;
    width: auto;
    max-width: 6.5rem;
    object-fit: contain;
    display: block;
    pointer-events: none;
  }

  :global(.schedule .icon-throwdown),
  :global(.schedule .icon-throwdown img) {
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

  :global(.schedule .note) {
    display: block;
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

  :global(.schedule .koi),
  :global(.schedule .sparkles),
  .moon-slot {
    position: absolute;
    z-index: 1;
  }

  :global(.schedule .koi) {
    top: -0.5rem;
    left: clamp(-5.5rem, -12vw, -3.5rem);
    width: clamp(5rem, 15vw, 8rem);
  }

  :global(.schedule .koi img),
  :global(.schedule .sparkles img),
  :global(.schedule .moon-edit img) {
    width: 100%;
    height: auto;
    display: block;
    pointer-events: none;
  }

  :global(.schedule .sparkles) {
    right: clamp(1.25rem, 10vw, 7rem);
    top: 18%;
    width: clamp(3.25rem, 10vw, 5rem);
    max-height: 45%;
    filter: drop-shadow(0 0 1px rgba(255, 255, 255, 0.95))
      drop-shadow(0 0 6px rgba(255, 255, 255, 0.85));
  }

  .moon-slot {
    top: 50%;
    right: clamp(0.75rem, 8vw, 5.5rem);
    width: clamp(5.5rem, 15vw, 8.5rem);
    translate: 0 -50%;
  }

  :global(.schedule .moon-edit) {
    width: 100%;
    display: block;
    position: relative;
  }

  @media (max-width: 720px) {
    .wrap {
      max-width: 20rem;
    }

    :global(.schedule .icon),
    :global(.schedule .icon img) {
      height: 3rem;
    }

    :global(.schedule .icon-throwdown),
    :global(.schedule .icon-throwdown img) {
      max-width: 1.85rem;
    }

    :global(.schedule .koi) {
      left: -3.25rem;
      width: 4.5rem;
    }

    .moon-slot {
      width: 4.5rem;
      right: 0.35rem;
    }

    :global(.schedule .sparkles) {
      width: 2.5rem;
      right: 0.5rem;
      top: 16%;
    }
  }
</style>
