<script>
  import { useI18n } from '$lib/i18n/index.svelte.js';

  const i18n = useI18n();
  const wedding = $derived(i18n.wedding);
  const ui = $derived(wedding.ui);
  const todo = $derived(wedding.todo);
</script>

<section class="intro" id="intro">
  <p class="tagline">{wedding.tagline}</p>
  {#each wedding.intro as para}
    <p class="copy">{para}</p>
  {/each}

  {#if todo}
    <div class="todo" id="todo">
      <p class="todo-title">{todo.title}</p>
      <div class="todo-items">
        <a
          class="todo-item"
          href={ui.rsvpSoonLinkHref}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span class="num">1</span>
          <span class="label">{todo.contact}</span>
          <span class="action">{todo.contactAction} ↗</span>
        </a>
        <a class="todo-item" href="#rsvp-cta">
          <span class="num">2</span>
          <span class="label">{todo.rsvp}</span>
          <span class="sub">{todo.rsvpDue} {wedding.rsvp.deadline}</span>
          <span class="action">{todo.rsvpAction} ↓</span>
        </a>
      </div>
      <p class="todo-note">{todo.note}</p>
    </div>
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

  .todo {
    max-width: 44rem;
    margin: clamp(2.5rem, 6vh, 3.5rem) auto 0;
    padding: clamp(1.5rem, 4vw, 2.25rem) clamp(1rem, 3vw, 2rem);
    border: 1.5px solid var(--color-text);
    background: var(--color-surface);
  }

  .todo-title {
    font-family: var(--font-display);
    font-weight: var(--font-weight-bold);
    font-size: clamp(1.15rem, 3vw, 1.6rem);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    line-height: 1.3;
  }

  .todo-items {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    margin-top: clamp(1.25rem, 3vh, 1.75rem);
  }

  .todo-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.35rem;
    padding: 1.25rem 1rem;
    border: 1px solid var(--color-border);
    background: var(--color-bg);
    color: var(--color-text);
    text-decoration: none;
    transition:
      border-color var(--duration-normal) var(--ease-elegant),
      transform var(--duration-normal) var(--ease-elegant);
  }

  .todo-item:hover {
    border-color: var(--color-text);
    transform: translateY(-2px);
  }

  .num {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.1rem;
    height: 2.1rem;
    border-radius: 50%;
    background: var(--color-text);
    color: var(--color-cream);
    font-weight: var(--font-weight-bold);
    font-size: 1.1rem;
  }

  .label {
    font-size: clamp(1.1rem, 2.2vw, 1.3rem);
    font-weight: var(--font-weight-bold);
    line-height: 1.35;
  }

  .sub {
    font-size: 0.95rem;
    color: var(--color-text-muted);
  }

  .action {
    margin-top: auto;
    padding: 0.45em 1.4em;
    border: 1.5px solid var(--color-text);
    border-radius: 999px;
    font-size: 0.85rem;
    font-weight: var(--font-weight-medium);
    letter-spacing: 0.18em;
    text-transform: uppercase;
    transition:
      background-color var(--duration-normal) var(--ease-elegant),
      color var(--duration-normal) var(--ease-elegant);
  }

  .todo-item:hover .action {
    background: var(--color-text);
    color: var(--color-cream);
  }

  .todo-note {
    margin-top: 1.1rem;
    font-size: clamp(1rem, 1.8vw, 1.15rem);
    font-style: italic;
    color: var(--color-text-muted);
  }

  @media (min-width: 640px) {
    .todo-items {
      grid-template-columns: 1fr 1fr;
    }
  }
</style>
