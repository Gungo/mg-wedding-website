<script>
  import { onMount } from 'svelte';
  import Hero from '$lib/components/Hero.svelte';
  import ComingSoonPhoto from '$lib/components/ComingSoonPhoto.svelte';
  import ThankYou from '$lib/components/ThankYou.svelte';
  import BrickBreaker from '$lib/components/BrickBreaker.svelte';
  import AdminPasswordPrompt from '$lib/components/AdminPasswordPrompt.svelte';
  import DecorBand from '$lib/components/DecorBand.svelte';
  import EventMasthead from '$lib/components/sections/EventMasthead.svelte';
  import Intro from '$lib/components/sections/Intro.svelte';
  import OurStory from '$lib/components/sections/OurStory.svelte';
  import OrderOfEvents from '$lib/components/sections/OrderOfEvents.svelte';
  import Attire from '$lib/components/sections/Attire.svelte';
  import Menu from '$lib/components/sections/Menu.svelte';
  import GettingHere from '$lib/components/sections/GettingHere.svelte';
  import Maps from '$lib/components/sections/Maps.svelte';
  import WhereToStay from '$lib/components/sections/WhereToStay.svelte';
  import ThingsToDo from '$lib/components/sections/ThingsToDo.svelte';
  import Registry from '$lib/components/sections/Registry.svelte';
  import Faq from '$lib/components/sections/Faq.svelte';
  import { RSVP_OPEN } from '$lib/config.js';

  let { data } = $props();

  let showPasswordPrompt = $state(false);
  const showMasthead = $derived(data.siteState === 'rsvp' || data.siteState === 'live');
  const showRsvp = $derived(RSVP_OPEN && data.siteState !== 'coming_soon');

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
  <EventMasthead hasSubmitted={data.hasSubmitted} showRsvp={showRsvp} />
{/if}

{#if showRsvp && data.hasSubmitted}
  <ThankYou />
{:else}
  <!-- Glacier photo stands in for the old envelope / save-the-date animation -->
  <ComingSoonPhoto />
{/if}

{#if data.sections.story}
  <OurStory />
{/if}

{#if data.sections.schedule}
  <OrderOfEvents />
{/if}

<figure class="story-still">
  <img src="/images/canva/photos/iceland.jpg" alt="Mariluz and Germán in Iceland" />
</figure>

{#if data.sections.attire}
  <Attire />
{/if}

{#if data.sections.menu}
  <Menu />
  <DecorBand src="/images/canva/decor/coral-border-mirrored.png" alt="" />
{/if}

{#if data.sections.travel}
  <GettingHere />
  <DecorBand src="/images/canva/decor/mountains.png" alt="" variant="soft" />
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

<BrickBreaker />

<DecorBand src="/images/canva/decor/waves.png" alt="" />

{#if showPasswordPrompt}
  <AdminPasswordPrompt onCancel={() => showPasswordPrompt = false} />
{/if}

<style>
  .story-still {
    width: min(100%, 420px);
    margin: clamp(2.5rem, 6vh, 4rem) auto 0;
    border: 1px solid var(--color-text);
    padding: 0.55rem;
    background: var(--color-sand-light);
  }

  .story-still img {
    width: 100%;
    height: auto;
    display: block;
  }
</style>
