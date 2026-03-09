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
  <div class="lace-frame hero-frame">
    <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
    <img
      src="/images/hero.png"
      alt="Mariluz Del Pilar & Germán Ignacio — ocean waves crashing on rocks"
      class="hero-image"
      onclick={handleTap}
    />
  </div>
</section>

<style>
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
    cursor: default;
    -webkit-user-select: none;
    user-select: none;
  }
</style>
