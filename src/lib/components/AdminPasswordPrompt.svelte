<script>
  let { onSuccess, onCancel } = $props();

  let password = $state('');
  let error = $state('');
  let loading = $state(false);
  let inputEl;

  $effect(() => {
    if (inputEl) inputEl.focus();
  });

  async function submit() {
    if (!password.trim()) return;
    loading = true;
    error = '';
    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      if (!res.ok) {
        error = 'Incorrect password';
        loading = false;
        return;
      }
      const data = await res.json();
      onSuccess(data.rsvps, password);
    } catch {
      error = 'Something went wrong';
      loading = false;
    }
  }

  function handleKeydown(e) {
    if (e.key === 'Enter') submit();
    if (e.key === 'Escape') onCancel();
  }
</script>

<!-- svelte-ignore a11y_autofocus -->
<div class="prompt-overlay" role="dialog" aria-modal="true">
  <div class="prompt-backdrop" onclick={onCancel}></div>
  <div class="prompt-box">
    <h2 class="prompt-title">Admin Access</h2>
    <div class="prompt-input-wrapper">
      <input
        class="prompt-input"
        class:prompt-input-error={error}
        type="password"
        placeholder="* * * *"
        autocomplete="off"
        bind:value={password}
        bind:this={inputEl}
        onkeydown={handleKeydown}
        disabled={loading}
      />
      {#if error}
        <p class="prompt-error">{error}</p>
      {/if}
    </div>
    <button class="prompt-submit" type="button" onclick={submit} disabled={loading}>
      {loading ? '...' : 'Enter'}
    </button>
    <button class="prompt-cancel" type="button" onclick={onCancel}>Cancel</button>
  </div>
</div>

<style>
  .prompt-overlay {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 1rem;
  }

  .prompt-backdrop {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(4px);
  }

  .prompt-box {
    position: relative;
    background: var(--color-deep-sea);
    border: 3px solid var(--color-moss-green);
    border-radius: 4px;
    padding: clamp(2.5rem, 6vh, 4rem) clamp(2rem, 6vw, 4rem);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: clamp(1.25rem, 2.5vh, 1.75rem);
    width: 100%;
    max-width: 420px;
    box-shadow: 0 0 0 6px rgba(9, 47, 51, 0.4);
  }

  .prompt-title {
    font-family: var(--font-display);
    font-weight: var(--font-weight-bold);
    font-size: clamp(1.25rem, 3vw, 1.75rem);
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--color-sand);
    text-align: center;
  }

  .prompt-input-wrapper {
    width: 100%;
    max-width: 280px;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .prompt-input {
    width: 100%;
    font-family: var(--font-body);
    font-size: clamp(1rem, 2vw, 1.25rem);
    letter-spacing: 0.3em;
    color: var(--color-sand);
    background: transparent;
    border: 1.5px solid var(--color-sand);
    border-radius: 2px;
    padding: 0.6em 0.8em;
    outline: none;
    transition: border-color var(--duration-normal) var(--ease-elegant);
  }

  .prompt-input:focus {
    border-color: var(--color-sunshine);
  }

  .prompt-input-error {
    border-color: #c44;
  }

  .prompt-input::placeholder {
    color: var(--color-sand);
    opacity: 0.4;
    letter-spacing: 0.4em;
  }

  .prompt-error {
    font-family: var(--font-body);
    font-size: 0.8rem;
    color: #e88;
    text-align: center;
  }

  .prompt-submit {
    font-family: var(--font-display);
    font-size: clamp(0.9rem, 1.8vw, 1.05rem);
    font-weight: var(--font-weight-medium);
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--color-deep-sea);
    background: var(--color-sand);
    border: none;
    border-radius: 2px;
    padding: 0.6em 2.5em;
    cursor: pointer;
    transition: opacity var(--duration-normal) var(--ease-elegant);
  }

  .prompt-submit:hover {
    opacity: 0.85;
  }

  .prompt-submit:disabled {
    opacity: 0.5;
    cursor: default;
  }

  .prompt-cancel {
    font-family: var(--font-body);
    font-size: clamp(0.8rem, 1.4vw, 0.9rem);
    color: var(--color-sand);
    background: transparent;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    transition: opacity var(--duration-normal) var(--ease-elegant);
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  .prompt-cancel:hover {
    opacity: 0.8;
  }
</style>
