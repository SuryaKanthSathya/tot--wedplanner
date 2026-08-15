export interface AppNotification {
  id: string;
  type: 'invoice' | 'message' | 'quote' | 'admin';
  title: string;
  sender: string;
  senderRole: 'admin' | 'vendor';
  message: string;
  timestamp: string;
  timeAgo: string;
  read: boolean;
  actionType?: 'view_invoice' | 'view_quote' | 'view_message' | 'view_booking';
  actionData?: {
    vendorId?: string;
    vendorName?: string;
    vendorImage?: string;
    vendorLocation?: string;
    category?: string;
    invoiceAmount?: number | string;
    invoiceNumber?: string;
    bookingSource?: 'entire_wedding' | 'individual';
    detailText?: string;
  };
}

const DEFAULT_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    type: 'invoice',
    title: 'Official Invoice Issued',
    sender: 'TOT Wedding Admin',
    senderRole: 'admin',
    message: 'Admin has verified and issued the formal tax invoice with payment milestones for your wedding services.',
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    timeAgo: '15m ago',
    read: false,
    actionType: 'view_invoice',
    actionData: {
      vendorId: 'studio-1',
      vendorName: 'Luxe Candid Photography',
      vendorImage: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=600&q=80',
      vendorLocation: 'T. Nagar, Chennai',
      category: 'Photography',
      invoiceAmount: '₹85,000',
      invoiceNumber: 'INV-TOT-2026-089',
      bookingSource: 'individual',
      detailText: 'Advance token milestone of ₹20,000 is ready for payment.',
    },
  },
  {
    id: 'notif-2',
    type: 'message',
    title: 'Vendor Message',
    sender: 'Glow & Grace Bridal Artistry',
    senderRole: 'vendor',
    message: '“Hello! We confirmed our senior master bridal makeup artist for your Muhurtham date. Please check your trial slot schedule.”',
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    timeAgo: '45m ago',
    read: false,
    actionType: 'view_message',
    actionData: {
      vendorId: 'makeup-1',
      vendorName: 'Glow & Grace Bridal Artistry',
      vendorImage: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&q=80',
      vendorLocation: 'Anna Nagar, Chennai',
      category: 'Makeup',
      detailText: 'Trial Makeup Session scheduled 2 weeks before the wedding ceremony. Pre-bridal skincare routine instructions attached.',
    },
  },
  {
    id: 'notif-3',
    type: 'quote',
    title: 'Quotation Update',
    sender: 'Royal Mandap & Stage Decorators',
    senderRole: 'vendor',
    message: 'Vendor has updated the itemized stage lighting and floral entrance quotation for your review.',
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    timeAgo: '2h ago',
    read: false,
    actionType: 'view_quote',
    actionData: {
      vendorId: 'decor-1',
      vendorName: 'Royal Mandap & Stage Decorators',
      vendorImage: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=600&q=80',
      vendorLocation: 'Mylapore, Chennai',
      category: 'Decor',
      invoiceAmount: '₹1,20,000',
      bookingSource: 'individual',
      detailText: 'Includes 40ft Grand Floral Mandap, LED Trussing & Royal Entrance Arch.',
    },
  },
];

const STORAGE_KEY = 'tot_app_notifications';

export const getNotifications = (): AppNotification[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_NOTIFICATIONS));
      return DEFAULT_NOTIFICATIONS;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_NOTIFICATIONS;
  }
};

export const getUnreadCount = (): number => {
  const list = getNotifications();
  return list.filter((n) => !n.read).length;
};

export const markNotificationAsRead = (id: string): void => {
  try {
    const list = getNotifications();
    const updated = list.map((n) => (n.id === id ? { ...n, read: true } : n));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('tot_notifications_updated'));
  } catch (e) {
    console.error('Error marking notification as read', e);
  }
};

export const markAllNotificationsAsRead = (): void => {
  try {
    const list = getNotifications();
    const updated = list.map((n) => ({ ...n, read: true }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('tot_notifications_updated'));
  } catch (e) {
    console.error('Error marking all notifications as read', e);
  }
};

export const addNotification = (
  notif: Omit<AppNotification, 'id' | 'timestamp' | 'timeAgo' | 'read'>
): AppNotification => {
  const newItem: AppNotification = {
    ...notif,
    id: `notif-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    timestamp: new Date().toISOString(),
    timeAgo: 'Just now',
    read: false,
  };
  try {
    const list = getNotifications();
    const updated = [newItem, ...list];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('tot_notifications_updated'));
  } catch (e) {
    console.error('Error adding notification', e);
  }
  return newItem;
};

export const clearAllNotifications = (): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    window.dispatchEvent(new CustomEvent('tot_notifications_updated'));
  } catch (e) {
    console.error('Error clearing notifications', e);
  }
};
