<script>
  import Section from '$lib/components/Section.svelte';
  import { wedding } from '$lib/content/wedding.js';

  const t = wedding.travel;
</script>

<Section id="getting-here" title={t.title} titleStyle="display">
  <div class="travel">
    <div class="header-art">
      <img src="/images/canva/decor/flourish-left.png" alt="" />
      <img src="/images/canva/decor/flourish-right.png" alt="" />
    </div>

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
    {/each}
  </div>
</Section>

<style>
  .travel {
    max-width: 40rem;
    margin: 0 auto;
    text-align: center;
  }

  .header-art {
    display: flex;
    justify-content: space-between;
    max-width: 22rem;
    margin: -0.5rem auto 1.5rem;
  }

  .header-art img {
    width: 5.5rem;
    height: auto;
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
</style>
