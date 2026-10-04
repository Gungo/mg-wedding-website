<script>
  import Section from '$lib/components/Section.svelte';
  import { useI18n } from '$lib/i18n/index.svelte.js';

  const i18n = useI18n();
  const s = $derived(i18n.wedding.story);

  function autoplayTimelineVideo(video) {
    video.muted = true;
    video.defaultMuted = true;

    const timeline = video.closest('.timeline-section');
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        video.play().catch(() => {});
        observer.disconnect();
      },
      { threshold: 0.1 }
    );

    observer.observe(timeline ?? video);

    return {
      destroy() {
        observer.disconnect();
      }
    };
  }
</script>

<Section id="our-story" title={s.title} titleStyle="display">
  <div class="ornament">
    <img src="/images/canva/decor/planet-left.png" alt="" />
    <img class="pearl" src="/images/canva/decor/pearl.png" alt="" />
    <img src="/images/canva/decor/planet-right.png" alt="" />
  </div>

  <div class="timeline-section">
    <p class="scroll-hint"><span>The beginning</span><span aria-hidden="true">DRAG TO EXPLORE&nbsp; →</span></p>
    <div class="timeline-scroller" role="region" tabindex="0" aria-label="Wedding story timeline; scroll horizontally to see every moment">
      <ol class="timeline">
        <li class="moment spacer-moment" aria-hidden="true">
          <span class="marker"><span>02</span></span>
        </li>
        {#each s.moments as moment, i}
          {@const above = i % 2 === 0}
          <li
            class="moment"
            class:above={above}
            class:second-row={i >= 10}
            class:pre-disney-shift={i >= 10 && i <= 15}
            class:line-two-to-bottom={i >= 10 && i <= 15 && i !== 14}
            class:line-two-to-top={i === 14 || i === 16}
            class:transcendence-milestone={moment.label === 'Transcendence' || moment.label === 'Trascendencia'}
            class:ohio-milestone={moment.label === 'then the move to Ohio' || moment.label === 'luego la mudanza a Ohio'}
            class:iceland-milestone={moment.label === 'Engaged at last, Iceland' || moment.label === 'Por fin comprometidos, Islandia'}
            class:third-milestone={i === 1}
            class:dating-at-last={moment.label?.startsWith('Dating at last') || moment.label?.startsWith('Por fin empezamos a salir')}
            class:colombia-milestone={moment.label === 'Colombia'}
            class:iberia-milestone={moment.label === 'España and Portugal' || moment.label === 'España y Portugal'}
            class:new-york-milestone={moment.label === 'New York' || moment.label === 'Nueva York'}
            class:nicaragua-milestone={moment.label?.startsWith('which turned into even more trips') || moment.label?.startsWith('¡que se convirtió en aún más viajes')}
            class:alaska-milestone={moment.label?.startsWith('Finding lasting shape') || moment.label?.startsWith('finalmente Alaska')}
            class:disney-milestone={moment.label?.startsWith('and then Many Disney Trips') || moment.label?.startsWith('y luego Muchos viajes a Disney')}
            class:ever-after={moment.label?.startsWith('Recapping our time apart') || moment.label?.startsWith('Recordando nuestro tiempo separados')}
            style={`--row: ${i < 10 ? 1 : 2}; --column: ${i < 10 ? i + 1 : 20 - i}`}
          >
            {#if above}
              <div class="moment-copy">
                {#if moment.photos}
                  <div class="moment-photos">
                    {#each moment.photos as photo}
                      <img src={photo.src} alt={photo.alt ?? ''} loading="lazy" />
                    {/each}
                  </div>
                {:else if moment.video}
                  <video use:autoplayTimelineVideo controls muted loop playsinline preload="auto" poster={moment.poster} aria-label={moment.alt ?? ''}>
                    <source src={moment.video} type="video/mp4" />
                  </video>
                {:else if moment.src}
                  <img src={moment.src} alt={moment.alt ?? ''} loading="lazy" />
                {/if}
                {#if moment.label && i !== 0}<p>{moment.label}</p>{/if}
              </div>
            {/if}
            <span class="marker" aria-hidden="true"><span>{String(i + (i === 0 ? 1 : 2)).padStart(2, '0')}</span></span>
            {#if i === 0}
              <span class="photo-slot">
                <img src="/images/canva/photos/born-together.jpg" alt="Mariluz and Germán with their newborn baby" />
              </span>
              <span class="photo-caption">{moment.label}</span>
            {/if}
            {#if !above}
              <div class="moment-copy">
                {#if moment.photos}
                  <div class="moment-photos">
                    {#each moment.photos as photo}
                      <img src={photo.src} alt={photo.alt ?? ''} loading="lazy" />
                    {/each}
                  </div>
                {:else if moment.video}
                  <video use:autoplayTimelineVideo controls muted loop playsinline preload="auto" poster={moment.poster} aria-label={moment.alt ?? ''}>
                    <source src={moment.video} type="video/mp4" />
                  </video>
                {:else if moment.src}
                  <img src={moment.src} alt={moment.alt ?? ''} loading="lazy" />
                {/if}
                {#if moment.label && i !== 0}<p>{moment.label}</p>{/if}
              </div>
            {/if}
          </li>
        {/each}
        <li class="season-three-interlude" aria-label="Season 3">
          <span class="marker" aria-hidden="true"></span>
          <p>Season 3</p>
        </li>
        <li class="oregon-finale" aria-label="Now join us for our next adventure, starting in Oregon">
          <span class="marker" aria-hidden="true"></span>
          <div class="oregon-finale-copy">
            <img src="/images/canva/photos/cartoon-moon-wedding.jpg" alt="A moonlit wedding illustration" loading="lazy" />
            <p>Now join us for our next adventure, starting in Oregon</p>
          </div>
        </li>
      </ol>
    </div>
  </div>
</Section>

<style>
  .ornament {
    position: relative;
    left: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: clamp(1rem, 4vw, 2.5rem);
    width: min(100%, 34rem);
    margin: -1rem 0 2rem;
    max-width: 34rem;
    transform: translateX(-50%);
  }

  .ornament img {
    width: clamp(3.5rem, 10vw, 5.5rem);
    height: auto;
  }

  .pearl {
    width: clamp(2.4rem, 7vw, 3.6rem) !important;
  }

  .timeline-section {
    max-width: 76rem;
    margin: 0 auto;
  }

  .scroll-hint {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    margin: 0 0 0.55rem;
    color: var(--color-denim);
    font-family: var(--font-sans);
    font-size: 0.65rem;
    font-weight: 600;
    letter-spacing: 0.16em;
  }

  .scroll-hint span:last-child {
    color: var(--color-text-muted);
    white-space: nowrap;
  }

  .scroll-hint span:first-child {
    font-size: clamp(0.75rem, 1.1vw, 0.9rem);
    font-weight: 600;
    letter-spacing: 0.1em;
    line-height: 1.25;
    text-transform: uppercase;
  }

  .timeline-scroller {
    overflow-x: auto;
    overflow-y: hidden;
    overscroll-behavior-inline: contain;
    scrollbar-color: color-mix(in srgb, var(--color-denim) 48%, transparent) transparent;
    scrollbar-width: thin;
    outline-offset: 4px;
  }

  .timeline {
    position: relative;
    display: grid;
    grid-template-columns: repeat(11, 10.25rem);
    grid-template-rows: repeat(2, 19rem);
    width: max-content;
    min-width: 100%;
    min-height: 38.7rem;
    list-style: none;
    margin: 0;
    padding: 0.35rem 0.5rem 2.8in;
  }

  .timeline::before {
    position: absolute;
    z-index: 0;
    content: '';
    top: 9.85rem;
    right: 0.5rem;
    left: 0.5rem;
    height: 2px;
    background: linear-gradient(90deg, var(--color-denim), color-mix(in srgb, var(--color-denim) 28%, var(--color-sand-light)) 88%, var(--color-denim));
  }

  .timeline::after {
    position: absolute;
    z-index: 0;
    content: '';
    top: calc(28.85rem + 1.5in);
    right: 0.5rem;
    left: 0.5rem;
    height: 2px;
    background: linear-gradient(90deg, var(--color-denim), color-mix(in srgb, var(--color-denim) 28%, var(--color-sand-light)) 88%, var(--color-denim));
  }

  .moment {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-rows: 1fr 1.35rem 1fr;
    min-height: 19rem;
    grid-row: var(--row);
    grid-column: var(--column);
  }

  .second-row {
    top: 1.5in;
  }

  .pre-disney-shift {
    left: -0.25in;
  }

  .moment-copy {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 0.25rem 0.65rem;
    text-align: center;
  }

  .above .moment-copy { grid-row: 1; }
  .moment:not(.above) .moment-copy { grid-row: 3; }

  .alaska-milestone {
    transform: translateX(-0.4in);
  }

  .moment.alaska-milestone .moment-copy {
    position: absolute;
    right: 0;
    bottom: calc(50% + 0.675rem + 0.35in);
    left: 0;
    grid-row: 1;
  }

  .nicaragua-milestone {
    transform: translateX(-0.4in);
  }

  .moment.new-york-milestone .moment-copy {
    position: absolute;
    right: 0;
    bottom: calc(50% + 0.675rem + 0.25in);
    left: 0;
    grid-row: auto;
  }

  .moment.iberia-milestone .moment-copy {
    position: absolute;
    right: 0;
    bottom: calc(50% + 0.675rem + 0.25in);
    left: 0;
    grid-row: auto;
  }

  .new-york-milestone .moment-photos {
    width: 16.5rem;
  }

  .new-york-milestone .moment-photos img {
    width: calc(50% - 0.175rem);
    height: auto;
  }

  .colombia-milestone .moment-copy img {
    width: 6rem;
    height: 9rem;
    object-fit: cover;
    object-position: center;
  }

  .ohio-milestone .moment-copy img {
    width: 7.5rem;
    height: 10rem;
    object-fit: contain;
    object-position: center;
  }

  .moment.nicaragua-milestone .moment-copy {
    position: absolute;
    top: calc(50% + 0.675rem + 0.25in);
    right: 0;
    left: 0;
  }

  .disney-milestone {
    transform: translateX(-2.4in);
  }

  .ever-after {
    top: 0;
    grid-row: 1;
    grid-column: 11;
    transform: none;
  }

  .disney-milestone .moment-photos {
    width: 24rem;
  }

  .disney-milestone .marker {
    transform: translateX(-0.333in);
  }

  .disney-milestone .moment-copy {
    grid-row: 3;
    transform: translate(-1.587in, 0.35in);
  }

  .disney-milestone .moment-photos img {
    flex: none;
    width: 6rem;
    height: auto;
  }

  .disney-milestone .moment-photos img:first-child,
  .disney-milestone .moment-photos img:last-child {
    width: 8.5rem;
  }

  .moment-copy img {
    display: block;
    width: min(100%, 10rem);
    height: 6rem;
    object-fit: cover;
    border: 3px solid #fffdf9;
    box-shadow: 0 2px 9px rgb(25 51 73 / 16%);
    transform: rotate(-2deg);
  }

  .moment-copy video {
    display: block;
    width: 14rem;
    max-width: none;
    max-height: 10rem;
    object-fit: contain;
    background: #111;
    border: 3px solid #fffdf9;
    box-shadow: 0 2px 9px rgb(25 51 73 / 16%);
  }

  .moment-photos {
    position: relative;
    top: -0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.35rem;
    width: 10rem;
  }

  .moment-photos img {
    width: calc(50% - 0.175rem);
    height: 7rem;
    object-fit: contain;
    background: #fffdf9;
  }

  .moment-photos img:nth-child(2) {
    transform: rotate(2deg);
  }

  .moment-photos img:only-child {
    width: 100%;
  }

  .ever-after .moment-photos {
    top: 0;
  }

  .moment.ever-after .moment-copy {
    position: absolute;
    top: auto;
    bottom: calc(50% + 0.675rem + 0.25in);
    left: 50%;
    width: min(20rem, 68vw);
    grid-row: auto;
    justify-content: flex-start;
    padding: 0;
    transform: translateX(-50%);
  }

  .ever-after .marker {
    transform: translate(calc(-1rem - 0.75in), 0.05in);
  }

  .ever-after .moment-copy p {
    width: 100%;
  }

  .moment:not(.above) .moment-copy img { transform: rotate(2deg); }

  .dating-at-last .moment-copy img {
    width: min(100%, 13rem);
    height: 9rem;
  }

  .third-milestone .marker {
    position: relative;
    left: calc(50% - 0.25in);
  }

  .third-milestone .moment-copy {
    position: relative;
    left: calc(50% - 0.25in);
    justify-content: flex-start;
    padding-top: 0.35rem;
  }

  .third-milestone .moment-copy p {
    font-size: 0.65rem;
    letter-spacing: 0.06em;
  }

  .spacer-moment {
    grid-row: 1;
    grid-column: 1 / 3;
  }

  .spacer-moment .marker {
    grid-row: 2;
    align-self: center;
    justify-self: center;
  }

  .photo-slot {
    position: absolute;
    z-index: 2;
    top: 10.3rem;
    right: 0;
    display: grid;
    place-items: center;
    width: 6.8rem;
    height: 6.3rem;
    overflow: hidden;
    border: 3px solid #fffdf9;
    background: #fffdf9;
    box-shadow: 0 2px 9px rgb(25 51 73 / 16%);
    transform: translateX(50%);
  }

  .photo-slot img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center;
  }

  .photo-caption {
    position: absolute;
    z-index: 2;
    top: 7.3rem;
    right: 2.5625rem;
    width: 11rem;
    color: var(--color-denim);
    font-family: var(--font-sans);
    font-size: 0.72rem;
    line-height: 1.15;
    text-align: center;
    transform: translateX(50%);
  }

  .moment:nth-child(2) .moment-copy > img {
    height: 6rem;
    transform: translateY(-0.5rem) rotate(-2deg);
  }

  .moment-copy p {
    margin: 0.4rem 0 0;
    color: var(--color-denim);
    font-family: var(--font-sans);
    font-size: clamp(0.75rem, 1.1vw, 0.9rem);
    font-weight: 600;
    letter-spacing: 0.1em;
    line-height: 1.25;
    text-transform: uppercase;
  }

  .moment:nth-child(2) .moment-copy p {
    max-width: 9rem;
    font-size: 0.72rem;
    letter-spacing: 0;
    line-height: 1.15;
    text-transform: none;
  }

  .moment:nth-child(4) .moment-copy p {
    font-size: 0.65rem;
    letter-spacing: 0.06em;
  }

  .moment:nth-child(5) .moment-copy img {
    object-fit: contain;
    background: #fffdf9;
  }

  .marker {
    z-index: 1;
    grid-row: 2;
    display: grid;
    place-items: center;
    width: 1.3rem;
    height: 1.3rem;
    justify-self: center;
    border: 2px solid var(--color-denim);
    border-radius: 50%;
    background: var(--color-sand-light);
    box-shadow: 0 0 0 6px var(--color-sand-light);
    color: var(--color-denim);
  }

  .marker span {
    font: 600 0.43rem/1 var(--font-sans);
    letter-spacing: 0;
  }

  .second-row > .marker {
    position: absolute;
    z-index: 5;
    top: calc(50% + 1px);
    left: 50%;
    grid-row: auto;
    justify-self: auto;
    transform: translate(-50%, -50%);
  }

  .second-row.disney-milestone > .marker {
    transform: translate(calc(-50% - 0.333in), -50%);
  }

  .second-row.ever-after > .marker {
    top: calc(50% - 0.4px);
    transform: translate(-50%, -50%);
  }

  .season-three-interlude {
    position: absolute;
    z-index: 2;
    top: calc(28.85rem + 1.5in + 1px);
    left: 30.315rem;
    width: 0;
    height: 0;
    list-style: none;
  }

  .season-three-interlude .marker {
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(-50%, -50%);
  }

  .season-three-interlude p {
    position: absolute;
    right: 50%;
    bottom: 1.45rem;
    width: 8rem;
    margin: 0;
    color: var(--color-denim);
    font-family: var(--font-sans);
    font-size: clamp(0.75rem, 1.1vw, 0.9rem);
    font-weight: 600;
    letter-spacing: 0.1em;
    line-height: 1.25;
    text-align: center;
    text-transform: uppercase;
    transform: translateX(50%);
  }

  .oregon-finale {
    position: relative;
    z-index: 1;
    top: calc(2.233in + 1px);
    display: grid;
    grid-row: 2;
    grid-column: 11;
    grid-template-rows: 1fr 1.35rem 1fr;
    min-height: 19rem;
    list-style: none;
  }

  .oregon-finale .marker {
    z-index: 5;
    grid-row: 2;
    align-self: center;
    justify-self: center;
  }

  .oregon-finale-copy {
    grid-row: 3;
    align-self: start;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 0.12in;
  }

  .oregon-finale-copy img {
    display: block;
    width: 9rem;
    max-width: none;
    height: 9rem;
    object-fit: cover;
    border: 3px solid #fffdf9;
    box-shadow: 0 2px 9px rgb(25 51 73 / 16%);
    transform: rotate(2deg);
  }

  .oregon-finale p {
    margin: 0.65rem 0 0;
    color: var(--color-denim);
    font-family: var(--font-sans);
    font-size: clamp(0.75rem, 1.1vw, 0.9rem);
    font-weight: 600;
    letter-spacing: 0.1em;
    line-height: 1.25;
    text-align: center;
    text-transform: uppercase;
  }

  .moment.line-two-to-bottom .moment-copy {
    position: absolute;
    top: calc(50% + 0.675rem + 0.25in);
    right: 0;
    bottom: auto;
    left: 0;
    grid-row: auto;
    transform: none;
  }

  .moment.line-two-to-top .moment-copy {
    position: absolute;
    top: auto;
    right: 0;
    bottom: calc(50% + 0.675rem + 0.25in);
    left: 0;
    grid-row: auto;
    transform: none;
  }

  .moment.line-two-to-top.disney-milestone .moment-copy {
    transform: translateX(-1.587in);
  }

  .moment.line-two-to-bottom.iberia-milestone .moment-copy {
    top: auto;
    bottom: calc(50% + 0.675rem + 0.25in);
  }

  .moment.line-two-to-bottom.transcendence-milestone .moment-copy {
    top: auto;
    bottom: calc(50% + 0.675rem + 0.25in);
  }

  .moment.line-two-to-bottom.colombia-milestone .moment-copy {
    top: auto;
    bottom: calc(50% + 0.675rem + 0.25in);
  }

  .moment.line-two-to-bottom.iceland-milestone .moment-copy {
    top: auto;
    bottom: calc(50% + 0.675rem + 0.25in);
  }

  @media (max-width: 520px) {
    .scroll-hint { font-size: 0.57rem; letter-spacing: 0.1em; }
    .timeline { grid-template-columns: repeat(11, 8.75rem); }
    .moment-copy img { height: 4.3rem; }
    .moment-photos { width: 8.25rem; }
    .moment-photos img { height: 6.5rem; }
    .dating-at-last .moment-copy img { width: min(100%, 9.5rem); height: 7rem; }
  }
</style>
