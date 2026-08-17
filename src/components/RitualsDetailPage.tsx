import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Linking,
  TextInput,
  Modal,
} from 'react-native-web';
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
  Send,
  Globe,
  CheckCircle2,
  Sparkles,
  Calendar,
  Check,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { RitualsVendor, ReligionType } from './RitualsFlow';
import { QuotationScreen } from './QuotationScreen';
import { saveOrUpdateQuote } from '../utils/quotesManager';

const HINDU_SERVICES = [
  'Wedding Ceremony',
  'Muhurtham',
  'Homam',
  'Wedding Pooja',
  'Engagement Ceremony',
  'Other',
];

const MUSLIM_SERVICES = [
  'Nikah Ceremony',
  'Nikah Khutbah',
  'Imam',
  'Aalim',
  'Qazi',
  'Other',
];

const CHRISTIAN_SERVICES = [
  'Wedding Ceremony',
  'Priest / Father',
  'Pastor / Minister',
  'Wedding Blessing',
  'Other',
];

function getServicesByReligion(religion: ReligionType) {
  if (religion === 'Hindu') return HINDU_SERVICES;
  if (religion === 'Muslim') return MUSLIM_SERVICES;
  return CHRISTIAN_SERVICES;
}

function getQuoteTitleByReligion(religion: ReligionType) {
  if (religion === 'Hindu') return 'Hindu Wedding Ceremony Quote Request';
  if (religion === 'Muslim') return 'Muslim Wedding Ceremony Quote Request';
  return 'Christian Wedding Ceremony Quote Request';
}

interface RitualsDetailPageProps {
  vendor: RitualsVendor;
  religion: ReligionType;
  onBack: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  onNavigateToQuotesTab?: () => void;
}

export const RitualsDetailPage: React.FC<RitualsDetailPageProps> = ({
  vendor,
  religion,
  onBack,
  isBookmarked,
  onToggleBookmark,
  onNavigateToQuotesTab,
}) => {
  const [showQuoteModal, setShowQuoteModal] = useState(false);
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
    try {
      const savedQuotesJson = localStorage.getItem('tot_confirmed_quotes');
      if (savedQuotesJson) {
        const quotes = JSON.parse(savedQuotesJson);
        const match = quotes.find((q: any) => q.id === `quote-${vendor.id}`);
        if (match) {
          if (match.paymentStatus === 'fully_paid') return 'fully_paid';
          if (match.paymentStatus === 'partially_paid') return 'partially_paid';
          if (match.status === 'confirmed') return 'confirmed';
        }
      }
      const statusesJson = localStorage.getItem('tot_quote_statuses');
      if (statusesJson) {
        const statuses = JSON.parse(statusesJson);
        if (statuses[vendor.id]) return statuses[vendor.id];
      }
    } catch (e) { console.warn(e); }
    return 'initial';
  });

  const updateQuoteStatus = (newStatus: typeof quoteStatus) => {
    setQuoteStatus(newStatus);
    try {
      const statusesJson = localStorage.getItem('tot_quote_statuses') || '{}';
      const statuses = JSON.parse(statusesJson);
      statuses[vendor.id] = newStatus;
      localStorage.setItem('tot_quote_statuses', JSON.stringify(statuses));
    } catch (e) { console.warn(e); }
  };

  const [showQuotationScreen, setShowQuotationScreen] = useState(false);

  const basePrice = parseInt(vendor.startingPrice.replace(/[^0-9]/g, ''), 10) || 15000;
  
  // Simple Quote Form state
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [weddingDate, setWeddingDate] = useState('');
  const [weddingLocation, setWeddingLocation] = useState(vendor.location || '');
  const [customerName, setCustomerName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [quoteFormError, setQuoteFormError] = useState<string | null>(null);
  const [quoteFormSuccess, setQuoteFormSuccess] = useState(false);

  const toggleService = (s: string) => {
    setQuoteFormError(null);
    setSelectedServices((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);
  };

  const handleQuoteSubmit = () => {
    if (selectedServices.length === 0) { setQuoteFormError('Please select at least one service.'); return; }
    if (!weddingDate.trim()) { setQuoteFormError('Please enter your wedding date.'); return; }
    if (!weddingLocation.trim()) { setQuoteFormError('Please enter the wedding location.'); return; }
    if (!customerName.trim()) { setQuoteFormError('Please enter your name.'); return; }
    if (!mobileNumber.trim()) { setQuoteFormError('Please enter your mobile number.'); return; }

    setQuoteFormError(null);
    setQuoteFormSuccess(true);

    const updatedDetails = {
      packageName: `${religion} Wedding Ceremony`,
      includedServices: selectedServices,
      weddingDate: weddingDate || '24 Oct 2026',
      location: weddingLocation || vendor.location,
      totalAmount: basePrice,
      advanceAmount: Math.round(basePrice * 0.3),
      remainingAmount: basePrice - Math.round(basePrice * 0.3)
    };

    setShowQuoteModal(false);
    setQuoteFormSuccess(false);

    updateQuoteStatus('requested');
    saveOrUpdateQuote({
      id: `quote-${vendor.id}`,
      vendorId: vendor.id,
      vendorName: vendor.name,
      category: `${religion} Rituals`,
      packageName: updatedDetails.packageName,
      status: 'requested',
      paymentStatus: 'pending',
      totalAmount: updatedDetails.totalAmount,
      advanceAmount: updatedDetails.advanceAmount,
      remainingAmount: updatedDetails.remainingAmount,
      weddingDate: updatedDetails.weddingDate,
      location: updatedDetails.location,
      includedServices: updatedDetails.includedServices,
      image: vendor.image,
    });
    setToastMessage('Quote Request Sent! Added to My Quotes');
    setTimeout(() => setToastMessage(null), 3000);

    setTimeout(() => {
      updateQuoteStatus('response_ready');
      saveOrUpdateQuote({ id: `quote-${vendor.id}`, status: 'response_ready' });
      setToastMessage('Vendor Quotation Received! Click "View Quote"');
      setTimeout(() => setToastMessage(null), 5000);
    }, 3000);
  };

  const portfolioImages = vendor.portfolio && vendor.portfolio.length >= 4 ? vendor.portfolio.slice(0, 4) : [
    vendor.image,
    'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?auto=format&fit=crop&w=600&q=80',
  ];

  const handleShare = () => {
    if (navigator.share) { navigator.share({ title: vendor.name, text: `Check out ${vendor.name}!`, url: window.location.href }).catch(() => {}); }
    else { setToastMessage('Link copied to clipboard!'); setTimeout(() => setToastMessage(null), 2500); }
  };

  const handleCallPhone = () => {
    const phoneNumber = vendor.phone ? vendor.phone.replace(/[^0-9+]/g, '') : '+919150197966';
    Linking.openURL(`tel:${phoneNumber}`).catch(() => { setToastMessage(`Call ${vendor.phone || '+91 91501 97966'}`); setTimeout(() => setToastMessage(null), 3000); });
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(`Hi ${vendor.name}, I found your profile on Tale of Two and would like to check availability.`);
    Linking.openURL(`https://wa.me/919150197966?text=${text}`).catch(() => { setToastMessage('Opening WhatsApp...'); setTimeout(() => setToastMessage(null), 2000); });
  };

  const serviceOptions = getServicesByReligion(religion);
  const quoteTitle = getQuoteTitleByReligion(religion);

  return (
    <View style={styles.container}>
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="absolute top-6 left-1/2 -translate-x-1/2 z-[300] bg-[#2A2425] text-white px-4 py-2.5 rounded-full text-xs font-semibold shadow-xl flex items-center gap-2 w-max max-w-[90%] text-center"
          >
            <Sparkles className="w-4 h-4 text-[#C28E38]" />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* NAV HEADER */}
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
        {/* HERO IMAGE */}
        <View style={styles.heroImgWrapper}>
          <Image source={{ uri: vendor.image }} style={styles.heroImg} />
          <View style={styles.heroDimOverlay} />
          <View style={styles.heroTierBadge}>
            <Award className="w-3.5 h-3.5 text-amber-700 mr-1" />
            <Text style={styles.heroTierText}>{vendor.tier}</Text>
          </View>
        </View>

        {/* CONTENT */}
        <View style={styles.contentPad}>
          {/* Name + Rating */}
          <View style={styles.nameRow}>
            <Text style={styles.vendorName}>{vendor.name}</Text>
            <View style={styles.ratingBadge}>
              <Star className="w-4 h-4 text-amber-500 fill-amber-500 mr-1" />
              <Text style={styles.ratingText}>{vendor.rating.toFixed(1)}</Text>
              <Text style={styles.reviewsText}> ({vendor.reviewsCount})</Text>
            </View>
          </View>

          {/* Category */}
          <Text style={styles.categoryText}>{vendor.category}</Text>

          {/* Info Row */}
          <View style={styles.infoRow}>
            {vendor.experience && (
              <View style={styles.infoChip}>
                <Clock className="w-3.5 h-3.5 text-[#581420] mr-1" />
                <Text style={styles.infoChipText}>{vendor.experience}</Text>
              </View>
            )}
            <View style={styles.infoChip}>
              <MapPin className="w-3.5 h-3.5 text-[#581420] mr-1" />
              <Text style={styles.infoChipText}>{vendor.location}</Text>
            </View>
          </View>

          {/* Languages */}
          {vendor.languages && vendor.languages.length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionRow}>
                <Globe className="w-4 h-4 text-[#581420] mr-2" />
                <Text style={styles.sectionLabel}>Languages</Text>
              </View>
              <Text style={styles.sectionContent}>{vendor.languages.join(', ')}</Text>
            </View>
          )}

          <View style={styles.divider} />

          {/* About */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>About</Text>
            <Text style={styles.sectionContent}>{vendor.description}</Text>
          </View>

          <View style={styles.divider} />

          {/* Services */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Services Offered</Text>
            <View style={{ gap: 8, marginTop: 8 }}>
              {serviceOptions.map((s) => (
                <View key={s} style={styles.serviceItem}>
                  <CheckCircle2 className="w-4 h-4 text-[#581420] mr-2" />
                  <Text style={styles.serviceItemText}>{s}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.divider} />

          {/* Portfolio */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Portfolio</Text>
            <View style={styles.portfolioGrid}>
              {portfolioImages.map((img, idx) => (
                <Image key={idx} source={{ uri: img }} style={styles.portfolioImg} />
              ))}
            </View>
          </View>

          <View style={styles.divider} />

          {/* Starting Price */}
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Starting Price</Text>
            <Text style={styles.priceValue}>{vendor.startingPrice}</Text>
          </View>
        </View>
      </ScrollView>

      {/* BOTTOM BUTTONS */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.btnWhatsApp} onPress={handleWhatsApp} activeOpacity={0.85}>
          <MessageCircle className="w-4 h-4 text-[#10B981] mr-1.5" />
          <Text style={styles.btnWhatsAppText}>WhatsApp</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnCall} onPress={handleCallPhone} activeOpacity={0.85}>
          <Phone className="w-4 h-4 text-[#581420] mr-1.5" />
          <Text style={styles.btnCallText}>Call Now</Text>
        </TouchableOpacity>
        
        {quoteStatus === 'initial' && (
          <TouchableOpacity style={styles.btnQuote} onPress={() => setShowQuoteModal(true)} activeOpacity={0.85}>
            <Text style={styles.btnQuoteText}>Req Quote</Text>
          </TouchableOpacity>
        )}

        {quoteStatus === 'requested' && (
          <TouchableOpacity style={[styles.btnQuote, { backgroundColor: '#F59E0B' }]} disabled activeOpacity={1}>
            <Text style={[styles.btnQuoteText, { color: '#FFFFFF' }]}>Pending Response</Text>
          </TouchableOpacity>
        )}

        {quoteStatus === 'negotiating' && (
          <TouchableOpacity style={[styles.btnQuote, { backgroundColor: '#F59E0B' }]} disabled activeOpacity={1}>
            <Text style={[styles.btnQuoteText, { color: '#FFFFFF' }]}>Negotiating Price...</Text>
          </TouchableOpacity>
        )}

        {quoteStatus === 'rejected' && (
          <TouchableOpacity style={[styles.btnQuote, { backgroundColor: '#DC2626' }]} onPress={() => updateQuoteStatus('initial')} activeOpacity={0.85}>
            <Text style={[styles.btnQuoteText, { color: '#FFFFFF' }]}>Quote Rejected (Reset)</Text>
          </TouchableOpacity>
        )}

        {quoteStatus === 'response_ready' && (
          <TouchableOpacity style={[styles.btnQuote, { backgroundColor: '#10B981' }]} onPress={() => setShowQuotationScreen(true)} activeOpacity={0.85}>
            <Text style={[styles.btnQuoteText, { color: '#FFFFFF' }]}>View Quote</Text>
          </TouchableOpacity>
        )}

        {(quoteStatus === 'confirmed' || quoteStatus === 'partially_paid' || quoteStatus === 'fully_paid') && (
          <TouchableOpacity style={[styles.btnQuote, { backgroundColor: '#15803D' }]} onPress={() => setShowQuotationScreen(true)} activeOpacity={0.85}>
            <Text style={[styles.btnQuoteText, { color: '#FFFFFF' }]}>
              {quoteStatus === 'fully_paid' ? 'Fully Paid' : quoteStatus === 'partially_paid' ? 'Partially Paid' : 'Quote Confirmed'}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* SIMPLE QUOTE FORM MODAL */}
      <AnimatePresence>
        {showQuoteModal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 z-[100] flex flex-col justify-end bg-black/65"
            onClick={(e) => { if (e.target === e.currentTarget) setShowQuoteModal(false); }}
          >
            <motion.div
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="w-full bg-[#FAF7F2] rounded-t-3xl p-4 pt-5 pb-6 relative max-h-[88%] flex flex-col shadow-2xl"
            >
              <TouchableOpacity style={styles.modalCloseBtn} onPress={() => setShowQuoteModal(false)} activeOpacity={0.7}>
                <X className="w-5 h-5 text-[#2A2425]" />
              </TouchableOpacity>

              <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
                {quoteFormSuccess ? (
                  <View style={{ alignItems: 'center', paddingVertical: 40 }}>
                    <CheckCircle2 className="w-16 h-16 text-[#15803D] mb-4" />
                    <Text style={styles.successTitle}>Quote Request Sent!</Text>
                    <Text style={styles.successSub}>We will connect you with {vendor.name} shortly.</Text>
                  </View>
                ) : (
                  <>
                    <Text style={styles.modalTitle}>{quoteTitle}</Text>
                    <Text style={styles.modalVendor}>{vendor.name}</Text>

                    {/* Services */}
                    <Text style={styles.fieldLabel}>Services Needed</Text>
                    <View style={styles.servicesGrid}>
                      {serviceOptions.map((s) => {
                        const sel = selectedServices.includes(s);
                        return (
                          <TouchableOpacity key={s} style={[styles.serviceChip, sel && styles.serviceChipActive]} onPress={() => toggleService(s)} activeOpacity={0.8}>
                            {sel && <Check className="w-3.5 h-3.5 text-white mr-1" />}
                            <Text style={[styles.serviceChipText, sel && styles.serviceChipTextActive]}>{s}</Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>

                    {/* Wedding Date */}
                    <Text style={styles.fieldLabel}>Wedding Date</Text>
                    <View style={styles.inputRow}>
                      <Calendar className="w-4 h-4 text-[#8C7A7C] mr-2" />
                      <TextInput
                        style={styles.textInput}
                        placeholder="DD/MM/YYYY or e.g. 24 Oct 2026"
                        placeholderTextColor="#8C7A7C"
                        value={weddingDate}
                        onChangeText={setWeddingDate}
                      />
                    </View>

                    {/* Location */}
                    <Text style={styles.fieldLabel}>Wedding Location</Text>
                    <View style={styles.inputRow}>
                      <MapPin className="w-4 h-4 text-[#8C7A7C] mr-2" />
                      <TextInput
                        style={styles.textInput}
                        placeholder="Enter city or venue"
                        placeholderTextColor="#8C7A7C"
                        value={weddingLocation}
                        onChangeText={setWeddingLocation}
                      />
                    </View>

                    {/* Name */}
                    <Text style={styles.fieldLabel}>Your Name</Text>
                    <View style={styles.inputRow}>
                      <TextInput
                        style={[styles.textInput, { paddingLeft: 4 }]}
                        placeholder="Full Name"
                        placeholderTextColor="#8C7A7C"
                        value={customerName}
                        onChangeText={setCustomerName}
                      />
                    </View>

                    {/* Mobile */}
                    <Text style={styles.fieldLabel}>Mobile Number</Text>
                    <View style={styles.inputRow}>
                      <TextInput
                        style={[styles.textInput, { paddingLeft: 4 }]}
                        placeholder="+91 XXXXX XXXXX"
                        placeholderTextColor="#8C7A7C"
                        keyboardType="phone-pad"
                        value={mobileNumber}
                        onChangeText={setMobileNumber}
                      />
                    </View>

                    {quoteFormError && (
                      <View style={styles.errorRow}>
                        <Text style={styles.errorText}>{quoteFormError}</Text>
                      </View>
                    )}

                    <TouchableOpacity style={styles.submitBtn} onPress={handleQuoteSubmit} activeOpacity={0.85}>
                      <Send className="w-4 h-4 text-white mr-2" />
                      <Text style={styles.submitBtnText}>Send Quote Request</Text>
                    </TouchableOpacity>
                  </>
                )}
              </ScrollView>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <QuotationScreen
        visible={showQuotationScreen}
        onClose={() => setShowQuotationScreen(false)}
        quoteStatus={quoteStatus}
        setQuoteStatus={updateQuoteStatus}
        vendorId={vendor.id}
        vendorName={vendor.name}
        vendorImage={vendor.image}
        vendorLocation={vendor.location}
        startingPrice={vendor.startingPrice}
        category={vendor.category}
        packageName={`${religion} Wedding Ceremony`}
        includedServices={selectedServices.length > 0 ? selectedServices : getServicesByReligion(religion).slice(0, 3)}
        onNavigateToQuotesTab={onNavigateToQuotesTab}
        onBack={() => setShowQuotationScreen(false)}
        onShowToast={(msg) => setToastMessage(msg)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, height: '100%' as any, maxHeight: '100%' as any, width: '100%', backgroundColor: '#FAF7F2', overflow: 'hidden' as any, display: 'flex' as any, flexDirection: 'column' },
  navHeader: { position: 'absolute', top: 0, left: 0, right: 0, zIndex: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingTop: 12, paddingBottom: 8 },
  navBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#E8DFD5', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.08, shadowRadius: 2 },
  heroImgWrapper: { width: '100%', height: 280, position: 'relative' },
  heroImg: { width: '100%', height: '100%' },
  heroDimOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 80, backgroundColor: 'transparent' },
  heroTierBadge: { position: 'absolute', bottom: 14, left: 16, flexDirection: 'row', alignItems: 'center', backgroundColor: '#FEF3C7', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, borderWidth: 1, borderColor: '#FDE68A' },
  heroTierText: { color: '#92400E', fontSize: 11, fontWeight: '800', textTransform: 'uppercase' as any },
  contentPad: { paddingHorizontal: 16, paddingTop: 18 },
  nameRow: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 4 },
  vendorName: { fontSize: 20, fontWeight: '800', color: '#2A2425', fontFamily: 'Playfair Display, serif', flex: 1, marginRight: 8, lineHeight: 26 },
  ratingBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFBEB', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 10, marginTop: 2 },
  ratingText: { fontSize: 13, fontWeight: '800', color: '#92400E' },
  reviewsText: { fontSize: 11, color: '#B45309' },
  categoryText: { fontSize: 13, color: '#581420', fontWeight: '600', marginBottom: 10 },
  infoRow: { flexDirection: 'row', flexWrap: 'wrap' as any, gap: 8, marginBottom: 14 },
  infoChip: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F5EEE6', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  infoChipText: { fontSize: 12, color: '#2A2425', fontWeight: '600' },
  section: { marginBottom: 4 },
  sectionRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  sectionLabel: { fontSize: 14, fontWeight: '800', color: '#2A2425', marginBottom: 4, fontFamily: 'Playfair Display, serif' },
  sectionContent: { fontSize: 13, color: '#4A3A3C', lineHeight: 20 },
  divider: { height: 1, backgroundColor: '#F0E8E0', marginVertical: 14 },
  serviceItem: { flexDirection: 'row', alignItems: 'center' },
  serviceItemText: { fontSize: 13, color: '#3D3234', fontWeight: '500' },
  portfolioGrid: { flexDirection: 'row', flexWrap: 'wrap' as any, gap: 6, marginTop: 8 },
  portfolioImg: { width: '48%', height: 100, borderRadius: 10 },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F5EEE6', padding: 14, borderRadius: 14, marginBottom: 14 },
  priceLabel: { fontSize: 13, color: '#6B5A5C', fontWeight: '500' },
  priceValue: { fontSize: 16, fontWeight: '800', color: '#2A2425' },
  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', gap: 8, paddingHorizontal: 16, paddingVertical: 12, backgroundColor: '#FAF7F2', borderTopWidth: 1, borderTopColor: '#EFE7DE' },
  btnWhatsApp: { flex: 1, height: 44, borderRadius: 22, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#10B981', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' },
  btnWhatsAppText: { color: '#10B981', fontSize: 13, fontWeight: '700' },
  btnCall: { flex: 1, height: 44, borderRadius: 22, backgroundColor: '#FFFFFF', borderWidth: 1.5, borderColor: '#581420', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' },
  btnCallText: { color: '#581420', fontSize: 13, fontWeight: '700' },
  btnQuote: { flex: 1.5, height: 44, borderRadius: 22, backgroundColor: '#581420', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' },
  btnQuoteText: { color: '#FFFFFF', fontSize: 13, fontWeight: '700' },
  modalCloseBtn: { position: 'absolute', top: 14, right: 14, zIndex: 10, width: 32, height: 32, borderRadius: 16, backgroundColor: '#F0E8E0', justifyContent: 'center', alignItems: 'center' },
  modalTitle: { fontSize: 17, fontWeight: '800', color: '#2A2425', fontFamily: 'Playfair Display, serif', marginBottom: 4, paddingRight: 36 },
  modalVendor: { fontSize: 12, color: '#581420', fontWeight: '600', marginBottom: 18 },
  fieldLabel: { fontSize: 13, fontWeight: '700', color: '#2A2425', marginBottom: 8, marginTop: 14 },
  servicesGrid: { flexDirection: 'row', flexWrap: 'wrap' as any, gap: 8 },
  serviceChip: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 7, borderRadius: 20, backgroundColor: '#FFFFFF', borderWidth: 1.5, borderColor: '#DDD6CE' },
  serviceChipActive: { backgroundColor: '#581420', borderColor: '#581420' },
  serviceChipText: { fontSize: 12, fontWeight: '600', color: '#3D3234' },
  serviceChipTextActive: { color: '#FFFFFF' },
  inputRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10, borderWidth: 1, borderColor: '#E2D8CD', marginBottom: 4 },
  textInput: { flex: 1, fontSize: 13, color: '#2A2425', outlineStyle: 'none' as any },
  errorRow: { backgroundColor: '#FEE2E2', padding: 10, borderRadius: 10, marginTop: 10 },
  errorText: { color: '#B91C1C', fontSize: 12, fontWeight: '600', textAlign: 'center' },
  submitBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#581420', borderRadius: 22, height: 48, marginTop: 18 },
  submitBtnText: { color: '#FFFFFF', fontSize: 14, fontWeight: '700' },
  successTitle: { fontSize: 18, fontWeight: '800', color: '#2A2425', fontFamily: 'Playfair Display, serif', marginBottom: 6 },
  successSub: { fontSize: 13, color: '#6B5A5C', textAlign: 'center' },
});



