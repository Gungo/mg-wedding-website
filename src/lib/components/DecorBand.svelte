<script>
  let {
    src,
    alt = '',
    /** full | soft | wide-soft | pair */
    variant = 'full'
  } = $props();
</script>

<div
  class="band"
  class:soft={variant === 'soft'}
  class:wide-soft={variant === 'wide-soft'}
  class:pair={variant === 'pair'}
  aria-hidden={alt ? undefined : 'true'}
>
  {#if variant === 'pair'}
    <img {src} {alt} />
    <img {src} alt="" />
  {:else}
    <img {src} {alt} />
  {/if}
</div>

<style>
  .band {
    width: 100%;
    line-height: 0;
    pointer-events: none;
  }

  img {
    width: 100%;
    height: auto;
    display: block;
  }

  /* Centered, smaller accent */
  .band.soft {
    display: flex;
    justify-content: center;
    padding-block: clamp(0.5rem, 1.5vh, 1.25rem);
  }

  .band.soft img {
    width: min(52%, 640px);
    max-width: 100%;
    opacity: 0.95;
  }

  .band.wide-soft {
    padding-block: clamp(0.35rem, 1.2vh, 1rem);
  }

  .band.wide-soft img {
    width: 100%;
    opacity: 0.55;
    filter: saturate(0.75) contrast(0.92) brightness(1.08);
  }

  /* Two live copies (prefer a pre-mirrored asset when the source has
     light AA fringe on the join edge — CSS overlap cannot hide that). */
  .band.pair {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    width: 100%;
    padding-block: clamp(0.35rem, 1.2vh, 1rem);
    gap: 0;
    line-height: 0;
  }

  .band.pair img {
    width: 50%;
    flex: 0 0 50%;
    height: auto;
    margin: 0;
    padding: 0;
    display: block;
  }

  .band.pair img:last-child {
    transform: scaleX(-1);
  }

  @media (max-width: 768px) {
    .band.soft img {
      width: min(68%, 420px);
      opacity: 0.98;
    }

    .band.wide-soft img {
      opacity: 0.6;
    }
  }
</style>
