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
import { StudioDetailPage } from './StudioDetailPage';
import { RequestQuoteModal } from './RequestQuoteModal';
import { VendorCompareModal } from './VendorCompareModal';
import {
  getInitialRoute,
  setAppRoute,
  parseHashRoute,
} from '../utils/routeManager';
import momentStudioImage from '../assets/images/hindu_couple_arch_1786467605789.jpg';

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
  Camera,
  User,
  ChevronDown,
  Scale,
  ChevronRight,
} from 'lucide-react';

export interface PhotographyStudio {
  id: string;
  name: string;
  rating: number;
  reviewsCount: number;
  location: string;
  city?: string;
  category: string;
  startingPrice: string;
  priceValue: number;
  tier: 'Signature' | 'Premium' | 'Essential';
  image: string;
  isBookmarked?: boolean;
  description?: string;
  experience?: string;
  portfolio?: string[];
  phone?: string;
  deliveryTime?: string;
  teamSize?: string;
  equipment?: string;
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

const BUDGET_OPTIONS = [
  { id: 'All', label: 'All Budgets' },
  { id: '20-25k', label: '₹20k - ₹25k', min: 20000, max: 25000 },
  { id: '25-40k', label: '₹25k - ₹40k', min: 25000, max: 40000 },
  { id: '40-60k', label: '₹40k - ₹60k', min: 40000, max: 60000 },
  { id: '60k-1lakh', label: '₹60k - ₹1 Lakhs', min: 60000, max: 100000 },
  { id: '1lakh+', label: '₹1 Lakhs+', min: 100000, max: 999999 },
];

const RATING_OPTIONS = [
  { id: 'All', label: 'All Ratings' },
  { id: '4.5+', label: '4.5★ & above', minRating: 4.5 },
  { id: '4.0+', label: '4.0★ & above', minRating: 4.0 },
  { id: '3.5+', label: '3.5★ & above', minRating: 3.5 },
];

const TIER_OPTIONS = [
  { id: 'All', label: 'All Tiers' },
  { id: 'Signature', label: 'Signature', desc: 'Top Tier • Luxury & Bespoke Photography' },
  { id: 'Premium', label: 'Premium', desc: 'Second Tier • High Quality & Experienced Teams' },
  { id: 'Essential', label: 'Essential', desc: 'Last Tier • Value & Pocket-Friendly Packages' },
];

export const STUDIOS_DATA: PhotographyStudio[] = [
  {
    id: 'pkg_photo_1',
    name: 'Moments Studio',
    category: 'Cinematic & Candid Photography',
    city: 'All Cities',
    location: 'Destination Weddings',
    rating: 4.9,
    reviewsCount: 312,
    startingPrice: '₹1,50,000 onwards',
    priceValue: 150000,
    tier: 'Signature',
    deliveryTime: '3-4 Weeks',
    image: momentStudioImage,
    description: 'Award-winning team specializing in candid moments and cinematic wedding films.',
    experience: '8+ Years',
    teamSize: '5-8 Professionals',
    equipment: 'Sony A7S III, RED Cinema Cameras',
    services: ['Candid Photography', 'Traditional', 'Cinematic Video', 'Pre-Wedding'],
  },
  {
    id: 'studio-1',
    name: 'ABC Photography',
    rating: 4.8,
    reviewsCount: 134,
    location: 'Chennai',
    category: 'Wedding Photography',
    startingPrice: '₹75,000 onwards',
    priceValue: 75000,
    tier: 'Signature',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80',
    description: 'Premier wedding photography studio in Chennai specializing in royal candid moments and traditional heritage ceremonies.',
    experience: '8+ Years Experience',
    phone: '+91 91501 97966',
    portfolio: [
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
    ],
  },
  {
    id: 'studio-2',
    name: 'Memories Studio',
    rating: 4.6,
    reviewsCount: 98,
    location: 'Chennai',
    category: 'Candid Photography',
    startingPrice: '₹60,000 onwards',
    priceValue: 60000,
    tier: 'Premium',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80',
    description: 'Capturing unscripted, emotional moments with artistic lighting and timeless color tones.',
    experience: '6+ Years Experience',
    phone: '+91 91501 97966',
  },
  {
    id: 'studio-3',
    name: 'Picture Perfect',
    rating: 4.7,
    reviewsCount: 76,
    location: 'Chennai',
    category: 'Traditional Photography',
    startingPrice: '₹70,000 onwards',
    priceValue: 70000,
    tier: 'Premium',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
    description: 'Specialists in classic South Indian temple weddings, muhurtham rituals, and grand reception stage coverage.',
    experience: '10+ Years Experience',
    phone: '+91 91501 97966',
  },
  {
    id: 'studio-4',
    name: 'Pixel Frame Stories',
    rating: 4.9,
    reviewsCount: 210,
    location: 'Coimbatore',
    category: 'Cinematic Wedding Films',
    startingPrice: '₹85,000 onwards',
    priceValue: 85000,
    tier: 'Signature',
    image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=600&q=80',
    description: 'Award-winning cinematographers bringing movie-quality drone visuals and heartfelt storytelling to your big day.',
    experience: '7+ Years Experience',
    phone: '+91 91501 97966',
  },
  {
    id: 'studio-5',
    name: 'Eternal Snaps Studio',
    rating: 4.8,
    reviewsCount: 115,
    location: 'Madurai',
    category: 'Traditional & Candid',
    startingPrice: '₹65,000 onwards',
    priceValue: 65000,
    tier: 'Premium',
    image: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&w=600&q=80',
    description: 'Authentic South Indian wedding photography capturing cultural rituals, silk colors, and joyful family celebrations.',
    experience: '9+ Years Experience',
    phone: '+91 91501 97966',
  },
  {
    id: 'studio-6',
    name: 'Golden Lens Weddings',
    rating: 4.9,
    reviewsCount: 188,
    location: 'Chennai',
    category: 'Luxury Bridal Photography',
    startingPrice: '₹95,000 onwards',
    priceValue: 95000,
    tier: 'Signature',
    image: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=600&q=80',
    description: 'High-end destination wedding and luxury bridal portrait specialists with magazine-ready editorial styling.',
    experience: '12+ Years Experience',
    phone: '+91 91501 97966',
  },
  {
    id: 'studio-7',
    name: 'Royal Clicks Chennai',
    rating: 4.7,
    reviewsCount: 142,
    location: 'Chennai',
    category: 'Pre-wedding & Wedding',
    startingPrice: '₹80,000 onwards',
    priceValue: 80000,
    tier: 'Signature',
    image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=600&q=80',
    description: 'From romantic pre-wedding beach shoots to full multi-day marriage ceremonies with custom photo albums.',
    experience: '8+ Years Experience',
    phone: '+91 91501 97966',
  },
  {
    id: 'studio-8',
    name: 'Aura Candid Moments',
    rating: 4.8,
    reviewsCount: 92,
    location: 'Trichy',
    category: 'Candid & Drone Films',
    startingPrice: '₹55,000 onwards',
    priceValue: 55000,
    tier: 'Premium',
    image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=600&q=80',
    description: 'Creative candid team capturing laughter, tears of joy, and vibrant turmeric sangeet moments.',
    experience: '5+ Years Experience',
    phone: '+91 91501 97966',
  },
  {
    id: 'studio-9',
    name: 'Vivid Stories Studio',
    rating: 4.6,
    reviewsCount: 84,
    location: 'Salem',
    category: 'Wedding & Reception',
    startingPrice: '₹50,000 onwards',
    priceValue: 50000,
    tier: 'Premium',
    image: 'https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=600&q=80',
    description: 'Affordable premium photography packages including candid stills, LED screens, and printed coffee table books.',
    experience: '6+ Years Experience',
    phone: '+91 91501 97966',
  },
  {
    id: 'studio-10',
    name: 'Shadows & Sunshine',
    rating: 4.9,
    reviewsCount: 230,
    location: 'Chennai',
    category: 'Fine Art Photography',
    startingPrice: '₹1,10,000 onwards',
    priceValue: 110000,
    tier: 'Signature',
    image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=600&q=80',
    description: 'Bespoke fine art photography studio with global awards for creative lighting and intimate bridal portraits.',
    experience: '11+ Years Experience',
    phone: '+91 91501 97966',
  },
  {
    id: 'studio-11',
    name: 'Candid Frame Craft',
    rating: 4.7,
    reviewsCount: 108,
    location: 'Coimbatore',
    category: 'Pre-Wedding & Candid',
    startingPrice: '₹68,000 onwards',
    priceValue: 68000,
    tier: 'Premium',
    image: 'https://images.unsplash.com/photo-1525258946800-98cfd641d0de?auto=format&fit=crop&w=600&q=80',
    description: 'Specializing in hill station outdoor pre-wedding shoots, Ooty/Kodaikanal concepts, and candid ceremony coverage.',
    experience: '7+ Years Experience',
    phone: '+91 91501 97966',
  },
  {
    id: 'studio-12',
    name: 'The Velvet Lens',
    rating: 4.8,
    reviewsCount: 165,
    location: 'Chennai',
    category: 'Bridal Portraits & Films',
    startingPrice: '₹90,000 onwards',
    priceValue: 90000,
    tier: 'Signature',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=600&q=80',
    description: 'Focused on gorgeous bridal makeup details, kanjeevaram silk luster, and cinematic 4K video teasers.',
    experience: '9+ Years Experience',
    phone: '+91 91501 97966',
  },
  {
    id: 'studio-13',
    name: 'South Spice Studios',
    rating: 4.5,
    reviewsCount: 79,
    location: 'Tirunelveli',
    category: 'Traditional Muhurtham',
    startingPrice: '₹45,000 onwards',
    priceValue: 45000,
    tier: 'Premium',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80',
    description: 'Traditional marriage coverage team ensuring every ritual, nadaswaram note, and elder blessing is immortalized.',
    experience: '12+ Years Experience',
    phone: '+91 91501 97966',
  },
  {
    id: 'studio-14',
    name: 'Serenade Wedding Films',
    rating: 4.9,
    reviewsCount: 174,
    location: 'Chennai',
    category: '4K Cinematic Stills & Video',
    startingPrice: '₹1,20,000 onwards',
    priceValue: 120000,
    tier: 'Signature',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
    description: 'Elite cinematic wedding team providing live streaming, aerial drone photography, and signature teaser trailers.',
    experience: '10+ Years Experience',
    phone: '+91 91501 97966',
  },
  {
    id: 'studio-15',
    name: 'Graceful Memory Captures',
    rating: 4.7,
    reviewsCount: 95,
    location: 'Erode',
    category: 'Full Event Coverage',
    startingPrice: '₹58,000 onwards',
    priceValue: 58000,
    tier: 'Premium',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80',
    description: 'Warm, personable team providing complete end-to-end coverage from mehendi night to reception farewell.',
    experience: '6+ Years Experience',
    phone: '+91 91501 97966',
  },
  {
    id: 'studio-16',
    name: 'Vellore Temple Snaps',
    rating: 4.3,
    reviewsCount: 62,
    location: 'Vellore',
    category: 'Budget Traditional',
    startingPrice: '₹24,000 onwards',
    priceValue: 24000,
    tier: 'Essential',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=600&q=80',
    description: 'Affordable traditional photography capturing Golden Temple and fort wedding ceremonies.',
    experience: '5+ Years Experience',
    phone: '+91 91501 97966',
  },
  {
    id: 'studio-17',
    name: 'Silk City Wedding Clicks',
    rating: 4.6,
    reviewsCount: 88,
    location: 'Kanchipuram',
    category: 'Kanjeevaram Heritage',
    startingPrice: '₹38,000 onwards',
    priceValue: 38000,
    tier: 'Premium',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80',
    description: 'Highlighting Kanjeevaram silk weave colors, traditional gold jewellery details, and muhurtham moments.',
    experience: '7+ Years Experience',
    phone: '+91 91501 97966',
  },
  {
    id: 'studio-18',
    name: 'Chola Heritage Photography',
    rating: 4.2,
    reviewsCount: 54,
    location: 'Thanjavur',
    category: 'Heritage & Traditional',
    startingPrice: '₹22,000 onwards',
    priceValue: 22000,
    tier: 'Essential',
    image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=600&q=80',
    description: 'Expert traditional photography around Big Temple venues with high quality album printing.',
    experience: '8+ Years Experience',
    phone: '+91 91501 97966',
  },
  {
    id: 'studio-19',
    name: 'Western Ghats Visuals',
    rating: 4.8,
    reviewsCount: 122,
    location: 'Ooty',
    category: 'Outdoor Pre-Wedding & Film',
    startingPrice: '₹52,000 onwards',
    priceValue: 52000,
    tier: 'Premium',
    image: 'https://images.unsplash.com/photo-1509924603848-aca5e5f276d7?auto=format&fit=crop&w=600&q=80',
    description: 'Scenic tea plantation outdoor sessions, pine forest pre-wedding shoots, and misty romantic captures.',
    experience: '6+ Years Experience',
    phone: '+91 91501 97966',
  },
  {
    id: 'studio-20',
    name: 'Dindigul Lock Stories',
    rating: 3.9,
    reviewsCount: 41,
    location: 'Dindigul',
    category: 'Traditional Budget',
    startingPrice: '₹23,000 onwards',
    priceValue: 23000,
    tier: 'Essential',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80',
    description: 'Reliable event coverage for marriage halls, engagement ceremonies, and family gatherings.',
    experience: '4+ Years Experience',
    phone: '+91 91501 97966',
  },
  {
    id: 'studio-21',
    name: 'Kongu Textile Weddings',
    rating: 4.4,
    reviewsCount: 73,
    location: 'Tiruppur',
    category: 'Modern Traditional',
    startingPrice: '₹35,000 onwards',
    priceValue: 35000,
    tier: 'Essential',
    image: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&w=600&q=80',
    description: 'Vibrant wedding packages with customized designer album frames and high resolution digital copies.',
    experience: '6+ Years Experience',
    phone: '+91 91501 97966',
  },
  {
    id: 'studio-22',
    name: 'Kumari Coastal Moments',
    rating: 4.5,
    reviewsCount: 67,
    location: 'Nagercoil',
    category: 'Sunset & Beach Wedding',
    startingPrice: '₹28,000 onwards',
    priceValue: 28000,
    tier: 'Essential',
    image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=600&q=80',
    description: 'Capturing oceanfront sunset couples shoots and traditional Southern Kanyakumari wedding rites.',
    experience: '5+ Years Experience',
    phone: '+91 91501 97966',
  },
  {
    id: 'studio-23',
    name: 'Border Industrial Snaps',
    rating: 4.1,
    reviewsCount: 50,
    location: 'Hosur',
    category: 'Contemporary Couples',
    startingPrice: '₹42,000 onwards',
    priceValue: 42000,
    tier: 'Premium',
    image: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=600&q=80',
    description: 'Serving Hosur and Bangalore border couples with sleek outdoor pre-wedding concepts.',
    experience: '5+ Years Experience',
    phone: '+91 91501 97966',
  },
  {
    id: 'studio-24',
    name: 'Coromandel Clicks',
    rating: 4.0,
    reviewsCount: 46,
    location: 'Cuddalore',
    category: 'Classic Traditional',
    startingPrice: '₹25,000 onwards',
    priceValue: 25000,
    tier: 'Essential',
    image: 'https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=600&q=80',
    description: 'Friendly photography crew specializing in village and mandapam traditional wedding rituals.',
    experience: '4+ Years Experience',
    phone: '+91 91501 97966',
  },
  {
    id: 'studio-25',
    name: 'Pasumpon Traditions',
    rating: 3.8,
    reviewsCount: 38,
    location: 'Ramanathapuram',
    category: 'Heritage Rites',
    startingPrice: '₹21,000 onwards',
    priceValue: 21000,
    tier: 'Essential',
    image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=600&q=80',
    description: 'Pocket-friendly wedding photography focusing on authentic Chettinad and coastal traditions.',
    experience: '5+ Years Experience',
    phone: '+91 91501 97966',
  },
  {
    id: 'studio-26',
    name: 'Karur Handloom Visuals',
    rating: 4.3,
    reviewsCount: 59,
    location: 'Karur',
    category: 'Traditional & Reception',
    startingPrice: '₹32,000 onwards',
    priceValue: 32000,
    tier: 'Essential',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
    description: 'Warm lighting and detailed coverage of garland exchanges, thaali tying, and reception stage.',
    experience: '6+ Years Experience',
    phone: '+91 91501 97966',
  },
  {
    id: 'studio-27',
    name: 'Pudukkottai Palace Frames',
    rating: 4.2,
    reviewsCount: 49,
    location: 'Pudukkottai',
    category: 'Royal Heritage',
    startingPrice: '₹29,000 onwards',
    priceValue: 29000,
    tier: 'Essential',
    image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=600&q=80',
    description: 'Capturing palace architectures and cultural legacy weddings in Chettinad belt.',
    experience: '7+ Years Experience',
    phone: '+91 91501 97966',
  },
  {
    id: 'studio-28',
    name: 'Anjaneya Hill Captures',
    rating: 3.9,
    reviewsCount: 43,
    location: 'Namakkal',
    category: 'Budget Traditional',
    startingPrice: '₹24,500 onwards',
    priceValue: 24500,
    tier: 'Essential',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80',
    description: 'Prompt service, candid portraits, and flush-mount wedding albums at competitive prices.',
    experience: '4+ Years Experience',
    phone: '+91 91501 97966',
  },
  {
    id: 'studio-29',
    name: 'Marina Breeze Photography',
    rating: 4.4,
    reviewsCount: 82,
    location: 'Chennai',
    category: 'Beach & Outdoor Shoots',
    startingPrice: '₹39,000 onwards',
    priceValue: 39000,
    tier: 'Premium',
    image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=600&q=80',
    description: 'ECR resort shoots, beachside sunrise portraits, and candid engagement party coverage.',
    experience: '5+ Years Experience',
    phone: '+91 91501 97966',
  },
  {
    id: 'studio-30',
    name: 'Kovai Vista Studios',
    rating: 4.6,
    reviewsCount: 94,
    location: 'Coimbatore',
    category: 'Modern Wedding Cinematography',
    startingPrice: '₹48,000 onwards',
    priceValue: 48000,
    tier: 'Premium',
    image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=600&q=80',
    description: 'Fresh youthful photography studio specializing in sangeet dance teasers and drone highlight reels.',
    experience: '6+ Years Experience',
    phone: '+91 91501 97966',
  },
  {
    id: 'studio-31',
    name: 'Meenakshi Royal Clicks',
    rating: 4.7,
    reviewsCount: 110,
    location: 'Madurai',
    category: 'Grand Marriage Rites',
    startingPrice: '₹55,000 onwards',
    priceValue: 55000,
    tier: 'Premium',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80',
    description: 'Traditional temple city photography experts with grand lighting rigs for big halls.',
    experience: '9+ Years Experience',
    phone: '+91 91501 97966',
  },
  {
    id: 'studio-32',
    name: 'Rockfort Candid Films',
    rating: 4.2,
    reviewsCount: 68,
    location: 'Trichy',
    category: 'Candid & Drone',
    startingPrice: '₹34,000 onwards',
    priceValue: 34000,
    tier: 'Essential',
    image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=600&q=80',
    description: 'Capturing joyful haldi laughs and energetic reception dances across Central Tamil Nadu.',
    experience: '5+ Years Experience',
    phone: '+91 91501 97966',
  },
  {
    id: 'studio-33',
    name: 'Mango City Snaps',
    rating: 4.1,
    reviewsCount: 52,
    location: 'Salem',
    category: 'Budget Photography',
    startingPrice: '₹27,000 onwards',
    priceValue: 27000,
    tier: 'Essential',
    image: 'https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=600&q=80',
    description: 'Complete marriage package including 2 traditional cameras, 1 candid camera, and 2 printed albums.',
    experience: '5+ Years Experience',
    phone: '+91 91501 97966',
  },
  {
    id: 'studio-34',
    name: 'Halwa Land Moments',
    rating: 4.3,
    reviewsCount: 63,
    location: 'Tirunelveli',
    category: 'Traditional & Candid',
    startingPrice: '₹31,000 onwards',
    priceValue: 31000,
    tier: 'Essential',
    image: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&w=600&q=80',
    description: 'Heartfelt family portraits and ritual coverage in Southern Tamil Nadu.',
    experience: '6+ Years Experience',
    phone: '+91 91501 97966',
  },
  {
    id: 'studio-35',
    name: 'Turmeric Glory Visuals',
    rating: 4.0,
    reviewsCount: 47,
    location: 'Erode',
    category: 'Standard Wedding',
    startingPrice: '₹24,000 onwards',
    priceValue: 24000,
    tier: 'Essential',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80',
    description: 'Clear crisp photography and traditional videography with LED display setup.',
    experience: '4+ Years Experience',
    phone: '+91 91501 97966',
  },
];

export interface PhotographyListingPageProps {
  onBack: () => void;
  savedStudioIds?: Record<string, boolean>;
  onToggleSavedStudio?: (id: string) => void;
  onOpenSavedTab?: () => void;
  onNavigateToQuotesTab?: () => void;
  bookingSource?: 'entire_wedding' | 'individual';
  onNavigateToProfileMyBookings?: () => void;
}

export const PhotographyListingPage: React.FC<PhotographyListingPageProps> = ({
  onBack,
  savedStudioIds,
  onToggleSavedStudio,
  onOpenSavedTab,
  onNavigateToQuotesTab,
  bookingSource = 'entire_wedding',
  onNavigateToProfileMyBookings,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedBudget, setSelectedBudget] = useState('All');
  const [selectedRating, setSelectedRating] = useState('All');
  const [selectedTier, setSelectedTier] = useState('All');
  const [activeFilterModal, setActiveFilterModal] = useState<'city' | 'budget' | 'rating' | 'tier' | null>(null);

  const initialRoute = getInitialRoute();
  const [selectedStudio, setSelectedStudio] = useState<PhotographyStudio | null>(() => {
    if (initialRoute.subpage === 'photography' && initialRoute.detailId) {
      return STUDIOS_DATA.find((s) => s.id === initialRoute.detailId) || null;
    }
    return null;
  });

  const openStudioDetail = (studio: PhotographyStudio) => {
    setSelectedStudio(studio);
    setAppRoute({ screen: 'dashboard', subpage: 'photography', detailId: studio.id });
  };

  const closeStudioDetail = () => {
    setSelectedStudio(null);
    setAppRoute({ screen: 'dashboard', subpage: 'photography', detailId: null });
  };

  // Sync hash changes for photography detail view
  useEffect(() => {
    const handleHash = () => {
      const route = parseHashRoute();
      if (route && route.subpage === 'photography') {
        if (route.detailId) {
          const match = STUDIOS_DATA.find((s) => s.id === route.detailId);
          if (match) setSelectedStudio(match);
        } else {
          setSelectedStudio(null);
        }
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);
  
  // Send Quote Modal State
  const [quoteStudio, setQuoteStudio] = useState<PhotographyStudio | null>(null);
  const [quoteSuccess, setQuoteSuccess] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [eventDate, setEventDate] = useState('15 December 2026');
  const [eventLocation, setEventLocation] = useState('');
  const [eventType, setEventType] = useState<'Wedding' | 'Reception' | 'Engagement' | 'Other'>('Wedding');
  const [photographyType, setPhotographyType] = useState('Wedding Photography');
  const [showPhotoTypeDropdown, setShowPhotoTypeDropdown] = useState(false);
  
  // Local fallback state if parent doesn't manage saved IDs
  const [localBookmarkedIds, setLocalBookmarkedIds] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('saved_photography_studios');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed['studio-1']) {
          delete parsed['studio-1'];
          localStorage.setItem('saved_photography_studios', JSON.stringify(parsed));
        }
        return parsed;
      }
      return {};
    } catch {
      return {};
    }
  });

  const bookmarkedIds = savedStudioIds || localBookmarkedIds;
  const savedStudiosList = STUDIOS_DATA.filter((s) => Boolean(bookmarkedIds[s.id]));
  const [showCompareModal, setShowCompareModal] = useState(false);

  const toggleBookmark = (id: string) => {
    if (onToggleSavedStudio) {
      onToggleSavedStudio(id);
    } else {
      setLocalBookmarkedIds((prev) => {
        const updated = { ...prev, [id]: !prev[id] };
        try {
          localStorage.setItem('saved_photography_studios', JSON.stringify(updated));
        } catch (e) {
          console.error(e);
        }
        return updated;
      });
    }
  };

  // Filter Studios Logic
  const filteredStudios = STUDIOS_DATA.filter((studio) => {
    // Search Query
    const matchesSearch =
      studio.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      studio.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      studio.location.toLowerCase().includes(searchQuery.toLowerCase());

    // City Filter
    const matchesCity =
      selectedCity === 'All' ||
      selectedCity === 'All Cities' ||
      studio.location.toLowerCase() === selectedCity.toLowerCase() ||
      selectedCity.toLowerCase().includes(studio.location.toLowerCase());

    // Budget Filter
    let matchesBudget = true;
    if (selectedBudget !== 'All') {
      const bObj = BUDGET_OPTIONS.find((b) => b.id === selectedBudget);
      if (bObj && bObj.min !== undefined && bObj.max !== undefined) {
        matchesBudget = studio.priceValue >= bObj.min && studio.priceValue <= bObj.max;
      }
    }

    // Rating Filter
    let matchesRating = true;
    if (selectedRating !== 'All') {
      const rObj = RATING_OPTIONS.find((r) => r.id === selectedRating);
      if (rObj && rObj.minRating !== undefined) {
        matchesRating = studio.rating >= rObj.minRating;
      }
    }

    // Tier Filter
    let matchesTier = true;
    if (selectedTier !== 'All') {
      matchesTier = studio.tier === selectedTier;
    }

    return matchesSearch && matchesCity && matchesBudget && matchesRating && matchesTier;
  });

  const resetAllFilters = () => {
    setSelectedCity('All');
    setSelectedBudget('All');
    setSelectedRating('All');
    setSelectedTier('All');
    setSearchQuery('');
  };

  const isAnyFilterActive =
    selectedCity !== 'All' || selectedBudget !== 'All' || selectedRating !== 'All' || selectedTier !== 'All';

  if (selectedStudio) {
    return (
      <StudioDetailPage
        studio={selectedStudio}
        onBack={closeStudioDetail}
        isBookmarked={Boolean(bookmarkedIds[selectedStudio.id])}
        onToggleBookmark={toggleBookmark}
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
      {/* Top Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.iconButton} onPress={onBack} activeOpacity={0.7}>
          <ChevronLeft className="w-6 h-6 text-[#2A2425]" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Photography</Text>

        <View style={styles.headerRightIcons}>
          {isAnyFilterActive && (
            <TouchableOpacity style={styles.resetBadgeBtn} onPress={resetAllFilters} activeOpacity={0.7}>
              <Text style={styles.resetBadgeText}>Reset</Text>
            </TouchableOpacity>
          )}
          {onOpenSavedTab && (
            <TouchableOpacity
              style={styles.iconButton}
              activeOpacity={0.7}
              onPress={onOpenSavedTab}
            >
              <Heart
                className={`w-5 h-5 ${
                  Object.values(bookmarkedIds).some(Boolean)
                    ? 'text-[#8B1E2F] fill-[#8B1E2F]'
                    : 'text-[#2A2425]'
                }`}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Search Input Bar */}
      <View style={styles.searchBarContainer}>
        <Search className="w-4 h-4 text-[#8C7A7C] mr-2" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by studio, category, or district..."
          placeholderTextColor="#9A888A"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <X className="w-4 h-4 text-[#8C7A7C]" />
          </TouchableOpacity>
        )}
      </View>

      {/* Filter Chips Bar */}
      <View style={styles.filterRowContainer}>
        {/* City Filter */}
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

        {/* Budget Filter */}
        <TouchableOpacity
          style={[styles.filterChip, selectedBudget !== 'All' && styles.filterChipActive]}
          onPress={() => setActiveFilterModal('budget')}
          activeOpacity={0.8}
        >
          <Text
            style={[styles.filterChipText, selectedBudget !== 'All' && styles.filterChipTextActive]}
            numberOfLines={1}
          >
            {selectedBudget === 'All'
              ? 'Budget ▼'
              : `${BUDGET_OPTIONS.find((b) => b.id === selectedBudget)?.label || 'Budget'} ▼`}
          </Text>
        </TouchableOpacity>

        {/* Rating Filter */}
        <TouchableOpacity
          style={[styles.filterChip, selectedRating !== 'All' && styles.filterChipActive]}
          onPress={() => setActiveFilterModal('rating')}
          activeOpacity={0.8}
        >
          <Text
            style={[styles.filterChipText, selectedRating !== 'All' && styles.filterChipTextActive]}
            numberOfLines={1}
          >
            {selectedRating === 'All' ? 'Rating ▼' : `${selectedRating}★ ▼`}
          </Text>
        </TouchableOpacity>

        {/* Tier Filter */}
        <TouchableOpacity
          style={[styles.filterChip, selectedTier !== 'All' && styles.filterChipActive]}
          onPress={() => setActiveFilterModal('tier')}
          activeOpacity={0.8}
        >
          <Text
            style={[styles.filterChipText, selectedTier !== 'All' && styles.filterChipTextActive]}
            numberOfLines={1}
          >
            {selectedTier === 'All' ? 'Tier ▼' : `${selectedTier} ▼`}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Subtitle Section & Result Count */}
      <View style={styles.recommendedRow}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.recommendedTitle}>Recommended Studios</Text>
          <Sparkles className="w-4 h-4 text-[#C28E38] ml-1.5" />
        </View>
        <Text style={styles.resultCountText}>{filteredStudios.length} studios</Text>
      </View>

      {/* Studios Vertical List */}
      <ScrollView
        style={[styles.listScrollView, { overflowY: 'auto' } as any]}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredStudios.length === 0 ? (
          <View style={styles.emptyStateContainer}>
            <SlidersHorizontal className="w-10 h-10 text-[#C2B5A8] mb-2" />
            <Text style={styles.emptyStateTitle}>No studios found</Text>
            <Text style={styles.emptyStateSub}>
              Try adjusting your city, budget range, or rating filter.
            </Text>
            <TouchableOpacity style={styles.emptyResetBtn} onPress={resetAllFilters}>
              <Text style={styles.emptyResetBtnText}>Reset All Filters</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {filteredStudios.map((studio) => {
            const isBookmarked = Boolean(bookmarkedIds[studio.id]);
            return (
              <motion.div
                key={studio.id}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mb-3.5 cursor-pointer"
                onClick={() => openStudioDetail(studio)}
              >
                <View style={styles.studioCard}>
                  {/* Left Photo */}
                  <Image
                    source={{ uri: studio.image }}
                    style={styles.studioImage}
                    resizeMode="cover"
                  />

                  {/* Right Info Details */}
                  <View style={styles.cardRightCol}>
                    <View style={styles.cardHeaderRow}>
                      <Text style={styles.studioName} numberOfLines={1}>
                        {studio.name}
                      </Text>
                      <TouchableOpacity
                        onPress={() => toggleBookmark(studio.id)}
                        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                      >
                        <Bookmark
                          className={`w-4 h-4 ${
                            isBookmarked ? 'text-[#8B1E2F] fill-[#8B1E2F]' : 'text-[#8C7A7C]'
                          }`}
                        />
                      </TouchableOpacity>
                    </View>

                    {/* Rating & Tier Badge */}
                    <View style={styles.ratingRow}>
                      <Star className="w-3.5 h-3.5 text-[#E5A93C] fill-[#E5A93C] mr-1" />
                      <Text style={styles.ratingText}>
                        {studio.rating}{' '}
                        <Text style={styles.reviewsText}>({studio.reviewsCount})</Text>
                      </Text>
                      <View
                        style={[
                          styles.tierPill,
                          studio.tier === 'Signature' && { backgroundColor: '#FEF3C7', borderWidth: 1, borderColor: '#FDE68A' },
                          studio.tier === 'Premium' && { backgroundColor: '#F5E8EA', borderWidth: 1, borderColor: '#E8D2D5' },
                          studio.tier === 'Essential' && { backgroundColor: '#E6F4EA', borderWidth: 1, borderColor: '#CEEAD6' },
                        ]}
                      >
                        <Text
                          style={[
                            styles.tierPillText,
                            studio.tier === 'Signature' && { color: '#92400E' },
                            studio.tier === 'Premium' && { color: '#581420' },
                            studio.tier === 'Essential' && { color: '#137333' },
                          ]}
                        >
                          {studio.tier}
                        </Text>
                      </View>
                    </View>

                    {/* Location */}
                    <View style={styles.locationRow}>
                      <MapPin className="w-3.5 h-3.5 text-[#8C7A7C] mr-1" />
                      <Text style={styles.locationText}>{studio.location}</Text>
                    </View>

                    {/* Category */}
                    <Text style={styles.categoryText} numberOfLines={1}>
                      {studio.category}
                    </Text>

                    {/* Starting Price & Humble View Details */}
                    <View style={styles.cardFooterRow}>
                      <Text style={styles.priceText}>{studio.startingPrice}</Text>
                      <TouchableOpacity
                        style={styles.viewDetailsBtn}
                        onPress={() => openStudioDetail(studio)}
                        activeOpacity={0.8}
                      >
                        <Text style={styles.viewDetailsBtnText}>View Details</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </motion.div>
            );
          })}
          </div>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* FILTER DROPDOWN MODAL (CITY, BUDGET, RATING, TIER) */}
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
              style={styles.modalSheet}
              className="cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <View style={styles.filterModalHeader}>
                <Text style={styles.filterModalTitle}>
                  {activeFilterModal === 'city' && 'Select District / City'}
                  {activeFilterModal === 'budget' && 'Select Budget Range'}
                  {activeFilterModal === 'rating' && 'Select Minimum Rating'}
                  {activeFilterModal === 'tier' && 'Select City Tier'}
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
                            setSelectedCity(district);
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
                    {BUDGET_OPTIONS.map((b) => {
                      const isSelected = selectedBudget === b.id;
                      return (
                        <div
                          key={b.id}
                          onClick={() => {
                            setSelectedBudget(b.id);
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
                            {b.label}
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
                      const isSelected = selectedRating === r.id;
                      return (
                        <div
                          key={r.id}
                          onClick={() => {
                            setSelectedRating(r.id);
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
                              {r.label}
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
                      const isSelected = selectedTier === t.id;
                      return (
                        <div
                          key={t.id}
                          onClick={() => {
                            setSelectedTier(t.id);
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
                          <View>
                            <Text
                              style={isSelected ? styles.optionItemTextSelected : styles.optionItemText}
                            >
                              {t.label}
                            </Text>
                            {t.desc && <Text style={styles.optionDescText}>{t.desc}</Text>}
                          </View>
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

      {/* SEND QUOTE MODAL POPUP */}
      <RequestQuoteModal
        visible={Boolean(quoteStudio)}
        vendorId={quoteStudio?.id}
        vendorName={quoteStudio?.name || ''}
        vendorLocation={quoteStudio?.location || ''}
        onClose={() => setQuoteStudio(null)}
      />

      {/* FLOATING COMPARE BAR WHEN 2+ STUDIOS ARE SELECTED/SAVED */}
      <AnimatePresence>
        {savedStudiosList.length >= 2 && (
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
                <Text style={styles.floatingCompareBadgeText}>{savedStudiosList.length}</Text>
              </View>
              <Scale className="w-4 h-4 text-white mr-1.5" />
              <Text style={styles.floatingCompareBtnText}>Compare ({savedStudiosList.length})</Text>
              <ChevronRight className="w-4 h-4 text-white ml-1" />
            </TouchableOpacity>
          </motion.div>
        )}
      </AnimatePresence>

      {/* VENDOR COMPARE MODAL */}
      <VendorCompareModal
        visible={showCompareModal}
        categoryTitle="Photography Studios"
        vendors={savedStudiosList}
        onClose={() => setShowCompareModal(false)}
        onSelectVendor={(v) => {
          const match = STUDIOS_DATA.find((s) => s.id === v.id);
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
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  iconButton: {
    padding: 6,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.7)',
  },
  resetBadgeBtn: {
    backgroundColor: '#8B1E2F',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  resetBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
  },
  headerTitle: {
    fontFamily: 'Playfair Display, Georgia, serif',
    fontSize: 20,
    fontWeight: '700',
    color: '#2A2425',
    textAlign: 'center',
  },
  headerRightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 4,
    marginBottom: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#EFE7DE',
  },
  searchInput: {
    flex: 1,
    fontSize: 12,
    color: '#2A2425',
    padding: 0,
  },
  filterRowContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 6,
    marginBottom: 8,
    alignItems: 'center',
  },
  filterChip: {
    flex: 1,
    height: 32,
    paddingHorizontal: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDD6CE',
    justifyContent: 'center',
    alignItems: 'center',
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
    fontWeight: '600',
  },
  recommendedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    marginTop: 2,
    marginBottom: 8,
  },
  recommendedTitle: {
    fontFamily: 'Playfair Display, Georgia, serif',
    fontSize: 15,
    fontWeight: '600',
    color: '#2A2425',
  },
  resultCountText: {
    fontSize: 11,
    color: '#8C7A7C',
    fontWeight: '500',
  },
  listScrollView: {
    flex: 1,
    height: '100%',
  },
  listContent: {
    paddingHorizontal: 16,
  },
  studioCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 10,
    borderWidth: 1,
    borderColor: '#F0E8DF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  studioImage: {
    width: 105,
    height: 125,
    borderRadius: 10,
  },
  cardRightCol: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  studioName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1415',
    flex: 1,
    marginRight: 6,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2A2425',
  },
  reviewsText: {
    fontWeight: '400',
    color: '#7C6B6D',
  },
  tierPill: {
    backgroundColor: '#F3EFEA',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 8,
    marginLeft: 8,
  },
  tierPillText: {
    fontSize: 9,
    fontWeight: '600',
    color: '#581420',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
  },
  locationText: {
    fontSize: 11,
    color: '#6B5A5C',
  },
  categoryText: {
    fontSize: 11,
    color: '#8C7A7C',
    marginTop: 2,
  },
  cardFooterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: '#F3ECE3',
  },
  priceText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#2A2425',
  },
  viewDetailsBtn: {
    backgroundColor: '#F5EEE6',
    borderWidth: 1,
    borderColor: '#E8DFD5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignItems: 'center',
  },
  viewDetailsBtnText: {
    color: '#581420',
    fontSize: 10.5,
    fontWeight: '700',
  },
  emptyStateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
  },
  emptyStateTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2A2425',
    marginBottom: 4,
  },
  emptyStateSub: {
    fontSize: 12,
    color: '#8C7A7C',
    textAlign: 'center',
    maxWidth: 240,
    marginBottom: 16,
  },
  emptyResetBtn: {
    backgroundColor: '#581420',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 18,
  },
  emptyResetBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
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
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 2,
  },
  optionItemSelected: {
    backgroundColor: '#F3ECE4',
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
  optionDescText: {
    fontSize: 10,
    color: '#8C7A7C',
    marginTop: 2,
  },
  modalCloseBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 10,
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderRadius: 20,
    padding: 6,
  },
  modalHeroImage: {
    width: '100%',
    height: 180,
  },
  modalTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {
    fontFamily: 'Playfair Display, Georgia, serif',
    fontSize: 20,
    fontWeight: '700',
    color: '#2A2425',
  },
  modalRatingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF2D6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  modalRatingText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#8A5D00',
  },
  modalCategory: {
    fontSize: 13,
    color: '#8C7A7C',
    marginTop: 2,
  },
  modalMetaRow: {
    flexDirection: 'row',
    gap: 14,
    marginTop: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 12,
    color: '#6B5A5C',
  },
  modalPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#581420',
    marginTop: 10,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2A2425',
    marginTop: 14,
    marginBottom: 4,
  },
  modalDescription: {
    fontSize: 12,
    lineHeight: 18,
    color: '#5A4C4E',
  },
  modalActionRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 18,
  },
  callStudioBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#8B1E2F',
    borderRadius: 20,
    paddingVertical: 10,
  },
  callStudioBtnText: {
    color: '#8B1E2F',
    fontWeight: '600',
    fontSize: 13,
  },
  bookNowBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#581420',
    borderRadius: 20,
    paddingVertical: 10,
  },
  bookNowBtnText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 13,
  },
  sendQuoteCardBtn: {
    backgroundColor: '#FAF2E8',
    borderWidth: 1,
    borderColor: '#EFE3D3',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sendQuoteCardBtnText: {
    color: '#581420',
    fontSize: 11,
    fontWeight: '700',
  },
  quoteBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  quoteModalSheet: {
    backgroundColor: '#FAF7F2',
    borderRadius: 20,
    width: '90%',
    maxWidth: 450,
    
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 24,
    position: 'relative',
    maxHeight: '90%',
  },
  quoteCloseBtn: {
    position: 'absolute',
    top: 14,
    right: 14,
    zIndex: 10,
    backgroundColor: '#EFE7DE',
    borderRadius: 16,
    padding: 6,
  },
  topStudioCard: {
    backgroundColor: '#FAF2E8',
    borderWidth: 1,
    borderColor: '#EFE3D3',
    borderRadius: 16,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 12,
  },
  topStudioAvatar: {
    width: 58,
    height: 58,
    borderRadius: 14,
  },
  topStudioInfo: {
    flex: 1,
    marginLeft: 12,
  },
  topSendingToText: {
    fontSize: 12,
    color: '#786B6D',
    fontWeight: '500',
  },
  topStudioName: {
    fontFamily: 'Playfair Display, Georgia, serif',
    fontSize: 17,
    fontWeight: '800',
    color: '#581420',
    marginTop: 1,
    marginBottom: 2,
  },
  topStudioLocRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topStudioLocText: {
    fontSize: 12,
    color: '#6E5D60',
    fontWeight: '500',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionHeaderTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#581420',
    letterSpacing: 0.8,
  },
  fieldContainer: {
    marginBottom: 12,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#3D3234',
    marginBottom: 5,
  },
  requiredAsterisk: {
    color: '#B91C1C',
    fontWeight: '700',
  },
  inputWithIconBox: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8DEC2',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fieldInputFlex: {
    flex: 1,
    fontSize: 13,
    color: '#2A2425',
    fontWeight: '500',
    height: '100%',
    padding: 0,
  },
  pillsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  eventTypePill: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8DEC2',
  },
  eventTypePillSelected: {
    backgroundColor: '#581420',
    borderColor: '#581420',
  },
  eventTypePillText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#581420',
  },
  eventTypePillTextSelected: {
    color: '#FFFFFF',
  },
  dropdownSelectedText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2A2425',
  },
  dropdownMenuBox: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8DEC2',
    borderRadius: 12,
    marginTop: 4,
    paddingVertical: 4,
  },
  dropdownMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FAF7F2',
  },
  dropdownMenuText: {
    fontSize: 12,
    color: '#3D3234',
  },
  sendQuoteSubmitBtn: {
    marginTop: 18,
    backgroundColor: '#581420',
    height: 48,
    borderRadius: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#581420',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  sendQuoteSubmitBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  quoteSuccessBox: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  quoteSuccessTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#15803D',
  },
  quoteSuccessSub: {
    fontSize: 13,
    color: '#6B5A5C',
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 18,
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

