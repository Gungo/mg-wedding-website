<script>
  import Lotus from '$lib/components/story/Lotus.svelte';
  import { desktop, mobile } from './water-art.js';

  let paused = $state(false);
  const compositions = [{ name: 'desktop', art: desktop }, { name: 'mobile', art: mobile }];
</script>

<svelte:head>
  <title>The way to us · Mariluz & Germán</title>
  <meta name="robots" content="noindex" />
  <meta name="description" content="Three memories, carried together. An illustrated study of Mariluz and Germán’s story." />
</svelte:head>

<main class="spread" class:paused>
  <header class="masthead">
    <a href="/" aria-label="Mariluz and Germán — home">M<span>&</span>G</a>
    <p>Our story, in little moments</p>
    <button onclick={() => paused = !paused} aria-pressed={paused} aria-label={paused ? 'Resume water highlights' : 'Pause water highlights'}>
      <span aria-hidden="true">{paused ? '▷' : 'Ⅱ'}</span><span>{paused ? 'Resume' : 'Pause'}</span>
    </button>
  </header>

  <div class="title">
    <span class="chapter">A love, unfolding</span>
    <h1>The way to us</h1>
    <p>Some things were always finding their way.</p>
  </div>

  {#each compositions as composition}
    <svg class="water {composition.name}" viewBox={composition.art.box} preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id={`indigo-${composition.name}`} x1="0" y1="0" x2=".7" y2="1">
          <stop stop-color="#242b70" />
          <stop offset=".45" stop-color="#223a88" />
          <stop offset="1" stop-color="#353a77" />
        </linearGradient>
        <filter id={`pigment-${composition.name}`} x="-2%" y="-2%" width="104%" height="104%" color-interpolation-filters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency=".43" numOctaves="3" seed="18" result="grain" />
          <feColorMatrix in="grain" type="saturate" values="0" />
          <feComponentTransfer><feFuncA type="linear" slope=".19" /></feComponentTransfer>
          <feComposite in2="SourceGraphic" operator="in" />
          <feBlend in2="SourceGraphic" mode="soft-light" />
        </filter>
      </defs>
      <g filter={`url(#pigment-${composition.name})`}>
        {#each composition.art.pools as pool, i}
          <path d={pool} fill={`url(#indigo-${composition.name})`} stroke={i % 2 === 0 ? '#818c9d' : '#a49b83'} stroke-width="1.1" />
        {/each}
      </g>
      {#each composition.art.cream as current, i}
        <path d={current} fill={i % 3 === 0 ? '#eee5ce' : '#b9c7c1'} opacity={i % 3 === 0 ? '.94' : '.76'} />
      {/each}
      {#each composition.art.fine as current, i}
        <path d={current} fill="none" stroke={i % 3 === 0 ? '#e5d9bb' : '#a5bfc1'} stroke-width={i % 4 === 0 ? '1.6' : '.7'} opacity={i % 3 === 0 ? '.78' : '.55'} stroke-linecap="round" />
        {#if i === 3 || i === 10}
          <path class="glimmer" d={current} fill="none" stroke="#fff8db" stroke-width="1.7" stroke-linecap="round" stroke-dasharray="16 820" style={`--delay:${i * -4}s`} />
        {/if}
      {/each}
    </svg>
  {/each}

  <span class="margin-note origin">It began with a move…</span>

  <section class="memories" aria-label="Three moments from our story">
    <article class="memory beginning">
      <p class="index">01 <span>·</span> A little closer</p>
      <h2>Move to Weston,<br /><em>Florida</em></h2>
      <div class="small-rule" aria-hidden="true"></div>
      <p class="thought">Two paths, finding the same place.</p>
    </article>

    <article class="memory friendship">
      <figure>
        <div class="photograph"><img src="/images/canva/photos/friendship-snapshot.jpg" alt="Mariluz and Germán smiling together in an early photograph" /></div>
        <figcaption><span class="index">02</span><h2>First, friendship.</h2></figcaption>
      </figure>
    </article>

    <article class="memory disney">
      <div class="three-photos" aria-label="Three memories from our Disney trips">
        <figure class="photograph"><img src="/images/canva/photos/disney-grand-floridian.jpeg" alt="Together at Disney’s Grand Floridian Resort" /></figure>
        <figure class="photograph"><img src="/images/canva/photos/disney-beauty-beast.jpeg" alt="Together in front of the Beauty and the Beast stained glass" /></figure>
        <figure class="photograph"><img src="/images/canva/photos/disney-animal-kingdom.jpeg" alt="A happy day at Disney’s Animal Kingdom" /></figure>
      </div>
      <div class="disney-caption"><span class="index">03</span><h2>Many Disney trips.</h2><p>A little more magic, together.</p></div>
    </article>
  </section>

  {#each ['one', 'two', 'three'] as position}
    <div class={`botanical ${position}`} aria-hidden="true">
      <svg class="reeds" viewBox="0 0 160 180" fill="none">
        <path d="M78 160 C75 111 52 69 40 38 M83 160 C78 105 102 58 102 23 M86 160 C96 122 125 99 139 74 M73 156 C53 125 29 117 17 89 M81 159 C80 99 74 64 78 41" stroke="#858d78" stroke-width="1.2" />
        <path d="M65 132 Q25 99 35 62 Q68 89 65 132 M94 128 Q92 83 119 58 Q121 105 94 128 M111 136 Q134 110 150 116 Q136 144 111 136 M48 136 Q21 144 9 126 Q33 120 48 136 M76 94 Q52 74 56 49 Q75 63 76 94" fill="#85948a" stroke="#617c79" stroke-width=".7" />
        <path d="M62 122 Q43 93 39 72 M98 119 Q105 89 116 66 M79 149 Q112 136 138 124" stroke="#d8d8bc" stroke-width=".65" />
        <path d="M40 38 L34 20 M102 23 L105 6 M78 41 L74 26 M139 74 L148 61" stroke="#b79861" stroke-width="3.3" stroke-linecap="round" />
      </svg>
      <div class="lotus-main"><Lotus size={104} floating={false} /></div>
      <div class="lotus-small"><Lotus size={53} floating={false} /></div>
    </div>
  {/each}

  <footer><span>Mariluz & Germán</span><span class="continuation">And all the turns still to come <i aria-hidden="true">↗</i></span></footer>
</main>

<style>
  .spread { --paper: #f6f1e6; --ink: #353d66; position: relative; isolation: isolate; overflow: hidden; width: 100%; height: 100svh; min-height: 730px; max-height: 1150px; background: var(--paper); color: var(--ink); }
  .spread::after { position: absolute; inset: 0; content: ''; pointer-events: none; z-index: 8; opacity: .12; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 160'%3E%3Cfilter id='p'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Cpath d='M0 0h160v160H0z' filter='url(%23p)' opacity='.35'/%3E%3C/svg%3E"); }
  .masthead { position: absolute; inset: 24px 3.2% auto; display: flex; justify-content: space-between; align-items: center; z-index: 6; }
  .masthead a { font-size: 24px; text-decoration: none; letter-spacing: .08em; color: var(--ink); }
  .masthead a span { font-size: 16px; font-style: italic; margin: 0 6px; }
  .masthead p { font-size: 10px; letter-spacing: .2em; text-transform: uppercase; margin: 0; }
  .masthead button { display: flex; gap: 9px; align-items: center; padding: 7px 0; color: #6d7180; font: inherit; font-size: 13px; background: none; border: 0; cursor: pointer; }
  a:focus-visible, button:focus-visible { outline: 2px solid #353d66; outline-offset: 5px; }
  .title { position: absolute; top: 6.3%; left: 36%; width: 34%; z-index: 3; text-align: center; }
  .chapter { display: none; font-size: 10px; color: #8c806b; text-transform: uppercase; letter-spacing: .22em; }
  h1 { margin: 5px 0 2px; font-weight: 400; font-size: clamp(38px, 3.5vw, 54px); line-height: .99; letter-spacing: -.038em; }
  .title p { display: none; margin-top: 10px; color: #797787; font-size: clamp(13px, 1.15vw, 18px); font-style: italic; }
  .water { position: absolute; inset: 0; width: 100%; height: 100%; z-index: 0; }
  .mobile { display: none; }
  .glimmer { opacity: .55; animation: glimmer 29s linear infinite; animation-delay: var(--delay); }
  @keyframes glimmer { to { stroke-dashoffset: -836; } }
  .paused .glimmer { animation-play-state: paused; }
  .margin-note { position: absolute; color: #8c8270; font-size: clamp(12px, 1.15vw, 17px); font-style: italic; }
  .origin { left: 4%; top: 32%; transform: rotate(-7deg); }
  .memory { position: absolute; z-index: 2; text-align: center; }
  .beginning { left: 15%; top: 32.5%; width: 24%; }
  .index { font-size: 10px; letter-spacing: .17em; text-transform: uppercase; color: #88785d; }
  .index span { margin: 0 8px; }
  h2 { font-weight: 400; line-height: 1.07; letter-spacing: -.018em; }
  .beginning h2 { font-size: clamp(28px, 2.8vw, 43px); margin: 14px 0 15px; }
  .beginning em { font-weight: 400; }
  .small-rule { height: 1px; width: 27px; background: #aa9775; margin: 0 auto; }
  .thought { font-size: clamp(13px, 1.12vw, 17px); margin-top: 13px; color: #797787; font-style: italic; }
  .friendship { top: 25%; left: 52.5%; width: 14%; }
  figure { margin: 0; }
  .photograph { background: #fffcf5; padding: 6px 6px 11px; box-shadow: 0 3px 8px #52473719, 0 0 1px #9b8e7350; }
  .photograph img { display: block; width: 100%; height: 100%; object-fit: cover; }
  .friendship .photograph { transform: rotate(3deg); }
  .friendship img { aspect-ratio: 1.38; object-fit: contain; }
  figcaption { margin-top: 13px; display: flex; justify-content: center; align-items: baseline; gap: 10px; }
  figcaption h2 { font-size: clamp(19px, 1.9vw, 28px); }
  .disney { left: 47%; top: 60.2%; width: 28%; }
  .three-photos { display: flex; align-items: center; gap: 9px; }
  .three-photos .photograph { width: 33.333%; padding: 5px 5px 9px; }
  .three-photos img { aspect-ratio: 1.22; }
  .three-photos .photograph:nth-child(1) { transform: rotate(-7deg) translateY(6px); }
  .three-photos .photograph:nth-child(2) { transform: rotate(1deg) translateY(-7px); }
  .three-photos .photograph:nth-child(3) { transform: rotate(7deg) translateY(6px); }
  .disney-caption { position: relative; margin-top: 18px; }
  .disney-caption .index { display: inline-block; vertical-align: baseline; margin-right: 10px; }
  .disney-caption h2 { display: inline; font-size: clamp(21px, 2.05vw, 31px); }
  .disney-caption p { color: #797787; font-size: clamp(13px, 1.1vw, 17px); margin: 5px 0 0; font-style: italic; }
  .botanical { position: absolute; z-index: 4; width: 160px; height: 180px; transform: translate(-50%, -65%); pointer-events: none; }
  .botanical.one { left: 28%; top: 23%; transform: translate(-50%, -65%) scale(.8); }
  .botanical.two { left: 77%; top: 50%; }
  .botanical.three { left: 33.2%; top: 80.5%; transform: translate(-50%, -65%) scale(1.1); }
  .reeds { width: 100%; height: 100%; }
  .lotus-main { position: absolute; left: 30px; top: 98px; transform: rotate(-8deg); }
  .lotus-small { position: absolute; left: 103px; top: 119px; transform: rotate(15deg); }
  .one .lotus-small { display: none; }
  .one .reeds { transform: rotate(-13deg) scale(.88); transform-origin: 50% 80%; }
  .two .reeds { transform: rotate(11deg) scale(.82, 1.05); transform-origin: 50% 80%; }
  .three .lotus-small { transform: rotate(-22deg) scale(1.15); }
  footer { position: absolute; bottom: 3%; left: 4%; right: 4%; display: flex; justify-content: space-between; font-size: 13px; color: #858075; font-style: italic; }
  .continuation i { margin-left: 14px; font-size: 22px; font-weight: 400; }
  @media (min-width: 1800px) { .spread { max-height: none; } .botanical { scale: 1.2; } }
  @media (max-width: 760px) {
    .spread { height: 160svh; min-height: 1160px; max-height: 1480px; }
    .masthead { inset: 20px 6% auto; }
    .masthead a { font-size: 21px; }
    .masthead p { display: none; }
    .masthead button { font-size: 12px; }
    .title { top: 4.9%; left: 11%; width: 78%; }
    .chapter { display: block; font-size: 9px; }
    h1 { font-size: 48px; margin-top: 8px; }
    .title p { display: block; font-size: 16px; line-height: 1.15; color: #626073; margin-top: 9px; }
    .desktop { display: none; }
    .mobile { display: block; }
    .origin { top: 19.7%; left: 6%; font-size: 16px; color: #706652; transform: rotate(-5deg); }
    .beginning { top: 21.6%; left: 7%; width: 68%; }
    .beginning h2 { font-size: 31px; margin-top: 12px; margin-bottom: 8px; }
    .index { font-size: 9px; }
    .thought { font-size: 16px; line-height: 1.15; color: #626073; margin-top: 8px; }
    .friendship { top: 41.7%; left: 38%; width: 45%; }
    .friendship .photograph { padding: 6px 6px 11px; }
    figcaption { gap: 9px; margin-top: 13px; }
    figcaption h2 { font-size: 25px; }
    .disney { top: 71.7%; left: 19%; width: 70%; }
    .three-photos { gap: 5px; }
    .three-photos .photograph { padding: 3px 3px 7px; }
    .three-photos img { aspect-ratio: 1.14; }
    .disney-caption { margin-top: 10px; }
    .disney-caption h2 { font-size: 22px; }
    .disney-caption p { font-size: 16px; line-height: 1.1; color: #626073; margin-top: 5px; }
    .botanical { width: 135px; height: 160px; }
    .botanical.one { left: 82%; top: 29.2%; transform: translate(-50%, -65%) rotate(-8deg) scale(.67); }
    .botanical.two { left: 18%; top: 60.4%; transform: translate(-50%, -65%) rotate(9deg) scale(.86); }
    .botanical.three { left: 77%; top: 68.3%; transform: translate(-50%, -65%) rotate(-12deg) scale(.74); }
    .lotus-main { top: 82px; left: 13px; }
    .lotus-small { top: 108px; left: 86px; }
    footer { bottom: 5%; left: 7%; right: 7%; font-size: 12px; color: #706652; flex-direction: column; align-items: flex-start; gap: 5px; }
    .continuation { max-width: none; text-align: left; }
    .continuation i { margin-left: 4px; font-size: 16px; }
  }
  @media (max-width: 760px) and (max-height: 760px) {
    .origin { top: 19.2%; }
    .beginning { top: 21.5%; }
    .beginning h2 { font-size: 28px; margin-bottom: 0; }
    .small-rule { display: none; }
    .thought { font-size: 16px; line-height: 1.1; margin-top: 7px; }
    .disney-caption p { display: none; }
  }
  @media (max-width: 370px) { .beginning h2 { font-size: 28px; } .disney-caption h2 { font-size: 21px; } }
  @media (prefers-reduced-motion: reduce) { .glimmer { animation: none; opacity: .2; } .masthead button { display: none; } }
</style>
