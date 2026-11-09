<script>
  import Lotus from './Lotus.svelte';
  let { variant = 0 } = $props();
</script>

<div class="botanical variant-{variant}" aria-hidden="true">
  <svg class="plants" viewBox="0 0 160 160" fill="none">
    {#if variant === 0}
      <path d="M81 151 Q66 76 44 33 M86 151 Q79 68 104 18 M88 151 Q107 104 135 72 M75 148 Q35 116 18 89" stroke="#7e8b74" stroke-width="1.3" />
      <path d="M69 132 Q33 103 34 65 Q67 89 69 132 M94 125 Q91 78 121 54 Q121 98 94 125 M45 130 Q15 133 10 113 Q35 110 45 130" fill="#79938a" stroke="#52776f" stroke-width=".7" />
      <path d="M43 34 37 14 M103 20 108 3 M134 73 142 56" stroke="#b19356" stroke-width="3.4" stroke-linecap="round" />
    {:else if variant === 1}
      <path d="M16 126 Q44 100 82 124 Q57 144 16 126 M93 129 Q122 103 151 125 Q128 144 93 129" fill="#789587" stroke="#577e77" stroke-width="1" />
      <path d="M23 128 72 125 M102 128 143 126" stroke="#d0d2af" stroke-width=".7" />
    {:else}
      <path d="M77 139 Q65 92 34 76 M88 140 Q110 104 131 94" stroke="#82917b" stroke-width="1.1" />
      <path d="M67 118 Q35 98 30 69 Q61 78 67 118 M101 126 Q107 95 137 87 Q130 115 101 126" fill="#859889" stroke="#5d7b72" stroke-width=".7" />
    {/if}
  </svg>
  <div class="flower"><Lotus size={variant === 1 ? 83 : 95} floating={false} /></div>
  {#if variant === 0}<div class="bud"><Lotus size={42} floating={false} /></div>{/if}
</div>

<style>
  .botanical { position: relative; width: 160px; height: 160px; pointer-events: none; }
  .plants { width: 100%; height: 100%; }
  .flower { position: absolute; top: 83px; left: 35px; transform: rotate(-7deg); }
  .bud { position: absolute; top: 114px; left: 109px; transform: rotate(19deg); }
  .variant-1 .flower { left: 37px; top: 82px; transform: rotate(9deg); }
  .variant-2 { transform: rotate(-12deg) scale(.87); }
</style>
