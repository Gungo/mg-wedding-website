<script></script>

<section class="rsvp-section">
  <div class="rsvp-frame">
    <div class="envelope-wrap">
      <img
        src="/images/main/open-brown-envelope-transparent.png"
        alt="Wedding envelope with lace heart"
        class="envelope-image"
      />
      <a class="rsvp-button" href="/rsvp">RSVP</a>
    </div>
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
  }

  .envelope-wrap {
    position: relative;
    display: flex;
    justify-content: center;
  }

  .envelope-image {
    max-width: 350px;
    width: 100%;
    height: auto;
    display: block;
    object-fit: contain;
  }

  .rsvp-button {
    position: absolute;
    bottom: 12%;
    left: 50%;
    transform: translateX(-50%);
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
  }
</style>
