import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  Linking,
  Modal,
  TextInput,
} from 'react-native';
import {
  ArrowLeft,
  ChevronLeft,
  Star,
  MapPin,
  Heart,
  Phone,
  MessageCircle,
  Building2,
  Users,
  CheckCircle2,
  Calendar,
  Send,
  X,
  Share2,
  Bookmark,
  Camera,
  ChevronDown,
  Sparkles,
  Car,
  Home,
  Utensils,
  Award,
  Clock,
  ShieldCheck,
  ChevronRight,
  Instagram,
  Check,
  Zap,
  Eye,
  LayoutGrid,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { QuotationScreen } from './QuotationScreen';
import { saveOrUpdateQuote } from '../utils/quotesManager';
import { RequestQuoteModal } from './RequestQuoteModal';
import { WeddingInvoicePaymentModal } from './WeddingInvoicePaymentModal';
import { DraggablePhotoGalleryModal } from './DraggablePhotoGalleryModal';
import { LuxuryToast } from './LuxuryToast';
import {
  getWeddingBookingByVendorId,
  saveOrUpdateWeddingBooking,
} from '../utils/weddingPaymentsManager';

export interface VenueItem {
  id: string;
  name: string;
  category: string;
  city: string;
  location: string;
  rating: number;
  reviewsCount: number;
  startingPrice: string;
  priceValue: number;
  tier: 'Signature' | 'Popular' | 'Luxury' | 'Premium';
  capacity: string;
  capacityValue: number;
  image: string;
  description: string;
  experience: string;
  roomsAvailable: string;
  parkingSpace: string;
  cateringPolicy: string;
  amenities?: string[];
  features?: string[];
  portfolio?: string[];
  packages?: {
    title: string;
    price: string;
    description: string;
  }[];
  phone?: string;
  whatsapp?: string;
  instagram?: string;
  website?: string;
  isPremium?: boolean;
  priceLabel?: string;
  priceText?: string;
}

interface VenueDetailPageProps {
  onNavigateToQuotesTab?: () => void;
  venue: VenueItem;
  onBack: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  bookingSource?: 'entire_wedding' | 'individual';
  onNavigateToMyWeddingPayments?: () => void;
  onNavigateToProfileMyBookings?: () => void;
}

export const VenueDetailPage: React.FC<VenueDetailPageProps> = ({
  onNavigateToQuotesTab,
  venue,
  onBack,
  isBookmarked,
  onToggleBookmark,
  bookingSource = 'entire_wedding',
  onNavigateToMyWeddingPayments,
  onNavigateToProfileMyBookings,
}) => {
  const [activeMediaTab, setActiveMediaTab] = useState<'photos' | 'spaces' | 'packages' | 'amenities' | 'reviews'>('photos');
  const [isReadMore, setIsReadMore] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryInitialIndex, setGalleryInitialIndex] = useState(0);
  const [showQuoteModal, setShowQuoteModal] = useState<boolean>(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Live availability input states
  const [availDate, setAvailDate] = useState<string>('24/10/2026');
  const [availGuests, setAvailGuests] = useState<string>('500');

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  // Quote Flow Local States
  const [quoteStatus, setQuoteStatus] = useState<
    'initial' | 'requested' | 'response_ready' | 'confirmed' | 'partially_paid' | 'fully_paid' | 'rejected' | 'negotiating'
  >(() => {
    try {
      const savedQuotesJson = localStorage.getItem('tot_confirmed_quotes');
      if (savedQuotesJson) {
        const quotes = JSON.parse(savedQuotesJson);
        const match = quotes.find((q: any) => q.id === `quote-${venue.id}`);
        if (match) {
          if (match.paymentStatus === 'fully_paid') return 'fully_paid';
          if (match.paymentStatus === 'partially_paid') return 'partially_paid';
          if (match.status === 'confirmed') return 'confirmed';
        }
      }
    } catch (e) {
      console.error(e);
    }
    const existing = getWeddingBookingByVendorId(venue.id);
    if (existing) return existing.status;
    return 'initial';
  });

  useEffect(() => {
    const handleUpdate = () => {
      const existing = getWeddingBookingByVendorId(venue.id);
      if (existing) setQuoteStatus(existing.status);
    };
    window.addEventListener('tot_wedding_payments_updated', handleUpdate);
    return () => window.removeEventListener('tot_wedding_payments_updated', handleUpdate);
  }, [venue.id]);

  const updateQuoteStatus = (newStatus: 'initial' | 'requested' | 'response_ready' | 'confirmed' | 'partially_paid' | 'fully_paid' | 'rejected' | 'negotiating') => {
    setQuoteStatus(newStatus);
    const basePrice = venue.priceValue || parseInt((venue.startingPrice || '₹2,50,000').replace(/[^0-9]/g, ''), 10) || 250000;
    saveOrUpdateWeddingBooking({
      vendorId: venue.id,
      vendorName: venue.name,
      category: 'Venues',
      serviceType: 'Grand Mandapam & Reception Venue',
      image: heroImages[0] || venue.image,
      location: venue.location || venue.city || 'Tamil Nadu',
      totalAmount: basePrice,
      status: newStatus,
    });
  };

  const [showQuotationScreen, setShowQuotationScreen] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleQuoteRequestSent = () => {
    setShowQuoteModal(false);
    updateQuoteStatus('requested');
    const basePrice = venue.priceValue || 250000;
    
    saveOrUpdateQuote({
      id: `quote-${venue.id}`,
      vendorId: venue.id,
      vendorName: venue.name,
      category: 'Venues',
      status: 'requested',
      paymentStatus: 'pending',
      totalAmount: basePrice,
      advanceAmount: Math.round(basePrice * 0.3),
      remainingAmount: basePrice - Math.round(basePrice * 0.3),
      weddingDate: availDate || '24 Oct 2026',
      location: venue.location || venue.city,
      includedServices: [
        'Central AC Main Mandapam (12-24 Hours Access)',
        'Deluxe Dining Hall (800+ Seating Setup)',
        '2 Deluxe AC Bridal & Groom Changing Suites',
        '100% Uninterrupted Power Generator Backup',
        'Dedicated Valet Parking & Security Staff',
      ],
      image: heroImages[0] || venue.image,
    });
    
    showToast('Quote Request Sent! Venue reviewing availability...');

    // Simulate vendor response after 2.5 seconds
    setTimeout(() => {
      updateQuoteStatus('response_ready');
      saveOrUpdateQuote({
        id: `quote-${venue.id}`,
        status: 'response_ready',
      });
      showToast('Venue Quotation Received! Click "View Quote"');
    }, 2500);
  };

  // Helper to get venue initials for logo
  const getInitials = (name: string) => {
    const words = (name || '').replace(/mandapam|mahal|palace|resort|convention|hall|venue/gi, '').trim().split(' ');
    if (words.length >= 2 && words[0] && words[1]) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return (name || 'VEN').slice(0, 3).toUpperCase();
  };

  // Curated 24 luxury venue & banquet hall photos
  const heroImages = [
    venue.image || '/src/assets/images/beach_resort_decor.jpg',
    '/src/assets/images/guest_banquet_hall_stage_1786471284070.jpg',
    '/src/assets/images/wedding_banquet_hall_pic_1786470818992.jpg',
    '/src/assets/images/modern_canopy_decor.jpg',
    '/src/assets/images/pastel_reception_stage.jpg',
    'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1609151162377-794fa68b02f1?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1546804784-896d0dca3805?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1509927083803-4bd519298ac4?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1587271407850-8d438ca9fdf2?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1200&q=85',
  ];

  const phoneNum = venue.phone || '+91 91501 97966';
  const whatsappNum = venue.whatsapp || '919150197966';

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Venue link copied to clipboard!');
    } else {
      showToast('Sharing venue details...');
    }
  };

  const handleCall = () => {
    window.open(`tel:${phoneNum}`, '_self');
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Hi ${venue.name}, I am planning a wedding on ${availDate} for ${availGuests} guests. I saw your venue on Tale of Two. Please share availability and banquet package details.`
    );
    window.open(`https://wa.me/${whatsappNum}?text=${text}`, '_blank');
  };

  const packagesList = venue.packages && venue.packages.length > 0 ? venue.packages : [
    {
      title: 'Grand Muhurtham Package (12 Hours)',
      price: venue.startingPrice || '₹2,50,000 onwards',
      description: 'Includes Central AC main hall, 2 deluxe bridal suites, 500 chair banquet layout, dining hall setup, generator backup and valet parking.',
    },
    {
      title: 'Full Day Wedding & Reception Suite (24 Hours)',
      price: `₹${((venue.priceValue || 250000) * 1.6).toLocaleString('en-IN')} onwards`,
      description: 'Complete 24-hour venue access, full lawn & dining hall setup, 6 guest AC rooms, stage lighting setup, generator backup & valet management.',
    },
    {
      title: 'All-Inclusive Destination Resort Package',
      price: `₹${((venue.priceValue || 250000) * 2.8).toLocaleString('en-IN')} onwards`,
      description: 'Includes 20+ AC resort rooms, all 3 meals catering, pool party & mehendi lawn access, muhurtham hall, and full resort exclusivity.',
    },
  ];

  const amenitiesList = (venue.amenities && venue.amenities.length > 0)
    ? venue.amenities
    : [
        'Central Air Conditioning',
        '100% Generator Backup',
        'Ample Valet Parking',
        'Deluxe Bridal Changing Suites',
        'Dedicated Catering Dining Hall',
        'Wheelchair & Elevator Access',
        'Scenic Outdoor Lawn Area',
        'In-house Stage Lighting & AV Rig',
        'Fire Safety & 24/7 CCTV Security',
      ];

  const reviewsList = [
    {
      id: 'rev-1',
      name: 'Kavitha & Senthil',
      date: 'February 2026',
      rating: 5,
      comment: `We hosted our wedding reception at ${venue.name}. The hall decor, air conditioning, and spacious dining area made everything effortless for our 800+ guests! Highly recommended.`,
    },
    {
      id: 'rev-2',
      name: 'Rahul & Ananya',
      date: 'December 2025',
      rating: 5,
      comment: 'Top notch management and hospitality. The valet parking and bridal rooms were pristine. Tale of Two made the booking seamless.',
    },
  ];

  return (
    <View style={styles.container}>
      {/* Toast Notification */}
      <LuxuryToast message={toastMessage} />

      <ScrollView
        style={{ flex: 1, overflowY: 'auto' } as any}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 90 }}
      >
        {/* HERO SECTION WITH LUXURY 5-PHOTO MOSAIC (DESKTOP) & MOBILE COVER */}
        <div className="relative w-full bg-[#FAF7F2] border-b border-[#E8DEC2]/40">
          {/* Top Overlaid Action Bar - Pinned to screen top-left & top-right */}
          <div className="absolute top-4 left-4 right-4 z-50 flex items-center justify-between pointer-events-auto">
            <TouchableOpacity style={styles.overlayCircleBtnDark} onPress={onBack} activeOpacity={0.8}>
              <ChevronLeft className="w-6 h-6 text-white" />
            </TouchableOpacity>

            <View style={styles.topOverlayRightGroup}>
              <TouchableOpacity
                style={styles.overlayCircleBtnLight}
                onPress={() => onToggleBookmark(venue.id)}
                activeOpacity={0.8}
              >
                <Heart
                  className={`w-5 h-5 ${
                    isBookmarked ? 'text-[#8B1E2F] fill-[#8B1E2F]' : 'text-[#2A2425]'
                  }`}
                />
              </TouchableOpacity>

              <TouchableOpacity style={styles.overlayCircleBtnLight} onPress={handleShare} activeOpacity={0.8}>
                <Share2 className="w-5 h-5 text-[#2A2425]" />
              </TouchableOpacity>
            </View>
          </div>

          {/* DESKTOP 5-PHOTO LUXURY MOSAIC GRID */}
          <div className="hidden md:block w-full max-w-6xl mx-auto pt-16 pb-4 px-4 sm:px-6">
            <div className="grid grid-cols-4 grid-rows-2 gap-2.5 h-[420px] lg:h-[480px] rounded-2xl overflow-hidden shadow-sm relative">
              {/* Main Featured Large Photo (Left 50%) */}
              <div
                className="col-span-2 row-span-2 relative overflow-hidden cursor-pointer group bg-stone-100"
                onClick={() => {
                  setGalleryInitialIndex(0);
                  setIsGalleryOpen(true);
                }}
              >
                <img
                  src={heroImages[0]}
                  alt={venue.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Eye className="w-7 h-7 text-white drop-shadow-lg" />
                </div>
              </div>

              {/* Photo 2 (Top Left preview) */}
              <div
                className="col-span-1 row-span-1 relative overflow-hidden cursor-pointer group bg-stone-100"
                onClick={() => {
                  setGalleryInitialIndex(1);
                  setIsGalleryOpen(true);
                }}
              >
                <img
                  src={heroImages[1] || heroImages[0]}
                  alt={`${venue.name} 2`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Eye className="w-7 h-7 text-white drop-shadow-lg" />
                </div>
              </div>

              {/* Photo 3 (Top Right preview) */}
              <div
                className="col-span-1 row-span-1 relative overflow-hidden cursor-pointer group bg-stone-100"
                onClick={() => {
                  setGalleryInitialIndex(2);
                  setIsGalleryOpen(true);
                }}
              >
                <img
                  src={heroImages[2] || heroImages[0]}
                  alt={`${venue.name} 3`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Eye className="w-7 h-7 text-white drop-shadow-lg" />
                </div>
              </div>

              {/* Photo 4 (Bottom Left preview) */}
              <div
                className="col-span-1 row-span-1 relative overflow-hidden cursor-pointer group bg-stone-100"
                onClick={() => {
                  setGalleryInitialIndex(3);
                  setIsGalleryOpen(true);
                }}
              >
                <img
                  src={heroImages[3] || heroImages[0]}
                  alt={`${venue.name} 4`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Eye className="w-7 h-7 text-white drop-shadow-lg" />
                </div>
              </div>

              {/* Photo 5 (Bottom Right preview with "View All" Button) */}
              <div
                className="col-span-1 row-span-1 relative overflow-hidden cursor-pointer group bg-stone-100"
                onClick={() => {
                  setGalleryInitialIndex(4);
                  setIsGalleryOpen(true);
                }}
              >
                <img
                  src={heroImages[4] || heroImages[0]}
                  alt={`${venue.name} 5`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Eye className="w-6 h-6 text-white drop-shadow-lg" />
                </div>

                {/* Floating "Show all photos" Pill Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setGalleryInitialIndex(0);
                    setIsGalleryOpen(true);
                  }}
                  className="absolute bottom-3 right-3 z-10 bg-white/90 hover:bg-white text-[#2A2425] text-xs font-bold px-3 py-1.5 rounded-lg shadow-md flex items-center gap-1.5 transition-all border border-stone-200"
                >
                  <LayoutGrid className="w-3.5 h-3.5 text-[#581420]" />
                  <span>Show all {heroImages.length} photos</span>
                </button>
              </div>
            </div>
          </div>

          {/* MOBILE HERO VIEW (< md screens) */}
          <div className="block md:hidden relative w-full overflow-hidden flex flex-col items-center justify-center pt-14 pb-2 px-3">
            <div
              className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-sm cursor-pointer"
              onClick={() => {
                setGalleryInitialIndex(0);
                setIsGalleryOpen(true);
              }}
            >
              <img
                src={heroImages[0]}
                alt={venue.name}
                className="w-full h-full object-cover"
              />
              <button className="absolute bottom-3 right-3 bg-black/60 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 backdrop-blur-sm">
                <Camera className="w-3 h-3 text-white" />
                <span>1 / {heroImages.length}</span>
              </button>
            </div>
          </div>
        </div>

        {/* OVERLAPPING MAIN VENUE INFO CARD */}
        <View style={styles.mainContentCard}>
          {/* Logo Badge + Header Row */}
          <View style={styles.venueHeaderRow}>
            <View style={styles.logoBox}>
              <Building2 className="w-6 h-6 text-[#E5A93C] mb-0.5" />
              <Text style={styles.logoInitials}>{getInitials(venue.name)}</Text>
            </View>

            <View style={styles.headerInfoCol}>
              <Text style={styles.venueTitle}>{venue.name}</Text>

              {/* TOT CERTIFIED Gold Tag */}
              <View style={styles.certifiedBadge}>
                <ShieldCheck className="w-3.5 h-3.5 text-[#B45309] mr-1" />
                <Text style={styles.certifiedBadgeText}>TOT VERIFIED VENUE</Text>
              </View>

              <Text style={styles.subtitleText}>
                {venue.category} • <Text style={styles.tierHighlight}>{venue.tier || 'Premium'}</Text> • {venue.location || venue.city}, Tamil Nadu
              </Text>

              {/* Rating Row */}
              <View style={styles.ratingRow}>
                <Star className="w-4 h-4 text-[#E5A93C] fill-[#E5A93C] mr-1" />
                <Text style={styles.ratingBold}>{venue.rating}</Text>
                <Text style={styles.reviewsCountText}> ({venue.reviewsCount} Verified Reviews)</Text>
              </View>
            </View>
          </View>

          {/* 4 KEY METRICS STATS BAR */}
          <View style={styles.metricsBar}>
            <View style={styles.metricItem}>
              <Users className="w-4 h-4 text-[#8B1E2F] mb-1" />
              <Text style={styles.metricVal}>{venue.capacity || '100-500'}</Text>
              <Text style={styles.metricLbl}>Guests</Text>
            </View>
            <View style={styles.metricDivider} />

            <View style={styles.metricItem}>
              <Home className="w-4 h-4 text-[#8B1E2F] mb-1" />
              <Text style={styles.metricVal}>{venue.roomsAvailable || '20+ AC'}</Text>
              <Text style={styles.metricLbl}>Rooms</Text>
            </View>
            <View style={styles.metricDivider} />

            <View style={styles.metricItem}>
              <Car className="w-4 h-4 text-[#8B1E2F] mb-1" />
              <Text style={styles.metricVal}>{venue.parkingSpace ? 'Valet' : 'Ample'}</Text>
              <Text style={styles.metricLbl}>Parking</Text>
            </View>
            <View style={styles.metricDivider} />

            <View style={styles.metricItem}>
              <Clock className="w-4 h-4 text-[#8B1E2F] mb-1" />
              <Text style={styles.metricVal}>{venue.experience || '10+ Years'}</Text>
              <Text style={styles.metricLbl}>Experience</Text>
            </View>
          </View>

          {/* CHECK AVAILABILITY & DATE PICKER */}
          <View style={styles.availabilityCard}>
            <View style={styles.availHeaderRow}>
              <Calendar className="w-4 h-4 text-[#581420] mr-1.5" />
              <Text style={styles.availTitle}>Check Live Availability & Get Quote</Text>
            </View>
            <Text style={styles.availSubText}>Enter your wedding date & expected guests count.</Text>

            <View style={styles.availInputRow}>
              <View style={styles.availInputGroup}>
                <Calendar className="w-3.5 h-3.5 text-stone-400 mr-1.5" />
                <TextInput
                  style={styles.availTextInput}
                  value={availDate}
                  onChangeText={setAvailDate}
                  placeholder="DD/MM/YYYY"
                />
              </View>

              <View style={styles.availInputGroup}>
                <Users className="w-3.5 h-3.5 text-stone-400 mr-1.5" />
                <TextInput
                  style={styles.availTextInput}
                  value={availGuests}
                  onChangeText={setAvailGuests}
                  placeholder="Guests"
                />
              </View>

              <TouchableOpacity
                style={styles.availQuoteBtn}
                onPress={() => setShowQuoteModal(true)}
                activeOpacity={0.85}
              >
                <Text style={styles.availQuoteBtnText}>Check Dates</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* TAB BAR NAVIGATION */}
          <View style={styles.tabBar}>
            <TouchableOpacity
              style={[styles.tabItem, activeMediaTab === 'photos' && styles.tabItemActive]}
              onPress={() => setActiveMediaTab('photos')}
              activeOpacity={0.8}
            >
              <Text style={[styles.tabText, activeMediaTab === 'photos' && styles.tabTextActive]}>
                Photos ({heroImages.length})
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tabItem, activeMediaTab === 'spaces' && styles.tabItemActive]}
              onPress={() => setActiveMediaTab('spaces')}
              activeOpacity={0.8}
            >
              <Text style={[styles.tabText, activeMediaTab === 'spaces' && styles.tabTextActive]}>
                Halls & Spaces
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tabItem, activeMediaTab === 'packages' && styles.tabItemActive]}
              onPress={() => setActiveMediaTab('packages')}
              activeOpacity={0.8}
            >
              <Text style={[styles.tabText, activeMediaTab === 'packages' && styles.tabTextActive]}>
                Packages
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tabItem, activeMediaTab === 'amenities' && styles.tabItemActive]}
              onPress={() => setActiveMediaTab('amenities')}
              activeOpacity={0.8}
            >
              <Text style={[styles.tabText, activeMediaTab === 'amenities' && styles.tabTextActive]}>
                Amenities
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tabItem, activeMediaTab === 'reviews' && styles.tabItemActive]}
              onPress={() => setActiveMediaTab('reviews')}
              activeOpacity={0.8}
            >
              <Text style={[styles.tabText, activeMediaTab === 'reviews' && styles.tabTextActive]}>
                Reviews ({venue.reviewsCount})
              </Text>
            </TouchableOpacity>
          </View>

          {/* TAB CONTENT: PHOTOS */}
          {activeMediaTab === 'photos' && (
            <View style={styles.galleryGridContainer}>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 w-full">
                {heroImages.map((imgUrl, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative aspect-square rounded-xl overflow-hidden bg-stone-100 cursor-pointer shadow-sm group"
                    onClick={() => {
                      setGalleryInitialIndex(idx);
                      setIsGalleryOpen(true);
                    }}
                  >
                    <img
                      src={imgUrl}
                      alt={`${venue.name} Venue ${idx + 1}`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Eye className="w-6 h-6 text-white drop-shadow-md" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </View>
          )}

          {/* TAB CONTENT: SPACES */}
          {activeMediaTab === 'spaces' && (
            <View style={styles.spacesContainer}>
              <View style={styles.spaceCard}>
                <Image source={{ uri: heroImages[1] || heroImages[0] }} style={styles.spaceImage} resizeMode="cover" />
                <View style={styles.spaceBody}>
                  <Text style={styles.spaceTitle}>Grand Regalia Main Mandapam (Indoor AC)</Text>
                  <View style={styles.spaceCapacityRow}>
                    <Users className="w-3.5 h-3.5 text-[#581420] mr-1" />
                    <Text style={styles.spaceCapacityText}>500 Seating • 1,000 Floating</Text>
                  </View>
                  <Text style={styles.spaceDesc}>Central Air Conditioning, acoustics sound system, elevated royal stage.</Text>
                </View>
              </View>

              <View style={styles.spaceCard}>
                <Image source={{ uri: heroImages[3] || heroImages[0] }} style={styles.spaceImage} resizeMode="cover" />
                <View style={styles.spaceBody}>
                  <Text style={styles.spaceTitle}>Vue Lawn & Open Dining Courtyard</Text>
                  <View style={styles.spaceCapacityRow}>
                    <Users className="w-3.5 h-3.5 text-[#581420] mr-1" />
                    <Text style={styles.spaceCapacityText}>600 Seating • 1,200 Floating</Text>
                  </View>
                  <Text style={styles.spaceDesc}>Scenic lush greenery, canopy lighting setup, ideal for Sangeet & Reception feasts.</Text>
                </View>
              </View>
            </View>
          )}

          {/* TAB CONTENT: PACKAGES */}
          {activeMediaTab === 'packages' && (
            <View style={styles.packagesContainer}>
              {packagesList.map((pkg, idx) => (
                <View key={idx} style={[styles.packageCard, idx === 0 && styles.packageCardPopular]}>
                  {idx === 0 && (
                    <View style={styles.popularBadge}>
                      <Sparkles className="w-3 h-3 text-white mr-1" />
                      <Text style={styles.popularBadgeText}>POPULAR CHOICE</Text>
                    </View>
                  )}
                  <Text style={styles.pkgTitle}>{pkg.title}</Text>
                  <Text style={styles.pkgPrice}>{pkg.price}</Text>
                  <Text style={styles.pkgDesc}>{pkg.description}</Text>
                  <TouchableOpacity
                    style={styles.packageSelectBtn}
                    onPress={() => setShowQuoteModal(true)}
                    activeOpacity={0.85}
                  >
                    <Text style={styles.packageSelectBtnText}>Select & Get Quote</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}

          {/* TAB CONTENT: AMENITIES */}
          {activeMediaTab === 'amenities' && (
            <View style={styles.amenitiesContainer}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full">
                {amenitiesList.map((amenity, idx) => (
                  <View key={idx} style={styles.amenityItem}>
                    <CheckCircle2 className="w-4 h-4 text-[#15803D] mr-2 flex-shrink-0" />
                    <Text style={styles.amenityText}>{amenity}</Text>
                  </View>
                ))}
              </div>
            </View>
          )}

          {/* TAB CONTENT: REVIEWS */}
          {activeMediaTab === 'reviews' && (
            <View style={styles.reviewsContainer}>
              <View style={styles.ratingOverviewBox}>
                <Text style={styles.ratingBigScore}>{venue.rating}</Text>
                <View style={styles.starsRow}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-[#E5A93C] fill-[#E5A93C] mr-0.5" />
                  ))}
                </View>
                <Text style={styles.totalReviewsLabel}>Based on {venue.reviewsCount} verified reviews</Text>
              </View>

              {reviewsList.map((rev) => (
                <View key={rev.id} style={styles.reviewItemCard}>
                  <View style={styles.reviewHeaderRow}>
                    <Text style={styles.reviewerName}>{rev.name}</Text>
                    <Text style={styles.reviewDate}>{rev.date}</Text>
                  </View>
                  <View style={styles.starsRow}>
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-[#E5A93C] fill-[#E5A93C] mr-0.5" />
                    ))}
                  </View>
                  <Text style={styles.reviewComment}>{rev.comment}</Text>
                </View>
              ))}
            </View>
          )}

          {/* ABOUT VENUE DESCRIPTION */}
          <View style={styles.aboutSection}>
            <Text style={styles.aboutHeading}>About {venue.name}</Text>
            <Text style={styles.aboutText}>
              {isReadMore
                ? venue.description ||
                  `A luxurious and premium wedding destination in ${venue.city}, crafted to host memorable celebrations with world-class hospitality, central air conditioning, and top-tier guest amenities.`
                : (venue.description ||
                    `A luxurious and premium wedding destination in ${venue.city}, crafted to host memorable celebrations with world-class hospitality, central air conditioning, and top-tier guest amenities.`).slice(0, 160) + '...'}
            </Text>
            <TouchableOpacity onPress={() => setIsReadMore(!isReadMore)} activeOpacity={0.7}>
              <Text style={styles.readMoreBtnText}>{isReadMore ? 'Read Less' : 'Read More'}</Text>
            </TouchableOpacity>

            <View style={styles.cateringPolicyBox}>
              <Utensils className="w-4 h-4 text-[#581420] mr-2 flex-shrink-0" />
              <Text style={styles.cateringPolicyText}>
                <Text style={{ fontWeight: '700' }}>Catering Policy: </Text>
                {venue.cateringPolicy || 'In-House Catering & External Caterers Allowed'}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* FIXED BOTTOM ACTION BAR */}
      <View style={styles.bottomBar}>
        <div className="w-full max-w-4xl mx-auto flex items-center justify-between gap-3 px-3 sm:px-6">
          <View style={styles.bottomPriceCol}>
            <Text style={styles.bottomPriceLabel}>Starting From</Text>
            <Text style={styles.bottomPriceValue}>{venue.startingPrice}</Text>
          </View>

          <View style={styles.bottomActionsRow}>
            <TouchableOpacity style={styles.circleCallBtn} onPress={handleCall} activeOpacity={0.85}>
              <Phone className="w-4 h-4 text-[#2A2425]" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.circleWhatsAppBtn}
              onPress={handleWhatsApp}
              activeOpacity={0.85}
            >
              <MessageCircle className="w-4 h-4 text-[#15803D]" />
            </TouchableOpacity>

            {venue.instagram && (
              <TouchableOpacity
                style={styles.circleInstagramBtn}
                onPress={() => window.open(`https://instagram.com/${venue.instagram?.replace('@', '')}`, '_blank')}
                activeOpacity={0.85}
              >
                <Instagram className="w-4 h-4 text-[#C13584]" />
              </TouchableOpacity>
            )}

            {quoteStatus === 'initial' && (
              <TouchableOpacity
                style={styles.primaryQuoteBtn}
                onPress={() => setShowQuoteModal(true)}
                activeOpacity={0.85}
              >
                <Send className="w-4 h-4 text-white mr-1.5" />
                <Text style={styles.primaryQuoteBtnText}>Request Quote</Text>
              </TouchableOpacity>
            )}

            {quoteStatus === 'requested' && (
              <TouchableOpacity style={[styles.primaryQuoteBtn, { backgroundColor: '#F59E0B' }]} disabled activeOpacity={1}>
                <Text style={styles.primaryQuoteBtnText}>Pending Response</Text>
              </TouchableOpacity>
            )}

            {quoteStatus === 'negotiating' && (
              <TouchableOpacity style={[styles.primaryQuoteBtn, { backgroundColor: '#F59E0B' }]} disabled activeOpacity={1}>
                <Text style={styles.primaryQuoteBtnText}>Negotiating...</Text>
              </TouchableOpacity>
            )}

            {quoteStatus === 'rejected' && (
              <TouchableOpacity style={[styles.primaryQuoteBtn, { backgroundColor: '#DC2626' }]} onPress={() => updateQuoteStatus('initial')} activeOpacity={0.85}>
                <Text style={styles.primaryQuoteBtnText}>Rejected (Reset)</Text>
              </TouchableOpacity>
            )}

            {quoteStatus === 'response_ready' && (
              <TouchableOpacity style={[styles.primaryQuoteBtn, { backgroundColor: '#10B981' }]} onPress={() => setShowQuotationScreen(true)} activeOpacity={0.85}>
                <Text style={styles.primaryQuoteBtnText}>View Quote</Text>
              </TouchableOpacity>
            )}

            {(quoteStatus === 'confirmed' || quoteStatus === 'partially_paid' || quoteStatus === 'fully_paid') && (
              <TouchableOpacity
                style={[styles.primaryQuoteBtn, { backgroundColor: '#15803D' }]}
                onPress={() => setShowInvoiceModal(true)}
                activeOpacity={0.85}
              >
                <Text style={styles.primaryQuoteBtnText}>
                  {quoteStatus === 'fully_paid'
                    ? 'Fully Paid (Invoice)'
                    : quoteStatus === 'partially_paid'
                    ? 'Partially Paid'
                    : 'View Invoice'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </div>
      </View>

      {/* DRAGGABLE / SWIPEABLE PHOTO GALLERY MODAL */}
      <DraggablePhotoGalleryModal
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        photos={heroImages}
        initialIndex={galleryInitialIndex}
        title={venue.name}
        category="Wedding Venue"
      />

      {/* REQUEST QUOTE MODAL */}
      <RequestQuoteModal
        visible={showQuoteModal}
        vendorId={venue.id}
        vendorName={venue.name}
        startingPrice={venue.startingPrice}
        location={venue.location || venue.city}
        category="venue"
        onClose={() => setShowQuoteModal(false)}
        onQuoteSent={handleQuoteRequestSent}
      />

      {/* QUOTATION SCREEN */}
      <QuotationScreen
        visible={showQuotationScreen}
        onClose={() => setShowQuotationScreen(false)}
        quoteStatus={quoteStatus}
        setQuoteStatus={updateQuoteStatus}
        vendorId={venue.id}
        vendorName={venue.name}
        vendorImage={heroImages[0] || venue.image}
        vendorLocation={venue.location || venue.city}
        startingPrice={venue.startingPrice}
        category="Venues"
        packageName="Grand Muhurtham & Reception Venue Rental Package"
        includedServices={[
          'Central AC Main Mandapam (12-24 Hours Access)',
          'Deluxe Dining Hall (800+ Seating Setup)',
          '2 Deluxe AC Bridal & Groom Changing Suites',
          '100% Uninterrupted Power Generator Backup',
          'Dedicated Valet Parking & Security Staff',
          'Basic Stage Lighting & Audio Sound Rig',
        ]}
        onNavigateToQuotesTab={() => {
          setShowQuotationScreen(false);
          setShowInvoiceModal(true);
        }}
        onBack={onBack}
        onShowToast={(msg) => showToast(msg)}
      />

      {/* INVOICE & MILESTONES PAYMENT MODAL */}
      <WeddingInvoicePaymentModal
        visible={showInvoiceModal}
        onClose={() => setShowInvoiceModal(false)}
        vendorId={venue.id}
        vendorName={venue.name}
        vendorImage={heroImages[0] || venue.image}
        vendorLocation={venue.location || venue.city}
        category="Venues"
        startingPrice={venue.startingPrice || '₹2,50,000'}
        bookingSource={bookingSource}
        onNavigateToMyWeddingPayments={() => {
          setShowInvoiceModal(false);
          if (onNavigateToMyWeddingPayments) {
            onNavigateToMyWeddingPayments();
          } else {
            window.dispatchEvent(
              new CustomEvent('tot_switch_to_my_wedding_payments', { detail: { vendorId: venue.id } })
            );
          }
        }}
        onNavigateToProfileMyBookings={() => {
          setShowInvoiceModal(false);
          if (onNavigateToProfileMyBookings) {
            onNavigateToProfileMyBookings();
          } else {
            window.dispatchEvent(
              new CustomEvent('tot_switch_to_profile_my_bookings', { detail: { vendorId: venue.id } })
            );
          }
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
  toastContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    zIndex: 9999,
    backgroundColor: '#2A2425',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  toastText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  overlayCircleBtnDark: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topOverlayRightGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  overlayCircleBtnLight: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContentCard: {
    marginTop: 0,
    backgroundColor: '#FAF7F2',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    width: '100%',
    maxWidth: 800,
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  venueHeaderRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  logoBox: {
    width: 68,
    height: 68,
    borderRadius: 14,
    backgroundColor: '#581420',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    borderWidth: 1.5,
    borderColor: '#E5A93C',
  },
  logoInitials: {
    color: '#FDE68A',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  headerInfoCol: {
    flex: 1,
  },
  venueTitle: {
    fontFamily: 'Playfair Display, Georgia, serif',
    fontSize: 19,
    fontWeight: '700',
    color: '#2A2425',
    marginBottom: 4,
  },
  certifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    borderWidth: 1,
    borderColor: '#FDE68A',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  certifiedBadgeText: {
    color: '#B45309',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  subtitleText: {
    fontSize: 12,
    color: '#6B5A5C',
    marginBottom: 4,
  },
  tierHighlight: {
    fontWeight: '700',
    color: '#581420',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingBold: {
    fontSize: 13,
    fontWeight: '700',
    color: '#2A2425',
  },
  reviewsCountText: {
    fontSize: 12,
    color: '#8C7A7C',
  },
  metricsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F0E8D8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
  },
  metricItem: {
    alignItems: 'center',
    flex: 1,
  },
  metricVal: {
    fontSize: 13,
    fontWeight: '700',
    color: '#2A2425',
  },
  metricLbl: {
    fontSize: 10,
    color: '#8C7A7C',
    marginTop: 2,
  },
  metricDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#F0E8D8',
  },
  availabilityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F0E8D8',
    marginBottom: 16,
  },
  availHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  availTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2A2425',
  },
  availSubText: {
    fontSize: 11.5,
    color: '#8C7A7C',
    marginBottom: 12,
  },
  availInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  availInputGroup: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FDFBF7',
    borderWidth: 1,
    borderColor: '#E8DEC8',
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 40,
  },
  availTextInput: {
    flex: 1,
    fontSize: 12,
    color: '#2A2425',
  },
  availQuoteBtn: {
    backgroundColor: '#581420',
    paddingHorizontal: 14,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  availQuoteBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#F0EAE1',
    borderRadius: 12,
    padding: 3,
    marginBottom: 16,
  },
  tabItem: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 9,
  },
  tabItemActive: {
    backgroundColor: '#581420',
  },
  tabText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#6B5A5C',
  },
  tabTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  galleryGridContainer: {
    marginBottom: 24,
  },
  spacesContainer: {
    gap: 12,
    marginBottom: 24,
  },
  spaceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F0E8D8',
  },
  spaceImage: {
    width: '100%',
    height: 180,
  },
  spaceBody: {
    padding: 14,
  },
  spaceTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2A2425',
    marginBottom: 4,
  },
  spaceCapacityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  spaceCapacityText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#581420',
  },
  spaceDesc: {
    fontSize: 12,
    color: '#6B5A5C',
    lineHeight: 18,
  },
  packagesContainer: {
    gap: 12,
    marginBottom: 24,
  },
  packageCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F0E8D8',
    position: 'relative',
  },
  packageCardPopular: {
    borderColor: '#581420',
    borderWidth: 1.5,
  },
  popularBadge: {
    position: 'absolute',
    top: -10,
    right: 14,
    backgroundColor: '#581420',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  popularBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  pkgTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2A2425',
    marginBottom: 4,
  },
  pkgPrice: {
    fontSize: 14,
    fontWeight: '800',
    color: '#581420',
    marginBottom: 6,
  },
  pkgDesc: {
    fontSize: 12,
    color: '#6B5A5C',
    lineHeight: 18,
    marginBottom: 12,
  },
  packageSelectBtn: {
    backgroundColor: '#581420',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  packageSelectBtnText: {
    color: '#FFFFFF',
    fontSize: 11.5,
    fontWeight: '700',
  },
  amenitiesContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F0E8D8',
    marginBottom: 24,
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  amenityText: {
    fontSize: 12.5,
    color: '#2A2425',
  },
  reviewsContainer: {
    gap: 12,
    marginBottom: 24,
  },
  ratingOverviewBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F0E8D8',
    marginBottom: 8,
  },
  ratingBigScore: {
    fontSize: 32,
    fontWeight: '800',
    color: '#2A2425',
  },
  totalReviewsLabel: {
    fontSize: 11,
    color: '#8C7A7C',
    marginTop: 4,
  },
  reviewItemCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#F0E8D8',
  },
  reviewHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  reviewerName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#2A2425',
  },
  reviewDate: {
    fontSize: 11,
    color: '#8C7A7C',
  },
  starsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  reviewComment: {
    fontSize: 12,
    color: '#4A3E3F',
    lineHeight: 18,
  },
  aboutSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F0E8D8',
    marginBottom: 24,
  },
  aboutHeading: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2A2425',
    marginBottom: 8,
  },
  aboutText: {
    fontSize: 12,
    color: '#6B5A5C',
    lineHeight: 19,
    marginBottom: 6,
  },
  readMoreBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#581420',
  },
  cateringPolicyBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF5EE',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#EFE7DA',
  },
  cateringPolicyText: {
    fontSize: 12,
    color: '#581420',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderTopWidth: 1,
    borderTopColor: '#E8DFD5',
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 50,
  },
  bottomPriceCol: {
    justifyContent: 'center',
  },
  bottomPriceLabel: {
    fontSize: 10,
    color: '#8C7A7C',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  bottomPriceValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#581420',
  },
  bottomActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  circleCallBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5EFE6',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E8DEC2',
  },
  circleWhatsAppBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#C8E6C9',
  },
  circleInstagramBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FCE4EC',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F8BBD0',
  },
  primaryQuoteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#581420',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    shadowColor: '#581420',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  primaryQuoteBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
});
