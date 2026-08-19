import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
} from 'react-native';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronLeft,
  Search,
  Heart,
  Bookmark,
  Star,
  MapPin,
  Sparkles,
  X,
  Check,
  Send,
  Calendar,
  User,
  ChevronRight,
  Flame,
  Moon,
  Cross,
} from 'lucide-react';
import { RitualsDetailPage } from './RitualsDetailPage';
import { getInitialRoute, setAppRoute, parseHashRoute } from '../utils/routeManager';

export type ReligionType = 'Hindu' | 'Muslim' | 'Christian';

export interface RitualsVendor {
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
  languages?: string[];
  religion: ReligionType;
}

const TAMIL_NADU_DISTRICTS = [
  'All Cities', 'Chennai', 'Coimbatore', 'Madurai', 'Trichy', 'Salem',
  'Tirunelveli', 'Erode', 'Vellore', 'Kanchipuram', 'Thanjavur',
];

const BUDGET_RANGES = ['All Budgets', 'Under ₹10,000', '₹10,000 - ₹25,000', '₹25,000 - ₹50,000', '₹50,000+'];
const RATING_OPTIONS = ['All Ratings', '4.8+ Rated', '4.9+ Rated'];
const TIER_OPTIONS = ['All Tiers', 'Signature', 'Premium', 'Essential'];

export const RITUALS_VENDORS_DATA: RitualsVendor[] = [
  // HINDU
  {
    id: 'ritual-h1',
    name: 'Sri Vedic Wedding Services',
    rating: 4.9,
    reviewsCount: 214,
    location: 'Chennai',
    category: 'Hindu Wedding Priest / Iyer',
    startingPrice: '₹15,000 onwards',
    priceValue: 15000,
    tier: 'Signature',
    image: '/images/hindu1.jpeg',
    description: 'Experienced Hindu wedding ceremony service provider specializing in Vedic rituals, Saptapadi, and Muhurtham ceremonies with full Pooja arrangements.',
    experience: '15+ Years',
    phone: '+91 91501 97966',
    languages: ['Tamil', 'English', 'Sanskrit'],
    portfolio: [
      '/images/hindu1.jpeg',
      '/images/hindu2.jpeg',
      '/images/hindu3.jpeg',
      'https://loremflickr.com/800/800/pooja/all?lock=4',
    ],
    religion: 'Hindu',
  },
  {
    id: 'ritual-h2',
    name: 'Pandit Ravi Shankar Purohit',
    rating: 4.8,
    reviewsCount: 178,
    location: 'Coimbatore',
    category: 'Purohit Services',
    startingPrice: '₹12,000 onwards',
    priceValue: 12000,
    tier: 'Premium',
    image: '/images/hindu2.jpeg',
    description: 'Traditional Purohit with deep knowledge of Shastraic procedures, Muhurtham timings, and all South Indian Hindu wedding rituals.',
    experience: '20 Years',
    phone: '+91 91501 97966',
    languages: ['Tamil', 'Telugu', 'Sanskrit'],
    portfolio: [
      '/images/hindu2.jpeg',
      '/images/hindu1.jpeg',
      '/images/hindu3.jpeg',
      'https://loremflickr.com/800/800/pooja/all?lock=8',
    ],
    religion: 'Hindu',
  },
  {
    id: 'ritual-h3',
    name: 'Agni Vedic Ceremony Specialists',
    rating: 4.9,
    reviewsCount: 195,
    location: 'Chennai',
    category: 'Homam & Wedding Pooja',
    startingPrice: '₹18,000 onwards',
    priceValue: 18000,
    tier: 'Signature',
    image: '/images/hindu3.jpeg',
    description: 'Complete Homam and wedding Pooja specialists with all ritual materials provided. Expert in Navagraha Shanti, Ganapathi Homam, and Subrahmanya Pooja.',
    experience: '18 Years',
    phone: '+91 91501 97966',
    languages: ['Tamil', 'Sanskrit', 'Hindi'],
    portfolio: [
      '/images/hindu3.jpeg',
      '/images/hindu2.jpeg',
      '/images/hindu1.jpeg',
      'https://loremflickr.com/800/800/pooja/all?lock=12',
    ],
    religion: 'Hindu',
  },
  {
    id: 'ritual-h4',
    name: 'Muhurtham Masters',
    rating: 4.8,
    reviewsCount: 140,
    location: 'Madurai',
    category: 'Muhurtham Ceremony',
    startingPrice: '₹10,000 onwards',
    priceValue: 10000,
    tier: 'Premium',
    image: '/images/hindu1.jpeg',
    description: 'Specialists in auspicious Muhurtham timing selection and complete ceremony management for Hindu weddings across Tamil Nadu.',
    experience: '12 Years',
    phone: '+91 91501 97966',
    languages: ['Tamil', 'English'],
    portfolio: [
      '/images/hindu1.jpeg',
      '/images/hindu3.jpeg',
      '/images/hindu2.jpeg',
      'https://loremflickr.com/800/800/muhurtham/all?lock=16',
    ],
    religion: 'Hindu',
  },
  {
    id: 'ritual-h5',
    name: 'Veda Shastra Engagement Ceremony',
    rating: 4.7,
    reviewsCount: 98,
    location: 'Trichy',
    category: 'Engagement Ceremony',
    startingPrice: '₹8,000 onwards',
    priceValue: 8000,
    tier: 'Essential',
    image: '/images/hindu2.jpeg',
    description: 'Traditional Hindu engagement ceremony experts with ring exchange, Nichayathartham rituals, and family blessing ceremonies.',
    experience: '10 Years',
    phone: '+91 91501 97966',
    languages: ['Tamil', 'Telugu'],
    portfolio: [
      '/images/hindu2.jpeg',
      '/images/hindu3.jpeg',
      '/images/hindu1.jpeg',
      'https://loremflickr.com/800/800/hindu,ritual/all?lock=20',
    ],
    religion: 'Hindu',
  },
  // MUSLIM
  {
    id: 'ritual-m1',
    name: 'Al-Barakat Nikah Ceremony Services',
    rating: 4.9,
    reviewsCount: 183,
    location: 'Chennai',
    category: 'Nikah Ceremony',
    startingPrice: '₹12,000 onwards',
    priceValue: 12000,
    tier: 'Signature',
    image: '/images/muslim1.png',
    description: 'Trusted Nikah ceremony service providers offering complete wedding ritual management including Mahr negotiation, witness arrangements, and Walima coordination.',
    experience: '14 Years',
    phone: '+91 91501 97966',
    languages: ['Tamil', 'Urdu', 'Arabic', 'English'],
    portfolio: [
      '/images/muslim1.png',
      '/images/muslim2.png',
      '/images/muslim3.png',
      'https://loremflickr.com/800/800/nikah/all?lock=4',
    ],
    religion: 'Muslim',
  },
  {
    id: 'ritual-m2',
    name: 'Imam Syed Abdul Rasheed',
    rating: 4.9,
    reviewsCount: 210,
    location: 'Chennai',
    category: 'Imam',
    startingPrice: '₹10,000 onwards',
    priceValue: 10000,
    tier: 'Signature',
    image: '/images/muslim2.png',
    description: 'Senior Imam with extensive experience in conducting Nikah ceremonies, delivering Nikah Khutbah, and guiding families through Islamic wedding traditions.',
    experience: '22 Years',
    phone: '+91 91501 97966',
    languages: ['Tamil', 'Arabic', 'Urdu', 'English'],
    portfolio: [
      '/images/muslim2.png',
      '/images/muslim1.png',
      '/images/muslim3.png',
      'https://loremflickr.com/800/800/nikah/all?lock=8',
    ],
    religion: 'Muslim',
  },
  {
    id: 'ritual-m3',
    name: 'Qazi Fariduddin Marriage Services',
    rating: 4.8,
    reviewsCount: 165,
    location: 'Coimbatore',
    category: 'Qazi / Marriage Registration',
    startingPrice: '₹8,000 onwards',
    priceValue: 8000,
    tier: 'Premium',
    image: '/images/muslim3.png',
    description: 'Licensed Qazi offering official Nikah registration, marriage certificate processing, and complete Islamic ceremony management.',
    experience: '16 Years',
    phone: '+91 91501 97966',
    languages: ['Tamil', 'Arabic', 'Urdu'],
    portfolio: [
      '/images/muslim3.png',
      '/images/muslim2.png',
      '/images/muslim1.png',
      'https://loremflickr.com/800/800/nikah/all?lock=12',
    ],
    religion: 'Muslim',
  },
  {
    id: 'ritual-m4',
    name: 'Aalim Mohammed Yusuf Ceremony',
    rating: 4.8,
    reviewsCount: 130,
    location: 'Madurai',
    category: 'Aalim / Nikah Khutbah',
    startingPrice: '₹9,000 onwards',
    priceValue: 9000,
    tier: 'Premium',
    image: '/images/muslim1.png',
    description: 'Learned Aalim specializing in Nikah Khutbah recitation, Islamic wedding guidance, and complete marriage ceremony facilitation.',
    experience: '13 Years',
    phone: '+91 91501 97966',
    languages: ['Tamil', 'Arabic', 'English'],
    portfolio: [
      '/images/muslim1.png',
      '/images/muslim3.png',
      '/images/muslim2.png',
      'https://loremflickr.com/800/800/nikah/all?lock=16',
    ],
    religion: 'Muslim',
  },
  // CHRISTIAN
  {
    id: 'ritual-c1',
    name: 'Rev. Thomas Matthew Wedding Ministry',
    rating: 4.9,
    reviewsCount: 196,
    location: 'Chennai',
    category: 'Father / Priest',
    startingPrice: '₹14,000 onwards',
    priceValue: 14000,
    tier: 'Signature',
    image: '/images/christian1.jpeg',
    description: 'Experienced Catholic priest offering church wedding ceremonies, wedding blessings, and complete Christian marriage sacrament services.',
    experience: '18 Years',
    phone: '+91 91501 97966',
    languages: ['English', 'Tamil', 'Malayalam'],
    portfolio: [
      '/images/christian1.jpeg',
      '/images/christian2.jpeg',
      '/images/christian3.jpeg',
      '/images/christian4.jpeg',
    ],
    religion: 'Christian',
  },
  {
    id: 'ritual-c2',
    name: 'Pastor David Samuel Wedding Services',
    rating: 4.8,
    reviewsCount: 154,
    location: 'Coimbatore',
    category: 'Pastor / Minister',
    startingPrice: '₹10,000 onwards',
    priceValue: 10000,
    tier: 'Premium',
    image: '/images/christian2.jpeg',
    description: 'Ordained pastor providing Christian wedding ceremonies, vow renewals, and interfaith blessing services in Tamil Nadu.',
    experience: '15 Years',
    phone: '+91 91501 97966',
    languages: ['English', 'Tamil'],
    portfolio: [
      '/images/christian2.jpeg',
      '/images/christian1.jpeg',
      '/images/christian4.jpeg',
      '/images/christian3.jpeg',
    ],
    religion: 'Christian',
  },
  {
    id: 'ritual-c3',
    name: 'Grace Church Wedding Ceremony',
    rating: 4.9,
    reviewsCount: 221,
    location: 'Chennai',
    category: 'Church Wedding Ceremony',
    startingPrice: '₹18,000 onwards',
    priceValue: 18000,
    tier: 'Signature',
    image: '/images/christian3.jpeg',
    description: 'Complete church wedding ceremony services including venue coordination, choir arrangements, and full Christian marriage sacrament.',
    experience: '20 Years',
    phone: '+91 91501 97966',
    languages: ['English', 'Tamil', 'Telugu'],
    portfolio: [
      '/images/christian3.jpeg',
      '/images/christian2.jpeg',
      '/images/christian1.jpeg',
      '/images/christian4.jpeg',
    ],
    religion: 'Christian',
  },
  {
    id: 'ritual-c4',
    name: 'Blessings Marriage Ministry',
    rating: 4.7,
    reviewsCount: 112,
    location: 'Madurai',
    category: 'Wedding Blessing',
    startingPrice: '₹8,000 onwards',
    priceValue: 8000,
    tier: 'Essential',
    image: '/images/christian4.jpeg',
    description: 'Heartfelt Christian wedding blessing services for couples seeking a meaningful, personalized ceremony that honors their faith.',
    experience: '11 Years',
    phone: '+91 91501 97966',
    languages: ['English', 'Tamil'],
    portfolio: [
      '/images/christian4.jpeg',
      '/images/christian1.jpeg',
      '/images/christian2.jpeg',
      '/images/christian3.jpeg',
    ],
    religion: 'Christian',
  },
];

// ──────────────────────────────────────────────
// RELIGION SELECTION SCREEN
// ──────────────────────────────────────────────
interface ReligionSelectionScreenProps {
  onBack: () => void;
  onSelectReligion: (religion: ReligionType) => void;
}

const ReligionSelectionScreen: React.FC<ReligionSelectionScreenProps> = ({ onBack, onSelectReligion }) => {
  const religions: { key: ReligionType; label: string; icon: React.ReactNode; subtitle: string; color: string; bg: string }[] = [
    {
      key: 'Hindu',
      label: 'Hindu',
      icon: <Flame className="w-7 h-7" style={{ color: '#B45309' }} />,
      subtitle: 'Vedic ceremonies, Muhurtham, Homam & Pooja',
      color: '#B45309',
      bg: '#FEF3C7',
    },
    {
      key: 'Muslim',
      label: 'Muslim',
      icon: <Moon className="w-7 h-7" style={{ color: '#1D4ED8' }} />,
      subtitle: 'Nikah ceremony, Imam, Qazi & Aalim services',
      color: '#1D4ED8',
      bg: '#EFF6FF',
    },
    {
      key: 'Christian',
      label: 'Christian',
      icon: <Cross className="w-7 h-7" style={{ color: '#047857' }} />,
      subtitle: 'Church ceremony, Father, Pastor & Wedding Blessing',
      color: '#047857',
      bg: '#ECFDF5',
    },
  ];

  return (
    <View style={selStyles.container}>
      {/* Header */}
      <View style={selStyles.header}>
        <TouchableOpacity style={selStyles.backBtn} onPress={onBack} activeOpacity={0.7}>
          <ChevronLeft className="w-5 h-5 text-[#2A2425]" />
        </TouchableOpacity>
        <Text style={selStyles.headerTitle}>Wedding Rituals</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40, paddingTop: 8 }}
        showsVerticalScrollIndicator={false}
      >
        <div className="w-full max-w-2xl mx-auto">
          {/* Hero Text */}
          <View style={selStyles.heroSection}>
            <Text style={selStyles.heroTitle}>Wedding Rituals{"\n"}& Ceremony</Text>
            <Text style={selStyles.heroSubtitle}>
              Choose your wedding tradition to find the right ceremony services and vendors.
            </Text>
          </View>

          {/* Religion Cards */}
          <View style={{ gap: 14 }}>
            {religions.map((rel) => (
              <motion.div
                key={rel.key}
                whileHover={{ scale: 1.01, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 22 }}
              >
                <TouchableOpacity
                  style={[selStyles.religionCard, { borderColor: rel.color + '40' }]}
                  onPress={() => onSelectReligion(rel.key)}
                  activeOpacity={0.85}
                >
                  <View style={[selStyles.religionIconBox, { backgroundColor: rel.bg }]}>
                    {rel.icon}
                  </View>
                  <View style={selStyles.religionCardContent}>
                    <Text style={selStyles.religionLabel}>{rel.label}</Text>
                    <Text style={selStyles.religionSubtitle}>{rel.subtitle}</Text>
                  </View>
                  <ChevronRight className="w-5 h-5" style={{ color: rel.color }} />
                </TouchableOpacity>
              </motion.div>
            ))}
          </View>
        </div>
      </ScrollView>
    </View>
  );
};

// ──────────────────────────────────────────────
// RITUALS LISTING PAGE
// ──────────────────────────────────────────────
interface RitualsListingPageProps {
  religion: ReligionType;
  onBack: () => void;
  onNavigateToQuotesTab?: () => void;
  savedRitualsIds: Record<string, boolean>;
  onToggleSavedRitual: (id: string) => void;
  bookingSource?: 'entire_wedding' | 'individual';
}

const RitualsListingPage: React.FC<RitualsListingPageProps> = ({
  religion,
  onBack,
  onNavigateToQuotesTab,
  savedRitualsIds,
  onToggleSavedRitual,
  bookingSource = 'entire_wedding',
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [selectedBudget, setSelectedBudget] = useState('All Budgets');
  const [selectedRating, setSelectedRating] = useState('All Ratings');
  const [selectedTier, setSelectedTier] = useState('All Tiers');

  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [showBudgetDropdown, setShowBudgetDropdown] = useState(false);
  const [showRatingDropdown, setShowRatingDropdown] = useState(false);
  const [showTierDropdown, setShowTierDropdown] = useState(false);

  const initialRoute = getInitialRoute();
  const [selectedVendor, setSelectedVendor] = useState<RitualsVendor | null>(() => {
    if (initialRoute.subpage === 'rituals' && initialRoute.detailId) {
      return RITUALS_VENDORS_DATA.find((v) => v.id === initialRoute.detailId) || null;
    }
    return null;
  });

  const openVendorDetail = (v: RitualsVendor) => {
    setSelectedVendor(v);
    setAppRoute({ screen: 'dashboard', subpage: 'rituals', detailId: v.id });
  };

  const closeVendorDetail = () => {
    setSelectedVendor(null);
    setAppRoute({ screen: 'dashboard', subpage: 'rituals', detailId: null });
  };

  // Sync hash changes for ritual vendor detail view
  useEffect(() => {
    const handleHash = () => {
      const route = parseHashRoute();
      if (route && route.subpage === 'rituals') {
        if (route.detailId) {
          const match = RITUALS_VENDORS_DATA.find((v) => v.id === route.detailId);
          if (match) setSelectedVendor(match);
        } else {
          setSelectedVendor(null);
        }
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const titles: Record<ReligionType, string> = {
    Hindu: 'Hindu Wedding Rituals',
    Muslim: 'Muslim Wedding Rituals',
    Christian: 'Christian Wedding Rituals',
  };
  const subtitles: Record<ReligionType, string> = {
    Hindu: 'Find trusted priests and wedding ceremony service providers.',
    Muslim: 'Find trusted Nikah ceremony service providers.',
    Christian: 'Find trusted wedding ceremony service providers.',
  };

  const vendors = RITUALS_VENDORS_DATA.filter((v) => v.religion === religion);

  const filtered = vendors.filter((v) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q || v.name.toLowerCase().includes(q) || v.location.toLowerCase().includes(q) || v.category.toLowerCase().includes(q);
    const matchesCity = selectedCity === 'All Cities' || v.location === selectedCity;
    const matchesRating = selectedRating === 'All Ratings' ? true : selectedRating === '4.8+ Rated' ? v.rating >= 4.8 : v.rating >= 4.9;
    const matchesTier = selectedTier === 'All Tiers' || v.tier === selectedTier;
    let matchesBudget = true;
    if (selectedBudget === 'Under ₹10,000') matchesBudget = v.priceValue < 10000;
    else if (selectedBudget === '₹10,000 - ₹25,000') matchesBudget = v.priceValue >= 10000 && v.priceValue <= 25000;
    else if (selectedBudget === '₹25,000 - ₹50,000') matchesBudget = v.priceValue > 25000 && v.priceValue <= 50000;
    else if (selectedBudget === '₹50,000+') matchesBudget = v.priceValue > 50000;
    return matchesSearch && matchesCity && matchesRating && matchesTier && matchesBudget;
  });

  const closeAllDropdowns = () => {
    setShowCityDropdown(false);
    setShowBudgetDropdown(false);
    setShowRatingDropdown(false);
    setShowTierDropdown(false);
  };

  if (selectedVendor) {
    return (
      <RitualsDetailPage
        vendor={selectedVendor}
        religion={religion}
        onBack={closeVendorDetail}
        isBookmarked={Boolean(savedRitualsIds[selectedVendor.id])}
        onToggleBookmark={onToggleSavedRitual}
        bookingSource={bookingSource}
        onNavigateToQuotesTab={onNavigateToQuotesTab}
      />
    );
  }

  return (
    <View style={listStyles.container}>
      {/* HEADER */}
      <View style={listStyles.header}>
        <TouchableOpacity style={listStyles.backBtn} onPress={onBack} activeOpacity={0.7}>
          <ChevronLeft className="w-5 h-5 text-[#2A2425]" />
        </TouchableOpacity>
        <Text style={listStyles.headerTitle} numberOfLines={1}>{titles[religion]}</Text>
        <View style={{ width: 36 }} />
      </View>

      {/* Subtitle strip */}
      <View style={listStyles.subtitleStrip}>
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Text style={listStyles.subtitleText}>{subtitles[religion]}</Text>
        </div>
      </View>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* SEARCH */}
        <View style={listStyles.searchSection}>
          <View style={listStyles.searchBox}>
            <Search className="w-4 h-4 text-[#8C7A7C] mr-2" />
            <TextInput
              style={listStyles.searchInput}
              placeholder={`Search ${religion} ceremony services...`}
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

        {/* FILTER PILLS */}
        <View style={listStyles.filterBarContainer}>
          {[
            { label: selectedCity === 'All Cities' ? 'All Cities ▼' : `${selectedCity} ▼`, active: selectedCity !== 'All Cities', onPress: () => { closeAllDropdowns(); setShowCityDropdown(true); } },
            { label: selectedBudget === 'All Budgets' ? 'Budget ▼' : `${selectedBudget} ▼`, active: selectedBudget !== 'All Budgets', onPress: () => { closeAllDropdowns(); setShowBudgetDropdown(true); } },
            { label: selectedRating === 'All Ratings' ? 'Rating ▼' : `${selectedRating} ▼`, active: selectedRating !== 'All Ratings', onPress: () => { closeAllDropdowns(); setShowRatingDropdown(true); } },
            { label: selectedTier === 'All Tiers' ? 'Tier ▼' : `${selectedTier} ▼`, active: selectedTier !== 'All Tiers', onPress: () => { closeAllDropdowns(); setShowTierDropdown(true); } },
          ].map((chip, i) => (
            <TouchableOpacity key={i} style={[listStyles.filterChip, chip.active && listStyles.filterChipActive]} onPress={chip.onPress} activeOpacity={0.8}>
              <Text style={[listStyles.filterChipText, chip.active && listStyles.filterChipTextActive]} numberOfLines={1}>{chip.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* DROPDOWN BACKDROP */}
        {(showCityDropdown || showBudgetDropdown || showRatingDropdown || showTierDropdown) && (
          <div className="fixed inset-0 z-30" onClick={closeAllDropdowns} />
        )}

        {/* DROPDOWNS */}
        <AnimatePresence>
          {showCityDropdown && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="absolute top-[108px] left-4 right-4 sm:left-4 sm:w-80 z-40 bg-white rounded-2xl p-3 shadow-xl border border-[#E8DFD5] max-h-[260px] overflow-y-auto flex flex-col gap-1">
              {TAMIL_NADU_DISTRICTS.map((d) => (
                <TouchableOpacity key={d} style={[listStyles.dropdownOption, selectedCity === d && listStyles.dropdownOptionActive]}
                  onPress={() => { setSelectedCity(d); setShowCityDropdown(false); }}>
                  <Text style={[listStyles.dropdownOptionText, selectedCity === d && listStyles.dropdownOptionTextActive]}>{d}</Text>
                  {selectedCity === d && <Check className="w-4 h-4 text-[#581420]" />}
                </TouchableOpacity>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {showBudgetDropdown && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="absolute top-[108px] left-4 sm:left-1/4 sm:w-80 right-4 z-40 bg-white rounded-2xl p-3 shadow-xl border border-[#E8DFD5] flex flex-col gap-1">
              {BUDGET_RANGES.map((b) => (
                <TouchableOpacity key={b} style={[listStyles.dropdownOption, selectedBudget === b && listStyles.dropdownOptionActive]}
                  onPress={() => { setSelectedBudget(b); setShowBudgetDropdown(false); }}>
                  <Text style={[listStyles.dropdownOptionText, selectedBudget === b && listStyles.dropdownOptionTextActive]}>{b}</Text>
                  {selectedBudget === b && <Check className="w-4 h-4 text-[#581420]" />}
                </TouchableOpacity>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {showRatingDropdown && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="absolute top-[108px] left-4 sm:left-2/4 sm:w-72 right-4 z-40 bg-white rounded-2xl p-3 shadow-xl border border-[#E8DFD5] flex flex-col gap-1">
              {RATING_OPTIONS.map((r) => (
                <TouchableOpacity key={r} style={[listStyles.dropdownOption, selectedRating === r && listStyles.dropdownOptionActive]}
                  onPress={() => { setSelectedRating(r); setShowRatingDropdown(false); }}>
                  <Text style={[listStyles.dropdownOptionText, selectedRating === r && listStyles.dropdownOptionTextActive]}>{r}</Text>
                  {selectedRating === r && <Check className="w-4 h-4 text-[#581420]" />}
                </TouchableOpacity>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {showTierDropdown && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="absolute top-[108px] right-4 sm:w-72 z-40 bg-white rounded-2xl p-3 shadow-xl border border-[#E8DFD5] flex flex-col gap-1">
              {TIER_OPTIONS.map((t) => (
                <TouchableOpacity key={t} style={[listStyles.dropdownOption, selectedTier === t && listStyles.dropdownOptionActive]}
                  onPress={() => { setSelectedTier(t); setShowTierDropdown(false); }}>
                  <Text style={[listStyles.dropdownOptionText, selectedTier === t && listStyles.dropdownOptionTextActive]}>{t}</Text>
                  {selectedTier === t && <Check className="w-4 h-4 text-[#581420]" />}
                </TouchableOpacity>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* LIST HEADER */}
        <View style={listStyles.resultsHeader}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={listStyles.recommendedTitle}>Recommended Ceremony Providers</Text>
            <Sparkles className="w-4 h-4 text-[#C28E38] ml-1.5" />
          </View>
          <Text style={listStyles.resultCountText}>{filtered.length} vendors</Text>
        </View>
      </div>

      {/* VENDOR LIST */}
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 60, paddingHorizontal: 16 }}>
        <div className="w-full max-w-7xl mx-auto">
          {filtered.length === 0 ? (
            <View style={listStyles.emptyContainer}>
              <Flame className="w-10 h-10 text-[#A8989A] mb-2" />
              <Text style={listStyles.emptyTitle}>No Vendors Found</Text>
              <Text style={listStyles.emptySub}>Try adjusting your search or filters.</Text>
              <TouchableOpacity style={listStyles.resetFilterBtn} onPress={() => { setSearchQuery(''); setSelectedCity('All Cities'); setSelectedBudget('All Budgets'); setSelectedRating('All Ratings'); setSelectedTier('All Tiers'); }}>
                <Text style={listStyles.resetFilterBtnText}>Reset Filters</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
              {filtered.map((vendor) => {
                const isBookmarked = Boolean(savedRitualsIds[vendor.id]);
                return (
                  <motion.div
                    key={vendor.id}
                    whileHover={{ y: -3, scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    className="w-full cursor-pointer flex"
                    onClick={() => openVendorDetail(vendor)}
                  >
                    <View style={listStyles.cardContainer}>
                      <View style={listStyles.cardImgWrapper}>
                        <img
                          src={vendor.image}
                          alt={vendor.name}
                          className="w-full h-full object-cover object-[center_15%]"
                          loading="lazy"
                        />
                        <View style={listStyles.cardTierBadge}>
                          <Text style={listStyles.cardTierBadgeText}>{vendor.tier}</Text>
                        </View>
                        <TouchableOpacity
                          style={listStyles.cardBookmarkBtn}
                          onPress={(e) => {
                            e.stopPropagation();
                            onToggleSavedRitual(vendor.id);
                          }}
                          activeOpacity={0.8}
                        >
                          <Bookmark className={`w-4 h-4 ${isBookmarked ? 'text-[#8B1E2F] fill-[#8B1E2F]' : 'text-[#8C7A7C]'}`} />
                        </TouchableOpacity>
                      </View>
                      <View style={listStyles.cardBody}>
                        <View style={listStyles.cardTitleRow}>
                          <Text style={listStyles.cardTitle} numberOfLines={1}>{vendor.name}</Text>
                          <View style={listStyles.cardRatingPill}>
                            <Star className="w-3 h-3 text-amber-500 fill-amber-500 mr-1" />
                            <Text style={listStyles.cardRatingText}>{vendor.rating.toFixed(1)}</Text>
                            <Text style={listStyles.cardReviewsText}>({vendor.reviewsCount})</Text>
                          </View>
                        </View>
                        <View style={listStyles.cardLocationRow}>
                          <MapPin className="w-3.5 h-3.5 text-[#8C7A7C] mr-1" />
                          <Text style={listStyles.cardLocationText}>{vendor.location}</Text>
                          <Text style={listStyles.cardDot}>•</Text>
                          <Text style={listStyles.cardCategoryText} numberOfLines={1}>{vendor.category}</Text>
                        </View>
                        <View style={listStyles.cardPriceRow}>
                          <Text style={listStyles.cardPriceValue}>{vendor.startingPrice}</Text>
                          <TouchableOpacity style={listStyles.cardViewBtn} onPress={() => openVendorDetail(vendor)} activeOpacity={0.85}>
                            <Text style={listStyles.cardViewBtnText}>View Details</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </ScrollView>
    </View>
  );
};

// ──────────────────────────────────────────────
// MAIN RITUALS FLOW COMPONENT
// ──────────────────────────────────────────────
interface RitualsFlowProps {
  onBack: () => void;
  onNavigateToQuotesTab?: () => void;
  savedRitualsIds?: Record<string, boolean>;
  onToggleSavedRitual?: (id: string) => void;
  initialReligion?: ReligionType | null;
  bookingSource?: 'entire_wedding' | 'individual';
}

export const RitualsFlow: React.FC<RitualsFlowProps> = ({
  onBack,
  onNavigateToQuotesTab,
  savedRitualsIds = {},
  onToggleSavedRitual = () => {},
  initialReligion = null,
  bookingSource = 'entire_wedding',
}) => {
  const [selectedReligion, setSelectedReligion] = useState<ReligionType | null>(() => {
    if (initialReligion) return initialReligion;
    const route = getInitialRoute();
    if (route.subpage === 'rituals' && route.detailId) {
      const match = RITUALS_VENDORS_DATA.find((v) => v.id === route.detailId);
      if (match) return match.religion;
    }
    try {
      const saved = localStorage.getItem('tot_active_religion');
      if (saved === 'Hindu' || saved === 'Muslim' || saved === 'Christian') return saved as ReligionType;
    } catch (e) {}
    return null;
  });

  const handleSelectReligion = (r: ReligionType) => {
    setSelectedReligion(r);
    try {
      localStorage.setItem('tot_active_religion', r);
    } catch (e) {}
  };

  const handleBackFromListing = () => {
    try {
      localStorage.removeItem('tot_active_religion');
    } catch (e) {}
    if (initialReligion) {
      onBack();
    } else {
      setSelectedReligion(null);
    }
  };

  if (selectedReligion) {
    return (
      <RitualsListingPage
        religion={selectedReligion}
        onBack={handleBackFromListing}
        onNavigateToQuotesTab={onNavigateToQuotesTab}
        savedRitualsIds={savedRitualsIds}
        onToggleSavedRitual={onToggleSavedRitual}
        bookingSource={bookingSource}
      />
    );
  }

  return (
    <ReligionSelectionScreen
      onBack={onBack}
      onSelectReligion={handleSelectReligion}
    />
  );
};

// ──────────────────────────────────────────────
// STYLES
// ──────────────────────────────────────────────
const selStyles = StyleSheet.create({
  container: { flex: 1, height: '100%' as any, maxHeight: '100%' as any, width: '100%', backgroundColor: '#FAF7F2', overflow: 'hidden' as any, display: 'flex' as any, flexDirection: 'column' },
  header: { height: 52, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, width: '100%', backgroundColor: '#FAF7F2', borderBottomWidth: 1, borderBottomColor: '#EFE7DE' },
  backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#E8DFD5' },
  headerTitle: { fontSize: 16, fontWeight: '800', color: '#2A2425', fontFamily: 'Playfair Display, serif', flex: 1, textAlign: 'center' },
  heroSection: { paddingVertical: 28 },
  heroTitle: { fontSize: 28, fontWeight: '800', color: '#2A2425', fontFamily: 'Playfair Display, serif', lineHeight: 36, marginBottom: 10 },
  heroSubtitle: { fontSize: 14, color: '#6B5A5C', lineHeight: 21, fontWeight: '400' },
  religionCard: { backgroundColor: '#FFFFFF', borderRadius: 18, padding: 18, flexDirection: 'row', alignItems: 'center', gap: 14, borderWidth: 1.5, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 },
  religionIconBox: { width: 54, height: 54, borderRadius: 16, justifyContent: 'center', alignItems: 'center', flexShrink: 0 },
  religionCardContent: { flex: 1 },
  religionLabel: { fontSize: 17, fontWeight: '800', color: '#2A2425', fontFamily: 'Playfair Display, serif', marginBottom: 3 },
  religionSubtitle: { fontSize: 12, color: '#6B5A5C', lineHeight: 17 },
});

const listStyles = StyleSheet.create({
  container: { flex: 1, height: '100%' as any, maxHeight: '100%' as any, width: '100%', backgroundColor: '#FAF7F2', overflow: 'hidden' as any, display: 'flex' as any, flexDirection: 'column' },
  header: { height: 52, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, width: '100%', backgroundColor: '#FAF7F2', borderBottomWidth: 1, borderBottomColor: '#EFE7DE' },
  backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#E8DFD5' },
  headerTitle: { fontSize: 16, fontWeight: '800', color: '#2A2425', fontFamily: 'Playfair Display, serif', flex: 1, textAlign: 'center' },
  subtitleStrip: { paddingVertical: 6, backgroundColor: '#F5EEE6' },
  subtitleText: { fontSize: 11, color: '#6B5A5C', textAlign: 'center', fontWeight: '400' },
  searchSection: { paddingTop: 10, paddingBottom: 6 },
  searchBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', height: 40, borderRadius: 20, paddingHorizontal: 12, borderWidth: 1, borderColor: '#E2D8CD' },
  searchInput: { flex: 1, fontSize: 12, color: '#2A2425', outlineStyle: 'none' as any },
  filterBarContainer: { flexDirection: 'row', gap: 8, marginBottom: 10, marginTop: 2 },
  filterChip: { flex: 1, height: 36, borderRadius: 24, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#DDD6CE', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.03, shadowRadius: 2, elevation: 1 },
  filterChipActive: { backgroundColor: '#FFFFFF', borderColor: '#581420', borderWidth: 1.5 },
  filterChipText: { fontSize: 12, fontWeight: '500', color: '#332B2C', textAlign: 'center' },
  filterChipTextActive: { color: '#581420', fontWeight: '700' },
  dropdownOption: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8 },
  dropdownOptionActive: { backgroundColor: '#F3ECE3' },
  dropdownOptionText: { fontSize: 12, color: '#3D3234', fontWeight: '500' },
  dropdownOptionTextActive: { color: '#581420', fontWeight: '800' },
  resultsHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, marginTop: 4 },
  recommendedTitle: { fontSize: 15, fontFamily: 'Playfair Display, serif', fontWeight: '800', color: '#2A2425' },
  resultCountText: { fontSize: 11, color: '#8C7A7C', fontWeight: '600' },
  emptyContainer: { alignItems: 'center', justifyContent: 'center', paddingVertical: 40 },
  emptyTitle: { fontSize: 15, fontWeight: '700', color: '#2A2425', marginBottom: 4 },
  emptySub: { fontSize: 12, color: '#8C7A7C', textAlign: 'center', marginBottom: 14 },
  resetFilterBtn: { backgroundColor: '#581420', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 16 },
  resetFilterBtnText: { color: '#FFFFFF', fontSize: 12, fontWeight: '700' },
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E8DFD5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    width: '100%',
    display: 'flex' as any,
    flexDirection: 'column',
    flex: 1,
  },
  cardImgWrapper: {
    position: 'relative',
    height: 210,
    width: '100%',
    backgroundColor: '#F3ECE3',
    overflow: 'hidden',
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardTierBadgeText: { color: '#92400E', fontSize: 10, fontWeight: '800', textTransform: 'uppercase' as any },
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
  cardBody: { padding: 14, flex: 1, display: 'flex' as any, flexDirection: 'column', justifyContent: 'space-between' },
  cardTitleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 },
  cardTitle: { fontSize: 15, fontWeight: '800', color: '#2A2425', fontFamily: 'Playfair Display, serif', flex: 1, marginRight: 6 },
  cardRatingPill: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFBEB', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 8 },
  cardRatingText: { fontSize: 11, fontWeight: '800', color: '#92400E' },
  cardReviewsText: { fontSize: 10, color: '#B45309', marginLeft: 2 },
  cardLocationRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  cardLocationText: { fontSize: 11, color: '#6B5A5C', fontWeight: '500' },
  cardDot: { fontSize: 10, color: '#C2B5B7', marginHorizontal: 6 },
  cardCategoryText: { fontSize: 11, color: '#581420', fontWeight: '600', flex: 1 },
  cardPriceRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 10, borderTopWidth: 1, borderTopColor: '#F3ECE3' },
  cardPriceValue: { fontSize: 14, fontWeight: '800', color: '#2A2425' },
  cardViewBtn: { backgroundColor: '#F5EEE6', borderWidth: 1, borderColor: '#E8DFD5', paddingHorizontal: 11, paddingVertical: 5, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  cardViewBtnText: { color: '#581420', fontSize: 10.5, fontWeight: '700' },
});

