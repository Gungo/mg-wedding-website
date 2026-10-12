<script>
  import { riverOutline, longCurrent, flourishes } from './continuous-desktop-river.js';
  let { paused = false } = $props();
</script>

<svg class:paused viewBox="0 0 14400 840" preserveAspectRatio="none" aria-hidden="true">
  <defs>
    <linearGradient id="panorama-water" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="840"><stop stop-color="#111b57"/><stop offset=".4" stop-color="#172b78"/><stop offset=".76" stop-color="#102f86"/><stop offset="1" stop-color="#151d50"/></linearGradient>
  </defs>
  <path class="river-bank" d={riverOutline} fill="url(#panorama-water)" />
  <path d={longCurrent} fill="none" stroke="#ede2c8" stroke-width="2.4" opacity=".75" />
  <path class="glimmer" d={longCurrent} fill="none" stroke="#fff8de" stroke-width="2" stroke-linecap="round" stroke-dasharray="24 1800" opacity=".5" />
  {#each flourishes as flourish}
    <g transform={flourish.transform}>
      <path d={flourish.ribbon} fill="#e9dec3" opacity=".82" />
      <path d={flourish.fan} fill="url(#panorama-water)" />
      <path d={flourish.eddy} fill="url(#panorama-water)" />
    </g>
  {/each}
</svg>

<style>
  svg { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 0; }
  .glimmer { animation: glimmer 72s linear infinite; }
  .paused .glimmer { animation-play-state: paused; }
  @keyframes glimmer { to { stroke-dashoffset: -1824; } }
  @media (prefers-reduced-motion: reduce) { .glimmer { animation: none; } }
</style>
