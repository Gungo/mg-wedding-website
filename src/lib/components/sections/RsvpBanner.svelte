<script>
  import { useI18n } from '$lib/i18n/index.svelte.js';

  let { showRsvp = true, hasSubmitted = false } = $props();

  const i18n = useI18n();
  const r = $derived(i18n.wedding.rsvp);
  const e = $derived(i18n.wedding.event);
  const ui = $derived(i18n.wedding.ui);

  const dateDisplay = $derived(e.dateShort.replaceAll('.', '. '));
  const href = $derived(r.href);
  const external = $derived(/^https?:\/\//.test(r.href));
  const label = $derived(hasSubmitted && showRsvp ? ui.rsvpDone : ui.rsvpShort);
</script>

<section class="rsvp-panel" id="rsvp-cta">
  <div class="frame">
    <img
      src="/images/canva/photos/door-handle.jpg?v=orig1"
      alt={ui.rsvpPanelAlt}
    />
    <div class="overlay" aria-hidden="true"></div>
    <div class="content">
      <p class="date">{dateDisplay}</p>
      <a
        class="btn"
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
      >
        {label}
      </a>
      <div class="footer">
        <p>{r.prompt}</p>
        <p>{ui.rsvpBy} {r.deadline}</p>
        {#if r.password}
          <p>{r.password}</p>
        {/if}
      </div>
    </div>
  </div>
</section>

<style>
  .rsvp-panel {
    width: 100%;
    margin-top: clamp(1.5rem, 4vh, 2.5rem);
  }

  .frame {
    position: relative;
    width: 56%;
    margin-inline: auto;
    overflow: hidden;
    background: #1a1a1a;
  }

  img {
    width: 100%;
    height: auto;
    display: block;
  }

  .overlay {
    position: absolute;
    inset: 0;
    background:
      linear-gradient(to bottom, rgba(28, 24, 20, 0.28), transparent 28%),
      linear-gradient(to top, rgba(28, 24, 20, 0.42), transparent 36%);
    pointer-events: none;
  }

  .content {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: clamp(1rem, 3.5vw, 1.75rem) clamp(0.85rem, 3vw, 1.5rem) 0;
    text-align: center;
    pointer-events: none;
  }

  .content > * {
    pointer-events: auto;
  }

  .date {
    flex: 0 0 auto;
    font-family: var(--font-display);
    font-weight: var(--font-weight-medium);
    font-size: clamp(1.35rem, 4vw, 2.25rem);
    letter-spacing: 0.14em;
    color: #e8dfd0;
    text-shadow: 0 1px 10px rgba(20, 16, 12, 0.35);
  }

  .btn {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.55em 2em;
    border: 1.5px solid #e8dfd0;
    border-radius: 999px;
    background: transparent;
    color: #e8dfd0;
    font-family: var(--font-display);
    font-size: clamp(0.8rem, 1.8vw, 1.05rem);
    font-weight: var(--font-weight-medium);
    letter-spacing: 0.28em;
    text-transform: uppercase;
    text-decoration: none;
    text-shadow: 0 1px 8px rgba(20, 16, 12, 0.3);
    transition:
      background-color var(--duration-normal) var(--ease-elegant),
      color var(--duration-normal) var(--ease-elegant);
  }

  .btn:hover {
    background: rgba(232, 223, 208, 0.92);
    color: #2a241c;
    text-shadow: none;
  }

  .footer {
    margin-top: auto;
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    max-width: 28rem;
    padding-bottom: 0.35rem;
  }

  .footer p {
    font-family: var(--font-sans);
    font-size: clamp(0.58rem, 1.3vw, 0.72rem);
    font-weight: var(--font-weight-medium);
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #d4d3eb;
    text-shadow: 0 1px 8px rgba(20, 16, 12, 0.4);
    line-height: 1.45;
  }

  @media (min-width: 800px) {
    .frame {
      width: 40%;
    }
  }
</style>
