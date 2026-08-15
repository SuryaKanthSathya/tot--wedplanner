import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
  Linking,
} from 'react-native-web';
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
  Utensils,
  
  Palette,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { QuotationScreen } from './QuotationScreen';
import { CateringVendor } from './CateringListingPage';
import { RequestQuoteModal } from './RequestQuoteModal';
import { WeddingInvoicePaymentModal } from './WeddingInvoicePaymentModal';
import { saveOrUpdateQuote } from '../utils/quotesManager';
import {
  getWeddingBookingByVendorId,
  saveOrUpdateWeddingBooking,
} from '../utils/weddingPaymentsManager';

interface CatererDetailPageProps {
  onNavigateToQuotesTab?: () => void;
  caterer: CateringVendor;
  onBack: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  bookingSource?: 'entire_wedding' | 'individual';
  onNavigateToMyWeddingPayments?: () => void;
  onNavigateToProfileMyBookings?: () => void;
}

export const CatererDetailPage: React.FC<CatererDetailPageProps> = ({
  onNavigateToQuotesTab,
  caterer,
  onBack,
  isBookmarked,
  onToggleBookmark,
  bookingSource = 'entire_wedding',
  onNavigateToMyWeddingPayments,
  onNavigateToProfileMyBookings,
}) => {
  const [activeTab, setActiveTab] = useState<'portfolio' | 'packages' | 'highlights' | 'reviews'>('portfolio');
  const [activePhotoModal, setActivePhotoModal] = useState<string | null>(null);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Quote Flow Local States
  const [quoteStatus, setQuoteStatus] = useState<
    'initial' | 'requested' | 'response_ready' | 'confirmed' | 'partially_paid' | 'fully_paid' | 'rejected' | 'negotiating'
  >(() => {
    try {
      const savedQuotesJson = localStorage.getItem('tot_confirmed_quotes');
      if (savedQuotesJson) {
        const quotes = JSON.parse(savedQuotesJson);
        const match = quotes.find((q: any) => q.id === `quote-${caterer.id}`);
        if (match) {
          if (match.paymentStatus === 'fully_paid') return 'fully_paid';
          if (match.paymentStatus === 'partially_paid') return 'partially_paid';
          if (match.status === 'confirmed') return 'confirmed';
        }
      }
      const statusesJson = localStorage.getItem('tot_quote_statuses');
      if (statusesJson) {
        const statuses = JSON.parse(statusesJson);
        if (statuses[caterer.id]) {
          return statuses[caterer.id];
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
      statuses[caterer.id] = newStatus;
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
    const basePrice = parseInt((caterer.startingPrice || '₹1,10,000').replace(/[^0-9]/g, ''), 10) || 110000;
    saveOrUpdateQuote({
      id: `quote-${caterer.id}`,
      vendorId: caterer.id,
      vendorName: caterer.name,
      category: 'Catering',
      packageName: 'Grand Royal Buffet Wedding Menu',
      status: 'requested',
      paymentStatus: 'pending',
      totalAmount: basePrice,
      advanceAmount: Math.round(basePrice * 0.3),
      remainingAmount: basePrice - Math.round(basePrice * 0.3),
      weddingDate: '24 Oct 2026',
      location: caterer.location,
      includedServices: [
        'Traditional Welcome Drinks & Shorba',
        'Gourmet Starters & Live Counters (5 Items)',
        'Traditional Main Course (12 Special Items)',
        'Artisanal Dessert Station (4 Items)',
        'Premium Catering Staff & Table Service',
      ],
      image: caterer.image,
    });
    setToastMessage('Quote Request Sent! Added to My Quotes');
    setTimeout(() => setToastMessage(null), 3000);

    // Simulate response after 3 seconds
    setTimeout(() => {
      updateQuoteStatus('response_ready');
      saveOrUpdateQuote({
        id: `quote-${caterer.id}`,
        status: 'response_ready',
      });
      setToastMessage('Vendor Quotation Received! Click "View Quote"');
      setTimeout(() => setToastMessage(null), 4000);
    }, 3000);
  };


  const portfolioImages = caterer.portfolio && caterer.portfolio.length > 0
    ? caterer.portfolio
    : [
        caterer.image,
        'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1628294895950-9805252327bc?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80',
      ];

  const packagesList = [
    {
      title: 'South Indian Grand Feast',
      price: caterer.startingPrice,
      popular: true,
      features: [
        'Traditional Banana Leaf Service',
        'Authentic Chettinad & Iyer Specialties',
        'Premium Crockery & Cutlery Included',
        'Live Dosa & Appam Counters',
        'Complimentary Dessert Tasting Session',
      ],
    },
    {
      title: 'Grand Reception Buffet',
      price: `₹${(caterer.priceValue + 12000).toLocaleString('en-IN')} onwards`,
      popular: false,
      features: [
        'Multi-Cuisine Extravaganza (North Indian, Asian, Italian)',
        'Elegant Buffet Display & Lighting',
        'Live Pasta & Chaat Stations',
        'Premium Ingredients & Organic Produce',
        'Dedicated Catering Managers & Stewards',
      ],
    },
    {
      title: 'Engagement & High Tea Catering',
      price: `₹${(Math.round(caterer.priceValue * 0.6)).toLocaleString('en-IN')} onwards`,
      popular: false,
      features: [
        'Assorted Mini Savories & Sweets',
        'Live Filter Coffee & Fresh Juices',
        'Floating Starters & Mocktails',
        'Customizable Menu Selection Consultation',
      ],
    },
    {
      title: 'Intimate Family Gathering Setup',
      price: '₹12,000 onwards',
      popular: false,
      features: [
        'Homestyle Authentic Cooking',
        'Hassle-free Cleanup & Waste Management',
        'Perfect for 50-100 Guests',
        'Personalized Table Service',
      ],
    },
  ];

  const cateringHighlights = caterer.brandsUsed || [
    'FSSAI Certified',
    'No MSG or Artificial Colors',
    'Farm Fresh Vegetables',
    'RO Purified Water Cooking',
    'A-Grade Grocery & Spices',
    'Experienced Chefs',
    'Uniformed Serving Staff',
    'Biodegradable Plates',
    'ISO Standard Kitchen',
  ];

  const reviewsList = [
    {
      id: 'rev-1',
      name: 'Priyanka & Karthi',
      date: 'January 2026',
      event: 'catering Muhurtham in ' + caterer.location,
      rating: 5,
      comment: `Absolute magic! ${caterer.name} made me look like an absolute queen on my wedding day. The food was absolutely delicious and the service lasted from 5 AM until afternoon without cracking or fading!`,
    },
    {
      id: 'rev-2',
      name: 'Dr. Sneha Rajan',
      date: 'December 2025',
      event: 'Grand Reception Buffet',
      rating: 5,
      comment: `Extremely professional team. They arrived right on time at 3:00 AM at our venue. Used genuine MAC and No MSG or Artificial Colors products. My hair extensions and flower veni setting received so many compliments!`,
    },
    {
      id: 'rev-3',
      name: 'Ananya V.',
      date: 'November 2025',
      event: 'Engagement & Sangeet',
      rating: 5,
      comment: `The taste was authentic and portion sizes were generous! I was worried about quality, but ${caterer.name} understood my skin tone perfectly. Highly recommended for all South Indian brides!`,
    },
  ];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: caterer.name,
        text: `Check out ${caterer.name} for catering catering!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      setToastMessage('Link copied to clipboard!');
      setTimeout(() => setToastMessage(null), 2500);
    }
  };

  const handleCallPhone = () => {
    const phoneNumber = caterer.phone ? caterer.phone.replace(/[^0-9+]/g, '') : '+919150197966';
    Linking.openURL(`tel:${phoneNumber}`).catch(() => {
      setToastMessage(`Call ${caterer.phone || '+91 91501 97966'}`);
      setTimeout(() => setToastMessage(null), 3000);
    });
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(`Hi ${caterer.name}, I found your catering catering profile on WeddingApp and would like to check availability for my wedding date.`);
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

        <Text style={styles.navTitle} numberOfLines={1}>{caterer.name}</Text>

        <View style={{ flexDirection: 'row', gap: 8 }}>
          <TouchableOpacity style={styles.navBtn} onPress={handleShare} activeOpacity={0.7}>
            <Share2 className="w-4.5 h-4.5 text-[#2A2425]" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navBtn} onPress={() => onToggleBookmark(caterer.id)} activeOpacity={0.7}>
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
          <Image source={{ uri: caterer.image }} style={styles.heroImage} />
          <View style={styles.heroOverlay} />
          
          <View style={styles.tierBadgeContainer}>
            <View style={styles.tierBadge}>
              <Award className="w-3.5 h-3.5 text-[#C28E38] mr-1" />
              <Text style={styles.tierBadgeText}>{caterer.tier} Catering Artist</Text>
            </View>
          </View>

          <View style={styles.heroContent}>
            <Text style={styles.catererName}>{caterer.name}</Text>
            
            <View style={styles.ratingRow}>
              <View style={styles.starPill}>
                <Star className="w-3.5 h-3.5 text-white fill-white mr-1" />
                <Text style={styles.starText}>{caterer.rating.toFixed(1)}</Text>
              </View>
              <Text style={styles.reviewsText}>({caterer.reviewsCount} verified reviews)</Text>
              <View style={styles.dotSeparator} />
              <MapPin className="w-3.5 h-3.5 text-white/80 mr-1" />
              <Text style={styles.locationText}>{caterer.location}</Text>
            </View>
          </View>
        </View>

        {/* QUICK INFO CARDS ROW */}
        <View style={styles.quickInfoRow}>
          <View style={[styles.quickInfoCard, { flex: 1 }]}>
            <Text style={styles.quickInfoLabel}>Starting Price</Text>
            <Text style={styles.quickInfoValue}>{caterer.startingPrice}</Text>
          </View>

          <View style={styles.quickInfoDivider} />

          <View style={[styles.quickInfoCard, { flex: 1.3 }]}>
            <Text style={styles.quickInfoLabel}>Specialization</Text>
            <Text style={styles.quickInfoValueSpecial} numberOfLines={2}>
              {caterer.category}
            </Text>
          </View>

          <View style={styles.quickInfoDivider} />

          <View style={[styles.quickInfoCard, { flex: 1 }]}>
            <Text style={styles.quickInfoLabel}>Experience</Text>
            <Text style={styles.quickInfoValue}>{caterer.experience || '8+ Years'}</Text>
          </View>
        </View>

        {/* HIGHLIGHTS BADGES */}
        <View style={styles.highlightsContainer}>
          <View style={styles.highlightPill}>
            <CheckCircle2 className="w-3.5 h-3.5 text-[#581420] mr-1.5" />
            <Text style={styles.highlightText}>Tasting Session Available</Text>
          </View>
          <View style={styles.highlightPill}>
            <ShieldCheck className="w-3.5 h-3.5 text-[#581420] mr-1.5" />
            <Text style={styles.highlightText}>100% Hygiene Assured</Text>
          </View>
          <View style={styles.highlightPill}>
            <Sparkles className="w-3.5 h-3.5 text-[#581420] mr-1.5" />
            <Text style={styles.highlightText}>Live Counters & Buffet</Text>
          </View>
          <View style={styles.highlightPill}>
            <Utensils className="w-3.5 h-3.5 text-[#581420] mr-1.5" />
            <Text style={styles.highlightText}>Premium Cutlery Included</Text>
          </View>
        </View>

        {/* DESCRIPTION */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>About {caterer.name}</Text>
          <Text style={styles.descriptionText}>
            {caterer.description ||
              `${caterer.name} is one of ${caterer.location}'s most sought-after catering services.`} We specialize in authentic flavors, premium ingredients, and impeccable presentation. Our expert chefs craft customized menus tailored to your taste, ensuring a memorable dining experience for you and your guests.
            We prioritize quality, consistency, and guest satisfaction, making us the perfect partner for your special events.
          </Text>
        </View>

        {/* TRUST BADGES GRID */}
        <View style={styles.trustBadgesGrid}>
          <View style={styles.trustBadgeCard}>
            <Image source={{uri: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png'}} style={{width: 24, height: 24, marginBottom: 8}} />
            <Text style={styles.trustBadgeLabel}>Google Reviews</Text>
            <Text style={styles.trustBadgeValue}>4.8 <Star size={12} color="#111827" fill="#111827" style={{marginLeft: 2, transform: 'translateY(1px)'}} /></Text>
          </View>
          <View style={styles.trustBadgeCard}>
            <View style={styles.instagramIconWrapper}>
              <Instagram size={18} color="#E1306C" />
            </View>
            <Text style={styles.trustBadgeLabel}>Instagram</Text>
            <Text 
              style={[styles.trustBadgeValue, { flexShrink: 1, width: '100%' }]} 
              numberOfLines={1} 
              ellipsizeMode="tail"
            >
              @{caterer.name.replace(/\s+/g, '').toLowerCase()}
            </Text>
          </View>
          <View style={styles.trustBadgeCard}>
            <View style={styles.awardIconWrapper}>
              <Award size={18} color="#D97706" />
            </View>
            <Text style={styles.trustBadgeLabel}>Awards</Text>
            <Text style={styles.trustBadgeValue}>15 Awards</Text>
          </View>
          <View style={styles.trustBadgeCard}>
            <View style={styles.verifiedIconWrapper}>
              <ShieldCheck size={18} color="#10B981" />
            </View>
            <Text style={styles.trustBadgeLabel}>TOT Certified</Text>
            <Text style={styles.trustBadgeValue}>Verified Vendor</Text>
          </View>
        </View>

        {/* INTERACTIVE TABS */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16 }} style={[styles.tabBar, { paddingHorizontal: 0, marginHorizontal: -16 }]}>
          <TouchableOpacity
            style={[styles.tabItem, activeTab === 'portfolio' && styles.tabItemActive]}
            onPress={() => setActiveTab('portfolio')}
          >
            <Text style={[styles.tabItemText, activeTab === 'portfolio' && styles.tabItemTextActive]}>
              Catering Setup Gallery
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
            style={[styles.tabItem, activeTab === 'highlights' && styles.tabItemActive]}
            onPress={() => setActiveTab('highlights')}
          >
            <Text style={[styles.tabItemText, activeTab === 'highlights' && styles.tabItemTextActive]}>
              Quality Assurance
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabItem, activeTab === 'reviews' && styles.tabItemActive]}
            onPress={() => setActiveTab('reviews')}
          >
            <Text style={[styles.tabItemText, activeTab === 'reviews' && styles.tabItemTextActive]}>
              Reviews ({caterer.reviewsCount})
            </Text>
          </TouchableOpacity>
        </ScrollView>

        {/* TAB 1: PORTFOLIO */}
        {activeTab === 'portfolio' && (
          <View style={styles.tabContent}>
            <Text style={styles.tabSubtitle}>Tap image to view catering setup and menu details</Text>
            <View style={styles.portfolioGrid}>
              {portfolioImages.map((imgUrl, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.portfolioImageWrapper}
                  onPress={() => setActivePhotoModal(imgUrl)}
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
                    <Text style={styles.popularRibbonText}>Most Booked catering Package</Text>
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

        {/* TAB 3: COSMETIC BRANDS */}
        {activeTab === 'highlights' && (
          <View style={styles.tabContent}>
            <Text style={styles.tabSubtitle}>100% Authentic Luxury & High-Definition Cosmetics Used</Text>
            <View style={styles.brandsGrid}>
              {cateringHighlights.map((brand, bIdx) => (
                <View key={bIdx} style={styles.brandCard}>
                  <Palette className="w-4 h-4 text-[#581420] mr-2" />
                  <Text style={styles.brandName}>{brand}</Text>
                </View>
              ))}
            </View>

            <View style={styles.brandGuaranteeBox}>
              <ShieldCheck className="w-5 h-5 text-[#581420] mr-2" />
              <View style={{ flex: 1 }}>
                <Text style={styles.guaranteeTitle}>Hygienic & Skin-Safe Assurance</Text>
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
        <View style={styles.bottomPriceCol}>
          <Text style={styles.bottomPriceLabel}>Starting From</Text>
          <Text style={styles.bottomPriceValue}>{caterer.startingPrice}</Text>
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
        vendorId={caterer.id}
        onClose={() => setShowQuoteModal(false)}
        vendorName={caterer.name}
        startingPrice={caterer.startingPrice}
        location={caterer.location}
        category="catering"
        onQuoteSent={handleQuoteRequestSent}
      />

      <QuotationScreen
        visible={showQuotationScreen}
        onClose={() => setShowQuotationScreen(false)}
        quoteStatus={quoteStatus}
        setQuoteStatus={updateQuoteStatus}
        vendorId={caterer.id}
        vendorName={caterer.name}
        vendorImage={caterer.image}
        vendorLocation={caterer.location}
        startingPrice={caterer.startingPrice}
        category="Catering"
        packageName="Grand Royal Buffet Wedding Menu"
        includedServices={[
          'Traditional Welcome Drinks & Shorba',
          'Gourmet Starters & Live Counters (5 Items)',
          'Traditional Main Course (12 Special Items)',
          'Artisanal Dessert Station (4 Items)',
          'Premium Catering Staff & Table Service',
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
        vendorId={caterer.id}
        vendorName={caterer.name}
        vendorImage={caterer.image}
        vendorLocation={caterer.location}
        category="Catering"
        startingPrice={caterer.startingPrice || '₹750 / plate'}
        bookingSource={bookingSource}
        onNavigateToMyWeddingPayments={() => {
          setShowInvoiceModal(false);
          if (onNavigateToMyWeddingPayments) {
            onNavigateToMyWeddingPayments();
          } else {
            window.dispatchEvent(
              new CustomEvent('tot_switch_to_my_wedding_payments', { detail: { vendorId: caterer.id } })
            );
          }
        }}
        onNavigateToProfileMyBookings={() => {
          setShowInvoiceModal(false);
          if (onNavigateToProfileMyBookings) {
            onNavigateToProfileMyBookings();
          } else {
            window.dispatchEvent(
              new CustomEvent('tot_switch_to_profile_my_bookings', { detail: { vendorId: caterer.id } })
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
    ...StyleSheet.absoluteFillObject,
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
  catererName: {
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
  
  trustBadgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  trustBadgeCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EFE7DE',
    borderRadius: 12,
    padding: 16,
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  trustBadgeLabel: {
    fontSize: 12,
    color: '#6B5A5C',
    marginBottom: 4,
  },
  trustBadgeValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
    flexDirection: 'row',
    alignItems: 'center',
  },
  instagramIconWrapper: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FDF2F8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  awardIconWrapper: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FEF3C7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  verifiedIconWrapper: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#ECFDF5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
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
    ...StyleSheet.absoluteFillObject,
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
    height: 64,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E8DFD5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    zIndex: 20,
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



