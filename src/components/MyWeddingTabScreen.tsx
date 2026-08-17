import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  TextInput,
} from 'react-native';
import { motion, AnimatePresence } from 'motion/react';
import { PhotographyListingPage } from './PhotographyListingPage';
import { MehendiListingPage } from './MehendiListingPage';
import { CateringListingPage } from './CateringListingPage';
import { CarsListingPage } from './CarsListingPage';
import { MakeupListingPage } from './MakeupListingPage';
import { DecorListingPage } from './DecorListingPage';
import { VenueListingPage } from './VenueListingPage';
import { EntertainmentListingPage } from './EntertainmentListingPage';
import { InvitationListingPage } from './InvitationListingPage';
import { NotificationsModal } from './NotificationsModal';
import {
  AppNotification,
  getNotifications,
} from '../utils/notificationsManager';
import {
  Menu,
  Bell,
  MapPin,
  Calendar,
  CheckCircle2,
  Circle,
  Plus,
  Sparkles,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Store,
  Camera,
  Utensils,
  Music,
  Plane,
  Grid,
  Trash2,
  Flower2,
  Palette,
  CreditCard,
  FileText,
  Lock,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import { WeddingInvoicePaymentModal } from './WeddingInvoicePaymentModal';
import {
  WeddingVendorBooking,
  getAllWeddingBookings,
  getEntireWeddingBookings,
  getIndividualBookings,
  saveOrUpdateWeddingBooking,
} from '../utils/weddingPaymentsManager';
import {
  QuoteItem,
  getAllQuotes,
} from '../utils/quotesManager';
import exactWeddingCoupleImg from '../assets/images/exact_wedding_couple_1786457746200.jpg';
import venuePalaceImg from '../assets/images/tn_heritage_palace_pic_1786469719545.jpg';
import stageEntertainmentImg from '../assets/images/guest_banquet_hall_stage_1786471284070.jpg';
import mehendiFullForearmsImg from '../assets/images/mehendi_full_forearms.svg';
import decorMandapImg from '../assets/images/royal_mandap_decor_pure.jpg';
import christianPastorImg from '../assets/images/christian_pastor.jpg';
import hinduIyerImg from '../assets/images/hindu_iyer.jpg';
import muslimImamImg from '../assets/images/muslim_imam.jpg';

const SERVICES_DATA = [
  {
    id: 'photography',
    name: 'Photography',
    vendors: '124 Vendors',
    image: exactWeddingCoupleImg,
  },
  {
    id: 'makeup',
    name: 'Makeup',
    vendors: '86 Vendors',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'decor',
    name: 'Decor',
    vendors: '76 Vendors',
    image: decorMandapImg,
  },
  {
    id: 'mehendi',
    name: 'Mehendi',
    vendors: '54 Vendors',
    image: mehendiFullForearmsImg,
  },
  {
    id: 'catering',
    name: 'Catering',
    vendors: '91 Vendors',
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'venue',
    name: 'Venue',
    vendors: '128 Vendors',
    image: venuePalaceImg,
  },
  {
    id: 'entertainment',
    name: 'Entertainment',
    vendors: '58 Vendors',
    image: stageEntertainmentImg,
  },
  {
    id: 'invitation',
    name: 'Invitation',
    vendors: '68 Vendors',
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'cars',
    name: 'Cars',
    vendors: '45 Vendors',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'pooja',
    name: 'Pooja',
    vendors: '32 Vendors',
    image: 'https://images.unsplash.com/photo-1608023136037-628d070b42f1?q=80&w=600&auto=format&fit=crop',
  },
];

interface MyWeddingTabScreenProps {
  userName: string;
  weddingProfile?: {
    marriageType?: string;
    brideName?: string;
    groomName?: string;
    weddingDate?: string;
    location?: string;
    guestCount?: string;
    budget?: string;
  } | null;
  onExploreServices?: () => void;
  savedStudioIds?: Record<string, boolean>;
  onToggleSavedStudio?: (id: string) => void;
  savedMakeupIds?: Record<string, boolean>;
  onToggleSavedMakeup?: (id: string) => void;
  savedDecorIds?: Record<string, boolean>;
  onToggleSavedDecor?: (id: string) => void;
  savedVenueIds?: Record<string, boolean>;
  onToggleSavedVenue?: (id: string) => void;
  savedEntIds?: Record<string, boolean>;
  onToggleSavedEnt?: (id: string) => void;
  savedCarIds?: Record<string, boolean>;
  onToggleSavedCar?: (id: string) => void;
  savedInviteIds?: Record<string, boolean>;
  onToggleSavedInvite?: (id: string) => void;
  onOpenSavedTab?: () => void;
  onNavigateToHome?: () => void;
  onHideTabBar?: (hide: boolean) => void;
  onOpenQuotesTab?: () => void;
}

interface ChecklistItem {
  id: string;
  title: string;
  category: string;
  completed: boolean;
}

function calculateDaysLeft(dateString?: string): number {
  if (!dateString) return 126;
  try {
    let targetDate: Date | null = null;

    // Try native Date parsing first
    const nativeParsed = new Date(dateString);
    if (!isNaN(nativeParsed.getTime())) {
      targetDate = nativeParsed;
    } else {
      // Split by whitespace, slashes, or hyphens
      const parts = dateString.trim().split(/[\/\-\s,]+/);
      if (parts.length >= 3) {
        let day = 15;
        let month = 11; // 0-indexed Dec
        let year = 2026;

        // Check if YYYY is first part (ISO format)
        if (parts[0].length === 4 && !isNaN(parseInt(parts[0], 10))) {
          year = parseInt(parts[0], 10);
          month = parseInt(parts[1], 10) - 1;
          day = parseInt(parts[2], 10);
        } else {
          // Day Month Year or Month Day Year
          const p0Num = parseInt(parts[0], 10);
          const p1Num = parseInt(parts[1], 10);
          const p2Num = parseInt(parts[2], 10);

          if (!isNaN(p2Num) && parts[2].length === 4) {
            year = p2Num;
          }

          const monthMap: Record<string, number> = {
            jan: 0, january: 0,
            feb: 1, february: 1,
            mar: 2, march: 2,
            apr: 3, april: 3,
            may: 4,
            jun: 5, june: 5,
            jul: 6, july: 6,
            aug: 7, august: 7,
            sep: 8, september: 8,
            oct: 9, october: 9,
            nov: 10, november: 10,
            dec: 11, december: 11,
          };

          const p1Lower = parts[1].toLowerCase();
          const p0Lower = parts[0].toLowerCase();

          if (monthMap[p1Lower] !== undefined) {
            month = monthMap[p1Lower];
            day = p0Num;
          } else if (monthMap[p0Lower] !== undefined) {
            month = monthMap[p0Lower];
            day = p1Num;
          } else if (!isNaN(p0Num) && !isNaN(p1Num)) {
            if (p0Num > 12) {
              day = p0Num;
              month = p1Num - 1;
            } else {
              day = p0Num;
              month = p1Num - 1;
            }
          }
        }
        targetDate = new Date(year, month, day);
      }
    }

    if (targetDate && !isNaN(targetDate.getTime())) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      targetDate.setHours(0, 0, 0, 0);
      const diffTime = targetDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays >= 0 ? diffDays : 0;
    }
  } catch (e) {
    console.error(e);
  }
  return 126;
}

const matchServiceCategory = (targetCat: string, itemCategory: string, itemTitle: string) => {
  const normCat = (itemCategory || '').toLowerCase();
  const normTitle = (itemTitle || '').toLowerCase();
  const t = (targetCat || '').toLowerCase();

  if (t.includes('photo') && (normCat.includes('photo') || normCat.includes('media') || normTitle.includes('photo') || normTitle.includes('videograph'))) return true;
  if (t.includes('makeup') && (normCat.includes('makeup') || normCat.includes('beauty') || normTitle.includes('makeup') || normTitle.includes('bridal'))) return true;
  if (t.includes('decor') && (normCat.includes('decor') || normTitle.includes('decor') || normTitle.includes('theme') || normTitle.includes('mandap'))) return true;
  if ((t.includes('cater') || t.includes('food')) && (normCat.includes('cater') || normCat.includes('food') || normTitle.includes('cater') || normTitle.includes('food') || normTitle.includes('menu'))) return true;
  if (t.includes('venue') && (normCat.includes('venue') || normTitle.includes('venue') || normTitle.includes('mandapam') || normTitle.includes('hall') || normTitle.includes('palace') || normTitle.includes('resort'))) return true;
  if ((t.includes('entertain') || t.includes('music') || t.includes('dj')) && (normCat.includes('entertain') || normCat.includes('music') || normTitle.includes('music') || normTitle.includes('dj') || normTitle.includes('entertain') || normTitle.includes('band'))) return true;
  if ((t.includes('invit') || t.includes('card')) && (normCat.includes('invit') || normCat.includes('card') || normTitle.includes('invit') || normTitle.includes('card'))) return true;
  if ((t.includes('car') || t.includes('travel') || t.includes('transport') || t.includes('bus')) && (normCat.includes('car') || normCat.includes('travel') || normTitle.includes('travel') || normTitle.includes('car') || normTitle.includes('transport') || normTitle.includes('stay') || normTitle.includes('guest'))) return true;
  if (t.includes('mehendi') && (normCat.includes('mehendi') || normTitle.includes('mehendi'))) return true;
  if ((t.includes('pooja') || t.includes('ritual') || t.includes('iyer') || t.includes('pastor') || t.includes('imam') || t.includes('pandit')) && (normCat.includes('pooja') || normCat.includes('ritual') || normTitle.includes('pooja') || normTitle.includes('ritual') || normTitle.includes('iyer') || normTitle.includes('pastor') || normTitle.includes('imam') || normTitle.includes('pandit'))) return true;

  return normCat === t || normTitle.includes(t) || (t.length > 3 && normTitle.includes(t));
};

export const getCategoryQuoteStatus = (
  itemCategory: string,
  itemTitle: string,
  quotesList: QuoteItem[],
  bookingsList: WeddingVendorBooking[]
): { isConfirmed: boolean; vendorName?: string } => {
  // 1. Check confirmed quotes from quotesManager
  const confirmedQuote = quotesList.find((q) => {
    const isStatusConfirmed = q.status === 'confirmed' || q.paymentStatus === 'partially_paid' || q.paymentStatus === 'fully_paid';
    return isStatusConfirmed && (
      matchServiceCategory(q.category, itemCategory, itemTitle) ||
      matchServiceCategory(q.packageName, itemCategory, itemTitle) ||
      matchServiceCategory(q.vendorName, itemCategory, itemTitle)
    );
  });

  if (confirmedQuote) {
    return { isConfirmed: true, vendorName: confirmedQuote.vendorName };
  }

  // 2. Check bookings from weddingPaymentsManager
  const confirmedBooking = bookingsList.find((b) => {
    const isBookingConfirmed = b.status === 'confirmed' || b.status === 'partially_paid' || b.status === 'fully_paid' || (b.paidAmount && b.paidAmount > 0);
    return isBookingConfirmed && (
      matchServiceCategory(b.category, itemCategory, itemTitle) ||
      matchServiceCategory(b.serviceType, itemCategory, itemTitle) ||
      matchServiceCategory(b.vendorName, itemCategory, itemTitle)
    );
  });

  if (confirmedBooking) {
    return { isConfirmed: true, vendorName: confirmedBooking.vendorName };
  }

  return { isConfirmed: false };
};

const FloralSideIllustration: React.FC<{ side: 'left' | 'right' }> = ({ side }) => {
  const isLeft = side === 'left';
  const prefix = isLeft ? 'rhl' : 'rhr';

  // Helper function to render a individual realistic red rose bloom
  const renderRose = (key: string, cx: number, cy: number, r: number, rotation = 0) => (
    <g key={key} transform={`translate(${cx}, ${cy}) rotate(${rotation})`}>
      {/* Outer shadow */}
      <circle cx="0" cy="0" r={r * 1.06} fill="#3A0005" opacity="0.45" />
      {/* Outer Dark Petals */}
      <path
        d={`M ${-r * 0.9} ${-r * 0.3} C ${-r * 1.1} ${-r * 1.1}, ${r * 1.1} ${-r * 1.1}, ${r * 0.9} ${-r * 0.3} C ${r * 1.25} ${r * 0.8}, ${-r * 1.25} ${r * 0.8}, ${-r * 0.9} ${-r * 0.3} Z`}
        fill={`url(#${prefix}-rose-dark)`}
      />
      {/* Mid Layer Petals */}
      <path
        d={`M ${-r * 0.75} ${-r * 0.5} C ${-r * 0.85} ${-r * 1.05}, ${r * 0.85} ${-r * 1.05}, ${r * 0.75} ${-r * 0.5} C ${r * 1.05} ${r * 0.65}, ${-r * 1.05} ${r * 0.65}, ${-r * 0.75} ${-r * 0.5} Z`}
        fill={`url(#${prefix}-rose-mid)`}
      />
      {/* Vivid Red Petals */}
      <path
        d={`M ${-r * 0.6} ${-r * 0.35} C ${-r * 0.68} ${-r * 0.85}, ${r * 0.68} ${-r * 0.85}, ${r * 0.6} ${-r * 0.35} C ${r * 0.85} ${r * 0.5}, ${-r * 0.85} ${r * 0.5}, ${-r * 0.6} ${-r * 0.35} Z`}
        fill={`url(#${prefix}-rose-bright)`}
      />
      {/* Inner Cupped Core */}
      <path
        d={`M ${-r * 0.4} ${-r * 0.2} C ${-r * 0.48} ${-r * 0.65}, ${r * 0.48} ${-r * 0.65}, ${r * 0.4} ${-r * 0.2} C ${r * 0.55} ${r * 0.38}, ${-r * 0.55} ${r * 0.38}, ${-r * 0.4} ${-r * 0.2} Z`}
        fill={`url(#${prefix}-rose-core)`}
      />
      {/* Deep Center Swirl */}
      <circle cx="0" cy="0" r={r * 0.26} fill="#4D0007" />
      <path
        d={`M ${-r * 0.18} ${-r * 0.08} Q 0 ${-r * 0.32} ${r * 0.18} ${-r * 0.08} Q ${r * 0.25} ${r * 0.18} 0 ${r * 0.22} Q ${-r * 0.25} ${r * 0.18} ${-r * 0.18} ${-r * 0.08} Z`}
        fill="#FF263E"
        opacity="0.9"
      />
      <circle cx={-r * 0.04} cy={-r * 0.04} r={r * 0.09} fill="#FFA3AF" opacity="0.85" />
    </g>
  );

  // Positions forming the heart-shaped rose arch and bottom rose bed
  const rosePositions = [
    // Bottom dense rose bed
    { cx: 8, cy: 118, r: 15, rot: 12 },
    { cx: 26, cy: 120, r: 16, rot: -8 },
    { cx: 46, cy: 121, r: 15, rot: 25 },
    { cx: 66, cy: 122, r: 14, rot: -15 },
    { cx: 86, cy: 120, r: 13, rot: 5 },

    // Middle overlapping bed layer
    { cx: 16, cy: 106, r: 14, rot: -20 },
    { cx: 36, cy: 107, r: 15, rot: 18 },
    { cx: 56, cy: 108, r: 14, rot: -12 },
    { cx: 76, cy: 106, r: 13, rot: 22 },

    // Upward heart arch curve
    { cx: 20, cy: 92, r: 15, rot: 30 },
    { cx: 30, cy: 78, r: 16, rot: -10 },
    { cx: 42, cy: 64, r: 16, rot: 15 },
    { cx: 54, cy: 50, r: 15, rot: -25 },

    // Inward top of heart arch
    { cx: 66, cy: 38, r: 15, rot: 20 },
    { cx: 78, cy: 26, r: 14, rot: -15 },
    { cx: 88, cy: 16, r: 13, rot: 10 },
    { cx: 78, cy: 10, r: 12, rot: -30 },

    // Dense accent filler roses
    { cx: 8, cy: 80, r: 12, rot: 5 },
    { cx: 46, cy: 36, r: 12, rot: 40 },
    { cx: 60, cy: 22, r: 11, rot: -18 },
  ];

  return (
    <svg
      width="120"
      height="130"
      viewBox="0 0 120 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: 'absolute',
        top: -6,
        bottom: -4,
        [isLeft ? 'left' : 'right']: -6,
        transform: isLeft ? 'none' : 'scaleX(-1)',
        pointerEvents: 'none',
        zIndex: 2,
      }}
    >
      <defs>
        {/* Deep Ruby Red Radial Gradients matching user's photo */}
        <radialGradient id={`${prefix}-rose-core`} cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#700008" />
          <stop offset="50%" stopColor="#A30010" />
          <stop offset="100%" stopColor="#D60017" />
        </radialGradient>

        <radialGradient id={`${prefix}-rose-bright`} cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#A30010" />
          <stop offset="60%" stopColor="#D60017" />
          <stop offset="100%" stopColor="#FF1F3A" />
        </radialGradient>

        <radialGradient id={`${prefix}-rose-mid`} cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#7C000A" />
          <stop offset="70%" stopColor="#B80014" />
          <stop offset="100%" stopColor="#E6122D" />
        </radialGradient>

        <radialGradient id={`${prefix}-rose-dark`} cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#4A0005" />
          <stop offset="70%" stopColor="#7C000A" />
          <stop offset="100%" stopColor="#A30010" />
        </radialGradient>

        <filter id={`${prefix}-arch-shadow`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="2" dy="3" stdDeviation="3" floodColor="#320004" floodOpacity="0.35" />
        </filter>
      </defs>

      <g filter={`url(#${prefix}-arch-shadow)`}>
        {/* Background dense red base fill for the rose arch */}
        <path
          d="M 2 128 L 98 128 C 78 92 52 62 88 8 C 68 2 48 22 22 72 Z"
          fill="#3B0005"
          opacity="0.9"
        />

        {/* Render dense red rose clusters forming the heart arch */}
        {rosePositions.map((pos, idx) =>
          renderRose(`rose-${idx}`, pos.cx, pos.cy, pos.r, pos.rot)
        )}
      </g>
    </svg>
  );
};

export const MyWeddingTabScreen: React.FC<MyWeddingTabScreenProps> = ({
  userName,
  weddingProfile,
  onExploreServices,
  savedStudioIds,
  onToggleSavedStudio,
  savedMakeupIds,
  onToggleSavedMakeup,
  savedDecorIds,
  onToggleSavedDecor,
  savedVenueIds,
  onToggleSavedVenue,
  savedEntIds,
  onToggleSavedEnt,
  savedCarIds,
  onToggleSavedCar,
  savedInviteIds = {},
  onToggleSavedInvite,
  onOpenSavedTab,
  onNavigateToHome,
  onHideTabBar,
  onOpenQuotesTab,
}) => {
  const [activeSegment, setActiveSegment] = useState<'overview' | 'payment'>('overview');
  const [weddingBookings, setWeddingBookings] = useState<WeddingVendorBooking[]>(() => {
    return getEntireWeddingBookings();
  });
  const [quotes, setQuotes] = useState<QuoteItem[]>(() => getAllQuotes());

  const [selectedInvoiceVendor, setSelectedInvoiceVendor] = useState<{
    vendorId: string;
    vendorName: string;
    vendorImage?: string;
    vendorLocation?: string;
    category?: string;
    startingPrice?: string;
  } | null>(null);

  const [notifications, setNotifications] = useState<AppNotification[]>(() => getNotifications());
  const [showNotificationsModal, setShowNotificationsModal] = useState<boolean>(false);

  useEffect(() => {
    const handleUpdate = () => {
      setWeddingBookings(getEntireWeddingBookings());
    };
    const handleQuotesUpdate = () => {
      setQuotes(getAllQuotes());
    };
    const handleNotifUpdate = () => {
      setNotifications(getNotifications());
    };
    const handleSwitchToPayments = () => {
      setShowServicesView(false);
      setShowPhotographyListing(false);
      setShowMehendiListing(false);
      setShowCateringListing(false);
      setShowCarsListing(false);
      setShowMakeupListing(false);
      setShowDecorListing(false);
      setShowVenueListing(false);
      setShowEntertainmentListing(false);
      setShowInvitationListing(false);
      setSelectedInvoiceVendor(null);
      setActiveSegment('payment');
    };
    window.addEventListener('tot_wedding_payments_updated', handleUpdate);
    window.addEventListener('tot_quotes_updated', handleQuotesUpdate);
    window.addEventListener('tot_notifications_updated', handleNotifUpdate);
    window.addEventListener('tot_switch_to_my_wedding_payments', handleSwitchToPayments);
    return () => {
      window.removeEventListener('tot_wedding_payments_updated', handleUpdate);
      window.removeEventListener('tot_quotes_updated', handleQuotesUpdate);
      window.removeEventListener('tot_notifications_updated', handleNotifUpdate);
      window.removeEventListener('tot_switch_to_my_wedding_payments', handleSwitchToPayments);
    };
  }, []);

  const unreadNotifCount = notifications.filter((n) => !n.read).length;

  let brideName = '';
  let groomName = '';

  if (weddingProfile?.brideName || weddingProfile?.groomName) {
    brideName = weddingProfile.brideName || '';
    groomName = weddingProfile.groomName || '';
  }

  if (!brideName && !groomName && userName.trim()) {
    const trimmed = userName.trim();
    if (trimmed.includes('&')) {
      const parts = trimmed.split('&');
      brideName = parts[0].trim();
      groomName = parts[1].trim();
    } else if (trimmed.toLowerCase().includes(' and ')) {
      const parts = trimmed.split(/ and /i);
      brideName = parts[0].trim();
      groomName = parts[1].trim();
    } else if (trimmed.includes('+')) {
      const parts = trimmed.split('+');
      brideName = parts[0].trim();
      groomName = parts[1].trim();
    } else {
      brideName = trimmed;
      groomName = 'Partner';
    }
  }

  // Fallback default if user hasn't registered any name yet
  if (!brideName) brideName = 'Surya';
  if (!groomName) groomName = 'Siva';

  // Extract date dynamically from user profile
  const rawDate = weddingProfile?.weddingDate || '21 Aug 2026';

  // Extract location/city dynamically from user profile
  const rawLocation = weddingProfile?.location || 'Chennai, Tamil Nadu';

  // Automatically calculate remaining countdown days from actual wedding date
  const daysLeft = calculateDaysLeft(rawDate);

  const getPoojaServiceData = () => {
    const rawType = weddingProfile?.marriageType || 'Hindu';
    if (rawType.includes('Christian')) {
      return {
        id: 'pastor',
        name: 'Pastor/Father',
        vendors: '12 Vendors',
        image: christianPastorImg,
      };
    }
    if (rawType.includes('Muslim')) {
      return {
        id: 'imam',
        name: 'Imam',
        vendors: '8 Vendors',
        image: muslimImamImg,
      };
    }
    // Default or Hindu: "Iyer"
    return {
      id: 'iyer',
      name: 'Iyer',
      vendors: '24 Vendors',
      image: hinduIyerImg,
    };
  };

  const poojaService = getPoojaServiceData();
  const isIntercaste = (weddingProfile?.marriageType || 'Hindu').includes('Intercaste');

  const CHECKLIST_STORAGE_KEY = 'tot_wedding_checklist_items';

  const defaultChecklistItems: ChecklistItem[] = [
    { id: '1', title: 'Wedding Date Fixed', category: 'General', completed: true },
    { id: '2', title: 'Venue Booking', category: 'Venue', completed: false },
    { id: '3', title: 'Photography & Videography', category: 'Photography', completed: false },
    { id: '4', title: 'Bridal & Groom Makeup', category: 'Makeup', completed: false },
    { id: '5', title: 'Decor & Theme Design', category: 'Decor', completed: false },
    { id: '6', title: 'Catering & Food Menu', category: 'Catering', completed: false },
    { id: '7', title: 'Wedding Invitations', category: 'Invitation', completed: false },
    { id: '8', title: 'Music & DJ Entertainment', category: 'Entertainment', completed: false },
    { id: '9', title: 'Guest Travel & Stay Arrangements', category: 'Cars', completed: false },
  ];

  // Services checklist items
  const [checklist, setChecklist] = useState<ChecklistItem[]>(() => {
    try {
      const saved = localStorage.getItem(CHECKLIST_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Error reading checklist from storage:', e);
    }
    return defaultChecklistItems;
  });

  const updateChecklist = (newListOrFn: ChecklistItem[] | ((prev: ChecklistItem[]) => ChecklistItem[])) => {
    setChecklist((prev) => {
      const next = typeof newListOrFn === 'function' ? newListOrFn(prev) : newListOrFn;
      try {
        localStorage.setItem(CHECKLIST_STORAGE_KEY, JSON.stringify(next));
      } catch (e) {
        console.warn('Error saving checklist:', e);
      }
      return next;
    });
  };

  const [newServiceInput, setNewServiceInput] = useState('');
  const [showAddInput, setShowAddInput] = useState(false);
  const [showServicesModal, setShowServicesModal] = useState(false);
  const [showServicesView, setShowServicesView] = useState(false);
  const [showPhotographyListing, setShowPhotographyListing] = useState(false);
  const [showMehendiListing, setShowMehendiListing] = useState(false);
  const [showCateringListing, setShowCateringListing] = useState(false);
  const [showCarsListing, setShowCarsListing] = useState(false);
  const [showMakeupListing, setShowMakeupListing] = useState(false);
  const [showDecorListing, setShowDecorListing] = useState(false);
  const [showVenueListing, setShowVenueListing] = useState(false);
  const [showEntertainmentListing, setShowEntertainmentListing] = useState(false);
  const [showInvitationListing, setShowInvitationListing] = useState(false);
  const [addedToast, setAddedToast] = useState<string | null>(null);

  useEffect(() => {
    if (addedToast) {
      const timer = setTimeout(() => {
        setAddedToast(null);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [addedToast]);

  const isAnyListingOpen = Boolean(
    showServicesView ||
    showPhotographyListing ||
    showMehendiListing ||
    showCateringListing ||
    showCarsListing ||
    showMakeupListing ||
    showDecorListing ||
    showVenueListing ||
    showEntertainmentListing ||
    showInvitationListing
  );

  useEffect(() => {
    if (onHideTabBar) {
      onHideTabBar(isAnyListingOpen);
    }
    return () => {
      if (onHideTabBar) {
        onHideTabBar(false);
      }
    };
  }, [isAnyListingOpen, onHideTabBar]);


  if (showMehendiListing) {
    return (
      <MehendiListingPage
        onBack={() => {
          setShowMehendiListing(false);
          setShowServicesView(true);
        }}
        savedMehendiIds={{}}
        bookingSource="entire_wedding"
      />
    );
  }

  if (showCateringListing) {
    return (
      <CateringListingPage
        onBack={() => {
          setShowCateringListing(false);
          setShowServicesView(true);
        }}
        savedCateringIds={{}}
        bookingSource="entire_wedding"
      />
    );
  }

  if (showCarsListing) {
    return (
      <CarsListingPage
        onBack={() => {
          setShowCarsListing(false);
          setShowServicesView(true);
        }}
        savedCarIds={savedCarIds}
        onToggleSavedCar={onToggleSavedCar}
        bookingSource="entire_wedding"
      />
    );
  }

  if (showPhotographyListing) {
    return (
      <PhotographyListingPage
        onBack={() => {
          setShowPhotographyListing(false);
          setShowServicesView(true);
        }}
        savedStudioIds={savedStudioIds}
        onToggleSavedStudio={onToggleSavedStudio}
        bookingSource="entire_wedding"
      />
    );
  }

  if (showMakeupListing) {
    return (
      <MakeupListingPage
        onBack={() => {
          setShowMakeupListing(false);
          setShowServicesView(true);
        }}
        savedMakeupIds={savedMakeupIds}
        onToggleSavedMakeup={onToggleSavedMakeup}
        bookingSource="entire_wedding"
        onNavigateToQuotesTab={() => {
          setShowMakeupListing(false);
          if (onOpenQuotesTab) {
            onOpenQuotesTab();
          }
        }}
      />
    );
  }

  if (showDecorListing) {
    return (
      <DecorListingPage
        onBack={() => {
          setShowDecorListing(false);
          setShowServicesView(true);
        }}
        savedDecorIds={savedDecorIds}
        onToggleSavedDecor={onToggleSavedDecor}
        bookingSource="entire_wedding"
      />
    );
  }

  if (showVenueListing) {
    return (
      <VenueListingPage
        onBack={() => {
          setShowVenueListing(false);
          setShowServicesView(true);
        }}
        savedVenueIds={savedVenueIds}
        onToggleSavedVenue={onToggleSavedVenue}
        bookingSource="entire_wedding"
      />
    );
  }

  if (showEntertainmentListing) {
    return (
      <EntertainmentListingPage
        onBack={() => {
          setShowEntertainmentListing(false);
          setShowServicesView(true);
        }}
        savedEntIds={savedEntIds}
        onToggleSavedEnt={onToggleSavedEnt}
        bookingSource="entire_wedding"
      />
    );
  }

  if (showInvitationListing) {
    return (
      <InvitationListingPage
        onBack={() => {
          setShowInvitationListing(false);
          setShowServicesView(true);
        }}
        savedInviteIds={savedInviteIds}
        onToggleSavedInvite={onToggleSavedInvite}
        bookingSource="entire_wedding"
      />
    );
  }



  const toggleChecklist = (id: string) => {
    updateChecklist((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const removeChecklist = (id: string) => {
    updateChecklist((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAddService = () => {
    if (!newServiceInput.trim()) return;
    const trimmed = newServiceInput.trim();
    const newItem: ChecklistItem = {
      id: Date.now().toString(),
      title: trimmed,
      category: trimmed,
      completed: false,
    };
    updateChecklist((prev) => [...prev, newItem]);
    setNewServiceInput('');
    setShowAddInput(false);
  };

  if (showServicesView) {
    return (
      <View style={[styles.container, { backgroundColor: '#FAF7F2' }]}>
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Top Back Header */}
          <View style={{ marginBottom: 12 }}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setShowServicesView(false)}
              style={styles.backArrowBtn}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <ChevronLeft className="w-6 h-6 text-[#2A2425]" />
            </TouchableOpacity>
          </View>

          {/* Title & Subtitle */}
          <View style={{ marginBottom: 20 }}>
            <Text style={styles.servicesHeaderTitle}>Wedding Services</Text>
            <Text style={styles.servicesHeaderSubtitle}>Choose the best for your wedding</Text>
          </View>

          {/* Toast feedback */}
          <AnimatePresence>
            {addedToast && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{
                  marginBottom: 14,
                  paddingHorizontal: 14,
                  paddingVertical: 9,
                  backgroundColor: '#581420',
                  borderRadius: 12,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: 12.5, color: '#FFFFFF', fontWeight: '600' }}>
                  ✓ {addedToast}
                </Text>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 3-Column Grid for items 1-9 */}
          <View style={styles.servicesGrid3Col}>
            {SERVICES_DATA.slice(0, 9).map((service) => (
              <motion.div
                key={service.id}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer"
                style={{ width: '30%', marginBottom: 20, alignItems: 'center' }}
                onClick={() => {
                  const sid = service.id.toLowerCase();
                  const sname = service.name.toLowerCase();

                  if (sid === 'photography' || sname.includes('photo')) {
                    setShowPhotographyListing(true);
                    return;
                  }
                  if (sid === 'makeup' || sname.includes('makeup')) {
                    setShowMakeupListing(true);
                    return;
                  }
                  if (sid === 'decor' || sname.includes('decor')) {
                    setShowDecorListing(true);
                    return;
                  }
                  if (sid === 'venue' || sname.includes('venue')) {
                    setShowVenueListing(true);
                    return;
                  }
                  if (sid === 'entertainment' || sname.includes('entertainment')) {
                    setShowEntertainmentListing(true);
                    return;
                  }
                  if (sid === 'invitation' || sname.includes('invit')) {
                    setShowInvitationListing(true);
                    return;
                  }
                  if (sid === 'mehendi' || sname.includes('mehendi')) {
                    setShowMehendiListing(true);
                    return;
                  }
                  if (sid === 'catering' || sname.includes('cater')) {
                    setShowCateringListing(true);
                    return;
                  }
                  if (sid === 'cars' || sname.includes('car')) {
                    setShowCarsListing(true);
                    return;
                  }

                  if (!checklist.some((c) => c.title.toLowerCase().includes(service.name.toLowerCase()))) {
                    updateChecklist((prev) => [
                      ...prev,
                      { id: Date.now().toString(), title: service.name, category: service.name, completed: false },
                    ]);
                    setAddedToast(`Added ${service.name} to checklist`);
                  } else {
                    setAddedToast(`${service.name} is in checklist`);
                  }
                  setTimeout(() => setAddedToast(null), 2000);
                }}
              >
                <View style={styles.serviceItemContainer}>
                  <Image
                    source={typeof service.image === 'string' ? { uri: service.image } : service.image}
                    style={styles.serviceGridImage}
                    resizeMode="cover"
                  />
                  <Text style={styles.serviceGridCardTitle}>{service.name}</Text>
                  <Text style={styles.serviceGridCardVendors}>{service.vendors}</Text>
                </View>
              </motion.div>
            ))}
          </View>

          {/* 10th Card: Pooja/Iyer/Pastor/Imam (Centered at bottom, hidden for Intercaste) */}
          {!isIntercaste && (
            <View style={{ alignItems: 'center', marginTop: 2, marginBottom: 20 }}>
              <motion.div
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer"
                style={{ width: '64%', alignItems: 'center' }}
                onClick={() => {
                  if (!checklist.some((c) => c.title.toLowerCase().includes(poojaService.name.toLowerCase()))) {
                    updateChecklist((prev) => [
                      ...prev,
                      { id: Date.now().toString(), title: poojaService.name, category: poojaService.name, completed: false },
                    ]);
                    setAddedToast(`Added ${poojaService.name} to checklist`);
                  } else {
                    setAddedToast(`${poojaService.name} is in checklist`);
                  }
                  setTimeout(() => setAddedToast(null), 2000);
                }}
              >
                <View style={styles.poojaItemContainer}>
                  <Image
                    source={typeof poojaService.image === 'string' ? { uri: poojaService.image } : poojaService.image}
                    style={styles.poojaGridImage}
                    resizeMode="cover"
                  />
                  <Text style={styles.serviceGridCardTitle}>{poojaService.name}</Text>
                  <Text style={styles.serviceGridCardVendors}>{poojaService.vendors}</Text>
                </View>
              </motion.div>
            </View>
          )}
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* ================= HEADER ================= */}
      <View style={styles.topHeader}>
        <TouchableOpacity activeOpacity={0.7} style={styles.iconBtn}>
          <Menu className="w-5 h-5 text-[#2A2425]" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>My Wedding</Text>

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.iconBtn}
          onPress={() => setShowNotificationsModal(true)}
        >
          <Bell className="w-5 h-5 text-[#2A2425]" />
          {unreadNotifCount > 0 && (
            <View style={styles.bellBadge}>
              <Text style={styles.bellBadgeText}>
                {unreadNotifCount > 9 ? '9+' : unreadNotifCount}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* ================= SEGMENT CONTROLS BAR ================= */}
      <View style={styles.segmentTabBar}>
        <TouchableOpacity
          style={[styles.segmentTabItem, activeSegment === 'overview' && styles.segmentTabItemActive]}
          onPress={() => setActiveSegment('overview')}
          activeOpacity={0.8}
        >
          <Text style={[styles.segmentTabText, activeSegment === 'overview' && styles.segmentTabTextActive]}>
            Wedding Overview
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.segmentTabItem, activeSegment === 'payment' && styles.segmentTabItemActive]}
          onPress={() => setActiveSegment('payment')}
          activeOpacity={0.8}
        >
          <Text style={[styles.segmentTabText, activeSegment === 'payment' && styles.segmentTabTextActive]}>
            Payments & Invoices
          </Text>
          {weddingBookings.some((b) => b.remainingAmount > 0) && (
            <View style={styles.tabBadgeDot} />
          )}
        </TouchableOpacity>
      </View>

      <ScrollView
        style={{ flex: 1, width: '100%' }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ================= 1. PAYMENT TAB CONTENT ================= */}
        {activeSegment === 'payment' && (
          <View style={{ gap: 14, width: '100%' }}>
            {/* Financial Summary */}
            <View style={styles.paymentSummaryCard}>
              <View style={styles.summaryTopRow}>
                <View style={styles.summaryTopCol}>
                  <Text style={styles.summaryTopLabel}>Total Budget</Text>
                  <Text style={styles.summaryTopVal}>
                    ₹{weddingBookings.reduce((sum, b) => sum + b.totalAmount, 0).toLocaleString('en-IN')}
                  </Text>
                </View>
                <View style={styles.summaryDividerV} />
                <View style={styles.summaryTopCol}>
                  <Text style={styles.summaryTopLabel}>Total Paid</Text>
                  <Text style={[styles.summaryTopVal, { color: '#15803D' }]}>
                    ₹{weddingBookings.reduce((sum, b) => sum + b.paidAmount, 0).toLocaleString('en-IN')}
                  </Text>
                </View>
                <View style={styles.summaryDividerV} />
                <View style={styles.summaryTopCol}>
                  <Text style={styles.summaryTopLabel}>Remaining</Text>
                  <Text style={[styles.summaryTopVal, { color: '#581420' }]}>
                    ₹{weddingBookings.reduce((sum, b) => sum + b.remainingAmount, 0).toLocaleString('en-IN')}
                  </Text>
                </View>
              </View>
            </View>

            {/* Invoices List Header */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
              <Text style={styles.paymentSectionTitle}>Vendor Milestone Invoices</Text>
              <Text style={styles.paymentSectionCount}>{weddingBookings.length} Booked</Text>
            </View>

            {/* Vendor Booking Cards */}
            {weddingBookings.map((b) => (
              <View key={b.id} style={styles.vendorPaymentCard}>
                <View style={styles.vendorPaymentHeader}>
                  <Image source={{ uri: b.image }} style={styles.vendorPaymentThumb} />
                  <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Text style={styles.vendorPaymentName}>{b.vendorName}</Text>
                      <View style={styles.categoryBadgePill}>
                        <Text style={styles.categoryBadgeText}>{b.category}</Text>
                      </View>
                    </View>
                    <Text style={styles.vendorPaymentPackage}>{b.packageName}</Text>
                    <Text style={styles.vendorPaymentDate}>Event: {b.weddingDate} • {b.location}</Text>
                  </View>
                </View>

                {/* Milestone Steps Bar */}
                <View style={styles.milestonesBarWrapper}>
                  {b.milestones.map((m) => (
                    <View key={m.id} style={styles.milestoneStepCol}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                        {m.status === 'paid' ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                        ) : m.status === 'pending' ? (
                          <Clock className="w-3.5 h-3.5 text-amber-700" />
                        ) : (
                          <Lock className="w-3 h-3 text-stone-400" />
                        )}
                        <Text
                          style={[
                            styles.stepNumText,
                            m.status === 'paid' && { color: '#15803D', fontWeight: '700' },
                          ]}
                        >
                          M{m.milestoneNumber} ({m.percentage}%)
                        </Text>
                      </View>
                      <Text style={styles.stepAmountText}>₹{m.amount.toLocaleString('en-IN')}</Text>
                    </View>
                  ))}
                </View>

                <View style={styles.vendorPaymentFooter}>
                  <View>
                    <Text style={styles.footerBalanceLabel}>Remaining Due</Text>
                    <Text
                      style={[
                        styles.footerBalanceVal,
                        { color: b.remainingAmount === 0 ? '#15803D' : '#581420' },
                      ]}
                    >
                      {b.remainingAmount === 0
                        ? '✓ Fully Settled'
                        : `₹${b.remainingAmount.toLocaleString('en-IN')}`}
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={styles.viewInvoiceBtn}
                    onPress={() =>
                      setSelectedInvoiceVendor({
                        vendorId: b.vendorId,
                        vendorName: b.vendorName,
                        vendorImage: b.image,
                        vendorLocation: b.location,
                        category: b.category,
                        startingPrice: `₹${b.totalAmount.toLocaleString('en-IN')}`,
                      })
                    }
                    activeOpacity={0.88}
                  >
                    <FileText className="w-4 h-4 text-white" />
                    <Text style={styles.viewInvoiceBtnText}>View Invoice</Text>
                    <ChevronRight className="w-3.5 h-3.5 text-white" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* ================= 2. OVERVIEW & CHECKLIST CONTENT ================= */}
        {activeSegment !== 'payment' && (
          <View style={{ gap: 14, width: '100%' }}>
            {activeSegment === 'overview' && (
              <>
                {/* ================= CARD 1: COUPLE BANNER ================= */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full"
                >
                  <View style={styles.coupleCard}>
                    {/* Soft decorative content */}
                    <View style={styles.coupleCardInner}>
                      <Text style={styles.coupleNames}>
                        {brideName} <Text style={{ color: '#801524', fontSize: 18 }}>❤️</Text> {groomName}
                      </Text>

                      <View style={styles.metaRow}>
                        <Text style={styles.metaText}>{rawDate}</Text>
                      </View>

                      <View style={styles.metaRow}>
                        <MapPin className="w-3.5 h-3.5 text-[#2A2425]" />
                        <Text style={styles.metaTextBold}>{rawLocation}</Text>
                      </View>
                    </View>
                  </View>
                </motion.div>

                {/* ================= CARD 2: WEDDING COUNTDOWN ================= */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="w-full"
                >
                  <View style={styles.countdownCard}>
                    <View style={styles.countdownLeft}>
                      <Text style={styles.countdownCardTitle}>Wedding Countdown</Text>

                      <View style={styles.numberWrapper}>
                        <Text style={styles.countdownNumber}>{daysLeft}</Text>
                        <Text style={styles.daysLabel}>DAYS</Text>
                      </View>

                      <Text style={styles.untilText}>Until Your Wedding</Text>
                    </View>

                    <View style={styles.countdownRightImage}>
                      <Image
                        source={{ uri: exactWeddingCoupleImg }}
                        style={styles.coupleImageStyle}
                        resizeMode="contain"
                      />
                    </View>
                  </View>
                </motion.div>

                {/* ================= CARD 3: PLANNING PROGRESS ================= */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="w-full"
                >
                  <View style={styles.progressCard}>
                    <View style={styles.progressHeaderRow}>
                      <Text style={styles.progressTitle}>Planning Progress</Text>
                      <Text style={styles.progressPercentText}>18%</Text>
                    </View>

                    <View style={styles.progressBarTrack}>
                      <View style={[styles.progressBarFill, { width: '18%' }]} />
                    </View>
                  </View>
                </motion.div>

                {/* ================= SERVICES BUTTON ================= */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className="w-full cursor-pointer"
                  onClick={() => {
                    setShowServicesView(true);
                  }}
                >
                  <View style={styles.servicesButton}>
                    <View style={styles.servicesButtonLeft}>
                      <View style={styles.sparkleIconCircle}>
                        <Sparkles className="w-5 h-5 text-[#581420]" />
                      </View>
                      <Text style={styles.servicesBtnTitle}>Services</Text>
                    </View>
                    <ChevronRight className="w-5 h-5 text-[#581420]" />
                  </View>
                </motion.div>
              </>
            )}

            {/* ================= CHECKLIST SECTION ================= */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="w-full"
            >
              <View style={styles.checklistCard}>
                <View style={styles.checklistHeaderRow}>
                  <Text style={styles.checklistTitle}>My Checklist</Text>

                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => setShowAddInput(!showAddInput)}
                      style={styles.addServiceBtn}
                    >
                      <Plus className="w-3.5 h-3.5 text-[#5C1A24]" />
                      <Text style={styles.addServiceBtnText}>Add Service</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Add Service Input Toggle */}
                {showAddInput && (
                  <View style={styles.addInputRow}>
                    <TextInput
                      value={newServiceInput}
                      onChangeText={setNewServiceInput}
                      placeholder="Enter service name (e.g. Mehendi)"
                      placeholderTextColor="#A1999A"
                      style={styles.addTextInput}
                      onSubmitEditing={handleAddService}
                    />
                    <TouchableOpacity
                      onPress={handleAddService}
                      style={styles.saveAddBtn}
                    >
                      <Text style={styles.saveAddBtnText}>Add</Text>
                    </TouchableOpacity>
                  </View>
                )}

                {/* Checklist items list */}
                <View style={styles.checklistVerticalList}>
                  {checklist.length === 0 ? (
                    <Text style={styles.emptyChecklistText}>
                      No services in checklist. Tap "+ Add Service" to add one.
                    </Text>
                  ) : (
                    checklist.map((item) => {
                      const quoteStatus = getCategoryQuoteStatus(item.category, item.title, quotes, weddingBookings);
                      const isItemCompleted = item.completed || quoteStatus.isConfirmed;

                      return (
                        <div key={item.id}>
                          <View
                            style={[
                              styles.checklistItemRow,
                              isItemCompleted && {
                                backgroundColor: '#F0F7EC',
                                borderColor: '#D4E5CD',
                              },
                            ]}
                          >
                            {/* Toggle Checkbox Icon */}
                            <TouchableOpacity
                              activeOpacity={0.7}
                              onPress={() => toggleChecklist(item.id)}
                              style={{ paddingRight: 8, paddingVertical: 2 }}
                              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                            >
                              {isItemCompleted ? (
                                <CheckCircle2 className="w-4 h-4 text-[#2E7D32]" />
                              ) : (
                                <Circle className="w-4 h-4 text-[#C4B4B6]" />
                              )}
                            </TouchableOpacity>

                            {/* Service Content & Listing Navigation */}
                            <TouchableOpacity
                              activeOpacity={0.7}
                              onPress={() => {
                                const t = item.title.toLowerCase();
                                const c = (item.category || '').toLowerCase();
                                if (t.includes('photo') || c.includes('photo')) {
                                  setShowPhotographyListing(true);
                                  return;
                                }
                                if (t.includes('makeup') || t.includes('beauty') || c.includes('makeup')) {
                                  setShowMakeupListing(true);
                                  return;
                                }
                                if (t.includes('decor') || c.includes('decor')) {
                                  setShowDecorListing(true);
                                  return;
                                }
                                if (t.includes('cater') || t.includes('food') || c.includes('cater')) {
                                  setShowCateringListing(true);
                                  return;
                                }
                                if (t.includes('mehendi') || c.includes('mehendi')) {
                                  setShowMehendiListing(true);
                                  return;
                                }
                                if (t.includes('venue') || c.includes('venue')) {
                                  setShowVenueListing(true);
                                  return;
                                }
                                if (t.includes('music') || t.includes('dj') || t.includes('entertainment') || c.includes('entertain')) {
                                  setShowEntertainmentListing(true);
                                  return;
                                }
                                if (t.includes('invitat') || t.includes('card') || c.includes('invitat')) {
                                  setShowInvitationListing(true);
                                  return;
                                }
                                if (t.includes('car') || t.includes('bus') || t.includes('transport') || c.includes('car')) {
                                  setShowCarsListing(true);
                                  return;
                                }
                                toggleChecklist(item.id);
                              }}
                              style={{ flex: 1, paddingVertical: 2 }}
                            >
                              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 6 }}>
                                <Text
                                  style={[
                                    styles.checklistItemText,
                                    { marginLeft: 0 },
                                    isItemCompleted && styles.checklistItemTextCompleted,
                                  ]}
                                >
                                  {item.title}
                                </Text>

                                {quoteStatus.isConfirmed && (
                                  <View style={styles.quoteConfirmedBadge}>
                                    <Sparkles className="w-3 h-3 text-[#2E7D32]" />
                                    <Text style={styles.quoteConfirmedBadgeText}>
                                      {quoteStatus.vendorName ? `Quote Confirmed: ${quoteStatus.vendorName}` : 'Quote Confirmed'}
                                    </Text>
                                  </View>
                                )}
                              </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                              activeOpacity={0.7}
                              onPress={() => removeChecklist(item.id)}
                              style={styles.deleteBtn}
                              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                            >
                              <Trash2 className="w-4 h-4 text-[#A1999A]" />
                            </TouchableOpacity>
                          </View>
                        </div>
                      );
                    })
                  )}
                </View>
              </View>
            </motion.div>
          </View>
        )}
      </ScrollView>

      {/* Services Modal if opened */}
      <AnimatePresence>
        {showServicesModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4"
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-sm bg-[#FAF6EE] rounded-t-3xl sm:rounded-2xl p-5 border border-stone-200 shadow-2xl flex flex-col gap-4"
            >
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 22, fontWeight: '700', color: '#581420' }}>
                  Wedding Services
                </Text>
                <TouchableOpacity onPress={() => setShowServicesModal(false)} style={styles.iconBtn}>
                  <Text style={{ fontWeight: '700', color: '#581420' }}>✕</Text>
                </TouchableOpacity>
              </View>

              <Text style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: 13, color: '#635B5C' }}>
                Select services to include in your personalized wedding plan checklist:
              </Text>

              <View style={{ gap: 10 }}>
                {[
                  { name: 'Photography', icon: Camera },
                  { name: 'Makeup Artist', icon: Sparkles },
                  { name: 'Decor & Flowers', icon: Palette },
                  { name: 'Catering & Food', icon: Utensils },
                  { name: 'DJ & Music', icon: Music },
                  { name: 'Travel & Stay', icon: Plane },
                ].map((s, idx) => {
                  const IconComp = s.icon;
                  return (
                    <div key={idx}>
                      <TouchableOpacity
                        onPress={() => {
                          const sname = s.name.toLowerCase();
                          if (sname.includes('photo')) {
                            setShowServicesModal(false);
                            setShowPhotographyListing(true);
                            return;
                          }
                          if (sname.includes('makeup')) {
                            setShowServicesModal(false);
                            setShowMakeupListing(true);
                            return;
                          }
                          if (sname.includes('decor')) {
                            setShowServicesModal(false);
                            setShowDecorListing(true);
                            return;
                          }
                          if (sname.includes('venue')) {
                            setShowServicesModal(false);
                            setShowVenueListing(true);
                            return;
                          }
                          if (sname.includes('music') || sname.includes('dj') || sname.includes('entertainment')) {
                            setShowServicesModal(false);
                            setShowEntertainmentListing(true);
                            return;
                          }
                          if (sname.includes('invit') || sname.includes('card')) {
                            setShowServicesModal(false);
                            setShowInvitationListing(true);
                            return;
                          }
                          if (sname.includes('car') || sname.includes('bus') || sname.includes('transport')) {
                            setShowServicesModal(false);
                            setShowCarsListing(true);
                            return;
                          }

                          if (!checklist.some((c) => c.title.toLowerCase().includes(s.name.toLowerCase()))) {
                            setChecklist((prev) => [
                              ...prev,
                              { id: Date.now().toString() + idx, title: s.name, category: s.name, completed: false },
                            ]);
                          }
                          setShowServicesModal(false);
                        }}
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: 12,
                          backgroundColor: '#FFFFFF',
                          borderRadius: 14,
                          borderWidth: 1,
                          borderColor: '#E8E2D9',
                        }}
                      >
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                          <View style={{ width: 34, height: 34, borderRadius: 10, backgroundColor: '#F5ECE3', alignItems: 'center', justifyContent: 'center' }}>
                            <IconComp className="w-4 h-4 text-[#581420]" />
                          </View>
                          <Text style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: 14, fontWeight: '600', color: '#2A2425' }}>
                            {s.name}
                          </Text>
                        </View>
                        <Plus className="w-4 h-4 text-[#581420]" />
                      </TouchableOpacity>
                    </div>
                  );
                })}
              </View>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WEDDING INVOICE & MILESTONES PAYMENT MODAL */}
      {selectedInvoiceVendor && (
        <WeddingInvoicePaymentModal
          visible={Boolean(selectedInvoiceVendor)}
          onClose={() => setSelectedInvoiceVendor(null)}
          vendorId={selectedInvoiceVendor.vendorId}
          vendorName={selectedInvoiceVendor.vendorName}
          vendorImage={selectedInvoiceVendor.vendorImage}
          vendorLocation={selectedInvoiceVendor.vendorLocation}
          category={selectedInvoiceVendor.category}
          startingPrice={selectedInvoiceVendor.startingPrice}
          onNavigateToMyWeddingPayments={() => {
            setSelectedInvoiceVendor(null);
            setActiveSegment('payment');
          }}
        />
      )}
      {/* NOTIFICATIONS MODAL */}
      <NotificationsModal
        visible={showNotificationsModal}
        onClose={() => setShowNotificationsModal(false)}
        notifications={notifications}
        onOpenInvoice={(actionData) => {
          setSelectedInvoiceVendor({
            vendorId: actionData?.vendorId || 'studio-1',
            vendorName: actionData?.vendorName || 'Vendor',
            vendorImage: actionData?.vendorImage || '',
            vendorLocation: actionData?.vendorLocation || '',
            category: actionData?.category || 'Photography',
            startingPrice: String(actionData?.invoiceAmount || '₹85,000'),
          });
        }}
        onOpenQuote={(actionData) => {
          if (actionData?.category === 'Photography') setShowPhotographyListing(true);
          else if (actionData?.category === 'Makeup') setShowMakeupListing(true);
          else if (actionData?.category === 'Decor') setShowDecorListing(true);
          else if (actionData?.category === 'Venue') setShowVenueListing(true);
          else if (actionData?.category === 'Entertainment') setShowEntertainmentListing(true);
          else if (actionData?.category === 'Cars') setShowCarsListing(true);
          else if (actionData?.category === 'Invitations') setShowInvitationListing(true);
          else if (actionData?.category === 'Mehendi') setShowMehendiListing(true);
          else if (actionData?.category === 'Catering') setShowCateringListing(true);
          else setShowServicesView(true);
        }}
      />
    </View>
  );
};

// Exact styling matching analyzed design specs
const styles: any = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#FAF6EE',
  },
  topHeader: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 12,
  },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 9999,
    backgroundColor: '#F3EBE1',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  headerTitle: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 21,
    fontWeight: '700',
    color: '#2A2425',
    textAlign: 'center',
  },
  bellBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#581420',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
    borderWidth: 1.5,
    borderColor: '#FAF6EE',
  },
  bellBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
    lineHeight: 11,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 28,
    gap: 14,
  },
  coupleCard: {
    width: '100%',
    backgroundColor: '#FAF1E8',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#EDE3D8',
    paddingVertical: 20,
    paddingHorizontal: 16,
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#5C1A24',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  coupleCardInner: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    zIndex: 2,
  },
  coupleNames: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 24,
    fontWeight: '700',
    color: '#2A2425',
    textAlign: 'center',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 13.5,
    fontWeight: '500',
    color: '#524C4D',
  },
  metaTextBold: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 13,
    fontWeight: '600',
    color: '#2A2425',
  },
  countdownCard: {
    width: '100%',
    backgroundColor: '#F8EFF2',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#EFE2E6',
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 150,
  },
  countdownLeft: {
    flex: 1,
    gap: 4,
  },
  countdownCardTitle: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 17,
    fontWeight: '700',
    color: '#5C1A24',
  },
  numberWrapper: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
    marginTop: 2,
  },
  countdownNumber: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 44,
    fontWeight: '800',
    color: '#5C1A24',
    lineHeight: 46,
  },
  daysLabel: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 13,
    fontWeight: '800',
    color: '#2A2425',
    letterSpacing: 0.5,
  },
  untilText: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 11.5,
    fontWeight: '500',
    color: '#635B5C',
  },
  countdownRightImage: {
    width: 130,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  coupleImageStyle: {
    width: '100%',
    height: '100%',
  },
  progressCard: {
    width: '100%',
    backgroundColor: '#FAF1E8',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#EDE3D8',
    padding: 16,
    gap: 10,
  },
  progressHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressTitle: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 18,
    fontWeight: '700',
    color: '#5C1A24',
  },
  progressPercentText: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 16,
    fontWeight: '800',
    color: '#2A2425',
  },
  progressBarTrack: {
    width: '100%',
    height: 10,
    backgroundColor: '#EAE1D7',
    borderRadius: 9999,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#5C1A24',
    borderRadius: 9999,
  },
  servicesButton: {
    width: '100%',
    backgroundColor: '#F5ECE3',
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: '#E8DDD0',
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#5C1A24',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  servicesButtonLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  sparkleIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2D6C7',
  },
  servicesBtnTitle: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 15,
    fontWeight: '700',
    color: '#5C1A24',
  },
  servicesBtnSubtext: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 11,
    color: '#635B5C',
  },
  checklistCard: {
    width: '100%',
    backgroundColor: '#FAF1E8',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#EDE3D8',
    padding: 16,
    gap: 12,
  },
  checklistHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  checklistTitle: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 19,
    fontWeight: '700',
    color: '#2A2425',
  },
  viewAllText: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 13,
    fontWeight: '600',
    color: '#5C1A24',
  },
  addServiceBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: '#E2D6C7',
  },
  addServiceBtnText: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 11.5,
    fontWeight: '700',
    color: '#5C1A24',
  },
  addInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#E2D6C7',
  },
  addTextInput: {
    flex: 1,
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 12.5,
    color: '#2A2425',
    padding: 4,
    outlineStyle: 'none' as any,
  },
  saveAddBtn: {
    backgroundColor: '#5C1A24',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  saveAddBtnText: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 11.5,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  checklistVerticalList: {
    gap: 8,
  },
  emptyChecklistText: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 13,
    color: '#8C8283',
    textAlign: 'center',
    paddingVertical: 12,
    fontStyle: 'italic',
  },
  checklistItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E8E2D9',
  },
  checklistItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
    marginRight: 8,
  },
  checklistItemText: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 13.5,
    fontWeight: '600',
    color: '#2A2425',
    flex: 1,
  },
  checklistItemTextCompleted: {
    color: '#2E7D32',
  },
  quoteConfirmedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 0.5,
    borderColor: '#C8E6C9',
  },
  quoteConfirmedBadgeText: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 11,
    fontWeight: '700',
    color: '#2E7D32',
  },
  deleteBtn: {
    padding: 6,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrowBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -4,
  },
  servicesHeaderTitle: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 25,
    fontWeight: '700',
    color: '#221D1E',
    marginBottom: 4,
  },
  servicesHeaderSubtitle: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 13,
    color: '#7D7571',
  },
  servicesGrid3Col: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  serviceItemContainer: {
    width: '100%',
    alignItems: 'center',
  },
  serviceGridImage: {
    width: '100%',
    height: 82,
    borderRadius: 18,
    backgroundColor: '#EAE4DC',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  poojaItemContainer: {
    width: '100%',
    alignItems: 'center',
  },
  poojaGridImage: {
    width: '100%',
    height: 90,
    borderRadius: 20,
    backgroundColor: '#EAE4DC',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  serviceGridCardTitle: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 14.5,
    fontWeight: '700',
    color: '#221D1E',
    marginTop: 7,
    textAlign: 'center',
  },
  serviceGridCardVendors: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 11,
    color: '#8A817C',
    marginTop: 1,
    textAlign: 'center',
  },
  myQuotesCard: {
    width: '100%',
    backgroundColor: '#FAF7F2',
    borderWidth: 1,
    borderColor: '#E8E2D9',
    borderRadius: 22,
    padding: 16,
    marginBottom: 16,
  },
  myQuotesHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  myQuotesCardTitle: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 18,
    fontWeight: '700',
    color: '#2A2425',
  },
  quoteBadgeCount: {
    backgroundColor: '#F5EBE6',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  quoteBadgeCountText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#8B1E2F',
  },
  quoteItemBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E8E2D9',
  },
  quoteVendorTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2A2425',
  },
  quoteCategorySubtitle: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  quotePriceTag: {
    fontSize: 15,
    fontWeight: '800',
    color: '#8B1E2F',
  },
  quoteStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 12,
  },
  quoteConfirmedTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  quoteConfirmedText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#15803D',
  },
  quotePaymentPendingText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#D97706',
  },
  quoteViewBtn: {
    backgroundColor: '#581420',
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quoteViewBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  segmentTabBar: {
    flexDirection: 'row',
    backgroundColor: '#FAF5EE',
    marginHorizontal: 16,
    marginBottom: 10,
    borderRadius: 14,
    padding: 4,
    borderWidth: 1,
    borderColor: '#EFE6D9',
  },
  segmentTabItem: {
    flex: 1,
    paddingVertical: 9,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    position: 'relative',
  },
  segmentTabItemActive: {
    backgroundColor: '#581420',
    boxShadow: '0 2px 6px rgba(88, 20, 32, 0.2)',
  },
  segmentTabText: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 12.5,
    fontWeight: '600',
    color: '#7D6E70',
  },
  segmentTabTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  tabBadgeDot: {
    position: 'absolute',
    top: 6,
    right: 14,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#F59E0B',
  },
  paymentSummaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#EFE7DC',
    boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
  },
  summaryTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryTopCol: {
    flex: 1,
    alignItems: 'center',
    gap: 3,
  },
  summaryTopLabel: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 11,
    color: '#7A7273',
  },
  summaryTopVal: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 15,
    fontWeight: '800',
    color: '#2A2425',
  },
  paymentSectionTitle: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 18,
    fontWeight: '700',
    color: '#2A2425',
  },
  paymentSectionCount: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 11.5,
    fontWeight: '600',
    color: '#581420',
    backgroundColor: '#F7EFF1',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  vendorPaymentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#EFE7DC',
    gap: 12,
    boxShadow: '0 3px 10px rgba(0,0,0,0.04)',
  },
  vendorPaymentHeader: {
    flexDirection: 'row',
    gap: 12,
  },
  vendorPaymentThumb: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: '#F3ECE4',
  },
  vendorPaymentName: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 18,
    fontWeight: '700',
    color: '#2A2425',
  },
  categoryBadgePill: {
    backgroundColor: '#F7EFF1',
    borderWidth: 1,
    borderColor: '#EBDCE0',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  categoryBadgeText: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 10,
    fontWeight: '700',
    color: '#581420',
  },
  vendorPaymentPackage: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 11.5,
    fontWeight: '600',
    color: '#524345',
    marginTop: 2,
  },
  vendorPaymentDate: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 10.5,
    color: '#8C8283',
    marginTop: 2,
  },
  milestonesBarWrapper: {
    flexDirection: 'row',
    backgroundColor: '#FAF7F2',
    borderRadius: 12,
    padding: 10,
    gap: 6,
    borderWidth: 1,
    borderColor: '#EFE7DC',
  },
  milestoneStepCol: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
  },
  stepNumText: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 10,
    fontWeight: '600',
    color: '#7A7273',
  },
  stepAmountText: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 11,
    fontWeight: '700',
    color: '#2A2425',
  },
  vendorPaymentFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#EFE7DC',
  },
  footerBalanceLabel: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 10.5,
    color: '#7A7273',
  },
  footerBalanceVal: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 13.5,
    fontWeight: '800',
  },
  viewInvoiceBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#581420',
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 10,
    boxShadow: '0 2px 8px rgba(88, 20, 32, 0.2)',
  },
  viewInvoiceBtnText: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
