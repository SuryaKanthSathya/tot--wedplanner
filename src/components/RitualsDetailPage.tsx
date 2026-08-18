import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Linking,
  Modal,
} from 'react-native';
import {
  ChevronLeft,
  Share2,
  Heart,
  Star,
  MapPin,
  Award,
  Phone,
  MessageCircle,
  X,
  Clock,
  Globe,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Trophy,
  Instagram,
  FileText,
  Building2,
  Users,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { RitualsVendor, ReligionType } from './RitualsFlow';
import { QuotationScreen } from './QuotationScreen';
import { RequestQuoteModal } from './RequestQuoteModal';
import { WeddingInvoicePaymentModal } from './WeddingInvoicePaymentModal';
import { saveOrUpdateQuote } from '../utils/quotesManager';
import {
  getWeddingBookingByVendorId,
  saveOrUpdateWeddingBooking,
} from '../utils/weddingPaymentsManager';

const HINDU_SERVICES = [
  'Vedic Muhurtham & Kanyadaan Ceremony',
  'Sacred Vivaha Homam & Mangalsutra Dharanam',
  'Engagement & Nichayathartham Pooja',
  'Gauri Pooja & Vratham Rituals',
  'Saptapadi & Laja Homam Ceremonies',
  'Complete Samagri & Puja Item Arrangements',
];

const MUSLIM_SERVICES = [
  'Nikah Ceremony & Khutbah Recitation',
  'Certified Qazi & Imam Registration Services',
  'Ijab-o-Qubool Witness Coordination',
  'Dua-e-Khair & Spiritual Blessings',
  'Mahr Documentation & Formalities',
  'Pre-Marital Islamic Counseling Support',
];

const CHRISTIAN_SERVICES = [
  'Holy Matrimony Nuptial Mass & Blessing',
  'Vow Exchange & Ring Blessing Ceremony',
  'Ordained Priest / Pastor Officiating',
  'Order of Service & Liturgy Coordination',
  'Church Choir & Music Liturgy Guidance',
  'Marriage Certificate Formalities Support',
];

function getServicesByReligion(religion: ReligionType) {
  if (religion === 'Hindu') return HINDU_SERVICES;
  if (religion === 'Muslim') return MUSLIM_SERVICES;
  return CHRISTIAN_SERVICES;
}

function getPackageNameByReligion(religion: ReligionType) {
  if (religion === 'Hindu') return 'Traditional Vedic Vivaha Ceremony Package';
  if (religion === 'Muslim') return 'Authentic Nikah Ceremony & Qazi Package';
  return 'Sacred Holy Matrimony & Nuptial Blessing Package';
}

interface RitualsDetailPageProps {
  vendor: RitualsVendor;
  religion: ReligionType;
  onBack: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  bookingSource?: 'entire_wedding' | 'individual';
  onNavigateToMyWeddingPayments?: () => void;
  onNavigateToProfileMyBookings?: () => void;
  onNavigateToQuotesTab?: () => void;
}

export const RitualsDetailPage: React.FC<RitualsDetailPageProps> = ({
  vendor,
  religion,
  onBack,
  isBookmarked,
  onToggleBookmark,
  bookingSource = 'entire_wedding',
  onNavigateToMyWeddingPayments,
  onNavigateToProfileMyBookings,
  onNavigateToQuotesTab,
}) => {
  const [activePhotoModal, setActivePhotoModal] = useState<string | null>(null);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [showQuotationScreen, setShowQuotationScreen] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const [quoteStatus, setQuoteStatus] = useState<
    'initial' | 'requested' | 'response_ready' | 'confirmed' | 'partially_paid' | 'fully_paid' | 'rejected' | 'negotiating'
  >(() => {
    const existing = getWeddingBookingByVendorId(vendor.id);
    if (existing) return existing.status;
    return 'initial';
  });

  useEffect(() => {
    const handleUpdate = () => {
      const existing = getWeddingBookingByVendorId(vendor.id);
      if (existing) setQuoteStatus(existing.status);
    };
    window.addEventListener('tot_wedding_payments_updated', handleUpdate);
    return () => window.removeEventListener('tot_wedding_payments_updated', handleUpdate);
  }, [vendor.id]);

  const basePrice = parseInt(vendor.startingPrice.replace(/[^0-9]/g, ''), 10) || 15000;
  const packageName = getPackageNameByReligion(religion);
  const serviceOptions = getServicesByReligion(religion);

  const handleQuoteRequestSent = () => {
    setShowQuoteModal(false);
    setQuoteStatus('requested');
    saveOrUpdateWeddingBooking({
      vendorId: vendor.id,
      vendorName: vendor.name,
      category: `${religion} Rituals`,
      serviceType: 'Rituals & Ceremony',
      image: vendor.image,
      location: vendor.location || 'Chennai, Tamil Nadu',
      totalAmount: basePrice,
      status: 'requested',
    });

    saveOrUpdateQuote({
      id: `quote-${vendor.id}`,
      vendorId: vendor.id,
      vendorName: vendor.name,
      category: `${religion} Rituals`,
      packageName,
      status: 'requested',
      paymentStatus: 'pending',
      totalAmount: basePrice,
      advanceAmount: Math.round(basePrice * 0.3),
      remainingAmount: basePrice - Math.round(basePrice * 0.3),
      weddingDate: '24 Oct 2026',
      location: vendor.location,
      includedServices: serviceOptions.slice(0, 4),
      image: vendor.image,
    });

    setToastMessage('Quote Request Sent! Vendor reviewing...');

    setTimeout(() => {
      setQuoteStatus('response_ready');
      saveOrUpdateWeddingBooking({
        vendorId: vendor.id,
        vendorName: vendor.name,
        status: 'response_ready',
      });
      saveOrUpdateQuote({
        id: `quote-${vendor.id}`,
        status: 'response_ready',
      });
      setToastMessage('Quotation Received! Click "View Quote"');
      setTimeout(() => setToastMessage(null), 5000);
    }, 2500);
  };

  const portfolioImages = vendor.portfolio && vendor.portfolio.length >= 4 ? vendor.portfolio.slice(0, 4) : [
    vendor.image,
    'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?auto=format&fit=crop&w=600&q=80',
  ];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: vendor.name, text: `Check out ${vendor.name} on Tale of Two!`, url: window.location.href }).catch(() => {});
    } else {
      setToastMessage('Link copied to clipboard!');
      setTimeout(() => setToastMessage(null), 2500);
    }
  };

  const handleCallPhone = () => {
    const phoneNumber = vendor.phone ? vendor.phone.replace(/[^0-9+]/g, '') : '+919150197966';
    Linking.openURL(`tel:${phoneNumber}`).catch(() => {
      setToastMessage(`Call ${vendor.phone || '+91 91501 97966'}`);
      setTimeout(() => setToastMessage(null), 3000);
    });
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(`Hi ${vendor.name}, I found your profile on Tale of Two and would like to check availability for our wedding rituals ceremony.`);
    Linking.openURL(`https://wa.me/919150197966?text=${text}`).catch(() => {
      setToastMessage('Opening WhatsApp...');
      setTimeout(() => setToastMessage(null), 2000);
    });
  };

  return (
    <View style={styles.container}>
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-6 left-1/2 -translate-x-1/2 z-[300] bg-[#2A2425] text-white px-4 py-2.5 rounded-full text-xs font-semibold shadow-xl flex items-center gap-2 w-max max-w-[90%] text-center"
          >
            <Sparkles className="w-4 h-4 text-[#C28E38]" />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <View style={styles.navHeader}>
        <TouchableOpacity style={styles.navBtn} onPress={onBack} activeOpacity={0.7}>
          <ChevronLeft className="w-5 h-5 text-[#2A2425]" />
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <TouchableOpacity style={styles.navBtn} onPress={handleShare} activeOpacity={0.7}>
            <Share2 className="w-4.5 h-4.5 text-[#2A2425]" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navBtn} onPress={() => onToggleBookmark(vendor.id)} activeOpacity={0.7}>
            <Heart className={`w-4.5 h-4.5 ${isBookmarked ? 'text-[#8B1E2F] fill-[#8B1E2F]' : 'text-[#2A2425]'}`} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        <div className="w-full max-w-4xl mx-auto">
          <View style={styles.heroImgWrapper}>
            <img
              src={vendor.image}
              alt={vendor.name}
              className="w-full h-full object-cover object-[center_15%]"
            />
            <View style={styles.heroDimOverlay} />
            <View style={styles.heroTierBadge}>
              <Award className="w-3.5 h-3.5 text-amber-700 mr-1" />
              <Text style={styles.heroTierText}>{vendor.tier}</Text>
            </View>
          </View>

          <View style={styles.contentPad}>
            <View style={styles.nameRow}>
              <Text style={styles.vendorName}>{vendor.name}</Text>
              <View style={styles.ratingBadge}>
                <Star className="w-4 h-4 text-amber-500 fill-amber-500 mr-1" />
                <Text style={styles.ratingText}>{(vendor.rating || 4.9).toFixed(1)}</Text>
                <Text style={styles.reviewsText}> ({vendor.reviewsCount || 48})</Text>
              </View>
            </View>

            <Text style={styles.categoryText}>{vendor.category}</Text>

            <View style={styles.infoRow}>
              {vendor.experience && (
                <View style={styles.infoChip}>
                  <Clock className="w-3.5 h-3.5 text-[#581420] mr-1.5" />
                  <Text style={styles.infoChipText}>{vendor.experience}</Text>
                </View>
              )}
              <View style={styles.infoChip}>
                <MapPin className="w-3.5 h-3.5 text-[#581420] mr-1.5" />
                <Text style={styles.infoChipText}>{vendor.location}, Tamil Nadu</Text>
              </View>
              <View style={styles.infoChip}>
                <Building2 className="w-3.5 h-3.5 text-[#581420] mr-1.5" />
                <Text style={styles.infoChipText}>Mandapam & Home</Text>
              </View>
              <View style={styles.infoChip}>
                <Users className="w-3.5 h-3.5 text-[#581420] mr-1.5" />
                <Text style={styles.infoChipText}>{religion} Tradition</Text>
              </View>
            </View>

            {vendor.languages && vendor.languages.length > 0 && (
              <View style={styles.section}>
                <View style={styles.sectionRow}>
                  <Globe className="w-4 h-4 text-[#581420] mr-2" />
                  <Text style={styles.sectionLabel}>Ceremony Languages</Text>
                </View>
                <Text style={styles.sectionContent}>{vendor.languages.join(' • ')}</Text>
              </View>
            )}

            <View style={styles.trustBadgesGrid}>
              <View style={styles.trustCard}>
                <View style={styles.googleIconBadge}>
                  <Text style={styles.googleIconG}>G</Text>
                </View>
                <Text style={styles.trustCardTitle}>Google Reviews</Text>
                <Text style={styles.trustCardVal}>{(vendor.rating || 4.9).toFixed(1)} ★</Text>
              </View>

              <View style={styles.trustCard}>
                <Instagram className="w-5 h-5 text-[#E1306C] mb-1" />
                <Text style={styles.trustCardTitle}>Instagram</Text>
                <Text style={styles.trustCardVal} numberOfLines={1}>
                  @{vendor.name.toLowerCase().replace(/[^a-z0-9]/g, '')}
                </Text>
              </View>

              <View style={styles.trustCard}>
                <Trophy className="w-5 h-5 text-[#D97706] mb-1" />
                <Text style={styles.trustCardTitle}>Heritage</Text>
                <Text style={styles.trustCardVal}>Vedic Certified</Text>
              </View>

              <View style={styles.trustCard}>
                <ShieldCheck className="w-5 h-5 text-[#16A34A] mb-1" />
                <Text style={styles.trustCardTitle}>TOT Certified</Text>
                <Text style={styles.trustCardVal}>Verified Specialist</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.section}>
              <Text style={styles.sectionLabel}>About Officiant & Services</Text>
              <Text style={styles.sectionContent}>
                {vendor.description ||
                  `${vendor.name} is an esteemed wedding ritual specialist offering authentic ${religion} wedding ceremonies across Tamil Nadu with deep adherence to sacred traditions and flawless execution.`}
              </Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.section}>
              <Text style={styles.sectionLabel}>Ceremonies & Rituals Offered</Text>
              <View style={{ gap: 10, marginTop: 8 }}>
                {serviceOptions.map((s) => (
                  <View key={s} style={styles.serviceItem}>
                    <CheckCircle2 className="w-4.5 h-4.5 text-[#15803D] mr-2.5 flex-shrink-0" />
                    <Text style={styles.serviceItemText}>{s}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.section}>
              <Text style={styles.sectionLabel}>Ceremony Portfolio</Text>
              <View style={styles.portfolioGrid}>
                {portfolioImages.map((img, idx) => (
                  <TouchableOpacity
                    key={idx}
                    style={styles.portfolioImgWrapper}
                    onPress={() => setActivePhotoModal(img)}
                    activeOpacity={0.85}
                  >
                    <img
                      src={img}
                      alt={`Portfolio ${idx + 1}`}
                      className="w-full h-full object-cover object-[center_20%]"
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.priceRow}>
              <View>
                <Text style={styles.priceLabel}>Starting Price / Dakshina</Text>
                <Text style={styles.priceSub}>All basic ceremonial materials included</Text>
              </View>
              <Text style={styles.priceValue}>{vendor.startingPrice}</Text>
            </View>
          </View>
        </div>
      </ScrollView>

      <View style={styles.bottomBar}>
        <div className="w-full max-w-4xl mx-auto flex items-center gap-2">
          <TouchableOpacity style={styles.btnWhatsApp} onPress={handleWhatsApp} activeOpacity={0.85}>
            <MessageCircle className="w-4 h-4 text-[#10B981] mr-1.5" />
            <Text style={styles.btnWhatsAppText}>WhatsApp</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnCall} onPress={handleCallPhone} activeOpacity={0.85}>
            <Phone className="w-4 h-4 text-[#581420] mr-1.5" />
            <Text style={styles.btnCallText}>Call</Text>
          </TouchableOpacity>

          {quoteStatus === 'initial' && (
            <TouchableOpacity style={styles.btnQuote} onPress={() => setShowQuoteModal(true)} activeOpacity={0.85}>
              <Sparkles className="w-4 h-4 text-white mr-1.5" />
              <Text style={styles.btnQuoteText}>Req Quote</Text>
            </TouchableOpacity>
          )}

          {quoteStatus === 'requested' && (
            <TouchableOpacity style={[styles.btnQuote, { backgroundColor: '#F59E0B' }]} disabled activeOpacity={1}>
              <Clock className="w-4 h-4 text-white mr-1.5" />
              <Text style={[styles.btnQuoteText, { color: '#FFFFFF' }]}>Pending Response</Text>
            </TouchableOpacity>
          )}

          {quoteStatus === 'negotiating' && (
            <TouchableOpacity style={[styles.btnQuote, { backgroundColor: '#F59E0B' }]} disabled activeOpacity={1}>
              <Clock className="w-4 h-4 text-white mr-1.5" />
              <Text style={[styles.btnQuoteText, { color: '#FFFFFF' }]}>Negotiating...</Text>
            </TouchableOpacity>
          )}

          {quoteStatus === 'rejected' && (
            <TouchableOpacity style={[styles.btnQuote, { backgroundColor: '#DC2626' }]} onPress={() => setQuoteStatus('initial')} activeOpacity={0.85}>
              <Text style={[styles.btnQuoteText, { color: '#FFFFFF' }]}>Quote Rejected (Reset)</Text>
            </TouchableOpacity>
          )}

          {quoteStatus === 'response_ready' && (
            <TouchableOpacity style={[styles.btnQuote, { backgroundColor: '#10B981' }]} onPress={() => setShowQuotationScreen(true)} activeOpacity={0.85}>
              <CheckCircle2 className="w-4 h-4 text-white mr-1.5" />
              <Text style={[styles.btnQuoteText, { color: '#FFFFFF' }]}>View Quote</Text>
            </TouchableOpacity>
          )}

          {(quoteStatus === 'confirmed' || quoteStatus === 'partially_paid' || quoteStatus === 'fully_paid') && (
            <TouchableOpacity
              style={[styles.btnQuote, { backgroundColor: '#581420' }]}
              onPress={() => setShowInvoiceModal(true)}
              activeOpacity={0.85}
            >
              <FileText className="w-4 h-4 text-white mr-1.5" />
              <Text style={styles.btnQuoteText}>View Invoice</Text>
            </TouchableOpacity>
          )}
        </div>
      </View>

      {activePhotoModal && (
        <Modal transparent animationType="fade" visible={Boolean(activePhotoModal)}>
          <View style={styles.lightboxBackdrop}>
            <TouchableOpacity style={styles.lightboxCloseBtn} onPress={() => setActivePhotoModal(null)}>
              <X className="w-6 h-6 text-white" />
            </TouchableOpacity>
            <Image source={{ uri: activePhotoModal }} style={styles.lightboxImage} resizeMode="contain" />
          </View>
        </Modal>
      )}

      <RequestQuoteModal
        visible={showQuoteModal}
        vendorName={vendor.name}
        vendorLocation={vendor.location}
        onQuoteSent={handleQuoteRequestSent}
        onClose={() => setShowQuoteModal(false)}
      />

      <QuotationScreen
        visible={showQuotationScreen}
        onClose={() => setShowQuotationScreen(false)}
        quoteStatus={quoteStatus}
        setQuoteStatus={setQuoteStatus}
        vendorId={vendor.id}
        vendorName={vendor.name}
        vendorImage={vendor.image}
        vendorLocation={vendor.location}
        startingPrice={vendor.startingPrice}
        category={`${religion} Rituals`}
        packageName={packageName}
        includedServices={serviceOptions.slice(0, 4)}
        onNavigateToQuotesTab={() => {
          setShowQuotationScreen(false);
          setShowInvoiceModal(true);
        }}
        onBack={() => setShowQuotationScreen(false)}
        onShowToast={(msg) => setToastMessage(msg)}
      />

      <WeddingInvoicePaymentModal
        visible={showInvoiceModal}
        onClose={() => setShowInvoiceModal(false)}
        vendorId={vendor.id}
        vendorName={vendor.name}
        vendorImage={vendor.image}
        vendorLocation={vendor.location}
        category={`${religion} Rituals`}
        startingPrice={vendor.startingPrice || '₹15,000'}
        bookingSource={bookingSource}
        onNavigateToMyWeddingPayments={() => {
          setShowInvoiceModal(false);
          if (onNavigateToMyWeddingPayments) {
            onNavigateToMyWeddingPayments();
          } else {
            window.dispatchEvent(
              new CustomEvent('tot_switch_to_my_wedding_payments', { detail: { vendorId: vendor.id } })
            );
          }
        }}
        onNavigateToProfileMyBookings={() => {
          setShowInvoiceModal(false);
          if (onNavigateToProfileMyBookings) {
            onNavigateToProfileMyBookings();
          } else {
            window.dispatchEvent(
              new CustomEvent('tot_switch_to_profile_my_bookings', { detail: { vendorId: vendor.id } })
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
  navHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  navBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E8DFD5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },
  heroImgWrapper: { width: '100%', height: 340, position: 'relative', overflow: 'hidden', backgroundColor: '#F3ECE3' },
  heroImg: { width: '100%', height: '100%' },
  heroDimOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 80, backgroundColor: 'transparent' },
  heroTierBadge: {
    position: 'absolute',
    bottom: 14,
    left: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FDE68A',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  heroTierText: { color: '#92400E', fontSize: 11, fontWeight: '800', textTransform: 'uppercase' as any },
  contentPad: { paddingHorizontal: 16, paddingTop: 18, backgroundColor: '#FFFFFF', borderBottomLeftRadius: 24, borderBottomRightRadius: 24 },
  nameRow: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 4 },
  vendorName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#2A2425',
    fontFamily: 'Playfair Display, serif',
    flex: 1,
    marginRight: 8,
    lineHeight: 26,
  },
  ratingBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFBEB', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 10, marginTop: 2 },
  ratingText: { fontSize: 13, fontWeight: '800', color: '#92400E' },
  reviewsText: { fontSize: 11, color: '#B45309' },
  categoryText: { fontSize: 13, color: '#581420', fontWeight: '600', marginBottom: 12 },
  infoRow: { flexDirection: 'row', flexWrap: 'wrap' as any, gap: 8, marginBottom: 14 },
  infoChip: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F5EEE6', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10 },
  infoChipText: { fontSize: 12, color: '#2A2425', fontWeight: '600' },
  section: { marginBottom: 6 },
  sectionRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  sectionLabel: { fontSize: 14, fontWeight: '800', color: '#2A2425', marginBottom: 6, fontFamily: 'Playfair Display, serif' },
  sectionContent: { fontSize: 13, color: '#4A3A3C', lineHeight: 21 },
  divider: { height: 1, backgroundColor: '#F0E8E0', marginVertical: 14 },
  serviceItem: { flexDirection: 'row', alignItems: 'center' },
  serviceItemText: { fontSize: 13, color: '#3D3234', fontWeight: '500', flex: 1, lineHeight: 18 },
  portfolioGrid: { flexDirection: 'row', flexWrap: 'wrap' as any, gap: 8, marginTop: 6 },
  portfolioImgWrapper: { width: '48%', height: 120, borderRadius: 12, overflow: 'hidden', backgroundColor: '#F3ECE3' },
  portfolioImg: { width: '100%', height: '100%', objectFit: 'cover' as any, objectPosition: 'center 20%' as any },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F5EEE6', padding: 14, borderRadius: 14, marginBottom: 14 },
  priceLabel: { fontSize: 13, color: '#2A2425', fontWeight: '700' },
  priceSub: { fontSize: 11, color: '#78696A', marginTop: 2 },
  priceValue: { fontSize: 17, fontWeight: '800', color: '#581420' },
  trustBadgesGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 14,
    gap: 6,
  },
  trustCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 4,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ECE4DB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
  },
  googleIconBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#4285F4',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  googleIconG: { color: '#FFFFFF', fontSize: 11, fontWeight: '900' },
  trustCardTitle: { fontSize: 10, color: '#8C7A7C', fontWeight: '600', textAlign: 'center' },
  trustCardVal: { fontSize: 11, fontWeight: '800', color: '#2A2425', textAlign: 'center', marginTop: 2 },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FAF7F2',
    borderTopWidth: 1,
    borderTopColor: '#EFE7DE',
  },
  btnWhatsApp: { flex: 1, height: 44, borderRadius: 22, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#10B981', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' },
  btnWhatsAppText: { color: '#10B981', fontSize: 13, fontWeight: '700' },
  btnCall: { flex: 0.9, height: 44, borderRadius: 22, backgroundColor: '#FFFFFF', borderWidth: 1.5, borderColor: '#581420', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' },
  btnCallText: { color: '#581420', fontSize: 13, fontWeight: '700' },
  btnQuote: { flex: 1.6, height: 44, borderRadius: 22, backgroundColor: '#581420', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' },
  btnQuoteText: { color: '#FFFFFF', fontSize: 13, fontWeight: '700' },
  lightboxBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.92)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  lightboxCloseBtn: { position: 'absolute', top: 40, right: 20, zIndex: 10, width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center' },
  lightboxImage: { width: '100%', height: '80%' },
});
