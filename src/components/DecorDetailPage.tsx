import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
  TextInput,
  Linking,
} from 'react-native';
import {
  ChevronLeft,
  Heart,
  Share2,
  Star,
  MapPin,
  Calendar,
  Users,
  Camera,
  CheckCircle2,
  Award,
  ShieldCheck,
  Instagram,
  Trophy,
  Phone,
  Send,
  MessageCircle,
  X,
  Check,
  Building2,
  Video,
  Eye,
  Clock,
  Sparkles,
  ChevronDown,
  User,
  FileText,
  Palette,
  Flower2,
  Bookmark,
  LayoutGrid,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { RequestQuoteModal } from './RequestQuoteModal';
import { QuotationScreen } from './QuotationScreen';
import { WeddingInvoicePaymentModal } from './WeddingInvoicePaymentModal';
import { DraggablePhotoGalleryModal } from './DraggablePhotoGalleryModal';
import { LuxuryToast } from './LuxuryToast';
import {
  getWeddingBookingByVendorId,
  saveOrUpdateWeddingBooking,
} from '../utils/weddingPaymentsManager';

export interface DecorStudio {
  id: string;
  name: string;
  rating: number;
  reviewsCount: number;
  location: string;
  city?: string;
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
  coreSpecialty?: string;
  teamSize?: string;
  designProcess?: string;
  services?: string[];
  [key: string]: any;
}

interface DecorDetailPageProps {
  onNavigateToQuotesTab?: () => void;
  studio: DecorStudio;
  onBack: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  bookingSource?: 'entire_wedding' | 'individual';
  onNavigateToMyWeddingPayments?: () => void;
  onNavigateToProfileMyBookings?: () => void;
}

export const DecorDetailPage: React.FC<DecorDetailPageProps> = ({
  onNavigateToQuotesTab,
  studio,
  onBack,
  isBookmarked,
  onToggleBookmark,
  bookingSource = 'entire_wedding',
  onNavigateToMyWeddingPayments,
  onNavigateToProfileMyBookings,
}) => {
  const [activeMediaTab, setActiveMediaTab] = useState<'photos' | 'packages' | 'reviews'>('photos');
  const [isReadMore, setIsReadMore] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryInitialIndex, setGalleryInitialIndex] = useState(0);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [quoteSuccess, setQuoteSuccess] = useState(false);
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
    } catch (e) {
      console.error(e);
    }
    const existing = getWeddingBookingByVendorId(studio.id);
    if (existing) return existing.status;
    return 'initial';
  });

  useEffect(() => {
    const handleUpdate = () => {
      const existing = getWeddingBookingByVendorId(studio.id);
      if (existing) setQuoteStatus(existing.status);
    };
    window.addEventListener('tot_wedding_payments_updated', handleUpdate);
    return () => window.removeEventListener('tot_wedding_payments_updated', handleUpdate);
  }, [studio.id]);

  const updateQuoteStatus = (newStatus: 'initial' | 'requested' | 'response_ready' | 'confirmed' | 'partially_paid' | 'fully_paid' | 'rejected' | 'negotiating') => {
    setQuoteStatus(newStatus);
    const basePrice = parseInt((studio.startingPrice || '₹75,000').replace(/[^0-9]/g, ''), 10) || 75000;
    saveOrUpdateWeddingBooking({
      vendorId: studio.id,
      vendorName: studio.name,
      category: 'Decor',
      serviceType: 'Theme Wedding Mandap & Grand Stage Decor',
      image: studio.image,
      location: studio.location || 'Chennai, Tamil Nadu',
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

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Helper to get studio initials for logo
  const getInitials = (name: string) => {
    const words = (name || '').replace(/decor|wedding|designs|events/gi, '').trim().split(' ');
    if (words.length >= 2 && words[0] && words[1]) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return (name || 'DEC').slice(0, 3).toUpperCase();
  };

  // Curated 24 high-res luxury wedding decor and floral stage photos
  const photoGallery = [
    studio.image,
    'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1609151162377-794fa68b02f1?auto=format&fit=crop&w=1200&q=85',
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
    'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=85',
  ];

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Decor link copied to clipboard!');
    } else {
      showToast('Sharing decor details...');
    }
  };

  const handleWhatsApp = () => {
    const msg = encodeURIComponent(
      `Hi ${studio.name}, I found your wedding decor studio on Tale of Two. I would like to inquire about wedding stage & mandap decoration packages in ${studio.location}.`
    );
    const phone = studio.phone ? studio.phone.replace(/[^0-9]/g, '') : '919150197966';
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
  };

  const handleCall = () => {
    const phone = studio.phone || '+919150197966';
    window.open(`tel:${phone}`, '_self');
  };

  const handleInstagram = () => {
    const handle = studio.instagram || '@_ranjith_r.r_';
    const username = handle.replace('@', '');
    window.open(`https://instagram.com/${username}`, '_blank');
  };

  const packagesList = [
    {
      title: 'Grand Mandap & Stage Floral Decor',
      price: studio.startingPrice || '₹1,50,000 onwards',
      popular: true,
      features: [
        'Royal Floral Mandap with Jasmine & Rose Garland Strands',
        'Custom 3D Stage Backdrop with Warm Ambient Mood Lighting',
        'Carpeted Aisle with Brass Urli & Floral Pillar Accents',
        'Bride & Groom Royal Seating Sofa / Chairs Setup',
        'Full Pre-event 3D Concept Blueprint Consultation',
      ],
    },
    {
      title: 'Royal Reception & Grand Entrance Canopy',
      price: '₹2,50,000 onwards',
      popular: false,
      features: [
        'Crystal Chandelier & Heavy Truss Light Rigging',
        'Grand Floral Entrance Arch Tunnel with Photobooth Backdrop',
        'VIP Family Table Centerpieces & Satin Linen Draping',
        'Cold Pyro Sparks & Heavy Fog Entry Effects',
        'Dedicated On-site Decor Maintenance Team during event',
      ],
    },
    {
      title: 'Haldi, Mehendi & Sangeet Yellow Decor',
      price: '₹95,000 onwards',
      popular: false,
      features: [
        'Vibrant Yellow & Orange Marigold Curtain Draping',
        'Traditional Floral Swing (Jhula) Photo Area',
        'Brass Urlis with Floating Lotus Flowers & Candles',
        'Comfortable Colorful Floor Cushion Seating Setup',
      ],
    },
  ];

  return (
    <View style={styles.container}>
      {/* Toast Notification */}
      <LuxuryToast message={toastMessage} />

      <ScrollView
        style={{ flex: 1, overflowY: 'auto' } as any}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 90 }}
      >
        {/* HERO SECTION WITH LUXURY 5-PHOTO MOSAIC (DESKTOP) & MOBILE COVER */}
        <div className="relative w-full bg-[#FAF7F2] border-b border-[#E8DEC2]/40">
          {/* Top Overlaid Action Bar - Pinned to screen top-left & top-right */}
          <div className="absolute top-4 left-4 right-4 z-50 flex items-center justify-between pointer-events-auto">
            <TouchableOpacity style={styles.overlayCircleBtnDark} onPress={onBack} activeOpacity={0.8}>
              <ChevronLeft className="w-6 h-6 text-white" />
            </TouchableOpacity>

            <View style={styles.topOverlayRightGroup}>
              <TouchableOpacity
                style={styles.overlayCircleBtnLight}
                onPress={() => onToggleBookmark(studio.id)}
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
                  src={photoGallery[0]}
                  alt={studio.name}
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
                  src={photoGallery[1] || photoGallery[0]}
                  alt={`${studio.name} 2`}
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
                  src={photoGallery[2] || photoGallery[0]}
                  alt={`${studio.name} 3`}
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
                  src={photoGallery[3] || photoGallery[0]}
                  alt={`${studio.name} 4`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Eye className="w-6 h-6 text-white drop-shadow-lg" />
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
                  src={photoGallery[4] || photoGallery[0]}
                  alt={`${studio.name} 5`}
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
                  <span>Show all {photoGallery.length} photos</span>
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
                src={studio.image}
                alt={studio.name}
                className="w-full h-full object-cover"
              />
              <button className="absolute bottom-3 right-3 bg-black/60 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 backdrop-blur-sm">
                <Camera className="w-3 h-3 text-white" />
                <span>1 / {photoGallery.length}</span>
              </button>
            </div>
          </div>
        </div>

        {/* OVERLAPPING MAIN STUDIO INFO CARD */}
        <View style={styles.mainContentCard}>
          {/* Logo Badge + Header Row */}
          <View style={styles.studioHeaderRow}>
            <View style={styles.logoBox}>
              <Flower2 className="w-6 h-6 text-[#E5A93C] mb-0.5" />
              <Text style={styles.logoInitials}>{getInitials(studio.name)}</Text>
            </View>

            <View style={styles.headerInfoCol}>
              <Text style={styles.studioTitle}>{studio.name}</Text>

              {/* TOT CERTIFIED Gold Tag */}
              <View style={styles.certifiedBadge}>
                <ShieldCheck className="w-3.5 h-3.5 text-[#B45309] mr-1" />
                <Text style={styles.certifiedBadgeText}>TOT CERTIFIED</Text>
              </View>

              <Text style={styles.subtitleText}>
                {studio.category} • <Text style={styles.tierHighlight}>{studio.tier || 'Signature'}</Text> • {studio.location}
              </Text>

              {/* Rating Row */}
              <View style={styles.ratingRow}>
                <Star className="w-4 h-4 text-[#E5A93C] fill-[#E5A93C] mr-1" />
                <Text style={styles.ratingBold}>{studio.rating}</Text>
                <Text style={styles.reviewsCountText}> ({studio.reviewsCount} Reviews)</Text>
              </View>
            </View>
          </View>

          {/* 4 KEY METRICS STATS BAR */}
          <View style={styles.metricsBar}>
            <View style={styles.metricItem}>
              <Calendar className="w-4 h-4 text-[#8B1E2F] mb-1" />
              <Text style={styles.metricVal}>{studio.experience || '10+ Years'}</Text>
              <Text style={styles.metricLbl}>Exp.</Text>
            </View>
            <View style={styles.metricDivider} />

            <View style={styles.metricItem}>
              <Users className="w-4 h-4 text-[#8B1E2F] mb-1" />
              <Text style={styles.metricVal}>250+</Text>
              <Text style={styles.metricLbl}>Decor Events</Text>
            </View>
            <View style={styles.metricDivider} />

            <View style={styles.metricItem}>
              <Palette className="w-4 h-4 text-[#8B1E2F] mb-1" />
              <Text style={styles.metricVal}>15+ Themes</Text>
              <Text style={styles.metricLbl}>Styles</Text>
            </View>
            <View style={styles.metricDivider} />

            <View style={styles.metricItem}>
              <Star className="w-4 h-4 text-[#8B1E2F] mb-1" />
              <Text style={styles.metricVal}>{studio.rating}</Text>
              <Text style={styles.metricLbl}>Rating</Text>
            </View>
          </View>

          {/* TAB BAR NAVIGATION */}
          <View style={styles.tabBar}>
            <TouchableOpacity
              style={[styles.tabItem, activeMediaTab === 'photos' && styles.tabItemActive]}
              onPress={() => setActiveMediaTab('photos')}
              activeOpacity={0.8}
            >
              <Text style={[styles.tabText, activeMediaTab === 'photos' && styles.tabTextActive]}>
                Photos ({photoGallery.length})
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tabItem, activeMediaTab === 'packages' && styles.tabItemActive]}
              onPress={() => setActiveMediaTab('packages')}
              activeOpacity={0.8}
            >
              <Text style={[styles.tabText, activeMediaTab === 'packages' && styles.tabTextActive]}>
                Packages ({packagesList.length})
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tabItem, activeMediaTab === 'reviews' && styles.tabItemActive]}
              onPress={() => setActiveMediaTab('reviews')}
              activeOpacity={0.8}
            >
              <Text style={[styles.tabText, activeMediaTab === 'reviews' && styles.tabTextActive]}>
                Reviews ({studio.reviewsCount})
              </Text>
            </TouchableOpacity>
          </View>

          {/* TAB CONTENT: PHOTOS */}
          {activeMediaTab === 'photos' && (
            <View style={styles.galleryGridContainer}>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 w-full">
                {photoGallery.map((imgUrl, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative aspect-square rounded-xl overflow-hidden bg-stone-100 cursor-pointer shadow-sm group"
                    onClick={() => {
                      setGalleryInitialIndex(idx);
                      setIsGalleryOpen(true);
                    }}
                  >
                    <img
                      src={imgUrl}
                      alt={`${studio.name} Decor ${idx + 1}`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Eye className="w-6 h-6 text-white drop-shadow-md" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </View>
          )}

          {/* TAB CONTENT: PACKAGES */}
          {activeMediaTab === 'packages' && (
            <View style={styles.packagesContainer}>
              {packagesList.map((pkg, idx) => (
                <View key={idx} style={[styles.packageCard, pkg.popular && styles.packageCardPopular]}>
                  {pkg.popular && (
                    <View style={styles.popularBadge}>
                      <Sparkles className="w-3 h-3 text-white mr-1" />
                      <Text style={styles.popularBadgeText}>MOST POPULAR</Text>
                    </View>
                  )}
                  <Text style={styles.pkgTitle}>{pkg.title}</Text>
                  <Text style={styles.pkgPrice}>{pkg.price}</Text>
                  <View style={styles.featuresList}>
                    {pkg.features.map((feat, fIdx) => (
                      <View key={fIdx} style={styles.featureRow}>
                        <Check className="w-4 h-4 text-[#15803D] mr-2 flex-shrink-0" />
                        <Text style={styles.featureText}>{feat}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* TAB CONTENT: REVIEWS */}
          {activeMediaTab === 'reviews' && (
            <View style={styles.reviewsContainer}>
              <View style={styles.ratingOverviewBox}>
                <Text style={styles.ratingBigScore}>{studio.rating}</Text>
                <View style={styles.starsRow}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-[#E5A93C] fill-[#E5A93C] mr-0.5" />
                  ))}
                </View>
                <Text style={styles.totalReviewsLabel}>Based on {studio.reviewsCount} verified reviews</Text>
              </View>

              {[
                {
                  name: 'Kavitha & Arjun',
                  date: '15 Jan 2026',
                  rating: 5,
                  comment: 'The mandap decor was absolutely breathtaking! The fresh jasmine pillars and warm chandelier lighting created a magical ambience that all our guests praised.',
                },
                {
                  name: 'Praveen & Divya',
                  date: '28 Dec 2025',
                  rating: 5,
                  comment: 'Extremely professional team! They executed the exact 3D design we approved for our Chennai reception. The entrance tunnel and photobooth were huge hits.',
                },
              ].map((rev, idx) => (
                <View key={idx} style={styles.reviewItemCard}>
                  <View style={styles.reviewHeaderRow}>
                    <Text style={styles.reviewerName}>{rev.name}</Text>
                    <Text style={styles.reviewDate}>{rev.date}</Text>
                  </View>
                  <View style={styles.starsRow}>
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-[#E5A93C] fill-[#E5A93C] mr-0.5" />
                    ))}
                  </View>
                  <Text style={styles.reviewComment}>{rev.comment}</Text>
                </View>
              ))}
            </View>
          )}

          {/* ABOUT STUDIO DESCRIPTION */}
          <View style={styles.aboutSection}>
            <Text style={styles.aboutHeading}>About {studio.name}</Text>
            <Text style={styles.aboutText}>
              {isReadMore
                ? studio.description ||
                  `${studio.name} is one of Tamil Nadu's premiere wedding decor design houses, specialising in grand Mandap setups, lavish stage backdrops, fairy-light canopies, and bespoke Haldi & Mehendi themes. From royal traditional floral styling to minimalist modern aesthetics, we transform venues into magical celebrations.`
                : (studio.description ||
                    `${studio.name} is one of Tamil Nadu's premiere wedding decor design houses, specialising in grand Mandap setups, lavish stage backdrops, fairy-light canopies, and bespoke Haldi & Mehendi themes.`).slice(0, 160) + '...'}
            </Text>
            <TouchableOpacity onPress={() => setIsReadMore(!isReadMore)} activeOpacity={0.7}>
              <Text style={styles.readMoreBtnText}>{isReadMore ? 'Read Less' : 'Read More'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* FIXED BOTTOM ACTION BAR */}
      <View style={styles.bottomBar}>
        <div className="w-full max-w-4xl mx-auto flex items-center justify-between gap-3 px-3 sm:px-6">
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
        </div>
      </View>

      {/* DRAGGABLE / SWIPEABLE PHOTO GALLERY MODAL */}
      <DraggablePhotoGalleryModal
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        photos={photoGallery}
        initialIndex={galleryInitialIndex}
        title={studio.name}
        category="Wedding Decor"
      />

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

      {/* QUOTATION MODAL */}
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
        packageName="Theme Wedding Mandap & Grand Stage Decor"
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
        onShowToast={(msg) => setToastMessage(msg)}
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
  },
  toastContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    zIndex: 9999,
    backgroundColor: '#2A2425',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  toastText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
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
    marginTop: 0,
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
    color: '#8C7A7C',
  },
  metricsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#F0E8D8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
  },
  metricItem: {
    alignItems: 'center',
    flex: 1,
  },
  metricVal: {
    fontSize: 13,
    fontWeight: '700',
    color: '#2A2425',
  },
  metricLbl: {
    fontSize: 10,
    color: '#8C7A7C',
    marginTop: 2,
  },
  metricDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#F0E8D8',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#F0EAE1',
    borderRadius: 12,
    padding: 3,
    marginBottom: 16,
  },
  tabItem: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 9,
  },
  tabItemActive: {
    backgroundColor: '#581420',
  },
  tabText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B5A5C',
  },
  tabTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  galleryGridContainer: {
    marginBottom: 24,
  },
  packagesContainer: {
    gap: 12,
    marginBottom: 24,
  },
  packageCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F0E8D8',
    position: 'relative',
  },
  packageCardPopular: {
    borderColor: '#581420',
    borderWidth: 1.5,
  },
  popularBadge: {
    position: 'absolute',
    top: -10,
    right: 14,
    backgroundColor: '#581420',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  popularBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  pkgTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2A2425',
    marginBottom: 4,
  },
  pkgPrice: {
    fontSize: 14,
    fontWeight: '800',
    color: '#581420',
    marginBottom: 12,
  },
  featuresList: {
    gap: 6,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  featureText: {
    fontSize: 12,
    color: '#4A3E3F',
    flex: 1,
  },
  reviewsContainer: {
    gap: 12,
    marginBottom: 24,
  },
  ratingOverviewBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F0E8D8',
    marginBottom: 8,
  },
  ratingBigScore: {
    fontSize: 32,
    fontWeight: '800',
    color: '#2A2425',
  },
  totalReviewsLabel: {
    fontSize: 11,
    color: '#8C7A7C',
    marginTop: 4,
  },
  reviewItemCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#F0E8D8',
  },
  reviewHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  reviewerName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#2A2425',
  },
  reviewDate: {
    fontSize: 11,
    color: '#8C7A7C',
  },
  starsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  reviewComment: {
    fontSize: 12,
    color: '#4A3E3F',
    lineHeight: 18,
  },
  aboutSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F0E8D8',
    marginBottom: 24,
  },
  aboutHeading: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2A2425',
    marginBottom: 8,
  },
  aboutText: {
    fontSize: 12,
    color: '#6B5A5C',
    lineHeight: 19,
    marginBottom: 6,
  },
  readMoreBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#581420',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderTopWidth: 1,
    borderTopColor: '#E8DFD5',
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 50,
  },
  bottomPriceCol: {
    justifyContent: 'center',
  },
  bottomPriceLabel: {
    fontSize: 10,
    color: '#8C7A7C',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  bottomPriceValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#581420',
  },
  bottomActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  circleCallBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5EFE6',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E8DEC2',
  },
  circleWhatsAppBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#C8E6C9',
  },
  circleInstagramBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FCE4EC',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F8BBD0',
  },
  primaryQuoteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#581420',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    shadowColor: '#581420',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  primaryQuoteBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
});
