<script>
  import Section from '$lib/components/Section.svelte';
  import { wedding } from '$lib/content/wedding.js';

  const a = wedding.attire;
</script>

<Section id="attire" title={a.title} titleStyle="display">
  <div class="attire">
    <img class="crest" src="/images/canva/decor/attire-crest.png" alt="" />
    <p class="level">{a.level}</p>
    {#if a.note}
      <p class="note">{a.note}</p>
    {/if}
  </div>

  {#if a.inspo}
    <div class="inspo">
      <div class="inspo-colors">
        <p class="inspo-label">INSPO COLORS</p>
        <div class="swatches" aria-label="Inspiration color palette">
          {#each a.inspo.colors as color}
            <div
              class="swatch"
              style:background-color={color.hex}
              title="{color.name} {color.hex}"
              aria-label={color.name}
            ></div>
          {/each}
        </div>
      </div>

      <div class="inspo-photos">
        <div class="inspo-frame">
          <img
            src={a.inspo.src}
            alt={a.inspo.alt}
            style:object-position={a.inspo.position}
          />
        </div>
        {#if a.inspo.src2 || a.inspo.src3}
          <div class="inspo-verticals">
            <div class="inspo-vertical-stack">
              {#if a.inspo.src2}
                <div class="inspo-frame">
                  <img src={a.inspo.src2} alt={a.inspo.alt2} />
                </div>
              {/if}
              {#if a.inspo.src3}
                <div class="inspo-frame">
                  <img src={a.inspo.src3} alt={a.inspo.alt3} />
                </div>
              {/if}
            </div>
            <div class="inspo-side-decor" aria-hidden="true">
              <img
                class="inspo-starfish"
                src="/images/canva/decor/starfish-right.png"
                alt=""
              />
              <img
                class="inspo-figurines"
                src="/images/canva/decor/attire-figurines.png"
                alt=""
              />
              <img
                class="inspo-starfish"
                src="/images/canva/decor/starfish-left.png"
                alt=""
              />
            </div>
          </div>
        {/if}
      </div>
    </div>
  {/if}
</Section>

<style>
  .attire {
    max-width: 43rem;
    margin: 0 auto;
    text-align: center;
    padding: 0 1.25rem 1rem;
  }

  .crest {
    width: clamp(9rem, 28vw, 14rem);
    height: auto;
    margin: 0 auto 1.25rem;
  }

  .level {
    font-family: var(--font-sans);
    font-size: clamp(0.85rem, 1.6vw, 1.05rem);
    letter-spacing: 0.28em;
    text-transform: uppercase;
  }

  .note {
    margin-top: 1.25rem;
    font-size: clamp(1.05rem, 2vw, 1.2rem);
    line-height: 1.6;
  }

  .inspo {
    width: min(100%, 72rem);
    margin: clamp(2rem, 5vh, 3rem) auto 0;
    padding-inline: clamp(1.25rem, 4vw, 2.5rem);
    display: grid;
    grid-template-columns: 1fr;
    gap: clamp(1.5rem, 3vw, 2.5rem);
    align-items: stretch;
  }

  .inspo-colors {
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
    width: min(100%, 22rem);
    margin-inline: auto;
    aspect-ratio: 1;
  }

  .inspo-label {
    text-align: center;
    font-family: var(--font-sans);
    font-size: clamp(0.8rem, 1.5vw, 0.95rem);
    letter-spacing: 0.28em;
    text-transform: uppercase;
    flex: 0 0 auto;
  }

  .swatches {
    flex: 1 1 auto;
    min-height: 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: 1fr;
    gap: 0.35rem;
  }

  .swatch {
    min-height: 0;
  }

  .swatch:last-child {
    grid-column: 1 / -1;
  }

  .inspo-frame {
    width: 100%;
    min-height: 0;
    overflow: hidden;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .inspo-photos {
    display: flex;
    flex-direction: column;
    gap: clamp(1rem, 2.5vh, 1.75rem);
    align-items: center;
    min-width: 0;
  }

  .inspo-verticals {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    gap: clamp(0.75rem, 2vw, 1.5rem);
    width: 100%;
    min-width: 0;
  }

  .inspo-vertical-stack {
    display: flex;
    flex-direction: column;
    gap: clamp(1rem, 2.5vh, 1.75rem);
    flex: 1 1 auto;
    min-width: 0;
  }

  .inspo-side-decor {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    flex: 0 0 auto;
    align-self: stretch;
    padding-block: clamp(2rem, 8%, 4rem);
    gap: 0.75rem;
  }

  .inspo-starfish {
    /* Maps used 4.5rem; +30% → 5.85rem */
    width: 5.85rem;
    height: auto;
    flex: 0 0 auto;
    display: block;
  }

  .inspo-figurines {
    width: min(9.5rem, 28vw);
    height: auto;
    flex: 0 0 auto;
    display: block;
  }

  .inspo-frame img {
    width: 100%;
    height: auto;
    max-height: 32rem;
    object-fit: contain;
    display: block;
  }

  @media (min-width: 800px) {
    .inspo {
      grid-template-columns: minmax(14rem, 22rem) minmax(0, 1fr);
      align-items: start;
    }

    .inspo-colors {
      width: 100%;
      margin-inline: 0;
      position: sticky;
      top: 1.5rem;
    }

    .inspo-photos {
      align-items: stretch;
    }

    .inspo-frame {
      justify-content: flex-end;
    }

    .inspo-frame img {
      max-height: 36rem;
    }

    .inspo-verticals {
      justify-content: flex-end;
    }

    .inspo-vertical-stack {
      max-width: min(100%, 28rem);
    }

    .inspo-figurines {
      width: 10.5rem;
    }
  }
</style>
