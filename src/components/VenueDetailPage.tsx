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
} from 'react-native-web';
import {
  ArrowLeft,
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
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { QuotationScreen } from './QuotationScreen';
import { saveOrUpdateQuote } from '../utils/quotesManager';
import { RequestQuoteModal } from './RequestQuoteModal';
import { WeddingInvoicePaymentModal } from './WeddingInvoicePaymentModal';
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

const Card = ({ children, style }: { children: React.ReactNode; style?: any }) => (
  <View style={[styles.card, style]}>{children}</View>
);

const Divider = () => <View style={styles.divider} />;

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
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [activePhotoModal, setActivePhotoModal] = useState<string | null>(null);
  const [showQuoteModal, setShowQuoteModal] = useState<boolean>(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState<boolean>(false);
  const [showQuotationScreen, setShowQuotationScreen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Check Availability Form State
  const [availDate, setAvailDate] = useState<string>('24/10/2026');
  const [availGuests, setAvailGuests] = useState<string>('500');

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  // Quote Flow Local States synced with localStorage
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
      const statusesJson = localStorage.getItem('tot_quote_statuses');
      if (statusesJson) {
        const statuses = JSON.parse(statusesJson);
        if (statuses[venue.id]) {
          return statuses[venue.id];
        }
      }
    } catch (e) {
      console.warn(e);
    }
    return 'initial';
  });

  const updateQuoteStatus = (newStatus: typeof quoteStatus) => {
    setQuoteStatus(newStatus);
    try {
      const statusesJson = localStorage.getItem('tot_quote_statuses') || '{}';
      const statuses = JSON.parse(statusesJson);
      statuses[venue.id] = newStatus;
      localStorage.setItem('tot_quote_statuses', JSON.stringify(statuses));
    } catch (e) {
      console.warn(e);
    }
  };

  const handleQuoteRequestSent = () => {
    setShowQuoteModal(false);
    updateQuoteStatus('requested');
    const basePrice = venue.priceValue || parseInt((venue.startingPrice || '₹2,50,000').replace(/[^0-9]/g, ''), 10) || 250000;
    
    saveOrUpdateQuote({
      id: `quote-${venue.id}`,
      vendorId: venue.id,
      vendorName: venue.name,
      category: 'Venues',
      packageName: 'Grand Muhurtham & Reception Venue Rental Package',
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
        'Basic Stage Lighting & Audio Sound Rig',
      ],
      image: heroImages[0] || venue.image,
    });
    
    showToast('Quote Request Sent! Added to My Quotes');

    // Simulate vendor response after 3 seconds
    setTimeout(() => {
      updateQuoteStatus('response_ready');
      saveOrUpdateQuote({
        id: `quote-${venue.id}`,
        status: 'response_ready',
      });
      showToast('Venue Quotation Received! Click "View Quote"');
    }, 3000);
  };

  const heroImages = (venue.portfolio && venue.portfolio.length > 0)
    ? venue.portfolio
    : [
        venue.image || '/src/assets/images/beach_resort_decor.jpg',
        '/src/assets/images/guest_banquet_hall_stage_1786471284070.jpg',
        '/src/assets/images/wedding_banquet_hall_pic_1786470818992.jpg',
        '/src/assets/images/modern_canopy_decor.jpg',
        '/src/assets/images/pastel_reception_stage.jpg',
      ];

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % heroImages.length);
  };

  const phoneNum = venue.phone || '+91 98401 23456';
  const whatsappNum = venue.whatsapp || '919840123456';

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: venue.name,
        text: `Check out ${venue.name} in ${venue.city} on Tale of Two!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      showToast('Share link copied to clipboard!');
    }
  };

  const handleCall = () => {
    Linking.openURL(`tel:${phoneNum}`).catch(() => {
      showToast(`Call ${phoneNum}`);
    });
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Hi ${venue.name}, I am planning a wedding on ${availDate} for ${availGuests} guests. I saw your venue on Tale of Two. Please share availability and banquet package details.`
    );
    Linking.openURL(`https://wa.me/${whatsappNum}?text=${text}`).catch(() => {
      showToast('Opening WhatsApp...');
    });
  };

  const handleInstantBook = () => {
    const basePrice = venue.priceValue || parseInt((venue.startingPrice || '₹2,50,000').replace(/[^0-9]/g, ''), 10) || 250000;
    
    saveOrUpdateWeddingBooking({
      id: `booking-${venue.id}-${Date.now()}`,
      vendorId: venue.id,
      vendorName: venue.name,
      category: 'Venues',
      serviceType: 'Venue Rental',
      image: heroImages[0] || venue.image || '',
      location: venue.location || venue.city || '',
      weddingDate: availDate || '24 Oct 2026',
      packageName: 'Grand Destination Venue Package',
      totalAmount: basePrice,
      paidAmount: 0,
      remainingAmount: basePrice,
      status: 'confirmed',
      invoiceNo: `INV-${Math.floor(1000 + Math.random() * 9000)}`,
      invoiceDate: new Date().toLocaleDateString('en-GB'),
      milestones: [
        {
          id: 'm-1',
          milestoneNumber: 1,
          title: '30% Advance Booking Fee',
          percentage: 30,
          amount: Math.round(basePrice * 0.3),
          status: 'pending',
        },
        {
          id: 'm-2',
          milestoneNumber: 2,
          title: '70% Final Settlement',
          percentage: 70,
          amount: Math.round(basePrice * 0.7),
          status: 'locked',
        },
      ],
      includedServices: [
        'Central AC Mandapam Hall Access',
        'Dining Hall Setup for 800+ Guests',
        'Deluxe Bridal Changing Suites',
        'Generator Backup & Valet Parking',
      ],
      lastUpdated: new Date().toISOString(),
    });

    window.dispatchEvent(new Event('tot_wedding_payments_updated'));
    setShowInvoiceModal(true);
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
    <View style={styles.pageContainer}>
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-4 left-1/2 -translate-x-1/2 z-[300] bg-[#2A2425] text-white px-4 py-2.5 rounded-full text-xs font-semibold shadow-xl flex items-center gap-2 pointer-events-none"
          >
            <Sparkles className="w-4 h-4 text-[#C28E38]" />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. TOP HEADER */}
      <View style={styles.topHeader}>
        <TouchableOpacity onPress={onBack} style={styles.iconBtn} activeOpacity={0.7}>
          <ArrowLeft className="w-5 h-5 text-[#3B2F2F]" />
        </TouchableOpacity>
        
        <View style={{ flex: 1, paddingHorizontal: 8 }}>
          <Text style={styles.headerTitle} numberOfLines={1}>
            {venue.name}
          </Text>
          <Text style={styles.headerSubtitle} numberOfLines={1}>
            {venue.category} • {venue.city}
          </Text>
        </View>
        
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconBtn} onPress={handleShare} activeOpacity={0.7}>
            <Share2 className="w-4 h-4 text-[#3B2F2F]" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => onToggleBookmark(venue.id)}
            activeOpacity={0.7}
          >
            <Heart
              className={`w-4 h-4 ${
                isBookmarked ? 'text-[#8B1E2F] fill-[#8B1E2F]' : 'text-[#3B2F2F]'
              }`}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.bookNowBtn} onPress={handleInstantBook} activeOpacity={0.85}>
            <Text style={styles.bookNowBtnText}>Book Now</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollArea} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 110 }}>
        
        {/* 2. HERO IMAGE GALLERY */}
        <TouchableOpacity style={styles.heroContainer} activeOpacity={0.95} onPress={handleNextImage}>
          <Image source={{ uri: heroImages[activeImageIndex] }} style={styles.heroImage} resizeMode="cover" />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 100%)' }} />
          
          <View style={styles.bookingBadge}>
            <Zap className="w-3 h-3 text-amber-300 mr-1" />
            <Text style={styles.bookingBadgeText}>Trending Venue in {venue.city}</Text>
          </View>
          
          <TouchableOpacity
            style={styles.imageCounter}
            onPress={(e) => {
              e.stopPropagation();
              setActivePhotoModal(heroImages[activeImageIndex]);
            }}
          >
            <Camera className="w-3.5 h-3.5 text-[#3B2F2F] mr-1" />
            <Text style={styles.imageCounterText}>{activeImageIndex + 1} / {heroImages.length}</Text>
          </TouchableOpacity>
          
          <View style={styles.carouselDots}>
            {heroImages.map((_, i) => (
              <View key={i} style={[styles.dot, i === activeImageIndex && styles.dotActive]} />
            ))}
          </View>
        </TouchableOpacity>

        {/* 3. VENUE SUMMARY CARD */}
        <Card style={styles.firstCard}>
          <View style={styles.rowBetween}>
            <Text style={styles.venueNameText}>{venue.name}</Text>
            <View style={styles.tierTagBadge}>
              <Sparkles className="w-3 h-3 text-[#C28E38] mr-1" />
              <Text style={styles.tierTagBadgeText}>{venue.tier || 'Premium'}</Text>
            </View>
          </View>
          
          <View style={styles.ratingRow}>
            <Star className="w-4 h-4 text-[#16A34A] fill-[#16A34A] mr-1" />
            <Text style={styles.ratingScore}>{venue.rating}</Text>
            <Text style={styles.ratingLabel}>Review Score</Text>
            <Text style={styles.ratingCount}>({venue.reviewsCount} Verified Reviews)</Text>
          </View>
          
          <View style={styles.locationRow}>
            <MapPin className="w-3.5 h-3.5 text-[#581420] mr-1" />
            <Text style={styles.locationText}>{venue.location || venue.city}, Tamil Nadu</Text>
          </View>

          {/* Quick Specifications Strip */}
          <View style={styles.quickSpecsRow}>
            <View style={styles.quickSpecItem}>
              <Users className="w-4 h-4 text-[#581420] mb-1" />
              <Text style={styles.quickSpecVal}>{venue.capacity || '100-500 Guests'}</Text>
              <Text style={styles.quickSpecLbl}>Guest Capacity</Text>
            </View>
            <View style={styles.specDivider} />
            <View style={styles.quickSpecItem}>
              <Home className="w-4 h-4 text-[#581420] mb-1" />
              <Text style={styles.quickSpecVal}>{venue.roomsAvailable || '20+ AC Rooms'}</Text>
              <Text style={styles.quickSpecLbl}>Rooms / Stay</Text>
            </View>
            <View style={styles.specDivider} />
            <View style={styles.quickSpecItem}>
              <Car className="w-4 h-4 text-[#581420] mb-1" />
              <Text style={styles.quickSpecVal}>{venue.parkingSpace ? 'Valet Parking' : 'Ample Space'}</Text>
              <Text style={styles.quickSpecLbl}>Parking</Text>
            </View>
            <View style={styles.specDivider} />
            <View style={styles.quickSpecItem}>
              <Clock className="w-4 h-4 text-[#16A34A] mb-1" />
              <Text style={[styles.quickSpecVal, { color: '#16A34A' }]}>{venue.experience || '10+ Years'}</Text>
              <Text style={styles.quickSpecLbl}>Experience</Text>
            </View>
          </View>
        </Card>

        {/* 4. ABOUT VENUE */}
        <Card>
          <Text style={styles.cardTitle}>About {venue.name}</Text>
          <Text style={styles.descriptionText}>
            {venue.description || `A luxurious and premium wedding destination in ${venue.city}, crafted to host memorable celebrations with world-class hospitality, central air conditioning, and top-tier guest amenities.`}
          </Text>
          <View style={styles.cateringPolicyBox}>
            <Utensils className="w-4 h-4 text-[#581420] mr-2 flex-shrink-0" />
            <Text style={styles.cateringPolicyText}>
              <Text style={{ fontWeight: '700' }}>Catering Policy: </Text>
              {venue.cateringPolicy || 'In-House Catering & External Caterers Allowed'}
            </Text>
          </View>
        </Card>

        {/* 5. CHECK AVAILABILITY & DATES */}
        <Card style={{ backgroundColor: '#FDFBF7', borderColor: '#E8DEC8' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
            <Calendar className="w-4 h-4 text-[#581420] mr-1.5" />
            <Text style={styles.cardTitle}>Check Availability & Dates</Text>
          </View>
          <Text style={styles.cardSubtitle}>Enter your wedding date to check live hall availability.</Text>
          
          <View style={styles.availabilityRow}>
            <View style={styles.inputGroup}>
              <Calendar className="w-3.5 h-3.5 text-stone-400 mr-1.5" />
              <TextInput
                style={styles.inputText}
                placeholder="DD/MM/YYYY"
                value={availDate}
                onChangeText={setAvailDate}
              />
            </View>
            <View style={styles.inputDivider} />
            <View style={styles.inputGroup}>
              <Users className="w-3.5 h-3.5 text-stone-400 mr-1.5" />
              <TextInput
                style={styles.inputText}
                placeholder="Guests"
                value={availGuests}
                onChangeText={setAvailGuests}
              />
            </View>
            <TouchableOpacity style={styles.checkDatesBtn} onPress={() => setShowQuoteModal(true)} activeOpacity={0.85}>
              <Text style={styles.checkDatesBtnText}>Get Quote</Text>
            </TouchableOpacity>
          </View>
        </Card>

        {/* 6. PRICING BREAKDOWN CARD */}
        <Card>
          <Text style={styles.cardTitle}>Pricing & Rental Rates</Text>
          
          <View style={styles.priceRow}>
            <View style={styles.priceLeft}>
              <View style={styles.vegIcon} />
              <View>
                <Text style={styles.priceTitle}>Vegetarian Feast Menu</Text>
                <Text style={styles.priceSub}>Banana leaf / Buffet catering starting</Text>
              </View>
            </View>
            <View style={styles.priceRight}>
              <Text style={styles.priceValue}>₹ 850</Text>
              <Text style={styles.priceSub}>per plate</Text>
            </View>
          </View>
          <Divider />
          
          <View style={styles.priceRow}>
            <View style={styles.priceLeft}>
              <View style={styles.nonVegIcon} />
              <View>
                <Text style={styles.priceTitle}>Non-Vegetarian Feast Menu</Text>
                <Text style={styles.priceSub}>Multi-cuisine banquet menu</Text>
              </View>
            </View>
            <View style={styles.priceRight}>
              <Text style={styles.priceValue}>₹ 1,250</Text>
              <Text style={styles.priceSub}>per plate</Text>
            </View>
          </View>
          <Divider />
          
          <View style={styles.priceRow}>
            <View style={styles.priceLeft}>
              <Building2 className="w-4 h-4 text-[#581420] mr-2" />
              <View>
                <Text style={styles.priceTitle}>Full Day Venue Hire</Text>
                <Text style={styles.priceSub}>AC Hall + Dining + 2 Bridal Suites</Text>
              </View>
            </View>
            <View style={styles.priceRight}>
              <Text style={[styles.priceValue, { color: '#581420' }]}>{venue.startingPrice}</Text>
              <Text style={styles.priceSub}>base package</Text>
            </View>
          </View>
        </Card>

        {/* 7. BANQUETS & EVENT SPACES */}
        <Card>
          <Text style={styles.cardTitle}>Banquets & Event Spaces</Text>
          
          <View style={styles.banquetItem}>
            <View style={styles.banquetHeaderRow}>
              <Image source={{ uri: heroImages[1] || heroImages[0] }} style={styles.banquetThumb} />
              <View style={styles.banquetInfo}>
                <Text style={styles.banquetName}>Grand Regalia Main Mandapam (Indoor AC)</Text>
                <View style={styles.banquetCapacity}>
                  <Users className="w-3.5 h-3.5 text-gray-400 mr-1" />
                  <Text style={styles.banquetCapacityText}>500 Seating | 1,000 Floating</Text>
                </View>
                <Text style={styles.viewAreaText}>Central Air Conditioning • Stage Rig</Text>
              </View>
            </View>
            <View style={styles.banquetImageGrid}>
              <TouchableOpacity style={{ flex: 1 }} onPress={() => setActivePhotoModal(heroImages[1])}>
                <Image source={{ uri: heroImages[1] }} style={styles.banquetGridImg} />
              </TouchableOpacity>
              <TouchableOpacity style={{ flex: 1 }} onPress={() => setActivePhotoModal(heroImages[2])}>
                <Image source={{ uri: heroImages[2] }} style={styles.banquetGridImg} />
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.banquetItem}>
            <View style={styles.banquetHeaderRow}>
              <Image source={{ uri: heroImages[3] || heroImages[0] }} style={styles.banquetThumb} />
              <View style={styles.banquetInfo}>
                <Text style={styles.banquetName}>Vue Lawn & Dining Courtyard (Outdoor)</Text>
                <View style={styles.banquetCapacity}>
                  <Users className="w-3.5 h-3.5 text-gray-400 mr-1" />
                  <Text style={styles.banquetCapacityText}>600 Seating | 1,200 Floating</Text>
                </View>
                <Text style={styles.viewAreaText}>Lush Greenery • Canopy Lighting Setup</Text>
              </View>
            </View>
            <View style={styles.banquetImageGrid}>
              <TouchableOpacity style={{ flex: 1 }} onPress={() => setActivePhotoModal(heroImages[3])}>
                <Image source={{ uri: heroImages[3] }} style={styles.banquetGridImg} />
              </TouchableOpacity>
              <TouchableOpacity style={{ flex: 1 }} onPress={() => setActivePhotoModal(heroImages[4] || heroImages[0])}>
                <Image source={{ uri: heroImages[4] || heroImages[0] }} style={styles.banquetGridImg} />
              </TouchableOpacity>
            </View>
          </View>
        </Card>

        {/* 8. POPULAR PACKAGES */}
        <Card>
          <Text style={styles.cardTitle}>Popular Wedding Packages</Text>
          <Text style={styles.cardSubtitle}>Select a package to request a customized quote.</Text>
          
          {packagesList.map((pkg, idx) => (
            <View key={idx} style={styles.packageCardItem}>
              <View style={styles.packageHeaderRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.packageTitle}>{pkg.title}</Text>
                  <Text style={styles.packagePriceText}>{pkg.price}</Text>
                </View>
                <TouchableOpacity
                  style={styles.packageSelectBtn}
                  onPress={() => setShowQuoteModal(true)}
                  activeOpacity={0.85}
                >
                  <Text style={styles.packageSelectBtnText}>Select</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.packageDescText}>{pkg.description}</Text>
            </View>
          ))}
        </Card>

        {/* 9. AMENITIES CHECKLIST */}
        <Card>
          <Text style={styles.cardTitle}>Venue Amenities & Facilities</Text>
          <View style={styles.amenitiesGrid}>
            {amenitiesList.map((amenity, idx) => (
              <View key={idx} style={styles.amenityChip}>
                <Check className="w-3.5 h-3.5 text-[#16A34A] mr-1.5 flex-shrink-0" />
                <Text style={styles.amenityChipText}>{amenity}</Text>
              </View>
            ))}
          </View>
        </Card>

        {/* 10. VERIFIED REVIEWS */}
        <Card>
          <View style={styles.rowBetween}>
            <Text style={styles.cardTitle}>Verified Reviews ({venue.reviewsCount})</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Star className="w-4 h-4 text-amber-500 fill-amber-500 mr-1" />
              <Text style={{ fontSize: 13, fontWeight: '700', color: '#2A2425' }}>{venue.rating} / 5</Text>
            </View>
          </View>

          {reviewsList.map((rev) => (
            <View key={rev.id} style={styles.reviewItem}>
              <View style={styles.reviewHeader}>
                <View style={styles.reviewAvatar}>
                  <Text style={styles.reviewAvatarText}>{rev.name.charAt(0)}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.reviewAuthor}>{rev.name}</Text>
                  <Text style={styles.reviewDate}>{rev.date}</Text>
                </View>
                <View style={{ flexDirection: 'row', gap: 2 }}>
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 text-amber-500 fill-amber-500" />
                  ))}
                </View>
              </View>
              <Text style={styles.reviewComment}>{rev.comment}</Text>
            </View>
          ))}
        </Card>

      </ScrollView>

      {/* STICKY BOTTOM ACTION BAR */}
      <View style={styles.bottomBar}>
        <View style={styles.bottomPriceCol}>
          <Text style={styles.bottomPriceLabel}>Starting From</Text>
          <Text style={styles.bottomPriceValue} numberOfLines={1}>{venue.startingPrice}</Text>
        </View>

        <View style={styles.bottomActionBtns}>
          <TouchableOpacity style={styles.callIconBtn} onPress={handleCall} activeOpacity={0.8}>
            <Phone className="w-4 h-4 text-[#2A2425]" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.whatsappIconBtn} onPress={handleWhatsApp} activeOpacity={0.8}>
            <MessageCircle className="w-4 h-4 text-emerald-700" />
          </TouchableOpacity>

          {quoteStatus === 'initial' && (
            <TouchableOpacity
              style={styles.quoteBtnMain}
              onPress={() => setShowQuoteModal(true)}
              activeOpacity={0.85}
            >
              <Send className="w-3.5 h-3.5 text-white mr-1.5" />
              <Text style={styles.quoteBtnMainText}>Request Quote</Text>
            </TouchableOpacity>
          )}

          {quoteStatus === 'requested' && (
            <TouchableOpacity style={[styles.quoteBtnMain, { backgroundColor: '#F59E0B' }]} disabled activeOpacity={1}>
              <Text style={styles.quoteBtnMainText}>Pending Response</Text>
            </TouchableOpacity>
          )}

          {quoteStatus === 'negotiating' && (
            <TouchableOpacity style={[styles.quoteBtnMain, { backgroundColor: '#F59E0B' }]} disabled activeOpacity={1}>
              <Text style={styles.quoteBtnMainText}>Negotiating...</Text>
            </TouchableOpacity>
          )}

          {quoteStatus === 'rejected' && (
            <TouchableOpacity style={[styles.quoteBtnMain, { backgroundColor: '#DC2626' }]} onPress={() => updateQuoteStatus('initial')} activeOpacity={0.85}>
              <Text style={styles.quoteBtnMainText}>Rejected (Reset)</Text>
            </TouchableOpacity>
          )}

          {quoteStatus === 'response_ready' && (
            <TouchableOpacity style={[styles.quoteBtnMain, { backgroundColor: '#10B981' }]} onPress={() => setShowQuotationScreen(true)} activeOpacity={0.85}>
              <Text style={styles.quoteBtnMainText}>View Quote</Text>
            </TouchableOpacity>
          )}

          {(quoteStatus === 'confirmed' || quoteStatus === 'partially_paid' || quoteStatus === 'fully_paid') && (
            <TouchableOpacity
              style={[styles.quoteBtnMain, { backgroundColor: '#15803D' }]}
              onPress={() => setShowInvoiceModal(true)}
              activeOpacity={0.85}
            >
              <Text style={styles.quoteBtnMainText}>
                {quoteStatus === 'fully_paid'
                  ? 'Fully Paid (Invoice)'
                  : quoteStatus === 'partially_paid'
                  ? 'Partially Paid'
                  : 'View Invoice'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* PHOTO ZOOM MODAL */}
      <Modal visible={Boolean(activePhotoModal)} transparent animationType="fade">
        <View style={styles.photoModalContainer}>
          <TouchableOpacity
            style={styles.photoModalClose}
            onPress={() => setActivePhotoModal(null)}
          >
            <X className="w-6 h-6 text-white" />
          </TouchableOpacity>
          {activePhotoModal && (
            <Image source={{ uri: activePhotoModal }} style={styles.fullPhoto} resizeMode="contain" />
          )}
        </View>
      </Modal>

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
        onShowToast={showToast}
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
  pageContainer: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: '#FAF7F2',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EBE5DE',
    zIndex: 10,
  },
  iconBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#F5ECE3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2A2425',
  },
  headerSubtitle: {
    fontSize: 11,
    color: '#7D6E70',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  bookNowBtn: {
    backgroundColor: '#581420',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    shadowColor: '#581420',
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  bookNowBtnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  scrollArea: {
    flex: 1,
    width: '100%',
  },
  heroContainer: {
    width: '100%',
    height: 250,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  bookingBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(42, 36, 37, 0.85)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bookingBadgeText: {
    color: '#FFFFFF',
    fontSize: 10.5,
    fontWeight: '600',
  },
  imageCounter: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imageCounterText: {
    fontSize: 10.5,
    fontWeight: '700',
    color: '#3B2F2F',
  },
  carouselDots: {
    position: 'absolute',
    bottom: 12,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  dotActive: {
    backgroundColor: '#FFFFFF',
    width: 6,
    height: 6,
  },
  firstCard: {
    marginTop: -16,
    zIndex: 5,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    marginHorizontal: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    borderWidth: 1,
    borderColor: '#ECE5DE',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  venueNameText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#2A2425',
    flex: 1,
    lineHeight: 22,
    fontFamily: "'Cormorant Garamond', Georgia, serif",
  },
  tierTagBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 6,
    marginLeft: 8,
  },
  tierTagBadgeText: {
    fontSize: 10.5,
    fontWeight: '700',
    color: '#92400E',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 6,
  },
  ratingScore: {
    fontSize: 13,
    fontWeight: '700',
    color: '#2A2425',
    marginRight: 4,
  },
  ratingLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2A2425',
    marginRight: 4,
  },
  ratingCount: {
    fontSize: 11,
    color: '#7D6E70',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationText: {
    fontSize: 11.5,
    color: '#581420',
    fontWeight: '500',
  },
  quickSpecsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FAF5EE',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ECE0D0',
  },
  quickSpecItem: {
    flex: 1,
    alignItems: 'center',
  },
  quickSpecVal: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2A2425',
    textAlign: 'center',
    marginBottom: 2,
  },
  quickSpecLbl: {
    fontSize: 9.5,
    color: '#7D6E70',
    textAlign: 'center',
  },
  specDivider: {
    width: 1,
    height: 28,
    backgroundColor: '#E2D5C3',
  },
  cardTitle: {
    fontSize: 14.5,
    fontWeight: '700',
    color: '#2A2425',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 11.5,
    color: '#7D6E70',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 12,
    lineHeight: 18,
    color: '#554A4C',
    marginBottom: 10,
  },
  cateringPolicyBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF5EE',
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ECE0D0',
  },
  cateringPolicyText: {
    fontSize: 11,
    color: '#4A3E40',
  },
  availabilityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    borderWidth: 1,
    borderColor: '#E2D5C3',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    padding: 4,
  },
  inputGroup: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  inputText: {
    flex: 1,
    fontSize: 11.5,
    color: '#2A2425',
    paddingVertical: 4,
  },
  inputDivider: {
    width: 1,
    height: 20,
    backgroundColor: '#E2D5C3',
  },
  checkDatesBtn: {
    backgroundColor: '#581420',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    marginLeft: 6,
  },
  checkDatesBtnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    alignItems: 'center',
  },
  priceLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  vegIcon: {
    width: 12,
    height: 12,
    borderWidth: 1.5,
    borderColor: '#16A34A',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    borderRadius: 2,
  },
  nonVegIcon: {
    width: 12,
    height: 12,
    borderWidth: 1.5,
    borderColor: '#DC2626',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    borderRadius: 2,
  },
  priceTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2A2425',
  },
  priceSub: {
    fontSize: 10,
    color: '#7D6E70',
  },
  priceRight: {
    alignItems: 'flex-end',
  },
  priceValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#2A2425',
  },
  divider: {
    height: 1,
    backgroundColor: '#F0ECE6',
  },
  banquetItem: {
    marginBottom: 14,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0ECE6',
  },
  banquetHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  banquetThumb: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 10,
  },
  banquetInfo: {
    flex: 1,
  },
  banquetName: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#2A2425',
    marginBottom: 2,
  },
  banquetCapacity: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  banquetCapacityText: {
    fontSize: 10.5,
    color: '#7D6E70',
  },
  viewAreaText: {
    fontSize: 10.5,
    color: '#16A34A',
    fontWeight: '600',
  },
  banquetImageGrid: {
    flexDirection: 'row',
    gap: 6,
  },
  banquetGridImg: {
    width: '100%',
    height: 90,
    borderRadius: 8,
  },
  packageCardItem: {
    backgroundColor: '#FAF7F2',
    borderWidth: 1,
    borderColor: '#E8E0D5',
    borderRadius: 10,
    padding: 10,
    marginBottom: 8,
  },
  packageHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  packageTitle: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#2A2425',
  },
  packagePriceText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#581420',
    marginTop: 1,
  },
  packageSelectBtn: {
    backgroundColor: '#581420',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  packageSelectBtnText: {
    color: '#FFFFFF',
    fontSize: 10.5,
    fontWeight: '700',
  },
  packageDescText: {
    fontSize: 11,
    color: '#635B5C',
    lineHeight: 15,
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  amenityChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF5EE',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E8E0D5',
  },
  amenityChipText: {
    fontSize: 10.5,
    color: '#3B2F2F',
    fontWeight: '500',
  },
  reviewItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0ECE6',
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  reviewAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#581420',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  reviewAvatarText: {
    color: '#FFFFFF',
    fontSize: 10.5,
    fontWeight: '700',
  },
  reviewAuthor: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#2A2425',
  },
  reviewDate: {
    fontSize: 9.5,
    color: '#7D6E70',
  },
  reviewComment: {
    fontSize: 11,
    color: '#554A4C',
    lineHeight: 15,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EBE5DE',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    zIndex: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },
  bottomPriceCol: {
    justifyContent: 'center',
    maxWidth: '35%',
  },
  bottomPriceLabel: {
    fontSize: 9.5,
    color: '#7D6E70',
    fontWeight: '500',
  },
  bottomPriceValue: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#581420',
  },
  bottomActionBtns: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  callIconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3ECE4',
    borderWidth: 1,
    borderColor: '#E2D5C3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  whatsappIconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#DCFCE7',
    borderWidth: 1,
    borderColor: '#86EFAC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quoteBtnMain: {
    backgroundColor: '#581420',
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#581420',
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  quoteBtnMainText: {
    color: '#FFFFFF',
    fontSize: 11.5,
    fontWeight: '700',
  },
  photoModalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.92)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoModalClose: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 10,
    padding: 8,
  },
  fullPhoto: {
    width: '90%',
    height: '75%',
  },
});
