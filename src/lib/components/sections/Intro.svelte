<script>
  import { useI18n } from '$lib/i18n/index.svelte.js';

  const i18n = useI18n();
  const wedding = $derived(i18n.wedding);
  const ui = $derived(wedding.ui);
</script>

<section class="intro" id="intro">
  <p class="tagline">{wedding.tagline}</p>
  {#each wedding.intro as para}
    <p class="copy">{para}</p>
  {/each}
  {#if wedding.introContactHint}
    <p class="copy contact">
      *{wedding.introContactHint}
      <a
        href={ui.rsvpSoonLinkHref}
        target="_blank"
        rel="noopener noreferrer"
      >{wedding.introContactLinkLabel}</a>.*
    </p>
    {#if wedding.rsvp.password}
      <p class="copy contact password">{wedding.rsvp.password}</p>
    {/if}
  {/if}
</section>

<style>
  .intro {
    max-width: 62rem;
    margin: 0 auto;
    padding: clamp(3rem, 8vh, 5.5rem) clamp(1.25rem, 4vw, 2.5rem) 0;
    text-align: center;
  }

  .tagline {
    font-family: var(--font-display);
    font-weight: 600;
    font-size: clamp(1.35rem, 4.2vw, 2.35rem);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    line-height: 1.25;
    margin-bottom: clamp(1.5rem, 4vh, 2.25rem);
    color: var(--color-text);
  }

  .copy {
    font-size: clamp(1.05rem, 2vw, 1.25rem);
    line-height: 1.7;
    margin-bottom: 1rem;
  }

  .copy:last-child {
    margin-bottom: 0;
  }

  .contact {
    margin-top: clamp(2.75rem, 7vh, 4rem);
    font-size: clamp(1.15rem, 2.3vw, 1.4rem);
    font-weight: var(--font-weight-bold);
    letter-spacing: 0.02em;
    line-height: 1.65;
  }

  .contact.password {
    margin-top: 0.75rem;
  }

  .contact a {
    color: inherit;
    text-decoration: underline;
    text-underline-offset: 0.22em;
    text-decoration-thickness: 1.5px;
  }
</style>
