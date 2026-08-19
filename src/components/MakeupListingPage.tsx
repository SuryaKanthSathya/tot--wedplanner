import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Modal,
} from 'react-native';
import { motion, AnimatePresence } from 'motion/react';
import { MakeupDetailPage } from './MakeupDetailPage';
import { RequestQuoteModal } from './RequestQuoteModal';
import { VendorCompareModal } from './VendorCompareModal';
import {
  getInitialRoute,
  setAppRoute,
  parseHashRoute,
} from '../utils/routeManager';
import {
  ChevronLeft,
  Search,
  Heart,
  Bookmark,
  Star,
  MapPin,
  Sparkles,
  Phone,
  CheckCircle2,
  X,
  Award,
  Filter,
  Check,
  Building2,
  DollarSign,
  SlidersHorizontal,
  Send,
  Calendar,
  User,
  ChevronDown,
  Scissors,
  Palette,
  Scale,
  ChevronRight,
} from 'lucide-react';

export interface MakeupStudio {
  id: string;
  name: string;
  rating: number;
  reviewsCount: number;
  location: string;
  city?: string;
  category: string;
  startingPrice: string;
  priceValue: number;
  tier: 'Signature' | 'Luxury' | 'Premium' | 'Essential';
  image: string;
  isBookmarked?: boolean;
  description?: string;
  experience?: string;
  portfolio?: string[];
  phone?: string;
  brandsUsed?: string[];
  brands?: string[];
  services?: string[];
  studioLocation?: string;
  [key: string]: any;
}

const TAMIL_NADU_DISTRICTS = [
  'All Cities',
  'Chennai',
  'Coimbatore',
  'Madurai',
  'Trichy',
  'Salem',
  'Tirunelveli',
  'Erode',
  'Vellore',
  'Kanchipuram',
  'Thanjavur',
  'Dindigul',
  'Ooty',
  'Tiruppur',
  'Nagercoil',
  'Hosur',
  'Cuddalore',
  'Karur',
  'Ramanathapuram',
  'Pudukkottai',
  'Namakkal',
];

const MAKEUP_SPECIALIZATIONS = [
  'All Types',
  'Bridal HD Makeup',
  'Airbrush Makeup',
  'Traditional South Indian Bridal',
  'Pre-Wedding & Engagement Glam',
  'Reception & Party Look',
  'Celebrity & Hairstyling',
];

const BUDGET_RANGES = [
  'All Budgets',
  'Under ₹25,000',
  '₹25,000 - ₹40,000',
  '₹40,000 - ₹60,000',
  '₹60,000+',
];

const RATING_OPTIONS = ['All Ratings', '4.8+ Rated', '4.9+ Rated'];
const TIER_OPTIONS = ['All Tiers', 'Signature', 'Premium', 'Essential'];

export const MAKEUP_STUDIOS_DATA: MakeupStudio[] = [
  {
    id: 'pkg_makeup_1',
    name: 'Glow Studio',
    category: 'Premium Bridal Makeup',
    city: 'All Cities',
    location: 'Destination Weddings',
    rating: 4.8,
    reviewsCount: 198,
    startingPrice: '₹30,000 onwards',
    priceValue: 30000,
    tier: 'Signature',
    services: ['Airbrush Makeup', 'HD Makeup', 'Hairstyling', 'Draping'],
    brands: ['MAC', 'Huda Beauty', 'Bobbi Brown', 'Charlotte Tilbury'],
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80',
    description: 'Expert bridal makeup artists for a flawless, long-lasting look.',
    experience: '6+ Years',
    studioLocation: 'Available Worldwide',
    trialAvailable: 'Paid Trial Available',
  },
  {
    id: 'makeup-1',
    name: 'Glow & Grace Bridal Artistry',
    rating: 4.9,
    reviewsCount: 194,
    location: 'Chennai',
    category: 'Bridal HD & Airbrush Makeup',
    startingPrice: '₹35,000 onwards',
    priceValue: 35000,
    tier: 'Signature',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80',
    description: 'Premier luxury bridal makeup studio specializing in HD airbrush makeovers, traditional South Indian Muhurtham styling, Kundan jewelry coordination, and saree draping.',
    experience: '10+ Years',
    phone: '+91 91501 97966',
    brandsUsed: ['MAC', 'Charlotte Tilbury', 'NARS', 'Huda Beauty', 'TEMPTU Airbrush'],
    portfolio: [
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1503236823255-94609f598e71?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=800&q=80',
    ],
  },
  {
    id: 'makeup-2',
    name: 'Aura HD Bridal Makeovers by Swetha',
    rating: 4.8,
    reviewsCount: 142,
    location: 'Coimbatore',
    category: 'Airbrush Makeup',
    startingPrice: '₹28,000 onwards',
    priceValue: 28000,
    tier: 'Premium',
    image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=800&q=80',
    description: 'Celebrated for natural skin-like HD finishes, long-lasting sweatproof airbrush makeup, and exquisite flower hair braiding for traditional Muhurthams.',
    experience: '8 Years',
    phone: '+91 91501 97966',
    brandsUsed: ['MAC', 'Bobbi Brown', 'Estée Lauder', 'Kryolan'],
    portfolio: [
      'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=800&q=80',
    ],
  },
  {
    id: 'makeup-3',
    name: 'Royal Velvet Bridal Lounge',
    rating: 4.9,
    reviewsCount: 210,
    location: 'Chennai',
    category: 'Reception & Party Look',
    startingPrice: '₹50,000 onwards',
    priceValue: 50000,
    tier: 'Signature',
    image: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=800&q=80',
    description: 'Elite bridal studio equipped with premium luxury brands offering bespoke reception makeovers, traditional maang tikka & nath jewelry fitting, and royal bridal transformations.',
    experience: '12+ Years',
    phone: '+91 91501 97966',
    brandsUsed: ['Charlotte Tilbury', 'Dior', 'NARS', 'Tom Ford', 'Chanel'],
    portfolio: [
      'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=800&q=80',
    ],
  },
  {
    id: 'makeup-4',
    name: 'Kavitha Sekar Bridal Studio',
    rating: 4.9,
    reviewsCount: 256,
    location: 'Chennai',
    category: 'Traditional South Indian Bridal',
    startingPrice: '₹42,000 onwards',
    priceValue: 42000,
    tier: 'Signature',
    image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=800&q=80',
    description: 'Master of authentic South Indian Brahmin and Chettinad bridal makeovers, focusing on glowing skin tone matching and flawless jewelry coordination.',
    experience: '14 Years',
    phone: '+91 91501 97966',
    brandsUsed: ['MAC', 'Dior', 'Huda Beauty', 'Anastasia Beverly Hills'],
    portfolio: [
      'https://images.unsplash.com/photo-1588159343745-445ae0b16383?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1503236823255-94609f598e71?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1503236823255-94609f598e71?auto=format&fit=crop&w=800&q=80',
    ],
  },
  {
    id: 'makeup-5',
    name: 'Blush & Crown Glamour Studio',
    rating: 4.7,
    reviewsCount: 118,
    location: 'Madurai',
    category: 'Bridal HD Makeup',
    startingPrice: '₹22,000 onwards',
    priceValue: 22000,
    tier: 'Essential',
    image: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=800&q=80',
    description: 'Budget-friendly luxury bridal makeup with HD camera-ready products, intricate hair extensions, and saree pleating services.',
    experience: '6 Years',
    phone: '+91 91501 97966',
    brandsUsed: ['MAC', 'Kryolan', 'PACS', 'Forever 52'],
    portfolio: [
      'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1503236823255-94609f598e71?auto=format&fit=crop&w=800&q=80',
    ],
  },
  {
    id: 'makeup-6',
    name: 'Celebrity Glam by Divya',
    rating: 4.9,
    reviewsCount: 310,
    location: 'Chennai',
    category: 'Celebrity & Hairstyling',
    startingPrice: '₹65,000 onwards',
    priceValue: 65000,
    tier: 'Signature',
    image: 'https://images.unsplash.com/photo-1503236823255-94609f598e71?auto=format&fit=crop&w=800&q=80',
    description: 'Renowned celebrity makeup artist Divya creates red-carpet bridal aesthetics with custom airbrush contouring and royal hair crown styling.',
    experience: '15+ Years',
    phone: '+91 91501 97966',
    brandsUsed: ['Charlotte Tilbury', 'Dior', 'Huda Beauty', 'Fenty Beauty'],
    portfolio: [
      'https://images.unsplash.com/photo-1503236823255-94609f598e71?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=800&q=80',
    ],
  },
  {
    id: 'makeup-7',
    name: 'Saffron & Silk Bridal Artistry',
    rating: 4.8,
    reviewsCount: 165,
    location: 'Coimbatore',
    category: 'Traditional South Indian Bridal',
    startingPrice: '₹32,000 onwards',
    priceValue: 32000,
    tier: 'Premium',
    image: 'https://images.unsplash.com/photo-1503236823255-94609f598e71?auto=format&fit=crop&w=800&q=80',
    description: 'Seamlessly blending heritage silk saree aesthetics with subtle glass-skin makeup trends for fashion-forward brides.',
    experience: '9 Years',
    phone: '+91 91501 97966',
    brandsUsed: ['MAC', 'Estée Lauder', 'Anastasia Beverly Hills', 'NARS'],
    portfolio: [
      'https://images.unsplash.com/photo-1503236823255-94609f598e71?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=800&q=80',
    ],
  },
  {
    id: 'makeup-8',
    name: 'Diva Touch Airbrush Studio',
    rating: 4.8,
    reviewsCount: 130,
    location: 'Trichy',
    category: 'Airbrush Makeup',
    startingPrice: '₹25,000 onwards',
    priceValue: 25000,
    tier: 'Premium',
    image: 'https://images.unsplash.com/photo-1588159343745-445ae0b16383?auto=format&fit=crop&w=800&q=80',
    description: 'Specialized in TEMPTU airbrush makeup guaranteeing 18-hour sweatproof durability for outdoor mandap and evening receptions.',
    experience: '7 Years',
    phone: '+91 91501 97966',
    brandsUsed: ['TEMPTU Airbrush', 'MAC', 'Huda Beauty', 'Kryolan'],
    portfolio: [
      'https://images.unsplash.com/photo-1588159343745-445ae0b16383?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=800&q=80',
    ],
  },
  {
    id: 'makeup-9',
    name: 'Sri Bridal Makeover & Hair Styling',
    rating: 4.7,
    reviewsCount: 95,
    location: 'Salem',
    category: 'Pre-Wedding & Engagement Glam',
    startingPrice: '₹20,000 onwards',
    priceValue: 20000,
    tier: 'Essential',
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80',
    description: 'Comprehensive wedding day grooming including bride\'s makeover, traditional flower veni styling, and bridesmaid packages.',
    experience: '8 Years',
    phone: '+91 91501 97966',
    brandsUsed: ['MAC', 'Kryolan', 'L\'Oréal Professional', 'PAC'],
    portfolio: [
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=800&q=80',
    ],
  },
  {
    id: 'makeup-10',
    name: 'Shine & Shimmer Bridal Studio',
    rating: 4.9,
    reviewsCount: 175,
    location: 'Pondicherry',
    category: 'Bridal HD Makeup',
    startingPrice: '₹38,000 onwards',
    priceValue: 38000,
    tier: 'Signature',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80',
    description: 'Destination wedding specialists expert in humidity-resistant bridal makeup, glowing beach reception looks, and editorial hair design.',
    experience: '11 Years',
    phone: '+91 91501 97966',
    brandsUsed: ['Charlotte Tilbury', 'Dior', 'Bobbi Brown', 'NARS'],
    portfolio: [
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=800&q=80',
    ],
  },
  {
    id: 'makeup-11',
    name: 'Magnolia Bridal Makeovers',
    rating: 4.8,
    reviewsCount: 108,
    location: 'Tiruppur',
    category: 'Pre-Wedding & Engagement Glam',
    startingPrice: '₹26,000 onwards',
    priceValue: 26000,
    tier: 'Premium',
    image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=800&q=80',
    description: 'Signature soft glam aesthetic with luminous base work, dramatic eye art, and elegant crown jewelry fitting.',
    experience: '6 Years',
    phone: '+91 91501 97966',
    brandsUsed: ['MAC', 'Huda Beauty', 'Fenty Beauty', 'Too Faced'],
    portfolio: [
      'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=800&q=80',
    ],
  },
  {
    id: 'makeup-12',
    name: 'Nandhini’s HD Bridal Studio',
    rating: 4.7,
    reviewsCount: 88,
    location: 'Erode',
    category: 'Bridal HD Makeup',
    startingPrice: '₹21,000 onwards',
    priceValue: 21000,
    tier: 'Essential',
    image: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=800&q=80',
    description: 'Gentle skin-first makeup applications using hypoallergenic products, precision saree iron-pleating, and quick hair touchups.',
    experience: '5 Years',
    phone: '+91 91501 97966',
    brandsUsed: ['MAC', 'Kryolan', 'PACS', 'Sugar Cosmetics'],
    portfolio: [
      'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=800&q=80',
    ],
  },
  {
    id: 'makeup-13',
    name: 'Enchanted Mirror Glamour',
    rating: 4.8,
    reviewsCount: 150,
    location: 'Vellore',
    category: 'Airbrush Makeup',
    startingPrice: '₹30,000 onwards',
    priceValue: 30000,
    tier: 'Premium',
    image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=800&q=80',
    description: 'Complete couple makeover packages covering high-definition bridal airbrush work and subtle, natural groom beard/skin grooming.',
    experience: '9 Years',
    phone: '+91 91501 97966',
    brandsUsed: ['TEMPTU Airbrush', 'MAC', 'NARS', 'Estée Lauder'],
    portfolio: [
      'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=800&q=80',
    ],
  },
  {
    id: 'makeup-14',
    name: 'Apsara Traditional South Indian Bridal',
    rating: 4.9,
    reviewsCount: 230,
    location: 'Kanchipuram',
    category: 'Traditional South Indian Bridal',
    startingPrice: '₹45,000 onwards',
    priceValue: 45000,
    tier: 'Signature',
    image: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=800&q=80',
    description: 'Kanchipuram\'s premier bridal team known for traditional 9-yard saree draping, temple jewelry setting, and radiant morning Muhurtham looks.',
    experience: '16 Years',
    phone: '+91 91501 97966',
    brandsUsed: ['MAC', 'Charlotte Tilbury', 'Kryolan', 'Bobbi Brown'],
    portfolio: [
      'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=800&q=80',
    ],
  },
  {
    id: 'makeup-15',
    name: 'Gold & Rose Bridal Lounge',
    rating: 4.9,
    reviewsCount: 180,
    location: 'Chennai',
    category: 'Reception & Party Look',
    startingPrice: '₹55,000 onwards',
    priceValue: 55000,
    tier: 'Luxury',
    image: 'https://images.unsplash.com/photo-1503236823255-94609f598e71?auto=format&fit=crop&w=800&q=80',
    description: 'Luxury boutique studio featuring MAC, Bobbi Brown, and Estée Lauder cosmetics for lavish evening reception transformations.',
    experience: '12 Years',
    phone: '+91 91501 97966',
    brandsUsed: ['MAC', 'Bobbi Brown', 'Estée Lauder', 'Dior'],
    portfolio: [
      'https://images.unsplash.com/photo-1503236823255-94609f598e71?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=800&q=80',
    ],
  },
  {
    id: 'makeup-16',
    name: 'Lotus Bloom Bridal Makeovers',
    rating: 4.7,
    reviewsCount: 92,
    location: 'Tanjore',
    category: 'Traditional South Indian Bridal',
    startingPrice: '₹23,000 onwards',
    priceValue: 23000,
    tier: 'Essential',
    image: 'https://images.unsplash.com/photo-1503236823255-94609f598e71?auto=format&fit=crop&w=800&q=80',
    description: 'Authentic Tanjore bridal art featuring long poola-jada braided hairstyles, fragrant jasmine floral arrangements, and radiant HD makeup.',
    experience: '7 Years',
    phone: '+91 91501 97966',
    brandsUsed: ['MAC', 'Kryolan', 'PAC', 'Lakmé Absolute'],
    portfolio: [
      'https://images.unsplash.com/photo-1503236823255-94609f598e71?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=800&q=80',
    ],
  },
  {
    id: 'makeup-17',
    name: 'Silk & Satin Bridal Artistry',
    rating: 4.8,
    reviewsCount: 160,
    location: 'Coimbatore',
    category: 'Airbrush Makeup',
    startingPrice: '₹34,000 onwards',
    priceValue: 34000,
    tier: 'Premium',
    image: 'https://images.unsplash.com/photo-1588159343745-445ae0b16383?auto=format&fit=crop&w=800&q=80',
    description: 'High-fashion bridal looks tailored for multi-day South Indian celebrations including Sangeet, Mehendi, Muhurtham, and Reception.',
    experience: '10 Years',
    phone: '+91 91501 97966',
    brandsUsed: ['MAC', 'NARS', 'TEMPTU Airbrush', 'Anastasia Beverly Hills'],
    portfolio: [
      'https://images.unsplash.com/photo-1588159343745-445ae0b16383?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=800&q=80',
    ],
  },
  {
    id: 'makeup-18',
    name: 'Crown Jewels Bridal Makeover',
    rating: 4.9,
    reviewsCount: 205,
    location: 'Chennai',
    category: 'Celebrity & Hairstyling',
    startingPrice: '₹48,000 onwards',
    priceValue: 48000,
    tier: 'Signature',
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80',
    description: 'Preferred studio for grand heritage weddings with 3D hair sculpting, custom trial sessions, and luxury bridal party team services.',
    experience: '13 Years',
    phone: '+91 91501 97966',
    brandsUsed: ['Charlotte Tilbury', 'Dior', 'Huda Beauty', 'Tom Ford'],
    portfolio: [
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=800&q=80',
    ],
  },
];

interface MakeupListingPageProps {
  onBack: () => void;
  savedMakeupIds?: Record<string, boolean>;
  onToggleSavedMakeup?: (id: string) => void;
  onOpenSavedTab?: () => void;
  onNavigateToQuotesTab?: () => void;
  bookingSource?: 'entire_wedding' | 'individual';
  onNavigateToProfileMyBookings?: () => void;
}

export const MakeupListingPage: React.FC<MakeupListingPageProps> = ({
  onBack,
  savedMakeupIds,
  onToggleSavedMakeup,
  onOpenSavedTab,
  onNavigateToQuotesTab,
  bookingSource = 'entire_wedding',
  onNavigateToProfileMyBookings,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedBudget, setSelectedBudget] = useState('All Budgets');
  const [selectedRating, setSelectedRating] = useState('All Ratings');
  const [selectedTier, setSelectedTier] = useState('All Tiers');
  const [selectedSpecialization, setSelectedSpecialization] = useState('All Types');

  const [activeFilterModal, setActiveFilterModal] = useState<'city' | 'budget' | 'rating' | 'tier' | 'specialization' | null>(null);

  // Selected Studio for Detail Screen or Quote Modal
  const initialRoute = getInitialRoute();
  const [selectedStudio, setSelectedStudio] = useState<MakeupStudio | null>(() => {
    if (initialRoute.subpage === 'makeup' && initialRoute.detailId) {
      return MAKEUP_STUDIOS_DATA.find((m) => m.id === initialRoute.detailId) || null;
    }
    return null;
  });

  const openStudioDetail = (studio: MakeupStudio) => {
    setSelectedStudio(studio);
    setAppRoute({ screen: 'dashboard', subpage: 'makeup', detailId: studio.id });
  };

  const closeStudioDetail = () => {
    setSelectedStudio(null);
    setAppRoute({ screen: 'dashboard', subpage: 'makeup', detailId: null });
  };

  // Sync hash changes for makeup detail view
  useEffect(() => {
    const handleHash = () => {
      const route = parseHashRoute();
      if (route && route.subpage === 'makeup') {
        if (route.detailId) {
          const match = MAKEUP_STUDIOS_DATA.find((m) => m.id === route.detailId);
          if (match) setSelectedStudio(match);
        } else {
          setSelectedStudio(null);
        }
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const [quoteStudio, setQuoteStudio] = useState<MakeupStudio | null>(null);

  // Local saved bookmarks fallback
  const [localSavedIds, setLocalSavedIds] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('saved_makeup_studios');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const bookmarkedIds = savedMakeupIds || localSavedIds;
  const savedMakeupList = MAKEUP_STUDIOS_DATA.filter((m) => Boolean(bookmarkedIds[m.id]));
  const [showCompareModal, setShowCompareModal] = useState(false);

  const toggleBookmark = (id: string) => {
    if (onToggleSavedMakeup) {
      onToggleSavedMakeup(id);
    } else {
      setLocalSavedIds((prev) => {
        const updated = { ...prev, [id]: !prev[id] };
        try {
          localStorage.setItem('saved_makeup_studios', JSON.stringify(updated));
        } catch (e) {
          console.error(e);
        }
        return updated;
      });
    }
  };

  // Filter Logic
  const filteredStudios = MAKEUP_STUDIOS_DATA.filter((studio) => {
    // Search Filter
    const matchesSearch =
      studio.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      studio.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      studio.category.toLowerCase().includes(searchQuery.toLowerCase());

    // City Filter
    const matchesCity = selectedCity === 'All' || studio.location === selectedCity;

    // Specialization Filter
    const matchesSpecialization =
      selectedSpecialization === 'All Types' || studio.category === selectedSpecialization;

    // Rating Filter
    const matchesRating =
      selectedRating === 'All Ratings'
        ? true
        : selectedRating === '4.8+ Rated'
        ? studio.rating >= 4.8
        : studio.rating >= 4.9;

    // Tier Filter
    const matchesTier = selectedTier === 'All Tiers' || studio.tier === selectedTier;

    // Budget Filter
    let matchesBudget = true;
    if (selectedBudget === 'Under ₹25,000') {
      matchesBudget = studio.priceValue < 25000;
    } else if (selectedBudget === '₹25,000 - ₹40,000') {
      matchesBudget = studio.priceValue >= 25000 && studio.priceValue <= 40000;
    } else if (selectedBudget === '₹40,000 - ₹60,000') {
      matchesBudget = studio.priceValue > 40000 && studio.priceValue <= 60000;
    } else if (selectedBudget === '₹60,000+') {
      matchesBudget = studio.priceValue > 60000;
    }

    return (
      matchesSearch &&
      matchesCity &&
      matchesSpecialization &&
      matchesRating &&
      matchesTier &&
      matchesBudget
    );
  });

  const activeSavedCount = Object.values(bookmarkedIds).filter(Boolean).length;

  if (selectedStudio) {
    return (
      <MakeupDetailPage
        studio={selectedStudio}
        onBack={closeStudioDetail}
        isBookmarked={Boolean(bookmarkedIds[selectedStudio.id])}
        onToggleBookmark={toggleBookmark}
        onNavigateToQuotesTab={onNavigateToQuotesTab}
        bookingSource={bookingSource}
        onNavigateToMyWeddingPayments={() => {
          closeStudioDetail();
          window.dispatchEvent(
            new CustomEvent('tot_switch_to_my_wedding_payments', { detail: { vendorId: selectedStudio.id } })
          );
        }}
        onNavigateToProfileMyBookings={() => {
          closeStudioDetail();
          if (onNavigateToProfileMyBookings) {
            onNavigateToProfileMyBookings();
          } else {
            window.dispatchEvent(
              new CustomEvent('tot_switch_to_profile_my_bookings', { detail: { vendorId: selectedStudio.id } })
            );
          }
        }}
      />
    );
  }

  return (
    <View style={styles.container}>
      {/* TOP HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack} activeOpacity={0.7}>
          <ChevronLeft className="w-5 h-5 text-[#2A2425]" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Bridal & Groom Makeup</Text>

        {onOpenSavedTab ? (
          <TouchableOpacity
            style={styles.savedBadgeBtn}
            onPress={onOpenSavedTab}
            activeOpacity={0.7}
          >
            <Heart className={`w-4 h-4 ${activeSavedCount > 0 ? 'text-[#8B1E2F] fill-[#8B1E2F]' : 'text-[#2A2425]'}`} />
            {activeSavedCount > 0 && (
              <View style={styles.savedCountDot}>
                <Text style={styles.savedCountDotText}>{activeSavedCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        ) : (
          <View style={{ width: 36 }} />
        )}
      </View>

      {/* SEARCH BAR */}
      <View style={styles.searchSection}>
        <View style={styles.searchBox}>
          <Search className="w-4 h-4 text-[#8C7A7C] mr-2" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search makeup artist, city, HD airbrush..."
            placeholderTextColor="#8C7A7C"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <X className="w-4 h-4 text-[#8C7A7C]" />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      {/* 4 FILTER PILLS ROW - FITS EXACTLY WITHOUT OVERFLOWING */}
      <View style={styles.filterBarContainer}>
        {/* 1. City Filter */}
        <TouchableOpacity
          style={[styles.filterChip, selectedCity !== 'All' && styles.filterChipActive]}
          onPress={() => setActiveFilterModal('city')}
          activeOpacity={0.8}
        >
          <Text
            style={[styles.filterChipText, selectedCity !== 'All' && styles.filterChipTextActive]}
            numberOfLines={1}
          >
            {selectedCity === 'All' ? 'All Cities ▼' : `${selectedCity} ▼`}
          </Text>
        </TouchableOpacity>

        {/* 2. Budget Filter */}
        <TouchableOpacity
          style={[styles.filterChip, selectedBudget !== 'All Budgets' && styles.filterChipActive]}
          onPress={() => setActiveFilterModal('budget')}
          activeOpacity={0.8}
        >
          <Text
            style={[styles.filterChipText, selectedBudget !== 'All Budgets' && styles.filterChipTextActive]}
            numberOfLines={1}
          >
            {selectedBudget === 'All Budgets' ? 'Budget ▼' : `${selectedBudget} ▼`}
          </Text>
        </TouchableOpacity>

        {/* 3. Rating Filter */}
        <TouchableOpacity
          style={[styles.filterChip, selectedRating !== 'All Ratings' && styles.filterChipActive]}
          onPress={() => setActiveFilterModal('rating')}
          activeOpacity={0.8}
        >
          <Text
            style={[styles.filterChipText, selectedRating !== 'All Ratings' && styles.filterChipTextActive]}
            numberOfLines={1}
          >
            {selectedRating === 'All Ratings' ? 'Rating ▼' : `${selectedRating} ▼`}
          </Text>
        </TouchableOpacity>

        {/* 4. Tier Filter */}
        <TouchableOpacity
          style={[styles.filterChip, selectedTier !== 'All Tiers' && styles.filterChipActive]}
          onPress={() => setActiveFilterModal('tier')}
          activeOpacity={0.8}
        >
          <Text
            style={[styles.filterChipText, selectedTier !== 'All Tiers' && styles.filterChipTextActive]}
            numberOfLines={1}
          >
            {selectedTier === 'All Tiers' ? 'Tier ▼' : `${selectedTier} ▼`}
          </Text>
        </TouchableOpacity>
      </View>

      {/* FILTER DROPDOWN MODAL (CITY, BUDGET, RATING, TIER, SPECIALIZATION) */}
      <AnimatePresence>
        {activeFilterModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center p-4 backdrop-blur-[2px] cursor-pointer"
            onClick={() => setActiveFilterModal(null)}
          >
            <motion.div
              initial={{ y: 80, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 80, opacity: 0, scale: 0.96 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              style={styles.modalSheet as any}
              className="cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <View style={styles.filterModalHeader}>
                <Text style={styles.filterModalTitle}>
                  {activeFilterModal === 'city' && 'Select City'}
                  {activeFilterModal === 'budget' && 'Select Budget'}
                  {activeFilterModal === 'rating' && 'Select Rating'}
                  {activeFilterModal === 'tier' && 'Select Tier'}
                  {activeFilterModal === 'specialization' && 'Select Specialization'}
                </Text>
                <TouchableOpacity
                  style={styles.filterModalClose}
                  onPress={() => setActiveFilterModal(null)}
                >
                  <X className="w-5 h-5 text-[#2A2425]" />
                </TouchableOpacity>
              </View>

              <ScrollView style={{ maxHeight: 380 }} showsVerticalScrollIndicator={false}>
                {/* 1. CITY FILTER OPTIONS */}
                {activeFilterModal === 'city' && (
                  <View style={styles.optionsList}>
                    {TAMIL_NADU_DISTRICTS.map((district) => {
                      const isSelected = selectedCity === district || (district === 'All Cities' && selectedCity === 'All');
                      return (
                        <div
                          key={district}
                          onClick={() => {
                            setSelectedCity(district === 'All Cities' ? 'All' : district);
                            setActiveFilterModal(null);
                          }}
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '12px 16px',
                            borderRadius: '12px',
                            marginBottom: '4px',
                            cursor: 'pointer',
                            backgroundColor: isSelected ? '#F3ECE4' : 'transparent',
                            transition: 'background-color 0.15s ease',
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: isSelected ? '700' : '500',
                              color: isSelected ? '#581420' : '#3B2F2F',
                            }}
                          >
                            {district}
                          </Text>
                          {isSelected && <Check className="w-4 h-4 text-[#581420] stroke-[2.5]" />}
                        </div>
                      );
                    })}
                  </View>
                )}

                {/* 2. BUDGET FILTER OPTIONS */}
                {activeFilterModal === 'budget' && (
                  <View style={styles.optionsList}>
                    {BUDGET_RANGES.map((b) => {
                      const isSelected = selectedBudget === b;
                      return (
                        <div
                          key={b}
                          onClick={() => {
                            setSelectedBudget(b);
                            setActiveFilterModal(null);
                          }}
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '12px 14px',
                            borderRadius: '10px',
                            marginBottom: '4px',
                            cursor: 'pointer',
                            backgroundColor: isSelected ? '#F3ECE4' : 'transparent',
                          }}
                        >
                          <Text
                            style={isSelected ? styles.optionItemTextSelected : styles.optionItemText}
                          >
                            {b}
                          </Text>
                          {isSelected && <Check className="w-4 h-4 text-[#8B1E2F]" />}
                        </div>
                      );
                    })}
                  </View>
                )}

                {/* 3. RATING FILTER OPTIONS */}
                {activeFilterModal === 'rating' && (
                  <View style={styles.optionsList}>
                    {RATING_OPTIONS.map((r) => {
                      const isSelected = selectedRating === r;
                      return (
                        <div
                          key={r}
                          onClick={() => {
                            setSelectedRating(r);
                            setActiveFilterModal(null);
                          }}
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '12px 14px',
                            borderRadius: '10px',
                            marginBottom: '4px',
                            cursor: 'pointer',
                            backgroundColor: isSelected ? '#F3ECE4' : 'transparent',
                          }}
                        >
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Star className="w-4 h-4 text-[#E5A93C] fill-[#E5A93C] mr-2" />
                            <Text
                              style={isSelected ? styles.optionItemTextSelected : styles.optionItemText}
                            >
                              {r}
                            </Text>
                          </View>
                          {isSelected && <Check className="w-4 h-4 text-[#8B1E2F]" />}
                        </div>
                      );
                    })}
                  </View>
                )}

                {/* 4. TIER FILTER OPTIONS */}
                {activeFilterModal === 'tier' && (
                  <View style={styles.optionsList}>
                    {TIER_OPTIONS.map((t) => {
                      const isSelected = selectedTier === t;
                      return (
                        <div
                          key={t}
                          onClick={() => {
                            setSelectedTier(t);
                            setActiveFilterModal(null);
                          }}
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '12px 14px',
                            borderRadius: '10px',
                            marginBottom: '4px',
                            cursor: 'pointer',
                            backgroundColor: isSelected ? '#F3ECE4' : 'transparent',
                          }}
                        >
                          <Text
                            style={isSelected ? styles.optionItemTextSelected : styles.optionItemText}
                          >
                            {t}
                          </Text>
                          {isSelected && <Check className="w-4 h-4 text-[#8B1E2F]" />}
                        </div>
                      );
                    })}
                  </View>
                )}

                {/* 5. SPECIALIZATION FILTER OPTIONS */}
                {activeFilterModal === 'specialization' && (
                  <View style={styles.optionsList}>
                    {MAKEUP_SPECIALIZATIONS.map((s) => {
                      const isSelected = selectedSpecialization === s;
                      return (
                        <div
                          key={s}
                          onClick={() => {
                            setSelectedSpecialization(s);
                            setActiveFilterModal(null);
                          }}
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '12px 14px',
                            borderRadius: '10px',
                            marginBottom: '4px',
                            cursor: 'pointer',
                            backgroundColor: isSelected ? '#F3ECE4' : 'transparent',
                          }}
                        >
                          <Text
                            style={isSelected ? styles.optionItemTextSelected : styles.optionItemText}
                          >
                            {s}
                          </Text>
                          {isSelected && <Check className="w-4 h-4 text-[#8B1E2F]" />}
                        </div>
                      );
                    })}
                  </View>
                )}
              </ScrollView>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* LIST HEADER COUNTER */}
      <View style={styles.resultsHeader}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.recommendedTitle}>Recommended Makeup Artists</Text>
          <Sparkles className="w-4 h-4 text-[#C28E38] ml-1.5" />
        </View>
        <Text style={styles.resultCountText}>{filteredStudios.length} studios</Text>
      </View>

      {/* MAIN LISTING SCROLLVIEW */}
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60, paddingHorizontal: 16 }}
      >
        {filteredStudios.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Palette className="w-10 h-10 text-[#A8989A] mb-2" />
            <Text style={styles.emptyTitle}>No Makeup Artists Found</Text>
            <Text style={styles.emptySub}>Try adjusting your search keywords, budget, or city filter.</Text>
            <TouchableOpacity
              style={styles.resetFilterBtn}
              onPress={() => {
                setSearchQuery('');
                setSelectedCity('All');
                setSelectedBudget('All Budgets');
                setSelectedRating('All Ratings');
                setSelectedTier('All Tiers');
                setSelectedSpecialization('All Types');
              }}
            >
              <Text style={styles.resetFilterBtnText}>Reset Filters</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {filteredStudios.map((studio) => {
            const isBookmarked = Boolean(bookmarkedIds[studio.id]);
            return (
              <TouchableOpacity
                key={studio.id}
                style={styles.cardContainer}
                activeOpacity={0.9}
                onPress={() => openStudioDetail(studio)}
              >
                {/* IMAGE CONTAINER */}
                <View style={styles.cardImgWrapper}>
                  <Image source={{ uri: studio.image }} style={styles.cardImg as any} />
                  
                  {/* TIER BADGE */}
                  <View style={styles.cardTierBadge}>
                    <Text style={styles.cardTierBadgeText}>{studio.tier}</Text>
                  </View>

                  {/* BOOKMARK BUTTON */}
                  <TouchableOpacity
                    style={styles.cardBookmarkBtn}
                    onPress={() => toggleBookmark(studio.id)}
                    activeOpacity={0.8}
                  >
                    <Bookmark
                      className={`w-4 h-4 ${
                        isBookmarked ? 'text-[#8B1E2F] fill-[#8B1E2F]' : 'text-[#8C7A7C]'
                      }`}
                    />
                  </TouchableOpacity>
                </View>

                {/* CARD DETAILS */}
                <View style={styles.cardBody}>
                  <View style={styles.cardTitleRow}>
                    <Text style={styles.cardTitle} numberOfLines={1}>
                      {studio.name}
                    </Text>
                    <View style={styles.cardRatingPill}>
                      <Star className="w-3 h-3 text-amber-500 fill-amber-500 mr-1" />
                      <Text style={styles.cardRatingText}>{studio.rating.toFixed(1)}</Text>
                      <Text style={styles.cardReviewsText}>({studio.reviewsCount})</Text>
                    </View>
                  </View>

                  <View style={styles.cardLocationRow}>
                    <MapPin className="w-3.5 h-3.5 text-[#8C7A7C] mr-1" />
                    <Text style={styles.cardLocationText}>{studio.location}</Text>
                    <Text style={styles.cardDot}>•</Text>
                    <Text style={styles.cardCategoryText}>{studio.category}</Text>
                  </View>

                  <View style={styles.cardPriceRow}>
                    <Text style={styles.cardPriceValue}>{studio.startingPrice}</Text>

                    <TouchableOpacity
                      style={styles.cardViewBtn}
                      onPress={() => openStudioDetail(studio)}
                      activeOpacity={0.85}
                    >
                      <Text style={styles.cardViewBtnText}>View Details</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
          </div>
        )}
      </ScrollView>

      {/* SEND QUOTE MODAL POPUP */}
      <RequestQuoteModal
        visible={Boolean(quoteStudio)}
        vendorId={quoteStudio?.id}
        onClose={() => setQuoteStudio(null)}
        studioName={quoteStudio ? quoteStudio.name : ''}
        startingPrice={quoteStudio ? quoteStudio.startingPrice : ''}
        location={quoteStudio ? quoteStudio.location : ''}
      />

      {/* FLOATING COMPARE BAR WHEN 2+ STUDIOS ARE SELECTED/SAVED */}
      <AnimatePresence>
        {savedMakeupList.length >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            style={{
              position: 'fixed' as any,
              bottom: 24,
              left: 0,
              right: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 999,
              pointerEvents: 'none' as any,
            }}
          >
            <TouchableOpacity
              style={styles.floatingCompareBtn}
              onPress={() => setShowCompareModal(true)}
              activeOpacity={0.9}
            >
              <View style={styles.floatingCompareBadge}>
                <Text style={styles.floatingCompareBadgeText}>{savedMakeupList.length}</Text>
              </View>
              <Scale className="w-4 h-4 text-white mr-1.5" />
              <Text style={styles.floatingCompareBtnText}>Compare ({savedMakeupList.length})</Text>
              <ChevronRight className="w-4 h-4 text-white ml-1" />
            </TouchableOpacity>
          </motion.div>
        )}
      </AnimatePresence>

      {/* VENDOR COMPARE MODAL */}
      <VendorCompareModal
        visible={showCompareModal}
        categoryTitle="Makeup Artists"
        vendors={savedMakeupList}
        onClose={() => setShowCompareModal(false)}
        onSelectVendor={(v) => {
          const match = MAKEUP_STUDIOS_DATA.find((m) => m.id === v.id);
          if (match) openStudioDetail(match);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    maxHeight: '100%',
    width: '100%',
    backgroundColor: '#FAF7F2',
    overflow: 'hidden',
    display: 'flex' as any,
    flexDirection: 'column',
  },
  header: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: '#FAF7F2',
    borderBottomWidth: 1,
    borderBottomColor: '#EFE7DE',
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E8DFD5',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#2A2425',
    fontFamily: 'Playfair Display, serif',
  },
  savedBadgeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E8DFD5',
    position: 'relative',
  },
  savedCountDot: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#581420',
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  savedCountDotText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
  },
  searchSection: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 6,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E2D8CD',
  },
  searchInput: {
    flex: 1,
    fontSize: 12,
    color: '#2A2425',
    outlineStyle: 'none' as any,
  },
  filterBarContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 10,
    marginTop: 2,
  },
  filterChip: {
    flex: 1,
    height: 36,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDD6CE',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },
  filterChipActive: {
    backgroundColor: '#FFFFFF',
    borderColor: '#581420',
    borderWidth: 1.5,
  },
  filterChipText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#332B2C',
    textAlign: 'center',
  },
  filterChipTextActive: {
    color: '#581420',
    fontWeight: '700',
  },
  filterArrow: {
    fontSize: 8,
    color: '#332B2C',
    marginLeft: 6,
  },
  filterArrowActive: {
    color: '#581420',
  },
  dropdownOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  dropdownOptionActive: {
    backgroundColor: '#F3ECE3',
  },
  dropdownOptionText: {
    fontSize: 12,
    color: '#3D3234',
    fontWeight: '500',
  },
  dropdownOptionTextActive: {
    color: '#581420',
    fontWeight: '800',
  },
  modalBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 100,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  modalSheet: {
    backgroundColor: '#FAF7F2',
    borderRadius: 20,
    width: '90%',
    maxWidth: 450,
    
    maxHeight: '85%',
    overflow: 'hidden',
  },
  filterModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#EFE7DE',
  },
  filterModalTitle: {
    fontFamily: 'Playfair Display, Georgia, serif',
    fontSize: 16,
    fontWeight: '700',
    color: '#2A2425',
  },
  filterModalClose: {
    padding: 4,
  },
  optionsList: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  optionItemText: {
    fontSize: 13,
    color: '#2A2425',
    fontWeight: '500',
  },
  optionItemTextSelected: {
    fontWeight: '700',
    color: '#8B1E2F',
  },
  resultsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 10,
    marginTop: 4,
  },
  recommendedTitle: {
    fontSize: 14,
    fontFamily: 'Playfair Display, serif',
    fontWeight: '800',
    color: '#2A2425',
  },
  resultCountText: {
    fontSize: 11,
    color: '#8C7A7C',
    fontWeight: '600',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2A2425',
    marginBottom: 4,
  },
  emptySub: {
    fontSize: 12,
    color: '#8C7A7C',
    textAlign: 'center',
    marginBottom: 14,
  },
  resetFilterBtn: {
    backgroundColor: '#581420',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  resetFilterBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    marginBottom: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E8DFD5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 5,
    elevation: 2,
  },
  cardImgWrapper: {
    position: 'relative',
    height: 180,
    width: '100%',
  },
  cardImg: {
    width: '100%',
    height: '100%',
  },
  cardTierBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  cardTierBadgeText: {
    color: '#92400E',
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  cardBookmarkBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  cardBody: {
    padding: 12,
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#2A2425',
    fontFamily: 'Playfair Display, serif',
    flex: 1,
    marginRight: 6,
  },
  cardRatingPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  cardRatingText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#92400E',
  },
  cardReviewsText: {
    fontSize: 10,
    color: '#B45309',
    marginLeft: 2,
  },
  cardLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardLocationText: {
    fontSize: 11,
    color: '#6B5A5C',
    fontWeight: '500',
  },
  cardDot: {
    fontSize: 10,
    color: '#C2B5B7',
    marginHorizontal: 6,
  },
  cardCategoryText: {
    fontSize: 11,
    color: '#581420',
    fontWeight: '600',
  },
  cardPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F3ECE3',
  },
  cardPriceValue: {
    fontSize: 14,
    fontWeight: '800',
    color: '#2A2425',
  },
  cardViewBtn: {
    backgroundColor: '#F5EEE6',
    borderWidth: 1,
    borderColor: '#E8DFD5',
    paddingHorizontal: 11,
    paddingVertical: 5,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardViewBtnText: {
    color: '#581420',
    fontSize: 10.5,
    fontWeight: '700',
  },
  floatingCompareBtn: {
    pointerEvents: 'auto' as any,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#581420',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
    borderWidth: 1.5,
    borderColor: '#F3ECE4',
  },
  floatingCompareBadge: {
    backgroundColor: '#C28E38',
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  floatingCompareBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
  floatingCompareBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
});

