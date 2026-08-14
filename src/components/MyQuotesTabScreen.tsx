import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import { motion, AnimatePresence } from 'motion/react';
import {
  FileText,
  CheckCircle2,
  Calendar,
  MapPin,
  ChevronLeft,
  ShieldCheck,
  CreditCard,
  Smartphone,
  Building,
  AlertTriangle,
  Sparkles,
  Clock,
} from 'lucide-react';
import { getAllQuotes, saveOrUpdateQuote, QuoteItem } from '../utils/quotesManager';
import { QuotationScreen } from './QuotationScreen';

export type { QuoteItem };

type Screen = 'list' | 'invoice' | 'payment' | 'success';
type PaymentOption = 'advance' | 'full';
type PaymentMethod = 'upi' | 'card' | 'netbanking';

interface MyQuotesTabScreenProps {
  onHideTabBar?: (hide: boolean) => void;
  onExploreVendors?: () => void;
}

export const MyQuotesTabScreen: React.FC<MyQuotesTabScreenProps> = ({
  onHideTabBar,
  onExploreVendors,
}) => {
  const [activeFilterTab, setActiveFilterTab] = useState<'All' | 'Requested' | 'Advance Paid' | 'Fully Paid'>('All');
  const [quotesList, setQuotesList] = useState<QuoteItem[]>(() => getAllQuotes());

  // Listen to realtime updates across components
  useEffect(() => {
    const handleSync = () => {
      setQuotesList(getAllQuotes());
    };
    window.addEventListener('tot_quotes_updated', handleSync);
    window.addEventListener('storage', handleSync);
    return () => {
      window.removeEventListener('tot_quotes_updated', handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, []);

  // Navigation state
  const [screen, setScreen] = useState<Screen>('list');
  const [activeQuote, setActiveQuote] = useState<QuoteItem | null>(null);
  const [reviewingQuote, setReviewingQuote] = useState<QuoteItem | null>(null);

  useEffect(() => {
    if (onHideTabBar) {
      onHideTabBar(screen !== 'list');
    }
    return () => {
      if (onHideTabBar) {
        onHideTabBar(false);
      }
    };
  }, [screen, onHideTabBar]);

  // Cancel dialog state (on Invoice page)
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  // Payment page state
  const [paymentOption, setPaymentOption] = useState<PaymentOption>('advance');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');
  const [isProcessing, setIsProcessing] = useState(false);

  // Success state
  const [paidAmount, setPaidAmount] = useState(0);
  const [successStatus, setSuccessStatus] = useState<'partially_paid' | 'fully_paid'>('partially_paid');

  // Check if any other vendor in the same category is already booked/paid
  const getPaidVendorForCategory = (category: string, currentQuoteId: string) => {
    const paidMatch = quotesList.find(
      (q) =>
        q.category.toLowerCase() === category.toLowerCase() &&
        q.id !== currentQuoteId &&
        (q.paymentStatus === 'partially_paid' || q.paymentStatus === 'fully_paid')
    );
    return paidMatch ? paidMatch.vendorName : null;
  };

  // Filtered quotes logic
  const filteredQuotes = quotesList.filter((q) => {
    if (activeFilterTab === 'All') return true;
    if (activeFilterTab === 'Requested') {
      return (
        q.status === 'requested' ||
        q.status === 'response_ready' ||
        q.status === 'negotiating' ||
        (q.status === 'confirmed' && q.paymentStatus === 'pending')
      );
    }
    if (activeFilterTab === 'Advance Paid') return q.paymentStatus === 'partially_paid';
    if (activeFilterTab === 'Fully Paid') return q.paymentStatus === 'fully_paid';
    return true;
  });

  const openInvoice = (quote: QuoteItem) => {
    setActiveQuote(quote);
    setPaymentOption(quote.paymentStatus === 'partially_paid' ? 'full' : 'advance');
    setPaymentMethod('upi');
    setScreen('invoice');
  };

  const handleGoToPayment = () => {
    setScreen('payment');
  };

  const handleCancelConfirm = () => {
    setShowCancelDialog(false);
    setScreen('list');
    setActiveQuote(null);
  };

  const getAmountToPay = () => {
    if (!activeQuote) return 0;
    if (activeQuote.paymentStatus === 'partially_paid') return activeQuote.remainingAmount;
    return paymentOption === 'advance' ? activeQuote.advanceAmount : activeQuote.totalAmount;
  };

  const handlePay = () => {
    if (!activeQuote) return;
    const amount = getAmountToPay();
    const newStatus: 'partially_paid' | 'fully_paid' =
      paymentOption === 'advance' && activeQuote.paymentStatus !== 'partially_paid'
        ? 'partially_paid'
        : 'fully_paid';

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setPaidAmount(amount);
      setSuccessStatus(newStatus);

      // Update global quote state
      const updated = saveOrUpdateQuote({
        id: activeQuote.id,
        paymentStatus: newStatus,
        status: 'confirmed',
      });
      setQuotesList(updated);
      setActiveQuote((prev) => (prev ? { ...prev, paymentStatus: newStatus, status: 'confirmed' } : null));

      setScreen('success');
    }, 2000);
  };

  const handleSuccessDone = () => {
    setScreen('list');
    setActiveQuote(null);
    setIsProcessing(false);
  };

  // ─── INVOICE SCREEN ────────────────────────────────────────────────
  if (screen === 'invoice' && activeQuote) {
    const currentRemaining =
      activeQuote.paymentStatus === 'fully_paid'
        ? 0
        : activeQuote.paymentStatus === 'partially_paid'
        ? activeQuote.remainingAmount
        : activeQuote.totalAmount;

    return (
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.pageHeader}>
          <TouchableOpacity onPress={() => { setScreen('list'); setActiveQuote(null); }} style={styles.backBtn}>
            <ChevronLeft size={20} color="#2A2425" />
          </TouchableOpacity>
          <Text style={styles.pageHeaderTitle}>Invoice</Text>
          <View style={{ width: 36 }} />
        </View>

        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 20, paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
          {getPaidVendorForCategory(activeQuote.category, activeQuote.id) && (
            <View style={styles.alternativePaidWarning}>
              <AlertTriangle size={16} color="#9A3412" style={{ marginTop: 2 }} />
              <Text style={styles.alternativePaidWarningText}>
                You have already booked and paid <Text style={{ fontWeight: '700' }}>{getPaidVendorForCategory(activeQuote.category, activeQuote.id)}</Text> for this category. You can only hire one vendor per category.
              </Text>
            </View>
          )}

          {/* Brand Header */}
          <View style={styles.invoiceBrand}>
            <Text style={styles.invoiceBrandName}>Tale of Two</Text>
            <Text style={styles.invoiceBrandSub}>Wedding Service Invoice</Text>
          </View>

          {/* Invoice Meta */}
          <View style={styles.invoiceSection}>
            <View style={styles.invoiceMetaRow}>
              <Text style={styles.invoiceMetaLabel}>Invoice No:</Text>
              <Text style={styles.invoiceMetaValue}>{activeQuote.invoiceNo || 'TOT-INV-2026-001'}</Text>
            </View>
            <View style={[styles.invoiceMetaRow, { marginBottom: 0 }]}>
              <Text style={styles.invoiceMetaLabel}>Date:</Text>
              <Text style={styles.invoiceMetaValue}>{activeQuote.invoiceDate || '14 Aug 2026'}</Text>
            </View>
          </View>

          {/* Divider */}
          <View style={styles.invoiceDivider} />

          {/* Vendor Details */}
          <View style={styles.invoiceSection}>
            <Text style={styles.invoiceSectionHeading}>VENDOR</Text>
            <Text style={styles.invoiceVendorName}>{activeQuote.vendorName}</Text>
            <View style={styles.invoiceDetailRow}>
              <Text style={styles.invoiceDetailLabel}>Service:</Text>
              <Text style={styles.invoiceDetailValue}>{activeQuote.category}</Text>
            </View>
            <View style={styles.invoiceDetailRow}>
              <Text style={styles.invoiceDetailLabel}>Package:</Text>
              <Text style={styles.invoiceDetailValue}>{activeQuote.packageName}</Text>
            </View>
            <View style={styles.invoiceDetailRow}>
              <Text style={styles.invoiceDetailLabel}>Wedding Date:</Text>
              <Text style={styles.invoiceDetailValue}>{activeQuote.weddingDate}</Text>
            </View>
            <View style={[styles.invoiceDetailRow, { marginBottom: 0 }]}>
              <Text style={styles.invoiceDetailLabel}>Venue:</Text>
              <Text style={styles.invoiceDetailValue}>{activeQuote.location}</Text>
            </View>
          </View>

          {/* Included Services */}
          {activeQuote.includedServices && activeQuote.includedServices.length > 0 && (
            <View style={styles.invoiceSection}>
              <Text style={styles.invoiceSectionHeading}>INCLUDED SERVICES</Text>
              {activeQuote.includedServices.map((svc, i) => (
                <View key={i} style={styles.invoiceServiceRow}>
                  <Text style={styles.invoiceServiceDot}>•</Text>
                  <Text style={styles.invoiceServiceText}>{svc}</Text>
                </View>
              ))}
            </View>
          )}

          <View style={styles.invoiceDivider} />

          {/* Price Breakdown */}
          <View style={styles.invoiceSection}>
            <Text style={styles.invoiceSectionHeading}>PRICE</Text>
            <View style={styles.invoiceDetailRow}>
              <Text style={styles.invoiceDetailLabel}>Package Amount:</Text>
              <Text style={styles.invoicePriceHighlight}>₹{activeQuote.totalAmount.toLocaleString('en-IN')}</Text>
            </View>
          </View>

          <View style={styles.invoiceDivider} />

          {/* Total */}
          <View style={styles.invoiceTotalRow}>
            <Text style={styles.invoiceTotalLabel}>TOTAL</Text>
            <Text style={styles.invoiceTotalValue}>₹{activeQuote.totalAmount.toLocaleString('en-IN')}</Text>
          </View>

          <View style={styles.invoiceDivider} />

          {/* Payment Status */}
          <View style={styles.invoiceSection}>
            <Text style={styles.invoiceSectionHeading}>PAYMENT STATUS</Text>

            <View style={[
              styles.invoicePayStatusPill,
              {
                backgroundColor:
                  activeQuote.paymentStatus === 'fully_paid' || activeQuote.paymentStatus === 'partially_paid'
                    ? '#DCFCE7'
                    : '#FEE2E2',
              },
            ]}>
              <Text style={[
                styles.invoicePayStatusText,
                {
                  color:
                    activeQuote.paymentStatus === 'fully_paid' || activeQuote.paymentStatus === 'partially_paid'
                      ? '#15803D'
                      : '#DC2626',
                },
              ]}>
                {activeQuote.paymentStatus === 'fully_paid'
                  ? '✓ Fully Paid'
                  : activeQuote.paymentStatus === 'partially_paid'
                  ? 'Advance Paid'
                  : 'Payment Pending'}
              </Text>
            </View>

            {activeQuote.paymentStatus !== 'fully_paid' && (
              <>
                {activeQuote.paymentStatus === 'pending' && (
                  <View style={styles.invoiceDetailRow}>
                    <Text style={styles.invoiceDetailLabel}>Advance Amount:</Text>
                    <Text style={[styles.invoiceDetailValue, { color: '#D97706', fontWeight: '700' }]}>
                      ₹{activeQuote.advanceAmount.toLocaleString('en-IN')}
                    </Text>
                  </View>
                )}
                {activeQuote.paymentStatus === 'partially_paid' && (
                  <View style={styles.invoiceDetailRow}>
                    <Text style={styles.invoiceDetailLabel}>Advance Paid:</Text>
                    <Text style={[styles.invoiceDetailValue, { color: '#15803D', fontWeight: '700' }]}>
                      ₹{activeQuote.advanceAmount.toLocaleString('en-IN')}
                    </Text>
                  </View>
                )}
                <View style={[styles.invoiceDetailRow, { marginBottom: 0 }]}>
                  <Text style={styles.invoiceDetailLabel}>Remaining Amount:</Text>
                  <Text style={[styles.invoiceDetailValue, { color: '#DC2626', fontWeight: '700' }]}>
                    ₹{currentRemaining.toLocaleString('en-IN')}
                  </Text>
                </View>
              </>
            )}

            {activeQuote.paymentStatus === 'fully_paid' && (
              <View style={[styles.invoiceDetailRow, { marginBottom: 0 }]}>
                <Text style={styles.invoiceDetailLabel}>Amount Paid:</Text>
                <Text style={[styles.invoiceDetailValue, { color: '#15803D', fontWeight: '700' }]}>
                  ₹{activeQuote.totalAmount.toLocaleString('en-IN')}
                </Text>
              </View>
            )}
          </View>

          {/* Footer note */}
          <View style={styles.invoiceFooterNote}>
            <ShieldCheck size={14} color="#15803D" />
            <Text style={styles.invoiceFooterText}>This is an official invoice from Tale of Two. Mock transaction only.</Text>
          </View>
        </ScrollView>

        {/* Sticky Bottom Bar */}
        <View style={styles.invoiceBottomBar}>
          <TouchableOpacity
            style={styles.invoiceCancelBtn}
            onPress={() => setShowCancelDialog(true)}
            activeOpacity={0.85}
          >
            <Text style={styles.invoiceCancelBtnText}>Cancel</Text>
          </TouchableOpacity>

          {activeQuote.paymentStatus !== 'fully_paid' ? (
            <TouchableOpacity
              style={[
                styles.invoicePaymentBtn,
                getPaidVendorForCategory(activeQuote.category, activeQuote.id) && { backgroundColor: '#E5E7EB', opacity: 0.6 }
              ]}
              onPress={handleGoToPayment}
              disabled={Boolean(getPaidVendorForCategory(activeQuote.category, activeQuote.id))}
              activeOpacity={getPaidVendorForCategory(activeQuote.category, activeQuote.id) ? 1 : 0.85}
            >
              <Text style={[styles.invoicePaymentBtnText, getPaidVendorForCategory(activeQuote.category, activeQuote.id) && { color: '#9CA3AF' }]}>Payment</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.invoicePaymentBtn, { backgroundColor: '#15803D' }]}
              onPress={() => { setScreen('list'); setActiveQuote(null); }}
              activeOpacity={0.85}
            >
              <Text style={styles.invoicePaymentBtnText}>Done</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Cancel Confirmation Dialog */}
        <AnimatePresence>
          {showCancelDialog && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-50 bg-black/50 flex items-center justify-center p-5"
            >
              <motion.div
                initial={{ scale: 0.88, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.88, opacity: 0 }}
                transition={{ type: 'spring', damping: 22, stiffness: 320 }}
                className="w-full max-w-xs bg-white rounded-2xl p-6 flex flex-col gap-4"
              >
                <View style={{ alignItems: 'center', gap: 8 }}>
                  <View style={styles.dialogIconCircle}>
                    <AlertTriangle size={22} color="#D97706" />
                  </View>
                  <Text style={styles.dialogTitle}>Cancel Payment?</Text>
                  <Text style={styles.dialogMessage}>
                    Are you sure you want to leave the payment process? Your quote remains available in My Quotes.
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.dialogStayBtn}
                  onPress={() => setShowCancelDialog(false)}
                  activeOpacity={0.85}
                >
                  <Text style={styles.dialogStayBtnText}>Stay</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.dialogCancelBtn}
                  onPress={handleCancelConfirm}
                  activeOpacity={0.85}
                >
                  <Text style={styles.dialogCancelBtnText}>Leave</Text>
                </TouchableOpacity>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </View>
    );
  }

  // ─── PAYMENT SCREEN ────────────────────────────────────────────────
  if (screen === 'payment' && activeQuote) {
    const isAlreadyAdvancePaid = activeQuote.paymentStatus === 'partially_paid';
    const amountToPay = getAmountToPay();

    return (
      <View style={styles.container}>
        <View style={styles.pageHeader}>
          <TouchableOpacity onPress={() => setScreen('invoice')} style={styles.backBtn}>
            <ChevronLeft size={20} color="#2A2425" />
          </TouchableOpacity>
          <Text style={styles.pageHeaderTitle}>Payment</Text>
          <View style={{ width: 36 }} />
        </View>

        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 20, paddingBottom: 120 }} showsVerticalScrollIndicator={false}>

          {/* Vendor Info */}
          <View style={styles.payVendorCard}>
            <Image source={{ uri: activeQuote.image }} style={styles.payVendorImage} />
            <View style={{ flex: 1 }}>
              <Text style={styles.payVendorName}>{activeQuote.vendorName}</Text>
              <Text style={styles.payVendorCategory}>{activeQuote.category} • {activeQuote.packageName}</Text>
            </View>
          </View>

          <View style={styles.payTotalBox}>
            <Text style={styles.payTotalLabel}>Total Invoice Amount</Text>
            <Text style={styles.payTotalAmount}>₹{activeQuote.totalAmount.toLocaleString('en-IN')}</Text>
          </View>

          <View style={styles.paySectionDivider} />

          {/* Payment Options */}
          <Text style={styles.paySectionTitle}>SELECT PAYMENT OPTION</Text>

          {!isAlreadyAdvancePaid && (
            <TouchableOpacity
              style={[styles.payOptionCard, paymentOption === 'advance' && styles.payOptionCardSelected]}
              onPress={() => setPaymentOption('advance')}
              activeOpacity={0.85}
            >
              <View style={styles.payOptionRadioRow}>
                <View style={[styles.radioOuter, paymentOption === 'advance' && styles.radioOuterSelected]}>
                  {paymentOption === 'advance' && <View style={styles.radioInner} />}
                </View>
                <Text style={styles.payOptionTitle}>Pay Advance</Text>
                <Text style={styles.payOptionAmount}>₹{activeQuote.advanceAmount.toLocaleString('en-IN')}</Text>
              </View>
              <Text style={styles.payOptionSub}>Remaining: ₹{activeQuote.remainingAmount.toLocaleString('en-IN')}</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={[styles.payOptionCard, (isAlreadyAdvancePaid || paymentOption === 'full') && styles.payOptionCardSelected]}
            onPress={() => setPaymentOption('full')}
            activeOpacity={0.85}
          >
            <View style={styles.payOptionRadioRow}>
              <View style={[styles.radioOuter, (isAlreadyAdvancePaid || paymentOption === 'full') && styles.radioOuterSelected]}>
                {(isAlreadyAdvancePaid || paymentOption === 'full') && <View style={styles.radioInner} />}
              </View>
              <Text style={styles.payOptionTitle}>
                {isAlreadyAdvancePaid ? 'Pay Remaining Balance' : 'Pay Full Amount'}
              </Text>
              <Text style={styles.payOptionAmount}>
                ₹{isAlreadyAdvancePaid
                  ? activeQuote.remainingAmount.toLocaleString('en-IN')
                  : activeQuote.totalAmount.toLocaleString('en-IN')}
              </Text>
            </View>
            <Text style={styles.payOptionSub}>
              {isAlreadyAdvancePaid ? 'Remaining: ₹0' : 'Remaining: ₹0'}
            </Text>
          </TouchableOpacity>

          {/* Amount to Pay Summary */}
          <View style={styles.amountSummaryBox}>
            <Text style={styles.amountSummaryLabel}>Amount to Pay:</Text>
            <Text style={styles.amountSummaryValue}>₹{amountToPay.toLocaleString('en-IN')}</Text>
          </View>

          <View style={styles.paySectionDivider} />

          {/* Payment Methods */}
          <Text style={styles.paySectionTitle}>SELECT PAYMENT METHOD</Text>

          {(
            [
              { key: 'upi', label: 'UPI (GPay / PhonePe / Paytm)', icon: <Smartphone size={18} color="#581420" /> },
              { key: 'card', label: 'Credit / Debit Card', icon: <CreditCard size={18} color="#581420" /> },
              { key: 'netbanking', label: 'Net Banking', icon: <Building size={18} color="#581420" /> },
            ] as { key: PaymentMethod; label: string; icon: React.ReactNode }[]
          ).map((method) => (
            <React.Fragment key={method.key}>
              <TouchableOpacity
                style={[styles.methodRow, paymentMethod === method.key && styles.methodRowSelected]}
                onPress={() => setPaymentMethod(method.key)}
                activeOpacity={0.85}
              >
                <View style={[styles.radioOuter, paymentMethod === method.key && styles.radioOuterSelected]}>
                  {paymentMethod === method.key && <View style={styles.radioInner} />}
                </View>
                <View style={styles.methodIconBox}>{method.icon}</View>
                <Text style={styles.methodLabel}>{method.label}</Text>
              </TouchableOpacity>
            </React.Fragment>
          ))}

          {/* Mock notice */}
          <View style={styles.mockNotice}>
            <ShieldCheck size={16} color="#15803D" />
            <Text style={styles.mockNoticeText}>Mock Payment Mode — No real money will be charged.</Text>
          </View>
        </ScrollView>

        {/* Pay Button */}
        <View style={styles.payBottomBar}>
          <TouchableOpacity
            style={[styles.payBtn, isProcessing && { opacity: 0.7 }]}
            onPress={handlePay}
            disabled={isProcessing}
            activeOpacity={0.85}
          >
            {isProcessing ? (
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <ActivityIndicator size="small" color="#FFFFFF" />
                <Text style={styles.payBtnText}>Processing Payment...</Text>
              </View>
            ) : (
              <Text style={styles.payBtnText}>Pay ₹{amountToPay.toLocaleString('en-IN')}</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // ─── SUCCESS SCREEN ────────────────────────────────────────────────
  if (screen === 'success' && activeQuote) {
    const isFullyPaid = successStatus === 'fully_paid';
    const remaining = isFullyPaid ? 0 : activeQuote.remainingAmount;

    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', padding: 32 }]}>
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 18, stiffness: 280 }}
          className="w-full flex flex-col items-center gap-5"
        >
          {/* Success Icon */}
          <View style={styles.successIconCircle}>
            <CheckCircle2 size={48} color="#FFFFFF" />
          </View>

          <Text style={styles.successTitle}>✓ Payment Successful</Text>

          <View style={styles.successCard}>
            <View style={styles.successRow}>
              <Text style={styles.successLabel}>Amount Paid:</Text>
              <Text style={styles.successValue}>₹{paidAmount.toLocaleString('en-IN')}</Text>
            </View>
            <View style={styles.successRow}>
              <Text style={styles.successLabel}>Payment Status:</Text>
              <Text style={[styles.successValue, { color: isFullyPaid ? '#15803D' : '#15803D' }]}>
                {isFullyPaid ? 'Fully Paid' : 'Advance Paid'}
              </Text>
            </View>
            <View style={[styles.successRow, { marginBottom: 0 }]}>
              <Text style={styles.successLabel}>Remaining:</Text>
              <Text style={[styles.successValue, { color: remaining === 0 ? '#15803D' : '#DC2626' }]}>
                ₹{remaining.toLocaleString('en-IN')}
              </Text>
            </View>
          </View>

          <Text style={styles.successVendor}>{activeQuote.vendorName}</Text>
          <Text style={styles.successSub}>Your booking is confirmed. We will notify the vendor.</Text>

          <TouchableOpacity style={styles.successDoneBtn} onPress={handleSuccessDone} activeOpacity={0.85}>
            <Text style={styles.successDoneBtnText}>Return to My Quotes</Text>
          </TouchableOpacity>
        </motion.div>
      </View>
    );
  }

  // ─── MAIN LIST SCREEN ────────────────────────────────────────────────
  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.topHeader}>
        <Text style={styles.headerTitle}>My Quotes</Text>
        <Text style={styles.headerSubtitle}>Vendor quote requests & advance payment tracking</Text>
      </View>

      {/* FILTER TABS */}
      <View style={styles.filterTabsScrollWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterTabsContainer}
        >
          {(['All', 'Requested', 'Advance Paid', 'Fully Paid'] as const).map((tab) => {
            const isActive = activeFilterTab === tab;
            return (
              <React.Fragment key={tab}>
                <TouchableOpacity
                  style={[styles.filterTabPill, isActive && styles.filterTabPillActive]}
                  onPress={() => setActiveFilterTab(tab)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.filterTabText, isActive && styles.filterTabTextActive]}>
                    {tab}
                  </Text>
                </TouchableOpacity>
              </React.Fragment>
            );
          })}
        </ScrollView>
      </View>

      {/* QUOTES LIST */}
      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {filteredQuotes.length === 0 ? (
          <View style={styles.emptyStateContainer}>
            <FileText size={44} color="#A1999A" />
            <Text style={styles.emptyTitle}>
              {quotesList.length === 0 ? 'No Quotes Yet' : 'No Matching Quotes'}
            </Text>
            <Text style={styles.emptyDesc}>
              {quotesList.length === 0
                ? "Explore services and tap 'Request Quote' on any vendor to receive and track custom quotations here."
                : `No quotes found under "${activeFilterTab}".`}
            </Text>
            {quotesList.length === 0 && onExploreVendors && (
              <TouchableOpacity
                style={styles.emptyExploreBtn}
                onPress={onExploreVendors}
                activeOpacity={0.85}
              >
                <Text style={styles.emptyExploreBtnText}>Explore Services</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          filteredQuotes.map((quote) => {
            const isLocked = Boolean(getPaidVendorForCategory(quote.category, quote.id));

            return (
              <motion.div
                key={quote.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full"
              >
                <View style={styles.quoteCard}>
                  {/* Vendor Title Row */}
                  <View style={styles.quoteCardTop}>
                    <Image source={{ uri: quote.image }} style={styles.vendorImage} />
                    <View style={{ flex: 1 }}>
                      <Text style={styles.vendorName}>{quote.vendorName}</Text>
                      <Text style={styles.categoryTag}>{quote.category} • {quote.packageName}</Text>
                    </View>
                    <Text style={styles.totalPrice}>₹{quote.totalAmount.toLocaleString('en-IN')}</Text>
                  </View>

                  {/* Status Badges */}
                  <View style={[styles.badgeRow, { gap: 8, flexWrap: 'wrap' }]}>
                    {quote.paymentStatus === 'fully_paid' ? (
                      <View style={[styles.statusPayBadge, { backgroundColor: '#DCFCE7' }]}>
                        <CheckCircle2 size={12} color="#15803D" />
                        <Text style={[styles.statusPayText, { color: '#15803D' }]}>✓ Fully Paid</Text>
                      </View>
                    ) : quote.paymentStatus === 'partially_paid' ? (
                      <View style={[styles.statusPayBadge, { backgroundColor: '#DCFCE7' }]}>
                        <CheckCircle2 size={12} color="#15803D" />
                        <Text style={[styles.statusPayText, { color: '#15803D' }]}>Advance Paid</Text>
                      </View>
                    ) : quote.status === 'confirmed' ? (
                      <>
                        <View style={[styles.statusPayBadge, { backgroundColor: '#DCFCE7' }]}>
                          <CheckCircle2 size={12} color="#15803D" />
                          <Text style={[styles.statusPayText, { color: '#15803D' }]}>✓ Quote Confirmed</Text>
                        </View>
                        <View style={[styles.statusPayBadge, { backgroundColor: '#FEF3C7' }]}>
                          <Text style={[styles.statusPayText, { color: '#B45309' }]}>Payment Pending</Text>
                        </View>
                      </>
                    ) : quote.status === 'response_ready' ? (
                      <View style={[styles.statusPayBadge, { backgroundColor: '#FEF3C7', borderColor: '#F59E0B', borderWidth: 1 }]}>
                        <Sparkles size={12} color="#D97706" />
                        <Text style={[styles.statusPayText, { color: '#B45309', fontWeight: '700' }]}>⚡ Quotation Ready</Text>
                      </View>
                    ) : quote.status === 'negotiating' ? (
                      <View style={[styles.statusPayBadge, { backgroundColor: '#FEF3C7' }]}>
                        <Clock size={12} color="#D97706" />
                        <Text style={[styles.statusPayText, { color: '#B45309' }]}>💬 Counter-Offer Sent</Text>
                      </View>
                    ) : quote.status === 'rejected' ? (
                      <View style={[styles.statusPayBadge, { backgroundColor: '#FEE2E2' }]}>
                        <Text style={[styles.statusPayText, { color: '#DC2626' }]}>✕ Rejected</Text>
                      </View>
                    ) : (
                      <View style={[styles.statusPayBadge, { backgroundColor: '#FEF3C7' }]}>
                        <Clock size={12} color="#D97706" />
                        <Text style={[styles.statusPayText, { color: '#B45309' }]}>⏳ Quote Requested</Text>
                      </View>
                    )}

                    {/* Category Lock Warning */}
                    {isLocked && quote.paymentStatus === 'pending' && (
                      <View style={[styles.statusPayBadge, { backgroundColor: '#FEE2E2', flexDirection: 'row', gap: 4, alignItems: 'center' }]}>
                        <AlertTriangle size={10} color="#DC2626" />
                        <Text style={[styles.statusPayText, { color: '#DC2626', fontSize: 10 }]}>
                          Locked (Hired: {getPaidVendorForCategory(quote.category, quote.id)})
                        </Text>
                      </View>
                    )}
                  </View>

                  {/* Payment breakdown if partially/fully paid */}
                  {quote.paymentStatus !== 'pending' && (
                    <View style={styles.payBreakdownRow}>
                      <Text style={styles.payBreakdownText}>
                        ₹{(quote.paymentStatus === 'fully_paid' ? quote.totalAmount : quote.advanceAmount).toLocaleString('en-IN')}
                        {' '}<Text style={{ color: '#9CA3AF' }}>/ ₹{quote.totalAmount.toLocaleString('en-IN')}</Text>
                      </Text>
                      {quote.paymentStatus === 'partially_paid' && (
                        <Text style={styles.payBreakdownRemaining}>
                          Remaining: ₹{quote.remainingAmount.toLocaleString('en-IN')}
                        </Text>
                      )}
                    </View>
                  )}

                  {/* Meta Details */}
                  <View style={styles.metaRow}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                      <Calendar size={13} color="#6B7280" />
                      <Text style={styles.metaLabel}>Wedding Date: <Text style={styles.metaVal}>{quote.weddingDate}</Text></Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                      <MapPin size={13} color="#6B7280" />
                      <Text style={styles.metaVal}>{quote.location}</Text>
                    </View>
                  </View>

                  {/* Action Buttons Based on Status */}
                  <View style={styles.quoteCardActions}>
                    {quote.status === 'response_ready' || quote.status === 'negotiating' || quote.status === 'rejected' ? (
                      <TouchableOpacity
                        style={styles.reviewQuoteBtn}
                        onPress={() => setReviewingQuote(quote)}
                        activeOpacity={0.85}
                      >
                        <Sparkles size={14} color="#FFFFFF" style={{ marginRight: 6 }} />
                        <Text style={styles.reviewQuoteBtnText}>
                          {quote.status === 'response_ready' ? 'Review & Accept Quote' : 'View Quotation Details'}
                        </Text>
                      </TouchableOpacity>
                    ) : quote.status === 'requested' ? (
                      <View style={styles.pendingQuoteBadge}>
                        <ActivityIndicator size="small" color="#D97706" style={{ marginRight: 8 }} />
                        <Text style={styles.pendingQuoteBadgeText}>Vendor Preparing Quote...</Text>
                      </View>
                    ) : (
                      // Confirmed or Paid Quote
                      <TouchableOpacity
                        style={[
                          styles.invoiceBtn,
                          isLocked && quote.paymentStatus === 'pending' && { backgroundColor: '#9CA3AF' },
                        ]}
                        onPress={() => openInvoice(quote)}
                        activeOpacity={0.85}
                      >
                        <FileText size={14} color="#FFFFFF" style={{ marginRight: 6 }} />
                        <Text style={styles.invoiceBtnText}>
                          {isLocked && quote.paymentStatus === 'pending' ? 'Invoice (Locked)' : 'Invoice'}
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </motion.div>
            );
          })
        )}
      </ScrollView>

      {/* MODAL REVIEW QUOTATION SCREEN */}
      {reviewingQuote && (
        <QuotationScreen
          visible={Boolean(reviewingQuote)}
          onClose={() => setReviewingQuote(null)}
          quoteStatus={reviewingQuote.status}
          setQuoteStatus={(newStatus) => {
            const updated = saveOrUpdateQuote({
              id: reviewingQuote.id,
              status: newStatus,
            });
            setQuotesList(updated);
            setReviewingQuote((prev) => (prev ? { ...prev, status: newStatus } : null));
          }}
          vendorId={reviewingQuote.vendorId || reviewingQuote.id.replace('quote-', '')}
          vendorName={reviewingQuote.vendorName}
          vendorImage={reviewingQuote.image}
          vendorLocation={reviewingQuote.location}
          startingPrice={`₹${reviewingQuote.totalAmount.toLocaleString('en-IN')}`}
          category={reviewingQuote.category}
          packageName={reviewingQuote.packageName}
          includedServices={reviewingQuote.includedServices}
          onNavigateToQuotesTab={() => setReviewingQuote(null)}
          onBack={() => setReviewingQuote(null)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#FAF7F2',
  },

  // ── HEADER ──
  topHeader: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  headerTitle: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 24,
    fontWeight: '700',
    color: '#2A2425',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#7D7571',
    marginTop: 2,
  },

  // ── PAGE HEADER (Invoice / Payment pages) ──
  pageHeader: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E8E2D9',
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EAE4DC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageHeaderTitle: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 18,
    fontWeight: '700',
    color: '#2A2425',
  },

  // ── FILTER TABS ──
  filterTabsScrollWrapper: {
    marginBottom: 16,
  },
  filterTabsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 8,
  },
  filterTabPill: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8E2D9',
    flexShrink: 0,
  },
  filterTabPillActive: {
    backgroundColor: '#581420',
    borderColor: '#581420',
  },
  filterTabText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4B5563',
    whiteSpace: 'nowrap' as any,
  },
  filterTabTextActive: {
    color: '#FFFFFF',
  },

  // ── SCROLL ──
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    gap: 14,
  },
  emptyStateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2A2425',
    marginTop: 12,
  },
  emptyDesc: {
    fontSize: 13,
    color: '#7D7571',
    marginTop: 6,
    textAlign: 'center',
    lineHeight: 18,
    maxWidth: 280,
  },
  emptyExploreBtn: {
    marginTop: 20,
    backgroundColor: '#581420',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  emptyExploreBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },

  // ── QUOTE CARD ──
  quoteCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E8E2D9',
  },
  quoteCardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 10,
  },
  vendorImage: {
    width: 52,
    height: 52,
    borderRadius: 12,
    backgroundColor: '#EAE4DC',
  },
  vendorName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2A2425',
  },
  categoryTag: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 1,
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: '800',
    color: '#581420',
  },
  badgeRow: {
    flexDirection: 'row',
    marginBottom: 8,
    flexWrap: 'wrap',
  },
  statusPayBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusPayText: {
    fontSize: 11,
    fontWeight: '700',
  },
  payBreakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  payBreakdownText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#2A2425',
  },
  payBreakdownRemaining: {
    fontSize: 11,
    color: '#DC2626',
    fontWeight: '600',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    marginBottom: 12,
  },
  metaLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  metaVal: {
    fontWeight: '600',
    color: '#1F2937',
    fontSize: 12,
  },

  // ── ACTION BUTTONS ──
  quoteCardActions: {
    marginTop: 2,
  },
  reviewQuoteBtn: {
    backgroundColor: '#10B981',
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  reviewQuoteBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  pendingQuoteBadge: {
    backgroundColor: '#FEF3C7',
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  pendingQuoteBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#B45309',
  },
  invoiceBtn: {
    backgroundColor: '#581420',
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  invoiceBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  secondaryQuoteBtn: {
    backgroundColor: '#F3EBE1',
    height: 42,
    paddingHorizontal: 16,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#D6C9BB',
  },
  secondaryQuoteBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#581420',
  },

  // ── INVOICE PAGE ──
  invoiceBrand: {
    alignItems: 'center',
    paddingVertical: 20,
    marginBottom: 4,
  },
  invoiceBrandName: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 26,
    fontWeight: '800',
    color: '#581420',
  },
  invoiceBrandSub: {
    fontSize: 13,
    color: '#7D7571',
    marginTop: 2,
    fontStyle: 'italic',
  },
  invoiceSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#EDE8E0',
  },
  invoiceSectionHeading: {
    fontSize: 11,
    fontWeight: '800',
    color: '#9CA3AF',
    letterSpacing: 1.2,
    marginBottom: 10,
  },
  invoiceVendorName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#2A2425',
    marginBottom: 10,
  },
  invoiceMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  invoiceMetaLabel: {
    fontSize: 13,
    color: '#6B7280',
  },
  invoiceMetaValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#2A2425',
  },
  invoiceDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  invoiceDetailLabel: {
    fontSize: 13,
    color: '#6B7280',
    flex: 1,
  },
  invoiceDetailValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1F2937',
    flex: 1,
    textAlign: 'right',
  },
  invoiceServiceRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 5,
  },
  invoiceServiceDot: {
    fontSize: 16,
    color: '#581420',
    lineHeight: 20,
  },
  invoiceServiceText: {
    fontSize: 13,
    color: '#374151',
    fontWeight: '500',
    flex: 1,
  },
  invoicePriceHighlight: {
    fontSize: 16,
    fontWeight: '800',
    color: '#581420',
    textAlign: 'right',
    flex: 1,
  },
  invoiceDivider: {
    height: 1,
    backgroundColor: '#EDE8E0',
    marginVertical: 4,
  },
  invoiceTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#EDE8E0',
  },
  invoiceTotalLabel: {
    fontSize: 15,
    fontWeight: '800',
    color: '#2A2425',
    letterSpacing: 0.5,
  },
  invoiceTotalValue: {
    fontSize: 22,
    fontWeight: '900',
    color: '#581420',
  },
  invoicePayStatusPill: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  invoicePayStatusText: {
    fontSize: 13,
    fontWeight: '800',
  },
  invoiceFooterNote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#F0FDF4',
    borderRadius: 10,
    padding: 12,
    marginTop: 4,
  },
  invoiceFooterText: {
    fontSize: 11,
    color: '#15803D',
    flex: 1,
  },

  // ── INVOICE STICKY BOTTOM ──
  invoiceBottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    gap: 12,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E8E2D9',
  },
  invoiceCancelBtn: {
    flex: 1,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3EBE1',
    borderWidth: 1,
    borderColor: '#D6C9BB',
  },
  invoiceCancelBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#4B5563',
  },
  invoicePaymentBtn: {
    flex: 1,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#581420',
  },
  invoicePaymentBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  // ── CANCEL DIALOG ──
  dialogIconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  dialogTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#2A2425',
    textAlign: 'center',
  },
  dialogMessage: {
    fontSize: 13,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 19,
  },
  dialogStayBtn: {
    height: 44,
    borderRadius: 22,
    backgroundColor: '#581420',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dialogStayBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  dialogCancelBtn: {
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F3EBE1',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#D6C9BB',
  },
  dialogCancelBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4B5563',
  },

  // ── PAYMENT PAGE ──
  payVendorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#EDE8E0',
  },
  payVendorImage: {
    width: 52,
    height: 52,
    borderRadius: 12,
    backgroundColor: '#EAE4DC',
  },
  payVendorName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2A2425',
  },
  payVendorCategory: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  payTotalBox: {
    backgroundColor: '#581420',
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  payTotalLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.75)',
    marginBottom: 4,
    fontWeight: '600',
  },
  payTotalAmount: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  paySectionDivider: {
    height: 1,
    backgroundColor: '#EDE8E0',
    marginVertical: 16,
  },
  paySectionTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#9CA3AF',
    letterSpacing: 1.1,
    marginBottom: 12,
  },
  payOptionCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E8E2D9',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
  },
  payOptionCardSelected: {
    borderColor: '#581420',
    backgroundColor: '#FDF8F3',
  },
  payOptionRadioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#D1C5BA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterSelected: {
    borderColor: '#581420',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#581420',
  },
  payOptionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2A2425',
    flex: 1,
  },
  payOptionAmount: {
    fontSize: 15,
    fontWeight: '800',
    color: '#581420',
  },
  payOptionSub: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 5,
    marginLeft: 30,
  },
  amountSummaryBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8F1E5',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E8DFD0',
    marginTop: 4,
  },
  amountSummaryLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4B5563',
  },
  amountSummaryValue: {
    fontSize: 18,
    fontWeight: '900',
    color: '#581420',
  },
  methodRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E8E2D9',
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
  },
  methodRowSelected: {
    borderColor: '#581420',
    backgroundColor: '#FDF8F3',
  },
  methodIconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#F5ECE3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  methodLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2A2425',
    flex: 1,
  },
  mockNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#F0FDF4',
    borderRadius: 10,
    padding: 12,
    marginTop: 8,
  },
  mockNoticeText: {
    fontSize: 11,
    color: '#15803D',
    flex: 1,
  },
  payBottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E8E2D9',
  },
  payBtn: {
    height: 50,
    borderRadius: 25,
    backgroundColor: '#581420',
    alignItems: 'center',
    justifyContent: 'center',
  },
  payBtnText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  // ── SUCCESS SCREEN ──
  successIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#15803D',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  successTitle: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 26,
    fontWeight: '700',
    color: '#2A2425',
    textAlign: 'center',
  },
  successCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    width: '100%',
    borderWidth: 1,
    borderColor: '#E8E2D9',
    gap: 8,
  },
  successRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  successLabel: {
    fontSize: 13,
    color: '#6B7280',
  },
  successValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2A2425',
  },
  successVendor: {
    fontSize: 15,
    fontWeight: '700',
    color: '#581420',
    textAlign: 'center',
  },
  successSub: {
    fontSize: 12,
    color: '#7D7571',
    textAlign: 'center',
    lineHeight: 17,
  },
  successDoneBtn: {
    height: 48,
    borderRadius: 24,
    backgroundColor: '#581420',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 8,
  },
  successDoneBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  alternativePaidWarning: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFEDD5',
    borderColor: '#F97316',
    borderWidth: 1,
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
    gap: 8,
  },
  alternativePaidWarningText: {
    fontSize: 12,
    color: '#9A3412',
    flex: 1,
    lineHeight: 16,
  },
});
