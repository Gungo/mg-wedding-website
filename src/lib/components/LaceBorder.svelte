<script>
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

  let topSrc = $derived(`/images/lace/strip-${pattern}.png`);
  let bottomSrc = $derived(`/images/lace/strip-${pattern}-flip.png`);
  let rightSrc = $derived(`/images/lace/strip-${pattern}-v.png`);
  let leftSrc = $derived(`/images/lace/strip-${pattern}-v-flip.png`);

  let mL = $derived(left ? `calc(${size} - 2px)` : '0px');
  let mR = $derived(right ? `calc(${size} - 2px)` : '0px');
  let mT = $derived(top ? `calc(${size} - 2px)` : '0px');
  let mB = $derived(bottom ? `calc(${size} - 2px)` : '0px');

  let topClip = $derived(
    `polygon(0 0, 100% 0, calc(100% - ${mR}) 100%, ${mL} 100%)`
  );
  let bottomClip = $derived(
    `polygon(${mL} 0, calc(100% - ${mR}) 0, 100% 100%, 0 100%)`
  );
  let leftClip = $derived(
    `polygon(0 0, 100% ${mT}, 100% calc(100% - ${mB}), 0 100%)`
  );
  let rightClip = $derived(
    `polygon(0 ${mT}, 100% 0, 100% 100%, 0 calc(100% - ${mB}))`
  );
</script>

<div
  class="lace-wrap"
  style:--s={size}
  style:--lace-color={color}
  style:--ext-l={left ? size : '0px'}
  style:--ext-r={right ? size : '0px'}
  style:--ext-t={top ? size : '0px'}
  style:--ext-b={bottom ? size : '0px'}
>
  {#if top}
    <div class="edge-shadow edge-sh-h edge-sh-top">
      <div class="lace-fill edge-fill-h" style:--mask="url({topSrc})" style:--clip={topClip}></div>
    </div>
  {/if}
  {#if bottom}
    <div class="edge-shadow edge-sh-h edge-sh-bottom">
      <div class="lace-fill edge-fill-h" style:--mask="url({bottomSrc})" style:--clip={bottomClip}></div>
    </div>
  {/if}
  {#if left}
    <div class="edge-shadow edge-sh-v edge-sh-left">
      <div class="lace-fill edge-fill-v" style:--mask="url({leftSrc})" style:--clip={leftClip}></div>
    </div>
  {/if}
  {#if right}
    <div class="edge-shadow edge-sh-v edge-sh-right">
      <div class="lace-fill edge-fill-v" style:--mask="url({rightSrc})" style:--clip={rightClip}></div>
    </div>
  {/if}

  <div class="lace-content">
    {@render children()}
  </div>
</div>

<style>
  .lace-wrap {
    position: relative;
  }

  .lace-content {
    position: relative;
    z-index: 1;
  }

  /* Outer wrapper: positions the edge and applies shadow */
  .edge-shadow {
    position: absolute;
    z-index: 2;
    pointer-events: none;
    filter: drop-shadow(0 1px 3px rgba(0, 0, 0, 0.08))
            drop-shadow(0 0 1px rgba(0, 0, 0, 0.08));
  }

  /* Inner fill: mask + clip define the lace shape */
  .lace-fill {
    width: 100%;
    height: 100%;
    background-color: var(--lace-color);
    -webkit-mask-image: var(--mask);
    mask-image: var(--mask);
    -webkit-clip-path: var(--clip);
    clip-path: var(--clip);
  }

  /* ── Horizontal ── */
  .edge-sh-h {
    left: calc(-1 * var(--ext-l));
    right: calc(-1 * var(--ext-r));
    height: var(--s);
  }
  .edge-fill-h {
    -webkit-mask-size: auto 100%;
    mask-size: auto 100%;
    -webkit-mask-repeat: repeat-x;
    mask-repeat: repeat-x;
  }
  .edge-sh-top { bottom: 100%; }
  .edge-sh-bottom { top: 100%; }

  /* ── Vertical ── */
  .edge-sh-v {
    top: calc(-1 * var(--ext-t));
    bottom: calc(-1 * var(--ext-b));
    width: var(--s);
  }
  .edge-fill-v {
    -webkit-mask-size: 100% auto;
    mask-size: 100% auto;
    -webkit-mask-repeat: repeat-y;
    mask-repeat: repeat-y;
  }
  .edge-sh-left { right: 100%; }
  .edge-sh-right { left: 100%; }
</style>
