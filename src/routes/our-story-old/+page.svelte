<script>
  import { useI18n } from '$lib/i18n/index.svelte.js';

  const i18n = useI18n();
  const story = $derived(i18n.wedding.story);
  const spanish = $derived(i18n.locale === 'es');
  const moments = $derived([
    ...story.moments,
    {
      label: spanish
        ? 'Ahora acompáñennos en nuestra próxima aventura, empezando en Oregon'
        : 'Now join us for our next adventure, starting in Oregon',
      src: '/images/canva/photos/cartoon-moon-wedding.jpg',
      alt: spanish ? 'Una boda bajo la luz de la luna' : 'A moonlit wedding illustration'
    }
  ]);
</script>

<svelte:head><title>{story.title} — original timeline</title></svelte:head>

<main class="old-story">
  <header>
    <p class="reference-label">Original planet-palette reference</p>
    <h1>{story.title}</h1>
    <div class="ornament" aria-hidden="true">
      <img src="/images/canva/decor/planet-left.png" alt="" />
      <img class="pearl" src="/images/canva/decor/pearl.png" alt="" />
      <img src="/images/canva/decor/planet-right.png" alt="" />
    </div>
    <p class="hint">{spanish ? 'DESLIZA PARA EXPLORAR' : 'DRAG TO EXPLORE'} <span>→</span></p>
  </header>

  <div class="timeline-scroller" role="region" tabindex="0" aria-label={spanish ? 'Línea de tiempo original' : 'Original story timeline'}>
    <ol class="timeline">
      {#each moments as moment, index}
        {@const photos = moment.photos ?? (moment.src ? [{ src: moment.src, alt: moment.alt }] : [])}
        <li class:above={index % 2 === 0} class:finale={index === moments.length - 1}>
          <article>
            <span class="number">{String(index + 1).padStart(2, '0')}</span>
            {#if moment.video}
              <video controls autoplay muted loop playsinline preload="metadata" poster={moment.poster} aria-label={moment.alt ?? moment.label}>
                <source src={moment.video} type="video/mp4" />
              </video>
            {:else if photos.length}
              <div class="photos" style={`--count:${photos.length}`}>
                {#each photos as photo}<img src={photo.src} alt={photo.alt ?? ''} loading="lazy" />{/each}
              </div>
            {/if}
            <p>{moment.label}</p>
          </article>
          <span class="marker" aria-hidden="true"></span>
        </li>
      {/each}
    </ol>
  </div>
</main>

<style>
  .old-story { --ink:#263d74; --line:#8998b9; min-height:100vh; padding:clamp(35px,6vw,82px) 0 70px; color:var(--ink); background:linear-gradient(180deg,#fbf8f2,#f5f0e7); overflow:hidden; }
  header { width:min(92%,76rem); margin:auto; text-align:center; }
  .reference-label,.hint { font:600 11px/1.2 var(--font-sans); letter-spacing:.16em; text-transform:uppercase; }
  .reference-label { color:#8c7b76; }
  h1 { margin:12px 0 4px; font:400 clamp(40px,7vw,72px)/1 var(--font-display); }
  .ornament { display:flex; justify-content:center; align-items:center; gap:clamp(18px,4vw,40px); margin:18px auto 26px; }
  .ornament img { width:clamp(58px,8vw,90px); height:auto; }
  .ornament .pearl { width:clamp(38px,5vw,58px); }
  .hint { display:flex; justify-content:space-between; margin:0 0 10px; color:#787b8d; text-align:left; }
  .timeline-scroller { overflow-x:auto; overflow-y:hidden; overscroll-behavior-inline:contain; scrollbar-color:#7f8ca9 transparent; outline-offset:4px; }
  .timeline { position:relative; display:flex; width:max-content; min-width:100%; height:660px; gap:0; margin:0; padding:20px 7vw 28px; list-style:none; }
  .timeline::before { content:''; position:absolute; top:330px; left:7vw; right:7vw; height:2px; background:linear-gradient(90deg,#263d74,#c5b591 48%,#263d74); }
  li { position:relative; width:clamp(230px,20vw,320px); flex:0 0 auto; }
  article { position:absolute; top:348px; left:18px; right:18px; text-align:center; }
  .above article { top:auto; bottom:348px; }
  .marker { position:absolute; top:322px; left:50%; width:18px; height:18px; border:4px solid #f8f4eb; border-radius:50%; background:#263d74; box-shadow:0 0 0 1px #263d74; transform:translateX(-50%); }
  .number { display:block; margin-bottom:10px; color:#9a7d50; font:500 10px/1 var(--font-sans); letter-spacing:.16em; }
  .photos { display:flex; justify-content:center; align-items:center; gap:7px; }
  img,video { max-width:100%; }
  .photos img,video { width:auto; height:145px; max-width:calc(100% / var(--count)); object-fit:contain; padding:5px; background:#fffdf7; box-shadow:0 4px 14px #27365c22; }
  video { width:245px; max-width:100%; background:#151d42; }
  article p { max-width:27ch; margin:14px auto 0; font:400 19px/1.35 var(--font-serif); }
  .finale article p { font-style:italic; }
  @media (max-width:600px) { .timeline { height:580px; padding-inline:24px; } .timeline::before { top:290px; left:24px; right:24px; } li { width:250px; } article { top:310px; } .above article { bottom:310px; } .marker { top:282px; } .photos img,video { height:125px; } }
</style>
