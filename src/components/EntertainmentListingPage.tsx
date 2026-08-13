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
  Music,
  Users,
  Eye,
  Sparkles,
  Bookmark,
  Volume2,
  Clock,
  Mic2,
  Check,
  X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { EntertainmentItem, EntertainmentDetailPage } from './EntertainmentDetailPage';
export type { EntertainmentItem };

export const ENTERTAINMENT_DATA: EntertainmentItem[] = [
  {
    id: 'ent-1',
    name: 'DJ Shadow & Electro Pulse Percussion',
    category: 'Celebrity DJ & Live Percussionist',
    city: 'Chennai',
    location: 'Nungambakkam, Chennai',
    rating: 4.9,
    reviewsCount: 192,
    startingPrice: '₹65,000 onwards',
    priceValue: 65000,
    tier: 'Signature',
    performanceDuration: '4 Hours',
    teamSize: '1 DJ + 1 Live Djembe/Percussionist',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
    description:
      'High-octane Sangeet and Afterparty DJ combining Bollywood remix tracks, South Indian Kuthu beats, EDM, and live acoustic percussion solos to keep the dance floor packed all night.',
    experience: '10+ Years',
    equipmentProvided: 'Pioneer DJ Console, JBL Line Array, Intelligent Beam Lighting',
    specialties: [
      'Bollywood & Tamil Kuthu Remixes',
      'Live Djembe & Darbuka Solos',
      'Smoke & Cold Pyro Sync',
      'Interactive Crowd Engagement',
    ],
    features: ['High-Energy DJ', 'Live Percussion', 'Beam Stage Lights'],
    portfolio: [
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=800&q=80',
    ],
    packages: [
      {
        title: 'Sangeet Party DJ & Percussion',
        price: '₹65,000 / Night',
        description: '4 Hours DJ set + Live Djembe Player + JBL Line Array Sound & 8 LED Moving Heads.',
      },
    ],
    phone: '+91 98411 22334',
    whatsapp: '919841122334',
  },
  {
    id: 'ent-2',
    name: 'Rhythm & Soul Live Wedding Band',
    category: 'Multi-genre Live Band',
    city: 'Chennai',
    location: 'T. Nagar, Chennai',
    rating: 4.9,
    reviewsCount: 168,
    startingPrice: '₹1,20,000 onwards',
    priceValue: 120000,
    tier: 'Luxury',
    performanceDuration: '3 Hours Live Set',
    teamSize: '6 Musicians + 2 Lead Vocalists',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    description:
      'Premier 8-piece live wedding music band delivering soul-stirring unplugged acoustics for Muhurtham receptions, retro classics, and electrifying multi-lingual pop medley performances.',
    experience: '12+ Years',
    equipmentProvided: 'Full Concert PA System, In-Ear Monitors, Stage Microphones',
    specialties: [
      'Multi-lingual Tamil/Hindi Medleys',
      'Unplugged Acoustic Cocktail Sets',
      'High-Energy Reception Shows',
      'Custom Couple Song Compositions',
    ],
    features: ['8-Piece Live Band', 'Multi-lingual Medleys', 'Full Concert PA'],
    portfolio: [
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1525994886773-080587e161c2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=800&q=80',
    ],
    phone: '+91 98412 33445',
    whatsapp: '919841233445',
  },
  {
    id: 'ent-3',
    name: 'Nadaswaram & Carnatic Maestro Ensemble',
    category: 'Classical Nadaswaram & Thavil',
    city: 'Madurai',
    location: 'West Masi Street, Madurai',
    rating: 4.9,
    reviewsCount: 220,
    startingPrice: '₹45,000 onwards',
    priceValue: 45000,
    tier: 'Signature',
    performanceDuration: 'Full Day Muhurtham',
    teamSize: '4 Nadaswaram + 3 Thavil Masters',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
    description:
      'Renowned family of traditional temple-trained Nadaswaram and Thavil artists bringing auspicious divine ragas, traditional Mangala Isai for Muhurtham, and bridal entry raga tunes.',
    experience: '25+ Years',
    equipmentProvided: 'Acoustic Brass & Silver Nadaswaram Instruments',
    specialties: [
      'Traditional Mangala Isai',
      'Kalyanam Ragas & Mallari',
      'Pooja & Oonjal Melodies',
      'Bridal Procession Melodies',
    ],
    features: ['Temple Trained', 'Auspicious Mangala Isai', 'Traditional Attire'],
    portfolio: [
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1525994886773-080587e161c2?auto=format&fit=crop&w=800&q=80',
    ],
    phone: '+91 98413 44556',
    whatsapp: '919841344556',
  },
  {
    id: 'ent-4',
    name: 'Mayura Royal Dance Troupe & Choreography',
    category: 'Sangeet Choreography & Dance Troupe',
    city: 'Coimbatore',
    location: 'Race Course, Coimbatore',
    rating: 4.8,
    reviewsCount: 145,
    startingPrice: '₹75,000 onwards',
    priceValue: 75000,
    tier: 'Premium',
    performanceDuration: 'Sangeet Night Show + Rehearsals',
    teamSize: '10 Professional Stage Dancers',
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80',
    description:
      'Celebrity dance choreographers providing 10-day family practice sessions, custom storyline Sangeet acts, prop design, and 10 professional backing dancers for grand couple entries.',
    experience: '9+ Years',
    equipmentProvided: 'LED Stage Props, Custom Costumes, Edit Track Audio Mixes',
    specialties: [
      'Couple Grand Entry Choreography',
      'Family Group Medley Rehearsals',
      'Classical Fusion & Hip-hop Acts',
      'Theme & Prop Design',
    ],
    features: ['10-Day Family Rehearsals', 'Custom Prop Outfits', 'Storyline Sangeet'],
    portfolio: [
      'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80',
    ],
    phone: '+91 98414 55667',
    whatsapp: '919841455667',
  },
  {
    id: 'ent-5',
    name: 'VJ Rohit & Ananya Anchor Duo',
    category: 'Celebrity MC / Anchors',
    city: 'Chennai',
    location: 'Adyar, Chennai',
    rating: 4.9,
    reviewsCount: 178,
    startingPrice: '₹40,000 onwards',
    priceValue: 40000,
    tier: 'Popular',
    performanceDuration: '4 Hours Event Hosting',
    teamSize: '2 Professional Anchors (Male & Female Duo)',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80',
    description:
      'Charismatic bilingual TV & Radio anchors hosting Sangeet ceremonies, fun family interactive games, couple trivia, and seamless stage script execution in Tamil and English.',
    experience: '8+ Years',
    equipmentProvided: 'Custom Event Script & Game Props',
    specialties: [
      'Bilingual Tamil & English Hosting',
      'Couple & Family Rapid Fire Games',
      'Stage Sangeet Protocol',
      'High Energy Audience Banter',
    ],
    features: ['Bilingual Anchoring', 'Interactive Games', 'Celebrity TV Hosts'],
    portfolio: [
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
    ],
    phone: '+91 98415 66778',
    whatsapp: '919841566778',
  },
  {
    id: 'ent-6',
    name: 'Sufi & Fusion Violin Symphony',
    category: 'Electric Violin & Acoustic Strings',
    city: 'Coimbatore',
    location: 'RS Puram, Coimbatore',
    rating: 4.8,
    reviewsCount: 112,
    startingPrice: '₹55,000 onwards',
    priceValue: 55000,
    tier: 'Premium',
    performanceDuration: '3 Hours',
    teamSize: '3 Strings Artists (Violin + Cello + Flute)',
    image: 'https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?auto=format&fit=crop&w=800&q=80',
    description:
      'Elegantly draped string quartet playing LED electric violin instrumentals, classical Sufi covers, Western romance themes, and soothing dinner background harmonies.',
    experience: '7+ Years',
    equipmentProvided: 'Yamaha Electric Violins & Wireless Amps',
    specialties: [
      'LED Electric Violin Solos',
      'Cocktail & Dinner Harmonies',
      'Bridal Entrance Violin Cover',
      'Sufi & Carnatic Fusion',
    ],
    features: ['LED Violins', 'Cocktail Harmonies', 'Romantic Covers'],
    portfolio: [
      'https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1525994886773-080587e161c2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
    ],
    phone: '+91 98416 77889',
    whatsapp: '919841677889',
  },
  {
    id: 'ent-7',
    name: 'Singari Chenda Melam & Dhol Troupe',
    category: 'Traditional Kerala & Punjabi Percussion',
    city: 'Tiruchirappalli',
    location: 'Cantonment, Trichy',
    rating: 4.9,
    reviewsCount: 156,
    startingPrice: '₹35,000 onwards',
    priceValue: 35000,
    tier: 'Popular',
    performanceDuration: '2 to 3 Hours Procession',
    teamSize: '12 Traditional Drummers in Ethnic Attire',
    image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=800&q=80',
    description:
      'Thunderous live Singari Chenda Melam and Punjabi Dhol drummers dressed in traditional Kasavu Mundu, creating unforgettable energy for Groom Baraat and Venue Entrance Processions.',
    experience: '11+ Years',
    equipmentProvided: 'Authentic Kerala Chenda & Punjabi Dhol Drums',
    specialties: [
      'Groom Baraat Procession Beats',
      'Royal Venue Entrance Melam',
      'Panchavadyam & Fusion Dhol',
      'High Voltage Rhythm Drills',
    ],
    features: ['12 Drummers Troupe', 'Groom Baraat Beats', 'Authentic Attire'],
    portfolio: [
      'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
    ],
    phone: '+91 98417 88990',
    whatsapp: '919841788990',
  },
  {
    id: 'ent-8',
    name: 'Illusions & Cold Pyro Special Effects',
    category: 'Cold Pyro & Fog Entrance Show',
    city: 'Chennai',
    location: 'Velachery, Chennai',
    rating: 4.8,
    reviewsCount: 129,
    startingPrice: '₹50,000 onwards',
    priceValue: 50000,
    tier: 'Popular',
    performanceDuration: 'Full Event Coverage',
    teamSize: '4 SFX Technicians & Pyrotechnicians',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
    description:
      'Safe smokeless indoor cold pyro sparklers, dry ice heavy fog "Dancing on Clouds" effects, bubble cannons, CO2 jet blast cannons, and couple entry confetti launchers.',
    experience: '8+ Years',
    equipmentProvided: 'Cold Pyro Sparkle Controllers, Heavy Dry Ice Fog Machine',
    specialties: [
      'Dancing on Clouds Dry Ice Fog',
      'Indoor Smokeless Cold Pyro Fountains',
      'CO2 Jet Blast Cannons',
      'Rose Petal & Gold Confetti Blasters',
    ],
    features: ['Smokeless Cold Pyro', 'Dry Ice Cloud Fog', 'Safe Certified SFX'],
    portfolio: [
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80',
    ],
    phone: '+91 98418 99001',
    whatsapp: '919841899001',
  },
  {
    id: 'ent-9',
    name: 'Saxophone & Flute Melodies Ensemble',
    category: 'Instrumental Saxophone & Bamboo Flute',
    city: 'Madurai',
    location: 'Anna Nagar, Madurai',
    rating: 4.8,
    reviewsCount: 104,
    startingPrice: '₹38,000 onwards',
    priceValue: 38000,
    tier: 'Popular',
    performanceDuration: '3 Hours Reception Set',
    teamSize: '3 Instrumentalists (Saxophone, Flute, Keyboard)',
    image: 'https://images.unsplash.com/photo-1525994886773-080587e161c2?auto=format&fit=crop&w=800&q=80',
    description:
      'Soothing instrumental saxophone and bamboo flute melodies playing romantic film soundtracks, classical Ilaiyaraaja & AR Rahman instrumentals for wedding receptions and dinners.',
    experience: '12+ Years',
    equipmentProvided: 'Acoustic Sound Pickup & Compact Amps',
    specialties: [
      'AR Rahman & Ilaiyaraaja Covers',
      'Smooth Jazz & Melodic Saxophone',
      'Live Bamboo Flute Solos',
      'Dinner Reception Background Music',
    ],
    features: ['Romantic Instrumentals', 'Saxophone Solos', 'Dinner Harmony'],
    portfolio: [
      'https://images.unsplash.com/photo-1525994886773-080587e161c2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
    ],
    phone: '+91 98419 00112',
    whatsapp: '919841900112',
  },
  {
    id: 'ent-10',
    name: 'The Retro & Pop Fusion Band',
    category: 'Sangeet & Afterparty Band',
    city: 'Erode',
    location: 'Bhavani Road, Erode',
    rating: 4.7,
    reviewsCount: 98,
    startingPrice: '₹80,000 onwards',
    priceValue: 80000,
    tier: 'Premium',
    performanceDuration: '3.5 Hours',
    teamSize: '5 Musicians (Lead Guitar, Bass, Drums, Keys, Vocal)',
    image: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=800&q=80',
    description:
      'High-energy regional pop band bringing classic 80s/90s Tamil hits, upbeat Sangeet dance tracks, electric guitar solos, and full crowd singalong jams.',
    experience: '8+ Years',
    equipmentProvided: 'Marshall & Ampeg Amp Rigs, Pearl Drum Kit, Stage Sound',
    specialties: [
      'High Energy Singalong Jamming',
      'Retro Tamil & Hindi Pop Medleys',
      'Interactive Audience Singalongs',
      'Electric Guitar & Drum Solos',
    ],
    features: ['High Energy Band', 'Retro Pop Medleys', 'Live Guitar Solos'],
    portfolio: [
      'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80',
    ],
    phone: '+91 98420 11223',
    whatsapp: '919842011223',
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
  { id: 'under-50k', label: 'Under ₹50,000' },
  { id: '50k-1l', label: '₹50,000 - ₹1,00,000' },
  { id: '1l-2l', label: '₹1,00,000 - ₹2,00,000' },
  { id: 'above-2l', label: '₹2,00,000+' },
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
  'DJ & Sound',
  'Live Band',
  'Classical',
  'Dance Troupe',
  'Anchor / MC',
  'Percussion / Dhol',
  'Pyro & SFX',
];

interface EntertainmentListingPageProps {
  onBack: () => void;
  savedEntIds?: Record<string, boolean>;
  onToggleSavedEnt?: (id: string) => void;
  onOpenSavedTab?: () => void;
}

export const EntertainmentListingPage: React.FC<EntertainmentListingPageProps> = ({
  onBack,
  savedEntIds = {},
  onToggleSavedEnt = (_id?: string) => {},
  onOpenSavedTab,
}) => {
  const [selectedCity, setSelectedCity] = useState<string>('All Cities');
  const [selectedBudget, setSelectedBudget] = useState<string>('All');
  const [selectedRating, setSelectedRating] = useState<string>('All');
  const [selectedTier, setSelectedTier] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Types');
  const [activeFilterModal, setActiveFilterModal] = useState<'city' | 'budget' | 'rating' | 'tier' | 'type' | null>(null);
  const [selectedArtist, setSelectedArtist] = useState<EntertainmentItem | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredArtists = ENTERTAINMENT_DATA.filter((artist) => {
    const matchesCity =
      selectedCity === 'All Cities' ||
      selectedCity === 'All' ||
      artist.city.toLowerCase() === selectedCity.toLowerCase() ||
      artist.location.toLowerCase().includes(selectedCity.toLowerCase()) ||
      selectedCity.toLowerCase().includes(artist.city.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All Types' ||
      artist.category.toLowerCase().includes(selectedCategory.toLowerCase());

    const matchesSearch =
      searchQuery.trim() === '' ||
      artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artist.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artist.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRating =
      selectedRating === 'All'
        ? true
        : selectedRating === '4.8'
        ? artist.rating >= 4.8
        : artist.rating >= 4.9;

    const matchesTier = selectedTier === 'All' ? true : artist.tier === selectedTier;

    let matchesBudget = true;
    if (selectedBudget === 'under-50k') matchesBudget = artist.priceValue < 50000;
    else if (selectedBudget === '50k-1l') matchesBudget = artist.priceValue >= 50000 && artist.priceValue <= 100000;
    else if (selectedBudget === '1l-2l') matchesBudget = artist.priceValue > 100000 && artist.priceValue <= 200000;
    else if (selectedBudget === 'above-2l') matchesBudget = artist.priceValue > 200000;

    return matchesCity && matchesCategory && matchesSearch && matchesRating && matchesTier && matchesBudget;
  });

  if (selectedArtist) {
    return (
      <EntertainmentDetailPage
        artist={selectedArtist}
        onBack={() => setSelectedArtist(null)}
        isBookmarked={Boolean(savedEntIds[selectedArtist.id])}
        onToggleBookmark={onToggleSavedEnt}
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
          <Text style={styles.headerTitle}>Wedding Entertainment</Text>
          <Text style={styles.headerSubtitle}>DJs, Live Bands, Classical & Dancers</Text>
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
          placeholder="Search DJ, Live Band, Anchor, Chenda Melam..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <X className="w-4 h-4 text-stone-400" />
          </TouchableOpacity>
        )}
      </View>

      {/* FILTER CHIPS ROW */}
      <View style={styles.filterRowContainer}>
        <TouchableOpacity
          style={[styles.filterChip, selectedCity !== 'All Cities' && selectedCity !== 'All' && styles.filterChipActive]}
          onPress={() => setActiveFilterModal('city')}
          activeOpacity={0.8}
        >
          <Text style={[styles.filterChipText, selectedCity !== 'All Cities' && selectedCity !== 'All' && styles.filterChipTextActive]} numberOfLines={1}>
            {selectedCity === 'All Cities' || selectedCity === 'All' ? 'All Cities ▼' : `${selectedCity} ▼`}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterChip, selectedBudget !== 'All' && styles.filterChipActive]}
          onPress={() => setActiveFilterModal('budget')}
          activeOpacity={0.8}
        >
          <Text style={[styles.filterChipText, selectedBudget !== 'All' && styles.filterChipTextActive]} numberOfLines={1}>
            {selectedBudget === 'All' ? 'Budget ▼' : `${BUDGET_OPTIONS.find((b) => b.id === selectedBudget)?.label || 'Budget'} ▼`}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterChip, selectedRating !== 'All' && styles.filterChipActive]}
          onPress={() => setActiveFilterModal('rating')}
          activeOpacity={0.8}
        >
          <Text style={[styles.filterChipText, selectedRating !== 'All' && styles.filterChipTextActive]} numberOfLines={1}>
            {selectedRating === 'All' ? 'Rating ▼' : `${selectedRating}★ ▼`}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterChip, selectedTier !== 'All' && styles.filterChipActive]}
          onPress={() => setActiveFilterModal('tier')}
          activeOpacity={0.8}
        >
          <Text style={[styles.filterChipText, selectedTier !== 'All' && styles.filterChipTextActive]} numberOfLines={1}>
            {selectedTier === 'All' ? 'Tier ▼' : `${selectedTier} ▼`}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterChip, selectedCategory !== 'All Types' && styles.filterChipActive]}
          onPress={() => setActiveFilterModal('type')}
          activeOpacity={0.8}
        >
          <Text style={[styles.filterChipText, selectedCategory !== 'All Types' && styles.filterChipTextActive]} numberOfLines={1}>
            {selectedCategory === 'All Types' ? 'Category ▼' : `${selectedCategory} ▼`}
          </Text>
        </TouchableOpacity>
      </View>

      {/* LIST OF CARDS */}
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} contentContainerStyle={styles.listContent}>
        {filteredArtists.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Music className="w-12 h-12 text-stone-300 mb-2" />
            <Text style={styles.emptyTitle}>No Entertainment Found</Text>
            <Text style={styles.emptySub}>Try adjusting your search or category filters.</Text>
          </View>
        ) : (
          filteredArtists.map((artist) => {
            const isSaved = Boolean(savedEntIds[artist.id]);
            return (
              <motion.div key={artist.id} whileHover={{ y: -2 }} className="w-full mb-4">
                <TouchableOpacity
                  style={styles.cardContainer}
                  onPress={() => setSelectedArtist(artist)}
                  activeOpacity={0.9}
                >
                  <View style={styles.imageWrapper}>
                    <Image source={{ uri: artist.image }} style={styles.cardImage} resizeMode="cover" />

                    <View style={styles.badgeRow}>
                      <View style={styles.tierTag}>
                        <Sparkles className="w-3 h-3 text-amber-600 mr-1" />
                        <Text style={styles.tierTagText}>{artist.tier}</Text>
                      </View>

                      <TouchableOpacity
                        style={styles.bookmarkBtn}
                        onPress={(e) => {
                          e.stopPropagation();
                          onToggleSavedEnt(artist.id);
                        }}
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            isSaved ? 'text-[#581420] fill-[#581420]' : 'text-stone-700'
                          }`}
                        />
                      </TouchableOpacity>
                    </View>

                    <View style={styles.ratingBadge}>
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400 mr-1" />
                      <Text style={styles.ratingText}>{artist.rating}</Text>
                      <Text style={styles.reviewsText}>({artist.reviewsCount})</Text>
                    </View>
                  </View>

                  <View style={styles.cardBody}>
                    <Text style={styles.artistName} numberOfLines={1}>{artist.name}</Text>
                    
                    <View style={styles.locationRow}>
                      <MapPin className="w-3.5 h-3.5 text-[#581420] mr-1" />
                      <Text style={styles.locationText}>{artist.location}, {artist.city}</Text>
                    </View>

                    <View style={styles.capacityRow}>
                      <Clock className="w-3.5 h-3.5 text-stone-500 mr-1" />
                      <Text style={styles.capacityText}>{artist.performanceDuration} • {artist.teamSize}</Text>
                    </View>

                    <View style={styles.featuresRow}>
                      {artist.features.slice(0, 3).map((feat, idx) => (
                        <View key={idx} style={styles.featureChip}>
                          <Text style={styles.featureChipText}>{feat}</Text>
                        </View>
                      ))}
                    </View>

                    <View style={styles.cardDivider} />

                    <View style={styles.cardFooter}>
                      <View>
                        <Text style={styles.priceLabel}>STARTING FROM</Text>
                        <Text style={styles.priceValue}>{artist.startingPrice}</Text>
                      </View>

                      <TouchableOpacity
                        style={styles.viewDetailsBtn}
                        onPress={() => setSelectedArtist(artist)}
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
                  {activeFilterModal === 'tier' && 'Select Tier'}
                  {activeFilterModal === 'type' && 'Select Category'}
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

                {activeFilterModal === 'type' && (
                  <View style={styles.optionsList}>
                    {TYPE_OPTIONS.map((type) => {
                      const isSelected = selectedCategory === type;
                      return (
                        <div
                          key={type}
                          onClick={() => {
                            setSelectedCategory(type);
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
                            {type}
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
    marginHorizontal: 14,
    marginTop: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E8DFD5',
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: '#1C1917',
    outlineStyle: 'none',
  },
  filterRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    gap: 6,
    overflowX: 'auto' as any,
  },
  filterChip: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8DFD5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  filterChipActive: {
    backgroundColor: '#F3ECE4',
    borderColor: '#581420',
  },
  filterChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4A3B3C',
  },
  filterChipTextActive: {
    color: '#581420',
    fontWeight: '700',
  },
  modalBackdrop: {
    position: 'fixed' as any,
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
  artistName: {
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
