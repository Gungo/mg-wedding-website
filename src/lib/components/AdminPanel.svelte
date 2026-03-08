<section class="admin-section">
  <div class="admin-panel">
    <header class="admin-header">
      <h2 class="admin-title">Admin View</h2>
      <button class="logout-button" type="button">Log Out</button>
    </header>

    <div class="admin-content">
      <p class="admin-placeholder">Panel content will go here.</p>
    </div>
  </div>
</section>

<style>
  .admin-section {
    margin-top: clamp(3rem, 8vh, 5rem);
    width: 100%;
  }

  .admin-panel {
    background: var(--color-deep-sea);
    border: 1.5px solid var(--color-moss-green);
    border-radius: 4px;
    padding: clamp(1.5rem, 3vh, 2.5rem) clamp(1.5rem, 3vw, 2.5rem);
    display: flex;
    flex-direction: column;
    gap: clamp(1.5rem, 3vh, 2.5rem);
  }

  .admin-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .admin-title {
    font-family: var(--font-display);
    font-weight: var(--font-weight-normal);
    font-size: clamp(1.5rem, 3vw, 2rem);
    font-style: italic;
    color: var(--color-sand);
    letter-spacing: 0.02em;
  }

  .logout-button {
    font-family: var(--font-display);
    font-size: clamp(0.85rem, 1.5vw, 0.95rem);
    font-weight: var(--font-weight-medium);
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--color-sand);
    background: transparent;
    border: 1px solid var(--color-sand);
    border-radius: 2px;
    padding: 0.5em 1.5em;
    cursor: pointer;
    transition: background-color var(--duration-normal) var(--ease-elegant),
                color var(--duration-normal) var(--ease-elegant);
  }

  .logout-button:hover {
    background: var(--color-sand);
    color: var(--color-deep-sea);
  }

  .admin-content {
    min-height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .admin-placeholder {
    font-family: var(--font-body);
    font-size: clamp(0.9rem, 1.5vw, 1rem);
    color: var(--color-sand);
    opacity: 0.4;
    font-style: italic;
  }
</style>
