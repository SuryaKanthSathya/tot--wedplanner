import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, TextInput, useWindowDimensions } from 'react-native';
import { ChevronLeft, Heart, Calendar, Users } from 'lucide-react';
import { motion } from 'motion/react';

interface FindVendorsPageProps {
  onBack: () => void;
  onSelectCategory: (category: string) => void;
}

export const FindVendorsPage: React.FC<FindVendorsPageProps> = ({
  onBack,
  onSelectCategory,
}) => {
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);
  const [brideGroomNames, setBrideGroomNames] = useState(() => {
    try {
      const p = localStorage.getItem('wedding_profile');
      if (p) {
        const parsed = JSON.parse(p);
        if (parsed.brideName && parsed.groomName) return `${parsed.brideName} & ${parsed.groomName}`;
        if (parsed.brideName) return parsed.brideName;
      }
    } catch {}
    return '';
  });
  const [weddingDate, setWeddingDate] = useState(() => {
    try {
      const p = localStorage.getItem('wedding_profile');
      if (p) {
        const parsed = JSON.parse(p);
        if (parsed.weddingDate) return parsed.weddingDate;
      }
    } catch {}
    return '';
  });
  const [guestCount, setGuestCount] = useState(() => {
    try {
      const p = localStorage.getItem('wedding_profile');
      if (p) {
        const parsed = JSON.parse(p);
        if (parsed.guestCount) return parsed.guestCount;
      }
    } catch {}
    return '';
  });

  const [weddingDateRaw, setWeddingDateRaw] = useState('');
  const dateInputRef = useRef<HTMLInputElement>(null);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setWeddingDateRaw(raw);
    if (!raw) { setWeddingDate(''); return; }
    try {
      const [year, month, day] = raw.split('-');
      const dateObj = new Date(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10));
      setWeddingDate(dateObj.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }));
    } catch { setWeddingDate(raw); }
  };

  const triggerDatePicker = () => {
    try {
      if (dateInputRef.current) {
        if (typeof (dateInputRef.current as any).showPicker === 'function') {
          (dateInputRef.current as any).showPicker();
        } else {
          dateInputRef.current.focus();
          dateInputRef.current.click();
        }
      }
    } catch {
      try { dateInputRef.current?.focus(); dateInputRef.current?.click(); } catch {}
    }
  };
  const categories = [
    {
      id: 'Photography',
      name: 'Photography',
      vendorsCount: '124 Vendors',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 'Makeup',
      name: 'Makeup',
      vendorsCount: '86 Vendors',
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 'Decor',
      name: 'Decor',
      vendorsCount: '76 Vendors',
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 'Mehendi',
      name: 'Mehendi',
      vendorsCount: '54 Vendors',
      image: '/images/mehendi_category_1786688929519.jpg',
    },
    {
      id: 'Catering',
      name: 'Catering',
      vendorsCount: '91 Vendors',
      image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 'Venue',
      name: 'Venue',
      vendorsCount: '128 Vendors',
      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 'Entertainment',
      name: 'Entertainment',
      vendorsCount: '58 Vendors',
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 'Invitations',
      name: 'Invitation',
      vendorsCount: '68 Vendors',
      image: '/images/invitation_category.jpg',
    },
    {
      id: 'Cars',
      name: 'Cars',
      vendorsCount: '45 Vendors',
      image: '/images/cars_category.webp',
    },
  ];

  const ritualCategory = {
    id: 'Rituals',
    name: 'Rituals',
    vendorsCount: '12 Vendors',
    image: '/images/rituals_category.webp',
  };

  const { width } = useWindowDimensions();
  const isDesktop = width >= 1024;

  return (
    <View style={[{ flex: 1, backgroundColor: '#FAF6EE' }]}>
      <View style={[styles.container]}>
        {/* ================= HEADER ================= */}
      <View style={styles.headerRow}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => {
            if (isOnboardingComplete) {
              setIsOnboardingComplete(false);
            } else {
              onBack();
            }
          }}
          activeOpacity={0.7}
        >
          <ChevronLeft className="w-6 h-6 text-[#2A2425]" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Find Vendors</Text>
        <View style={{ width: 40 }} /> {/* Placeholder for balance */}
      </View>

      <ScrollView 
        style={styles.scrollContainer} 
        contentContainerStyle={isOnboardingComplete ? styles.scrollContent : styles.onboardingContent}
        showsVerticalScrollIndicator={false}
      >
        {!isOnboardingComplete ? (
          /* ================= ONBOARDING STEP ================= */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md mx-auto"
          >
            <View style={styles.formContainer}>
              <View style={styles.formIconWrapper}>
                <Heart className="w-6 h-6 text-[#581420]" />
              </View>
              <Text style={styles.formTitle}>Tell Us About Your Big Day</Text>
              <Text style={styles.formSubtitle}>Answer these quick details so we can find the perfect vendors for you.</Text>
              
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Bride & Groom Names</Text>
                <View style={styles.inputWrapper}>
                  <Heart className="w-4 h-4 text-stone-400 absolute left-3 top-3.5" />
                  <TextInput
                    style={styles.input}
                    placeholder="e.g. Sarah & David"
                    placeholderTextColor="#A09B98"
                    value={brideGroomNames}
                    onChangeText={setBrideGroomNames}
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Wedding Date</Text>
                <div
                  onClick={triggerDatePicker}
                  onPointerDown={triggerDatePicker}
                  className="relative flex items-center justify-between w-full h-[46px] px-3 bg-white border border-[#E8DFD5] rounded-xl cursor-pointer hover:border-[#581420] transition-colors"
                >
                  <span className={`text-[14px] font-medium select-none ${weddingDate ? 'text-[#2A2425]' : 'text-[#A09B98]'}`}>
                    {weddingDate || 'Select wedding date'}
                  </span>
                  <Calendar className="w-4 h-4 text-[#581420] pointer-events-none flex-shrink-0" />
                  <input
                    ref={dateInputRef}
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={weddingDateRaw}
                    onChange={handleDateChange}
                    onClick={(e) => {
                      try {
                        if (typeof (e.currentTarget as any).showPicker === 'function') {
                          (e.currentTarget as any).showPicker();
                        }
                      } catch {}
                    }}
                    onFocus={(e) => {
                      try {
                        if (typeof (e.currentTarget as any).showPicker === 'function') {
                          (e.currentTarget as any).showPicker();
                        }
                      } catch {}
                    }}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-20"
                  />
                </div>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Expected Number of Guests</Text>
                <View style={styles.inputWrapper}>
                  <Users className="w-4 h-4 text-stone-400 absolute left-3 top-3.5" />
                  <TextInput
                    style={styles.input}
                    placeholder="e.g. 200"
                    placeholderTextColor="#A09B98"
                    keyboardType="number-pad"
                    value={guestCount}
                    onChangeText={setGuestCount}
                  />
                </View>
              </View>

              <TouchableOpacity
                activeOpacity={0.8}
                style={[
                  styles.continueBtn,
                  (!brideGroomNames || !weddingDate || !guestCount) && styles.continueBtnDisabled,
                ]}
                disabled={!brideGroomNames || !weddingDate || !guestCount}
                onPress={() => setIsOnboardingComplete(true)}
              >
                <Text style={styles.continueBtnText}>Explore Vendors</Text>
              </TouchableOpacity>
            </View>
          </motion.div>
        ) : (
          /* ================= VENDOR GRID STEP ================= */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-3xl mx-auto"
          >
            <Text style={styles.sectionTitle}>Categories</Text>

        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-6 w-full px-4">
          {[...categories, ritualCategory].map((category) => (
            <motion.div
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => onSelectCategory(category.id)}
            >
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: category.image }}
                  style={styles.categoryImage}
                  resizeMode="cover"
                />
              </View>
              <Text style={styles.categoryName}>{category.name}</Text>
              <Text style={styles.vendorsCount}>{category.vendorsCount}</Text>
            </motion.div>
          ))}
        </div>
          </motion.div>
        )}
      </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  onboardingContent: {},
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F7F4F0',
    position: 'relative',
    flexDirection: 'column',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: '#F7F4F0',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e2ddd5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  headerTitle: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 24,
    fontWeight: '600',
    color: '#2A2425',
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 32,
    borderWidth: 1,
    borderColor: '#E2DDD5',
    shadowColor: '#581420',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    alignItems: 'center',
  },
  formIconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F5ECE3',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  formTitle: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 24,
    fontWeight: '700',
    color: '#2A2425',
    marginBottom: 8,
    textAlign: 'center',
  },
  formSubtitle: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 14,
    color: '#635B5C',
    marginBottom: 32,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  inputGroup: {
    marginBottom: 20,
    width: '100%',
  },
  rowInputs: {
    flexDirection: 'row',
    gap: 12,
  },
  inputLabel: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 12,
    fontWeight: '600',
    color: '#4A4445',
    marginBottom: 6,
  },
  inputWrapper: {
    position: 'relative',
    width: '100%',
  },
  input: {
    width: '100%',
    height: 44,
    backgroundColor: '#FAF6EE',
    borderWidth: 1,
    borderColor: '#E2DDD5',
    borderRadius: 10,
    paddingLeft: 36,
    paddingRight: 12,
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 14,
    color: '#2A2425',
  },
  continueBtn: {
    width: '100%',
    height: 52,
    backgroundColor: '#581420',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    shadowColor: '#581420',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  continueBtnDisabled: {
    backgroundColor: '#A08E90',
    shadowOpacity: 0,
  },
  continueBtnText: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  sectionTitle: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 22,
    fontWeight: '600',
    color: '#2A2425',
    marginLeft: 16,
    marginBottom: 16,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 120,
    paddingTop: 10,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1, // To keep it perfectly square
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 8,
  },
  categoryImage: {
    width: '100%',
    height: '100%',
  },
  categoryName: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 16,
    fontWeight: '600',
    color: '#2C2B29',
    textAlign: 'center',
    lineHeight: 20,
  },
  vendorsCount: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 12,
    color: '#8D8985',
    textAlign: 'center',
  },
  wideCategoryWrapper: {
    marginTop: 24,
    alignItems: 'center',
    paddingHorizontal: 40, // Increased padding to decrease width
  },
  wideImageContainer: {
    width: '100%',
    height: 110, // Decreased height to make it smaller
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 8,
  },
  wideCategoryImage: {
    width: '100%',
    height: '100%',
  },
});
