<script>
  export let number = '';
  export let size = 42;
  export let floating = true;
  export let paused = false;
  const petals = [-62, -42, -22, 0, 22, 42, 62];
</script>

<span class="lotus" class:floating class:paused style={`--lotus-size: ${size}px; --lotus-phase: -${Number(number || 0) * 0.61}s`} aria-hidden="true">
  <svg class="water-ring" viewBox="0 0 100 100" fill="none">
    <ellipse cx="50" cy="72" rx="39" ry="10" stroke="#f1eee4" stroke-width="1" opacity="0.58" />
    <ellipse cx="50" cy="73" rx="29" ry="6" stroke="#c7dce8" stroke-width="0.7" opacity="0.8" />
    <ellipse cx="50" cy="72" rx="25" ry="5" fill="#34396d" opacity="0.2" />
  </svg>
  <svg class="flower" viewBox="0 0 100 100" fill="none">
    <path d="M18 66 Q34 52 51 65 Q70 48 87 64 Q72 81 48 76 Q29 79 18 66" fill="#799eaa" opacity="0.55" />
    {#each petals as angle}
      <g transform={`rotate(${angle} 50 66)`}>
        <path d="M50 69 C32 60 34 42 50 20 C66 42 68 60 50 69Z" fill={Math.abs(angle) > 40 ? '#d9e1e9' : '#f8f5e9'} stroke="#a4b6cd" stroke-width="0.85" />
        <path d="M50 24 Q43 48 50 65 Q57 47 50 24" fill="#eef0ed" opacity="0.72" />
        <path d="M50 31 Q45 49 50 64" stroke="#bacbdc" stroke-width="0.8" opacity="0.75" />
      </g>
    {/each}
    <path d="M49 73 Q23 76 13 54 Q33 51 49 67" fill="#eff0e6" stroke="#a7bed0" stroke-width="0.8" />
    <path d="M51 73 Q77 76 87 54 Q67 51 51 67" fill="#f8f5e9" stroke="#a7bed0" stroke-width="0.8" />
    <path d="M50 73 Q30 68 32 49 Q48 53 50 68 Q52 53 68 49 Q70 68 50 73" fill="#fff9e7" stroke="#d6d9d4" stroke-width="0.7" />
    <ellipse cx="50" cy="63" rx="13" ry="10" fill="#d3a64f" />
    <path d="M39 61 l-2 -7 m7 4 l-1 -9 m7 8 v-10 m6 11 l2 -9 m4 12 l3 -7" stroke="#dfb757" stroke-width="2" stroke-linecap="round" />
    <ellipse cx="50" cy="62" rx="9.5" ry="7.5" fill="#edce88" />
    {#if number}<text x="50" y="65.4" text-anchor="middle" fill="#625032" font-size="11" font-family="Georgia, serif" font-weight="600">{number}</text>{/if}
    <path d="M35 72 Q50 78 66 71 Q58 84 50 82 Q41 82 35 72" fill="#eef0e9" stroke="#b0c2d1" stroke-width="0.8" />
  </svg>
</span>

<style>
  .lotus { position: relative; display: inline-block; width: var(--lotus-size); height: var(--lotus-size); flex: 0 0 auto; vertical-align: middle; }
  svg { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
  .flower { filter: drop-shadow(0 1.2px 0.7px rgb(35 51 92 / 19%)); transform-origin: 50% 68%; }
  .floating .flower { animation: float 5.8s ease-in-out infinite; animation-delay: var(--lotus-phase); }
  .floating .water-ring { animation: ripple 5.8s ease-in-out infinite; animation-delay: var(--lotus-phase); transform-origin: 50% 72%; }
  .paused .flower, .paused .water-ring { animation-play-state: paused; }
  @keyframes float { 0%, 100% { transform: translateY(0) rotate(-1.2deg); } 50% { transform: translateY(-2px) rotate(1.5deg); } }
  @keyframes ripple { 0%, 100% { transform: scale(0.94, 0.97); opacity: 0.72; } 50% { transform: scale(1.08, 1.02); opacity: 1; } }
  @media (prefers-reduced-motion: reduce) { .floating .flower, .floating .water-ring { animation: none; } }
</style>
