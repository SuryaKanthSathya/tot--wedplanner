import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  Modal,
} from 'react-native-web';
import {
  X,
  Star,
  MapPin,
  Sparkles,
  Check,
  CheckCircle2,
  Scale,
  ArrowRight,
  TrendingDown,
  Award,
  ChevronRight,
  SlidersHorizontal,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface GenericVendor {
  id: string;
  name: string;
  category?: string;
  location?: string;
  city?: string;
  rating: number;
  reviewsCount: number;
  startingPrice: string;
  priceValue?: number;
  tier?: string;
  image: string;
  description?: string;
  experience?: string;
  capacity?: string;
  features?: string[];
  amenities?: string[];
  designsUsed?: string[];
  menuTypes?: string[];
  deliveryTime?: string;
}

export interface VendorCompareModalProps {
  visible: boolean;
  categoryTitle: string;
  vendors: GenericVendor[];
  onClose: () => void;
  onSelectVendor: (vendor: GenericVendor) => void;
}

export const VendorCompareModal: React.FC<VendorCompareModalProps> = ({
  visible,
  categoryTitle,
  vendors,
  onClose,
  onSelectVendor,
}) => {
  if (!visible || vendors.length < 2) return null;

  // Selected 2 vendor indices to compare
  const [selectedIdxA, setSelectedIdxA] = useState<number>(0);
  const [selectedIdxB, setSelectedIdxB] = useState<number>(1);

  const vendorA = vendors[selectedIdxA] || vendors[0];
  const vendorB = vendors[selectedIdxB] || vendors[1];

  const priceA = vendorA.priceValue || parseInt((vendorA.startingPrice || '0').replace(/[^0-9]/g, ''), 10) || 0;
  const priceB = vendorB.priceValue || parseInt((vendorB.startingPrice || '0').replace(/[^0-9]/g, ''), 10) || 0;

  const isPriceALower = priceA > 0 && priceB > 0 && priceA < priceB;
  const isPriceBLower = priceA > 0 && priceB > 0 && priceB < priceA;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: '100%' }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 280 }}
        style={{
          position: 'absolute' as any,
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          width: '100%',
          height: '100%',
          backgroundColor: '#FAF7F2',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* TOP HEADER */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={onClose} activeOpacity={0.7}>
            <X className="w-5 h-5 text-[#2A2425]" />
          </TouchableOpacity>

          <View style={{ flex: 1, alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Scale className="w-4 h-4 text-[#581420]" />
              <Text style={styles.headerTitle}>Compare {categoryTitle}</Text>
            </View>
            <Text style={styles.headerSubtitle}>
              Side-by-side comparison
            </Text>
          </View>

          <View style={{ width: 36 }} />
        </View>

        {/* VENDOR SELECTOR PILLS IF > 2 SAVED */}
        {vendors.length > 2 && (
          <View style={styles.selectorBar}>
            <Text style={styles.selectorLabel}>Switch:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 6 }}>
              {vendors.map((v, idx) => {
                const isA = idx === selectedIdxA;
                const isB = idx === selectedIdxB;
                return (
                  <TouchableOpacity
                    key={v.id}
                    style={[
                      styles.vendorSelectPill,
                      isA && styles.vendorSelectPillA,
                      isB && styles.vendorSelectPillB,
                    ]}
                    onPress={() => {
                      if (!isA && !isB) {
                        setSelectedIdxB(idx);
                      } else if (isA && vendors.length > 2) {
                        const nextIdx = vendors.findIndex((_, i) => i !== selectedIdxA && i !== selectedIdxB);
                        if (nextIdx >= 0) setSelectedIdxA(nextIdx);
                      }
                    }}
                    activeOpacity={0.8}
                  >
                    <Text
                      style={[
                        styles.vendorSelectPillText,
                        (isA || isB) && styles.vendorSelectPillTextActive,
                      ]}
                    >
                      {isA ? '🔵 ' : isB ? '🟠 ' : ''}
                      {v.name.split(' ')[0]}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        )}

        {/* MAIN COMPARISON TABLE SCROLL */}
        <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* 1. TOP CARDS ROW */}
          <View style={styles.compareRow}>
            {/* Vendor A */}
            <View style={[styles.vendorColumn, styles.vendorColA]}>
              <View style={styles.vendorImageWrapper}>
                <Image source={{ uri: vendorA.image }} style={styles.vendorImage} resizeMode="cover" />
                <View style={styles.colBadgeA}>
                  <Text style={styles.colBadgeText}>Vendor 1</Text>
                </View>
              </View>
              <Text style={styles.vendorName} numberOfLines={2}>{vendorA.name}</Text>
              <Text style={styles.vendorCategory} numberOfLines={1}>{vendorA.category || categoryTitle}</Text>
            </View>

            {/* VS BADGE */}
            <View style={styles.vsBadge}>
              <Text style={styles.vsBadgeText}>VS</Text>
            </View>

            {/* Vendor B */}
            <View style={[styles.vendorColumn, styles.vendorColB]}>
              <View style={styles.vendorImageWrapper}>
                <Image source={{ uri: vendorB.image }} style={styles.vendorImage} resizeMode="cover" />
                <View style={styles.colBadgeB}>
                  <Text style={styles.colBadgeText}>Vendor 2</Text>
                </View>
              </View>
              <Text style={styles.vendorName} numberOfLines={2}>{vendorB.name}</Text>
              <Text style={styles.vendorCategory} numberOfLines={1}>{vendorB.category || categoryTitle}</Text>
            </View>
          </View>

          {/* 2. PRICE COMPARISON ROW */}
          <View style={styles.sectionDivider}>
            <Text style={styles.sectionHeaderTitle}>Pricing & Value</Text>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableCell, isPriceALower && styles.tableCellHighlight]}>
              <Text style={styles.priceValue}>{vendorA.startingPrice}</Text>
              {isPriceALower && (
                <View style={styles.lowerPriceTag}>
                  <TrendingDown className="w-3 h-3 text-emerald-700 mr-1" />
                  <Text style={styles.lowerPriceTagText}>More Affordable</Text>
                </View>
              )}
            </View>
            <View style={[styles.tableCell, isPriceBLower && styles.tableCellHighlight]}>
              <Text style={styles.priceValue}>{vendorB.startingPrice}</Text>
              {isPriceBLower && (
                <View style={styles.lowerPriceTag}>
                  <TrendingDown className="w-3 h-3 text-emerald-700 mr-1" />
                  <Text style={styles.lowerPriceTagText}>More Affordable</Text>
                </View>
              )}
            </View>
          </View>

          {/* 3. RATING & REVIEWS */}
          <View style={styles.sectionDivider}>
            <Text style={styles.sectionHeaderTitle}>Rating & Reputation</Text>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCell}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 mr-1" />
                <Text style={styles.ratingText}>{vendorA.rating} / 5</Text>
              </View>
              <Text style={styles.reviewCountText}>({vendorA.reviewsCount} reviews)</Text>
            </View>
            <View style={styles.tableCell}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 mr-1" />
                <Text style={styles.ratingText}>{vendorB.rating} / 5</Text>
              </View>
              <Text style={styles.reviewCountText}>({vendorB.reviewsCount} reviews)</Text>
            </View>
          </View>

          {/* 4. TIER & BADGE */}
          <View style={styles.sectionDivider}>
            <Text style={styles.sectionHeaderTitle}>Quality Tier</Text>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCell}>
              <View style={[styles.tierTag, vendorA.tier === 'Signature' ? styles.tierSig : vendorA.tier === 'Premium' ? styles.tierPrem : styles.tierEss]}>
                <Sparkles className="w-3 h-3 mr-1" />
                <Text style={styles.tierTagText}>{vendorA.tier || 'Standard'}</Text>
              </View>
            </View>
            <View style={styles.tableCell}>
              <View style={[styles.tierTag, vendorB.tier === 'Signature' ? styles.tierSig : vendorB.tier === 'Premium' ? styles.tierPrem : styles.tierEss]}>
                <Sparkles className="w-3 h-3 mr-1" />
                <Text style={styles.tierTagText}>{vendorB.tier || 'Standard'}</Text>
              </View>
            </View>
          </View>

          {/* 5. LOCATION & CITY */}
          <View style={styles.sectionDivider}>
            <Text style={styles.sectionHeaderTitle}>Location / District</Text>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCell}>
              <MapPin className="w-3.5 h-3.5 text-[#8C7A7C] mb-1" />
              <Text style={styles.locationText}>{vendorA.location || vendorA.city || 'Tamil Nadu'}</Text>
            </View>
            <View style={styles.tableCell}>
              <MapPin className="w-3.5 h-3.5 text-[#8C7A7C] mb-1" />
              <Text style={styles.locationText}>{vendorB.location || vendorB.city || 'Tamil Nadu'}</Text>
            </View>
          </View>

          {/* 6. KEY ATTRIBUTES / SPECIALITY / CAPACITY */}
          {(vendorA.capacity || vendorB.capacity || vendorA.experience || vendorB.experience || vendorA.deliveryTime || vendorB.deliveryTime) && (
            <>
              <View style={styles.sectionDivider}>
                <Text style={styles.sectionHeaderTitle}>
                  {vendorA.capacity ? 'Capacity / Hall Size' : vendorA.deliveryTime ? 'Delivery / Turnaround' : 'Experience & Background'}
                </Text>
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableCell}>
                  <Text style={styles.attributeText}>
                    {vendorA.capacity || vendorA.experience || vendorA.deliveryTime || 'Professional Specialist'}
                  </Text>
                </View>
                <View style={styles.tableCell}>
                  <Text style={styles.attributeText}>
                    {vendorB.capacity || vendorB.experience || vendorB.deliveryTime || 'Professional Specialist'}
                  </Text>
                </View>
              </View>
            </>
          )}

          {/* 7. FEATURES / AMENITIES CHECKLIST */}
          {((vendorA.amenities && vendorA.amenities.length > 0) || (vendorA.features && vendorA.features.length > 0) || (vendorA.designsUsed && vendorA.designsUsed.length > 0) || (vendorA.menuTypes && vendorA.menuTypes.length > 0)) && (
            <>
              <View style={styles.sectionDivider}>
                <Text style={styles.sectionHeaderTitle}>Key Features & Inclusions</Text>
              </View>
              <View style={styles.tableRow}>
                <View style={[styles.tableCell, { alignItems: 'flex-start', paddingHorizontal: 10 }]}>
                  {(vendorA.amenities || vendorA.features || vendorA.designsUsed || vendorA.menuTypes || []).slice(0, 4).map((f, i) => (
                    <View key={i} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                      <Check className="w-3 h-3 text-emerald-600 mr-1 flex-shrink-0" />
                      <Text style={styles.featureItemText} numberOfLines={1}>{f}</Text>
                    </View>
                  ))}
                </View>
                <View style={[styles.tableCell, { alignItems: 'flex-start', paddingHorizontal: 10 }]}>
                  {(vendorB.amenities || vendorB.features || vendorB.designsUsed || vendorB.menuTypes || []).slice(0, 4).map((f, i) => (
                    <View key={i} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                      <Check className="w-3 h-3 text-emerald-600 mr-1 flex-shrink-0" />
                      <Text style={styles.featureItemText} numberOfLines={1}>{f}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </>
          )}

          <View style={{ height: 20 }} />
        </ScrollView>

        {/* BOTTOM FIXED ACTION BAR */}
        <View style={styles.bottomActionBar}>
          <TouchableOpacity
            style={styles.viewProfileBtnA}
            onPress={() => {
              onClose();
              onSelectVendor(vendorA);
            }}
            activeOpacity={0.85}
          >
            <Text style={styles.viewProfileBtnTextA} numberOfLines={1}>View {vendorA.name.split(' ')[0]}</Text>
            <ChevronRight className="w-3.5 h-3.5 text-[#581420] ml-0.5" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.viewProfileBtnB}
            onPress={() => {
              onClose();
              onSelectVendor(vendorB);
            }}
            activeOpacity={0.85}
          >
            <Text style={styles.viewProfileBtnTextB} numberOfLines={1}>View {vendorB.name.split(' ')[0]}</Text>
            <ChevronRight className="w-3.5 h-3.5 text-white ml-0.5" />
          </TouchableOpacity>
        </View>
      </motion.div>
    </AnimatePresence>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E8DFD5',
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3ECE4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#2A2425',
    fontFamily: 'Playfair Display, Georgia, serif',
  },
  headerSubtitle: {
    fontSize: 10.5,
    color: '#7D6E70',
    marginTop: 1,
  },
  selectorBar: {
    backgroundColor: '#F3ECE4',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#E8DFD5',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  selectorLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#581420',
  },
  vendorSelectPill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D8CEC2',
  },
  vendorSelectPillA: {
    backgroundColor: '#EEF2FF',
    borderColor: '#4F46E5',
  },
  vendorSelectPillB: {
    backgroundColor: '#FFF7ED',
    borderColor: '#EA580C',
  },
  vendorSelectPillText: {
    fontSize: 10.5,
    fontWeight: '600',
    color: '#4B3F40',
  },
  vendorSelectPillTextActive: {
    fontWeight: '700',
    color: '#1F2937',
  },
  scrollContent: {
    padding: 12,
    paddingBottom: 24,
  },
  compareRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    position: 'relative',
  },
  vendorColumn: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E8DFD5',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
  },
  vendorColA: {
    borderTopWidth: 3,
    borderTopColor: '#581420',
    marginRight: 4,
  },
  vendorColB: {
    borderTopWidth: 3,
    borderTopColor: '#C28E38',
    marginLeft: 4,
  },
  vendorImageWrapper: {
    position: 'relative',
    width: 60,
    height: 60,
    marginBottom: 6,
  },
  vendorImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#F3ECE4',
  },
  colBadgeA: {
    position: 'absolute',
    bottom: -6,
    alignSelf: 'center',
    backgroundColor: '#581420',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 8,
  },
  colBadgeB: {
    position: 'absolute',
    bottom: -6,
    alignSelf: 'center',
    backgroundColor: '#C28E38',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 8,
  },
  colBadgeText: {
    fontSize: 8.5,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  vendorName: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2A2425',
    textAlign: 'center',
    marginBottom: 2,
    marginTop: 4,
    minHeight: 30,
  },
  vendorCategory: {
    fontSize: 10,
    color: '#7D6E70',
    textAlign: 'center',
  },
  vsBadge: {
    position: 'absolute',
    left: '50%',
    top: '28%',
    marginLeft: -13,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#581420',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  vsBadgeText: {
    color: '#FFFFFF',
    fontSize: 8.5,
    fontWeight: '800',
  },
  sectionDivider: {
    backgroundColor: '#F3ECE4',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginTop: 8,
    marginBottom: 5,
  },
  sectionHeaderTitle: {
    fontSize: 10,
    fontWeight: '800',
    color: '#581420',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  tableRow: {
    flexDirection: 'row',
    gap: 8,
  },
  tableCell: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#EDE5DC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tableCellHighlight: {
    backgroundColor: '#F0FDF4',
    borderColor: '#86EFAC',
  },
  priceValue: {
    fontSize: 13.5,
    fontWeight: '800',
    color: '#581420',
  },
  lowerPriceTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 6,
    marginTop: 2,
  },
  lowerPriceTagText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#15803D',
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2A2425',
  },
  reviewCountText: {
    fontSize: 9.5,
    color: '#8C7A7C',
    marginTop: 1,
  },
  tierTag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  tierSig: {
    backgroundColor: '#FEF3C7',
  },
  tierPrem: {
    backgroundColor: '#FCE7F3',
  },
  tierEss: {
    backgroundColor: '#DCFCE7',
  },
  tierTagText: {
    fontSize: 10.5,
    fontWeight: '700',
    color: '#581420',
  },
  locationText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#4B3F40',
    textAlign: 'center',
  },
  attributeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#2A2425',
    textAlign: 'center',
  },
  featureItemText: {
    fontSize: 10.5,
    color: '#374151',
  },
  bottomActionBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E8DFD5',
    boxShadow: '0 -2px 10px rgba(0,0,0,0.05)',
  },
  viewProfileBtnA: {
    flex: 1,
    backgroundColor: '#FAF5EE',
    borderWidth: 1.5,
    borderColor: '#581420',
    paddingVertical: 10,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewProfileBtnTextA: {
    color: '#581420',
    fontSize: 12,
    fontWeight: '700',
  },
  viewProfileBtnB: {
    flex: 1,
    backgroundColor: '#581420',
    paddingVertical: 10,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#581420',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  viewProfileBtnTextB: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
});
