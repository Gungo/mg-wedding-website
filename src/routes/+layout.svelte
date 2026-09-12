<script>
  import '../app.css';
  import EditChrome from '$lib/components/edit/EditChrome.svelte';
  import { clearSelection, edit } from '$lib/edit/store.svelte.js';

  function onPagePointerDown(e) {
    if (!edit.on) return;
    const t = e.target;
    if (!(t instanceof Element)) return;
    if (t.closest('.editable') || t.closest('.chrome')) return;
    clearSelection();
  }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="page-shell" onpointerdown={onPagePointerDown}>
  <slot />
  <EditChrome />
</div>

<style>
  .page-shell {
    min-height: 100vh;
    width: 100%;
  }
</style>
