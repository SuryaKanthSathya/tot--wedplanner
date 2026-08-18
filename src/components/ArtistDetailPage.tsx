import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
  Linking,
} from 'react-native';
import {
  ChevronLeft,
  Heart,
  Share2,
  Star,
  MapPin,
  Calendar,
  Sparkles,
  CheckCircle2,
  Award,
  ShieldCheck,
  Instagram,
  Phone,
  Send,
  MessageCircle,
  X,
  Check,
  Building2,
  Clock,
  ChevronDown,
  User,
  Scissors,
  Smile,
  Palette,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { QuotationScreen } from './QuotationScreen';
import { MehendiArtist } from './MehendiListingPage';
import { RequestQuoteModal } from './RequestQuoteModal';
import { WeddingInvoicePaymentModal } from './WeddingInvoicePaymentModal';
import { DraggablePhotoGalleryModal } from './DraggablePhotoGalleryModal';
import { saveOrUpdateQuote } from '../utils/quotesManager';
import {
  getWeddingBookingByVendorId,
  saveOrUpdateWeddingBooking,
} from '../utils/weddingPaymentsManager';

interface ArtistDetailPageProps {
  onNavigateToQuotesTab?: () => void;
  artist: MehendiArtist;
  onBack: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  bookingSource?: 'entire_wedding' | 'individual';
  onNavigateToMyWeddingPayments?: () => void;
  onNavigateToProfileMyBookings?: () => void;
}

export const ArtistDetailPage: React.FC<ArtistDetailPageProps> = ({
  onNavigateToQuotesTab,
  artist,
  onBack,
  isBookmarked,
  onToggleBookmark,
  bookingSource = 'entire_wedding',
  onNavigateToMyWeddingPayments,
  onNavigateToProfileMyBookings,
}) => {
  const [activeTab, setActiveTab] = useState<'portfolio' | 'packages' | 'designs' | 'reviews'>('portfolio');
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryInitialIndex, setGalleryInitialIndex] = useState(0);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
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

  // Quote Flow Local States
  const [quoteStatus, setQuoteStatus] = useState<
    'initial' | 'requested' | 'response_ready' | 'confirmed' | 'partially_paid' | 'fully_paid' | 'rejected' | 'negotiating'
  >(() => {
    try {
      const savedQuotesJson = localStorage.getItem('tot_confirmed_quotes');
      if (savedQuotesJson) {
        const quotes = JSON.parse(savedQuotesJson);
        const match = quotes.find((q: any) => q.id === `quote-${artist.id}`);
        if (match) {
          if (match.paymentStatus === 'fully_paid') return 'fully_paid';
          if (match.paymentStatus === 'partially_paid') return 'partially_paid';
          if (match.status === 'confirmed') return 'confirmed';
        }
      }
    } catch (e) {
      console.error(e);
    }
    const existing = getWeddingBookingByVendorId(artist.id);
    if (existing) return existing.status;
    return 'initial';
  });

  useEffect(() => {
    const handleUpdate = () => {
      const existing = getWeddingBookingByVendorId(artist.id);
      if (existing) setQuoteStatus(existing.status);
    };
    window.addEventListener('tot_wedding_payments_updated', handleUpdate);
    return () => window.removeEventListener('tot_wedding_payments_updated', handleUpdate);
  }, [artist.id]);

  const updateQuoteStatus = (newStatus: 'initial' | 'requested' | 'response_ready' | 'confirmed' | 'partially_paid' | 'fully_paid' | 'rejected' | 'negotiating') => {
    setQuoteStatus(newStatus);
    const basePrice = parseInt((artist.startingPrice || '₹10,000').replace(/[^0-9]/g, ''), 10) || 10000;
    saveOrUpdateWeddingBooking({
      vendorId: artist.id,
      vendorName: artist.name,
      category: 'Mehendi',
      serviceType: 'Organic Bridal Mehendi & Henna Art',
      image: artist.image,
      location: artist.location || 'Chennai, Tamil Nadu',
      totalAmount: basePrice,
      status: newStatus,
    });
  };

  const [showQuotationScreen, setShowQuotationScreen] = useState(false);

  const handleQuoteRequestSent = () => {
    setShowQuoteModal(false);
    updateQuoteStatus('requested');
    setToastMessage('Quote Request Sent! Vendor reviewing...');

    // Simulate response after 2.5s
    setTimeout(() => {
      updateQuoteStatus('response_ready');
      setToastMessage('Vendor Quotation Received! Click "View Quote"');
      setTimeout(() => setToastMessage(null), 5000);
    }, 2500);
  };

  const handleConfirmQuoteFromQuotation = () => {
    updateQuoteStatus('confirmed');
    setShowQuotationScreen(false);
    setToastMessage('✓ Quote Confirmed! You can now View Invoice & Pay');
  };

  // Curated 24 luxury bridal mehendi photos
  const portfolioImages = [
    artist.image,
    'https://images.unsplash.com/photo-1609151162377-794fa68b02f1?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1200&q=85',
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
    'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1510076857177-7470076d4098?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1200&q=85',
  ];

  const packagesList = [
    {
      title: 'Bridal Mehendi Package',
      price: artist.startingPrice,
      popular: true,
      features: [
        'Organic Homemade Henna Paste',
        'Intricate Bridal Hand & Foot Designs',
        'Custom Figures (Bride & Groom Portraits)',
        'Long-lasting Deep Dark Stain Guarantee',
        'Pre-wedding Mehndi Care Guide Included',
      ],
    },
    {
      title: 'Guest & Family Mehendi Package',
      price: `₹${(artist.priceValue + 12000).toLocaleString('en-IN')} onwards`,
      popular: false,
      features: [
        'Mehendi for up to 10 Bridesmaids/Family',
        'Arabic or Indian Minimalist Designs',
        'Fast Application by Assistant Artists',
        'International Cosmetics (Dior, NARS, Charlotte Tilbury)',
        'On-location Touchup Assistance throughout event',
      ],
    },
    {
      title: 'Engagement & Pre-Wedding Trial',
      price: `₹${(Math.round(artist.priceValue * 0.6)).toLocaleString('en-IN')} onwards`,
      popular: false,
      features: [
        'Soft Radiant HD Mehendi',
        'Blow-dry Curls or Modern Updo',
        'Lehenga / Saree Draping',
        'Pre-wedding Skin Prep Consultation',
      ],
    },
    {
      title: 'Groom Makeover & Beard Styling',
      price: '₹12,000 onwards',
      popular: false,
      features: [
        'Subtle Camera-Ready Mattifying Base',
        'Beard Sculpting & Hair Setting',
        'Under-eye Concealing & Lip Conditioning',
        'Sherwani / Veshti Styling Assistance',
      ],
    },
  ];

  const cosmeticBrands = artist.designsUsed || [
    'Traditional Indian',
    'Intricate Arabic',
    'Floral Motifs',
    'Mandala Art',
    'Bridal Figures',
    'Peacock Motifs',
    'Indo-Arabic',
    'Minimalist / Khafif',
    'White / Glitter Henna',
  ];

  const reviewsList = [
    {
      id: 'rev-1',
      name: 'Priyanka & Karthi',
      date: 'January 2026',
      event: 'Bridal Muhurtham in ' + artist.location,
      rating: 5,
      comment: `Absolute magic! ${artist.name} made me look like an absolute queen on my wedding day. The saree draping was so neat and the HD mehendi lasted from 5 AM until afternoon without cracking or fading!`,
    },
    {
      id: 'rev-2',
      name: 'Dr. Sneha Rajan',
      date: 'December 2025',
      event: 'Guest & Family Mehendi Package',
      rating: 5,
      comment: `Extremely professional team. They arrived right on time at 3:00 AM at our venue. Used genuine MAC and Charlotte Tilbury products. My hair extensions and flower veni setting received so many compliments!`,
    },
    {
      id: 'rev-3',
      name: 'Ananya V.',
      date: 'November 2025',
      event: 'Engagement & Sangeet',
      rating: 5,
      comment: `The glow was so natural and skin-like! I was worried about looking cakey, but ${artist.name} understood my skin tone perfectly. Highly recommended for all South Indian brides!`,
    },
  ];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: artist.name,
        text: `Check out ${artist.name} for bridal mehendi!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      setToastMessage('Link copied to clipboard!');
      setTimeout(() => setToastMessage(null), 2500);
    }
  };

  const handleCallPhone = () => {
    const phoneNumber = artist.phone ? artist.phone.replace(/[^0-9+]/g, '') : '+919150197966';
    Linking.openURL(`tel:${phoneNumber}`).catch(() => {
      setToastMessage(`Call ${artist.phone || '+91 91501 97966'}`);
      setTimeout(() => setToastMessage(null), 3000);
    });
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(`Hi ${artist.name}, I found your bridal mehendi profile on WeddingApp and would like to check availability for my wedding date.`);
    Linking.openURL(`https://wa.me/919150197966?text=${text}`).catch(() => {
      setToastMessage('Opening WhatsApp...');
      setTimeout(() => setToastMessage(null), 2000);
    });
  };

  return (
    <View style={styles.container}>
      {/* TOAST MESSAGE */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-6 left-1/2 -translate-x-1/2 z-[300] bg-[#2A2425] text-white px-4 py-2.5 rounded-full text-xs font-semibold shadow-xl flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-[#C28E38]" />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER NAV BAR */}
      <View style={styles.navHeader}>
        <TouchableOpacity style={styles.navBtn} onPress={onBack} activeOpacity={0.7}>
          <ChevronLeft className="w-5 h-5 text-[#2A2425]" />
        </TouchableOpacity>

        <Text style={styles.navTitle} numberOfLines={1}>{artist.name}</Text>

        <View style={{ flexDirection: 'row', gap: 8 }}>
          <TouchableOpacity style={styles.navBtn} onPress={handleShare} activeOpacity={0.7}>
            <Share2 className="w-4.5 h-4.5 text-[#2A2425]" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navBtn} onPress={() => onToggleBookmark(artist.id)} activeOpacity={0.7}>
            <Heart
              className={`w-4.5 h-4.5 ${
                isBookmarked ? 'text-[#8B1E2F] fill-[#8B1E2F]' : 'text-[#2A2425]'
              }`}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        {/* HERO IMAGE & TIER BADGE */}
        <View style={styles.heroContainer}>
          <Image source={{ uri: artist.image }} style={styles.heroImage} />
          <View style={styles.heroOverlay} />
          
          <View style={styles.tierBadgeContainer}>
            <View style={styles.tierBadge}>
              <Award className="w-3.5 h-3.5 text-[#C28E38] mr-1" />
              <Text style={styles.tierBadgeText}>{artist.tier} Mehendi Artist</Text>
            </View>
          </View>

          <View style={styles.heroContent}>
            <Text style={styles.artistName}>{artist.name}</Text>
            
            <View style={styles.ratingRow}>
              <View style={styles.starPill}>
                <Star className="w-3.5 h-3.5 text-white fill-white mr-1" />
                <Text style={styles.starText}>{artist.rating.toFixed(1)}</Text>
              </View>
              <Text style={styles.reviewsText}>({artist.reviewsCount} verified reviews)</Text>
              <View style={styles.dotSeparator} />
              <MapPin className="w-3.5 h-3.5 text-white/80 mr-1" />
              <Text style={styles.locationText}>{artist.location}</Text>
            </View>
          </View>
        </View>

        {/* QUICK INFO CARDS ROW */}
        <View style={styles.quickInfoRow}>
          <View style={[styles.quickInfoCard, { flex: 1 }]}>
            <Text style={styles.quickInfoLabel}>Starting Price</Text>
            <Text style={styles.quickInfoValue}>{artist.startingPrice}</Text>
          </View>

          <View style={styles.quickInfoDivider} />

          <View style={[styles.quickInfoCard, { flex: 1.3 }]}>
            <Text style={styles.quickInfoLabel}>Specialization</Text>
            <Text style={styles.quickInfoValueSpecial} numberOfLines={2}>
              {artist.category}
            </Text>
          </View>

          <View style={styles.quickInfoDivider} />

          <View style={[styles.quickInfoCard, { flex: 1 }]}>
            <Text style={styles.quickInfoLabel}>Experience</Text>
            <Text style={styles.quickInfoValue}>{artist.experience || '8+ Years'}</Text>
          </View>
        </View>

        {/* HIGHLIGHTS BADGES */}
        <View style={styles.highlightsContainer}>
          <View style={styles.highlightPill}>
            <CheckCircle2 className="w-3.5 h-3.5 text-[#581420] mr-1.5" />
            <Text style={styles.highlightText}>Organic Homemade Henna</Text>
          </View>
          <View style={styles.highlightPill}>
            <ShieldCheck className="w-3.5 h-3.5 text-[#581420] mr-1.5" />
            <Text style={styles.highlightText}>Deep Dark Stain Guarantee</Text>
          </View>
          <View style={styles.highlightPill}>
            <Sparkles className="w-3.5 h-3.5 text-[#581420] mr-1.5" />
            <Text style={styles.highlightText}>Custom Bridal Motifs (Figures, Peacocks)</Text>
          </View>
          <View style={styles.highlightPill}>
            <Palette className="w-3.5 h-3.5 text-[#581420] mr-1.5" />
            <Text style={styles.highlightText}>Guest Mehendi Included in Packages</Text>
          </View>
        </View>

        {/* DESCRIPTION */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>About {artist.name}</Text>
          <Text style={styles.descriptionText}>
            {artist.description ||
              `${artist.name} is one of ${artist.location}'s most sought-after bridal mehendi artists. Specializes in intricate, highly detailed bridal mehendi with flawless symmetry, traditional motifs, and modern aesthetic designs using 100% organic, chemical-free henna.`}
          </Text>
        </View>

        
        {/* TRUST BADGES SECTION */}
        <View style={styles.trustBadgesGrid}>
          <View style={styles.trustBadgeCard}>
            <View style={styles.badgeIconBg}>
              <Star className="w-4 h-4 text-[#C28E38] fill-[#C28E38]" />
            </View>
            <View style={styles.badgeTextCol}>
              <Text style={styles.badgeTitle} numberOfLines={1} ellipsizeMode="tail">Google Reviews</Text>
              <Text style={styles.badgeValue} numberOfLines={1} ellipsizeMode="tail">4.9/5 Average</Text>
            </View>
          </View>
          
          <View style={styles.trustBadgeCard}>
            <View style={styles.badgeIconBg}>
              <Heart className="w-4 h-4 text-[#8B1E2F] fill-[#8B1E2F]" />
            </View>
            <View style={styles.badgeTextCol}>
              <Text style={styles.badgeTitle} numberOfLines={1} ellipsizeMode="tail">Instagram</Text>
              <Text style={styles.badgeValue} numberOfLines={1} ellipsizeMode="tail">10k+ Followers</Text>
            </View>
          </View>

          <View style={styles.trustBadgeCard}>
            <View style={styles.badgeIconBg}>
              <Award className="w-4 h-4 text-[#4A6B53] fill-[#4A6B53]" />
            </View>
            <View style={styles.badgeTextCol}>
              <Text style={styles.badgeTitle} numberOfLines={1} ellipsizeMode="tail">Awards</Text>
              <Text style={styles.badgeValue} numberOfLines={1} ellipsizeMode="tail">Best Bridal Mehendi</Text>
            </View>
          </View>

          <View style={styles.trustBadgeCard}>
            <View style={styles.badgeIconBg}>
              <CheckCircle2 className="w-4 h-4 text-[#137333] fill-[#137333]" />
            </View>
            <View style={styles.badgeTextCol}>
              <Text style={styles.badgeTitle} numberOfLines={1} ellipsizeMode="tail">TOT Certified</Text>
              <Text style={styles.badgeValue} numberOfLines={1} ellipsizeMode="tail">Verified Artist</Text>
            </View>
          </View>
        </View>


        {/* INTERACTIVE TABS */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16 }} style={[styles.tabBar, { paddingHorizontal: 0, marginHorizontal: -16 }]}>
          <TouchableOpacity
            style={[styles.tabItem, activeTab === 'portfolio' && styles.tabItemActive]}
            onPress={() => setActiveTab('portfolio')}
          >
            <Text style={[styles.tabItemText, activeTab === 'portfolio' && styles.tabItemTextActive]}>
              Mehendi Portfolio
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabItem, activeTab === 'packages' && styles.tabItemActive]}
            onPress={() => setActiveTab('packages')}
          >
            <Text style={[styles.tabItemText, activeTab === 'packages' && styles.tabItemTextActive]}>
              Packages & Rates
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabItem, activeTab === 'designs' && styles.tabItemActive]}
            onPress={() => setActiveTab('designs')}
          >
            <Text style={[styles.tabItemText, activeTab === 'designs' && styles.tabItemTextActive]}>
              Design Styles
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabItem, activeTab === 'reviews' && styles.tabItemActive]}
            onPress={() => setActiveTab('reviews')}
          >
            <Text style={[styles.tabItemText, activeTab === 'reviews' && styles.tabItemTextActive]}>
              Reviews ({artist.reviewsCount})
            </Text>
          </TouchableOpacity>
        </ScrollView>

        {/* TAB 1: PORTFOLIO */}
        {activeTab === 'portfolio' && (
          <View style={styles.tabContent}>
            <Text style={styles.tabSubtitle}>Tap image to view high-definition bridal details</Text>
            <View style={styles.portfolioGrid}>
              {portfolioImages.slice(0, 12).map((imgUrl, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.portfolioImageWrapper}
                  onPress={() => {
                    setGalleryInitialIndex(index);
                    setIsGalleryOpen(true);
                  }}
                  activeOpacity={0.85}
                >
                  <Image source={{ uri: imgUrl }} style={styles.portfolioGridImg} />
                  <View style={styles.portfolioOverlay}>
                    <Sparkles className="w-4 h-4 text-white" />
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* TAB 2: PACKAGES & RATES */}
        {activeTab === 'packages' && (
          <View style={styles.tabContent}>
            {packagesList.map((pkg, idx) => (
              <View key={idx} style={[styles.packageCard, pkg.popular && styles.packageCardPopular]}>
                {pkg.popular && (
                  <View style={styles.popularRibbon}>
                    <Sparkles className="w-3 h-3 text-white mr-1" />
                    <Text style={styles.popularRibbonText}>Most Booked Bridal Package</Text>
                  </View>
                )}
                <View style={styles.packageHeader}>
                  <Text style={styles.packageTitle}>{pkg.title}</Text>
                  <Text style={styles.packagePrice}>{pkg.price}</Text>
                </View>

                <View style={styles.packageFeaturesList}>
                  {pkg.features.map((feat, fIdx) => (
                    <View key={fIdx} style={styles.featureItem}>
                      <Check className="w-3.5 h-3.5 text-[#581420] mr-2" />
                      <Text style={styles.featureText}>{feat}</Text>
                    </View>
                  ))}
                </View>

                <TouchableOpacity
                  style={styles.packageBookBtn}
                  onPress={() => setShowQuoteModal(true)}
                  activeOpacity={0.85}
                >
                  <Text style={styles.packageBookBtnText}>Request Custom Quote for Package</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* TAB 3: DESIGN STYLES & MOTIFS */}
        {activeTab === 'designs' && (
          <View style={styles.tabContent}>
            <Text style={styles.tabSubtitle}>100% Organic Henna with Natural Essential Oils for Dark, Long-Lasting Stains</Text>
            <View style={styles.brandsGrid}>
              {cosmeticBrands.map((brand, bIdx) => (
                <View key={bIdx} style={styles.brandCard}>
                  <Palette className="w-4 h-4 text-[#581420] mr-2" />
                  <Text style={styles.brandName}>{brand}</Text>
                </View>
              ))}
            </View>

            <View style={styles.brandGuaranteeBox}>
              <ShieldCheck className="w-5 h-5 text-[#581420] mr-2" />
              <View style={{ flex: 1 }}>
                <Text style={styles.guaranteeTitle}>100% Organic & Chemical-Free Henna</Text>
                <Text style={styles.guaranteeSub}>
                  All beauty sponges are single-use disposable, brushes are UV-sanitized between clients, and top hypoallergenic formulas protect sensitive skin.
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* TAB 4: REVIEWS */}
        {activeTab === 'reviews' && (
          <View style={styles.tabContent}>
            {reviewsList.map((rev) => (
              <View key={rev.id} style={styles.reviewCard}>
                <View style={styles.reviewHeader}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={styles.avatarBox}>
                      <User className="w-4 h-4 text-[#581420]" />
                    </View>
                    <View>
                      <Text style={styles.reviewerName}>{rev.name}</Text>
                      <Text style={styles.reviewerEvent}>{rev.event}</Text>
                    </View>
                  </View>

                  <View style={styles.reviewRatingBadge}>
                    <Star className="w-3 h-3 text-amber-500 fill-amber-500 mr-1" />
                    <Text style={styles.reviewRatingText}>{rev.rating}.0</Text>
                  </View>
                </View>

                <Text style={styles.reviewComment}>{rev.comment}</Text>
                <Text style={styles.reviewDate}>{rev.date}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* STICKY BOTTOM ACTION BAR */}
      <View style={styles.bottomBar}>
        <div className="w-full max-w-4xl mx-auto flex items-center justify-between gap-3 px-3 sm:px-6">
          <View style={styles.bottomPriceCol}>
            <Text style={styles.bottomPriceLabel}>Starting From</Text>
            <Text style={styles.bottomPriceValue}>{artist.startingPrice}</Text>
          </View>

          <View style={styles.bottomActionBtns}>
            <TouchableOpacity style={styles.callIconBtn} onPress={handleCallPhone} activeOpacity={0.8}>
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
                <Send className="w-4 h-4 text-white mr-1.5" />
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
                    ? 'Partially Paid (Invoice)'
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
        photos={portfolioImages}
        initialIndex={galleryInitialIndex}
        title={artist.name}
        category="Bridal Mehendi"
      />

      {/* REQUEST QUOTE MODAL */}
      <RequestQuoteModal
        visible={showQuoteModal}
        vendorId={artist.id}
        onClose={() => setShowQuoteModal(false)}
        artistName={artist.name}
        startingPrice={artist.startingPrice}
        location={artist.location}
        category="mehendi"
        onQuoteSent={handleQuoteRequestSent}
      />

      <QuotationScreen
        visible={showQuotationScreen}
        onClose={() => setShowQuotationScreen(false)}
        quoteStatus={quoteStatus}
        setQuoteStatus={updateQuoteStatus}
        vendorId={artist.id}
        vendorName={artist.name}
        vendorImage={artist.image}
        vendorLocation={artist.location}
        startingPrice={artist.startingPrice}
        category="Mehendi"
        packageName="Traditional South Indian Bridal Mehendi Package"
        includedServices={[
          'Full Bridal Hands Mehendi',
          'Bridal Feet Mehendi',
          'Guest Mehendi (up to 15 guests)',
          'Organic Natural Henna Cones',
          'Mehendi Design Consultation',
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
        vendorId={artist.id}
        vendorName={artist.name}
        vendorImage={artist.image}
        vendorLocation={artist.location}
        category="Mehendi"
        startingPrice={artist.startingPrice || '₹18,000'}
        bookingSource={bookingSource}
        onNavigateToMyWeddingPayments={() => {
          setShowInvoiceModal(false);
          if (onNavigateToMyWeddingPayments) {
            onNavigateToMyWeddingPayments();
          } else {
            window.dispatchEvent(
              new CustomEvent('tot_switch_to_my_wedding_payments', { detail: { vendorId: artist.id } })
            );
          }
        }}
        onNavigateToProfileMyBookings={() => {
          setShowInvoiceModal(false);
          if (onNavigateToProfileMyBookings) {
            onNavigateToProfileMyBookings();
          } else {
            window.dispatchEvent(
              new CustomEvent('tot_switch_to_profile_my_bookings', { detail: { vendorId: artist.id } })
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
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: '#FAF7F2',
    borderBottomWidth: 1,
    borderBottomColor: '#EFE7DE',
    zIndex: 10,
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
  },
  navTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2A2425',
    fontFamily: 'Playfair Display, serif',
    maxWidth: '55%',
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
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.42)',
  },
  tierBadgeContainer: {
    position: 'absolute',
    top: 14,
    left: 14,
  },
  tierBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(42, 36, 37, 0.85)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(194, 142, 56, 0.4)',
  },
  tierBadgeText: {
    color: '#F3E5AB',
    fontSize: 11,
    fontWeight: '700',
  },
  heroContent: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
  },
  artistName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    fontFamily: 'Playfair Display, serif',
    marginBottom: 6,
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#581420',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    marginRight: 6,
  },
  starText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  reviewsText: {
    color: '#EFE7DE',
    fontSize: 12,
    fontWeight: '500',
  },
  dotSeparator: {
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.6)',
    marginHorizontal: 8,
  },
  locationText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  quickInfoRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#E8DFD5',
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
  quickInfoSubValue: {
    fontSize: 10,
    fontWeight: '500',
    color: '#7D6E70',
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
    gap: 6,
    paddingHorizontal: 16,
    marginTop: 16,
  },
  highlightPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3ECE3',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E8DFD5',
  },
  highlightText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#581420',
  },
  sectionContainer: {
    paddingHorizontal: 16,
    marginTop: 18,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#2A2425',
    fontFamily: 'Playfair Display, serif',
    marginBottom: 6,
  },
  descriptionText: {
    fontSize: 13,
    lineHeight: 19,
    color: '#5A4C4E',
  },
  trustBadgesGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginHorizontal: 20,
      marginBottom: 24,
    },
    trustBadgeCard: {
      width: '48%',
      backgroundColor: '#FAFAFA',
      borderRadius: 12,
      padding: 12,
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#F0F0F0',
      marginBottom: 12,
    },
    badgeIconBg: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: '#FFFFFF',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 2,
    },
    badgeTextCol: {
      flex: 1,
      flexShrink: 1,
    },
    badgeTitle: {
      fontFamily: 'Inter-Medium',
      fontSize: 11,
      color: '#8C7A7C',
      marginBottom: 2,
      flexShrink: 1,
    },
    badgeValue: {
      fontFamily: 'Inter-SemiBold',
      fontSize: 12,
      color: '#2A2425',
      flexShrink: 1,
    },
    tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E8DFD5',
    marginTop: 20,
    paddingHorizontal: 16,
  },
  tabItem: {
    paddingVertical: 10,
    marginRight: 16,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabItemActive: {
    borderBottomColor: '#581420',
  },
  tabItemText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#7D6E70',
  },
  tabItemTextActive: {
    color: '#581420',
    fontWeight: '800',
  },
  tabContent: {
    paddingHorizontal: 16,
    paddingTop: 14,
  },
  tabSubtitle: {
    fontSize: 11,
    color: '#7D6E70',
    marginBottom: 10,
    fontWeight: '500',
  },
  portfolioGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  portfolioImageWrapper: {
    width: '31.5%',
    aspectRatio: 1,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  portfolioGridImg: {
    width: '100%',
    height: '100%',
  },
  portfolioOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  packageCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E8DFD5',
    position: 'relative',
    overflow: 'hidden',
  },
  packageCardPopular: {
    borderColor: '#581420',
    borderWidth: 1.5,
  },
  popularRibbon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#581420',
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginBottom: 10,
    alignSelf: 'flex-start',
    borderRadius: 8,
  },
  popularRibbonText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  packageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  packageTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#2A2425',
    fontFamily: 'Playfair Display, serif',
    flex: 1,
    marginRight: 8,
  },
  packagePrice: {
    fontSize: 13,
    fontWeight: '800',
    color: '#581420',
  },
  packageFeaturesList: {
    gap: 6,
    marginBottom: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureText: {
    fontSize: 12,
    color: '#4A3D3F',
  },
  packageBookBtn: {
    backgroundColor: '#F3ECE3',
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E8DFD5',
  },
  packageBookBtnText: {
    color: '#581420',
    fontSize: 11,
    fontWeight: '700',
  },
  brandsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 14,
  },
  brandCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E8DFD5',
  },
  brandName: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2A2425',
  },
  brandGuaranteeBox: {
    flexDirection: 'row',
    backgroundColor: '#F3ECE3',
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E8DFD5',
    alignItems: 'flex-start',
  },
  guaranteeTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#581420',
    marginBottom: 2,
  },
  guaranteeSub: {
    fontSize: 11,
    color: '#6A5B5D',
    lineHeight: 15,
  },
  reviewCard: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E8DFD5',
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatarBox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3ECE3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  reviewerName: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2A2425',
  },
  reviewerEvent: {
    fontSize: 10,
    color: '#7D6E70',
  },
  reviewRatingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  reviewRatingText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#92400E',
  },
  reviewComment: {
    fontSize: 12,
    color: '#4A3D3F',
    lineHeight: 17,
    marginBottom: 4,
  },
  reviewDate: {
    fontSize: 10,
    color: '#9CA3AF',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E8DFD5',
    paddingVertical: 10,
    zIndex: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  bottomPriceCol: {
    flexShrink: 1,
    marginRight: 4,
    justifyContent: 'center',
  },
  bottomPriceLabel: {
    fontSize: 9.5,
    color: '#7D6E70',
    fontWeight: '500',
    lineHeight: 12,
  },
  bottomPriceValue: {
    fontSize: 13.5,
    fontWeight: '800',
    color: '#2A2425',
    lineHeight: 18,
  },
  bottomActionBtns: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexShrink: 0,
  },
  callIconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3ECE3',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E8DFD5',
  },
  whatsappIconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#DCFCE7',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  quoteBtnMain: {
    backgroundColor: '#581420',
    paddingHorizontal: 12,
    height: 38,
    borderRadius: 19,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quoteBtnMainText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  photoModalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.92)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  photoModalClose: {
    position: 'absolute',
    top: 24,
    right: 24,
    zIndex: 10,
    padding: 8,
  },
  fullPhoto: {
    width: '100%',
    height: '80%',
  },
});



