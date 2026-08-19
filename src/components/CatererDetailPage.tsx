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
  Utensils,
  
  Palette,
  Eye,
  Camera,
  LayoutGrid,
  Users,
  FileText,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { QuotationScreen } from './QuotationScreen';
import { CateringVendor } from './CateringListingPage';
import { RequestQuoteModal } from './RequestQuoteModal';
import { WeddingInvoicePaymentModal } from './WeddingInvoicePaymentModal';
import { DraggablePhotoGalleryModal } from './DraggablePhotoGalleryModal';
import { LuxuryToast } from './LuxuryToast';
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
  const [activeMediaTab, setActiveMediaTab] = useState<'photos' | 'packages' | 'highlights' | 'reviews'>('photos');
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
    } catch (e) {
      console.error(e);
    }
    const existing = getWeddingBookingByVendorId(caterer.id);
    if (existing) return existing.status;
    return 'initial';
  });

  useEffect(() => {
    const handleUpdate = () => {
      const existing = getWeddingBookingByVendorId(caterer.id);
      if (existing) setQuoteStatus(existing.status);
    };
    window.addEventListener('tot_wedding_payments_updated', handleUpdate);
    return () => window.removeEventListener('tot_wedding_payments_updated', handleUpdate);
  }, [caterer.id]);

  const updateQuoteStatus = (newStatus: 'initial' | 'requested' | 'response_ready' | 'confirmed' | 'partially_paid' | 'fully_paid' | 'rejected' | 'negotiating') => {
    setQuoteStatus(newStatus);
    const basePrice = parseInt((caterer.startingPrice || '₹550/plate').replace(/[^0-9]/g, ''), 10) * 500 || 275000;
    saveOrUpdateWeddingBooking({
      vendorId: caterer.id,
      vendorName: caterer.name,
      category: 'Catering',
      serviceType: 'Royal Wedding Feast & Live Counters',
      image: caterer.image,
      location: caterer.location || 'Chennai, Tamil Nadu',
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

  // Curated 24 luxury catering setup and gourmet banquet photos (100% food & feast only)
  const portfolioImages = [
    caterer.image,
    'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=1200&q=85',
  ];

  const packagesList = [
    {
      title: 'South Indian Grand Feast (Banana Leaf)',
      price: caterer.startingPrice || '₹450 / Plate',
      popular: true,
      features: [
        'Traditional 24-Item Sadhya Banana Leaf Service',
        'Authentic Chettinad & Brahmin Iyer Special Recipes',
        'Live Dosa, Crispy Vada & Appam Counters',
        'Premium Stainless Steel / Chafing Dish Setup',
        'Experienced Uniformed Waitstaff & Table Clearing',
      ],
    },
    {
      title: 'Royal Mughal & Dum Biryani Banquet',
      price: '₹650 / Plate',
      popular: false,
      features: [
        'Slow Dum Cooked Mutton & Chicken Biryani Handis',
        'Sizzling Tandoori Kebabs & Roomali Roti Stations',
        'Rich Mirchi Ka Salan & Traditional Raita Assortment',
        'Elaborate Shahi Tukda & Hot Gulab Jamun Desserts',
        'Dedicated Buffet Managers & Live Carving Station',
      ],
    },
    {
      title: 'Global Multi-Cuisine Wedding Buffet',
      price: '₹850 / Plate',
      popular: false,
      features: [
        'Pan-Asian Dim Sum & Live Wok Counters',
        'Woodfired Artisan Pizza & Fresh Pasta Stations',
        'Elaborate Mezze Platter & European Salad Bar',
        'Gourmet Multi-Tier Dessert & Mocktail Lounge',
        'Full Crockery, Cutlery & Glassware Included',
      ],
    },
    {
      title: 'Intimate Gathering & Reception Package',
      price: '₹550 / Plate',
      popular: false,
      features: [
        'Perfect for 50-150 Guests',
        'Choice of 4 Starters, 6 Mains & 3 Desserts',
        'Dedicated Floor Supervisors & Chef Service',
        '100% RO Purified Drinking Water & Fresh Produce',
      ],
    },
  ];

  const cateringHighlights = [
    'FSSAI Certified',
    'No MSG or Artificial Colors',
    'Farm Fresh Vegetables',
    'RO Purified Water Cooking',
    'A-Grade Grocery & Spices',
    'Experienced Master Chefs',
    'Uniformed Serving Staff',
    'Biodegradable Plates Option',
    'ISO Standard Kitchen',
  ];

  const reviewsList = [
    {
      id: 'rev-1',
      name: 'Priyanka & Karthi',
      date: 'January 2026',
      event: 'Grand Muhurtham in ' + (caterer.location || 'Chennai'),
      rating: 5,
      comment: `Absolute magic! ${caterer.name} prepared the most incredible wedding feast on our special day. The food was absolutely delicious and the service was warm and attentive!`,
    },
    {
      id: 'rev-2',
      name: 'Dr. Sneha Rajan',
      date: 'December 2025',
      event: 'Grand Reception Buffet',
      rating: 5,
      comment: `Extremely professional catering team. They arrived right on time at our venue with fresh ingredients and spotless live food counters. The live dosa counter and hot filter coffee were huge hits with our guests!`,
    },
    {
      id: 'rev-3',
      name: 'Ananya V.',
      date: 'November 2025',
      event: 'Engagement & Sangeet Feast',
      rating: 5,
      comment: `The authentic flavors and menu variety exceeded all our expectations! ${caterer.name} catered for over 600 guests seamlessly. Highly recommended for all South Indian weddings!`,
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
        title: caterer.name,
        text: `Check out ${caterer.name} for catering on Tale of Two!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      setToastMessage('Link copied to clipboard!');
      setTimeout(() => setToastMessage(null), 2500);
    }
  };

  const handleCall = () => {
    const phoneNumber = caterer.phone ? caterer.phone.replace(/[^0-9+]/g, '') : '+919150197966';
    Linking.openURL(`tel:${phoneNumber}`).catch(() => {
      setToastMessage(`Call ${caterer.phone || '+91 91501 97966'}`);
      setTimeout(() => setToastMessage(null), 3000);
    });
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(`Hi ${caterer.name}, I found your catering profile on Tale of Two and would like to check availability and menus for my wedding date.`);
    Linking.openURL(`https://wa.me/919150197966?text=${text}`).catch(() => {
      setToastMessage('Opening WhatsApp...');
      setTimeout(() => setToastMessage(null), 2000);
    });
  };

  return (
    <View style={styles.container}>
      {/* TOAST MESSAGE */}
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
                onPress={() => onToggleBookmark(caterer.id)}
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
                  src={portfolioImages[0]}
                  alt={caterer.name}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=1200&q=85';
                  }}
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
                  alt={`${caterer.name} 2`}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1200&q=85';
                  }}
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
                  alt={`${caterer.name} 3`}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=85';
                  }}
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
                  alt={`${caterer.name} 4`}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=85';
                  }}
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
                  src={portfolioImages[4] || portfolioImages[0]}
                  alt={`${caterer.name} 5`}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=85';
                  }}
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
                src={caterer.image}
                alt={caterer.name}
                className="w-full h-full object-cover"
              />
              <button className="absolute bottom-3 right-3 bg-black/60 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 backdrop-blur-sm">
                <Camera className="w-3 h-3 text-white" />
                <span>1 / {portfolioImages.length}</span>
              </button>
            </div>
          </div>
        </div>

        {/* OVERLAPPING MAIN CATERER INFO CARD */}
        <View style={styles.mainContentCard}>
          {/* Logo Badge + Header Row */}
          <View style={styles.studioHeaderRow}>
            <View style={styles.logoBox}>
              <Utensils className="w-6 h-6 text-[#E5A93C] mb-0.5" />
              <Text style={styles.logoInitials}>{getInitials(caterer.name)}</Text>
            </View>

            <View style={styles.headerInfoCol}>
              <Text style={styles.studioTitle}>{caterer.name}</Text>

              {/* TOT CERTIFIED Gold Tag */}
              <View style={styles.certifiedBadge}>
                <ShieldCheck className="w-3.5 h-3.5 text-[#B45309] mr-1" />
                <Text style={styles.certifiedBadgeText}>TOT CERTIFIED</Text>
              </View>

              <Text style={styles.subtitleText}>
                {caterer.category} • <Text style={styles.tierHighlight}>{caterer.tier || 'Signature'}</Text> • {caterer.location}
              </Text>

              {/* Rating Row */}
              <View style={styles.ratingRow}>
                <Star className="w-4 h-4 text-[#E5A93C] fill-[#E5A93C] mr-1" />
                <Text style={styles.ratingBold}>{caterer.rating}</Text>
                <Text style={styles.reviewsCountText}> ({caterer.reviewsCount || 180} Reviews)</Text>
              </View>
            </View>
          </View>

          {/* 4 KEY METRICS STATS BAR */}
          <View style={styles.metricsBar}>
            <View style={styles.metricItem}>
              <Calendar className="w-4 h-4 text-[#8B1E2F] mb-1" />
              <Text style={styles.metricVal}>{caterer.experience || '8+ Years'}</Text>
              <Text style={styles.metricLbl}>Experience</Text>
            </View>

            <View style={styles.metricDivider} />

            <View style={styles.metricItem}>
              <Users className="w-4 h-4 text-[#8B1E2F] mb-1" />
              <Text style={styles.metricVal}>{(caterer as any).capacity || '500+ Guests'}</Text>
              <Text style={styles.metricLbl}>Capacity</Text>
            </View>

            <View style={styles.metricDivider} />

            <View style={styles.metricItem}>
              <Utensils className="w-4 h-4 text-[#8B1E2F] mb-1" />
              <Text style={styles.metricVal}>Veg / Non-Veg</Text>
              <Text style={styles.metricLbl}>Cuisine</Text>
            </View>

            <View style={styles.metricDivider} />

            <View style={styles.metricItem}>
              <Clock className="w-4 h-4 text-[#8B1E2F] mb-1" />
              <Text style={styles.metricVal}>{caterer.startingPrice || '₹450/Plate'}</Text>
              <Text style={styles.metricLbl}>Starting Price</Text>
            </View>
          </View>

          {/* ABOUT SECTION */}
          <View style={styles.sectionBlock}>
            <Text style={styles.sectionTitle}>About {caterer.name}</Text>
            <Text style={styles.aboutText}>
              {caterer.description ||
                `${caterer.name} is one of ${caterer.location}'s premier wedding catering services.`}{' '}
              Specializing in authentic South Indian banana leaf sadhya feasts, royal Mughal dum biryanis, and interactive live food counters. All dishes are prepared with 100% RO purified water, farm-fresh ingredients, and hygienic ISO-certified kitchen standards.
              {isReadMore && (
                <Text style={styles.aboutText}>
                  {'\n\n'}Whether you are hosting an intimate 50-guest engagement or a grand 2,000+ guest wedding reception, our team of seasoned master chefs and trained table staff ensure impeccable dining flow and delicious, memorable flavors.
                </Text>
              )}
            </Text>
            <TouchableOpacity onPress={() => setIsReadMore(!isReadMore)} style={styles.readMoreBtn}>
              <Text style={styles.readMoreText}>{isReadMore ? 'Read Less' : 'Read More'}</Text>
            </TouchableOpacity>
          </View>

          {/* INTERACTIVE TABS */}
          <View style={styles.tabHeaderRow}>
            <TouchableOpacity
              style={[styles.galleryTab, activeMediaTab === 'photos' && styles.galleryTabActive]}
              onPress={() => setActiveMediaTab('photos')}
            >
              <Text style={[styles.galleryTabText, activeMediaTab === 'photos' && styles.galleryTabTextActive]}>
                Photos ({portfolioImages.length})
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.galleryTab, activeMediaTab === 'packages' && styles.galleryTabActive]}
              onPress={() => setActiveMediaTab('packages')}
            >
              <Text style={[styles.galleryTabText, activeMediaTab === 'packages' && styles.galleryTabTextActive]}>
                Packages & Rates
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.galleryTab, activeMediaTab === 'highlights' && styles.galleryTabActive]}
              onPress={() => setActiveMediaTab('highlights')}
            >
              <Text style={[styles.galleryTabText, activeMediaTab === 'highlights' && styles.galleryTabTextActive]}>
                Quality Assurance
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.galleryTab, activeMediaTab === 'reviews' && styles.galleryTabActive]}
              onPress={() => setActiveMediaTab('reviews')}
            >
              <Text style={[styles.galleryTabText, activeMediaTab === 'reviews' && styles.galleryTabTextActive]}>
                Reviews ({reviewsList.length})
              </Text>
            </TouchableOpacity>
          </View>

          {/* TAB 1: PHOTOS (2x2 Grid) */}
          {activeMediaTab === 'photos' && (
            <View style={{ marginBottom: 20 }}>
              <View style={styles.photoGrid}>
                {portfolioImages.slice(0, 4).map((imgUrl, idx) => (
                  <TouchableOpacity
                    key={idx}
                    style={styles.gridPhotoWrapper}
                    onPress={() => {
                      setGalleryInitialIndex(idx);
                      setIsGalleryOpen(true);
                    }}
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

              {/* QUICK CHIPS */}
              <View style={styles.quickInfoRow}>
                <View style={styles.quickChip}>
                  <Utensils className="w-3.5 h-3.5 text-[#8B1E2F] mr-1.5" />
                  <Text style={styles.quickChipText}>Live Counters</Text>
                </View>
                <View style={styles.quickChip}>
                  <Sparkles className="w-3.5 h-3.5 text-[#8B1E2F] mr-1.5" />
                  <Text style={styles.quickChipText}>Tasting Session Available</Text>
                </View>
                <View style={styles.quickChip}>
                  <ShieldCheck className="w-3.5 h-3.5 text-[#8B1E2F] mr-1.5" />
                  <Text style={styles.quickChipText}>100% Hygiene Assured</Text>
                </View>
              </View>
            </View>
          )}

          {/* TAB 2: PACKAGES & RATES */}
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
                    <Text style={styles.pkgInclusionsTitle}>Menu & Service Inclusions:</Text>
                    {pkg.features.map((feat, fIdx) => (
                      <View key={fIdx} style={styles.inclusionRow}>
                        <Check className="w-3.5 h-3.5 text-[#581420] mr-2 flex-shrink-0" />
                        <Text style={styles.inclusionText}>{feat}</Text>
                      </View>
                    ))}
                    <TouchableOpacity
                      style={styles.selectPkgBtn}
                      onPress={() => setShowQuoteModal(true)}
                      activeOpacity={0.85}
                    >
                      <Text style={styles.selectPkgBtnText}>Select & Request Quote</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* TAB 3: QUALITY ASSURANCE */}
          {activeMediaTab === 'highlights' && (
            <View style={{ marginBottom: 20 }}>
              <View style={styles.brandsGrid}>
                {cateringHighlights.map((item, bIdx) => (
                  <View key={bIdx} style={styles.brandCard}>
                    <Utensils className="w-4 h-4 text-[#581420] mr-2" />
                    <Text style={styles.brandName}>{item}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.brandGuaranteeBox}>
                <ShieldCheck className="w-5 h-5 text-[#581420] mr-2.5 flex-shrink-0" />
                <View style={{ flex: 1 }}>
                  <Text style={styles.guaranteeTitle}>Food Safety & Hygiene Assurance</Text>
                  <Text style={styles.guaranteeSub}>
                    All ingredients are sourced farm-fresh daily, cooking water is 100% RO purified, and our master chefs follow rigorous ISO & FSSAI food preparation standards.
                  </Text>
                </View>
              </View>
            </View>
          )}

          {/* TAB 4: REVIEWS */}
          {activeMediaTab === 'reviews' && (
            <View style={{ marginBottom: 20 }}>
              <View style={{ gap: 10 }}>
                {reviewsList.map((rev) => (
                  <View key={rev.id} style={styles.reviewCard}>
                    <View style={styles.reviewUserRow}>
                      <View style={styles.reviewAvatar}>
                        <Text style={{ color: '#FDE68A', fontSize: 13, fontWeight: '700' }}>
                          {rev.name.slice(0, 2).toUpperCase()}
                        </Text>
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
                    <Text style={styles.reviewDate}>{rev.date}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* TRUST BADGES GRID */}
          <Text style={styles.sectionTitle}>Trust & Verification</Text>
          <View style={styles.trustBadgesGrid}>
            <View style={styles.trustCard}>
              <View style={styles.googleIconBadge}>
                <Text style={styles.googleIconG}>G</Text>
              </View>
              <Text style={styles.trustCardTitle}>Google Reviews</Text>
              <Text style={styles.trustCardVal}>
                4.9 <Star className="w-3 h-3 text-amber-500 fill-amber-500 inline" />
              </Text>
            </View>

            <View style={styles.trustCard}>
              <Instagram className="w-5 h-5 text-[#E1306C] mb-1" />
              <Text style={styles.trustCardTitle}>Instagram</Text>
              <Text style={styles.trustCardVal} numberOfLines={1}>
                @{caterer.name.replace(/\s+/g, '').toLowerCase()}
              </Text>
            </View>

            <View style={styles.trustCard}>
              <Award className="w-5 h-5 text-[#D97706] mb-1" />
              <Text style={styles.trustCardTitle}>TOT Awards</Text>
              <Text style={styles.trustCardVal}>Top Caterer 2026</Text>
            </View>

            <View style={styles.trustCard}>
              <ShieldCheck className="w-5 h-5 text-[#10B981] mb-1" />
              <Text style={styles.trustCardTitle}>TOT Certified</Text>
              <Text style={styles.trustCardVal}>Verified Vendor</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* FIXED BOTTOM ACTION BAR */}
      <View style={styles.fixedBottomBar}>
        <div className="w-full max-w-4xl mx-auto flex items-center justify-between gap-2.5 px-3 sm:px-6">
          <TouchableOpacity style={styles.whatsappBtn} onPress={handleWhatsApp} activeOpacity={0.8}>
            <MessageCircle className="w-4 h-4 text-[#15803D] mr-1.5" />
            <Text style={styles.whatsappBtnText}>WhatsApp</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.callNowBtn} onPress={handleCall} activeOpacity={0.8}>
            <Phone className="w-4 h-4 text-[#2A2425] mr-1.5" />
            <Text style={styles.callNowBtnText}>Call Now</Text>
          </TouchableOpacity>

          {quoteStatus === 'initial' && (
            <TouchableOpacity
              style={styles.sendQuoteBtn}
              onPress={() => setShowQuoteModal(true)}
              activeOpacity={0.85}
            >
              <Send className="w-4 h-4 text-white mr-1.5" />
              <Text style={styles.sendQuoteBtnText}>Request Quote</Text>
            </TouchableOpacity>
          )}

          {quoteStatus === 'requested' && (
            <TouchableOpacity
              style={[styles.sendQuoteBtn, { backgroundColor: '#F59E0B' }]}
              disabled
              activeOpacity={1}
            >
              <Clock className="w-4 h-4 text-white mr-1.5" />
              <Text style={styles.sendQuoteBtnText}>Pending Response</Text>
            </TouchableOpacity>
          )}

          {quoteStatus === 'response_ready' && (
            <TouchableOpacity
              style={[styles.sendQuoteBtn, { backgroundColor: '#10B981' }]}
              onPress={() => setShowQuotationScreen(true)}
              activeOpacity={0.85}
            >
              <FileText className="w-4 h-4 text-white mr-1.5" />
              <Text style={styles.sendQuoteBtnText}>View Quote</Text>
            </TouchableOpacity>
          )}

          {(quoteStatus === 'confirmed' || quoteStatus === 'partially_paid' || quoteStatus === 'fully_paid') && (
            <TouchableOpacity
              style={[styles.sendQuoteBtn, { backgroundColor: '#581420' }]}
              onPress={() => setShowInvoiceModal(true)}
              activeOpacity={0.85}
            >
              <FileText className="w-4 h-4 text-white mr-1.5" />
              <Text style={styles.sendQuoteBtnText}>View Invoice</Text>
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
        title={caterer.name}
        category="Catering"
      />

      {/* REQUEST QUOTE BOTTOM-SHEET POPUP */}
      <RequestQuoteModal
        visible={showQuoteModal}
        vendorId={caterer.id}
        vendorName={caterer.name}
        vendorLocation={caterer.location}
        category="catering"
        startingPrice={caterer.startingPrice}
        onQuoteSent={handleQuoteRequestSent}
        onClose={() => setShowQuoteModal(false)}
      />

      {/* QUOTATION SCREEN */}
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
        packageName="Royal Wedding Grand Sadhya & Live Counters"
        includedServices={[
          'Traditional Banana Leaf Service & Royal Chafing Buffet',
          'Live Dosa, Crispy Appam & Sizzling Tandoor Stations',
          'Artisanal Sweets (Hot Gulab Jamun & Rasgulla)',
          'Filter Coffee & Fresh Welcome Drinks Lounge',
          'Full Uniformed Table Staff & Cleaning Crew',
        ]}
        onNavigateToQuotesTab={() => {
          setShowQuotationScreen(false);
          setShowInvoiceModal(true);
        }}
        onBack={() => setShowQuotationScreen(false)}
        onShowToast={(msg) => setToastMessage(msg)}
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
        startingPrice={caterer.startingPrice || '₹450 / Plate'}
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
  quickInfoRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  quickChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EFE7DE',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
  },
  quickChipText: {
    fontSize: 11,
    color: '#524345',
    fontWeight: '500',
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
    borderColor: '#EFE7DE',
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
  reviewDate: {
    fontSize: 10,
    color: '#9CA3AF',
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
    boxShadow: '0 -4px 20px rgba(0,0,0,0.06)',
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
    boxShadow: '0 4px 12px rgba(88, 20, 32, 0.25)',
  },
  sendQuoteBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
