export type Season = 'Spring' | 'Summer' | 'Autumn' | 'Winter';

export interface FragranceNote {
  name: string;
  category: 'top' | 'heart' | 'base';
  description: string;
  origin: string;
}

export interface FragranceAccord {
  name: string;
  percentage: number;
}

export interface Fragrance {
  id: string;
  slug: string;
  name: string;
  frenchName: string;
  season: Season;
  subtitle: string;
  tagline: string;
  price50ml: number;
  price100ml: number;
  concentration: string;
  family: string;
  image: string;
  accentColor: string;
  glowColor: string;
  ambientGradient: string;
  description: string;
  atmosphere: string;
  story: string;
  craftsmanshipDetail: string;
  extractionMethod: string;
  longevity: string;
  sillage: string;
  notes: {
    top: FragranceNote[];
    heart: FragranceNote[];
    base: FragranceNote[];
  };
  accords: FragranceAccord[];
  characteristics: string[];
}

export interface CartItem {
  id: string;
  fragranceId: string;
  fragranceName: string;
  season: Season;
  size: '50ml' | '100ml' | 'Discovery Trio';
  price: number;
  quantity: number;
  image: string;
  engraving?: string;
}

export interface CheckoutDetails {
  fullName: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  giftMessage?: string;
  isGiftWrapped: boolean;
}
