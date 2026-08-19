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
  TextInput,
} from 'react-native';
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
  Clock,
  Send,
  Eye,
  Camera,
  LayoutGrid,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MakeupStudio } from './MakeupListingPage';
import { RequestQuoteModal } from './RequestQuoteModal';
import { QuotationScreen } from './QuotationScreen';
import { WeddingInvoicePaymentModal } from './WeddingInvoicePaymentModal';
import { DraggablePhotoGalleryModal } from './DraggablePhotoGalleryModal';
import { LuxuryToast } from './LuxuryToast';
import { saveOrUpdateQuote } from '../utils/quotesManager';
import {
  getWeddingBookingByVendorId,
  saveOrUpdateWeddingBooking,
} from '../utils/weddingPaymentsManager';

interface MakeupDetailPageProps {
  studio: MakeupStudio;
  onBack: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  onNavigateToQuotesTab?: () => void;
  bookingSource?: 'entire_wedding' | 'individual';
  onNavigateToMyWeddingPayments?: () => void;
  onNavigateToProfileMyBookings?: () => void;
}

export const MakeupDetailPage: React.FC<MakeupDetailPageProps> = ({
  studio,
  onBack,
  isBookmarked,
  onToggleBookmark,
  onNavigateToQuotesTab,
  bookingSource = 'entire_wedding',
  onNavigateToMyWeddingPayments,
  onNavigateToProfileMyBookings,
}) => {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryInitialIndex, setGalleryInitialIndex] = useState(0);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
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
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showNegotiateView, setShowNegotiateView] = useState(false);
  const [negotiatePrice, setNegotiatePrice] = useState('');
  const [negotiateMessage, setNegotiateMessage] = useState('');

  // Default initial mock quote values
  const [mockQuoteDetails, setMockQuoteDetails] = useState(() => {
    const basePrice = parseInt(studio.startingPrice.replace(/[^0-9]/g, ''), 10) || 35000;
    const advance = Math.round(basePrice * 0.3);
    const remaining = basePrice - advance;
    return {
      packageName: 'Signature HD Bridal Makeup & Saree Draping',
      totalAmount: basePrice,
      advanceAmount: advance,
      remainingAmount: remaining,
      weddingDate: '15 December 2026',
      location: studio.location || 'Chennai, Tamil Nadu',
      includedServices: [
        'Bridal HD / Airbrush Makeup',
        'Hair Styling & Fresh Floral Styling',
        'Saree Draping & Dupatta Setting',
        'Lashes, Lenses & High-End Cosmetic Brands',
        'Trial Session Included in Signature Package',
      ],
    };
  });

  const handleQuoteRequestSent = () => {
    setShowQuoteModal(false);
    updateQuoteStatus('requested');
    saveOrUpdateQuote({
      id: `quote-${studio.id}`,
      vendorId: studio.id,
      vendorName: studio.name,
      category: 'Makeup',
      packageName: mockQuoteDetails.packageName,
      status: 'requested',
      paymentStatus: 'pending',
      totalAmount: mockQuoteDetails.totalAmount,
      advanceAmount: mockQuoteDetails.advanceAmount,
      remainingAmount: mockQuoteDetails.remainingAmount,
      weddingDate: mockQuoteDetails.weddingDate,
      location: studio.location || 'Chennai, TN',
      includedServices: mockQuoteDetails.includedServices,
      image: studio.image,
    });
    setToastMessage('Quote Request Sent! Added to My Quotes');
    setTimeout(() => setToastMessage(null), 3000);

    // Simulate vendor response after 3 seconds
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

  const handleConfirmQuote = () => {
    updateQuoteStatus('confirmed');
    
    // Save to global tot_confirmed_quotes in localStorage
    const newQuote = {
      id: `quote-${studio.id}`,
      vendorName: studio.name,
      category: 'Makeup',
      packageName: mockQuoteDetails.packageName,
      status: 'confirmed',
      paymentStatus: 'pending',
      totalAmount: mockQuoteDetails.totalAmount,
      advanceAmount: mockQuoteDetails.advanceAmount,
      remainingAmount: mockQuoteDetails.remainingAmount,
      weddingDate: mockQuoteDetails.weddingDate,
      location: mockQuoteDetails.location,
      includedServices: mockQuoteDetails.includedServices,
      image: studio.image,
      invoiceNo: `TOT-INV-2026-00${Math.floor(Math.random() * 900) + 100}`,
      invoiceDate: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
    };

    try {
      const saved = localStorage.getItem('tot_confirmed_quotes');
      const list = saved ? JSON.parse(saved) : [];
      const filtered = list.filter((q: any) => q.id !== newQuote.id);
      filtered.push(newQuote);
      localStorage.setItem('tot_confirmed_quotes', JSON.stringify(filtered));
    } catch (e) {
      console.warn(e);
    }

    setShowQuotationScreen(false);
    setShowInvoiceModal(true);
    setToastMessage('✓ Quote Confirmed! View Invoice & Pay');
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handlePaymentSuccess = (paymentType: 'advance' | 'full') => {
    if (paymentType === 'advance') {
      updateQuoteStatus('partially_paid');
      setToastMessage('Advance Paid (Partially Paid)!');
    } else {
      updateQuoteStatus('fully_paid');
      setToastMessage('Payment Successful (Fully Paid)!');
    }
    setShowPaymentModal(false);
    setShowQuotationScreen(false);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleRejectQuote = () => {
    updateQuoteStatus('rejected');
    setShowQuotationScreen(false);
    setToastMessage('Quotation Rejected.');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSendNegotiate = () => {
    if (!negotiatePrice.trim()) {
      setToastMessage('Please enter proposed price.');
      setTimeout(() => setToastMessage(null), 2500);
      return;
    }

    const parsedPrice = parseInt(negotiatePrice.replace(/[^0-9]/g, ''), 10);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      setToastMessage('Please enter a valid price.');
      setTimeout(() => setToastMessage(null), 2500);
      return;
    }

    setShowNegotiateView(false);
    setShowQuotationScreen(false);
    updateQuoteStatus('negotiating');
    setToastMessage('Counter-offer sent successfully!');
    setTimeout(() => setToastMessage(null), 3000);

    // Simulate vendor response after 3.5 seconds
    setTimeout(() => {
      let finalPrice = parsedPrice;
      const basePrice = parseInt(studio.startingPrice.replace(/[^0-9]/g, ''), 10) || 35000;
      const floorLimit = Math.round(basePrice * 0.85);

      if (parsedPrice < floorLimit) {
        finalPrice = floorLimit;
      }

      const newAdvance = Math.round(finalPrice * 0.3);
      const newRemaining = finalPrice - newAdvance;

      setMockQuoteDetails((prev) => ({
        ...prev,
        totalAmount: finalPrice,
        advanceAmount: newAdvance,
        remainingAmount: newRemaining,
      }));

      updateQuoteStatus('response_ready');
      setToastMessage(`Vendor replied with counter quote: ₹${finalPrice.toLocaleString('en-IN')}!`);
      setTimeout(() => setToastMessage(null), 4500);
    }, 3500);
  };

  const fallbackMakeup = [
    'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1503236823255-94609f598e71?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=1200&q=85',
  ];
  
  const portfolioImages = [
    ...(studio.portfolio || [studio.image]),
    ...fallbackMakeup
  ].slice(0, 5);

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
    const phoneNumber = studio.phone ? studio.phone.replace(/[^0-9+]/g, '') : '+919150197966';
    Linking.openURL(`tel:${phoneNumber}`).catch(() => {
      setToastMessage(`Call ${studio.phone || '+91 91501 97966'}`);
      setTimeout(() => setToastMessage(null), 3000);
    });
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(`Hi ${studio.name}, I found your profile and would like to check availability.`);
    Linking.openURL(`https://wa.me/919150197966?text=${text}`).catch(() => {
      setToastMessage('Opening WhatsApp...');
      setTimeout(() => setToastMessage(null), 2000);
    });
  };

  return (
    <View style={styles.container}>
      <LuxuryToast message={toastMessage} />

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
                  src={portfolioImages[1] || portfolioImages[0]}
                  alt={`${studio.name} 2`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Eye className="w-7 h-7 text-white drop-shadow-lg" />
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
                  alt={`${studio.name} 3`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Eye className="w-7 h-7 text-white drop-shadow-lg" />
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
                  alt={`${studio.name} 4`}
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
                src={studio.image}
                alt={studio.name}
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
              <Text style={styles.mediaTabActive}>Photos ({portfolioImages.length})</Text>
              <View style={styles.mediaTabActiveIndicator} />
            </View>
            <Text style={styles.mediaTabInactive}>Videos</Text>
          </View>
          <View style={styles.mediaTabsLine} />

          {/* PHOTO GRID */}
          <View style={styles.photoGrid}>
            <TouchableOpacity style={styles.photoGridItem} onPress={() => { setGalleryInitialIndex(0); setIsGalleryOpen(true); }}>
              <Image source={{ uri: portfolioImages[0] }} style={styles.photoImg} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.photoGridItem} onPress={() => { setGalleryInitialIndex(1); setIsGalleryOpen(true); }}>
              <Image source={{ uri: portfolioImages[1] }} style={styles.photoImg} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.photoGridItem} onPress={() => { setGalleryInitialIndex(2); setIsGalleryOpen(true); }}>
              <Image source={{ uri: portfolioImages[2] }} style={styles.photoImg} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.photoGridItem} onPress={() => { setGalleryInitialIndex(3); setIsGalleryOpen(true); }}>
              <Image source={{ uri: portfolioImages[3] }} style={styles.photoImg} />
              {portfolioImages.length > 4 && (
                <View style={styles.morePhotosOverlay}>
                  <Text style={styles.morePhotosText}>+{portfolioImages.length - 4}</Text>
                  <Text style={styles.morePhotosSubtext}>More Photos</Text>
                </View>
              )}
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
      {/* STICKY BOTTOM ACTION BAR */}
      <View style={styles.bottomBarNew}>
        <div className="w-full max-w-4xl mx-auto flex items-center justify-between gap-2.5 px-3 sm:px-6">
          <TouchableOpacity style={styles.btnWhatsapp} onPress={handleWhatsApp} activeOpacity={0.8}>
            <MessageCircle size={14} color="#10B981" style={{ marginRight: 4 }} />
            <Text style={styles.btnWhatsappText}>WhatsApp</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.btnCall} onPress={handleCallPhone} activeOpacity={0.8}>
            <Phone size={14} color="#4B5563" style={{ marginRight: 4 }} />
            <Text style={styles.btnCallText}>Call Now</Text>
          </TouchableOpacity>
          
          {quoteStatus === 'initial' && (
            <TouchableOpacity style={styles.btnQuote} onPress={() => setShowQuoteModal(true)} activeOpacity={0.85}>
              <Text style={styles.btnQuoteText}>Request Quote</Text>
            </TouchableOpacity>
          )}

          {quoteStatus === 'requested' && (
            <TouchableOpacity style={[styles.btnQuote, { backgroundColor: '#F59E0B' }]} disabled activeOpacity={1}>
              <Text style={[styles.btnQuoteText, { color: '#FFFFFF' }]}>Pending Response</Text>
            </TouchableOpacity>
          )}

          {quoteStatus === 'negotiating' && (
            <TouchableOpacity style={[styles.btnQuote, { backgroundColor: '#F59E0B' }]} disabled activeOpacity={1}>
              <Text style={[styles.btnQuoteText, { color: '#FFFFFF' }]}>Negotiating Price...</Text>
            </TouchableOpacity>
          )}

          {quoteStatus === 'rejected' && (
            <TouchableOpacity style={[styles.btnQuote, { backgroundColor: '#DC2626' }]} onPress={() => updateQuoteStatus('initial')} activeOpacity={0.85}>
              <Text style={[styles.btnQuoteText, { color: '#FFFFFF' }]}>Quote Rejected (Reset)</Text>
            </TouchableOpacity>
          )}

          {quoteStatus === 'response_ready' && (
            <TouchableOpacity
              style={[styles.btnQuote, { backgroundColor: '#10B981' }]}
              onPress={() => setShowQuotationScreen(true)}
              activeOpacity={0.85}
            >
              <Text style={[styles.btnQuoteText, { color: '#FFFFFF' }]}>View Quote</Text>
            </TouchableOpacity>
          )}

          {(quoteStatus === 'confirmed' || quoteStatus === 'partially_paid' || quoteStatus === 'fully_paid') && (
            <TouchableOpacity
              style={[styles.btnQuote, { backgroundColor: '#15803D' }]}
              onPress={() => setShowInvoiceModal(true)}
              activeOpacity={0.85}
            >
              <Text style={[styles.btnQuoteText, { color: '#FFFFFF' }]}>
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
        title={studio.name}
        category="Bridal Makeup"
      />

      {/* REQUEST QUOTE MODAL */}
      <RequestQuoteModal
        visible={showQuoteModal}
        vendorId={studio.id}
        onClose={() => setShowQuoteModal(false)}
        studioName={studio.name}
        startingPrice={studio.startingPrice}
        location={studio.location}
        category="makeup"
        onQuoteSent={handleQuoteRequestSent}
      />

      {/* QUOTATION SCREEN */}
      <QuotationScreen
        visible={showQuotationScreen}
        onClose={() => setShowQuotationScreen(false)}
        quoteStatus={quoteStatus}
        setQuoteStatus={setQuoteStatus}
        vendorId={studio.id}
        vendorName={studio.name}
        vendorImage={studio.image}
        vendorLocation={studio.location}
        startingPrice={studio.startingPrice}
        category="Makeup"
        packageName="Signature HD Bridal Makeup & Saree Draping"
        includedServices={[
          'Bridal HD / Airbrush Makeup',
          'Hair Styling & Fresh Floral Styling',
          'Luxury Saree Draping & Pleating',
          'Engagement / Reception Glam Session',
          'Pre-Bridal Skin Glow Trial',
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
        vendorId={studio.id}
        vendorName={studio.name}
        vendorImage={studio.image}
        vendorLocation={studio.location}
        category="Makeup"
        startingPrice={studio.startingPrice || '₹35,000'}
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
    position: 'relative',
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
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
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
  modalFullContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FAF7F2',
    zIndex: 100,
  },
  modalHeaderNav: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E2D9',
    backgroundColor: '#FAF7F2',
  },
  modalCloseBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    backgroundColor: '#EAE4DC',
  },
  modalHeaderTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2A2425',
    fontFamily: "'Cormorant Garamond', Georgia, serif",
  },
  quoteCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E8E2D9',
    marginBottom: 16,
  },
  quoteVendorThumb: {
    width: 54,
    height: 54,
    borderRadius: 12,
  },
  quoteVendorName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2A2425',
  },
  quotePackageName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#581420',
    marginTop: 2,
  },
  quoteBadgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FDF8F3',
    borderWidth: 1,
    borderColor: '#F3E5AB',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 16,
  },
  quoteBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#8B1E2F',
  },
  quoteSectionBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E8E2D9',
    marginBottom: 16,
  },
  quoteSectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2A2425',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    paddingBottom: 6,
  },
  quoteRowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  quoteRowLabel: {
    fontSize: 13,
    color: '#6B7280',
    width: 100,
  },
  quoteRowValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1F2937',
  },
  serviceCheckRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  serviceCheckText: {
    fontSize: 13,
    color: '#374151',
    fontWeight: '500',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  priceLabel: {
    fontSize: 13,
    color: '#4B5563',
  },
  priceValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1F2937',
  },
  quoteModalBottomBar: {
    padding: 16,
    backgroundColor: '#FAF7F2',
    borderTopWidth: 1,
    borderTopColor: '#E8E2D9',
  },
  confirmQuoteBtn: {
    backgroundColor: '#581420',
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmQuoteBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  paymentOptionCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E8E2D9',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  paymentOptionCardSelected: {
    borderColor: '#581420',
    backgroundColor: '#FDF8F3',
  },
  paymentOptionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2A2425',
  },
  paymentOptionAmount: {
    fontSize: 16,
    fontWeight: '800',
    color: '#581420',
  },
  paymentOptionDesc: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 6,
  },
  mockPayNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCFCE7',
    padding: 12,
    borderRadius: 12,
    marginTop: 16,
  },
  rejectQuoteBtn: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1.5,
    borderColor: '#EF4444',
  },
  rejectQuoteBtnText: {
    color: '#EF4444',
  },
  negotiateQuoteBtn: {
    backgroundColor: '#FFFBEB',
    borderWidth: 1.5,
    borderColor: '#D97706',
  },
  negotiateQuoteBtnText: {
    color: '#D97706',
  },
  negotiateOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    zIndex: 200,
  },
  negotiateCard: {
    backgroundColor: '#FAF7F2',
    borderRadius: 20,
    width: '90%',
    maxWidth: 450,
    padding: 20,
    maxHeight: '80%',
    borderWidth: 1,
    borderColor: '#E8E2D9',
  },
  negotiateCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  negotiateCardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#581420',
    fontFamily: "'Cormorant Garamond', Georgia, serif",
  },
  negotiateCloseBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#EAE4DC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  negotiateNotice: {
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 16,
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
  },
  inputGroup: {
    gap: 6,
  },
  inputLabel: {
    fontSize: 12.5,
    fontWeight: '600',
    color: '#2A2425',
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
  },
  negotiateTextInput: {
    borderWidth: 1,
    borderColor: '#E8E2D9',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 42,
    fontSize: 13,
    color: '#2A2425',
    backgroundColor: '#FFFFFF',
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
  },
  sendNegotiationBtn: {
    backgroundColor: '#581420',
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  sendNegotiationBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
  },
});



