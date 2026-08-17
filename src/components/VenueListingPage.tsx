import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  TextInput,
} from 'react-native';
import {
  ArrowLeft,
  ChevronLeft,
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
  Scale,
  SlidersHorizontal,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { VenueItem, VenueDetailPage } from './VenueDetailPage';
import { VendorCompareModal } from './VendorCompareModal';
export type { VenueItem };

export const VENUES_DATA: VenueItem[] = [

  {
    id: 'v1',
    name: 'Radisson Blu Resort Temple Bay',
    category: 'Destination Resort & Spa',
    city: 'Mahabalipuram',
    location: 'Mahabalipuram',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹3,00,000 onwards',
    priceValue: 300000,
    tier: 'Signature',
    capacity: '200-1000 Guests',
    capacityValue: parseInt('200-1000 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/beach_resort_decor.jpg',
    description: 'A beautiful destination venue at Mahabalipuram perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v3',
    name: 'Chariot Beach Resort',
    category: 'Destination Resort & Spa',
    city: 'Mahabalipuram',
    location: 'Mahabalipuram',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹1,00,000 onwards',
    priceValue: 100000,
    tier: 'Premium',
    capacity: '100-500 Guests',
    capacityValue: parseInt('100-500 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/beach_resort_decor.jpg',
    description: 'A beautiful destination venue at Mahabalipuram perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v6',
    name: 'Hotel Tamil Nadu Beach Resort',
    category: 'Destination Resort & Spa',
    city: 'Mahabalipuram',
    location: 'Mahabalipuram',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹50,000 onwards',
    priceValue: 50000,
    tier: 'Premium',
    capacity: '50-300 Guests',
    capacityValue: parseInt('50-300 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/modern_canopy_decor.jpg',
    description: 'A beautiful destination venue at Mahabalipuram perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v8',
    name: 'Ideal Beach Resort',
    category: 'Destination Resort & Spa',
    city: 'Mahabalipuram',
    location: 'Mahabalipuram',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹1,00,000 onwards',
    priceValue: 100000,
    tier: 'Premium',
    capacity: '100-400 Guests',
    capacityValue: parseInt('100-400 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/beach_resort_decor.jpg',
    description: 'A beautiful destination venue at Mahabalipuram perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v101',
    name: 'InterContinental Chennai',
    category: 'Destination Resort & Spa',
    city: 'Mahabalipuram',
    location: 'Mahabalipuram',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹5,00,000 onwards',
    priceValue: 500000,
    tier: 'Signature',
    capacity: '300-800 Guests',
    capacityValue: parseInt('300-800 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/modern_canopy_decor.jpg',
    description: 'A beautiful destination venue at Mahabalipuram perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v2',
    name: 'Taj Fisherman’s Cove Resort',
    category: 'Destination Resort & Spa',
    city: 'Covelong / Kovalam',
    location: 'Covelong / Kovalam',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹5,00,000 onwards',
    priceValue: 500000,
    tier: 'Signature',
    capacity: '150-800 Guests',
    capacityValue: parseInt('150-800 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/modern_canopy_decor.jpg',
    description: 'A beautiful destination venue at Covelong / Kovalam perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v102',
    name: 'Surf Turf Covelong Point',
    category: 'Destination Resort & Spa',
    city: 'Covelong / Kovalam',
    location: 'Covelong / Kovalam',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹50,000 onwards',
    priceValue: 50000,
    tier: 'Premium',
    capacity: '50-150 Guests',
    capacityValue: parseInt('50-150 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/modern_canopy_decor.jpg',
    description: 'A beautiful destination venue at Covelong / Kovalam perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v103',
    name: 'Vivanta by Taj - Surya',
    category: 'Destination Resort & Spa',
    city: 'Covelong / Kovalam',
    location: 'Covelong / Kovalam',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹3,00,000 onwards',
    priceValue: 300000,
    tier: 'Signature',
    capacity: '200-500 Guests',
    capacityValue: parseInt('200-500 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/modern_canopy_decor.jpg',
    description: 'A beautiful destination venue at Covelong / Kovalam perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v4',
    name: 'MGM Beach Resorts',
    category: 'Destination Resort & Spa',
    city: 'Chennai ECR',
    location: 'Chennai ECR',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹1,00,000 onwards',
    priceValue: 100000,
    tier: 'Premium',
    capacity: '200-600 Guests',
    capacityValue: parseInt('200-600 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/modern_canopy_decor.jpg',
    description: 'A beautiful destination venue at Chennai ECR perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v5',
    name: 'Sheraton Grand Chennai',
    category: 'Destination Resort & Spa',
    city: 'Chennai ECR',
    location: 'Chennai ECR',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹3,00,000 onwards',
    priceValue: 300000,
    tier: 'Signature',
    capacity: '300-800 Guests',
    capacityValue: parseInt('300-800 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/beach_resort_decor.jpg',
    description: 'A beautiful destination venue at Chennai ECR perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v7',
    name: 'Samaaya Beachside Events',
    category: 'Destination Resort & Spa',
    city: 'Chennai ECR',
    location: 'Chennai ECR',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹1,00,000 onwards',
    priceValue: 100000,
    tier: 'Premium',
    capacity: '50-200 Guests',
    capacityValue: parseInt('50-200 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/beach_resort_decor.jpg',
    description: 'A beautiful destination venue at Chennai ECR perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v104',
    name: 'VGP Golden Beach Resort',
    category: 'Destination Resort & Spa',
    city: 'Chennai ECR',
    location: 'Chennai ECR',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹1,00,000 onwards',
    priceValue: 100000,
    tier: 'Premium',
    capacity: '300-1000 Guests',
    capacityValue: parseInt('300-1000 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/beach_resort_decor.jpg',
    description: 'A beautiful destination venue at Chennai ECR perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v105',
    name: 'Muttukadu Boat House & Lawns',
    category: 'Destination Resort & Spa',
    city: 'Muttukadu',
    location: 'Muttukadu',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹50,000 onwards',
    priceValue: 50000,
    tier: 'Premium',
    capacity: '100-300 Guests',
    capacityValue: parseInt('100-300 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/modern_canopy_decor.jpg',
    description: 'A beautiful destination venue at Muttukadu perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v106',
    name: 'MGM Dizzee World Resorts',
    category: 'Destination Resort & Spa',
    city: 'Muttukadu',
    location: 'Muttukadu',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹1,00,000 onwards',
    priceValue: 100000,
    tier: 'Premium',
    capacity: '200-600 Guests',
    capacityValue: parseInt('200-600 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/beach_resort_decor.jpg',
    description: 'A beautiful destination venue at Muttukadu perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v107',
    name: 'Backwater Retreat',
    category: 'Destination Resort & Spa',
    city: 'Muttukadu',
    location: 'Muttukadu',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹50,000 onwards',
    priceValue: 50000,
    tier: 'Premium',
    capacity: '50-150 Guests',
    capacityValue: parseInt('50-150 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/modern_canopy_decor.jpg',
    description: 'A beautiful destination venue at Muttukadu perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v108',
    name: 'Sparsa Resort Kanniyakumari',
    category: 'Destination Resort & Spa',
    city: 'Kanniyakumari',
    location: 'Kanniyakumari',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹1,00,000 onwards',
    priceValue: 100000,
    tier: 'Premium',
    capacity: '100-400 Guests',
    capacityValue: parseInt('100-400 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/beach_resort_decor.jpg',
    description: 'A beautiful destination venue at Kanniyakumari perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v109',
    name: 'Annai Resorts & Spa',
    category: 'Destination Resort & Spa',
    city: 'Kanniyakumari',
    location: 'Kanniyakumari',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹1,00,000 onwards',
    priceValue: 100000,
    tier: 'Premium',
    capacity: '200-500 Guests',
    capacityValue: parseInt('200-500 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/modern_canopy_decor.jpg',
    description: 'A beautiful destination venue at Kanniyakumari perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v110',
    name: 'The Gopinivas Grand',
    category: 'Destination Resort & Spa',
    city: 'Kanniyakumari',
    location: 'Kanniyakumari',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹50,000 onwards',
    priceValue: 50000,
    tier: 'Premium',
    capacity: '50-200 Guests',
    capacityValue: parseInt('50-200 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/beach_resort_decor.jpg',
    description: 'A beautiful destination venue at Kanniyakumari perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v111',
    name: 'Daiwik Hotels',
    category: 'Destination Resort & Spa',
    city: 'Rameswaram',
    location: 'Rameswaram',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹1,00,000 onwards',
    priceValue: 100000,
    tier: 'Premium',
    capacity: '100-300 Guests',
    capacityValue: parseInt('100-300 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/modern_canopy_decor.jpg',
    description: 'A beautiful destination venue at Rameswaram perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v112',
    name: 'Hyatt Place Rameswaram',
    category: 'Destination Resort & Spa',
    city: 'Rameswaram',
    location: 'Rameswaram',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹3,00,000 onwards',
    priceValue: 300000,
    tier: 'Signature',
    capacity: '150-400 Guests',
    capacityValue: parseInt('150-400 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/beach_resort_decor.jpg',
    description: 'A beautiful destination venue at Rameswaram perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v113',
    name: 'Hotel Rameshwaram Grand',
    category: 'Destination Resort & Spa',
    city: 'Rameswaram',
    location: 'Rameswaram',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹50,000 onwards',
    priceValue: 50000,
    tier: 'Premium',
    capacity: '50-200 Guests',
    capacityValue: parseInt('50-200 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/modern_canopy_decor.jpg',
    description: 'A beautiful destination venue at Rameswaram perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v10',
    name: 'Sinclairs Retreat',
    category: 'Destination Resort & Spa',
    city: 'Ooty',
    location: 'Ooty',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹1,00,000 onwards',
    priceValue: 100000,
    tier: 'Premium',
    capacity: '100-300 Guests',
    capacityValue: parseInt('100-300 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/rustic_outdoor_mandap.jpg',
    description: 'A beautiful destination venue at Ooty perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v11',
    name: 'The Savoy - IHCL',
    category: 'Destination Resort & Spa',
    city: 'Ooty',
    location: 'Ooty',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹3,00,000 onwards',
    priceValue: 300000,
    tier: 'Signature',
    capacity: '50-200 Guests',
    capacityValue: parseInt('50-200 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/modern_canopy_decor.jpg',
    description: 'A beautiful destination venue at Ooty perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v12',
    name: 'Sterling Ooty Elk Hill',
    category: 'Destination Resort & Spa',
    city: 'Ooty',
    location: 'Ooty',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹1,00,000 onwards',
    priceValue: 100000,
    tier: 'Premium',
    capacity: '100-400 Guests',
    capacityValue: parseInt('100-400 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/modern_canopy_decor.jpg',
    description: 'A beautiful destination venue at Ooty perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v114',
    name: 'Gem Park Ooty',
    category: 'Destination Resort & Spa',
    city: 'Ooty',
    location: 'Ooty',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹1,00,000 onwards',
    priceValue: 100000,
    tier: 'Premium',
    capacity: '200-500 Guests',
    capacityValue: parseInt('200-500 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/modern_canopy_decor.jpg',
    description: 'A beautiful destination venue at Ooty perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v115',
    name: 'Club Mahindra Derby Green',
    category: 'Destination Resort & Spa',
    city: 'Ooty',
    location: 'Ooty',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹3,00,000 onwards',
    priceValue: 300000,
    tier: 'Signature',
    capacity: '100-300 Guests',
    capacityValue: parseInt('100-300 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/modern_canopy_decor.jpg',
    description: 'A beautiful destination venue at Ooty perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v9',
    name: 'The Tamara Kodai',
    category: 'Destination Resort & Spa',
    city: 'Kodaikanal',
    location: 'Kodaikanal',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹5,00,000 onwards',
    priceValue: 500000,
    tier: 'Signature',
    capacity: '50-250 Guests',
    capacityValue: parseInt('50-250 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/modern_canopy_decor.jpg',
    description: 'A beautiful destination venue at Kodaikanal perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v13',
    name: 'The Fern Creek',
    category: 'Destination Resort & Spa',
    city: 'Kodaikanal',
    location: 'Kodaikanal',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹1,00,000 onwards',
    priceValue: 100000,
    tier: 'Premium',
    capacity: '50-150 Guests',
    capacityValue: parseInt('50-150 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/modern_canopy_decor.jpg',
    description: 'A beautiful destination venue at Kodaikanal perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v116',
    name: 'Great Trails Kodaikanal',
    category: 'Destination Resort & Spa',
    city: 'Kodaikanal',
    location: 'Kodaikanal',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹3,00,000 onwards',
    priceValue: 300000,
    tier: 'Signature',
    capacity: '100-350 Guests',
    capacityValue: parseInt('100-350 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/pastel_reception_stage.jpg',
    description: 'A beautiful destination venue at Kodaikanal perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v117',
    name: 'Sterling Kodai Lake',
    category: 'Destination Resort & Spa',
    city: 'Kodaikanal',
    location: 'Kodaikanal',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹1,00,000 onwards',
    priceValue: 100000,
    tier: 'Premium',
    capacity: '150-400 Guests',
    capacityValue: parseInt('150-400 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/pastel_reception_stage.jpg',
    description: 'A beautiful destination venue at Kodaikanal perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v118',
    name: 'Gateway Coonoor - IHCL',
    category: 'Destination Resort & Spa',
    city: 'Coonoor',
    location: 'Coonoor',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹3,00,000 onwards',
    priceValue: 300000,
    tier: 'Signature',
    capacity: '100-250 Guests',
    capacityValue: parseInt('100-250 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/pastel_reception_stage.jpg',
    description: 'A beautiful destination venue at Coonoor perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v119',
    name: 'Teanest Coonoor',
    category: 'Destination Resort & Spa',
    city: 'Coonoor',
    location: 'Coonoor',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹50,000 onwards',
    priceValue: 50000,
    tier: 'Premium',
    capacity: '50-100 Guests',
    capacityValue: parseInt('50-100 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/pastel_reception_stage.jpg',
    description: 'A beautiful destination venue at Coonoor perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v120',
    name: 'Sunvalley Homestay',
    category: 'Destination Resort & Spa',
    city: 'Coonoor',
    location: 'Coonoor',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹50,000 onwards',
    priceValue: 50000,
    tier: 'Premium',
    capacity: '30-80 Guests',
    capacityValue: parseInt('30-80 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/modern_canopy_decor.jpg',
    description: 'A beautiful destination venue at Coonoor perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v121',
    name: 'Great Trails Yercaud',
    category: 'Destination Resort & Spa',
    city: 'Yercaud',
    location: 'Yercaud',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹1,00,000 onwards',
    priceValue: 100000,
    tier: 'Premium',
    capacity: '100-300 Guests',
    capacityValue: parseInt('100-300 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/rustic_outdoor_mandap.jpg',
    description: 'A beautiful destination venue at Yercaud perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v122',
    name: 'Sterling Yercaud',
    category: 'Destination Resort & Spa',
    city: 'Yercaud',
    location: 'Yercaud',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹1,00,000 onwards',
    priceValue: 100000,
    tier: 'Premium',
    capacity: '150-400 Guests',
    capacityValue: parseInt('150-400 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/rustic_outdoor_mandap.jpg',
    description: 'A beautiful destination venue at Yercaud perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v123',
    name: 'Grand Palace Hotel & Spa',
    category: 'Destination Resort & Spa',
    city: 'Yercaud',
    location: 'Yercaud',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹3,00,000 onwards',
    priceValue: 300000,
    tier: 'Signature',
    capacity: '200-500 Guests',
    capacityValue: parseInt('200-500 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/pastel_reception_stage.jpg',
    description: 'A beautiful destination venue at Yercaud perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v124',
    name: 'Green Nest Resort',
    category: 'Destination Resort & Spa',
    city: 'Kotagiri',
    location: 'Kotagiri',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹1,00,000 onwards',
    priceValue: 100000,
    tier: 'Premium',
    capacity: '50-200 Guests',
    capacityValue: parseInt('50-200 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/pastel_reception_stage.jpg',
    description: 'A beautiful destination venue at Kotagiri perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v125',
    name: 'Nahar Retreat & Spa',
    category: 'Destination Resort & Spa',
    city: 'Kotagiri',
    location: 'Kotagiri',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹1,00,000 onwards',
    priceValue: 100000,
    tier: 'Premium',
    capacity: '100-300 Guests',
    capacityValue: parseInt('100-300 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/rustic_outdoor_mandap.jpg',
    description: 'A beautiful destination venue at Kotagiri perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v126',
    name: 'Teanest Nightingale',
    category: 'Destination Resort & Spa',
    city: 'Kotagiri',
    location: 'Kotagiri',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹50,000 onwards',
    priceValue: 50000,
    tier: 'Premium',
    capacity: '30-100 Guests',
    capacityValue: parseInt('30-100 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/pastel_reception_stage.jpg',
    description: 'A beautiful destination venue at Kotagiri perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v127',
    name: 'Stanmore Garden Bungalow',
    category: 'Destination Resort & Spa',
    city: 'Valparai',
    location: 'Valparai',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹1,00,000 onwards',
    priceValue: 100000,
    tier: 'Premium',
    capacity: '50-150 Guests',
    capacityValue: parseInt('50-150 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/rustic_outdoor_mandap.jpg',
    description: 'A beautiful destination venue at Valparai perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v128',
    name: 'Monica Garden Bungalow',
    category: 'Destination Resort & Spa',
    city: 'Valparai',
    location: 'Valparai',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹1,00,000 onwards',
    priceValue: 100000,
    tier: 'Premium',
    capacity: '50-100 Guests',
    capacityValue: parseInt('50-100 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/modern_canopy_decor.jpg',
    description: 'A beautiful destination venue at Valparai perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v129',
    name: 'Briar Tea Bungalows',
    category: 'Destination Resort & Spa',
    city: 'Valparai',
    location: 'Valparai',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹3,00,000 onwards',
    priceValue: 300000,
    tier: 'Signature',
    capacity: '40-120 Guests',
    capacityValue: parseInt('40-120 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/modern_canopy_decor.jpg',
    description: 'A beautiful destination venue at Valparai perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v130',
    name: 'Chidambara Vilas',
    category: 'Destination Resort & Spa',
    city: 'Chettinad',
    location: 'Chettinad',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹3,00,000 onwards',
    priceValue: 300000,
    tier: 'Signature',
    capacity: '100-300 Guests',
    capacityValue: parseInt('100-300 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/palace_reception_decor.jpg',
    description: 'A beautiful destination venue at Chettinad perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v131',
    name: 'Visalam - CGH Earth',
    category: 'Destination Resort & Spa',
    city: 'Chettinad',
    location: 'Chettinad',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹5,00,000 onwards',
    priceValue: 500000,
    tier: 'Signature',
    capacity: '50-200 Guests',
    capacityValue: parseInt('50-200 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/hindu_couple_arch_1786467605789.jpg',
    description: 'A beautiful destination venue at Chettinad perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v132',
    name: 'The Bangala',
    category: 'Destination Resort & Spa',
    city: 'Chettinad',
    location: 'Chettinad',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹1,00,000 onwards',
    priceValue: 100000,
    tier: 'Premium',
    capacity: '80-250 Guests',
    capacityValue: parseInt('80-250 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/royal_mandap_decor.jpg',
    description: 'A beautiful destination venue at Chettinad perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v16',
    name: 'Heritage Madurai',
    category: 'Destination Resort & Spa',
    city: 'Madurai',
    location: 'Madurai',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹3,00,000 onwards',
    priceValue: 300000,
    tier: 'Signature',
    capacity: '200-800 Guests',
    capacityValue: parseInt('200-800 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/palace_reception_decor.jpg',
    description: 'A beautiful destination venue at Madurai perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v17',
    name: 'Gateway Madurai',
    category: 'Destination Resort & Spa',
    city: 'Madurai',
    location: 'Madurai',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹3,00,000 onwards',
    priceValue: 300000,
    tier: 'Signature',
    capacity: '150-500 Guests',
    capacityValue: parseInt('150-500 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/hindu_couple_arch_1786467605789.jpg',
    description: 'A beautiful destination venue at Madurai perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v133',
    name: 'Courtyard by Marriott',
    category: 'Destination Resort & Spa',
    city: 'Madurai',
    location: 'Madurai',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹3,00,000 onwards',
    priceValue: 300000,
    tier: 'Signature',
    capacity: '300-1000 Guests',
    capacityValue: parseInt('300-1000 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/hindu_couple_arch_1786467605789.jpg',
    description: 'A beautiful destination venue at Madurai perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v134',
    name: 'JC Residency',
    category: 'Destination Resort & Spa',
    city: 'Madurai',
    location: 'Madurai',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹1,00,000 onwards',
    priceValue: 100000,
    tier: 'Premium',
    capacity: '100-400 Guests',
    capacityValue: parseInt('100-400 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/palace_reception_decor.jpg',
    description: 'A beautiful destination venue at Madurai perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v135',
    name: 'Svatma Thanjavur',
    category: 'Destination Resort & Spa',
    city: 'Thanjavur',
    location: 'Thanjavur',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹5,00,000 onwards',
    priceValue: 500000,
    tier: 'Signature',
    capacity: '100-300 Guests',
    capacityValue: parseInt('100-300 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/palace_reception_decor.jpg',
    description: 'A beautiful destination venue at Thanjavur perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v136',
    name: 'Sangam Hotel',
    category: 'Destination Resort & Spa',
    city: 'Thanjavur',
    location: 'Thanjavur',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹1,00,000 onwards',
    priceValue: 100000,
    tier: 'Premium',
    capacity: '200-600 Guests',
    capacityValue: parseInt('200-600 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/hindu_couple_arch_1786467605789.jpg',
    description: 'A beautiful destination venue at Thanjavur perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v137',
    name: 'Ideal River View Resort',
    category: 'Destination Resort & Spa',
    city: 'Thanjavur',
    location: 'Thanjavur',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹1,00,000 onwards',
    priceValue: 100000,
    tier: 'Premium',
    capacity: '150-450 Guests',
    capacityValue: parseInt('150-450 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/palace_reception_decor.jpg',
    description: 'A beautiful destination venue at Thanjavur perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v138',
    name: 'Mantra Koodam - CGH Earth',
    category: 'Destination Resort & Spa',
    city: 'Kumbakonam',
    location: 'Kumbakonam',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹3,00,000 onwards',
    priceValue: 300000,
    tier: 'Signature',
    capacity: '50-200 Guests',
    capacityValue: parseInt('50-200 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/palace_reception_decor.jpg',
    description: 'A beautiful destination venue at Kumbakonam perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v139',
    name: 'Indeco Hotels Swamimalai',
    category: 'Destination Resort & Spa',
    city: 'Kumbakonam',
    location: 'Kumbakonam',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹1,00,000 onwards',
    priceValue: 100000,
    tier: 'Premium',
    capacity: '100-400 Guests',
    capacityValue: parseInt('100-400 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/palace_reception_decor.jpg',
    description: 'A beautiful destination venue at Kumbakonam perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v140',
    name: 'Quality Inn Viha',
    category: 'Destination Resort & Spa',
    city: 'Kumbakonam',
    location: 'Kumbakonam',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹50,000 onwards',
    priceValue: 50000,
    tier: 'Premium',
    capacity: '150-500 Guests',
    capacityValue: parseInt('150-500 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/palace_reception_decor.jpg',
    description: 'A beautiful destination venue at Kumbakonam perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v141',
    name: 'SRM Hotel',
    category: 'Destination Resort & Spa',
    city: 'Trichy',
    location: 'Trichy',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹1,00,000 onwards',
    priceValue: 100000,
    tier: 'Premium',
    capacity: '200-800 Guests',
    capacityValue: parseInt('200-800 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/hindu_couple_arch_1786467605789.jpg',
    description: 'A beautiful destination venue at Trichy perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v142',
    name: 'Courtyard by Marriott Trichy',
    category: 'Destination Resort & Spa',
    city: 'Trichy',
    location: 'Trichy',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹3,00,000 onwards',
    priceValue: 300000,
    tier: 'Signature',
    capacity: '250-1000 Guests',
    capacityValue: parseInt('250-1000 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/palace_reception_decor.jpg',
    description: 'A beautiful destination venue at Trichy perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v143',
    name: 'Grand Gardenia',
    category: 'Destination Resort & Spa',
    city: 'Trichy',
    location: 'Trichy',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹50,000 onwards',
    priceValue: 50000,
    tier: 'Premium',
    capacity: '100-400 Guests',
    capacityValue: parseInt('100-400 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/royal_mandap_decor.jpg',
    description: 'A beautiful destination venue at Trichy perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v14',
    name: 'The Leela Palace',
    category: 'Destination Resort & Spa',
    city: 'Chennai City',
    location: 'Chennai City',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹5,00,000 onwards',
    priceValue: 500000,
    tier: 'Signature',
    capacity: '500-1500 Guests',
    capacityValue: parseInt('500-1500 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/white_banquet_illustration_1786471427275.jpg',
    description: 'A beautiful destination venue at Chennai City perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v15',
    name: 'ITC Grand Chola',
    category: 'Destination Resort & Spa',
    city: 'Chennai City',
    location: 'Chennai City',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹5,00,000 onwards',
    priceValue: 500000,
    tier: 'Signature',
    capacity: '500-2000 Guests',
    capacityValue: parseInt('500-2000 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/wedding_banquet_hall_pic_1786470818992.jpg',
    description: 'A beautiful destination venue at Chennai City perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v18',
    name: 'Taj Coromandel',
    category: 'Destination Resort & Spa',
    city: 'Chennai City',
    location: 'Chennai City',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹3,00,000 onwards',
    priceValue: 300000,
    tier: 'Signature',
    capacity: '300-1000 Guests',
    capacityValue: parseInt('300-1000 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/guest_banquet_hall_stage_1786471284070.jpg',
    description: 'A beautiful destination venue at Chennai City perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v20',
    name: 'Taj Club House',
    category: 'Destination Resort & Spa',
    city: 'Chennai City',
    location: 'Chennai City',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹3,00,000 onwards',
    priceValue: 300000,
    tier: 'Signature',
    capacity: '150-600 Guests',
    capacityValue: parseInt('150-600 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/sangeet_stage_decor.jpg',
    description: 'A beautiful destination venue at Chennai City perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v144',
    name: 'Feathers - A Radha Hotel',
    category: 'Destination Resort & Spa',
    city: 'Chennai City',
    location: 'Chennai City',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹3,00,000 onwards',
    priceValue: 300000,
    tier: 'Signature',
    capacity: '400-1200 Guests',
    capacityValue: parseInt('400-1200 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/wedding_banquet_hall_pic_1786470818992.jpg',
    description: 'A beautiful destination venue at Chennai City perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v19',
    name: 'The Residency Towers',
    category: 'Destination Resort & Spa',
    city: 'Coimbatore',
    location: 'Coimbatore',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹3,00,000 onwards',
    priceValue: 300000,
    tier: 'Signature',
    capacity: '200-800 Guests',
    capacityValue: parseInt('200-800 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/wedding_banquet_hall_pic_1786470818992.jpg',
    description: 'A beautiful destination venue at Coimbatore perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v145',
    name: 'Taj Vivanta Coimbatore',
    category: 'Destination Resort & Spa',
    city: 'Coimbatore',
    location: 'Coimbatore',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹3,00,000 onwards',
    priceValue: 300000,
    tier: 'Signature',
    capacity: '250-1000 Guests',
    capacityValue: parseInt('250-1000 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/white_banquet_illustration_1786471427275.jpg',
    description: 'A beautiful destination venue at Coimbatore perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v146',
    name: 'Radisson Blu Coimbatore',
    category: 'Destination Resort & Spa',
    city: 'Coimbatore',
    location: 'Coimbatore',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹3,00,000 onwards',
    priceValue: 300000,
    tier: 'Signature',
    capacity: '200-900 Guests',
    capacityValue: parseInt('200-900 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/sangeet_stage_decor.jpg',
    description: 'A beautiful destination venue at Coimbatore perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v147',
    name: 'Le Meridien',
    category: 'Destination Resort & Spa',
    city: 'Coimbatore',
    location: 'Coimbatore',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹5,00,000 onwards',
    priceValue: 500000,
    tier: 'Signature',
    capacity: '500-2000 Guests',
    capacityValue: parseInt('500-2000 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/guest_banquet_hall_stage_1786471284070.jpg',
    description: 'A beautiful destination venue at Coimbatore perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v148',
    name: 'Radisson Salem',
    category: 'Destination Resort & Spa',
    city: 'Salem',
    location: 'Salem',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹3,00,000 onwards',
    priceValue: 300000,
    tier: 'Signature',
    capacity: '300-1000 Guests',
    capacityValue: parseInt('300-1000 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/guest_banquet_hall_stage_1786471284070.jpg',
    description: 'A beautiful destination venue at Salem perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v149',
    name: 'Grand Estancia',
    category: 'Destination Resort & Spa',
    city: 'Salem',
    location: 'Salem',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹1,00,000 onwards',
    priceValue: 100000,
    tier: 'Premium',
    capacity: '200-800 Guests',
    capacityValue: parseInt('200-800 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/guest_banquet_hall_stage_1786471284070.jpg',
    description: 'A beautiful destination venue at Salem perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v150',
    name: 'CJ Pallazzio Hotel',
    category: 'Destination Resort & Spa',
    city: 'Salem',
    location: 'Salem',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹1,00,000 onwards',
    priceValue: 100000,
    tier: 'Premium',
    capacity: '150-500 Guests',
    capacityValue: parseInt('150-500 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/guest_banquet_hall_stage_1786471284070.jpg',
    description: 'A beautiful destination venue at Salem perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v151',
    name: 'Four Points by Sheraton',
    category: 'Destination Resort & Spa',
    city: 'Mahabalipuram',
    location: 'Mahabalipuram',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹3,00,000 onwards',
    priceValue: 300000,
    tier: 'Signature',
    capacity: '200-800 Guests',
    capacityValue: parseInt('200-800 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/modern_canopy_decor.jpg',
    description: 'A beautiful destination venue at Mahabalipuram perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v152',
    name: 'Grande Bay Resort',
    category: 'Destination Resort & Spa',
    city: 'Mahabalipuram',
    location: 'Mahabalipuram',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹1,00,000 onwards',
    priceValue: 100000,
    tier: 'Premium',
    capacity: '100-300 Guests',
    capacityValue: parseInt('100-300 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/beach_resort_decor.jpg',
    description: 'A beautiful destination venue at Mahabalipuram perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v153',
    name: 'Confluence Banquets and Resort',
    category: 'Destination Resort & Spa',
    city: 'Mahabalipuram',
    location: 'Mahabalipuram',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹3,00,000 onwards',
    priceValue: 300000,
    tier: 'Signature',
    capacity: '500-1500 Guests',
    capacityValue: parseInt('500-1500 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/beach_resort_decor.jpg',
    description: 'A beautiful destination venue at Mahabalipuram perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v154',
    name: 'Kaldan Samudhra Palace',
    category: 'Destination Resort & Spa',
    city: 'Mahabalipuram',
    location: 'Mahabalipuram',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹5,00,000 onwards',
    priceValue: 500000,
    tier: 'Signature',
    capacity: '300-1000 Guests',
    capacityValue: parseInt('300-1000 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/modern_canopy_decor.jpg',
    description: 'A beautiful destination venue at Mahabalipuram perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v155',
    name: 'Novotel Chennai Sipcot',
    category: 'Destination Resort & Spa',
    city: 'Chennai ECR',
    location: 'Chennai ECR',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹1,00,000 onwards',
    priceValue: 100000,
    tier: 'Premium',
    capacity: '150-500 Guests',
    capacityValue: parseInt('150-500 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/modern_canopy_decor.jpg',
    description: 'A beautiful destination venue at Chennai ECR perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v156',
    name: 'Gokulam Grand',
    category: 'Destination Resort & Spa',
    city: 'Chennai ECR',
    location: 'Chennai ECR',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹3,00,000 onwards',
    priceValue: 300000,
    tier: 'Signature',
    capacity: '200-600 Guests',
    capacityValue: parseInt('200-600 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/modern_canopy_decor.jpg',
    description: 'A beautiful destination venue at Chennai ECR perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v157',
    name: 'Blue Bay Resort',
    category: 'Destination Resort & Spa',
    city: 'Covelong / Kovalam',
    location: 'Covelong / Kovalam',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹50,000 onwards',
    priceValue: 50000,
    tier: 'Premium',
    capacity: '50-200 Guests',
    capacityValue: parseInt('50-200 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/beach_resort_decor.jpg',
    description: 'A beautiful destination venue at Covelong / Kovalam perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v158',
    name: 'Taj Savoy Hotel (Lawns)',
    category: 'Destination Resort & Spa',
    city: 'Ooty',
    location: 'Ooty',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹5,00,000 onwards',
    priceValue: 500000,
    tier: 'Signature',
    capacity: '200-600 Guests',
    capacityValue: parseInt('200-600 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/pastel_reception_stage.jpg',
    description: 'A beautiful destination venue at Ooty perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v159',
    name: 'Glyngarth Resort',
    category: 'Destination Resort & Spa',
    city: 'Ooty',
    location: 'Ooty',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹1,00,000 onwards',
    priceValue: 100000,
    tier: 'Premium',
    capacity: '100-250 Guests',
    capacityValue: parseInt('100-250 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/rustic_outdoor_mandap.jpg',
    description: 'A beautiful destination venue at Ooty perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v160',
    name: 'Accord Metropolitan Ooty',
    category: 'Destination Resort & Spa',
    city: 'Ooty',
    location: 'Ooty',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹3,00,000 onwards',
    priceValue: 300000,
    tier: 'Signature',
    capacity: '150-400 Guests',
    capacityValue: parseInt('150-400 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/modern_canopy_decor.jpg',
    description: 'A beautiful destination venue at Ooty perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v161',
    name: 'Destiny The Farm Resort',
    category: 'Destination Resort & Spa',
    city: 'Ooty',
    location: 'Ooty',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹1,00,000 onwards',
    priceValue: 100000,
    tier: 'Premium',
    capacity: '50-150 Guests',
    capacityValue: parseInt('50-150 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/rustic_outdoor_mandap.jpg',
    description: 'A beautiful destination venue at Ooty perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v162',
    name: 'Kodai Resort Hotel',
    category: 'Destination Resort & Spa',
    city: 'Kodaikanal',
    location: 'Kodaikanal',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹1,00,000 onwards',
    priceValue: 100000,
    tier: 'Premium',
    capacity: '100-300 Guests',
    capacityValue: parseInt('100-300 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/rustic_outdoor_mandap.jpg',
    description: 'A beautiful destination venue at Kodaikanal perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v163',
    name: 'Le Poshe by Sparsa',
    category: 'Destination Resort & Spa',
    city: 'Kodaikanal',
    location: 'Kodaikanal',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹1,00,000 onwards',
    priceValue: 100000,
    tier: 'Premium',
    capacity: '150-400 Guests',
    capacityValue: parseInt('150-400 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/pastel_reception_stage.jpg',
    description: 'A beautiful destination venue at Kodaikanal perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v164',
    name: 'Villa Retreat',
    category: 'Destination Resort & Spa',
    city: 'Kodaikanal',
    location: 'Kodaikanal',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹50,000 onwards',
    priceValue: 50000,
    tier: 'Premium',
    capacity: '30-100 Guests',
    capacityValue: parseInt('30-100 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/pastel_reception_stage.jpg',
    description: 'A beautiful destination venue at Kodaikanal perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v165',
    name: 'Clifton Inn',
    category: 'Destination Resort & Spa',
    city: 'Yercaud',
    location: 'Yercaud',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹50,000 onwards',
    priceValue: 50000,
    tier: 'Premium',
    capacity: '50-150 Guests',
    capacityValue: parseInt('50-150 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/rustic_outdoor_mandap.jpg',
    description: 'A beautiful destination venue at Yercaud perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v166',
    name: 'Bison Woods',
    category: 'Destination Resort & Spa',
    city: 'Yercaud',
    location: 'Yercaud',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹1,00,000 onwards',
    priceValue: 100000,
    tier: 'Premium',
    capacity: '100-250 Guests',
    capacityValue: parseInt('100-250 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/rustic_outdoor_mandap.jpg',
    description: 'A beautiful destination venue at Yercaud perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v167',
    name: 'Wallwood Garden',
    category: 'Destination Resort & Spa',
    city: 'Coonoor',
    location: 'Coonoor',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹1,00,000 onwards',
    priceValue: 100000,
    tier: 'Premium',
    capacity: '50-120 Guests',
    capacityValue: parseInt('50-120 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/rustic_outdoor_mandap.jpg',
    description: 'A beautiful destination venue at Coonoor perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v168',
    name: 'Amika Hotel',
    category: 'Destination Resort & Spa',
    city: 'Madurai',
    location: 'Madurai',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹1,00,000 onwards',
    priceValue: 100000,
    tier: 'Premium',
    capacity: '200-600 Guests',
    capacityValue: parseInt('200-600 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/hindu_couple_arch_1786467605789.jpg',
    description: 'A beautiful destination venue at Madurai perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v169',
    name: 'Regency Madurai by GRT',
    category: 'Destination Resort & Spa',
    city: 'Madurai',
    location: 'Madurai',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹1,00,000 onwards',
    priceValue: 100000,
    tier: 'Premium',
    capacity: '150-400 Guests',
    capacityValue: parseInt('150-400 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/royal_mandap_decor.jpg',
    description: 'A beautiful destination venue at Madurai perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v170',
    name: 'Chettinadu Mansion',
    category: 'Destination Resort & Spa',
    city: 'Chettinad',
    location: 'Chettinad',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹3,00,000 onwards',
    priceValue: 300000,
    tier: 'Signature',
    capacity: '100-300 Guests',
    capacityValue: parseInt('100-300 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/hindu_couple_arch_1786467605789.jpg',
    description: 'A beautiful destination venue at Chettinad perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v171',
    name: 'Saramangala Palace',
    category: 'Destination Resort & Spa',
    city: 'Chettinad',
    location: 'Chettinad',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹3,00,000 onwards',
    priceValue: 300000,
    tier: 'Signature',
    capacity: '150-400 Guests',
    capacityValue: parseInt('150-400 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/royal_mandap_decor.jpg',
    description: 'A beautiful destination venue at Chettinad perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v172',
    name: 'Hyatt Regency Chennai',
    category: 'Destination Resort & Spa',
    city: 'Chennai City',
    location: 'Chennai City',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹3,00,000 onwards',
    priceValue: 300000,
    tier: 'Signature',
    capacity: '300-1000 Guests',
    capacityValue: parseInt('300-1000 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/guest_banquet_hall_stage_1786471284070.jpg',
    description: 'A beautiful destination venue at Chennai City perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v173',
    name: 'Crowne Plaza',
    category: 'Destination Resort & Spa',
    city: 'Chennai City',
    location: 'Chennai City',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹3,00,000 onwards',
    priceValue: 300000,
    tier: 'Signature',
    capacity: '250-800 Guests',
    capacityValue: parseInt('250-800 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/guest_banquet_hall_stage_1786471284070.jpg',
    description: 'A beautiful destination venue at Chennai City perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v174',
    name: 'The Westin',
    category: 'Destination Resort & Spa',
    city: 'Chennai City',
    location: 'Chennai City',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹3,00,000 onwards',
    priceValue: 300000,
    tier: 'Signature',
    capacity: '400-1200 Guests',
    capacityValue: parseInt('400-1200 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/wedding_banquet_hall_pic_1786470818992.jpg',
    description: 'A beautiful destination venue at Chennai City perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v175',
    name: 'Gokulam Grand',
    category: 'Destination Resort & Spa',
    city: 'Coimbatore',
    location: 'Coimbatore',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹1,00,000 onwards',
    priceValue: 100000,
    tier: 'Premium',
    capacity: '200-700 Guests',
    capacityValue: parseInt('200-700 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/white_banquet_illustration_1786471427275.jpg',
    description: 'A beautiful destination venue at Coimbatore perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v176',
    name: 'Welcomhotel by ITC',
    category: 'Destination Resort & Spa',
    city: 'Coimbatore',
    location: 'Coimbatore',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹3,00,000 onwards',
    priceValue: 300000,
    tier: 'Signature',
    capacity: '300-900 Guests',
    capacityValue: parseInt('300-900 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/wedding_banquet_hall_pic_1786470818992.jpg',
    description: 'A beautiful destination venue at Coimbatore perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v21',
    name: 'Royal Heritage Resort',
    category: 'Destination Resort & Spa',
    city: 'Any',
    location: 'Any',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹3,00,000 onwards',
    priceValue: 300000,
    tier: 'Signature',
    capacity: '200-500 Guests',
    capacityValue: parseInt('200-500 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/wedding_banquet_hall_pic_1786470818992.jpg',
    description: 'A beautiful destination venue at Any perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
  {
    id: 'v22',
    name: 'Grand Horizon Venue',
    category: 'Destination Resort & Spa',
    city: 'Any',
    location: 'Any',
    rating: 4.8,
    reviewsCount: Math.floor(Math.random() * 200 + 50),
    startingPrice: '₹1,00,000 onwards',
    priceValue: 100000,
    tier: 'Premium',
    capacity: '100-300 Guests',
    capacityValue: parseInt('100-300 Guests'.split('-')[1]) || 500,
    image: '/src/assets/images/sangeet_stage_decor.jpg',
    description: 'A beautiful destination venue at Any perfect for your dream wedding.',
    experience: '10+ Years',
    roomsAvailable: '20+ AC Rooms',
    parkingSpace: 'Ample Parking Available',
    cateringPolicy: 'In-house & External Allowed',
    amenities: ['Scenic Views', 'Lawn Area', 'Catering Area'],
  },
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
    phone: '+91 91501 97966',
    whatsapp: '919150197966',
    instagram: '@_ranjith_r.r_',
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
    phone: '+91 91501 97966',
    whatsapp: '919150197966',
    instagram: '@_ranjith_r.r_',
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
    phone: '+91 91501 97966',
    whatsapp: '919150197966',
    instagram: '@_ranjith_r.r_',
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
    phone: '+91 91501 97966',
    whatsapp: '919150197966',
    instagram: '@_ranjith_r.r_',
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
    phone: '+91 91501 97966',
    whatsapp: '919150197966',
    instagram: '@_ranjith_r.r_',
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
    phone: '+91 91501 97966',
    whatsapp: '919150197966',
    instagram: '@_ranjith_r.r_',
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
    phone: '+91 91501 97966',
    whatsapp: '919150197966',
    instagram: '@_ranjith_r.r_',
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
    phone: '+91 91501 97966',
    whatsapp: '919150197966',
    instagram: '@_ranjith_r.r_',
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
    phone: '+91 91501 97966',
    whatsapp: '919150197966',
    instagram: '@_ranjith_r.r_',
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
    phone: '+91 91501 97966',
    whatsapp: '919150197966',
    instagram: '@_ranjith_r.r_',
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
    phone: '+91 91501 97966',
    whatsapp: '919150197966',
    instagram: '@_ranjith_r.r_',
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
    phone: '+91 91501 97966',
    whatsapp: '919150197966',
    instagram: '@_ranjith_r.r_',
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
    phone: '+91 91501 97966',
    whatsapp: '919150197966',
    instagram: '@_ranjith_r.r_',
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
    phone: '+91 91501 97966',
    whatsapp: '919150197966',
    instagram: '@_ranjith_r.r_',
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
    phone: '+91 91501 97966',
    whatsapp: '919150197966',
    instagram: '@_ranjith_r.r_',
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
    phone: '+91 91501 97966',
    whatsapp: '919150197966',
    instagram: '@_ranjith_r.r_',
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
  bookingSource?: 'entire_wedding' | 'individual';
  onNavigateToProfileMyBookings?: () => void;
}

export const VenueListingPage: React.FC<VenueListingPageProps> = ({
  onBack,
  savedVenueIds = {},
  onToggleSavedVenue = (_id?: string) => { },
  onOpenSavedTab,
  onNavigateToQuotesTab,
  bookingSource = 'entire_wedding',
  onNavigateToProfileMyBookings,
}) => {
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [selectedBudget, setSelectedBudget] = useState<string>('All');
  const [selectedRating, setSelectedRating] = useState<string>('All');
  const [selectedTier, setSelectedTier] = useState<string>('All');
  const [activeFilterModal, setActiveFilterModal] = useState<'city' | 'budget' | 'rating' | 'tier' | null>(null);
  const [selectedVenue, setSelectedVenue] = useState<VenueItem | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const savedVenuesList = VENUES_DATA.filter((v) => Boolean(savedVenueIds && savedVenueIds[v.id]));
  const [showCompareModal, setShowCompareModal] = useState(false);

  const resetAllFilters = () => {
    setSelectedCity('All');
    setSelectedBudget('All');
    setSelectedRating('All');
    setSelectedTier('All');
    setSearchQuery('');
  };

  const isAnyFilterActive =
    selectedCity !== 'All' ||
    selectedBudget !== 'All' ||
    selectedRating !== 'All' ||
    selectedTier !== 'All' ||
    searchQuery.trim() !== '';

  const filteredVenues = VENUES_DATA.filter((venue) => {
    const vCity = (venue.city || '').toLowerCase();
    const vLocation = (venue.location || '').toLowerCase();
    const vCategory = (venue.category || '').toLowerCase();
    const vName = (venue.name || '').toLowerCase();
    const qCity = selectedCity.toLowerCase();
    const qSearch = searchQuery.trim().toLowerCase();

    const matchesCity =
      selectedCity === 'All' ||
      selectedCity === 'All Cities' ||
      vCity === qCity ||
      vLocation.includes(qCity) ||
      qCity.includes(vCity);

    const matchesSearch =
      qSearch === '' ||
      vName.includes(qSearch) ||
      vCity.includes(qSearch) ||
      vCategory.includes(qSearch) ||
      vLocation.includes(qSearch);

    const venueRating = venue.rating || 4.8;
    const matchesRating =
      selectedRating === 'All'
        ? true
        : selectedRating === '4.8'
          ? venueRating >= 4.8
          : venueRating >= 4.9;

    const venueTier = venue.tier || 'Signature';
    const matchesTier = selectedTier === 'All' ? true : venueTier === selectedTier;

    const price = venue.priceValue || 200000;
    let matchesBudget = true;
    if (selectedBudget === 'under-2l') matchesBudget = price < 200000;
    else if (selectedBudget === '2l-3.5l') matchesBudget = price >= 200000 && price <= 350000;
    else if (selectedBudget === '3.5l-5l') matchesBudget = price > 350000 && price <= 500000;
    else if (selectedBudget === 'above-5l') matchesBudget = price > 500000;

    return matchesCity && matchesSearch && matchesRating && matchesTier && matchesBudget;
  });

  if (selectedVenue) {
    return (
      <VenueDetailPage
        venue={selectedVenue}
        onBack={() => setSelectedVenue(null)}
        isBookmarked={Boolean(savedVenueIds && savedVenueIds[selectedVenue.id])}
        onToggleBookmark={onToggleSavedVenue}
        onNavigateToQuotesTab={onNavigateToQuotesTab}
        bookingSource={bookingSource}
        onNavigateToMyWeddingPayments={() => {
          setSelectedVenue(null);
          window.dispatchEvent(
            new CustomEvent('tot_switch_to_my_wedding_payments', { detail: { vendorId: selectedVenue.id } })
          );
        }}
        onNavigateToProfileMyBookings={() => {
          setSelectedVenue(null);
          if (onNavigateToProfileMyBookings) {
            onNavigateToProfileMyBookings();
          } else {
            window.dispatchEvent(
              new CustomEvent('tot_switch_to_profile_my_bookings', { detail: { vendorId: selectedVenue.id } })
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

        <Text style={styles.headerTitle}>Venues & Mandapams</Text>

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
                  Object.values(savedVenueIds || {}).some(Boolean)
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
          placeholder="Search by venue, mandapam, resort, or city..."
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
          <Text style={styles.recommendedTitle}>Recommended Venues</Text>
          <Sparkles className="w-4 h-4 text-[#C28E38] ml-1.5" />
        </View>
        <Text style={styles.resultCountText}>{filteredVenues.length} venues</Text>
      </View>

      {/* Venues Vertical List */}
      <ScrollView
        style={styles.listScrollView}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredVenues.length === 0 ? (
          <View style={styles.emptyStateContainer}>
            <Building2 className="w-10 h-10 text-[#C2B5A8] mb-2" />
            <Text style={styles.emptyStateTitle}>No venues found</Text>
            <Text style={styles.emptyStateSub}>
              Try adjusting your city, budget range, or rating filter.
            </Text>
            <TouchableOpacity style={styles.emptyResetBtn} onPress={resetAllFilters}>
              <Text style={styles.emptyResetBtnText}>Reset All Filters</Text>
            </TouchableOpacity>
          </View>
        ) : (
          filteredVenues.map((venue) => {
            const isSaved = Boolean(savedVenueIds && savedVenueIds[venue.id]);
            return (
              <motion.div
                key={venue.id}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mb-3.5"
              >
                <View style={styles.venueCard}>
                  {/* Left Photo */}
                  <Image
                    source={{ uri: venue.image || '/src/assets/images/beach_resort_decor.jpg' }}
                    style={styles.venueImage}
                    resizeMode="cover"
                  />

                  {/* Right Info Details */}
                  <View style={styles.cardRightCol}>
                    <View style={styles.cardHeaderRow}>
                      <Text style={styles.venueCardTitle} numberOfLines={1}>
                        {venue.name}
                      </Text>
                      <TouchableOpacity
                        onPress={() => onToggleSavedVenue(venue.id)}
                        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                      >
                        <Bookmark
                          className={`w-4 h-4 ${
                            isSaved ? 'text-[#8B1E2F] fill-[#8B1E2F]' : 'text-[#8C7A7C]'
                          }`}
                        />
                      </TouchableOpacity>
                    </View>

                    {/* Rating & Tier Badge */}
                    <View style={styles.ratingRow}>
                      <Star className="w-3.5 h-3.5 text-[#E5A93C] fill-[#E5A93C] mr-1" />
                      <Text style={styles.ratingText}>
                        {venue.rating || 4.8}{' '}
                        <Text style={styles.reviewsText}>({venue.reviewsCount || 100})</Text>
                      </Text>
                      <View
                        style={[
                          styles.tierPill,
                          venue.tier === 'Signature' && { backgroundColor: '#FEF3C7', borderWidth: 1, borderColor: '#FDE68A' },
                          venue.tier === 'Premium' && { backgroundColor: '#F5E8EA', borderWidth: 1, borderColor: '#E8D2D5' },
                          venue.tier === 'Luxury' && { backgroundColor: '#F3E8FF', borderWidth: 1, borderColor: '#E9D5FF' },
                          venue.tier === 'Popular' && { backgroundColor: '#E6F4EA', borderWidth: 1, borderColor: '#CEEAD6' },
                        ]}
                      >
                        <Text
                          style={[
                            styles.tierPillText,
                            venue.tier === 'Signature' && { color: '#92400E' },
                            venue.tier === 'Premium' && { color: '#581420' },
                            venue.tier === 'Luxury' && { color: '#6B21A8' },
                            venue.tier === 'Popular' && { color: '#137333' },
                          ]}
                        >
                          {venue.tier || 'Signature'}
                        </Text>
                      </View>
                    </View>

                    {/* Location */}
                    <View style={styles.locationRow}>
                      <MapPin className="w-3.5 h-3.5 text-[#8C7A7C] mr-1" />
                      <Text style={styles.locationText}>{venue.location || venue.city}</Text>
                    </View>

                    {/* Capacity */}
                    <Text style={styles.categoryText} numberOfLines={1}>
                      {venue.capacity || '200-1000 Guests'} • {venue.category || 'Resort & Hall'}
                    </Text>

                    {/* Starting Price */}
                    <Text style={styles.priceText}>{venue.startingPrice || '₹2,50,000 onwards'}</Text>

                    {/* View Details Pill Button */}
                    <TouchableOpacity
                      style={styles.viewDetailsBtn}
                      onPress={() => setSelectedVenue(venue)}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.viewDetailsBtnText}>View Details</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </motion.div>
            );
          })
        )}

        <View style={{ height: 40 }} />
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

      {/* FLOATING COMPARE BAR WHEN 2+ VENUES ARE SELECTED/SAVED */}
      <AnimatePresence>
        {savedVenuesList.length >= 2 && (
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
                <Text style={styles.floatingCompareBadgeText}>{savedVenuesList.length}</Text>
              </View>
              <Scale className="w-4 h-4 text-white mr-1.5" />
              <Text style={styles.floatingCompareBtnText}>Compare ({savedVenuesList.length})</Text>
              <ChevronRight className="w-4 h-4 text-white ml-1" />
            </TouchableOpacity>
          </motion.div>
        )}
      </AnimatePresence>

      {/* VENDOR COMPARE MODAL */}
      <VendorCompareModal
        visible={showCompareModal}
        categoryTitle="Venues"
        vendors={savedVenuesList}
        onClose={() => setShowCompareModal(false)}
        onSelectVendor={(v) => {
          const match = VENUES_DATA.find((item) => item.id === v.id);
          if (match) setSelectedVenue(match);
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
  venueCard: {
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
  venueImage: {
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
  venueCardTitle: {
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
  priceText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2A2425',
    marginTop: 3,
  },
  viewDetailsBtn: {
    backgroundColor: '#581420',
    paddingVertical: 6,
    borderRadius: 18,
    alignItems: 'center',
    marginTop: 6,
  },
  viewDetailsBtnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
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
    marginBottom: 16,
  },
  emptyResetBtn: {
    backgroundColor: '#581420',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
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

