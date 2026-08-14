import React, { useState } from 'react';
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
import { CatererDetailPage } from './CatererDetailPage';
import { RequestQuoteModal } from './RequestQuoteModal';
import { VendorCompareModal } from './VendorCompareModal';
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
  Utensils,
  User,
  ChevronDown,
  Scale,
  ChevronRight,
} from 'lucide-react';

export interface CateringVendor {
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
  isBookmarked?: boolean;
  description?: string;
  experience?: string;
  portfolio?: string[];
  phone?: string;
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
  { id: 'Signature', label: 'Signature', desc: 'Top Tier • Luxury & Bespoke Catering' },
  { id: 'Premium', label: 'Premium', desc: 'Second Tier • High Quality & Experienced Teams' },
  { id: 'Essential', label: 'Essential', desc: 'Last Tier • Value & Pocket-Friendly Packages' },
];

export const CATERING_DATA: CateringVendor[] = [
  {
    id: 'caterer-1',
    name: 'Sri Amirtham Catering',
    rating: 4.8,
    reviewsCount: 156,
    location: 'Coimbatore',
    category: 'Pure Veg & Multi Cuisine',
    startingPrice: '₹1,10,000 onwards',
    priceValue: 110000,
    tier: 'Signature',
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=600&q=80',
    description: 'Expert catering service delivering the best Pure Veg & Multi Cuisine experience.',
    experience: '5+ Years Experience',
    phone: '+91 91501 97966'
  },
  {
    id: 'caterer-2',
    name: 'A2B Catering',
    rating: 4.7,
    reviewsCount: 210,
    location: 'Madurai',
    category: 'South Indian Specialist',
    startingPrice: '₹90,000 onwards',
    priceValue: 90000,
    tier: 'Premium',
    image: 'https://images.unsplash.com/photo-1628294895950-9805252327bc?auto=format&fit=crop&w=600&q=80',
    description: 'Expert catering service delivering the best South Indian Specialist experience.',
    experience: '5+ Years Experience',
    phone: '+91 91501 97966'
  },
  {
    id: 'caterer-3',
    name: 'Foodies Delight',
    rating: 4.6,
    reviewsCount: 182,
    location: 'Trichy',
    category: 'Veg & Non Veg',
    startingPrice: '₹70,000 onwards',
    priceValue: 70000,
    tier: 'Essential',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80',
    description: 'Expert catering service delivering the best Veg & Non Veg experience.',
    experience: '5+ Years Experience',
    phone: '+91 91501 97966'
  },
  {
    id: 'caterer-4',
    name: 'Grand Feast Caterers',
    rating: 4.6,
    reviewsCount: 145,
    location: 'Salem',
    category: 'Multi Cuisine Catering',
    startingPrice: '₹75,000 onwards',
    priceValue: 75000,
    tier: 'Essential',
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=600&q=80',
    description: 'Expert catering service delivering the best Multi Cuisine Catering experience.',
    experience: '5+ Years Experience',
    phone: '+91 91501 97966'
  },
  {
    id: 'caterer-5',
    name: 'Namma Veetu Sapadu',
    rating: 4.5,
    reviewsCount: 98,
    location: 'Tirunelveli',
    category: 'Traditional South Indian',
    startingPrice: '₹85,000 onwards',
    priceValue: 85000,
    tier: 'Premium',
    image: 'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?auto=format&fit=crop&w=600&q=80',
    description: 'Expert catering service delivering the best Traditional South Indian experience.',
    experience: '5+ Years Experience',
    phone: '+91 91501 97966'
  },
  {
    id: 'caterer-6',
    name: 'The Banquet Co.',
    rating: 4.5,
    reviewsCount: 112,
    location: 'Erode',
    category: 'Luxury Catering Service',
    startingPrice: '₹1,25,000 onwards',
    priceValue: 125000,
    tier: 'Signature',
    image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=600&q=80',
    description: 'Expert catering service delivering the best Luxury Catering Service experience.',
    experience: '5+ Years Experience',
    phone: '+91 91501 97966'
  },
  {
    id: 'caterer-7',
    name: 'Royal Bites',
    rating: 4.8,
    reviewsCount: 120,
    location: 'Vellore',
    category: 'North Indian & Mughlai',
    startingPrice: '₹1,00,000 onwards',
    priceValue: 100000,
    tier: 'Signature',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80',
    description: 'Expert catering service delivering the best North Indian & Mughlai experience.',
    experience: '5+ Years Experience',
    phone: '+91 91501 97966'
  },
  {
    id: 'caterer-8',
    name: 'Classic Caterers',
    rating: 4.4,
    reviewsCount: 85,
    location: 'Thanjavur',
    category: 'Authentic South Indian',
    startingPrice: '₹80,000 onwards',
    priceValue: 80000,
    tier: 'Premium',
    image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=600&q=80',
    description: 'Expert catering service delivering the best Authentic South Indian experience.',
    experience: '5+ Years Experience',
    phone: '+91 91501 97966'
  },
  {
    id: 'caterer-9',
    name: 'Spice Route',
    rating: 4.3,
    reviewsCount: 150,
    location: 'Kanyakumari',
    category: 'Chettinad Special',
    startingPrice: '₹65,000 onwards',
    priceValue: 65000,
    tier: 'Essential',
    image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=600&q=80',
    description: 'Expert catering service delivering the best Chettinad Special experience.',
    experience: '5+ Years Experience',
    phone: '+91 91501 97966'
  },
  {
    id: 'caterer-10',
    name: 'Taste Makers',
    rating: 4.9,
    reviewsCount: 230,
    location: 'Tiruppur',
    category: 'Continental & Asian',
    startingPrice: '₹1,15,000 onwards',
    priceValue: 115000,
    tier: 'Signature',
    image: 'https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?auto=format&fit=crop&w=600&q=80',
    description: 'Expert catering service delivering the best Continental & Asian experience.',
    experience: '5+ Years Experience',
    phone: '+91 91501 97966'
  },
  {
    id: 'caterer-11',
    name: 'Chennai Kitchen',
    rating: 4.2,
    reviewsCount: 75,
    location: 'Dindigul',
    category: 'Local Favorites',
    startingPrice: '₹60,000 onwards',
    priceValue: 60000,
    tier: 'Essential',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80',
    description: 'Expert catering service delivering the best Local Favorites experience.',
    experience: '5+ Years Experience',
    phone: '+91 91501 97966'
  },
  {
    id: 'caterer-12',
    name: 'Mahaabali Foods',
    rating: 4.6,
    reviewsCount: 190,
    location: 'Karur',
    category: 'Grand Buffet Sets',
    startingPrice: '₹95,000 onwards',
    priceValue: 95000,
    tier: 'Premium',
    image: 'https://images.unsplash.com/photo-1628294895950-9805252327bc?auto=format&fit=crop&w=600&q=80',
    description: 'Expert catering service delivering the best Grand Buffet Sets experience.',
    experience: '5+ Years Experience',
    phone: '+91 91501 97966'
  },
  {
    id: 'caterer-13',
    name: 'Veg Paradise',
    rating: 4.5,
    reviewsCount: 140,
    location: 'Namakkal',
    category: 'Pure Vegetarian Only',
    startingPrice: '₹75,000 onwards',
    priceValue: 75000,
    tier: 'Essential',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80',
    description: 'Expert catering service delivering the best Pure Vegetarian Only experience.',
    experience: '5+ Years Experience',
    phone: '+91 91501 97966'
  },
  {
    id: 'caterer-14',
    name: 'Desi Flavors',
    rating: 4.7,
    reviewsCount: 165,
    location: 'Tuticorin',
    category: 'Pan Indian Cuisine',
    startingPrice: '₹85,000 onwards',
    priceValue: 85000,
    tier: 'Premium',
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=600&q=80',
    description: 'Expert catering service delivering the best Pan Indian Cuisine experience.',
    experience: '5+ Years Experience',
    phone: '+91 91501 97966'
  },
  {
    id: 'caterer-15',
    name: 'Gourmet Gatherings',
    rating: 4.9,
    reviewsCount: 210,
    location: 'Ooty',
    category: 'Bespoke Menus',
    startingPrice: '₹1,30,000 onwards',
    priceValue: 130000,
    tier: 'Signature',
    image: 'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?auto=format&fit=crop&w=600&q=80',
    description: 'Expert catering service delivering the best Bespoke Menus experience.',
    experience: '5+ Years Experience',
    phone: '+91 91501 97966'
  },
  {
    id: 'caterer-16',
    name: 'Aroma Kitchen',
    rating: 4.4,
    reviewsCount: 110,
    location: 'Kanchipuram',
    category: 'Biryani Specialists',
    startingPrice: '₹70,000 onwards',
    priceValue: 70000,
    tier: 'Essential',
    image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=600&q=80',
    description: 'Expert catering service delivering the best Biryani Specialists experience.',
    experience: '5+ Years Experience',
    phone: '+91 91501 97966'
  },
  {
    id: 'caterer-17',
    name: 'Elite Catering',
    rating: 4.8,
    reviewsCount: 185,
    location: 'Kumbakonam',
    category: 'High-end Dining',
    startingPrice: '₹1,20,000 onwards',
    priceValue: 120000,
    tier: 'Signature',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80',
    description: 'Expert catering service delivering the best High-end Dining experience.',
    experience: '5+ Years Experience',
    phone: '+91 91501 97966'
  },
  {
    id: 'caterer-18',
    name: 'Family Feast',
    rating: 4.3,
    reviewsCount: 90,
    location: 'Chengalpattu',
    category: 'Homestyle Cooking',
    startingPrice: '₹65,000 onwards',
    priceValue: 65000,
    tier: 'Essential',
    image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=600&q=80',
    description: 'Expert catering service delivering the best Homestyle Cooking experience.',
    experience: '5+ Years Experience',
    phone: '+91 91501 97966'
  },
  {
    id: 'caterer-19',
    name: 'Saffron Spice',
    rating: 4.6,
    reviewsCount: 135,
    location: 'Nagapattinam',
    category: 'Rich Indian Flavors',
    startingPrice: '₹90,000 onwards',
    priceValue: 90000,
    tier: 'Premium',
    image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=600&q=80',
    description: 'Expert catering service delivering the best Rich Indian Flavors experience.',
    experience: '5+ Years Experience',
    phone: '+91 91501 97966'
  },
  {
    id: 'caterer-20',
    name: 'Global Palate',
    rating: 4.7,
    reviewsCount: 175,
    location: 'Sivakasi',
    category: 'International Cuisine',
    startingPrice: '₹1,05,000 onwards',
    priceValue: 105000,
    tier: 'Signature',
    image: 'https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?auto=format&fit=crop&w=600&q=80',
    description: 'Expert catering service delivering the best International Cuisine experience.',
    experience: '5+ Years Experience',
    phone: '+91 91501 97966'
  },
];

export interface CateringListingPageProps {
  onBack: () => void;
  savedCateringIds?: Record<string, boolean>;
  onToggleSavedCatering?: (id: string) => void;
  onOpenSavedTab?: () => void;
  onNavigateToQuotesTab?: () => void;
}

export const CateringListingPage: React.FC<CateringListingPageProps> = ({
  onBack,
  savedCateringIds,
  onToggleSavedCatering,
  onOpenSavedTab,
  onNavigateToQuotesTab,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedBudget, setSelectedBudget] = useState('All');
  const [selectedRating, setSelectedRating] = useState('All');
  const [selectedTier, setSelectedTier] = useState('All');

  const [activeFilterModal, setActiveFilterModal] = useState<'city' | 'budget' | 'rating' | 'tier' | null>(null);

  const [selectedCaterer, setSelectedCaterer] = useState<CateringVendor | null>(null);
  
  // Send Quote Modal State
  const [quoteCaterer, setQuoteCaterer] = useState<CateringVendor | null>(null);
  const [quoteSuccess, setQuoteSuccess] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [eventDate, setEventDate] = useState('15 December 2026');
  const [eventLocation, setEventLocation] = useState('');
  const [eventType, setEventType] = useState<'Wedding' | 'Reception' | 'Engagement' | 'Other'>('Wedding');
  const [cateringType, setCateringType] = useState('Wedding Catering');
  const [showPhotoTypeDropdown, setShowPhotoTypeDropdown] = useState(false);
  
  // Local fallback state if parent doesn't manage saved IDs
  const [localBookmarkedIds, setLocalBookmarkedIds] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('saved_catering_caterers');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed['caterer-1']) {
          delete parsed['caterer-1'];
          localStorage.setItem('saved_catering_caterers', JSON.stringify(parsed));
        }
        return parsed;
      }
      return {};
    } catch {
      return {};
    }
  });

  const bookmarkedIds = savedCateringIds || localBookmarkedIds;
  const savedCaterersList = CATERING_DATA.filter((c) => Boolean(bookmarkedIds[c.id]));
  const [showCompareModal, setShowCompareModal] = useState(false);

  const toggleBookmark = (id: string) => {
    if (onToggleSavedCatering) {
      onToggleSavedCatering(id);
    } else {
      setLocalBookmarkedIds((prev) => {
        const updated = { ...prev, [id]: !prev[id] };
        try {
          localStorage.setItem('saved_catering_caterers', JSON.stringify(updated));
        } catch (e) {
          console.error(e);
        }
        return updated;
      });
    }
  };

  // Filter Caterers Logic
  const filteredCaterers = CATERING_DATA.filter((caterer) => {
    // Search Query
    const matchesSearch =
      caterer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      caterer.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      caterer.location.toLowerCase().includes(searchQuery.toLowerCase());

    // City Filter
    const matchesCity =
      selectedCity === 'All' ||
      selectedCity === 'All Cities' ||
      caterer.location.toLowerCase() === selectedCity.toLowerCase() ||
      selectedCity.toLowerCase().includes(caterer.location.toLowerCase());

    // Budget Filter
    let matchesBudget = true;
    if (selectedBudget !== 'All') {
      const bObj = BUDGET_OPTIONS.find((b) => b.id === selectedBudget);
      if (bObj && bObj.min !== undefined && bObj.max !== undefined) {
        matchesBudget = caterer.priceValue >= bObj.min && caterer.priceValue <= bObj.max;
      }
    }

    // Rating Filter
    let matchesRating = true;
    if (selectedRating !== 'All') {
      const rObj = RATING_OPTIONS.find((r) => r.id === selectedRating);
      if (rObj && rObj.minRating !== undefined) {
        matchesRating = caterer.rating >= rObj.minRating;
      }
    }

    // Tier Filter
    let matchesTier = true;
    if (selectedTier !== 'All') {
      matchesTier = caterer.tier === selectedTier;
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

  if (selectedCaterer) {
    return (
      <CatererDetailPage
        caterer={selectedCaterer}
        onBack={() => setSelectedCaterer(null)}
        isBookmarked={Boolean(bookmarkedIds[selectedCaterer.id])}
        onToggleBookmark={toggleBookmark}
        onNavigateToQuotesTab={onNavigateToQuotesTab}
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

        <Text style={styles.headerTitle}>Catering</Text>

        <View style={styles.headerRightIcons}>
          {isAnyFilterActive && (
            <TouchableOpacity style={styles.resetBadgeBtn} onPress={resetAllFilters} activeOpacity={0.7}>
              <Text style={styles.resetBadgeText}>Reset</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.iconButton}
            activeOpacity={0.7}
            onPress={() => {
              if (onOpenSavedTab) {
                onOpenSavedTab();
              }
            }}
          >
            <Heart
              className={`w-5 h-5 ${
                Object.values(bookmarkedIds).some(Boolean)
                  ? 'text-[#8B1E2F] fill-[#8B1E2F]'
                  : 'text-[#2A2425]'
              }`}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Input Bar */}
      <View style={styles.searchBarContainer}>
        <Search className="w-4 h-4 text-[#8C7A7C] mr-2" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by caterer, category, or district..."
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
          <Text style={styles.recommendedTitle}>Recommended Caterers</Text>
          <Sparkles className="w-4 h-4 text-[#C28E38] ml-1.5" />
        </View>
        <Text style={styles.resultCountText}>{filteredCaterers.length} caterers</Text>
      </View>

      {/* Caterers Vertical List */}
      <ScrollView
        style={[styles.listScrollView, { overflowY: 'auto' } as any]}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredCaterers.length === 0 ? (
          <View style={styles.emptyStateContainer}>
            <SlidersHorizontal className="w-10 h-10 text-[#C2B5A8] mb-2" />
            <Text style={styles.emptyStateTitle}>No caterers found</Text>
            <Text style={styles.emptyStateSub}>
              Try adjusting your city, budget range, or rating filter.
            </Text>
            <TouchableOpacity style={styles.emptyResetBtn} onPress={resetAllFilters}>
              <Text style={styles.emptyResetBtnText}>Reset All Filters</Text>
            </TouchableOpacity>
          </View>
        ) : (
          filteredCaterers.map((caterer) => {
            const isBookmarked = Boolean(bookmarkedIds[caterer.id]);
            return (
              <motion.div
                key={caterer.id}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mb-3.5"
              >
                <View style={styles.catererCard}>
                  {/* Left Photo */}
                  <Image
                    source={{ uri: caterer.image }}
                    style={styles.catererImage}
                    resizeMode="cover"
                  />

                  {/* Right Info Details */}
                  <View style={styles.cardRightCol}>
                    <View style={styles.cardHeaderRow}>
                      <Text style={styles.catererName} numberOfLines={1}>
                        {caterer.name}
                      </Text>
                      <TouchableOpacity
                        onPress={() => toggleBookmark(caterer.id)}
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
                        {caterer.rating}{' '}
                        <Text style={styles.reviewsText}>({caterer.reviewsCount})</Text>
                      </Text>
                      <View
                        style={[
                          styles.tierPill,
                          caterer.tier === 'Signature' && { backgroundColor: '#FEF3C7', borderWidth: 1, borderColor: '#FDE68A' },
                          caterer.tier === 'Premium' && { backgroundColor: '#F5E8EA', borderWidth: 1, borderColor: '#E8D2D5' },
                          caterer.tier === 'Essential' && { backgroundColor: '#E6F4EA', borderWidth: 1, borderColor: '#CEEAD6' },
                        ]}
                      >
                        <Text
                          style={[
                            styles.tierPillText,
                            caterer.tier === 'Signature' && { color: '#92400E' },
                            caterer.tier === 'Premium' && { color: '#581420' },
                            caterer.tier === 'Essential' && { color: '#137333' },
                          ]}
                        >
                          {caterer.tier}
                        </Text>
                      </View>
                    </View>

                    {/* Location */}
                    <View style={styles.locationRow}>
                      <MapPin className="w-3.5 h-3.5 text-[#8C7A7C] mr-1" />
                      <Text style={styles.locationText}>{caterer.location}</Text>
                    </View>

                    {/* Category */}
                    <Text style={styles.categoryText} numberOfLines={1}>
                      {caterer.category}
                    </Text>

                    {/* Starting Price */}
                    <Text style={styles.priceText}>{caterer.startingPrice}</Text>

                    {/* View Details Pill Button */}
                    <TouchableOpacity
                      style={styles.viewDetailsBtn}
                      onPress={() => setSelectedCaterer(caterer)}
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

      {/* FILTER DROPDOWN MODAL (CITY, BUDGET, RATING, TIER) */}
      <AnimatePresence>
        {activeFilterModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={styles.modalBackdrop}
          >
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              style={styles.modalSheet}
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

              <ScrollView style={{ maxHeight: 380, overflowY: 'auto' } as any} showsVerticalScrollIndicator={false}>
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
        visible={Boolean(quoteCaterer)}
        vendorId={quoteCaterer?.id}
        vendorName={quoteCaterer?.name || ''}
        vendorLocation={quoteCaterer?.location || ''}
        onClose={() => setQuoteCaterer(null)}
      />

      {/* FLOATING COMPARE BAR WHEN 2+ CATERERS ARE SELECTED/SAVED */}
      <AnimatePresence>
        {savedCaterersList.length >= 2 && (
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
                <Text style={styles.floatingCompareBadgeText}>{savedCaterersList.length}</Text>
              </View>
              <Scale className="w-4 h-4 text-white mr-1.5" />
              <Text style={styles.floatingCompareBtnText}>Compare ({savedCaterersList.length})</Text>
              <ChevronRight className="w-4 h-4 text-white ml-1" />
            </TouchableOpacity>
          </motion.div>
        )}
      </AnimatePresence>

      {/* VENDOR COMPARE MODAL */}
      <VendorCompareModal
        visible={showCompareModal}
        categoryTitle="Catering Services"
        vendors={savedCaterersList}
        onClose={() => setShowCompareModal(false)}
        onSelectVendor={(v) => {
          const match = CATERING_DATA.find((item) => item.id === v.id);
          if (match) setSelectedCaterer(match);
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
  catererCard: {
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
  catererImage: {
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
  catererName: {
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
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: '#FAF7F2',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
  callCatererBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#8B1E2F',
    borderRadius: 20,
    paddingVertical: 10,
  },
  callCatererBtnText: {
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
    justifyContent: 'flex-end',
  },
  quoteModalSheet: {
    backgroundColor: '#FAF7F2',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
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
  topCatererCard: {
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
  topCatererAvatar: {
    width: 58,
    height: 58,
    borderRadius: 14,
  },
  topCatererInfo: {
    flex: 1,
    marginLeft: 12,
  },
  topSendingToText: {
    fontSize: 12,
    color: '#786B6D',
    fontWeight: '500',
  },
  topCatererName: {
    fontFamily: 'Playfair Display, Georgia, serif',
    fontSize: 17,
    fontWeight: '800',
    color: '#581420',
    marginTop: 1,
    marginBottom: 2,
  },
  topCatererLocRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topCatererLocText: {
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

