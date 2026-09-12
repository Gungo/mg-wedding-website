<script>
  import { browser } from '$app/environment';
  import {
    canLiveEdit,
    edit,
    toggleEditMode,
    saveOverrides,
    clearSelection,
    patchOverride,
    resetOverride,
    getOverride
  } from '$lib/edit/store.svelte.js';

  const available = $derived(canLiveEdit());
  const selected = $derived(edit.selectedId ? getOverride(edit.selectedId) : null);

  function onKey(e) {
    if (!available) return;
    const tag = (e.target instanceof HTMLElement ? e.target.tagName : '').toLowerCase();
    if (tag === 'input' || tag === 'textarea' || e.target?.isContentEditable) return;

    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'e') {
      e.preventDefault();
      toggleEditMode();
    }
    if (edit.on && e.key === 'Escape') {
      if (edit.selectedId) clearSelection();
      else toggleEditMode();
    }
    if (edit.on && (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 's') {
      e.preventDefault();
      saveOverrides();
    }
  }

  $effect(() => {
    if (!browser || !available) return;
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  function flip(axis) {
    if (!edit.selectedId) return;
    const cur = getOverride(edit.selectedId);
    if (axis === 'x') patchOverride(edit.selectedId, { flipX: !cur.flipX });
    else patchOverride(edit.selectedId, { flipY: !cur.flipY });
  }

  function nudgeScale(delta) {
    if (!edit.selectedId) return;
    const cur = getOverride(edit.selectedId);
    const next = Math.min(3, Math.max(0.25, (cur.scale ?? 1) + delta));
    patchOverride(edit.selectedId, { scale: Math.round(next * 100) / 100 });
  }

  function nudgeRotate(delta) {
    if (!edit.selectedId) return;
    const cur = getOverride(edit.selectedId);
    patchOverride(edit.selectedId, { rotate: Math.round((cur.rotate ?? 0) + delta) });
  }
</script>

{#if available}
  <div class="chrome" class:active={edit.on}>
    <button type="button" class="toggle" onclick={toggleEditMode}>
      {edit.on ? 'Done' : 'Edit layout'}
    </button>

    {#if edit.on}
      <div class="panel">
        <p class="hint">Drag · corner = scale · top = rotate · double-click text</p>
        <p class="keys">⌘E toggle · ⌘S save · Esc deselect</p>

        {#if edit.selectedId}
          <p class="sel">Selected: <code>{edit.selectedId}</code></p>
          <div class="row">
            <button type="button" onclick={() => flip('x')}>Flip H</button>
            <button type="button" onclick={() => flip('y')}>Flip V</button>
            <button type="button" onclick={() => nudgeScale(0.1)}>Scale +</button>
            <button type="button" onclick={() => nudgeScale(-0.1)}>Scale −</button>
            <button type="button" onclick={() => nudgeRotate(15)}>Rot +15°</button>
            <button type="button" onclick={() => nudgeRotate(-15)}>Rot −15°</button>
            <button
              type="button"
              class="danger"
              onclick={() => edit.selectedId && resetOverride(edit.selectedId)}
            >
              Reset
            </button>
          </div>
          {#if selected}
            <p class="meta">
              x {selected.x ?? 0} · y {selected.y ?? 0} · scale {selected.scale ?? 1} · rot
              {selected.rotate ?? 0}°
            </p>
          {/if}
        {:else}
          <p class="sel muted">Click an outlined item to select it</p>
        {/if}

        <div class="row save-row">
          <button
            type="button"
            class="save"
            disabled={!edit.dirty || edit.saving}
            onclick={saveOverrides}
          >
            {edit.saving ? 'Saving…' : edit.dirty ? 'Save to project' : 'Saved'}
          </button>
          {#if edit.message}
            <span class="msg">{edit.message}</span>
          {/if}
        </div>
      </div>
    {/if}
  </div>
{/if}

<style>
  .chrome {
    position: fixed;
    top: 0.85rem;
    right: 0.85rem;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.5rem;
    font-family: var(--font-sans);
  }

  .toggle,
  .panel button {
    font-family: inherit;
    font-size: 0.75rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    border: 1px solid var(--color-denim);
    background: #fff;
    color: var(--color-denim);
    padding: 0.45rem 0.75rem;
    cursor: pointer;
  }

  .toggle {
    box-shadow: 0 4px 18px rgb(9 47 51 / 0.12);
  }

  .chrome.active .toggle {
    background: var(--color-denim);
    color: #fff;
  }

  .panel {
    width: min(22rem, calc(100vw - 1.5rem));
    background: #fffefb;
    border: 1px solid var(--color-border);
    box-shadow: 0 10px 30px rgb(9 47 51 / 0.14);
    padding: 0.85rem 0.9rem;
    display: flex;
    flex-direction: column;
    gap: 0.55rem;
  }

  .hint,
  .keys,
  .sel,
  .meta,
  .msg {
    margin: 0;
    font-size: 0.72rem;
    line-height: 1.45;
    color: var(--color-text-muted);
  }

  .keys {
    opacity: 0.8;
  }

  .sel code {
    font-size: 0.7rem;
    color: var(--color-denim);
  }

  .muted {
    font-style: italic;
  }

  .row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
  }

  .panel button {
    padding: 0.35rem 0.5rem;
    background: var(--color-surface);
  }

  .panel button:disabled {
    opacity: 0.45;
    cursor: default;
  }

  .panel button.danger {
    border-color: #9b0204;
    color: #9b0204;
  }

  .save {
    background: var(--color-denim) !important;
    color: #fff !important;
    border-color: var(--color-denim) !important;
  }

  .save-row {
    align-items: center;
    margin-top: 0.15rem;
  }
</style>
