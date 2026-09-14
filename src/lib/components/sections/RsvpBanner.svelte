<script>
  import { useI18n } from '$lib/i18n/index.svelte.js';

  const i18n = useI18n();
  const r = $derived(i18n.wedding.rsvp);
  const e = $derived(i18n.wedding.event);
  const ui = $derived(i18n.wedding.ui);
</script>

<section class="cta" id="rsvp-cta">
  <div class="frame">
    <img src="/images/canva/photos/grocery-cart.jpg" alt={ui.groceryCartAlt} />
    <div class="overlay">
      <p class="date">{e.dateShort}</p>
      <a href={r.href}>{ui.rsvpCta}</a>
      <p class="by">{r.prompt} {ui.rsvpBy} {r.deadline}</p>
    </div>
  </div>
</section>

<style>
  .cta {
    width: 100%;
    padding: var(--section-space) clamp(1.25rem, 4vw, 2.5rem) 0;
  }

  .frame {
    position: relative;
    max-width: 420px;
    margin: 0 auto;
  }

  img {
    width: 100%;
    height: auto;
    display: block;
    aspect-ratio: 3 / 4;
    object-fit: cover;
  }

  .overlay {
    position: absolute;
    inset: auto 0 0;
    padding: 1.5rem 1rem 1.25rem;
    background: linear-gradient(to top, rgba(10, 20, 40, 0.72), transparent);
    text-align: center;
    color: var(--color-cream);
  }

  .date {
    font-family: var(--font-display);
    font-size: clamp(1.6rem, 4vw, 2.1rem);
    letter-spacing: 0.16em;
    color: var(--color-gold);
  }

  a {
    display: inline-block;
    margin: 0.75rem 0 0.65rem;
    color: var(--color-cream);
    text-decoration: none;
    border: 1.5px solid var(--color-cream);
    padding: 0.55em 1.8em;
    letter-spacing: 0.22em;
    font-family: var(--font-sans);
    font-size: 0.8rem;
    text-transform: uppercase;
  }

  .by {
    font-family: var(--font-sans);
    font-size: 0.68rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }
</style>
