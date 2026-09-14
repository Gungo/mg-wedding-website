<script>
  import { useI18n } from '$lib/i18n/index.svelte.js';

  /** Featured landscape photo in place of the old envelope / save-the-date animation. */
  let { src = '/images/main/coming-soon.jpg', alt } = $props();
  const i18n = useI18n();
  const resolvedAlt = $derived(alt ?? i18n.wedding.ui.comingSoonAlt);
</script>

<section class="band">
  <div class="frame">
    <img {src} alt={resolvedAlt} />
  </div>
</section>

<style>
  .band {
    width: 100%;
    padding: clamp(2rem, 5vh, 3.5rem) 0 0;
  }

  .frame {
    width: 100%;
    overflow: hidden;
    background: #1a1f24;
  }

  img {
    width: 100%;
    height: auto;
    display: block;
    object-fit: cover;
    aspect-ratio: 3 / 2;
    max-height: min(82vh, 860px);
    object-position: center 42%;
  }

  @media (max-width: 768px) {
    img {
      aspect-ratio: 4 / 5;
      max-height: min(72vh, 680px);
      object-position: center 40%;
    }
  }
</style>
