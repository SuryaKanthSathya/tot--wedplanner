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
  Share2,
  Heart,
  Star,
  MapPin,
  Calendar,
  Sparkles,
  Users,
  Award,
  ShieldCheck,
  Instagram,
  Phone,
  MessageCircle,
  X,
  Briefcase,
  Globe,
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
  const [activePhotoModal, setActivePhotoModal] = useState<string | null>(null);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const portfolioImages = studio.portfolio && studio.portfolio.length >= 4
    ? studio.portfolio.slice(0, 4)
    : [
        studio.image,
        'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=600&q=80',
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
    const text = encodeURIComponent(`Hi ${studio.name}, I found your profile and would like to check availability.`);
    Linking.openURL(`https://wa.me/919876543210?text=${text}`).catch(() => {
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
            className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] bg-[#2A2425] text-white px-4 py-2.5 rounded-full text-xs font-semibold shadow-xl flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-[#C28E38]" />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER NAV BAR (Transparent overlapping top) */}
      <View style={styles.navHeader}>
        <TouchableOpacity style={styles.navBtn} onPress={onBack} activeOpacity={0.7}>
          <ChevronLeft className="w-5 h-5 text-[#2A2425]" />
        </TouchableOpacity>

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
        {/* HERO IMAGE */}
        <View style={styles.heroContainer}>
          <Image source={{ uri: studio.image }} style={styles.heroImage} />
          <View style={styles.heroOverlay} />
        </View>

        {/* OVERLAPPING MAIN CARD */}
        <View style={styles.mainCard}>
          {/* Header Row */}
          <View style={styles.titleRow}>
            <Image source={{ uri: studio.image }} style={styles.logoThumbnail} />
            <View style={styles.titleInfo}>
              <Text style={styles.studioName} numberOfLines={1}>{studio.name}</Text>
              
              <View style={styles.totBadge}>
                <ShieldCheck size={10} color="#C28E38" />
                <Text style={styles.totBadgeText}>TOT CERTIFIED</Text>
              </View>

              <Text style={styles.subtitleText}>Makeup Studio</Text>
              <Text style={styles.subtitleText}>{studio.tier} • {studio.location}</Text>
              
              <View style={styles.ratingRow}>
                <Star size={12} color="#FBBF24" fill="#FBBF24" />
                <Text style={styles.ratingText}>
                  {studio.rating.toFixed(1)} <Text style={styles.reviewsCount}>({studio.reviewsCount} Reviews)</Text>
                </Text>
              </View>
            </View>
          </View>

          {/* QUICK INFO (4 columns) */}
          <View style={styles.quickInfoBox}>
            <View style={styles.quickInfoItem}>
              <Briefcase size={16} color="#4B5563" />
              <Text style={styles.quickInfoVal}>{studio.experience || '8+ Years'}</Text>
              <Text style={styles.quickInfoLbl}>Experience</Text>
            </View>
            
            <View style={styles.quickInfoDivider} />
            
            <View style={styles.quickInfoItem}>
              <Text style={{ fontSize: 13, fontWeight: '700', color: '#4B5563', marginBottom: 2 }}>₹₹₹₹</Text>
              <Text style={styles.quickInfoVal}>Price Range</Text>
              <Text style={styles.quickInfoLbl}>{studio.startingPrice}</Text>
            </View>
            
            <View style={styles.quickInfoDivider} />
            
            <View style={styles.quickInfoItem}>
              <Globe size={16} color="#4B5563" />
              <Text style={styles.quickInfoVal}>Languages</Text>
              <Text style={styles.quickInfoLbl}>English, Tamil, Hindi</Text>
            </View>
            
            <View style={styles.quickInfoDivider} />
            
            <View style={styles.quickInfoItem}>
              <Calendar size={16} color="#10B981" />
              <Text style={styles.quickInfoVal}>Availability</Text>
              <Text style={[styles.quickInfoLbl, { color: '#10B981', textDecorationLine: 'underline' }]}>Live Calendar</Text>
            </View>
          </View>

          {/* ABOUT */}
          <Text style={styles.sectionTitle}>About {studio.name}</Text>
          <Text style={styles.descriptionText}>
            {studio.description || `${studio.name} is a premier South Indian makeup studio with years of experience catering for grandeur luxury weddings across Tamil Nadu. Specialists in HD airbrush finishes and traditional bridal transformations.`}
          </Text>

          {/* MEDIA TABS */}
          <View style={styles.mediaTabs}>
            <View style={styles.mediaTabActiveContainer}>
              <Text style={styles.mediaTabActive}>Photos (26)</Text>
              <View style={styles.mediaTabActiveIndicator} />
            </View>
            <Text style={styles.mediaTabInactive}>Videos</Text>
          </View>
          <View style={styles.mediaTabsLine} />

          {/* PHOTO GRID */}
          <View style={styles.photoGrid}>
            <TouchableOpacity style={styles.photoGridItem} onPress={() => setActivePhotoModal(portfolioImages[0])}>
              <Image source={{ uri: portfolioImages[0] }} style={styles.photoImg} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.photoGridItem} onPress={() => setActivePhotoModal(portfolioImages[1])}>
              <Image source={{ uri: portfolioImages[1] }} style={styles.photoImg} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.photoGridItem} onPress={() => setActivePhotoModal(portfolioImages[2])}>
              <Image source={{ uri: portfolioImages[2] }} style={styles.photoImg} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.photoGridItem} onPress={() => setActivePhotoModal(portfolioImages[3])}>
              <Image source={{ uri: portfolioImages[3] }} style={styles.photoImg} />
              <View style={styles.morePhotosOverlay}>
                <Text style={styles.morePhotosText}>+23</Text>
                <Text style={styles.morePhotosSubtext}>More Photos</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* TAGS */}
          <View style={styles.tagsRow}>
            <View style={styles.tagItem}>
              <MapPin size={12} color="#7D6E70" />
              <Text style={styles.tagText}>{studio.location}, Tamil Nadu</Text>
            </View>
            <View style={styles.tagItem}>
              <Users size={12} color="#7D6E70" />
              <Text style={styles.tagText}>1 - 100+ Guests</Text>
            </View>
            <View style={styles.tagItem}>
              <Sparkles size={12} color="#7D6E70" />
              <Text style={styles.tagText}>Bridal & Airbrush</Text>
            </View>
          </View>

          {/* BADGES */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.badgesScroll}>
            <View style={styles.badgeCard}>
              <Image source={{uri: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png'}} style={{width: 16, height: 16, marginBottom: 4}} />
              <Text style={styles.badgeTitle}>Google Reviews</Text>
              <Text style={styles.badgeVal}>4.8 <Star size={10} color="#FBBF24" fill="#FBBF24" /></Text>
            </View>
            <View style={styles.badgeCard}>
              <Instagram size={16} color="#E1306C" style={{marginBottom: 4}} />
              <Text style={styles.badgeTitle}>Instagram</Text>
              <Text style={styles.badgeVal}>@studio_glam</Text>
            </View>
            <View style={styles.badgeCard}>
              <Award size={16} color="#D97706" style={{marginBottom: 4}} />
              <Text style={styles.badgeTitle}>Awards</Text>
              <Text style={styles.badgeVal}>6 Awards</Text>
            </View>
            <View style={styles.badgeCard}>
              <ShieldCheck size={16} color="#10B981" style={{marginBottom: 4}} />
              <Text style={styles.badgeTitle}>TOT Certified</Text>
              <Text style={styles.badgeVal}>Verified Vendor</Text>
            </View>
          </ScrollView>

          {/* POPULAR PACKAGES */}
          <Text style={styles.sectionTitle}>Our Popular Packages</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.packagesScroll}>
            <View style={styles.packagePill}><Text style={styles.packagePillText}>Classic Bridal HD</Text></View>
            <View style={styles.packagePill}><Text style={styles.packagePillText}>Royal Reception Glam</Text></View>
            <View style={styles.packagePill}><Text style={styles.packagePillText}>Engagement Styling</Text></View>
          </ScrollView>

          {/* GOOGLE REVIEWS */}
          <View style={styles.reviewsHeader}>
            <Text style={styles.sectionTitle}>Google Reviews</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.googleReviewCard}>
            <View style={styles.gReviewHeader}>
              <View style={styles.gReviewAvatar}>
                <Text style={styles.gReviewAvatarText}>R</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.gReviewName}>Ritika Sharma</Text>
                <Text style={styles.gReviewTime}>2 weeks ago</Text>
              </View>
              <View style={styles.gReviewRating}>
                <Text style={styles.gReviewRatingText}>5.0</Text>
                <View style={{flexDirection: 'row', gap: 2}}>
                  <Star size={10} color="#FBBF24" fill="#FBBF24" />
                  <Star size={10} color="#FBBF24" fill="#FBBF24" />
                  <Star size={10} color="#FBBF24" fill="#FBBF24" />
                  <Star size={10} color="#FBBF24" fill="#FBBF24" />
                  <Star size={10} color="#FBBF24" fill="#FBBF24" />
                </View>
              </View>
            </View>
            <Text style={styles.gReviewComment}>
              "The makeup was absolutely amazing! Great products, precision & long lasting. Our guests are still talking about it!"
            </Text>
            <View style={{ alignItems: 'flex-end', marginTop: 8 }}>
              <Image source={{uri: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png'}} style={{width: 14, height: 14}} />
            </View>
          </View>

        </View>
      </ScrollView>

      {/* NEW STICKY BOTTOM ACTION BAR */}
      <View style={styles.bottomBarNew}>
        <TouchableOpacity style={styles.btnWhatsapp} onPress={handleWhatsApp} activeOpacity={0.8}>
          <MessageCircle size={14} color="#10B981" style={{ marginRight: 4 }} />
          <Text style={styles.btnWhatsappText}>WhatsApp</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.btnCall} onPress={handleCallPhone} activeOpacity={0.8}>
          <Phone size={14} color="#4B5563" style={{ marginRight: 4 }} />
          <Text style={styles.btnCallText}>Call Now</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.btnQuote} onPress={() => setShowQuoteModal(true)} activeOpacity={0.85}>
          <Text style={styles.btnQuoteText}>Send Quotes</Text>
        </TouchableOpacity>
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
  },
  navHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    zIndex: 20,
  },
  navBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(232, 223, 213, 0.5)',
  },
  heroContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 320,
    zIndex: 0,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  mainCard: {
    marginTop: 220,
    backgroundColor: '#FAF7F2',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    minHeight: 800,
    paddingHorizontal: 16,
    paddingTop: 24,
    zIndex: 10,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  logoThumbnail: {
    width: 64,
    height: 64,
    borderRadius: 12,
    marginRight: 16,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E8DFD5',
  },
  titleInfo: {
    flex: 1,
  },
  studioName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#2A2425',
    fontFamily: 'Playfair Display, serif',
    marginBottom: 4,
  },
  totBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FDF6E3',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 4,
    borderWidth: 1,
    borderColor: '#F3E5AB',
  },
  totBadgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#92400E',
    marginLeft: 4,
  },
  subtitleText: {
    fontSize: 11,
    color: '#6B7280',
    marginBottom: 2,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2A2425',
    marginLeft: 4,
  },
  reviewsCount: {
    fontWeight: '400',
    color: '#6B7280',
  },
  quickInfoBox: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E8DFD5',
    paddingVertical: 12,
    paddingHorizontal: 4,
    marginBottom: 24,
  },
  quickInfoItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  quickInfoVal: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1F2937',
    marginTop: 6,
    marginBottom: 2,
    textAlign: 'center',
  },
  quickInfoLbl: {
    fontSize: 9,
    color: '#6B7280',
    textAlign: 'center',
  },
  quickInfoDivider: {
    width: 1,
    height: '80%',
    backgroundColor: '#E5E7EB',
    alignSelf: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#2A2425',
    fontFamily: 'Playfair Display, serif',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 12.5,
    lineHeight: 18,
    color: '#4B5563',
    marginBottom: 24,
  },
  mediaTabs: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  mediaTabActiveContainer: {
    marginRight: 24,
    alignItems: 'center',
  },
  mediaTabActive: {
    fontSize: 13,
    fontWeight: '700',
    color: '#2A2425',
    marginBottom: 6,
  },
  mediaTabActiveIndicator: {
    width: 24,
    height: 3,
    backgroundColor: '#581420',
    borderRadius: 2,
  },
  mediaTabInactive: {
    fontSize: 13,
    fontWeight: '600',
    color: '#9CA3AF',
    marginBottom: 6 + 3, // to align with active which has indicator
  },
  mediaTabsLine: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginBottom: 16,
    marginTop: -8, // pull up under tabs
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  photoGridItem: {
    width: '48.5%',
    aspectRatio: 1.4,
    borderRadius: 12,
    overflow: 'hidden',
  },
  photoImg: {
    width: '100%',
    height: '100%',
  },
  morePhotosOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  morePhotosText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '800',
  },
  morePhotosSubtext: {
    color: '#FBBF24',
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  tagItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tagText: {
    fontSize: 11,
    color: '#4B5563',
    marginLeft: 4,
  },
  badgesScroll: {
    gap: 12,
    paddingRight: 16,
    marginBottom: 24,
  },
  badgeCard: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    minWidth: 100,
  },
  badgeTitle: {
    fontSize: 10,
    color: '#4B5563',
    marginBottom: 2,
  },
  badgeVal: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1F2937',
  },
  packagesScroll: {
    gap: 10,
    paddingRight: 16,
    marginBottom: 28,
  },
  packagePill: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 14,
    backgroundColor: '#FFF',
  },
  packagePillText: {
    fontSize: 11.5,
    color: '#374151',
    fontWeight: '500',
  },
  reviewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  viewAllText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#581420',
  },
  googleReviewCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  gReviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  gReviewAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#581420',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  gReviewAvatarText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  gReviewName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1F2937',
  },
  gReviewTime: {
    fontSize: 10,
    color: '#9CA3AF',
  },
  gReviewRating: {
    alignItems: 'flex-end',
  },
  gReviewRatingText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 2,
  },
  gReviewComment: {
    fontSize: 12,
    color: '#4B5563',
    lineHeight: 18,
  },
  bottomBarNew: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 68,
    backgroundColor: '#FAF7F2',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    zIndex: 20,
    gap: 8,
  },
  btnWhatsapp: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  btnWhatsappText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#065F46',
  },
  btnCall: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  btnCallText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#374151',
  },
  btnQuote: {
    flex: 1.3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 20,
    backgroundColor: '#380B13', // very dark brown/red
  },
  btnQuoteText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#F3E5AB', // gold text
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
