<script>
  import { onMount } from 'svelte';
  import Hero from '$lib/components/Hero.svelte';
  import RsvpEnvelope from '$lib/components/RsvpEnvelope.svelte';
  import ThankYou from '$lib/components/ThankYou.svelte';
  import BrickBreaker from '$lib/components/BrickBreaker.svelte';
  import AdminPasswordPrompt from '$lib/components/AdminPasswordPrompt.svelte';
  import DecorBand from '$lib/components/DecorBand.svelte';
  import EventMasthead from '$lib/components/sections/EventMasthead.svelte';
  import Intro from '$lib/components/sections/Intro.svelte';
  import OurStory from '$lib/components/sections/OurStory.svelte';
  import OrderOfEvents from '$lib/components/sections/OrderOfEvents.svelte';
  import WelcomeParty from '$lib/components/sections/WelcomeParty.svelte';
  import Attire from '$lib/components/sections/Attire.svelte';
  import GettingHere from '$lib/components/sections/GettingHere.svelte';
  import Maps from '$lib/components/sections/Maps.svelte';
  import WhereToStay from '$lib/components/sections/WhereToStay.svelte';
  import ThingsToDo from '$lib/components/sections/ThingsToDo.svelte';
  import Registry from '$lib/components/sections/Registry.svelte';
  import Faq from '$lib/components/sections/Faq.svelte';
  import RsvpBanner from '$lib/components/sections/RsvpBanner.svelte';

  let { data } = $props();

  let showPasswordPrompt = $state(false);
  const showMasthead = $derived(data.siteState === 'rsvp' || data.siteState === 'live');

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

{#if showMasthead}
  <Intro />
  <EventMasthead hasSubmitted={data.hasSubmitted} />
{/if}

{#if data.hasSubmitted}
  <ThankYou />
  <BrickBreaker />
{:else}
  <RsvpEnvelope />
{/if}

{#if data.sections.story}
  <OurStory />
{/if}

{#if data.sections.schedule}
  <OrderOfEvents />
{/if}

{#if data.sections.welcomeParty}
  <WelcomeParty />
{/if}

{#if data.sections.attire}
  <Attire />
  <DecorBand src="/images/canva/decor/coral-border.png" alt="" />
{/if}

{#if data.sections.travel}
  <GettingHere />
  <DecorBand src="/images/canva/decor/mountains.png" alt="" />
{/if}

{#if data.sections.maps}
  <Maps />
{/if}

{#if data.sections.stay}
  <WhereToStay />
  <DecorBand src="/images/canva/decor/coastline.png" alt="" />
{/if}

{#if data.sections.thingsToDo}
  <ThingsToDo />
{/if}

{#if data.sections.registry}
  <Registry />
{/if}

{#if data.sections.faq}
  <Faq />
{/if}

{#if !data.hasSubmitted}
  <RsvpBanner />
{/if}

<DecorBand src="/images/canva/decor/waves.png" alt="" />

{#if showPasswordPrompt}
  <AdminPasswordPrompt onCancel={() => showPasswordPrompt = false} />
{/if}
