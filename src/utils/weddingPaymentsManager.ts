export interface WeddingMilestone {
  id: string;
  milestoneNumber: number;
  title: string;
  percentage: number;
  amount: number;
  status: 'pending' | 'paid' | 'locked';
  paidAt?: string;
  paymentMethod?: string;
  transactionRef?: string;
}

export interface WeddingVendorBooking {
  id: string;
  vendorId: string;
  vendorName: string;
  category: string;
  serviceType: string;
  image: string;
  location: string;
  weddingDate: string;
  packageName: string;
  totalAmount: number;
  paidAmount: number;
  remainingAmount: number;
  status: 'initial' | 'requested' | 'response_ready' | 'confirmed' | 'partially_paid' | 'fully_paid' | 'rejected' | 'negotiating';
  invoiceNo: string;
  invoiceDate: string;
  milestones: WeddingMilestone[];
  includedServices: string[];
  bookingSource?: 'entire_wedding' | 'individual';
  lastUpdated: string;
}

const STORAGE_KEY = 'tot_wedding_vendor_payments';

const generateDefaultMilestones = (totalAmount: number): WeddingMilestone[] => {
  const m1Amount = Math.round(totalAmount * 0.3);
  const m2Amount = Math.round(totalAmount * 0.4);
  const m3Amount = totalAmount - m1Amount - m2Amount;

  return [
    {
      id: 'm-1',
      milestoneNumber: 1,
      title: 'Advance Payment on Booking Confirmation',
      percentage: 30,
      amount: m1Amount,
      status: 'pending',
    },
    {
      id: 'm-2',
      milestoneNumber: 2,
      title: 'Payment on Reaching Venue / Event Day',
      percentage: 40,
      amount: m2Amount,
      status: 'locked',
    },
    {
      id: 'm-3',
      milestoneNumber: 3,
      title: 'Final Settlement After Service Completion',
      percentage: 30,
      amount: m3Amount,
      status: 'locked',
    },
  ];
};

export const getAllWeddingBookings = (): WeddingVendorBooking[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Failed to load wedding bookings', e);
  }
  return [];
};

export const getEntireWeddingBookings = (): WeddingVendorBooking[] => {
  const all = getAllWeddingBookings();
  return all.filter((b) => b.bookingSource !== 'individual');
};

export const getIndividualBookings = (): WeddingVendorBooking[] => {
  const all = getAllWeddingBookings();
  return all.filter((b) => b.bookingSource === 'individual');
};

export const getWeddingBookingByVendorId = (vendorId: string): WeddingVendorBooking | undefined => {
  const list = getAllWeddingBookings();
  return list.find((b) => b.vendorId === vendorId || b.id === vendorId);
};

export const saveOrUpdateWeddingBooking = (
  booking: Partial<WeddingVendorBooking> & { vendorId: string; vendorName: string }
): WeddingVendorBooking => {
  const list = getAllWeddingBookings();
  const existingIdx = list.findIndex((b) => b.vendorId === booking.vendorId);
  const now = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

  const totalAmount = booking.totalAmount || (existingIdx >= 0 ? list[existingIdx].totalAmount : 90000);
  const milestones = booking.milestones || (existingIdx >= 0 ? list[existingIdx].milestones : generateDefaultMilestones(totalAmount));

  const paidAmount = milestones
    .filter((m) => m.status === 'paid')
    .reduce((sum, m) => sum + m.amount, 0);
  const remainingAmount = Math.max(0, totalAmount - paidAmount);

  let updatedBooking: WeddingVendorBooking;

  if (existingIdx >= 0) {
    updatedBooking = {
      ...list[existingIdx],
      ...booking,
      totalAmount,
      paidAmount,
      remainingAmount,
      milestones,
      lastUpdated: now,
    };
    list[existingIdx] = updatedBooking;
  } else {
    updatedBooking = {
      id: booking.id || `wed-bkg-${booking.vendorId}`,
      vendorId: booking.vendorId,
      vendorName: booking.vendorName,
      category: booking.category || 'Photography',
      serviceType: booking.serviceType || 'Wedding Photography',
      image: booking.image || 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=600&q=80',
      location: booking.location || 'Chennai, Tamil Nadu',
      weddingDate: booking.weddingDate || '15 Dec 2026',
      packageName: booking.packageName || 'Premium Candid Photography & Cinematic Highlights',
      totalAmount,
      paidAmount,
      remainingAmount,
      status: booking.status || 'requested',
      invoiceNo: booking.invoiceNo || `TOT-INV-2026-${Math.floor(100 + Math.random() * 900)}`,
      invoiceDate: booking.invoiceDate || now,
      milestones,
      includedServices: booking.includedServices || [
        '2 Candid Wedding Photographers',
        '1 Cinematic Videographer',
        'Traditional Photo & 4K Teaser Reel',
        'Pre-Wedding Couple Shoot',
        'Luxury Flush Mount Leather Album',
      ],
      lastUpdated: now,
    };
    list.push(updatedBooking);
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('tot_wedding_payments_updated', { detail: list }));
    }
  } catch (e) {
    console.error('Failed to save wedding booking', e);
  }

  return updatedBooking;
};

export const payWeddingMilestone = (
  vendorId: string,
  milestoneId: string,
  paymentMethod: string = 'UPI'
): WeddingVendorBooking | null => {
  const booking = getWeddingBookingByVendorId(vendorId);
  if (!booking) return null;

  const now = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  const time = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const txnRef = `TXN-${Math.floor(100000 + Math.random() * 900000)}`;

  const updatedMilestones = booking.milestones.map((m) => {
    if (m.id === milestoneId) {
      return {
        ...m,
        status: 'paid' as const,
        paidAt: `${now}, ${time}`,
        paymentMethod,
        transactionRef: txnRef,
      };
    }
    return m;
  });

  // Unlock next milestone if available
  const paidCount = updatedMilestones.filter((m) => m.status === 'paid').length;
  if (paidCount === 1 && updatedMilestones[1]) {
    updatedMilestones[1].status = 'pending';
  } else if (paidCount === 2 && updatedMilestones[2]) {
    updatedMilestones[2].status = 'pending';
  }

  const isFullyPaid = paidCount === updatedMilestones.length;

  return saveOrUpdateWeddingBooking({
    vendorId,
    vendorName: booking.vendorName,
    milestones: updatedMilestones,
    status: isFullyPaid ? 'fully_paid' : 'partially_paid',
  });
};
