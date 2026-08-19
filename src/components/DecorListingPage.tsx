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
import { DecorDetailPage, DecorStudio } from './DecorDetailPage';
import { RequestQuoteModal } from './RequestQuoteModal';
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
  CheckCircle2,
  X,
  Award,
  Filter,
  Check,
  Building2,
  SlidersHorizontal,
  Send,
  Eye,
  Calendar,
  ChevronDown,
  Flower2,
  Palette,
  Scale,
  ChevronRight,
} from 'lucide-react';
import { VendorCompareModal } from './VendorCompareModal';

export interface DecorListingPageProps {
  onBack: () => void;
  savedDecorIds?: Record<string, boolean>;
  onToggleSavedDecor?: (id: string) => void;
  onOpenSavedTab?: () => void;
  onNavigateToQuotesTab?: () => void;
  bookingSource?: 'entire_wedding' | 'individual';
  onNavigateToProfileMyBookings?: () => void;
}

const TAMIL_NADU_DISTRICTS = [
  'All',
  'Chennai',
  'Coimbatore',
  'Madurai',
  'Trichy',
  'Salem',
  'Pondicherry',
  'Tiruppur',
];

const DECOR_SPECIALIZATIONS = [
  'All Types',
  'Traditional South Indian & Mandap Decor',
  'Luxury Pastel Floral & Chandelier Stage',
  'Haldi, Mehendi & Vibrant Sangeet Setups',
  'Fairy Light Canopy & Beachside Mandap',
  'Jasmine Mandap & Traditional Floral Pillars',
  'Royal Palace Stage & Sangeet Lighting',
];

const BUDGET_RANGES = [
  'All Budgets',
  'Under ₹1,00,000',
  '₹1,00,000 - ₹2,50,000',
  '₹2,50,000 - ₹5,00,000',
  '₹5,00,000+',
];

const RATING_OPTIONS = ['All Ratings', '4.8+ Rated', '4.9+ Rated'];
const TIER_OPTIONS = ['All Tiers', 'Signature', 'Premium', 'Essential'];

export const DECOR_STUDIOS_DATA: DecorStudio[] = [
  {
    id: 'pkg_decor_1',
    name: 'Dream Designs',
    category: 'Thematic Floral & Stage Decor',
    city: 'All Cities',
    location: 'Destination Weddings',
    rating: 4.9,
    reviewsCount: 245,
    startingPrice: '₹2,00,000 onwards',
    priceValue: 200000,
    tier: 'Signature',
    coreSpecialty: 'Floral & Mandap Decor',
    image: '/images/royal_mandap_decor.jpg',
    description: 'Bespoke floral arrangements and thematic styling for your big day.',
    experience: '10+ Years',
    teamSize: '20+ Decorators',
    designProcess: '3D Mockups, Concept Sketches',
    services: ['Mandap Decor', 'Floral Art', 'Lighting', 'Stage Setup'],
  },
  {
    id: 'decor-1',
    name: 'Aura Royal Wedding Decorators',
    rating: 4.9,
    reviewsCount: 218,
    location: 'Chennai',
    category: 'Traditional South Indian & Mandap Decor',
    startingPrice: '₹1,50,000 onwards',
    priceValue: 150000,
    tier: 'Signature',
    image: '/images/royal_mandap_decor_pure.jpg',
    description:
      'Specialising in grand traditional South Indian wedding mandaps with fresh jasmine, marigolds, carved temple pillars, and regal stage backdrop design for high-profile weddings across Tamil Nadu.',
    experience: '14+ Years',
    phone: '+91 91501 97966',
    instagram: '@_ranjith_r.r_',
    themesProvided: [
      'Jasmine & Tuberose Temple Mandap',
      'Royal Velvet & Brass Lamp Stage',
      'Fairy Light Entrance Arch',
      'Traditional Brass Urli Floaters',
    ],
    portfolio: [
      '/images/royal_mandap_decor_pure.jpg',
      '/images/jasmine_ceiling_decor_pure.jpg',
      '/images/rustic_outdoor_mandap_pure.jpg',
      '/images/palace_reception_decor.jpg',
    ],
  },
  {
    id: 'decor-2',
    name: 'Flora Luxe Mint & Emerald Stage Stylists',
    rating: 4.9,
    reviewsCount: 186,
    location: 'Coimbatore',
    category: 'Luxury Pastel Floral & Chandelier Stage',
    startingPrice: '₹2,20,000 onwards',
    priceValue: 220000,
    tier: 'Signature',
    image: '/images/pastel_reception_stage.jpg',
    description:
      'Pioneers of luxury reception stages featuring mint green drapes, lush tropical greenery leaf arches, white floral hanging chandeliers, and vintage cream velvet chaise lounge seating.',
    experience: '11+ Years',
    phone: '+91 91501 97966',
    instagram: '@_ranjith_r.r_',
    themesProvided: [
      'Mint Green & Emerald Tropical Greenery Arch',
      'White Floral Crown Chandeliers',
      'Vintage Cream Velvet Chaise Lounge',
      'Lush Botanical Stage Front & Uplighting',
    ],
    portfolio: [
      '/images/pastel_reception_stage.jpg',
      '/images/rustic_outdoor_mandap_pure.jpg',
      '/images/modern_canopy_decor.jpg',
      '/images/palace_reception_decor.jpg',
    ],
  },
  {
    id: 'decor-3',
    name: 'Utsav Floral & Theme Decorators',
    rating: 4.8,
    reviewsCount: 142,
    location: 'Madurai',
    category: 'Haldi, Mehendi & Vibrant Sangeet Setups',
    startingPrice: '₹85,000 onwards',
    priceValue: 85000,
    tier: 'Premium',
    image: '/images/haldi_setup_decor_pure.jpg',
    description:
      'Vibrant event setup specialists creating joyful Haldi setups with yellow drapes and marigolds, colorful Mehendi swings, and energetic Sangeet concert lighting in Madurai and Southern districts.',
    experience: '9+ Years',
    phone: '+91 91501 97966',
    instagram: '@_ranjith_r.r_',
    themesProvided: [
      'Marigold Yellow Haldi Setup',
      'Boho Swing & Cushion Seating',
      'Festive Sangeet Light Truss',
      'Photobooth & Floral Wall',
    ],
    portfolio: [
      '/images/haldi_setup_decor_pure.jpg',
      '/images/sangeet_stage_decor.jpg',
      '/images/sangeet_stage_decor.jpg',
      '/images/modern_canopy_decor.jpg',
    ],
  },
  {
    id: 'decor-4',
    name: 'Starlight Ocean Mandaps & Petal Aisles',
    rating: 4.9,
    reviewsCount: 175,
    location: 'Pondicherry',
    category: 'Fairy Light Canopy & Beachside Mandap',
    startingPrice: '₹3,00,000 onwards',
    priceValue: 300000,
    tier: 'Signature',
    image: '/images/beach_resort_decor.jpg',
    description:
      'Exquisite outdoor destination mandap specialists famous for vibrant pink and orange silk draped oceanfront mandaps, rose and marigold top canopy roofs, and winding rose petal grass aisle pathways.',
    experience: '12+ Years',
    phone: '+91 91501 97966',
    instagram: '@_ranjith_r.r_',
    themesProvided: [
      'Oceanfront Pink & Orange Silk Draped Mandap',
      'Winding Rose Petal Lawn Aisle Pathway',
      'Floral Top Canopy & Outdoor Gazebo',
      'Starry Fairy Light Evening Canopy',
    ],
    portfolio: [
      '/images/beach_resort_decor.jpg',
      '/images/palace_reception_decor.jpg',
      '/images/modern_canopy_decor.jpg',
      '/images/palace_reception_decor.jpg',
    ],
  },
  {
    id: 'decor-5',
    name: 'Kaveri Temple Mandap & Floral Designers',
    rating: 4.8,
    reviewsCount: 119,
    location: 'Trichy',
    category: 'Jasmine Mandap & Traditional Floral Pillars',
    startingPrice: '₹1,10,000 onwards',
    priceValue: 110000,
    tier: 'Premium',
    image: '/images/jasmine_ceiling_decor_pure.jpg',
    description:
      'Traditional heritage floral artists specializing in authentic South Indian banana pith, lotus, tuberose, and jasmine pillars with carved wooden mandap structures.',
    experience: '10+ Years',
    phone: '+91 91501 97966',
    instagram: '@_ranjith_r.r_',
    themesProvided: [
      'Lotus & Jasmine Pillar Mandap',
      'Carved Wooden Temple Entrance',
      'Marigold Garlands & Brass Urlis',
      'Lakeside Traditional Stage',
    ],
    portfolio: [
      '/images/jasmine_ceiling_decor_pure.jpg',
      '/images/rustic_outdoor_mandap_pure.jpg',
      '/images/royal_mandap_decor_pure.jpg',
      '/images/palace_reception_decor.jpg',
    ],
  },
  {
    id: 'decor-6',
    name: 'Grandeur Palace Stage Creators',
    rating: 4.9,
    reviewsCount: 156,
    location: 'Salem',
    category: 'Royal Palace Stage & Sangeet Lighting',
    startingPrice: '₹1,80,000 onwards',
    priceValue: 180000,
    tier: 'Signature',
    image: '/images/palace_reception_decor.jpg',
    description:
      'High-end grand stage designers for large palace weddings and convention centers. Famous for intricate 3D architectural backdrops, crystal chandeliers, and concert-grade intelligent moving lights.',
    experience: '13+ Years',
    phone: '+91 91501 97966',
    instagram: '@_ranjith_r.r_',
    themesProvided: [
      'Royal Mughal Palace Stage',
      'Aisle Flower Arches & Red Carpet',
      'Concert Sangeet Lighting',
      'Opulent Crimson & Gold Stage',
    ],
    portfolio: [
      '/images/palace_reception_decor.jpg',
      '/images/sangeet_stage_decor.jpg',
      '/images/palace_reception_decor.jpg',
      '/images/modern_canopy_decor.jpg',
    ],
  },
  {
    id: 'decor-7',
    name: 'Mayura Velvet & Brass Stage Stylists',
    rating: 4.8,
    reviewsCount: 112,
    location: 'Tiruppur',
    category: 'Traditional South Indian & Mandap Decor',
    startingPrice: '₹1,20,000 onwards',
    priceValue: 120000,
    tier: 'Premium',
    image: '/images/palace_reception_decor.jpg',
    description:
      'Specialising in rich velvet drapes, antique brass lamp pillars, custom floral mandap roofs, and elegant dining table centerpieces across Tiruppur and Erode regions.',
    experience: '8+ Years',
    phone: '+91 91501 97966',
    instagram: '@_ranjith_r.r_',
    themesProvided: [
      'Velvet & Brass Lamp Mandap',
      'Fresh Orchid Ceiling Strands',
      'Modern Minimalist Floral Arch',
      'Gold Urli Entrance Decor',
    ],
    portfolio: [
      '/images/palace_reception_decor.jpg',
      '/images/palace_reception_decor.jpg',
      '/images/sangeet_stage_decor.jpg',
      '/images/modern_canopy_decor.jpg',
    ],
  },
  {
    id: 'decor-8',
    name: 'Vedic Lotus Mandap Artisans',
    rating: 4.9,
    reviewsCount: 204,
    location: 'Chennai',
    category: 'Traditional South Indian & Mandap Decor',
    startingPrice: '₹2,80,000 onwards',
    priceValue: 280000,
    tier: 'Signature',
    image: '/images/royal_mandap_decor_pure.jpg',
    description:
      'Crafting mesmerizing lotus floating pond mandaps, banana tree entrance gateways, and hand-strung tuberose garlands for authentic Vedic South Indian ceremonies.',
    experience: '16+ Years',
    phone: '+91 91501 97966',
    instagram: '@_ranjith_r.r_',
    themesProvided: [
      'Floating Lotus Pool Mandap',
      'Carved Teak Pillar Entrance',
      'Banana Blossom Urli Arch',
      'Rose & Mogra Swing',
    ],
    portfolio: [
      '/images/royal_mandap_decor_pure.jpg',
      '/images/jasmine_ceiling_decor_pure.jpg',
      '/images/rustic_outdoor_mandap_pure.jpg',
      '/images/palace_reception_decor.jpg',
    ],
  },
  {
    id: 'decor-9',
    name: 'Rosewood & Pastel Bloom Events',
    rating: 4.8,
    reviewsCount: 138,
    location: 'Coimbatore',
    category: 'Luxury Pastel Floral & Chandelier Stage',
    startingPrice: '₹1,95,000 onwards',
    priceValue: 195000,
    tier: 'Premium',
    image: '/images/pastel_reception_stage.jpg',
    description:
      'Specializing in contemporary blush pink, lavender, and champagne gold floral installations, fairy-light ceiling tunnels, and mirror pathway stages for grand receptions.',
    experience: '10+ Years',
    phone: '+91 91501 97966',
    instagram: '@_ranjith_r.r_',
    themesProvided: [
      'Blush Peony & Gold Arch',
      'Mirror Reflection Aisle',
      'Cascading Wisteria Stage',
      'Crystal Candle Wall',
    ],
    portfolio: [
      '/images/pastel_reception_stage.jpg',
      '/images/modern_canopy_decor.jpg',
      '/images/palace_reception_decor.jpg',
      '/images/rustic_outdoor_mandap_pure.jpg',
    ],
  },
  {
    id: 'decor-10',
    name: 'Chola Heritage Mandap & Stage Designers',
    rating: 4.9,
    reviewsCount: 167,
    location: 'Madurai',
    category: 'Traditional South Indian & Mandap Decor',
    startingPrice: '₹1,70,000 onwards',
    priceValue: 170000,
    tier: 'Signature',
    image: '/images/palace_reception_decor.jpg',
    description:
      'Creating temple architecture inspired mandaps with golden gopuram motifs, silk tapestry backdrops, and fragrant marigold-jasmine floral carpets.',
    experience: '15+ Years',
    phone: '+91 91501 97966',
    instagram: '@_ranjith_r.r_',
    themesProvided: [
      'Golden Temple Gopuram Mandap',
      'Silk Tapestry Stage',
      'Brass Lamp Pathway',
      'Royal Peacock Floral Wall',
    ],
    portfolio: [
      '/images/palace_reception_decor.jpg',
      '/images/royal_mandap_decor_pure.jpg',
      '/images/jasmine_ceiling_decor_pure.jpg',
      '/images/rustic_outdoor_mandap_pure.jpg',
    ],
  },
  {
    id: 'decor-11',
    name: 'Saffron & Sunshine Haldi Creations',
    rating: 4.7,
    reviewsCount: 95,
    location: 'Chennai',
    category: 'Haldi, Mehendi & Vibrant Sangeet Setups',
    startingPrice: '₹65,000 onwards',
    priceValue: 65000,
    tier: 'Essential',
    image: '/images/sangeet_stage_decor.jpg',
    description:
      'Vibrant and joyful budget-friendly setups for pre-wedding ceremonies including Haldi, Mehendi, Poolside Sangeet, and intimate home engagement decor.',
    experience: '6+ Years',
    phone: '+91 91501 97966',
    instagram: '@_ranjith_r.r_',
    themesProvided: [
      'Marigold Sunshine Canopy',
      'Colorful Kite Backdrop',
      'Brass Urli Haldi Tub',
      'Floral Photo Frame',
    ],
    portfolio: [
      '/images/sangeet_stage_decor.jpg',
      '/images/haldi_setup_decor_pure.jpg',
      '/images/sangeet_stage_decor.jpg',
      '/images/modern_canopy_decor.jpg',
    ],
  },
  {
    id: 'decor-12',
    name: 'Serenade Beachside Mandaps & Lights',
    rating: 4.9,
    reviewsCount: 143,
    location: 'Pondicherry',
    category: 'Fairy Light Canopy & Beachside Mandap',
    startingPrice: '₹2,60,000 onwards',
    priceValue: 260000,
    tier: 'Signature',
    image: '/images/beach_resort_decor.jpg',
    description:
      'Romantic oceanfront resort wedding styling with driftwood arches, white tropical orchids, bamboo torch pathways, and warm festoon lighting.',
    experience: '11+ Years',
    phone: '+91 91501 97966',
    instagram: '@_ranjith_r.r_',
    themesProvided: [
      'Oceanfront Driftwood Mandap',
      'White Orchid & Palm Arch',
      'Festoon Light Lawn Canopy',
      'Candlelit Beach Walkway',
    ],
    portfolio: [
      '/images/beach_resort_decor.jpg',
      '/images/modern_canopy_decor.jpg',
      '/images/palace_reception_decor.jpg',
      '/images/palace_reception_decor.jpg',
    ],
  },
  {
    id: 'decor-13',
    name: 'Imperial Crystal & Velvet Weddings',
    rating: 4.8,
    reviewsCount: 124,
    location: 'Trichy',
    category: 'Royal Palace Stage & Sangeet Lighting',
    startingPrice: '₹2,10,000 onwards',
    priceValue: 210000,
    tier: 'Signature',
    image: '/images/palace_reception_decor.jpg',
    description:
      'Regal ballroom wedding designers famous for grand velvet drapes, cascading crystal drops, mirrored dance floors, and golden throne stage arrangements.',
    experience: '12+ Years',
    phone: '+91 91501 97966',
    instagram: '@_ranjith_r.r_',
    themesProvided: [
      'Crimson Velvet & Gold Stage',
      'Cascading Crystal Chandelier',
      'Mirrored Aisle & Flower Columns',
      'Royal Golden Throne Backing',
    ],
    portfolio: [
      '/images/palace_reception_decor.jpg',
      '/images/palace_reception_decor.jpg',
      '/images/sangeet_stage_decor.jpg',
      '/images/palace_reception_decor.jpg',
    ],
  },
  {
    id: 'decor-14',
    name: 'Botanica Eco Floral & Bamboo Setups',
    rating: 4.7,
    reviewsCount: 88,
    location: 'Salem',
    category: 'Luxury Pastel Floral & Chandelier Stage',
    startingPrice: '₹90,000 onwards',
    priceValue: 90000,
    tier: 'Essential',
    image: '/images/rustic_outdoor_mandap_pure.jpg',
    description:
      'Sustainable and eco-conscious event decor using natural bamboo pillars, fresh eucalyptus leaves, seasonal local blooms, and reusable cloth drapes.',
    experience: '7+ Years',
    phone: '+91 91501 97966',
    instagram: '@_ranjith_r.r_',
    themesProvided: [
      'Greenery & White Rose Arch',
      'Natural Bamboo Gazebo',
      'Jute & Marigold Aisle',
      'Intimate Garden Stage',
    ],
    portfolio: [
      '/images/rustic_outdoor_mandap_pure.jpg',
      '/images/modern_canopy_decor.jpg',
      '/images/palace_reception_decor.jpg',
      '/images/pastel_reception_stage.jpg',
    ],
  },
  {
    id: 'decor-15',
    name: 'Subhamangalam Heritage Decorators',
    rating: 4.9,
    reviewsCount: 230,
    location: 'Chennai',
    category: 'Traditional South Indian & Mandap Decor',
    startingPrice: '₹3,50,000 onwards',
    priceValue: 350000,
    tier: 'Signature',
    image: '/images/modern_canopy_decor.jpg',
    description:
      'Ultra-luxurious Chettinad palace wedding transformations featuring antique brass urlis, handcrafted lotus installations, 10,000+ fresh flower strands, and regal stage backdrops.',
    experience: '18+ Years',
    phone: '+91 91501 97966',
    instagram: '@_ranjith_r.r_',
    themesProvided: [
      'Chettinad Palace Courtroom Stage',
      'Fresh Jasmine & Rose Ceiling Canopy',
      'Brass Lamp & Silk Drapes Entrance',
      'Royal Elephant Motif Mandap',
    ],
    portfolio: [
      '/images/modern_canopy_decor.jpg',
      '/images/palace_reception_decor.jpg',
      '/images/jasmine_ceiling_decor_pure.jpg',
      '/images/rustic_outdoor_mandap_pure.jpg',
    ],
  },
  {
    id: 'decor-16',
    name: 'Golden Rays Lighting & Stage Artisans',
    rating: 4.8,
    reviewsCount: 105,
    location: 'Tiruppur',
    category: 'Royal Palace Stage & Sangeet Lighting',
    startingPrice: '₹1,40,000 onwards',
    priceValue: 140000,
    tier: 'Premium',
    image: '/images/sangeet_stage_decor.jpg',
    description:
      'Lighting design and floral stage masters known for warm golden ambient washes, LED screen backdrop integrations, and fragrant floral entrance tunnels.',
    experience: '9+ Years',
    phone: '+91 91501 97966',
    instagram: '@_ranjith_r.r_',
    themesProvided: [
      'Warm Amber LED Backdrop Stage',
      'Tunnel Of Lights Entrance',
      'Floating Candle Urli Walkway',
      'Gilded Floral Mandala',
    ],
    portfolio: [
      '/images/sangeet_stage_decor.jpg',
      '/images/palace_reception_decor.jpg',
      '/images/sangeet_stage_decor.jpg',
      '/images/palace_reception_decor.jpg',
    ],
  },
];

export const DecorListingPage: React.FC<DecorListingPageProps> = ({
  onBack,
  savedDecorIds = {},
  onToggleSavedDecor,
  onOpenSavedTab,
  onNavigateToQuotesTab,
  bookingSource = 'entire_wedding',
  onNavigateToProfileMyBookings,
}) => {
  const [selectedLocation, setSelectedLocation] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Types');
  const [selectedBudget, setSelectedBudget] = useState<string>('All Budgets');
  const [selectedRating, setSelectedRating] = useState<string>('All Ratings');
  const [selectedTier, setSelectedTier] = useState<string>('All Tiers');

  const [activeFilterModal, setActiveFilterModal] = useState<'city' | 'budget' | 'rating' | 'tier' | 'type' | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
  
  const initialRoute = getInitialRoute();
  const [selectedStudio, setSelectedStudio] = useState<DecorStudio | null>(() => {
    if (initialRoute.subpage === 'decor' && initialRoute.detailId) {
      return DECOR_STUDIOS_DATA.find((s) => s.id === initialRoute.detailId) || null;
    }
    return null;
  });

  const openStudioDetail = (studio: DecorStudio) => {
    setSelectedStudio(studio);
    setAppRoute({ screen: 'dashboard', subpage: 'decor', detailId: studio.id });
  };

  const closeStudioDetail = () => {
    setSelectedStudio(null);
    setAppRoute({ screen: 'dashboard', subpage: 'decor', detailId: null });
  };

  // Sync hash changes for decor detail view
  useEffect(() => {
    const handleHash = () => {
      const route = parseHashRoute();
      if (route && route.subpage === 'decor') {
        if (route.detailId) {
          const match = DECOR_STUDIOS_DATA.find((s) => s.id === route.detailId);
          if (match) setSelectedStudio(match);
        } else {
          setSelectedStudio(null);
        }
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const savedDecorsList = DECOR_STUDIOS_DATA.filter((d) => Boolean(savedDecorIds[d.id]));
  const [showCompareModal, setShowCompareModal] = useState<boolean>(false);

  // Quote Request State
  const [quoteStudio, setQuoteStudio] = useState<DecorStudio | null>(null);

  const handleToggleBookmark = (id: string) => {
    if (onToggleSavedDecor) {
      onToggleSavedDecor(id);
    }
  };

  // Filter Logic
  const filteredStudios = DECOR_STUDIOS_DATA.filter((studio) => {
    // Location Filter
    if (selectedLocation !== 'All' && studio.location !== selectedLocation) {
      return false;
    }

    // Category Filter
    if (selectedCategory !== 'All Types' && studio.category !== selectedCategory) {
      return false;
    }

    // Budget Filter
    if (selectedBudget === 'Under ₹1,00,000' && studio.priceValue >= 100000) return false;
    if (
      selectedBudget === '₹1,00,000 - ₹2,50,000' &&
      (studio.priceValue < 100000 || studio.priceValue > 250000)
    )
      return false;
    if (
      selectedBudget === '₹2,50,000 - ₹5,00,000' &&
      (studio.priceValue < 250000 || studio.priceValue > 500000)
    )
      return false;
    if (selectedBudget === '₹5,00,000+' && studio.priceValue < 500000) return false;

    // Rating Filter
    if (selectedRating === '4.8+ Rated' && studio.rating < 4.8) return false;
    if (selectedRating === '4.9+ Rated' && studio.rating < 4.9) return false;

    // Tier Filter
    if (selectedTier !== 'All Tiers' && studio.tier !== selectedTier) return false;

    // Search Query Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const nameMatch = studio.name.toLowerCase().includes(q);
      const locMatch = studio.location.toLowerCase().includes(q);
      const catMatch = studio.category.toLowerCase().includes(q);
      return nameMatch || locMatch || catMatch;
    }

    return true;
  });

  const savedCount = Object.values(savedDecorIds).filter(Boolean).length;

  if (selectedStudio) {
    return (
      <DecorDetailPage
        studio={selectedStudio}
        onBack={closeStudioDetail}
        isBookmarked={Boolean(savedDecorIds[selectedStudio.id])}
        onToggleBookmark={handleToggleBookmark}
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
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconBtn} onPress={onBack} activeOpacity={0.8}>
          <ChevronLeft className="w-5 h-5 text-[#2A2425]" />
        </TouchableOpacity>

        <View style={styles.headerTitleCol}>
          <Text style={styles.headerTitle}>Wedding Decorators</Text>
          <Text style={styles.headerSubtitle}>Mandap, Stage, Lighting & Floral Setups</Text>
        </View>

        {onOpenSavedTab ? (
          <TouchableOpacity style={styles.savedBadgeBtn} onPress={onOpenSavedTab} activeOpacity={0.8}>
            <Heart className="w-4 h-4 text-[#581420] fill-[#581420]" />
            {savedCount > 0 && (
              <View style={styles.savedCountBadge}>
                <Text style={styles.savedCountText}>{savedCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        ) : (
          <View style={{ width: 40 }} />
        )}
      </View>

      {/* FULL-WIDTH ROUNDED SEARCH BAR */}
      <View style={styles.searchSection}>
        <View style={styles.searchBox}>
          <Search className="w-4 h-4 text-[#8C7A7C] mr-2" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search decorator, city, mandap or theme..."
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

      {/* FILTER CHIPS ROW */}
      <View style={{ marginBottom: 10, marginTop: 2 }}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, gap: 8, alignItems: 'center' }}
        >
        <TouchableOpacity
          style={[styles.filterChip, selectedLocation !== 'All' && styles.filterChipActive]}
          onPress={() => setActiveFilterModal('city')}
          activeOpacity={0.8}
        >
          <Text style={[styles.filterChipText, selectedLocation !== 'All' && styles.filterChipTextActive]} numberOfLines={1}>
            {selectedLocation === 'All' ? 'All Cities ▼' : `${selectedLocation} ▼`}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterChip, selectedBudget !== 'All Budgets' && styles.filterChipActive]}
          onPress={() => setActiveFilterModal('budget')}
          activeOpacity={0.8}
        >
          <Text style={[styles.filterChipText, selectedBudget !== 'All Budgets' && styles.filterChipTextActive]} numberOfLines={1}>
            {selectedBudget === 'All Budgets' ? 'Budget ▼' : `${selectedBudget} ▼`}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterChip, selectedRating !== 'All Ratings' && styles.filterChipActive]}
          onPress={() => setActiveFilterModal('rating')}
          activeOpacity={0.8}
        >
          <Text style={[styles.filterChipText, selectedRating !== 'All Ratings' && styles.filterChipTextActive]} numberOfLines={1}>
            {selectedRating === 'All Ratings' ? 'Rating ▼' : `${selectedRating} ▼`}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterChip, selectedTier !== 'All Tiers' && styles.filterChipActive]}
          onPress={() => setActiveFilterModal('tier')}
          activeOpacity={0.8}
        >
          <Text style={[styles.filterChipText, selectedTier !== 'All Tiers' && styles.filterChipTextActive]} numberOfLines={1}>
            {selectedTier === 'All Tiers' ? 'Tier ▼' : `${selectedTier} ▼`}
          </Text>
        </TouchableOpacity>
        </ScrollView>
      </View>

      {/* FILTER DROPDOWN MODAL */}
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
              <View style={styles.filterModalHeader}>
                <Text style={styles.filterModalTitle}>
                  {activeFilterModal === 'city' && 'Select District / City'}
                  {activeFilterModal === 'budget' && 'Select Budget Range'}
                  {activeFilterModal === 'rating' && 'Select Minimum Rating'}
                  {activeFilterModal === 'tier' && 'Select Tier'}
                </Text>
                <TouchableOpacity
                  style={styles.filterModalClose}
                  onPress={() => setActiveFilterModal(null)}
                >
                  <X className="w-5 h-5 text-[#2A2425]" />
                </TouchableOpacity>
              </View>

              <ScrollView style={{ maxHeight: 380 }} showsVerticalScrollIndicator={false}>
                {activeFilterModal === 'city' && (
                  <View style={styles.optionsList}>
                    {TAMIL_NADU_DISTRICTS.map((district) => {
                      const isSelected = selectedLocation === district;
                      return (
                        <div
                          key={district}
                          onClick={() => {
                            setSelectedLocation(district);
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
                          <Text style={{ fontSize: 14, fontWeight: isSelected ? '700' : '500', color: isSelected ? '#581420' : '#3B2F2F' }}>
                            {district === 'All' ? 'All Cities' : district}
                          </Text>
                          {isSelected && <Check className="w-4 h-4 text-[#581420] stroke-[2.5]" />}
                        </div>
                      );
                    })}
                  </View>
                )}

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
                            padding: '12px 16px',
                            borderRadius: '12px',
                            marginBottom: '4px',
                            cursor: 'pointer',
                            backgroundColor: isSelected ? '#F3ECE4' : 'transparent',
                          }}
                        >
                          <Text style={{ fontSize: 14, fontWeight: isSelected ? '700' : '500', color: isSelected ? '#581420' : '#3B2F2F' }}>
                            {b}
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
                            padding: '12px 16px',
                            borderRadius: '12px',
                            marginBottom: '4px',
                            cursor: 'pointer',
                            backgroundColor: isSelected ? '#F3ECE4' : 'transparent',
                          }}
                        >
                          <Text style={{ fontSize: 14, fontWeight: isSelected ? '700' : '500', color: isSelected ? '#581420' : '#3B2F2F' }}>
                            {r}
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
                            padding: '12px 16px',
                            borderRadius: '12px',
                            marginBottom: '4px',
                            cursor: 'pointer',
                            backgroundColor: isSelected ? '#F3ECE4' : 'transparent',
                          }}
                        >
                          <Text style={{ fontSize: 14, fontWeight: isSelected ? '700' : '500', color: isSelected ? '#581420' : '#3B2F2F' }}>
                            {t}
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



      {/* LISTINGS SCROLL */}
      <ScrollView
        style={{ flex: 1, overflowY: 'auto' } as any}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      >
        <Text style={styles.resultsCountText}>
          Showing {filteredStudios.length} Decorators in {selectedLocation === 'All' ? 'Tamil Nadu' : selectedLocation}
        </Text>

        {filteredStudios.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Palette className="w-12 h-12 text-[#C5A880] mb-2" />
            <Text style={styles.emptyTitle}>No Decorators Found</Text>
            <Text style={styles.emptySub}>
              Try clearing your active filters or changing your location search.
            </Text>
            <TouchableOpacity
              style={styles.resetBtn}
              onPress={() => {
                setSelectedLocation('All');
                setSelectedCategory('All Types');
                setSelectedBudget('All Budgets');
                setSelectedRating('All Ratings');
                setSelectedTier('All Tiers');
                setSearchQuery('');
              }}
            >
              <Text style={styles.resetBtnText}>Reset All Filters</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {filteredStudios.map((studio) => {
            const isSaved = Boolean(savedDecorIds[studio.id]);
            return (
              <motion.div
                key={studio.id}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                className="w-full cursor-pointer mb-4"
                onClick={() => openStudioDetail(studio)}
              >
                <View style={styles.card}>
                  {/* CARD COVER IMAGE */}
                  <View style={styles.cardImageContainer}>
                    <Image source={{ uri: studio.image }} style={styles.cardImage} resizeMode="cover" />
                    <View style={styles.cardImageOverlay} />

                    {/* TIER BADGE */}
                    <View style={styles.cardTierBadge}>
                      <Award className="w-3 h-3 text-[#581420] mr-1" />
                      <Text style={styles.cardTierText}>{studio.tier}</Text>
                    </View>

                    {/* BOOKMARK BUTTON */}
                    <TouchableOpacity
                      style={styles.bookmarkBtn}
                      onPress={(e) => {
                        if (e && typeof (e as any).stopPropagation === 'function') {
                          (e as any).stopPropagation();
                        }
                        handleToggleBookmark(studio.id);
                      }}
                      activeOpacity={0.8}
                    >
                      <Bookmark
                        className={`w-4 h-4 ${
                          isSaved ? 'text-[#581420] fill-[#581420]' : 'text-[#2A2425]'
                        }`}
                      />
                    </TouchableOpacity>

                    {/* RATING BADGE OVERLAY */}
                    <View style={styles.cardRatingOverlay}>
                      <Star className="w-3.5 h-3.5 text-white fill-white mr-1" />
                      <Text style={styles.cardRatingText}>{studio.rating}</Text>
                      <Text style={styles.cardReviewsText}>({studio.reviewsCount})</Text>
                    </View>
                  </View>

                  {/* CARD CONTENT */}
                  <View style={styles.cardBody}>
                    <View style={styles.cardHeaderRow}>
                      <Text style={styles.cardTitle} numberOfLines={1}>
                        {studio.name}
                      </Text>
                      <View style={styles.locationPill}>
                        <MapPin className="w-3 h-3 text-[#7D6E70] mr-0.5" />
                        <Text style={styles.locationPillText}>{studio.location}</Text>
                      </View>
                    </View>

                    <Text style={styles.cardCategoryText} numberOfLines={1}>
                      {studio.category}
                    </Text>

                    {/* KEY THEME BADGES */}
                    {studio.themesProvided && (
                      <View style={styles.themesRow}>
                        {studio.themesProvided.slice(0, 2).map((t, idx) => (
                          <View key={idx} style={styles.themePill}>
                            <Text style={styles.themePillText}>{t}</Text>
                          </View>
                        ))}
                      </View>
                    )}

                    <View style={styles.cardFooterRow}>
                      <View>
                        <Text style={styles.priceLabel}>Starting Price</Text>
                        <Text style={styles.priceValue}>{studio.startingPrice}</Text>
                      </View>

                      <TouchableOpacity
                        style={styles.quoteBtn}
                        onPress={() => openStudioDetail(studio)}
                        activeOpacity={0.85}
                      >
                        <Eye className="w-3.5 h-3.5 text-[#581420] mr-1" />
                        <Text style={styles.quoteBtnText}>View Details</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </motion.div>
            );
          })}
          </div>
        )}
      </ScrollView>

      {/* FILTER MODAL */}
      <Modal visible={showFilterModal} transparent animationType="slide">
        <View style={styles.filterModalOverlay}>
          <View style={styles.filterModalContent}>
            <View style={styles.filterModalHeader}>
              <Text style={styles.filterModalTitle}>Filter Decorators</Text>
              <TouchableOpacity onPress={() => setShowFilterModal(false)}>
                <X className="w-5 h-5 text-[#2A2425]" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.filterModalScroll}>
              {/* DISTRICT */}
              <View style={styles.filterGroup}>
                <Text style={styles.filterGroupTitle}>Location / District</Text>
                <View style={styles.filterOptionsGrid}>
                  {TAMIL_NADU_DISTRICTS.map((d) => (
                    <TouchableOpacity
                      key={d}
                      style={[
                        styles.filterModalChip,
                        selectedLocation === d && styles.filterModalChipSelected,
                      ]}
                      onPress={() => setSelectedLocation(d)}
                    >
                      <Text
                        style={[
                          styles.filterModalChipText,
                          selectedLocation === d && styles.filterModalChipTextSelected,
                        ]}
                      >
                        {d}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* BUDGET */}
              <View style={styles.filterGroup}>
                <Text style={styles.filterGroupTitle}>Budget Range</Text>
                <View style={styles.filterOptionsGrid}>
                  {BUDGET_RANGES.map((b) => (
                    <TouchableOpacity
                      key={b}
                      style={[
                        styles.filterModalChip,
                        selectedBudget === b && styles.filterModalChipSelected,
                      ]}
                      onPress={() => setSelectedBudget(b)}
                    >
                      <Text
                        style={[
                          styles.filterModalChipText,
                          selectedBudget === b && styles.filterModalChipTextSelected,
                        ]}
                      >
                        {b}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* TIER */}
              <View style={styles.filterGroup}>
                <Text style={styles.filterGroupTitle}>Decorator Tier</Text>
                <View style={styles.filterOptionsGrid}>
                  {TIER_OPTIONS.map((t) => (
                    <TouchableOpacity
                      key={t}
                      style={[
                        styles.filterModalChip,
                        selectedTier === t && styles.filterModalChipSelected,
                      ]}
                      onPress={() => setSelectedTier(t)}
                    >
                      <Text
                        style={[
                          styles.filterModalChipText,
                          selectedTier === t && styles.filterModalChipTextSelected,
                        ]}
                      >
                        {t}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </ScrollView>

            <View style={styles.filterModalFooter}>
              <TouchableOpacity
                style={styles.clearFilterBtn}
                onPress={() => {
                  setSelectedLocation('All');
                  setSelectedCategory('All Types');
                  setSelectedBudget('All Budgets');
                  setSelectedRating('All Ratings');
                  setSelectedTier('All Tiers');
                }}
              >
                <Text style={styles.clearFilterBtnText}>Clear All</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.applyFilterBtn}
                onPress={() => setShowFilterModal(false)}
              >
                <Text style={styles.applyFilterBtnText}>Apply Filters</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* QUOTE MODAL */}
      {quoteStudio && (
        <RequestQuoteModal
          visible={Boolean(quoteStudio)}
        vendorId={quoteStudio?.id}
          vendorName={quoteStudio.name}
          location={quoteStudio.location}
          startingPrice={quoteStudio.startingPrice}
          category="decor"
          onClose={() => setQuoteStudio(null)}
        />
      )}

      {/* FLOATING COMPARE BAR WHEN 2+ DECORS ARE SELECTED/SAVED */}
      <AnimatePresence>
        {savedDecorsList.length >= 2 && (
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
                <Text style={styles.floatingCompareBadgeText}>{savedDecorsList.length}</Text>
              </View>
              <Scale className="w-4 h-4 text-white mr-1.5" />
              <Text style={styles.floatingCompareBtnText}>Compare ({savedDecorsList.length})</Text>
              <ChevronRight className="w-4 h-4 text-white ml-1" />
            </TouchableOpacity>
          </motion.div>
        )}
      </AnimatePresence>

      {/* VENDOR COMPARE MODAL */}
      <VendorCompareModal
        visible={showCompareModal}
        categoryTitle="Wedding Decorators"
        vendors={savedDecorsList}
        onClose={() => setShowCompareModal(false)}
        onSelectVendor={(v) => {
          const match = DECOR_STUDIOS_DATA.find((item) => item.id === v.id);
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
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E8DFD5',
  },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FAF7F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitleCol: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#2A2425',
  },
  headerSubtitle: {
    fontSize: 10,
    color: '#7D6E70',
    fontWeight: '500',
  },
  savedBadgeBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FAF7F2',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  savedCountBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#581420',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 1,
  },
  savedCountText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
  },
  searchSection: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 6,
    backgroundColor: '#FAF7F2',
  },
  searchBox: {
    height: 42,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#E2D9CF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: '#2A2425',
    outlineStyle: 'none' as any,
  },
  filterBarContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 6,
    marginBottom: 8,
    alignItems: 'center',
  },
  filterChip: {
    flex: 1,
    height: 32,
    paddingHorizontal: 6,
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
  districtChipsBar: {
    backgroundColor: '#FFFFFF',
    paddingBottom: 8,
  },
  districtScroll: {
    paddingHorizontal: 16,
    gap: 6,
  },
  districtChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#FAF7F2',
    borderWidth: 1,
    borderColor: '#E8DFD5',
  },
  districtChipSelected: {
    backgroundColor: '#581420',
    borderColor: '#581420',
  },
  districtChipText: {
    fontSize: 11.5,
    color: '#4A3E3F',
    fontWeight: '600',
  },
  districtChipTextSelected: {
    color: '#FFFFFF',
  },
  categoryChipsBar: {
    backgroundColor: '#FFFFFF',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E8DFD5',
  },
  categoryScroll: {
    paddingHorizontal: 16,
    gap: 6,
  },
  categoryChip: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 16,
    backgroundColor: '#F3ECE4',
  },
  categoryChipSelected: {
    backgroundColor: '#C5A880',
  },
  categoryChipText: {
    fontSize: 11,
    color: '#581420',
    fontWeight: '700',
  },
  categoryChipTextSelected: {
    color: '#FFFFFF',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 30,
  },
  resultsCountText: {
    fontSize: 12,
    color: '#7D6E70',
    fontWeight: '600',
    marginBottom: 12,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#2A2425',
    marginTop: 8,
  },
  emptySub: {
    fontSize: 12,
    color: '#7D6E70',
    textAlign: 'center',
    marginTop: 4,
  },
  resetBtn: {
    marginTop: 16,
    backgroundColor: '#581420',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  resetBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },

  /* CARD STYLES */
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E8DFD5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  cardImageContainer: {
    position: 'relative',
    height: 180,
    width: '100%',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardImageOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  cardTierBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.92)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  cardTierText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#581420',
  },
  bookmarkBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardRatingOverlay: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#581420',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  cardRatingText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 11.5,
  },
  cardReviewsText: {
    color: '#E8DFD5',
    fontSize: 10.5,
    marginLeft: 3,
  },
  cardBody: {
    padding: 12,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#2A2425',
    flex: 1,
    marginRight: 8,
  },
  locationPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF7F2',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  locationPillText: {
    fontSize: 11,
    color: '#7D6E70',
    fontWeight: '600',
  },
  cardCategoryText: {
    fontSize: 12,
    color: '#7D6E70',
    marginTop: 2,
    fontWeight: '500',
  },
  themesRow: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 8,
  },
  themePill: {
    backgroundColor: '#F3ECE4',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  themePillText: {
    fontSize: 10,
    color: '#581420',
    fontWeight: '600',
  },
  cardFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F3ECE4',
  },
  priceLabel: {
    fontSize: 9.5,
    color: '#7D6E70',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  priceValue: {
    fontSize: 14,
    fontWeight: '800',
    color: '#2A2425',
  },
  quoteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5EEE6',
    borderWidth: 1,
    borderColor: '#E8DFD5',
    paddingHorizontal: 11,
    paddingVertical: 5,
    borderRadius: 12,
  },
  quoteBtnText: {
    color: '#581420',
    fontSize: 11,
    fontWeight: '700',
  },
  modalBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 9999,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  modalSheet: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    width: '90%',
    maxWidth: 480,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  optionsList: {
    paddingVertical: 4,
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

  /* MODAL */
  filterModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  filterModalContent: {
    backgroundColor: '#FAF7F2',
    borderRadius: 20,
    width: '90%',
    maxWidth: 450,
    
    maxHeight: '80%',
    paddingBottom: 20,
  },
  filterModalScroll: {
    padding: 16,
    gap: 16,
  },
  filterGroup: {
    gap: 8,
  },
  filterGroupTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#2A2425',
  },
  filterOptionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterModalChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8DFD5',
  },
  filterModalChipSelected: {
    backgroundColor: '#581420',
    borderColor: '#581420',
  },
  filterModalChipText: {
    fontSize: 12,
    color: '#4A3E3F',
  },
  filterModalChipTextSelected: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  filterModalFooter: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
    marginTop: 8,
  },
  clearFilterBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E8DFD5',
    alignItems: 'center',
  },
  clearFilterBtnText: {
    color: '#7D6E70',
    fontWeight: '700',
    fontSize: 13,
  },
  applyFilterBtn: {
    flex: 2,
    backgroundColor: '#581420',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  applyFilterBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
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

