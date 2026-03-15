<script>
  import LaceBorder from './LaceBorder.svelte';
</script>

<section class="rsvp-section">
  <div class="rsvp-frame">
    <div class="envelope-lace-wrap">
      <!-- <LaceBorder pattern={1} size="60px" color="#fff"> -->
        <img
          src="/images/envelope.png"
          alt="Wedding envelope with lace heart"
          class="her"
        />
      <!-- </LaceBorder> -->
    </div>
    <a class="rsvp-button" href="/rsvp">RSVP</a>
  </div>
</section>

<style>
  .rsvp-section {
    margin-top: clamp(3rem, 8vh, 5rem);
  }

  .rsvp-frame {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: clamp(1.25rem, 2.5vh, 2rem);
  }

  .envelope-lace-wrap {
    display: flex;
    justify-content: center;
    padding: 65px;
  }

  .envelope-image {
    max-width: 350px;
    width: 100%;
    height: auto;
    display: block;
    object-fit: contain;
  }

  .rsvp-button {
    font-family: var(--font-display);
    font-size: clamp(0.95rem, 2vw, 1.15rem);
    font-weight: var(--font-weight-medium);
    letter-spacing: 0.2em;
    text-transform: uppercase;
    text-decoration: none;
    color: var(--color-text);
    background: transparent;
    border: 1.5px solid var(--color-text);
    padding: 0.75em 2.5em;
    cursor: pointer;
    transition: background-color var(--duration-normal) var(--ease-elegant),
                color var(--duration-normal) var(--ease-elegant);
  }

  .rsvp-button:hover {
    background-color: var(--color-text);
    color: var(--color-bg);
  }

  @media (max-width: 768px) {
    .envelope-image {
      max-width: 280px;
    }
    .envelope-lace-wrap {
      padding: 50px;
    }
  }
</style>
