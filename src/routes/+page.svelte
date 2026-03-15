<script>
  import { onMount } from 'svelte';
  import Hero from '$lib/components/Hero.svelte';
  import RsvpEnvelope from '$lib/components/RsvpEnvelope.svelte';
  import ThankYou from '$lib/components/ThankYou.svelte';
  import BrickBreaker from '$lib/components/BrickBreaker.svelte';
  import AdminPasswordPrompt from '$lib/components/AdminPasswordPrompt.svelte';
  import LaceBorder from '$lib/components/LaceBorder.svelte';

  let { data } = $props();

  let showPasswordPrompt = $state(false);

  function openAdminPrompt() {
    showPasswordPrompt = true;
  }

  function handleKeydown(e) {
    if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'p') {
      e.preventDefault();
      openAdminPrompt();
    }
    if (e.key === 'Escape' && showPasswordPrompt) {
      showPasswordPrompt = false;
    }
  }

  onMount(() => {
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  });
</script>

<Hero onAdminTrigger={openAdminPrompt} />

{#if data.hasSubmitted}
  <ThankYou />
  <BrickBreaker /> 
  
{:else}
    <RsvpEnvelope />
  
{/if}

{#if showPasswordPrompt}
  <AdminPasswordPrompt onCancel={() => showPasswordPrompt = false} />
{/if}
