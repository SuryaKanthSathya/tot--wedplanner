export interface QuoteItem {
  id: string;
  vendorId: string;
  vendorName: string;
  category: string;
  packageName: string;
  status: 'requested' | 'response_ready' | 'negotiating' | 'rejected' | 'confirmed';
  paymentStatus: 'pending' | 'partially_paid' | 'fully_paid';
  totalAmount: number;
  advanceAmount: number;
  remainingAmount: number;
  weddingDate: string;
  location: string;
  includedServices: string[];
  image: string;
  invoiceNo?: string;
  invoiceDate?: string;
  updatedAt?: number;
}

const STORAGE_KEY = 'tot_confirmed_quotes';
const STATUSES_KEY = 'tot_quote_statuses';

export const getAllQuotes = (): QuoteItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Error reading quotes:', e);
  }
  return [];
};

export const saveOrUpdateQuote = (quote: Partial<QuoteItem> & { id: string }): QuoteItem[] => {
  try {
    const current = getAllQuotes();
    const existingIndex = current.findIndex((q) => q.id === quote.id);
    
    let updatedList: QuoteItem[];
    if (existingIndex >= 0) {
      const merged = {
        ...current[existingIndex],
        ...quote,
        updatedAt: Date.now(),
      };
      updatedList = [...current];
      updatedList[existingIndex] = merged as QuoteItem;
    } else {
      const newQuoteItem: QuoteItem = {
        id: quote.id,
        vendorId: quote.vendorId || quote.id.replace('quote-', ''),
        vendorName: quote.vendorName || 'Wedding Vendor',
        category: quote.category || 'General',
        packageName: quote.packageName || 'Standard Package',
        status: quote.status || 'requested',
        paymentStatus: quote.paymentStatus || 'pending',
        totalAmount: quote.totalAmount || 50000,
        advanceAmount: quote.advanceAmount || Math.round((quote.totalAmount || 50000) * 0.3),
        remainingAmount: quote.remainingAmount || ((quote.totalAmount || 50000) - Math.round((quote.totalAmount || 50000) * 0.3)),
        weddingDate: quote.weddingDate || '24 Oct 2026',
        location: quote.location || 'Chennai, TN',
        includedServices: quote.includedServices || ['Standard Service Package'],
        image: quote.image || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
        invoiceNo: quote.invoiceNo || `TOT-INV-2026-00${Math.floor(Math.random() * 900) + 100}`,
        invoiceDate: quote.invoiceDate || new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        updatedAt: Date.now(),
      };
      updatedList = [newQuoteItem, ...current];
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));

    // Also sync the status in tot_quote_statuses
    if (quote.status) {
      const vendorId = quote.vendorId || quote.id.replace('quote-', '');
      const rawStatuses = localStorage.getItem(STATUSES_KEY) || '{}';
      const statuses = JSON.parse(rawStatuses);
      if (quote.paymentStatus === 'fully_paid') {
        statuses[vendorId] = 'fully_paid';
      } else if (quote.paymentStatus === 'partially_paid') {
        statuses[vendorId] = 'partially_paid';
      } else {
        statuses[vendorId] = quote.status;
      }
      localStorage.setItem(STATUSES_KEY, JSON.stringify(statuses));
    }

    // Broadcast update event
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('tot_quotes_updated', { detail: updatedList }));
    }

    return updatedList;
  } catch (e) {
    console.warn('Error saving quote:', e);
    return getAllQuotes();
  }
};

export const clearAllQuotesAndSavedData = (includeUserData = false) => {
  const keysToRemove = [
    'tot_confirmed_quotes',
    'tot_quote_statuses',
    'saved_photography_studios',
    'saved_makeup_studios',
    'saved_decor_studios',
    'saved_venues',
    'saved_entertainment',
    'saved_entertainment_artists',
    'saved_cars',
    'saved_cars_cars',
    'saved_invitations',
    'saved_mehendi',
    'saved_mehendi_artists',
    'saved_catering',
    'saved_catering_caterers',
  ];

  if (includeUserData) {
    keysToRemove.push('wedding_app_data', 'wedding_app_user_data');
  }

  try {
    keysToRemove.forEach((key) => {
      localStorage.removeItem(key);
    });
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('tot_quotes_updated', { detail: [] }));
      window.dispatchEvent(new CustomEvent('tot_saved_updated', { detail: {} }));
    }
  } catch (e) {
    console.warn('Error clearing quotes and saved data:', e);
  }
};
