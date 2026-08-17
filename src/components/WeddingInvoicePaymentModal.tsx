import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ChevronLeft,
  FileText,
  CheckCircle2,
  Lock,
  Clock,
  CreditCard,
  Building2,
  Smartphone,
  ShieldCheck,
  Calendar,
  Sparkles,
  ArrowRight,
  ChevronRight,
  DollarSign,
  Receipt,
  Check,
} from 'lucide-react';
import {
  WeddingVendorBooking,
  WeddingMilestone,
  getWeddingBookingByVendorId,
  saveOrUpdateWeddingBooking,
  payWeddingMilestone,
} from '../utils/weddingPaymentsManager';

interface WeddingInvoicePaymentModalProps {
  visible: boolean;
  onClose: () => void;
  vendorId: string;
  vendorName: string;
  vendorImage?: string;
  vendorLocation?: string;
  category?: string;
  startingPrice?: string;
  bookingSource?: 'entire_wedding' | 'individual';
  onNavigateToMyWeddingPayments?: () => void;
  onNavigateToProfileMyBookings?: () => void;
}

type Step = 'invoice' | 'payment_method' | 'success';
type PaymentMethod = 'upi' | 'card' | 'netbanking';

export const WeddingInvoicePaymentModal: React.FC<WeddingInvoicePaymentModalProps> = ({
  visible,
  onClose,
  vendorId,
  vendorName,
  vendorImage,
  vendorLocation,
  category = 'Photography',
  startingPrice = '₹90,000',
  bookingSource = 'entire_wedding',
  onNavigateToMyWeddingPayments,
  onNavigateToProfileMyBookings,
}) => {
  const [step, setStep] = useState<Step>('invoice');
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('upi');
  const [upiOption, setUpiOption] = useState<'gpay' | 'phonepe' | 'paytm'>('gpay');
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastPaidMilestone, setLastPaidMilestone] = useState<WeddingMilestone | null>(null);

  const [booking, setBooking] = useState<WeddingVendorBooking | null>(() => {
    let b = getWeddingBookingByVendorId(vendorId);
    if (!b) {
      const basePrice = parseInt((startingPrice || '₹90,000').replace(/[^0-9]/g, ''), 10) || 90000;
      b = saveOrUpdateWeddingBooking({
        vendorId,
        vendorName,
        category,
        image: vendorImage,
        location: vendorLocation,
        totalAmount: basePrice,
        status: 'confirmed',
        bookingSource,
      });
    } else if (bookingSource && b.bookingSource !== bookingSource) {
      b = saveOrUpdateWeddingBooking({
        ...b,
        bookingSource,
      });
    }
    return b;
  });

  useEffect(() => {
    if (visible) {
      setStep('invoice');
      let b = getWeddingBookingByVendorId(vendorId);
      if (!b) {
        const basePrice = parseInt((startingPrice || '₹90,000').replace(/[^0-9]/g, ''), 10) || 90000;
        b = saveOrUpdateWeddingBooking({
          vendorId,
          vendorName,
          category,
          image: vendorImage,
          location: vendorLocation,
          status: 'confirmed',
        });
      }
      setBooking(b);
    }
  }, [visible, vendorId, vendorName, vendorImage, vendorLocation, category, startingPrice]);

  useEffect(() => {
    const handleUpdate = () => {
      const b = getWeddingBookingByVendorId(vendorId);
      if (b) setBooking(b);
    };
    window.addEventListener('tot_wedding_payments_updated', handleUpdate);
    return () => window.removeEventListener('tot_wedding_payments_updated', handleUpdate);
  }, [vendorId]);

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

  if (!visible || !booking) return null;

  const nextPendingMilestone = booking.milestones.find((m) => m.status === 'pending');
  const isFullyPaid = booking.status === 'fully_paid' || booking.remainingAmount === 0;

  const handleProcessPayment = () => {
    if (!nextPendingMilestone) return;

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const updated = payWeddingMilestone(
        booking.vendorId,
        nextPendingMilestone.id,
        selectedMethod.toUpperCase()
      );
      if (updated) {
        setBooking(updated);
        const settled = updated.milestones.find((m) => m.id === nextPendingMilestone.id);
        setLastPaidMilestone(settled || nextPendingMilestone);
      }
      setStep('success');
    }, 1800);
  };

  const handleGoToMyWedding = () => {
    onClose();
    if (bookingSource === 'individual') {
      if (onNavigateToProfileMyBookings) {
        onNavigateToProfileMyBookings();
      } else {
        window.dispatchEvent(
          new CustomEvent('tot_switch_to_profile_my_bookings', { detail: { vendorId: booking?.vendorId } })
        );
      }
    } else {
      if (onNavigateToMyWeddingPayments) {
        onNavigateToMyWeddingPayments();
      } else {
        window.dispatchEvent(
          new CustomEvent('tot_switch_to_my_wedding_payments', { detail: { vendorId: booking?.vendorId } })
        );
      }
    }
  };

  return (
    <View style={styles.modalFullContainer}>
      {/* HEADER */}
      <View style={styles.modalHeaderNav}>
        <TouchableOpacity
          onPress={step === 'payment_method' ? () => setStep('invoice') : onClose}
          style={styles.modalCloseBtn}
          activeOpacity={0.7}
        >
          <ChevronLeft className="w-5 h-5 text-[#2A2425]" />
        </TouchableOpacity>

        <View style={{ alignItems: 'center', flex: 1, paddingHorizontal: 8 }}>
          <Text style={styles.modalHeaderTitle}>
            {step === 'invoice'
              ? 'Invoice & Milestones'
              : step === 'payment_method'
              ? 'Choose Payment Method'
              : 'Payment Successful'}
          </Text>
          <Text style={styles.modalHeaderSubtitle} numberOfLines={1}>
            {booking.vendorName} • {booking.serviceType}
          </Text>
        </View>

        <TouchableOpacity onPress={onClose} style={styles.modalCloseBtn} activeOpacity={0.7}>
          <X className="w-5 h-5 text-[#2A2425]" />
        </TouchableOpacity>
      </View>

      {/* BODY */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.modalScrollContent}
        showsVerticalScrollIndicator={false}
      >
            {/* ================= STEP 1: INVOICE & 3 MILESTONES ================= */}
            {step === 'invoice' && (
              <View style={{ gap: 14 }}>
                {/* Official Invoice Brand Box */}
                <View style={styles.invoiceHeroCard}>
                  <View style={styles.invoiceBrandRow}>
                    <View style={{ flex: 1, marginRight: 8 }}>
                      <Text style={styles.brandTitle}>Tale of Two</Text>
                      <Text style={styles.brandSubtitle}>Wedding Services Official Invoice</Text>
                    </View>
                    <View style={styles.invoiceNumberBadge}>
                      <Text style={styles.invoiceNumberText}>{booking.invoiceNo}</Text>
                    </View>
                  </View>

                  <View style={styles.cardDivider} />

                  <View style={styles.metaGrid}>
                    <View style={styles.metaCol}>
                      <Text style={styles.metaLabel}>Invoice Date</Text>
                      <Text style={styles.metaValue}>{booking.invoiceDate}</Text>
                    </View>
                    <View style={styles.metaCol}>
                      <Text style={styles.metaLabel}>Event Date</Text>
                      <Text style={styles.metaValue}>{booking.weddingDate}</Text>
                    </View>
                    <View style={styles.metaCol}>
                      <Text style={styles.metaLabel}>Total Package</Text>
                      <Text style={[styles.metaValue, { color: '#581420', fontWeight: '800' }]}>
                        ₹{booking.totalAmount.toLocaleString('en-IN')}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Paid vs Remaining Progress */}
                <View style={styles.summaryRowCard}>
                  <View style={styles.summaryCol}>
                    <Text style={styles.summaryLabel}>Total Paid</Text>
                    <Text style={[styles.summaryVal, { color: '#15803D' }]}>
                      ₹{booking.paidAmount.toLocaleString('en-IN')}
                    </Text>
                  </View>
                  <View style={styles.summaryDividerV} />
                  <View style={styles.summaryCol}>
                    <Text style={styles.summaryLabel}>Remaining Balance</Text>
                    <Text
                      style={[
                        styles.summaryVal,
                        { color: isFullyPaid ? '#15803D' : '#581420' },
                      ]}
                    >
                      ₹{booking.remainingAmount.toLocaleString('en-IN')}
                    </Text>
                  </View>
                </View>

                {/* 3 Milestones Section */}
                <View style={styles.milestonesCard}>
                  <View style={styles.milestonesHeader}>
                    <Text style={styles.sectionHeaderTitle}>3 PAYMENT MILESTONES</Text>
                    <Text style={styles.milestonesSubNote}>
                      {booking.milestones.filter((m) => m.status === 'paid').length} of 3 Settled
                    </Text>
                  </View>

                  <View style={{ gap: 10, marginTop: 10 }}>
                    {booking.milestones.map((m) => {
                      const isPaid = m.status === 'paid';
                      const isNext = m.status === 'pending';
                      const isLocked = m.status === 'locked';

                      return (
                        <View
                          key={m.id}
                          style={[
                            styles.milestoneBox,
                            isPaid && styles.milestoneBoxPaid,
                            isNext && styles.milestoneBoxNext,
                            isLocked && styles.milestoneBoxLocked,
                          ]}
                        >
                          <View style={styles.milestoneTopRow}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1, marginRight: 8 }}>
                              {isPaid ? (
                                <View style={styles.badgePaidCircle}>
                                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                                </View>
                              ) : isNext ? (
                                <View style={styles.badgeNextCircle}>
                                  <Clock className="w-4 h-4 text-amber-700" />
                                </View>
                              ) : (
                                <View style={styles.badgeLockedCircle}>
                                  <Lock className="w-3.5 h-3.5 text-stone-400" />
                                </View>
                              )}
                              <View style={{ flex: 1 }}>
                                <Text style={styles.milestoneNumText}>
                                  Milestone {m.milestoneNumber} ({m.percentage}%)
                                </Text>
                                <Text style={styles.milestoneTitleText}>{m.title}</Text>
                              </View>
                            </View>

                            <View style={{ alignItems: 'flex-end', flexShrink: 0 }}>
                              <Text style={styles.milestoneAmountText}>
                                ₹{m.amount.toLocaleString('en-IN')}
                              </Text>
                              <Text
                                style={[
                                  styles.milestoneStatusTag,
                                  isPaid && styles.tagPaid,
                                  isNext && styles.tagNext,
                                  isLocked && styles.tagLocked,
                                ]}
                              >
                                {isPaid ? '✓ Paid' : isNext ? '● Due Now' : 'Locked'}
                              </Text>
                            </View>
                          </View>

                          {isPaid && m.paidAt && (
                            <View style={styles.paidTxnRow}>
                              <Text style={styles.paidTxnText}>
                                Paid on {m.paidAt} via {m.paymentMethod || 'UPI'} • Ref: {m.transactionRef}
                              </Text>
                            </View>
                          )}
                        </View>
                      );
                    })}
                  </View>
                </View>

                {/* Included Services Accordion/Box */}
                <View style={styles.includedCard}>
                  <Text style={styles.sectionHeaderTitle}>PACKAGE DELIVERABLES</Text>
                  <View style={{ gap: 6, marginTop: 8 }}>
                    {booking.includedServices.map((srv, idx) => (
                      <View key={idx} style={styles.serviceItemRow}>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                        <Text style={styles.serviceItemText}>{srv}</Text>
                      </View>
                    ))}
                  </View>
                </View>

                {/* Security Banner */}
                <View style={styles.escrowBanner}>
                  <ShieldCheck className="w-4 h-4 text-emerald-800 shrink-0" />
                  <Text style={styles.escrowText}>
                    Tale of Two Escrow: Funds released to vendor after milestone verification.
                  </Text>
                </View>
              </View>
            )}

            {/* ================= STEP 2: PAYMENT METHOD SELECTOR ================= */}
            {step === 'payment_method' && nextPendingMilestone && (
              <View style={{ gap: 14 }}>
                {/* Milestone Summary Header */}
                <View style={styles.payTargetCard}>
                  <Text style={styles.payTargetSubtitle}>
                    Settling Milestone {nextPendingMilestone.milestoneNumber} ({nextPendingMilestone.percentage}%)
                  </Text>
                  <Text style={styles.payTargetTitle}>{nextPendingMilestone.title}</Text>
                  <View style={styles.cardDivider} />
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={styles.payTargetAmountLabel}>Amount Due:</Text>
                    <Text style={styles.payTargetAmountVal}>
                      ₹{nextPendingMilestone.amount.toLocaleString('en-IN')}
                    </Text>
                  </View>
                </View>

                {/* Option 1: UPI */}
                <TouchableOpacity
                  style={[
                    styles.methodOptionCard,
                    selectedMethod === 'upi' && styles.methodOptionCardActive,
                  ]}
                  onPress={() => setSelectedMethod('upi')}
                  activeOpacity={0.88}
                >
                  <View style={styles.methodRadioRow}>
                    <View
                      style={[
                        styles.radioCircle,
                        selectedMethod === 'upi' && styles.radioCircleActive,
                      ]}
                    >
                      {selectedMethod === 'upi' && <View style={styles.radioInnerDot} />}
                    </View>
                    <Smartphone className="w-4 h-4 text-[#581420]" />
                    <View style={{ flex: 1 }}>
                      <Text style={styles.methodTitle}>UPI (Instant Payment)</Text>
                      <Text style={styles.methodDesc}>Google Pay, PhonePe, Paytm, QR</Text>
                    </View>
                  </View>

                  {selectedMethod === 'upi' && (
                    <View style={styles.upiAppsRow}>
                      <TouchableOpacity
                        style={[styles.upiAppBtn, upiOption === 'gpay' && styles.upiAppBtnActive]}
                        onPress={() => setUpiOption('gpay')}
                      >
                        <Text style={[styles.upiAppText, upiOption === 'gpay' && styles.upiAppTextActive]}>
                          Google Pay
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[styles.upiAppBtn, upiOption === 'phonepe' && styles.upiAppBtnActive]}
                        onPress={() => setUpiOption('phonepe')}
                      >
                        <Text style={[styles.upiAppText, upiOption === 'phonepe' && styles.upiAppTextActive]}>
                          PhonePe
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[styles.upiAppBtn, upiOption === 'paytm' && styles.upiAppBtnActive]}
                        onPress={() => setUpiOption('paytm')}
                      >
                        <Text style={[styles.upiAppText, upiOption === 'paytm' && styles.upiAppTextActive]}>
                          Paytm
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </TouchableOpacity>

                {/* Option 2: Cards */}
                <TouchableOpacity
                  style={[
                    styles.methodOptionCard,
                    selectedMethod === 'card' && styles.methodOptionCardActive,
                  ]}
                  onPress={() => setSelectedMethod('card')}
                  activeOpacity={0.88}
                >
                  <View style={styles.methodRadioRow}>
                    <View
                      style={[
                        styles.radioCircle,
                        selectedMethod === 'card' && styles.radioCircleActive,
                      ]}
                    >
                      {selectedMethod === 'card' && <View style={styles.radioInnerDot} />}
                    </View>
                    <CreditCard className="w-4 h-4 text-[#581420]" />
                    <View style={{ flex: 1 }}>
                      <Text style={styles.methodTitle}>Credit / Debit Card</Text>
                      <Text style={styles.methodDesc}>Visa, MasterCard, RuPay</Text>
                    </View>
                  </View>
                </TouchableOpacity>

                {/* Option 3: Net Banking */}
                <TouchableOpacity
                  style={[
                    styles.methodOptionCard,
                    selectedMethod === 'netbanking' && styles.methodOptionCardActive,
                  ]}
                  onPress={() => setSelectedMethod('netbanking')}
                  activeOpacity={0.88}
                >
                  <View style={styles.methodRadioRow}>
                    <View
                      style={[
                        styles.radioCircle,
                        selectedMethod === 'netbanking' && styles.radioCircleActive,
                      ]}
                    >
                      {selectedMethod === 'netbanking' && <View style={styles.radioInnerDot} />}
                    </View>
                    <Building2 className="w-4 h-4 text-[#581420]" />
                    <View style={{ flex: 1 }}>
                      <Text style={styles.methodTitle}>Net Banking</Text>
                      <Text style={styles.methodDesc}>HDFC, ICICI, SBI, Axis Bank</Text>
                    </View>
                  </View>
                </TouchableOpacity>

                {/* Mock notice */}
                <View style={styles.mockNoticeBox}>
                  <ShieldCheck className="w-4 h-4 text-emerald-800" />
                  <Text style={styles.mockNoticeText}>
                    Mock Sandbox Mode: No real funds will be charged.
                  </Text>
                </View>
              </View>
            )}

            {/* ================= STEP 3: PAYMENT SUCCESSFUL ================= */}
            {step === 'success' && lastPaidMilestone && (
              <View style={{ alignItems: 'center', gap: 14, paddingVertical: 10 }}>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 15, stiffness: 220 }}
                  style={styles.successTickCircle}
                >
                  <Check className="w-10 h-10 text-white" strokeWidth={3} />
                </motion.div>

                <Text style={styles.successHeaderTitle}>Payment Successful!</Text>
                <Text style={styles.successHeaderSubtitle}>
                  Milestone {lastPaidMilestone.milestoneNumber} settled successfully.
                </Text>

                <View style={styles.receiptCard}>
                  <View style={styles.receiptRow}>
                    <Text style={styles.receiptLabel}>Vendor</Text>
                    <Text style={styles.receiptVal}>{booking.vendorName}</Text>
                  </View>
                  <View style={styles.receiptRow}>
                    <Text style={styles.receiptLabel}>Amount Paid</Text>
                    <Text style={[styles.receiptVal, { color: '#15803D', fontWeight: '800' }]}>
                      ₹{lastPaidMilestone.amount.toLocaleString('en-IN')}
                    </Text>
                  </View>
                  <View style={styles.receiptRow}>
                    <Text style={styles.receiptLabel}>Transaction Ref</Text>
                    <Text style={styles.receiptVal}>{lastPaidMilestone.transactionRef || 'TXN-768192'}</Text>
                  </View>
                  <View style={styles.receiptRow}>
                    <Text style={styles.receiptLabel}>Remaining Balance</Text>
                    <Text style={[styles.receiptVal, { color: isFullyPaid ? '#15803D' : '#581420' }]}>
                      ₹{booking.remainingAmount.toLocaleString('en-IN')}
                    </Text>
                  </View>
                </View>

                {isFullyPaid && (
                  <View style={styles.allDoneBox}>
                    <Sparkles className="w-4 h-4 text-emerald-800" />
                    <Text style={styles.allDoneText}>All 3 milestones fully settled!</Text>
                  </View>
                )}
              </View>
            )}
          </ScrollView>

          {/* FIXED BOTTOM ACTION BAR */}
          <View style={styles.fixedBottomBar}>
            {step === 'invoice' && (
              <View style={{ flexDirection: 'row', gap: 10, width: '100%' }}>
                {/* Cancel Button */}
                <TouchableOpacity style={styles.cancelBtn} onPress={onClose} activeOpacity={0.8}>
                  <Text style={styles.cancelBtnText}>Cancel</Text>
                </TouchableOpacity>

                {/* Payment / Done Button */}
                {!isFullyPaid && nextPendingMilestone ? (
                  <TouchableOpacity
                    style={styles.paymentPrimaryBtn}
                    onPress={() => setStep('payment_method')}
                    activeOpacity={0.88}
                  >
                    <CreditCard className="w-4 h-4 text-white shrink-0" />
                    <Text style={styles.paymentPrimaryBtnText} numberOfLines={1}>
                      Pay Milestone {nextPendingMilestone.milestoneNumber} (₹
                      {nextPendingMilestone.amount.toLocaleString('en-IN')})
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={[styles.paymentPrimaryBtn, { backgroundColor: '#15803D' }]}
                    onPress={onClose}
                    activeOpacity={0.88}
                  >
                    <CheckCircle2 className="w-4 h-4 text-white" />
                    <Text style={styles.paymentPrimaryBtnText}>Fully Paid • Done</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}

            {step === 'payment_method' && (
              <View style={{ flexDirection: 'row', gap: 10, width: '100%' }}>
                <TouchableOpacity
                  style={styles.cancelBtn}
                  onPress={() => setStep('invoice')}
                  disabled={isProcessing}
                  activeOpacity={0.8}
                >
                  <Text style={styles.cancelBtnText}>Back</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.paymentPrimaryBtn, isProcessing && { opacity: 0.75 }]}
                  onPress={handleProcessPayment}
                  disabled={isProcessing}
                  activeOpacity={0.88}
                >
                  {isProcessing ? (
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                      <ActivityIndicator size="small" color="#FFFFFF" />
                      <Text style={styles.paymentPrimaryBtnText}>Processing Payment...</Text>
                    </View>
                  ) : (
                    <>
                      <Text style={styles.paymentPrimaryBtnText}>
                        Pay ₹{nextPendingMilestone?.amount.toLocaleString('en-IN')}
                      </Text>
                      <ArrowRight className="w-4 h-4 text-white" />
                    </>
                  )}
                </TouchableOpacity>
              </View>
            )}

            {step === 'success' && (
              <View style={{ width: '100%' }}>
                <TouchableOpacity
                  style={styles.viewMyWeddingBtn}
                  onPress={handleGoToMyWedding}
                  activeOpacity={0.88}
                >
                  <Text style={styles.viewMyWeddingBtnText}>
                    {bookingSource === 'individual'
                      ? 'View My Bookings'
                      : 'View My Wedding (Payment)'}
                  </Text>
                  <ArrowRight className="w-4 h-4 text-white" />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      );
    };

  const styles = StyleSheet.create({
    modalFullContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: '#FAF7F2',
      zIndex: 120,
      display: 'flex',
      flexDirection: 'column',
    },
    modalHeaderNav: {
      height: 58,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#E8E2D9',
      backgroundColor: '#FAF7F2',
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
      fontFamily: "'Cormorant Garamond', Georgia, serif",
      fontSize: 16.5,
      fontWeight: '700',
      color: '#2A2425',
      textAlign: 'center',
    },
    modalHeaderSubtitle: {
      fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
      fontSize: 11,
      color: '#7A7273',
      textAlign: 'center',
    },
    fixedBottomBar: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: '#FFFFFF',
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderTopWidth: 1,
      borderTopColor: '#E8E2D9',
      boxShadow: '0 -4px 12px rgba(0,0,0,0.06)',
      zIndex: 20,
    },
    modalScrollContent: {
      padding: 16,
      paddingBottom: 110,
    },
  invoiceHeroCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#EFE7DC',
    boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
  },
  invoiceBrandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brandTitle: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 20,
    fontWeight: '700',
    color: '#581420',
  },
  brandSubtitle: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 10.5,
    color: '#7A7273',
  },
  invoiceNumberBadge: {
    backgroundColor: '#F7EFF1',
    borderWidth: 1,
    borderColor: '#EBDCE0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    flexShrink: 0,
  },
  invoiceNumberText: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 11,
    fontWeight: '700',
    color: '#581420',
  },
  cardDivider: {
    height: 1,
    backgroundColor: '#EFE7DC',
    marginVertical: 12,
  },
  metaGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  metaCol: {
    flex: 1,
    gap: 2,
  },
  metaLabel: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 10,
    color: '#8C8283',
    textTransform: 'uppercase',
  },
  metaValue: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 11.5,
    fontWeight: '600',
    color: '#2A2425',
  },
  summaryRowCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#EFE7DC',
  },
  summaryCol: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
  },
  summaryDividerV: {
    width: 1,
    backgroundColor: '#EFE7DC',
  },
  summaryLabel: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 10.5,
    color: '#7A7273',
  },
  summaryVal: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 15,
    fontWeight: '700',
  },
  milestonesCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#EFE7DC',
  },
  milestonesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionHeaderTitle: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 11,
    fontWeight: '700',
    color: '#581420',
    letterSpacing: 0.6,
  },
  milestonesSubNote: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 11,
    fontWeight: '600',
    color: '#15803D',
  },
  milestoneBox: {
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#EFE7DC',
    backgroundColor: '#FAF7F2',
    overflow: 'hidden',
  },
  milestoneBoxPaid: {
    backgroundColor: '#F0FDF4',
    borderColor: '#BBF7D0',
  },
  milestoneBoxNext: {
    backgroundColor: '#FFFBEB',
    borderColor: '#FDE68A',
    borderWidth: 1.5,
  },
  milestoneBoxLocked: {
    backgroundColor: '#F9F8F6',
    borderColor: '#EBE5DC',
    opacity: 0.75,
  },
  milestoneTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  badgePaidCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#DCFCE7',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  badgeNextCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  badgeLockedCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#EAE5DC',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  milestoneNumText: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 10,
    fontWeight: '600',
    color: '#7A7273',
  },
  milestoneTitleText: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 11.5,
    fontWeight: '700',
    color: '#2A2425',
    lineHeight: 15,
  },
  milestoneAmountText: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 13,
    fontWeight: '800',
    color: '#2A2425',
  },
  milestoneStatusTag: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 10,
    fontWeight: '700',
    marginTop: 2,
  },
  tagPaid: {
    color: '#15803D',
  },
  tagNext: {
    color: '#B45309',
  },
  tagLocked: {
    color: '#9CA3AF',
  },
  paidTxnRow: {
    marginTop: 6,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: '#DCFCE7',
  },
  paidTxnText: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 10,
    color: '#166534',
  },
  includedCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#EFE7DC',
  },
  serviceItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  serviceItemText: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 11.5,
    color: '#524345',
    flex: 1,
  },
  escrowBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#BBF7D0',
    padding: 10,
    borderRadius: 12,
  },
  escrowText: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 11,
    color: '#166534',
    flex: 1,
  },
  payTargetCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#EFE7DC',
  },
  payTargetSubtitle: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 11,
    fontWeight: '600',
    color: '#581420',
  },
  payTargetTitle: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 14,
    fontWeight: '700',
    color: '#2A2425',
    marginTop: 2,
  },
  payTargetAmountLabel: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 12,
    color: '#7A7273',
  },
  payTargetAmountVal: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 18,
    fontWeight: '800',
    color: '#15803D',
  },
  methodOptionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#EFE7DC',
  },
  methodOptionCardActive: {
    borderColor: '#581420',
    backgroundColor: '#FAF5F1',
  },
  methodRadioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  radioCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: '#C4B5A5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCircleActive: {
    borderColor: '#581420',
  },
  radioInnerDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#581420',
  },
  methodTitle: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 13,
    fontWeight: '700',
    color: '#2A2425',
  },
  methodDesc: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 11,
    color: '#7A7273',
  },
  upiAppsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#EFE7DC',
  },
  upiAppBtn: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#FAF7F2',
    borderWidth: 1,
    borderColor: '#E2DDD5',
  },
  upiAppBtnActive: {
    backgroundColor: '#581420',
    borderColor: '#581420',
  },
  upiAppText: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 11,
    fontWeight: '600',
    color: '#581420',
  },
  upiAppTextActive: {
    color: '#FFFFFF',
  },
  mockNoticeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F0FDF4',
    padding: 10,
    borderRadius: 10,
  },
  mockNoticeText: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 11,
    color: '#166534',
  },
  successTickCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#15803D',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 14px rgba(21, 128, 61, 0.3)',
  },
  successHeaderTitle: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 24,
    fontWeight: '700',
    color: '#15803D',
  },
  successHeaderSubtitle: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 12,
    color: '#635B5C',
  },
  receiptCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#EFE7DC',
    gap: 8,
  },
  receiptRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  receiptLabel: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 11.5,
    color: '#7A7273',
  },
  receiptVal: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 12,
    fontWeight: '600',
    color: '#2A2425',
  },
  allDoneBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  allDoneText: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 12,
    fontWeight: '700',
    color: '#15803D',
  },
  modalBottomBar: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#EFE7DC',
  },
  cancelBtn: {
    flex: 1,
    height: 46,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D4C9BD',
    backgroundColor: '#FAF7F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelBtnText: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 13,
    fontWeight: '700',
    color: '#635B5C',
  },
  paymentPrimaryBtn: {
    flex: 2,
    height: 46,
    borderRadius: 12,
    backgroundColor: '#581420',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    boxShadow: '0 3px 10px rgba(88, 20, 32, 0.25)',
  },
  paymentPrimaryBtnText: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 12.5,
    fontWeight: '700',
    color: '#FFFFFF',
    flexShrink: 1,
  },
  viewMyWeddingBtn: {
    height: 48,
    borderRadius: 14,
    backgroundColor: '#581420',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    boxShadow: '0 4px 12px rgba(88, 20, 32, 0.25)',
  },
  viewMyWeddingBtnText: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
