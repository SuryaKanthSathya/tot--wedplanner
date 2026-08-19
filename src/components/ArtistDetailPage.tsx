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
  Eye,
  Camera,
  LayoutGrid,
  Users,
  FileText,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { QuotationScreen } from './QuotationScreen';
import { MehendiArtist } from './MehendiListingPage';
import { RequestQuoteModal } from './RequestQuoteModal';
import { WeddingInvoicePaymentModal } from './WeddingInvoicePaymentModal';
import { DraggablePhotoGalleryModal } from './DraggablePhotoGalleryModal';
import { LuxuryToast } from './LuxuryToast';
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
  const [activeMediaTab, setActiveMediaTab] = useState<'photos' | 'packages' | 'designs' | 'reviews'>('photos');
  const [isReadMore, setIsReadMore] = useState(false);
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

  const [quoteStatus, setQuoteStatus] = useState<
    'initial' | 'requested' | 'response_ready' | 'confirmed' | 'partially_paid' | 'fully_paid' | 'rejected' | 'negotiating'
  >(() => {
    const existing = getWeddingBookingByVendorId(artist.id);
    return existing ? existing.status : 'initial';
  });

  useEffect(() => {
    const handleUpdate = () => {
      const existing = getWeddingBookingByVendorId(artist.id);
      if (existing) setQuoteStatus(existing.status);
    };
    window.addEventListener('tot_wedding_payments_updated', handleUpdate);
    return () => window.removeEventListener('tot_wedding_payments_updated', handleUpdate);
  }, [artist.id]);

  const updateQuoteStatus = (newStatus: any) => {
    setQuoteStatus(newStatus);
    saveOrUpdateWeddingBooking({
      vendorId: artist.id,
      vendorName: artist.name,
      category: 'Mehendi',
      serviceType: 'Organic Bridal Mehendi & Henna Art',
      image: artist.image,
      location: artist.location || 'Chennai, Tamil Nadu',
      totalAmount: parseInt((artist.startingPrice || '10000').replace(/[^0-9]/g, ''), 10),
      status: newStatus,
    });
  };

  const [showQuotationScreen, setShowQuotationScreen] = useState(false);

  const handleQuoteRequestSent = () => {
    setShowQuoteModal(false);
    updateQuoteStatus('requested');
    setToastMessage('Quote Request Sent! Vendor reviewing...');
    setTimeout(() => {
      updateQuoteStatus('response_ready');
      setToastMessage('Vendor Quotation Received! Click "View Quote"');
    }, 2500);
  };

  const portfolioImages = [
    artist.image || 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=85',
  ];

  const packagesList = [
    {
      title: 'Grand Bridal Mehendi Package',
      price: artist.startingPrice || '₹15,000 onwards',
      popular: true,
      features: [
        '100% Organic Sojat Rajasthani Henna Paste (No Chemicals)',
        'Full Forearms & Feet Intricate Bridal Artwork',
        'Custom Figures (Bride & Groom Portraits / Doli / Shehnai)',
        'Guaranteed Deep Burgundy / Dark Maroon Stain',
        'Complimentary After-care Essential Oil Kit',
      ],
    },
  ];

  const cosmeticBrands = ['Traditional Indian', 'Intricate Arabic', 'Floral Motifs', 'Mandala Art', 'Bridal Figures'];

  const reviewsList = [
    {
      id: 'rev-1',
      name: 'Priyanka & Karthi',
      date: 'January 2026',
      event: 'Bridal Muhurtham in ' + (artist.location || 'Chennai'),
      rating: 5,
      comment: `Absolute magic! ${artist.name} created the most intricate, stunning bridal mehendi on my wedding day. The color stain turned a gorgeous dark maroon and lasted over 2 weeks!`,
    },
    {
      id: 'rev-2',
      name: 'Dr. Sneha Rajan',
      date: 'December 2025',
      event: 'Guest & Family Mehendi Package',
      rating: 5,
      comment: `Extremely professional team. They arrived right on time at our venue with fresh organic henna cones. Fast and neat application for all 20 of our bridesmaids!`,
    },
    {
      id: 'rev-3',
      name: 'Ananya V.',
      date: 'November 2025',
      event: 'Engagement & Sangeet',
      rating: 5,
      comment: `The portrait motifs of me and my fiancé were so lifelike! 100% natural herbal henna with no chemical burns. Highly recommended for all South Indian brides!`,
    },
  ];

  const getInitials = (name: string) => {
    if (!name) return 'TOT';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: artist.name,
        text: `Check out ${artist.name} for bridal mehendi on Tale of Two!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      setToastMessage('Link copied to clipboard!');
      setTimeout(() => setToastMessage(null), 2500);
    }
  };

  const handleCall = () => {
    const phoneNumber = artist.phone ? artist.phone.replace(/[^0-9+]/g, '') : '+919150197966';
    Linking.openURL(`tel:${phoneNumber}`).catch(() => {
      setToastMessage(`Call ${artist.phone || '+91 91501 97966'}`);
      setTimeout(() => setToastMessage(null), 3000);
    });
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(`Hi ${artist.name}, I found your bridal mehendi profile on Tale of Two and would like to check availability for my wedding date.`);
    Linking.openURL(`https://wa.me/919150197966?text=${text}`).catch(() => {
      setToastMessage('Opening WhatsApp...');
      setTimeout(() => setToastMessage(null), 2000);
    });
  };

  return (
    <View style={styles.container}>
      <LuxuryToast message={toastMessage} />

      <ScrollView
        style={{ flex: 1, overflowY: 'auto' } as any}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 90 }}
      >
        <div className="relative w-full bg-[#FAF7F2] border-b border-[#E8DEC2]/40">
          {/* Top Overlaid Action Bar - Pinned to screen top-left & top-right */}
          <div className="absolute top-4 left-4 right-4 z-50 flex items-center justify-between pointer-events-auto">
            <TouchableOpacity style={styles.overlayCircleBtnDark} onPress={onBack} activeOpacity={0.8}>
              <ChevronLeft className="w-6 h-6 text-white" />
            </TouchableOpacity>

            <View style={styles.topOverlayRightGroup}>
              <TouchableOpacity
                style={styles.overlayCircleBtnLight}
                onPress={() => onToggleBookmark(artist.id)}
                activeOpacity={0.8}
              >
                <Heart
                  className={`w-5 h-5 ${
                    isBookmarked ? 'text-[#8B1E2F] fill-[#8B1E2F]' : 'text-[#2A2425]'
                  }`}
                />
              </TouchableOpacity>

              <TouchableOpacity style={styles.overlayCircleBtnLight} onPress={handleShare} activeOpacity={0.8}>
                <Share2 className="w-5 h-5 text-[#2A2425]" />
              </TouchableOpacity>
            </View>
          </div>

          <div className="hidden md:block w-full max-w-6xl mx-auto pt-16 pb-4 px-4 sm:px-6">
            <div className="grid grid-cols-4 grid-rows-2 gap-2.5 h-[420px] lg:h-[480px] rounded-2xl overflow-hidden shadow-sm relative">
              <div
                className="col-span-2 row-span-2 relative overflow-hidden cursor-pointer group bg-stone-100"
                onClick={() => { setGalleryInitialIndex(0); setIsGalleryOpen(true); }}
              >
                <img
                  src={portfolioImages[0]}
                  alt={artist.name}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=85';
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div
                className="col-span-1 row-span-1 relative overflow-hidden cursor-pointer group bg-stone-100"
                onClick={() => { setGalleryInitialIndex(1); setIsGalleryOpen(true); }}
              >
                <img
                  src={portfolioImages[1] || portfolioImages[0]}
                  alt={`${artist.name} 2`}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85';
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Eye className="w-6 h-6 text-white drop-shadow-lg" />
                </div>
              </div>
              <div
                className="col-span-1 row-span-1 relative overflow-hidden cursor-pointer group bg-stone-100"
                onClick={() => { setGalleryInitialIndex(2); setIsGalleryOpen(true); }}
              >
                <img
                  src={portfolioImages[2] || portfolioImages[0]}
                  alt={`${artist.name} 3`}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=85';
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Eye className="w-6 h-6 text-white drop-shadow-lg" />
                </div>
              </div>
              <div
                className="col-span-1 row-span-1 relative overflow-hidden cursor-pointer group bg-stone-100"
                onClick={() => { setGalleryInitialIndex(3); setIsGalleryOpen(true); }}
              >
                <img
                  src={portfolioImages[3] || portfolioImages[0]}
                  alt={`${artist.name} 4`}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=85';
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Eye className="w-6 h-6 text-white drop-shadow-lg" />
                </div>
              </div>
              <div
                className="col-span-1 row-span-1 relative overflow-hidden cursor-pointer group bg-stone-100"
                onClick={() => { setGalleryInitialIndex(4); setIsGalleryOpen(true); }}
              >
                <img
                  src={portfolioImages[4] || portfolioImages[0]}
                  alt={`${artist.name} 5`}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&w=1200&q=85';
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Eye className="w-6 h-6 text-white drop-shadow-lg" />
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); setGalleryInitialIndex(0); setIsGalleryOpen(true); }}
                  className="absolute bottom-3 right-3 z-10 bg-white/90 hover:bg-white text-[#2A2425] text-xs font-bold px-3 py-1.5 rounded-lg shadow-md border border-stone-200"
                >
                  Show all
                </button>
              </div>
            </div>
          </div>
        </div>

        <View style={styles.mainContentCard}>
          <View style={styles.studioHeaderRow}>
            <View style={styles.logoBox}>
              <Sparkles className="w-6 h-6 text-[#E5A93C] mb-0.5" />
              <Text style={styles.logoInitials}>{getInitials(artist.name)}</Text>
            </View>

            <View style={styles.headerInfoCol}>
              <Text style={styles.studioTitle}>{artist.name}</Text>
              <View style={styles.certifiedBadge}>
                <ShieldCheck className="w-3.5 h-3.5 text-[#B45309] mr-1" />
                <Text style={styles.certifiedBadgeText}>TOT CERTIFIED</Text>
              </View>
              <Text style={styles.subtitleText}>
                {artist.category} • <Text style={styles.tierHighlight}>{artist.tier || 'Signature'}</Text> • {artist.location}
              </Text>
              <View style={styles.ratingRow}>
                <Star className="w-4 h-4 text-[#E5A93C] fill-[#E5A93C] mr-1" />
                <Text style={styles.ratingBold}>{artist.rating}</Text>
                <Text style={styles.reviewsCountText}> ({artist.reviewsCount || 120} Reviews)</Text>
              </View>
            </View>
          </View>

          <View style={styles.metricsBar}>
            <View style={styles.metricItem}>
              <Calendar className="w-4 h-4 text-[#8B1E2F] mb-1" />
              <Text style={styles.metricVal}>{artist.experience || '7+ Years'}</Text>
              <Text style={styles.metricLbl}>Experience</Text>
            </View>
            <View style={styles.metricDivider} />
            <View style={styles.metricItem}>
              <Users className="w-4 h-4 text-[#8B1E2F] mb-1" />
              <Text style={styles.metricVal}>1-4 Artists</Text>
              <Text style={styles.metricLbl}>Team Size</Text>
            </View>
            <View style={styles.metricDivider} />
            <View style={styles.metricItem}>
              <Sparkles className="w-4 h-4 text-[#8B1E2F] mb-1" />
              <Text style={styles.metricVal}>Organic Henna</Text>
              <Text style={styles.metricLbl}>Formula</Text>
            </View>
            <View style={styles.metricDivider} />
            <View style={styles.metricItem}>
              <Clock className="w-4 h-4 text-[#8B1E2F] mb-1" />
              <Text style={styles.metricVal}>{artist.startingPrice || '₹10,000'}</Text>
              <Text style={styles.metricLbl}>Starting Price</Text>
            </View>
          </View>

          <View style={styles.sectionBlock}>
            <Text style={styles.sectionTitle}>About {artist.name}</Text>
            <Text style={styles.aboutText}>
              {artist.description ||
                `${artist.name} is one of ${artist.location}'s most celebrated bridal mehendi and henna artists.`}{' '}
              Specializing in custom portrait figures, intricate Rajasthani marwari, and modern Indo-Arabic motifs. We prepare fresh homemade Rajasthani Sojat henna cones infused with clove and eucalyptus essential oils, guaranteeing rich, dark burgundy stains with zero chemicals.
              {isReadMore && (
                <Text style={styles.aboutText}>
                  {'\n\n'}From personalized bridal hand artwork to rapid guest application for 20+ bridesmaids during Sangeet nights, our experienced team ensures spotless precision and comfortable doorstep service.
                </Text>
              )}
            </Text>
            <TouchableOpacity onPress={() => setIsReadMore(!isReadMore)} style={styles.readMoreBtn}>
              <Text style={styles.readMoreText}>{isReadMore ? 'Read Less' : 'Read More'}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.tabHeaderRow}>
            {['photos', 'packages', 'designs', 'reviews'].map((tab) => (
              <TouchableOpacity
                key={tab}
                style={[styles.galleryTab, activeMediaTab === tab && styles.galleryTabActive]}
                onPress={() => setActiveMediaTab(tab as any)}
              >
                <Text style={[styles.galleryTabText, activeMediaTab === tab && styles.galleryTabTextActive]}>
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {activeMediaTab === 'photos' && (
            <View style={{ marginBottom: 20 }}>
              <View style={styles.photoGrid}>
                {portfolioImages.slice(0, 4).map((imgUrl, idx) => (
                  <TouchableOpacity
                    key={idx}
                    style={styles.gridPhotoWrapper}
                    onPress={() => { setGalleryInitialIndex(idx); setIsGalleryOpen(true); }}
                    activeOpacity={0.85}
                  >
                    <Image source={{ uri: imgUrl }} style={styles.gridPhoto} resizeMode="cover" />
                    {idx === 3 && (
                      <View style={styles.morePhotosOverlay}>
                        <Text style={styles.morePhotosText}>+{portfolioImages.length - 3}</Text>
                        <Text style={styles.morePhotosSubtext}>More Photos</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {activeMediaTab === 'packages' && (
            <View style={{ marginBottom: 20 }}>
              <View style={{ gap: 12 }}>
                {packagesList.map((pkg, idx) => (
                  <View key={idx} style={[styles.packageCard, pkg.popular && { borderColor: '#581420', borderWidth: 1.5 }]}>
                    {pkg.popular && (
                      <View style={styles.popularRibbon}>
                        <Sparkles className="w-3 h-3 text-white mr-1" />
                        <Text style={styles.popularRibbonText}>Most Booked Package</Text>
                      </View>
                    )}
                    <View style={styles.pkgHeaderRow}>
                      <View style={{ flex: 1, marginRight: 8 }}>
                        <Text style={styles.pkgTitle}>{pkg.title}</Text>
                      </View>
                      <Text style={styles.pkgPrice}>{pkg.price}</Text>
                    </View>
                    <View style={styles.pkgDivider} />
                    <Text style={styles.pkgInclusionsTitle}>Package Inclusions:</Text>
                    {pkg.features.map((feat, fIdx) => (
                      <View key={fIdx} style={styles.inclusionRow}>
                        <Check className="w-3.5 h-3.5 text-[#581420] mr-2 flex-shrink-0" />
                        <Text style={styles.inclusionText}>{feat}</Text>
                      </View>
                    ))}
                    <TouchableOpacity style={styles.selectPkgBtn} onPress={() => setShowQuoteModal(true)} activeOpacity={0.85}>
                      <Text style={styles.selectPkgBtnText}>Select & Request Quote</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>
          )}

          {activeMediaTab === 'designs' && (
            <View style={{ marginBottom: 20 }}>
              <View style={styles.brandsGrid}>
                {cosmeticBrands.map((item, bIdx) => (
                  <View key={bIdx} style={styles.brandCard}>
                    <Sparkles className="w-4 h-4 text-[#581420] mr-2" />
                    <Text style={styles.brandName}>{item}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {activeMediaTab === 'reviews' && (
            <View style={{ marginBottom: 20 }}>
              <View style={{ gap: 10 }}>
                {reviewsList.map((rev) => (
                  <View key={rev.id} style={styles.reviewCard}>
                    <View style={styles.reviewUserRow}>
                      <View style={styles.reviewAvatar}>
                        <Text style={{ color: '#FDE68A', fontSize: 13, fontWeight: '700' }}>{rev.name.slice(0, 2).toUpperCase()}</Text>
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.reviewerName}>{rev.name}</Text>
                        <Text style={styles.reviewerEvent}>{rev.event}</Text>
                      </View>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 mr-1" />
                        <Text style={{ fontSize: 12, fontWeight: '700', color: '#2A2425' }}>{rev.rating}.0</Text>
                      </View>
                    </View>
                    <Text style={styles.reviewComment}>{rev.comment}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          <Text style={styles.sectionTitle}>Trust & Verification</Text>
          <View style={styles.trustBadgesGrid}>
            <View style={styles.trustCard}>
              <View style={styles.googleIconBadge}><Text style={styles.googleIconG}>G</Text></View>
              <Text style={styles.trustCardTitle}>Google Reviews</Text>
              <Text style={styles.trustCardVal}>4.9 <Star className="w-3 h-3 text-amber-500 fill-amber-500 inline" /></Text>
            </View>
            <View style={styles.trustCard}>
              <Instagram className="w-5 h-5 text-[#E1306C] mb-1" />
              <Text style={styles.trustCardTitle}>Instagram</Text>
              <Text style={styles.trustCardVal}>@{artist.name.replace(/\s+/g, '').toLowerCase()}</Text>
            </View>
            <View style={styles.trustCard}>
              <Award className="w-5 h-5 text-[#D97706] mb-1" />
              <Text style={styles.trustCardTitle}>TOT Awards</Text>
              <Text style={styles.trustCardVal}>Top Mehendi 2026</Text>
            </View>
            <View style={styles.trustCard}>
              <ShieldCheck className="w-5 h-5 text-[#10B981] mb-1" />
              <Text style={styles.trustCardTitle}>TOT Certified</Text>
              <Text style={styles.trustCardVal}>Verified</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.fixedBottomBar}>
        <div className="w-full max-w-4xl mx-auto flex items-center justify-between gap-2.5 px-3 sm:px-6">
          <TouchableOpacity style={styles.whatsappBtn} onPress={handleWhatsApp} activeOpacity={0.8}>
            <MessageCircle className="w-4 h-4 text-[#15803D] mr-1.5" />
            <Text style={styles.whatsappBtnText}>WhatsApp</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.callNowBtn} onPress={handleCall} activeOpacity={0.8}>
            <Phone className="w-4 h-4 text-[#2A2425] mr-1.5" />
            <Text style={styles.callNowBtnText}>Call</Text>
          </TouchableOpacity>
          {quoteStatus === 'initial' && (
            <TouchableOpacity style={styles.sendQuoteBtn} onPress={() => setShowQuoteModal(true)} activeOpacity={0.85}>
              <Send className="w-4 h-4 text-white mr-1.5" />
              <Text style={styles.sendQuoteBtnText}>Request Quote</Text>
            </TouchableOpacity>
          )}
          {quoteStatus === 'requested' && (
            <TouchableOpacity style={[styles.sendQuoteBtn, { backgroundColor: '#F59E0B' }]} disabled activeOpacity={1}>
              <Clock className="w-4 h-4 text-white mr-1.5" />
              <Text style={styles.sendQuoteBtnText}>Pending</Text>
            </TouchableOpacity>
          )}
          {quoteStatus === 'response_ready' && (
            <TouchableOpacity style={[styles.sendQuoteBtn, { backgroundColor: '#10B981' }]} onPress={() => setShowQuotationScreen(true)} activeOpacity={0.85}>
              <FileText className="w-4 h-4 text-white mr-1.5" />
              <Text style={styles.sendQuoteBtnText}>View Quote</Text>
            </TouchableOpacity>
          )}
          {(quoteStatus === 'confirmed' || quoteStatus === 'partially_paid' || quoteStatus === 'fully_paid') && (
            <TouchableOpacity style={[styles.sendQuoteBtn, { backgroundColor: '#581420' }]} onPress={() => setShowInvoiceModal(true)} activeOpacity={0.85}>
              <FileText className="w-4 h-4 text-white mr-1.5" />
              <Text style={styles.sendQuoteBtnText}>Invoice</Text>
            </TouchableOpacity>
          )}
        </div>
      </View>

      <DraggablePhotoGalleryModal
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        photos={portfolioImages}
        initialIndex={galleryInitialIndex}
        title={artist.name}
        category="Mehendi"
      />

      <RequestQuoteModal
        visible={showQuoteModal}
        vendorId={artist.id}
        vendorName={artist.name}
        vendorLocation={artist.location}
        category="mehendi"
        startingPrice={artist.startingPrice}
        onQuoteSent={handleQuoteRequestSent}
        onClose={() => setShowQuoteModal(false)}
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
        packageName="Signature Bridal Henna & Sangeet Package"
        includedServices={[
          'Intricate Bridal Full Forearms & Feet Artistry',
          'Custom Couple Portraits',
          '100% Organic Sojat Henna',
        ]}
        onNavigateToQuotesTab={() => { setShowQuotationScreen(false); setShowInvoiceModal(true); }}
        onBack={() => setShowQuotationScreen(false)}
        onShowToast={(msg) => setToastMessage(msg)}
      />

      <WeddingInvoicePaymentModal
        visible={showInvoiceModal}
        onClose={() => setShowInvoiceModal(false)}
        vendorId={artist.id}
        vendorName={artist.name}
        vendorImage={artist.image}
        vendorLocation={artist.location}
        category="Mehendi"
        startingPrice={artist.startingPrice || '₹10,000'}
        bookingSource={bookingSource}
        onNavigateToMyWeddingPayments={() => {
          setShowInvoiceModal(false);
          if (onNavigateToMyWeddingPayments) onNavigateToMyWeddingPayments();
        }}
        onNavigateToProfileMyBookings={() => {
          setShowInvoiceModal(false);
          if (onNavigateToProfileMyBookings) onNavigateToProfileMyBookings();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF7F2',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  overlayCircleBtnDark: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topOverlayRightGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  overlayCircleBtnLight: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContentCard: {
    backgroundColor: '#FAF7F2',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    width: '100%',
    maxWidth: 800,
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  studioHeaderRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  logoBox: {
    width: 68,
    height: 68,
    borderRadius: 14,
    backgroundColor: '#581420',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    borderWidth: 1.5,
    borderColor: '#E5A93C',
  },
  logoInitials: {
    color: '#FDE68A',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  headerInfoCol: {
    flex: 1,
  },
  studioTitle: {
    fontFamily: 'Playfair Display, Georgia, serif',
    fontSize: 19,
    fontWeight: '700',
    color: '#2A2425',
    marginBottom: 4,
  },
  certifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    borderWidth: 1,
    borderColor: '#FDE68A',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  certifiedBadgeText: {
    color: '#B45309',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  subtitleText: {
    fontSize: 12,
    color: '#6B5A5C',
    marginBottom: 4,
  },
  tierHighlight: {
    fontWeight: '700',
    color: '#581420',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingBold: {
    fontSize: 13,
    fontWeight: '700',
    color: '#2A2425',
  },
  reviewsCountText: {
    fontSize: 12,
    color: '#7C6A6C',
  },
  metricsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 6,
    borderWidth: 1,
    borderColor: '#EFE7DE',
    marginBottom: 18,
    justifyContent: 'space-around',
  },
  metricItem: {
    flex: 1,
    alignItems: 'center',
  },
  metricVal: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2A2425',
  },
  metricLbl: {
    fontSize: 10,
    color: '#8C7A7C',
  },
  metricDivider: {
    width: 1,
    height: 28,
    backgroundColor: '#EFE7DE',
  },
  sectionBlock: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontFamily: 'Playfair Display, Georgia, serif',
    fontSize: 16,
    fontWeight: '700',
    color: '#2A2425',
    marginBottom: 8,
  },
  aboutText: {
    fontSize: 13,
    color: '#524345',
    lineHeight: 19,
  },
  readMoreBtn: {
    marginTop: 4,
  },
  readMoreText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#8B1E2F',
  },
  tabHeaderRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#E2D8CD',
    marginBottom: 12,
  },
  galleryTab: {
    paddingVertical: 8,
    marginRight: 20,
    borderBottomWidth: 2,
    borderColor: 'transparent',
  },
  galleryTabActive: {
    borderColor: '#8B1E2F',
  },
  galleryTabText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#8C7A7C',
  },
  galleryTabTextActive: {
    color: '#8B1E2F',
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  gridPhotoWrapper: {
    width: '48.5%',
    height: 110,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  gridPhoto: {
    width: '100%',
    height: '100%',
  },
  morePhotosOverlay: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(20, 10, 12, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  morePhotosText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
  },
  morePhotosSubtext: {
    color: '#E5D8DA',
    fontSize: 11,
    fontWeight: '600',
  },
  packageCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#EFE7DE',
  },
  popularRibbon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#581420',
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginBottom: 10,
    alignSelf: 'flex-start',
    borderRadius: 6,
  },
  popularRibbonText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  pkgHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  pkgTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2A2425',
  },
  pkgPrice: {
    fontSize: 16,
    fontWeight: '800',
    color: '#581420',
  },
  pkgDivider: {
    height: 1,
    backgroundColor: '#EFE7DE',
    marginVertical: 12,
  },
  pkgInclusionsTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2A2425',
    marginBottom: 8,
  },
  inclusionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  inclusionText: {
    fontSize: 12,
    color: '#524345',
  },
  selectPkgBtn: {
    marginTop: 14,
    backgroundColor: '#FAF7F2',
    borderWidth: 1,
    borderColor: '#8B1E2F',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  selectPkgBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#8B1E2F',
  },
  brandsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  brandCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EFE7DE',
  },
  brandName: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2A2425',
  },
  reviewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#EFE7DE',
  },
  reviewUserRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#581420',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  reviewerName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#2A2425',
  },
  reviewerEvent: {
    fontSize: 11,
    color: '#8C7A7C',
  },
  reviewComment: {
    fontSize: 12,
    color: '#4A3D3F',
    lineHeight: 17,
    marginBottom: 4,
  },
  trustBadgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  trustCard: {
    width: '48.5%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#EFE7DE',
  },
  googleIconBadge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#4285F4',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  googleIconG: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '900',
  },
  trustCardTitle: {
    fontSize: 11,
    color: '#8C7A7C',
  },
  trustCardVal: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2A2425',
    marginTop: 2,
  },
  fixedBottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2D8CD',
    paddingVertical: 10,
    zIndex: 100,
  },
  whatsappBtn: {
    flex: 1,
    height: 42,
    backgroundColor: '#DCFCE7',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#86EFAC',
  },
  whatsappBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#15803D',
  },
  callNowBtn: {
    flex: 1,
    height: 42,
    backgroundColor: '#F3EBE1',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5D5C5',
  },
  callNowBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2A2425',
  },
  sendQuoteBtn: {
    flex: 2,
    height: 42,
    backgroundColor: '#581420',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendQuoteBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
