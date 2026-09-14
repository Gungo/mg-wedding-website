<script>
  let {
    id = '',
    title = '',
    titleStyle = 'script',
    bleed = false,
    children
  } = $props();
</script>

<section class="section" class:bleed={bleed} {id}>
  <div class="inner" class:inner-bleed={bleed}>
    {#if title}
      <h2 class="title title-{titleStyle}">{title}</h2>
    {/if}
    {@render children()}
  </div>
</section>

<style>
  .section {
    padding: var(--section-space) 0;
  }

  .inner {
    width: 100%;
    max-width: var(--content-max-width);
    margin-inline: auto;
    padding-inline: clamp(1.25rem, 4vw, 2.5rem);
  }

  .inner-bleed {
    max-width: none;
    padding-inline: 0;
  }

  .title {
    text-align: center;
    color: var(--color-text);
    margin-bottom: clamp(1.5rem, 4vh, 2.5rem);
  }

  .title-script {
    font-family: var(--font-script);
    font-weight: var(--font-weight-normal);
    font-style: italic;
    font-size: clamp(2.25rem, 6vw, 3.75rem);
    letter-spacing: 0.01em;
    line-height: 1.15;
  }

  .title-display {
    font-family: var(--font-display);
    font-weight: 600;
    font-style: normal;
    font-size: clamp(1.7rem, 5vw, 2.85rem);
    letter-spacing: 0.14em;
    text-transform: uppercase;
    line-height: 1.2;
  }

  .title-label {
    font-family: var(--font-body);
    font-weight: var(--font-weight-medium);
    font-size: clamp(0.8rem, 1.4vw, 0.95rem);
    letter-spacing: 0.28em;
    text-transform: uppercase;
  }

  .bleed .title {
    padding-inline: clamp(1.25rem, 4vw, 2.5rem);
  }
</style>
