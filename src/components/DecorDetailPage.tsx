import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  Linking,
} from 'react-native-web';
import { motion, AnimatePresence } from 'motion/react';
import { QuotationScreen } from './QuotationScreen';
import { RequestQuoteModal } from './RequestQuoteModal';
import { WeddingInvoicePaymentModal } from './WeddingInvoicePaymentModal';
import { saveOrUpdateQuote } from '../utils/quotesManager';
import {
  ChevronLeft,
  Share2,
  Bookmark,
  Star,
  MapPin,
  CheckCircle2,
  Phone,
  MessageCircle,
  Award,
  Sparkles,
  Calendar,
  Check,
  X,
  Eye,
  ShieldCheck,
  Building,
  Flower2,
  Palette,
  Image as ImageIcon,
  Instagram,
  Send,
} from 'lucide-react';

export interface DecorStudio {
  id: string;
  name: string;
  rating: number;
  reviewsCount: number;
  location: string;
  category: string;
  startingPrice: string;
  priceValue: number;
  tier: 'Signature' | 'Luxury' | 'Premium' | 'Essential';
  image: string;
  isBookmarked?: boolean;
  description?: string;
  experience?: string;
  portfolio?: string[];
  phone?: string;
  themesProvided?: string[];
  instagram?: string;
}

interface DecorDetailPageProps {
  onNavigateToQuotesTab?: () => void;
  studio: DecorStudio;
  onBack: () => void;
  isBookmarked?: boolean;
  onToggleBookmark?: (id: string) => void;
  bookingSource?: 'entire_wedding' | 'individual';
  onNavigateToMyWeddingPayments?: () => void;
  onNavigateToProfileMyBookings?: () => void;
}

export const DecorDetailPage: React.FC<DecorDetailPageProps> = ({
  onNavigateToQuotesTab,
  studio,
  onBack,
  isBookmarked = false,
  onToggleBookmark,
  bookingSource = 'entire_wedding',
  onNavigateToMyWeddingPayments,
  onNavigateToProfileMyBookings,
}) => {
  const [activeTab, setActiveTab] = useState<'about' | 'gallery' | 'packages' | 'reviews'>('about');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showQuoteModal, setShowQuoteModal] = useState<boolean>(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

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
        const match = quotes.find((q: any) => q.id === `quote-${studio.id}`);
        if (match) {
          if (match.paymentStatus === 'fully_paid') return 'fully_paid';
          if (match.paymentStatus === 'partially_paid') return 'partially_paid';
          if (match.status === 'confirmed') return 'confirmed';
        }
      }
      const statusesJson = localStorage.getItem('tot_quote_statuses');
      if (statusesJson) {
        const statuses = JSON.parse(statusesJson);
        if (statuses[studio.id]) {
          return statuses[studio.id];
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
      statuses[studio.id] = newStatus;
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
    const basePrice = parseInt((studio.startingPrice || '₹1,50,000').replace(/[^0-9]/g, ''), 10) || 150000;
    saveOrUpdateQuote({
      id: `quote-${studio.id}`,
      vendorId: studio.id,
      vendorName: studio.name,
      category: 'Decor',
      packageName: 'Exquisite Mandap & Entrance Stage Decor',
      status: 'requested',
      paymentStatus: 'pending',
      totalAmount: basePrice,
      advanceAmount: Math.round(basePrice * 0.3),
      remainingAmount: basePrice - Math.round(basePrice * 0.3),
      weddingDate: '24 Oct 2026',
      location: studio.location,
      includedServices: [
        'Grand Mandap Stage Floral Backdrop',
        'Bespoke Wooden Mandap Structure Setup',
        'Royal Entrance Arch Floral Decor',
        'Groom & Bride Pathway Flowers',
        'Ambient Mood Lighting & LED Accents',
      ],
      image: studio.image,
    });
    setToastMessage('Quote Request Sent! Added to My Quotes');
    setTimeout(() => setToastMessage(null), 3000);

    // Simulate response after 3 seconds
    setTimeout(() => {
      updateQuoteStatus('response_ready');
      saveOrUpdateQuote({
        id: `quote-${studio.id}`,
        status: 'response_ready',
      });
      setToastMessage('Vendor Quotation Received! Click "View Quote"');
      setTimeout(() => setToastMessage(null), 5000);
    }, 3000);
  };


  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: studio.name,
        text: `Check out ${studio.name} for wedding decor on Tale of Two!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      showToast('Link copied to clipboard!');
    }
  };

  const handleCall = () => {
    const phoneNumber = studio.phone || '+919150197966';
    window.open(`tel:${phoneNumber}`, '_self');
  };

  const handleWhatsApp = () => {
    const phoneNumber = studio.phone ? studio.phone.replace(/[^0-9]/g, '') : '919150197966';
    const text = encodeURIComponent(
      `Hi ${studio.name}, I found your wedding decor profile on Tale of Two app. I would like to check availability and package details!`
    );
    window.open(`https://wa.me/${phoneNumber}?text=${text}`, '_blank');
  };

  const handleInstagram = () => {
    const handle = studio.instagram || '@_ranjith_r.r_';
    const username = handle.replace('@', '');
    window.open(`https://instagram.com/${username}`, '_blank');
  };

  // Ensure 100% distinct portfolio images
  const galleryImages = studio.portfolio && studio.portfolio.length > 0
    ? studio.portfolio
    : [studio.image];

  return (
    <View style={styles.container}>
      {/* TOAST MESSAGE */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-[#2A2425] text-white px-4 py-2.5 rounded-full text-xs font-medium shadow-xl flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 text-[#C5A880]" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOP FIXED NAV BAR */}
      <View style={styles.topNav}>
        <TouchableOpacity style={styles.navIconBtn} onPress={onBack} activeOpacity={0.8}>
          <ChevronLeft className="w-5 h-5 text-[#2A2425]" />
        </TouchableOpacity>

        <View style={styles.topNavRight}>
          <TouchableOpacity style={styles.navIconBtn} onPress={handleShare} activeOpacity={0.8}>
            <Share2 className="w-4 h-4 text-[#2A2425]" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.navIconBtn, isBookmarked && styles.navIconBtnActive]}
            onPress={() => {
              if (onToggleBookmark) onToggleBookmark(studio.id);
              showToast(isBookmarked ? 'Removed from Saved Items' : 'Saved to your Wedding Planner!');
            }}
            activeOpacity={0.8}
          >
            <Bookmark
              className={`w-4 h-4 ${isBookmarked ? 'text-[#581420] fill-[#581420]' : 'text-[#2A2425]'}`}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* HERO IMAGE CONTAINER */}
        <View style={styles.heroContainer}>
          <Image source={{ uri: studio.image }} style={styles.heroImage} resizeMode="cover" />
          <View style={styles.heroOverlay} />

          {/* TIER BADGE */}
          <View style={styles.tierBadgeContainer}>
            <Award className="w-3.5 h-3.5 text-[#581420] mr-1" />
            <Text style={styles.tierBadgeText}>{studio.tier} Decorator</Text>
          </View>

          {/* RATING & LOCATION OVERLAY */}
          <View style={styles.heroInfoOverlay}>
            <View style={styles.ratingBadge}>
              <Star className="w-3.5 h-3.5 text-white fill-white mr-1" />
              <Text style={styles.ratingText}>{studio.rating}</Text>
            </View>
            <Text style={styles.reviewsText}>({studio.reviewsCount} verified reviews)</Text>
            <Text style={styles.dotSeparator}>•</Text>
            <MapPin className="w-3.5 h-3.5 text-white mr-0.5" />
            <Text style={styles.locationText}>{studio.location}</Text>
          </View>
        </View>

        {/* TITLE & CATEGORY */}
        <View style={styles.headerSection}>
          <Text style={styles.studioName}>{studio.name}</Text>
          <Text style={styles.categorySubText}>{studio.category}</Text>
        </View>

        {/* QUICK INFO CARDS ROW — NON-OVERLAPPING PERFECT ALIGNMENT */}
        <View style={styles.quickInfoRow}>
          <View style={[styles.quickInfoCard, { flex: 1 }]}>
            <Text style={styles.quickInfoLabel}>Starting Price</Text>
            <Text style={styles.quickInfoValue}>{studio.startingPrice}</Text>
          </View>

          <View style={styles.quickInfoDivider} />

          <View style={[styles.quickInfoCard, { flex: 1.3 }]}>
            <Text style={styles.quickInfoLabel}>Specialization</Text>
            <Text style={styles.quickInfoValueSpecial} numberOfLines={2}>
              {studio.category}
            </Text>
          </View>

          <View style={styles.quickInfoDivider} />

          <View style={[styles.quickInfoCard, { flex: 1 }]}>
            <Text style={styles.quickInfoLabel}>Experience</Text>
            <Text style={styles.quickInfoValue}>{studio.experience || '10+ Years'}</Text>
          </View>
        </View>

        {/* HIGHLIGHT BADGES */}
        <View style={styles.highlightsContainer}>
          <View style={styles.highlightPill}>
            <ShieldCheck className="w-3.5 h-3.5 text-[#15803D] mr-1.5" />
            <Text style={styles.highlightPillText}>Verified Decor Partner</Text>
          </View>
          <View style={styles.highlightPill}>
            <Palette className="w-3.5 h-3.5 text-[#581420] mr-1.5" />
            <Text style={styles.highlightPillText}>Fresh Flowers & Custom Lighting</Text>
          </View>
        </View>

        {/* TAB NAVIGATION */}
        <View style={styles.tabBar}>
          {(['about', 'gallery', 'packages', 'reviews'] as const).map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tabItem, activeTab === tab && styles.tabItemActive]}
              onPress={() => setActiveTab(tab)}
              activeOpacity={0.8}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                {tab === 'about'
                  ? 'About'
                  : tab === 'gallery'
                  ? 'Work Gallery'
                  : tab === 'packages'
                  ? 'Packages'
                  : 'Reviews'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* TAB CONTENT */}
        <View style={styles.tabContentContainer}>
          {activeTab === 'about' && (
            <View style={styles.sectionBody}>
              <Text style={styles.sectionHeading}>About {studio.name}</Text>
              <Text style={styles.bodyParagraph}>
                {studio.description ||
                  `${studio.name} is one of Tamil Nadu's premiere wedding decor design houses, specialising in grand Mandap setups, lavish stage backdrops, fairy-light canopies, and bespoke Haldi & Mehendi themes. From royal traditional floral styling to minimalist modern aesthetics, we transform venues into magical celebrations.`}
              </Text>

              {/* SPECIALTIES */}
              <Text style={styles.subHeading}>Key Specialties & Themes</Text>
              <View style={styles.specialtiesGrid}>
                {(
                  studio.themesProvided || [
                    'Traditional South Indian Jasmine Mandap',
                    'Royal Pastel Floral Stage Decor',
                    'Crystal Chandelier & Truss Lighting',
                    'Haldi & Mehendi Yellow Setup',
                    'Fairy-Light Outdoor Canopy',
                    'Destination Beachside Stage',
                  ]
                ).map((theme, idx) => (
                  <View key={idx} style={styles.specialtyItem}>
                    <CheckCircle2 className="w-4 h-4 text-[#581420] mr-2 flex-shrink-0" />
                    <Text style={styles.specialtyText}>{theme}</Text>
                  </View>
                ))}
              </View>

              {/* SERVICES OFFERED */}
              <Text style={styles.subHeading}>Services Included</Text>
              <View style={styles.servicesContainer}>
                {[
                  'Custom 3D Stage Design & Blueprint',
                  'Fresh Flower Sourcing & Floral Sculptures',
                  'LED Screen Setup & Ambient Lighting',
                  'Drapes, Carpets & Aisle Styling',
                  'Brass Urli & Marigold Floral Accents',
                  'Table Centerpieces & Dining Decor',
                ].map((s, idx) => (
                  <View key={idx} style={styles.serviceChip}>
                    <Palette className="w-3.5 h-3.5 text-[#C5A880] mr-1.5" />
                    <Text style={styles.serviceChipText}>{s}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {activeTab === 'gallery' && (
            <View style={styles.sectionBody}>
              <View style={styles.galleryHeader}>
                <Text style={styles.sectionHeading}>Work Portfolio</Text>
                <Text style={styles.gallerySubText}>{galleryImages.length} HD Decor Photos</Text>
              </View>

              <View style={styles.galleryGrid}>
                {galleryImages.map((imgUrl, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.galleryImageWrapper}
                    activeOpacity={0.85}
                    onPress={() => setSelectedImage(imgUrl)}
                  >
                    <Image source={{ uri: imgUrl }} style={styles.galleryImage} resizeMode="cover" />
                    <View style={styles.galleryOverlayHover}>
                      <Eye className="w-5 h-5 text-white" />
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {activeTab === 'packages' && (
            <View style={styles.sectionBody}>
              <Text style={styles.sectionHeading}>Decor Packages & Estimates</Text>
              <Text style={styles.bodyParagraph}>
                Custom decor packages crafted according to venue dimensions, floral preference, and lighting scale.
              </Text>

              {/* PACKAGE 1 */}
              <View style={styles.packageCard}>
                <View style={styles.packageHeaderRow}>
                  <View>
                    <Text style={styles.packageTitle}>Stage & Mandap Decor</Text>
                    <Text style={styles.packageSubTitle}>Complete Wedding Mandap + Backdrop</Text>
                  </View>
                  <Text style={styles.packagePrice}>{studio.startingPrice}</Text>
                </View>
                <View style={styles.packageDivider} />
                <View style={styles.packageFeaturesList}>
                  <Text style={styles.featureItem}>• Royal Floral Mandap with Jasmine/Rose Strands</Text>
                  <Text style={styles.featureItem}>• Stage Backdrop with Warm Ambient Lighting</Text>
                  <Text style={styles.featureItem}>• Carpeted Aisle with Floral Pillar Accents</Text>
                  <Text style={styles.featureItem}>• Bride & Groom Royal Chairs / Sofa Setup</Text>
                </View>
              </View>

              {/* PACKAGE 2 */}
              <View style={styles.packageCard}>
                <View style={styles.packageHeaderRow}>
                  <View>
                    <Text style={styles.packageTitle}>Royal Reception & Canopy</Text>
                    <Text style={styles.packageSubTitle}>Chandelier Stage + Entrance Canopy</Text>
                  </View>
                  <Text style={styles.packagePrice}>₹2,50,000 onwards</Text>
                </View>
                <View style={styles.packageDivider} />
                <View style={styles.packageFeaturesList}>
                  <Text style={styles.featureItem}>• Crystal Chandelier & Truss Lighting</Text>
                  <Text style={styles.featureItem}>• Grand Floral Entrance Tunnel & Photobooth</Text>
                  <Text style={styles.featureItem}>• VIP Table Centerpieces & Linen Drapes</Text>
                  <Text style={styles.featureItem}>• Cold Pyro & Fog Smoke Effects for Entry</Text>
                </View>
              </View>

              {/* PACKAGE 3 */}
              <View style={styles.packageCard}>
                <View style={styles.packageHeaderRow}>
                  <View>
                    <Text style={styles.packageTitle}>Haldi & Mehendi Yellow Setup</Text>
                    <Text style={styles.packageSubTitle}>Vibrant Marigold & Brass Decor</Text>
                  </View>
                  <Text style={styles.packagePrice}>₹95,000 onwards</Text>
                </View>
                <View style={styles.packageDivider} />
                <View style={styles.packageFeaturesList}>
                  <Text style={styles.featureItem}>• Marigold Floral Curtain & Yellow Drapes</Text>
                  <Text style={styles.featureItem}>• Brass Urli Floater Basin with Flowers</Text>
                  <Text style={styles.featureItem}>• Colorful Cushion Seating & Jhula (Swing) Decor</Text>
                </View>
              </View>
            </View>
          )}

          {activeTab === 'reviews' && (
            <View style={styles.sectionBody}>
              <View style={styles.reviewsSummaryCard}>
                <Text style={styles.reviewsBigScore}>{studio.rating}</Text>
                <View style={styles.starsRow}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4 h-4 text-[#D97706] fill-[#D97706] mr-0.5" />
                  ))}
                </View>
                <Text style={styles.reviewsCountText}>Based on {studio.reviewsCount} verified reviews</Text>
              </View>

              <Text style={styles.subHeading}>Recent Client Reviews</Text>
              {[
                {
                  name: 'Kavitha & Arjun',
                  date: '3 weeks ago',
                  review:
                    'The mandap decor was absolutely breathtaking! The fresh jasmine pillars and warm chandelier lighting created a magical ambience that all our guests praised.',
                },
                {
                  name: 'Praveen R.',
                  date: '1 month ago',
                  review:
                    'Extremely professional team! They executed the exact 3D design we approved for our Chennai reception. The entrance tunnel and photobooth were huge hits.',
                },
              ].map((rev, idx) => (
                <View key={idx} style={styles.reviewCard}>
                  <View style={styles.reviewHeader}>
                    <Text style={styles.reviewerName}>{rev.name}</Text>
                    <Text style={styles.reviewDate}>{rev.date}</Text>
                  </View>
                  <View style={styles.starsRow}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-3.5 h-3.5 text-[#D97706] fill-[#D97706] mr-0.5" />
                    ))}
                  </View>
                  <Text style={styles.reviewBody}>{rev.review}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      {/* BOTTOM FIXED ACTION BAR */}
      <View style={styles.bottomBar}>
        <View style={styles.bottomPriceCol}>
          <Text style={styles.bottomPriceLabel}>Starting Price</Text>
          <Text style={styles.bottomPriceValue}>{studio.startingPrice}</Text>
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

          {studio.instagram && (
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

      {/* FULLSCREEN IMAGE MODAL */}
      <Modal visible={Boolean(selectedImage)} transparent animationType="fade">
        <View style={styles.modalBg}>
          <TouchableOpacity style={styles.modalCloseBtn} onPress={() => setSelectedImage(null)}>
            <X className="w-6 h-6 text-white" />
          </TouchableOpacity>
          {selectedImage && (
            <Image source={{ uri: selectedImage }} style={styles.fullModalImage} resizeMode="contain" />
          )}
        </View>
      </Modal>

      {/* REQUEST QUOTE MODAL */}
      <RequestQuoteModal
        visible={showQuoteModal}
        vendorId={studio.id}
        vendorName={studio.name}
        location={studio.location}
        startingPrice={studio.startingPrice}
        category="decor"
        onClose={() => setShowQuoteModal(false)}
        onQuoteSent={handleQuoteRequestSent}
      />

      <QuotationScreen
        visible={showQuotationScreen}
        onClose={() => setShowQuotationScreen(false)}
        quoteStatus={quoteStatus}
        setQuoteStatus={updateQuoteStatus}
        vendorId={studio.id}
        vendorName={studio.name}
        vendorImage={studio.image}
        vendorLocation={studio.location}
        startingPrice={studio.startingPrice}
        category="Decor"
        packageName="Exquisite Mandap & Entrance Stage Decor"
        includedServices={[
          'Grand Mandap Stage Floral Backdrop',
          'Bespoke Wooden Mandap Structure Setup',
          'Royal Entrance Arch Floral Decor',
          'Groom & Bride Pathway Flowers',
          'Ambient Mood Lighting & LED Accents',
        ]}
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
        vendorId={studio.id}
        vendorName={studio.name}
        vendorImage={studio.image}
        vendorLocation={studio.location}
        category="Decor"
        startingPrice={studio.startingPrice || '₹1,50,000'}
        bookingSource={bookingSource}
        onNavigateToMyWeddingPayments={() => {
          setShowInvoiceModal(false);
          if (onNavigateToMyWeddingPayments) {
            onNavigateToMyWeddingPayments();
          } else {
            window.dispatchEvent(
              new CustomEvent('tot_switch_to_my_wedding_payments', { detail: { vendorId: studio.id } })
            );
          }
        }}
        onNavigateToProfileMyBookings={() => {
          setShowInvoiceModal(false);
          if (onNavigateToProfileMyBookings) {
            onNavigateToProfileMyBookings();
          } else {
            window.dispatchEvent(
              new CustomEvent('tot_switch_to_profile_my_bookings', { detail: { vendorId: studio.id } })
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
    position: 'relative',
  },
  topNav: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    zIndex: 30,
    backgroundColor: 'rgba(250, 247, 242, 0.85)',
  },
  navIconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#E8DFD5',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  navIconBtnActive: {
    borderColor: '#581420',
    backgroundColor: '#FDF8F5',
  },
  topNavRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  scrollContent: {
    paddingTop: 56,
    paddingBottom: 90,
  },
  heroContainer: {
    position: 'relative',
    height: 250,
    width: '100%',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.42)',
  },
  tierBadgeContainer: {
    position: 'absolute',
    top: 12,
    left: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.92)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  tierBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#581420',
  },
  heroInfoOverlay: {
    position: 'absolute',
    bottom: 12,
    left: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#581420',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginRight: 6,
  },
  ratingText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 12,
  },
  reviewsText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  dotSeparator: {
    color: '#FFFFFF',
    marginHorizontal: 6,
    fontSize: 12,
  },
  locationText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  headerSection: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  studioName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#2A2425',
    marginBottom: 4,
  },
  categorySubText: {
    fontSize: 13,
    color: '#7D6E70',
    fontWeight: '600',
  },

  /* QUICK INFO ROW — PERFECT NON-OVERLAPPING STYLING */
  quickInfoRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderColor: '#E8DFD5',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 4,
    zIndex: 10,
  },
  quickInfoCard: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 2,
  },
  quickInfoLabel: {
    fontSize: 9.5,
    color: '#8C7A7C',
    fontWeight: '700',
    letterSpacing: 0.4,
    minHeight: 14,
    marginBottom: 4,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  quickInfoValue: {
    fontSize: 12.5,
    fontWeight: '800',
    color: '#2A2425',
    textAlign: 'center',
    lineHeight: 16,
  },
  quickInfoValueSpecial: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#2A2425',
    textAlign: 'center',
    lineHeight: 15,
  },
  quickInfoDivider: {
    width: 1,
    height: 32,
    backgroundColor: '#E8DFD5',
    alignSelf: 'center',
    marginHorizontal: 2,
  },

  highlightsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginHorizontal: 16,
    marginTop: 14,
  },
  highlightPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8DFD5',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  highlightPillText: {
    fontSize: 11,
    color: '#2A2425',
    fontWeight: '600',
  },
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E8DFD5',
    marginHorizontal: 16,
    marginTop: 20,
  },
  tabItem: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  tabItemActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#581420',
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#7D6E70',
  },
  tabTextActive: {
    color: '#581420',
    fontWeight: '800',
  },
  tabContentContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  sectionBody: {
    gap: 16,
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: '800',
    color: '#2A2425',
  },
  bodyParagraph: {
    fontSize: 13,
    color: '#4A3E3F',
    lineHeight: 20,
  },
  subHeading: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2A2425',
    marginTop: 8,
  },
  specialtiesGrid: {
    gap: 10,
  },
  specialtyItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  specialtyText: {
    fontSize: 13,
    color: '#2A2425',
    fontWeight: '600',
  },
  servicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  serviceChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8DFD5',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  serviceChipText: {
    fontSize: 12,
    color: '#2A2425',
    fontWeight: '600',
  },
  galleryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  gallerySubText: {
    fontSize: 12,
    color: '#7D6E70',
    fontWeight: '600',
  },
  galleryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  galleryImageWrapper: {
    width: '48%',
    height: 140,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  galleryImage: {
    width: '100%',
    height: '100%',
  },
  galleryOverlayHover: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  packageCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E8DFD5',
  },
  packageHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  packageTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#2A2425',
  },
  packageSubTitle: {
    fontSize: 11,
    color: '#7D6E70',
    marginTop: 2,
  },
  packagePrice: {
    fontSize: 13,
    fontWeight: '800',
    color: '#581420',
  },
  packageDivider: {
    height: 1,
    backgroundColor: '#F3ECE4',
    marginVertical: 10,
  },
  packageFeaturesList: {
    gap: 4,
  },
  featureItem: {
    fontSize: 12,
    color: '#4A3E3F',
  },
  reviewsSummaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E8DFD5',
  },
  reviewsBigScore: {
    fontSize: 32,
    fontWeight: '900',
    color: '#2A2425',
  },
  starsRow: {
    flexDirection: 'row',
    marginVertical: 4,
  },
  reviewsCountText: {
    fontSize: 12,
    color: '#7D6E70',
    fontWeight: '500',
  },
  reviewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E8DFD5',
    gap: 4,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  reviewerName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#2A2425',
  },
  reviewDate: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  reviewBody: {
    fontSize: 12,
    color: '#4A3E3F',
    lineHeight: 18,
  },

  /* BOTTOM FIXED BAR */
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
    backgroundColor: 'rgba(0,0,0,0.92)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCloseBtn: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 10,
    padding: 8,
  },
  fullModalImage: {
    width: '90%',
    height: '80%',
  },
});


