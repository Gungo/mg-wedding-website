<script>
  import { onMount } from 'svelte';
  import RiverWater from './RiverWater.svelte';
  import Lotus from './Lotus.svelte';
  import { compactPoint, COMPACT_WIDTH, COMPACT_HEIGHT } from './river-path.js';

  let { moments = [], locale = 'en' } = $props();
  const spanish = $derived(locale === 'es');
  const chapters = $derived([
    ...moments,
    {
      label: spanish
        ? 'Ahora acompáñennos en nuestra próxima aventura, empezando en Oregon'
        : 'Now join us for our next adventure, starting in Oregon',
      src: '/images/canva/photos/cartoon-moon-wedding.jpg',
      alt: spanish ? 'Una boda bajo la luz de la luna' : 'A moonlit wedding illustration'
    }
  ]);
  let root;
  let active = $state(0);
  let elapsed = $state(0);
  let userPaused = $state(false);
  let reducedMotion = $state(false);
  let visible = $state(false);
  let documentVisible = $state(true);
  let swipeStart = null;
  const chapterDuration = 8000;
  const current = $derived(chapters[active] ?? chapters[0]);
  const running = $derived(!userPaused && !reducedMotion && visible && documentVisible);
  // Read for five seconds, then let the flower carry us into the next memory.
  const travel = $derived(Math.max(0, Math.min(1, (elapsed - 5000) / 3000)));
  const easedTravel = $derived(travel * travel * (3 - 2 * travel));
  const journeyPosition = $derived(
    Math.min(1, (active + (active < chapters.length - 1 ? easedTravel : 0)) / Math.max(1, chapters.length - 1))
  );
  const flower = $derived(compactPoint(journeyPosition));
  const photographs = $derived(
    active === 0 && current?.photos
      ? [...current.photos, { src: '/images/canva/photos/born-together.jpg', alt: spanish ? 'Mariluz y Germán con su bebé recién nacido' : 'Mariluz and Germán with their newborn baby' }]
      : current?.photos ?? (current?.src ? [{ src: current.src, alt: current.alt }] : [])
  );

  function choose(index) {
    active = Math.max(0, Math.min(chapters.length - 1, index));
    elapsed = 0;
    userPaused = true;
  }

  function togglePlayback() {
    if (reducedMotion) return;
    if (active === chapters.length - 1 && userPaused) {
      active = 0;
      elapsed = 0;
    }
    userPaused = !userPaused;
  }

  function startSwipe(event) {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    swipeStart = { x: event.clientX, y: event.clientY };
  }

  function finishSwipe(event) {
    if (!swipeStart) return;
    const dx = event.clientX - swipeStart.x;
    const dy = event.clientY - swipeStart.y;
    swipeStart = null;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.4) choose(active + (dx < 0 ? 1 : -1));
  }

  function onKeydown(event) {
    // Native media controls retain their own keyboard behavior.
    if (event.target instanceof HTMLVideoElement) return;
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      choose(active + (event.key === 'ArrowRight' ? 1 : -1));
    }
  }

  onMount(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    function syncMotion() {
      reducedMotion = preference.matches;
      if (reducedMotion) userPaused = true;
    }
    function syncVisibility() {
      documentVisible = document.visibilityState === 'visible';
      if (!documentVisible) root?.querySelector('video')?.pause();
    }
    syncMotion();
    syncVisibility();
    preference.addEventListener('change', syncMotion);
    document.addEventListener('visibilitychange', syncVisibility);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!visible) root?.querySelector('video')?.pause();
    }, { threshold: 0.12 });
    observer.observe(root);

    let frame;
    let last = 0;
    function tick(now) {
      const delta = last ? Math.min(100, now - last) : 0;
      last = now;
      if (running) {
        elapsed += delta;
        if (elapsed >= chapterDuration) {
          elapsed = 0;
          if (active < chapters.length - 1) active += 1;
          else userPaused = true;
        }
      }
      frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      preference.removeEventListener('change', syncMotion);
      document.removeEventListener('visibilitychange', syncVisibility);
    };
  });
</script>

<svelte:window onkeydown={(event) => { if (root?.contains(document.activeElement)) onKeydown(event); }} />

<div
  class="river-story"
  bind:this={root}
  role="region"
  aria-label={spanish ? 'Nuestro río de recuerdos' : 'Our river of memories'}
  onpointerdown={startSwipe}
  onpointerup={finishSwipe}
  onpointercancel={() => { swipeStart = null; }}
>
  <div class="river-composition">
    <div class="river-stage">
      <RiverWater mode="compact" paused={!running} />
      <span class="river-origin">{spanish ? 'El comienzo' : 'The beginning'}</span>
      <span class="river-destination">{spanish ? 'Y lo que viene…' : 'And what comes next…'}</span>

      {#each chapters as chapter, index}
        {@const point = compactPoint(index / Math.max(1, chapters.length - 1))}
        <button
          type="button"
          class="lotus-stop"
          class:visited={index < active}
          class:current={index === active}
          style={`left:${point.x / COMPACT_WIDTH * 100}%;top:${point.y / COMPACT_HEIGHT * 100}%;--lotus-delay:${index * -0.63}s`}
          aria-label={`${String(index + 1).padStart(2, '0')}. ${chapter.label}`}
          aria-current={index === active ? 'step' : undefined}
          onclick={() => choose(index)}
        >
          <span class="resting-flower" class:departed={index === active}>
            <Lotus number={String(index + 1).padStart(2, '0')} size={34} floating={!reducedMotion} paused={!running} />
          </span>
        </button>
      {/each}

      <div
        class="travelling-lotus"
        style={`left:${flower.x / COMPACT_WIDTH * 100}%;top:${flower.y / COMPACT_HEIGHT * 100}%`}
        aria-hidden="true"
      >
        <span class="flower-ripple" class:still={!running}></span>
        <Lotus number={String(active + 1).padStart(2, '0')} size={54} floating={!reducedMotion} paused={!running} />
      </div>
    </div>

    <div class="memory-panel">
      <div class="chapter-heading">
        <span>{spanish ? 'Un río de recuerdos' : 'A river of memories'}</span>
        <span class="chapter-count">{String(active + 1).padStart(2, '0')} <span>/ {String(chapters.length).padStart(2, '0')}</span></span>
      </div>

      <div class="memory-content" role="group" aria-label={spanish ? 'Recuerdo actual' : 'Current memory'} aria-live={userPaused ? 'polite' : 'off'} aria-atomic="true" onpointerdown={() => { userPaused = true; }}>
        {#key active}
          <article class="memory" class:words-only={!photographs.length && !current.video}>
            {#if current.video}
              <div class="memory-media video-media">
                <video
                  controls
                  playsinline
                  preload="metadata"
                  poster={current.poster}
                  aria-label={current.alt ?? current.label}
                  onplay={() => { userPaused = true; }}
                  onpointerdown={() => { userPaused = true; }}
                  onfocus={() => { userPaused = true; }}
                >
                  <source src={current.video} type="video/mp4" />
                </video>
              </div>
            {:else if photographs.length}
              <div class="memory-media" class:multiple={photographs.length > 1} style={`--photo-count:${photographs.length}`}>
                {#each photographs as photo}
                  <img src={photo.src} alt={photo.alt ?? ''} loading="lazy" />
                {/each}
              </div>
            {:else}
              <div class="chapter-flower" aria-hidden="true"><Lotus size={80} floating={false} /></div>
            {/if}
            <h3>{current.label}</h3>
          </article>
        {/key}
      </div>

      <div class="playback">
        <button class="step-button" type="button" disabled={active === 0} onclick={() => choose(active - 1)} aria-label={spanish ? 'Recuerdo anterior' : 'Previous memory'}>
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M15 5 8 12l7 7" /></svg>
        </button>
        <button class="play-button" type="button" onclick={togglePlayback} disabled={reducedMotion} aria-label={reducedMotion ? (spanish ? 'Animación desactivada por tu preferencia de movimiento reducido' : 'Autoplay disabled by your reduced motion preference') : undefined}>
          {#if userPaused || reducedMotion}
            <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="m7 4 9 6-9 6z" /></svg>
            <span>{active === chapters.length - 1 ? (spanish ? 'Volver a empezar' : 'Begin again') : (spanish ? 'Dejar fluir' : 'Let it flow')}</span>
          {:else}
            <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M6 4h3v12H6zm6 0h3v12h-3z" /></svg>
            <span>{spanish ? 'Detenerse un momento' : 'Stay a little'}</span>
          {/if}
        </button>
        <button class="step-button" type="button" disabled={active === chapters.length - 1} onclick={() => choose(active + 1)} aria-label={spanish ? 'Siguiente recuerdo' : 'Next memory'}>
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m9 5 7 7-7 7" /></svg>
        </button>
      </div>
      <div class="journey-progress" aria-hidden="true"><span style={`transform:scaleX(${journeyPosition})`}></span></div>
      <p class="river-hint">{spanish ? 'Toca una flor para volver a ese momento.' : 'Touch a flower to return to a moment.'}</p>
    </div>
  </div>
</div>

<style>
  .river-story { max-width: 61rem; margin: 0 auto; outline-offset: 8px; touch-action: pan-y; }
  .river-composition { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 0.95fr); align-items: center; gap: clamp(2rem, 6vw, 5rem); }
  .river-stage { position: relative; width: 100%; aspect-ratio: 400 / 560; isolation: isolate; }
  .river-origin, .river-destination { position: absolute; z-index: 2; color: #636586; font: italic 0.85rem var(--font-serif, Georgia, serif); pointer-events: none; }
  .river-origin { top: -0.4%; left: 9%; }
  .river-destination { bottom: -0.5%; right: 10%; }
  .lotus-stop { position: absolute; z-index: 3; display: grid; place-items: center; width: 44px; height: 44px; padding: 0; border: 0; border-radius: 50%; background: transparent; transform: translate(-50%, -50%); cursor: pointer; -webkit-tap-highlight-color: transparent; }
  .resting-flower { display: block; opacity: 0.8; transition: opacity 300ms, transform 300ms; }
  .lotus-stop:hover .resting-flower, .lotus-stop:focus-visible .resting-flower { opacity: 1; transform: scale(1.18); }
  .lotus-stop.visited .resting-flower { opacity: 0.58; }
  .lotus-stop .resting-flower.departed { opacity: 0.16; }
  .lotus-stop:focus-visible { outline: 2px solid #6775b0; outline-offset: 3px; }
  .travelling-lotus { position: absolute; z-index: 4; display: grid; place-items: center; width: 54px; height: 54px; transform: translate(-50%, -50%); pointer-events: none; filter: drop-shadow(0 4px 3px #242c6a44); }
  .flower-ripple { position: absolute; z-index: -1; left: -5px; right: -5px; top: 15px; height: 30px; border: 1px solid #f6ebce88; border-radius: 50%; animation: ripple 4s ease-out infinite; }
  .flower-ripple.still { animation-play-state: paused; }
  .memory-panel { min-width: 0; padding: 1.5rem 0; }
  .chapter-heading { display: flex; justify-content: space-between; align-items: baseline; gap: 1rem; margin-bottom: 1.1rem; color: #686982; font-family: var(--font-sans, sans-serif); font-size: 0.62rem; letter-spacing: 0.15em; text-transform: uppercase; }
  .chapter-count { flex-shrink: 0; color: #465990; font-size: 0.76rem; font-variant-numeric: tabular-nums; letter-spacing: 0.1em; }
  .chapter-count span { color: #9993a3; }
  .memory-content { min-height: 23rem; }
  .memory { animation: memory-in 650ms ease both; }
  .memory-media { display: grid; grid-template-columns: 1fr; gap: 0.4rem; align-items: center; height: 18rem; }
  .memory-media.multiple { grid-template-columns: repeat(var(--photo-count), minmax(0, 1fr)); }
  .memory-media img, .memory-media video { display: block; width: 100%; height: 100%; max-height: 18rem; min-width: 0; object-fit: contain; border-radius: 0.3rem; }
  .memory-media.multiple img:nth-child(odd) { transform: rotate(-2deg); }
  .memory-media.multiple img:nth-child(even) { transform: rotate(2deg) translateY(0.7rem); }
  .video-media { background: #454e7020; border-radius: 0.4rem; overflow: hidden; }
  .memory h3 { margin: 1.15rem auto 0; max-width: 28ch; text-align: center; color: #4e5482; font-family: var(--font-serif, Georgia, serif); font-size: clamp(1.15rem, 2vw, 1.65rem); font-weight: 400; line-height: 1.35; text-wrap: balance; }
  .words-only { display: flex; min-height: 23rem; flex-direction: column; justify-content: center; align-items: center; }
  .words-only h3 { max-width: 19ch; font-size: clamp(1.65rem, 3vw, 2.25rem); }
  .chapter-flower { opacity: 0.9; }
  .playback { display: flex; align-items: center; justify-content: center; gap: 1rem; margin: 1rem 0 0.9rem; }
  .playback button { min-height: 44px; border: 0; color: #535e8e; background: transparent; cursor: pointer; }
  .playback button:disabled { opacity: 0.35; cursor: default; }
  .playback button:focus-visible { outline: 2px solid #6775b0; outline-offset: 3px; }
  .step-button { display: grid; place-items: center; width: 44px; padding: 0; border-radius: 50%; }
  .step-button svg { width: 18px; height: 18px; stroke: currentColor; stroke-width: 1.3; }
  .play-button { display: flex; align-items: center; justify-content: center; min-width: 9.5rem; gap: 0.5rem; padding: 0.4rem 0.8rem; font-family: var(--font-sans, sans-serif); font-size: 0.73rem; letter-spacing: 0.035em; border-radius: 2rem; }
  .play-button svg { width: 15px; height: 15px; }
  .playback button:not(:disabled):hover { background: #6977ad0d; }
  .journey-progress { height: 1px; background: #8581a12b; overflow: hidden; }
  .journey-progress span { display: block; width: 100%; height: 100%; background: linear-gradient(90deg, #5875b8, #8d78b4, #b49762); transform-origin: left; }
  .river-hint { margin: 0.9rem 0 0; color: #817d8d; text-align: center; font-family: var(--font-sans, sans-serif); font-size: 0.65rem; line-height: 1.5; }
  @keyframes ripple { from { opacity: 0.7; transform: scale(0.7); } to { opacity: 0; transform: scale(1.55); } }
  @keyframes memory-in { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
  @media (max-width: 680px) {
    .river-composition { grid-template-columns: minmax(0, 1fr); gap: 1rem; }
    .river-stage { width: min(100%, 25rem); margin-inline: auto; }
    .memory-panel { width: min(100%, 27rem); margin: 0 auto; padding: 0.5rem 0 0; }
    .memory-content { min-height: 18rem; }
    .memory-media { height: 13rem; }
    .memory-media img, .memory-media video { max-height: 13rem; }
    .words-only { min-height: 18rem; }
    .chapter-heading { margin-bottom: 0.6rem; }
    .memory h3 { margin-top: 0.9rem; }
    .river-origin, .river-destination { font-size: 0.75rem; }
  }
  @media (prefers-reduced-motion: reduce) {
    .memory, .flower-ripple { animation: none; }
    .resting-flower { transition: none; }
  }
</style>
