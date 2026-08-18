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
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { QuotationScreen } from './QuotationScreen';
import { CarItem } from '../constants/CarsData';
import { RequestQuoteModal } from './RequestQuoteModal';
import { WeddingInvoicePaymentModal } from './WeddingInvoicePaymentModal';
import { DraggablePhotoGalleryModal } from './DraggablePhotoGalleryModal';
import { saveOrUpdateQuote } from '../utils/quotesManager';
import {
  getWeddingBookingByVendorId,
  saveOrUpdateWeddingBooking,
} from '../utils/weddingPaymentsManager';

interface CarsDetailPageProps {
  onNavigateToQuotesTab?: () => void;
  car: CarItem;
  onBack: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  bookingSource?: 'entire_wedding' | 'individual';
  onNavigateToMyWeddingPayments?: () => void;
  onNavigateToProfileMyBookings?: () => void;
}

export const CarsDetailPage: React.FC<CarsDetailPageProps> = ({
  onNavigateToQuotesTab,
  car,
  onBack,
  isBookmarked,
  onToggleBookmark,
  bookingSource = 'entire_wedding',
  onNavigateToMyWeddingPayments,
  onNavigateToProfileMyBookings,
}) => {
  const [activeMediaTab, setActiveMediaTab] = useState<'photos' | 'videos'>('photos');
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
        const match = quotes.find((q: any) => q.id === `quote-${car.id}`);
        if (match) {
          if (match.paymentStatus === 'fully_paid') return 'fully_paid';
          if (match.paymentStatus === 'partially_paid') return 'partially_paid';
          if (match.status === 'confirmed') return 'confirmed';
        }
      }
    } catch (e) {
      console.error(e);
    }
    const existing = getWeddingBookingByVendorId(car.id);
    if (existing) return existing.status;
    return 'initial';
  });

  useEffect(() => {
    const handleUpdate = () => {
      const existing = getWeddingBookingByVendorId(car.id);
      if (existing) setQuoteStatus(existing.status);
    };
    window.addEventListener('tot_wedding_payments_updated', handleUpdate);
    return () => window.removeEventListener('tot_wedding_payments_updated', handleUpdate);
  }, [car.id]);

  const updateQuoteStatus = (newStatus: 'initial' | 'requested' | 'response_ready' | 'confirmed' | 'partially_paid' | 'fully_paid' | 'rejected' | 'negotiating') => {
    setQuoteStatus(newStatus);
    const basePrice = parseInt((car.startingPrice || '₹25,000').replace(/[^0-9]/g, ''), 10) || 25000;
    saveOrUpdateWeddingBooking({
      vendorId: car.id,
      vendorName: car.name,
      category: 'Cars',
      serviceType: 'Luxury & Vintage Wedding Cars',
      image: car.image,
      location: car.location || 'Chennai, Tamil Nadu',
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


  // Quote form state
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [eventDate, setEventDate] = useState('15 December 2026');
  const [eventLocation, setEventLocation] = useState(car.location || 'Chennai, Tamil Nadu');
  const [eventType, setEventType] = useState<'Wedding' | 'Reception' | 'Engagement' | 'Other'>('Wedding');
  const [carsType, setCarsType] = useState('Wedding Cars');
  const [showPhotoTypeDropdown, setShowPhotoTypeDropdown] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Helper to get car initials for logo
  const getInitials = (name: string) => {
    const words = name.replace(/cars/gi, '').trim().split(' ');
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return name.slice(0, 3).toUpperCase();
  };

  // Curated 24 luxury & vintage wedding car photos
  const photoGallery = [
    car.image,
    'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1514316454349-750a7fd3da3a?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1609151162377-794fa68b02f1?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1546804784-896d0dca3805?auto=format&fit=crop&w=1200&q=85',
  ];

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Car link copied to clipboard!');
    } else {
      showToast('Sharing car details...');
    }
  };

  const handleWhatsApp = () => {
    const msg = encodeURIComponent(
      `Hi ${car.name}, I found your car on the app. I would like to inquire about wedding cars packages in ${car.location}.`
    );
    window.open(`https://wa.me/919150197966?text=${msg}`, '_blank');
  };

  const handleCall = () => {
    window.open('tel:+919150197966');
  };

  const handleSendQuote = () => {
    setQuoteSuccess(true);
    setTimeout(() => {
      setShowQuoteModal(false);
      setQuoteSuccess(false);
      showToast('Quote request sent successfully!');
    }, 1800);
  };

  return (
    <View style={styles.container}>
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={styles.toastContainer}
          >
            <Text style={styles.toastText}>{toastMessage}</Text>
          </motion.div>
        )}
      </AnimatePresence>

      <ScrollView
        style={{ flex: 1, overflowY: 'auto' } as any}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 90 }}
      >
        {/* HERO COVER IMAGE & NAVIGATION BUTTONS */}
        <View style={styles.heroContainer}>
          <Image source={{ uri: car.image }} style={styles.heroImage} resizeMode="cover" />

          {/* Top Overlaid Action Bar */}
          <View style={styles.topOverlayBar}>
            <TouchableOpacity style={styles.overlayCircleBtnDark} onPress={onBack} activeOpacity={0.8}>
              <ChevronLeft className="w-6 h-6 text-white" />
            </TouchableOpacity>

            <View style={styles.topOverlayRightGroup}>
              <TouchableOpacity
                style={styles.overlayCircleBtnLight}
                onPress={() => onToggleBookmark(car.id)}
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
          </View>
        </View>

        {/* OVERLAPPING MAIN STUDIO INFO CARD */}
        <View style={styles.mainContentCard}>
          {/* Logo Badge + Header Row */}
          <View style={styles.carHeaderRow}>
            <View style={styles.logoBox}>
              <Camera className="w-6 h-6 text-[#E5A93C] mb-0.5" />
              <Text style={styles.logoInitials}>{getInitials(car.name)}</Text>
            </View>

            <View style={styles.headerInfoCol}>
              <Text style={styles.carTitle}>{car.name}</Text>

              {/* TOT CERTIFIED Gold Tag */}
              <View style={styles.certifiedBadge}>
                <ShieldCheck className="w-3.5 h-3.5 text-[#B45309] mr-1" />
                <Text style={styles.certifiedBadgeText}>TOT CERTIFIED</Text>
              </View>

              <Text style={styles.subtitleText}>
                {car.category} • <Text style={styles.tierHighlight}>{car.tier}</Text> • {car.location}
              </Text>

              {/* Rating Row */}
              <View style={styles.ratingRow}>
                <Star className="w-4 h-4 text-[#E5A93C] fill-[#E5A93C] mr-1" />
                <Text style={styles.ratingBold}>{car.rating}</Text>
                <Text style={styles.reviewsCountText}> ({car.reviewsCount} Reviews)</Text>
              </View>
            </View>
          </View>

          {/* 4 KEY METRICS STATS BAR */}
          <View style={styles.metricsBar}>
            <View style={styles.metricItem}>
              <Calendar className="w-4 h-4 text-[#8B1E2F] mb-1" />
              <Text style={styles.metricVal}>{car.experience || '8+ Years'}</Text>
              <Text style={styles.metricLbl}>Exp.</Text>
            </View>
            <View style={styles.metricDivider} />

            <View style={styles.metricItem}>
              <Users className="w-4 h-4 text-[#8B1E2F] mb-1" />
              <Text style={styles.metricVal}>150+</Text>
              <Text style={styles.metricLbl}>Weddings</Text>
            </View>
            <View style={styles.metricDivider} />

            <View style={styles.metricItem}>
              <Camera className="w-4 h-4 text-[#8B1E2F] mb-1" />
              <Text style={styles.metricVal}>2000+</Text>
              <Text style={styles.metricLbl}>Shoots Done</Text>
            </View>
            <View style={styles.metricDivider} />

            <View style={styles.metricItem}>
              <CheckCircle2 className="w-4 h-4 text-[#16A34A] mb-1" />
              <Text style={[styles.metricVal, { color: '#16A34A' }]}>Available</Text>
              <Text style={styles.metricLbl}>Live Calendar</Text>
            </View>
          </View>

          {/* ABOUT SECTION */}
          <View style={styles.sectionBlock}>
            <Text style={styles.sectionTitle}>About {car.name}</Text>
            <Text style={styles.aboutText} numberOfLines={isReadMore ? undefined : 3}>
              {car.description ||
                `${car.name} is a team of passionate storytellers capturing real emotions and timeless wedding moments in ${car.location}. Specializing in candid, traditional, cinematic and pre-wedding cars with modern lighting and high-resolution camera gear.`}
            </Text>
            <TouchableOpacity onPress={() => setIsReadMore(!isReadMore)} style={styles.readMoreBtn}>
              <Text style={styles.readMoreText}>{isReadMore ? 'Read Less ▲' : 'Read More ▼'}</Text>
            </TouchableOpacity>
          </View>

          {/* PHOTOS / VIDEOS GALLERY TAB */}
          <View style={styles.sectionBlock}>
            <View style={styles.tabHeaderRow}>
              <TouchableOpacity
                style={[styles.galleryTab, activeMediaTab === 'photos' && styles.galleryTabActive]}
                onPress={() => setActiveMediaTab('photos')}
              >
                <Text style={[styles.galleryTabText, activeMediaTab === 'photos' && styles.galleryTabTextActive]}>
                  Photos (24)
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.galleryTab, activeMediaTab === 'videos' && styles.galleryTabActive]}
                onPress={() => setActiveMediaTab('videos')}
              >
                <Text style={[styles.galleryTabText, activeMediaTab === 'videos' && styles.galleryTabTextActive]}>
                  Videos
                </Text>
              </TouchableOpacity>
            </View>

            {/* 2x2 Image Grid */}
            {activeMediaTab === 'photos' ? (
              <View style={styles.photoGrid}>
                {photoGallery.slice(0, 3).map((imgUrl, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.gridPhotoWrapper}
                    onPress={() => {
                      setGalleryInitialIndex(index);
                      setIsGalleryOpen(true);
                    }}
                    activeOpacity={0.9}
                  >
                    <Image source={{ uri: imgUrl }} style={styles.gridPhoto} resizeMode="cover" />
                  </TouchableOpacity>
                ))}

                {/* 4th slot with "+20 More Photos" overlay */}
                <TouchableOpacity
                  style={styles.gridPhotoWrapper}
                  onPress={() => {
                    setGalleryInitialIndex(3);
                    setIsGalleryOpen(true);
                  }}
                  activeOpacity={0.9}
                >
                  <Image source={{ uri: photoGallery[3] || car.image }} style={styles.gridPhoto} resizeMode="cover" />
                  <View style={styles.morePhotosOverlay}>
                    <Text style={styles.morePhotosText}>+20</Text>
                    <Text style={styles.morePhotosSubtext}>More Photos</Text>
                  </View>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.videoPlaceholderBox}>
                <Video className="w-8 h-8 text-[#8B1E2F] mb-2" />
                <Text style={styles.videoBoxTitle}>4K Cinematic Teaser Reel Available</Text>
                <Text style={styles.videoBoxSub}>Contact car to view high resolution 4K wedding films.</Text>
              </View>
            )}

            {/* Quick Info Badges Row */}
            <View style={styles.quickInfoRow}>
              <View style={styles.quickChip}>
                <MapPin className="w-3.5 h-3.5 text-[#8C7A7C] mr-1" />
                <Text style={styles.quickChipText}>{car.location}, Tamil Nadu</Text>
              </View>

              <View style={styles.quickChip}>
                <Users className="w-3.5 h-3.5 text-[#8C7A7C] mr-1" />
                <Text style={styles.quickChipText}>100 - 5000+ Guests</Text>
              </View>

              <View style={styles.quickChip}>
                <Camera className="w-3.5 h-3.5 text-[#8C7A7C] mr-1" />
                <Text style={styles.quickChipText}>Candid & Traditional</Text>
              </View>

              <View style={styles.quickChip}>
                <Building2 className="w-3.5 h-3.5 text-[#8C7A7C] mr-1" />
                <Text style={styles.quickChipText}>Indoor & Outdoor</Text>
              </View>
            </View>
          </View>

          {/* TRUST & VERIFICATION BADGES GRID (4 CARDS) */}
          <View style={styles.trustBadgesGrid}>
            <View style={styles.trustCard}>
              <View style={styles.googleIconBadge}>
                <Text style={styles.googleIconG}>G</Text>
              </View>
              <Text style={styles.trustCardTitle}>Google Reviews</Text>
              <Text style={styles.trustCardVal}>{car.rating} ★</Text>
            </View>

            <View style={styles.trustCard}>
              <Instagram className="w-5 h-5 text-[#E1306C] mb-1" />
              <Text style={styles.trustCardTitle}>Instagram</Text>
              <Text style={styles.trustCardVal} numberOfLines={1}>
                @{car.name.toLowerCase().replace(/[^a-z0-9]/g, '')}
              </Text>
            </View>

            <View style={styles.trustCard}>
              <Trophy className="w-5 h-5 text-[#D97706] mb-1" />
              <Text style={styles.trustCardTitle}>Awards</Text>
              <Text style={styles.trustCardVal}>15 Awards</Text>
            </View>

            <View style={styles.trustCard}>
              <ShieldCheck className="w-5 h-5 text-[#16A34A] mb-1" />
              <Text style={styles.trustCardTitle}>TOT Certified</Text>
              <Text style={styles.trustCardVal}>Verified Vendor</Text>
            </View>
          </View>

          {/* GOOGLE REVIEWS SECTION */}
          <View style={styles.sectionBlock}>
            <View style={styles.reviewHeaderRow}>
              <Text style={styles.sectionTitle}>Google Reviews</Text>
              <TouchableOpacity onPress={() => showToast('Displaying all 320 Google Reviews')}>
                <Text style={styles.viewAllText}>View All</Text>
              </TouchableOpacity>
            </View>

            {/* Single Featured Google Review Card */}
            <View style={styles.reviewCard}>
              <View style={styles.reviewUserRow}>
                <View style={styles.reviewAvatar}>
                  <Text style={styles.reviewAvatarText}>R</Text>
                </View>

                <View style={styles.reviewUserCol}>
                  <Text style={styles.reviewName}>Ritika Sharma</Text>
                  <Text style={styles.reviewDate}>2 days ago</Text>
                </View>

                <View style={styles.reviewStarsRow}>
                  <Text style={styles.reviewStarScore}>5.0</Text>
                  <View style={{ flexDirection: 'row' }}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-3.5 h-3.5 text-[#E5A93C] fill-[#E5A93C]" />
                    ))}
                  </View>
                </View>
              </View>

              <Text style={styles.reviewComment}>
                Amazing experience! The team was professional, creative and very cooperative. We got the best memories of our big day.
              </Text>

              <View style={styles.reviewGoogleFooter}>
                <Text style={styles.googleGLogo}>G</Text>
              </View>
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
            <TouchableOpacity style={[styles.sendQuoteBtn, { backgroundColor: '#F59E0B' }]} disabled activeOpacity={1}>
              <Text style={styles.sendQuoteBtnText}>Pending Response</Text>
            </TouchableOpacity>
          )}

          {quoteStatus === 'negotiating' && (
            <TouchableOpacity style={[styles.sendQuoteBtn, { backgroundColor: '#F59E0B' }]} disabled activeOpacity={1}>
              <Text style={styles.sendQuoteBtnText}>Negotiating...</Text>
            </TouchableOpacity>
          )}

          {quoteStatus === 'rejected' && (
            <TouchableOpacity style={[styles.sendQuoteBtn, { backgroundColor: '#DC2626' }]} onPress={() => updateQuoteStatus('initial')} activeOpacity={0.85}>
              <Text style={styles.sendQuoteBtnText}>Rejected (Reset)</Text>
            </TouchableOpacity>
          )}

          {quoteStatus === 'response_ready' && (
            <TouchableOpacity style={[styles.sendQuoteBtn, { backgroundColor: '#10B981' }]} onPress={() => setShowQuotationScreen(true)} activeOpacity={0.85}>
              <Text style={styles.sendQuoteBtnText}>View Quote</Text>
            </TouchableOpacity>
          )}

          {(quoteStatus === 'confirmed' || quoteStatus === 'partially_paid' || quoteStatus === 'fully_paid') && (
            <TouchableOpacity
              style={[styles.sendQuoteBtn, { backgroundColor: '#15803D' }]}
              onPress={() => setShowInvoiceModal(true)}
              activeOpacity={0.85}
            >
              <Text style={styles.sendQuoteBtnText}>
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
        photos={photoGallery}
        initialIndex={galleryInitialIndex}
        title={car.name}
        category="Wedding Cars"
      />

      {/* REQUEST QUOTE BOTTOM-SHEET POPUP */}
      <RequestQuoteModal
        visible={showQuoteModal}
        vendorId={car.id}
        vendorName={car.name}
        vendorLocation={car.location}
        category="cars"
        onQuoteSent={handleQuoteRequestSent}
        onClose={() => setShowQuoteModal(false)}
      />

      <QuotationScreen
        visible={showQuotationScreen}
        onClose={() => setShowQuotationScreen(false)}
        quoteStatus={quoteStatus}
        setQuoteStatus={updateQuoteStatus}
        vendorId={car.id}
        vendorName={car.name}
        vendorImage={car.image}
        vendorLocation={car.location}
        startingPrice={car.startingPrice}
        category="Cars"
        packageName="Premium Chauffeur Driven Luxury Car Rental"
        includedServices={[
          'Luxury Wedding Car Rental (8 Hours)',
          'Professional Groomed Chauffeur',
          'Premium Floral Car Decoration',
          'Fuel Allowance within City Limits',
          'In-Car Refreshments & Mineral Water',
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
        vendorId={car.id}
        vendorName={car.name}
        vendorImage={car.image}
        vendorLocation={car.location}
        category="Cars"
        startingPrice={car.startingPrice || '₹40,000'}
        bookingSource={bookingSource}
        onNavigateToMyWeddingPayments={() => {
          setShowInvoiceModal(false);
          if (onNavigateToMyWeddingPayments) {
            onNavigateToMyWeddingPayments();
          } else {
            window.dispatchEvent(
              new CustomEvent('tot_switch_to_my_wedding_payments', { detail: { vendorId: car.id } })
            );
          }
        }}
        onNavigateToProfileMyBookings={() => {
          setShowInvoiceModal(false);
          if (onNavigateToProfileMyBookings) {
            onNavigateToProfileMyBookings();
          } else {
            window.dispatchEvent(
              new CustomEvent('tot_switch_to_profile_my_bookings', { detail: { vendorId: car.id } })
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
  heroContainer: {
    position: 'relative',
    height: 250,
    width: '100%',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  topOverlayBar: {
    position: 'absolute',
    top: 14,
    left: 14,
    right: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    marginTop: -28,
    backgroundColor: '#FAF7F2',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    width: '100%',
    maxWidth: 800,
    alignSelf: 'center',
paddingHorizontal: 16,
    paddingTop: 18,
  },
  carHeaderRow: {
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
  carTitle: {
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
  videoPlaceholderBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EFE7DE',
    marginBottom: 12,
  },
  videoBoxTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#2A2425',
  },
  videoBoxSub: {
    fontSize: 11,
    color: '#8C7A7C',
    textAlign: 'center',
    marginTop: 2,
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
  packagePillsScroll: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  pkgPill: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2D8CD',
    marginRight: 8,
  },
  pkgPillActive: {
    backgroundColor: '#581420',
    borderColor: '#581420',
  },
  pkgPillText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#524345',
  },
  pkgPillTextActive: {
    color: '#FFFFFF',
  },
  packageCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#EFE7DE',
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
  pkgTag: {
    fontSize: 11,
    fontWeight: '600',
    color: '#8B1E2F',
  },
  pkgPrice: {
    fontSize: 17,
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
  reviewHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  viewAllText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#8B1E2F',
  },
  reviewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#EFE7DE',
    position: 'relative',
  },
  reviewUserRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#581420',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  reviewAvatarText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  reviewUserCol: {
    flex: 1,
  },
  reviewName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#2A2425',
  },
  reviewDate: {
    fontSize: 10,
    color: '#8C7A7C',
  },
  reviewStarsRow: {
    alignItems: 'flex-end',
  },
  reviewStarScore: {
    fontSize: 12,
    fontWeight: '800',
    color: '#2A2425',
    marginBottom: 2,
  },
  reviewComment: {
    fontSize: 12,
    color: '#524345',
    lineHeight: 17,
  },
  reviewGoogleFooter: {
    position: 'absolute',
    bottom: 12,
    right: 12,
  },
  googleGLogo: {
    fontSize: 14,
    fontWeight: '900',
    color: '#4285F4',
  },
  fixedBottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderColor: '#EFE7DE',
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    zIndex: 40,
  },
  whatsappBtn: {
    flex: 1,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: '#15803D',
    backgroundColor: '#F0FDF4',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  whatsappBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#15803D',
  },
  callNowBtn: {
    flex: 1,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: '#E2D8CD',
    backgroundColor: '#FAF7F2',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  callNowBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2A2425',
  },
  sendQuoteBtn: {
    flex: 1.2,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#581420',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendQuoteBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  lightboxBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lightboxCloseBtn: {
    position: 'absolute',
    top: 30,
    right: 20,
    padding: 10,
  },
  lightboxImage: {
    width: '90%',
    height: '75%',
  },
  quoteBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  quoteModalSheet: {
    backgroundColor: '#FAF7F2',
    borderRadius: 20,
    width: '90%',
    maxWidth: 450,
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 24,
    position: 'relative',
    maxHeight: '90%',
  },
  quoteCloseBtn: {
    position: 'absolute',
    top: 14,
    right: 14,
    zIndex: 10,
    backgroundColor: '#EFE7DE',
    borderRadius: 16,
    padding: 6,
  },
  topCarCard: {
    backgroundColor: '#FAF2E8',
    borderWidth: 1,
    borderColor: '#EFE3D3',
    borderRadius: 16,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 12,
  },
  topCarAvatar: {
    width: 58,
    height: 58,
    borderRadius: 14,
  },
  topCarInfo: {
    flex: 1,
    marginLeft: 12,
  },
  topSendingToText: {
    fontSize: 12,
    color: '#786B6D',
    fontWeight: '500',
  },
  topCarName: {
    fontFamily: 'Playfair Display, Georgia, serif',
    fontSize: 17,
    fontWeight: '800',
    color: '#581420',
    marginTop: 1,
    marginBottom: 2,
  },
  topCarLocRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topCarLocText: {
    fontSize: 12,
    color: '#6E5D60',
    fontWeight: '500',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionHeaderTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#581420',
    letterSpacing: 0.8,
  },
  fieldContainer: {
    marginBottom: 12,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#3D3234',
    marginBottom: 5,
  },
  requiredAsterisk: {
    color: '#B91C1C',
    fontWeight: '700',
  },
  inputWithIconBox: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8DEC2',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fieldInputFlex: {
    flex: 1,
    fontSize: 13,
    color: '#2A2425',
    fontWeight: '500',
    height: '100%',
    padding: 0,
  },
  pillsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  eventTypePill: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8DEC2',
  },
  eventTypePillSelected: {
    backgroundColor: '#581420',
    borderColor: '#581420',
  },
  eventTypePillText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#581420',
  },
  eventTypePillTextSelected: {
    color: '#FFFFFF',
  },
  dropdownSelectedText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2A2425',
  },
  dropdownMenuBox: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8DEC2',
    borderRadius: 12,
    marginTop: 4,
    paddingVertical: 4,
  },
  dropdownMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FAF7F2',
  },
  dropdownMenuText: {
    fontSize: 12,
    color: '#3D3234',
  },
  sendQuoteSubmitBtn: {
    marginTop: 18,
    backgroundColor: '#581420',
    height: 48,
    borderRadius: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#581420',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  sendQuoteSubmitBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  quoteSuccessBox: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  quoteSuccessTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#15803D',
  },
  quoteSuccessSub: {
    fontSize: 13,
    color: '#6B5A5C',
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 18,
  },
});

