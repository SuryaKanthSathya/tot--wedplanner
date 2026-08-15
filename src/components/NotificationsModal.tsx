import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native-web';
import {
  Bell,
  X,
  FileText,
  MessageCircle,
  Sparkles,
  ShieldCheck,
  CheckCheck,
  ChevronRight,
  Trash2,
  Building2,
  DollarSign,
  ArrowRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import {
  AppNotification,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  clearAllNotifications,
} from '../utils/notificationsManager';

interface NotificationsModalProps {
  visible: boolean;
  onClose: () => void;
  notifications: AppNotification[];
  onOpenInvoice?: (actionData: AppNotification['actionData']) => void;
  onOpenQuote?: (actionData: AppNotification['actionData']) => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  visible,
  onClose,
  notifications,
  onOpenInvoice,
  onOpenQuote,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'invoice' | 'message' | 'quote'>('all');
  const [selectedNotification, setSelectedNotification] = useState<AppNotification | null>(null);

  if (!visible) return null;

  const filteredList = notifications.filter((n) => {
    if (activeFilter === 'all') return true;
    return n.type === activeFilter;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleNotificationClick = (item: AppNotification) => {
    markNotificationAsRead(item.id);
    setSelectedNotification(item);
  };

  const handleActionClick = (item: AppNotification) => {
    markNotificationAsRead(item.id);
    if (item.actionType === 'view_invoice' && onOpenInvoice) {
      onClose();
      onOpenInvoice(item.actionData);
    } else if (item.actionType === 'view_quote' && onOpenQuote) {
      onClose();
      onOpenQuote(item.actionData);
    } else {
      setSelectedNotification(item);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-xs p-0 sm:p-4">
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 26, stiffness: 320 }}
          className="w-full max-w-md bg-[#FAF7F2] rounded-t-3xl sm:rounded-2xl border border-stone-200 shadow-2xl flex flex-col max-h-[85vh] overflow-hidden"
          style={{ height: '80vh' }}
        >
          {/* Header */}
          <View style={styles.headerContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <View style={styles.headerIconCircle}>
                <Bell className="w-5 h-5 text-[#581420]" />
              </View>
              <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <Text style={styles.headerTitle}>Notifications</Text>
                  {unreadCount > 0 && (
                    <View style={styles.unreadBadge}>
                      <Text style={styles.unreadBadgeText}>{unreadCount} New</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.headerSubtitle}>Admin invoices, vendor replies & updates</Text>
              </View>
            </View>

            <TouchableOpacity onPress={onClose} style={styles.closeBtn} activeOpacity={0.7}>
              <X className="w-5 h-5 text-stone-600" />
            </TouchableOpacity>
          </View>

          {/* Quick Action Bar (Mark all as read / Clear) */}
          <View style={styles.quickActionsBar}>
            {/* Filter Tabs */}
            <View style={styles.filterChipsRow}>
              {(['all', 'invoice', 'message', 'quote'] as const).map((filterKey) => (
                <TouchableOpacity
                  key={filterKey}
                  style={[
                    styles.filterChip,
                    activeFilter === filterKey && styles.filterChipActive,
                  ]}
                  onPress={() => setActiveFilter(filterKey)}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      styles.filterChipText,
                      activeFilter === filterKey && styles.filterChipTextActive,
                    ]}
                  >
                    {filterKey === 'all'
                      ? 'All'
                      : filterKey === 'invoice'
                      ? 'Invoices'
                      : filterKey === 'message'
                      ? 'Messages'
                      : 'Quotes'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {unreadCount > 0 && (
              <TouchableOpacity
                style={styles.markAllReadBtn}
                onPress={markAllNotificationsAsRead}
                activeOpacity={0.7}
              >
                <CheckCheck className="w-3.5 h-3.5 text-[#581420]" />
                <Text style={styles.markAllReadText}>Read All</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Notification List */}
          <ScrollView
            style={styles.scrollList}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {filteredList.length === 0 ? (
              <View style={styles.emptyStateContainer}>
                <View style={styles.emptyIconBox}>
                  <Bell className="w-8 h-8 text-stone-300" />
                </View>
                <Text style={styles.emptyTitle}>No Notifications</Text>
                <Text style={styles.emptySubtitle}>
                  You're all caught up! Updates, vendor replies, and admin invoices will appear here.
                </Text>
              </View>
            ) : (
              filteredList.map((item) => {
                return (
                  <TouchableOpacity
                    key={item.id}
                    style={[
                      styles.notificationCard,
                      !item.read && styles.notificationCardUnread,
                    ]}
                    onPress={() => handleNotificationClick(item)}
                    activeOpacity={0.85}
                  >
                    <View style={styles.cardHeaderRow}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 }}>
                        {/* Type Icon Badge */}
                        <View
                          style={[
                            styles.typeIconBadge,
                            item.type === 'invoice'
                              ? { backgroundColor: '#ECFDF5', borderColor: '#A7F3D0' }
                              : item.type === 'message'
                              ? { backgroundColor: '#EFF6FF', borderColor: '#BFDBFE' }
                              : { backgroundColor: '#FEF3C7', borderColor: '#FDE68A' },
                          ]}
                        >
                          {item.type === 'invoice' ? (
                            <FileText className="w-4 h-4 text-emerald-700" />
                          ) : item.type === 'message' ? (
                            <MessageCircle className="w-4 h-4 text-blue-700" />
                          ) : (
                            <Sparkles className="w-4 h-4 text-amber-700" />
                          )}
                        </View>

                        <View style={{ flex: 1 }}>
                          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                            <Text style={styles.senderName} numberOfLines={1}>
                              {item.sender}
                            </Text>
                            <View
                              style={[
                                styles.roleBadge,
                                item.senderRole === 'admin'
                                  ? { backgroundColor: '#581420' }
                                  : { backgroundColor: '#8B1E2F' },
                              ]}
                            >
                              <Text style={styles.roleBadgeText}>
                                {item.senderRole === 'admin' ? 'ADMIN' : 'VENDOR'}
                              </Text>
                            </View>
                          </View>
                          <Text style={styles.timeAgoText}>{item.timeAgo}</Text>
                        </View>
                      </View>

                      {/* Unread indicator */}
                      {!item.read && <View style={styles.unreadDot} />}
                    </View>

                    {/* Title & Preview Message */}
                    <Text style={styles.notificationTitle}>{item.title}</Text>
                    <Text style={styles.notificationMessage} numberOfLines={2}>
                      {item.message}
                    </Text>

                    {/* Action Footer Button */}
                    {item.actionType && (
                      <View style={styles.cardActionRow}>
                        <TouchableOpacity
                          style={[
                            styles.cardActionBtn,
                            item.type === 'invoice'
                              ? { backgroundColor: '#15803D' }
                              : item.type === 'quote'
                              ? { backgroundColor: '#581420' }
                              : { backgroundColor: '#2563EB' },
                          ]}
                          onPress={(e) => {
                            e.stopPropagation();
                            handleActionClick(item);
                          }}
                          activeOpacity={0.85}
                        >
                          <Text style={styles.cardActionBtnText}>
                            {item.actionType === 'view_invoice'
                              ? 'View Invoice & Pay'
                              : item.actionType === 'view_quote'
                              ? 'View Quotation'
                              : 'Open Message'}
                          </Text>
                          <ArrowRight className="w-3.5 h-3.5 text-white" />
                        </TouchableOpacity>
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })
            )}
          </ScrollView>

          {/* DETAIL MODAL / POPUP ON NOTIFICATION CLICK */}
          {selectedNotification && (
            <div className="absolute inset-0 z-60 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
              <motion.div
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.92, opacity: 0 }}
                className="w-full max-w-sm bg-white rounded-2xl p-5 border border-stone-200 shadow-2xl flex flex-col gap-4"
              >
                {/* Top Detail Header */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 }}>
                    <View
                      style={[
                        styles.typeIconBadge,
                        selectedNotification.type === 'invoice'
                          ? { backgroundColor: '#ECFDF5', borderColor: '#A7F3D0' }
                          : selectedNotification.type === 'message'
                          ? { backgroundColor: '#EFF6FF', borderColor: '#BFDBFE' }
                          : { backgroundColor: '#FEF3C7', borderColor: '#FDE68A' },
                      ]}
                    >
                      {selectedNotification.type === 'invoice' ? (
                        <FileText className="w-5 h-5 text-emerald-700" />
                      ) : selectedNotification.type === 'message' ? (
                        <MessageCircle className="w-5 h-5 text-blue-700" />
                      ) : (
                        <Sparkles className="w-5 h-5 text-amber-700" />
                      )}
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.detailSenderName}>{selectedNotification.sender}</Text>
                      <Text style={styles.detailTimeAgo}>{selectedNotification.timeAgo}</Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() => setSelectedNotification(null)}
                    style={styles.detailCloseBtn}
                  >
                    <X className="w-4 h-4 text-stone-600" />
                  </TouchableOpacity>
                </View>

                {/* Detail Content */}
                <View style={styles.detailContentBox}>
                  <Text style={styles.detailTitle}>{selectedNotification.title}</Text>
                  <Text style={styles.detailBody}>{selectedNotification.message}</Text>
                  {selectedNotification.actionData?.detailText && (
                    <View style={styles.detailHighlightBox}>
                      <Text style={styles.detailHighlightText}>
                        {selectedNotification.actionData.detailText}
                      </Text>
                    </View>
                  )}
                </View>

                {/* Detail Footer Actions */}
                <View style={{ gap: 8 }}>
                  {selectedNotification.actionType && (
                    <TouchableOpacity
                      style={[
                        styles.detailPrimaryBtn,
                        selectedNotification.type === 'invoice'
                          ? { backgroundColor: '#15803D' }
                          : selectedNotification.type === 'quote'
                          ? { backgroundColor: '#581420' }
                          : { backgroundColor: '#2563EB' },
                      ]}
                      onPress={() => {
                        const item = selectedNotification;
                        setSelectedNotification(null);
                        handleActionClick(item);
                      }}
                      activeOpacity={0.88}
                    >
                      <Text style={styles.detailPrimaryBtnText}>
                        {selectedNotification.actionType === 'view_invoice'
                          ? 'Open Invoice & Pay Milestone'
                          : selectedNotification.actionType === 'view_quote'
                          ? 'Review Quotation'
                          : 'View Vendor Details'}
                      </Text>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity
                    style={styles.detailDismissBtn}
                    onPress={() => setSelectedNotification(null)}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.detailDismissBtnText}>Close</Text>
                  </TouchableOpacity>
                </View>
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#EBE5DC',
    backgroundColor: '#FAF7F2',
  },
  headerIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F3ECE3',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E6DCD0',
  },
  headerTitle: {
    fontFamily: 'Playfair Display, Georgia, serif',
    fontSize: 18,
    fontWeight: '700',
    color: '#2A2425',
  },
  headerSubtitle: {
    fontSize: 11.5,
    color: '#7A6B6D',
    marginTop: 1,
  },
  unreadBadge: {
    backgroundColor: '#581420',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 10,
  },
  unreadBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  closeBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#EFEAE3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickActionsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#F5EFE6',
    borderBottomWidth: 1,
    borderBottomColor: '#E8E1D5',
  },
  filterChipsRow: {
    flexDirection: 'row',
    gap: 6,
  },
  filterChip: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: '#FAF7F2',
    borderWidth: 1,
    borderColor: '#DFD8CC',
  },
  filterChipActive: {
    backgroundColor: '#581420',
    borderColor: '#581420',
  },
  filterChipText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#6E6062',
  },
  filterChipTextActive: {
    color: '#FFFFFF',
  },
  markAllReadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  markAllReadText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#581420',
  },
  scrollList: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    gap: 12,
  },
  emptyStateContainer: {
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  emptyIconBox: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#EBE5DC',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#4A3E40',
  },
  emptySubtitle: {
    fontSize: 12,
    color: '#8A7B7D',
    textAlign: 'center',
    maxWidth: 240,
  },
  notificationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E8E2D8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    gap: 6,
  },
  notificationCardUnread: {
    borderColor: '#D4AF37',
    backgroundColor: '#FFFCF8',
    borderLeftWidth: 3.5,
    borderLeftColor: '#581420',
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  typeIconBadge: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  senderName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#2A2425',
  },
  roleBadge: {
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 4,
  },
  roleBadgeText: {
    color: '#FFFFFF',
    fontSize: 8.5,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  timeAgoText: {
    fontSize: 10.5,
    color: '#9E8E90',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#581420',
    marginTop: 4,
  },
  notificationTitle: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#2A2425',
    marginTop: 2,
  },
  notificationMessage: {
    fontSize: 12,
    color: '#5C4E50',
    lineHeight: 17,
  },
  cardActionRow: {
    marginTop: 6,
    flexDirection: 'row',
  },
  cardActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  cardActionBtnText: {
    color: '#FFFFFF',
    fontSize: 11.5,
    fontWeight: '700',
  },
  // Detail Modal Styles
  detailSenderName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2A2425',
  },
  detailTimeAgo: {
    fontSize: 11,
    color: '#8A7B7D',
  },
  detailCloseBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F3ECE3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailContentBox: {
    backgroundColor: '#FAF7F2',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#ECE4D8',
    gap: 8,
  },
  detailTitle: {
    fontSize: 14.5,
    fontWeight: '700',
    color: '#2A2425',
  },
  detailBody: {
    fontSize: 12.5,
    color: '#4B3E40',
    lineHeight: 18,
  },
  detailHighlightBox: {
    backgroundColor: '#F3ECE3',
    borderRadius: 8,
    padding: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#581420',
    marginTop: 4,
  },
  detailHighlightText: {
    fontSize: 11.5,
    color: '#581420',
    fontWeight: '600',
  },
  detailPrimaryBtn: {
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailPrimaryBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  detailDismissBtn: {
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3ECE3',
  },
  detailDismissBtnText: {
    color: '#581420',
    fontSize: 12.5,
    fontWeight: '700',
  },
});
