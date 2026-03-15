<script>
  import LaceBorder from './LaceBorder.svelte';

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
    <LaceBorder pattern={1} size="60px" color="#fff">
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
    </LaceBorder>
  </div>
</section>

<style>
  .hero {
    width: 100%;
  }

  .hero-frame {
    border-radius: 2px;
    padding: 55px;
  }

  .hero-image {
    width: 100%;
    height: auto;
    display: block;
    object-fit: cover;
    aspect-ratio: 16 / 9;
    cursor: default;
    -webkit-user-select: none;
    user-select: none;
  }

  .hero-video {
    width: 100%;
    height: auto;
    display: block;
    object-fit: cover;
    cursor: default;
    -webkit-user-select: none;
    user-select: none;
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
    .hero-frame {
      padding: 40px;
    }
  }
</style>
