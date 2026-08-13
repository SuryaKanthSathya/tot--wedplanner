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
  Scissors,
  Smile,
  Palette,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MakeupStudio } from './MakeupListingPage';
import { RequestQuoteModal } from './RequestQuoteModal';

interface MakeupDetailPageProps {
  studio: MakeupStudio;
  onBack: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
}

export const MakeupDetailPage: React.FC<MakeupDetailPageProps> = ({
  studio,
  onBack,
  isBookmarked,
  onToggleBookmark,
}) => {
  const [activeTab, setActiveTab] = useState<'portfolio' | 'packages' | 'brands' | 'reviews'>('portfolio');
  const [activePhotoModal, setActivePhotoModal] = useState<string | null>(null);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const portfolioImages = studio.portfolio && studio.portfolio.length > 0
    ? studio.portfolio
    : [
        studio.image,
        'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80',
      ];

  const packagesList = [
    {
      title: 'South Indian Muhurtham Package',
      price: studio.startingPrice,
      popular: true,
      features: [
        'HD / Airbrush Long-lasting Base',
        'Traditional Poola-Jada Hair Braiding with Fresh Flowers',
        'Precision Saree Iron-Pleating & Draping',
        'Lash Application & Custom Lip Blend',
        'Complimentary Touch-up Kit for Mandap',
      ],
    },
    {
      title: 'Grand Reception Glamour',
      price: `₹${(studio.priceValue + 12000).toLocaleString('en-IN')} onwards`,
      popular: false,
      features: [
        'Sweatproof Airbrush Contour & Body Glow',
        'High-fashion Hair Styling & Extensions',
        'Luxury Eye Art & Swarovski Rhinestone Accents',
        'International Cosmetics (Dior, NARS, Charlotte Tilbury)',
        'On-location Touchup Assistance throughout event',
      ],
    },
    {
      title: 'Engagement & Pre-Wedding Trial',
      price: `₹${(Math.round(studio.priceValue * 0.6)).toLocaleString('en-IN')} onwards`,
      popular: false,
      features: [
        'Soft Radiant HD Makeup',
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

  const cosmeticBrands = studio.brandsUsed || [
    'MAC Cosmetics',
    'Charlotte Tilbury',
    'NARS',
    'Huda Beauty',
    'Dior Beauty',
    'Bobbi Brown',
    'TEMPTU Airbrush',
    'Estée Lauder',
    'Kryolan',
  ];

  const reviewsList = [
    {
      id: 'rev-1',
      name: 'Priyanka & Karthi',
      date: 'January 2026',
      event: 'Bridal Muhurtham in ' + studio.location,
      rating: 5,
      comment: `Absolute magic! ${studio.name} made me look like an absolute queen on my wedding day. The saree draping was so neat and the HD makeup lasted from 5 AM until afternoon without cracking or fading!`,
    },
    {
      id: 'rev-2',
      name: 'Dr. Sneha Rajan',
      date: 'December 2025',
      event: 'Grand Reception Glamour',
      rating: 5,
      comment: `Extremely professional team. They arrived right on time at 3:00 AM at our venue. Used genuine MAC and Charlotte Tilbury products. My hair extensions and flower veni setting received so many compliments!`,
    },
    {
      id: 'rev-3',
      name: 'Ananya V.',
      date: 'November 2025',
      event: 'Engagement & Sangeet',
      rating: 5,
      comment: `The glow was so natural and skin-like! I was worried about looking cakey, but ${studio.name} understood my skin tone perfectly. Highly recommended for all South Indian brides!`,
    },
  ];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: studio.name,
        text: `Check out ${studio.name} for bridal makeup!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      setToastMessage('Link copied to clipboard!');
      setTimeout(() => setToastMessage(null), 2500);
    }
  };

  const handleCallPhone = () => {
    const phoneNumber = studio.phone ? studio.phone.replace(/[^0-9+]/g, '') : '+919876543210';
    Linking.openURL(`tel:${phoneNumber}`).catch(() => {
      setToastMessage(`Call ${studio.phone || '+91 98765 43210'}`);
      setTimeout(() => setToastMessage(null), 3000);
    });
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(`Hi ${studio.name}, I found your bridal makeup profile on WeddingApp and would like to check availability for my wedding date.`);
    Linking.openURL(`https://wa.me/919876543210?text=${text}`).catch(() => {
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
            className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] bg-[#2A2425] text-white px-4 py-2.5 rounded-full text-xs font-semibold shadow-xl flex items-center gap-2"
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

        <Text style={styles.navTitle} numberOfLines={1}>{studio.name}</Text>

        <View style={{ flexDirection: 'row', gap: 8 }}>
          <TouchableOpacity style={styles.navBtn} onPress={handleShare} activeOpacity={0.7}>
            <Share2 className="w-4.5 h-4.5 text-[#2A2425]" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navBtn} onPress={() => onToggleBookmark(studio.id)} activeOpacity={0.7}>
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
          <Image source={{ uri: studio.image }} style={styles.heroImage} />
          <View style={styles.heroOverlay} />
          
          <View style={styles.tierBadgeContainer}>
            <View style={styles.tierBadge}>
              <Award className="w-3.5 h-3.5 text-[#C28E38] mr-1" />
              <Text style={styles.tierBadgeText}>{studio.tier} Makeup Artist</Text>
            </View>
          </View>

          <View style={styles.heroContent}>
            <Text style={styles.studioName}>{studio.name}</Text>
            
            <View style={styles.ratingRow}>
              <View style={styles.starPill}>
                <Star className="w-3.5 h-3.5 text-white fill-white mr-1" />
                <Text style={styles.starText}>{studio.rating.toFixed(1)}</Text>
              </View>
              <Text style={styles.reviewsText}>({studio.reviewsCount} verified reviews)</Text>
              <View style={styles.dotSeparator} />
              <MapPin className="w-3.5 h-3.5 text-white/80 mr-1" />
              <Text style={styles.locationText}>{studio.location}</Text>
            </View>
          </View>
        </View>

        {/* QUICK INFO CARDS ROW */}
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
            <Text style={styles.quickInfoValue}>{studio.experience || '8+ Years'}</Text>
          </View>
        </View>

        {/* HIGHLIGHTS BADGES */}
        <View style={styles.highlightsContainer}>
          <View style={styles.highlightPill}>
            <CheckCircle2 className="w-3.5 h-3.5 text-[#581420] mr-1.5" />
            <Text style={styles.highlightText}>Trial Session Available</Text>
          </View>
          <View style={styles.highlightPill}>
            <ShieldCheck className="w-3.5 h-3.5 text-[#581420] mr-1.5" />
            <Text style={styles.highlightText}>100% Sanitized Tools</Text>
          </View>
          <View style={styles.highlightPill}>
            <Sparkles className="w-3.5 h-3.5 text-[#581420] mr-1.5" />
            <Text style={styles.highlightText}>On-Venue Travel (Pan-TN)</Text>
          </View>
          <View style={styles.highlightPill}>
            <Scissors className="w-3.5 h-3.5 text-[#581420] mr-1.5" />
            <Text style={styles.highlightText}>Hair Extensions & Saree Draping</Text>
          </View>
        </View>

        {/* DESCRIPTION */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>About {studio.name}</Text>
          <Text style={styles.descriptionText}>
            {studio.description ||
              `${studio.name} is one of ${studio.location}'s most sought-after bridal makeup studios. Renowned for flawless HD airbrush finishes, sweatproof long-wearing cosmetics, and artistic traditional South Indian bridal transformations.`}
          </Text>
        </View>

        {/* INTERACTIVE TABS */}
        <View style={styles.tabBar}>
          <TouchableOpacity
            style={[styles.tabItem, activeTab === 'portfolio' && styles.tabItemActive]}
            onPress={() => setActiveTab('portfolio')}
          >
            <Text style={[styles.tabItemText, activeTab === 'portfolio' && styles.tabItemTextActive]}>
              Bridal Look Portfolio
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
            style={[styles.tabItem, activeTab === 'brands' && styles.tabItemActive]}
            onPress={() => setActiveTab('brands')}
          >
            <Text style={[styles.tabItemText, activeTab === 'brands' && styles.tabItemTextActive]}>
              Cosmetic Brands
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabItem, activeTab === 'reviews' && styles.tabItemActive]}
            onPress={() => setActiveTab('reviews')}
          >
            <Text style={[styles.tabItemText, activeTab === 'reviews' && styles.tabItemTextActive]}>
              Reviews ({studio.reviewsCount})
            </Text>
          </TouchableOpacity>
        </View>

        {/* TAB 1: PORTFOLIO */}
        {activeTab === 'portfolio' && (
          <View style={styles.tabContent}>
            <Text style={styles.tabSubtitle}>Tap image to view high-definition bridal details</Text>
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

        {/* TAB 3: COSMETIC BRANDS */}
        {activeTab === 'brands' && (
          <View style={styles.tabContent}>
            <Text style={styles.tabSubtitle}>100% Authentic Luxury & High-Definition Cosmetics Used</Text>
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
          <Text style={styles.bottomPriceValue}>{studio.startingPrice}</Text>
        </View>

        <View style={styles.bottomActionBtns}>
          <TouchableOpacity style={styles.callIconBtn} onPress={handleCallPhone} activeOpacity={0.8}>
            <Phone className="w-4 h-4 text-[#2A2425]" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.whatsappIconBtn} onPress={handleWhatsApp} activeOpacity={0.8}>
            <MessageCircle className="w-4 h-4 text-emerald-700" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quoteBtnMain}
            onPress={() => setShowQuoteModal(true)}
            activeOpacity={0.85}
          >
            <Send className="w-4 h-4 text-white mr-1.5" />
            <Text style={styles.quoteBtnMainText}>Request Quote</Text>
          </TouchableOpacity>
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
        onClose={() => setShowQuoteModal(false)}
        studioName={studio.name}
        startingPrice={studio.startingPrice}
        location={studio.location}
        category="makeup"
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
  studioName: {
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
