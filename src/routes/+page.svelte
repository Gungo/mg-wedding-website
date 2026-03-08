<script>
  import { onMount } from 'svelte';
  import Hero from '$lib/components/Hero.svelte';
  import RsvpEnvelope from '$lib/components/RsvpEnvelope.svelte';
  import ThankYou from '$lib/components/ThankYou.svelte';
  import BrickBreaker from '$lib/components/BrickBreaker.svelte';
  import AdminPasswordPrompt from '$lib/components/AdminPasswordPrompt.svelte';
  import AdminPanel from '$lib/components/AdminPanel.svelte';

  let { data } = $props();

  let showPasswordPrompt = $state(false);
  let showAdmin = $state(false);
  let adminRsvps = $state([]);
  let adminPassword = $state('');

  function handleKeydown(e) {
    if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'p') {
      e.preventDefault();
      if (!showAdmin) showPasswordPrompt = true;
    }
    if (e.key === 'Escape') {
      if (showPasswordPrompt) showPasswordPrompt = false;
    }
  }

  function handleAdminSuccess(rsvps, pw) {
    adminRsvps = rsvps;
    adminPassword = pw;
    showPasswordPrompt = false;
    showAdmin = true;
  }

  function handleLogout() {
    showAdmin = false;
    adminRsvps = [];
    adminPassword = '';
  }

  onMount(() => {
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  });
</script>

<Hero />

{#if data.hasSubmitted}
  <ThankYou />
  <BrickBreaker />
{:else}
  <RsvpEnvelope />
{/if}

{#if showPasswordPrompt}
  <AdminPasswordPrompt
    onSuccess={handleAdminSuccess}
    onCancel={() => showPasswordPrompt = false}
  />
{/if}

{#if showAdmin}
  <AdminPanel
    rsvps={adminRsvps}
    password={adminPassword}
    onLogout={handleLogout}
  />
{/if}
