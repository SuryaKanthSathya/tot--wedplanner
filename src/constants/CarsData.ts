export interface CarItem {
  id: string;
  name: string;
  rating: number;
  reviewsCount: number;
  location: string;
  category: string;
  startingPrice: string;
  priceValue: number;
  tier: 'Signature' | 'Premium' | 'Essential';
  image: string;
  description: string;
  experience: string;
  portfolio: string[];
  phone: string;
}

export const CARS_DATA: CarItem[] = [
  {
    id: 'car-1',
    name: 'Royal Vintage Wheels',
    rating: 4.9,
    reviewsCount: 124,
    location: 'Chennai',
    category: 'Vintage Cars',
    startingPrice: '₹25,000 onwards',
    priceValue: 25000,
    tier: 'Signature',
    image: 'https://images.unsplash.com/photo-1511407397940-d57f68e81203?auto=format&fit=crop&w=600&q=80',
    description: 'Arrive in style with our well-maintained 1960s vintage cars for your grand wedding entrance.',
    experience: '12+ Years Experience',
    phone: '+91 98765 11223',
    portfolio: [
      'https://images.unsplash.com/photo-1511407397940-d57f68e81203?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=600&q=80',
    ],
  },
  {
    id: 'car-2',
    name: 'Luxury Drives Co.',
    rating: 4.8,
    reviewsCount: 201,
    location: 'Coimbatore',
    category: 'Luxury Sedans',
    startingPrice: '₹15,000 onwards',
    priceValue: 15000,
    tier: 'Premium',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=600&q=80',
    description: 'Premium sedans including Mercedes Benz, BMW, and Audi for the bride, groom, and VIP guests.',
    experience: '8+ Years Experience',
    phone: '+91 98765 44556',
    portfolio: [
      'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1563720360172-67b8f3dce741?auto=format&fit=crop&w=600&q=80',
    ],
  },
  {
    id: 'car-3',
    name: 'Grand Family Travels',
    rating: 4.7,
    reviewsCount: 156,
    location: 'Madurai',
    category: 'Tempo Traveller / Vans',
    startingPrice: '₹8,000 onwards',
    priceValue: 8000,
    tier: 'Essential',
    image: 'https://images.unsplash.com/photo-1534093607318-f025413f49cb?auto=format&fit=crop&w=600&q=80',
    description: 'Comfortable air-conditioned Tempo Travellers and Vans for seamless guest transportation between venues.',
    experience: '15+ Years Experience',
    phone: '+91 98765 77889',
    portfolio: [
      'https://images.unsplash.com/photo-1534093607318-f025413f49cb?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1518972554625-6cb31bb218fb?auto=format&fit=crop&w=600&q=80',
    ],
  }
];
