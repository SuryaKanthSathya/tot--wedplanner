import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Calendar,
  MapPin,
  Check,
  CheckCircle2,
  Camera,
  Sparkles,
  Flower2,
  Palette,
  Utensils,
  Building2,
  Mail,
  Car,
  Music,
} from 'lucide-react';
import { saveOrUpdateQuote } from '../utils/quotesManager';

export interface RequestQuoteModalProps {
  visible: boolean;
  vendorId?: string;
  vendorName?: string;
  studioName?: string;
  vendorLocation?: string;
  location?: string;
  startingPrice?: string;
  category?: 'makeup' | 'photography' | string;
  onClose: () => void;
  onQuoteSent?: () => void;
}

const MAKEUP_SERVICES = [
  'HD Bridal Makeup',
  'Airbrush Bridal Makeover',
  'Saree Draping & Styling',
  'Hair Styling & Flower Setting',
  'Reception & Sangeet Glam',
  'Engagement Makeup',
  'Bridesmaids & Family Package',
  'Bridal Trial Session',
];

const CATERING_SERVICES = [
  'Wedding Feast (Muhurtham)',
  'Reception Dinner',
  'Haldi / Sangeet Snacks',
  'Live Food Counters',
  'Traditional Banana Leaf',
  'Multi-Cuisine Buffet',
];

const MEHENDI_SERVICES = [
  'Bridal Mehendi',
  'Guest Mehendi (up to 5)',
  'Guest Mehendi (10+)',
  'Pre-Wedding Mehendi Party',
  'Family Mehendi Package',
  'Minimalist / Khafif',
];

const DECOR_SERVICES = [
  'Stage & Mandap Decor',
  'Royal Entrance Canopy',
  'Floral Wall & Photo Backdrops',
  'Lighting, Trusses & Chandelier',
  'Haldi & Mehendi Yellow Setup',
  'Sangeet & Reception Stage',
  'Table Centerpieces & Dining',
  'Theme & Destination Decor',
];

const PHOTOGRAPHY_SERVICES = [
  'Candid Photography',
  'Traditional Photography',
  'Cinematic Video & Teaser',
  'Traditional HD Video',
  'Pre-Wedding Outdoor Shoot',
  'Drone Aerial Shots',
  'Designer Photobook Album',
];

const ENTERTAINMENT_SERVICES = [
  'Sangeet Night DJ',
  'Live Wedding Band',
  'Classical & Nadaswaram',
  'Anchor / MC',
  'Dance Choreography',
  'Chenda Melam & Percussion',
  'Cold Pyro & Stage SFX',
];

const EVENT_OPTIONS = [
  'Muhurtham / Wedding',
  'Reception',
  'Engagement',
  'Haldi & Sangeet',
  'Mehendi',
];

const MAKEUP_BUDGET_RANGES = [
  'Under ₹15,000',
  '₹15,000 - ₹30,000',
  '₹30,000 - ₹50,000',
  '₹50,000+',
];

const CATERING_BUDGET_RANGES = [
  'Under ₹500/plate',
  '₹500 - ₹1,000/plate',
  '₹1,000 - ₹2,000/plate',
  '₹2,000+/plate',
];

const MEHENDI_BUDGET_RANGES = [
  'Under ₹5,000',
  '₹5,000 - ₹15,000',
  '₹15,000 - ₹30,000',
  '₹30,000+',
];

const DECOR_BUDGET_RANGES = [
  'Under ₹1,00,000',
  '₹1,00,000 - ₹2,50,000',
  '₹2,50,000 - ₹5,00,000',
  '₹5,00,000+',
];

const PHOTOGRAPHY_BUDGET_RANGES = [
  'Under ₹50,000',
  '₹50,000 - ₹1,000,000',
  '₹1,000,000 - ₹2,000,000',
  '₹2,000,000+',
];

const ENTERTAINMENT_BUDGET_RANGES = [
  'Under ₹30,000',
  '₹30,000 - ₹60,000',
  '₹60,000 - ₹1,00,000',
  '₹1,00,000+',
];

const CARS_SERVICES = [
  'Vintage Luxury Car Rental',
  'Mercedes / BMW Chauffeur Sedan',
  'Tempo Traveller (14 - 20 Seater)',
  'Luxury AC Coach / Mini Bus',
  'Bridal Floral Car Decoration',
  'Airport & Railway Guest Transfers',
];

const CARS_BUDGET_RANGES = [
  'Under ₹15,000',
  '₹15,000 - ₹30,000',
  '₹30,000 - ₹60,000',
  '₹60,000+',
];

const VENUE_SERVICES = [
  'Central AC Main Mandapam (12 Hours)',
  'Dining Hall Setup (800+ seats)',
  'Deluxe AC Bridal & Groom Changing Suites',
  'Guest Deluxe AC Rooms (10+ Rooms)',
  'Valet Parking & Professional Staff',
  '100% Uninterrupted Power Generator Backup',
  'Outdoor Seafront / Lawn Area',
  'In-House Stage Lighting & Sound AV Rig',
];

const VENUE_BUDGET_RANGES = [
  'Under ₹1,50,000',
  '₹1,50,000 - ₹3,00,000',
  '₹3,00,000 - ₹6,00,000',
  '₹6,00,000+',
];

const INVITATION_SERVICES = [
  'Luxury Hardbound Box Invitations',
  'Traditional Gold Foil & Embossed Cards',
  'Animated Video Invitations & Save the Date',
  'Custom Wedding Bags & Favor Stationery',
  'Eco-Friendly Seed Paper Cards',
  'Custom Calligraphy & Return Address Printing',
];

const INVITATION_BUDGET_RANGES = [
  'Under ₹15,000',
  '₹15,000 - ₹35,000',
  '₹35,000 - ₹75,000',
  '₹75,000+',
];

export const RequestQuoteModal: React.FC<RequestQuoteModalProps> = ({
  visible,
  vendorId,
  vendorName,
  studioName,
  vendorLocation,
  location,
  startingPrice,
  category = 'photography',
  onClose,
  onQuoteSent,
}) => {
  const finalVendorName = vendorName || studioName || 'Vendor';
  const finalLocation = vendorLocation || location || '';
  const catLower = category?.toLowerCase() || '';
  const isVenue = catLower === 'venue' || catLower === 'venues';
  const isInvitations = catLower === 'invitations' || catLower === 'invitation';
  const isMakeup = catLower === 'makeup';
  const isMehendi = catLower === 'mehendi';
  const isCatering = catLower === 'catering';
  const isDecor = catLower === 'decor';
  const isEntertainment = catLower === 'entertainment';
  const isCars = catLower === 'cars';

  const servicesList = isVenue
    ? VENUE_SERVICES
    : isInvitations
    ? INVITATION_SERVICES
    : isCars
    ? CARS_SERVICES
    : isEntertainment
    ? ENTERTAINMENT_SERVICES
    : isDecor
    ? DECOR_SERVICES
    : isMakeup
    ? MAKEUP_SERVICES
    : isMehendi
    ? MEHENDI_SERVICES
    : isCatering
    ? CATERING_SERVICES
    : PHOTOGRAPHY_SERVICES;

  const budgetList = isVenue
    ? VENUE_BUDGET_RANGES
    : isInvitations
    ? INVITATION_BUDGET_RANGES
    : isCars
    ? CARS_BUDGET_RANGES
    : isEntertainment
    ? ENTERTAINMENT_BUDGET_RANGES
    : isDecor
    ? DECOR_BUDGET_RANGES
    : isMakeup
    ? MAKEUP_BUDGET_RANGES
    : isMehendi
    ? MEHENDI_BUDGET_RANGES
    : isCatering
    ? CATERING_BUDGET_RANGES
    : PHOTOGRAPHY_BUDGET_RANGES;

  const [weddingDate, setWeddingDate] = useState('');
  const [weddingLocation, setWeddingLocation] = useState(finalLocation);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const [selectedBudget, setSelectedBudget] = useState<string>('');
  const [customerName, setCustomerName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [notes, setNotes] = useState('');

  const [validationError, setValidationError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (visible) {
      setWeddingLocation(finalLocation);
      setSelectedServices([]);
      setSelectedEvents([]);
      setSelectedBudget('');
    }
  }, [visible, category, finalLocation, isDecor, isMakeup, isEntertainment, isCars, isMehendi, isCatering]);

  const toggleService = (service: string) => {
    setValidationError(null);
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter((s) => s !== service));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const toggleEvent = (event: string) => {
    setValidationError(null);
    if (selectedEvents.includes(event)) {
      setSelectedEvents(selectedEvents.filter((e) => e !== event));
    } else {
      setSelectedEvents([...selectedEvents, event]);
    }
  };

  const handleResetAndClose = () => {
    setValidationError(null);
    setIsSuccess(false);
    onClose();
  };

  const handleSubmit = () => {
    if (!weddingDate.trim()) {
      setValidationError('Please enter your event date.');
      return;
    }
    if (!weddingLocation.trim()) {
      setValidationError('Please enter your event city/location.');
      return;
    }
    if (selectedServices.length === 0) {
      setValidationError(
        isVenue
          ? 'Please select at least one venue requirement / amenity.'
          : isInvitations
          ? 'Please select at least one invitation service / style.'
          : isCatering
          ? 'Please select at least one catering feast option.'
          : isMehendi
          ? 'Please select at least one mehendi service.'
          : isCars
          ? 'Please select at least one luxury car service.'
          : isEntertainment
          ? 'Please select at least one entertainment service.'
          : isDecor
          ? 'Please select at least one decor service.'
          : isMakeup
          ? 'Please select at least one makeup service.'
          : 'Please select at least one service option.'
      );
      return;
    }
    if (selectedEvents.length === 0) {
      setValidationError('Please select at least one event.');
      return;
    }
    if (!customerName.trim()) {
      setValidationError('Please enter your name.');
      return;
    }
    if (!mobileNumber.trim()) {
      setValidationError('Please enter your mobile number.');
      return;
    }

    setValidationError(null);

    const fallbackId = `quote-${finalVendorName.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}`;
    const newQuoteId = vendorId ? `quote-${vendorId}` : fallbackId;
    
    saveOrUpdateQuote({
      id: newQuoteId,
      vendorId: vendorId || newQuoteId.replace('quote-', ''),
      vendorName: finalVendorName,
      category: category,
      packageName: `${category.charAt(0).toUpperCase() + category.slice(1)} Package`,
      status: 'requested',
      paymentStatus: 'pending',
      totalAmount: 0,
      advanceAmount: 0,
      remainingAmount: 0,
      weddingDate,
      location: weddingLocation,
      includedServices: selectedServices,
      image: '',
    });

    setIsSuccess(true);
    if (onQuoteSent) {
      onQuoteSent();
    }
  };

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

  if (!visible) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 z-50 flex flex-col justify-end bg-black/65"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleResetAndClose();
          }}
        >
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="w-full bg-[#FAF7F2] rounded-t-3xl p-4 pt-5 pb-6 relative max-h-[88%] flex flex-col shadow-2xl"
          >
            {/* Close Button Top Right */}
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={handleResetAndClose}
              activeOpacity={0.7}
            >
              <X className="w-5 h-5 text-[#2A2425]" />
            </TouchableOpacity>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
              {isSuccess ? (
                /* SUCCESS STATE */
                <View style={styles.successContainer}>
                  <View style={styles.successIconWrapper}>
                    <CheckCircle2 className="w-16 h-16 text-[#15803D]" />
                  </View>
                  <Text style={styles.successTitle}>
                    {isVenue
                      ? 'Venue Quote Request Sent!'
                      : isInvitations
                      ? 'Invitation Quote Request Sent!'
                      : isCars
                      ? 'Car Quote Request Sent!'
                      : isEntertainment
                      ? 'Entertainment Quote Request Sent!'
                      : isDecor
                      ? 'Decor Quote Request Sent!'
                      : isMakeup
                      ? 'Makeup Quote Request Sent!'
                      : isMehendi
                      ? 'Mehendi Quote Request Sent!'
                      : isCatering
                      ? 'Catering Quote Request Sent!'
                      : 'Quote Request Sent!'}
                  </Text>
                  <Text style={styles.successSubtitle}>
                    Your{' '}
                    {isVenue
                      ? 'venue booking'
                      : isInvitations
                      ? 'wedding invitation'
                      : isCars
                      ? 'transport/car'
                      : isEntertainment
                      ? 'entertainment'
                      : isDecor
                      ? 'wedding decor'
                      : isMakeup
                      ? 'bridal makeup'
                      : isMehendi
                      ? 'bridal mehendi'
                      : isCatering
                      ? 'catering'
                      : 'photography'}{' '}
                    requirements have been sent to{' '}
                    <Text style={{ fontWeight: '700', color: '#581420' }}>{finalVendorName}</Text>. They
                    will reach out to you shortly via WhatsApp / Phone with full pricing and custom
                    package details.
                  </Text>

                  <View style={styles.summaryBox}>
                    <Text style={styles.summaryTitle}>Request Summary:</Text>
                    <Text style={styles.summaryItem}>• Date: {weddingDate}</Text>
                    <Text style={styles.summaryItem}>• Location: {weddingLocation}</Text>
                    <Text style={styles.summaryItem}>• Services: {selectedServices.join(', ')}</Text>
                    <Text style={styles.summaryItem}>• Budget: {selectedBudget}</Text>
                  </View>

                  <TouchableOpacity
                    style={styles.doneBtn}
                    onPress={handleResetAndClose}
                    activeOpacity={0.85}
                  >
                    <Text style={styles.doneBtnText}>Close</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                /* FORM STATE */
                <View style={styles.formContent}>
                  {/* HEADER */}
                  <View style={styles.headerRow}>
                    {isVenue ? (
                      <Building2 className="w-6 h-6 text-[#581420] mr-2 flex-shrink-0" />
                    ) : isInvitations ? (
                      <Mail className="w-6 h-6 text-[#581420] mr-2 flex-shrink-0" />
                    ) : isDecor ? (
                      <Palette className="w-6 h-6 text-[#581420] mr-2 flex-shrink-0" />
                    ) : isMakeup ? (
                      <Sparkles className="w-6 h-6 text-[#581420] mr-2 flex-shrink-0" />
                    ) : (
                      <Camera className="w-6 h-6 text-[#581420] mr-2 flex-shrink-0" />
                    )}
                    <Text style={styles.modalTitle}>
                      {isVenue
                        ? 'Wedding Venue Quote Request'
                        : isInvitations
                        ? 'Invitation Cards Quote Request'
                        : isCars
                        ? 'Car Rental Quote Request'
                        : isEntertainment
                        ? 'Entertainment Quote Request'
                        : isDecor
                        ? 'Wedding Decor Quote Request'
                        : isMakeup
                        ? 'Bridal Makeup Quote Request'
                        : isMehendi
                        ? 'Bridal Mehendi Quote Request'
                        : isCatering
                        ? 'Catering Quote Request'
                        : 'Photography Quote Request'}
                    </Text>
                  </View>
                  <Text style={styles.modalSubtitle}>
                    Share your{' '}
                    {isVenue
                      ? 'venue requirements'
                      : isInvitations
                      ? 'wedding invitation card'
                      : isCars
                      ? 'transportation'
                      : isEntertainment
                      ? 'entertainment'
                      : isDecor
                      ? 'wedding decor'
                      : isMakeup
                      ? 'bridal makeup'
                      : isMehendi
                      ? 'mehendi'
                      : isCatering
                      ? 'catering'
                      : 'photography'}{' '}
                    details to receive an exact quotation from{' '}
                    <Text style={{ fontWeight: '700', color: '#581420' }}>{finalVendorName}</Text>.
                  </Text>

                  {/* SECTION 1 — Services Required */}
                  <View style={styles.fieldGroup}>
                    <Text style={styles.fieldLabel}>
                      1.{' '}
                      {isVenue
                        ? 'Venue Amenities & Halls Needed'
                        : isInvitations
                        ? 'Invitation Types Needed'
                        : isCars
                        ? 'Vehicle/Services Needed'
                        : isEntertainment
                        ? 'Entertainment Services Needed'
                        : isDecor
                        ? 'Decor Services Needed'
                        : isMakeup
                        ? 'Makeup Services Needed'
                        : isMehendi
                        ? 'Mehendi Services Needed'
                        : isCatering
                        ? 'Catering Services Needed'
                        : 'Photography Services Needed'}{' '}
                      <Text style={styles.asterisk}>*</Text>
                    </Text>
                    <View style={styles.chipsRow}>
                      {servicesList.map((service) => {
                        const isSelected = selectedServices.includes(service);
                        return (
                          <React.Fragment key={service}>
                            <TouchableOpacity
                              style={[styles.chip, isSelected && styles.chipSelected]}
                              onPress={() => toggleService(service)}
                              activeOpacity={0.8}
                            >
                              {isSelected && <Check className="w-3.5 h-3.5 text-white mr-1.5" />}
                              <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
                                {service}
                              </Text>
                            </TouchableOpacity>
                          </React.Fragment>
                        );
                      })}
                    </View>
                  </View>

                  {/* SECTION 2 — Events Required */}
                  <View style={styles.fieldGroup}>
                    <Text style={styles.fieldLabel}>
                      2. Functions / Events <Text style={styles.asterisk}>*</Text>
                    </Text>
                    <View style={styles.chipsRow}>
                      {EVENT_OPTIONS.map((event) => {
                        const isSelected = selectedEvents.includes(event);
                        return (
                          <React.Fragment key={event}>
                            <TouchableOpacity
                              style={[styles.chip, isSelected && styles.chipSelected]}
                              onPress={() => toggleEvent(event)}
                              activeOpacity={0.8}
                            >
                              {isSelected && <Check className="w-3.5 h-3.5 text-white mr-1.5" />}
                              <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
                                {event}
                              </Text>
                            </TouchableOpacity>
                          </React.Fragment>
                        );
                      })}
                    </View>
                  </View>

                  {/* SECTION 3 — Estimated Budget Range */}
                  <View style={styles.fieldGroup}>
                    <Text style={styles.fieldLabel}>
                      3. {isCars ? 'Estimated Rental Budget' : isEntertainment ? 'Estimated Entertainment Budget' : isDecor ? 'Estimated Decor Budget' : isMakeup ? 'Estimated Makeup Budget' : isMehendi ? 'Estimated Mehendi Budget' : isCatering ? 'Estimated Catering Budget' : 'Estimated Photography Budget'}
                    </Text>
                    <View style={styles.chipsRow}>
                      {budgetList.map((b) => {
                        const isSelected = selectedBudget === b;
                        return (
                          <React.Fragment key={b}>
                            <TouchableOpacity
                              style={[styles.chip, isSelected && styles.chipSelected]}
                              onPress={() => setSelectedBudget(b)}
                              activeOpacity={0.8}
                            >
                              {isSelected && <Check className="w-3.5 h-3.5 text-white mr-1.5" />}
                              <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
                                {b}
                              </Text>
                            </TouchableOpacity>
                          </React.Fragment>
                        );
                      })}
                    </View>
                  </View>

                  {/* SECTION 4 — Date & Location */}
                  <View style={styles.rowTwoCols}>
                    <View style={[styles.fieldGroup, { flex: 1, marginRight: 6 }]}>
                      <Text style={styles.fieldLabel}>
                        Event Date <Text style={styles.asterisk}>*</Text>
                      </Text>
                      <View style={styles.inputBox}>
                        <TextInput
                          style={styles.textInputFlex}
                          value={weddingDate}
                          onChangeText={(val) => {
                            setWeddingDate(val);
                            setValidationError(null);
                          }}
                          placeholder="e.g. 24 Oct 2026"
                          placeholderTextColor="#9CA3AF"
                        />
                        <Calendar className="w-4 h-4 text-[#581420] ml-1" />
                      </View>
                    </View>

                    <View style={[styles.fieldGroup, { flex: 1, marginLeft: 6 }]}>
                      <Text style={styles.fieldLabel}>
                        City / Venue <Text style={styles.asterisk}>*</Text>
                      </Text>
                      <View style={styles.inputBox}>
                        <TextInput
                          style={styles.textInputFlex}
                          value={weddingLocation}
                          onChangeText={(val) => {
                            setWeddingLocation(val);
                            setValidationError(null);
                          }}
                          placeholder="e.g. Chennai"
                          placeholderTextColor="#9CA3AF"
                        />
                        <MapPin className="w-4 h-4 text-[#581420] ml-1" />
                      </View>
                    </View>
                  </View>

                  {/* SECTION 5 — Special Requests / Notes */}
                  <View style={styles.fieldGroup}>
                    <Text style={styles.fieldLabel}>
                      {isEntertainment
                        ? 'Special Theme Ideas / Music Genre & Requirements (Optional)'
                        : isDecor
                          ? 'Special Theme Ideas / Stage Dimensions & Venue Notes (Optional)'
                          : isMakeup
                            ? 'Special Instructions / Skin & Saree Details (Optional)'
                            : isCars
                              ? 'Special Requests / Rental Details (Optional)'
                              : 'Special Instructions / Venue Notes (Optional)'}
                    </Text>
                    <View style={styles.textAreaBox}>
                      <TextInput
                        style={styles.textAreaInput}
                        value={notes}
                        onChangeText={setNotes}
                        placeholder={
                          isEntertainment
                            ? 'e.g. We need a live band that plays 90s hits and a DJ who mixes Tamil and English'
                            : isDecor
                              ? 'e.g. Traditional jasmine mandap + fairy light canopy for reception'
                              : isMakeup
                                ? 'e.g. Need 9-yard saree draping, airbrush makeup for bride + 2 family members'
                                : isCars
                                  ? 'e.g. Need a vintage car for 3 hours, and 2 vans for 12 hours.'
                                  : 'e.g. Need 2 photographers for Muhurtham, outdoor pre-wedding in Ooty'
                        }
                        placeholderTextColor="#9CA3AF"
                        multiline
                        numberOfLines={2}
                      />
                    </View>
                  </View>

                  {/* SECTION 6 — Contact Details */}
                  <View style={styles.rowTwoCols}>
                    <View style={[styles.fieldGroup, { flex: 1, marginRight: 6 }]}>
                      <Text style={styles.fieldLabel}>
                        Your Name <Text style={styles.asterisk}>*</Text>
                      </Text>
                      <View style={styles.inputBox}>
                        <TextInput
                          style={styles.textInputFlex}
                          value={customerName}
                          onChangeText={(val) => {
                            setCustomerName(val);
                            setValidationError(null);
                          }}
                          placeholder="Full Name"
                          placeholderTextColor="#9CA3AF"
                        />
                      </View>
                    </View>

                    <View style={[styles.fieldGroup, { flex: 1, marginLeft: 6 }]}>
                      <Text style={styles.fieldLabel}>
                        Mobile No. <Text style={styles.asterisk}>*</Text>
                      </Text>
                      <View style={styles.inputBox}>
                        <TextInput
                          style={styles.textInputFlex}
                          value={mobileNumber}
                          onChangeText={(val) => {
                            setMobileNumber(val);
                            setValidationError(null);
                          }}
                          placeholder="10-digit Mobile"
                          placeholderTextColor="#9CA3AF"
                          keyboardType="phone-pad"
                        />
                      </View>
                    </View>
                  </View>

                  {/* INLINE VALIDATION ERROR */}
                  {validationError ? (
                    <View style={styles.errorBox}>
                      <Text style={styles.errorText}>⚠️ {validationError}</Text>
                    </View>
                  ) : null}

                  {/* SUBMIT BUTTON */}
                  <TouchableOpacity
                    style={styles.submitBtn}
                    onPress={handleSubmit}
                    activeOpacity={0.85}
                  >
                    <Text style={styles.submitBtnText}>
                      {isCars
                        ? 'Send Car Quote Request'
                        : isEntertainment
                          ? 'Send Entertainment Quote Request'
                          : isDecor
                            ? 'Send Decor Quote Request'
                            : isMakeup
                              ? 'Send Makeup Quote Request'
                              : 'Send Photography Quote Request'}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </ScrollView>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 16,
  },
  closeBtn: {
    position: 'absolute',
    top: 14,
    right: 14,
    zIndex: 10,
    backgroundColor: '#EFE7DE',
    borderRadius: 20,
    padding: 6,
  },
  formContent: {
    paddingTop: 4,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    paddingRight: 32,
  },
  modalTitle: {
    fontFamily: 'Playfair Display, Georgia, serif',
    fontSize: 18,
    fontWeight: '800',
    color: '#2A2425',
  },
  modalSubtitle: {
    fontSize: 12,
    color: '#6B5A5C',
    lineHeight: 17,
    marginBottom: 16,
  },
  fieldGroup: {
    marginBottom: 12,
  },
  rowTwoCols: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fieldLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#3D3234',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  asterisk: {
    color: '#DC2626',
    fontWeight: '700',
  },
  inputBox: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2D8CD',
    borderRadius: 12,
    paddingHorizontal: 10,
    height: 42,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textInputFlex: {
    flex: 1,
    fontSize: 12,
    color: '#2A2425',
    height: '100%',
    padding: 0,
  },
  textAreaBox: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2D8CD',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
    minHeight: 52,
  },
  textAreaInput: {
    fontSize: 12,
    color: '#2A2425',
    padding: 0,
    textAlignVertical: 'top',
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  chip: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2D8CD',
    borderRadius: 18,
    paddingHorizontal: 11,
    paddingVertical: 7,
    flexDirection: 'row',
    alignItems: 'center',
  },
  chipSelected: {
    backgroundColor: '#581420',
    borderColor: '#581420',
  },
  chipText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#3D3234',
  },
  chipTextSelected: {
    color: '#FFFFFF',
  },
  errorBox: {
    backgroundColor: '#FEE2E2',
    borderWidth: 1,
    borderColor: '#FCA5A5',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 10,
  },
  errorText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#DC2626',
  },
  submitBtn: {
    backgroundColor: '#581420',
    height: 46,
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#581420',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  submitBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  successContainer: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  successIconWrapper: {
    marginBottom: 12,
  },
  successTitle: {
    fontFamily: 'Playfair Display, Georgia, serif',
    fontSize: 22,
    fontWeight: '800',
    color: '#15803D',
    marginBottom: 8,
  },
  successSubtitle: {
    fontSize: 12,
    color: '#4B5563',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 16,
  },
  summaryBox: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2D8CD',
    borderRadius: 12,
    padding: 14,
    width: '100%',
    marginBottom: 20,
  },
  summaryTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2A2425',
    marginBottom: 6,
  },
  summaryItem: {
    fontSize: 11,
    color: '#4B5563',
    marginBottom: 4,
    lineHeight: 16,
  },
  doneBtn: {
    backgroundColor: '#581420',
    height: 44,
    borderRadius: 22,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  doneBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
});
