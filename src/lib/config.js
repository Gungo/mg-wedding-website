/** @typedef {'coming_soon' | 'rsvp' | 'live'} SiteState */

/**
 * coming_soon — Hero + envelope (or thank-you/game). No guest-info sections.
 * rsvp        — Hero + event masthead + envelope (or thank-you/game).
 * live        — Full site: masthead, envelope, and every enabled section.
 *
 * @type {SiteState}
 */
export const SITE_STATE = 'live';
