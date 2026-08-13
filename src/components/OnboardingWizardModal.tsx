import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
  Pressable,
} from 'react-native';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Calendar, Users, MapPin, DollarSign, ArrowRight, ChevronLeft, HeartHandshake } from 'lucide-react';

interface OnboardingWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  primaryColor?: string;
  bgColor?: string;
}

export const OnboardingWizardModal: React.FC<OnboardingWizardModalProps> = ({
  isOpen,
  onClose,
  primaryColor = '#5C1A24',
  bgColor = '#FFFBF7',
}) => {
  const [step, setStep] = useState<number>(1);
  const [selectedStyle, setSelectedStyle] = useState<string>('Royal Heritage');
  const [guestCount, setGuestCount] = useState<string>('150 - 300 Guests');
  const [location, setLocation] = useState<string>('Rajasthan / Destination Palace');
  const [season, setSeason] = useState<string>('Winter 2026');
  const [budgetRange, setBudgetRange] = useState<number>(50);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isComplete, setIsComplete] = useState<boolean>(false);

  if (!isOpen) return null;

  const stylesList = [
    { name: 'Royal Heritage', desc: 'Grand palaces, intricate decor, regal ceremonies', icon: '👑' },
    { name: 'Destination Beach', desc: 'Serene ocean breeze, golden hour sunsets, breezy luxury', icon: '🌊' },
    { name: 'Modern Minimalist', desc: 'Clean architecture, high-fashion aesthetic, understated elegance', icon: '✨' },
    { name: 'Vintage Garden', desc: 'Lush floral arches, romantic fairy lights, outdoor magic', icon: '🌸' },
  ];

  const handleNext = () => {
    if (step < 3) {
      setStep((prev) => prev + 1);
    } else {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsComplete(true);
      }, 1200);
    }
  };

  const resetFlow = () => {
    setStep(1);
    setIsComplete(false);
    onClose();
  };

  return (
    <Modal
      transparent
      animationType="fade"
      visible={isOpen}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl relative border border-white/20"
          style={{ backgroundColor: bgColor }}
        >
          {/* Header bar */}
          <View style={styles.headerBar}>
            <View style={styles.headerTitleRow}>
              <View style={[styles.badgeStep, { backgroundColor: primaryColor }]}>
                <Text style={styles.badgeStepText}>2</Text>
              </View>
              <View>
                <Text style={styles.headerBrandTitle}>Tale of Two</Text>
                <Text style={styles.headerBrandSub}>AI Luxury Wedding Concierge</Text>
              </View>
            </View>

            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <X className="w-4 h-4 text-stone-600" />
            </TouchableOpacity>
          </View>

          {/* Progress Bar */}
          {!isComplete && (
            <View style={styles.progressBg}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${(step / 3) * 100}%`,
                    backgroundColor: primaryColor,
                  },
                ]}
              />
            </View>
          )}

          {/* Body Content */}
          <ScrollView style={{ padding: 24, maxHeight: 520 }}>
            {isComplete ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-4"
              >
                <View style={[styles.completeIconCircle, { backgroundColor: primaryColor }]}>
                  <HeartHandshake className="w-8 h-8 text-white" />
                </View>

                <Text style={[styles.completeTitle, { color: primaryColor }]}>
                  Your Story Begins
                </Text>

                <Text style={styles.completeSubtitle}>
                  We’ve created your customized wedding profile for{' '}
                  <Text style={styles.boldText}>{selectedStyle}</Text> in{' '}
                  <Text style={styles.boldText}>{location}</Text>.
                </Text>

                <View style={styles.summaryBox}>
                  <Text style={styles.summaryBoxHeader}>AI Plan Overview</Text>
                  <View style={styles.summaryGrid}>
                    <View style={styles.summaryCol}>
                      <Text style={styles.summaryLabel}>Style Vibe:</Text>
                      <Text style={styles.summaryVal}>{selectedStyle}</Text>
                    </View>
                    <View style={styles.summaryCol}>
                      <Text style={styles.summaryLabel}>Guests:</Text>
                      <Text style={styles.summaryVal}>{guestCount}</Text>
                    </View>
                    <View style={styles.summaryCol}>
                      <Text style={styles.summaryLabel}>Destination:</Text>
                      <Text style={styles.summaryVal}>{location}</Text>
                    </View>
                    <View style={styles.summaryCol}>
                      <Text style={styles.summaryLabel}>Timeline:</Text>
                      <Text style={styles.summaryVal}>{season}</Text>
                    </View>
                  </View>
                </View>

                <TouchableOpacity
                  onPress={resetFlow}
                  style={[styles.primaryActionBtn, { backgroundColor: primaryColor }]}
                >
                  <Text style={styles.primaryActionBtnText}>Access Client Dashboard</Text>
                </TouchableOpacity>
              </motion.div>
            ) : (
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="space-y-4"
                  >
                    <View style={{ marginBottom: 12 }}>
                      <Text style={styles.stepIndicator}>Step 1 of 3</Text>
                      <Text style={styles.stepTitle}>Choose Your Wedding Aesthetic</Text>
                      <Text style={styles.stepSubtitle}>
                        Which vibe best reflects your dream celebration?
                      </Text>
                    </View>

                    <View style={{ gap: 10 }}>
                      {stylesList.map((item) => {
                        const isSelected = selectedStyle === item.name;
                        return (
                          <div key={item.name}>
                            <TouchableOpacity
                              onPress={() => setSelectedStyle(item.name)}
                              style={[
                                styles.styleCard,
                                isSelected && { borderColor: primaryColor, backgroundColor: '#FFFFFF' },
                              ]}
                            >
                              <Text style={{ fontSize: 24 }}>{item.icon}</Text>
                              <View style={{ flex: 1 }}>
                                <View style={styles.styleCardHeader}>
                                  <Text style={styles.styleCardTitle}>{item.name}</Text>
                                  {isSelected && (
                                    <View style={[styles.checkCircle, { backgroundColor: primaryColor }]}>
                                      <Check className="w-2.5 h-2.5 text-white" />
                                    </View>
                                  )}
                                </View>
                                <Text style={styles.styleCardDesc}>{item.desc}</Text>
                              </View>
                            </TouchableOpacity>
                          </div>
                        );
                      })}
                    </View>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="space-y-4"
                  >
                    <View style={{ marginBottom: 12 }}>
                      <Text style={styles.stepIndicator}>Step 2 of 3</Text>
                      <Text style={styles.stepTitle}>Guest & Timeline Details</Text>
                      <Text style={styles.stepSubtitle}>
                        Help us tailor venue capacity and vendor availability.
                      </Text>
                    </View>

                    <View style={{ gap: 6 }}>
                      <Text style={styles.inputLabel}>
                        <Users className="w-3.5 h-3.5 text-stone-500 inline mr-1" /> Estimated Guest Count
                      </Text>
                      <View style={styles.grid2Col}>
                        {['Intimate (< 100)', '150 - 300 Guests', '300 - 500 Guests', 'Grand (500+)'].map((opt) => (
                          <div key={opt}>
                            <TouchableOpacity
                              onPress={() => setGuestCount(opt)}
                              style={[
                                styles.chipBtn,
                                guestCount === opt && { borderColor: primaryColor, backgroundColor: '#FFFFFF' },
                              ]}
                            >
                              <Text style={[styles.chipBtnText, guestCount === opt && { color: primaryColor, fontWeight: '700' }]}>
                                {opt}
                              </Text>
                            </TouchableOpacity>
                          </div>
                        ))}
                      </View>
                    </View>

                    <View style={{ gap: 6, marginTop: 12 }}>
                      <Text style={styles.inputLabel}>
                        <Calendar className="w-3.5 h-3.5 text-stone-500 inline mr-1" /> Target Timeline
                      </Text>
                      <View style={{ gap: 8 }}>
                        {['Winter 2026 (Nov - Feb)', 'Spring 2026 (Mar - May)', 'Autumn 2026 (Sep - Oct)', 'Year 2027 & Beyond'].map((s) => (
                          <div key={s}>
                            <TouchableOpacity
                              onPress={() => setSeason(s)}
                              style={[
                                styles.chipBtn,
                                season === s && { borderColor: primaryColor, backgroundColor: '#FFFFFF' },
                              ]}
                            >
                              <Text style={[styles.chipBtnText, season === s && { color: primaryColor, fontWeight: '700' }]}>
                                {s}
                              </Text>
                            </TouchableOpacity>
                          </div>
                        ))}
                      </View>
                    </View>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="space-y-4"
                  >
                    <View style={{ marginBottom: 12 }}>
                      <Text style={styles.stepIndicator}>Step 3 of 3</Text>
                      <Text style={styles.stepTitle}>Location & Budget Tier</Text>
                      <Text style={styles.stepSubtitle}>
                        Specify dream destinations and overall budget scale.
                      </Text>
                    </View>

                    <View style={{ gap: 6 }}>
                      <Text style={styles.inputLabel}>
                        <MapPin className="w-3.5 h-3.5 text-stone-500 inline mr-1" /> Preferred Destination
                      </Text>
                      <TextInput
                        value={location}
                        onChangeText={setLocation}
                        placeholder="e.g. Udaipur, Lake Como, Bali..."
                        style={styles.textInput}
                      />
                    </View>

                    <View style={{ gap: 6, marginTop: 12 }}>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={styles.inputLabel}>
                          <DollarSign className="w-3.5 h-3.5 text-stone-500 inline mr-1" /> Budget Tier Scale
                        </Text>
                        <Text style={{ fontSize: 12, fontWeight: '700', color: primaryColor }}>
                          ${budgetRange * 2}k - ${budgetRange * 5}k USD
                        </Text>
                      </View>
                      <input
                        type="range"
                        min="20"
                        max="150"
                        value={budgetRange}
                        onChange={(e) => setBudgetRange(Number(e.target.value))}
                        className="w-full accent-[#5C1A24] cursor-pointer"
                      />
                    </View>
                  </motion.div>
                )}
              </AnimatePresence>
            )}

            {/* Action Buttons */}
            {!isComplete && (
              <View style={styles.footerRow}>
                {step > 1 ? (
                  <TouchableOpacity onPress={() => setStep((p) => p - 1)} style={styles.backBtn}>
                    <ChevronLeft className="w-4 h-4 text-stone-600 mr-1" />
                    <Text style={{ fontSize: 12, fontWeight: '600', color: '#44403c' }}>Back</Text>
                  </TouchableOpacity>
                ) : (
                  <View />
                )}

                <TouchableOpacity
                  onPress={handleNext}
                  disabled={isSubmitting}
                  style={[styles.nextBtn, { backgroundColor: primaryColor }]}
                >
                  <Text style={styles.nextBtnText}>
                    {isSubmitting ? 'Curating Plan...' : step === 3 ? 'Generate My Plan' : 'Continue'}
                  </Text>
                  <ArrowRight className="w-3.5 h-3.5 text-white ml-1.5" />
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
        </motion.div>
      </View>
    </Modal>
  );
};

const styles: any = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    backdropFilter: 'blur(8px)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  } as any,
  headerBar: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(231, 229, 228, 0.8)',
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  badgeStep: {
    width: 32,
    height: 32,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeStepText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  headerBrandTitle: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 20,
    fontWeight: '700',
    color: '#1c1917',
  },
  headerBrandSub: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 11,
    color: '#78716c',
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 9999,
    backgroundColor: 'rgba(231, 229, 228, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressBg: {
    width: '100%',
    height: 4,
    backgroundColor: 'rgba(231, 229, 228, 0.6)',
  },
  progressFill: {
    height: '100%',
  },
  completeIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 9999,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  completeTitle: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  completeSubtitle: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 13,
    color: '#57534e',
    textAlign: 'center',
    marginBottom: 20,
  },
  boldText: {
    fontWeight: '700',
    color: '#1c1917',
  },
  summaryBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e7e5e4',
    marginBottom: 20,
  },
  summaryBoxHeader: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    color: '#a8a29e',
    letterSpacing: 1,
    marginBottom: 8,
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  summaryCol: {
    width: '45%',
  },
  summaryLabel: {
    fontSize: 11,
    color: '#78716c',
  },
  summaryVal: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1c1917',
  },
  primaryActionBtn: {
    paddingVertical: 14,
    borderRadius: 9999,
    alignItems: 'center',
  },
  primaryActionBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  stepIndicator: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    color: '#a8a29e',
  },
  stepTitle: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 24,
    fontWeight: '700',
    color: '#1c1917',
  },
  stepSubtitle: {
    fontSize: 12,
    color: '#78716c',
    marginTop: 2,
  },
  styleCard: {
    padding: 14,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderWidth: 1,
    borderColor: '#e7e5e4',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  styleCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  styleCardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1c1917',
  },
  styleCardDesc: {
    fontSize: 11,
    color: '#78716c',
    marginTop: 2,
  },
  checkCircle: {
    width: 16,
    height: 16,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#44403c',
  },
  grid2Col: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chipBtn: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderWidth: 1,
    borderColor: '#e7e5e4',
  },
  chipBtnText: {
    fontSize: 12,
    color: '#57534e',
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#e7e5e4',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 12,
    color: '#1c1917',
  },
  footerRow: {
    marginTop: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(231, 229, 228, 0.8)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nextBtn: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 9999,
    flexDirection: 'row',
    alignItems: 'center',
  },
  nextBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
});
