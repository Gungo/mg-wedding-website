<section class="rsvp-form-section">
  <header class="form-header">
    <h2 class="form-title">Kindly Respond</h2>
    <p class="form-subtitle">Honor us in attending</p>
  </header>

  <form class="rsvp-form" on:submit|preventDefault>
    <div class="field-group">
      <label class="field-label" for="guest-name">Full Name</label>
      <input
        class="field-input"
        type="text"
        id="guest-name"
        name="guest-name"
        placeholder="Your name"
        autocomplete="name"
      />
    </div>

    <div class="field-group">
      <label class="field-label" for="guest-email">Email</label>
      <input
        class="field-input"
        type="email"
        id="guest-email"
        name="guest-email"
        placeholder="your@email.com"
        autocomplete="email"
      />
    </div>

    <fieldset class="field-group attendance-group">
      <legend class="field-label">Will you be attending?</legend>
      <div class="radio-options">
        <label class="radio-label">
          <input type="radio" name="attending" value="yes" />
          <span>Joyfully accepts</span>
        </label>
        <label class="radio-label">
          <input type="radio" name="attending" value="no" />
          <span>Respectfully declines</span>
        </label>
      </div>
    </fieldset>

    <div class="field-group">
      <label class="field-label" for="guest-count">Number of Guests</label>
      <select class="field-input field-select" id="guest-count" name="guest-count">
        <option value="1">1</option>
      </select>
    </div>

    <div class="field-group">
      <label class="field-label" for="dietary">Dietary Restrictions</label>
      <input
        class="field-input"
        type="text"
        id="dietary"
        name="dietary"
        placeholder="Allergies, vegetarian, etc."
      />
    </div>

    <div class="field-group">
      <label class="field-label" for="message">A Note for the Couple</label>
      <textarea
        class="field-input field-textarea"
        id="message"
        name="message"
        rows="3"
        placeholder="Optional message..."
      ></textarea>
    </div>

    <button class="submit-button" type="submit">Send RSVP</button>
  </form>
</section>

<style>
  .rsvp-form-section {
    margin-top: clamp(3rem, 8vh, 5rem);
    width: 100%;
  }

  .form-header {
    text-align: center;
    margin-bottom: clamp(2rem, 4vh, 3rem);
  }

  .form-title {
    font-family: var(--font-display);
    font-weight: var(--font-weight-normal);
    font-size: clamp(1.75rem, 4vw, 2.5rem);
    font-style: italic;
    color: var(--color-text);
    letter-spacing: 0.02em;
  }

  .form-subtitle {
    font-family: var(--font-body);
    font-size: clamp(0.85rem, 1.5vw, 1rem);
    color: var(--color-text-muted);
    margin-top: 0.5rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .rsvp-form {
    display: flex;
    flex-direction: column;
    gap: clamp(1.25rem, 2.5vh, 1.75rem);
    max-width: 480px;
    margin: 0 auto;
  }

  .field-group {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    border: none;
    padding: 0;
  }

  .field-label {
    font-family: var(--font-body);
    font-size: clamp(0.8rem, 1.3vw, 0.9rem);
    font-weight: var(--font-weight-medium);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--color-text);
  }

  .field-input {
    font-family: var(--font-body);
    font-size: 1rem;
    color: var(--color-text);
    background: transparent;
    border: none;
    border-bottom: 1px solid var(--color-border);
    padding: 0.6em 0;
    outline: none;
    transition: border-color var(--duration-normal) var(--ease-elegant);
    border-radius: 0;
    -webkit-appearance: none;
  }

  .field-input:focus {
    border-bottom-color: var(--color-text);
  }

  .field-input::placeholder {
    color: var(--color-border);
    font-style: italic;
  }

  .field-select {
    cursor: pointer;
    width: fit-content;
    min-width: 80px;
    padding-right: 0.5em;
  }

  .field-textarea {
    resize: vertical;
    min-height: 4rem;
    line-height: 1.5;
  }

  .attendance-group {
    margin: 0;
  }

  .radio-options {
    display: flex;
    gap: clamp(1.5rem, 4vw, 2.5rem);
    margin-top: 0.3rem;
  }

  .radio-label {
    display: flex;
    align-items: center;
    gap: 0.5em;
    font-family: var(--font-body);
    font-size: clamp(0.9rem, 1.5vw, 1.05rem);
    color: var(--color-text);
    cursor: pointer;
    font-style: italic;
  }

  .radio-label input[type="radio"] {
    accent-color: var(--color-text);
    width: 1em;
    height: 1em;
    cursor: pointer;
  }

  .submit-button {
    font-family: var(--font-display);
    font-size: clamp(0.95rem, 2vw, 1.15rem);
    font-weight: var(--font-weight-medium);
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--color-text);
    background: transparent;
    border: 1.5px solid var(--color-text);
    padding: 0.75em 2.5em;
    cursor: pointer;
    align-self: center;
    margin-top: clamp(0.5rem, 1.5vh, 1rem);
    transition: background-color var(--duration-normal) var(--ease-elegant),
                color var(--duration-normal) var(--ease-elegant);
  }

  .submit-button:hover {
    background-color: var(--color-text);
    color: var(--color-bg);
  }
</style>
