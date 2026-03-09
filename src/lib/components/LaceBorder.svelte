<script>
  /**
   * Wraps content with decorative lace border strips.
   *
   * @param {string} color - Any CSS color for the lace. Default white.
   * @param {1|2} pattern - Lace design (1 = scrollwork, 2 = floral).
   * @param {string} size - Lace edge thickness (CSS length).
   * @param {boolean} top/bottom/left/right - Toggle individual edges.
   */
  let {
    color = '#fff',
    pattern = 1,
    size = '60px',
    top = true,
    bottom = true,
    left = true,
    right = true,
    children
  } = $props();

  let hSrc = $derived(`/images/lace/strip-${pattern}.png`);
  let vSrc = $derived(`/images/lace/strip-${pattern}-v.png`);
</script>

<div
  class="lace-wrap"
  style:--lace-size={size}
  style:--lace-color={color}
  style:--lace-h="url({hSrc})"
  style:--lace-v="url({vSrc})"
>
  {#if top}<div class="lace-edge edge-top"></div>{/if}
  {#if bottom}<div class="lace-edge edge-bottom"></div>{/if}
  {#if left}<div class="lace-edge edge-left"></div>{/if}
  {#if right}<div class="lace-edge edge-right"></div>{/if}

  <div class="lace-content">
    {@render children()}
  </div>
</div>

<style>
  .lace-wrap {
    position: relative;
    display: inline-block;
  }

  .lace-content {
    position: relative;
    z-index: 1;
  }

  .lace-edge {
    position: absolute;
    z-index: 2;
    pointer-events: none;
    background-color: var(--lace-color);
    -webkit-mask-repeat: repeat;
    mask-repeat: repeat;
    -webkit-mask-size: auto 100%;
    mask-size: auto 100%;
  }

  /* ── Horizontal edges ── */
  .edge-top {
    left: 0;
    right: 0;
    height: var(--lace-size);
    bottom: 100%;
    -webkit-mask-image: var(--lace-h);
    mask-image: var(--lace-h);
    -webkit-mask-position: bottom center;
    mask-position: bottom center;
  }

  .edge-bottom {
    left: 0;
    right: 0;
    height: var(--lace-size);
    top: 100%;
    -webkit-mask-image: var(--lace-h);
    mask-image: var(--lace-h);
    -webkit-mask-position: top center;
    mask-position: top center;
    transform: scaleY(-1);
  }

  /* ── Vertical edges (use rotated strip) ── */
  .edge-left {
    top: calc(-1 * var(--lace-size));
    bottom: calc(-1 * var(--lace-size));
    width: var(--lace-size);
    right: 100%;
    -webkit-mask-image: var(--lace-v);
    mask-image: var(--lace-v);
    -webkit-mask-size: 100% auto;
    mask-size: 100% auto;
    -webkit-mask-position: right center;
    mask-position: right center;
  }

  .edge-right {
    top: calc(-1 * var(--lace-size));
    bottom: calc(-1 * var(--lace-size));
    width: var(--lace-size);
    left: 100%;
    -webkit-mask-image: var(--lace-v);
    mask-image: var(--lace-v);
    -webkit-mask-size: 100% auto;
    mask-size: 100% auto;
    -webkit-mask-position: left center;
    mask-position: left center;
    transform: scaleX(-1);
  }
</style>
