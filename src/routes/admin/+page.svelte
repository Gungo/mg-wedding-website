<script>
  import { goto } from '$app/navigation';
  import AdminPanel from '$lib/components/AdminPanel.svelte';

  let { data } = $props();

  async function handleLogout() {
    await fetch('/api/admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'logout' })
    });
    goto('/');
  }
</script>

<AdminPanel rsvps={data.rsvps} notificationEmails={data.notificationEmails} onLogout={handleLogout} />
