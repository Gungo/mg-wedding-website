<section class="rsvp-section">
  <div class="lace-frame rsvp-frame">
    <div class="envelope-wrapper">
      <img
        src="/images/envelope.png"
        alt="Wedding envelope with lace heart"
        class="envelope-image"
      />
    </div>
    <button class="rsvp-button" type="button">RSVP</button>
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

  .envelope-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .envelope-image {
    width: 50%;
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
</style>
