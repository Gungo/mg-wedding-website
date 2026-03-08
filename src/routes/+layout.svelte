<script>
  import '../app.css';
</script>

<div class="vine-margin">
  <div class="page-content">
    <slot />
  </div>
</div>

<style>
  /*
   * Outer wrapper: reserves margin space on all sides for future
   * vine / decorative border. The vine art will sit in this margin
   * area (as a positioned background or SVG) without touching inner content.
   */
  .vine-margin {
    min-height: 100vh;
    padding: var(--margin-vine-top) var(--margin-vine) var(--margin-vine) var(--margin-vine);
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .page-content {
    width: 100%;
    max-width: var(--content-max-width);
  }
</style>
