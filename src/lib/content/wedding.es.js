/**
 * Spanish guest-facing copy (casual Venezuelan / Nicaraguan / Colombian).
 * Image paths and flags stay in sync with the English wedding.js file.
 */
export const wedding = {
  couple: {
    nameOne: 'Mariluz Del Pilar',
    nameTwo: 'Germán Ignacio',
    short: 'Mariluz & Germán',
    hosts: 'Mariluz Del Pilar & Germán Ignacio'
  },

  tagline: 'Vengan pa la fiesta, quédense pal perreo',
  intro: [
    'Estamos súper emocionados de celebrar este día especial con ustedes.',
    'La boda es en Crook Point, Oregon, rodeado entre los pinos y adornado por la costa, el Sábado 7 de Agosto de 2027 a las 3:00 p.m.',
    'Usen esta página para ver todos los detalles. Que estén ahí significa todo para nosotros.'
  ],

  event: {
    dateIso: '2027-08-07',
    dateLong: 'Sábado 7 de agosto de 2027',
    dateShort: '08.07.27',
    time: '3:00 p.m.',
    venue: 'Crook Point',
    address: '',
    city: 'Crook Point, Oregon',
    mapUrl: 'https://maps.google.com/?q=Crook+Point+Oregon',
    attire: 'Etiqueta (black tie)'
  },

  rsvp: {
    deadline: '1 de mayo de 2027',
    href: '/rsvp',
    prompt: '¡Cuéntenos si pueden venir!'
  },

  story: {
    enabled: true,
    title: 'Nuestra historia',
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
        alt: 'Mariluz y Germán besándose a través de un corazón dibujado en el vidrio empañado'
      },
      {
        src: '/images/canva/photos/kiss.jpg',
        alt: 'Mariluz y Germán en movimiento, besándose'
      }
    ]
  },

  schedule: {
    enabled: true,
    title: 'Programa',
    note: 'Para los locos: si a las 12 a.m. todavía están de rumba, los invitamos a seguir la fiesta con nosotros en la playa y el jardín privado de Crook House.',
    items: [
      {
        id: 'ceremony',
        name: 'Ceremonia',
        time: '3:00 p.m. — 3:45 p.m.',
        place: 'Crook Point',
        icon: '/images/canva/decor/icon-ceremony.png'
      },
      {
        id: 'cocktail',
        name: 'Hora del cóctel',
        time: '4:00 p.m. — 5:00 p.m.',
        place: 'Crook Point',
        icon: '/images/canva/decor/icon-cocktail.png'
      },
      {
        id: 'reception',
        name: 'Recepción',
        time: '6:00 p.m.',
        place: 'Crook Point',
        icon: '/images/canva/decor/icon-reception.png'
      },
      {
        id: 'throwdown',
        name: 'Primer throwdown',
        time: '8:00 p.m. — 12 a.m.',
        place: 'Crook Point',
        icon: '/images/canva/decor/icon-throwdown.png'
      }
    ]
  },

  welcomeParty: {
    enabled: false,
    title: 'fiesta de bienvenida',
    intro: 'Los invitamos a unos tragos y un brindis para abrir el fin de semana.',
    date: 'Viernes 6 de agosto de 2027',
    time: 'En la noche — la hora se confirma después',
    venue: 'Se anuncia pronto',
    address: '',
    attire: 'Cocktail',
    attireNote:
      'Les sugerimos a los hombres camisa con blazer, y a las mujeres un vestido midi o maxi, o un conjunto elegante.',
    image: '/images/canva/photos/iceland.jpg',
    imageAlt: 'Mariluz y Germán en Islandia'
  },

  attire: {
    enabled: true,
    title: 'Vestimenta',
    level: 'Etiqueta (black tie)',
    note:
      'Les pedimos que los hombres vayan de esmoquin y las mujeres con un vestido largo. Anímense a ser creativos con el look: el outfit, los accesorios y el maquillaje. Es el último mes del verano, entonces vamos a irnos con todo en los colores. Piensen en color, textura, diversión, algo llamativo y con brillo. El blanco y todo lo de esa familia (crema, marfil, off-white, champagne, eggshell, vainilla) queda reservado para la novia y el novio.',
    weather:
      'En Crook Point puede estar entre 50 y 70+ grados Fahrenheit (10-21+ Celsius) por el clima de la costa, porfa vayan abrigados. Lleven chaqueta o abrigo.',
    inspo: {
      src: '/images/canva/photos/attire-inspo.png?v=premove1',
      alt: 'Inspiración de vestidos de colores',
      position: 'center center',
      src2: '/images/canva/photos/attire-inspo-2.jpg',
      alt2: 'Inspiración formal con vestidos largos y esmoquin',
      src3: '/images/canva/photos/attire-inspo-3.png?v=marked1',
      alt3: 'Inspiración de vestimenta formal para hombres',
      colors: [
        { name: 'Verde musgo', hex: '#4B5B34' },
        { name: 'Azul cielo', hex: '#7FC7CC' },
        { name: 'Manzanilla', hex: '#FCC603' },
        { name: 'Vino tinto', hex: '#9B0204' },
        { name: 'Sol', hex: '#EA8913' },
        { name: 'Terracota', hex: '#AF5031' },
        { name: 'Mar profundo', hex: '#092F33' },
        { name: 'Crepúsculo', hex: '#621E3E' }
      ]
    }
  },

  menu: {
    enabled: true,
    title: 'Menú',
    items: [
      'Roast de res con harissa, ajo blanco y pepino',
      'Muslo de pollo confitado con crema de jerez',
      'Rigatoni con salsa de pimentón amarillo y azafrán',
      'Duraznos bruleados y tomate heirloom',
      'Papitas confitadas con hierbas y flores',
      'Elote del Noroeste: maíz fresco, queso feta, hierbas y flores del jardín, miel de trufa'
    ]
  },

  travel: {
    enabled: true,
    title: 'Cómo llegar',
    intro: 'Crook Point, Oregón, es un terreno enorme y conservado entre dos pueblos de la costa:',
    towns: [
      { name: 'Brookings, OR', note: 'Como 15–20 min de Crook Point' },
      { name: 'Gold Beach, OR', note: 'Como 20 min de Crook Point' },
      { name: 'Crescent City, CA', note: 'En la frontera sur, como 40–50 min de Crook Point' }
    ],
    recommend:
      'Recomendamos quedarse en estos tres pueblos, sobre todo Gold Beach y Brookings.',
    connections: [
      {
        title: 'Conexión 1',
        steps: [
          'Vuelen al aeropuerto de San Francisco, CA (SFO)',
          'Pasen a Oakland (OAK) — como 1 hora 15 min en carro o 1 hora 30 min en tren',
          'Vuelen de Oakland (OAK) al aeropuerto de Crescent City (CEC), CA',
          'Manejen 40–50 minutos hasta Brookings o Gold Beach, OR'
        ],
        promo: {
          headline: '20% de descuento en vuelos',
          codeLabel: 'Código',
          code: 'CROOKPOINT20FLIGHTS',
          routesLabel: 'Rutas',
          routes: 'CEC – OAK & HHR'
        }
      },
      {
        title: 'Conexión 2',
        steps: [
          'Vuelen al aeropuerto de Medford, OR (MFR)',
          'De Medford son ~3 horas en carro, atravesando el parque nacional de los Redwoods (se meten un rato a California) hasta Brookings o Gold Beach',
          'Como 2.5 horas hasta Crescent City, CA'
        ]
      }
    ]
  },

  stay: {
    enabled: true,
    title: 'Dónde quedarse',
    place: 'Brookings',
    region: 'Gold Beach',
    intro:
      'Lo ideal es quedarse cerquita de Crook Point. Brookings y Gold Beach son los pueblos que más les recomendamos. Abajo les compartimos algunas de nuestras recomendaciones, y después una lista de Google con otros lugares que también encontramos.',
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
    title: 'Mapas',
    items: [
      {
        src: '/images/canva/photos/map-region.jpg',
        alt: 'Mapa de la costa sur de Oregón y el norte de California, con Crook Point marcado'
      },
      {
        src: '/images/canva/photos/map-local.jpg',
        alt: 'Mapa local de los espacios de Crook Point a lo largo de la costa'
      }
    ]
  },

  thingsToDo: {
    enabled: true,
    title: 'Qué hacer',
    items: [
      {
        title: 'Pozas de marea',
        description:
          'Crook Point queda en un tramo salvaje de la costa de Oregón. Caminen las rocas, vean el oleaje y tomen la 101 con calma. Un plan lindo es buscar pozas de marea y vida marina. Vean: Lone Ranch Beach, Enderts, Indian Sands. Usen este link para ver el tiempo de marea baja:',
        link: {
          href: 'https://www.tidetime.org/north-america/united-states/gold-beach-rogue-river-oregon-calendar-feb.htm',
          label: 'link'
        },
        image: '/images/canva/photos/tidepools.jpg',
        imageAlt: 'Estrellas de mar naranjas y moradas entre mejillones en una poza de marea'
      },
      {
        title: 'Los redwoods',
        description:
          'El camino desde Medford pasa por parques de redwoods. Les recomendamos Jedidiah State Park, el Grove of Titans, y darse una vuelta por la zona.',
        link: {
          href: 'https://redwoodparksconservancy.org/jedediah-smith-redwoods-state-park/',
          label: 'link'
        },
        image: '/images/canva/photos/redwoods.jpg',
        imageAlt: 'Un camino entre redwoods altísimos'
      },
      {
        title: 'Una caminata',
        description:
          'Un hike favorito nuestro es Enderts Beach: la bajada larga, vistas de la costa, moras silvestres que se pueden comer en el camino, y la playa hermosa al fin.',
        links: [
          {
            href: 'https://www.google.com/maps/search/?api=1&query=Enderts%20Beach',
            label: 'link'
          },
          {
            before: '. Otra caminata buena, con playa y bosque, es Yukor Loop Trail, ',
            href: 'https://www.nps.gov/places/yuroklooptrail.htm',
            label: 'link'
          }
        ],
        image: '/images/canva/photos/hike.jpg',
        imageAlt: 'Un arco de roca natural en una playa de la costa de Oregón'
      },
      {
        title: 'Tiempo en el pueblo',
        description:
          'Gold Beach y Brookings son las bases que más les recomendamos: un café, un almuerzo largo y una tarde tranquila antes de que arranque el fin de semana. En la foto: Samuel H. Boardman State Scenic Corridor.',
        image: '/images/canva/photos/boardman.jpg',
        imageAlt: 'Vista sobre flores amarillas hacia arcos de roca en Samuel H. Boardman State Scenic Corridor'
      },
      {
        title: 'Pacific Sushi',
        description:
          'Pacific Sushi & Grill tiene el mejor sushi y mientras esperan o después de comer, entren al lado a la tienda de libros, Whimsical Griffin, y jueguen en las máquinas de videojuegos gratis.',
        link: {
          href: 'https://maps.app.goo.gl/8pS84YrHZbgxYDc28',
          label: 'link'
        },
        image: '/images/canva/photos/pacific-sushi.jpg',
        imageAlt: 'Letrero de Pacific Sushi & Grill de noche'
      },
      {
        title: 'Kayak',
        description:
          'Remen entre cuevas y arcos de roca por la costa. En Brookings y Gold Beach hay tours guiados recomenda cuando el mar está calmado. Vean:',
        link: {
          href: 'https://secretbeachkayaking.com/',
          label: 'link'
        },
        image: '/images/canva/photos/kayaking.jpg',
        imageAlt: 'Dos kayaks amarillos yendo hacia un arco de mar en la costa de Oregón'
      },
      {
        title: 'Comida local',
        description:
          'Si les da hambre después de caminar por la costa, The Crazy Norwegian’s Fish & Chips queda cerquita. Indian Creek Cafe también está muy bien para el desayuno.',
        image: '/images/canva/photos/crazy-norwegian.jpg',
        imageAlt: 'Fachada de The Crazy Norwegian’s Fish & Chips'
      },
      {
        title: 'Mount Shasta / Mossbrae Falls',
        description: 'Mount Shasta es considerada la raiz de chakras del mundo, y muchas personas visitan como un peregrinaje personal y espiritual. Es también un volcán estratovolcánico como parte de las cascadas que forman el anillo de fuego. Mossbrae falls es una cascada que queda dentro del parque.',
        image: '/images/canva/photos/mossbrae-falls.jpg',
        imageAlt: ' Falls cayendo sobre un acantilado cubierto de musgo, cerca de Shasta-Trinity National Forest'
      }
    ]
  },

  registry: {
    enabled: true,
    note: 'Que vengan es el mejor regalo. Si quieren darnos algo más, aquí vamos a poner la lista de regalos.',
    url: '',
    label: 'Lista de regalos'
  },

  faq: {
    enabled: true,
    title: '?',
    items: [
      {
        q: '¿Qué se usa en la boda?',
        a: 'Es black tie. Les pedimos esmoquin para los hombres y vestido largo para las mujeres.'
      },
      {
        q: '¿Cómo va a estar el clima?',
        a: 'En agosto en esa costa de Oregón suele estar templado. Traigan una chaqueta por el viento y el frío de la noche junto al agua.'
      },
      {
        q: '¿La boda es afuera?',
        a: 'Crook Point es una finca en la costa. Más adelante les contamos dónde queda la ceremonia y el plan B si llueve.'
      },
      {
        q: '¿Y si tengo una restricción de comida?',
        a: 'Cuéntennos con tiempo y lo resolvemos.'
      },
      {
        q: '¿Tienen lista de regalos?',
        a: 'Si la tenemos, el link va a estar en la sección de regalos de esta página.'
      },
      {
        q: '¿Otra pregunta?',
        a: 'Escríbannos directo, con gusto les ayudamos.'
      }
    ]
  },

  ui: {
    langEn: 'EN',
    langEs: 'ES',
    langAria: 'Elegir idioma',
    rsvpCta: 'Confirmar',
    rsvpDone: 'Ya confirmaron',
    rsvpSoon: 'Pronto podrán confirmar',
    host: 'Anfitriones',
    date: 'Fecha',
    location: 'Lugar',
    attire: 'Vestimenta',
    toBeAnnounced: 'Se anuncia pronto',
    calendarSuffix: 'Boda',
    and: 'y',
    inspoColors: 'Colores inspo',
    inspoOutfits: 'Outfit inspo',
    inspoPaletteAria: 'Paleta de colores de inspiración',
    thankYou: 'Gracias por confirmar',
    editResponse: 'Editar respuesta',
    rsvpTitle: 'Confirmen',
    rsvpTitleEdit: 'Actualicen su respuesta',
    rsvpSubtitle: 'Nos haría muy feliz que vengan',
    rsvpSubtitleEdit: 'Pueden cambiar lo que necesiten abajo',
    rsvpHonor: 'Nos haría muy feliz que vengan',
    fullName: 'Nombre completo',
    namePlaceholder: 'Su nombre',
    email: 'Correo',
    attending: '¿Van a venir?',
    accepts: 'Claro que sí',
    declines: 'No podemos',
    guestCount: 'Número de personas',
    dietary: 'Restricciones de comida',
    dietaryPlaceholder: 'Alergias, vegetariano, etc.',
    noteLabel: 'Una nota para los novios',
    notePlaceholder: 'Mensaje opcional...',
    sendRsvp: 'Enviar',
    updateRsvp: 'Actualizar',
    goBack: 'Mejor no, volver',
    rsvpBy: 'Confirmen antes del',
    gameTitle: 'Mientras esperan...',
    play: 'Jugar',
    paused: 'Pausa',
    resume: 'Seguir',
    pause: 'Pausa',
    youWin: '¡Ganaron!',
    playAgain: 'Otra vez',
    gameOver: 'Se acabó',
    tryAgain: 'Intentar de nuevo',
    levelLabel: 'Nivel',
    levelClear: '¡Nivel listo!',
    nextLevel: 'Siguiente nivel',
    prev: 'Anterior',
    next: 'Siguiente',
    slides: 'Fotos',
    slide: 'Foto',
    icelandAlt: 'Mariluz y Germán en Islandia',
    comingSoonAlt: 'Montañas nevadas y un valle de glaciar',
    shareDrinkAlt: 'Mariluz y Germán compartiendo un trago',
    adventureAlt: 'La aventura sigue adelante',
    heroAlt: 'Costa — Mariluz Del Pilar y Germán Ignacio',
    groceryCartAlt: 'Mariluz y Germán — vamos a casarnos'
  }
};
