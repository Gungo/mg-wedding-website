<script>
  import { onMount, tick } from 'svelte';
  import PanoramicRiver from './PanoramicRiver.svelte';
  import RiverBotanical from './RiverBotanical.svelte';

  let { moments = [], spanish = false } = $props();
  let paused = $state(false);
  let videoPlaying = $state(false);
  let active = $state(0);
  let mobile = $state(false);
  let scroller;
  const pageSize = $derived(mobile ? 1 : 2);
  const scenes = $derived(Array.from({ length: Math.ceil(moments.length / pageSize) }, (_, i) => moments.slice(i * pageSize, i * pageSize + pageSize)));
  const motionPaused = $derived(paused || videoPlaying);

  function selectScene(index, instant = false) {
    const next = Math.max(0, Math.min(index, scenes.length - 1));
    if (!scroller) return;
    scroller.scrollTo({ left: next * scroller.clientWidth, behavior: instant || window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  }
  function updateScene() {
    if (scroller?.clientWidth) active = Math.max(0, Math.min(scenes.length - 1, Math.round(scroller.scrollLeft / scroller.clientWidth)));
  }
  function handleKey(event) {
    if (event.target !== scroller) return;
    const destinations = { ArrowLeft: active - 1, ArrowRight: active + 1, Home: 0, End: scenes.length - 1 };
    if (!(event.key in destinations)) return;
    event.preventDefault();
    selectScene(destinations[event.key]);
  }
  onMount(() => {
    const query = window.matchMedia('(max-width: 800px)');
    let currentWidth = 0;
    async function updateLayout() {
      const memory = active * (mobile ? 1 : 2);
      mobile = query.matches;
      await tick();
      active = Math.floor(memory / (mobile ? 1 : 2));
      selectScene(active, true);
    }
    updateLayout();
    query.addEventListener('change', updateLayout);
    const resize = new ResizeObserver(([entry]) => {
      if (currentWidth && Math.abs(currentWidth - entry.contentRect.width) > 1) selectScene(active, true);
      currentWidth = entry.contentRect.width;
    });
    resize.observe(scroller);
    return () => { query.removeEventListener('change', updateLayout); resize.disconnect(); };
  });
</script>

<div class="illustrated-story" class:paused={motionPaused}>
  <div class="toolbar">
    <div><p class="eyebrow">{spanish ? 'Un río de recuerdos' : 'A river of memories'}</p><p class="invitation">{spanish ? 'Los pequeños momentos que nos trajeron hasta aquí.' : 'The little moments that brought us here.'}</p></div>
    <div class="controls">
      <button class="motion" type="button" aria-pressed={motionPaused} disabled={videoPlaying} aria-label={videoPlaying ? (spanish ? 'Animación pausada durante el video' : 'Animation paused while the video plays') : undefined} onclick={() => paused = !paused}><span aria-hidden="true">{motionPaused ? '▷' : 'Ⅱ'}</span> {motionPaused ? (spanish ? 'Reanudar' : 'Resume') : (spanish ? 'Pausar' : 'Pause')}</button>
      <div class="pagination"><button type="button" aria-label={spanish ? 'Recuerdos anteriores' : 'Earlier memories'} disabled={active === 0} onclick={() => selectScene(active - 1)}>←</button><span aria-live="polite" aria-atomic="true">{String(active + 1).padStart(2, '0')} <i>/ {String(scenes.length).padStart(2, '0')}</i></span><button type="button" aria-label={spanish ? 'Recuerdos siguientes' : 'Later memories'} disabled={active === scenes.length - 1} onclick={() => selectScene(active + 1)}>→</button></div>
    </div>
  </div>

  <!-- svelte-ignore a11y_no_noninteractive_tabindex (the carousel is a keyboard-scrollable region) -->
  <div class="scenes" bind:this={scroller} onscroll={updateScene} onkeydown={handleKey} tabindex="0" role="region" aria-roledescription="carousel" aria-label={spanish ? 'Nuestra historia; desliza para explorar los recuerdos' : 'Our story; swipe to explore the memories'}>
    <div class="scene-track" style={`--scene-count:${scenes.length}`}>
      {#each scenes as pair, sceneIndex}
        {@const reverse = sceneIndex % 2 === 1}
        <section class="scene" class:reversed={reverse} aria-label={spanish ? `Recuerdos ${sceneIndex * pageSize + 1}${pair.length === 2 ? ` y ${sceneIndex * pageSize + 2}` : ''}` : `Memories ${sceneIndex * pageSize + 1}${pair.length === 2 ? ` and ${sceneIndex * pageSize + 2}` : ''}`}>
          <div class="water"><PanoramicRiver paused={motionPaused} {mobile} {reverse} index={sceneIndex} /></div>
          <p class="scene-note">{sceneIndex === 0 ? (spanish ? 'El comienzo' : 'The beginning') : sceneIndex === scenes.length - 1 ? (spanish ? 'Y lo que viene…' : 'And what comes next…') : (spanish ? 'Nuestra historia continúa' : 'Our story continues')}</p>
          <ol start={sceneIndex * pageSize + 1}>
            {#each pair as moment, localIndex}
              {@const index = sceneIndex * pageSize + localIndex}
              {@const photos = moment.photos ?? (moment.src ? [{ src: moment.src, alt: moment.alt }] : [])}
              <li class="memory-cell" class:second={localIndex === 1} class:text-only={!photos.length && !moment.video} class:final-memory={index === moments.length - 1}>
                <div class="paper-pocket">
                  {#if moment.video}
                    <video controls autoplay muted loop playsinline preload="metadata" poster={moment.poster} aria-label={moment.alt ?? moment.label} onplay={() => videoPlaying = true} onpause={() => videoPlaying = false} onended={() => videoPlaying = false}><source src={moment.video} type="video/mp4" /></video>
                  {:else if photos.length}
                    <div class="photographs" class:multiple={photos.length > 1} class:three={photos.length > 2} style={`--count:${photos.length}`}>
                      {#each photos as photo, photoIndex}
                        <figure style={`--turn:${photos.length > 1 ? [-5, 1, 5][photoIndex % 3] : [2, -2][index % 2]}deg`}><img src={photo.src} alt={photo.alt ?? ''} loading="lazy" /></figure>
                      {/each}
                    </div>
                  {/if}
                  <div class="caption"><span class="memory-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><h3>{moment.label}</h3></div>
                  {#if !photos.length && !moment.video}<span class="little-rule" aria-hidden="true"></span>{/if}
                </div>
              </li>
            {/each}
          </ol>
          <div class="river-plant first"><RiverBotanical variant={sceneIndex % 3} /></div>
          <div class="river-plant last"><RiverBotanical variant={(sceneIndex + 1) % 3} /></div>
          <div class="river-plant pool"><RiverBotanical variant={1} /></div>
        </section>
      {/each}
    </div>
  </div>
  <div class="scene-navigation" aria-label={spanish ? 'Elegir recuerdos' : 'Choose memories'}>
    {#each scenes as _, index}<button type="button" class:active={active === index} aria-label={spanish ? `Ir al recuerdo ${index * pageSize + 1}` : `Go to memory ${index * pageSize + 1}`} aria-current={active === index ? 'step' : undefined} onclick={() => selectScene(index)}><span></span></button>{/each}
  </div>
  <p class="swipe-hint">{spanish ? 'Desliza para seguir la corriente' : 'Swipe to follow the current'} <span aria-hidden="true">↔</span></p>
</div>

<style>
  .illustrated-story { --paper: #f8f5f1; --ink: #243766; position: relative; color: var(--ink); background: var(--paper); }
  .toolbar { max-width: 1400px; margin: 0 auto; padding: 0 5%; display: flex; align-items: center; justify-content: space-between; gap: 24px; }
  .eyebrow { font-size: 12px; letter-spacing: .15em; text-transform: uppercase; }
  .invitation { margin-top: 5px; font-size: 18px; font-style: italic; color: #616077; }
  .controls, .pagination { display: flex; align-items: center; gap: 10px; }
  button { background: none; border: 0; font: inherit; color: var(--ink); min-width: 44px; min-height: 44px; cursor: pointer; }
  button:disabled { opacity: .35; cursor: default; }
  button:focus-visible, .scenes:focus-visible { outline: 2px solid #172b78; outline-offset: -3px; }
  .motion { font-size: 16px; white-space: nowrap; padding: 0 10px; }
  .motion span { margin-right: 5px; }
  .pagination { font-size: 16px; white-space: nowrap; }
  .pagination button { font-size: 27px; }
  .pagination i { font-style: normal; color: #827e8d; }
  .scenes { position: relative; width: 100%; overflow-x: auto; overflow-y: hidden; scroll-snap-type: x mandatory; overscroll-behavior-inline: contain; scrollbar-width: none; }
  .scenes::-webkit-scrollbar { display: none; }
  .scene-track { position: relative; display: grid; grid-template-columns: repeat(var(--scene-count), minmax(0, 1fr)); width: calc(var(--scene-count) * 100%); }
  .scene { position: relative; min-width: 0; height: clamp(690px, 54.16vw, 780px); scroll-snap-align: start; scroll-snap-stop: always; }
  .water { position: absolute; inset: 0; pointer-events: none; }
  .scene ol { list-style: none; margin: 0; padding: 0; }
  .scene-note { position: absolute; top: 22%; left: 4%; font-style: italic; color: #6b6374; font-size: 15px; transform: rotate(-7deg); }
  .memory-cell { position: absolute; top: 24%; left: 19%; width: 32%; z-index: 2; }
  .memory-cell.second { top: 25%; left: 47%; width: 32%; }
  .paper-pocket { position: relative; padding: 14px 12px 20px; text-align: center; }
  .caption { display: flex; justify-content: center; align-items: baseline; gap: 11px; margin-top: 21px; }
  .memory-number { display: block; flex-shrink: 0; font-size: 10px; letter-spacing: .12em; color: #86714d; }
  .photographs { display: flex; justify-content: center; align-items: center; gap: 11px; height: clamp(177px, 14.3vw, 206px); }
  figure { margin: 0; padding: 6px 6px 11px; background: #fffdf7; box-shadow: 0 3px 12px #27274626; transform: rotate(var(--turn)); max-width: 100%; }
  figure img { display: block; width: auto; max-width: 100%; height: clamp(169px, 13.6vw, 196px); object-fit: contain; }
  .multiple figure { min-width: 0; flex: 0 1 calc(100% / var(--count)); }
  .multiple img { width: 100%; object-fit: contain; }
  .three { gap: 8px; }
  video { display: block; height: clamp(177px, 14.3vw, 206px); width: 100%; max-width: 370px; margin: auto; background: #141d47; border: 6px solid #fffdf7; box-shadow: 0 3px 12px #27274626; object-fit: contain; }
  h3 { font-size: clamp(19px, 1.45vw, 22px); font-weight: 400; line-height: 1.35; margin: 0; max-width: 36ch; text-wrap: pretty; }
  .text-only .caption { display: flex; flex-direction: column; align-items: center; gap: 14px; margin-top: 0; }
  .text-only .paper-pocket { padding: 65px 25px 40px; }
  .text-only h3 { font-size: clamp(29px, 2.6vw, 39px); font-style: italic; max-width: 18ch; }
  .little-rule { display: block; width: 28px; height: 1px; background: #ae9570; margin: 22px auto 0; }
  .reversed .memory-cell { left: 49%; }
  .reversed .memory-cell.second { left: 21%; }
  .reversed .scene-note { left: auto; right: 4%; transform: rotate(7deg); }
  .river-plant { position: absolute; z-index: 1; pointer-events: none; transform: translate(-50%, -66%); }
  .river-plant.first { left: 22%; top: 13%; transform: translate(-50%, -66%) scale(.84); }
  .river-plant.last { left: 23%; top: 81%; transform: translate(-50%, -66%) rotate(8deg) scale(1.1); }
  .river-plant.pool { left: 85%; top: 30%; transform: translate(-50%, -66%) scale(.9); }
  .reversed .river-plant.first { left: 78%; }
  .reversed .river-plant.last { left: 77%; }
  .reversed .river-plant.pool { left: 15%; }
  .scene-navigation { display: flex; justify-content: center; gap: 2px; margin: 0 auto; padding: 0 10px; max-width: 100%; }
  .scene-navigation button { min-width: 32px; padding: 0 5px; }
  .scene-navigation span { display: block; width: 18px; height: 2px; background: #c2bdc4; margin: auto; }
  .scene-navigation .active span { background: #172b78; height: 3px; }
  .swipe-hint { display: none; }
  @media (min-width: 1700px) { .photographs, video { height: 230px; } figure img { height: 219px; } }
  @media (max-width: 1100px) and (min-width: 801px) { .memory-cell { left: 12%; width: 38%; } .memory-cell.second { left: 49%; width: 41%; } .reversed .memory-cell { left: 50%; } .reversed .memory-cell.second { left: 10%; } h3 { font-size: 20px; } .scene-note { font-size: 13px; top: 20%; } }
  @media (max-width: 800px) {
    .toolbar { padding: 0 6%; align-items: flex-start; flex-wrap: wrap; gap: 12px; }
    .toolbar > div:first-child { flex: 1; }
    .eyebrow { font-size: 10px; letter-spacing: .12em; }
    .invitation { font-size: 16px; line-height: 1.35; max-width: 25ch; }
    .controls { width: 100%; justify-content: space-between; gap: 0; margin-top: -4px; }
    .motion { font-size: 14px; padding: 0; }
    .pagination { gap: 8px; font-size: 14px; }
    .scene { height: 620px; }
    .scene-note { top: 0; left: 6%; font-size: 13px; transform: none; }
    .reversed .scene-note { left: 6%; right: auto; transform: none; }
    .memory-cell, .memory-cell.second, .reversed .memory-cell, .reversed .memory-cell.second { top: 24%; left: 7%; width: 80%; }
    .paper-pocket { padding: 10px 0 18px; }
    .reversed .memory-cell { left: 13%; }
    .photographs { height: 220px; gap: 7px; }
    figure { padding: 5px 5px 10px; }
    figure img { height: 208px; max-height: 56vw; }
    .multiple img { height: 186px; max-height: 49vw; }
    .three { gap: 5px; }
    .three img { height: 163px; max-height: 44vw; }
    .three figure { padding: 4px 4px 8px; }
    video { width: 100%; height: 210px; max-width: 360px; }
    .caption { gap: 9px; margin-top: 20px; }
    h3 { font-size: 21px; line-height: 1.35; max-width: 25ch; overflow-wrap: break-word; }
    .memory-number { font-size: 11px; }
    .text-only .paper-pocket { padding-top: 55px; }
    .text-only h3 { font-size: 33px; max-width: 15ch; }
    .river-plant.first { left: 29%; top: 15%; transform: translate(-50%, -66%) scale(.65); }
    .river-plant.last { left: 76%; top: 89%; transform: translate(-50%, -66%) scale(.76); }
    .reversed .river-plant.first { left: 71%; }
    .reversed .river-plant.last { left: 24%; }
    .river-plant.pool { display: none; }
    .scene-navigation { flex-wrap: wrap; max-width: 360px; gap: 0; margin-top: -9px; }
    .scene-navigation button { min-width: 30px; width: 30px; min-height: 26px; padding: 0 6px; }
    .scene-navigation span { width: 13px; }
    .swipe-hint { display: block; text-align: center; font-size: 13px; font-style: italic; color: #6b6374; margin: 8px 0 0; }
    .swipe-hint span { margin-left: 7px; }
  }
  @media (max-width: 370px) { h3 { font-size: 19px; } .text-only h3 { font-size: 29px; } .scene-navigation { max-width: 310px; } }
  @media (prefers-reduced-motion: reduce) { .motion { visibility: hidden; } .scenes { scroll-behavior: auto; } }
</style>
