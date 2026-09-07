<script>
  import { wedding } from '$lib/content/wedding.js';

  let { hasSubmitted = false } = $props();

  const e = wedding.event;
  const c = wedding.couple;

  const locationLine = e.venue || e.city || 'To be announced';
  const attireLine = e.attire ? `Attire: ${e.attire}` : '';
  const addressLines = [e.address, e.city].filter(Boolean);
  const calStart = e.dateIso.replaceAll('-', '');
  const next = new Date(`${e.dateIso}T12:00:00`);
  next.setDate(next.getDate() + 1);
  const calEnd = next.toISOString().slice(0, 10).replaceAll('-', '');
  const calHref = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(c.short + ' Wedding')}&dates=${calStart}/${calEnd}`;
</script>

<section class="masthead" id="details">
  <h1 class="names">{c.short}</h1>

  <a class="rsvp-status" href={wedding.rsvp.href}>
    {hasSubmitted ? 'You responded' : 'Kindly RSVP'}
  </a>

  <div class="summary">
    <span class="heart" aria-hidden="true">♥︎</span>
    <p>{e.dateShort}</p>
    {#if e.city}
      <p>{e.city}</p>
    {/if}
    {#if attireLine}
      <p>{attireLine}</p>
    {/if}
  </div>

  <div class="facts">
    <div class="fact">
      <p class="label">Host</p>
      <p class="value">{c.hosts}</p>
    </div>
    <div class="fact">
      <p class="label">Date</p>
      {#if e.dateIso}
        <a class="value link" href={calHref}>
          {e.dateLong}
        </a>
      {:else}
        <p class="value">{e.dateLong}</p>
      {/if}
      {#if e.time}
        <p class="value muted">{e.time}</p>
      {/if}
    </div>
    <div class="fact">
      <p class="label">Location</p>
      {#if e.mapUrl}
        <a class="value link" href={e.mapUrl} target="_blank" rel="noopener noreferrer">{locationLine}</a>
      {:else}
        <p class="value">{locationLine}</p>
      {/if}
      {#each addressLines as line}
        <p class="value muted">{line}</p>
      {/each}
    </div>
  </div>
</section>

<style>
  .masthead {
    width: 100%;
    max-width: var(--content-max-width);
    margin-inline: auto;
    padding: clamp(3.5rem, 9vh, 6rem) clamp(1.25rem, 4vw, 2.5rem) 0;
    text-align: center;
  }

  .names {
    font-family: var(--font-script);
    font-weight: var(--font-weight-normal);
    font-style: italic;
    font-size: clamp(2.75rem, 8vw, 5rem);
    line-height: 1.1;
    letter-spacing: 0.01em;
    color: var(--color-text);
  }

  .rsvp-status {
    display: inline-block;
    margin-top: 1.35rem;
    font-family: var(--font-body);
    font-size: clamp(0.78rem, 1.3vw, 0.9rem);
    font-weight: var(--font-weight-medium);
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--color-text);
    text-decoration: underline;
    text-underline-offset: 0.35em;
  }

  .summary {
    margin-top: clamp(2rem, 5vh, 3rem);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.35rem;
    font-size: clamp(1rem, 2vw, 1.2rem);
    letter-spacing: 0.04em;
  }

  .heart {
    color: var(--color-gold);
    font-size: 0.95rem;
    margin-bottom: 0.2rem;
  }

  .facts {
    display: grid;
    grid-template-columns: 1fr;
    gap: clamp(1.75rem, 4vw, 2.5rem);
    margin-top: clamp(2.75rem, 7vh, 4rem);
    padding-top: clamp(2rem, 5vh, 3rem);
    border-top: 1px solid var(--color-border);
  }

  .label {
    font-size: clamp(0.7rem, 1.2vw, 0.8rem);
    letter-spacing: 0.28em;
    text-transform: uppercase;
    margin-bottom: 0.65rem;
    color: var(--color-text-muted);
  }

  .value {
    font-size: clamp(0.95rem, 1.6vw, 1.1rem);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    line-height: 1.55;
  }

  .muted {
    color: var(--color-text-muted);
  }

  .link {
    color: inherit;
    text-decoration: underline;
    text-underline-offset: 0.28em;
  }

  @media (min-width: 800px) {
    .facts {
      grid-template-columns: 1fr 1fr 1fr;
      text-align: center;
    }
  }
</style>
