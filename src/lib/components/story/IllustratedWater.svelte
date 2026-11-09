<script>
  import { onMount } from 'svelte';
  import { desktopArt, mobileArt } from './illustrated-river-art.js';
  let { kind = 'sweep', reverse = false, mobile = false, paused = false, id = 'river' } = $props();
  const art = $derived((mobile ? mobileArt : desktopArt)[kind]);
  let element;
  let visible = $state(false);
  onMount(() => {
    const observer = new IntersectionObserver(([entry]) => visible = entry.isIntersecting);
    observer.observe(element);
    return () => observer.disconnect();
  });
</script>

<svg bind:this={element} class:mobile class:still={paused || !visible} viewBox={mobile ? '0 0 400 500' : '0 0 1440 840'} preserveAspectRatio="none" aria-hidden="true">
  <defs>
    <linearGradient id={`water-${id}`} x1="0" y1="0" x2=".8" y2="1">
      <stop stop-color="#111b57" /><stop offset=".4" stop-color="#172b78" /><stop offset=".76" stop-color="#102f86" /><stop offset="1" stop-color="#151d50" />
    </linearGradient>
    <filter id={`grain-${id}`} x="-2%" y="-2%" width="104%" height="104%" color-interpolation-filters="sRGB">
      <feTurbulence type="fractalNoise" baseFrequency=".54" numOctaves="2" seed="17" result="grain" />
      <feColorMatrix in="grain" type="saturate" values="0" />
      <feComponentTransfer><feFuncA type="linear" slope=".14" /></feComponentTransfer>
      <feComposite in2="SourceGraphic" operator="in" /><feBlend in2="SourceGraphic" mode="soft-light" />
    </filter>
  </defs>
  <g transform={reverse ? `translate(${mobile ? 400 : 1440} 0) scale(-1 1)` : undefined}>
    <g filter={`url(#grain-${id})`}>
      {#each art.pools as path}<path d={path} fill={`url(#water-${id})`} />{/each}
    </g>
    {#each art.cream as path, index}<path d={path} fill={index % 2 ? '#b9c7c1' : '#eee3c7'} opacity={index % 2 ? '.62' : '.87'} />{/each}
    {#each art.fine as path, index}
      <path d={path} fill="none" stroke={index % 3 ? '#b9c5bf' : '#f0e3c2'} stroke-width={index % 3 ? '.8' : '1.4'} opacity={index % 3 ? '.4' : '.72'} stroke-linecap="round" />
      {#if index === 1}<path class="glimmer" d={path} fill="none" stroke="#fff7d6" stroke-width="1.5" stroke-linecap="round" stroke-dasharray="20 980" />{/if}
    {/each}
  </g>
</svg>

<style>
  svg { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }
  .glimmer { animation: highlight 42s linear infinite; opacity: .55; }
  .still .glimmer { animation-play-state: paused; }
  @keyframes highlight { to { stroke-dashoffset: -1000; } }
  @media (prefers-reduced-motion: reduce) { .glimmer { animation: none; opacity: .16; } }
</style>
