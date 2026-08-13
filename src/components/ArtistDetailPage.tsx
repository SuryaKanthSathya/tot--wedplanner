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
import { MehendiArtist } from './MehendiListingPage';
import { RequestQuoteModal } from './RequestQuoteModal';

interface ArtistDetailPageProps {
  artist: MehendiArtist;
  onBack: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
}

export const ArtistDetailPage: React.FC<ArtistDetailPageProps> = ({
  artist,
  onBack,
  isBookmarked,
  onToggleBookmark,
}) => {
  const [activeTab, setActiveTab] = useState<'portfolio' | 'packages' | 'designs' | 'reviews'>('portfolio');
  const [activePhotoModal, setActivePhotoModal] = useState<string | null>(null);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const portfolioImages = artist.portfolio && artist.portfolio.length > 0
    ? artist.portfolio
    : [
        artist.image,
        '/images/mehendi/mehendi_arabic_style_1786617685166.jpg',
        '/images/mehendi/mehendi_intricate_palms_1786617718285.jpg',
        '/images/mehendi/mehendi_jewelry_bangles_1786617751591.jpg',
        '/images/mehendi/mehendi_modern_minimalist_1786617671026.jpg',
        '/images/mehendi/mehendi_traditional_feet_1786617653822.jpg',
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
    const phoneNumber = artist.phone ? artist.phone.replace(/[^0-9+]/g, '') : '+919876543210';
    Linking.openURL(`tel:${phoneNumber}`).catch(() => {
      setToastMessage(`Call ${artist.phone || '+91 98765 43210'}`);
      setTimeout(() => setToastMessage(null), 3000);
    });
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(`Hi ${artist.name}, I found your bridal mehendi profile on WeddingApp and would like to check availability for my wedding date.`);
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
        artistName={artist.name}
        startingPrice={artist.startingPrice}
        location={artist.location}
        category="mehendi"
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
