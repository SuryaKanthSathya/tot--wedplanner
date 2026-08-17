import React, { useState } from 'react';
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
  MoreVertical,
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
} from 'lucide-react';
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
  amenities: string[];
  features: string[];
  portfolio: string[];
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

// Reusable Components
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
  const [showQuoteModal, setShowQuoteModal] = useState<boolean>(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState<boolean>(false);
  const [showQuotationScreen, setShowQuotationScreen] = useState<boolean>(false);

  const heroImages = venue.portfolio && venue.portfolio.length > 0 ? venue.portfolio : [
    'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=800&q=80'
  ];

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % heroImages.length);
  };

  const shareVenue = () => {
    if (navigator.share) {
      navigator.share({
        title: venue.name,
        url: window.location.href
      });
    } else {
      alert('Share link copied to clipboard!');
    }
  };

  const handleInstantBook = () => {
    const basePrice = venue.priceValue || parseInt((venue.startingPrice || '₹2,50,000').replace(/[^0-9]/g, ''), 10) || 250000;
    
    saveOrUpdateWeddingBooking({
      id: `booking-${venue.id}-${Date.now()}`,
      vendorId: venue.id,
      vendorName: venue.name,
      category: venue.category || 'Venues',
      serviceType: 'Venue Rental',
      image: heroImages[0] || venue.image || '',
      location: venue.location || venue.city || '',
      weddingDate: '24 Oct 2026',
      packageName: 'Premium Destination Package',
      totalAmount: basePrice,
      paidAmount: 0,
      remainingAmount: basePrice,
      status: 'confirmed',
      invoiceNo: `INV-${Math.floor(Math.random() * 10000)}`,
      invoiceDate: new Date().toLocaleDateString('en-GB'),
      milestones: [
        {
          id: 'm-1',
          milestoneNumber: 1,
          title: 'Advance Payment',
          percentage: 30,
          amount: Math.round(basePrice * 0.3),
          status: 'pending'
        },
        {
          id: 'm-2',
          milestoneNumber: 2,
          title: 'Final Payment',
          percentage: 70,
          amount: Math.round(basePrice * 0.7),
          status: 'locked'
        }
      ],
      includedServices: ['Venue Rental', 'Catering'],
      lastUpdated: new Date().toISOString()
    });

    window.dispatchEvent(new Event('tot_wedding_payments_updated'));
    
    if (onNavigateToProfileMyBookings) {
      onNavigateToProfileMyBookings();
    } else {
      window.dispatchEvent(new Event('tot_switch_to_profile_my_bookings'));
    }
  };

  return (
    <View style={styles.pageContainer}>
      {/* 1. TOP HEADER */}
      <View style={styles.topHeader}>
        <TouchableOpacity onPress={onBack} style={styles.iconBtn}>
          <ArrowLeft className="w-5 h-5 text-[#3B2F2F]" />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Venues in {venue.city || 'Chail'}</Text>
        
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconBtn} onPress={shareVenue}>
            <Share2 className="w-5 h-5 text-[#3B2F2F]" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.bookNowBtn} onPress={handleInstantBook}>
            <Text style={styles.bookNowBtnText}>Book Now</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollArea} showsVerticalScrollIndicator={false}>
        
        {/* 2. HERO IMAGE GALLERY */}
        <TouchableOpacity style={styles.heroContainer} activeOpacity={0.95} onPress={handleNextImage}>
          <Image source={{ uri: heroImages[activeImageIndex] }} style={styles.heroImage} />
          
          <View style={styles.bookingBadge}>
            <Text style={styles.bookingBadgeText}>1 booking recently</Text>
          </View>
          
          <View style={styles.imageCounter}>
            <Camera className="w-3.5 h-3.5 text-[#3B2F2F] mr-1" />
            <Text style={styles.imageCounterText}>{activeImageIndex + 1}/{heroImages.length + 90}</Text>
          </View>
          
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
            <TouchableOpacity style={styles.moreBtn}>
              <MoreVertical className="w-5 h-5 text-gray-500" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.ratingRow}>
            <Star className="w-4 h-4 text-[#16A34A] fill-[#16A34A] mr-1" />
            <Text style={styles.ratingScore}>{venue.rating}</Text>
            <Text style={styles.ratingLabel}>Review Score</Text>
            <Text style={styles.ratingCount}>({venue.reviewsCount} Reviews)</Text>
          </View>
          
          <View style={styles.locationRow}>
            <MapPin className="w-3.5 h-3.5 text-gray-400 mr-1" />
            <Text style={styles.locationText}>{venue.location || venue.city}</Text>
            <Text style={styles.locationSeparator}>|</Text>
            <Text style={styles.locationText}>Location</Text>
          </View>
        </Card>

        {/* 4. VENUE TYPE / CAPACITY CARD */}
        <Card>
          <Text style={styles.cardTitle}>5 Star Mountain Hotel</Text>
          <Text style={styles.cardSubtitle}>Say "I do" amongst the Mountains</Text>
          
          <View style={styles.metadataRow}>
            <View style={styles.metadataItem}>
              <Users className="w-4 h-4 text-gray-500 mr-1.5" />
              <Text style={styles.metadataText}>{venue.capacity || '150 - 200 pax'}</Text>
            </View>
            <View style={styles.metadataItem}>
              <Building2 className="w-4 h-4 text-gray-500 mr-1.5" />
              <Text style={styles.metadataText}>{venue.roomsAvailable || '65 Rooms'}</Text>
            </View>
          </View>
        </Card>

        {/* 5. PRICING INFORMATION CARD */}
        <Card>
          <Text style={styles.cardTitle}>Pricing Info</Text>
          
          <View style={styles.priceRow}>
            <View style={styles.priceLeft}>
              <View style={styles.vegIcon} />
              <View>
                <Text style={styles.priceTitle}>Veg price (taxes extra)</Text>
                <Text style={styles.priceSub}>starting price</Text>
              </View>
            </View>
            <View style={styles.priceRight}>
              <Text style={styles.priceValue}>₹ 3,000</Text>
              <Text style={styles.priceSub}>per plate</Text>
            </View>
          </View>
          <Divider />
          
          <View style={styles.priceRow}>
            <View style={styles.priceLeft}>
              <View style={styles.nonVegIcon} />
              <View>
                <Text style={styles.priceTitle}>Non Veg price (taxes extra)</Text>
                <Text style={styles.priceSub}>starting price</Text>
              </View>
            </View>
            <View style={styles.priceRight}>
              <Text style={styles.priceValue}>₹ 3,500</Text>
              <Text style={styles.priceSub}>per plate</Text>
            </View>
          </View>
          <Divider />
          
          <View style={styles.priceRow}>
            <View style={styles.priceLeft}>
              <Building2 className="w-4 h-4 text-[#581420] mr-2" />
              <View>
                <Text style={styles.priceTitle}>Destination Price</Text>
                <Text style={styles.priceSub}>(incl. Rooms + 3 Meals + Venue)</Text>
              </View>
            </View>
            <View style={styles.priceRight}>
              <Text style={styles.priceValue}>₹ 23.00 Lakhs</Text>
              <Text style={styles.priceSub}>/day for 65 rooms</Text>
            </View>
          </View>
          <Divider />
          
          <View style={styles.priceRow}>
            <View style={styles.priceLeft}>
              <Building2 className="w-4 h-4 text-[#581420] mr-2" />
              <Text style={styles.priceTitle}>Destination package</Text>
            </View>
            <View style={styles.priceRight}>
              <Text style={styles.priceValue}>₹ 2,300,000</Text>
            </View>
          </View>
        </Card>

        {/* 6. CHECK AVAILABILITY CARD */}
        <Card>
          <Text style={styles.cardTitle}>Check Availability</Text>
          <View style={styles.availabilityRow}>
            <View style={styles.inputGroup}>
              <Calendar className="w-4 h-4 text-gray-400 mr-2" />
              <TextInput style={styles.inputText} placeholder="Event date" />
            </View>
            <View style={styles.inputDivider} />
            <View style={styles.inputGroup}>
              <Users className="w-4 h-4 text-gray-400 mr-2" />
              <TextInput style={styles.inputText} placeholder="Guest" />
            </View>
            <TouchableOpacity style={styles.checkDatesBtn} onPress={() => setShowQuoteModal(true)}>
              <Text style={styles.checkDatesBtnText}>Check Dates</Text>
            </TouchableOpacity>
          </View>
        </Card>

        {/* 7. BANQUETS SECTION */}
        <Card>
          <Text style={styles.cardTitle}>Banquets 2</Text>
          
          <View style={styles.banquetItem}>
            <View style={styles.banquetHeaderRow}>
              <Image source={{ uri: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=100&q=80' }} style={styles.banquetThumb} />
              <View style={styles.banquetInfo}>
                <Text style={styles.banquetName}>Banquet - Regalia</Text>
                <View style={styles.banquetCapacity}>
                  <Users className="w-3.5 h-3.5 text-gray-400 mr-1" />
                  <Text style={styles.banquetCapacityText}>150 Seating | 200 Floating</Text>
                </View>
                <Text style={styles.viewAreaText}>View Indoor Area</Text>
              </View>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </View>
            <View style={styles.banquetImageGrid}>
              <Image source={{ uri: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=300&q=80' }} style={styles.banquetGridImg} />
              <Image source={{ uri: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=300&q=80' }} style={styles.banquetGridImg} />
            </View>
          </View>
          
          <View style={styles.banquetItem}>
            <View style={styles.banquetHeaderRow}>
              <Image source={{ uri: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=100&q=80' }} style={styles.banquetThumb} />
              <View style={styles.banquetInfo}>
                <Text style={styles.banquetName}>Vue</Text>
                <View style={styles.banquetCapacity}>
                  <Users className="w-3.5 h-3.5 text-gray-400 mr-1" />
                  <Text style={styles.banquetCapacityText}>150 Seating | 200 Floating</Text>
                </View>
                <Text style={styles.viewAreaText}>View Outdoor Area</Text>
              </View>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </View>
            <View style={styles.banquetImageGrid}>
              <Image source={{ uri: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=300&q=80' }} style={styles.banquetGridImg} />
              <Image source={{ uri: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=300&q=80' }} style={styles.banquetGridImg} />
            </View>
          </View>
        </Card>

        {/* 8. ALBUMS SECTION */}
        <Card>
          <View style={styles.rowLeft}>
            <Text style={styles.cardTitle}>Albums</Text>
            <View style={styles.albumCountBadge}>
              <Text style={styles.albumCountText}>6 nos.</Text>
            </View>
          </View>
          
          <View style={styles.albumGrid}>
            <View style={styles.albumLarge}>
              <Image source={{ uri: heroImages[0] }} style={styles.albumLargeImg} />
              <View style={styles.portfolioOverlay}>
                <View style={styles.portfolioBadge}>
                  <Camera className="w-3 h-3 text-[#3B2F2F] mr-1" />
                  <Text style={styles.portfolioBadgeText}>63</Text>
                </View>
                <Text style={styles.portfolioTitle}>Portfolio</Text>
              </View>
            </View>
            <View style={styles.albumSmallCol}>
              <Image source={{ uri: heroImages[1] || 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=300&q=80' }} style={styles.albumSmallImg} />
              <Image source={{ uri: heroImages[2] || 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=300&q=80' }} style={styles.albumSmallImg} />
            </View>
            <View style={styles.albumSmallCol}>
              <Image source={{ uri: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=300&q=80' }} style={styles.albumSmallImg} />
              <Image source={{ uri: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=300&q=80' }} style={styles.albumSmallImg} />
            </View>
          </View>
        </Card>
        
        <View style={{ height: 60 }} />
      </ScrollView>

      <RequestQuoteModal
        visible={showQuoteModal}
        vendorId={venue.id}
        vendorName={venue.name}
        startingPrice={venue.startingPrice}
        location={venue.location || venue.city}
        category="venue"
        onClose={() => setShowQuoteModal(false)}
        onQuoteSent={() => setShowQuoteModal(false)}
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    zIndex: 10,
  },
  iconBtn: {
    padding: 6,
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#3B2F2F',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  bookNowBtn: {
    backgroundColor: '#581420',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  bookNowBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  scrollArea: {
    flex: 1,
    width: '100%',
  },
  heroContainer: {
    width: '100%',
    height: 280,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  bookingBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#581420',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  bookingBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
  },
  imageCounter: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imageCounterText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#3B2F2F',
  },
  carouselDots: {
    position: 'absolute',
    bottom: 16,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  dotActive: {
    backgroundColor: '#FFFFFF',
    width: 7,
    height: 7,
  },
  firstCard: {
    marginTop: -20,
    zIndex: 5,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  venueNameText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#3B2F2F',
    flex: 1,
    lineHeight: 24,
  },
  moreBtn: {
    padding: 4,
    marginRight: -4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 10,
  },
  ratingScore: {
    fontSize: 14,
    fontWeight: '700',
    color: '#3B2F2F',
    marginRight: 6,
  },
  ratingLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#3B2F2F',
    marginRight: 6,
  },
  ratingCount: {
    fontSize: 12,
    color: '#6B7280',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 12,
    color: '#6B7280',
  },
  locationSeparator: {
    marginHorizontal: 8,
    color: '#D1D5DB',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#3B2F2F',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 14,
  },
  metadataRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF7F2',
    padding: 12,
    borderRadius: 8,
    gap: 16,
  },
  metadataItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metadataText: {
    fontSize: 13,
    color: '#4B5563',
    fontWeight: '500',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
  },
  priceLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  vegIcon: {
    width: 14,
    height: 14,
    borderWidth: 1.5,
    borderColor: '#16A34A',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
    marginRight: 10,
    borderRadius: 2,
  },
  nonVegIcon: {
    width: 14,
    height: 14,
    borderWidth: 1.5,
    borderColor: '#DC2626',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
    marginRight: 10,
    borderRadius: 2,
  },
  priceTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#3B2F2F',
    marginBottom: 2,
  },
  priceSub: {
    fontSize: 11,
    color: '#6B7280',
  },
  priceRight: {
    alignItems: 'flex-end',
  },
  priceValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#3B2F2F',
  },
  divider: {
    height: 1,
    backgroundColor: 'transparent',
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  availabilityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 4,
  },
  inputGroup: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  inputText: {
    flex: 1,
    fontSize: 13,
    paddingVertical: 8,
    outlineStyle: 'none',
  },
  inputDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#E5E7EB',
  },
  checkDatesBtn: {
    backgroundColor: '#F3ECE4',
    borderColor: '#581420',
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
    marginLeft: 8,
  },
  checkDatesBtnText: {
    color: '#581420',
    fontSize: 13,
    fontWeight: '600',
  },
  banquetItem: {
    marginBottom: 20,
    paddingTop: 10,
  },
  banquetHeaderRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  banquetThumb: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
  },
  banquetInfo: {
    flex: 1,
  },
  banquetName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3B2F2F',
    marginBottom: 4,
  },
  banquetCapacity: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  banquetCapacityText: {
    fontSize: 12,
    color: '#6B7280',
  },
  viewAreaText: {
    fontSize: 12,
    color: '#16A34A',
    fontWeight: '600',
  },
  banquetImageGrid: {
    flexDirection: 'row',
    gap: 8,
  },
  banquetGridImg: {
    flex: 1,
    height: 110,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  albumCountBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    marginLeft: 8,
  },
  albumCountText: {
    color: '#92400E',
    fontSize: 11,
    fontWeight: '600',
  },
  albumGrid: {
    flexDirection: 'row',
    gap: 4,
    height: 200,
  },
  albumLarge: {
    flex: 2,
    position: 'relative',
    borderRadius: 8,
    overflow: 'hidden',
  },
  albumLargeImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  portfolioOverlay: {
    position: 'absolute',
    bottom: 12,
    left: 12,
  },
  portfolioBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  portfolioBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#3B2F2F',
  },
  portfolioTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  albumSmallCol: {
    flex: 1,
    gap: 4,
  },
  albumSmallImg: {
    width: '100%',
    flex: 1,
    borderRadius: 4,
    resizeMode: 'cover',
  },
});
