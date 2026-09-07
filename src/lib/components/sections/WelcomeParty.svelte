<script>
  import Section from '$lib/components/Section.svelte';
  import { wedding } from '$lib/content/wedding.js';

  const w = wedding.welcomeParty;
</script>

<Section id="welcome-party" title={w.title} titleStyle="script">
  <div class="party">
    <p class="intro">{w.intro}</p>
    <p class="when">{w.date}</p>
    {#if w.time}
      <p class="when">{w.time}</p>
    {/if}
    <span class="heart" aria-hidden="true">♥︎</span>
    <p class="venue">{w.venue}</p>
    {#if w.address}
      <p class="address">{w.address}</p>
    {/if}
    {#if w.attire}
      <p class="attire">Attire: {w.attire}</p>
    {/if}
    {#if w.attireNote}
      <p class="note">{w.attireNote}</p>
    {/if}

    {#if w.image}
      <figure class="card">
        <img src={w.image} alt={w.imageAlt} />
      </figure>
    {/if}
  </div>
</Section>

<style>
  .party {
    max-width: var(--content-narrow);
    margin-inline: auto;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .intro {
    font-size: clamp(1.05rem, 2.2vw, 1.3rem);
    font-style: italic;
    margin-bottom: 1.5rem;
  }

  .when,
  .venue,
  .address {
    font-size: clamp(1.05rem, 2vw, 1.25rem);
    line-height: 1.5;
  }

  .heart {
    color: var(--color-terracotta);
    margin: 1rem 0 0.85rem;
    font-size: 0.9rem;
  }

  .attire {
    margin-top: 1.75rem;
    font-size: clamp(0.85rem, 1.5vw, 1rem);
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .note {
    margin-top: 0.75rem;
    max-width: 36em;
    color: var(--color-text-muted);
    font-size: clamp(0.95rem, 1.6vw, 1.1rem);
  }

  .card {
    margin-top: clamp(2.25rem, 5vh, 3.25rem);
    width: min(100%, 420px);
    border: 1px solid var(--color-text);
    padding: 0.55rem;
    background: var(--color-sand-light);
  }

  .card img {
    width: 100%;
    height: auto;
    display: block;
  }
</style>
