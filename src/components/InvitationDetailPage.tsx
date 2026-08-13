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
  Mail,
  Users,
  CheckCircle2,
  Calendar,
  Send,
  X,
  Sparkles,
  Award,
  Package,
  Clock,
  Printer,
  FileText,
} from 'lucide-react';
import { motion } from 'motion/react';

export interface InvitationItem {
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
  minOrderQuantity: string;
  turnaroundTime: string;
  image: string;
  description: string;
  experience: string;
  customizationOptions: string;
  specialties: string[];
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

interface InvitationDetailPageProps {
  invite: InvitationItem;
  onBack: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
}

export const InvitationDetailPage: React.FC<InvitationDetailPageProps> = ({
  invite,
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
  const [cardQuantity, setCardQuantity] = useState<string>('250 Cards');
  const [customizationNeeds, setCustomizationNeeds] = useState<string>('Gold Foil + Custom Monogram');
  const [sampleKitRequested, setSampleKitRequested] = useState<string>('Yes, send sample kit');
  const [additionalNotes, setAdditionalNotes] = useState<string>('');

  const phoneNum = invite.phone || '+91 98765 43210';
  const whatsappNum = invite.whatsapp || '919876543210';

  const handleCall = () => {
    Linking.openURL(`tel:${phoneNum}`);
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Hi ${invite.name}, I loved your invitation designs on Tale of Two App. Please share your catalog and sample kit details.`
    );
    Linking.openURL(`https://wa.me/${whatsappNum}?text=${text}`);
  };

  const handleSubmitQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !guestPhone.trim()) {
      alert('Please fill in your name and phone number.');
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
      {/* TOP HEADER */}
      <View style={styles.topHeader}>
        <TouchableOpacity
          style={styles.iconCircleBtn}
          onPress={onBack}
          activeOpacity={0.8}
        >
          <ArrowLeft className="w-5 h-5 text-stone-800" />
        </TouchableOpacity>

        <Text style={styles.headerTitleText} numberOfLines={1}>
          {invite.name}
        </Text>

        <TouchableOpacity
          style={styles.iconCircleBtn}
          onPress={() => onToggleBookmark(invite.id)}
          activeOpacity={0.8}
        >
          <Heart
            className={`w-5 h-5 ${
              isBookmarked ? 'text-[#581420] fill-[#581420]' : 'text-stone-700'
            }`}
          />
        </TouchableOpacity>
      </View>

      {/* MAIN BODY */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* HERO IMAGE */}
        <View style={styles.heroWrapper}>
          <Image
            source={{ uri: invite.portfolio[activeImageIndex] || invite.image }}
            style={styles.heroImage}
            resizeMode="cover"
          />

          <View style={styles.tierBadge}>
            <Sparkles className="w-3.5 h-3.5 text-amber-600 mr-1" />
            <Text style={styles.tierBadgeText}>{invite.tier} Cards</Text>
          </View>

          <View style={styles.ratingOverlay}>
            <Star className="w-4 h-4 text-amber-400 fill-amber-400 mr-1" />
            <Text style={styles.ratingValueText}>{invite.rating}</Text>
            <Text style={styles.ratingCountText}>({invite.reviewsCount} reviews)</Text>
          </View>

          {/* Thumbnails */}
          <View style={styles.thumbRow}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {invite.portfolio.map((imgUrl, idx) => (
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

        {/* DETAILS HEADER */}
        <View style={styles.detailsCard}>
          <Text style={styles.inviteTitle}>{invite.name}</Text>

          <View style={styles.locationRow}>
            <MapPin className="w-4 h-4 text-[#581420] mr-1" />
            <Text style={styles.locationText}>
              {invite.location}, {invite.city}
            </Text>
          </View>

          <Text style={styles.categoryBadge}>{invite.category}</Text>

          <View style={styles.statsGrid}>
            <View style={styles.statBox}>
              <Package className="w-5 h-5 text-[#581420] mb-1" />
              <Text style={styles.statLabel}>Min Order</Text>
              <Text style={styles.statValue}>{invite.minOrderQuantity}</Text>
            </View>

            <View style={styles.statBox}>
              <Clock className="w-5 h-5 text-[#581420] mb-1" />
              <Text style={styles.statLabel}>Delivery Time</Text>
              <Text style={styles.statValue}>{invite.turnaroundTime}</Text>
            </View>

            <View style={styles.statBox}>
              <Printer className="w-5 h-5 text-[#581420] mb-1" />
              <Text style={styles.statLabel}>Customization</Text>
              <Text style={styles.statValue}>{invite.customizationOptions}</Text>
            </View>

            <View style={styles.statBox}>
              <Award className="w-5 h-5 text-[#581420] mb-1" />
              <Text style={styles.statLabel}>Experience</Text>
              <Text style={styles.statValue}>{invite.experience}</Text>
            </View>
          </View>
        </View>

        {/* ABOUT */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionHeaderTitle}>About the Designer</Text>
          <Text style={styles.descriptionText}>{invite.description}</Text>
        </View>

        {/* SPECIALTIES */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionHeaderTitle}>Invitation Features & Finishes</Text>
          <View style={styles.amenitiesGrid}>
            {invite.specialties.map((item, idx) => (
              <View key={idx} style={styles.amenityChip}>
                <CheckCircle2 className="w-4 h-4 text-[#581420] mr-2" />
                <Text style={styles.amenityText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* PACKAGES */}
        {invite.packages && invite.packages.length > 0 && (
          <View style={styles.sectionCard}>
            <Text style={styles.sectionHeaderTitle}>Card Pricing & Options</Text>
            {invite.packages.map((pkg, idx) => (
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
      </ScrollView>

      {/* BOTTOM ACTION BAR */}
      <View style={styles.bottomBar}>
        <View style={styles.bottomPriceCol}>
          <Text style={styles.bottomPriceLabel}>Starting Price</Text>
          <Text style={styles.bottomPriceValue}>{invite.startingPrice}</Text>
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
                  <Text style={styles.modalTitle}>Request Invitation Quote</Text>
                  <Text style={styles.modalSub}>{invite.name}</Text>
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
                    {invite.name} will share a custom design proof and quote via WhatsApp.
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
                      <Text style={styles.formLabel}>Card Quantity Required</Text>
                      <View style={styles.chipRow}>
                        {['100 Cards', '250 Cards', '500 Cards', '1,000+ Cards'].map((q) => (
                          <TouchableOpacity
                            key={q}
                            style={[
                              styles.selectChip,
                              cardQuantity === q && styles.selectChipActive,
                            ]}
                            onPress={() => setCardQuantity(q)}
                          >
                            <Text
                              style={[
                                styles.selectChipText,
                                cardQuantity === q && styles.selectChipTextActive,
                              ]}
                            >
                              {q}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </View>

                    <View style={styles.formGroup}>
                      <Text style={styles.formLabel}>Request Physical Sample Kit?</Text>
                      <View style={styles.chipRow}>
                        {['Yes, send sample kit', 'Digital proof only'].map((s) => (
                          <TouchableOpacity
                            key={s}
                            style={[
                              styles.selectChip,
                              sampleKitRequested === s && styles.selectChipActive,
                            ]}
                            onPress={() => setSampleKitRequested(s)}
                          >
                            <Text
                              style={[
                                styles.selectChipText,
                                sampleKitRequested === s && styles.selectChipTextActive,
                              ]}
                            >
                              {s}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </View>

                    <View style={styles.formGroup}>
                      <Text style={styles.formLabel}>Customization & Language Needs</Text>
                      <TextInput
                        style={[styles.formInput, { height: 70, paddingTop: 8 }]}
                        placeholder="e.g. Tamil & English inserts, Gold foil embossing, wax seal..."
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
                    <Text style={styles.submitModalBtnText}>Send Invitation Quote Request</Text>
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
  inviteTitle: {
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
