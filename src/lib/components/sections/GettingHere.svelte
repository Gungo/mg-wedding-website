<script>
  import Section from '$lib/components/Section.svelte';
  import { useI18n } from '$lib/i18n/index.svelte.js';

  const i18n = useI18n();
  const t = $derived(i18n.wedding.travel);
</script>

<Section id="getting-here" title="" titleStyle="display">
  <div class="travel">
    <div class="title-row">
      <img
        class="flourish flourish-left"
        src="/images/canva/decor/flourish-right.png"
        alt=""
      />
      <h2 class="title">{t.title}</h2>
      <img
        class="flourish flourish-right"
        src="/images/canva/decor/flourish-left.png"
        alt=""
      />
    </div>

    <img class="boat" src="/images/canva/decor/boat.png" alt="" />

    <p class="intro">{t.intro}</p>
    <ul class="towns">
      {#each t.towns as town}
        <li>
          <strong>{town.name}</strong>
          <span>{town.note}</span>
        </li>
      {/each}
    </ul>
    <p class="recommend">{t.recommend}</p>

    {#each t.connections as conn}
      <h3>{conn.title}</h3>
      <ol>
        {#each conn.steps as step}
          <li>{step}</li>
        {/each}
      </ol>
      {#if conn.promo}
        <div class="promo">
          <p class="promo-headline">{conn.promo.headline}</p>
          <p>
            <span class="promo-label">{conn.promo.codeLabel}:</span>
            {conn.promo.code}
          </p>
          <p>
            <span class="promo-label">{conn.promo.routesLabel}:</span>
            {conn.promo.routes}
          </p>
        </div>
      {/if}
    {/each}
  </div>
</Section>

<style>
  .travel {
    max-width: min(50.5rem, 100%);
    margin: 0 auto;
    text-align: center;
  }

  .title-row {
    display: grid;
    grid-template-columns: clamp(5.5rem, 12vw, 8.5rem) auto clamp(5.5rem, 12vw, 8.5rem);
    align-items: start;
    justify-content: center;
    column-gap: 0.15rem;
    margin: 0 auto 0;
    max-width: 100%;
  }

  .title {
    margin: 0;
    padding-top: 0.2em;
    font-family: var(--font-display);
    font-weight: 600;
    font-style: normal;
    font-size: clamp(1.55rem, 4.6vw, 3rem);
    letter-spacing: 0.14em;
    text-transform: uppercase;
    line-height: 1.15;
    color: var(--color-text);
    white-space: nowrap;
  }

  .flourish {
    width: 100%;
    height: auto;
    display: block;
    pointer-events: none;
  }

  .flourish-left {
    justify-self: end;
    margin-top: 0.05em;
    transform: translateX(0.15rem);
  }

  .flourish-right {
    justify-self: start;
    margin-top: 0.05em;
    transform: translateX(-0.15rem);
  }

  .intro,
  .recommend {
    font-size: clamp(1.05rem, 2vw, 1.2rem);
    line-height: 1.6;
  }

  .towns {
    list-style: none;
    margin: 1.5rem 0;
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
  }

  .towns strong {
    display: block;
    font-family: var(--font-sans);
    font-weight: 500;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    font-size: 0.85rem;
  }

  .towns span {
    font-size: 1rem;
    color: var(--color-text-muted);
  }

  h3 {
    font-family: var(--font-display);
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    font-size: clamp(0.95rem, 1.8vw, 1.15rem);
    margin: 2.25rem 0 1rem;
  }

  ol {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.65rem;
    font-size: clamp(1rem, 1.8vw, 1.12rem);
    line-height: 1.55;
  }

  .promo {
    margin: 1.25rem auto 0;
    max-width: 28rem;
    font-weight: var(--font-weight-bold);
    font-size: clamp(1rem, 1.8vw, 1.12rem);
    line-height: 1.55;
  }

  .promo-headline {
    margin-bottom: 0.35rem;
  }

  .promo-label {
    letter-spacing: 0.04em;
  }

  .boat {
    display: block;
    width: clamp(4.5rem, 12vw, 6.5rem);
    height: auto;
    margin: -1.1rem auto 1rem;
    pointer-events: none;
  }

  @media (orientation: landscape) and (min-width: 800px) {
    .boat {
      margin-top: -1.21rem;
    }
  }

  @media (max-width: 520px) {
    .title-row {
      grid-template-columns: clamp(3.25rem, 18vw, 4.5rem) auto clamp(3.25rem, 18vw, 4.5rem);
      column-gap: 0.1rem;
    }

    .title {
      letter-spacing: 0.1em;
      font-size: clamp(1.2rem, 6.2vw, 1.55rem);
    }
  }
</style>
