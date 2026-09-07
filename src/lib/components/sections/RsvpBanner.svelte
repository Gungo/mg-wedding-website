<script>
  import { wedding } from '$lib/content/wedding.js';
  const r = wedding.rsvp;
  const e = wedding.event;
</script>

<section class="cta" id="rsvp-cta">
  <div class="frame">
    <img src="/images/canva/photos/grocery-cart.jpg" alt="Mariluz and Germán — let’s go get married" />
    <div class="overlay">
      <p class="date">{e.dateShort}</p>
      <a href={r.href}>RSVP</a>
      <p class="by">{r.prompt} RSVP by {r.deadline}</p>
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
