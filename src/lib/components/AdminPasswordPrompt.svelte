<div class="prompt-overlay">
  <div class="prompt-box">
    <h2 class="prompt-title">Insert Password</h2>
    <div class="prompt-input-wrapper">
      <input
        class="prompt-input"
        type="password"
        placeholder="* * * *"
        autocomplete="off"
      />
    </div>
    <button class="prompt-submit" type="button">Enter</button>
    <button class="prompt-cancel" type="button">Cancel</button>
  </div>
</div>

<style>
  .prompt-overlay {
    width: 100%;
    margin-top: clamp(3rem, 8vh, 5rem);
    display: flex;
    justify-content: center;
  }

  .prompt-box {
    background: var(--color-deep-sea);
    border: 3px solid var(--color-moss-green);
    border-radius: 4px;
    padding: clamp(2.5rem, 6vh, 4rem) clamp(2rem, 6vw, 4rem);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: clamp(1.25rem, 2.5vh, 1.75rem);
    width: 100%;
    max-width: 480px;
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
    max-width: 320px;
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

  .prompt-input::placeholder {
    color: var(--color-sand);
    opacity: 0.4;
    letter-spacing: 0.4em;
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
    transition: background-color var(--duration-normal) var(--ease-elegant),
                opacity var(--duration-normal) var(--ease-elegant);
  }

  .prompt-submit:hover {
    opacity: 0.85;
  }

  .prompt-cancel {
    font-family: var(--font-body);
    font-size: clamp(0.8rem, 1.4vw, 0.9rem);
    font-weight: var(--font-weight-normal);
    letter-spacing: 0.1em;
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
