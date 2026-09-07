<script>
  import { onMount, tick } from 'svelte';

  let { children } = $props();

  let track = $state(null);
  let index = $state(0);
  let count = $state(0);

  onMount(async () => {
    await tick();
    sync();
  });

  function cards() {
    return track ? [...track.children] : [];
  }

  function sync() {
    const list = cards();
    count = list.length;
    if (!track || list.length === 0) return;

    const left = track.scrollLeft;
    let best = 0;
    let bestDist = Infinity;
    list.forEach((el, i) => {
      const dist = Math.abs(el.offsetLeft - left);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });
    index = best;
  }

  function go(i) {
    const list = cards();
    const next = Math.max(0, Math.min(list.length - 1, i));
    list[next]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    index = next;
  }

  function onKey(e) {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      go(index + 1);
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      go(index - 1);
    }
  }
</script>

<div
  class="carousel"
  role="region"
  aria-roledescription="carousel"
  tabindex="0"
  onkeydown={onKey}
>
  <div
    class="track"
    bind:this={track}
    onscroll={sync}
  >
    {@render children()}
  </div>

  {#if count > 1}
    <button
      class="arrow prev"
      type="button"
      aria-label="Previous"
      disabled={index === 0}
      onclick={() => go(index - 1)}
    >
      ‹
    </button>
    <button
      class="arrow next"
      type="button"
      aria-label="Next"
      disabled={index === count - 1}
      onclick={() => go(index + 1)}
    >
      ›
    </button>

    <div class="dots" role="tablist" aria-label="Slides">
      {#each { length: count } as _, i}
        <button
          class="dot"
          class:active={i === index}
          type="button"
          role="tab"
          aria-label="Slide {i + 1}"
          aria-selected={i === index}
          onclick={() => go(i)}
        ></button>
      {/each}
    </div>
  {/if}
</div>

<style>
  .carousel {
    position: relative;
    width: 100%;
  }

  .track {
    display: flex;
    gap: clamp(1rem, 2.5vw, 1.75rem);
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-padding-inline: max(1.25rem, calc((100vw - var(--card-max-width)) / 2));
    padding-inline: max(1.25rem, calc((100vw - var(--card-max-width)) / 2));
    padding-block: 0.5rem 1.25rem;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .track::-webkit-scrollbar {
    display: none;
  }

  .carousel:focus-visible {
    outline: 2px solid var(--color-text);
    outline-offset: 4px;
  }

  .track > :global(*) {
    flex: 0 0 min(var(--card-max-width), 86vw);
    scroll-snap-align: center;
  }

  .arrow {
    position: absolute;
    top: 42%;
    transform: translateY(-50%);
    z-index: 2;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    border: 1px solid var(--color-text);
    background: var(--color-bg);
    color: var(--color-text);
    font-size: 1.6rem;
    line-height: 1;
    cursor: pointer;
    display: grid;
    place-items: center;
    transition: background-color var(--duration-normal) var(--ease-elegant),
                color var(--duration-normal) var(--ease-elegant),
                opacity var(--duration-normal) var(--ease-elegant);
  }

  .arrow:hover:not(:disabled) {
    background: var(--color-text);
    color: var(--color-bg);
  }

  .arrow:disabled {
    opacity: 0.28;
    cursor: default;
  }

  .prev {
    left: clamp(0.5rem, 2vw, 1.5rem);
  }

  .next {
    right: clamp(0.5rem, 2vw, 1.5rem);
  }

  .dots {
    display: flex;
    justify-content: center;
    gap: 0.55rem;
    margin-top: 0.25rem;
  }

  .dot {
    width: 7px;
    height: 7px;
    padding: 0;
    border-radius: 50%;
    border: 1px solid var(--color-text);
    background: var(--color-text);
    opacity: 0.28;
    cursor: pointer;
  }

  .dot.active {
    background: transparent;
    opacity: 1;
  }

  @media (max-width: 768px) {
    .arrow {
      display: none;
    }
  }
</style>
