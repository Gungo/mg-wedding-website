<script>
  import { useI18n } from '$lib/i18n/index.svelte.js';

  let { onAdminTrigger } = $props();
  const i18n = useI18n();
  const ui = $derived(i18n.wedding.ui);

  let tapCount = 0;
  let tapTimer;
  const TAP_THRESHOLD = 3;
  const TAP_WINDOW = 1500;

  const nameOne = 'Mariluz Del Pilar Restrepo';
  const nameTwo = 'Germán Ignacio Domínguez';

  function handleTap() {
    tapCount++;
    clearTimeout(tapTimer);
    if (tapCount >= TAP_THRESHOLD) {
      tapCount = 0;
      onAdminTrigger?.();
      return;
    }
    tapTimer = setTimeout(() => {
      tapCount = 0;
    }, TAP_WINDOW);
  }
</script>

<section class="hero">
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="hero-frame" onclick={handleTap}>
    <img
      src="/images/main/hero-desktop.jpg"
      alt={ui.heroAlt}
      class="hero-image hero-desktop"
    />
    <img
      src="/images/main/hero-mobile.jpg"
      alt={ui.heroAlt}
      class="hero-image hero-mobile"
    />

    <div class="hero-copy">
      <!-- Desktop: two arcs — Mariluz curves up, Germán curves down -->
      <svg class="arc arc-desktop arc-up" viewBox="0 0 1100 240" aria-hidden="true">
        <defs>
          <path id="d-up" d="M 40,195 Q 550,22 1060,195" fill="none" />
        </defs>
        <text class="arc-text">
          <textPath href="#d-up" startOffset="50%" text-anchor="middle">{nameOne}</textPath>
        </text>
      </svg>
      <svg class="arc arc-desktop arc-down" viewBox="0 0 1100 240" aria-hidden="true">
        <defs>
          <path id="d-down" d="M 55,48 Q 550,215 1045,48" fill="none" />
        </defs>
        <text class="arc-text">
          <textPath href="#d-down" startOffset="50%" text-anchor="middle">{nameTwo}</textPath>
        </text>
      </svg>

      <!-- Mobile: Mariluz top (curve up), Germán mid (curve down) -->
      <svg class="arc arc-mobile arc-up" viewBox="0 0 720 280" aria-hidden="true">
        <defs>
          <path id="m-up" d="M 22,215 Q 360,28 698,215" fill="none" />
        </defs>
        <text class="arc-text arc-text-m">
          <textPath href="#m-up" startOffset="50%" text-anchor="middle">{nameOne}</textPath>
        </text>
      </svg>
      <svg class="arc arc-mobile arc-down" viewBox="0 0 720 280" aria-hidden="true">
        <defs>
          <path id="m-down" d="M 30,52 Q 360,240 690,52" fill="none" />
        </defs>
        <text class="arc-text arc-text-m">
          <textPath href="#m-down" startOffset="50%" text-anchor="middle">{nameTwo}</textPath>
        </text>
      </svg>

      <p class="date">08.07.2027</p>
      <span class="sr-only">{nameOne} {ui.and} {nameTwo}, {i18n.wedding.event.dateLong}</span>
    </div>
  </div>
</section>

<style>
  .hero {
    width: 100%;
  }

  .hero-frame {
    position: relative;
    cursor: default;
    overflow: hidden;
    background: #1a1f24;
  }

  .hero-image {
    width: 100%;
    height: auto;
    display: block;
    object-fit: cover;
    -webkit-user-select: none;
    user-select: none;
  }

  .hero-desktop {
    aspect-ratio: 3 / 2;
    object-position: center center;
  }

  .hero-mobile {
    display: none;
  }

  .hero-copy {
    position: absolute;
    inset: 0;
    pointer-events: none;
    color: #fff;
  }

  .arc {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    overflow: visible;
    filter: drop-shadow(0 1px 2px rgb(0 0 0 / 0.5))
      drop-shadow(0 8px 22px rgb(0 0 0 / 0.28));
  }

  .arc-desktop {
    width: min(96%, 1100px);
  }

  .arc-desktop.arc-up {
    top: 5%;
  }

  .arc-desktop.arc-down {
    top: 52%;
  }

  .arc-mobile {
    display: none;
  }

  .arc-text {
    fill: #fff;
    font-family: var(--font-display);
    font-weight: 600;
    font-size: 52px;
    letter-spacing: 0.05em;
  }

  .arc-text-m {
    font-size: 44px;
    letter-spacing: 0.03em;
  }

  .date {
    position: absolute;
    left: 50%;
    bottom: 7%;
    transform: translateX(-50%);
    font-family: var(--font-display);
    font-weight: 600;
    font-size: clamp(1.15rem, 2.8vw, 2.2rem);
    letter-spacing: 0.22em;
    text-shadow:
      0 1px 2px rgb(0 0 0 / 0.45),
      0 8px 24px rgb(0 0 0 / 0.25);
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  @media (max-width: 768px) {
    .hero-desktop {
      display: none;
    }

    .hero-mobile {
      display: block;
      aspect-ratio: 2 / 3;
      object-position: center 40%;
      min-height: min(88vh, 720px);
    }

    .arc-desktop {
      display: none;
    }

    .arc-mobile {
      display: block;
      width: 98%;
    }

    .arc-mobile.arc-up {
      top: 4%;
    }

    .arc-mobile.arc-down {
      top: 55%;
    }

    .arc-text-m {
      font-size: 42px;
    }

    .date {
      bottom: 8%;
      font-size: clamp(1.1rem, 5.2vw, 1.6rem);
      letter-spacing: 0.2em;
    }
  }
</style>
