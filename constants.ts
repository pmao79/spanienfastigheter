import { Property, Area } from './types';

export const PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'Villa Vista Mare',
    location: 'Marbella, Golden Mile',
    region: 'Costa del Sol',
    price: 1250000,
    bedrooms: 4,
    bathrooms: 3,
    area: 280,
    plotArea: 1050,
    terraceArea: 120,
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=2070&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop'
    ],
    tags: ['Havsutsikt', 'Exklusiv', 'Söderläge'],
    description: 'Modern villa med panoramautsikt över Medelhavet. Stor terrass och infinity pool.',
    longDescription: 'Välkommen till Villa Vista Mare, en arkitektritad dröm på Marbellas eftertraktade Golden Mile. Huset präglas av en skandinavisk designfilosofi där ljus och rymd står i centrum, kombinerat med andalusisk värme.\n\nVardagsrummet med öppen planlösning har fönster från golv till tak som suddar ut gränsen mellan inne och ute. Det platsbyggda köket från Poggenpohl är utrustat med vitvaror från Gaggenau.\n\nMaster suite erbjuder en privat terrass och ett badrum i spa-klass. Utomhus väntar en infinity-pool med saltvatten, utekök och en lummig trädgård med citronträd och palmer.',
    distanceToBeach: '5 min promenad',
    distanceToAirport: '40 min',
    distanceToGolf: '10 min',
    yearBuilt: 2021,
    communityFee: 150,
    ibiTax: 1200,
    garbageTax: 180,
    energyRating: 'A',
    features: ['Infinity Pool', 'Golvvärme', 'Smart Home System', 'Garage (2 bilar)', 'Vinkällare', 'Privat Gym'],
    btcPrice: 14.5
  },
  {
    id: '2',
    title: 'Penthouse Las Lomas',
    location: 'Nerja',
    region: 'Costa del Sol',
    price: 595000,
    bedrooms: 2,
    bathrooms: 2,
    area: 95,
    terraceArea: 45,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1484154218962-a1c002085d2f?q=80&w=1974&auto=format&fit=crop'
    ],
    tags: ['Nyproduktion', 'Turistlicens', 'Havsutsikt'],
    description: 'Nyproducerad takvåning med privat takterrass och jacuzzi.',
    longDescription: 'Unik möjlighet att förvärva en nyproducerad takvåning i hjärtat av Nerja. Här bor du med oslagbar utsikt över både berg och hav.\n\nBostaden erbjuder en öppen planlösning med högkvalitativa materialval. Den privata takterrassen om 45 kvm är förberedd för utekök och jacuzzi – den perfekta platsen för sena middagar under stjärnorna.',
    distanceToBeach: '200m till strand',
    distanceToAirport: '45 min',
    distanceToGolf: '15 min',
    yearBuilt: 2023,
    communityFee: 85,
    ibiTax: 600,
    garbageTax: 120,
    energyRating: 'B',
    features: ['Takterrass', 'Jacuzzi', 'Hiss', 'AC (Central)', 'Turistlicens godkänd'],
    btcPrice: 6.9
  },
  {
    id: '3',
    title: 'Casa Blanca Garden',
    location: 'Alicante',
    region: 'Costa Blanca',
    price: 345000,
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    plotArea: 400,
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b91d?q=80&w=1974&auto=format&fit=crop',
    images: [
        'https://images.unsplash.com/photo-1580587771525-78b9dba3b91d?q=80&w=1974&auto=format&fit=crop'
    ],
    tags: [],
    description: 'Charmigt radhus med lummig trädgård i lugnt område.',
    longDescription: 'Ett hemtrevligt radhus för dig som söker lugnet men vill ha nära till allt. Beläget i ett etablerat område strax norr om Alicante.',
    distanceToBeach: '10 min med bil',
    yearBuilt: 2005,
    features: ['Trädgård', 'Gemensam pool', 'Parkering'],
  },
  {
    id: '4',
    title: 'Torrevieja Beachfront',
    location: 'Torrevieja',
    region: 'Costa Blanca',
    price: 285000,
    bedrooms: 3,
    bathrooms: 2,
    area: 110,
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop',
    images: [
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop'
    ],
    tags: ['Havsutsikt', 'Turistlicens'],
    description: 'Ljus lägenhet precis vid stranden Playa del Cura.',
    longDescription: 'Vakna till vågornas brus. Denna front-line lägenhet i Torrevieja erbjuder en oslagbar livsstil för strandälskaren.',
    distanceToBeach: '50m till strand',
    yearBuilt: 1998,
    features: ['Balkong', 'Hiss', 'Möblerad'],
  }
];

export const AREAS: Area[] = [
  {
    id: '1',
    name: 'Marbella',
    description: 'Lyx, golf och stränder i världsklass. Solkustens pärla erbjuder en livsstil utöver det vanliga.',
    image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=2070&auto=format&fit=crop',
    propertyCount: 450
  },
  {
    id: '2',
    name: 'Alicante & Costa Blanca',
    description: 'Milslånga vita stränder, saltlaguner och ett fantastiskt klimat året runt.',
    image: 'https://images.unsplash.com/photo-1577791465508-34eb10825310?q=80&w=1974&auto=format&fit=crop',
    propertyCount: 630
  },
  {
    id: '3',
    name: 'Nerja',
    description: 'Den genuina pärlan öster om Málaga med sina berömda grottor och Balcón de Europa.',
    image: 'https://images.unsplash.com/photo-1563789031959-4c02bcb41319?q=80&w=1974&auto=format&fit=crop',
    propertyCount: 180
  }
];