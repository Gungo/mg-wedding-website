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
    'Our wedding will be held at Crook Point, Oregon, nestled among the evergreens and adorned by the coastal views, on Saturday, August 7, 2027, at 3:00 PM.',
    'Please take a moment to explore this site for all the details. Your presence means the world to us.'
  ],

  event: {
    dateIso: '2027-08-07',
    dateLong: 'Saturday, August 7, 2027',
    dateShort: '08.07.27',
    time: '3:00 PM',
    venue: 'Crook Point',
    address: '',
    city: 'Crook Point, Oregon',
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
        src: '/images/canva/photos/heart-glass.jpg',
        alt: 'Mariluz and Germán kissing through a heart drawn on fogged glass'
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
        id: 'ceremony',
        name: 'Ceremony',
        time: '3:00 PM — 3:45 PM',
        place: 'Crook Point',
        icon: '/images/canva/decor/icon-ceremony.png'
      },
      {
        id: 'cocktail',
        name: 'Cocktail hour',
        time: '4:00 PM — 5:00 PM',
        place: 'Crook Point',
        icon: '/images/canva/decor/icon-cocktail.png'
      },
      {
        id: 'reception',
        name: 'Reception',
        time: '6:00 PM',
        place: 'Crook Point',
        icon: '/images/canva/decor/icon-reception.png'
      },
      {
        id: 'throwdown',
        name: 'First throwdown',
        time: '8:00 PM — 12 AM',
        place: 'Crook Point',
        icon: '/images/canva/decor/icon-throwdown.png'
      }
    ]
  },

  welcomeParty: {
    enabled: false,
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
    note:
      'We kindly ask that men wear a tuxedo and women wear a floor-length gown. We encourage you to get creative with your look, from your outfit to accessories and makeup. It’s the last month of summer, let’s really embrace its colors. Think colorful, textured, fun, bold, and sparkle. Of course white and any shade in that family like cream, ivory, off-white, champagne, eggshell, and pale vanilla are reserved for the bride & groom.',
    weather:
      'It can range from 50-70+ degrees Fahrenheit (10-21+ Celsius) at Crook Point due to the coastal climate, please dress warmly. Jacket and coat options are recommended.',
    inspo: {
      src: '/images/canva/photos/attire-inspo.png?v=premove1',
      alt: 'Colorful gown inspiration',
      /** CSS object-position — shift the collage in the right frame */
      position: 'center center',
      src2: '/images/canva/photos/attire-inspo-2.jpg',
      alt2: 'Formal attire inspiration with gowns and tuxedos',
      src3: '/images/canva/photos/attire-inspo-3.png?v=marked1',
      alt3: 'Men formal attire inspiration',
      colors: [
        { name: 'Moss Green', hex: '#4B5B34' },
        { name: 'Sky Blue', hex: '#7FC7CC' },
        { name: 'Chamomile', hex: '#FCC603' },
        { name: 'Red Wine', hex: '#9B0204' },
        { name: 'Sunshine', hex: '#EA8913' },
        { name: 'Terracotta', hex: '#AF5031' },
        { name: 'Deep Sea', hex: '#092F33' },
        { name: 'Twilight', hex: '#621E3E' }
      ]
    }
  },

  menu: {
    enabled: true,
    title: 'Menú',
    items: [
      'Harissa Braised Chuck Roast w/ Ajo Blanco and Cucumber',
      'Confit Chicken Thigh w/ Sherry Cream',
      'Rigatoni w/ Yellow Pepper Saffron Sauce',
      'Bruleed Peaches and Heirloom Tomato',
      'Confit Baby Potatoes w/ Herbs and Flowers',
      'PNW Elote: fresh corn off the cob, feta, garden herbs and flowers, truffle honey'
    ]
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
        ],
        promo: {
          headline: '20% off flights',
          codeLabel: 'Code',
          code: 'CROOKPOINT20FLIGHTS',
          routesLabel: 'Routes',
          routes: 'CEC – OAK & HHR'
        }
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
    region: 'Gold Beach',
    intro:
      'Ideally, stay within a short drive of Crook Point. Brookings and Gold Beach are the towns we recommend most. Below we will share some of our recommendations, and then a Google list of other places we found as well.',
    items: [
      {
        name: 'Gold Beach Inn / Irelands Rustic Lodges, Gold Beach',
        href: 'https://www.goldbeachinn.com/irelands-rustic-lodges/irl-rooms'
      },
      {
        name: 'The Wildflower Inn',
        href: 'https://wildflowergb.lodgify.com/en/all-properties'
      },
      {
        name: 'Pacific Reef Hotel',
        href: 'https://pacificreefhotel.com/stay/'
      },
      {
        name: 'Beach Front Inn',
        href: 'https://www.beachfrontinn.com/?utm_source=google&utm_medium=organic&utm_campaign=gbp_listing'
      },
      {
        name: 'M&G wedding stay list',
        href: 'https://maps.app.goo.gl/zdwekCt73rChkkqc7'
      }
    ]
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
        title: 'Tide Pools',
        description:
          'Crook Point sits on a wild stretch of Oregon coast. Walk the rocks, watch the spray, and take the long way along 101. A great pastime is looking for tide pools and marine life. See: Lone Ranch Beach, Enderts, Indian Sands. Use this link to plan for low tide:',
        link: {
          href: 'https://www.tidetime.org/north-america/united-states/gold-beach-rogue-river-oregon-calendar-feb.htm',
          label: 'link'
        },
        image: '/images/canva/photos/tidepools.jpg',
        imageAlt: 'Orange and purple starfish among mussels in a coastal tide pool'
      },
      {
        title: 'The redwoods',
        description:
          'The drive in from Medford dips through redwood parks. We recommend visiting Jedidiah State Park, the Grove of Titans, and exploring the area.',
        link: {
          href: 'https://redwoodparksconservancy.org/jedediah-smith-redwoods-state-park/',
          label: 'link'
        },
        image: '/images/canva/photos/redwoods.jpg',
        imageAlt: 'A path through towering redwood trees'
      },
      {
        title: 'A hike',
        description:
          'One of our favorite finds was Enderts Beach, the long walk down, coastal views, wild blackberries you can eat on the way, and the beautiful beach below.',
        links: [
          {
            href: 'https://www.google.com/maps/search/?api=1&query=Enderts%20Beach',
            label: 'link'
          },
          {
            before:
              '. Another good hike with beach and forest options is Yukor Loop Trail, ',
            href: 'https://www.nps.gov/places/yuroklooptrail.htm',
            label: 'link'
          }
        ],
        image: '/images/canva/photos/hike.jpg',
        imageAlt: 'A natural rock arch on a sandy Oregon coast beach'
      },
      {
        title: 'Town time',
        description:
          'Gold Beach and Brookings are the bases we recommend: coffee, a long lunch, and a slow afternoon before the weekend starts. Pictured: Samuel H. Boardman State Scenic Corridor.',
        image: '/images/canva/photos/boardman.jpg',
        imageAlt: 'Looking over yellow wildflowers toward natural rock arches at Samuel H. Boardman State Scenic Corridor'
      },
      {
        title: 'Pacific Sushi',
        description:
          'Pacific Sushi & Grill is a top tier sushi restaurant and a must visit local spot. While you wait or after dinner, visit the Whimsical Griffin comic shop next door and play free arcade games.',
        link: {
          href: 'https://maps.app.goo.gl/8pS84YrHZbgxYDc28',
          label: 'link'
        },
        image: '/images/canva/photos/pacific-sushi.jpg',
        imageAlt: 'Pacific Sushi & Grill restaurant sign at night'
      },
      {
        title: 'Kayaking tours',
        description:
          'Paddle past sea caves and rock arches along the coast. A few outfitters in Brookings and Gold Beach run guided trips when the water is calm. See:',
        link: {
          href: 'https://secretbeachkayaking.com/',
          label: 'link'
        },
        image: '/images/canva/photos/kayaking.jpg',
        imageAlt: 'Two kayakers in yellow kayaks paddling toward a sea arch along the Oregon coast'
      },
      {
        title: 'Local bites',
        description:
          'When hunger hits after a coastal walk, The Crazy Norwegian’s Fish & Chips is a short drive away. Indian Creek Cafe is another great option for breakfast.',
        image: '/images/canva/photos/crazy-norwegian.jpg',
        imageAlt: "The Crazy Norwegian's Fish & Chips restaurant exterior"
      },
      {
        title: 'Mount Shasta /Mossbrae Falls',
        description:
          'A short drive inland rewards you with moss-covered cliffs and a curtain of water. Worth the stop if you have an extra morning. Pictured: near Shasta-Trinity National Forest.',
        image: '/images/canva/photos/mossbrae-falls.jpg',
        imageAlt: 'Mount Shasta has been considered the root chakra of the world, and many people visit as a  personal and spiritual pilgrimage. It is also a stratovolcano as part of the cascades that form part of the ring of fire. Mossbrae falls is a waterfall inside the park.'
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
        q: "What's the weather going to be like?",
        a: 'August on the southern Oregon coast is usually mild — pack a layer for wind and evening by the water.'
      },
      {
        q: 'Is the wedding outdoors?',
        a: 'Crook Point is a coastal estate. We will share ceremony and weather backup notes as the weekend comes together.'
      },
      {
        q: 'What if I have a dietary restriction?',
        a: 'Let us know ahead of time and we will make sure to accommodate.'
      },
      {
        q: 'Do you have a registry?',
        a: 'If we do, you will find the link in the registry section on this page.'
      },
      {
        q: 'Other questions?',
        a: 'Reach out to us directly — we are happy to help.'
      }
    ]
  },

  ui: {
    langEn: 'EN',
    langEs: 'ES',
    langAria: 'Choose language',
    rsvpCta: 'Kindly RSVP',
    rsvpDone: 'You responded',
    rsvpSoon: 'RSVP coming soon',
    host: 'Host',
    date: 'Date',
    location: 'Location',
    attire: 'Attire',
    toBeAnnounced: 'To be announced',
    calendarSuffix: 'Wedding',
    and: 'and',
    inspoColors: 'Inspo colors',
    inspoOutfits: 'Inspo outfits',
    inspoPaletteAria: 'Inspiration color palette',
    thankYou: 'Thank you for your response',
    editResponse: 'Edit Response',
    rsvpTitle: 'Kindly Respond',
    rsvpTitleEdit: 'Update Your Response',
    rsvpSubtitle: 'We would be honored by your presence',
    rsvpSubtitleEdit: 'Make any changes below',
    rsvpHonor: 'Honor us in attending',
    fullName: 'Full Name',
    namePlaceholder: 'Your name',
    email: 'Email',
    attending: 'Will you be attending?',
    accepts: 'Joyfully accepts',
    declines: 'Respectfully declines',
    guestCount: 'Number of Guests',
    dietary: 'Dietary Restrictions',
    dietaryPlaceholder: 'Allergies, vegetarian, etc.',
    noteLabel: 'A Note for the Couple',
    notePlaceholder: 'Optional message...',
    sendRsvp: 'Send RSVP',
    updateRsvp: 'Update RSVP',
    goBack: 'Never mind, go back',
    rsvpBy: 'RSVP by',
    gameTitle: 'While You Wait...',
    play: 'Play',
    paused: 'Paused',
    resume: 'Resume',
    pause: 'Pause',
    youWin: 'You Win!',
    playAgain: 'Play Again',
    gameOver: 'Game Over',
    tryAgain: 'Try Again',
    levelLabel: 'Level',
    levelClear: 'Level Cleared!',
    nextLevel: 'Next Level',
    prev: 'Previous',
    next: 'Next',
    slides: 'Slides',
    slide: 'Slide',
    icelandAlt: 'Mariluz and Germán in Iceland',
    comingSoonAlt: 'Snowy mountains and glacier valley',
    shareDrinkAlt: 'Mariluz and Germán sharing a drink',
    adventureAlt: 'Adventure lies ahead',
    heroAlt: 'Coastline — Mariluz Del Pilar & Germán Ignacio',
    groceryCartAlt: 'Mariluz and Germán — let’s go get married'
  }
};
