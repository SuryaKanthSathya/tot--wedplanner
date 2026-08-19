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
} from 'react-native-web';
import {
  ChevronLeft,
  Share2,
  Heart,
  Star,
  MapPin,
  Sparkles,
  Award,
  ShieldCheck,
  Instagram,
  Phone,
  MessageCircle,
  X,
  Package,
  Clock,
  Printer,
  Send,
  Eye,
  Camera,
  LayoutGrid,
} from 'lucide-react';
import { RequestQuoteModal } from './RequestQuoteModal';
import { motion, AnimatePresence } from 'motion/react';
import { QuotationScreen } from './QuotationScreen';
import { WeddingInvoicePaymentModal } from './WeddingInvoicePaymentModal';
import { DraggablePhotoGalleryModal } from './DraggablePhotoGalleryModal';
import { LuxuryToast } from './LuxuryToast';
import { saveOrUpdateQuote } from '../utils/quotesManager';
import {
  getWeddingBookingByVendorId,
  saveOrUpdateWeddingBooking,
} from '../utils/weddingPaymentsManager';

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
  onNavigateToQuotesTab?: () => void;
  invite: InvitationItem;
  onBack: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  bookingSource?: 'entire_wedding' | 'individual';
  onNavigateToMyWeddingPayments?: () => void;
  onNavigateToProfileMyBookings?: () => void;
}

export const InvitationDetailPage: React.FC<InvitationDetailPageProps> = ({
  onNavigateToQuotesTab,
  invite,
  onBack,
  isBookmarked,
  onToggleBookmark,
  bookingSource = 'entire_wedding',
  onNavigateToMyWeddingPayments,
  onNavigateToProfileMyBookings,
}) => {
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
        const match = quotes.find((q: any) => q.id === `quote-${invite.id}`);
        if (match) {
          if (match.paymentStatus === 'fully_paid') return 'fully_paid';
          if (match.paymentStatus === 'partially_paid') return 'partially_paid';
          if (match.status === 'confirmed') return 'confirmed';
        }
      }
    } catch (e) {
      console.error(e);
    }
    const existing = getWeddingBookingByVendorId(invite.id);
    if (existing) return existing.status;
    return 'initial';
  });

  useEffect(() => {
    const handleUpdate = () => {
      const existing = getWeddingBookingByVendorId(invite.id);
      if (existing) setQuoteStatus(existing.status);
    };
    window.addEventListener('tot_wedding_payments_updated', handleUpdate);
    return () => window.removeEventListener('tot_wedding_payments_updated', handleUpdate);
  }, [invite.id]);

  const updateQuoteStatus = (newStatus: 'initial' | 'requested' | 'response_ready' | 'confirmed' | 'partially_paid' | 'fully_paid' | 'rejected' | 'negotiating') => {
    setQuoteStatus(newStatus);
    const basePrice = parseInt((invite.startingPrice || '₹15,000').replace(/[^0-9]/g, ''), 10) || 15000;
    saveOrUpdateWeddingBooking({
      vendorId: invite.id,
      vendorName: invite.name,
      category: 'Invitations',
      serviceType: 'Bespoke Wedding Invitations & E-Invites',
      image: invite.image,
      location: invite.location || 'Chennai, Tamil Nadu',
      totalAmount: basePrice,
      status: newStatus,
    });
  };

  const [showQuotationScreen, setShowQuotationScreen] = useState(false);

  const handleQuoteRequestSent = () => {
    setShowQuoteModal(false);
    updateQuoteStatus('requested');
    setToastMessage('Quote Request Sent! Vendor reviewing...');

    // Simulate vendor response ready after 2.5s
    setTimeout(() => {
      updateQuoteStatus('response_ready');
      setToastMessage('Quotation Received! Click "View Quote"');
      setTimeout(() => setToastMessage(null), 5000);
    }, 2500);
  };

  const handleConfirmQuoteFromQuotation = () => {
    updateQuoteStatus('confirmed');
    setShowQuotationScreen(false);
    setToastMessage('✓ Quote Confirmed! You can now View Invoice & Pay');
  };

  // Curated 24 luxury invitation cards, suites & stationery photos (100% invitation content only)
  const portfolioImages = [
    invite.image,
    'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1531685250784-7569952593d2?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1595053826286-2e59ef7905d4?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1586075010620-2254924c7f07?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1586075010634-1b15df308732?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=85',
  ];

  const phoneNum = invite.phone || '+91 91501 97966';
  const whatsappNum = invite.whatsapp || '919150197966';

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: invite.name,
          text: `Check out ${invite.name} for wedding invitations!`,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      setToastMessage('Link copied to clipboard!');
      setTimeout(() => setToastMessage(null), 2500);
    }
  };

  const handleCall = () => {
    Linking.openURL(`tel:${phoneNum}`).catch(() => {
      setToastMessage(`Call ${phoneNum}`);
      setTimeout(() => setToastMessage(null), 3000);
    });
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Hi ${invite.name}, I saw your invitation designs on Tale of Two App. Please share your catalog and sample kit details.`
    );
    Linking.openURL(`https://wa.me/${whatsappNum}?text=${text}`).catch(() => {
      setToastMessage('Opening WhatsApp...');
      setTimeout(() => setToastMessage(null), 2000);
    });
  };



  return (
    <View style={styles.container}>
      <LuxuryToast message={toastMessage} />

      {/* HEADER NAV BAR (transparent, overlapping hero) */}
      <View style={styles.navHeader}>
        <TouchableOpacity style={styles.navBtn} onPress={onBack} activeOpacity={0.7}>
          <ChevronLeft className="w-5 h-5 text-[#2A2425]" />
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', gap: 8 }}>
          <TouchableOpacity style={styles.navBtn} onPress={handleShare} activeOpacity={0.7}>
            <Share2 className="w-4 h-4 text-[#2A2425]" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navBtn}
            onPress={() => onToggleBookmark(invite.id)}
            activeOpacity={0.7}
          >
            <Heart
              className={`w-4 h-4 ${
                isBookmarked ? 'text-[#8B1E2F] fill-[#8B1E2F]' : 'text-[#2A2425]'
              }`}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* HERO SECTION WITH LUXURY 5-PHOTO MOSAIC (DESKTOP) & MOBILE COVER */}
        <div className="relative w-full bg-[#FAF7F2] border-b border-[#E8DEC2]/40">
          {/* DESKTOP 5-PHOTO LUXURY MOSAIC GRID */}
          <div className="hidden md:block w-full max-w-6xl mx-auto pt-16 pb-4 px-4 sm:px-6">
            <div className="grid grid-cols-4 grid-rows-2 gap-2.5 h-[420px] lg:h-[480px] rounded-2xl overflow-hidden shadow-sm relative">
              {/* Main Featured Large Photo (Left 50%) */}
              <div
                className="col-span-2 row-span-2 relative overflow-hidden cursor-pointer group bg-stone-100"
                onClick={() => {
                  setGalleryInitialIndex(0);
                  setIsGalleryOpen(true);
                }}
              >
                <img
                  src={portfolioImages[0]}
                  alt={invite.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Eye className="w-7 h-7 text-white drop-shadow-lg" />
                </div>
              </div>

              {/* Photo 2 (Top Left preview) */}
              <div
                className="col-span-1 row-span-1 relative overflow-hidden cursor-pointer group bg-stone-100"
                onClick={() => {
                  setGalleryInitialIndex(1);
                  setIsGalleryOpen(true);
                }}
              >
                <img
                  src={portfolioImages[1] || portfolioImages[0]}
                  alt={`${invite.name} 2`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Eye className="w-6 h-6 text-white drop-shadow-lg" />
                </div>
              </div>

              {/* Photo 3 (Top Right preview) */}
              <div
                className="col-span-1 row-span-1 relative overflow-hidden cursor-pointer group bg-stone-100"
                onClick={() => {
                  setGalleryInitialIndex(2);
                  setIsGalleryOpen(true);
                }}
              >
                <img
                  src={portfolioImages[2] || portfolioImages[0]}
                  alt={`${invite.name} 3`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Eye className="w-6 h-6 text-white drop-shadow-lg" />
                </div>
              </div>

              {/* Photo 4 (Bottom Left preview) */}
              <div
                className="col-span-1 row-span-1 relative overflow-hidden cursor-pointer group bg-stone-100"
                onClick={() => {
                  setGalleryInitialIndex(3);
                  setIsGalleryOpen(true);
                }}
              >
                <img
                  src={portfolioImages[3] || portfolioImages[0]}
                  alt={`${invite.name} 4`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Eye className="w-7 h-7 text-white drop-shadow-lg" />
                </div>
              </div>

              {/* Photo 5 (Bottom Right preview with "View All" Button) */}
              <div
                className="col-span-1 row-span-1 relative overflow-hidden cursor-pointer group bg-stone-100"
                onClick={() => {
                  setGalleryInitialIndex(4);
                  setIsGalleryOpen(true);
                }}
              >
                <img
                  src={portfolioImages[4] || portfolioImages[0]}
                  alt={`${invite.name} 5`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Eye className="w-6 h-6 text-white drop-shadow-lg" />
                </div>

                {/* Floating "Show all photos" Pill Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setGalleryInitialIndex(0);
                    setIsGalleryOpen(true);
                  }}
                  className="absolute bottom-3 right-3 z-10 bg-white/90 hover:bg-white text-[#2A2425] text-xs font-bold px-3 py-1.5 rounded-lg shadow-md flex items-center gap-1.5 transition-all border border-stone-200"
                >
                  <LayoutGrid className="w-3.5 h-3.5 text-[#581420]" />
                  <span>Show all {portfolioImages.length} photos</span>
                </button>
              </div>
            </div>
          </div>

          {/* MOBILE HERO VIEW (< md screens) */}
          <div className="block md:hidden relative w-full overflow-hidden flex flex-col items-center justify-center pt-14 pb-2 px-3">
            <div
              className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-sm cursor-pointer"
              onClick={() => {
                setGalleryInitialIndex(0);
                setIsGalleryOpen(true);
              }}
            >
              <img
                src={invite.image}
                alt={invite.name}
                className="w-full h-full object-cover"
              />
              <button className="absolute bottom-3 right-3 bg-black/60 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 backdrop-blur-sm">
                <Camera className="w-3 h-3 text-white" />
                <span>1 / {portfolioImages.length}</span>
              </button>
            </div>
          </div>
        </div>

        {/* OVERLAPPING MAIN CARD */}
        <View style={styles.mainCard}>
          {/* Header Row: logo + name + badge + rating */}
          <View style={styles.titleRow}>
            <Image source={{ uri: invite.image }} style={styles.logoThumbnail} resizeMode="cover" />
            <View style={styles.titleInfo}>
              <Text style={styles.studioName} numberOfLines={2}>
                {invite.name}
              </Text>

              <View style={styles.totBadge}>
                <ShieldCheck size={10} color="#C28E38" />
                <Text style={styles.totBadgeText}>TOT CERTIFIED</Text>
              </View>

              <Text style={styles.subtitleText}>{invite.category}</Text>
              <Text style={styles.subtitleText}>
                {invite.tier || 'Signature'} • {invite.location || invite.city}
              </Text>

              <View style={styles.ratingRow}>
                <Star size={12} color="#FBBF24" fill="#FBBF24" />
                <Text style={styles.ratingText}>
                  {(invite.rating || 4.8).toFixed(1)}{' '}
                  <Text style={styles.reviewsCount}>({invite.reviewsCount || 150} Reviews)</Text>
                </Text>
              </View>
            </View>
          </View>

          {/* QUICK INFO (4 columns) */}
          <View style={styles.quickInfoBox}>
            <View style={styles.quickInfoItem}>
              <Award size={16} color="#4B5563" />
              <Text style={styles.quickInfoVal}>{invite.experience || '7+ Years'}</Text>
              <Text style={styles.quickInfoLbl}>Years Exp.</Text>
            </View>

            <View style={styles.quickInfoDivider} />

            <View style={styles.quickInfoItem}>
              <Text style={{ fontSize: 13, fontWeight: '700', color: '#4B5563', marginBottom: 2 }}>
                ₹₹₹
              </Text>
              <Text style={styles.quickInfoVal}>Price Range</Text>
              <Text style={styles.quickInfoLbl}>{invite.startingPrice}</Text>
            </View>

            <View style={styles.quickInfoDivider} />

            <View style={styles.quickInfoItem}>
              <Printer size={16} color="#4B5563" />
              <Text style={styles.quickInfoVal}>Languages</Text>
              <Text style={styles.quickInfoLbl}>Tamil, English</Text>
            </View>

            <View style={styles.quickInfoDivider} />

            <View style={styles.quickInfoItem}>
              <Clock size={16} color="#10B981" />
              <Text style={styles.quickInfoVal}>Delivery</Text>
              <Text style={[styles.quickInfoLbl, { color: '#10B981' }]}>
                {invite.turnaroundTime || '5 - 7 Days'}
              </Text>
            </View>
          </View>

          {/* ABOUT */}
          <Text style={styles.sectionTitle}>About {invite.name.split(' ').slice(0, 3).join(' ')}</Text>
          <Text style={styles.descriptionText}>
            {invite.description || 'Bespoke luxury wedding invitations, digital video invites, and gold foil stationery crafted for unforgettable wedding announcements.'}
            {'\n\n'}Specializing in {(invite.category || 'wedding invitations').toLowerCase()} with{' '}
            {invite.experience || '7+ Years'} of experience, catering to couples across Tamil Nadu. Minimum order of{' '}
            {invite.minOrderQuantity || '50 Units'} with a delivery time of {invite.turnaroundTime || '5 - 7 Days'}.
          </Text>

          {/* MEDIA TABS */}
          <View style={styles.mediaTabs}>
            <View style={styles.mediaTabActiveContainer}>
              <Text style={styles.mediaTabActive}>Photos ({(invite.portfolio || portfolioImages).length})</Text>
              <View style={styles.mediaTabActiveIndicator} />
            </View>
            <Text style={styles.mediaTabInactive}>Videos</Text>
          </View>
          <View style={styles.mediaTabsLine} />

          {/* PHOTO GRID (2x2) */}
          <View style={styles.photoGrid}>
            <TouchableOpacity
              style={styles.photoGridItem}
              onPress={() => {
                setGalleryInitialIndex(0);
                setIsGalleryOpen(true);
              }}
            >
              <Image source={{ uri: portfolioImages[0] }} style={styles.photoImg} resizeMode="cover" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.photoGridItem}
              onPress={() => {
                setGalleryInitialIndex(1);
                setIsGalleryOpen(true);
              }}
            >
              <Image source={{ uri: portfolioImages[1] || portfolioImages[0] }} style={styles.photoImg} resizeMode="cover" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.photoGridItem}
              onPress={() => {
                setGalleryInitialIndex(2);
                setIsGalleryOpen(true);
              }}
            >
              <Image source={{ uri: portfolioImages[2] || portfolioImages[0] }} style={styles.photoImg} resizeMode="cover" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.photoGridItem}
              onPress={() => {
                setGalleryInitialIndex(3);
                setIsGalleryOpen(true);
              }}
            >
              <Image source={{ uri: portfolioImages[3] || portfolioImages[0] }} style={styles.photoImg} resizeMode="cover" />
              <View style={styles.morePhotosOverlay}>
                <Text style={styles.morePhotosText}>
                  +20
                </Text>
                <Text style={styles.morePhotosSubtext}>More Photos</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* TAGS ROW */}
          <View style={styles.tagsRow}>
            <View style={styles.tagItem}>
              <MapPin size={12} color="#7D6E70" />
              <Text style={styles.tagText}>{invite.location || invite.city}, Tamil Nadu</Text>
            </View>
            <View style={styles.tagItem}>
              <Package size={12} color="#7D6E70" />
              <Text style={styles.tagText}>Min: {invite.minOrderQuantity || '50 Units'}</Text>
            </View>
            <View style={styles.tagItem}>
              <Sparkles size={12} color="#7D6E70" />
              <Text style={styles.tagText}>{(invite.customizationOptions || 'Full Custom Colors & Monograms').split(',')[0]}</Text>
            </View>
          </View>

          {/* BADGES */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.badgesScroll}
          >
            <View style={styles.badgeCard}>
              <Text style={{ fontSize: 16, fontWeight: '900', color: '#4285F4', marginBottom: 4 }}>
                G
              </Text>
              <Text style={styles.badgeTitle}>Google Reviews</Text>
              <Text style={styles.badgeVal}>
                {invite.rating || 4.9}★
              </Text>
            </View>
            <View style={styles.badgeCard}>
              <Instagram size={16} color="#E1306C" style={{ marginBottom: 4 }} />
              <Text style={styles.badgeTitle}>Instagram</Text>
              <Text style={styles.badgeVal}>@{invite.name.split(' ')[0].toLowerCase()}</Text>
            </View>
            <View style={styles.badgeCard}>
              <Award size={16} color="#D97706" style={{ marginBottom: 4 }} />
              <Text style={styles.badgeTitle}>Awards</Text>
              <Text style={styles.badgeVal}>3 Awards</Text>
            </View>
            <View style={styles.badgeCard}>
              <ShieldCheck size={16} color="#10B981" style={{ marginBottom: 4 }} />
              <Text style={styles.badgeTitle}>TOT Certified</Text>
              <Text style={styles.badgeVal}>Verified Vendor</Text>
            </View>
          </ScrollView>

          {/* POPULAR PACKAGES */}
          <Text style={styles.sectionTitle}>Our Popular Packages</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.packagesScroll}
          >
            {(invite.features || ['Luxury Box Invites', '3D Animated Video', 'Save The Date']).map((feat, idx) => (
              <TouchableOpacity
                key={idx}
                style={styles.packagePill}
                onPress={() => setShowQuoteModal(true)}
                activeOpacity={0.8}
              >
                <Text style={styles.packagePillText}>{feat}</Text>
              </TouchableOpacity>
            ))}
            {(invite.specialties || ['Gold Foil Stamping', 'Custom Monograms']).slice(0, 2).map((spec, idx) => (
              <TouchableOpacity
                key={`s-${idx}`}
                style={styles.packagePill}
                onPress={() => setShowQuoteModal(true)}
                activeOpacity={0.8}
              >
                <Text style={styles.packagePillText}>
                  {spec.split(' ').slice(0, 3).join(' ')}
                </Text>
              </TouchableOpacity>
            ))}
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
                <Text style={styles.gReviewAvatarText}>P</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.gReviewName}>Priya Venkatesh</Text>
                <Text style={styles.gReviewTime}>2 weeks ago</Text>
              </View>
              <View style={styles.gReviewRating}>
                <Text style={styles.gReviewRatingText}>5.0</Text>
                <View style={{ flexDirection: 'row', gap: 2 }}>
                  <Star size={10} color="#FBBF24" fill="#FBBF24" />
                  <Star size={10} color="#FBBF24" fill="#FBBF24" />
                  <Star size={10} color="#FBBF24" fill="#FBBF24" />
                  <Star size={10} color="#FBBF24" fill="#FBBF24" />
                  <Star size={10} color="#FBBF24" fill="#FBBF24" />
                </View>
              </View>
            </View>
            <Text style={styles.gReviewComment}>
              "The invitation cards were absolutely stunning! Our guests were wowed before even attending the wedding. Perfect gold foil finish and delivered right on time."
            </Text>
            <View style={{ alignItems: 'flex-end', marginTop: 8 }}>
              <Text style={{ fontSize: 16, fontWeight: '900', color: '#4285F4' }}>G</Text>
            </View>
          </View>

          <View style={styles.googleReviewCard}>
            <View style={styles.gReviewHeader}>
              <View style={[styles.gReviewAvatar, { backgroundColor: '#7C3B1E' }]}>
                <Text style={styles.gReviewAvatarText}>A</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.gReviewName}>Arun & Deepika</Text>
                <Text style={styles.gReviewTime}>1 month ago</Text>
              </View>
              <View style={styles.gReviewRating}>
                <Text style={styles.gReviewRatingText}>5.0</Text>
                <View style={{ flexDirection: 'row', gap: 2 }}>
                  <Star size={10} color="#FBBF24" fill="#FBBF24" />
                  <Star size={10} color="#FBBF24" fill="#FBBF24" />
                  <Star size={10} color="#FBBF24" fill="#FBBF24" />
                  <Star size={10} color="#FBBF24" fill="#FBBF24" />
                  <Star size={10} color="#FBBF24" fill="#FBBF24" />
                </View>
              </View>
            </View>
            <Text style={styles.gReviewComment}>
              "Amazing quality gold foil work. The monogram came out exactly as we imagined. Highly recommend for luxury invitation cards!"
            </Text>
            <View style={{ alignItems: 'flex-end', marginTop: 8 }}>
              <Text style={{ fontSize: 16, fontWeight: '900', color: '#4285F4' }}>G</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* STICKY BOTTOM ACTION BAR */}
      <View style={styles.bottomBarNew}>
        <div className="w-full max-w-4xl mx-auto flex items-center justify-between gap-2.5 px-3 sm:px-6">
          <TouchableOpacity style={styles.btnWhatsapp} onPress={handleWhatsApp} activeOpacity={0.8}>
            <MessageCircle size={14} color="#10B981" style={{ marginRight: 4 }} />
            <Text style={styles.btnWhatsappText}>WhatsApp</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnCall} onPress={handleCall} activeOpacity={0.8}>
            <Phone size={14} color="#4B5563" style={{ marginRight: 4 }} />
            <Text style={styles.btnCallText}>Call Now</Text>
          </TouchableOpacity>

          {quoteStatus === 'initial' && (
            <TouchableOpacity
              style={styles.btnQuote}
              onPress={() => setShowQuoteModal(true)}
              activeOpacity={0.85}
            >
              <Send className="w-4 h-4 text-white mr-1.5" />
              <Text style={styles.btnQuoteText}>Request Quote</Text>
            </TouchableOpacity>
          )}

          {quoteStatus === 'requested' && (
            <TouchableOpacity style={[styles.btnQuote, { backgroundColor: '#F59E0B' }]} disabled activeOpacity={1}>
              <Text style={styles.btnQuoteText}>Pending Response</Text>
            </TouchableOpacity>
          )}

          {quoteStatus === 'negotiating' && (
            <TouchableOpacity style={[styles.btnQuote, { backgroundColor: '#F59E0B' }]} disabled activeOpacity={1}>
              <Text style={styles.btnQuoteText}>Negotiating...</Text>
            </TouchableOpacity>
          )}

          {quoteStatus === 'rejected' && (
            <TouchableOpacity style={[styles.btnQuote, { backgroundColor: '#DC2626' }]} onPress={() => updateQuoteStatus('initial')} activeOpacity={0.85}>
              <Text style={styles.btnQuoteText}>Rejected (Reset)</Text>
            </TouchableOpacity>
          )}

          {quoteStatus === 'response_ready' && (
            <TouchableOpacity style={[styles.btnQuote, { backgroundColor: '#10B981' }]} onPress={() => setShowQuotationScreen(true)} activeOpacity={0.85}>
              <Text style={styles.btnQuoteText}>View Quote</Text>
            </TouchableOpacity>
          )}

          {(quoteStatus === 'confirmed' || quoteStatus === 'partially_paid' || quoteStatus === 'fully_paid') && (
            <TouchableOpacity
              style={[styles.btnQuote, { backgroundColor: '#15803D' }]}
              onPress={() => setShowInvoiceModal(true)}
              activeOpacity={0.85}
            >
              <Text style={styles.btnQuoteText}>
                {quoteStatus === 'fully_paid'
                  ? 'Fully Paid (Invoice)'
                  : quoteStatus === 'partially_paid'
                  ? 'Partially Paid (Invoice)'
                  : 'View Invoice'}
              </Text>
            </TouchableOpacity>
          )}
        </div>
      </View>

      {/* DRAGGABLE / SWIPEABLE PHOTO GALLERY MODAL */}
      <DraggablePhotoGalleryModal
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        photos={portfolioImages}
        initialIndex={galleryInitialIndex}
        title={invite.name}
        category="Invitations"
      />

      {/* REQUEST QUOTE MODAL */}
      <RequestQuoteModal
        visible={showQuoteModal}
        vendorId={invite.id}
        onClose={() => setShowQuoteModal(false)}
        studioName={invite.name}
        startingPrice={invite.startingPrice}
        location={invite.location}
        category="invitation"
        onQuoteSent={handleQuoteRequestSent}
      />

      <QuotationScreen
        visible={showQuotationScreen}
        onClose={() => setShowQuotationScreen(false)}
        quoteStatus={quoteStatus}
        setQuoteStatus={updateQuoteStatus}
        vendorId={invite.id}
        vendorName={invite.name}
        vendorImage={invite.image}
        vendorLocation={invite.location}
        startingPrice={invite.startingPrice}
        category="Invitations"
        packageName="Custom Animated Luxury E-Invite & Printed Cards"
        includedServices={[
          'Bespoke Animated Video Invitation Design',
          'Couple Save-the-Date Digital Flyer',
          '150 Gold Foil Premium Printed Cards',
          'Custom Couple Wedding Monogram Design',
          'Digital RSVP Portal & Guest Tracking Link',
        ]}
        onNavigateToQuotesTab={() => {
          setShowQuotationScreen(false);
          setShowInvoiceModal(true);
        }}
        onBack={onBack}
        onShowToast={(msg) => setToastMessage(msg)}
      />

      {/* INVOICE & MILESTONES PAYMENT MODAL */}
      <WeddingInvoicePaymentModal
        visible={showInvoiceModal}
        onClose={() => setShowInvoiceModal(false)}
        vendorId={invite.id}
        vendorName={invite.name}
        vendorImage={invite.image}
        vendorLocation={invite.location}
        category="Invitations"
        startingPrice={invite.startingPrice || '₹15,000'}
        bookingSource={bookingSource}
        onNavigateToMyWeddingPayments={() => {
          setShowInvoiceModal(false);
          if (onNavigateToMyWeddingPayments) {
            onNavigateToMyWeddingPayments();
          } else {
            window.dispatchEvent(
              new CustomEvent('tot_switch_to_my_wedding_payments', { detail: { vendorId: invite.id } })
            );
          }
        }}
        onNavigateToProfileMyBookings={() => {
          setShowInvoiceModal(false);
          if (onNavigateToProfileMyBookings) {
            onNavigateToProfileMyBookings();
          } else {
            window.dispatchEvent(
              new CustomEvent('tot_switch_to_profile_my_bookings', { detail: { vendorId: invite.id } })
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
  },

  /* NAV HEADER */
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

  /* HERO */
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
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },

  /* MAIN OVERLAPPING CARD */
  mainCard: {
    marginTop: 0,
    backgroundColor: '#FAF7F2',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    width: '100%',
    maxWidth: 800,
    alignSelf: 'center',
    minHeight: 800,
    paddingHorizontal: 16,
    paddingTop: 24,
    zIndex: 10,
  },

  /* TITLE ROW */
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

  /* QUICK INFO */
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

  /* SECTION */
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#2A2425',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 12.5,
    lineHeight: 18,
    color: '#4B5563',
    marginBottom: 24,
  },

  /* MEDIA TABS */
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
    marginBottom: 9,
  },
  mediaTabsLine: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginBottom: 16,
    marginTop: -8,
  },

  /* PHOTO GRID */
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
    ...StyleSheet.absoluteFill,
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

  /* TAGS */
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

  /* BADGES */
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

  /* PACKAGES */
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

  /* REVIEWS */
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
    marginBottom: 16,
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

  /* BOTTOM BAR */
  bottomBarNew: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FAF7F2',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingVertical: 10,
    zIndex: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
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
    backgroundColor: '#380B13',
  },
  btnQuoteText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#F3E5AB',
  },

  /* PHOTO MODAL */
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

  /* QUOTE MODAL */
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
  successContainer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  successTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#065F46',
    marginBottom: 6,
  },
  successSub: {
    fontSize: 13,
    color: '#6B5E5E',
    textAlign: 'center',
    lineHeight: 19,
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
    backgroundColor: '#F3ECE4',
    borderColor: '#581420',
  },
  selectChipText: {
    fontSize: 12,
    color: '#6B5E5E',
    fontWeight: '500',
  },
  selectChipTextActive: {
    color: '#581420',
    fontWeight: '700',
  },
  submitModalBtn: {
    backgroundColor: '#581420',
    paddingVertical: 13,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  submitModalBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
});

