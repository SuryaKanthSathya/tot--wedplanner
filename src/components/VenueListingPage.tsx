import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  TextInput,
} from 'react-native-web';
import {
  ArrowLeft,
  Star,
  MapPin,
  Heart,
  Search,
  Building2,
  Filter,
  Users,
  CheckCircle2,
  Calendar,
  Eye,
  Sparkles,
  Home,
  Utensils,
  Car,
  ChevronRight,
  Bookmark,
  Check,
  X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { VenueItem, VenueDetailPage } from './VenueDetailPage';
export type { VenueItem };

export const VENUES_DATA: VenueItem[] = [
  {
    id: 'venue-1',
    name: 'Grand Royal Mandapam & Convention Center',
    category: 'AC Mandapam & Convention Hall',
    city: 'Chennai',
    location: 'ECR, Akkarai',
    rating: 4.9,
    reviewsCount: 210,
    startingPrice: '₹2,50,000 onwards',
    priceValue: 250000,
    tier: 'Signature',
    capacity: '1,500 - 3,000 Guests',
    capacityValue: 3000,
    image: '/src/assets/images/wedding_banquet_hall_pic_1786470818992.jpg',
    description:
      'Sprawling air-conditioned grand mandapam with state-of-the-art stage lighting, pillarless main hall with 30ft high ceilings, grand entrance foyer, and dedicated dining hall capable of serving 800 guests per batch.',
    experience: '12+ Years',
    roomsAvailable: '30 AC Deluxe Rooms + 2 Royal Bridal Suites',
    parkingSpace: '600+ Cars & 1,200 Two-Wheelers',
    cateringPolicy: 'Pure Veg In-house & External Catering Allowed',
    amenities: [
      'Pillarless Grand Stage',
      'Centralized Air Conditioning',
      '100% Generator Backup',
      'Dedicated Dining Hall (800 seats)',
      'Green Rooms for Bride & Groom',
      'Valet Parking Staff Available',
    ],
    features: ['High Ceilings', 'Grand Foyer', 'Valet Parking', 'Pillarless Hall'],
    portfolio: [
      '/src/assets/images/wedding_banquet_hall_pic_1786470818992.jpg',
      '/src/assets/images/guest_banquet_hall_stage_1786471284070.jpg',
      '/src/assets/images/white_banquet_illustration_1786471427275.jpg',
      '/src/assets/images/chennai_landmark_pic_1786469508338.jpg',
    ],
    packages: [
      {
        title: 'Full Day Muhurtham & Reception',
        price: '₹2,50,000 / Day',
        description: 'Includes Main Hall, Dining Hall, 10 Complimentary AC Rooms, and Generator Fuel Usage.',
      },
      {
        title: '2-Day Grand Wedding Package',
        price: '₹4,50,000 / 2 Days',
        description: 'Covers Sangeet Evening, Muhurtham & Reception + All 30 AC Deluxe Rooms.',
      },
    ],
    phone: '+91 98401 22334',
    whatsapp: '919840122334',
    instagram: '@grandroyal_convention',
  },
  {
    id: 'venue-2',
    name: 'The Leela Palace & Seafront Lawns',
    category: '5-Star Hotel & Seafront Lawn',
    city: 'Chennai',
    location: 'MRC Nagar, Raja Annamalaipuram',
    rating: 4.9,
    reviewsCount: 185,
    startingPrice: '₹5,00,000 onwards',
    priceValue: 500000,
    tier: 'Luxury',
    capacity: '500 - 1,500 Guests',
    capacityValue: 1500,
    image: '/src/assets/images/chennai_landmark_pic_1786469508338.jpg',
    description:
      'Ultra-luxury 5-star oceanfront hotel offering majestic grand ballrooms with crystal chandeliers, sea-facing open lawn setups, world-class multi-cuisine catering, and royal presidential suites.',
    experience: '15+ Years',
    roomsAvailable: '50 Luxury Sea View Rooms',
    parkingSpace: '800+ Cars with Valet Service',
    cateringPolicy: '5-Star Executive Chef In-house Catering Only',
    amenities: [
      'Sea Facing Open-air Lawn',
      'Grand Royal Ballroom',
      '5-Star Gourmet Catering',
      'Luxury Spa & Poolside',
      'Presidential Bridal Suite',
      'Helipad & VIP Security',
    ],
    features: ['Seafront View', '5-Star Luxury', 'Crystal Ballrooms', 'Valet Service'],
    portfolio: [
      '/src/assets/images/chennai_landmark_pic_1786469508338.jpg',
      '/src/assets/images/wedding_banquet_hall_pic_1786470818992.jpg',
      '/src/assets/images/mahabalipuram_shore_temple_1786470287462.jpg',
      '/src/assets/images/guest_banquet_hall_stage_1786471284070.jpg',
    ],
    phone: '+91 98402 33445',
    whatsapp: '919840233445',
    instagram: '@leelapalace_chennai',
  },
  {
    id: 'venue-3',
    name: 'Ananya Heritage Mandapam & Gardens',
    category: 'Traditional AC Mandapam',
    city: 'Coimbatore',
    location: 'Avinashi Road, Peelamedu',
    rating: 4.8,
    reviewsCount: 162,
    startingPrice: '₹1,80,000 onwards',
    priceValue: 180000,
    tier: 'Signature',
    capacity: '1,000 - 2,000 Guests',
    capacityValue: 2000,
    image: '/src/assets/images/coimbatore_adiyogi_shiva_1786470303170.jpg',
    description:
      'Chettinad and traditional Kongu style architectural mandapam adorned with carved teakwood pillars, marble flooring, lush garden courtyards for Mehendi, and spacious banana-leaf dining capacity.',
    experience: '10+ Years',
    roomsAvailable: '20 AC Suite Rooms',
    parkingSpace: '400+ Cars',
    cateringPolicy: 'Traditional Pure Veg Catering Only',
    amenities: [
      'Teakwood Pillar Mandapam Stage',
      'Landscaped Outdoor Courtyard',
      'Air Conditioned Dining Hall',
      'South Indian Traditional Kitchen',
      'Bridal Dressing Suites',
    ],
    features: ['Teakwood Pillars', 'Courtyard Lawn', 'Pure Veg Kitchen'],
    portfolio: [
      '/src/assets/images/coimbatore_adiyogi_shiva_1786470303170.jpg',
      '/src/assets/images/tn_heritage_palace_pic_1786469719545.jpg',
      '/src/assets/images/wedding_banquet_hall_pic_1786470818992.jpg',
      '/src/assets/images/guest_banquet_hall_stage_1786471284070.jpg',
    ],
    phone: '+91 98403 44556',
    whatsapp: '919840344556',
    instagram: '@ananya_heritage_cbe',
  },
  {
    id: 'venue-4',
    name: 'Radisson Blu Beachfront Resort & Lawns',
    category: 'Luxury Beach Resort',
    city: 'Mahabalipuram',
    location: 'Covelong Road, Mahabalipuram',
    rating: 4.9,
    reviewsCount: 198,
    startingPrice: '₹3,50,000 onwards',
    priceValue: 350000,
    tier: 'Luxury',
    capacity: '300 - 1,200 Guests',
    capacityValue: 1200,
    image: '/src/assets/images/mahabalipuram_shore_temple_1786470287462.jpg',
    description:
      'Exotic destination wedding paradise right on the Bay of Bengal coastline. Features lush coconut palm lawns, beach mandapam options, luxury poolside cocktail arenas, and 5-star hospitality.',
    experience: '14+ Years',
    roomsAvailable: '45 Luxury Beach Villas & Cottages',
    parkingSpace: '500+ Cars',
    cateringPolicy: 'Multi-Cuisine In-house Resort Chefs',
    amenities: [
      'Private Beach Access Mandapam',
      'Poolside Sangeet Stage',
      'Luxury Sea View Cottages',
      'Cocktail & Bar setup allowed',
      'Beachside Buffet Dining',
    ],
    features: ['Beachfront Lawn', 'Destination Resort', 'Poolside Stage'],
    portfolio: [
      '/src/assets/images/mahabalipuram_shore_temple_1786470287462.jpg',
      '/src/assets/images/chennai_landmark_pic_1786469508338.jpg',
      '/src/assets/images/dindigul_kodaikanal_lake_1786470315614.jpg',
      '/src/assets/images/wedding_banquet_hall_pic_1786470818992.jpg',
    ],
    phone: '+91 98404 55667',
    whatsapp: '919840455667',
    instagram: '@radissonblu_mahabs',
  },
  {
    id: 'venue-5',
    name: 'Madurai Heritage Palace & Royal Hall',
    category: 'Heritage Palace & Mandapam',
    city: 'Madurai',
    location: 'KK Nagar, Near Temple Circle',
    rating: 4.8,
    reviewsCount: 145,
    startingPrice: '₹2,20,000 onwards',
    priceValue: 220000,
    tier: 'Premium',
    capacity: '800 - 2,500 Guests',
    capacityValue: 2500,
    image: '/src/assets/images/madurai_landmark_pic_1786469701562.jpg',
    description:
      'Nayak-dynasty inspired regal palace hall showcasing stone carved arches, illuminated domes, sprawling air-conditioned mandapam, and royal dining halls for authentic temple-style weddings.',
    experience: '11+ Years',
    roomsAvailable: '25 Royal Heritage Suites',
    parkingSpace: '500+ Cars',
    cateringPolicy: 'Traditional Madurai Pure Veg Feasts',
    amenities: [
      'Carved Stone Royal Arch',
      'Illuminated Dome Stage',
      'Central AC Main Hall',
      'Banquet Dining Hall (700 Seats)',
      'Traditional Nadaswaram Pavilion',
    ],
    features: ['Regal Dome Stage', 'Heritage Arches', 'Temple-style Mandapam'],
    portfolio: [
      '/src/assets/images/madurai_landmark_pic_1786469701562.jpg',
      '/src/assets/images/tn_heritage_palace_pic_1786469719545.jpg',
      '/src/assets/images/coimbatore_adiyogi_shiva_1786470303170.jpg',
      '/src/assets/images/wedding_banquet_hall_pic_1786470818992.jpg',
    ],
    phone: '+91 98405 66778',
    whatsapp: '919840566778',
    instagram: '@madurai_heritage_palace',
  },
  {
    id: 'venue-6',
    name: 'Sivam AC Convention Center & Auditorium',
    category: 'AC Auditorium & Hall',
    city: 'Tiruchirappalli',
    location: 'Thillai Nagar, Trichy',
    rating: 4.7,
    reviewsCount: 132,
    startingPrice: '₹1,50,000 onwards',
    priceValue: 150000,
    tier: 'Popular',
    capacity: '1,200 - 3,500 Guests',
    capacityValue: 3500,
    image: '/src/assets/images/white_banquet_illustration_1786471427275.jpg',
    description:
      'Massive capacity air-conditioned auditorium with theatrical seating options, broad 60ft stage width, high-definition acoustic sound insulation, and separate air-conditioned dining block.',
    experience: '8+ Years',
    roomsAvailable: '18 AC Rooms',
    parkingSpace: '700+ Vehicles',
    cateringPolicy: 'External Catering Allowed',
    amenities: [
      '60ft Broad Stage',
      'Acoustic Sound Treatment',
      'Air Conditioned Dining Hall',
      'Separate Buffet Zone',
      'Ample Bus & Car Parking',
    ],
    features: ['Broad Stage', 'Massive Capacity', 'Acoustic Hall'],
    portfolio: [
      '/src/assets/images/white_banquet_illustration_1786471427275.jpg',
      '/src/assets/images/wedding_banquet_hall_pic_1786470818992.jpg',
      '/src/assets/images/guest_banquet_hall_stage_1786471284070.jpg',
      '/src/assets/images/tn_heritage_palace_pic_1786469719545.jpg',
    ],
    phone: '+91 98406 77889',
    whatsapp: '919840677889',
    instagram: '@sivam_convention_trichy',
  },
  {
    id: 'venue-7',
    name: 'Erode Imperial Resort & Lakeview Lawns',
    category: 'Nature Resort & Open Lawn',
    city: 'Erode',
    location: 'Perundurai Road, Erode',
    rating: 4.8,
    reviewsCount: 118,
    startingPrice: '₹1,30,000 onwards',
    priceValue: 130000,
    tier: 'Popular',
    capacity: '500 - 1,800 Guests',
    capacityValue: 1800,
    image: '/src/assets/images/dindigul_kodaikanal_lake_1786470315614.jpg',
    description:
      'Serene lakeside resort setting featuring manicured green grass lawns, glass banquet hall, charming wooden deck for evening sangeet parties, and lush nature backdrop.',
    experience: '7+ Years',
    roomsAvailable: '22 Garden View Cottages',
    parkingSpace: '350+ Cars',
    cateringPolicy: 'In-house & External Catering Permitted',
    amenities: [
      'Lakeview Open-air Lawn',
      'Glass Banquet Hall',
      'Wooden Deck Sangeet Stage',
      'Cottage Accommodation',
      'Campfire & Cocktail Zone',
    ],
    features: ['Lake View', 'Garden Lawns', 'Nature Resort'],
    portfolio: [
      '/src/assets/images/dindigul_kodaikanal_lake_1786470315614.jpg',
      '/src/assets/images/mahabalipuram_shore_temple_1786470287462.jpg',
      '/src/assets/images/ooty_nilgiris_tea_pic_1786469767982.jpg',
      '/src/assets/images/wedding_banquet_hall_pic_1786470818992.jpg',
    ],
    phone: '+91 98407 88990',
    whatsapp: '919840788990',
    instagram: '@erode_imperial_resort',
  },
  {
    id: 'venue-8',
    name: 'Taj Connemara Heritage Ballroom',
    category: 'Luxury Heritage Hotel',
    city: 'Chennai',
    location: 'Binny Road, Anna Salai',
    rating: 4.9,
    reviewsCount: 176,
    startingPrice: '₹4,20,000 onwards',
    priceValue: 420000,
    tier: 'Luxury',
    capacity: '250 - 800 Guests',
    capacityValue: 800,
    image: '/src/assets/images/tn_heritage_palace_pic_1786469719545.jpg',
    description:
      'Historic colonial-era luxury hotel boasting heritage arch architecture, teakwood paneled ballrooms, intimate tropical courtyards, and Taj signature royal culinary delights.',
    experience: '20+ Years',
    roomsAvailable: '40 Heritage Suites',
    parkingSpace: '300+ Cars with Valet',
    cateringPolicy: 'Taj Signature Executive Catering Only',
    amenities: [
      'Colonial Heritage Ballroom',
      'Courtyard Poolside Lawn',
      'Taj Culinary Masterchefs',
      'Royal Suite Accommodations',
      'Heritage Photo Backdrops',
    ],
    features: ['Colonial Heritage', 'Taj Hospitality', 'Teakwood Ballroom'],
    portfolio: [
      '/src/assets/images/tn_heritage_palace_pic_1786469719545.jpg',
      '/src/assets/images/madurai_landmark_pic_1786469701562.jpg',
      '/src/assets/images/wedding_banquet_hall_pic_1786470818992.jpg',
      '/src/assets/images/guest_banquet_hall_stage_1786471284070.jpg',
    ],
    phone: '+91 98408 99001',
    whatsapp: '919840899001',
    instagram: '@tajconnemara_chennai',
  },
  {
    id: 'venue-9',
    name: 'Kovai Grand Palace AC Mandapam',
    category: 'Luxury AC Mandapam',
    city: 'Coimbatore',
    location: 'Trichy Road, Ramanathapuram',
    rating: 4.8,
    reviewsCount: 154,
    startingPrice: '₹2,10,000 onwards',
    priceValue: 210000,
    tier: 'Signature',
    capacity: '1,000 - 2,500 Guests',
    capacityValue: 2500,
    image: '/src/assets/images/guest_banquet_hall_stage_1786471284070.jpg',
    description:
      'Modern architectural masterpiece featuring gold chandelier lit ceilings, expansive marble stage floor, automated sound & light systems, and clean stainless-steel modern kitchen facilities.',
    experience: '9+ Years',
    roomsAvailable: '24 AC Deluxe Rooms',
    parkingSpace: '450+ Cars',
    cateringPolicy: 'Pure Veg In-house & Approved Caterers',
    amenities: [
      'Gold Chandelier Ceilings',
      'Central AC Main Hall',
      'Modern High-Tech Kitchen',
      'Automated Stage Lighting',
      'Bridal Suite with Dressing Mirrors',
    ],
    features: ['Gold Chandeliers', 'Modern Stage', 'Automated Lighting'],
    portfolio: [
      '/src/assets/images/guest_banquet_hall_stage_1786471284070.jpg',
      '/src/assets/images/wedding_banquet_hall_pic_1786470818992.jpg',
      '/src/assets/images/white_banquet_illustration_1786471427275.jpg',
      '/src/assets/images/coimbatore_adiyogi_shiva_1786470303170.jpg',
    ],
    phone: '+91 98409 00112',
    whatsapp: '919840900112',
    instagram: '@kovaigrandpalace',
  },
  {
    id: 'venue-10',
    name: 'Shore Temple View Beach Resort & Lawns',
    category: 'Oceanfront Resort & Gazebo Lawn',
    city: 'Mahabalipuram',
    location: 'Beach Road, Mahabalipuram',
    rating: 4.9,
    reviewsCount: 167,
    startingPrice: '₹3,20,000 onwards',
    priceValue: 320000,
    tier: 'Luxury',
    capacity: '400 - 1,500 Guests',
    capacityValue: 1500,
    image: '/src/assets/images/ooty_nilgiris_tea_pic_1786469767982.jpg',
    description:
      'Picturesque beach resort overlooking the historic ocean waters. Offers gazebo mandapams, evening fairy light garden dining, beachside fire pits, and coastal bungalow suites.',
    experience: '13+ Years',
    roomsAvailable: '35 Coastal Bungalows',
    parkingSpace: '400+ Cars',
    cateringPolicy: 'In-house Multi-Cuisine Feast Options',
    amenities: [
      'Ocean View Gazebo Mandapam',
      'Fairy Light Garden Lawn',
      'Beachside Evening Fire Pits',
      'Bungalow Stay Accommodations',
      'Outdoor Buffet Setup',
    ],
    features: ['Shoreline View', 'Gazebo Mandapam', 'Outdoor Lawns'],
    portfolio: [
      '/src/assets/images/ooty_nilgiris_tea_pic_1786469767982.jpg',
      '/src/assets/images/mahabalipuram_shore_temple_1786470287462.jpg',
      '/src/assets/images/dindigul_kodaikanal_lake_1786470315614.jpg',
      '/src/assets/images/wedding_banquet_hall_pic_1786470818992.jpg',
    ],
    phone: '+91 98410 11223',
    whatsapp: '919841011223',
    instagram: '@shoretempleview_resort',
  },
  {
    id: 'venue-11',
    name: 'Kanyakumari Sun & Ocean Resort',
    category: 'Beach Resort & Sunset Lawn',
    city: 'Nagercoil',
    location: 'Sunset Beach Road, Kanyakumari',
    rating: 4.8,
    reviewsCount: 112,
    startingPrice: '₹1,90,000 onwards',
    priceValue: 190000,
    tier: 'Premium',
    capacity: '400 - 1,200 Guests',
    capacityValue: 1200,
    image: '/src/assets/images/ramanathapuram_pamban_bridge_1786470340546.jpg',
    description:
      'Stunning beachfront resort located at the southernmost tip of India. Offers panoramic views of the ocean confluence, open sunset lawns, and coastal wedding packages.',
    experience: '8+ Years',
    roomsAvailable: '25 Deluxe Ocean-View Rooms',
    parkingSpace: '300+ Cars',
    cateringPolicy: 'Multi-cuisine Seafood & Vegetarian Catering',
    amenities: [
      'Oceanfront Sunset Lawn',
      'Open-air Seafront Stage',
      'Central AC Banquet Hall',
      'Beachside Buffet Layout',
      'Deluxe Bridal Cottages',
    ],
    features: ['Sunset View', 'Oceanfront Lawn', 'Coastal Theme'],
    portfolio: [
      '/src/assets/images/ramanathapuram_pamban_bridge_1786470340546.jpg',
      '/src/assets/images/mahabalipuram_shore_temple_1786470287462.jpg',
      '/src/assets/images/chennai_landmark_pic_1786469508338.jpg',
      '/src/assets/images/wedding_banquet_hall_pic_1786470818992.jpg',
    ],
    phone: '+91 98411 22334',
    whatsapp: '919841122334',
    instagram: '@kanyakumari_ocean_resort',
  },
  {
    id: 'venue-12',
    name: 'Nilgiri Tea Estate & Valley Lawns',
    category: 'Hill Station Resort & Valley View Lawn',
    city: 'Ooty',
    location: 'Valley View Road, Ooty',
    rating: 4.9,
    reviewsCount: 134,
    startingPrice: '₹2,80,000 onwards',
    priceValue: 280000,
    tier: 'Luxury',
    capacity: '200 - 800 Guests',
    capacityValue: 800,
    image: '/src/assets/images/ooty_nilgiris_tea_pic_1786469767982.jpg',
    description:
      'Charming luxury resort nestled in the Nilgiri hills. Surrounded by lush tea plantations, it offers misty mountain wedding backdrops, outdoor bonfire spaces, and colonial-style log chalets.',
    experience: '10+ Years',
    roomsAvailable: '30 Premium Valley Chalets',
    parkingSpace: '250+ Cars',
    cateringPolicy: 'Hill Station Specialties & Continental Cuisine',
    amenities: [
      'Misty Mountain Backdrop Lawn',
      'Colonial Wood Banquet Room',
      'Spacious Bonfire Area',
      'Outdoor Barbecue Layout',
      'Vintage Bridal Suite',
    ],
    features: ['Mountain View', 'Tea Estate Lawn', 'Misty Climate'],
    portfolio: [
      '/src/assets/images/ooty_nilgiris_tea_pic_1786469767982.jpg',
      '/src/assets/images/dindigul_kodaikanal_lake_1786470315614.jpg',
      '/src/assets/images/tn_heritage_palace_pic_1786469719545.jpg',
      '/src/assets/images/wedding_banquet_hall_pic_1786470818992.jpg',
    ],
    phone: '+91 98412 33445',
    whatsapp: '919841233445',
    instagram: '@nilgiri_tea_estate',
  },
  {
    id: 'venue-13',
    name: 'Kallanai Riverview Garden Halls',
    category: 'Riverside Garden Hall & Mandapam',
    city: 'Thanjavur',
    location: 'Kallanai Dam Road, Trichy-Tanjore Border',
    rating: 4.7,
    reviewsCount: 98,
    startingPrice: '₹1,20,000 onwards',
    priceValue: 120000,
    tier: 'Popular',
    capacity: '600 - 1,500 Guests',
    capacityValue: 1500,
    image: '/src/assets/images/trichy_rockfort_temple_1786470354684.jpg',
    description:
      'Beautiful riverside wedding venue with direct views of the historic Kallanai dam surroundings. Features manicured riverside lawns, AC banquet hall, and traditional South Indian dining setup.',
    experience: '7+ Years',
    roomsAvailable: '15 Deluxe AC Rooms',
    parkingSpace: '200+ Cars',
    cateringPolicy: 'Traditional Pure Vegetarian Tanjore Feasts',
    amenities: [
      'Riverside Scenic Lawn',
      'Central AC Mandapam',
      'Traditional Tanjore Dining Hall',
      'Fragrant Floral Entrance Arches',
      'Riverside Photo Spots',
    ],
    features: ['River View', 'Lush Garden Lawn', 'Traditional Dining'],
    portfolio: [
      '/src/assets/images/trichy_rockfort_temple_1786470354684.jpg',
      '/src/assets/images/madurai_landmark_pic_1786469701562.jpg',
      '/src/assets/images/tn_heritage_palace_pic_1786469719545.jpg',
      '/src/assets/images/wedding_banquet_hall_pic_1786470818992.jpg',
    ],
    phone: '+91 98413 44556',
    whatsapp: '919841344556',
    instagram: '@kallanai_riverview',
  },
  {
    id: 'venue-14',
    name: 'Gingee Fort Royal Courtyard',
    category: 'Fort Backdrop Heritage Lawn',
    city: 'Vellore',
    location: 'Fort Road, Gingee',
    rating: 4.8,
    reviewsCount: 88,
    startingPrice: '₹1,60,000 onwards',
    priceValue: 160000,
    tier: 'Premium',
    capacity: '500 - 1,800 Guests',
    capacityValue: 1800,
    image: '/src/assets/images/gingee_fort_viluppuram_1786470418118.jpg',
    description:
      'A unique historic wedding venue featuring a grand outdoor heritage lawn set against the majestic stone ramparts of the historic Gingee Fort. Perfect for epic royal themed weddings.',
    experience: '6+ Years',
    roomsAvailable: '12 Luxury Tented Suites',
    parkingSpace: '350+ Cars',
    cateringPolicy: 'Royal Style Multi-cuisine Menu Option',
    amenities: [
      'Fort-View Heritage Lawn',
      'Illuminated Stone Pathways',
      'Spacious Dining Pavilion',
      'Royal Canopy Stage Setup',
      'Vintage Bridal Lounges',
    ],
    features: ['Fort View Backdrop', 'Historic Heritage Lawn', 'Royal Ambience'],
    portfolio: [
      '/src/assets/images/gingee_fort_viluppuram_1786470418118.jpg',
      '/src/assets/images/tn_heritage_palace_pic_1786469719545.jpg',
      '/src/assets/images/madurai_landmark_pic_1786469701562.jpg',
      '/src/assets/images/wedding_banquet_hall_pic_1786470818992.jpg',
    ],
    phone: '+91 98414 55667',
    whatsapp: '919841455667',
    instagram: '@gingeefort_courtyard',
  },
  {
    id: 'venue-15',
    name: 'Courtallam Falls View Resort & Lawns',
    category: 'Falls View Resort & Open Lawn',
    city: 'Tirunelveli',
    location: 'Five Falls Road, Courtallam',
    rating: 4.8,
    reviewsCount: 104,
    startingPrice: '₹1,40,000 onwards',
    priceValue: 140000,
    tier: 'Popular',
    capacity: '400 - 1,500 Guests',
    capacityValue: 1500,
    image: '/src/assets/images/tenkasi_courtallam_falls_1786470431410.jpg',
    description:
      'Refreshing resort venue overlooking the majestic waterfalls of Courtallam. Features landscaped garden lawns, air-conditioned banquet halls, and forest-themed outdoor buffet setups.',
    experience: '8+ Years',
    roomsAvailable: '20 Forest Cottages',
    parkingSpace: '250+ Cars',
    cateringPolicy: 'Traditional Tirunelveli Vegetarian Catering',
    amenities: [
      'Waterfall Scenic Lawn',
      'Central AC Banquet Hall',
      'Open-air Forest Dining Zone',
      'Fragrant Herb Gardens',
      'Waterfall Photo Deck',
    ],
    features: ['Waterfall View', 'Forest Lawn', 'Scenic Climate'],
    portfolio: [
      '/src/assets/images/tenkasi_courtallam_falls_1786470431410.jpg',
      '/src/assets/images/dindigul_kodaikanal_lake_1786470315614.jpg',
      '/src/assets/images/ooty_nilgiris_tea_pic_1786469767982.jpg',
      '/src/assets/images/wedding_banquet_hall_pic_1786470818992.jpg',
    ],
    phone: '+91 98415 66778',
    whatsapp: '919841566778',
    instagram: '@courtallam_fallsview',
  },
  {
    id: 'venue-16',
    name: 'Kodaikanal Pine Forest Lawns',
    category: 'Pine Forest Eco Resort & Wood Chalet',
    city: 'Dindigul',
    location: 'Pine Forest Road, Kodaikanal',
    rating: 4.9,
    reviewsCount: 116,
    startingPrice: '₹2,50,000 onwards',
    priceValue: 250000,
    tier: 'Luxury',
    capacity: '150 - 600 Guests',
    capacityValue: 600,
    image: '/src/assets/images/dindigul_kodaikanal_lake_1786470315614.jpg',
    description:
      'Eco-friendly luxury resort nestled amidst the towering pine forests of Kodaikanal. Offers rustic wooden platforms, misty forest lawns, log fires, and gourmet catering options.',
    experience: '9+ Years',
    roomsAvailable: '22 Premium Pine Chalets',
    parkingSpace: '200+ Cars',
    cateringPolicy: 'Organic Farm-to-Table Gourmet Catering',
    amenities: [
      'Pine Forest Scenic Lawn',
      'Rustic Wooden Deck Stage',
      'Log Fire Lounge Area',
      'Luxury Heated Chalets',
      'Panoramic Valley Deck',
    ],
    features: ['Pine Forest View', 'Mist Covered Deck', 'Eco-friendly Venue'],
    portfolio: [
      '/src/assets/images/dindigul_kodaikanal_lake_1786470315614.jpg',
      '/src/assets/images/ooty_nilgiris_tea_pic_1786469767982.jpg',
      '/src/assets/images/mahabalipuram_shore_temple_1786470287462.jpg',
      '/src/assets/images/wedding_banquet_hall_pic_1786470818992.jpg',
    ],
    phone: '+91 98416 77889',
    whatsapp: '919841677889',
    instagram: '@kodaikanal_pineforest',
  },
];

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
  { id: 'under-2l', label: 'Under ₹2,00,000' },
  { id: '2l-3.5l', label: '₹2,00,000 - ₹3,50,000' },
  { id: '3.5l-5l', label: '₹3,50,000 - ₹5,00,000' },
  { id: 'above-5l', label: '₹5,00,000+' },
];

const RATING_OPTIONS = [
  { id: 'All', label: 'All Ratings' },
  { id: '4.8', label: '4.8★ & above' },
  { id: '4.9', label: '4.9★ & above' },
];

const TIER_OPTIONS = [
  { id: 'All', label: 'All Tiers' },
  { id: 'Luxury', label: 'Luxury' },
  { id: 'Signature', label: 'Signature' },
  { id: 'Premium', label: 'Premium' },
];

const TYPE_OPTIONS = [
  'All Types',
  'AC Mandapam',
  '5-Star Hotel',
  'Resort',
  'Auditorium',
  'Heritage Palace',
];

interface VenueListingPageProps {
  onBack: () => void;
  savedVenueIds?: Record<string, boolean>;
  onToggleSavedVenue?: (id: string) => void;
  onOpenSavedTab?: () => void;
  onNavigateToQuotesTab?: () => void;
}

export const VenueListingPage: React.FC<VenueListingPageProps> = ({
  onBack,
  savedVenueIds = {},
  onToggleSavedVenue = (_id?: string) => { },
  onOpenSavedTab,
  onNavigateToQuotesTab,
}) => {
  const [selectedCity, setSelectedCity] = useState<string>('All Cities');
  const [selectedBudget, setSelectedBudget] = useState<string>('All');
  const [selectedRating, setSelectedRating] = useState<string>('All');
  const [selectedTier, setSelectedTier] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Types');
  const [activeFilterModal, setActiveFilterModal] = useState<'city' | 'budget' | 'rating' | 'tier' | 'type' | null>(null);
  const [selectedVenue, setSelectedVenue] = useState<VenueItem | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredVenues = VENUES_DATA.filter((venue) => {
    const matchesCity =
      selectedCity === 'All Cities' ||
      selectedCity === 'All' ||
      venue.city.toLowerCase() === selectedCity.toLowerCase() ||
      venue.location.toLowerCase().includes(selectedCity.toLowerCase()) ||
      selectedCity.toLowerCase().includes(venue.city.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All Types' ||
      venue.category.toLowerCase().includes(selectedCategory.toLowerCase());

    const matchesSearch =
      searchQuery.trim() === '' ||
      venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      venue.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      venue.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRating =
      selectedRating === 'All'
        ? true
        : selectedRating === '4.8'
          ? venue.rating >= 4.8
          : venue.rating >= 4.9;

    const matchesTier = selectedTier === 'All' ? true : venue.tier === selectedTier;

    let matchesBudget = true;
    if (selectedBudget === 'under-2l') matchesBudget = venue.priceValue < 200000;
    else if (selectedBudget === '2l-3.5l') matchesBudget = venue.priceValue >= 200000 && venue.priceValue <= 350000;
    else if (selectedBudget === '3.5l-5l') matchesBudget = venue.priceValue > 350000 && venue.priceValue <= 500000;
    else if (selectedBudget === 'above-5l') matchesBudget = venue.priceValue > 500000;

    return matchesCity && matchesCategory && matchesSearch && matchesRating && matchesTier && matchesBudget;
  });

  if (selectedVenue) {
    return (
      <VenueDetailPage
        venue={selectedVenue}
        onBack={() => setSelectedVenue(null)}
        isBookmarked={Boolean(savedVenueIds[selectedVenue.id])}
        onToggleBookmark={onToggleSavedVenue}
        onNavigateToQuotesTab={onNavigateToQuotesTab}
      />
    );
  }

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack} activeOpacity={0.8}>
          <ArrowLeft className="w-5 h-5 text-stone-800" />
        </TouchableOpacity>

        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={styles.headerTitle}>Wedding Venues</Text>
          <Text style={styles.headerSubtitle}>Mandapams, Resorts, 5-Star Hotels & Lawns</Text>
        </View>

        {onOpenSavedTab && (
          <TouchableOpacity style={styles.savedBadgeBtn} onPress={onOpenSavedTab} activeOpacity={0.8}>
            <Bookmark className="w-4 h-4 text-[#581420]" />
          </TouchableOpacity>
        )}
      </View>

      {/* SEARCH BAR */}
      <View style={styles.searchBarWrapper}>
        <Search className="w-4 h-4 text-stone-400 mr-2" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search Mandapam, Resort, City or Hotel..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <X className="w-4 h-4 text-stone-400" />
          </TouchableOpacity>
        )}
      </View>

      {/* Filter Chips Bar */}
      <View style={styles.filterRowContainer}>
        {/* City Filter */}
        <TouchableOpacity
          style={[styles.filterChip, selectedCity !== 'All Cities' && selectedCity !== 'All' && styles.filterChipActive]}
          onPress={() => setActiveFilterModal('city')}
          activeOpacity={0.8}
        >
          <Text style={[styles.filterChipText, selectedCity !== 'All Cities' && selectedCity !== 'All' && styles.filterChipTextActive]} numberOfLines={1}>
            {selectedCity === 'All Cities' || selectedCity === 'All' ? 'All Cities ▼' : `${selectedCity} ▼`}
          </Text>
        </TouchableOpacity>

        {/* Budget Filter */}
        <TouchableOpacity
          style={[styles.filterChip, selectedBudget !== 'All' && styles.filterChipActive]}
          onPress={() => setActiveFilterModal('budget')}
          activeOpacity={0.8}
        >
          <Text style={[styles.filterChipText, selectedBudget !== 'All' && styles.filterChipTextActive]} numberOfLines={1}>
            {selectedBudget === 'All' ? 'Budget ▼' : `${BUDGET_OPTIONS.find((b) => b.id === selectedBudget)?.label || 'Budget'} ▼`}
          </Text>
        </TouchableOpacity>

        {/* Rating Filter */}
        <TouchableOpacity
          style={[styles.filterChip, selectedRating !== 'All' && styles.filterChipActive]}
          onPress={() => setActiveFilterModal('rating')}
          activeOpacity={0.8}
        >
          <Text style={[styles.filterChipText, selectedRating !== 'All' && styles.filterChipTextActive]} numberOfLines={1}>
            {selectedRating === 'All' ? 'Rating ▼' : `${selectedRating}★ ▼`}
          </Text>
        </TouchableOpacity>

        {/* Tier Filter */}
        <TouchableOpacity
          style={[styles.filterChip, selectedTier !== 'All' && styles.filterChipActive]}
          onPress={() => setActiveFilterModal('tier')}
          activeOpacity={0.8}
        >
          <Text style={[styles.filterChipText, selectedTier !== 'All' && styles.filterChipTextActive]} numberOfLines={1}>
            {selectedTier === 'All' ? 'Tier ▼' : `${selectedTier} ▼`}
          </Text>
        </TouchableOpacity>
      </View>

      {/* LIST OF VENUE CARDS */}
      <ScrollView
        style={{ flex: 1, overflowY: 'auto' } as any}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      >
        {filteredVenues.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Building2 className="w-12 h-12 text-stone-300 mb-2" />
            <Text style={styles.emptyTitle}>No Venues Found</Text>
            <Text style={styles.emptySub}>Try adjusting your search query or city filters.</Text>
          </View>
        ) : (
          filteredVenues.map((venue) => {
            const isSaved = Boolean(savedVenueIds[venue.id]);
            return (
              <motion.div key={venue.id} whileHover={{ y: -2 }} className="w-full mb-4">
                <TouchableOpacity
                  style={styles.cardContainer}
                  onPress={() => setSelectedVenue(venue)}
                  activeOpacity={0.9}
                >
                  {/* CARD IMAGE */}
                  <View style={styles.imageWrapper}>
                    <Image source={{ uri: venue.image }} style={styles.cardImage} resizeMode="cover" />

                    <View style={styles.badgeRow}>
                      <View style={styles.tierTag}>
                        <Sparkles className="w-3 h-3 text-amber-600 mr-1" />
                        <Text style={styles.tierTagText}>{venue.tier}</Text>
                      </View>

                      <TouchableOpacity
                        style={styles.bookmarkBtn}
                        onPress={(e) => {
                          e.stopPropagation();
                          onToggleSavedVenue(venue.id);
                        }}
                      >
                        <Heart
                          className={`w-4 h-4 ${isSaved ? 'text-[#581420] fill-[#581420]' : 'text-stone-700'
                            }`}
                        />
                      </TouchableOpacity>
                    </View>

                    <View style={styles.ratingBadge}>
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400 mr-1" />
                      <Text style={styles.ratingText}>{venue.rating}</Text>
                      <Text style={styles.reviewsText}>({venue.reviewsCount})</Text>
                    </View>
                  </View>

                  {/* CARD DETAILS */}
                  <View style={styles.cardBody}>
                    <Text style={styles.venueName} numberOfLines={1}>{venue.name}</Text>

                    <View style={styles.locationRow}>
                      <MapPin className="w-3.5 h-3.5 text-[#581420] mr-1" />
                      <Text style={styles.locationText}>{venue.location}, {venue.city}</Text>
                    </View>

                    <View style={styles.capacityRow}>
                      <Users className="w-3.5 h-3.5 text-stone-500 mr-1" />
                      <Text style={styles.capacityText}>{venue.capacity}</Text>
                    </View>

                    {/* FEATURE CHIPS */}
                    <View style={styles.featuresRow}>
                      {venue.features.slice(0, 3).map((feat, idx) => (
                        <View key={idx} style={styles.featureChip}>
                          <Text style={styles.featureChipText}>{feat}</Text>
                        </View>
                      ))}
                    </View>

                    <View style={styles.cardDivider} />

                    {/* PRICE & VIEW DETAILS BUTTON */}
                    <View style={styles.cardFooter}>
                      <View>
                        <Text style={styles.priceLabel}>STARTING PRICE</Text>
                        <Text style={styles.priceValue}>{venue.startingPrice}</Text>
                      </View>

                      <TouchableOpacity
                        style={styles.viewDetailsBtn}
                        onPress={() => setSelectedVenue(venue)}
                        activeOpacity={0.85}
                      >
                        <Eye className="w-3.5 h-3.5 text-white mr-1.5" />
                        <Text style={styles.viewDetailsBtnText}>View Details</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              </motion.div>
            );
          })
        )}
      </ScrollView>

      {/* FILTER DROPDOWN MODAL */}
      <AnimatePresence>
        {activeFilterModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={styles.modalBackdrop}
            onClick={() => setActiveFilterModal(null)}
          >
            <motion.div
              initial={{ y: 120, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 120, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              style={styles.modalSheet}
              onClick={(e) => e.stopPropagation()}
            >
              <View style={styles.filterModalHeader}>
                <Text style={styles.filterModalTitle}>
                  {activeFilterModal === 'city' && 'Select District / City'}
                  {activeFilterModal === 'budget' && 'Select Budget Range'}
                  {activeFilterModal === 'rating' && 'Select Minimum Rating'}
                  {activeFilterModal === 'tier' && 'Select Venue Tier'}
                </Text>
                <TouchableOpacity
                  style={styles.filterModalClose}
                  onPress={() => setActiveFilterModal(null)}
                >
                  <X className="w-5 h-5 text-[#2A2425]" />
                </TouchableOpacity>
              </View>

              <ScrollView style={{ maxHeight: 380, overflowY: 'auto' } as any} showsVerticalScrollIndicator={false}>
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
                            padding: '12px 16px',
                            borderRadius: '12px',
                            marginBottom: '4px',
                            cursor: 'pointer',
                            backgroundColor: isSelected ? '#F3ECE4' : 'transparent',
                          }}
                        >
                          <Text style={{ fontSize: 14, fontWeight: isSelected ? '700' : '500', color: isSelected ? '#581420' : '#3B2F2F' }}>
                            {b.label}
                          </Text>
                          {isSelected && <Check className="w-4 h-4 text-[#581420] stroke-[2.5]" />}
                        </div>
                      );
                    })}
                  </View>
                )}

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
                            padding: '12px 16px',
                            borderRadius: '12px',
                            marginBottom: '4px',
                            cursor: 'pointer',
                            backgroundColor: isSelected ? '#F3ECE4' : 'transparent',
                          }}
                        >
                          <Text style={{ fontSize: 14, fontWeight: isSelected ? '700' : '500', color: isSelected ? '#581420' : '#3B2F2F' }}>
                            {r.label}
                          </Text>
                          {isSelected && <Check className="w-4 h-4 text-[#581420] stroke-[2.5]" />}
                        </div>
                      );
                    })}
                  </View>
                )}

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
                            padding: '12px 16px',
                            borderRadius: '12px',
                            marginBottom: '4px',
                            cursor: 'pointer',
                            backgroundColor: isSelected ? '#F3ECE4' : 'transparent',
                          }}
                        >
                          <Text style={{ fontSize: 14, fontWeight: isSelected ? '700' : '500', color: isSelected ? '#581420' : '#3B2F2F' }}>
                            {t.label}
                          </Text>
                          {isSelected && <Check className="w-4 h-4 text-[#581420] stroke-[2.5]" />}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: '#FAF7F2',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E8DFD5',
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3ECE4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#581420',
  },
  headerSubtitle: {
    fontSize: 11.5,
    color: '#7D6E70',
  },
  savedBadgeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3ECE4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBarWrapper: {
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
    color: '#1C1917',
    padding: 0,
    outlineStyle: 'none' as any,
  },
  filterRowContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 6,
    marginBottom: 8,
    alignItems: 'center',
    width: '100%',
    boxSizing: 'border-box' as any,
  },
  filterChip: {
    flex: 1,
    minWidth: 0,
    height: 32,
    paddingHorizontal: 4,
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
    whiteSpace: 'nowrap' as any,
    overflow: 'hidden',
    textOverflow: 'ellipsis' as any,
  },
  filterChipTextActive: {
    color: '#581420',
    fontWeight: '600',
  },
  modalBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 9999,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalSheet: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  filterModalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F3ECE4',
    marginBottom: 12,
  },
  filterModalTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#581420',
  },
  filterModalClose: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3ECE4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionsList: {
    paddingVertical: 4,
  },
  listContent: {
    paddingHorizontal: 14,
    paddingTop: 8,
    paddingBottom: 100,
  },
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E8DFD5',
  },
  imageWrapper: {
    position: 'relative',
    height: 200,
    backgroundColor: '#27272A',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  badgeRow: {
    position: 'absolute',
    top: 12,
    left: 12,
    right: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tierTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tierTagText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#581420',
  },
  bookmarkBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingBadge: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 12,
  },
  reviewsText: {
    color: '#D6D3D1',
    fontSize: 10.5,
    marginLeft: 3,
  },
  cardBody: {
    padding: 14,
  },
  venueName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#581420',
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  locationText: {
    fontSize: 12.5,
    color: '#6B5E5E',
  },
  capacityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  capacityText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#3B2F2F',
  },
  featuresRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 10,
  },
  featureChip: {
    backgroundColor: '#FAF7F2',
    borderWidth: 1,
    borderColor: '#E8DFD5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  featureChipText: {
    fontSize: 11,
    color: '#581420',
    fontWeight: '600',
  },
  cardDivider: {
    height: 1,
    backgroundColor: '#E8DFD5',
    marginBottom: 10,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceLabel: {
    fontSize: 9.5,
    color: '#7D6E70',
    fontWeight: '700',
  },
  priceValue: {
    fontSize: 13.5,
    fontWeight: '800',
    color: '#581420',
  },
  viewDetailsBtn: {
    backgroundColor: '#581420',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
  },
  viewDetailsBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 12,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#3B2F2F',
  },
  emptySub: {
    fontSize: 12.5,
    color: '#7D6E70',
    marginTop: 4,
  },
});
