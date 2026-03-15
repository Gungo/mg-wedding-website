<script>
  import LaceBorder from './LaceBorder.svelte';
</script>

<section class="rsvp-section">

  <div class="rsvp-frame">
    <LaceBorder pattern={1} size="50px" color="#f4eaea">

    <div class="envelope-wrap">
      <!-- svelte-ignore a11y_media_has_caption -->
      <video
        class="envelope-video"
        autoplay
        muted
      
        playsinline
      >
        <source src="/images/main/envelopejuly17.mov" type="video/quicktime" />
        <source src="/images/main/envelopejuly17.mp4" type="video/mp4" />
      </video>
      <a class="rsvp-button" href="/rsvp">RSVP</a>
    </div>
    </LaceBorder>
  </div>
</section>

<style>
  .rsvp-section {
    padding-top: 1rem;
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

  .envelope-video {
    max-width: 800px;
    width: 100%;
    height: auto;
    display: block;
    object-fit: contain;
  }

  .rsvp-button {
    position: absolute;
    bottom: 22%;
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
    .envelope-video {
      max-width: 280px;
    }
  }
</style>
