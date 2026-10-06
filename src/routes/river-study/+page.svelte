<script>
  import Lotus from '$lib/components/story/Lotus.svelte';
  import { desktopRiver, mobileRiver } from './river-study.js';

  let paused = $state(false);
  const views = [
    { name: 'desktop', box: '0 0 1440 1040', river: desktopRiver },
    { name: 'mobile', box: '0 0 360 1300', river: mobileRiver }
  ];
</script>

<svelte:head>
  <title>A river of memories · Mariluz & Germán</title>
  <meta name="robots" content="noindex" />
  <meta name="description" content="An illustrated river study for Mariluz and Germán’s story." />
</svelte:head>

<main class="study" class:paused>
  <header>
    <a href="/" class="monogram" aria-label="Back to the wedding website">M <span>&</span> G</a>
    <p class="eyebrow">The turns that brought us here</p>
    <h1>A river of memories</h1>
    <p class="intro">Some stories find their own way.</p>
    <button type="button" class="motion-toggle" onclick={() => { paused = !paused; }} aria-pressed={paused}>
      <span aria-hidden="true">{paused ? '▷' : 'Ⅱ'}</span> {paused ? 'Resume the current' : 'Pause the current'}
    </button>
  </header>

  <section class="landscape" aria-label="Three memories along our river">
    {#each views as view}
      <svg class="river {view.name}" viewBox={view.box} fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="water-{view.name}" x1="0" y1="0" x2="0.8" y2="1" gradientUnits="objectBoundingBox">
            <stop stop-color="#343778" />
            <stop offset="0.32" stop-color="#283c8c" />
            <stop offset="0.64" stop-color="#283876" />
            <stop offset="1" stop-color="#3f4185" />
          </linearGradient>
          <filter id="pigment-{view.name}" x="-3%" y="-3%" width="106%" height="106%" color-interpolation-filters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.21" numOctaves="3" seed="8" result="grain" />
            <feColorMatrix in="grain" type="saturate" values="0" />
            <feComposite in2="SourceGraphic" operator="in" />
            <feBlend in2="SourceGraphic" mode="soft-light" />
          </filter>
          <filter id="edge-{view.name}" x="-2%" y="-2%" width="104%" height="104%">
            <feTurbulence type="fractalNoise" baseFrequency="0.052 0.12" numOctaves="2" seed="13" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.2" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
        <g filter={`url(#edge-${view.name})`}>
          <path d={view.river.outline} fill="#b9b4b1" stroke="#b9b4b1" stroke-width="4" opacity="0.33" />
          <g filter={`url(#pigment-${view.name})`}>
            <path d={view.river.outline} fill={`url(#water-${view.name})`} />
            {#each view.river.bands as band, i}
              <path d={band} fill={i === 1 ? '#1b2f70' : '#7881ad'} opacity={i === 1 ? '0.28' : '0.16'} />
            {/each}
          </g>
          {#each view.river.threads as thread, i}
            <path d={thread} stroke="#f6eccd" stroke-width={i % 3 === 0 ? '1.35' : '0.8'} opacity={i % 3 === 0 ? '0.69' : '0.43'} />
            {#if i === 3 || i === 7}
              <path class="moving-current" d={thread} stroke="#fff6dc" stroke-width="2.1" stroke-linecap="round" stroke-dasharray="45 370" style={`--phase:${i * -7}s`} />
            {/if}
          {/each}
        </g>
      </svg>
    {/each}

    <span class="river-label beginning">The beginning</span>
    <span class="river-label next">And all that comes next…</span>

    <div class="flower flower-one"><Lotus number="01" size={53} {paused} /></div>
    <div class="flower flower-two"><Lotus number="02" size={53} {paused} /></div>
    <div class="flower flower-three"><Lotus number="03" size={53} {paused} /></div>

    <article class="memory words">
      <p class="memory-number">01 <span>·</span> A new beginning</p>
      <h2>Move to Weston,<br />Florida</h2>
      <span class="little-rule" aria-hidden="true"></span>
      <p class="annotation">Two paths, a little closer.</p>
    </article>

    <article class="memory friendship">
      <figure>
        <div class="photo-mount"><img src="/images/canva/photos/friendship-snapshot.jpg" alt="Mariluz and Germán smiling together in an old photograph" /></div>
        <figcaption><span class="memory-number">02</span><h2>Friendship</h2></figcaption>
      </figure>
    </article>

    <article class="memory trips">
      <div class="photo-spread" aria-label="Three photographs from Disney trips">
        <div class="photo-mount"><img src="/images/canva/photos/disney-grand-floridian.jpeg" alt="Mariluz and Germán at Disney’s Grand Floridian Resort" loading="lazy" /></div>
        <div class="photo-mount"><img src="/images/canva/photos/disney-beauty-beast.jpeg" alt="Mariluz and Germán by the Beauty and the Beast stained-glass window" loading="lazy" /></div>
        <div class="photo-mount"><img src="/images/canva/photos/disney-animal-kingdom.jpeg" alt="Mariluz and Germán at Disney’s Animal Kingdom" loading="lazy" /></div>
      </div>
      <div class="spread-caption"><span class="memory-number">03</span><h2>And then, many Disney trips</h2></div>
    </article>
  </section>

  <footer><span>Mariluz & Germán</span><span class="footer-flower" aria-hidden="true">✳</span><span>A story still unfolding</span></footer>
</main>

<style>
  .study { --ink: #424c71; position: relative; overflow: hidden; min-height: 100vh; color: var(--ink); background: #f8f5ef; }
  .study::before { content: ''; position: absolute; inset: 0; z-index: 4; pointer-events: none; opacity: 0.19; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.84' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Cpath fill='%238d806f' opacity='.25' filter='url(%23n)' d='M0 0h180v180H0z'/%3E%3C/svg%3E"); }
  header { position: relative; text-align: center; padding: 53px 24px 8px; }
  .monogram { position: absolute; top: 31px; left: 4%; font-size: 23px; letter-spacing: 0.13em; text-decoration: none; color: var(--ink); }
  .monogram span { font-size: 17px; font-style: italic; }
  .eyebrow { font-size: 11px; letter-spacing: 0.23em; text-transform: uppercase; }
  h1 { font-size: clamp(36px, 4.4vw, 62px); line-height: 1.15; font-weight: 400; margin: 12px 0 8px; letter-spacing: -0.035em; }
  .intro { font-size: 19px; font-style: italic; color: #74758a; }
  .motion-toggle { position: absolute; right: 4%; top: 33px; border: 0; border-bottom: 1px solid #cac6bd; background: transparent; color: #62677c; font: inherit; font-size: 13px; padding: 3px 0 5px; cursor: pointer; }
  .motion-toggle span { display: inline-block; width: 16px; }
  a:focus-visible, button:focus-visible { outline: 2px solid #283c8c; outline-offset: 6px; }
  .landscape { position: relative; width: 100%; max-width: 1600px; aspect-ratio: 1440 / 1040; margin: 0 auto; }
  .river { width: 100%; height: 100%; position: absolute; inset: 0; overflow: visible; }
  .river.mobile { display: none; }
  .moving-current { opacity: 0.2; animation: current 100s linear infinite; animation-delay: var(--phase); }
  .paused .moving-current { animation-play-state: paused; }
  @keyframes current { to { stroke-dashoffset: -1660; } }
  .river-label { position: absolute; font-size: clamp(13px, 1.3vw, 18px); font-style: italic; color: #727587; }
  .beginning { top: 24%; left: 4.2%; }
  .next { right: 6%; bottom: 6%; }
  .flower { position: absolute; z-index: 2; transform: translate(-50%, -50%); }
  .flower-one { left: 37%; top: 12.4%; }
  .flower-two { left: 82.7%; top: 33.1%; }
  .flower-three { left: 27%; top: 83.7%; }
  .memory { position: absolute; text-align: center; }
  .words { top: 31%; left: 13.5%; width: 26%; }
  .memory-number { font-size: clamp(10px, 0.95vw, 14px); letter-spacing: 0.15em; text-transform: uppercase; color: #817866; }
  .memory-number span { margin: 0 8px; }
  h2 { font-weight: 400; font-size: clamp(20px, 2.45vw, 34px); line-height: 1.18; }
  .words h2 { margin: 15px 0 20px; }
  .little-rule { display: block; width: 29px; height: 1px; background: #b8a482; margin: 0 auto 15px; }
  .annotation { color: #74758a; font-style: italic; font-size: clamp(13px, 1.2vw, 17px); }
  .friendship { left: 52%; top: 22%; width: 16%; }
  .photo-mount { padding: 7px; background: #fffdf7; box-shadow: 0 3px 9px #514c3e1a, 0 0 1px #71655740; }
  .friendship .photo-mount { transform: rotate(2deg); padding: 9px 9px 14px; }
  .friendship img { width: 100%; aspect-ratio: 1.38; object-fit: contain; background: #f9f5ed; }
  figcaption { margin-top: 17px; display: flex; align-items: baseline; justify-content: center; gap: 12px; }
  figcaption h2 { font-size: clamp(19px, 1.85vw, 27px); }
  .trips { left: 43%; top: 60%; width: 37%; }
  .photo-spread { display: flex; align-items: center; gap: 10px; }
  .photo-spread .photo-mount { width: 33.333%; padding: 6px 6px 12px; }
  .photo-spread .photo-mount:nth-child(1) { transform: rotate(-5deg) translateY(7px); }
  .photo-spread .photo-mount:nth-child(2) { transform: rotate(1deg) translateY(-8px); }
  .photo-spread .photo-mount:nth-child(3) { transform: rotate(5deg) translateY(6px); }
  .photo-spread img { width: 100%; aspect-ratio: 0.85; object-fit: cover; }
  .spread-caption { display: flex; justify-content: center; align-items: baseline; gap: 12px; margin-top: 24px; }
  .spread-caption h2 { font-size: clamp(18px, 1.9vw, 27px); }
  footer { display: flex; justify-content: center; align-items: center; gap: 20px; padding: 0 24px 37px; font-size: 13px; color: #777589; font-style: italic; }
  .footer-flower { color: #ad9571; font-size: 20px; }
  @media (min-width: 1600px) { .landscape { margin-top: 10px; } }
  @media (max-width: 720px) {
    header { padding-top: 87px; padding-bottom: 30px; }
    .monogram { top: 21px; left: 24px; }
    .motion-toggle { top: 25px; right: 24px; font-size: 12px; }
    .eyebrow { font-size: 9px; }
    h1 { font-size: 40px; }
    .intro { font-size: 18px; }
    .landscape { aspect-ratio: auto; min-height: 1120px; padding: 66px 22px 65px 89px; overflow: hidden; }
    .river.desktop { display: none; }
    .river.mobile { display: block; width: 360px; height: 1300px; left: 0; top: -12px; }
    .beginning { top: 5px; left: 84px; font-size: 15px; }
    .next { right: 24px; bottom: 20px; font-size: 15px; }
    .memory { position: relative; top: auto; left: auto; width: 100%; }
    .words { margin: 0 auto 90px; }
    .memory-number { font-size: 10px; }
    h2 { font-size: 29px; }
    .annotation { font-size: 15px; }
    .friendship { max-width: 270px; margin: 0 auto 95px; }
    .friendship img { aspect-ratio: 1.15; }
    figcaption h2 { font-size: 26px; }
    .trips { max-width: 400px; margin: 0 auto 80px; }
    .photo-spread { flex-wrap: wrap; justify-content: center; gap: 7px; }
    .photo-spread .photo-mount { width: 46%; padding: 4px 4px 8px; }
    .photo-spread .photo-mount:nth-child(3) { margin-top: -10px; }
    .spread-caption { display: block; margin-top: 22px; padding: 0 8px; }
    .spread-caption .memory-number { display: block; margin-bottom: 8px; }
    .spread-caption h2 { font-size: 23px; text-wrap: balance; }
    .flower-one { left: 52px; top: 132px; }
    .flower-two { left: 62px; top: 410px; }
    .flower-three { left: 34px; top: 845px; }
    footer { flex-wrap: wrap; gap: 10px; font-size: 12px; padding-bottom: 27px; }
  }
  @media (prefers-reduced-motion: reduce) { .moving-current { animation: none; } .motion-toggle { display: none; } }
</style>
