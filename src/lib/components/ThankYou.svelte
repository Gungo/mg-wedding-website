<section class="thankyou-section">
  <p class="thankyou-text">Thank you for your response</p>
  <a class="edit-link" href="/rsvp">Edit Response</a>
</section>

<style>
  .thankyou-section {
    margin-top: clamp(2.5rem, 6vh, 4rem);
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
  }

  .thankyou-text {
    font-family: var(--font-display);
    font-size: clamp(1.1rem, 2.5vw, 1.5rem);
    font-style: italic;
    color: var(--color-text);
    letter-spacing: 0.02em;
    opacity: 0.7;
  }

  .edit-link {
    font-family: var(--font-body);
    font-size: clamp(0.8rem, 1.3vw, 0.9rem);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--color-text);
    opacity: 0.5;
    text-decoration: none;
    border-bottom: 1px solid currentColor;
    padding-bottom: 2px;
    transition: opacity var(--duration-normal) var(--ease-elegant);
  }

  .edit-link:hover {
    opacity: 0.85;
  }
</style>
