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
  Star,
  MapPin,
  Heart,
  Search,
  Mail,
  Users,
  Eye,
  Sparkles,
  Bookmark,
  Package,
  Clock,
  Check,
  X,
  Scale,
  ChevronRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { InvitationItem, InvitationDetailPage } from './InvitationDetailPage';
import { VendorCompareModal } from './VendorCompareModal';
export type { InvitationItem };

export const INVITATIONS_DATA: InvitationItem[] = [
  {
    id: 'pkg_inv_1',
    name: 'Paper & Peonies',
    category: 'Custom Digital & Physical Invites',
    city: 'All Cities',
    location: 'Worldwide Delivery',
    rating: 4.9,
    reviewsCount: 289,
    startingPrice: '₹15,000 onwards',
    priceValue: 15000,
    turnaroundTime: '1-2 Weeks',
    image: '/src/assets/images/hindu_couple_arch_1786467605789.jpg',
    description: 'Custom designed, eco-friendly digital and physical invitations.',
    experience: '7+ Years',
    minimumOrder: '50 Invites',
    printingTypes: 'Foil Stamping, Letterpress, Digital',
    services: ['Digital Invites', 'Boxed Invites', 'E-Invites', 'Save the Date'],
  },
  {
    id: 'inv-1',
    name: 'Royal Crest Boxed Sweets & Gold Foil Card',
    category: 'Boxed & Luxury',
    city: 'Chennai',
    location: 'T. Nagar, Chennai',
    rating: 4.9,
    reviewsCount: 215,
    startingPrice: '₹280 / Box',
    priceValue: 280,
    tier: 'Luxury',
    minOrderQuantity: '100 Boxes',
    turnaroundTime: '10 - 12 Days',
    image: '/src/assets/invite1.png',
    description:
      'Rigid velvet or satin padded luxury gift box containing 3 inner inserts, gold electroplated metal couple monogram, and dual sweet/dry-fruit compartments.',
    experience: '12+ Years',
    customizationOptions: 'Full Custom Colors, Monograms & Inserts',
    specialties: [
      'Gold Electroplated Monograms',
      'Velvet & Satin Box Finishing',
      'Dry-fruit & Sweets Partition',
      'Silk Ribbon Ribbon Seals',
    ],
    features: ['Luxury Box', 'Gold Monogram', 'Dry Fruit Compartment'],
    portfolio: [
      'https://images.pexels.com/photos/1456329/pexels-photo-1456329.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/6044266/pexels-photo-6044266.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/5632372/pexels-photo-5632372.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/7062561/pexels-photo-7062561.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    packages: [
      {
        title: 'Rigid Boxed Sweets Suite',
        price: '₹280 / Piece',
        description: 'Includes Rigid Box + 3 Multi-color Inserts + Custom Monogram + Dry Fruit Trays.',
      },
    ],
    phone: '+91 91501 97966',
    whatsapp: '919150197966',
  },
  {
    id: 'inv-2',
    name: 'Kalyanam Paisley Gold Embossed Card',
    category: 'Traditional Printed',
    city: 'Chennai',
    location: 'Sowcarpet, Chennai',
    rating: 4.8,
    reviewsCount: 180,
    startingPrice: '₹45 / Card',
    priceValue: 45,
    tier: 'Signature',
    minOrderQuantity: '200 Cards',
    turnaroundTime: '5 - 7 Days',
    image: '/src/assets/invite2.png',
    description:
      'Classic South Indian traditional wedding card crafted on metallic shimmer cardstock with intricate paisley gold foil stamping, Ganesha embossing, and Tamil/English insert options.',
    experience: '18+ Years',
    customizationOptions: 'Bilingual Tamil & English Text Printing',
    specialties: [
      'Ganesha & Paisley Gold Stamping',
      'Shimmer Metallic Cardstock',
      'Bilingual Tamil Insert Sheets',
      'Matching Gold Stamped Envelopes',
    ],
    features: ['Traditional Paisley', 'Gold Stamping', 'Bilingual Tamil/English'],
    portfolio: [
      'https://images.pexels.com/photos/6044266/pexels-photo-6044266.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1456329/pexels-photo-1456329.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/7062561/pexels-photo-7062561.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/5632372/pexels-photo-5632372.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    phone: '+91 91501 97966',
    whatsapp: '919150197966',
  },
  {
    id: 'inv-3',
    name: 'Anand 3D Animated Video & WhatsApp E-Invites',
    category: '3D Animated & E-Invites',
    city: 'Coimbatore',
    location: 'RS Puram, Coimbatore',
    rating: 4.9,
    reviewsCount: 260,
    startingPrice: '₹3,500 / Video Set',
    priceValue: 3500,
    tier: 'Popular',
    minOrderQuantity: '1 Digital Master Set',
    turnaroundTime: '2 - 3 Days',
    image: '/src/assets/invite3.png',
    description:
      'Stunning HD 3D animated wedding invitation videos with custom audio background score, RSVP tracking links, interactive WhatsApp PDF cards, and Google Maps venue navigation buttons.',
    experience: '6+ Years',
    customizationOptions: 'Custom Audio Song, Photos & 3D Avatar Rendering',
    specialties: [
      'HD 60FPS Video Animation',
      'WhatsApp One-Click Sharing',
      'Google Maps Location Link',
      'Interactive PDF Card Inserts',
    ],
    features: ['3D Video Invite', 'WhatsApp Instant Share', 'Maps Integration'],
    portfolio: [
      'https://images.pexels.com/photos/5632372/pexels-photo-5632372.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/6044266/pexels-photo-6044266.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1456329/pexels-photo-1456329.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/7062561/pexels-photo-7062561.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    phone: '+91 91501 97966',
    whatsapp: '919150197966',
  },
  {
    id: 'inv-4',
    name: 'Custom Couple Caricature & Storyline Suite',
    category: 'Caricature Cards',
    city: 'Madurai',
    location: 'KK Nagar, Madurai',
    rating: 4.8,
    reviewsCount: 142,
    startingPrice: '₹85 / Card',
    priceValue: 85,
    tier: 'Premium',
    minOrderQuantity: '150 Cards',
    turnaroundTime: '7 - 10 Days',
    image: '/src/assets/invite4.png',
    description:
      'Charming hand-drawn digital caricatures of the couple depicting how they met, their favorite travel spots, and fun event dress code illustrations on textured art paper.',
    experience: '8+ Years',
    customizationOptions: 'Full Digital Portrait Sketching of Bride & Groom',
    specialties: [
      'Hand-Drawn Bride & Groom Art',
      'Storyline Timeline Inserts',
      'Textured 350GSM Art Cardstock',
      'Fun Event Dress Code Icons',
    ],
    features: ['Custom Caricatures', 'Storyline Illustration', 'Art Cardstock'],
    portfolio: [
      'https://images.pexels.com/photos/7062561/pexels-photo-7062561.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/5632372/pexels-photo-5632372.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/6044266/pexels-photo-6044266.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1456329/pexels-photo-1456329.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    phone: '+91 91501 97966',
    whatsapp: '919150197966',
  },
  {
    id: 'inv-5',
    name: 'Vriksha Plantable Seed Paper Green Invites',
    category: 'Eco-Friendly Seed Paper',
    city: 'Chennai',
    location: 'Adyar, Chennai',
    rating: 4.9,
    reviewsCount: 165,
    startingPrice: '₹60 / Card',
    priceValue: 60,
    tier: 'Popular',
    minOrderQuantity: '100 Cards',
    turnaroundTime: '6 - 8 Days',
    image: '/src/assets/invite1.png',
    description:
      '100% biodegradable handmade cotton seed paper cards embedded with marigold and wildflower seeds that guests can plant in soil after the wedding to grow flowers.',
    experience: '7+ Years',
    customizationOptions: 'Organic Herbal Inks & Deckle Edge Envelopes',
    specialties: [
      'Embedded Marigold & Herb Seeds',
      'Handmade Deckle Edge Envelopes',
      'Organic Chemical-Free Printing',
      'Zero-Waste Sustainable Cards',
    ],
    features: ['Plantable Seed Paper', '100% Organic Cotton', 'Zero Waste'],
    portfolio: [
      'https://images.pexels.com/photos/6044187/pexels-photo-6044187.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/7062561/pexels-photo-7062561.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1456329/pexels-photo-1456329.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/6044266/pexels-photo-6044266.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    phone: '+91 91501 97966',
    whatsapp: '919150197966',
  },
  {
    id: 'inv-6',
    name: 'Glass Clear Acrylic & Mirror Gold Foil Suite',
    category: 'Acrylic & Gold Foil',
    city: 'Coimbatore',
    location: 'Race Course, Coimbatore',
    rating: 4.9,
    reviewsCount: 138,
    startingPrice: '₹190 / Piece',
    priceValue: 190,
    tier: 'Luxury',
    minOrderQuantity: '100 Pieces',
    turnaroundTime: '10 - 14 Days',
    image: '/src/assets/invite2.png',
    description:
      'Ultra-modern 3mm thick crystal clear glass acrylic plaques silk-screen printed with metallic gold ink, UV lacquer finish, and velvet envelopment sleeves.',
    experience: '9+ Years',
    customizationOptions: 'Clear, Frosted, or Mirror Gold Acrylic Finishes',
    specialties: [
      '3mm Beveled Crystal Clear Acrylic',
      'UV Metallic Gold Ink Screen Printing',
      'Velvet Suede Pocket Envelopes',
      'Monogram Laser Engraving',
    ],
    features: ['Clear Acrylic Plaque', 'Metallic Gold Ink', 'Velvet Sleeve'],
    portfolio: [
      'https://images.pexels.com/photos/5632371/pexels-photo-5632371.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/6044266/pexels-photo-6044266.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1456329/pexels-photo-1456329.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/7062561/pexels-photo-7062561.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    phone: '+91 91501 97966',
    whatsapp: '919150197966',
  },
  {
    id: 'inv-7',
    name: 'Vintage Royal Letterpress & Cotton Paper',
    category: 'Letterpress',
    city: 'Chennai',
    location: 'Alwarpet, Chennai',
    rating: 4.8,
    reviewsCount: 110,
    startingPrice: '₹120 / Card',
    priceValue: 120,
    tier: 'Signature',
    minOrderQuantity: '150 Cards',
    turnaroundTime: '8 - 10 Days',
    image: '/src/assets/invite3.png',
    description:
      'Tactile deep impression debossed letterpress printing on 600GSM heavy cotton paper featuring hand-gilded gold leaf edges and custom calligraphy font typography.',
    experience: '14+ Years',
    customizationOptions: 'Hand Gilded Edges & Custom Wax Seal Stamp',
    specialties: [
      'Deep Debossed Letterpress Impression',
      '600GSM Heavy Cotton Paper',
      'Hand Gilded 24K Gold Foil Edges',
      'Bespoke Calligraphy Font',
    ],
    features: ['Deep Debossed', '600GSM Cotton Paper', '24K Gold Foil Edges'],
    portfolio: [
      'https://images.pexels.com/photos/4099467/pexels-photo-4099467.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1456329/pexels-photo-1456329.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/6044266/pexels-photo-6044266.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/5632372/pexels-photo-5632372.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    phone: '+91 91501 97966',
    whatsapp: '919150197966',
  },
  {
    id: 'inv-8',
    name: 'Royal Velvet Pocket & Wax Seal Cards',
    category: 'Wax-Sealed Pocket Cards',
    city: 'Tiruchirappalli',
    location: 'Thillai Nagar, Trichy',
    rating: 4.8,
    reviewsCount: 125,
    startingPrice: '₹110 / Card',
    priceValue: 110,
    tier: 'Popular',
    minOrderQuantity: '150 Cards',
    turnaroundTime: '7 - 9 Days',
    image: '/src/assets/invite4.png',
    description:
      'Three-tier pocket fold invitations enclosed in a rich burgundy or royal blue velvet pocket, sealed with a brass monogrammed wax stamp and satin ribbon band.',
    experience: '10+ Years',
    customizationOptions: 'Custom Wax Stamp Monogram & Ribbon Colors',
    specialties: [
      'Custom Brass Monogram Wax Seals',
      'Royal Velvet Pocket Fold Sleeve',
      '3 Tier Layered Insert Cards',
      'Satin Ribbon Band Fastening',
    ],
    features: ['Wax Seal Stamp', 'Velvet Pocket Fold', 'Satin Ribbon'],
    portfolio: [
      'https://images.pexels.com/photos/5632374/pexels-photo-5632374.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/4099467/pexels-photo-4099467.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/6044266/pexels-photo-6044266.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/5632371/pexels-photo-5632371.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    phone: '+91 91501 97966',
    whatsapp: '919150197966',
  },
  {
    id: 'inv-9',
    name: 'Teakwood Carved Sweets Box Invites',
    category: 'Wooden Box Invites',
    city: 'Erode',
    location: 'Perundurai Road, Erode',
    rating: 4.9,
    reviewsCount: 95,
    startingPrice: '₹340 / Box',
    priceValue: 340,
    tier: 'Luxury',
    minOrderQuantity: '75 Boxes',
    turnaroundTime: '12 - 15 Days',
    image: '/src/assets/invite1.png',
    description:
      'Handcrafted natural polished teakwood carved keepsake box with magnetic brass clasp, laser etched wedding details on lid, and brass dry fruit jars.',
    experience: '15+ Years',
    customizationOptions: 'Laser Etched Carvings & Brass Jar Compartments',
    specialties: [
      'Handcrafted Natural Teakwood',
      'Laser Etched Lid Carving',
      'Brass Magnetic Clasp Lock',
      'Brass Dry Fruit Jar Set',
    ],
    features: ['Teakwood Box', 'Laser Carved Lid', 'Brass Dry Fruit Jars'],
    portfolio: [
      'https://images.pexels.com/photos/6044243/pexels-photo-6044243.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/5632374/pexels-photo-5632374.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1456329/pexels-photo-1456329.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/6044187/pexels-photo-6044187.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    phone: '+91 91501 97966',
    whatsapp: '919150197966',
  },
  {
    id: 'inv-10',
    name: 'Interactive Website & AR Scan WhatsApp Suite',
    category: 'Interactive WhatsApp Suite',
    city: 'Chennai',
    location: 'Nungambakkam, Chennai',
    rating: 4.9,
    reviewsCount: 210,
    startingPrice: '₹4,500 / Website',
    priceValue: 4500,
    tier: 'Signature',
    minOrderQuantity: '1 Digital Suite',
    turnaroundTime: '2 - 4 Days',
    image: '/src/assets/invite2.png',
    description:
      'Bespoke wedding website micro-site featuring couple love story, event schedule countdown timer, guest RSVP form, accommodation details, and WhatsApp invitation cards.',
    experience: '5+ Years',
    customizationOptions: 'Custom Domain Name, Photo Gallery & RSVP Dashboard',
    specialties: [
      'Custom Couple Domain (.com)',
      'Live Guest RSVP Tracking',
      'Event Countdown Timer',
      'Photo Gallery & Location Maps',
    ],
    features: ['Wedding Microsite', 'Live Guest RSVP', 'Custom Domain'],
    portfolio: [
      'https://images.pexels.com/photos/6044116/pexels-photo-6044116.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/6044266/pexels-photo-6044266.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/5632372/pexels-photo-5632372.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/4099467/pexels-photo-4099467.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    phone: '+91 91501 97966',
    whatsapp: '919150197966',
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
  { id: 'under-100', label: 'Under ₹100 / card' },
  { id: '100-300', label: '₹100 - ₹300 / card' },
  { id: '300-600', label: '₹300 - ₹600 / card' },
  { id: 'above-600', label: '₹600+ / card' },
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
  'Boxed & Luxury',
  'Traditional',
  'Digital / Video',
  'Acrylic',
  'Seed Paper',
  'Letterpress',
  'Wooden Box',
];

export interface InvitationListingPageProps {
  onBack: () => void;
  savedInviteIds?: Record<string, boolean>;
  onToggleSavedInvite?: (id: string) => void;
  onOpenSavedTab?: () => void;
  onNavigateToQuotesTab?: () => void;
  bookingSource?: 'entire_wedding' | 'individual';
  onNavigateToProfileMyBookings?: () => void;
}

export const InvitationListingPage: React.FC<InvitationListingPageProps> = ({
  onBack,
  savedInviteIds = {},
  onToggleSavedInvite = (_id?: string) => { },
  onOpenSavedTab,
  onNavigateToQuotesTab,
  bookingSource = 'entire_wedding',
  onNavigateToProfileMyBookings,
}) => {
  const [selectedCity, setSelectedCity] = useState<string>('All Cities');
  const [selectedBudget, setSelectedBudget] = useState<string>('All');
  const [selectedRating, setSelectedRating] = useState<string>('All');
  const [selectedTier, setSelectedTier] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Types');
  const [activeFilterModal, setActiveFilterModal] = useState<'city' | 'budget' | 'rating' | 'tier' | 'type' | null>(null);
  const [selectedInvite, setSelectedInvite] = useState<InvitationItem | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const savedInvitesList = INVITATIONS_DATA.filter((inv) => Boolean(savedInviteIds[inv.id]));
  const [showCompareModal, setShowCompareModal] = useState(false);

  const filteredInvites = INVITATIONS_DATA.filter((invite) => {
    const iCity = (invite.city || '').toLowerCase();
    const iLocation = (invite.location || '').toLowerCase();
    const iCategory = (invite.category || '').toLowerCase();
    const iName = (invite.name || '').toLowerCase();
    const qCity = selectedCity.toLowerCase();
    const qSearch = searchQuery.trim().toLowerCase();

    const matchesCity =
      selectedCity === 'All Cities' ||
      selectedCity === 'All' ||
      iCity === qCity ||
      iLocation.includes(qCity) ||
      qCity.includes(iCity);

    const matchesCategory =
      selectedCategory === 'All Types' ||
      iCategory.includes(selectedCategory.toLowerCase());

    const matchesSearch =
      qSearch === '' ||
      iName.includes(qSearch) ||
      iCity.includes(qSearch) ||
      iCategory.includes(qSearch) ||
      iLocation.includes(qSearch);

    const inviteRating = invite.rating || 4.8;
    const matchesRating =
      selectedRating === 'All'
        ? true
        : selectedRating === '4.8'
          ? inviteRating >= 4.8
          : inviteRating >= 4.9;

    const inviteTier = invite.tier || 'Signature';
    const matchesTier = selectedTier === 'All' ? true : inviteTier === selectedTier;

    const price = invite.priceValue || 150;
    let matchesBudget = true;
    if (selectedBudget === 'under-100') matchesBudget = price < 100;
    else if (selectedBudget === '100-300') matchesBudget = price >= 100 && price <= 300;
    else if (selectedBudget === '300-600') matchesBudget = price > 300 && price <= 600;
    else if (selectedBudget === 'above-600') matchesBudget = price > 600;

    return matchesCity && matchesCategory && matchesSearch && matchesRating && matchesTier && matchesBudget;
  });

  if (selectedInvite) {
    return (
      <InvitationDetailPage
        invite={selectedInvite}
        onBack={() => setSelectedInvite(null)}
        isBookmarked={Boolean(savedInviteIds[selectedInvite.id])}
        onToggleBookmark={onToggleSavedInvite}
        onNavigateToQuotesTab={onNavigateToQuotesTab}
        bookingSource={bookingSource}
        onNavigateToMyWeddingPayments={() => {
          setSelectedInvite(null);
          window.dispatchEvent(
            new CustomEvent('tot_switch_to_my_wedding_payments', { detail: { vendorId: selectedInvite.id } })
          );
        }}
        onNavigateToProfileMyBookings={() => {
          setSelectedInvite(null);
          if (onNavigateToProfileMyBookings) {
            onNavigateToProfileMyBookings();
          } else {
            window.dispatchEvent(
              new CustomEvent('tot_switch_to_profile_my_bookings', { detail: { vendorId: selectedInvite.id } })
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
        <TouchableOpacity style={styles.backBtn} onPress={onBack} activeOpacity={0.8}>
          <ArrowLeft className="w-5 h-5 text-stone-800" />
        </TouchableOpacity>

        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={styles.headerTitle}>Wedding Invitations</Text>
          <Text style={styles.headerSubtitle}>Boxed, Digital, Traditional & Custom Cards</Text>
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
          placeholder="Search Boxed, Acrylic, 3D Video, Traditional..."
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

      {/* LIST OF CARDS */}
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      >
        {filteredInvites.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Mail className="w-12 h-12 text-stone-300 mb-2" />
            <Text style={styles.emptyTitle}>No Invitations Found</Text>
            <Text style={styles.emptySub}>Try adjusting your search or category filters.</Text>
          </View>
        ) : (
          filteredInvites.map((invite) => {
            const isSaved = Boolean(savedInviteIds[invite.id]);
            return (
              <motion.div key={invite.id} whileHover={{ y: -2 }} className="w-full mb-4">
                <TouchableOpacity
                  style={styles.cardContainer}
                  onPress={() => setSelectedInvite(invite)}
                  activeOpacity={0.9}
                >
                  <View style={styles.imageWrapper}>
                    <Image source={{ uri: invite.image }} style={styles.cardImage} resizeMode="cover" />

                    <View style={styles.badgeRow}>
                      <View style={styles.tierTag}>
                        <Sparkles className="w-3 h-3 text-amber-600 mr-1" />
                        <Text style={styles.tierTagText}>{invite.tier}</Text>
                      </View>

                      <TouchableOpacity
                        style={styles.bookmarkBtn}
                        onPress={(e) => {
                          e.stopPropagation();
                          onToggleSavedInvite(invite.id);
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
                      <Text style={styles.ratingText}>{invite.rating}</Text>
                      <Text style={styles.reviewsText}>({invite.reviewsCount})</Text>
                    </View>
                  </View>

                  <View style={styles.cardBody}>
                    <Text style={styles.inviteName} numberOfLines={1}>{invite.name}</Text>

                    <View style={styles.locationRow}>
                      <MapPin className="w-3.5 h-3.5 text-[#581420] mr-1" />
                      <Text style={styles.locationText}>{invite.location || invite.city}, {invite.city}</Text>
                    </View>

                    <View style={styles.capacityRow}>
                      <Package className="w-3.5 h-3.5 text-stone-500 mr-1" />
                      <Text style={styles.capacityText}>Min: {invite.minOrderQuantity || (invite as any).minimumOrder || '50 Pcs'} • Delivery: {invite.turnaroundTime || '1-2 Weeks'}</Text>
                    </View>

                    <View style={styles.featuresRow}>
                      {(invite.features || invite.specialties || (invite as any).services || ['Custom Invites', 'Digital Cards', 'Fast Delivery']).slice(0, 3).map((feat, idx) => (
                        <View key={idx} style={styles.featureChip}>
                          <Text style={styles.featureChipText}>{feat}</Text>
                        </View>
                      ))}
                    </View>

                    <View style={styles.cardDivider} />

                    <View style={styles.cardFooter}>
                      <View>
                        <Text style={styles.priceLabel}>STARTING PRICE</Text>
                        <Text style={styles.priceValue}>{invite.startingPrice || '₹15,000 onwards'}</Text>
                      </View>

                      <TouchableOpacity
                        style={styles.viewDetailsBtn}
                        onPress={() => setSelectedInvite(invite)}
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

      {/* FLOATING COMPARE BAR WHEN 2+ INVITATIONS ARE SELECTED/SAVED */}
      <AnimatePresence>
        {savedInvitesList.length >= 2 && (
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
                <Text style={styles.floatingCompareBadgeText}>{savedInvitesList.length}</Text>
              </View>
              <Scale className="w-4 h-4 text-white mr-1.5" />
              <Text style={styles.floatingCompareBtnText}>Compare ({savedInvitesList.length})</Text>
              <ChevronRight className="w-4 h-4 text-white ml-1" />
            </TouchableOpacity>
          </motion.div>
        )}
      </AnimatePresence>

      {/* VENDOR COMPARE MODAL */}
      <VendorCompareModal
        visible={showCompareModal}
        categoryTitle="Invitations"
        vendors={savedInvitesList}
        onClose={() => setShowCompareModal(false)}
        onSelectVendor={(v) => {
          const match = INVITATIONS_DATA.find((item) => item.id === v.id);
          if (match) setSelectedInvite(match);
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
  inviteName: {
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

