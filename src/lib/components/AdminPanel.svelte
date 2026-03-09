<script>
  let { rsvps: initialRsvps = [], notificationEmails: initialEmails = [], onLogout } = $props();

  let rsvps = $state(initialRsvps);
  let searchQuery = $state('');
  let filterAttending = $state('all');
  let refreshing = $state(false);

  let emails = $state(initialEmails);
  let newEmail = $state('');
  let emailLoading = $state(false);

  let filtered = $derived(() => {
    let list = rsvps;
    if (filterAttending !== 'all') {
      list = list.filter(r => r.attending === filterAttending);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(r =>
        (r.name || '').toLowerCase().includes(q) ||
        (r.email || '').toLowerCase().includes(q) ||
        (r.dietary || '').toLowerCase().includes(q) ||
        (r.message || '').toLowerCase().includes(q)
      );
    }
    return list;
  });

  let stats = $derived(() => {
    const total = rsvps.length;
    const attending = rsvps.filter(r => r.attending === 'yes').length;
    const declined = rsvps.filter(r => r.attending === 'no').length;
    return { total, attending, declined };
  });

  async function refresh() {
    refreshing = true;
    try {
      const res = await fetch('/api/admin');
      if (res.ok) {
        const data = await res.json();
        rsvps = data.rsvps;
        emails = data.emails;
      }
    } catch { /* silent */ }
    refreshing = false;
  }

  async function addEmail() {
    const trimmed = newEmail.trim();
    if (!trimmed) return;
    emailLoading = true;
    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'add_email', email: trimmed })
      });
      if (res.ok) {
        const data = await res.json();
        emails = data.emails;
        newEmail = '';
      }
    } catch { /* silent */ }
    emailLoading = false;
  }

  async function removeEmail(email) {
    emailLoading = true;
    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'remove_email', email })
      });
      if (res.ok) {
        const data = await res.json();
        emails = data.emails;
      }
    } catch { /* silent */ }
    emailLoading = false;
  }

  function handleEmailKeydown(e) {
    if (e.key === 'Enter') addEmail();
  }

  function formatDate(iso) {
    if (!iso) return '—';
    const d = new Date(iso);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }
</script>

<div class="admin-page">
  <div class="admin-panel">
    <header class="admin-header">
      <h2 class="admin-title">Guest List</h2>
      <div class="admin-actions">
        <button class="action-btn refresh-btn" type="button" onclick={refresh} disabled={refreshing}>
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </button>
        <a class="action-btn back-btn" href="/">Back</a>
        <button class="action-btn logout-btn" type="button" onclick={onLogout}>Log Out</button>
      </div>
    </header>

    <div class="stats-bar">
      <div class="stat">
        <span class="stat-number">{stats().total}</span>
        <span class="stat-label">Total</span>
      </div>
      <div class="stat stat-yes">
        <span class="stat-number">{stats().attending}</span>
        <span class="stat-label">Attending</span>
      </div>
      <div class="stat stat-no">
        <span class="stat-number">{stats().declined}</span>
        <span class="stat-label">Declined</span>
      </div>
    </div>

    <div class="controls-bar">
      <input
        class="search-input"
        type="text"
        placeholder="Search guests..."
        bind:value={searchQuery}
      />
      <select class="filter-select" bind:value={filterAttending}>
        <option value="all">All responses</option>
        <option value="yes">Attending</option>
        <option value="no">Declined</option>
      </select>
    </div>

    {#if filtered().length === 0}
      <div class="empty-state">
        <p>{rsvps.length === 0 ? 'No responses yet' : 'No matches found'}</p>
      </div>
    {:else}
      <div class="table-wrap">
        <table class="rsvp-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Attending</th>
              <th>Guests</th>
              <th>Dietary</th>
              <th>Message</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {#each filtered() as rsvp}
              <tr>
                <td class="cell-name">{rsvp.name || '—'}</td>
                <td class="cell-email">{rsvp.email || '—'}</td>
                <td>
                  <span class="badge" class:badge-yes={rsvp.attending === 'yes'} class:badge-no={rsvp.attending === 'no'}>
                    {rsvp.attending === 'yes' ? 'Yes' : 'No'}
                  </span>
                </td>
                <td class="cell-center">{rsvp.guestCount || '1'}</td>
                <td>{rsvp.dietary || '—'}</td>
                <td class="cell-message">{rsvp.message || '—'}</td>
                <td class="cell-date">{formatDate(rsvp.createdAt)}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {/if}

    <section class="notifications-section">
      <h3 class="section-title">Notification Emails</h3>
      <p class="section-desc">Get an email whenever a new RSVP comes in.</p>

      <div class="email-add-row">
        <input
          class="email-input"
          type="email"
          placeholder="email@example.com"
          bind:value={newEmail}
          onkeydown={handleEmailKeydown}
          disabled={emailLoading}
        />
        <button class="action-btn add-btn" type="button" onclick={addEmail} disabled={emailLoading || !newEmail.trim()}>
          Add
        </button>
      </div>

      {#if emails.length > 0}
        <ul class="email-list">
          {#each emails as email}
            <li class="email-item">
              <span class="email-text">{email}</span>
              <button class="remove-btn" type="button" onclick={() => removeEmail(email)} disabled={emailLoading}>
                Remove
              </button>
            </li>
          {/each}
        </ul>
      {:else}
        <p class="email-empty">No notification emails configured yet.</p>
      {/if}
    </section>
  </div>
</div>

<style>
  .admin-page {
    min-height: 100vh;
    background: var(--color-bg);
    padding: clamp(1.5rem, 4vw, 3rem);
  }

  .admin-panel {
    max-width: 1100px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: clamp(1.25rem, 2.5vh, 2rem);
  }

  .admin-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .admin-title {
    font-family: var(--font-display);
    font-weight: var(--font-weight-normal);
    font-size: clamp(1.75rem, 4vw, 2.5rem);
    font-style: italic;
    color: var(--color-text);
    letter-spacing: 0.02em;
  }

  .admin-actions {
    display: flex;
    gap: 0.75rem;
  }

  .action-btn {
    font-family: var(--font-body);
    font-size: clamp(0.75rem, 1.3vw, 0.85rem);
    font-weight: var(--font-weight-medium);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 0.5em 1.25em;
    border-radius: 2px;
    cursor: pointer;
    transition: all var(--duration-normal) var(--ease-elegant);
  }

  .refresh-btn {
    color: var(--color-text);
    background: transparent;
    border: 1px solid var(--color-border);
  }

  .refresh-btn:hover:not(:disabled) {
    border-color: var(--color-text);
  }

  .refresh-btn:disabled {
    opacity: 0.4;
    cursor: default;
  }

  .back-btn {
    color: var(--color-text);
    background: transparent;
    border: 1px solid var(--color-border);
    text-decoration: none;
  }

  .back-btn:hover {
    border-color: var(--color-text);
  }

  .logout-btn {
    color: var(--color-bg);
    background: var(--color-text);
    border: 1px solid var(--color-text);
  }

  .logout-btn:hover {
    opacity: 0.85;
  }

  .stats-bar {
    display: flex;
    gap: clamp(1rem, 3vw, 2rem);
    flex-wrap: wrap;
  }

  .stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: clamp(0.75rem, 1.5vh, 1.25rem) clamp(1.25rem, 3vw, 2rem);
    border: 1px solid var(--color-border);
    border-radius: 4px;
    min-width: 100px;
  }

  .stat-number {
    font-family: var(--font-display);
    font-size: clamp(1.5rem, 3vw, 2.25rem);
    font-weight: var(--font-weight-bold);
    color: var(--color-text);
    line-height: 1;
  }

  .stat-label {
    font-family: var(--font-body);
    font-size: clamp(0.7rem, 1.1vw, 0.8rem);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--color-text-muted);
    margin-top: 0.25rem;
  }

  .stat-yes .stat-number { color: #5a8a5a; }
  .stat-no .stat-number { color: #a06060; }

  .controls-bar {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  .search-input {
    flex: 1;
    min-width: 200px;
    font-family: var(--font-body);
    font-size: 0.9rem;
    color: var(--color-text);
    background: transparent;
    border: 1px solid var(--color-border);
    border-radius: 2px;
    padding: 0.5em 0.75em;
    outline: none;
    transition: border-color var(--duration-normal) var(--ease-elegant);
  }

  .search-input:focus {
    border-color: var(--color-text);
  }

  .search-input::placeholder {
    color: var(--color-border);
    font-style: italic;
  }

  .filter-select {
    font-family: var(--font-body);
    font-size: 0.9rem;
    color: var(--color-text);
    background: transparent;
    border: 1px solid var(--color-border);
    border-radius: 2px;
    padding: 0.5em 0.75em;
    cursor: pointer;
    outline: none;
  }

  .empty-state {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 200px;
  }

  .empty-state p {
    font-family: var(--font-body);
    font-size: 1rem;
    color: var(--color-text-muted);
    font-style: italic;
  }

  .table-wrap {
    overflow-x: auto;
    border: 1px solid var(--color-border);
    border-radius: 4px;
  }

  .rsvp-table {
    width: 100%;
    border-collapse: collapse;
    font-family: var(--font-body);
    font-size: clamp(0.8rem, 1.3vw, 0.9rem);
  }

  .rsvp-table th {
    font-weight: var(--font-weight-medium);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-size: clamp(0.7rem, 1.1vw, 0.78rem);
    color: var(--color-text-muted);
    padding: 0.75em 1em;
    text-align: left;
    border-bottom: 2px solid var(--color-border);
    white-space: nowrap;
  }

  .rsvp-table td {
    padding: 0.65em 1em;
    color: var(--color-text);
    border-bottom: 1px solid var(--color-border);
    vertical-align: top;
  }

  .rsvp-table tbody tr:last-child td {
    border-bottom: none;
  }

  .rsvp-table tbody tr:hover {
    background: rgba(0, 0, 0, 0.03);
  }

  .cell-name {
    font-weight: var(--font-weight-medium);
    white-space: nowrap;
  }

  .cell-email {
    white-space: nowrap;
    opacity: 0.8;
  }

  .cell-center {
    text-align: center;
  }

  .cell-message {
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .cell-date {
    white-space: nowrap;
    opacity: 0.6;
    font-size: 0.85em;
  }

  .badge {
    display: inline-block;
    padding: 0.2em 0.6em;
    border-radius: 2px;
    font-size: 0.8em;
    font-weight: var(--font-weight-medium);
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  .badge-yes {
    background: rgba(90, 138, 90, 0.15);
    color: #5a8a5a;
  }

  .badge-no {
    background: rgba(160, 96, 96, 0.15);
    color: #a06060;
  }

  /* ── Notifications Section ── */

  .notifications-section {
    margin-top: clamp(1rem, 2vh, 1.5rem);
    padding-top: clamp(1.25rem, 2.5vh, 2rem);
    border-top: 1px solid var(--color-border);
  }

  .section-title {
    font-family: var(--font-display);
    font-weight: var(--font-weight-normal);
    font-size: clamp(1.25rem, 2.5vw, 1.5rem);
    font-style: italic;
    color: var(--color-text);
    letter-spacing: 0.02em;
  }

  .section-desc {
    font-family: var(--font-body);
    font-size: clamp(0.8rem, 1.3vw, 0.88rem);
    color: var(--color-text-muted);
    margin-top: 0.25rem;
  }

  .email-add-row {
    display: flex;
    gap: 0.5rem;
    margin-top: clamp(0.75rem, 1.5vh, 1rem);
    max-width: 480px;
  }

  .email-input {
    flex: 1;
    font-family: var(--font-body);
    font-size: 0.9rem;
    color: var(--color-text);
    background: transparent;
    border: 1px solid var(--color-border);
    border-radius: 2px;
    padding: 0.5em 0.75em;
    outline: none;
    transition: border-color var(--duration-normal) var(--ease-elegant);
  }

  .email-input:focus {
    border-color: var(--color-text);
  }

  .email-input::placeholder {
    color: var(--color-border);
    font-style: italic;
  }

  .add-btn {
    color: var(--color-bg);
    background: var(--color-text);
    border: 1px solid var(--color-text);
  }

  .add-btn:hover:not(:disabled) {
    opacity: 0.85;
  }

  .add-btn:disabled {
    opacity: 0.4;
    cursor: default;
  }

  .email-list {
    list-style: none;
    padding: 0;
    margin: clamp(0.75rem, 1.5vh, 1rem) 0 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    max-width: 480px;
  }

  .email-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5em 0.75em;
    border: 1px solid var(--color-border);
    border-radius: 2px;
  }

  .email-text {
    font-family: var(--font-body);
    font-size: 0.9rem;
    color: var(--color-text);
  }

  .remove-btn {
    font-family: var(--font-body);
    font-size: 0.75rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #a06060;
    background: transparent;
    border: none;
    cursor: pointer;
    opacity: 0.7;
    transition: opacity var(--duration-normal) var(--ease-elegant);
  }

  .remove-btn:hover:not(:disabled) {
    opacity: 1;
  }

  .remove-btn:disabled {
    opacity: 0.3;
    cursor: default;
  }

  .email-empty {
    font-family: var(--font-body);
    font-size: 0.85rem;
    color: var(--color-text-muted);
    font-style: italic;
    margin-top: 0.75rem;
  }

  @media (max-width: 640px) {
    .rsvp-table th:nth-child(5),
    .rsvp-table td:nth-child(5),
    .rsvp-table th:nth-child(6),
    .rsvp-table td:nth-child(6) {
      display: none;
    }
  }
</style>
