export interface Property {
  id: string;
  title: string;
  location: string;
  region: 'Costa del Sol' | 'Costa Blanca';
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number; // sqm
  plotArea?: number; // sqm
  terraceArea?: number; // sqm
  image: string;
  images: string[]; // Gallery
  tags: ('Nyproduktion' | 'Havsutsikt' | 'Turistlicens' | 'Exklusiv' | 'Söderläge' | 'Frontline Golf')[];
  description: string;
  longDescription?: string;
  distanceToBeach: string;
  distanceToAirport?: string;
  distanceToGolf?: string;
  yearBuilt?: number;
  communityFee?: number; // €/month
  ibiTax?: number; // €/year
  garbageTax?: number; // €/year
  energyRating?: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
  features?: string[];
  btcPrice?: number;
}

export interface Area {
  id: string;
  name: string;
  description: string;
  image: string;
  propertyCount: number;
}

export interface FilterState {
  minPrice: number;
  maxPrice: number;
  region: string[];
  bedrooms: number;
  tags: string[];
}