<script>
  import { desktop, mobile as mobileArt } from './panoramic-river-art.js';
  let { paused = false, mobile = false, reverse = false, index = 0 } = $props();
  const art = $derived(mobile ? mobileArt : desktop);
  const uid = $derived(`story-water-${mobile ? 'm' : 'd'}-${index}`);
</script>

<svg class:paused viewBox={art.box} preserveAspectRatio="none" aria-hidden="true">
  <defs>
    <linearGradient id={`${uid}-water`} x1="0" y1="0" x2=".8" y2="1"><stop stop-color="#121d65"/><stop offset=".38" stop-color="#173a98"/><stop offset=".68" stop-color="#17266f"/><stop offset="1" stop-color="#24285f"/></linearGradient>
    <filter id={`${uid}-pigment`} x="-2%" y="-2%" width="104%" height="104%" color-interpolation-filters="sRGB">
      <feTurbulence type="fractalNoise" baseFrequency=".34" numOctaves="3" seed={18 + index} result="grain" />
      <feColorMatrix in="grain" type="saturate" values="0" />
      <feComponentTransfer><feFuncA type="linear" slope=".28" /></feComponentTransfer>
      <feComposite in2="SourceGraphic" operator="in" /><feBlend in2="SourceGraphic" mode="soft-light" result="paint" />
      <feTurbulence type="fractalNoise" baseFrequency=".025 .045" numOctaves="3" seed={18 + index} result="edge" />
      <feDisplacementMap in="paint" in2="edge" scale="4" xChannelSelector="R" yChannelSelector="G" />
    </filter>
    <clipPath id={`${uid}-banks`}>{#each art.pools as pool}<path d={pool} />{/each}</clipPath>
  </defs>
  <g transform={reverse ? `translate(${mobile ? 400 : 1440} 0) scale(-1 1)` : undefined}>
    <g filter={`url(#${uid}-pigment)`}>
      {#each art.pools as pool}<path d={pool} fill={`url(#${uid}-water)`} stroke="#7d909d" stroke-width="1.3" />{/each}
    </g>
    <g clip-path={`url(#${uid}-banks)`}>
    {#each art.ribbons as ribbon, i}<path d={ribbon} fill={i % 3 === 0 ? '#eee0bc' : '#b7d0d3'} opacity={i % 3 === 0 ? .9 : .75} />{/each}
    {#each art.fine as current, i}
      <path d={current} fill="none" stroke={i % 3 === 0 ? '#f0e5cb' : '#bed5d9'} stroke-width={i % 4 === 0 ? 1.8 : 1} opacity={i % 3 === 0 ? .8 : .55} stroke-linecap="round" />
      {#if i === 3 || i === 16}<path class="glimmer" d={current} fill="none" stroke="#fff7dc" stroke-width="2.4" stroke-linecap="round" stroke-dasharray="30 950" style={`--delay:${i * -3}s`} />{/if}
    {/each}
    </g>
  </g>
</svg>

<style>
  svg { position: absolute; inset: 0; width: 100%; height: 100%; overflow: hidden; pointer-events: none; }
  .glimmer { opacity: .7; animation: glimmer 48s linear infinite; animation-delay: var(--delay); }
  .paused .glimmer { animation-play-state: paused; }
  @keyframes glimmer { to { stroke-dashoffset: -980; } }
  @media (prefers-reduced-motion: reduce) { .glimmer { animation: none; } }
</style>
