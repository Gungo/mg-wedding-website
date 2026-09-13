/** @typedef {'coming_soon' | 'rsvp' | 'live'} SiteState */

/**
 * coming_soon — Hero + featured photo only. No guest-info sections.
 * rsvp        — Hero + event masthead + RSVP surface (or thank-you/game).
 * live        — Full site with every enabled section.
 *
 * @type {SiteState}
 */
export const SITE_STATE = 'live';

/** When false, hide RSVP envelope/form/CTAs and show the featured photo instead. */
export const RSVP_OPEN = false;
