<script>
  let { onAdminTrigger } = $props();

  let tapCount = 0;
  let tapTimer;
  const TAP_THRESHOLD = 3;
  const TAP_WINDOW = 1500;

  function handleTap() {
    tapCount++;
    clearTimeout(tapTimer);
    if (tapCount >= TAP_THRESHOLD) {
      tapCount = 0;
      onAdminTrigger?.();
      return;
    }
    tapTimer = setTimeout(() => { tapCount = 0; }, TAP_WINDOW);
  }
</script>

<section class="hero">
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="hero-frame" onclick={handleTap}>
    <img
      src="/images/main/hero.png"
      alt="Mariluz Del Pilar & Germán Ignacio — ocean waves crashing on rocks"
      class="hero-image hero-desktop"
    />
    <!-- svelte-ignore a11y_media_has_caption -->
    <video
      class="hero-video hero-mobile"
      autoplay
      muted
      playsinline
      disablepictureinpicture
    >
      <source src="/images/main/hero-mobile.mp4" type="video/mp4" />
      <source src="/images/main/hero-mobile.mov" type="video/quicktime" />
    </video>
  </div>
</section>

<style>
  .hero {
    width: 100vw;
    position: relative;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
    margin-top: calc(-1 * var(--margin-vine-top));
  }

  .hero-frame {
    cursor: default;
  }

  .hero-image,
  .hero-video {
    width: 100%;
    height: auto;
    display: block;
    object-fit: cover;
    -webkit-user-select: none;
    user-select: none;
  }

  .hero-image {
    aspect-ratio: 16 / 9;
  }

  .hero-mobile {
    display: none;
  }

  @media (max-width: 768px) {
    .hero-desktop {
      display: none;
    }
    .hero-mobile {
      display: block;
    }
  }
</style>
