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
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

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
}

interface VenueDetailPageProps {
  venue: VenueItem;
  onBack: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
}

export const VenueDetailPage: React.FC<VenueDetailPageProps> = ({
  venue,
  onBack,
  isBookmarked,
  onToggleBookmark,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [showQuoteModal, setShowQuoteModal] = useState<boolean>(false);
  const [quoteSuccess, setQuoteSuccess] = useState<boolean>(false);

  // Quote Form State
  const [guestName, setGuestName] = useState<string>('');
  const [guestPhone, setGuestPhone] = useState<string>('');
  const [eventDate, setEventDate] = useState<string>('');
  const [guestCount, setGuestCount] = useState<string>('500 - 1,000 Guests');
  const [roomRequirement, setRoomRequirement] = useState<string>('10 - 20 Rooms');
  const [cateringPreference, setCateringPreference] = useState<string>('Pure Veg (In-house)');
  const [additionalNotes, setAdditionalNotes] = useState<string>('');

  const phoneNum = venue.phone || '+91 98765 43210';
  const whatsappNum = venue.whatsapp || '919876543210';

  const handleCall = () => {
    Linking.openURL(`tel:${phoneNum}`);
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Hi ${venue.name}, I am interested in booking your venue in ${venue.city} via Tale of Two App. Please share date availability and rental package details.`
    );
    Linking.openURL(`https://wa.me/${whatsappNum}?text=${text}`);
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
    }, 2200);
  };

  return (
    <View style={styles.container}>
      {/* FIXED TOP HEADER */}
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
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 100 }}
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

          <TouchableOpacity
            style={styles.primaryQuoteBtn}
            onPress={() => setShowQuoteModal(true)}
            activeOpacity={0.85}
          >
            <Send className="w-4 h-4 text-white mr-1.5" />
            <Text style={styles.primaryQuoteBtnText}>Request Quote</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* REQUEST QUOTE MODAL */}
      {showQuoteModal && (
        <Modal
          visible={showQuoteModal}
          transparent
          animationType="fade"
          onRequestClose={() => setShowQuoteModal(false)}
        >
          <View style={styles.modalBg}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-[92%] max-w-md bg-white rounded-2xl overflow-hidden shadow-2xl p-5"
            >
              <View style={styles.modalHeader}>
                <View>
                  <Text style={styles.modalTitle}>Request Venue Quote</Text>
                  <Text style={styles.modalSub}>{venue.name}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => setShowQuoteModal(false)}
                  style={styles.modalCloseBtn}
                >
                  <X className="w-5 h-5 text-stone-500" />
                </TouchableOpacity>
              </View>

              {quoteSuccess ? (
                <View style={styles.successContainer}>
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mb-2" />
                  <Text style={styles.successTitle}>Quote Request Sent!</Text>
                  <Text style={styles.successSub}>
                    {venue.name} manager will contact you on WhatsApp / phone shortly.
                  </Text>
                </View>
              ) : (
                <form onSubmit={handleSubmitQuote}>
                  <ScrollView style={{ maxHeight: 420 }} showsVerticalScrollIndicator={false}>
                    <View style={styles.formGroup}>
                      <Text style={styles.formLabel}>Your Name *</Text>
                      <TextInput
                        style={styles.formInput}
                        placeholder="e.g. Ananya & Karthik"
                        value={guestName}
                        onChangeText={setGuestName}
                      />
                    </View>

                    <View style={styles.formGroup}>
                      <Text style={styles.formLabel}>Phone Number *</Text>
                      <TextInput
                        style={styles.formInput}
                        placeholder="e.g. +91 98765 43210"
                        keyboardType="phone-pad"
                        value={guestPhone}
                        onChangeText={setGuestPhone}
                      />
                    </View>

                    <View style={styles.formGroup}>
                      <Text style={styles.formLabel}>Wedding Date *</Text>
                      <TextInput
                        style={styles.formInput}
                        placeholder="DD/MM/YYYY"
                        value={eventDate}
                        onChangeText={setEventDate}
                      />
                    </View>

                    <View style={styles.formGroup}>
                      <Text style={styles.formLabel}>Expected Guests</Text>
                      <View style={styles.chipRow}>
                        {['200 - 500', '500 - 1,000', '1,000 - 2,500', '2,500+'].map((g) => (
                          <TouchableOpacity
                            key={g}
                            style={[
                              styles.selectChip,
                              guestCount === g && styles.selectChipActive,
                            ]}
                            onPress={() => setGuestCount(g)}
                          >
                            <Text
                              style={[
                                styles.selectChipText,
                                guestCount === g && styles.selectChipTextActive,
                              ]}
                            >
                              {g}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </View>

                    <View style={styles.formGroup}>
                      <Text style={styles.formLabel}>AC Guest Rooms Needed</Text>
                      <View style={styles.chipRow}>
                        {['None', '5 - 10 Rooms', '10 - 25 Rooms', '25+ Rooms'].map((r) => (
                          <TouchableOpacity
                            key={r}
                            style={[
                              styles.selectChip,
                              roomRequirement === r && styles.selectChipActive,
                            ]}
                            onPress={() => setRoomRequirement(r)}
                          >
                            <Text
                              style={[
                                styles.selectChipText,
                                roomRequirement === r && styles.selectChipTextActive,
                              ]}
                            >
                              {r}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </View>

                    <View style={styles.formGroup}>
                      <Text style={styles.formLabel}>Catering Preference</Text>
                      <View style={styles.chipRow}>
                        {['Pure Veg (In-house)', 'Non-Veg Allowed', 'External Catering'].map((c) => (
                          <TouchableOpacity
                            key={c}
                            style={[
                              styles.selectChip,
                              cateringPreference === c && styles.selectChipActive,
                            ]}
                            onPress={() => setCateringPreference(c)}
                          >
                            <Text
                              style={[
                                styles.selectChipText,
                                cateringPreference === c && styles.selectChipTextActive,
                              ]}
                            >
                              {c}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </View>

                    <View style={styles.formGroup}>
                      <Text style={styles.formLabel}>Notes & Specific Requests</Text>
                      <TextInput
                        style={[styles.formInput, { height: 70, paddingTop: 8 }]}
                        placeholder="e.g. Muhurtham morning timing, Mandapam decorator preferences..."
                        multiline
                        numberOfLines={3}
                        value={additionalNotes}
                        onChangeText={setAdditionalNotes}
                      />
                    </View>
                  </ScrollView>

                  <TouchableOpacity
                    style={styles.submitModalBtn}
                    onPress={handleSubmitQuote as any}
                    activeOpacity={0.85}
                  >
                    <Send className="w-4 h-4 text-white mr-1.5" />
                    <Text style={styles.submitModalBtnText}>Send Venue Quote Request</Text>
                  </TouchableOpacity>
                </form>
              )}
            </motion.div>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF7F2',
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
