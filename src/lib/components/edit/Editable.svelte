<script>
  import {
    edit,
    getOverride,
    patchOverride,
    setOverride,
    selectEditable,
    overrideStyle
  } from '$lib/edit/store.svelte.js';

  let {
    id,
    type = 'decor',
    class: className = '',
    text = '',
    children
  } = $props();

  const o = $derived(getOverride(id));
  const selected = $derived(edit.on && edit.selectedId === id);
  const style = $derived(overrideStyle(o));
  const displayText = $derived(o.text ?? text);

  let rootEl = $state(/** @type {HTMLElement | null} */ (null));
  let editingText = $state(false);

  /** @type {'drag' | 'scale' | 'rotate' | null} */
  let mode = $state(null);
  let startX = 0;
  let startY = 0;
  let startVal = /** @type {Record<string, number>} */ ({});

  function onSelect(e) {
    if (!edit.on) return;
    e.stopPropagation();
    selectEditable(id);
  }

  function startDrag(e) {
    if (!edit.on || type === 'text') return;
    if (e.target instanceof HTMLElement && e.target.classList.contains('handle')) return;
    e.preventDefault();
    e.stopPropagation();
    selectEditable(id);
    mode = 'drag';
    startX = e.clientX;
    startY = e.clientY;
    startVal = { x: o.x ?? 0, y: o.y ?? 0 };
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  }

  function startScale(e) {
    if (!edit.on) return;
    e.preventDefault();
    e.stopPropagation();
    selectEditable(id);
    mode = 'scale';
    startX = e.clientX;
    startVal = { scale: o.scale ?? 1 };
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  }

  function startRotate(e) {
    if (!edit.on || !rootEl) return;
    e.preventDefault();
    e.stopPropagation();
    selectEditable(id);
    mode = 'rotate';
    const rect = rootEl.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    startVal = {
      cx,
      cy,
      rotate: o.rotate ?? 0,
      angle0: Math.atan2(e.clientY - cy, e.clientX - cx)
    };
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  }

  /** @param {PointerEvent} e */
  function onPointerMove(e) {
    if (!mode) return;
    if (mode === 'drag') {
      patchOverride(id, {
        x: Math.round(startVal.x + (e.clientX - startX)),
        y: Math.round(startVal.y + (e.clientY - startY))
      });
    } else if (mode === 'scale') {
      const next = Math.min(3, Math.max(0.25, startVal.scale + (e.clientX - startX) / 160));
      patchOverride(id, { scale: Math.round(next * 100) / 100 });
    } else if (mode === 'rotate') {
      const angle = Math.atan2(e.clientY - startVal.cy, e.clientX - startVal.cx);
      const deg = ((angle - startVal.angle0) * 180) / Math.PI;
      patchOverride(id, { rotate: Math.round(startVal.rotate + deg) });
    }
  }

  function onPointerUp() {
    mode = null;
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('pointerup', onPointerUp);
  }

  function onDblClick(e) {
    if (!edit.on || type !== 'text') return;
    e.preventDefault();
    e.stopPropagation();
    editingText = true;
    queueMicrotask(() => {
      const el = rootEl?.querySelector('[data-text]');
      if (el instanceof HTMLElement) {
        el.focus();
        const range = document.createRange();
        range.selectNodeContents(el);
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(range);
      }
    });
  }

  function commitText(e) {
    if (!editingText) return;
    editingText = false;
    const value = (e.currentTarget.textContent ?? '').replace(/\u00a0/g, ' ').trim();
    const cur = { ...getOverride(id) };
    if (!value || value === text) {
      delete cur.text;
      setOverride(id, Object.keys(cur).length ? cur : null);
      return;
    }
    patchOverride(id, { text: value });
  }

  function onTextKeydown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      e.currentTarget.blur();
    }
    if (e.key === 'Escape') {
      editingText = false;
      e.currentTarget.textContent = displayText;
      e.currentTarget.blur();
    }
  }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  bind:this={rootEl}
  class="editable {className}"
  class:is-edit={edit.on}
  class:is-selected={selected}
  class:is-text={type === 'text'}
  style:translate={style.translate}
  style:rotate={style.rotate}
  style:scale={style.scale}
  role={edit.on ? 'button' : undefined}
  tabindex={edit.on ? 0 : undefined}
  onclick={onSelect}
  onpointerdown={type === 'decor' ? startDrag : undefined}
  ondblclick={onDblClick}
  onkeydown={(e) => {
    if (edit.on && (e.key === 'Enter' || e.key === ' ')) onSelect(e);
  }}
>
  {#if type === 'text'}
    {#if editingText}
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <span
        data-text
        class="text-edit"
        contenteditable="true"
        onblur={commitText}
        onkeydown={onTextKeydown}
      >{displayText}</span>
    {:else}
      <span data-text>{displayText}</span>
    {/if}
  {:else}
    {@render children?.()}
  {/if}

  {#if selected && type === 'decor'}
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <span class="handle handle-rotate" onpointerdown={startRotate} title="Rotate"></span>
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <span class="handle handle-scale" onpointerdown={startScale} title="Scale"></span>
  {/if}
</div>

<style>
  .editable {
    transform-origin: center center;
  }

  .editable.is-edit {
    cursor: grab;
    outline: 1px dashed transparent;
    outline-offset: 4px;
  }

  .editable.is-edit.is-text {
    cursor: text;
  }

  .editable.is-edit:hover {
    outline-color: color-mix(in srgb, var(--color-denim) 35%, transparent);
  }

  .editable.is-selected {
    outline: 1.5px solid var(--color-denim);
    outline-offset: 4px;
    z-index: 5;
  }

  .editable.is-edit:active {
    cursor: grabbing;
  }

  .text-edit {
    outline: none;
  }

  .handle {
    position: absolute;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #fff;
    border: 2px solid var(--color-denim);
    box-shadow: 0 1px 3px rgb(0 0 0 / 0.2);
    z-index: 6;
    pointer-events: auto;
  }

  .handle-scale {
    right: -6px;
    bottom: -6px;
    cursor: nwse-resize;
  }

  .handle-rotate {
    left: 50%;
    top: -22px;
    transform: translateX(-50%);
    cursor: grab;
  }

  .handle-rotate::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 100%;
    width: 1px;
    height: 10px;
    background: var(--color-denim);
    transform: translateX(-50%);
  }
</style>
