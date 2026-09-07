/**
 * Guest-facing copy, images, and section flags.
 * Canva template assets live in /images/canva/.
 */
export const wedding = {
  couple: {
    nameOne: 'Mariluz Del Pilar',
    nameTwo: 'Germán Ignacio',
    short: 'Mariluz & Germán',
    hosts: 'Mariluz Del Pilar & Germán Ignacio'
  },

  tagline: 'Come for the party, stay for the perreo!',
  intro: [
    'We are so excited to celebrate our special day with you.',
    'Our wedding will be held at Crook Point, Oregon, nestled among the evergreens, on Saturday, August 7, 2027, at 3:00 PM.',
    'Please take a moment to explore this site for all the details — and most importantly, don’t forget to RSVP. Your presence means the world to us.'
  ],

  event: {
    dateIso: '2027-08-07',
    dateLong: 'Saturday, August 7, 2027',
    dateShort: '08.07.27',
    time: '3:00 PM',
    venue: 'Crook Point',
    address: '',
    city: 'Oregon',
    mapUrl: 'https://maps.google.com/?q=Crook+Point+Oregon',
    attire: 'Black tie'
  },

  rsvp: {
    deadline: 'May 1, 2027',
    href: '/rsvp',
    prompt: 'Let us know if you can make it!'
  },

  story: {
    enabled: true,
    title: 'Our Love Story',
    words: [
      'Bus loop',
      'Friendship',
      'Laughs',
      'Fling',
      'Season 1',
      'Love',
      'Rekindling',
      'Covid',
      'Season 2',
      'Reconstruction',
      'Transcendence',
      'Exploration',
      'Season 3',
      'Fin',
      'Trust',
      'Commitment',
      'Unconditional',
      'Ever after…'
    ],
    photos: [
      {
        src: '/images/canva/photos/jukebox.jpg',
        alt: 'Mariluz and Germán kissing beside a jukebox'
      },
      {
        src: '/images/canva/photos/kiss.jpg',
        alt: 'Mariluz and Germán in motion, kissing'
      }
    ]
  },

  schedule: {
    enabled: true,
    title: 'Order of Events',
    note: 'Para los locos: anyone still partying after 1 AM is welcome to continue the festivities with us down by the beach and private lawn at Crook House.',
    items: [
      {
        name: 'Ceremony',
        time: '3:00 PM — 3:45 PM',
        place: 'Crook Point',
        icon: '/images/canva/decor/icon-ceremony.png'
      },
      {
        name: 'Cocktail hour',
        time: '4:00 PM — 5:00 PM',
        place: 'Crook Point',
        icon: '/images/canva/decor/icon-cocktail.png'
      },
      {
        name: 'Reception',
        time: '6:00 PM',
        place: 'Crook Point',
        icon: '/images/canva/decor/icon-reception.png'
      },
      {
        name: 'First throwdown',
        time: '8:00 PM — 12 AM',
        place: 'Crook Point',
        icon: '/images/canva/decor/icon-throwdown.png'
      }
    ]
  },

  welcomeParty: {
    enabled: true,
    title: 'welcome party',
    intro: 'Please join us for drinks and a toast to kick off the weekend.',
    date: 'Friday, August 6, 2027',
    time: 'Evening — time to follow',
    venue: 'To be announced',
    address: '',
    attire: 'Cocktail',
    attireNote:
      'We kindly suggest that men wear a dress shirt with a blazer and women wear a midi or maxi dress, or dressy separates.',
    image: '/images/canva/photos/iceland.jpg',
    imageAlt: 'Mariluz and Germán in Iceland'
  },

  attire: {
    enabled: true,
    title: 'Attire',
    level: 'Black tie',
    note: 'We kindly ask that men wear a tuxedo and women wear a floor-length gown.'
  },

  travel: {
    enabled: true,
    title: 'Getting Here',
    intro:
      'Crook Point, OR is a huge preserved estate between two coastal cities:',
    towns: [
      { name: 'Brookings, OR', note: 'Approx. 15–20 min from Crook Point' },
      { name: 'Gold Beach, OR', note: 'Approx. 20 min from Crook Point' },
      { name: 'Crescent City, CA', note: 'On the southern border, 40–50 min from Crook Point' }
    ],
    recommend: 'All three cities are great stays. We particularly recommend Gold Beach and Brookings.',
    connections: [
      {
        title: 'Connection 1 / Conexión 1',
        steps: [
          'Fly to San Francisco Airport, CA (SFO)',
          'Transfer to Oakland (OAK) — about 1 hour 15 min drive or 1 hour 30 min train',
          'Fly from Oakland (OAK) to Crescent City Airport (CEC), CA',
          'Drive 40–50 minutes to Brookings or Gold Beach, OR'
        ]
      },
      {
        title: 'Connection 2 / Conexión 2',
        steps: [
          'Fly to Medford Airport, OR (MFR)',
          'About a 3 hour drive from Medford through the redwoods (a short dip into California) to Brookings or Gold Beach',
          'About 2.5 hours to Crescent City, CA'
        ]
      }
    ]
  },

  stay: {
    enabled: true,
    title: 'Where to Stay',
    place: 'Brookings',
    region: 'Oregon',
    intro:
      'Ideally, stay within a short drive of Crook Point — Brookings and Gold Beach are the towns we recommend most.',
    items: []
  },

  maps: {
    enabled: true,
    title: 'Maps',
    items: [
      {
        src: '/images/canva/photos/map-region.jpg',
        alt: 'Regional map of the southern Oregon and northern California coast, with Crook Point starred'
      },
      {
        src: '/images/canva/photos/map-local.jpg',
        alt: 'Local map of Crook Point venues along the coast'
      }
    ]
  },

  thingsToDo: {
    enabled: true,
    title: 'Things to Do',
    items: [
      {
        title: 'The water',
        description:
          'Crook Point sits on a wild stretch of Oregon coast. Walk the rocks, watch the spray, and take the long way along 101.',
        image: '/images/main/hero.png',
        imageAlt: 'Ocean water rushing over dark rocks'
      },
      {
        title: 'The redwoods',
        description:
          'The drive in from Medford dips through redwood parks. Build in time to pull over — it is half the reason for Connection 2.',
        image: '/images/canva/photos/iceland.jpg',
        imageAlt: 'Mariluz and Germán in a snowy landscape'
      },
      {
        title: 'Town time',
        description:
          'Gold Beach and Brookings are the bases we recommend — coffee, a long lunch, and a slow afternoon before the weekend starts.',
        image: '/images/canva/photos/grocery-cart.jpg',
        imageAlt: 'Mariluz and Germán in a grocery store, wedding-dress cart ride'
      }
    ]
  },

  registry: {
    enabled: true,
    note: 'Your presence is the greatest gift. If you wish to honor us with something more, we will share a registry here.',
    url: '',
    label: 'Registry'
  },

  faq: {
    enabled: true,
    title: '?',
    items: [
      {
        q: "What's the wedding attire?",
        a: 'The wedding is black tie. We kindly ask that men wear a tuxedo and women wear a floor-length gown.'
      },
      {
        q: 'If I already RSVP’d on the Save the Date, do I need to RSVP again?',
        a: 'Yes, please — this site is the official headcount.'
      },
      {
        q: 'When should I RSVP by?',
        a: 'Kindly respond by May 1, 2027.'
      },
      {
        q: "What's the weather going to be like?",
        a: 'August on the southern Oregon coast is usually mild — pack a layer for wind and evening by the water.'
      },
      {
        q: 'Is the wedding outdoors?',
        a: 'Crook Point is a coastal estate. We will share ceremony and weather backup notes as the weekend comes together.'
      },
      {
        q: 'What if I have a dietary restriction?',
        a: 'Include it when you RSVP and we will make sure to accommodate.'
      },
      {
        q: 'Do you have a registry?',
        a: 'If we do, you will find the link in the registry section on this page.'
      },
      {
        q: 'Other questions?',
        a: 'Send us a note through your RSVP, or reach out to us directly.'
      }
    ]
  }
};
