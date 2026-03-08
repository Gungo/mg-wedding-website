<section class="game-section">
  <header class="game-header">
    <h2 class="game-title">While You Wait...</h2>
  </header>

  <div class="game-container">
    <div class="game-canvas-area">
      <!-- Brick rows placeholder -->
      <div class="bricks-placeholder">
        {#each Array(4) as _, row}
          <div class="brick-row">
            {#each Array(7) as _, col}
              <img
                src="/images/game/heart.svg"
                alt=""
                class="heart-brick"
              />
            {/each}
          </div>
        {/each}
      </div>

      <!-- Ball placeholder -->
      <img
        src="/images/game/ball.svg"
        alt=""
        class="ball-placeholder"
      />

      <!-- Paddle placeholder -->
      <div class="paddle-placeholder"></div>
    </div>

    <button class="play-button" type="button">Play</button>
  </div>
</section>

<style>
  .game-section {
    margin-top: clamp(3rem, 8vh, 5rem);
    width: 100%;
  }

  .game-header {
    text-align: center;
    margin-bottom: clamp(1.5rem, 3vh, 2rem);
  }

  .game-title {
    font-family: var(--font-display);
    font-weight: var(--font-weight-normal);
    font-size: clamp(1.5rem, 3vw, 2rem);
    font-style: italic;
    color: var(--color-text);
    letter-spacing: 0.02em;
  }

  .game-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: clamp(1rem, 2vh, 1.5rem);
  }

  .game-canvas-area {
    width: 100%;
    aspect-ratio: 4 / 3;
    border: 1px solid var(--color-border);
    border-radius: 2px;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 5% 3%;
  }

  /* ===== Heart bricks ===== */
  .bricks-placeholder {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .brick-row {
    display: flex;
    justify-content: center;
    gap: 6px;
  }

  .heart-brick {
    width: clamp(28px, 8vw, 48px);
    height: auto;
    image-rendering: pixelated;
  }

  /* ===== Soccer ball ===== */
  .ball-placeholder {
    width: clamp(24px, 5vw, 40px);
    height: auto;
    image-rendering: pixelated;
    position: absolute;
    bottom: 18%;
    left: 50%;
    transform: translateX(-50%);
  }

  /* ===== Paddle ===== */
  .paddle-placeholder {
    width: clamp(60px, 15vw, 100px);
    height: clamp(8px, 1.5vw, 12px);
    background: var(--color-text);
    border-radius: 1px;
    position: absolute;
    bottom: 8%;
    left: 50%;
    transform: translateX(-50%);
  }

  /* ===== Play button ===== */
  .play-button {
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

  .play-button:hover {
    background-color: var(--color-text);
    color: var(--color-bg);
  }
</style>
