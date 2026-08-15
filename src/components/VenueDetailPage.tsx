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
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [showQuoteModal, setShowQuoteModal] = useState<boolean>(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

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

  const [showQuotationScreen, setShowQuotationScreen] = useState(false);

  const handleShowToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleQuoteRequestSent = () => {
    setShowQuoteModal(false);
    updateQuoteStatus('requested');
    const basePrice = parseInt((venue.startingPrice || '₹2,50,000').replace(/[^0-9]/g, ''), 10) || 250000;
    saveOrUpdateQuote({
      id: `quote-${venue.id}`,
      vendorId: venue.id,
      vendorName: venue.name,
      category: 'Venues',
      packageName: `${venue.name} - Grand AC Mandapam & Convention Package`,
      status: 'requested',
      paymentStatus: 'pending',
      totalAmount: basePrice,
      advanceAmount: Math.round(basePrice * 0.3),
      remainingAmount: basePrice - Math.round(basePrice * 0.3),
      weddingDate: '24 Oct 2026',
      location: venue.location || venue.city,
      includedServices: venue.amenities && venue.amenities.length > 0 ? venue.amenities : [
        'Centrally AC Banquet Hall Hire (12 Hours)',
        'Traditional Grand Stage & Buffet Canopy Setup',
        '2 AC Deluxe Bridal & Groom Changing Rooms',
        'Valet Parking Service for up to 150 Vehicles',
        '100% Uninterrupted Power Backup Generator',
      ],
      image: venue.image,
    });
    setToastMessage('Quote Request Sent! Added to My Quotes');
    setTimeout(() => setToastMessage(null), 3000);

    // Simulate response after 3 seconds
    setTimeout(() => {
      updateQuoteStatus('response_ready');
      saveOrUpdateQuote({
        id: `quote-${venue.id}`,
        status: 'response_ready',
      });
      setToastMessage('Venue Quotation Received! Click "View Quote"');
      setTimeout(() => setToastMessage(null), 4000);
    }, 3000);
  };

  const [quoteSuccess, setQuoteSuccess] = useState<boolean>(false);

  // Quote Form State
  const [guestName, setGuestName] = useState<string>('');
  const [guestPhone, setGuestPhone] = useState<string>('');
  const [eventDate, setEventDate] = useState<string>('');
  const [guestCount, setGuestCount] = useState<string>('500 - 1,000 Guests');
  const [roomRequirement, setRoomRequirement] = useState<string>('10 - 20 Rooms');
  const [cateringPreference, setCateringPreference] = useState<string>('Pure Veg (In-house)');
  const [additionalNotes, setAdditionalNotes] = useState<string>('');

  const phoneNum = venue.phone || '+91 91501 97966';
  const whatsappNum = venue.whatsapp || '919150197966';

  const handleCall = () => {
    Linking.openURL(`tel:${phoneNum}`);
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Hi ${venue.name}, I am interested in booking your wedding venue in ${venue.city} via Tale of Two App. Please share date availability and rental package details.`
    );
    Linking.openURL(`https://wa.me/${whatsappNum}?text=${text}`);
  };

  const handleInstagram = () => {
    const handle = venue.instagram || '@_ranjith_r.r_';
    const username = handle.replace('@', '');
    Linking.openURL(`https://instagram.com/${username}`);
  };

    const handleSubmitQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !guestPhone.trim() || !eventDate.trim()) {
      alert('Please fill in your name, phone number, and event date.');
      return;
    }
    setQuoteSuccess(true);
    setTimeout(() => {
      setQuoteSuccess(false);
      setShowQuoteModal(false);
      handleQuoteRequestSent();
    }, 1500);
  };

  return (
    <View style={styles.container}>
      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-[300] px-5 py-2.5 bg-stone-900/90 rounded-xl shadow-lg">
          <span className="text-white text-sm font-medium">{toastMessage}</span>
        </div>
      )}
      <View style={styles.topHeader}>
        <TouchableOpacity
          style={styles.iconCircleBtn}
          onPress={onBack}
          activeOpacity={0.8}
        >
          <ArrowLeft className="w-5 h-5 text-stone-800" />
        </TouchableOpacity>

        <Text style={styles.headerTitleText} numberOfLines={1}>
          {venue.name}
        </Text>

        <View style={{ flexDirection: 'row', gap: 8 }}>
          <TouchableOpacity
            style={styles.iconCircleBtn}
            onPress={() => onToggleBookmark(venue.id)}
            activeOpacity={0.8}
          >
            <Heart
              className={`w-5 h-5 ${
                isBookmarked
                  ? 'text-[#581420] fill-[#581420]'
                  : 'text-stone-700'
              }`}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* SCROLLABLE MAIN BODY */}
      <ScrollView
        style={{ flex: 1, overflowY: 'auto' } as any}
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {/* HERO IMAGE & CAROUSEL PREVIEW */}
        <View style={styles.heroWrapper}>
          <Image
            source={{ uri: venue.portfolio[activeImageIndex] || venue.image }}
            style={styles.heroImage}
            resizeMode="cover"
          />

          {/* Tier Badge */}
          <View style={styles.tierBadge}>
            <Sparkles className="w-3.5 h-3.5 text-amber-600 mr-1" />
            <Text style={styles.tierBadgeText}>{venue.tier} Venue</Text>
          </View>

          {/* Rating Overlay */}
          <View style={styles.ratingOverlay}>
            <Star className="w-4 h-4 text-amber-400 fill-amber-400 mr-1" />
            <Text style={styles.ratingValueText}>{venue.rating}</Text>
            <Text style={styles.ratingCountText}>({venue.reviewsCount} reviews)</Text>
          </View>

          {/* Thumbnail Gallery Row */}
          <View style={styles.thumbRow}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {venue.portfolio.map((imgUrl, idx) => (
                <TouchableOpacity
                  key={idx}
                  onPress={() => setActiveImageIndex(idx)}
                  activeOpacity={0.85}
                  style={[
                    styles.thumbBox,
                    activeImageIndex === idx && styles.thumbBoxActive,
                  ]}
                >
                  <Image
                    source={{ uri: imgUrl }}
                    style={styles.thumbImage}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>

        {/* VENUE TITLE & LOCATION */}
        <View style={styles.detailsCard}>
          <Text style={styles.venueTitle}>{venue.name}</Text>

          <View style={styles.locationRow}>
            <MapPin className="w-4 h-4 text-[#581420] mr-1" />
            <Text style={styles.locationText}>
              {venue.location}, {venue.city}
            </Text>
          </View>

          <Text style={styles.categoryBadge}>{venue.category}</Text>

          {/* QUICK HIGHLIGHT STATS GRID */}
          <View style={styles.statsGrid}>
            <View style={styles.statBox}>
              <Users className="w-5 h-5 text-[#581420] mb-1" />
              <Text style={styles.statLabel}>Capacity</Text>
              <Text style={styles.statValue}>{venue.capacity}</Text>
            </View>

            <View style={styles.statBox}>
              <Home className="w-5 h-5 text-[#581420] mb-1" />
              <Text style={styles.statLabel}>AC Rooms</Text>
              <Text style={styles.statValue}>{venue.roomsAvailable}</Text>
            </View>

            <View style={styles.statBox}>
              <Car className="w-5 h-5 text-[#581420] mb-1" />
              <Text style={styles.statLabel}>Parking</Text>
              <Text style={styles.statValue}>{venue.parkingSpace}</Text>
            </View>

            <View style={styles.statBox}>
              <Utensils className="w-5 h-5 text-[#581420] mb-1" />
              <Text style={styles.statLabel}>Catering Policy</Text>
              <Text style={styles.statValue}>{venue.cateringPolicy}</Text>
            </View>
          </View>
        </View>

        {/* DESCRIPTION */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionHeaderTitle}>About the Venue</Text>
          <Text style={styles.descriptionText}>{venue.description}</Text>
          <View style={styles.expBadgeRow}>
            <Award className="w-4 h-4 text-amber-700 mr-1.5" />
            <Text style={styles.expBadgeText}>{venue.experience} Hosting Weddings</Text>
          </View>
        </View>

        {/* VENUE AMENITIES & HIGHLIGHTS */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionHeaderTitle}>Key Amenities & Facilities</Text>
          <View style={styles.amenitiesGrid}>
            {venue.amenities.map((item, idx) => (
              <View key={idx} style={styles.amenityChip}>
                <CheckCircle2 className="w-4 h-4 text-[#581420] mr-2" />
                <Text style={styles.amenityText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* PACKAGES / RENTAL PRICING */}
        {venue.packages && venue.packages.length > 0 && (
          <View style={styles.sectionCard}>
            <Text style={styles.sectionHeaderTitle}>Rental Packages & Pricing</Text>
            {venue.packages.map((pkg, idx) => (
              <View key={idx} style={styles.packageCard}>
                <View style={styles.packageHeader}>
                  <Text style={styles.packageTitle}>{pkg.title}</Text>
                  <Text style={styles.packagePrice}>{pkg.price}</Text>
                </View>
                <Text style={styles.packageDesc}>{pkg.description}</Text>
              </View>
            ))}
          </View>
        )}

        {/* LOCATION MAP PREVIEW CARD */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionHeaderTitle}>Location & Accessibility</Text>
          <View style={styles.mapCard}>
            <MapPin className="w-8 h-8 text-[#581420] mb-2" />
            <Text style={styles.mapCardTitle}>{venue.name}</Text>
            <Text style={styles.mapCardSub}>{venue.location}, {venue.city}</Text>
            <TouchableOpacity
              style={styles.directionsBtn}
              onPress={() =>
                Linking.openURL(
                  `https://maps.google.com/?q=${encodeURIComponent(
                    venue.name + ' ' + venue.city
                  )}`
                )
              }
              activeOpacity={0.8}
            >
              <Text style={styles.directionsBtnText}>Open in Google Maps</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* FIXED BOTTOM ACTION BAR */}
      <View style={styles.bottomBar}>
        <View style={styles.bottomPriceCol}>
          <Text style={styles.bottomPriceLabel}>Starting Rent</Text>
          <Text style={styles.bottomPriceValue}>{venue.startingPrice}</Text>
        </View>

        <View style={styles.bottomActionsRow}>
          <TouchableOpacity
            style={styles.circleCallBtn}
            onPress={handleCall}
            activeOpacity={0.8}
          >
            <Phone className="w-4 h-4 text-[#581420]" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.circleWhatsAppBtn}
            onPress={handleWhatsApp}
            activeOpacity={0.8}
          >
            <MessageCircle className="w-4 h-4 text-emerald-700" />
          </TouchableOpacity>

          {venue.instagram && (
            <TouchableOpacity
              style={styles.circleInstagramBtn}
              onPress={handleInstagram}
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
                  ? 'Partially Paid (Invoice)'
                  : 'View Invoice'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

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

      <QuotationScreen
        visible={showQuotationScreen}
        onClose={() => setShowQuotationScreen(false)}
        quoteStatus={quoteStatus}
        setQuoteStatus={updateQuoteStatus}
        vendorId={venue.id}
        vendorName={venue.name}
        vendorImage={venue.image}
        vendorLocation={venue.location || venue.city}
        startingPrice={venue.startingPrice}
        category="Venues"
        packageName={`${venue.name} - Grand AC Mandapam & Convention Package`}
        includedServices={
          venue.amenities && venue.amenities.length > 0
            ? venue.amenities
            : [
                'Centrally AC Banquet Hall Hire (12 Hours)',
                'Traditional Grand Stage & Buffet Canopy Setup',
                '2 AC Deluxe Bridal & Groom Changing Rooms',
                'Valet Parking Service for up to 150 Vehicles',
                '100% Uninterrupted Power Backup Generator',
              ]
        }
        onNavigateToQuotesTab={() => {
          setShowQuotationScreen(false);
          setShowInvoiceModal(true);
        }}
        onBack={onBack}
        onShowToast={handleShowToast}
      />

      {/* INVOICE & MILESTONES PAYMENT MODAL */}
      <WeddingInvoicePaymentModal
        visible={showInvoiceModal}
        onClose={() => setShowInvoiceModal(false)}
        vendorId={venue.id}
        vendorName={venue.name}
        vendorImage={venue.image}
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
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E8DFD5',
    zIndex: 30,
  },
  headerTitleText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#3B2F2F',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 10,
  },
  iconCircleBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F3ECE4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroWrapper: {
    position: 'relative',
    width: '100%',
    height: 320,
    backgroundColor: '#1C1917',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  tierBadge: {
    position: 'absolute',
    top: 14,
    left: 14,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tierBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#581420',
  },
  ratingOverlay: {
    position: 'absolute',
    top: 14,
    right: 14,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
  },
  ratingValueText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 13,
  },
  ratingCountText: {
    color: '#E7E5E4',
    fontSize: 11,
    marginLeft: 3,
  },
  thumbRow: {
    position: 'absolute',
    bottom: 12,
    left: 0,
    right: 0,
    paddingHorizontal: 12,
  },
  thumbBox: {
    width: 60,
    height: 60,
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  thumbBoxActive: {
    borderColor: '#581420',
  },
  thumbImage: {
    width: '100%',
    height: '100%',
  },
  detailsCard: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    marginHorizontal: 12,
    marginTop: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E8DFD5',
  },
  venueTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#581420',
    marginBottom: 6,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationText: {
    fontSize: 13,
    color: '#6B5E5E',
    fontWeight: '500',
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#F3ECE4',
    color: '#581420',
    fontSize: 12,
    fontWeight: '700',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 14,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  statBox: {
    width: '48%',
    backgroundColor: '#FAF7F2',
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E8DFD5',
  },
  statLabel: {
    fontSize: 11,
    color: '#7D6E70',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  statValue: {
    fontSize: 12,
    fontWeight: '700',
    color: '#3B2F2F',
    marginTop: 2,
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    marginHorizontal: 12,
    marginTop: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E8DFD5',
  },
  sectionHeaderTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#581420',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 13.5,
    color: '#524646',
    lineHeight: 20,
  },
  expBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  expBadgeText: {
    fontSize: 12,
    color: '#92400E',
    fontWeight: '700',
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  amenityChip: {
    width: '47%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF7F2',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E8DFD5',
  },
  amenityText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#3B2F2F',
  },
  packageCard: {
    backgroundColor: '#FAF7F2',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E8DFD5',
    marginBottom: 10,
  },
  packageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  packageTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#581420',
  },
  packagePrice: {
    fontSize: 13.5,
    fontWeight: '800',
    color: '#065F46',
  },
  packageDesc: {
    fontSize: 12.5,
    color: '#6B5E5E',
    lineHeight: 18,
  },
  mapCard: {
    backgroundColor: '#FAF7F2',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E8DFD5',
  },
  mapCardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#3B2F2F',
  },
  mapCardSub: {
    fontSize: 12.5,
    color: '#7D6E70',
    marginBottom: 12,
  },
  directionsBtn: {
    backgroundColor: '#581420',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  directionsBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 68,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E8DFD5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    zIndex: 40,
  },
  bottomPriceCol: {
    flexDirection: 'column',
    flexShrink: 1,
    marginRight: 4,
  },
  bottomPriceLabel: {
    fontSize: 9.5,
    color: '#7D6E70',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  bottomPriceValue: {
    fontSize: 13,
    fontWeight: '800',
    color: '#581420',
  },
  bottomActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexShrink: 0,
  },
  circleCallBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3ECE4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleWhatsAppBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#DCFCE7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleInstagramBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FCE7F3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryQuoteBtn: {
    backgroundColor: '#581420',
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryQuoteBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 12,
  },
  modalBg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.65)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#581420',
  },
  modalSub: {
    fontSize: 12,
    color: '#7D6E70',
  },
  modalCloseBtn: {
    padding: 4,
  },
  formGroup: {
    marginBottom: 12,
  },
  formLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#3B2F2F',
    marginBottom: 5,
  },
  formInput: {
    backgroundColor: '#FAF7F2',
    borderWidth: 1,
    borderColor: '#E8DFD5',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 13,
    color: '#1C1917',
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  selectChip: {
    backgroundColor: '#FAF7F2',
    borderWidth: 1,
    borderColor: '#E8DFD5',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  selectChipActive: {
    backgroundColor: '#581420',
    borderColor: '#581420',
  },
  selectChipText: {
    fontSize: 11.5,
    color: '#524646',
    fontWeight: '600',
  },
  selectChipTextActive: {
    color: '#FFFFFF',
  },
  submitModalBtn: {
    backgroundColor: '#581420',
    paddingVertical: 12,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  submitModalBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13.5,
  },
  successContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  successTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#065F46',
    marginBottom: 4,
  },
  successSub: {
    fontSize: 12.5,
    color: '#4B5563',
    textAlign: 'center',
  },
});

