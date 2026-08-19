import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
} from 'react-native';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  MapPin,
  Calendar,
  Sparkles,
  ShieldCheck,
  CalendarDays,
} from 'lucide-react';
import { saveOrUpdateQuote } from '../utils/quotesManager';
import { LuxuryToast } from './LuxuryToast';

interface QuotationScreenProps {
  visible: boolean;
  onClose: () => void;
  quoteStatus: 'initial' | 'requested' | 'response_ready' | 'confirmed' | 'partially_paid' | 'fully_paid' | 'rejected' | 'negotiating';
  setQuoteStatus: (status: any) => void;
  vendorId: string;
  vendorName: string;
  vendorImage: string;
  vendorLocation: string;
  startingPrice: string;
  category: string;
  packageName: string;
  includedServices: string[];
  onNavigateToQuotesTab?: () => void;
  onBack?: () => void;
  onShowToast?: (message: string) => void;
}

export const QuotationScreen: React.FC<QuotationScreenProps> = ({
  visible,
  onClose,
  quoteStatus,
  setQuoteStatus,
  vendorId,
  vendorName,
  vendorImage,
  vendorLocation,
  startingPrice,
  category,
  packageName,
  includedServices,
  onNavigateToQuotesTab,
  onBack,
  onShowToast,
}) => {
  const [localToast, setLocalToast] = useState<string | null>(null);
  const [showNegotiateView, setShowNegotiateView] = useState(false);
  const [negotiatePrice, setNegotiatePrice] = useState('');
  const [negotiateMessage, setNegotiateMessage] = useState('');

  useEffect(() => {
    if (localToast) {
      const timer = setTimeout(() => {
        setLocalToast(null);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [localToast]);

  const showToast = (msg: string, duration = 1000) => {
    if (onShowToast) {
      onShowToast(msg);
    }
    setLocalToast(msg);
  };

  const [mockQuoteDetails, setMockQuoteDetails] = useState(() => {
    const basePrice = parseInt(startingPrice.replace(/[^0-9]/g, ''), 10) || 35000;
    const defaultDetails = {
      artistName: vendorName,
      packageName: packageName,
      includedServices: includedServices,
      weddingDate: '24 Oct 2026',
      location: vendorLocation,
      totalAmount: basePrice,
      advanceAmount: Math.round(basePrice * 0.3),
      remainingAmount: basePrice - Math.round(basePrice * 0.3),
    };

    try {
      const savedQuotesJson = localStorage.getItem('tot_confirmed_quotes');
      if (savedQuotesJson) {
        const quotes = JSON.parse(savedQuotesJson);
        const match = quotes.find((q: any) => q.id === `quote-${vendorId}`);
        if (match) {
          return {
            ...defaultDetails,
            totalAmount: match.totalAmount,
            advanceAmount: match.advanceAmount,
            remainingAmount: match.remainingAmount,
            weddingDate: match.weddingDate,
            location: match.location,
            includedServices: match.includedServices,
          };
        }
      }
    } catch (e) {
      console.warn(e);
    }
    return defaultDetails;
  });

  // Sync state when vendor changes
  useEffect(() => {
    const basePrice = parseInt(startingPrice.replace(/[^0-9]/g, ''), 10) || 35000;
    const defaultDetails = {
      artistName: vendorName,
      packageName: packageName,
      includedServices: includedServices,
      weddingDate: '24 Oct 2026',
      location: vendorLocation,
      totalAmount: basePrice,
      advanceAmount: Math.round(basePrice * 0.3),
      remainingAmount: basePrice - Math.round(basePrice * 0.3),
    };

    try {
      const savedQuotesJson = localStorage.getItem('tot_confirmed_quotes');
      if (savedQuotesJson) {
        const quotes = JSON.parse(savedQuotesJson);
        const match = quotes.find((q: any) => q.id === `quote-${vendorId}`);
        if (match) {
          setMockQuoteDetails({
            ...defaultDetails,
            totalAmount: match.totalAmount,
            advanceAmount: match.advanceAmount,
            remainingAmount: match.remainingAmount,
            weddingDate: match.weddingDate,
            location: match.location,
            includedServices: match.includedServices,
          });
          return;
        }
      }
    } catch (e) {
      console.warn(e);
    }
    setMockQuoteDetails(defaultDetails);
  }, [vendorId, vendorName, startingPrice, vendorLocation, packageName, includedServices]);

  useEffect(() => {
    if (visible) {
      window.dispatchEvent(new CustomEvent('tot_hide_tab_bar', { detail: { hide: true } }));
    } else {
      window.dispatchEvent(new CustomEvent('tot_hide_tab_bar', { detail: { hide: false } }));
    }
    return () => {
      window.dispatchEvent(new CustomEvent('tot_hide_tab_bar', { detail: { hide: false } }));
    };
  }, [visible]);

  // Handle counter-offer response simulation
  useEffect(() => {
    if (quoteStatus === 'negotiating') {
      const timer = setTimeout(() => {
        const basePrice = parseInt(startingPrice.replace(/[^0-9]/g, ''), 10) || 35000;
        const floorLimit = Math.round(basePrice * 0.85);
        
        let proposed = parseInt(negotiatePrice.replace(/[^0-9]/g, ''), 10);
        if (isNaN(proposed) || proposed <= 0) proposed = floorLimit;
        
        let finalPrice = proposed;
        if (proposed < floorLimit) {
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

        setQuoteStatus('response_ready');
        showToast(`Vendor replied with counter quote: ₹${finalPrice.toLocaleString('en-IN')}!`, 4500);
      }, 3500);

      return () => clearTimeout(timer);
    }
  }, [quoteStatus]);

  const handleConfirmQuote = () => {
    setQuoteStatus('confirmed');
    
    saveOrUpdateQuote({
      id: `quote-${vendorId}`,
      vendorId: vendorId,
      vendorName: vendorName,
      category: category,
      packageName: mockQuoteDetails.packageName,
      status: 'confirmed',
      paymentStatus: 'pending',
      totalAmount: mockQuoteDetails.totalAmount,
      advanceAmount: mockQuoteDetails.advanceAmount,
      remainingAmount: mockQuoteDetails.remainingAmount,
      weddingDate: mockQuoteDetails.weddingDate,
      location: mockQuoteDetails.location,
      includedServices: mockQuoteDetails.includedServices,
      image: vendorImage,
      invoiceNo: `TOT-INV-2026-00${Math.floor(Math.random() * 900) + 100}`,
      invoiceDate: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
    });

    try {
      const { saveOrUpdateWeddingBooking } = require('../utils/weddingPaymentsManager');
      saveOrUpdateWeddingBooking({
        vendorId,
        vendorName,
        category,
        image: vendorImage,
        location: vendorLocation,
        totalAmount: mockQuoteDetails.totalAmount,
        status: 'confirmed',
        packageName: mockQuoteDetails.packageName,
        includedServices: mockQuoteDetails.includedServices,
      });
    } catch (e) {
      console.warn(e);
    }

    onClose();
    showToast('✓ Quote Confirmed! View Invoice is now ready.', 3500);
  };

  const handleRejectQuote = () => {
    setQuoteStatus('rejected');
    saveOrUpdateQuote({
      id: `quote-${vendorId}`,
      status: 'rejected',
    });
    onClose();
    showToast('Quotation Rejected.');
  };

  const handleSendNegotiate = () => {
    if (!negotiatePrice.trim()) {
      showToast('Please enter proposed price.');
      return;
    }

    const parsedPrice = parseInt(negotiatePrice.replace(/[^0-9]/g, ''), 10);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      showToast('Please enter a valid price.');
      return;
    }

    setShowNegotiateView(false);
    onClose();
    setQuoteStatus('negotiating');
    saveOrUpdateQuote({
      id: `quote-${vendorId}`,
      status: 'negotiating',
    });
    showToast('Counter-offer sent successfully!');
  };

  if (!visible) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-5"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 15 }}
          transition={{ type: 'spring', damping: 26, stiffness: 320 }}
          className="w-full max-w-xl sm:max-w-2xl bg-[#FAF7F2] rounded-3xl border border-stone-200 shadow-2xl flex flex-col max-h-[92vh] overflow-hidden relative"
          onClick={(e) => e.stopPropagation()}
        >
          <LuxuryToast message={localToast} />

          {/* Header */}
          <View style={styles.modalHeaderNav}>
            <TouchableOpacity onPress={onClose} style={styles.modalCloseBtn}>
              <X size={20} color="#2A2425" />
            </TouchableOpacity>
            <Text style={styles.modalHeaderTitle}>
              {quoteStatus === 'response_ready' ? 'Quotation Details' : 'Confirmed Quotation'}
            </Text>
            <View style={{ width: 36 }} />
          </View>

          <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollContentContainer}>
        {/* Vendor & Status Header */}
        <View style={styles.quoteCardHeader}>
          <Image source={{ uri: vendorImage }} style={styles.quoteVendorThumb} />
          <View style={{ flex: 1 }}>
            <Text style={styles.quoteVendorName}>{vendorName}</Text>
            <Text style={styles.quotePackageName}>{mockQuoteDetails.packageName}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4, gap: 4 }}>
              <MapPin size={12} color="#7D6E70" />
              <Text style={{ fontSize: 12, color: '#7D6E70' }}>{mockQuoteDetails.location}</Text>
            </View>
          </View>
        </View>

        {/* Status Badge */}
        <View style={styles.quoteBadgeContainer}>
          <Sparkles size={14} color="#8B1E2F" />
          <Text style={styles.quoteBadgeText}>
            {quoteStatus === 'response_ready'
              ? 'Vendor Quotation Received'
              : quoteStatus === 'confirmed'
              ? '✓ Quote Confirmed'
              : quoteStatus === 'partially_paid'
              ? 'Partially Paid (Advance Done)'
              : '✓ Fully Paid'}
          </Text>
        </View>

        {/* Event & Date Details */}
        <View style={styles.quoteSectionBox}>
          <Text style={styles.quoteSectionTitle}>Booking Details</Text>
          <View style={styles.quoteRowItem}>
            <CalendarDays size={15} color="#581420" />
            <Text style={styles.quoteRowLabel}>Wedding Date:</Text>
            <Text style={styles.quoteRowValue}>{mockQuoteDetails.weddingDate}</Text>
          </View>
          <View style={styles.quoteRowItem}>
            <MapPin size={15} color="#581420" />
            <Text style={styles.quoteRowLabel}>Location:</Text>
            <Text style={styles.quoteRowValue}>{mockQuoteDetails.location}</Text>
          </View>
        </View>

        {/* Included Services */}
        <View style={styles.quoteSectionBox}>
          <Text style={styles.quoteSectionTitle}>Included Services</Text>
          {mockQuoteDetails.includedServices.map((service, index) => (
            <View key={index} style={styles.serviceCheckRow}>
              <ShieldCheck size={16} color="#10B981" />
              <Text style={styles.serviceCheckText}>{service}</Text>
            </View>
          ))}
        </View>

        {/* Financial Breakdown */}
        <View style={styles.quoteSectionBox}>
          <Text style={styles.quoteSectionTitle}>Payment Breakdown</Text>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Total Quotation Amount:</Text>
            <Text style={styles.priceValue}>₹{mockQuoteDetails.totalAmount.toLocaleString('en-IN')}</Text>
          </View>

          {quoteStatus !== 'response_ready' && (
            <>
              <View style={styles.priceRow}>
                <Text style={styles.priceLabel}>Advance Paid / Required:</Text>
                <Text style={[styles.priceValue, { color: '#D97706' }]}>
                  ₹{mockQuoteDetails.advanceAmount.toLocaleString('en-IN')}
                </Text>
              </View>
              <View style={styles.priceRow}>
                <Text style={styles.priceLabel}>Remaining Balance:</Text>
                <Text style={[styles.priceValue, { color: '#DC2626' }]}>
                  ₹{(
                    mockQuoteDetails.totalAmount -
                    (quoteStatus === 'fully_paid'
                      ? mockQuoteDetails.totalAmount
                      : quoteStatus === 'partially_paid'
                      ? mockQuoteDetails.advanceAmount
                      : 0)
                  ).toLocaleString('en-IN')}
                </Text>
              </View>
              <View style={[styles.priceRow, { borderTopWidth: 1, borderTopColor: '#E5E7EB', paddingTop: 8, marginTop: 4 }]}>
                <Text style={{ fontWeight: '700', color: '#2A2425' }}>Payment Status:</Text>
                <Text
                  style={{
                    fontWeight: '700',
                    color: quoteStatus === 'fully_paid' ? '#15803D' : quoteStatus === 'partially_paid' ? '#D97706' : '#DC2626',
                  }}
                >
                  {quoteStatus === 'fully_paid'
                    ? 'Fully Paid'
                    : quoteStatus === 'partially_paid'
                    ? 'Partially Paid'
                    : 'Payment Pending'}
                </Text>
              </View>
            </>
          )}
        </View>
      </ScrollView>

      {/* Action Bottom Bar */}
      <View style={styles.quoteModalBottomBar}>
        <View style={styles.bottomBarInnerContainer}>
          {quoteStatus === 'response_ready' ? (
            <View style={{ flexDirection: 'row', gap: 8, width: '100%' }}>
              <TouchableOpacity
                style={[styles.confirmQuoteBtn, styles.rejectQuoteBtn, { flex: 1 }]}
                onPress={handleRejectQuote}
                activeOpacity={0.85}
              >
                <Text style={[styles.confirmQuoteBtnText, styles.rejectQuoteBtnText]}>Reject</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.confirmQuoteBtn, styles.negotiateQuoteBtn, { flex: 1.2 }]}
                onPress={() => {
                  setNegotiatePrice(mockQuoteDetails.totalAmount.toString());
                  setShowNegotiateView(true);
                }}
                activeOpacity={0.85}
              >
                <Text style={[styles.confirmQuoteBtnText, styles.negotiateQuoteBtnText]}>Negotiate</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.confirmQuoteBtn, { flex: 1.8 }]}
                onPress={handleConfirmQuote}
                activeOpacity={0.85}
              >
                <Text style={styles.confirmQuoteBtnText}>Confirm Quote</Text>
              </TouchableOpacity>
            </View>
          ) : quoteStatus === 'confirmed' || quoteStatus === 'partially_paid' ? (
            <TouchableOpacity
              style={styles.confirmQuoteBtn}
              onPress={() => {
                onClose();
                if (onNavigateToQuotesTab) {
                  onNavigateToQuotesTab();
                }
              }}
              activeOpacity={0.85}
            >
              <Text style={styles.confirmQuoteBtnText}>View Invoice & Pay</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={[styles.confirmQuoteBtn, { backgroundColor: '#15803D' }]} onPress={onClose} activeOpacity={0.85}>
              <Text style={styles.confirmQuoteBtnText}>Completed</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* NEGOTIATION OVERLAY PANEL */}
      {showNegotiateView && (
        <View style={styles.negotiateOverlay}>
          <View style={styles.negotiateCard}>
            <View style={styles.negotiateCardHeader}>
              <Text style={styles.negotiateCardTitle}>Negotiate Pricing</Text>
              <TouchableOpacity
                style={styles.negotiateCloseBtn}
                onPress={() => setShowNegotiateView(false)}
                activeOpacity={0.7}
              >
                <X size={18} color="#2A2425" />
              </TouchableOpacity>
            </View>

            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: 14, paddingTop: 4, paddingBottom: 16 }}>
              <Text style={styles.negotiateNotice}>
                Propose a custom price offer or package adjustment request. The vendor will review it and reply with a revised quotation.
              </Text>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Proposed Amount (₹)</Text>
                <TextInput
                  style={styles.negotiateTextInput}
                  keyboardType="numeric"
                  placeholder="e.g. 30,000"
                  placeholderTextColor="#A39B9C"
                  value={negotiatePrice}
                  onChangeText={setNegotiatePrice}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Message to Vendor</Text>
                <TextInput
                  style={[styles.negotiateTextInput, { height: 80, textAlignVertical: 'top', paddingTop: 10 }]}
                  multiline
                  placeholder="e.g. Requesting adjustment on menu pricing or guest counts..."
                  placeholderTextColor="#A39B9C"
                  value={negotiateMessage}
                  onChangeText={setNegotiateMessage}
                />
              </View>
            </ScrollView>

            <TouchableOpacity
              style={styles.sendNegotiationBtn}
              onPress={handleSendNegotiate}
              activeOpacity={0.88}
            >
              <Text style={styles.sendNegotiationBtnText}>Submit Counter-Offer</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

const styles = StyleSheet.create({
  modalHeaderNav: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E2D9',
    backgroundColor: '#FAF7F2',
    flexShrink: 0,
  },
  scrollContentContainer: {
    padding: 16,
    paddingBottom: 20,
    width: '100%',
  },
  modalCloseBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EAE4DC',
    justifyContent: 'center',
    alignItems: 'center',
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
    gap: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8E2D9',
    padding: 16,
    borderRadius: 16,
  },
  quoteVendorThumb: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#EAE4DC',
  },
  quoteVendorName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2A2425',
    fontFamily: "'Cormorant Garamond', Georgia, serif",
  },
  quotePackageName: {
    fontSize: 13,
    color: '#8B1E2F',
    fontWeight: '600',
    marginTop: 2,
  },
  quoteBadgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5EBE6',
    borderWidth: 1,
    borderColor: '#EAD7CD',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginTop: 16,
    gap: 8,
  },
  quoteBadgeText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#8B1E2F',
  },
  quoteSectionBox: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8E2D9',
    padding: 16,
    borderRadius: 16,
    marginTop: 16,
    gap: 12,
  },
  quoteSectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2A2425',
    borderBottomWidth: 1,
    borderBottomColor: '#F5EBE6',
    paddingBottom: 8,
    marginBottom: 4,
    fontFamily: "'Cormorant Garamond', Georgia, serif",
  },
  quoteRowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  quoteRowLabel: {
    fontSize: 13,
    color: '#7D6E70',
    width: 100,
  },
  quoteRowValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2A2425',
  },
  serviceCheckRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  serviceCheckText: {
    fontSize: 13,
    color: '#2A2425',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceLabel: {
    fontSize: 13,
    color: '#2A2425',
  },
  priceValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#581420',
  },
  quoteModalBottomBar: {
    height: 72,
    borderTopWidth: 1,
    borderTopColor: '#E8E2D9',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  bottomBarInnerContainer: {
    maxWidth: 800,
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  confirmQuoteBtn: {
    backgroundColor: '#581420',
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  confirmQuoteBtnText: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#FFFFFF',
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
