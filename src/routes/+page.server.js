import { SITE_STATE } from '$lib/config.js';
import { wedding } from '$lib/content/wedding.js';

export function load({ locals }) {
  const live = SITE_STATE === 'live';
  return {
    hasSubmitted: locals.hasSubmitted,
    siteState: SITE_STATE,
    sections: {
      story: live && wedding.story.enabled,
      schedule: live && wedding.schedule.enabled,
      welcomeParty: live && wedding.welcomeParty.enabled,
      attire: live && wedding.attire.enabled,
      travel: live && wedding.travel.enabled,
      maps: live && wedding.maps.enabled,
      stay: live && wedding.stay.enabled,
      thingsToDo: live && wedding.thingsToDo.enabled,
      registry: live && wedding.registry.enabled,
      faq: live && wedding.faq.enabled
    }
  };
}
