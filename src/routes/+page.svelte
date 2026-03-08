<section class="hero">
  <div class="lace-frame hero-frame">
    <img
      src="/images/hero.png"
      alt="Mariluz Del Pilar & Germán Ignacio — ocean waves crashing on rocks"
      class="hero-image"
    />
  </div>
</section>

<section class="rsvp-section">
  <div class="lace-frame rsvp-frame">
    <p class="rsvp-label">RSVP</p>
  </div>
</section>

<section class="game-section">
  <!-- Brickbreaker game will go here after RSVP submit -->
</section>

<style>
  /* ===== Hero / Jumbotron ===== */
  .hero {
    width: 100%;
  }

  .hero-frame {
    overflow: hidden;
    border-radius: 2px;
  }

  .hero-image {
    width: 100%;
    height: auto;
    display: block;
    object-fit: cover;
    aspect-ratio: 16 / 9;
  }

  /* ===== RSVP Section ===== */
  .rsvp-section {
    margin-top: clamp(2rem, 5vh, 3.5rem);
  }

  .rsvp-frame {
    display: flex;
    justify-content: center;
  }

  .rsvp-label {
    font-family: var(--font-display);
    font-size: clamp(1.5rem, 4vw, 2.25rem);
    font-weight: var(--font-weight-medium);
    letter-spacing: 0.15em;
    color: var(--color-text);
    cursor: default;
  }

  /* ===== Game placeholder ===== */
  .game-section {
    margin-top: clamp(3rem, 8vh, 5rem);
    min-height: 200px;
  }
</style>
