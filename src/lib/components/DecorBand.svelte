<script>
  let { src, alt = '' } = $props();
</script>

<div class="band" aria-hidden={alt ? undefined : 'true'}>
  <img {src} {alt} />
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
</style>
